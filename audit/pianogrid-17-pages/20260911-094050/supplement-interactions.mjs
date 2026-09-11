import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require('C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = 'https://pianogrid.com';
const root = resolve('audit/pianogrid-17-pages/20260911-094050');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: 'reduce' });
await context.addInitScript(() => {
  const Native = window.AudioContext || window.webkitAudioContext;
  window.__suppAudio = { available: Boolean(Native), contexts: 0, oscillators: [], pagehide: 0 };
  if (Native) {
    class ObservedAudioContext extends Native {
      constructor(...args) { super(...args); window.__suppAudio.contexts += 1; }
      createOscillator() {
        const osc = super.createOscillator();
        const item = { starts: 0, stops: 0, disconnects: 0 };
        window.__suppAudio.oscillators.push(item);
        const start = osc.start.bind(osc), stop = osc.stop.bind(osc), disconnect = osc.disconnect.bind(osc);
        osc.start = (...args) => { item.starts += 1; return start(...args); };
        osc.stop = (...args) => { item.stops += 1; try { return stop(...args); } catch {} };
        osc.disconnect = (...args) => { item.disconnects += 1; return disconnect(...args); };
        return osc;
      }
    }
    window.AudioContext = ObservedAudioContext;
    window.webkitAudioContext = ObservedAudioContext;
  }
  addEventListener('pagehide', () => { window.__suppAudio.pagehide += 1; });
});
const page = await context.newPage();
const results = { executed_at: new Date().toISOString(), tests: [], limits: [] };
const add = (id, route, actual, passed, limit = null) => results.tests.push({ id, route, actual, passed, limit });
const open = route => page.goto(base + route, { waitUntil: 'networkidle', timeout: 30000 });

await open('/chords');
await page.locator('#center-root').selectOption('Cb');
const cb = await page.locator('.ch-result:visible').evaluateAll(nodes => nodes.map(node => ({
  id: node.getAttribute('data-chord-id'),
  symbol: node.querySelector('h3')?.textContent?.trim(),
  text: node.innerText,
  bass: node.querySelector('[data-role="bass"]')?.textContent?.trim() || node.innerText.match(/Bass:\s*([^\n]+)/)?.[1]
})));
add('CH-Cb-filter-and-octave', '/chords', cb, cb.length === 1 && cb[0].id === 'c-flat-major' && cb[0].text.includes('C♭4') && cb[0].bass === 'Cb4');
await page.evaluate(() => { window.print = () => window.dispatchEvent(new Event('beforeprint')); });
await page.getByLabel('Find a chord').getByRole('button', { name: 'Print matching chords', exact: true }).click();
const filteredPrint = await page.evaluate(() => ({
  ids: [...document.querySelectorAll('.am-print-only [data-chord-id], .am-print-only [data-print-chord-id]')].map(x => x.getAttribute('data-chord-id') || x.getAttribute('data-print-chord-id')),
  text: document.querySelector('.am-print-only')?.innerText || ''
}));
add('PRINT-chords-filtered', '/chords', filteredPrint, filteredPrint.text.includes('C-flat major') || filteredPrint.text.includes('C♭'));
await page.evaluate(() => window.dispatchEvent(new Event('afterprint')));

await open('/keyboard-notes/labeled');
await page.getByLabel('Keyboard layout').selectOption('61-key-C2-C7');
const labeled61 = await page.evaluate(() => ({ range: document.body.innerText.match(/61 keys: C2–C7[^\n]*/)?.[0], sectionLinks: [...document.querySelectorAll('main a[href^="#labels-section"]')].map(x => x.textContent?.trim()), printText: document.body.innerText.includes('61 keys: C2–C7') }));
add('KN-labeled-61', '/keyboard-notes/labeled', labeled61, Boolean(labeled61.range && labeled61.printText));

await open('/scales/a-minor');
const audioBefore = await page.evaluate(() => structuredClone(window.__suppAudio));
await page.getByRole('button', { name: /Play scale|Play notes/, exact: false }).first().click();
await page.waitForTimeout(80);
await page.getByRole('button', { name: 'Stop', exact: true }).click();
const audioAfterStop = await page.evaluate(() => structuredClone(window.__suppAudio));
await page.getByRole('button', { name: /Play scale|Play notes/, exact: false }).first().click();
await page.evaluate(() => window.dispatchEvent(new Event('pagehide')));
await page.waitForTimeout(30);
const audioAfterPagehide = await page.evaluate(() => structuredClone(window.__suppAudio));
add('AU-scale-stop-pagehide-technical', '/scales/a-minor', { audioBefore, audioAfterStop, audioAfterPagehide },
  audioBefore.contexts === 0 && audioAfterStop.contexts >= 1 && audioAfterStop.oscillators.some(x => x.disconnects > 0) && audioAfterPagehide.pagehide === 1,
  'Technical event and oscillator lifecycle only; not human listening or a real iPhone test.');

await writeFile(resolve(root, 'evidence', 'supplement-interactions.json'), JSON.stringify(results, null, 2) + '\n');
await context.close();
await browser.close();
