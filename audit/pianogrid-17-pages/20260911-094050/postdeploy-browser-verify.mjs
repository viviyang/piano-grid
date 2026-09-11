import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
const errors = [];
page.on('console', message => { if (message.type() === 'error') errors.push(message.text()); });
await page.goto('https://pianogrid.com/chords/a-minor', { waitUntil: 'networkidle' });
const states = [];
for (const name of ['Root position', 'First inversion', 'Second inversion']) {
  await page.getByRole('radio', { name, exact: true }).check();
  states.push({
    name,
    checked: await page.locator('input[name="position"]:checked').getAttribute('value'),
    currentSelectionRows: await page.locator('.am-inversion-table tbody tr').evaluateAll(rows => rows.filter(row => row.textContent?.includes('current selection')).map(row => row.getAttribute('data-voicing-id'))),
    aria: await page.locator('.am-inversion-table').ariaSnapshot()
  });
}
const result = {
  checkedAt: new Date().toISOString(),
  route: '/chords/a-minor',
  states,
  consoleErrors: errors,
  assertions: {
    eachStateHasOneDomCurrentSelection: states.every(state => state.currentSelectionRows.length === 1),
    eachStateAriaNamesOnlyItsCurrentRow: states.every(state => state.aria.split('\n').filter(line => /- row ".*current selection/.test(line)).length === 1),
    noConsoleErrors: errors.length === 0
  }
};
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto('https://pianogrid.com/songs', { waitUntil: 'networkidle' });
await page.screenshot({ path: resolve('audit/pianogrid-17-pages/20260911-094050/evidence/postdeploy-songs-desktop.png'), fullPage: true });
result.songsDesktopOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
await page.setViewportSize({ width: 390, height: 844 });
await page.goto('https://pianogrid.com/songs', { waitUntil: 'networkidle' });
await page.screenshot({ path: resolve('audit/pianogrid-17-pages/20260911-094050/evidence/postdeploy-songs-mobile.png'), fullPage: true });
result.songsMobileOverflow = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth + 1);
result.assertions.songsNoWholeDocumentOverflow = !result.songsDesktopOverflow && !result.songsMobileOverflow;
await writeFile(resolve('audit/pianogrid-17-pages/20260911-094050/evidence/postdeploy-browser-verification.json'), JSON.stringify(result, null, 2) + '\n');
console.log(JSON.stringify(result.assertions, null, 2));
await browser.close();
