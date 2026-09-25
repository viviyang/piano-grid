import { readFileSync, writeFileSync } from 'node:fs';

const audit = JSON.parse(readFileSync('C:/Users/Admin/Downloads/PianoGrid_141_URL_Audit_20260924/02_URL_AUDIT.json', 'utf8'));
const live = JSON.parse(readFileSync('docs/reviews/url-audit-141/live-audit/live-tdh.json', 'utf8'));
const links = JSON.parse(readFileSync('docs/reviews/url-audit-141/INTERNAL_LINKS.json', 'utf8'));
const byLive = new Map(live.results.map((page) => [page.id, page]));
const byLink = new Map(links.map((row) => [row.url, row]));
const sharedSource = new Set();
for (const page of live.results) {
  const record = audit.records.find((item) => item.id === page.id);
  const html = readFileSync(page.raw_html_file, 'utf8');
  if (/Source record:|Source-scoped|Checked for:/i.test(html)) sharedSource.add(record.path);
}

const rows = audit.records.map((record) => {
  const link = byLink.get(record.path);
  let decision = 'KEEP_STRONG';
  let why = 'The page’s visible job matches its URL: it names the chord, scale, tool, or edition and shows the concrete notes, access terms, or practice already on the page. No public engineering ledger was found in its raw HTML. Description uniqueness was not the reason.';
  if (record.path === '/sheet-music/hot-cross-buns') {
    decision = 'INTENT_REMAP';
    why = 'The page is an edition and access guide for Hoffman Academy Lesson 1. It does not teach piano keys. Recommended focus keyword is now “hot cross buns piano sheet music” with volume UNKNOWN. The old keyword “hot cross buns piano keys” is NOT_IMPLEMENTED: no Songs page teaches those keys, and no tutorial was added to this page.';
  } else if (record.path === '/chords/c-major') {
    decision = 'PAGE_FIX';
    why = 'The pilot page renders “What to notice”, “Compare three positions”, and “Root-position fingering examples” twice in the visible document: once as the open panel control and again as the section heading inside it. The print-only article is separate and was not removed. The inner headings are now omitted on this pilot page. Search and on-page links still use those names once.';
  } else if (sharedSource.has(record.path)) {
    decision = 'KEEP_NEEDS_SHARED_FIX';
    why = 'The notes, fingering, and practice stay. The public scale source block was showing “Source record:” IDs, “Checked for:”, or “Source-scoped” audit wording. That wording is removed in the shared scale source components. Publisher, title, link, what the source supports, and a real location stay.';
  } else if (record.path === '/sheet-music/ode-to-joy' || record.path === '/sheet-music/twinkle-twinkle-little-star') {
    decision = 'KEEP_STRONG';
    why = 'These keywords ask for sheet music, and the pages are edition/access pages for one named version. They do not claim to host the score. The earlier removal of ledger wording stays. No extra song list was added.';
  }
  return {
    id: record.id,
    url: record.path,
    priority: record.priority,
    decision,
    why,
    inSitemap: link.inSitemap,
    navInlinks: link.navInlinks,
    contextualInlinks: link.contextualInlinks,
    clickDepthFromHome: link.clickDepthFromHome,
    linkClass: link.linkClass,
    inlinkSources: link.inlinkSources,
    gsc: 'UNKNOWN',
    deployed: false,
  };
});
writeFileSync('docs/reviews/url-audit-141/CHANGE_MATRIX_V2.json', JSON.stringify(rows, null, 2));
const lines = ['# CHANGE_MATRIX_V2', '', 'Not deployed. Round-1 edits were kept. GSC status is UNKNOWN for every URL.', ''];
for (const row of rows) lines.push(`- ${row.id} ${row.url} **${row.decision}**. ${row.why} Links: sitemap ${row.inSitemap}, nav ${row.navInlinks}, contextual ${row.contextualInlinks}, depth ${row.clickDepthFromHome}, ${row.linkClass}.`);
writeFileSync('docs/reviews/url-audit-141/CHANGE_MATRIX_V2.md', lines.join('\n'));
writeFileSync('docs/reviews/url-audit-141/KEYWORD_MAP_V2.json', JSON.stringify({
  id: 'PG-053',
  url: '/sheet-music/hot-cross-buns',
  original_keyword: 'hot cross buns piano keys',
  original_volume: 320,
  recommended_focus_keyword: 'hot cross buns piano sheet music',
  recommended_keyword_volume: 'UNKNOWN',
  keys_task: 'NOT_IMPLEMENTED',
  keys_task_reason: 'No Songs page teaches Hot Cross Buns keys. This sheet-music page was not given a new key tutorial.',
}, null, 2));
const counts = rows.reduce((acc, row) => { acc[row.decision] = (acc[row.decision] || 0) + 1; return acc; }, {});
console.log(counts, 'shared', sharedSource.size);
