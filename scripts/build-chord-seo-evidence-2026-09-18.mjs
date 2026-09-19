import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18');
mkdirSync(outDir, { recursive: true });
const recordedAt = '2026-09-18T00:00:00Z';

function findHandoff() {
  const candidates = [
    resolve(root, '_handoff/chords-seo-evidence-2026-09-18'),
    resolve(root, '_handoff/hords-seo-evidence-2026-09-18'),
    'C:/Users/Admin/Documents/viviyang_github/piano/_handoff/hords-seo-evidence-2026-09-18',
    'C:/Users/Admin/Documents/viviyang_github/piano/_handoff/chords-seo-evidence-2026-09-18',
  ];
  for (const dir of candidates) {
    if (existsSync(resolve(dir, '01_138_URL_AUDIT.csv'))) return dir;
  }
  throw new Error('Handoff pack not found by 01_138_URL_AUDIT.csv');
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
  return /[",\n]/.test(text) ? '"' + text.replaceAll('"', '""') + '"' : text;
}

function writeCsv(filename, columns, rows) {
  const body = [columns.join(','), ...rows.map((row) => columns.map((column) => csvEscape(row[column])).join(','))].join('\n');
  writeFileSync(resolve(outDir, filename), body + '\n');
}

function unique(list) { return [...new Set(list)]; }
function sorted(list) { return [...list].sort((a, b) => a.localeCompare(b)); }

const handoff = findHandoff();
const audit138 = parseCsv(readFileSync(resolve(handoff, '01_138_URL_AUDIT.csv'), 'utf8'));
const queryEvidenceIn = parseCsv(readFileSync(resolve(handoff, '02_QUERY_EVIDENCE.csv'), 'utf8'));
const followups = parseCsv(readFileSync(resolve(handoff, '03_QUERY_FOLLOWUPS.csv'), 'utf8'));

const siteRoutesSource = readFileSync(resolve(root, 'src/lib/site-routes.ts'), 'utf8');
const publicBlock = siteRoutesSource.match(/export const PUBLIC_ROUTES = \[([\s\S]*?)\] as const/);
if (!publicBlock) throw new Error('Unable to parse PUBLIC_ROUTES');
const publicRoutes = unique([...publicBlock[1].matchAll(/'([^']+)'/g)].map((match) => match[1]));
const chordUrls = publicRoutes.filter((url) => url === '/chord-progressions' || url === '/chords' || url.startsWith('/chords/'));

const familyUrls = ['/chords/major','/chords/minor','/chords/diminished','/chords/augmented','/chords/suspended','/chords/seventh','/chords/add','/chords/extended','/chords/altered'];
const hubUrls = ['/chords'];
const otherUrls = ['/chords/by-key','/chords/finder','/chord-progressions'];
const familySet = new Set(familyUrls);
const hubSet = new Set(hubUrls);
const otherSet = new Set(otherUrls);
const detailUrls = chordUrls.filter((url) => !familySet.has(url) && !hubSet.has(url) && !otherSet.has(url));
const unknownType = chordUrls.filter((url) => !familySet.has(url) && !hubSet.has(url) && !otherSet.has(url) && !detailUrls.includes(url));

const urlPlan = JSON.parse(readFileSync(resolve(root, 'docs/product/url-plan.final.json'), 'utf8'));
const planPages = urlPlan.pages.filter((page) => page.url && (page.url === '/chords' || page.url.startsWith('/chords/') || page.url === '/chord-progressions'));
const planDetailUrls = unique(planPages.filter((page) => detailUrls.includes(page.url)).map((page) => page.url));
const keywordRows = JSON.parse(readFileSync(resolve(root, 'docs/pianogrid-chords-completion/02_routes/original-keywords.immutable.json'), 'utf8'));
const keywordChordRows = keywordRows.filter((row) => {
  const url = row['建议URL'] || row.url;
  return url === '/chords' || (typeof url === 'string' && url.startsWith('/chords/')) || url === '/chord-progressions';
});
const keywordDetailRows = keywordChordRows.filter((row) => planDetailUrls.includes(row['建议URL'] || row.url));

const setA = unique(chordUrls);
const setB = familyUrls.filter((url) => chordUrls.includes(url));
const setC = unique(detailUrls);
const setD = otherUrls.filter((url) => chordUrls.includes(url)).concat(hubUrls.filter((url) => chordUrls.includes(url)));
const setE = unique(planDetailUrls);
const setF = unique(audit138.filter((row) => row.url && row.url !== '/chords/seventh').map((row) => row.url));
const csv138 = unique(audit138.map((row) => row.url).filter(Boolean));

const intersect = (left, right) => sorted(left.filter((url) => right.includes(url)));
const minus = (left, right) => sorted(left.filter((url) => !right.includes(url)));
const eAndF = intersect(setE, setF);
const cMinusEUF = minus(setC, unique([...setE, ...setF]));
const eMinusC = minus(setE, setC);
const fMinusC = minus(setF, setC);
const csvNotInRepo = minus(csv138, chordUrls);
const csvNonDetail = csv138.filter((url) => !setC.includes(url));
const notCoveredBy138 = minus(setA, csv138);

const gMajorOverlap = eAndF.includes('/chords/g-major');
const reconRows = [
  ...setA.map((url) => ({
    url,
    collection: setC.includes(url) ? 'C_detail' : setB.includes(url) ? 'B_family' : setD.includes(url) ? (url === '/chords' ? 'D_hub' : 'D_other') : 'UNKNOWN',
    in_A: 'true',
    in_B: setB.includes(url) ? 'true' : 'false',
    in_C: setC.includes(url) ? 'true' : 'false',
    in_D: setD.includes(url) ? 'true' : 'false',
    in_E: setE.includes(url) ? 'true' : 'false',
    in_F: setF.includes(url) ? 'true' : 'false',
    in_138_csv: csv138.includes(url) ? 'true' : 'false',
    original_plan_keyword_rows: String(keywordChordRows.filter((row) => (row['建议URL'] || row.url) === url).length),
  })),
];
writeCsv('ROUTE_RECONCILIATION.csv', ['url','collection','in_A','in_B','in_C','in_D','in_E','in_F','in_138_csv','original_plan_keyword_rows'], reconRows);

let recon = '# Chord route reconciliation\n\n';
recon += 'Date recorded: 2026-09-18. Worktree: `pianogrid-final-integration` / `codex/final-integration`. Unique key: current repository canonical path from `PUBLIC_ROUTES`.\n\n';
recon += 'This file counts **routes**. Extended 108 and Altered 96 are embedded reference objects on family pages, not independent URLs.\n\n';
recon += '| Set | Meaning | unique_count |\n|---|---|---:|\n';
recon += '| A | All Chord module URLs (`/chords`, `/chords/*`, `/chord-progressions`) | ' + setA.length + ' |\n';
recon += '| B | Family URLs | ' + setB.length + ' |\n';
recon += '| C | Detail URLs | ' + setC.length + ' |\n';
recon += '| D | Hub / finder / by-key / progressions | ' + setD.length + ' |\n';
recon += '| E | Original URL-plan mapped **detail** URLs (unique path) | ' + setE.length + ' |\n';
recon += '| F | 138-pack pending **detail** URLs | ' + setF.length + ' |\n';
recon += '| 138 CSV | Pack rows (137 details + Seventh family) | ' + csv138.length + ' |\n';
recon += '| PUBLIC_ROUTES total | Whole site, not only chords | ' + publicRoutes.length + ' |\n\n';
recon += 'A = B + C + D = ' + setB.length + ' + ' + setC.length + ' + ' + setD.length + ' = ' + (setB.length + setC.length + setD.length) + '.\n\n';
recon += '## Why 145, 138, 9, and 146 disagreed\n\n';
recon += '- C is **' + setC.length + '** detail routes. That is the current unique detail URL count; it is not fixed to an old 145 if the inventory later changes, but it is 145 in this snapshot.\n';
recon += '- E is **' + setE.length + '** unique original-plan **detail** URLs. Original keyword file has **' + keywordDetailRows.length + '** keyword **rows** for those same URLs (repeat counting). Hub/tools add more keyword rows: **' + keywordChordRows.length + '** chord-module keyword rows across **' + unique(keywordChordRows.map((row) => row['建议URL'] || row.url)).length + '** unique URLs.\n';
recon += '- F is **' + setF.length + '** details from the 138 pack. The pack also includes `/chords/seventh`, so CSV unique URLs = ' + csv138.length + '.\n';
recon += '- Adding 137 + 9 as disjoint sets produced 146. They are not disjoint: E ∩ F = ' + eAndF.length + ' URL' + (eAndF.length === 1 ? '' : 's') + (gMajorOverlap ? ' (`/chords/g-major` is in the original plan **and** in the 138 pending set because its original volume was null/UNKNOWN).' : '.') + '\n';
recon += '- 137 + 9 - ' + eAndF.length + ' overlap = ' + (137 + 9 - eAndF.length) + ', which matches C = ' + setC.length + '.\n';
recon += '- UNKNOWN/NO_DATA in the 2026-09-17 audit summary was 140 because it mixed 137 pending details + `/chords/seventh` + `/chords/major` + `/chords/minor` family pages. That is not a third detail count.\n\n';
recon += '## Set diffs\n\n';
recon += '### E ∩ F (' + eAndF.length + ')\n\n' + (eAndF.length ? eAndF.map((url) => '- ' + url).join('\n') : '- none') + '\n\n';
recon += '### C - (E ∪ F) (' + cMinusEUF.length + ')\n\n' + (cMinusEUF.length ? cMinusEUF.map((url) => '- ' + url).join('\n') : '- none') + '\n\n';
recon += '### E - C (' + eMinusC.length + ')\n\n' + (eMinusC.length ? eMinusC.map((url) => '- ' + url).join('\n') : '- none') + '\n\n';
recon += '### F - C (' + fMinusC.length + ')\n\n' + (fMinusC.length ? fMinusC.map((url) => '- ' + url).join('\n') : '- none') + '\n\n';
recon += '## 138 CSV vs current repository\n\n';
recon += 'URLs in the 138 CSV that are not current Chord-module routes: ' + (csvNotInRepo.length ? csvNotInRepo.join(', ') : 'none') + '.\n\n';
recon += 'URLs in the 138 CSV that are not detail routes: ' + (csvNonDetail.length ? csvNonDetail.join(', ') : 'none') + '.\n\n';
recon += '## Chord-module URLs outside the 138 evidence pack\n\n';
recon += notCoveredBy138.map((url) => '- ' + url).join('\n') + '\n\n';
recon += 'These pages were not part of the 137-detail + Seventh screenshot pass. Absence from the pack is not a volume of 0.\n\n';
recon += '## Object counts are not URL counts\n\n';
recon += '- Extended family page hosts 108 embedded reference objects; Altered hosts 96. Both remain **one URL each**.\n';
recon += '- Major family grid cards are 12 independent pages; `/chords/c-flat-major` is an extra written-spelling detail, so Major details = 13.\n';
if (unknownType.length) recon += '\nUnclassified chord URLs: ' + unknownType.join(', ') + '\n';
writeFileSync(resolve(outDir, 'ROUTE_RECONCILIATION.md'), recon);

const queryRows = queryEvidenceIn.map((row) => {
  const quarantined = !row.url && /Chordth/i.test(row.query);
  let volume = row.volume === '' ? null : Number(row.volume);
  if (row.volume === '') volume = null;
  let volumeState = row.volume_state || '';
  if (quarantined) volumeState = 'QUARANTINED_INPUT';
  if (volumeState === 'NUMBER_POSITIVE' && !(volume > 0)) throw new Error('positive state without number: ' + row.query);
  if (volumeState === 'NUMBER_ZERO' && volume !== 0) throw new Error('zero state mismatch: ' + row.query);
  if ((volumeState === 'EMPTY_VOLUME' || volumeState === 'USER_REPORTED_NO_DATA' || volumeState === 'QUARANTINED_INPUT') && volume !== null) {
    throw new Error('blank/quarantine state must have null volume: ' + row.query);
  }
  return {
    url: row.url || '',
    query: row.query,
    market: row.market,
    observation_date: row.observed_date || row.observation_date,
    volume: volume === null ? '' : String(volume),
    kd: row.kd,
    source: row.source,
    evidence: row.evidence,
    volume_state: volumeState,
    batch: row.batch,
    notes: row.notes,
    source_priority: 'HANDOFF_QUERY_EVIDENCE_2026-09-18',
    recorded_at: recordedAt,
  };
});
writeCsv('QUERY_EVIDENCE.csv', ['url','query','market','observation_date','volume','kd','source','evidence','volume_state','batch','notes','source_priority','recorded_at'], queryRows);

const byUrl = new Map();
for (const row of audit138) {
  byUrl.set(row.url, {
    url: row.url,
    page_type: row.url === '/chords/seventh' ? 'family' : 'detail',
    family: row.family,
    chord_name: row.chord_name,
    observation_status: row.observation_status,
    best_observed_query: row.best_observed_query,
    best_observed_query_volume: row.best_observed_volume,
    best_query_kd: row.best_query_kd,
    intent_fit: 'UNCHECKED',
    piano_intent_status: row.piano_intent_status || 'UNCHECKED',
    product_value: 'NEEDS_REVIEW',
    index_decision: 'NO_AUTOMATIC_CHANGE',
    query_row_count: 0,
    positive_query_count: 0,
    zero_query_count: 0,
    empty_query_count: 0,
    user_reported_count: 0,
    notes: 'Pack page row imported 2026-09-18. Volume is best observed query, not page traffic. Intent is not VERIFIED_SEO.',
  });
}
for (const row of queryRows) {
  if (!row.url) continue;
  if (!byUrl.has(row.url)) {
    byUrl.set(row.url, {
      url: row.url, page_type: setC.includes(row.url) ? 'detail' : setB.includes(row.url) ? 'family' : 'other',
      family: '', chord_name: '', observation_status: '', best_observed_query: '', best_observed_query_volume: '',
      best_query_kd: '', intent_fit: 'UNCHECKED', piano_intent_status: 'UNCHECKED', product_value: 'NEEDS_REVIEW',
      index_decision: 'NO_AUTOMATIC_CHANGE', query_row_count: 0, positive_query_count: 0, zero_query_count: 0,
      empty_query_count: 0, user_reported_count: 0, notes: 'Query rows existed without a 138 page row.',
    });
  }
  const page = byUrl.get(row.url);
  page.query_row_count += 1;
  if (row.volume_state === 'NUMBER_POSITIVE') page.positive_query_count += 1;
  if (row.volume_state === 'NUMBER_ZERO') page.zero_query_count += 1;
  if (row.volume_state === 'EMPTY_VOLUME') page.empty_query_count += 1;
  if (row.volume_state === 'USER_REPORTED_NO_DATA') page.user_reported_count += 1;
}
for (const page of byUrl.values()) {
  const related = queryRows.filter((row) => row.url === page.url && row.volume_state === 'NUMBER_POSITIVE');
  const best = related.reduce((winner, row) => {
    const volume = Number(row.volume);
    if (!winner || volume > Number(winner.volume)) return row;
    return winner;
  }, null);
  if (best) {
    page.best_observed_query = best.query;
    page.best_observed_query_volume = best.volume;
    page.best_query_kd = best.kd;
  }
  if (page.url === '/chords/d-7') {
    page.piano_intent_status = 'PIANO_QUERY_VOLUME_OBSERVED_SERP_UNCHECKED';
    page.notes += ' D7 has an explicit piano query 1300 observation; SERP fit remains UNCHECKED.';
  }
}
const pageRows = [...byUrl.values()].sort((a, b) => a.url.localeCompare(b.url));
writeCsv('PAGE_EVIDENCE.csv', ['url','page_type','family','chord_name','observation_status','best_observed_query','best_observed_query_volume','best_query_kd','intent_fit','piano_intent_status','product_value','index_decision','query_row_count','positive_query_count','zero_query_count','empty_query_count','user_reported_count','notes'], pageRows);

const statusCounts = {};
for (const row of audit138) statusCounts[row.observation_status] = (statusCounts[row.observation_status] || 0) + 1;
const expected = { OBSERVED_100_PLUS: 84, OBSERVED_1_TO_99: 38, ZERO_OBSERVED_ONLY: 7, NO_NUMERIC_DATA: 7, SCREENSHOT_GAP: 2 };
const mismatches = Object.keys(expected).filter((key) => statusCounts[key] !== expected[key]);
const positiveKept = pageRows.filter((row) => Number(row.best_observed_query_volume) > 0).length;
const quarantined = queryRows.filter((row) => row.volume_state === 'QUARANTINED_INPUT');
const emptyWithNumber = queryRows.filter((row) => (row.volume_state === 'EMPTY_VOLUME' || row.volume_state === 'USER_REPORTED_NO_DATA') && row.volume !== '');
const screenshotGapPages = audit138.filter((row) => row.observation_status === 'SCREENSHOT_GAP').map((row) => row.url);

let validation = '# Query evidence validation\n\n';
validation += 'Imported from `' + handoff.replaceAll('\\\\', '/') + '` on 2026-09-18. One CSV row is one observation, not a demand total.\n\n';
validation += '| Check | Result |\n|---|---|\n';
validation += '| 138 unique URLs | ' + csv138.length + ' |\n';
validation += '| Query observation rows | ' + queryRows.length + ' |\n';
validation += '| Follow-up rows (not treated as volume) | ' + followups.length + ' |\n';
validation += '| OBSERVED_100_PLUS | ' + (statusCounts.OBSERVED_100_PLUS || 0) + ' |\n';
validation += '| OBSERVED_1_TO_99 | ' + (statusCounts.OBSERVED_1_TO_99 || 0) + ' |\n';
validation += '| ZERO_OBSERVED_ONLY | ' + (statusCounts.ZERO_OBSERVED_ONLY || 0) + ' |\n';
validation += '| NO_NUMERIC_DATA | ' + (statusCounts.NO_NUMERIC_DATA || 0) + ' |\n';
validation += '| SCREENSHOT_GAP | ' + (statusCounts.SCREENSHOT_GAP || 0) + ' |\n';
validation += '| Status checksum 84+38+7+7+2 | ' + ((statusCounts.OBSERVED_100_PLUS||0)+(statusCounts.OBSERVED_1_TO_99||0)+(statusCounts.ZERO_OBSERVED_ONLY||0)+(statusCounts.NO_NUMERIC_DATA||0)+(statusCounts.SCREENSHOT_GAP||0)) + ' |\n';
validation += '| Snapshot mismatch | ' + (mismatches.length ? mismatches.join(', ') : 'none') + ' |\n';
validation += '| Pages with a positive best_observed_query_volume | ' + positiveKept + ' |\n';
validation += '| EMPTY/USER_REPORTED rows forced to 0 | ' + emptyWithNumber.length + ' |\n';
validation += '| QUARANTINED_INPUT rows | ' + quarantined.length + ' (' + quarantined.map((row) => row.query).join('; ') + ') |\n';
validation += '| SCREENSHOT_GAP pages | ' + screenshotGapPages.join(', ') + ' |\n';
validation += '| intent_fit VERIFIED_SEO assignments | 0 |\n';
validation += '| Original URL-plan files overwritten | no |\n\n';
validation += 'Threshold 100 is an analysis grouping, not an SEO rule. Different queries are not summed. A later 0 or blank does not remove an earlier positive.\n';
validation += 'D7 piano query 1300 is stored on `/chords/d-7` as volume evidence only; intent_fit stays UNCHECKED.\n';
if (mismatches.length || emptyWithNumber.length) {
  validation += '\nVALIDATION_FAILED\n';
  writeFileSync(resolve(outDir, 'DATA_VALIDATION.md'), validation);
  throw new Error('Evidence validation failed');
}
writeFileSync(resolve(outDir, 'DATA_VALIDATION.md'), validation);

const seoCopy = JSON.parse(JSON.stringify({}));
const seoSource = readFileSync(resolve(root, 'src/lib/seo-editorial.ts'), 'utf8');
const seventhTitleMatch = seoSource.includes('/chords/seventh') ? null : 'Seventh Piano Chords: 7, Maj7, Min7 & Half-Diminished';
const seventhPage = JSON.parse(readFileSync(resolve(root, 'docs/pianogrid-chords-n2c/02_category/seventh.page.json'), 'utf8'));
const familyKeep = [
  ['/chords/diminished','Diminished Chords','KEEP','Verified family title already names the chord type and piano notes; no bulk rewrite.'],
  ['/chords/augmented','Augmented Chords','KEEP','Verified family title already names the chord type and piano notes; no bulk rewrite.'],
  ['/chords/suspended','Suspended Chords','KEEP','Verified family title already names the chord type and piano notes; no bulk rewrite.'],
  ['/chords/add','Add9 Chords','KEEP','Verified family title already names the chord type and piano notes; no bulk rewrite.'],
  ['/chords/extended','Extended Chords','KEEP','Verified family title already names the chord type and piano notes; no bulk rewrite.'],
  ['/chords/altered','Altered Dominant Chords','KEEP','Verified family title already names the chord type and piano notes; no bulk rewrite.'],
];
const tdhRows = [
  {
    url: '/chords/seventh',
    current_title: seventhPage.title.includes('PianoGrid') ? seventhPage.title : seventhPage.title + ' | PianoGrid',
    current_h1: seventhPage.h1,
    candidate_title: '7th Chords on Piano: Types, Notes & Sound | PianoGrid',
    candidate_h1: '7th Chords on Piano',
    query_evidence: '7th chords = 1900 (R2 screenshot). This is not evidence that the full candidate Title string has volume 1900.',
    intent_fit: 'UNCHECKED',
    content_capability_check: 'Family page can show four seventh types, notes, diagrams, sound via detail links. Candidate is editorial only.',
    change_reason: 'REVIEW: align family wording with the observed 7th chords query. Current H1 is already clear; do not auto-apply.',
    approved: 'false',
  },
  ...familyKeep.map(([url, h1, status, reason]) => ({
    url, current_title: '', current_h1: h1, candidate_title: '', candidate_h1: '',
    query_evidence: 'Family keyword verified in prior 2026-09-17 editorial round; not re-opened here.',
    intent_fit: 'UNCHECKED', content_capability_check: 'Family browse plus detail or embedded references already exist.',
    change_reason: status + ': ' + reason, approved: 'false',
  })),
  {
    url: '/chords/c-add9',
    current_title: '', current_h1: '', candidate_title: '', candidate_h1: '',
    query_evidence: 'SCREENSHOT_GAP in the 138 pack; no numeric observation imported.',
    intent_fit: 'UNCHECKED', content_capability_check: 'Detail page exists with notes and voicings.',
    change_reason: 'PENDING: hold Title/H1 until the missing screenshot/query is filled.', approved: 'false',
  },
  {
    url: '/chords/b-diminished',
    current_title: '', current_h1: '', candidate_title: '', candidate_h1: '',
    query_evidence: 'SCREENSHOT_GAP in the 138 pack; no numeric observation imported.',
    intent_fit: 'UNCHECKED', content_capability_check: 'Detail page exists with notes and inversions.',
    change_reason: 'PENDING: hold Title/H1 until the missing screenshot/query is filled.', approved: 'false',
  },
];
for (const url of notCoveredBy138.filter((item) => setC.includes(item))) {
  tdhRows.push({
    url, current_title: '', current_h1: '', candidate_title: '', candidate_h1: '',
    query_evidence: 'Not in the 138 evidence pack. Original-plan mapping may exist separately and was not overwritten.',
    intent_fit: 'UNCHECKED', content_capability_check: 'Published detail route.',
    change_reason: 'KEEP: no bulk Title/H1 rewrite in this round.', approved: 'false',
  });
}
writeCsv('TDH_REVIEW_QUEUE.csv', ['url','current_title','current_h1','candidate_title','candidate_h1','query_evidence','intent_fit','content_capability_check','change_reason','approved'], tdhRows);

writeFileSync(resolve(outDir, '_counts.json'), JSON.stringify({
  public_routes: publicRoutes.length,
  A: setA.length, B: setB.length, C: setC.length, D: setD.length, E: setE.length, F: setF.length,
  csv138: csv138.length, e_and_f: eAndF, c_minus_euf: cMinusEUF, e_minus_c: eMinusC, f_minus_c: fMinusC,
  not_covered_by_138: notCoveredBy138, keyword_rows_chord: keywordChordRows.length, keyword_rows_detail: keywordDetailRows.length,
  query_rows: queryRows.length, page_rows: pageRows.length, tdh_rows: tdhRows.length, handoff,
  observation_status: statusCounts,
}, null, 2) + '\n');
console.log(JSON.stringify({ A: setA.length, B: setB.length, C: setC.length, D: setD.length, E: setE.length, F: setF.length, csv138: csv138.length, eAndF, tdh: tdhRows.length }, null, 2));
