import { createRequire } from 'node:module';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium, request } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const root = resolve('audit/pianogrid-17-pages/20260911-094050');
const base = 'https://pianogrid.com';
const captures = JSON.parse(await readFile(resolve(root,'evidence','page-captures.json'),'utf8'));
const routes = captures.routes;
const api = await request.newContext({ userAgent: 'PianoGridIndependentAudit/1.0' });

async function fetchRecord(url, options = {}) {
  try {
    const response = await api.get(url, { timeout: 30000, ...options });
    const body = await response.body();
    return { url, status: response.status(), finalURL: response.url(), headers: await response.allHeaders(), bytes: body.length, text: body.toString('utf8').slice(0,20000) };
  } catch (error) { return { url, error: error.message }; }
}

const protocol = [];
for (const url of ['https://pianogrid.com/','http://pianogrid.com/','https://www.pianogrid.com/']) protocol.push(await fetchRecord(url, { maxRedirects: 0 }));
const robots = await fetchRecord(`${base}/robots.txt`);
const sitemap = await fetchRecord(`${base}/sitemap.xml`);
const notFound = [];
for (const path of ['/audit-route-that-does-not-exist','/songs/pop','/sheet-music']) notFound.push(await fetchRecord(base+path));

const internal = new Set(), external = new Set(), assets = new Set();
for (const page of captures.pages) {
  for (const link of [...page.desktop.mainLinks, ...page.desktop.globalLinks]) {
    if (link.href.startsWith(base)) internal.add(link.href.split('#')[0]);
    else if (link.href.startsWith('http')) external.add(link.href);
  }
  for (const link of page.desktop.externalLinks) if (link.href.startsWith('http') && !link.href.startsWith(base)) external.add(link.href);
  for (const image of page.desktop.images) if (image.src.startsWith(base)) assets.add(image.src);
}
const internalResults = [];
for (const url of [...internal].sort()) { const item = await fetchRecord(url); internalResults.push({ url, status:item.status, finalURL:item.finalURL, contentType:item.headers?.['content-type'], error:item.error }); }
const externalResults = [];
for (const url of [...external].sort()) { const item = await fetchRecord(url); externalResults.push({ url, status:item.status, finalURL:item.finalURL, contentType:item.headers?.['content-type'], error:item.error, title:item.text?.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1] ?? null }); }
const assetResults = [];
for (const url of [...assets].sort()) { const item = await fetchRecord(url); assetResults.push({ url, status:item.status, finalURL:item.finalURL, contentType:item.headers?.['content-type'], bytes:item.bytes, error:item.error }); }

const sitemapURLs = [...(sitemap.text ?? '').matchAll(/<loc>(.*?)<\/loc>/g)].map(match => match[1]);
const expectedURLs = routes.map(route => base + route);
const routeStability = [];
for (const page of captures.pages) {
  const item = await fetchRecord(base + page.route);
  routeStability.push({ route:page.route, initialEtag:page.desktop.response_headers.etag??null, recheckEtag:item.headers?.etag??null, sameEtag:(page.desktop.response_headers.etag??null)===(item.headers?.etag??null), status:item.status, vercelCache:item.headers?.['x-vercel-cache']??null, vercelId:item.headers?.['x-vercel-id']??null });
}

const analyticsPatterns = ['vercel/analytics','google-analytics','googletagmanager','plausible','umami','dataLayer','gtag('];
const analytics = captures.pages.map(page => {
  const html = page.desktop.bodyText + '\n' + page.desktop.jsonLd.join('\n');
  return { route:page.route, matches:analyticsPatterns.filter(pattern => html.toLowerCase().includes(pattern.toLowerCase())) };
});

const browser = await chromium.launch({channel:'chrome',headless:true});
for (const [mode,viewport] of [['desktop',{width:1440,height:1000}],['mobile',{width:390,height:844}]]) {
  const context = await browser.newContext({viewport}); const page = await context.newPage();
  await page.goto(`${base}/audit-route-that-does-not-exist`,{waitUntil:'networkidle'});
  await page.screenshot({path:resolve(root,'evidence',`404-${mode}.png`),fullPage:true}); await context.close();
}
await browser.close();

const result = {
  checked_at:new Date().toISOString(), protocol, robots:{...robots,text:robots.text}, sitemap:{...sitemap,text:sitemap.text,urls:sitemapURLs,exact17:new Set(sitemapURLs).size===17&&expectedURLs.every(url=>sitemapURLs.includes(url))},
  notFound, internalResults, externalResults, assetResults, routeStability,
  deploymentEvidence:{server:[...new Set(captures.pages.map(page=>page.desktop.response_headers.server))],cache:[...new Set(captures.pages.map(page=>page.desktop.response_headers['x-vercel-cache']))],vercelIds:captures.pages.map(page=>page.desktop.response_headers['x-vercel-id']),note:'Vercel headers, ETags and immutable asset names identify observed responses but do not prove a Git commit.'},
  analytics,
};
await writeFile(resolve(root,'evidence','supplement-results.json'),JSON.stringify(result,null,2)+'\n');
await api.dispose();
console.log(`supplement done: ${internalResults.length} internal, ${externalResults.length} external, ${assetResults.length} assets`);
