import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve, extname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18');
const xmlDir = resolve(outDir, 'competitor-xml');
mkdirSync(xmlDir, { recursive: true });

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

const summaryPath = resolve(xmlDir, 'SUMMARY.json');
const summary = existsSync(summaryPath) ? JSON.parse(readFileSync(summaryPath, 'utf8')) : { errors: ['SUMMARY.json missing; XML fetch not run or failed before writing'], competitor_complete: false, site_complete: false };
const fetchLog = existsSync(resolve(xmlDir, 'fetch_log.json')) ? JSON.parse(readFileSync(resolve(xmlDir, 'fetch_log.json'), 'utf8')) : [];
const competitorTopics = existsSync(resolve(xmlDir, 'competitor_topics.csv')) ? parseCsv(readFileSync(resolve(xmlDir, 'competitor_topics.csv'), 'utf8')) : [];
const competitorUrls = existsSync(resolve(xmlDir, 'competitor_xml_urls.csv')) ? parseCsv(readFileSync(resolve(xmlDir, 'competitor_xml_urls.csv'), 'utf8')) : [];
const ownMatches = existsSync(resolve(xmlDir, 'own_vs_competitor_topics.csv')) ? parseCsv(readFileSync(resolve(xmlDir, 'own_vs_competitor_topics.csv'), 'utf8')) : [];
const pageEvidence = parseCsv(readFileSync(resolve(outDir, 'PAGE_EVIDENCE.csv'), 'utf8'));
const pack158 = parseCsv(readFileSync(resolve(outDir, '04_FULL_CHORDS_158.imported.csv'), 'utf8'));
const competitorObs = parseCsv(readFileSync('C:/Users/Admin/Documents/viviyang_github/piano/_handoff/hords-seo-evidence-2026-09-18/comparison-update/05_COMPETITOR_OBSERVATIONS.csv', 'utf8'));

function assetKind(url) {
  const ext = extname(new URL(url, 'https://example.invalid').pathname).toLowerCase();
  if (ext === '.html' || ext === '.htm' || ext === '') return 'html';
  if (ext === '.pdf') return 'pdf';
  return 'other';
}

const assetCounts = { html: 0, pdf: 0, other: 0 };
for (const row of competitorUrls) assetCounts[assetKind(row.url)] = (assetCounts[assetKind(row.url)] || 0) + 1;

const typeCounts = {};
for (const row of competitorTopics) typeCounts[row.page_type] = (typeCounts[row.page_type] || 0) + 1;
const comboPages = competitorTopics.filter((row) => String(row.inferred_topics).includes(';'));
const unclassified = competitorTopics.filter((row) => row.page_type === 'Unclassified');
const writtenRoots = new Set(competitorTopics.map((row) => row.root_spelling).filter(Boolean));
const pitchClasses = new Set(competitorTopics.map((row) => row.pitch_class).filter((value) => value !== ''));

function splitUrls(value) {
  return String(value || '').split(';').map((item) => item.trim()).filter(Boolean);
}

const cohort138 = new Set(pageEvidence.map((row) => row.url));
function cardinality(rows) {
  const ownToComp = new Map();
  const compToOwn = new Map();
  for (const row of rows) {
    const exact = splitUrls(row.strict_spelling_topic_urls);
    ownToComp.set(row.url, exact);
    for (const competitor of exact) {
      if (!compToOwn.has(competitor)) compToOwn.set(competitor, []);
      compToOwn.get(competitor).push(row.url);
    }
  }
  let oneToOne = 0;
  let oneToMany = 0;
  let manyToOneOwn = 0;
  let enharmonicOnly = 0;
  let notFound = 0;
  const manyToOneCompetitors = [];
  for (const [own, exact] of ownToComp) {
    const row = rows.find((item) => item.url === own);
    if (row?.match_state === 'ENHARMONIC_ONLY_REVIEW_SPELLING') enharmonicOnly += 1;
    else if (!exact.length) notFound += 1;
    else if (exact.length === 1) {
      const reverse = compToOwn.get(exact[0]) || [];
      if (reverse.length === 1) oneToOne += 1;
      else manyToOneOwn += 1;
    } else oneToMany += 1;
  }
  for (const [competitor, owns] of compToOwn) {
    if (owns.length > 1) manyToOneCompetitors.push({ competitor, own_urls: owns.join(';'), own_count: owns.length });
  }
  return {
    url_rows: rows.length,
    urls_with_strict_topic_hit: rows.filter((row) => splitUrls(row.strict_spelling_topic_urls).length > 0).length,
    topic_hit_strings: rows.reduce((sum, row) => sum + splitUrls(row.strict_spelling_topic_urls).length, 0),
    one_to_one: oneToOne,
    one_to_many: oneToMany,
    many_to_one_own_urls: manyToOneOwn,
    many_to_one_competitor_urls: manyToOneCompetitors.length,
    enharmonic_only: enharmonicOnly,
    not_found: notFound,
    many_to_one_examples: manyToOneCompetitors.slice(0, 20),
  };
}

const allCard = ownMatches.length ? cardinality(ownMatches) : null;
const cohortMatches = ownMatches.filter((row) => cohort138.has(row.url));
const cohortCard = ownMatches.length ? cardinality(cohortMatches) : null;

