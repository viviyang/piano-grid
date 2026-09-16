import fs from 'node:fs';
import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3115';
const out = process.env.PIANO_CHECK_OUT || 'checks/product-upgrade-2026-09-15/b02-b03-keyboard-notes';
const presetQuery = 'practice=v1&practice-option=natural-c4-c5&practice-seed=20260916&practice-count=10';
const results = [];
const runtimeErrors = [];

fs.mkdirSync(`${out}/screenshots/desktop`, { recursive: true });
fs.mkdirSync(`${out}/screenshots/mobile`, { recursive: true });

function check(name, passed, detail = '') {
  results.push({ name, passed: Boolean(passed), detail });
  if (!passed) console.error(`FAIL ${name}${detail ? `: ${detail}` : ''}`);
}

async function targetLabel(page) {
  return (await page.locator('.kn-v2-task h2').innerText()).replace(/^Find\s+/, '').trim();
}

async function correctKey(page) {
  const label = await targetLabel(page);
  return page.locator('.kn-v2-question-keyboard').getByRole('button', { name: label, exact: true });
}

async function wrongKey(page) {
  const label = await targetLabel(page);
  const keys = page.locator('.kn-v2-question-keyboard button.kn-key:not([disabled])');
  const count = await keys.count();
  for (let index = 0; index < count; index += 1) if (await keys.nth(index).getAttribute('aria-label') !== label) return keys.nth(index);
  throw new Error('No wrong key is available');
}

async function screenshot(page, device, name) {
  await page.screenshot({ path: `${out}/screenshots/${device}/${name}.png`, fullPage: true });
}

async function finishQuestionCorrectly(page, doubleAdvance = false) {
  await (await correctKey(page)).click();
  const next = page.getByRole('button', { name: /Next note|See results/, exact: true });
  if (doubleAdvance) await next.evaluate(element => { element.click(); element.click(); });
  else await next.click();
}

