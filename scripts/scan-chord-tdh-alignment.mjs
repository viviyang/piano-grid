import { existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18/tdh-alignment-2026-09-19');
mkdirSync(outDir, { recursive: true });

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
function csvEscape(value) {
  const text = value == null ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function writeCsv(filename, columns, rows) {
  writeFileSync(resolve(outDir, filename), [columns.join(','), ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(','))].join('\n') + '\n');
}
function unique(list) { return [...new Set(list)]; }
function readJson(rel) { return JSON.parse(readFileSync(resolve(root, rel), 'utf8')); }

const siteRoutes = readFileSync(resolve(root, 'src/lib/site-routes.ts'), 'utf8');
const publicRoutes = unique([...siteRoutes.matchAll(/'([^']+)'/g)].map((m) => m[1]));
const familyUrls = ['/chords/major', '/chords/minor', '/chords/diminished', '/chords/augmented', '/chords/suspended', '/chords/seventh', '/chords/add', '/chords/extended', '/chords/altered'];
const structureUrls = ['/chords', '/chords/by-key', '/chords/finder', '/chord-progressions'];
const detailUrls = publicRoutes.filter((url) => url.startsWith('/chords/') && !familyUrls.includes(url) && !structureUrls.includes(url));

const seoSource = readFileSync(resolve(root, 'src/lib/seo-editorial.ts'), 'utf8');
const seoCopyUrls = new Set([...seoSource.matchAll(/'(\/[^']+)': \{/g)].map((m) => m[1]));
function seoTitle(url) {
  const block = seoSource.split(`'${url}':`)[1];
  if (!block) return null;
  const title = block.match(/title: '([^']+)'/) || block.match(/title: '([^']*)'/);
  const h1 = block.match(/h1: '([^']+)'/);
  const description = block.match(/description: '([^']+)'/);
  return {
    title: title?.[1] || '',
    h1: h1?.[1] || '',
    description: description?.[1] || '',
  };
}

function loadChordDetailSeoCopy() {
  const file = resolve(root, 'src/lib/chord-detail-seo-copy.ts');
  if (!existsSync(file)) return {};
  const src = readFileSync(file, 'utf8');
  const start = src.indexOf('export const CHORD_DETAIL_SEO_COPY');
  if (start < 0) return {};
  const brace = src.indexOf('{', start);
  let depth = 0;
  let inStr = false;
  let quote = '';
  let escape = false;
  let end = brace;
  for (let i = brace; i < src.length; i += 1) {
    const ch = src[i];
    if (inStr) {
      if (escape) { escape = false; continue; }
      if (ch === '\\') { escape = true; continue; }
      if (ch === quote) { inStr = false; quote = ''; }
      continue;
    }
    if (ch === '"' || ch === "'") { inStr = true; quote = ch; continue; }
    if (ch === '{') depth += 1;
    else if (ch === '}') {
      depth -= 1;
      if (depth === 0) { end = i; break; }
    }
  }
  return Function(`"use strict"; return (${src.slice(brace, end + 1)});`)();
}
const appliedCopy = loadChordDetailSeoCopy();

function brandTitle(title) {
  if (!title) return '';
  return title.includes('PianoGrid') || title.length > 52 ? title : `${title} | PianoGrid`;
}
function applyDescriptionFix(description) {
  return String(description || '').replace(/\bthe ([a-g])(?= (?:major|minor|dominant|diminished|augmented|suspended))/g, (_, root) => `the ${root.toUpperCase()}`);
}

const seed72 = parseCsv(readFileSync('C:/Users/Admin/Documents/viviyang_github/piano/_handoff/hords-seo-evidence-2026-09-18/CHORD_NAMING_REVIEW_72.csv', 'utf8'));
const seedByUrl = new Map(seed72.map((row) => [row.url, row]));
const queries = parseCsv(readFileSync(resolve(root, 'docs/seo/chords/evidence-2026-09-18/QUERY_EVIDENCE.csv'), 'utf8'));
const pageEvidence = parseCsv(readFileSync(resolve(root, 'docs/seo/chords/evidence-2026-09-18/PAGE_EVIDENCE.csv'), 'utf8'));
const pageByUrl = new Map(pageEvidence.map((row) => [row.url, row]));

const HOLD = new Set(['/chords/d-flat-m7-flat5', '/chords/f-sharp-madd9', '/chords/a-flat-madd9', '/chords/b-flat-madd9', '/chords/d-flat-madd9']);
const UPSTREAM = new Set(['/chords/b-minor', '/chords/d-minor', '/chords/e-minor', '/chords/g-minor']);
const UPSTREAM_NON_DETAIL = ['/guide/read-sheet-music', '/songs/easy', '/songs', '/keyboard-notes/labeled'];

function guitarQuery(q) { return /\bguitar\b/i.test(q); }
function pianoQuery(q) { return /\bpiano\b/i.test(q) && !guitarQuery(q); }

function preferQuery(rows, query) {
  const matches = rows.filter((row) => row.query === query);
  return matches.find((row) => row.observation_date === '2026-09-19') || matches[0] || null;
}
function bestQueries(url) {
  const rows = queries.filter((row) => row.url === url && Number(row.volume) > 0 && row.intent !== 'GUITAR_EXCLUDED' && !guitarQuery(row.query));
  if (url === '/chords/b-7') {
    return {
      generic: preferQuery(rows, 'b7 chord'),
      piano: preferQuery(rows, 'b7 chord piano'),
      rows,
    };
  }
  const generic = rows.filter((row) => !pianoQuery(row.query)).reduce((w, r) => (!w || Number(r.volume) > Number(w.volume) ? r : w), null);
  const piano = rows.filter((row) => pianoQuery(row.query)).reduce((w, r) => (!w || Number(r.volume) > Number(w.volume) ? r : w), null);
  return { generic, piano, rows };
}

const details = [];
function loadDir(dir, pick) {
  for (const name of readdirSync(resolve(root, dir)).filter((n) => n.endsWith('.page.json'))) {
    details.push(pick(readJson(`${dir}/${name}`), `${dir}/${name}`));
  }
}
loadDir('docs/pianogrid-chords-n2c/03_details', (raw, file) => ({
  url: raw.url, chord_id: raw.url.split('/').at(-1), family: raw.subtype, formal_name: raw.name, symbol: raw.symbol,
  pack_title: raw.seo.title, pack_h1: raw.seo.h1, pack_description: raw.seo.description, pack_intro: raw.content.directAnswer,
  theory: raw.content.theory, fingering_reason: raw.fingering?.reason || '', notes: raw.definition.toneSpellings,
  source_file: file, batch: 'N2C', inversions: true, voicings_only: false, pdf: existsSync(resolve(root, `public/reference/assets/chord-${raw.url.split('/').at(-1)}.pdf`)),
  sound: true, fingering: false, faq: raw.content.faq || [],
}));
loadDir('docs/pianogrid-chords-n2b/03_details', (raw, file) => ({
  url: raw.url, chord_id: raw.url.split('/').at(-1), family: raw.subtype, formal_name: raw.name, symbol: raw.symbol,
  pack_title: raw.seo.title, pack_h1: raw.seo.h1, pack_description: raw.seo.description, pack_intro: raw.content.directAnswer,
  theory: raw.content.theory, fingering_reason: raw.fingering?.reason || '', notes: raw.definition.toneSpellings,
  source_file: file, batch: 'N2B', inversions: true, voicings_only: false, pdf: existsSync(resolve(root, `public/reference/assets/chord-${raw.url.split('/').at(-1)}.pdf`)),
  sound: true, fingering: false, faq: raw.content.faq || [],
}));
loadDir('docs/pianogrid-chords-n2d-v2/03_content/details', (raw, file) => ({
  url: raw.url, chord_id: raw.id || raw.url.split('/').at(-1), family: raw.subtype, formal_name: raw.name, symbol: raw.symbol,
  pack_title: raw.seo.title, pack_h1: raw.seo.h1, pack_description: raw.seo.description, pack_intro: raw.content.directAnswer,
  theory: (raw.content.blocks || []).map((b) => b.paragraphs?.join(' ') || '').join(' '), fingering_reason: '', notes: raw.definition.components.map((c) => c.spelling),
  source_file: file, batch: 'N2D', inversions: false, voicings_only: true, pdf: existsSync(resolve(root, `public/reference/assets/chord-${raw.url.split('/').at(-1)}.pdf`)),
  sound: true, fingering: false, faq: raw.content.faq || [],
}));
loadDir('docs/pianogrid-chords-next-expansion/04_details_next', (raw, file) => ({
  url: raw.url, chord_id: raw.url.split('/').at(-1), family: raw.data.quality, formal_name: raw.h1.replace(/ Piano Chord$/, ''), symbol: raw.data.symbol,
  pack_title: raw.title, pack_h1: raw.h1, pack_description: raw.description, pack_intro: raw.content.direct_answer,
  theory: '', fingering_reason: '', notes: raw.data.pitch_classes, source_file: file, batch: 'N1', inversions: true, voicings_only: false,
  pdf: existsSync(resolve(root, `public/reference/assets/chord-${raw.url.split('/').at(-1)}.pdf`)), sound: true, fingering: raw.data.fingering_policy === 'verified_examples', faq: raw.content.faq || [],
}));

const originalNine = ['/chords/a-minor', '/chords/a-major', '/chords/c-major', '/chords/g-major', '/chords/c-minor', '/chords/e-major', '/chords/b-major', '/chords/a-flat-major', '/chords/c-flat-major'];
const master = readJson('docs/content/site-master/page-content.master.json');
const aMinor = details.find((d) => d.url === '/chords/a-minor');
if (!aMinor) {
  const page = master.pages['/chords/a-minor'];
  details.push({
    url: '/chords/a-minor', chord_id: 'a-minor', family: 'minor', formal_name: 'A Minor', symbol: 'Am',
    pack_title: 'A Minor Piano Chord: Notes, Inversions, Fingering & PDF | PianoGrid', pack_h1: 'A Minor Piano Chord',
    pack_description: page?.seo?.description || '', pack_intro: page?.blocks?.[0]?.body || '', theory: '', fingering_reason: '',
    notes: ['A', 'C', 'E'], source_file: 'src/lib/a-minor-content.ts', batch: 'ORIGINAL', inversions: true, voicings_only: false,
    pdf: existsSync(resolve(root, 'public/reference/assets/chord-a-minor.pdf')), sound: true, fingering: true, faq: [],
  });
}
for (const url of originalNine) {
  if (details.some((d) => d.url === url)) continue;
  const page = master.pages[url];
  const nextBindings = readJson('docs/pianogrid-chords-content-next/03_learning/adapter-bindings.json');
  const bind = nextBindings[url] || {};
  details.push({
    url, chord_id: url.split('/').at(-1), family: page?.data?.quality || '', formal_name: bind.h1 || page?.title || '', symbol: page?.data?.symbol || '',
    pack_title: bind.title || page?.title || '', pack_h1: bind.h1 || page?.title || '', pack_description: bind.description || page?.description || '',
    pack_intro: bind.answer || page?.blocks?.[0]?.body || '', theory: '', fingering_reason: '', notes: page?.data?.notes || [],
    source_file: 'docs/content/site-master/page-content.master.json', batch: 'ORIGINAL', inversions: true, voicings_only: false,
    pdf: existsSync(resolve(root, `public/reference/assets/chord-${url.split('/').at(-1)}.pdf`)), sound: true,
    fingering: url !== '/chords/c-flat-major', faq: [],
  });
}

if (details.length !== detailUrls.length) {
  const missing = detailUrls.filter((url) => !details.some((d) => d.url === url));
  const extra = details.filter((d) => !detailUrls.includes(d.url)).map((d) => d.url);
  throw new Error(`Detail scan mismatch registry=${detailUrls.length} scanned=${details.length} missing=${missing.join(',')} extra=${extra.join(',')}`);
}

function displaySymbol(symbol) {
  return symbol;
}
function rootToken(row) {
  return String(row.formal_name || '').replace(/ (Dominant|Major|Minor|Half-Diminished|Suspended).*$/i, '') || row.symbol;
}
function shortLabel(row) {
  const seed = seedByUrl.get(row.url);
  if (seed?.proposed_display_label) return seed.proposed_display_label;
  if (row.family === 'halfDiminished7') return `${row.formal_name.replace(/ Seventh$/, '')} Chord (${row.symbol})`;
  return `${row.symbol} Chord`;
}
function capabilityTail(row) {
  const parts = ['Piano Notes'];
  if (row.inversions) parts.push('Inversions');
  else if (row.voicings_only) parts.push('Voicings');
  if (row.sound) parts.push('Sound');
  if (row.fingering) parts.push('Fingering');
  if (row.pdf) parts.push('PDF');
  if (parts.length === 1) return parts[0];
  if (parts.length === 2) return parts.join(' & ');
  return `${parts.slice(0, -1).join(', ')} & ${parts.at(-1)}`;
}
function articleBug(text) {
  return /\bA [a-g] (dominant|major|minor|diminished|augmented|suspended)/.test(text || '');
}

function classify(row) {
  const issues = [];
  if (UPSTREAM.has(row.url)) issues.push('UPSTREAM_PROTECTED');
  if (HOLD.has(row.url)) issues.push('CONTENT_REVIEW');
  const h1 = row.pack_h1 || '';
  const symbolInH1 = h1.includes(row.symbol) || (row.symbol.includes('♭') && h1.includes(row.symbol.replaceAll('♭', 'b')));
  const formalAsPrimary = /Dominant Seventh|Major Seventh|Minor Seventh|Half-Diminished|Suspended 2nd|Suspended 4th|Suspended Second|Suspended Fourth/i.test(h1) && !h1.startsWith(row.symbol);
  if (formalAsPrimary) issues.push('SAME_ENTITY_LABEL_ALIGNMENT');
  else if (!issues.includes('UPSTREAM_PROTECTED')) issues.push('ALREADY_CLEAR');
  if (articleBug(row.theory) || articleBug(row.pack_description) || articleBug(row.pack_intro)) issues.push('COPY_ARTICLE_CASE');
  if (/independently authorized fingering dataset is provided for N2C/i.test(row.fingering_reason)) issues.push('COPY_ENGINEERING_FINGERING');
  if (!h1) issues.push('EVIDENCE_MISSING');
  return unique(issues);
}

function proposal(row, issues) {
  const seed = seedByUrl.get(row.url);
  if (HOLD.has(row.url)) {
    return { suggested_title: '', suggested_h1: '', suggested_description: '', suggested_intro: '', execution_state: 'HOLD_PRODUCT_REVIEW', applied: 'false', reason: 'Five no-positive URLs keep current service and copy this round.' };
  }
  if (UPSTREAM.has(row.url)) {
    return { suggested_title: '', suggested_h1: '', suggested_description: '', suggested_intro: '', execution_state: 'UPSTREAM_PROTECTED', applied: 'false', reason: 'Approved eight-page TDH from 5fa6cb6 is integrated and kept. Task 11 did not overwrite these fields.' };
  }
  const align = issues.includes('SAME_ENTITY_LABEL_ALIGNMENT');
  if (!align) {
    return { suggested_title: '', suggested_h1: '', suggested_description: '', suggested_intro: '', execution_state: 'NO_TDH_CHANGE', applied: 'false', reason: 'Current short or natural name is already clear; not a mechanical Piano-word rewrite.' };
  }
  const label = row.url === '/chords/b-7' ? 'B7 Chord' : shortLabel(row);
  const notes = row.notes.join(', ').replace(/, ([^,]+)$/, ' and $1');
  const root = rootToken(row);
  const titleCore = row.url === '/chords/b-7'
    ? 'B7 Chord: Piano Notes, Inversions & Sound'
    : `${label}: ${capabilityTail(row)}`;
  const suggested_title = brandTitle(titleCore);
  let suggested_h1 = label;
  let suggested_description = '';
  let suggested_intro = '';
  if (row.url === '/chords/b-7') {
    suggested_description = 'Learn the B7 chord on piano: B, D♯, F♯ and A. See keyboard diagrams, explore all three inversions, hear the chord and practice finding its notes.';
    suggested_intro = 'B7, also called B dominant seventh, contains B, D♯, F♯ and A. Use the piano diagram to find the notes, hear the chord and explore its three inversions.';
  } else if (row.family === 'dominant7') {
    suggested_description = `Learn the ${row.symbol} chord on piano: ${notes}. See keyboard diagrams, explore inversions, hear the chord and practice finding its notes.`;
    suggested_intro = `${row.symbol}, also called ${root} dominant seventh, contains ${notes}. Use the piano diagram to find the notes, hear the chord and explore its inversions.`;
  } else if (row.family === 'major7') {
    suggested_description = `Learn the ${row.symbol} chord on piano: ${notes}. See keyboard diagrams, explore inversions, hear the chord and practice finding its notes.`;
    suggested_intro = `${row.symbol}, also called ${root} major seventh, contains ${notes}. Use the piano diagram to find the notes, hear the chord and explore its inversions.`;
  } else if (row.family === 'minor7') {
    suggested_description = `Learn the ${row.symbol} chord on piano: ${notes}. See keyboard diagrams, explore inversions, hear the chord and practice finding its notes.`;
    suggested_intro = `${row.symbol}, also called ${root} minor seventh, contains ${notes}. Use the piano diagram to find the notes, hear the chord and explore its inversions.`;
  } else if (row.family === 'halfDiminished7') {
    suggested_description = `Learn the ${label.replace(/ Chord$/, '')} on piano: ${notes}. See keyboard diagrams, explore inversions and hear the chord.`;
    suggested_intro = `${label.replace(/ Chord$/, '')} contains ${notes}. The compact symbol ${row.symbol} names the same chord. Use the piano diagram to find the notes, hear the chord and explore its inversions.`;
  } else if (row.family === 'sus2' || row.family === 'sus4') {
    const spoken = row.family === 'sus2' ? 'suspended second' : 'suspended fourth';
    suggested_description = `Learn the ${row.symbol} chord on piano: ${notes}. See keyboard diagrams, explore inversions, hear the chord and practice finding its notes.`;
    suggested_intro = `${row.symbol}, also called ${root} ${spoken}, contains ${notes}. Use the piano diagram to find the notes, hear the chord and explore its inversions.`;
  }
  const inCopy = Boolean(appliedCopy[row.url]);
  return {
    suggested_title,
    suggested_h1,
    suggested_description,
    suggested_intro,
    execution_state: inCopy ? 'APPLIED_LOCAL' : 'PROPOSED_NOT_APPLIED',
    applied: inCopy ? 'true' : 'false',
    reason: inCopy
      ? `Same chordId/symbol. Short label ${label} applied locally via CHORD_DETAIL_SEO_COPY and editorial mapping. Music name/notes/URL unchanged. Not committed or published. Seed proposed_display_label=${seed?.proposed_display_label || 'n/a'}.`
      : `Same chordId/symbol. Short label ${label} still meets the allow-list but is not in the generated copy map.`,
  };
}

const alignment = details.sort((a, b) => a.url.localeCompare(b.url)).map((row) => {
  const explicit = seoCopyUrls.has(row.url) ? seoTitle(row.url) : null;
  const generated = appliedCopy[row.url] || null;
  const override = (explicit && (explicit.title || explicit.h1)) ? explicit : generated;
  const current_title = brandTitle(override?.title || row.pack_title);
  const current_h1 = override?.h1 || row.pack_h1;
  const current_description = applyDescriptionFix(override?.description || row.pack_description);
  const current_intro = override?.intro || row.pack_intro;
  const q = bestQueries(row.url);
  const issues = classify(row);
  const prop = proposal(row, issues);
  const metadata_source = explicit && (explicit.title || explicit.h1)
    ? 'seo-editorial.ts SEO_COPY'
    : generated
      ? 'chord-detail-seo-copy.ts + editorialMetadata'
      : `${row.source_file} pack seo`;
  const h1_source = (explicit && explicit.h1)
    ? 'seo-editorial.ts h1'
    : generated?.h1
      ? 'chord-detail-seo-copy.ts h1'
      : `${row.source_file} seo.h1/h1`;
  const b7PianoAliases = row.url === '/chords/b-7'
    ? q.rows.filter((item) => pianoQuery(item.query) && item.query !== 'b7 chord piano').map((item) => `${item.query}=${item.volume}@${item.observation_date}`).join('; ')
    : '';
  const suggestedSections = prop.suggested_h1 && row.url === '/chords/b-7'
    ? {
      suggested_keyboard_h2: 'B7 piano notes and keyboard diagram',
      suggested_formula_h2: 'How is the B7 chord built?',
      suggested_inversions_h2: 'B7 inversions',
      suggested_practice_h2: 'Build B7 on the keyboard',
      suggested_faq_q: 'What is a B7 chord?',
      suggested_faq_a: 'B7 is a B dominant seventh chord, made up of B, D♯, F♯ and A.',
      suggested_keyboard_help: 'For root position, play B, D♯, F♯ and A from low to high. Switch positions to compare inversions, or play the notes one at a time.',
      suggested_fingering: 'Fingerings are not included on this page. The diagram shows note positions, not a prescribed hand shape.',
    }
    : {
      suggested_keyboard_h2: '',
      suggested_formula_h2: '',
      suggested_inversions_h2: '',
      suggested_practice_h2: '',
      suggested_faq_q: '',
      suggested_faq_a: '',
      suggested_keyboard_help: '',
      suggested_fingering: issues.includes('COPY_ENGINEERING_FINGERING') ? 'Fingerings are not included on this page. The diagram shows note positions, not a prescribed hand shape.' : '',
    };
  return {
    url: row.url,
    chord_id: row.chord_id,
    family: row.family,
    formal_name: row.formal_name,
    symbol: row.symbol,
    current_title,
    current_h1,
    current_description,
    current_intro,
    metadata_source,
    h1_source,
    upstream_protected: UPSTREAM.has(row.url) ? 'true' : 'false',
    generic_query: q.generic?.query || '',
    generic_volume: q.generic ? q.generic.volume : '',
    piano_query: q.piano?.query || '',
    piano_volume: q.piano ? q.piano.volume : '',
    query_source: q.generic?.source || q.piano?.source || '',
    query_date: q.generic?.observation_date || q.piano?.observation_date || '',
    related_piano_queries: b7PianoAliases,
    intent_fit: 'UNCHECKED',
    issue_type: issues.join('|'),
    suggested_title: prop.suggested_title,
    suggested_h1: prop.suggested_h1,
    suggested_description: prop.suggested_description,
    suggested_intro: prop.suggested_intro,
    breadcrumb_current: (explicit?.h1 || generated?.h1 || row.formal_name),
    family_card_current: (explicit?.h1 || generated?.h1 || row.formal_name),
    current_theory: row.theory || '',
    current_fingering_reason: row.fingering_reason || '',
    ...suggestedSections,
    reason: prop.reason,
    execution_state: prop.execution_state,
    applied: prop.applied,
    article_case_bug: articleBug(row.theory) || articleBug(row.pack_description) ? 'true' : 'false',
    engineering_fingering_copy: /independently authorized fingering dataset/i.test(row.fingering_reason) ? 'true' : 'false',
    in_seed_72: seedByUrl.has(row.url) ? 'true' : 'false',
    pdf_exists: row.pdf ? 'true' : 'false',
    sound: row.sound ? 'true' : 'false',
    fingering_verified: row.fingering ? 'true' : 'false',
  };
});

const columns = ['url', 'chord_id', 'family', 'formal_name', 'symbol', 'current_title', 'current_h1', 'current_description', 'current_intro', 'metadata_source', 'h1_source', 'upstream_protected', 'generic_query', 'generic_volume', 'piano_query', 'piano_volume', 'query_source', 'query_date', 'related_piano_queries', 'intent_fit', 'issue_type', 'suggested_title', 'suggested_h1', 'suggested_description', 'suggested_intro', 'breadcrumb_current', 'family_card_current', 'current_theory', 'current_fingering_reason', 'suggested_keyboard_h2', 'suggested_formula_h2', 'suggested_inversions_h2', 'suggested_practice_h2', 'suggested_faq_q', 'suggested_faq_a', 'suggested_keyboard_help', 'suggested_fingering', 'reason', 'execution_state', 'applied', 'article_case_bug', 'engineering_fingering_copy', 'in_seed_72', 'pdf_exists', 'sound', 'fingering_verified'];
writeCsv('CHORD_TDH_ALIGNMENT.csv', columns, alignment);

const counts = {
  scanned: alignment.length,
  registry_details: detailUrls.length,
  SAME_ENTITY_LABEL_ALIGNMENT: alignment.filter((r) => r.issue_type.includes('SAME_ENTITY_LABEL_ALIGNMENT')).length,
  ALREADY_CLEAR: alignment.filter((r) => r.issue_type.split('|').includes('ALREADY_CLEAR')).length,
  UPSTREAM_PROTECTED: alignment.filter((r) => r.upstream_protected === 'true').length,
  CONTENT_REVIEW: alignment.filter((r) => r.issue_type.includes('CONTENT_REVIEW')).length,
  proposed_title: alignment.filter((r) => r.suggested_title).length,
  proposed_h1: alignment.filter((r) => r.suggested_h1).length,
  proposed_description: alignment.filter((r) => r.suggested_description).length,
  APPLIED_LOCAL: alignment.filter((r) => r.execution_state === 'APPLIED_LOCAL').length,
  HOLD_PRODUCT_REVIEW: alignment.filter((r) => r.execution_state === 'HOLD_PRODUCT_REVIEW').length,
  NO_TDH_CHANGE: alignment.filter((r) => r.execution_state === 'NO_TDH_CHANGE').length,
  applied: alignment.filter((r) => r.applied === 'true').length,
  article_bugs: alignment.filter((r) => r.article_case_bug === 'true').length,
  engineering_fingering: alignment.filter((r) => r.engineering_fingering_copy === 'true').length,
  seed72_in_registry: seed72.filter((r) => detailUrls.includes(r.url)).length,
};
writeFileSync(resolve(outDir, '_counts.json'), JSON.stringify(counts, null, 2) + '\n');
if (alignment.length !== detailUrls.length) throw new Error('CSV row count != registry details');
console.log(JSON.stringify(counts, null, 2));
