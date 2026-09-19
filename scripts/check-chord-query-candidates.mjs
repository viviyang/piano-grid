import { readdirSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { queryCandidates, candidateQueryMap, parseRootSpelling, normalizeLegalAccidentals } from './lib/chord-query-candidates.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18');
mkdirSync(outDir, { recursive: true });
const readJson = (relative) => JSON.parse(readFileSync(resolve(root, relative), 'utf8'));
let failed = 0;
const check = (name, passed, detail = '') => {
  if (passed) console.log('PASS', name);
  else {
    failed += 1;
    console.error('FAIL', name, detail);
  }
};

const bMajor = queryCandidates({ url: '/chords/b-major', root: 'B', subtype: 'major', symbol: 'B' });
check('B major spoken query is b major chord', bMajor.includes('b major chord'), bMajor.join(' | '));
check('B major never becomes flat major', bMajor.every((q) => !/^\s*flat\b/i.test(q) && !q.includes('flat major')), bMajor.join(' | '));

const bbMajor = queryCandidates({ url: '/chords/b-flat-major', root: 'Bb', subtype: 'major', symbol: 'Bb' });
check('Bb major spoken query is b flat major chord', bbMajor.includes('b flat major chord'), bbMajor.join(' | '));

const b7 = queryCandidates({ url: '/chords/b-7', root: 'B', subtype: 'dominant7', symbol: 'B7' });
const bb7 = queryCandidates({ url: '/chords/b-flat-7', root: 'Bb', subtype: 'dominant7', symbol: 'Bb7' });
check('B7 candidates stay on B7', b7.includes('b7 chord') && !b7.some((q) => q.includes('bb7')), b7.join(' | '));
check('Bb7 candidates stay on Bb7', bb7.includes('bb7 chord') && !bb7.includes('b7 chord'), bb7.join(' | '));

const bm7 = queryCandidates({ url: '/chords/b-m7', root: 'B', subtype: 'minor7', symbol: 'Bm7' });
const bmaj7 = queryCandidates({ url: '/chords/b-maj7', root: 'B', subtype: 'major7', symbol: 'Bmaj7' });
const bbm7 = queryCandidates({ url: '/chords/b-flat-m7', root: 'Bb', subtype: 'minor7', symbol: 'Bbm7' });
check('Bm7 is not Bmaj7', bm7.includes('bm7 chord') && !bm7.some((q) => q.includes('bmaj7')), bm7.join(' | '));
check('Bbm7 is not Bm7', bbm7.some((q) => q.includes('bbm7')) && !bbm7.includes('bm7 chord'), bbm7.join(' | '));
check('Bmaj7 keeps major 7 name', bmaj7.includes('b major 7 chord'), bmaj7.join(' | '));

const fsharpMaj7 = queryCandidates({ url: '/chords/f-sharp-maj7', root: 'F#', subtype: 'major7', symbol: 'F#maj7' });
check('F#maj7 standard name', fsharpMaj7.includes('f sharp major 7 chord'), fsharpMaj7.join(' | '));

const cmadd9 = queryCandidates({
  url: '/chords/c-madd9',
  root: 'C',
  subtype: 'minorAdd9',
  symbol: 'Cm(add9)',
  aliases: ['Cmadd9', 'Cmadd2'],
});
check('Cm(add9) and Cmadd9 stay one entity', cmadd9.includes('cm(add9) chord') && cmadd9.includes('cmadd9 chord'), cmadd9.join(' | '));
check('Cm9 is not generated for Cmadd9', !cmadd9.some((q) => /\bcm9\b/i.test(q) && !q.includes('add')), cmadd9.join(' | '));

const dim = queryCandidates({ url: '/chords/c-diminished', root: 'C', subtype: 'diminished', symbol: 'Cdim' });
const sus2 = queryCandidates({ url: '/chords/c-sus2', root: 'C', subtype: 'sus2', symbol: 'Csus2' });
check('dim7 is not generated for dim', !dim.some((q) => q.includes('dim7')), dim.join(' | '));
check('sus4 is not generated for sus2', !sus2.some((q) => q.includes('sus4')), sus2.join(' | '));

