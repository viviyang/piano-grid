import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3000';
const out = 'checks/batches/03-scales';
const results = [];
const check = (name, passed, detail = '') => { results.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); };
const routes = ['/scales', '/scales/c-major', '/scales/a-minor'];
const browser = await chromium.launch({ channel: 'chrome', headless: true });

try {
  for (const url of routes) for (const scenario of ['unavailable', 'error', 'delayed-cancel']) {
    const page = await browser.newPage();
    await page.addInitScript(({ scenario }) => {
      window.__created = 0;
      if (scenario === 'unavailable') {
        window.AudioContext = undefined;
        window.webkitAudioContext = undefined;
      } else if (scenario === 'error') {
        window.AudioContext = class { constructor() { throw Error('Test unavailable'); } };
      } else {
        const Native = window.AudioContext;
        window.AudioContext = class extends Native {
          get state() { return window.__released ? super.state : 'suspended'; }
          resume() { return new Promise((resolve) => { window.__release = async () => { await super.resume(); window.__released = true; resolve(); }; }); }
          createOscillator() { window.__created++; return super.createOscillator(); }
        };
      }
    }, { scenario });
    await page.goto(base + url);
    await page.waitForFunction(() => [...document.querySelectorAll('.sc-screen select')].every((select) => !select.disabled));
    const play = page.getByRole('button', { name: 'Play scale', exact: true });
    if (scenario === 'unavailable') {
      check(`${url} unavailable disables sound`, await play.isDisabled());
      check(`${url} unavailable explains sound state`, (await page.locator('.sc-tool').innerText()).includes('Sound is unavailable in this browser.'));
    } else {
      await play.click();
      if (scenario === 'error') {
        await page.getByText('Sound could not start. Try Play scale again.', { exact: true }).waitFor();
        check(`${url} explicit audio error`, true);
      } else {
        await page.getByText('Preparing sound…', { exact: true }).waitFor();
        if (url === '/scales') await page.getByLabel('Starting note', { exact: true }).selectOption('D');
        else if (url.endsWith('c-major')) await page.getByLabel('Hand', { exact: true }).selectOption('LH');
        else await page.getByLabel('Minor form', { exact: true }).selectOption('harmonic_minor');
        await page.evaluate(() => window.__release());
        await page.waitForTimeout(180);
        check(`${url} selection cancels delayed audio`, await page.evaluate(() => window.__created === 0));
      }
    }
    if (url === '/scales') {
      await page.getByLabel('Scale type', { exact: true }).selectOption('natural_minor');
      check(`${url} selection survives ${scenario}`, await page.locator('.sc-tool').getAttribute('data-current-scale') === 'natural_minor:A');
    } else if (url.endsWith('c-major')) {
      await page.getByLabel('Direction', { exact: true }).selectOption('descending');
      check(`${url} selection survives ${scenario}`, await page.locator('.sc-tool').getAttribute('data-current-scale') === 'major:C');
    } else {
      await page.getByLabel('Minor form', { exact: true }).selectOption('melodic_minor_classical');
      check(`${url} selection survives ${scenario}`, await page.locator('.sc-tool').getAttribute('data-current-scale') === 'melodic_minor_classical:A');
    }
    await page.close();
  }

  for (const url of routes) {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
    await page.goto(base + url);
    await page.waitForFunction(() => [...document.querySelectorAll('.sc-screen select')].every((select) => !select.disabled));
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(150);
    check(`${url} first scale key visible after resize`, await page.locator('.sc-screen .kn-key.kn-selected').evaluate((element) => { const key = element.getBoundingClientRect(), scroll = element.closest('.kn-key-scroll').getBoundingClientRect(); return key.left >= scroll.left && key.right <= scroll.right; }));
    const first = page.locator('.sc-screen select').first();
    await first.focus();
    check(`${url} select focus visible`, await first.evaluate((element) => getComputedStyle(element).outlineStyle === 'solid'));
    await page.emulateMedia({ forcedColors: 'active' });
    check(`${url} forced-color focus visible`, await first.evaluate((element) => getComputedStyle(element).outlineStyle === 'solid'));
    await page.emulateMedia({ forcedColors: 'none' });
    await page.screenshot({ path: `${out}/screenshots/${url.replaceAll('/', '-').slice(1)}-resize-focus.png`, fullPage: true });
    await page.close();
  }
} finally {
  await browser.close();
}

const report = { executed_at: new Date().toISOString(), passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results };
await writeFile(`${out}/fallback-validation.json`, JSON.stringify(report, null, 2) + '\n');
console.log(`Scale fallbacks: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode = report.failed ? 1 : 0;
