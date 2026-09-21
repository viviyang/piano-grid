import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18/tdh-alignment-2026-09-19');
const wantHtml = process.argv.includes('--html');
const base = process.env.PIANO_BASE_URL || '';

const FAMILY = ['/chords/major', '/chords/minor', '/chords/diminished', '/chords/augmented', '/chords/suspended', '/chords/seventh', '/chords/add', '/chords/extended', '/chords/altered'];
const STRUCTURE = ['/chords', '/chords/by-key', '/chords/finder', '/chord-progressions'];
const HOLD = ['/chords/d-flat-m7-flat5', '/chords/f-sharp-madd9', '/chords/a-flat-madd9', '/chords/b-flat-madd9', '/chords/d-flat-madd9'];
const PROTECTED_DETAILS = {
  '/chords/b-minor': { title: 'B Minor Chord – Piano Notes, Fingering & Inversions | PianoGrid', h1: 'B Minor Chord' },
  '/chords/d-minor': { title: 'D Minor Chord – Piano Notes, Fingering & Inversions | PianoGrid', h1: 'D Minor Chord' },
  '/chords/e-minor': { title: 'E Minor Chord – Piano Notes, Fingering & Inversions | PianoGrid', h1: 'E Minor Chord' },
  '/chords/g-minor': { title: 'G Minor Chord – Piano Notes, Fingering & Inversions | PianoGrid', h1: 'G Minor Chord' },
};
const PROTECTED_OTHER = {
  '/keyboard-notes/labeled': { title: 'Piano Keyboard Keys Labeled – Note Names & Layout | PianoGrid', h1: 'Piano Keyboard Keys Labeled' },
  '/songs': { title: 'Piano Songs to Learn – Browse by Difficulty & Style | PianoGrid', h1: 'Piano Songs to Learn' },
  '/songs/easy': { title: 'Easy Piano Songs for Beginners – Songs to Learn | PianoGrid', h1: 'Easy Piano Songs for Beginners' },
  '/guide/read-sheet-music': { title: 'How to Read Sheet Music for Piano – Beginner Guide | PianoGrid', h1: 'How to Read Sheet Music for Piano' },
};

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

