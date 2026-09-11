import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const base = 'https://pianogrid.com';
const routes = ['/', '/tools', '/songs', '/songs/easy', '/tools/blank-sheet-music', '/keyboard-notes', '/keyboard-notes/labeled', '/keyboard-notes/chart', '/chords', '/chords/a-major', '/chords/a-minor', '/chords/c-major', '/scales', '/scales/c-major', '/scales/a-minor', '/guide', '/guide/read-sheet-music'];
const pages = [];
for (const route of routes) {
  const response = await fetch(base + route, { redirect: 'manual', cache: 'no-store' });
  const html = await response.text();
  pages.push({
    route,
    status: response.status,
    etag: response.headers.get('etag'),
    vercelId: response.headers.get('x-vercel-id'),
    title: html.match(/<title>([^<]*)<\/title>/i)?.[1] ?? null,
    canonical: html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1] ?? null,
    indexFollow: /<meta[^>]+name="robots"[^>]+content="[^"]*index[^"]*follow/i.test(html)
  });
}
const songs = await (await fetch(base + '/songs', { cache: 'no-store' })).text();
const am = await (await fetch(base + '/chords/a-minor', { cache: 'no-store' })).text();
const sitemap = await (await fetch(base + '/sitemap.xml', { cache: 'no-store' })).text();
const result = {
  checkedAt: new Date().toISOString(),
  production: {
    deploymentId: 'dpl_3n1YaAXaS4vpWsNARxRvYde9yiTt',
    deploymentUrl: 'https://piano-grid-lrdkvd3b3-weiweis-projects-eb330b65.vercel.app',
    alias: base,
    readyState: 'READY'
  },
  routes: pages,
  assertions: {
    all17Http200: pages.length === 17 && pages.every(x => x.status === 200),
    all17CanonicalAndIndexFollow: pages.every(x => new URL(x.canonical).href === new URL(base + (x.route === '/' ? '/' : x.route)).href && x.indexFollow),
    sitemapHasExactly17Locs: [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].length === 17,
    songsHasSeparatedFields: ['Difficulty (publisher label)', 'Arrangement', 'Acquisition format'].every(value => songs.includes(value)),
    swedenHasDigitalBookRestriction: songs.includes('online-only and cannot be downloaded or printed'),
    swedenDuplicateBylineAbsent: !songs.includes('Daniel Rosenfeld · C418 / Daniel Rosenfeld'),
    amRawHtmlCurrentSelectionCountNotUsedForAccessibility: (am.match(/current selection/g) || []).length
  }
};
await writeFile(resolve('audit/pianogrid-17-pages/20260911-094050/evidence/postdeploy-verification.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result.assertions, null, 2));
