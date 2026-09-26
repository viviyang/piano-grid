import { readFileSync, writeFileSync } from 'node:fs';

const audit = JSON.parse(readFileSync('C:/Users/Admin/Downloads/PianoGrid_141_URL_Audit_20260924/02_URL_AUDIT.json', 'utf8'));
const live = JSON.parse(readFileSync('docs/reviews/url-audit-141/live-audit/live-tdh.json', 'utf8'));
const byId = new Map(live.results.map((page) => [page.id, page]));
const fixed = new Set([
  '/sheet-music/twinkle-twinkle-little-star',
  '/sheet-music/hot-cross-buns',
  '/sheet-music/ode-to-joy',
  '/chords/add',
]);
const rows = audit.records.map((record) => {
  const page = byId.get(record.id);
  const title = page?.title_values?.[0] ?? null;
  const description = page?.meta_description_values?.[0] ?? null;
  const h1 = page?.h1_values?.[0] ?? null;
  const stale = String(record.freshness || '').includes('上周快照');
  return {
    id: record.id,
    path: record.path,
    priority: record.priority,
    status: page?.status ?? page?.fetch_error ?? null,
    title,
    description,
    h1,
    canonical: page?.canonical_values?.[0] ?? null,
    robots: page?.meta_robots ?? [],
    h1Count: page?.h1_values?.length ?? 0,
    titleCount: page?.title_values?.length ?? 0,
    descriptionCount: page?.meta_description_values?.length ?? 0,
    stale,
    observedTitle: record.observed_title,
    proposedDescription: record.proposed_description,
    decision: fixed.has(record.path) ? 'FIXED' : 'KEEP',
  };
});
const missingD = rows.filter((row) => !row.description);
const multiH1 = rows.filter((row) => row.h1Count !== 1);
const titleMismatch = rows.filter((row) => row.title && row.observedTitle && row.title !== row.observedTitle);
const priorities = rows.reduce((acc, row) => { acc[row.priority] = (acc[row.priority] || 0) + 1; return acc; }, {});
writeFileSync('docs/reviews/url-audit-141/decision-preview.json', JSON.stringify({ priorities, missingD: missingD.map((row) => row.path), multiH1: multiH1.map((row) => ({ path: row.path, n: row.h1Count })), titleMismatch: titleMismatch.map((row) => ({ id: row.id, path: row.path, live: row.title, observed: row.observedTitle, stale: row.stale })), fixed: [...fixed] }, null, 2));
console.log(JSON.stringify({ count: rows.length, priorities, missingD: missingD.length, multiH1: multiH1.length, titleMismatch: titleMismatch.length, errors: rows.filter((row) => row.status && row.status !== 200).length }, null, 2));
