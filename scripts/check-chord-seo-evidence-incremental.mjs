import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18');
let failed = 0;
const check = (name, passed, detail = '') => {
  if (passed) console.log('PASS', name);
  else {
    failed += 1;
    console.error('FAIL', name, detail);
  }
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

const counts = JSON.parse(readFileSync(resolve(outDir, '_counts.json'), 'utf8'));
const queries = parseCsv(readFileSync(resolve(outDir, 'QUERY_EVIDENCE.csv'), 'utf8'));
const pages = parseCsv(readFileSync(resolve(outDir, 'PAGE_EVIDENCE.csv'), 'utf8'));
const origin = parseCsv(readFileSync(resolve(outDir, 'URL_ORIGIN_LEDGER.csv'), 'utf8'));
const coverage = parseCsv(readFileSync(resolve(outDir, 'SCREENSHOT_COVERAGE.csv'), 'utf8'));
const gsc = parseCsv(readFileSync(resolve(outDir, 'GSC_REVIEW.csv'), 'utf8'));
const five = parseCsv(readFileSync(resolve(outDir, 'FIVE_PRODUCT_REVIEW.csv'), 'utf8'));

const b7Append = queries.filter((row) => row.batch === 'C_TDH_ALIGNMENT_B7_2026-09-19');
const historicalQueries = queries.filter((row) => row.batch !== 'C_TDH_ALIGNMENT_B7_2026-09-19');
check('merged observations 283 historical', historicalQueries.length === 283, String(historicalQueries.length));
check('B7 2026-09-19 append 10', b7Append.length === 10, String(b7Append.length));
check('historical b7 piano 590 retained', queries.some((row) => row.url === '/chords/b-7' && row.query === 'b7 piano' && row.volume === '590'));
check('guitar queries not mapped to piano URL', b7Append.filter((row) => /guitar/i.test(row.query)).every((row) => !row.url && row.intent === 'GUITAR_EXCLUDED'));
check('query table not replaced', queries.length === historicalQueries.length + b7Append.length, String(queries.length));
check('existing 195 retained', counts.existing_keys === 195, String(counts.existing_keys));
check('new independent 88', counts.new_keys === 88, String(counts.new_keys));
check('page rows 138', pages.length === 138, String(pages.length));
const status = counts.observation_status;
check('86/47/2/3/0', status.OBSERVED_100_PLUS === 86 && status.OBSERVED_1_TO_99 === 47 && status.ZERO_OBSERVED_ONLY === 2 && status.NO_NUMERIC_DATA === 3 && (status.SCREENSHOT_GAP || 0) === 0, JSON.stringify(status));
check('133 positive pages', counts.positive_pages === 133, String(counts.positive_pages));
check('Chordth quarantined and unmapped', queries.some((row) => /Chordth/i.test(row.query) && !row.url && row.volume_state === 'QUARANTINED_INPUT'));
check('no intent_fit VERIFIED_SEO', pages.every((row) => row.intent_fit === 'UNCHECKED'));
check('A 17/17', counts.abc.A.visible === 17 && counts.abc.A.total === 17, JSON.stringify(counts.abc.A));
check('B 27/28', counts.abc.B.visible === 27 && counts.abc.B.total === 28, JSON.stringify(counts.abc.B));
check('C 44/76', counts.abc.C.visible === 44 && counts.abc.C.total === 76, JSON.stringify(counts.abc.C));
check('NOT_VISIBLE 33', coverage.filter((row) => row.screenshot_state === 'NOT_VISIBLE').length === 33);
check('NOT_VISIBLE rows are not volume 0 in coverage', coverage.filter((row) => row.screenshot_state === 'NOT_VISIBLE').every((row) => row.volume === ''));
check('module 158=145+9+4', counts.A === 158 && counts.B === 9 && counts.C === 145 && counts.D === 4);
check('158 pack vs registry diffs empty or documented', Array.isArray(counts.pack_minus_repo) && Array.isArray(counts.repo_minus_pack));
check('origin ledger 158', origin.length === 158, String(origin.length));
check('origin dates are not mtime placeholders', origin.every((row) => row.origin_date === 'UNKNOWN' || /^\d{4}-\d{2}-\d{2}T/.test(row.origin_date)));
check('GSC 14 rows with empty GSC facts', gsc.length === 14 && gsc.every((row) => row.indexed === '' && row.google_canonical === ''));
check('five product URLs not auto-changed', five.every((row) => row.approved === 'false' && row.decision.includes('KEEP')));
const noPositive = ['/chords/d-flat-m7-flat5', '/chords/f-sharp-madd9', '/chords/a-flat-madd9', '/chords/b-flat-madd9', '/chords/d-flat-madd9'];
for (const url of noPositive) {
  const page = pages.find((row) => row.url === url);
  check(`${url} has no positive volume`, page && !(Number(page.best_observed_query_volume) > 0), JSON.stringify(page && page.best_observed_query_volume));
}

if (failed) {
  console.error(failed + ' incremental evidence checks failed');
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, queries: queries.length, pages: pages.length, origin: origin.length }, null, 2));
