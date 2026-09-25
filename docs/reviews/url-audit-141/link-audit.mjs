import { readFileSync, readdirSync, writeFileSync } from 'node:fs';

const audit = JSON.parse(readFileSync('C:/Users/Admin/Downloads/PianoGrid_141_URL_Audit_20260924/02_URL_AUDIT.json', 'utf8'));
const sitemap = readFileSync('docs/reviews/url-audit-141/live-audit/sitemap.xml', 'utf8');
const sitemapPaths = new Set([...sitemap.matchAll(/<loc>https:\/\/pianogrid\.com([^<]*)<\/loc>/g)].map((match) => match[1] || '/'));

function pathOf(href) {
  try {
    const url = new URL(href, 'https://pianogrid.com');
    if (url.hostname !== 'pianogrid.com' && url.hostname !== 'www.pianogrid.com') return null;
    return url.pathname.replace(/\/$/, '') || '/';
  } catch {
    return null;
  }
}
function splitLinks(html) {
  const chromeHtml = [];
  const body = html.replace(/<header\b[\s\S]*?<\/header>/gi, (block) => { chromeHtml.push(block); return ''; })
    .replace(/<nav\b[\s\S]*?<\/nav>/gi, (block) => { chromeHtml.push(block); return ''; })
    .replace(/<footer\b[\s\S]*?<\/footer>/gi, (block) => { chromeHtml.push(block); return ''; });
  const hrefs = (source) => [...source.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map((match) => match[1]);
  return { chrome: hrefs(chromeHtml.join('\n')), body: hrefs(body) };
}
const pages = new Map();
for (const file of readdirSync('docs/reviews/url-audit-141/live-audit/html')) {
  const id = file.replace('.html', '');
  const record = audit.records.find((item) => item.id === id);
  pages.set(record.path, { id, html: readFileSync(`docs/reviews/url-audit-141/live-audit/html/${file}`, 'utf8') });
}
const extraSources = ['/', '/chords', '/chords/major', '/chords/minor', '/chords/seventh', '/chords/diminished', '/chords/augmented', '/chords/suspended', '/chords/add', '/chords/altered', '/chords/extended', '/scales', '/sheet-music', '/sheet-music/easy', '/sheet-music/beginner', '/songs', '/guide', '/keyboard-notes', '/tools'];
const extraHtml = new Map();
await Promise.all(extraSources.map(async (path) => {
  if (pages.has(path)) return;
  const response = await fetch('https://pianogrid.com' + path);
  extraHtml.set(path, await response.text());
}));
const inbound = new Map(audit.records.map((record) => [record.path, { nav: new Set(), body: new Set() }]));
function add(target, source, kind) {
  if (!inbound.has(target) || target === source) return;
  inbound.get(target)[kind].add(source);
}
for (const [source, page] of pages) {
  const parts = splitLinks(page.html);
  for (const href of parts.chrome) add(pathOf(href), source, 'nav');
  for (const href of parts.body) add(pathOf(href), source, 'body');
}
for (const [source, html] of extraHtml) {
  const parts = splitLinks(html);
  for (const href of parts.chrome) add(pathOf(href), source, 'nav');
  for (const href of parts.body) add(pathOf(href), source, 'body');
}

const navHubs = new Set(['/', '/chords', '/scales', '/sheet-music', '/songs', '/guide', '/tools', '/keyboard-notes']);
function depth(path) {
  if (inbound.get(path).nav.has('/') || inbound.get(path).body.has('/')) return 1;
  const sources = [...inbound.get(path).nav, ...inbound.get(path).body];
  if (sources.some((source) => navHubs.has(source))) return 2;
  if (sources.length) return 3;
  return null;
}
const rows = audit.records.map((record) => {
  const link = inbound.get(record.path);
  const navCount = link.nav.size;
  const bodyCount = link.body.size;
  const inSitemap = sitemapPaths.has(record.path);
  let linkClass = 'contextual';
  if (navCount + bodyCount === 0) linkClass = 'orphan';
  else if (bodyCount === 0) linkClass = 'nav-only';
  else if (bodyCount < 3) linkClass = 'weakly-linked';
  return {
    id: record.id,
    url: record.path,
    inSitemap,
    navInlinks: navCount,
    contextualInlinks: bodyCount,
    inlinkSources: [...new Set([...link.nav, ...link.body])].slice(0, 8),
    clickDepthFromHome: depth(record.path),
    linkClass,
  };
});
writeFileSync('docs/reviews/url-audit-141/INTERNAL_LINKS.json', JSON.stringify(rows, null, 2));
const counts = rows.reduce((acc, row) => { acc[row.linkClass] = (acc[row.linkClass] || 0) + 1; return acc; }, {});
const missingSitemap = rows.filter((row) => !row.inSitemap).map((row) => row.url);
console.log(JSON.stringify({ counts, missingSitemap: missingSitemap.length, sampleOrphan: rows.filter((row) => row.linkClass === 'orphan').map((row) => row.url).slice(0, 12) }, null, 2));
