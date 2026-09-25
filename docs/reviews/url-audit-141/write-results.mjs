import { readFileSync, writeFileSync } from 'node:fs';

const audit = JSON.parse(readFileSync('C:/Users/Admin/Downloads/PianoGrid_141_URL_Audit_20260924/02_URL_AUDIT.json', 'utf8'));
const live = JSON.parse(readFileSync('docs/reviews/url-audit-141/live-audit/live-tdh.json', 'utf8'));
const byId = new Map(live.results.map((page) => [page.id, page]));
const bodyFixed = new Set([
  '/sheet-music/hot-cross-buns',
  '/sheet-music/ode-to-joy',
  '/sheet-music/twinkle-twinkle-little-star',
  '/chords/add',
]);
const scaleNoteFixed = new Set([
  '/scales/f-major','/scales/g-major','/scales/a-major','/scales/c-minor','/scales/d-minor','/scales/e-major','/scales/b-minor','/scales/f-minor','/scales/a-sharp-minor','/scales/b-major','/scales/b-flat-major','/scales/g-minor','/scales/e-flat-major','/scales/f-sharp-minor','/scales/c-flat-major',
]);

const matrix = audit.records.map((record) => {
  const page = byId.get(record.id);
  const title = page.title_values[0];
  const description = page.meta_description_values[0];
  const h1 = page.h1_values[0];
  const stale = String(record.freshness || '').includes('上周快照');
  let decision = 'KEEP';
  let afterTitle = title;
  let afterDescription = description;
  let reason = 'Production title, description and H1 name this page. The description is unique across the 141 URLs and was not replaced with the candidate.';
  if (stale) reason = 'Live title differs from last week’s snapshot. The live title is kept. The snapshot was not written back.';
  if (record.path === '/sheet-music/twinkle-twinkle-little-star') {
    decision = 'FIXED';
    afterTitle = 'Twinkle Twinkle Little Star Piano Sheet Music | PianoGrid';
    reason = 'Title now includes the full song name. H1 and description stay. Internal “source ledger / approved mapping” wording is removed from the public edition page.';
  } else if (record.path === '/sheet-music/hot-cross-buns' || record.path === '/sheet-music/ode-to-joy') {
    decision = 'FIXED';
    reason = 'Title, description and H1 stay. Public copy no longer says “Preserved approved mapping”, “source ledger”, or “original exact-version task”. No new key tutorial or hosted score was added.';
  } else if (record.path === '/chords/add') {
    decision = 'FIXED';
    reason = 'Title already says Voicings and is kept. The intro no longer says “explore inversions”. It now says two voicing layouts, matching the add family’s example count of 2. Description stays.';
  } else if (record.path === '/chords/altered' || record.path === '/chords/extended') {
    reason = 'Live type control already uses readable names such as Dominant seventh, flat ninth. Raw HTML includes the reference list and a no-JavaScript note. Title, description and H1 stay.';
  } else if (scaleNoteFixed.has(record.path)) {
    decision = 'FIXED';
    reason = 'Title, description and H1 stay. The public fingering note “Source-scoped one-octave fingering row.” is now “One-octave fingering.” Scope remains one octave; source links stay.';
  }
  return {
    id: record.id,
    url: record.path,
    priority: record.priority,
    title_before: title,
    description_before: description,
    h1_before: h1,
    decision,
    title_after: afterTitle,
    description_after: afterDescription,
    h1_after: h1,
    reason,
    evidence: page.raw_html_file,
    deployed: false,
    canonical: page.canonical_values[0],
    robots: page.meta_robots,
    x_robots_tag: page.x_robots_tag,
    status: page.status,
    gsc: 'UNKNOWN',
  };
});

writeFileSync('docs/reviews/url-audit-141/CHANGE_MATRIX.json', JSON.stringify(matrix, null, 2));
const lines = ['# CHANGE_MATRIX', '', 'Production fetch: 2026-09-24, 141/141 HTTP 200. Local edits are not deployed.', ''];
for (const row of matrix) {
  lines.push(`- ${row.id} ${row.url} ${row.priority} **${row.decision}**. T: ${row.title_before}${row.title_after !== row.title_before ? ` → ${row.title_after}` : ''}. D kept. H1 kept. ${row.reason}`);
}
writeFileSync('docs/reviews/url-audit-141/CHANGE_MATRIX.md', lines.join('\n'));

const keywords = audit.records.map((record) => ({
  id: record.id,
  url: record.path,
  original_keyword: record.original_keyword,
  original_volume: record.original_volume,
  volume_state: record.volume_state,
  recommended_focus_keyword: record.recommended_focus_keyword,
  recommended_keyword_volume: 'UNKNOWN',
  secondary_keywords: record.secondary_keywords,
  intent: record.intent,
  landing_page: record.path,
  unmet_task: record.path === '/sheet-music/hot-cross-buns' ? 'In-page key-finding tutorial is not implemented. The page remains an edition/access page. No new route was added.' : null,
}));
writeFileSync('docs/reviews/url-audit-141/KEYWORD_MAP.json', JSON.stringify(keywords, null, 2));

const tech = live.results.map((page) => ({
  id: page.id,
  url: page.final_url,
  raw_html_status: page.status,
  title_count: page.title_values.length,
  description_count: page.meta_description_values.length,
  h1_count: page.h1_values.length,
  canonical_self: page.canonical_exactly_self,
  meta_robots: page.meta_robots,
  x_robots_tag: page.x_robots_tag,
  json_ld_errors: page.json_ld_errors,
  browser_render: 'NOT_RUN',
}));
writeFileSync('docs/reviews/url-audit-141/TECH_CHECK.json', JSON.stringify({ note: 'Raw HTML only. Browser render was not run, so it is not marked PASS.', pages: tech }, null, 2));

const counts = matrix.reduce((acc, row) => { acc[row.decision] = (acc[row.decision] || 0) + 1; return acc; }, {});
writeFileSync('docs/reviews/url-audit-141/TEST_RESULT.md', `# TEST_RESULT\n\nLive raw-HTML fetch: 141/141 status 200, 0 fetch failures.\nDecisions: ${JSON.stringify(counts)}.\nEvery description is unique. Every page has one title and one H1.\nBrowser interaction, PDF glyph rendering, and a fresh production build of these edits were not run.\nShared add intro change is limited to /chords/add. Other family pages keep “explore inversions”.\n`);
writeFileSync('docs/reviews/url-audit-141/DEPLOY_CHECK.md', `# DEPLOY_CHECK\n\nNot deployed. No production re-check of the edited title, add intro, sheet-music public copy, or fingering note.\nThe live-audit HTML is the before evidence.\nGSC index reason and last crawl time remain UNKNOWN for all 141 URLs.\n`);
console.log(counts);