async function runFlow(browser, { width, height, device }) {
  const context = await browser.newContext({ viewport: { width, height } });
  await context.addInitScript(() => {
    Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async value => { window.__keyboardCopied = value; } } });
    Object.defineProperty(navigator, 'share', { configurable: true, value: async value => { window.__keyboardShared = value; } });
  });
  const page = await context.newPage();
  page.on('pageerror', error => runtimeErrors.push(`${device}: ${error.message}`));
  page.on('console', message => { if (message.type() === 'error') runtimeErrors.push(`${device}: ${message.text()}`); });

  await page.goto(`${base}/keyboard-notes`);
  await page.locator('.kn-v2-shell[data-hydrated="true"]').waitFor();
  await page.getByRole('tab', { name: 'Explore notes', exact: true }).waitFor();
  check(`${device} default mode is Explore`, await page.getByRole('tab', { name: 'Explore notes', exact: true }).getAttribute('aria-selected') === 'true');
  check(`${device} S1 fixture text absent`, !await page.locator('body').innerText().then(text => /LOCAL DESIGN SAMPLE|FIXED PRESET|practice-sample/i.test(text)));
  check(`${device} no horizontal overflow`, await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await screenshot(page, device, '01-explore');

  await page.getByRole('tab', { name: 'Practice notes', exact: true }).click();
  await page.getByRole('button', { name: 'Start 10-note practice', exact: true }).waitFor();
  await screenshot(page, device, '02-start');

  await page.goto(`${base}/keyboard-notes?${presetQuery}#note-trainer`);
  await page.locator('.kn-v2-shell[data-hydrated="true"]').waitFor();
  await page.getByText('Practice shared with you', { exact: true }).waitFor();
  check(`${device} receiver does not auto-start`, await page.getByText('Start your own round with the same 10-note set. No one else’s answers or score are included.', { exact: true }).isVisible());
  await screenshot(page, device, '03-receiver');
  await page.getByRole('button', { name: 'Start 10-note practice', exact: true }).click();
  await page.getByText('Question 1', { exact: true }).waitFor();
  const firstTarget = await targetLabel(page);
  check(`${device} question starts at 1 of 10`, await page.locator('.kn-v2-progress-track').getAttribute('aria-label') === 'Question 1 of 10');
  check(`${device} unanswered target key is idle`, await (await correctKey(page)).getAttribute('data-key-state') === 'idle');
  await screenshot(page, device, '04-question');

  await (await wrongKey(page)).click();
  check(`${device} wrong answer marks one selected wrong key`, await page.locator('.kn-v2-question-keyboard [data-key-state="wrong"]').count() === 1);
  check(`${device} first wrong answer does not reveal target`, await (await correctKey(page)).getAttribute('data-key-state') === 'idle');
  await screenshot(page, device, '05-wrong');

  await page.getByRole('tab', { name: 'Explore notes', exact: true }).click();
  await page.getByRole('tab', { name: 'Practice notes', exact: true }).click();
  check(`${device} mode switch preserves wrong state`, await page.locator('.kn-v2-feedback[data-kind="wrong"]').count() === 1);
  await page.getByRole('button', { name: 'Try again', exact: true }).click();
  await page.getByRole('button', { name: 'Hint', exact: true }).click();
  check(`${device} hint does not select the answer`, await (await correctKey(page)).getAttribute('data-key-state') === 'idle');
  await screenshot(page, device, '06-hint');
  await (await correctKey(page)).click();
  check(`${device} helped answer resolves as correct`, await page.locator('.kn-v2-feedback[data-kind="correct"]').count() === 1);
  await screenshot(page, device, '07-correct-assisted');
  await page.getByRole('button', { name: 'Next note', exact: true }).click();

  await page.getByRole('button', { name: 'Show answer', exact: true }).click();
  check(`${device} reveal marks only target as revealed`, await page.locator('.kn-v2-question-keyboard [data-key-state="revealed"]').count() === 1);
  await screenshot(page, device, '08-revealed');
  await page.getByRole('button', { name: 'Next note', exact: true }).click();

  await finishQuestionCorrectly(page, true);
  await page.getByText('Question 4', { exact: true }).waitFor();
  check(`${device} double Next advances once`, await page.locator('.kn-v2-progress-track').getAttribute('aria-label') === 'Question 4 of 10');
  for (let question = 4; question <= 10; question += 1) await finishQuestionCorrectly(page);

  await page.getByRole('heading', { name: 'Your round, at a glance.', exact: true }).waitFor();
  check(`${device} result has mutually exclusive 8/1/1 buckets`, await page.locator('.kn-v2-score-track').getAttribute('aria-label') === '8 first try, 1 with help, 1 revealed');
  await screenshot(page, device, '09-result');

  const reviewButton = page.getByRole('button', { name: /Review \d+ notes?/, exact: true });
  check(`${device} missed-note review is available`, await reviewButton.isVisible());
  await reviewButton.click();
  await page.getByText('Missed-note review', { exact: true }).waitFor();
  await screenshot(page, device, '10-review');
  while (await page.locator('.kn-v2-question').count()) await finishQuestionCorrectly(page);
  check(`${device} review keeps original score`, await page.locator('.kn-v2-score-track').getAttribute('aria-label') === '8 first try, 1 with help, 1 revealed');
  await page.getByRole('button', { name: 'Return to original results', exact: true }).click();

  const shareTrigger = page.getByRole('button', { name: 'Share practice', exact: true });
  await shareTrigger.click();
  await page.getByRole('dialog').waitFor();
  await screenshot(page, device, '11-share');
  await page.getByRole('button', { name: 'Copy practice link', exact: true }).click();
  const copied = await page.evaluate(() => window.__keyboardCopied || '');
  const copiedURL = new URL(copied);
  check(`${device} copied link stays on existing route`, copiedURL.pathname === '/keyboard-notes');
  check(`${device} copied link restores approved preset`, copiedURL.searchParams.toString() === presetQuery);
  check(`${device} copied link excludes answers and score`, !/answer|score|result|name|email/i.test(copiedURL.search));

  await page.getByRole('button', { name: 'More sharing options', exact: true }).click();
  const shared = await page.evaluate(() => window.__keyboardShared || null);
  check(`${device} native share receives same preset URL`, shared?.url === copied);

  await page.evaluate(() => { Object.defineProperty(navigator, 'clipboard', { configurable: true, value: { writeText: async () => { throw new DOMException('Denied', 'NotAllowedError'); } } }); });
  await page.getByRole('button', { name: 'Copy practice link', exact: true }).click();
  check(`${device} copy denial exposes selectable URL`, await page.getByLabel('Practice link', { exact: true }).getAttribute('value') === copied);
  await page.keyboard.press('Escape');
  check(`${device} dialog Escape restores trigger focus`, await shareTrigger.evaluate(element => document.activeElement === element));

  const receiver = await context.newPage();
  await receiver.goto(copied);
  await receiver.locator('.kn-v2-shell[data-hydrated="true"]').waitFor();
  await receiver.getByRole('button', { name: 'Start 10-note practice', exact: true }).click();
  check(`${device} receiver starts same deterministic sequence`, await targetLabel(receiver) === firstTarget);
  await receiver.close();

  const invalid = await context.newPage();
  await invalid.goto(`${base}/keyboard-notes?practice=v9&practice-option=natural-c4-c5&practice-seed=1&practice-count=10`);
  await invalid.getByText('This practice link is no longer available', { exact: true }).waitFor();
  check(`${device} invalid preset has safe fallback`, await invalid.getByText('This practice link is no longer available', { exact: true }).isVisible() && await invalid.getByRole('button', { name: 'Start 10-note practice', exact: true }).isVisible());
  await invalid.close();
  await context.close();
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  await runFlow(browser, { width: 1440, height: 1000, device: 'desktop' });
  await runFlow(browser, { width: 390, height: 844, device: 'mobile' });

  const responsive = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
  for (const width of [320, 390, 768, 1440]) {
    await responsive.setViewportSize({ width, height: width === 1440 ? 1000 : 844 });
    await responsive.goto(`${base}/keyboard-notes`);
    await responsive.locator('.kn-v2-shell[data-hydrated="true"]').waitFor();
    check(`responsive ${width} no horizontal overflow`, await responsive.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  }
  await responsive.setViewportSize({ width: 390, height: 844 });
  await responsive.goto(`${base}/keyboard-notes`);
  await responsive.locator('.kn-v2-shell[data-hydrated="true"]').waitFor();
  await responsive.evaluate(() => { document.documentElement.style.fontSize = '200%'; });
  check('200% text has no horizontal overflow', await responsive.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  check('reduced motion disables rolling transition', await responsive.locator('.pr-rolling-text-current>span').first().evaluate(element => getComputedStyle(element).transitionDuration === '0s'));
  await responsive.close();

  const noAudioContext = await browser.newContext({ viewport: { width: 390, height: 844 } });
  await noAudioContext.addInitScript(() => {
    Object.defineProperty(window, 'AudioContext', { configurable: true, value: undefined });
    Object.defineProperty(window, 'webkitAudioContext', { configurable: true, value: undefined });
  });
  const noAudio = await noAudioContext.newPage();
  await noAudio.goto(`${base}/keyboard-notes?${presetQuery}`);
  await noAudio.locator('.kn-v2-shell[data-hydrated="true"]').waitFor();
  await noAudio.getByRole('button', { name: 'Start 10-note practice', exact: true }).click();
  check('audio unavailable does not block visual practice', await (await correctKey(noAudio)).isEnabled());
  await (await correctKey(noAudio)).click();
  check('audio unavailable still accepts answer', await noAudio.locator('.kn-v2-feedback[data-kind="correct"]').count() === 1);
  await noAudioContext.close();

  const shared = await browser.newPage({ viewport: { width: 390, height: 844 } });
  shared.on('pageerror', error => runtimeErrors.push(`shared-owner: ${error.message}`));
  for (const route of ['/keyboard-notes/chart', '/keyboard-notes/labeled', '/keyboard-notes/frequencies', '/keyboard-notes/blank', '/keyboard-notes/finger-numbers']) {
    const response = await shared.goto(`${base}${route}`);
    check(`${route} shared owner route responds`, response?.status() === 200);
    check(`${route} shared owner has no horizontal overflow`, await shared.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    check(`${route} canonical unchanged`, await shared.locator('link[rel="canonical"]').getAttribute('href') === `https://pianogrid.com${route}`);
  }
  await shared.goto(`${base}/keyboard-notes/chart`);
  await shared.getByLabel('Displayed range').selectOption('61_keys');
  check('chart still renders 61 shared keyboard keys', await shared.locator('.kn-screen .kn-keyboard button').count() === 61);
  await shared.locator('.kn-screen button.kn-key[data-midi="60"]').click();
  check('chart shared keyboard still selects exact MIDI', await shared.locator('.kn-result').getAttribute('data-selected-midi') === '60');
  await shared.goto(`${base}/keyboard-notes/labeled`);
  await shared.getByLabel('Keyboard layout').selectOption('61-key-C2-C7');
  check('labeled route still renders 61-key layout', await shared.locator('.kn-screen .kn-key').count() === 61);
  await shared.goto(`${base}/keyboard-notes/frequencies`);
  await shared.getByLabel('Find by note or MIDI').fill('C4');
  await shared.getByRole('button', { name: 'Find', exact: true }).click();
  check('frequency owner still resolves C4', (await shared.locator('.kn-result').innerText()).includes('261.63 Hz'));
  for (const route of ['/chords/a-minor', '/scales/c-major']) check(`${route} unaffected smoke`, (await shared.request.get(`${base}${route}`)).status() === 200);
  await shared.goto(`${base}/keyboard-notes?${presetQuery}`);
  check('shared preset keeps base canonical', await shared.locator('link[rel="canonical"]').getAttribute('href') === 'https://pianogrid.com/keyboard-notes');
  await shared.close();

  check('no runtime or console errors', runtimeErrors.length === 0, runtimeErrors.join(' | '));
} finally {
  await browser.close();
}

const report = { passed: results.filter(item => item.passed).length, failed: results.filter(item => !item.passed).length, runtimeErrors, results };
fs.writeFileSync(`${out}/browser-results.json`, JSON.stringify(report, null, 2));
console.log(`${report.passed} passed / ${report.failed} failed`);
if (report.failed) process.exitCode = 1;
