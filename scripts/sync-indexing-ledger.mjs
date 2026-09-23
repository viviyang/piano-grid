import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const origin = 'https://pianogrid.com';
const outDir = join(root, 'docs', 'seo', 'indexing');
const ledgerPath = join(outDir, 'ledger.csv');
const bingLedgerPath = join(outDir, 'bing-ledger.csv');
const sitemapFallbackPath = join(root, 'docs', 'seo-index-audit', 'sitemap-urls.csv');
const urlPlanPath = join(root, 'docs', 'content', 'site-master', 'url-plan.final.json');
const keywordMapPath = join(
  root,
  'docs',
  'pianogrid-chords-content-next',
  '01_planning',
  'keyword-task-map.tsv',
);
const chordsAuditPath = join(root, '_handoff', 'hords-seo-evidence-2026-09-18', '01_138_URL_AUDIT.csv');

const GROUP_ORDER = [
  'homepage',
  'keyboard-notes',
  'chords',
  'chord-progressions',
  'scales',
  'arpeggios',
  'songs',
  'sheet-music',
  'guide',
  'tools',
];

const CATEGORY_PATHS = new Set([
  '/chords/major',
  '/chords/minor',
  '/chords/diminished',
  '/chords/augmented',
  '/chords/suspended',
  '/chords/seventh',
  '/chords/add',
  '/chords/extended',
  '/chords/altered',
  '/songs/easy',
  '/sheet-music/easy',
  '/sheet-music/beginner',
  '/guide/read-sheet-music',
  '/guide/piano-chords',
  '/guide/piano-scales',
]);

const TOOL_PATHS = new Set([
  '/chords/by-key',
  '/chords/finder',
  '/keyboard-notes/labeled',
  '/keyboard-notes/chart',
  '/keyboard-notes/finger-numbers',
  '/keyboard-notes/blank',
  '/keyboard-notes/frequencies',
  '/tools/blank-sheet-music',
  '/tools/hear-the-difference',
]);

const KIND_ORDER = { hub: 0, category: 1, tool: 2, detail: 3 };

const INDEXED_SEED = new Set([
  '/',
  '/scales',
  '/arpeggios',
  '/chords',
  '/keyboard-notes',
  '/chords/diminished',
  '/chords/minor',
  '/chord-progressions',
  '/chords/major',
  '/chords/seventh',
]);

const LEDGER_COLUMNS = [
  'group',
  'submit_rank_in_group',
  'site_volume_rank',
  'volume_us',
  'path',
  'url',
  'page_kind',
  'primary_keyword',
  'volume_status',
  'in_sitemap',
  'gsc_submitted',
  'gsc_submitted_date',
  'indexed',
  'indexed_checked_date',
  'indexed_evidence',
  'notes',
];

const BING_LEDGER_COLUMNS = [
  'site_volume_rank',
  'volume_us',
  'path',
  'url',
  'group',
  'page_kind',
  'primary_keyword',
  'volume_status',
  'in_sitemap',
  'bing_submitted',
  'bing_submitted_date',
  'notes',
];

const STATUS_COLUMNS = [
  'gsc_submitted',
  'gsc_submitted_date',
  'indexed',
  'indexed_checked_date',
  'indexed_evidence',
  'notes',
];

