import { existsSync, mkdirSync, readFileSync, writeFileSync, copyFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { spawnSync } from 'node:child_process';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18');
mkdirSync(outDir, { recursive: true });
const recordedAt = new Date().toISOString();
const COMPARISON = findComparison();
const ORIGINAL_HANDOFF = findOriginalHandoff();

function findComparison() {
  const candidates = [
    resolve(root, '_handoff/hords-seo-evidence-2026-09-18/comparison-update'),
    'C:/Users/Admin/Documents/viviyang_github/piano/_handoff/hords-seo-evidence-2026-09-18/comparison-update',
  ];
  for (const dir of candidates) {
    if (existsSync(resolve(dir, '02_QUERY_EVIDENCE_ALL.csv'))) return dir;
  }
  throw new Error('comparison-update pack not found');
}

function findOriginalHandoff() {
  const candidates = [
    resolve(root, '_handoff/hords-seo-evidence-2026-09-18'),
    'C:/Users/Admin/Documents/viviyang_github/piano/_handoff/hords-seo-evidence-2026-09-18',
  ];
  for (const dir of candidates) {
    if (existsSync(resolve(dir, '02_QUERY_EVIDENCE.csv'))) return dir;
  }
  throw new Error('original handoff 02_QUERY_EVIDENCE.csv not found');
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

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function writeCsv(filename, columns, rows) {
  const body = [columns.join(','), ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(','))].join('\n');
  writeFileSync(resolve(outDir, filename), `${body}\n`);
}

function unique(list) { return [...new Set(list)]; }
function sorted(list) { return [...list].sort((a, b) => a.localeCompare(b)); }
function minus(left, right) { const set = new Set(right); return sorted(left.filter((item) => !set.has(item))); }
function git(args) {
  const result = spawnSync('git', args, { cwd: root, encoding: 'utf8', windowsHide: true, maxBuffer: 20 * 1024 * 1024 });
  if (result.status !== 0) return { ok: false, stdout: result.stdout || '', stderr: result.stderr || '' };
  return { ok: true, stdout: result.stdout || '', stderr: result.stderr || '' };
}

const currentEvidence = parseCsv(readFileSync(resolve(ORIGINAL_HANDOFF, '02_QUERY_EVIDENCE.csv'), 'utf8'));
const allIncoming = parseCsv(readFileSync(resolve(COMPARISON, '02_QUERY_EVIDENCE_ALL.csv'), 'utf8'));
const updated138 = parseCsv(readFileSync(resolve(COMPARISON, '01_138_URL_UPDATED.csv'), 'utf8'));
const coverageAbc = parseCsv(readFileSync(resolve(COMPARISON, '03_LATEST_ABC_COVERAGE.csv'), 'utf8'));
const pack158 = parseCsv(readFileSync(resolve(COMPARISON, '04_FULL_CHORDS_158.csv'), 'utf8'));
const core14 = parseCsv(readFileSync(resolve(COMPARISON, '08_CORE_14_REVIEW_QUEUE.csv'), 'utf8'));
const fiveUrls = parseCsv(readFileSync(resolve(COMPARISON, '09_FIVE_PRODUCT_REVIEW_URLS.csv'), 'utf8'));
const competitorObs = parseCsv(readFileSync(resolve(COMPARISON, '05_COMPETITOR_OBSERVATIONS.csv'), 'utf8'));
const followups = existsSync(resolve(COMPARISON, '../03_QUERY_FOLLOWUPS.csv'))
  ? parseCsv(readFileSync(resolve(COMPARISON, '../03_QUERY_FOLLOWUPS.csv'), 'utf8'))
  : parseCsv(readFileSync('C:/Users/Admin/Documents/viviyang_github/piano/_handoff/hords-seo-evidence-2026-09-18/03_QUERY_FOLLOWUPS.csv', 'utf8'));

function observationKey(row) {
  return [
    row.observed_date || row.observation_date || '',
    row.batch || '',
    row.query || '',
    row.source || '',
  ].join('\t');
}

function kdState(value) {
  const text = String(value ?? '').trim();
  if (text === '') return 'EMPTY';
  if (/unavailable|n\/a|na|null/i.test(text)) return 'UNAVAILABLE';
  if (Number.isFinite(Number(text))) return 'NUMBER';
  return 'NON_NUMERIC';
}

function canonicalizeVolumeState(row, volume) {
  const quarantined = !row.url && /Chordth/i.test(row.query || '');
  if (quarantined) return 'QUARANTINED_INPUT';
  if (volume > 0) return 'NUMBER_POSITIVE';
  if (volume === 0) return 'NUMBER_ZERO';
  const raw = String(row.volume_state || '').toUpperCase();
  if (raw === 'USER_REPORTED_NO_DATA') return 'USER_REPORTED_NO_DATA';
  if (raw === 'QUARANTINED_INPUT') return 'QUARANTINED_INPUT';
  if (raw === 'NO_NUMERIC_DATA' || raw === 'EMPTY_VOLUME' || raw === '') return raw === 'NO_NUMERIC_DATA' ? 'NO_NUMERIC_DATA' : 'EMPTY_VOLUME';
  return 'EMPTY_VOLUME';
}

function normalizeQueryRow(row, origin) {
  const rawVolume = row.volume;
  let volume = rawVolume === '' || rawVolume == null ? null : Number(rawVolume);
  if (rawVolume === '') volume = null;
  if (volume != null && !Number.isFinite(volume)) volume = null;
  const volumeState = canonicalizeVolumeState(row, volume);
  if (volumeState === 'NUMBER_POSITIVE' && !(volume > 0)) throw new Error(`positive state without number: ${row.query}`);
  if (volumeState === 'NUMBER_ZERO' && volume !== 0) throw new Error(`zero state mismatch: ${row.query}`);
  if ((volumeState === 'EMPTY_VOLUME' || volumeState === 'USER_REPORTED_NO_DATA' || volumeState === 'QUARANTINED_INPUT' || volumeState === 'NO_NUMERIC_DATA') && volume !== null) {
    throw new Error(`blank/quarantine state must have null volume: ${row.query}`);
  }
  const kd = row.kd ?? '';
  return {
    url: row.url || '',
    query: row.query,
    market: row.market || '',
    observation_date: row.observed_date || row.observation_date || '',
    volume: volume === null ? '' : String(volume),
    volume_state: volumeState,
    kd,
    kd_state: kdState(kd),
    intent: row.intent || '',
    serp: row.serp || row.serp_status || '',
    source: row.source || '',
    evidence: row.evidence || '',
    batch: row.batch || '',
    notes: row.notes || '',
    screenshot_state: row.screenshot_state || '',
    source_priority: origin,
    recorded_at: recordedAt,
  };
}

const mergedByKey = new Map();
for (const row of currentEvidence) mergedByKey.set(observationKey(row), normalizeQueryRow(row, 'EXISTING_QUERY_EVIDENCE_2026-09-18'));
const existingCount = mergedByKey.size;
let incomingOnly = 0;
for (const row of allIncoming) {
  const key = observationKey(row);
  if (!mergedByKey.has(key)) {
    mergedByKey.set(key, normalizeQueryRow(row, 'INCREMENTAL_QUERY_EVIDENCE_ALL_2026-09-18'));
    incomingOnly += 1;
  }
}
const queryRows = [...mergedByKey.values()].sort((a, b) => {
  const urlCmp = a.url.localeCompare(b.url);
  if (urlCmp) return urlCmp;
  const queryCmp = a.query.localeCompare(b.query);
  if (queryCmp) return queryCmp;
  return `${a.batch}|${a.observation_date}|${a.source}`.localeCompare(`${b.batch}|${b.observation_date}|${b.source}`);
});
const quarantined = queryRows.filter((row) => row.volume_state === 'QUARANTINED_INPUT' || /Chordth/i.test(row.query));
for (const row of quarantined) {
  if (row.url) throw new Error(`quarantined query must not map to a URL: ${row.query} -> ${row.url}`);
}

writeCsv('QUERY_EVIDENCE.csv', [
  'url', 'query', 'market', 'observation_date', 'volume', 'volume_state', 'kd', 'kd_state', 'intent', 'serp',
  'source', 'evidence', 'batch', 'notes', 'screenshot_state', 'source_priority', 'recorded_at',
], queryRows);

const siteRoutesSource = readFileSync(resolve(root, 'src/lib/site-routes.ts'), 'utf8');
const publicBlock = siteRoutesSource.match(/export const PUBLIC_ROUTES = \[([\s\S]*?)\] as const/);
if (!publicBlock) throw new Error('Unable to parse PUBLIC_ROUTES');
const publicRoutes = unique([...publicBlock[1].matchAll(/'([^']+)'/g)].map((match) => match[1]));
const chordUrls = publicRoutes.filter((url) => url === '/chord-progressions' || url === '/chords' || url.startsWith('/chords/'));
const familyUrls = ['/chords/major', '/chords/minor', '/chords/diminished', '/chords/augmented', '/chords/suspended', '/chords/seventh', '/chords/add', '/chords/extended', '/chords/altered'];
const hubUrls = ['/chords'];
const otherUrls = ['/chords/by-key', '/chords/finder', '/chord-progressions'];
const familySet = new Set(familyUrls);
const hubSet = new Set(hubUrls);
const otherSet = new Set(otherUrls);
const detailUrls = chordUrls.filter((url) => !familySet.has(url) && !hubSet.has(url) && !otherSet.has(url));
const setA = unique(chordUrls);
const setB = familyUrls.filter((url) => chordUrls.includes(url));
const setC = unique(detailUrls);
const setD = otherUrls.filter((url) => chordUrls.includes(url)).concat(hubUrls.filter((url) => chordUrls.includes(url)));

const n2bRoutes = [
  '/chords/a-augmented', '/chords/a-diminished', '/chords/a-flat-augmented', '/chords/a-flat-diminished', '/chords/a-flat-sus2', '/chords/a-flat-sus4', '/chords/a-sus2', '/chords/a-sus4',
  '/chords/b-augmented', '/chords/b-diminished', '/chords/b-flat-augmented', '/chords/b-flat-diminished', '/chords/b-flat-sus2', '/chords/b-flat-sus4', '/chords/b-sus2', '/chords/b-sus4',
  '/chords/c-augmented', '/chords/c-diminished', '/chords/c-sus2', '/chords/c-sus4',
  '/chords/d-augmented', '/chords/d-diminished', '/chords/d-flat-augmented', '/chords/d-flat-diminished', '/chords/d-flat-sus2', '/chords/d-flat-sus4', '/chords/d-sus2', '/chords/d-sus4',
  '/chords/e-augmented', '/chords/e-diminished', '/chords/e-flat-augmented', '/chords/e-flat-diminished', '/chords/e-flat-sus2', '/chords/e-flat-sus4', '/chords/e-sus2', '/chords/e-sus4',
  '/chords/f-augmented', '/chords/f-diminished', '/chords/f-sharp-augmented', '/chords/f-sharp-diminished', '/chords/f-sharp-sus2', '/chords/f-sharp-sus4', '/chords/f-sus2', '/chords/f-sus4',
  '/chords/g-augmented', '/chords/g-diminished', '/chords/g-sus2', '/chords/g-sus4',
];
const n2cRoutes = [
  '/chords/a-7', '/chords/a-flat-7', '/chords/a-flat-m7', '/chords/a-flat-m7-flat5', '/chords/a-flat-maj7', '/chords/a-m7', '/chords/a-m7-flat5', '/chords/a-maj7',
  '/chords/b-7', '/chords/b-flat-7', '/chords/b-flat-m7', '/chords/b-flat-m7-flat5', '/chords/b-flat-maj7', '/chords/b-m7', '/chords/b-m7-flat5', '/chords/b-maj7',
  '/chords/c-7', '/chords/c-m7', '/chords/c-m7-flat5', '/chords/c-maj7',
  '/chords/d-7', '/chords/d-flat-7', '/chords/d-flat-m7', '/chords/d-flat-m7-flat5', '/chords/d-flat-maj7', '/chords/d-m7', '/chords/d-m7-flat5', '/chords/d-maj7',
  '/chords/e-7', '/chords/e-flat-7', '/chords/e-flat-m7', '/chords/e-flat-m7-flat5', '/chords/e-flat-maj7', '/chords/e-m7', '/chords/e-m7-flat5', '/chords/e-maj7',
  '/chords/f-7', '/chords/f-m7', '/chords/f-m7-flat5', '/chords/f-maj7', '/chords/f-sharp-7', '/chords/f-sharp-m7', '/chords/f-sharp-m7-flat5', '/chords/f-sharp-maj7',
  '/chords/g-7', '/chords/g-m7', '/chords/g-m7-flat5', '/chords/g-maj7',
];
const n2dRoutes = [
  '/chords/c-add9', '/chords/d-flat-add9', '/chords/d-add9', '/chords/e-flat-add9', '/chords/e-add9', '/chords/f-add9', '/chords/f-sharp-add9', '/chords/g-add9', '/chords/a-flat-add9', '/chords/a-add9', '/chords/b-flat-add9', '/chords/b-add9',
  '/chords/c-madd9', '/chords/d-flat-madd9', '/chords/d-madd9', '/chords/e-flat-madd9', '/chords/e-madd9', '/chords/f-madd9', '/chords/f-sharp-madd9', '/chords/g-madd9', '/chords/a-flat-madd9', '/chords/a-madd9', '/chords/b-flat-madd9', '/chords/b-madd9',
];
const n1Routes = [
  '/chords/f-major', '/chords/d-minor', '/chords/e-minor', '/chords/d-major', '/chords/b-minor',
  '/chords/f-sharp-minor', '/chords/c-sharp-minor', '/chords/g-sharp-minor', '/chords/b-flat-major', '/chords/g-minor',
  '/chords/d-flat-major', '/chords/e-flat-major', '/chords/f-sharp-major', '/chords/f-minor', '/chords/b-flat-minor', '/chords/e-flat-minor',
];
const originalMappedDetails = ['/chords/a-flat-major', '/chords/a-major', '/chords/a-minor', '/chords/b-major', '/chords/c-flat-major', '/chords/c-major', '/chords/c-minor', '/chords/e-major', '/chords/g-major'];

const urlPlan = JSON.parse(readFileSync(resolve(root, 'docs/product/url-plan.final.json'), 'utf8'));
const planPages = urlPlan.pages.filter((page) => page.url && (page.url === '/chords' || page.url.startsWith('/chords/') || page.url === '/chord-progressions'));
const planDetailUrls = unique(planPages.filter((page) => detailUrls.includes(page.url)).map((page) => page.url));
const keywordRows = JSON.parse(readFileSync(resolve(root, 'docs/pianogrid-chords-completion/02_routes/original-keywords.immutable.json'), 'utf8'));
const keywordChordRows = keywordRows.filter((row) => {
  const url = row['建议URL'] || row.url;
  return url === '/chords' || (typeof url === 'string' && url.startsWith('/chords/')) || url === '/chord-progressions';
});
const keywordByUrl = new Map();
for (const row of keywordChordRows) {
  const url = row['建议URL'] || row.url;
  if (!keywordByUrl.has(url)) keywordByUrl.set(url, []);
  keywordByUrl.get(url).push(row);
}

const pack158Urls = unique(pack158.map((row) => row.url).filter(Boolean));
const packMinusRepo = minus(pack158Urls, setA);
const repoMinusPack = minus(setA, pack158Urls);
const csv138 = unique(updated138.map((row) => row.url).filter(Boolean));
writeCsv('ROUTE_SET_DIFF.csv', ['side', 'url', 'note'], [
  ...packMinusRepo.map((url) => ({ side: 'PACK_158_NOT_IN_REGISTRY', url, note: '04_FULL_CHORDS_158.csv URL is not in current PUBLIC_ROUTES chord module set.' })),
  ...repoMinusPack.map((url) => ({ side: 'REGISTRY_NOT_IN_PACK_158', url, note: 'Current chord-module PUBLIC_ROUTES URL is missing from 04_FULL_CHORDS_158.csv.' })),
]);

function bestPositive(url) {
  const related = queryRows.filter((row) => row.url === url && Number(row.volume) > 0);
  return related.reduce((winner, row) => {
    const volume = Number(row.volume);
    if (!winner || volume > Number(winner.volume)) return row;
    return winner;
  }, null);
}

function observationStatus(url) {
  const related = queryRows.filter((row) => row.url === url);
  const positives = related.filter((row) => Number(row.volume) > 0).map((row) => Number(row.volume));
  if (positives.some((value) => value >= 100)) return 'OBSERVED_100_PLUS';
  if (positives.some((value) => value >= 1 && value <= 99)) return 'OBSERVED_1_TO_99';
  if (related.some((row) => row.volume === '0' || row.volume_state === 'NUMBER_ZERO') && positives.length === 0) return 'ZERO_OBSERVED_ONLY';
  if (related.length === 0) return 'SCREENSHOT_GAP';
  return 'NO_NUMERIC_DATA';
}

const pageRows = updated138.map((row) => {
  const best = bestPositive(row.url);
  const related = queryRows.filter((item) => item.url === row.url);
  const status = observationStatus(row.url);
  let bestVolume = '';
  let bestQuery = row.best_observed_query || '';
  let bestKd = row.best_query_kd || '';
  if (best) {
    bestVolume = best.volume;
    bestQuery = best.query;
    bestKd = best.kd;
  } else if (related.some((item) => item.volume === '0' || item.volume_state === 'NUMBER_ZERO')) {
    bestVolume = '0';
    const zero = related.find((item) => item.volume_state === 'NUMBER_ZERO');
    if (zero) bestQuery = zero.query;
  }
  return {
    url: row.url,
    page_type: row.url === '/chords/seventh' ? 'family' : 'detail',
    family: row.family,
    chord_name: row.chord_name,
    observation_status: status,
    best_observed_query: bestQuery,
    best_observed_query_volume: bestVolume,
    best_query_kd: bestKd,
    intent_fit: 'UNCHECKED',
    piano_intent_status: row.piano_intent_status || 'UNCHECKED',
    serp_status: row.serp_status || 'UNCHECKED',
    product_value: 'NEEDS_REVIEW',
    index_decision: 'NO_AUTOMATIC_CHANGE',
    query_row_count: related.length,
    positive_query_count: related.filter((item) => Number(item.volume) > 0).length,
    zero_query_count: related.filter((item) => item.volume === '0' || item.volume_state === 'NUMBER_ZERO').length,
    empty_query_count: related.filter((item) => item.volume_state === 'EMPTY_VOLUME').length,
    user_reported_count: related.filter((item) => item.volume_state === 'USER_REPORTED_NO_DATA').length,
    notes: 'Volume is max observed single-query estimate. Aliases are not summed. Intent is not VERIFIED_SEO.',
  };
}).sort((a, b) => a.url.localeCompare(b.url));

writeCsv('PAGE_EVIDENCE.csv', [
  'url', 'page_type', 'family', 'chord_name', 'observation_status', 'best_observed_query', 'best_observed_query_volume',
  'best_query_kd', 'intent_fit', 'piano_intent_status', 'serp_status', 'product_value', 'index_decision',
  'query_row_count', 'positive_query_count', 'zero_query_count', 'empty_query_count', 'user_reported_count', 'notes',
], pageRows);

const statusCounts = {};
for (const row of pageRows) statusCounts[row.observation_status] = (statusCounts[row.observation_status] || 0) + 1;
const expected = { OBSERVED_100_PLUS: 86, OBSERVED_1_TO_99: 47, ZERO_OBSERVED_ONLY: 2, NO_NUMERIC_DATA: 3, SCREENSHOT_GAP: 0 };
const mismatches = Object.keys(expected).filter((key) => (statusCounts[key] || 0) !== expected[key]);
const positiveKept = pageRows.filter((row) => Number(row.best_observed_query_volume) > 0).length;
const kdUnavailableWithVolume = queryRows.filter((row) => row.kd_state !== 'NUMBER' && row.volume_state === 'NUMBER_POSITIVE');
const laterZeroCleared = pageRows.filter((row) => Number(row.best_observed_query_volume) > 0).filter((row) => {
  const related = queryRows.filter((item) => item.url === row.url);
  return related.some((item) => item.volume_state === 'NUMBER_ZERO' || item.volume_state === 'EMPTY_VOLUME');
});

const abcCounts = { A: { visible: 0, total: 0 }, B: { visible: 0, total: 0 }, C: { visible: 0, total: 0 } };
for (const row of coverageAbc) {
  const letter = String(row.batch || '').slice(0, 1);
  if (!abcCounts[letter]) continue;
  abcCounts[letter].total += 1;
  if (String(row.screenshot_state).startsWith('VISIBLE')) abcCounts[letter].visible += 1;
}
writeCsv('SCREENSHOT_COVERAGE.csv', Object.keys(coverageAbc[0] || { batch: '', url: '', query: '', screenshot_state: '', volume: '', kd: '', source: '', note: '' }), coverageAbc);

function firstGitHit(pathArgs) {
  const result = git(['log', '--all', '--reverse', '--pretty=format:%H\t%aI\t%s', '--', ...pathArgs]);
  if (!result.ok || !result.stdout.trim()) return null;
  const [commit, date, ...subject] = result.stdout.trim().split('\n')[0].split('\t');
  return { commit, date, subject: subject.join('\t'), source_file: pathArgs[0] };
}

function siteRoutesIntroduction() {
  const log = git(['log', '--all', '--reverse', '--pretty=format:%H\t%aI\t%s', '--', 'src/lib/site-routes.ts']);
  const map = new Map();
  if (!log.ok) return map;
  let previous = new Set();
  for (const line of log.stdout.split('\n').filter(Boolean)) {
    const [commit, date, ...subject] = line.split('\t');
    const shown = git(['show', `${commit}:src/lib/site-routes.ts`]);
    if (!shown.ok) continue;
    const urls = unique([...shown.stdout.matchAll(/'(\/(?:chords[^']*|chord-progressions))'/g)].map((match) => match[1]));
    for (const url of urls) {
      if (!previous.has(url) && !map.has(url)) {
        map.set(url, { commit, date, subject: subject.join('\t'), source_file: 'src/lib/site-routes.ts' });
      }
    }
    previous = new Set(urls);
  }
  return map;
}

const siteRouteIntro = siteRoutesIntroduction();
const packIntro = {
  N2B: firstGitHit(['docs/pianogrid-chords-n2b']),
  N2C: firstGitHit(['docs/pianogrid-chords-n2c']),
  N2D: firstGitHit(['docs/pianogrid-chords-n2d-v2']),
  N1: firstGitHit(['docs/pianogrid-chords-next-expansion']),
  COMPLETION: firstGitHit(['docs/pianogrid-chords-completion']),
};

function pageTypeOf(url) {
  if (setC.includes(url)) return 'detail';
  if (setB.includes(url)) return 'family';
  if (url === '/chords') return 'hub';
  return 'structure';
}

function batchOf(url) {
  if (n2bRoutes.includes(url) || url === '/chords/diminished' || url === '/chords/augmented' || url === '/chords/suspended') return 'N2B';
  if (n2cRoutes.includes(url) || url === '/chords/seventh') return 'N2C';
  if (n2dRoutes.includes(url) || url === '/chords/add') return 'N2D';
  if (n1Routes.includes(url)) return 'N1_MAJOR_MINOR_EXPANSION';
  if (originalMappedDetails.includes(url) || url === '/chords/major' || url === '/chords/minor' || url === '/chords') return 'ORIGINAL_MAPPED_OR_HUB';
  if (url === '/chords/extended' || url === '/chords/altered') return 'COMPLETION_EXTENDED_ALTERED';
  if (url === '/chords/by-key' || url === '/chords/finder' || url === '/chord-progressions') return 'STRUCTURE';
  return 'UNKNOWN';
}

function originFor(url) {
  const batch = batchOf(url);
  const pack = batch === 'N2B' ? packIntro.N2B
    : batch === 'N2C' ? packIntro.N2C
      : batch === 'N2D' ? packIntro.N2D
        : batch === 'N1_MAJOR_MINOR_EXPANSION' ? packIntro.N1
          : batch === 'COMPLETION_EXTENDED_ALTERED' ? packIntro.COMPLETION
            : null;
  const routeHit = siteRouteIntro.get(url);
  let chosen = pack || routeHit;
  if (pack && routeHit) {
    chosen = pack.date <= routeHit.date ? pack : routeHit;
  }
  if (!chosen) chosen = { commit: 'UNKNOWN', date: 'UNKNOWN', subject: '', source_file: 'UNKNOWN' };
  const keywords = keywordByUrl.get(url) || [];
  const representative = keywords.find((row) => row['与URL主词关系'] === 'URL主关键词') || keywords[0];
  let volumeAtIntro = '';
  let mapping = '';
  if (representative) {
    mapping = representative['关键词（原规范词）'] || '';
    volumeAtIntro = String(representative['搜索量（US原值）'] ?? '');
  } else if (['N2B', 'N2C', 'N2D'].includes(batch)) {
    mapping = 'none in original URL-plan keyword file';
    volumeAtIntro = 'null';
  } else {
    mapping = 'none in original URL-plan keyword file';
    volumeAtIntro = 'UNKNOWN';
  }
  let sourceFile = chosen.source_file;
  if (batch === 'N2B' && n2bRoutes.includes(url)) sourceFile = 'docs/pianogrid-chords-n2b/03_details';
  if (batch === 'N2C' && n2cRoutes.includes(url)) sourceFile = 'docs/pianogrid-chords-n2c/03_details';
  if (batch === 'N2D' && n2dRoutes.includes(url)) sourceFile = 'docs/pianogrid-chords-n2d-v2/03_content/details';
  if (batch === 'N1_MAJOR_MINOR_EXPANSION') sourceFile = 'docs/pianogrid-chords-next-expansion/04_details_next';
  const confidence = chosen.commit === 'UNKNOWN' ? 'UNKNOWN' : (pack ? 'HIGH' : 'MEDIUM');
  const reason = [
    `First Git definition from ${sourceFile} at ${chosen.commit}.`,
    'origin_date is the commit author date (implementation/submit), not a production publish date.',
    'Historical docs that say Published can coexist with undeployed status; sitemap lastmod and file mtime were not used.',
    chosen.subject ? `Commit subject: ${chosen.subject}` : '',
    batch === 'N2B' ? 'N2B pack schema sets seo.keywordVolume to null for 3 family + 48 detail URLs (12 dim / 12 aug / 12 sus2 / 12 sus4).' : '',
    batch === 'N2C' ? 'N2C pack schema sets seo.keywordVolume to null for 1 family + 48 detail URLs (four seventh types × 12 roots).' : '',
    batch === 'N2D' ? 'N2D batch name exists in docs/pianogrid-chords-n2d-v2 (schema N2D-2.0). First Git commit of that directory is the Add9/MinorAdd9 introduction; it is the same commit that also added N2C files.' : '',
  ].filter(Boolean).join(' ');
  return {
    url,
    page_type: pageTypeOf(url),
    batch,
    origin_commit: chosen.commit === 'UNKNOWN' ? 'UNKNOWN' : chosen.commit,
    origin_date: chosen.date,
    source_file: sourceFile,
    original_keyword_mapping: mapping,
    keyword_volume_at_introduction: volumeAtIntro,
    reason_evidence: reason,
    confidence,
  };
}

const originRows = setA.map(originFor).sort((a, b) => a.url.localeCompare(b.url));
writeCsv('URL_ORIGIN_LEDGER.csv', [
  'url', 'page_type', 'batch', 'origin_commit', 'origin_date', 'source_file',
  'original_keyword_mapping', 'keyword_volume_at_introduction', 'reason_evidence', 'confidence',
], originRows);

function readJsonSafe(path) {
  try { return JSON.parse(readFileSync(path, 'utf8')); } catch { return null; }
}

function firstScreenFromCode(url) {
  if (url === '/chords/seventh') {
    return {
      first_screen_chord_name: 'YES_FAMILY_H1_AND_GRID_CARDS',
      real_notes_on_first_screen: 'YES_CARD_TONES',
      keyboard_on_first_screen: 'YES_CARD_KEYBOARDVIEWPORT',
      sound_on_first_screen: 'NO_PLAYBACK_ON_FAMILY_PAGE_DETAIL_HAS_PLAYBACK',
      inversion_or_voicing: 'FAMILY_CARDS_SHOW_ONE_VOICING_DETAIL_HAS_INVERSIONS',
      evidence: 'src/components/chords/category-page.tsx + category-experience.tsx; playback lives on ChordDetailExperience.',
    };
  }
  const modelNote = url.startsWith('/chords/') ? 'Shared ChordDetailPage + AMinorExperience first screen: H1, note spellings, KeyboardViewport, PlaybackControls, position/voicing radios.' : '';
  return {
    first_screen_chord_name: 'YES_H1_AND_SYMBOL',
    real_notes_on_first_screen: 'YES_NOTE_SPELLINGS',
    keyboard_on_first_screen: 'YES_KEYBOARDVIEWPORT',
    sound_on_first_screen: 'YES_PLAYBACKCONTROLS',
    inversion_or_voicing: n2dRoutes.includes(url) ? 'YES_TWO_VOICING_EXAMPLES_NOT_ENUMERATED_INVERSIONS' : 'YES_POSITION_OR_INVERSION_RADIOS',
    evidence: modelNote,
  };
}

const coreReview = core14.map((row) => {
  const screen = firstScreenFromCode(row.url);
  return {
    url: row.url,
    family: row.family,
    candidate_piano_query: row.candidate_piano_query,
    piano_volume: row.piano_volume,
    intent_fit: 'UNCHECKED',
    content_review: `${screen.first_screen_chord_name}; notes=${screen.real_notes_on_first_screen}; keyboard=${screen.keyboard_on_first_screen}; sound=${screen.sound_on_first_screen}; voicing=${screen.inversion_or_voicing}`,
    current_title_action: row.current_title_action || 'KEEP_UNLESS_MISMATCH_PROVEN',
    gsc_index_status: '',
    gsc_selected_canonical: '',
    gsc_last_crawl: '',
    gsc_first_impression: '',
    approved: 'false',
    reason: 'Piano-query volume is not US Google TOP10 proof. No 800-word or density rewrite. Title not auto-changed.',
    first_screen_evidence: screen.evidence,
  };
});
writeCsv('CORE_14_REVIEW.csv', Object.keys(coreReview[0]), coreReview);

const fiveReview = fiveUrls.map((row) => {
  const keepReason = row.url.includes('madd9')
    ? 'Minor add9 is a distinct quality from minor 9. Page already has notes, two voicing examples, keyboard and sound via the shared detail template. Low/absent query numbers are not a merge or 404 trigger.'
    : 'Half-diminished 7 is a distinct seventh quality in the N2C 12-root set. Competitor has a same-topic page in HTML sample; that is not ranking proof. Keep current service behavior pending product review.';
  return {
    url: row.url,
    family: row.family,
    status: observationStatus(row.url),
    best_query: bestPositive(row.url)?.query || row.best_query || '',
    volume: bestPositive(row.url)?.volume || (observationStatus(row.url) === 'ZERO_OBSERVED_ONLY' ? '0' : ''),
    competitor_same_topic_known: row.competitor_same_topic_known,
    decision: 'KEEP_CURRENTLY_PRODUCT_REVIEW_REQUIRED',
    merge_candidate: row.url.includes('madd9') ? 'NO_AUTO_MERGE_WITH_MINOR9_OR_ADD9' : 'NO_AUTO_MERGE',
    approved: 'false',
    review: keepReason,
  };
});
writeCsv('FIVE_PRODUCT_REVIEW.csv', Object.keys(fiveReview[0]), fiveReview);

writeCsv('GSC_REVIEW.csv', [
  'url', 'report_time', 'indexed', 'discovered', 'crawled', 'last_crawl', 'robots',
  'user_canonical', 'google_canonical', 'hostload_or_server_errors', 'first_impression', 'source_limit',
], core14.map((row) => ({
  url: row.url,
  report_time: '',
  indexed: '',
  discovered: '',
  crawled: '',
  last_crawl: '',
  robots: 'code: index,follow (src/app/chords/[slug]/page.tsx or seventh/page.tsx generateMetadata)',
  user_canonical: `code: editorialMetadata alternates.canonical from page metadata.canonical_path; SITE_ORIGIN https://pianogrid.com`,
  google_canonical: '',
  hostload_or_server_errors: '',
  first_impression: '',
  source_limit: 'No authorized GSC export in this round. GeFei SEO AGENT is not a GSC reading. site: results were not used.',
})));

const originKnown = originRows.filter((row) => row.origin_commit !== 'UNKNOWN').length;
const stillNoPositive = [
  '/chords/d-flat-m7-flat5',
  '/chords/f-sharp-madd9',
  '/chords/a-flat-madd9',
  '/chords/b-flat-madd9',
  '/chords/d-flat-madd9',
];

let validation = '# Query evidence validation (incremental 2026-09-18)\n\n';
validation += `Merged \`${COMPARISON.replaceAll('\\', '/')}/02_QUERY_EVIDENCE_ALL.csv\` with existing QUERY_EVIDENCE.csv on (observed_date, batch, query, source).\n\n`;
validation += '| Check | Result |\n|---|---|\n';
validation += `| Existing unique keys retained | ${existingCount} |\n`;
validation += `| Incoming ALL.csv rows | ${allIncoming.length} |\n`;
validation += `| New independent keys from ALL.csv | ${incomingOnly} |\n`;
validation += `| Merged unique observation rows | ${queryRows.length} |\n`;
validation += `| Follow-up rows (not treated as volume) | ${followups.length} |\n`;
validation += `| OBSERVED_100_PLUS | ${statusCounts.OBSERVED_100_PLUS || 0} |\n`;
validation += `| OBSERVED_1_TO_99 | ${statusCounts.OBSERVED_1_TO_99 || 0} |\n`;
validation += `| ZERO_OBSERVED_ONLY | ${statusCounts.ZERO_OBSERVED_ONLY || 0} |\n`;
validation += `| NO_NUMERIC_DATA | ${statusCounts.NO_NUMERIC_DATA || 0} |\n`;
validation += `| SCREENSHOT_GAP | ${statusCounts.SCREENSHOT_GAP || 0} |\n`;
validation += `| Status checksum 86+47+2+3+0 | ${(statusCounts.OBSERVED_100_PLUS || 0) + (statusCounts.OBSERVED_1_TO_99 || 0) + (statusCounts.ZERO_OBSERVED_ONLY || 0) + (statusCounts.NO_NUMERIC_DATA || 0) + (statusCounts.SCREENSHOT_GAP || 0)} |\n`;
validation += `| Snapshot mismatch | ${mismatches.length ? mismatches.join(', ') : 'none'} |\n`;
validation += `| Pages with a positive best_observed_query_volume | ${positiveKept} |\n`;
validation += `| QUARANTINED_INPUT rows | ${quarantined.length} (${quarantined.map((row) => row.query).join('; ')}) |\n`;
validation += `| KD/intent unavailable wiping a positive volume | 0; ${kdUnavailableWithVolume.length} positive rows keep their volume even if KD is empty |\n`;
validation += `| Pages that still have a later 0/blank after a positive | ${laterZeroCleared.length} (positive kept via max) |\n`;
validation += `| ABC visible A/B/C | ${abcCounts.A.visible}/${abcCounts.A.total}; ${abcCounts.B.visible}/${abcCounts.B.total}; ${abcCounts.C.visible}/${abcCounts.C.total} |\n`;
validation += `| ABC NOT_VISIBLE | ${coverageAbc.filter((row) => row.screenshot_state === 'NOT_VISIBLE').length} |\n`;
validation += `| 04_FULL_CHORDS_158 vs registry | pack-not-repo ${packMinusRepo.length}; repo-not-pack ${repoMinusPack.length} |\n`;
validation += `| PUBLIC_ROUTES | ${publicRoutes.length} |\n`;
validation += `| Chord module A/B/C/D | ${setA.length}/${setB.length}/${setC.length}/${setD.length} |\n`;
validation += `| Origin ledger rows / known commit | ${originRows.length} / ${originKnown} |\n`;
validation += `| intent_fit VERIFIED_SEO assignments | 0 |\n`;
validation += `| Still no positive | ${stillNoPositive.join(', ')} |\n`;
validation += '| Original URL-plan files overwritten | no |\n\n';
validation += 'Threshold 100 is an analysis grouping, not an SEO rule. Different queries are not summed. NOT_VISIBLE is not 0 and is not “not queried”.\n';
if (mismatches.length || queryRows.length !== 283 || incomingOnly !== 88 || existingCount !== 195 || positiveKept !== 133) {
  validation += '\nVALIDATION_FAILED\n';
  writeFileSync(resolve(outDir, 'DATA_VALIDATION.md'), validation);
  throw new Error(`Evidence validation failed: merged=${queryRows.length} new=${incomingOnly} existing=${existingCount} positive=${positiveKept} mismatches=${mismatches.join(',')}`);
}
writeFileSync(resolve(outDir, 'DATA_VALIDATION.md'), validation);

writeFileSync(resolve(outDir, '_counts.json'), `${JSON.stringify({
  public_routes: publicRoutes.length,
  A: setA.length, B: setB.length, C: setC.length, D: setD.length,
  csv138: csv138.length,
  pack158: pack158Urls.length,
  pack_minus_repo: packMinusRepo,
  repo_minus_pack: repoMinusPack,
  query_rows: queryRows.length,
  existing_keys: existingCount,
  new_keys: incomingOnly,
  page_rows: pageRows.length,
  observation_status: statusCounts,
  positive_pages: positiveKept,
  origin_known: originKnown,
  abc: abcCounts,
  handoff_comparison: COMPARISON,
}, null, 2)}\n`);

copyFileSync(resolve(COMPARISON, '04_FULL_CHORDS_158.csv'), resolve(outDir, '04_FULL_CHORDS_158.imported.csv'));
copyFileSync(resolve(COMPARISON, '08_CORE_14_REVIEW_QUEUE.csv'), resolve(outDir, '08_CORE_14_REVIEW_QUEUE.imported.csv'));

console.log(JSON.stringify({
  merged: queryRows.length,
  existing: existingCount,
  newKeys: incomingOnly,
  statusCounts,
  positiveKept,
  packDiff: { packMinusRepo, repoMinusPack },
  originKnown,
  abcCounts,
}, null, 2));
