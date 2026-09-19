import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = '';
  let quoted = false;
  const src = String(text).replace(/^\uFEFF/, '');
  for (let i = 0; i < src.length; i += 1) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') { cell += '"'; i += 1; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ',') { row.push(cell); cell = ''; }
    else if (ch === '\n') { row.push(cell.replace(/\r$/, '')); rows.push(row); row = []; cell = ''; }
    else cell += ch;
  }
  if (cell.length || row.length) { row.push(cell.replace(/\r$/, '')); rows.push(row); }
  const header = rows.shift() || [];
  return rows.filter((item) => item.some((value) => value !== '')).map((item) => {
    const out = {};
    header.forEach((key, index) => { out[key] = item[index] ?? ''; });
    return out;
  });
}

const PROTECTED = new Set(['/chords/b-minor', '/chords/d-minor', '/chords/e-minor', '/chords/g-minor']);
const HOLD = new Set(['/chords/d-flat-m7-flat5', '/chords/f-sharp-madd9', '/chords/a-flat-madd9', '/chords/b-flat-madd9', '/chords/d-flat-madd9']);
const alignment = parseCsv(readFileSync(resolve(root, 'docs/seo/chords/evidence-2026-09-18/tdh-alignment-2026-09-19/CHORD_TDH_ALIGNMENT.csv'), 'utf8'));

function tsString(value) {
  return JSON.stringify(value);
}

function localTitle(suggested) {
  const local = suggested.replace(/ \| PianoGrid$/, '');
  if (local.length > 52) return suggested;
  return local;
}

function theoryFor(row) {
  if (row.article_case_bug !== 'true') return '';
  if (row.family === 'dominant7') return `The ${row.symbol} chord is a major triad plus a minor seventh.`;
  if (row.family === 'major7') return `The ${row.symbol} chord is a major triad plus a major seventh.`;
  if (row.family === 'minor7') return `The ${row.symbol} chord is a minor triad plus a minor seventh.`;
  if (row.family === 'halfDiminished7') return `The ${row.symbol} chord is a diminished triad plus a minor seventh.`;
  return '';
}

function inversionKey(row) {
  if (row.family === 'dominant7' || row.family === 'major7' || row.family === 'minor7' || row.family === 'halfDiminished7') {
    return `${row.formal_name} positions and inversions`;
  }
  return `${row.formal_name} inversions`;
}

const lines = [];
lines.push(`export type ChordDetailSeoCopy = {
  title: string;
  description: string;
  h1?: string;
  h2?: Record<string, string>;
  intro?: string;
  theory?: string;
  fingering?: string;
  keyboardHelp?: string;
  faq?: { q: string; a: string }[];
};
`);
lines.push('/** Task 11 same-entity labels. Does not change pack music names, notes, or URLs. */');
lines.push('export const CHORD_DETAIL_SEO_COPY: Record<string, ChordDetailSeoCopy> = {');

const applied = [];
for (const row of alignment) {
  if (!row.suggested_title || !row.suggested_h1) continue;
  if (PROTECTED.has(row.url) || HOLD.has(row.url)) continue;
  if (row.upstream_protected === 'true') continue;
  if (!row.issue_type.includes('SAME_ENTITY_LABEL_ALIGNMENT')) continue;

  const title = localTitle(row.suggested_title);
  const keyboardH2 = row.url === '/chords/b-7' ? 'B7 piano notes and keyboard diagram' : `${row.symbol} piano notes and keyboard diagram`;
  const h2 = {
    [row.current_h1]: row.suggested_h1,
    [`${row.formal_name} keyboard and inversions`]: keyboardH2,
    [`${row.formal_name} formula`]: `How is the ${row.symbol} chord built?`,
    [inversionKey(row)]: row.url === '/chords/b-7' ? 'B7 inversions' : `${row.symbol} inversions`,
    'Chord & positions': keyboardH2,
  };
  const entry = {
    title,
    h1: row.suggested_h1,
    description: row.suggested_description,
    intro: row.suggested_intro,
    h2,
  };
  const theory = theoryFor(row);
  if (theory) entry.theory = theory;
  if (row.engineering_fingering_copy === 'true' || /fingering dataset is (provided|authorized)/i.test(row.current_fingering_reason)) {
    entry.fingering = 'Fingerings are not included on this page. The diagram shows note positions, not a prescribed hand shape.';
  }
  if (row.url === '/chords/b-7') {
    entry.keyboardHelp = 'For root position, play B, D♯, F♯ and A from low to high. Switch positions to compare inversions, or play the notes one at a time.';
    entry.faq = [
      { q: 'What is a B7 chord?', a: 'B7 is a B dominant seventh chord, made up of B, D♯, F♯ and A.' },
      { q: 'What is the formula for B7?', a: '1–3–5–♭7.' },
      { q: 'How many inversions does a seventh chord have?', a: 'Three inversions, in addition to root position.' },
    ];
  }
  applied.push(row.url);
  lines.push(`  ${tsString(row.url)}: {`);
  lines.push(`    title: ${tsString(entry.title)},`);
  lines.push(`    h1: ${tsString(entry.h1)},`);
  lines.push(`    description: ${tsString(entry.description)},`);
  lines.push(`    intro: ${tsString(entry.intro)},`);
  if (entry.theory) lines.push(`    theory: ${tsString(entry.theory)},`);
  if (entry.fingering) lines.push(`    fingering: ${tsString(entry.fingering)},`);
  if (entry.keyboardHelp) lines.push(`    keyboardHelp: ${tsString(entry.keyboardHelp)},`);
  lines.push('    h2: {');
  for (const [from, to] of Object.entries(h2)) {
    lines.push(`      ${tsString(from)}: ${tsString(to)},`);
  }
  lines.push('    },');
  if (entry.faq) {
    lines.push('    faq: [');
    for (const item of entry.faq) {
      lines.push(`      { q: ${tsString(item.q)}, a: ${tsString(item.a)} },`);
    }
    lines.push('    ],');
  }
  lines.push('  },');
}

lines.push('};');
lines.push('');
writeFileSync(resolve(root, 'src/lib/chord-detail-seo-copy.ts'), lines.join('\n'));
writeFileSync(resolve(root, 'docs/seo/chords/evidence-2026-09-18/tdh-alignment-2026-09-19/_applied_urls.json'), JSON.stringify({ count: applied.length, urls: applied }, null, 2) + '\n');
console.log(JSON.stringify({ applied: applied.length, b7: applied.includes('/chords/b-7') }, null, 2));