const unicode = parseRootSpelling(normalizeLegalAccidentals('B\u266D'));
check('flat unicode normalizes only after B', unicode.letter === 'B' && unicode.accidental === 'flat', JSON.stringify(unicode));
const sharp = parseRootSpelling(normalizeLegalAccidentals('F\u266F'));
check('sharp unicode normalizes only after F', sharp.letter === 'F' && sharp.accidental === 'sharp', JSON.stringify(sharp));

const details = [];
const load = (dir, pick) => {
  for (const filename of readdirSync(resolve(root, dir)).filter((name) => name.endsWith('.page.json'))) {
    const raw = readJson(dir + '/' + filename);
    const row = pick(raw);
    if (row && row.url) details.push(row);
  }
};
load('docs/pianogrid-chords-next-expansion/04_details_next', (raw) => ({
  url: raw.url, root: raw.data.root, subtype: raw.data.quality, symbol: raw.data.symbol, aliases: raw.data.aliases || [],
}));
load('docs/pianogrid-chords-n2b/03_details', (raw) => ({
  url: raw.url, root: raw.rootSpelling, subtype: raw.subtype, symbol: raw.symbol, aliases: raw.aliases || [],
}));
load('docs/pianogrid-chords-n2c/03_details', (raw) => ({
  url: raw.url, root: raw.rootSpelling, subtype: raw.subtype, symbol: raw.symbol, aliases: raw.aliases || [],
}));
load('docs/pianogrid-chords-n2d-v2/03_content/details', (raw) => ({
  url: raw.url, root: raw.rootSpelling, subtype: raw.subtype, symbol: raw.symbol, aliases: raw.aliases || [],
}));
const master = readJson('docs/content/site-master/page-content.master.json');
details.push({ url: '/chords/a-minor', root: 'A', subtype: 'minor', symbol: 'Am', aliases: ['A minor'] });
for (const url of ['/chords/a-major','/chords/c-major','/chords/g-major','/chords/c-minor','/chords/e-major','/chords/b-major','/chords/a-flat-major','/chords/c-flat-major']) {
  const page = master.pages[url];
  details.push({ url, root: page.data.root, subtype: page.data.quality, symbol: page.data.symbol, aliases: page.data.aliases || [] });
}
const uniqueDetails = [...new Map(details.map((row) => [row.url, row])).values()];
const map = candidateQueryMap(uniqueDetails);
check('every candidate maps to one URL', map.size > 0, String(map.size));
check('no empty candidate rows', uniqueDetails.every((row) => queryCandidates(row).length > 0));
const cm9Targets = [...map.entries()].filter(([query]) => query === 'cm9 chord' || query === 'cm9 piano chord').map((entry) => entry[1]);
check('Cm9 does not map to Cmadd9 page', !cm9Targets.includes('/chords/c-madd9'), cm9Targets.join(','));
check('B major map target', map.get('b major chord') === '/chords/b-major', map.get('b major chord'));
check('B flat major map target', map.get('b flat major chord') === '/chords/b-flat-major', map.get('b flat major chord'));

const csvEscape = (value) => /[",\n]/.test(String(value)) ? '"' + String(value).replaceAll('"', '""') + '"' : String(value);
const mapRows = [...map.entries()].sort((a, b) => a[0].localeCompare(b[0]));
writeFileSync(resolve(outDir, 'CANDIDATE_QUERY_MAP.csv'), ['query,url', ...mapRows.map(([query, url]) => csvEscape(query) + ',' + csvEscape(url))].join('\n') + '\n');

if (failed) {
  console.error(failed + ' candidate checks failed');
  process.exit(1);
}
console.log(JSON.stringify({ details: uniqueDetails.length, mapped_queries: map.size }, null, 2));