function csvEscape(value) {
  const text = value == null ? '' : String(value);
  if (/[",\n\r]/.test(text)) return `"${text.replaceAll('"', '""')}"`;
  return text;
}

function parseCsv(text) {
  const rows = [];
  let field = '';
  let row = [];
  let inQuotes = false;
  const input = text.replace(/^\uFEFF/, '');
  for (let index = 0; index < input.length; index += 1) {
    const char = input[index];
    const next = input[index + 1];
    if (inQuotes) {
      if (char === '"' && next === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
      continue;
    }
    if (char === '"') {
      inQuotes = true;
      continue;
    }
    if (char === ',') {
      row.push(field);
      field = '';
      continue;
    }
    if (char === '\n') {
      row.push(field);
      rows.push(row);
      row = [];
      field = '';
      continue;
    }
    if (char !== '\r') field += char;
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  if (rows.length === 0) return [];
  const header = rows[0];
  return rows.slice(1).filter((values) => values.some((value) => value.length > 0)).map((values) => {
    const record = {};
    header.forEach((key, index) => {
      record[key] = values[index] ?? '';
    });
    return record;
  });
}

function parseTsv(text) {
  const lines = text.replace(/^\uFEFF/, '').split(/\r?\n/).filter(Boolean);
  const header = lines[0].split('\t');
  return lines.slice(1).map((line) => {
    const values = line.split('\t');
    const record = {};
    header.forEach((key, index) => {
      record[key] = values[index] ?? '';
    });
    return record;
  });
}

function toPath(urlOrPath) {
  if (!urlOrPath) return '';
  if (urlOrPath.startsWith('/')) {
    return urlOrPath.length > 1 && urlOrPath.endsWith('/') ? urlOrPath.slice(0, -1) : urlOrPath;
  }
  const url = new URL(urlOrPath);
  const path = url.pathname || '/';
  return path.length > 1 && path.endsWith('/') ? path.slice(0, -1) : path;
}

function toUrl(path) {
  return new URL(path, `${origin}/`).href;
}

function groupOf(path) {
  if (path === '/') return 'homepage';
  return path.split('/').filter(Boolean)[0];
}

function pageKind(path) {
  if (path === '/') return 'hub';
  if (TOOL_PATHS.has(path)) return 'tool';
  if (CATEGORY_PATHS.has(path)) return 'category';
  if (path.split('/').filter(Boolean).length === 1) return 'hub';
  return 'detail';
}

function parseVolume(value) {
  if (value == null || value === '') return null;
  const number = Number(String(value).replaceAll(',', '').trim());
  return Number.isFinite(number) ? number : null;
}

async function loadLiveSitemap() {
  const response = await fetch(`${origin}/sitemap.xml`, { signal: AbortSignal.timeout(20000) });
  if (!response.ok) {
    throw new Error(`sitemap HTTP ${response.status}`);
  }
  const xml = await response.text();
  const urls = [...xml.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map((match) => match[1].trim());
  const unique = [...new Set(urls.map(toPath).filter(Boolean))];
  if (unique.length === 0) throw new Error('sitemap contained no loc entries');
  return unique;
}

function loadFallbackSitemap() {
  const rows = parseCsv(readFileSync(sitemapFallbackPath, 'utf8'));
  return [...new Set(rows.map((row) => toPath(row.path || row.url)).filter(Boolean))];
}

function loadVolumeLookup() {
  const lookup = new Map();

  function setIfBetter(path, keyword, volume, status) {
    if (!path) return;
    if (!keyword && volume == null) return;
    const current = lookup.get(path);
    const sourceRank = {
      'semrush_2026-09-17': 3,
      'url_plan_2026-09-08': 2,
      'keyword_task_map_2026-09-11': 1,
    };
    const rank = sourceRank[status] ?? 0;
    const currentRank = current ? sourceRank[current.volume_status] ?? 0 : -1;
    if (!current || rank > currentRank) {
      lookup.set(path, {
        primary_keyword: keyword || '',
        volume_us: volume,
        volume_status: status,
      });
    }
  }

  if (existsSync(keywordMapPath)) {
    for (const row of parseTsv(readFileSync(keywordMapPath, 'utf8'))) {
      if (row.role !== 'primary') continue;
      setIfBetter(toPath(row.url), row.keyword, parseVolume(row.historical_volume_us), 'keyword_task_map_2026-09-11');
    }
  }

  if (existsSync(urlPlanPath)) {
    const plan = JSON.parse(readFileSync(urlPlanPath, 'utf8'));
    for (const page of plan.pages || []) {
      setIfBetter(toPath(page.url), page.keyword, parseVolume(page.volume_us), 'url_plan_2026-09-08');
    }
  }

  if (existsSync(chordsAuditPath)) {
    for (const row of parseCsv(readFileSync(chordsAuditPath, 'utf8'))) {
      setIfBetter(
        toPath(row.url),
        row.best_observed_query,
        parseVolume(row.best_observed_volume),
        'semrush_2026-09-17',
      );
    }
  }

  return lookup;
}

function loadExistingLedger() {
  if (!existsSync(ledgerPath)) return new Map();
  const rows = parseCsv(readFileSync(ledgerPath, 'utf8'));
  const byPath = new Map();
  for (const row of rows) {
    const path = toPath(row.path || row.url);
    if (path) byPath.set(path, row);
  }
  return byPath;
}

function seedStatus(path) {
  if (INDEXED_SEED.has(path)) {
    return {
      gsc_submitted: 'yes',
      gsc_submitted_date: '2026-09-18',
      indexed: 'yes',
      indexed_checked_date: '2026-09-18',
      indexed_evidence: 'site_search',
      notes: '2026-09-18 site:https://pianogrid.com/ 可见。提交日期按当天截图记录，不是 GSC 时间戳。',
    };
  }
  return {
    gsc_submitted: 'no',
    gsc_submitted_date: '',
    indexed: 'unknown',
    indexed_checked_date: '',
    indexed_evidence: '',
    notes: '',
  };
}

function compareRows(left, right) {
  const groupDelta = (GROUP_ORDER.indexOf(left.group) + 100) - (GROUP_ORDER.indexOf(right.group) + 100);
  if (groupDelta !== 0) return groupDelta;
  const leftVolume = left.volume_us == null ? -1 : left.volume_us;
  const rightVolume = right.volume_us == null ? -1 : right.volume_us;
  if (leftVolume !== rightVolume) return rightVolume - leftVolume;
  const kindDelta = (KIND_ORDER[left.page_kind] ?? 9) - (KIND_ORDER[right.page_kind] ?? 9);
  if (kindDelta !== 0) return kindDelta;
  return left.path.localeCompare(right.path);
}

function formatVolume(value) {
  return value == null ? '' : String(value);
}

const sitemapSource = { label: '', paths: [] };
try {
  sitemapSource.paths = await loadLiveSitemap();
  sitemapSource.label = `${origin}/sitemap.xml`;
} catch (error) {
  sitemapSource.paths = loadFallbackSitemap();
  sitemapSource.label = `fallback ${sitemapSource.paths.length} from docs/seo-index-audit/sitemap-urls.csv (${error.message})`;
}

const volumeLookup = loadVolumeLookup();
const existing = loadExistingLedger();
const sitemapSet = new Set(sitemapSource.paths);
const allPaths = new Set([...sitemapSource.paths, ...existing.keys()]);

const rows = [];
for (const path of allPaths) {
  const volume = volumeLookup.get(path) || {
    primary_keyword: '',
    volume_us: null,
    volume_status: 'unknown',
  };
  const previous = existing.get(path);
  const seeded = seedStatus(path);
  const status = {};
  for (const column of STATUS_COLUMNS) {
    status[column] = previous ? previous[column] ?? '' : seeded[column];
  }
  if (volume.volume_us == null && volume.primary_keyword === '') {
    volume.volume_status = 'unknown';
  } else if (volume.volume_us == null) {
    volume.volume_status = volume.volume_status || 'unknown';
  }
  rows.push({
    group: groupOf(path),
    path,
    url: toUrl(path),
    page_kind: pageKind(path),
    primary_keyword: volume.primary_keyword || '',
    volume_us: volume.volume_us,
    volume_status: volume.volume_us == null ? (volume.primary_keyword ? `${volume.volume_status || 'unknown'}; volume missing` : 'unknown') : volume.volume_status,
    in_sitemap: sitemapSet.has(path) ? 'yes' : 'no',
    ...status,
  });
}

rows.sort(compareRows);

const rankedWithVolume = rows
  .filter((row) => row.volume_us != null)
  .sort((left, right) => right.volume_us - left.volume_us || left.path.localeCompare(right.path));
const siteRank = new Map();
rankedWithVolume.forEach((row, index) => {
  siteRank.set(row.path, index + 1);
});

const groupCounts = new Map();
for (const row of rows) {
  const next = (groupCounts.get(row.group) || 0) + 1;
  groupCounts.set(row.group, next);
  row.submit_rank_in_group = next;
  row.site_volume_rank = siteRank.get(row.path) || '';
}

mkdirSync(outDir, { recursive: true });
const csv = [
  LEDGER_COLUMNS.join(','),
  ...rows.map((row) => LEDGER_COLUMNS.map((column) => csvEscape(column === 'volume_us' ? formatVolume(row[column]) : row[column])).join(',')),
  '',
].join('\n');
writeFileSync(ledgerPath, `\uFEFF${csv}`, 'utf8');

const existingBing = existsSync(bingLedgerPath) ? parseCsv(readFileSync(bingLedgerPath, 'utf8')) : [];
const bingByPath = new Map(existingBing.map((row) => [toPath(row.path || row.url), row]));
const bingRows = [...rows].sort((left, right) => {
  const leftVolume = left.volume_us == null ? -1 : left.volume_us;
  const rightVolume = right.volume_us == null ? -1 : right.volume_us;
  if (leftVolume !== rightVolume) return rightVolume - leftVolume;
  return left.path.localeCompare(right.path);
});
const bingCsv = [
  BING_LEDGER_COLUMNS.join(','),
  ...bingRows.map((row) => {
    const previous = bingByPath.get(row.path);
    const record = {
      ...row,
      volume_us: formatVolume(row.volume_us),
      bing_submitted: previous?.bing_submitted === 'yes' ? 'yes' : 'no',
      bing_submitted_date: previous?.bing_submitted === 'yes' ? previous.bing_submitted_date || '' : '',
      notes: previous?.notes || '',
    };
    return BING_LEDGER_COLUMNS.map((column) => csvEscape(record[column])).join(',');
  }),
  '',
].join('\n');
writeFileSync(bingLedgerPath, `\uFEFF${bingCsv}`, 'utf8');

const byGroup = new Map();
for (const row of rows) {
  const bucket = byGroup.get(row.group) || { total: 0, submitted: 0, indexed: 0, unknown: 0, withVolume: 0 };
  bucket.total += 1;
  if (row.gsc_submitted === 'yes') bucket.submitted += 1;
  if (row.indexed === 'yes') bucket.indexed += 1;
  if (row.indexed === 'unknown') bucket.unknown += 1;
  if (row.volume_us != null) bucket.withVolume += 1;
  byGroup.set(row.group, bucket);
}

const nextQueue = rows.filter((row) => row.in_sitemap === 'yes' && row.gsc_submitted !== 'yes' && row.indexed !== 'yes');
console.log(`sitemap source: ${sitemapSource.label}`);
console.log(`ledger rows: ${rows.length}`);
console.log(`in sitemap: ${rows.filter((row) => row.in_sitemap === 'yes').length}`);
console.log(`with volume: ${rows.filter((row) => row.volume_us != null).length}`);
console.log(`gsc submitted: ${rows.filter((row) => row.gsc_submitted === 'yes').length}`);
console.log(`bing submitted: ${bingRows.filter((row) => bingByPath.get(row.path)?.bing_submitted === 'yes').length}`);
console.log(`indexed yes: ${rows.filter((row) => row.indexed === 'yes').length}`);
console.log('group\ttotal\tsubmitted\tindexed\twith_volume');
for (const group of GROUP_ORDER) {
  const bucket = byGroup.get(group);
  if (!bucket) continue;
  console.log(`${group}\t${bucket.total}\t${bucket.submitted}\t${bucket.indexed}\t${bucket.withVolume}`);
}
console.log('next unsubmitted by volume:');
for (const row of nextQueue.slice(0, 15)) {
  console.log(`${row.volume_us ?? 'unknown'}\t${row.group}\t${row.path}\t${row.primary_keyword}`);
}