writeCsv('COMPETITOR_UNCLASSIFIED.csv', ['url', 'page_type', 'root_spelling', 'pitch_class', 'inferred_topics', 'review_note'], unclassified.map((row) => ({
  ...row,
  review_note: 'URL-pattern matcher did not assign a quality. Do not treat as D minor or flatten a trailing b. Manual review required; not proof of absence.',
})));

let md = '# Competitor XML review\n\n';
md += `XML complete: competitor=${Boolean(summary.competitor_complete)} site=${Boolean(summary.site_complete)}.\n`;
md += 'Sitemap membership is not Google indexing. No competitor traffic numbers were collected.\n\n';
if (summary.errors?.length) md += `Errors:\n${summary.errors.map((item) => `- ${item}`).join('\n')}\n\n`;
md += '| Stat | Value |\n|---|---:|\n';
md += `| Raw loc records | ${summary.competitor_raw_loc_count ?? 'NOT_FETCHED'} |\n`;
md += `| Unique URLs | ${summary.competitor_unique_url_count ?? 'NOT_FETCHED'} |\n`;
md += `| Duplicate loc | ${summary.competitor_duplicate_loc_count ?? 'NOT_FETCHED'} |\n`;
md += `| HTML / PDF / other unique | ${summary.competitor_complete ? `${assetCounts.html} / ${assetCounts.pdf} / ${assetCounts.other}` : 'NOT_FETCHED'} |\n`;
md += `| Written roots | ${summary.competitor_complete ? writtenRoots.size : 'NOT_FETCHED'} |\n`;
md += `| Pitch classes | ${summary.competitor_complete ? pitchClasses.size : 'NOT_FETCHED'} |\n`;
md += `| Combo (multi-topic) URLs | ${summary.competitor_complete ? comboPages.length : 'NOT_FETCHED'} |\n`;
md += `| Unclassified URLs | ${summary.competitor_complete ? unclassified.length : 'NOT_FETCHED'} |\n`;
if (summary.competitor_page_type_counts) {
  for (const [key, value] of Object.entries(summary.competitor_page_type_counts)) md += `| page_type ${key} | ${value} |\n`;
}
md += '\n## Match cardinality (URL rows, not topic-string sums)\n\n';
if (allCard) {
  md += '### 158 module URLs\n\n';
  md += `- URL rows: ${allCard.url_rows}\n- URLs with a strict spelling topic hit: ${allCard.urls_with_strict_topic_hit}\n- Topic-string hits (not a URL count): ${allCard.topic_hit_strings}\n- 1:1: ${allCard.one_to_one}\n- 1:N: ${allCard.one_to_many}\n- N:1 own URLs sharing one competitor URL: ${allCard.many_to_one_own_urls}\n- N:1 competitor URLs: ${allCard.many_to_one_competitor_urls}\n- Enharmonic only: ${allCard.enharmonic_only}\n- No pattern match: ${allCard.not_found}\n`;
  md += '\n### 138 sample URLs\n\n';
  md += `- URL rows: ${cohortCard.url_rows}\n- URLs with a strict spelling topic hit: ${cohortCard.urls_with_strict_topic_hit}\n- Topic-string hits: ${cohortCard.topic_hit_strings}\n- 1:1: ${cohortCard.one_to_one}\n- 1:N: ${cohortCard.one_to_many}\n- N:1 own URLs: ${cohortCard.many_to_one_own_urls}\n- Enharmonic only: ${cohortCard.enharmonic_only}\n- No pattern match: ${cohortCard.not_found}\n`;
} else {
  md += 'No own_vs_competitor_topics.csv because competitor XML was not complete. Pattern match counts are not fabricated as 0.\n';
}
md += '\n## Content samples (not XML membership)\n\n';
for (const row of competitorObs.slice(0, 16)) {
  md += `- ${row.competitor_url}: ${row.page_type} / ${row.topic}. ${row.observed_content} [${row.verification_status}; xml=${row.xml_membership}]\n`;
}
md += '\nKnown structure from sampled pages, independent of XML completeness:\n';
md += '- Cadd9/Cadd2 share c-add.html\n- Csus2/Csus4 share c-sus.html\n- Cmadd9 is cm-add.html, not Cm9\n- dim and dim7 are distinct\n- Cb/B enharmonic relation must not auto-canonical\n- dm-flat.html is Db minor, not D minor\n';
md += '\nFetch log files:\n';
for (const row of fetchLog) md += `- ${row.source} (${row.kind || 'unknown'}) -> ${row.saved_file || ''} bytes=${row.bytes || ''}\n`;
if (!fetchLog.length) md += '- none\n';
writeFileSync(resolve(outDir, 'COMPETITOR_XML_REVIEW.md'), md);
writeFileSync(resolve(xmlDir, 'POSTPROCESS.json'), `${JSON.stringify({
  competitor_complete: Boolean(summary.competitor_complete),
  site_complete: Boolean(summary.site_complete),
  errors: summary.errors || [],
  assetCounts,
  typeCounts,
  writtenRoots: writtenRoots.size,
  pitchClasses: pitchClasses.size,
  comboPages: comboPages.length,
  unclassified: unclassified.length,
  allCard,
  cohortCard,
  fetchLog,
}, null, 2)}\n`);
console.log(JSON.stringify({ competitor_complete: summary.competitor_complete, site_complete: summary.site_complete, errors: summary.errors || [], unclassified: unclassified.length }, null, 2));
