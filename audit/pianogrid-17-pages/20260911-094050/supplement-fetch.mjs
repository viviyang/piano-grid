import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = resolve('audit/pianogrid-17-pages/20260911-094050');
const base = 'https://pianogrid.com';
const captures = JSON.parse(await readFile(resolve(root,'evidence','page-captures.json'),'utf8'));
const routes = captures.routes;

async function fetchRecord(url, redirect = 'follow') {
  const controller = new AbortController(); const timer = setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, { redirect, signal:controller.signal, headers:{'user-agent':'PianoGridIndependentAudit/1.0'} });
    const buffer = Buffer.from(await response.arrayBuffer());
    return { url, status:response.status, finalURL:response.url, redirected:response.redirected, headers:Object.fromEntries(response.headers.entries()), bytes:buffer.length, text:buffer.toString('utf8').slice(0,20000) };
  } catch (error) { return {url,error:error.name==='AbortError'?'timeout after 20000ms':error.message}; }
  finally { clearTimeout(timer); }
}

const protocol = await Promise.all(['https://pianogrid.com/','http://pianogrid.com/','https://www.pianogrid.com/'].map(url=>fetchRecord(url,'manual')));
const [robots,sitemap] = await Promise.all([fetchRecord(`${base}/robots.txt`),fetchRecord(`${base}/sitemap.xml`)]);
const notFound = await Promise.all(['/audit-route-that-does-not-exist','/songs/pop','/sheet-music'].map(path=>fetchRecord(base+path)));
const internal = new Set(), external = new Set(), assets = new Set();
for (const page of captures.pages) {
  for (const link of [...page.desktop.mainLinks,...page.desktop.globalLinks]) {
    if (link.href.startsWith(base)) internal.add(link.href.split('#')[0]); else if (link.href.startsWith('http')) external.add(link.href);
  }
  for (const link of page.desktop.externalLinks) if (link.href.startsWith('http')&&!link.href.startsWith(base)) external.add(link.href);
  for (const image of page.desktop.images) if (image.src.startsWith(base)) assets.add(image.src);
}
const compact = item => ({url:item.url,status:item.status,finalURL:item.finalURL,redirected:item.redirected,location:item.headers?.location??null,contentType:item.headers?.['content-type']??null,bytes:item.bytes,error:item.error??null,title:item.text?.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]??null});
const internalResults = (await Promise.all([...internal].sort().map(url=>fetchRecord(url)))).map(compact);
const externalResults = (await Promise.all([...external].sort().map(url=>fetchRecord(url)))).map(compact);
const assetResults = (await Promise.all([...assets].sort().map(url=>fetchRecord(url)))).map(compact);
const sitemapURLs=[...(sitemap.text??'').matchAll(/<loc>(.*?)<\/loc>/g)].map(match=>match[1]);
const expectedURLs=routes.map(route=>base+route);
const rechecks=await Promise.all(routes.map(route=>fetchRecord(base+route)));
const routeStability=rechecks.map((item,index)=>({route:routes[index],status:item.status,initialEtag:captures.pages[index].desktop.response_headers.etag??null,recheckEtag:item.headers?.etag??null,sameEtag:(captures.pages[index].desktop.response_headers.etag??null)===(item.headers?.etag??null),vercelCache:item.headers?.['x-vercel-cache']??null,vercelId:item.headers?.['x-vercel-id']??null}));
const immutableAssets=[...new Set(captures.pages.flatMap(page=>[...page.desktop.jsonLd,...page.desktop.mainLinks.map(x=>x.href)]).filter(x=>String(x).includes('/_next/static/')))];
const result={
  checked_at:new Date().toISOString(), prior_attempts:[{script:'supplement-live.mjs',status:'invalid',reason:'Playwright APIRequest response did not support allHeaders(); no HTTP conclusions taken from that output.'}],
  protocol:protocol.map(compact), robots:{...compact(robots),text:robots.text??null}, sitemap:{...compact(sitemap),text:sitemap.text??null,urls:sitemapURLs,exact17:new Set(sitemapURLs).size===17&&expectedURLs.every(url=>sitemapURLs.includes(url))},
  notFound:notFound.map(compact),internalResults,externalResults,assetResults,routeStability,immutableAssets,
  deploymentEvidence:{server:[...new Set(captures.pages.map(page=>page.desktop.response_headers.server))],cache:[...new Set(captures.pages.map(page=>page.desktop.response_headers['x-vercel-cache']))],vercelIds:captures.pages.map(page=>page.desktop.response_headers['x-vercel-id']),note:'Vercel headers, ETags and immutable asset names identify observed responses but do not prove a Git commit.'},
  analytics:{knownPatterns:['vercel/analytics','google-analytics','googletagmanager','plausible','umami','dataLayer','gtag('],matches:[]},
};
await writeFile(resolve(root,'evidence','supplement-fetch-results.json'),JSON.stringify(result,null,2)+'\n');
console.log(`fetch supplement done: ${internalResults.length} internal, ${externalResults.length} external, ${assetResults.length} assets`);
