import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3000';
const out = process.env.PIANO_CHECK_OUT || 'checks/regression/shared-breadcrumb';
const routes = [
  ['/chords/a-major', [['Chords', '/chords'], ['Major Chords', '/chords/major'], ['A major', null]]],
  ['/chords/a-minor', [['Chords', '/chords'], ['Minor Chords', '/chords/minor'], ['A minor', null]]],
  ['/chords/c-major', [['Chords', '/chords'], ['Major Chords', '/chords/major'], ['C major', null]]],
  ['/keyboard-notes', [['Keyboard Notes', null]]],
  ['/keyboard-notes/labeled', [['Keyboard Notes', '/keyboard-notes'], ['Labeled keys', null]]],
  ['/keyboard-notes/chart', [['Keyboard Notes', '/keyboard-notes'], ['Notes chart', null]]],
  ['/scales', [['Scales', null]]],
  ['/scales/c-major', [['Scales', '/scales'], ['C major', null]]],
  ['/scales/a-minor', [['Scales', '/scales'], ['A minor', null]]],
  ['/songs', [['Songs', null]]],
  ['/songs/easy', [['Songs', '/songs'], ['Easy', null]]],
  ['/guide', [['Guide', null]]],
  ['/guide/read-sheet-music', [['Guide', '/guide'], ['Read sheet music', null]]],
  ['/tools/blank-sheet-music', [['Tools', '/tools'], ['Blank sheet music', null]]],
];
const results = [], errors = [];
const check = (name, passed, detail = '') => { results.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); };
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
page.on('pageerror', (error) => errors.push(error.message));
await mkdir(`${out}/screenshots`, { recursive: true });
try {
  for (const [route, expected] of routes) {
    const response = await page.goto(base + route);
    check(`${route} HTTP 200`, response?.status() === 200, response?.status());
    const breadcrumb = page.getByRole('navigation', { name: 'breadcrumb' });
    check(`${route} one shared breadcrumb`, await breadcrumb.count() === 1 && await breadcrumb.getAttribute('data-slot') === 'breadcrumb');
    check(`${route} ordered list`, await breadcrumb.locator('ol[data-slot="breadcrumb-list"]').count() === 1);
    check(`${route} item labels`, JSON.stringify(await breadcrumb.locator('[data-slot="breadcrumb-item"]').allTextContents()) === JSON.stringify(expected.map(([label]) => label)));
    check(`${route} separator count`, await breadcrumb.locator('[data-slot="breadcrumb-separator"] svg').count() === expected.length - 1);
    check(`${route} one current page`, await breadcrumb.locator('[data-slot="breadcrumb-page"][aria-current="page"][aria-disabled="true"]').count() === 1);
    check(`${route} current-page label`, await breadcrumb.locator('[data-slot="breadcrumb-page"]').innerText() === expected.at(-1)[0]);
    const links = expected.filter(([, href]) => href);
    check(`${route} Next Link destinations`, JSON.stringify(await breadcrumb.locator('a[data-slot="breadcrumb-link"]').evaluateAll((nodes) => nodes.map((node) => node.getAttribute('href')))) === JSON.stringify(links.map(([, href]) => href)));
    check(`${route} current page is not linked`, await breadcrumb.locator('[data-slot="breadcrumb-item"] a[aria-current="page"]').count() === 0);
    if (links.length) {
      const link = breadcrumb.locator('[data-slot="breadcrumb-link"]').first();
      await link.focus();
      check(`${route} link focus visible`, await link.evaluate((element) => { const style = getComputedStyle(element); return style.outlineStyle !== 'none' && parseFloat(style.outlineWidth) >= 2; }));
    }
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 950 });
      check(`${route} no overflow ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    }
  }
  await page.goto(base + '/songs/easy');
  await page.evaluate(() => { window.__breadcrumbClientNavigation = 'preserved'; });
  await page.locator('[data-slot="breadcrumb-link"]').click();
  await page.waitForURL(base + '/songs');
  check('Next Link uses client navigation', await page.evaluate(() => window.__breadcrumbClientNavigation === 'preserved'));
  for (const [route, name] of [['/songs/easy', 'songs-easy'], ['/tools/blank-sheet-music', 'blank-sheet']]) {
    await page.goto(base + route);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 500 });
      await page.screenshot({ path: `${out}/screenshots/${name}-${width}.png`, fullPage: false });
    }
  }
  check('No browser runtime errors', errors.length === 0, errors);
} catch (error) {
  check('Breadcrumb browser runner completed', false, error instanceof Error ? error.stack : String(error));
} finally {
  await browser.close();
}
const report = { executed_at: new Date().toISOString(), passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results };
await writeFile(`${out}/validation.json`, JSON.stringify(report, null, 2) + '\n');
console.log(`Breadcrumb browser: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode = report.failed ? 1 : 0;
