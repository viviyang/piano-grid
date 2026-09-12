import fs from 'node:fs';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3000';
const out = process.env.PIANO_CHECK_OUT || 'docs/pianogrid-chords-content-next/09_codex-results/latest/support-pages';
fs.mkdirSync(`${out}/screenshots`, { recursive: true });

const master = JSON.parse(fs.readFileSync('docs/content/site-master/page-content.master.json', 'utf8'));
const modules = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/02_content/support.modules.json', 'utf8'));
const seo = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/01_planning/url-seo-keywords.master.json', 'utf8'));
const linkPlan = JSON.parse(fs.readFileSync('docs/pianogrid-chords-content-next/01_planning/internal-links.json', 'utf8'));
const routes = ['/guide/piano-chords', '/keyboard-notes/finger-numbers'];
const publicRoutes = new Set(['/', '/tools', '/chords', '/chords/a-minor', '/chords/a-major', '/chords/c-major', '/chords/g-major', '/chords/c-minor', '/chords/e-major', '/chords/b-major', '/chords/a-flat-major', '/chords/by-key', '/chord-progressions', '/keyboard-notes', '/keyboard-notes/labeled', '/keyboard-notes/chart', '/keyboard-notes/finger-numbers', '/scales', '/scales/c-major', '/scales/a-minor', '/songs', '/songs/easy', '/guide', '/guide/read-sheet-music', '/guide/piano-chords', '/tools/blank-sheet-music']);
const results = [], runtimeErrors = [];
function check(name, passed, detail = '') { results.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); }
function plain(value) { return value.replaceAll('’', "'").replaceAll('–', '-').replace(/\s+/g, ' ').trim(); }
function targetPath(href) { return href.split('#')[0]; }

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const route of routes) {
    const pageSource = master.pages[route];
    const moduleSource = modules[route];
    const seoSource = seo.pages.find(item => item.url === route);
    const nojs = await browser.newPage({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
    const response = await nojs.goto(base + route);
    const raw = await response.text();
    fs.writeFileSync(`${out}/${route.split('/').at(-1)}-raw.html`, raw);
    const body = plain(await nojs.locator('body').textContent());
    check(`${route} HTTP 200`, response.status() === 200, response.status());
    check(`${route} planned TDK and H1`, (await nojs.title()) === seoSource.title && (await nojs.locator('meta[name="description"]').getAttribute('content')) === seoSource.description && (await nojs.locator('link[rel="canonical"]').getAttribute('href')) === seoSource.canonical && plain(await nojs.locator('h1').innerText()) === plain(seoSource.h1));
    check(`${route} server-rendered HTML`, raw.includes('<h1') && raw.includes('data-block-id=') && !raw.includes('BAILOUT_TO_CLIENT_SIDE_RENDERING'));
    check(`${route} preserves original blocks`, pageSource.blocks.every(block => body.includes(plain(block.heading)) && body.includes(plain(block.body))), pageSource.blocks.map(block => block.heading));
    const missingModuleText = moduleSource.supplemental_blocks.flatMap(block => [block.content.heading, ...block.content.paragraphs, ...block.content.steps, ...(block.content.table?.rows.flat() || [])]).filter(text => !body.includes(plain(text)));
    check(`${route} includes all prepared modules`, missingModuleText.length === 0, missingModuleText);
    const expectedLinks = linkPlan.edges.filter(edge => edge.from === route && publicRoutes.has(targetPath(edge.href)));
    const actualLinks = await nojs.locator('a').evaluateAll(items => items.map(item => item.getAttribute('href')));
    check(`${route} planned published links`, expectedLinks.every(edge => actualLinks.includes(edge.href)), expectedLinks.map(edge => edge.id));
    check(`${route} hides unavailable planned links`, linkPlan.edges.filter(edge => edge.from === route && !publicRoutes.has(targetPath(edge.href))).every(edge => !actualLinks.includes(edge.href)));
    check(`${route} no missing declared asset`, !raw.includes('c-major-rh-fingers.svg') && !raw.includes('chord-progressions-c-e-a.pdf') && await nojs.locator('img').count() === 0);
    check(`${route} no duplicate IDs`, await nojs.evaluate(() => { const ids = [...document.querySelectorAll('[id]')].map(item => item.id); return ids.length === new Set(ids).size; }));
    for (const href of [...new Set(actualLinks.filter(href => href?.startsWith('/') && !href.startsWith('/#')).map(targetPath))]) {
      const linked = await nojs.request.get(base + href);
      check(`${route} linked resource ${href}`, linked.status() === 200, linked.status());
    }
    if (route === '/guide/piano-chords') {
      check('Guide has four starter chords without duplicating the 19-card hub', await nojs.locator('.sp-chord-grid article').count() === 4 && await nojs.locator('.ch-result').count() === 0);
      check('Guide renders verified RH 1-3-5 and three transition positions', plain(await nojs.locator('.sp-fingering-example').innerText()).includes('1 C 3 E 5 G') && await nojs.locator('.sp-transition > div').count() === 3);
    } else {
      check('Finger page renders two semantic player-view diagrams', await nojs.locator('.sp-hand').count() === 2 && await nojs.locator('[data-hand="left"][data-order="5,4,3,2,1"]').count() === 1 && await nojs.locator('[data-hand="right"][data-order="1,2,3,4,5"]').count() === 1);
      const contrasts = (await nojs.locator('.sp-number-contrast article').allInnerTexts()).map(plain);
      check('Finger page distinguishes finger 4, C4, and scale degree', contrasts.length === 3 && contrasts[0].includes('Finger number 4') && contrasts[1].includes('C4') && contrasts[1].includes('octave 4') && contrasts[2].includes('Scale degree'));
      const handText = (await nojs.locator('.sp-hand').allInnerTexts()).map(plain);
      check('Finger page makes both hand mappings explicit', handText.length === 2 && handText[0].includes('LH') && handText[0].includes('5 · 4 · 3 · 2 · 1') && handText[1].includes('RH') && handText[1].includes('1 · 2 · 3 · 4 · 5'));
    }
    await nojs.close();

    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    page.on('pageerror', error => runtimeErrors.push(`${route}: ${error.message}`));
    page.on('console', message => { if (message.type() === 'error') runtimeErrors.push(`${route}: ${message.text()}`); });
    await page.goto(base + route);
    await page.screenshot({ path: `${out}/screenshots/${route.split('/').at(-1)}-1440.png`, fullPage: true });
    await page.setViewportSize({ width: 390, height: 844 });
    check(`${route} mobile reflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth })));
    await page.screenshot({ path: `${out}/screenshots/${route.split('/').at(-1)}-390.png`, fullPage: true });
    await page.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
    await page.waitForTimeout(100);
    check(`${route} 200% text reflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), await page.evaluate(() => ({ width: innerWidth, scrollWidth: document.documentElement.scrollWidth })));
    await page.close();
  }

  const requestPage = await browser.newPage();
  const sitemap = await requestPage.request.get(base + '/sitemap.xml');
  const xml = await sitemap.text();
  check('Sitemap has exactly 97 public routes including both support pages', (xml.match(/<loc>/g) || []).length === 97 && routes.every(route => xml.includes(`https://pianogrid.com${route}</loc>`)), (xml.match(/<loc>/g) || []).length);
  for (const route of ['/chords/finder', '/chords/c-flat-major']) {
    const response = await requestPage.request.get(base + route);
    check(`${route} is published`, response.status() === 200, response.status());
  }
  const inboundEdges = linkPlan.edges.filter(edge => routes.includes(targetPath(edge.href)) && publicRoutes.has(edge.from));
  for (const source of [...new Set(inboundEdges.map(edge => edge.from))]) {
    const page = await browser.newPage({ javaScriptEnabled: false });
    const response = await page.goto(base + source);
    const hrefs = await page.locator('a').evaluateAll(items => items.map(item => item.getAttribute('href')));
    const expected = inboundEdges.filter(edge => edge.from === source);
    check(`${source} exposes planned support-page links`, response.status() === 200 && expected.every(edge => hrefs.includes(edge.href)), expected.map(edge => edge.id));
    await page.close();
  }
  await requestPage.close();
  check('No runtime or hydration errors', runtimeErrors.length === 0, runtimeErrors);
} catch (error) {
  check('Support-page validation runner completed', false, error.stack);
} finally {
  await browser.close();
}

const report = {
  executed_at: new Date().toISOString(),
  base,
  passed: results.filter(item => item.passed).length,
  failed: results.filter(item => !item.passed).length,
  results,
  not_tested: ['real mobile/tablet device', 'screen reader', 'independent piano-teacher review'],
};
fs.writeFileSync(`${out}/validation.json`, JSON.stringify(report, null, 2) + '\n');
console.log(`Support pages: ${report.passed} passed, ${report.failed} failed`);
process.exitCode = report.failed ? 1 : 0;
