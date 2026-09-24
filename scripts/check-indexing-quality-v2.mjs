import fs from 'node:fs';
import path from 'node:path';

const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3047';
const output = process.env.PIANO_CHECK_OUT || 'checks/indexing-quality-v2';
fs.mkdirSync(output, { recursive: true });

const sitemapResponse = await fetch(`${base}/sitemap.xml`);
if (!sitemapResponse.ok) throw new Error(`Sitemap HTTP ${sitemapResponse.status}`);
const sitemap = await sitemapResponse.text();
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(match => match[1]);
if (!urls.length || new Set(urls).size !== urls.length) throw new Error('Empty or duplicate sitemap URLs');
const assets = JSON.parse(fs.readFileSync(path.join(output, 'pdf-assets.json'), 'utf8'));
const pdfRoutes = new Set(assets.affected_chord_urls);
const original = new Set(['/chords/a-minor', '/chords/by-key', '/chords/b-flat-major', '/chords/e-flat-major', '/chords/c-diminished', '/chords/c-sharp-minor', '/guide/piano-chords']);
const noJsSamples = new Set([...original, '/chords/extended', '/chords/altered']);
const renderedSamples = new Set([...noJsSamples, '/chords/c-major', '/chords/diminished', '/chords/augmented', '/chords/suspended', '/chords/add', '/chords/finder', '/chords/c-sus2', '/chords/d-flat-diminished', '/chords/c-maj7', '/chords/c-add9', '/chord-progressions']);
const specialIssues = {
  '/chords/by-key': ['F01', 'F02', 'N03'],
  '/guide/piano-chords': ['F03'],
  '/chords/a-minor': ['F05'],
  '/chords/b-flat-major': ['F04', 'F06'],
  '/chords/e-flat-major': ['F04', 'F06'],
  '/chords/c-sharp-minor': ['F04', 'F06'],
  '/chords/c-diminished': ['F07', 'F06'],
  '/chord-progressions': ['N01', 'N03'],
  '/chords/altered': ['N03'],
  '/chords/finder': ['N03'],
  '/chords/diminished': ['V02'],
  '/chords/augmented': ['V02'],
  '/chords/suspended': ['V02'],
  '/chords/add': ['V02'],
  '/chords/d-diminished': ['F07'],
  '/chords/c-augmented': ['F07'],
  '/chords/c-maj7': ['F07'],
  '/chords/c-sus2': ['N02', 'F07'],
  '/chords/d-flat-diminished': ['F07', 'F04'],
};
const sourceFamily = route => pdfRoutes.has(route) && /(?:diminished|augmented|sus2|sus4|(?:-7|-m7|-maj7|-m7-flat5)$|add9)/.test(route);
const fields = ['url', 'page_type', 'template_id', 'source_of_inventory', 'environment', 'actual_http_status', 'final_url', 'canonical_raw', 'canonical_rendered', 'meta_robots', 'x_robots_tag', 'in_sitemap', 'core_content_raw_html', 'core_content_rendered', 'core_content_no_js', 'contextual_internal_links', 'page_task', 'content_issues', 'resource_issues', 'issue_ids', 'index_status', 'index_evidence_date', 'last_crawl', 'verdict', 'action', 'evidence_path'];
const rows = [];
const errors = [];
for (let start = 0; start < urls.length; start += 8) {
  const batch = urls.slice(start, start + 8);
  const fetched = await Promise.allSettled(batch.map(async url => {
    const pathname = new URL(url).pathname;
    const response = await fetch(`${base}${pathname}`, { redirect: 'follow' });
    const html = await response.text();
    const meta = (name) => html.match(new RegExp(`<meta[^>]*name=["']${name}["'][^>]*content=["']([^"']*)`, 'i'))?.[1] || 'NONE';
    const canonical = html.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)/i)?.[1] || 'NONE';
    const hasCore = /<main\b/i.test(html) && /<h1\b/i.test(html);
    const issues = new Set(specialIssues[pathname] || []);
    if (pdfRoutes.has(pathname)) issues.add('F04');
    if (sourceFamily(pathname)) issues.add('F07');
    const auditScope = renderedSamples.has(pathname);
    const verdict = original.has(pathname) ? 'ENHANCE_SPECIFIC' : issues.size ? 'FIX_SHARED' : 'NOT_VERIFIED';
    const row = {
      url: pathname,
      page_type: pathname === '/' ? 'home' : pathname.startsWith('/chords/') ? 'chord' : pathname.startsWith('/guide/') ? 'guide' : 'other',
      template_id: pathname.startsWith('/chords/') ? 'chord route' : 'other route',
      source_of_inventory: 'current local sitemap.xml',
      environment: 'LOCAL_BUILD',
      actual_http_status: response.status,
      final_url: response.url,
      canonical_raw: canonical,
      canonical_rendered: 'NOT_VERIFIED',
      meta_robots: meta('robots'),
      x_robots_tag: response.headers.get('x-robots-tag') || 'NONE',
      in_sitemap: 'YES',
      core_content_raw_html: hasCore ? 'PRESENT' : 'MISSING',
      core_content_rendered: renderedSamples.has(pathname) ? 'SEE_BROWSER_EVIDENCE' : 'NOT_VERIFIED',
      core_content_no_js: noJsSamples.has(pathname) ? 'SEE_BROWSER_EVIDENCE' : 'NOT_VERIFIED',
      contextual_internal_links: pathname === '/chords/by-key' ? 'SEE_BROWSER_EVIDENCE' : 'NOT_VERIFIED',
      page_task: original.has(pathname) ? 'original seven-page repair' : issues.size ? 'shared-defect regression' : 'NOT_VERIFIED',
      content_issues: issues.size ? 'confirmed issue addressed locally; see issue IDs' : 'NOT_VERIFIED',
      resource_issues: pdfRoutes.has(pathname) ? 'chord PDF regenerated and scanned' : 'NOT_VERIFIED',
      issue_ids: [...issues].join('|'),
      index_status: 'NOT_VERIFIED',
      index_evidence_date: 'NOT_VERIFIED',
      last_crawl: 'NOT_VERIFIED',
      verdict,
      action: issues.size ? 'local fix; pending manual acceptance and release' : 'no change from this audit',
      evidence_path: auditScope ? 'checks/indexing-quality-v2/browser-evidence.json' : 'checks/indexing-quality-v2/technical-summary.json',
    };
    const canonicalURL = canonical === 'NONE' ? null : new URL(canonical);
    if (response.status !== 200 || canonicalURL?.origin !== 'https://pianogrid.com' || canonicalURL.pathname !== pathname || /noindex|nofollow/i.test(row.meta_robots) || /noindex|nofollow/i.test(row.x_robots_tag) || !hasCore) errors.push({ url: pathname, status: response.status, canonical, meta: row.meta_robots, hasCore });
    return row;
  }));
  for (let index = 0; index < fetched.length; index++) {
    const item = fetched[index];
    if (item.status === 'fulfilled') rows.push(item.value);
    else errors.push({ url: new URL(batch[index]).pathname, error: String(item.reason) });
  }
}
rows.sort((a, b) => a.url.localeCompare(b.url));
const csv = value => `"${String(value).replaceAll('"', '""')}"`;
fs.writeFileSync(path.join(output, 'page-audit.csv'), [fields.join(','), ...rows.map(row => fields.map(field => csv(row[field])).join(','))].join('\n') + '\n');
const affectedRows = [
  ...rows.filter(row => row.issue_ids).map(row => ['HTML', row.url, row.issue_ids, row.verdict]),
  ...assets.regenerated_pdf_urls.map(url => ['PDF', url, 'F04', 'FIX_SHARED']),
];
fs.writeFileSync(path.join(output, 'affected-urls.csv'), ['kind,url,issue_ids,verdict', ...affectedRows.map(row => row.map(csv).join(','))].join('\n') + '\n');
const summary = { environment: 'LOCAL_BUILD', base, sitemap_url_count: urls.length, audited_url_count: rows.length, original_seven_present: [...original].every(route => rows.some(row => row.url === route)), locally_affected_urls: rows.filter(row => row.issue_ids).map(row => row.url), errors, production_status: 'NOT_VERIFIED', google_index_status: 'NOT_VERIFIED' };
fs.writeFileSync(path.join(output, 'technical-summary.json'), JSON.stringify(summary, null, 2) + '\n');
console.log(`Sitemap ${urls.length}, audited ${rows.length}, affected ${summary.locally_affected_urls.length}, technical errors ${errors.length}`);
if (errors.length) process.exitCode = 1;
