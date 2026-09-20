import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3028';
const out = process.env.PIANO_CHECK_OUT || 'checks/keyboard-notes-hub';
await mkdir(`${out}/screenshots`, { recursive: true });

const results = [];
const errors = [];
function check(name, passed, detail = '') {
  results.push({ name, passed: Boolean(passed), detail });
  if (!passed) console.error('FAIL', name, detail);
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
page.on('pageerror', error => errors.push(error.message));

async function openHub() {
  const response = await page.goto(`${base}/keyboard-notes`, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForSelector('.kn-v2-shell[data-hydrated="true"]', { timeout: 20000 });
  return response;
}

async function findNote(query) {
  const input = page.locator('#kn-v2-note-query');
  await input.fill(query);
  await input.press('Enter');
}

async function selectedMidi() {
  return page.locator('#kn-v2-explore-panel').getAttribute('data-selected-midi');
}

try {
  const response = await openHub();
  check('status 200', response?.status() === 200, String(response?.status()));
  check('title', await page.title() === 'Piano Keys Notes: Interactive Keyboard & Chart | PianoGrid', await page.title());
  check('single branded title', !/\|\s*PianoGrid\s*\|\s*PianoGrid/.test(await page.title()));
  check('h1', (await page.locator('h1').allTextContents()).map(text => text.trim()).filter(Boolean).join('|') === 'Piano Keys Notes');
  check('description', await page.locator('meta[name="description"]').getAttribute('content') === 'Learn piano keys notes with an interactive keyboard and labeled chart. Find middle C, hear each note, and practice white and black key names.');
  check('og title', await page.locator('meta[property="og:title"]').getAttribute('content') === 'Piano Keys Notes: Interactive Keyboard & Chart | PianoGrid');
  check('twitter title', await page.locator('meta[name="twitter:title"]').getAttribute('content') === 'Piano Keys Notes: Interactive Keyboard & Chart | PianoGrid');
  check('canonical', await page.locator('link[rel="canonical"]').getAttribute('href') === 'https://pianogrid.com/keyboard-notes');
  check('robots index follow', (await page.locator('meta[name="robots"]').getAttribute('content') || '').includes('index'));
  check('anchors', await page.locator('#explore').count() === 1 && await page.locator('#note-chart').count() === 1 && await page.locator('#learn-note-names').count() === 1 && await page.locator('#note-trainer').count() === 1);
  const chart = page.locator('#note-chart img');
  check('chart img', await chart.getAttribute('src') === '/images/keyboard-notes/piano-keys-notes-chart.svg' && await chart.getAttribute('width') === '1200' && await chart.getAttribute('height') === '440');
  check('chart alt', await chart.getAttribute('alt') === 'Piano keys from C4 to C5, with white-key letters, black-key sharp and flat names, and middle C highlighted.');
  check('chart asset 200', (await page.request.get(`${base}/images/keyboard-notes/piano-keys-notes-chart.svg`)).status() === 200);
  check('labeled link', await page.locator('a[href="/keyboard-notes/labeled"]').count() > 0);
  check('chart page link', await page.locator('a[href="/keyboard-notes/chart"]').count() > 0);
  check('frequencies link', await page.locator('a[href="/keyboard-notes/frequencies"]').count() > 0);
  check('finger numbers link', await page.locator('a[href="/keyboard-notes/finger-numbers"]').count() > 0);
  check('default C4', await page.locator('#kn-v2-explore-panel').getAttribute('data-selected-midi') === '60');
  check('explore selected', await page.getByRole('tab', { name: 'Explore notes' }).getAttribute('aria-selected') === 'true');

  await findNote('F3');
  await page.waitForFunction(() => document.querySelector('#kn-v2-explore-panel')?.getAttribute('data-selected-midi') === '53');
  check('find F3', await selectedMidi() === '53' && (await page.locator('.kn-v2-note-id h2').textContent()) === 'F3');
  await findNote('Db4');
  await page.waitForFunction(() => document.querySelector('#kn-v2-explore-panel')?.getAttribute('data-selected-midi') === '61');
  check('find Db4', await selectedMidi() === '61' && (await page.locator('.kn-v2-note-id h2').textContent()).includes('D♭4'));
  await findNote('c#4');
  check('find c#4 same pitch', await selectedMidi() === '61');
  await findNote('');
  check('empty keeps selection', await selectedMidi() === '61' && (await page.locator('#kn-v2-note-query-help').textContent()) === 'Enter a note, such as C4 or F♯3.');
  await findNote('H4');
  check('H4 invalid', await selectedMidi() === '61' && (await page.locator('#kn-v2-note-query-help').textContent()) === 'Use a note from A to G, such as C4 or F♯3.');
  await findNote('D8');
  check('D8 out of range', await selectedMidi() === '61' && (await page.locator('#kn-v2-note-query-help').textContent()) === 'D8 is outside this keyboard’s A0–C8 range.');
  await findNote('C');
  await page.waitForSelector('[aria-label="Choose an octave"] button');
  check('C candidates', JSON.stringify(await page.locator('[aria-label="Choose an octave"] button').allTextContents()) === JSON.stringify(['C1','C2','C3','C4','C5','C6','C7','C8']));
  await page.locator('[aria-label="Choose an octave"] button', { hasText: 'C4' }).click();
  check('choose C4 candidate', await page.locator('#kn-v2-explore-panel').getAttribute('data-selected-midi') === '60');
  await page.getByRole('link', { name: 'Show middle C' }).click();
  check('show middle C', await page.locator('#kn-v2-explore-panel').getAttribute('data-selected-midi') === '60' && await page.getByRole('tab', { name: 'Explore notes' }).getAttribute('aria-selected') === 'true');

  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 950 });
    await openHub();
    const geometry = await page.evaluate(() => ({ scroll: document.documentElement.scrollWidth, width: innerWidth, keyboardScroll: document.querySelector('.kn-v2-explore-keyboard .kn-key-scroll')?.scrollWidth || 0, keyboardClient: document.querySelector('.kn-v2-explore-keyboard .kn-key-scroll')?.clientWidth || 0 }));
    check(`no page overflow ${width}`, geometry.scroll <= geometry.width + 1, JSON.stringify(geometry));
    await page.screenshot({ path: `${out}/screenshots/hub-${width}.png`, fullPage: true });
  }

  const nojs = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 1000 } });
  const nojsPage = await nojs.newPage();
  await nojsPage.goto(`${base}/keyboard-notes`, { waitUntil: 'domcontentloaded' });
  check('nojs h1', await nojsPage.locator('h1').textContent() === 'Piano Keys Notes');
  check('nojs chart', await nojsPage.locator('#note-chart img').count() === 1);
  check('nojs teaching', await nojsPage.locator('#learn-note-names h2').textContent() === 'How to read piano key names');
  check('nojs message', (await nojsPage.locator('.kn-hub-noscript').textContent() || '').includes('Enable JavaScript to find and hear notes'));
  await nojs.close();
  check('no page errors', errors.length === 0, errors.join(' | '));
} catch (error) {
  check('hub browser suite completed', false, error.stack);
} finally {
  await browser.close();
}

await writeFile(`${out}/browser-results.json`, JSON.stringify({ passed: results.filter(item => item.passed).length, failed: results.filter(item => !item.passed).length, errors, results }, null, 2));
console.log(`${results.filter(item => item.passed).length} passed / ${results.filter(item => !item.passed).length} failed`);
process.exitCode = results.some(item => !item.passed) ? 1 : 0;
