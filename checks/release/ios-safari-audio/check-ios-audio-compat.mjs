import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3001';
const out = 'checks/release/ios-safari-audio';
await mkdir(out, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.addInitScript(() => {
  const calls = [];
  Object.defineProperty(window, '__audioCompatCalls', { value: calls });
  const session = {};
  Object.defineProperty(session, 'type', {
    set(value) { calls.push(`session:${value}`); },
    get() { return 'ambient'; },
  });
  Object.defineProperty(navigator, 'audioSession', { configurable: true, value: session });

  class FakeParam {
    setValueAtTime() {}
    linearRampToValueAtTime() {}
  }
  class FakeOscillator {
    frequency = new FakeParam();
    type = 'sine';
    connect() {}
    disconnect() {}
    addEventListener() {}
    start() { calls.push('oscillator:start'); }
    stop() { calls.push('oscillator:stop'); }
  }
  class FakeGain {
    gain = new FakeParam();
    connect() {}
    disconnect() {}
  }
  class FakeAudioContext {
    state = 'suspended';
    destination = {};
    startedAt = 0;
    constructor() { calls.push('context:new'); }
    get currentTime() { return this.state === 'running' ? (performance.now() - this.startedAt) / 1000 : 0; }
    createOscillator() { return new FakeOscillator(); }
    createGain() { return new FakeGain(); }
    addEventListener() {}
    resume() { calls.push('context:resume'); this.startedAt = performance.now(); this.state = 'running'; return Promise.resolve(); }
    close() { calls.push('context:close'); this.state = 'closed'; return Promise.resolve(); }
  }
  Object.defineProperty(window, 'AudioContext', { configurable: true, value: FakeAudioContext });
  Object.defineProperty(window, 'webkitAudioContext', { configurable: true, value: FakeAudioContext });
});

const results = [];
const check = (name, passed, detail) => results.push({ name, passed: Boolean(passed), detail });
try {
  await page.goto(`${base}/`);
  const key = page.locator('.ph-mobile-keyboard button[data-midi="57"]');
  await key.click();
  await page.waitForFunction(() => document.querySelector('.ph-piano-stage')?.getAttribute('data-audio-state') === 'playing');
  const first = await page.evaluate(() => window.__audioCompatCalls);
  check('sets playback audio session', first.includes('session:playback'), first);
  check('starts source inside activation before resume', first.indexOf('oscillator:start') !== -1 && first.indexOf('oscillator:start') < first.indexOf('context:resume'), first);
  check('mobile key reaches playing state', await page.locator('.ph-piano-stage').getAttribute('data-audio-state') === 'playing');

  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: true });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await page.waitForFunction(() => window.__audioCompatCalls.includes('context:close'));
  await page.evaluate(() => {
    Object.defineProperty(document, 'hidden', { configurable: true, value: false });
    document.dispatchEvent(new Event('visibilitychange'));
  });
  await key.click();
  await page.waitForFunction(() => window.__audioCompatCalls.filter((item) => item === 'context:new').length === 2);
  const second = await page.evaluate(() => window.__audioCompatCalls);
  check('discards context after backgrounding', second.includes('context:close'), second);
  check('creates a fresh context on the next tap', second.filter((item) => item === 'context:new').length === 2, second);
} catch (error) {
  check('compatibility runner completed', false, error.stack);
} finally {
  await browser.close();
}

const report = { executed_at: new Date().toISOString(), base, passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results };
await writeFile(`${out}/validation.json`, `${JSON.stringify(report, null, 2)}\n`);
console.log(`iOS Safari audio compatibility: ${report.passed} passed, ${report.failed} failed.`);
if (report.failed) process.exitCode = 1;
