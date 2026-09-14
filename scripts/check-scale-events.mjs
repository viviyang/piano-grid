import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3000';
const out = process.env.PIANO_CHECK_OUT || 'checks/scales-completion/events';
await mkdir(out, { recursive: true });
const results = [];
const check = (name, passed, detail = '') => { results.push({ name, passed: Boolean(passed), detail }); if (!passed) console.error('FAIL', name, detail); };
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
try {
  await page.goto(`${base}/scales`);
  await page.waitForFunction(() => !document.querySelector('select')?.disabled);
  await page.evaluate(() => {
    window.__scaleEvents = [];
    window.addEventListener('pianogrid:scale-event', (event) => window.__scaleEvents.push(event.detail));
    window.print = () => {};
  });
  await page.getByLabel('Starting note', { exact: true }).selectOption('D');
  await page.getByRole('button', { name: 'Play scale', exact: true }).click();
  await page.waitForFunction(() => window.__scaleEvents.some((item) => item.name === 'scale_playback_started'));
  await page.getByRole('button', { name: 'Stop', exact: true }).click();
  await page.getByLabel('C', { exact: true }).check();
  await page.getByRole('button', { name: 'Find scales', exact: true }).click();
  await page.locator('[data-quiz="note-set"]').getByRole('button', { name: 'Check answer', exact: true }).click();
  await page.getByRole('button', { name: 'Print current scale', exact: true }).click();
  const events = await page.evaluate(() => window.__scaleEvents);
  for (const name of ['scale_reference_changed', 'scale_playback_started', 'scale_playback_stopped', 'scale_finder_result', 'scale_question_submitted', 'scale_print_requested']) check(`${name} emitted`, events.some((item) => item.name === name), events.map((item) => item.name));
  check('event properties contain no free-form input or audio', events.every((item) => !('audio' in item.properties) && !('free_text' in item.properties)));
  check('no runtime errors', errors.length === 0, errors);
} finally {
  await browser.close();
}
const report = { executed_at: new Date().toISOString(), passed: results.filter((item) => item.passed).length, failed: results.filter((item) => !item.passed).length, results };
await writeFile(`${out}/validation.json`, `${JSON.stringify(report, null, 2)}\n`);
console.log(`Scale events: ${report.passed} passed, ${report.failed} failed.`);
process.exitCode = report.failed ? 1 : 0;
