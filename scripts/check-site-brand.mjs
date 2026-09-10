import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3000';
const out = process.env.PIANO_CHECK_OUT || 'checks/regression/shared-site-brand';
const routes = [
  '/', '/tools', '/chords', '/chords/a-minor', '/chords/a-major', '/chords/c-major',
  '/keyboard-notes', '/keyboard-notes/labeled', '/keyboard-notes/chart',
  '/scales', '/scales/c-major', '/scales/a-minor', '/songs', '/songs/easy',
  '/guide', '/guide/read-sheet-music', '/tools/blank-sheet-music',
];
const results = [], errors = [];
const check = (name, passed, detail = '') => { results.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); };
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 700 } });
page.on('pageerror', (error) => errors.push(error.message));
await mkdir(`${out}/screenshots`, { recursive: true });
try {
  let referenceStyle;
  for (const route of routes) {
    const response = await page.goto(base + route);
    check(`${route} HTTP 200`, response?.status() === 200, response?.status());
    const brand = page.locator('header [data-slot="site-brand"]');
    check(`${route} one header brand`, await brand.count() === 1);
    check(`${route} brand links home`, await brand.getAttribute('href') === '/');
    check(`${route} accessible name`, await brand.getAttribute('aria-label') === null && (await brand.innerText()).trim() === 'PianoGrid');
    check(`${route} one piano mark`, await brand.locator('svg[data-slot="site-brand-mark"][aria-hidden="true"]').count() === 1);
    check(`${route} current-page state`, (await brand.getAttribute('aria-current')) === (route === '/' ? 'page' : null));
    const style = await brand.evaluate((element) => {
      const brandStyle = getComputedStyle(element);
      const markStyle = getComputedStyle(element.querySelector('[data-slot="site-brand-mark"]'));
      return {
        display: brandStyle.display,
        alignItems: brandStyle.alignItems,
        gap: brandStyle.gap,
        fontSize: brandStyle.fontSize,
        fontWeight: brandStyle.fontWeight,
        letterSpacing: brandStyle.letterSpacing,
        markWidth: markStyle.width,
        markHeight: markStyle.height,
      };
    });
    referenceStyle ??= style;
    check(`${route} matches homepage brand style`, JSON.stringify(style) === JSON.stringify(referenceStyle), { expected: referenceStyle, actual: style });
    const footerBrand = page.locator('footer [data-slot="site-brand"]');
    check(`${route} one footer brand`, await footerBrand.count() === 1);
    check(`${route} footer reuses piano mark`, await footerBrand.locator('svg[data-slot="site-brand-mark"]').count() === 1);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 700 });
      check(`${route} no overflow ${width}`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
      check(`${route} brand stays on one line ${width}`, await brand.evaluate((element) => element.getBoundingClientRect().height <= 34));
    }
    await page.setViewportSize({ width: 1440, height: 700 });
  }
  await page.goto(base + '/chords');
  await page.evaluate(() => { window.__siteBrandClientNavigation = 'preserved'; });
  await page.locator('header [data-slot="site-brand"]').click();
  await page.waitForURL(base + '/');
  check('Header brand uses client navigation', await page.evaluate(() => window.__siteBrandClientNavigation === 'preserved'));
  for (const [route, name] of [['/', 'home'], ['/chords', 'chords']]) {
    await page.goto(base + route);
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 420 });
      await page.screenshot({ path: `${out}/screenshots/${name}-${width}.png`, fullPage: false });
    }
  }
  check('No browser runtime errors', errors.length === 0, errors);
} catch (error) {
  check('Site brand browser runner completed', false, error instanceof Error ? error.stack : String(error));
} finally {
  await browser.close();
}
const report = { executed_at: new Date().toISOString(), passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results };
await writeFile(`${out}/validation.json`, JSON.stringify(report, null, 2) + '\n');
console.log(`Site brand browser: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode = report.failed ? 1 : 0;
