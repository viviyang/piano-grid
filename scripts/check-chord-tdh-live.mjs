import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18/tdh-alignment-2026-09-19');
const origin = process.env.PIANO_BASE_URL || 'https://pianogrid.com';
const checkedAt = new Date().toISOString();

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
  return { title, description, robots, canonical, h1 };
}

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

const csv = parseCsv(readFileSync(resolve(outDir, 'CHORD_TDH_ALIGNMENT.csv'), 'utf8'));
const byUrl = Object.fromEntries(csv.map((row) => [row.url, row]));
const PROTECTED = {
  '/chords/b-minor': { title: 'B Minor Chord – Piano Notes, Fingering & Inversions | PianoGrid', h1: 'B Minor Chord' },
  '/chords/d-minor': { title: 'D Minor Chord – Piano Notes, Fingering & Inversions | PianoGrid', h1: 'D Minor Chord' },
  '/chords/e-minor': { title: 'E Minor Chord – Piano Notes, Fingering & Inversions | PianoGrid', h1: 'E Minor Chord' },
  '/chords/g-minor': { title: 'G Minor Chord – Piano Notes, Fingering & Inversions | PianoGrid', h1: 'G Minor Chord' },
  '/keyboard-notes/labeled': { title: 'Piano Keyboard Keys Labeled – Note Names & Layout | PianoGrid', h1: 'Piano Keyboard Keys Labeled' },
  '/songs': { title: 'Piano Songs to Learn – Browse by Difficulty & Style | PianoGrid', h1: 'Piano Songs to Learn' },
  '/songs/easy': { title: 'Easy Piano Songs for Beginners – Songs to Learn | PianoGrid', h1: 'Easy Piano Songs for Beginners' },
  '/guide/read-sheet-music': { title: 'How to Read Sheet Music for Piano – Beginner Guide | PianoGrid', h1: 'How to Read Sheet Music for Piano' },
};
const urls = [
  '/chords/b-7',
  ...Object.keys(PROTECTED),
  '/chords',
  '/chords/c-maj7',
  '/chords/c-m7',
  '/chords/b-m7-flat5',
  '/chords/c-sus2',
  '/chords/c-sus4',
  '/chords/d-flat-7',
  '/chords/f-sharp-maj7',
  '/chords/seventh',
  '/chords/c-add9',
  '/chords/f-sharp-madd9',
  '/robots.txt',
];

const results = [];
function check(name, passed, detail) {
  results.push({ name, passed: Boolean(passed), detail: detail || '' });
  console.log(passed ? 'PASS' : 'FAIL', name, detail || '');
}

const pages = {};
for (const url of urls) {
  const response = await fetch(origin + url, { redirect: 'manual' });
  const html = await response.text();
  const headers = {
    'x-robots-tag': response.headers.get('x-robots-tag'),
    'content-type': response.headers.get('content-type'),
    'x-vercel-id': response.headers.get('x-vercel-id'),
    'x-vercel-cache': response.headers.get('x-vercel-cache'),
  };
  if (url === '/robots.txt') {
    pages[url] = { status: response.status, text: html.slice(0, 800), headers };
    check('robots.txt 200', response.status === 200, String(response.status));
    check('robots.txt sitemap line', html.includes('Sitemap: https://pianogrid.com/sitemap.xml'), html.slice(0, 240).replace(/\s+/g, ' '));
    continue;
  }
  const parsed = parseHtml(html);
  pages[url] = { status: response.status, ...parsed, headers };
  check(`${url} 200`, response.status === 200, String(response.status));
  check(`${url} robots index,follow`, /index/i.test(parsed.robots) && /follow/i.test(parsed.robots) && !/noindex/i.test(parsed.robots), parsed.robots);
  check(`${url} self-canonical`, parsed.canonical === `https://pianogrid.com${url}`, parsed.canonical);
}

const b7 = pages['/chords/b-7'];
check('B7 title', b7.title === 'B7 Chord: Piano Notes, Inversions & Sound | PianoGrid', b7.title);
check('B7 h1', b7.h1 === 'B7 Chord', b7.h1);
check('B7 description', b7.description === 'Learn the B7 chord on piano: B, D♯, F♯ and A. See keyboard diagrams, explore all three inversions, hear the chord and practice finding its notes.', b7.description);
check('B7 brand once', (b7.title.match(/PianoGrid/g) || []).length === 1, b7.title);

