import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const evidenceDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18');
const outDir = resolve(evidenceDir, 'tdh-alignment-2026-09-19');
mkdirSync(outDir, { recursive: true });
const queryPath = resolve(evidenceDir, 'QUERY_EVIDENCE.csv');
const BATCH = 'C_TDH_ALIGNMENT_B7_2026-09-19';
const SOURCE = 'c39ac412-1136-4fe2-a36f-3220b0047b50.png';
const DATE = '2026-09-19';
const MARKET = 'US (Semrush; user screenshot 2026-09-19)';
const RECORDED = '2026-09-19T10:00:00.000Z';

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
  return { header, rows: rows.filter((item) => item.some((value) => value !== '')).map((item) => {
    const out = {};
    header.forEach((key, index) => { out[key] = item[index] ?? ''; });
    return out;
  }) };
}
function csvEscape(value) {
  const text = value == null ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}
function keyOf(row) {
  return [row.observation_date, row.batch, row.query, row.source].join('\u0001');
}

const observations = [
  { url: '/chords/b-7', query: 'b7 chord', volume: '9900', kd: '27', intent: '', notes: 'Generic query from 2026-09-19 Semrush US screenshot. Not all demand is piano. Do not sum with aliases. Independent of 2026-09-17 same query/volume row (different date+batch).' },
  { url: '/chords/b-7', query: 'b7 chord in piano', volume: '1600', kd: '19', intent: '', notes: 'Piano-expressed query kept verbatim. Not used as Title wording. Not the same query as b7 chord piano or b7 piano.' },
  { url: '/chords/b-7', query: 'b7 chord piano', volume: '1300', kd: '18', intent: '', notes: 'Explicit piano query named in the 2026-09-19 alignment brief. Not the same query as b7 piano=590 or b7 chord in piano=1600.' },
  { url: '', query: 'b7 guitar chord', volume: '8100', kd: '27', intent: 'GUITAR_EXCLUDED', notes: 'GUITAR_EXCLUDED. Do not map to piano demand or inherit this volume onto /chords/b-7 after rewriting guitar to piano.' },
  { url: '', query: 'b7 chord guitar', volume: '5400', kd: '32', intent: 'GUITAR_EXCLUDED', notes: 'GUITAR_EXCLUDED. Do not map to piano demand.' },
  { url: '', query: 'how to play a b7 chord on guitar', volume: '110', kd: '36', intent: 'GUITAR_EXCLUDED', notes: 'GUITAR_EXCLUDED. Do not map to piano demand.' },
  { url: '', query: 'how to play a b7 guitar chord', volume: '90', kd: '34', intent: 'GUITAR_EXCLUDED', notes: 'GUITAR_EXCLUDED. Do not map to piano demand.' },
  { url: '/chords/b-7', query: 'what is a b7 chord', volume: '70', kd: '31', intent: '', notes: 'Definition query. Pair with what is b7 chord in one FAQ/definition paragraph; do not create a second FAQ page.' },
  { url: '/chords/b-7', query: 'what is b7 chord', volume: '70', kd: '25', intent: '', notes: 'Same definition task as what is a b7 chord. One natural FAQ only. Do not invent a second page.' },
  { url: '', query: 'how to play b7 chord on guitar', volume: '40', kd: '27', intent: 'GUITAR_EXCLUDED', notes: 'GUITAR_EXCLUDED. Do not map to piano demand.' },
];

const parsed = parseCsv(readFileSync(queryPath, 'utf8'));
const existingKeys = new Set(parsed.rows.map(keyOf));
const historicalPiano = parsed.rows.filter((row) => row.url === '/chords/b-7' && row.query === 'b7 piano');
if (!historicalPiano.some((row) => row.volume === '590')) {
  throw new Error('Historical b7 piano = 590 missing; refuse to append over a damaged master table.');
}

const newRows = observations.map((item) => ({
  url: item.url,
  query: item.query,
  market: MARKET,
  observation_date: DATE,
  volume: item.volume,
  volume_state: 'NUMBER_POSITIVE',
  kd: item.kd,
  kd_state: 'NUMBER',
  intent: item.intent,
  serp: '',
  source: SOURCE,
  evidence: 'SCREENSHOT_DIRECT_USER_TRANSCRIPT',
  batch: BATCH,
  notes: `${item.notes} Screenshot filename provided by user; file not present in this worktree. Values transcribed from the prompt, not re-scraped. intent_fit stays UNCHECKED (no US Google TOP10).`,
  screenshot_state: 'FILENAME_PROVIDED_FILE_ABSENT',
  source_priority: 'USER_SEMRUSH_US_2026-09-19',
  recorded_at: RECORDED,
}));

const appended = [];
for (const row of newRows) {
  if (existingKeys.has(keyOf(row))) continue;
  parsed.rows.push(row);
  existingKeys.add(keyOf(row));
  appended.push(row);
}

const columns = parsed.header;
writeFileSync(queryPath, [columns.join(','), ...parsed.rows.map((row) => columns.map((column) => csvEscape(row[column])).join(','))].join('\n') + '\n');

const sidecarColumns = [...columns, 'maps_to_piano_url', 'do_not_sum_with'];
writeFileSync(
  resolve(outDir, 'B7_SEMRUSH_US_2026-09-19.csv'),
  [sidecarColumns.join(','), ...newRows.map((row) => sidecarColumns.map((column) => {
    if (column === 'maps_to_piano_url') return csvEscape(row.intent === 'GUITAR_EXCLUDED' ? 'NO' : '/chords/b-7');
    if (column === 'do_not_sum_with') return csvEscape('Do not add 9900+1600+1300+590 or guitar volumes as one URL forecast.');
    return csvEscape(row[column]);
  }).join(','))].join('\n') + '\n',
);

const countsPath = resolve(evidenceDir, '_counts.json');
const counts = JSON.parse(readFileSync(countsPath, 'utf8'));
counts.query_rows = 283;
counts.query_rows_current = parsed.rows.length;
counts.b7_append_2026_09_19 = appended.length;
counts.b7_append_batch = BATCH;
counts.b7_historical_piano_590_retained = true;
writeFileSync(countsPath, JSON.stringify(counts, null, 2) + '\n');

console.log(JSON.stringify({
  historical_rows_kept: parsed.rows.length - appended.length,
  appended: appended.length,
  query_rows_current: parsed.rows.length,
  historical_b7_piano_590: true,
  screenshot_file_in_worktree: false,
}, null, 2));
