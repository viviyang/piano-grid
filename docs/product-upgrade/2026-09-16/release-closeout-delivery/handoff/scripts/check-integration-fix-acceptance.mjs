import fs from 'node:fs';
import { createRequire } from 'node:module';
import { spawn } from 'node:child_process';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3125';
const out = process.env.PIANO_CHECK_OUT || 'checks/product-upgrade-2026-09-16/integration-fix';
const results = [];
const runtimeErrors = [];
fs.mkdirSync(`${out}/screenshots`, { recursive: true });

function check(id, passed, detail = '') {
  results.push({ id, passed: Boolean(passed), detail });
  if (!passed) console.error(`FAIL ${id}${detail ? `: ${detail}` : ''}`);
}

async function visibleBodyText(page) {
  return page.evaluate(() => {
    const root = document.body.cloneNode(true);
    root.querySelectorAll('details:not([open])').forEach(node => node.remove());
    return root.innerText;
  });
}

async function shot(page, name) {
  await page.screenshot({ path: `${out}/screenshots/${name}.png`, fullPage: true });
}

async function main() {
  let server;
  if (!process.env.PIANO_BASE_URL) {
    server = spawn('npx', ['next', 'start', '-p', '3125'], { cwd: process.cwd(), stdio: 'pipe', shell: true });
    await new Promise(resolve => {
      const timer = setTimeout(resolve, 8000);
      const onData = chunk => {
        if (String(chunk).includes('Local:') || String(chunk).includes('started')) {
          clearTimeout(timer);
          resolve();
        }
      };
      server.stdout.on('data', onData);
      server.stderr.on('data', onData);
    });
  }

  const browser = await chromium.launch({ headless: true });
  try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
    await context.addInitScript(() => {
      Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.__copied = value; } } });
      Object.defineProperty(navigator, 'share', { configurable: true, value: async value => { window.__shared = value; } });
    });
    const page = await context.newPage();
    page.on('pageerror', error => runtimeErrors.push(error.message));

    // K02 custom black after natural share
    await page.goto(`${base}/keyboard-notes?practice=v1&practice-option=natural-c4-c5&practice-seed=20260916&practice-count=10#note-trainer`);
    await page.locator('.kn-v2-shell[data-hydrated="true"]').waitFor();
    await page.getByText('Shared practice · 10 notes', { exact: true }).waitFor();
    await shot(page, 'shared-landing-1440');
    await page.locator('.kn-v2-options summary').click();
    await page.locator('.kn-v2-option-fields select').selectOption('black-c4-c5');
    check('K02 custom banner', await page.getByText('Custom practice · 10 notes', { exact: true }).isVisible());
    await shot(page, 'shared-custom-1440');
    await page.getByRole('button', { name: 'Start 10-note practice', exact: true }).click();
    await page.getByText('Question 1', { exact: true }).waitFor();
    const target = (await page.locator('.kn-v2-task h2').innerText()).replace(/^Find\s+/, '').trim();
    check('K02 black target spelling', /[♯♭#b]/i.test(target));
    const enabled = page.locator('.kn-v2-question-keyboard button.kn-key:not([disabled])');
    const enabledCount = await enabled.count();
    let allBlack = true;
    for (let i = 0; i < enabledCount; i += 1) {
      const cls = await enabled.nth(i).getAttribute('class');
      if (!cls?.includes('kn-black')) allBlack = false;
    }
    check('K02 only black keys enabled', allBlack && enabledCount > 0);

    // K06/K07 black hint
    await page.getByRole('button', { name: 'Hint', exact: true }).click();
    const hint = await page.locator('.kn-v2-feedback').innerText();
    check('K06 black hint not white-key copy', /black key/i.test(hint) && !/white key/i.test(hint));
    await shot(page, 'black-key-hint-1440');

    // K10 exit cancel
    await page.getByRole('button', { name: 'Exit practice', exact: true }).click();
    await page.getByRole('heading', { name: 'Leave this round?', exact: true }).waitFor();
    check('K10 keep practicing primary', await page.locator('dialog .am-primary').innerText().then(text => /Keep practicing/i.test(text)));
    await shot(page, 'exit-dialog-1440');
    await page.getByRole('button', { name: 'Keep practicing', exact: true }).click();
    check('K10 cancel restores question', await page.getByText('Question 1', { exact: true }).isVisible());

    // H01 B04 landing — whole-page visible spoiler gate (closed details excluded)
    await page.goto(`${base}/tools/hear-the-difference`);
    const pageText = await visibleBodyText(page);
    check('H01 no default spoiler', !/raising only the third|A–C–E|A–C♯–E/i.test(pageText));
    check('H01 learn details closed', await page.locator('details.hd-learn').getAttribute('open') === null);
    await shot(page, 'b04-landing-nospoiler-1440');

    // A05 real audio error via platform AudioContext boundary (no production force flag)
    await page.evaluate(() => {
      const Original = window.AudioContext || window.webkitAudioContext;
      if (!Original) throw new Error('AudioContext missing');
      window.__pianoGridOriginalAudioContext = Original;
      function FailingContext() {
        const context = new Original();
        Object.defineProperty(context, 'state', { configurable: true, get: () => 'suspended' });
        context.resume = () => Promise.reject(new Error('Audio context unavailable'));
        return context;
      }
      window.AudioContext = FailingContext;
      window.webkitAudioContext = FailingContext;
    });
    await page.getByRole('button', { name: /Play comparison/ }).click();
    await page.locator('.hd-audio-error').waitFor();
    check('A05 real audio error', await page.locator('.hd-audio-error').isVisible());
    await shot(page, 'b04-audio-error-1440');
    await page.evaluate(() => {
      if (window.__pianoGridOriginalAudioContext) {
        window.AudioContext = window.__pianoGridOriginalAudioContext;
        window.webkitAudioContext = window.__pianoGridOriginalAudioContext;
      }
    });
    await page.getByRole('button', { name: 'Retry audio' }).click();
    await page.waitForFunction(() => !document.querySelector('.hd-audio-error'));
    check('A05 retry clears error', await page.locator('.hd-audio-error').count() === 0);

    // V03 labeled toolbar
    await page.goto(`${base}/keyboard-notes/labeled`);
    check('V03 print primary present', await page.locator('.kn-labeled-actions .am-primary').innerText().then(text => /Print reference/i.test(text)));
    check('V03 viewport present', await page.locator('.kn-labeled-viewport .kn-keyboard').count() > 0);
    check('V03 sources are titles not raw IDs', await page.locator('.kn-source-list').innerText().then(text => /Korg|Roland|Yamaha/i.test(text) && !/\bBK-KORG\b/.test(text)));
    await shot(page, 'labeled-toolbar-1440');
    await page.setViewportSize({ width: 390, height: 844 });
    await shot(page, 'labeled-toolbar-390');
    await page.goto(`${base}/keyboard-notes#note-trainer`);
    await page.locator('.kn-v2-shell[data-hydrated="true"]').waitFor();
    check('RC02 hash-only practice entry', await page.getByRole('tab', { name: 'Practice notes', exact: true }).getAttribute('aria-selected') === 'true');
    await shot(page, 'hash-practice-390');
    await page.goto(`${base}/keyboard-notes?practice=v1&practice-option=natural-c4-c5&practice-seed=20260916&practice-count=10#note-trainer`);
    await page.locator('.kn-v2-shell[data-hydrated="true"]').waitFor();
    await shot(page, 'shared-landing-390');

    check('no runtime errors', runtimeErrors.length === 0, runtimeErrors.join(' | '));
  } finally {
    await browser.close();
    if (server) server.kill('SIGTERM');
  }

  const failed = results.filter(item => !item.passed).length;
  fs.writeFileSync(`${out}/acceptance-results.json`, JSON.stringify({ passed: failed === 0, results }, null, 2));
  console.log(JSON.stringify({ passed: failed === 0, total: results.length, failed }, null, 2));
  if (failed) process.exit(1);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