for (const [url, expected] of Object.entries(PROTECTED)) {
  check(`${url} protected title`, pages[url].title === expected.title, pages[url].title);
  check(`${url} protected h1`, pages[url].h1 === expected.h1, pages[url].h1);
}

const samples = ['/chords/c-maj7', '/chords/c-m7', '/chords/b-m7-flat5', '/chords/c-sus2', '/chords/c-sus4', '/chords/d-flat-7', '/chords/f-sharp-maj7'];
for (const url of samples) {
  const row = byUrl[url];
  check(`${url} live title matches applied CSV`, pages[url].title === row.current_title, `${pages[url].title} | csv=${row.current_title}`);
  check(`${url} live h1 matches applied CSV`, pages[url].h1 === row.current_h1, pages[url].h1);
  check(`${url} applied true`, row.applied === 'true', row.applied);
}

const seventh = pages['/chords/seventh'];
check('seventh family not B7 detail label', !/^(B7|Cmaj7|Cm7|Csus2) Chord$/.test(seventh.h1), seventh.h1);
check('seventh title still family', /Seventh Piano Chords/i.test(seventh.title), seventh.title);

const cadd9 = pages['/chords/c-add9'];
const cadd9row = byUrl['/chords/c-add9'];
check('c-add9 title matches CSV keep', cadd9.title === cadd9row.current_title, cadd9.title);
check('c-add9 h1 matches CSV keep', cadd9.h1 === cadd9row.current_h1, cadd9.h1);
check('c-add9 not applied', cadd9row.applied === 'false', cadd9row.applied);

const hold = pages['/chords/f-sharp-madd9'];
const holdRow = byUrl['/chords/f-sharp-madd9'];
check('f-sharp-madd9 not short-label rewritten', !/^F♯m\(add9\) Chord$/.test(hold.h1), hold.h1);
check('f-sharp-madd9 matches CSV keep', hold.title === holdRow.current_title && hold.h1 === holdRow.current_h1, hold.h1);
check('hub title present', Boolean(pages['/chords'].title && pages['/chords'].h1), `${pages['/chords'].title} | ${pages['/chords'].h1}`);

const sitemapRes = await fetch(`${origin}/sitemap.xml`, { redirect: 'manual' });
const sitemap = await sitemapRes.text();
const loc = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
const publicRoutes = publicRoutesFrom(readFileSync(resolve(root, 'src/lib/site-routes.ts'), 'utf8'));
const sitemapPaths = loc.map((item) => {
  const pathname = new URL(item).pathname.replace(/\/$/, '');
  return pathname || '/';
});
const missing = publicRoutes.filter((url) => !sitemapPaths.includes(url));
const extra = sitemapPaths.filter((url) => !publicRoutes.includes(url));
check('sitemap 200', sitemapRes.status === 200, String(sitemapRes.status));
check('sitemap URLs match PUBLIC_ROUTES', missing.length === 0 && extra.length === 0, `sitemap=${loc.length} routes=${publicRoutes.length} missing=${missing.join(',')} extra=${extra.join(',')}`);
check('sitemap includes b-7', loc.includes('https://pianogrid.com/chords/b-7'));
check('sitemap includes f-sharp-madd9', loc.includes('https://pianogrid.com/chords/f-sharp-madd9'));

const failed = results.filter((item) => !item.passed);
const report = {
  checkedAt,
  origin,
  deployment: {
    id: 'dpl_5T154PtaD8FjXUMPFpsQcdwwvhKP',
    url: 'https://piano-grid-8j1sen40z-weiweis-projects-eb330b65.vercel.app',
    git: 'bd3ba535378c1be6cca69f4afc5800e66331d0b7',
    branch: 'main',
  },
  ok: failed.length === 0,
  failed,
  results,
  pages,
  sitemap: { count: loc.length, publicRoutes: publicRoutes.length, missing, extra },
};
writeFileSync(resolve(outDir, '_live_verify.json'), JSON.stringify(report, null, 2) + '\n');
console.log(JSON.stringify({
  ok: report.ok,
  failed: failed.length,
  checks: results.length,
  sitemap: loc.length,
  missing: missing.length,
  extra: extra.length,
}, null, 2));
if (failed.length) process.exit(1);
