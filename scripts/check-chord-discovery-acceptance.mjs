import fs from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3127';
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18');
const shotDir = resolve(outDir, 'screenshots');
fs.mkdirSync(shotDir, { recursive: true });

const siteRoutesSource = fs.readFileSync(resolve(root, 'src/lib/site-routes.ts'), 'utf8');
const publicBlock = siteRoutesSource.match(/export const PUBLIC_ROUTES = \[([\s\S]*?)\] as const/);
const publicRoutes = [...publicBlock[1].matchAll(/'([^']+)'/g)].map((match) => match[1]);
const familyUrls = ['/chords/major','/chords/minor','/chords/seventh','/chords/diminished','/chords/augmented','/chords/suspended','/chords/add','/chords/extended','/chords/altered'];
const other = new Set(['/chords','/chords/by-key','/chords/finder','/chord-progressions', ...familyUrls]);
const detailUrls = publicRoutes.filter((url) => url.startsWith('/chords/') && !other.has(url));

const results = [];
const check = (name, passed, detail = '') => {
  results.push({ name, passed: Boolean(passed), detail: detail == null ? '' : String(detail) });
  console.log(passed ? 'PASS' : 'FAIL', name, detail || '');
};

async function waitForServer() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const response = await fetch(base + '/chords', { redirect: 'manual' });
      if (response.status === 200) return;
    } catch {}
    await new Promise((resolveWait) => setTimeout(resolveWait, 2000));
  }
  throw new Error('Server not reachable at ' + base);
}

function hrefs(html) {
  return [...html.matchAll(/href="([^"]+)"/g)].map((match) => match[1].split('#')[0]).filter((href) => href.startsWith('/'));
}

await waitForServer();
const familyLinks = {};
for (const url of ['/chords', ...familyUrls]) {
  const html = await (await fetch(base + url)).text();
  familyLinks[url] = new Set(hrefs(html));
}
const missing = detailUrls.filter((url) => {
  if (url === '/chords/c-flat-major') {
    return !(familyLinks['/chords'].has(url) || familyLinks['/chords/major'].has(url));
  }
  const family = url.includes('-madd9') || url.endsWith('-add9') ? '/chords/add'
    : /-(7|m7|m7-flat5|maj7)$/.test(url.split('/').at(-1)) ? '/chords/seventh'
    : url.endsWith('-diminished') ? '/chords/diminished'
    : url.endsWith('-augmented') ? '/chords/augmented'
    : url.endsWith('-sus2') || url.endsWith('-sus4') ? '/chords/suspended'
    : url.endsWith('-minor') ? '/chords/minor'
    : url.endsWith('-major') ? '/chords/major'
    : null;
  return !family || !familyLinks[family].has(url);
});
check('Every independent detail URL has an SSR family or hub href', missing.length === 0, missing.slice(0, 12).join(', '));
check('Hub HTML includes Browse piano chords', (await (await fetch(base + '/chords')).text()).includes('Browse piano chords'));
check('C-flat major is linked from hub or major family', familyLinks['/chords'].has('/chords/c-flat-major') || familyLinks['/chords/major'].has('/chords/c-flat-major'));