function publicRoutesFrom(source) {
  const block = source.match(/export const PUBLIC_ROUTES = \[([\s\S]*?)\] as const/);
  if (!block) throw new Error('PUBLIC_ROUTES not found');
  return [...block[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
}

function loadAppliedCopy() {
  const src = readFileSync(resolve(root, 'src/lib/chord-detail-seo-copy.ts'), 'utf8');
  const start = src.indexOf('export const CHORD_DETAIL_SEO_COPY');
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

function decode(value) {
  return String(value || '')
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&#39;', "'")
    .replaceAll('&nbsp;', ' ')
    .replaceAll('&#9839;', '♯')
    .replaceAll('&#9837;', '♭')
    .replaceAll('&sharp;', '♯')
    .replaceAll('&flat;', '♭');
}

function parseHtml(html) {
  const title = decode((html.match(/<title>([^<]*)<\/title>/i) || [])[1] || '');
  const description = decode((html.match(/<meta\s+name="description"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="description"/i) || [])[1] || '');
  const robots = decode((html.match(/<meta\s+name="robots"\s+content="([^"]*)"/i) || html.match(/<meta\s+content="([^"]*)"\s+name="robots"/i) || [])[1] || '');
  const canonical = decode((html.match(/<link\s+rel="canonical"\s+href="([^"]*)"/i) || html.match(/<link\s+href="([^"]*)"\s+rel="canonical"/i) || [])[1] || '');
  const h1Raw = (html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
  const h1 = decode(h1Raw.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  const introRaw = (html.match(/<p class="am-direct-answer">([\s\S]*?)<\/p>/i) || [])[1] || '';
  const intro = decode(introRaw.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim());
  return { title, description, robots, canonical, h1, intro };
}

function brandTitle(title) {
  if (!title) return '';
  return title.includes('PianoGrid') || title.length > 52 ? title : `${title} | PianoGrid`;
}

const results = [];
function test(name, fn) {
  try {
    fn();
    results.push({ name, passed: true });
  } catch (error) {
    results.push({ name, passed: false, detail: error.message });
  }
}

const siteRoutes = readFileSync(resolve(root, 'src/lib/site-routes.ts'), 'utf8');
const publicRoutes = publicRoutesFrom(siteRoutes);
const detailUrls = publicRoutes.filter((url) => url.startsWith('/chords/') && !FAMILY.includes(url) && !STRUCTURE.includes(url));
const moduleUrls = publicRoutes.filter((url) => url === '/chords' || url === '/chord-progressions' || url.startsWith('/chords/'));
const appliedCopy = loadAppliedCopy();
const alignment = parseCsv(readFileSync(resolve(outDir, 'CHORD_TDH_ALIGNMENT.csv'), 'utf8'));
const seoSource = readFileSync(resolve(root, 'src/lib/seo-editorial.ts'), 'utf8');
const b7Copy = appliedCopy['/chords/b-7'];

test('registry still 145 details', () => {
  if (detailUrls.length !== 145) throw new Error(String(detailUrls.length));
});
test('module still 158 URLs', () => {
  if (moduleUrls.length !== 158) throw new Error(`${moduleUrls.length}: ${moduleUrls.filter((url) => !detailUrls.includes(url) && !FAMILY.includes(url) && !STRUCTURE.includes(url)).join(',')}`);
});
test('public routes still 206', () => {
  if (publicRoutes.length !== 206) throw new Error(String(publicRoutes.length));
});
test('applied copy count 71', () => {
  if (Object.keys(appliedCopy).length !== 71) throw new Error(String(Object.keys(appliedCopy).length));
});
test('hold pages are not in applied copy', () => {
  for (const url of HOLD) {
    if (url in appliedCopy) throw new Error(url);
  }
});
test('protected details are not in applied copy', () => {
  for (const url of Object.keys(PROTECTED_DETAILS)) {
    if (url in appliedCopy) throw new Error(url);
  }
});
test('CSV has 145 rows', () => {
  if (alignment.length !== 145) throw new Error(String(alignment.length));
});
test('CSV applied 71', () => {
  const applied = alignment.filter((row) => row.applied === 'true');
  if (applied.length !== 71) throw new Error(String(applied.length));
});
test('CSV unique current titles', () => {
  const titles = alignment.map((row) => row.current_title);
  if (new Set(titles).size !== 145) throw new Error(`unique=${new Set(titles).size}`);
});
test('intent_fit stays UNCHECKED', () => {
  if (alignment.some((row) => row.intent_fit !== 'UNCHECKED')) throw new Error('intent_fit changed');
});
test('B7 generated copy', () => {
  if (b7Copy.title !== 'B7 Chord: Piano Notes, Inversions & Sound') throw new Error(b7Copy.title);
  if (b7Copy.h1 !== 'B7 Chord') throw new Error(b7Copy.h1);
  if (b7Copy.description !== 'Learn the B7 chord on piano: B, D♯, F♯ and A. See keyboard diagrams, explore all three inversions, hear the chord and practice finding its notes.') throw new Error(b7Copy.description);
  if (b7Copy.intro !== 'B7, also called B dominant seventh, contains B, D♯, F♯ and A. Use the piano diagram to find the notes, hear the chord and explore its three inversions.') throw new Error(b7Copy.intro);
});
test('B7 branded title length rule', () => {
  const branded = brandTitle(b7Copy.title);
  if (branded !== 'B7 Chord: Piano Notes, Inversions & Sound | PianoGrid') throw new Error(branded);
});
const b7Row = alignment.find((row) => row.url === '/chords/b-7');
test('B7 CSV current fields', () => {
  if (!b7Row) throw new Error('missing row');
  if (b7Row.current_title !== 'B7 Chord: Piano Notes, Inversions & Sound | PianoGrid') throw new Error(b7Row.current_title);
  if (b7Row.current_h1 !== 'B7 Chord') throw new Error(b7Row.current_h1);
  if (b7Row.current_description !== b7Copy.description) throw new Error(b7Row.current_description);
  if (b7Row.current_intro !== b7Copy.intro) throw new Error(b7Row.current_intro);
  if (b7Row.applied !== 'true') throw new Error(b7Row.applied);
  if (b7Row.symbol !== 'B7' || b7Row.formal_name !== 'B Dominant Seventh') throw new Error(`${b7Row.symbol}|${b7Row.formal_name}`);
});
test('applied rows match generated copy', () => {
  for (const row of alignment.filter((item) => item.applied === 'true')) {
    const copy = appliedCopy[row.url];
    if (!copy) throw new Error(`missing copy ${row.url}`);
    if (row.current_h1 !== copy.h1) throw new Error(`${row.url} h1 ${row.current_h1}`);
    if (row.current_title !== brandTitle(copy.title)) throw new Error(`${row.url} title ${row.current_title}`);
    if (copy.intro && row.current_intro !== copy.intro && row.url !== '/chords/a-m7') throw new Error(`${row.url} intro`);
  }
});
test('HOLD H1 still pack-style', () => {
  const row = alignment.find((item) => item.url === '/chords/d-flat-m7-flat5');
  if (!row) throw new Error('missing hold row');
  if (row.applied !== 'false') throw new Error(row.applied);
  if (!row.current_h1.includes('Half-Diminished Seventh Piano Chord')) throw new Error(row.current_h1);
});
test('protected detail CSV fields', () => {
  for (const [url, expected] of Object.entries(PROTECTED_DETAILS)) {
    const row = alignment.find((item) => item.url === url);
    if (!row) throw new Error(url);
    if (row.applied !== 'false') throw new Error(`${url} applied`);
    if (row.current_title !== expected.title) throw new Error(`${url} ${row.current_title}`);
    if (row.current_h1 !== expected.h1) throw new Error(`${url} ${row.current_h1}`);
  }
});
test('protected other pages remain in seo-editorial', () => {
  for (const [url, expected] of Object.entries(PROTECTED_OTHER)) {
    if (!seoSource.includes(`title: '${expected.title}'`)) throw new Error(`${url} title`);
    if (!seoSource.includes(`h1: '${expected.h1}'`)) throw new Error(`${url} h1`);
  }
});
test('CHORD_DETAIL_SEO_COPY is spread before protected keys', () => {
  const spread = seoSource.indexOf('...CHORD_DETAIL_SEO_COPY');
  const bMinor = seoSource.indexOf("'/chords/b-minor':");
  if (spread < 0 || bMinor < 0 || spread > bMinor) throw new Error('spread order');
});

const baselineShow = spawnSync('git', ['show', 'e00ae6e:src/lib/site-routes.ts'], { cwd: root, encoding: 'utf8' });
test('baseline site-routes readable', () => {
  if (baselineShow.status !== 0) throw new Error(baselineShow.stderr || 'git show failed');
});
const baselineRoutes = publicRoutesFrom(baselineShow.stdout);
const added = publicRoutes.filter((url) => !baselineRoutes.includes(url));
const removed = baselineRoutes.filter((url) => !publicRoutes.includes(url));
test('public route set unchanged vs merge e00ae6e', () => {
  if (added.length || removed.length) throw new Error(`added=${added.join(',')} removed=${removed.join(',')}`);
});
const baselineModule = baselineRoutes.filter((url) => url === '/chords' || url === '/chord-progressions' || url.startsWith('/chords/'));
const moduleAdded = moduleUrls.filter((url) => !baselineModule.includes(url));
const moduleRemoved = baselineModule.filter((url) => !moduleUrls.includes(url));
test('chord module 158 set unchanged vs merge e00ae6e', () => {
  if (moduleAdded.length || moduleRemoved.length) throw new Error(`added=${moduleAdded.join(',')} removed=${moduleRemoved.join(',')}`);
});

const identities = {
  '/chords/b-7': 'B7',
  '/chords/b-maj7': 'Bmaj7',
  '/chords/b-m7': 'Bm7',
  '/chords/b-m7-flat5': 'Bm7♭5',
  '/chords/b-minor': 'Bm',
  '/chords/b-flat-7': 'B♭7',
  '/chords/c-sus2': 'Csus2',
  '/chords/c-sus4': 'Csus4',
  '/chords/c-madd9': 'Cm(add9)',
  '/chords/c-maj7': 'Cmaj7',
  '/chords/c-m7': 'Cm7',
};
test('distinct chord identities in CSV', () => {
  const seen = new Set();
  for (const [url, symbol] of Object.entries(identities)) {
    const row = alignment.find((item) => item.url === url);
    if (!row) throw new Error(`missing ${url}`);
    if (row.symbol !== symbol) throw new Error(`${url} ${row.symbol}`);
    if (seen.has(row.symbol)) throw new Error(`duplicate ${row.symbol}`);
    seen.add(row.symbol);
  }
});

let htmlRows = [];
if (wantHtml) {
  if (!base) throw new Error('--html requires PIANO_BASE_URL');
  const fetchUrls = [...detailUrls, ...FAMILY, ...STRUCTURE, ...Object.keys(PROTECTED_OTHER)];
  for (const url of fetchUrls) {
    const response = await fetch(base + url, { redirect: 'manual' });
    const html = await response.text();
    const parsed = parseHtml(html);
    htmlRows.push({ url, status: response.status, ...parsed });
    test(`HTML ${url} 200`, () => {
      if (response.status !== 200) throw new Error(String(response.status));
    });
    test(`HTML ${url} index,follow`, () => {
      const robots = parsed.robots.toLowerCase();
      if (!robots.includes('index') || !robots.includes('follow') || robots.includes('noindex') || robots.includes('nofollow')) {
        throw new Error(parsed.robots);
      }
    });
    test(`HTML ${url} self-canonical`, () => {
      const expected = `https://pianogrid.com${url}`;
      if (parsed.canonical !== expected) throw new Error(parsed.canonical);
    });
  }
  const byUrl = new Map(htmlRows.map((row) => [row.url, row]));
  test('HTML 145 unique titles', () => {
    const titles = detailUrls.map((url) => byUrl.get(url).title);
    if (new Set(titles).size !== 145) throw new Error(String(new Set(titles).size));
  });
  for (const row of alignment) {
    const html = byUrl.get(row.url);
    test(`HTML ${row.url} rendered fields`, () => {
      if (!html?.title || !html.h1 || !html.description) throw new Error('empty title/h1/description');
      if (row.applied === 'true') {
        const copy = appliedCopy[row.url];
        if (!copy) throw new Error('missing copy');
        if (html.title !== brandTitle(copy.title)) throw new Error(`title ${html.title}`);
        if (html.h1 !== copy.h1) throw new Error(`h1 ${html.h1}`);
        if (html.description !== copy.description) throw new Error(`description ${html.description}`);
        if (copy.intro && html.intro !== copy.intro) throw new Error(`intro ${html.intro}`);
      }
      const protectedCopy = PROTECTED_DETAILS[row.url];
      if (protectedCopy) {
        if (html.title !== protectedCopy.title) throw new Error(html.title);
        if (html.h1 !== protectedCopy.h1) throw new Error(html.h1);
      }
    });
    row.current_title = html.title;
    row.current_h1 = html.h1;
    row.current_description = html.description;
    if (html.intro) row.current_intro = html.intro;
    row.metadata_source = row.applied === 'true'
      ? 'local production HTML + chord-detail-seo-copy.ts'
      : (PROTECTED_DETAILS[row.url] ? 'local production HTML + seo-editorial.ts' : 'local production HTML');
    row.h1_source = 'local production HTML h1';
  }
  const csvColumns = ['url', 'chord_id', 'family', 'formal_name', 'symbol', 'current_title', 'current_h1', 'current_description', 'current_intro', 'metadata_source', 'h1_source', 'upstream_protected', 'generic_query', 'generic_volume', 'piano_query', 'piano_volume', 'query_source', 'query_date', 'related_piano_queries', 'intent_fit', 'issue_type', 'suggested_title', 'suggested_h1', 'suggested_description', 'suggested_intro', 'breadcrumb_current', 'family_card_current', 'current_theory', 'current_fingering_reason', 'suggested_keyboard_h2', 'suggested_formula_h2', 'suggested_inversions_h2', 'suggested_practice_h2', 'suggested_faq_q', 'suggested_faq_a', 'suggested_keyboard_help', 'suggested_fingering', 'reason', 'execution_state', 'applied', 'article_case_bug', 'engineering_fingering_copy', 'in_seed_72', 'pdf_exists', 'sound', 'fingering_verified'];
  const csvEscape = (value) => {
    const text = value == null ? '' : String(value);
    return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
  };
  writeFileSync(resolve(outDir, 'CHORD_TDH_ALIGNMENT.csv'), [csvColumns.join(','), ...alignment.map((row) => csvColumns.map((column) => csvEscape(row[column])).join(','))].join('\n') + '\n');
  for (const [url, expected] of Object.entries(PROTECTED_OTHER)) {
    const html = byUrl.get(url);
    test(`HTML protected ${url}`, () => {
      if (html.title !== expected.title) throw new Error(html.title);
      if (html.h1 !== expected.h1) throw new Error(html.h1);
    });
  }
  const hold = byUrl.get('/chords/d-flat-m7-flat5');
  test('HTML HOLD is not short-label rewritten', () => {
    if (hold.h1 === 'D♭m7♭5 Chord' || hold.h1.startsWith('D♭ Half-Diminished Chord')) throw new Error(hold.h1);
    if (!hold.h1.includes('Half-Diminished Seventh Piano Chord')) throw new Error(hold.h1);
  });
  test('family/structure H1 is not a Task 11 detail label', () => {
    for (const url of [...FAMILY, ...STRUCTURE]) {
      const html = byUrl.get(url);
      if (/^(B7|Cmaj7|Cm7|Csus2) Chord$/.test(html.h1)) throw new Error(`${url} ${html.h1}`);
    }
  });
}

const failed = results.filter((item) => !item.passed);
const report = {
  ok: failed.length === 0,
  html: wantHtml,
  public_routes: publicRoutes.length,
  module_urls: moduleUrls.length,
  details: detailUrls.length,
  applied: Object.keys(appliedCopy).length,
  csv_applied: alignment.filter((row) => row.applied === 'true').length,
  b7: b7Row ? { title: b7Row.current_title, h1: b7Row.current_h1 } : null,
  route_diff: { added, removed, moduleAdded, moduleRemoved },
  results,
};
writeFileSync(resolve(outDir, '_render_check.json'), JSON.stringify(report, null, 2) + '\n');
if (failed.length) {
  console.error(failed);
  process.exit(1);
}
console.log(JSON.stringify({
  ok: true,
  details: detailUrls.length,
  applied: Object.keys(appliedCopy).length,
  html: wantHtml,
  b7: report.b7,
}, null, 2));