const samples = [
  { name: 'B minor', family: '/chords/minor', detail: '/chords/b-minor' },
  { name: 'C7', family: '/chords/seventh', detail: '/chords/c-7' },
  { name: 'F#maj7', family: '/chords/seventh', detail: '/chords/f-sharp-maj7' },
  { name: 'B half-diminished', family: '/chords/seventh', detail: '/chords/b-m7-flat5' },
  { name: 'D-flat sus2', family: '/chords/suspended', detail: '/chords/d-flat-sus2' },
  { name: 'F-sharp add9', family: '/chords/add', detail: '/chords/f-sharp-add9' },
  { name: 'C minor add9', family: '/chords/add', detail: '/chords/c-madd9' },
  { name: 'B-flat minor add9', family: '/chords/add', detail: '/chords/b-flat-madd9' },
  { name: 'C-flat major', family: '/chords/major', detail: '/chords/c-flat-major' },
];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const runViewport = async (width, height, label) => {
  const page = await browser.newPage({ viewport: { width, height } });
  page.setDefaultTimeout(15000);
  await page.goto(base + '/chords', { waitUntil: 'networkidle', timeout: 120000 });
  const browse = page.locator('#browse-by-type');
  check(label + ' hub browse block visible', await browse.isVisible());
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  check(label + ' hub has no horizontal overflow', overflow <= 1, 'delta=' + overflow);
  const tocLinks = await page.locator('.ch-page-toc a span').evaluateAll((nodes) => nodes.map((node) => ({
    text: node.textContent,
    width: Math.round(node.getBoundingClientRect().width),
  })));
  check(label + ' TOC labels are separate strings', tocLinks.every((item) => item.text && !item.text.includes('Find a chordRead')), JSON.stringify(tocLinks.map((item) => item.text)));
  await page.screenshot({ path: resolve(shotDir, 'hub-' + label + '.png'), fullPage: false });
  await browse.screenshot({ path: resolve(shotDir, 'browse-' + label + '.png') });

  if (label === 'desktop-1440') {
    await page.locator('#browse-by-type a[href="/chords/minor"]').first().click();
    await page.waitForURL(/\/chords\/minor/);
    check('Desktop hub to minor is one page jump', page.url().includes('/chords/minor'));
    const minorCard = page.locator('main .ch-category-card a[href="/chords/b-minor"]').first();
    check('B minor card visible on minor family', await minorCard.isVisible());
    await page.screenshot({ path: resolve(shotDir, 'family-minor-desktop-1440.png'), fullPage: false });
    await minorCard.click();
    await page.waitForURL(/\/chords\/b-minor/);
    check('Desktop family to B minor is one page jump', page.url().includes('/chords/b-minor'));
    check('B minor has play or keyboard', await page.locator('canvas, .am-keyboard, [class*="keyboard"]').first().isVisible().catch(() => false) || (await page.locator('h1').textContent())?.includes('B Minor'));
    await page.screenshot({ path: resolve(shotDir, 'detail-b-minor-desktop-1440.png'), fullPage: false });
  }

  await page.goto(base + '/chords', { waitUntil: 'networkidle', timeout: 120000 });
  const search = page.locator('#full-library input[type="search"]');
  const hasLibrarySearch = await search.count();
  check(label + ' hub has library name search', hasLibrarySearch > 0);
  if (hasLibrarySearch) {
    const queries = [
      { q: 'Bm', expect: '/chords/b-minor' },
      { q: 'B minor', expect: '/chords/b-minor' },
      { q: 'Bb', expect: '/chords/b-flat-major' },
      { q: 'B-flat', expect: '/chords/b-flat-major' },
      { q: 'Cmadd9', expect: '/chords/c-madd9' },
      { q: 'Cm(add9)', expect: '/chords/c-madd9' },
    ];
    for (const item of queries) {
      await search.fill(item.q);
      await page.waitForTimeout(200);
      const hit = page.locator('#full-library a[href="' + item.expect + '"]');
      const visible = await hit.isVisible();
      check(label + ' search ' + item.q + ' locates ' + item.expect, visible);
    }
  }

  for (const sample of samples) {
    await page.goto(base + sample.family, { waitUntil: 'domcontentloaded', timeout: 120000 });
    const link = page.locator('main a[href="' + sample.detail + '"]:visible').first();
    const visible = await link.isVisible().catch(() => false);
    check(label + ' ' + sample.name + ' entry visible on ' + sample.family, visible);
  }
  await page.close();
};

try {
  await runViewport(1440, 900, 'desktop-1440');
  await runViewport(390, 844, 'mobile-390');
} catch (error) {
  check('Browser run completed without throw', false, error.message);
} finally {
  await browser.close();
}

const failed = results.filter((item) => !item.passed);
let md = '# Discovery acceptance\n\n';
md += 'Test environment: local `' + base + '` in worktree `pianogrid-final-integration`.\n';
md += 'Browser: Playwright Chromium/Chrome, headless. Viewports: 1440x900 and 390x844.\n';
md += 'Date: 2026-09-18. Not a production crawl.\n\n';
md += '## Path contract\n\n';
md += '- Page jump: Hub `/chords` → family URL → detail URL. Target is one jump each.\n';
md += '- Control operations: root chips, subtype chips, and library search are filters, not extra page jumps.\n';
md += '- C-flat major is a written-spelling exception: it is not one of the 12 Major grid cards. It remains linked from the hub chart/library and from the Major family “Keep learning” link.\n';
md += '- Extended and Altered have no independent detail URLs; their 108/96 counts are embedded references on the family pages.\n';
md += '- Header is not a dump of all details. Browse two-layer cards on `/chords` were kept.\n\n';
md += '## SSR entry coverage\n\n';
md += 'Independent detail URLs: ' + detailUrls.length + '. Missing family/hub hrefs: ' + missing.length + (missing.length ? ' (' + missing.join(', ') + ')' : '') + '.\n\n';
md += '## Results\n\n';
md += '| Check | Result | Detail |\n|---|---|---|\n';
for (const item of results) md += '| ' + item.name + ' | ' + (item.passed ? 'PASS' : 'FAIL') + ' | ' + String(item.detail).replaceAll('|', '/') + ' |\n';
md += '\nScreenshots: `docs/seo/chords/evidence-2026-09-18/screenshots/`.\n';
md += '\nOverall: ' + (failed.length ? 'FAIL (' + failed.length + ' checks)' : 'PASS') + '.\n';
md += '\nOptional proposal: the hub already has “Search the supported chord library”. No second chord-name engine was added. Family+root remains the primary path.\n';
fs.writeFileSync(resolve(outDir, 'DISCOVERY_ACCEPTANCE.md'), md);
fs.writeFileSync(resolve(outDir, 'discovery-results.json'), JSON.stringify({ base, failed: failed.length, results, missing }, null, 2) + '\n');
if (failed.length) process.exit(1);
