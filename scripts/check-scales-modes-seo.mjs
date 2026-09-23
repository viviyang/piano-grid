import { createRequire } from 'node:module';
import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';

const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3022';
const outDir = 'checks/reviews/scales-modes-seo';
const results = [];

function test(name, fn) {
  try {
    const value = fn();
    results.push({ name, passed: true, detail: value === true ? '' : value });
  } catch (error) {
    results.push({ name, passed: false, detail: error.message });
  }
}

function assert(condition, detail) {
  if (!condition) throw new Error(detail || 'assertion failed');
}

function decode(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#x27;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&#x2014;/g, '—')
    .replace(/&#x2013;/g, '–')
    .replace(/&ndash;/g, '–')
    .replace(/&#x266F;/g, '♯')
    .replace(/&#x266D;/g, '♭');
}

function visible(html) {
  return decode(html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim());
}

const expectedTitle = 'Scale Modes on Piano: 7 Modes, Notes & Patterns | PianoGrid';
const expectedH1 = 'Scale Modes on Piano';
const expectedIntro = 'Learn the seven diatonic modes and compare how their note patterns differ. Use the C examples below to see, hear and practice each mode.';
const modes = ['Ionian', 'Dorian', 'Phrygian', 'Lydian', 'Mixolydian', 'Aeolian', 'Locrian'];
const ionianNotes = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

const modesResponse = await fetch(`${base}/scales/modes`, { redirect: 'manual' });
const modesHtml = await modesResponse.text();
const modesVisible = visible(modesHtml);
const title = decode(modesHtml.match(/<title>([^<]*)<\/title>/i)?.[1] ?? '');
const h1s = [...modesHtml.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)].map((match) => decode(match[1].replace(/<[^>]+>/g, '').trim()));
const h2s = [...modesHtml.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((match) => decode(match[1].replace(/<[^>]+>/g, '').trim()));
const description = decode(modesHtml.match(/<meta[^>]+name="description"[^>]+content="([^"]*)"/i)?.[1]
  ?? modesHtml.match(/<meta[^>]+content="([^"]*)"[^>]+name="description"/i)?.[1]
  ?? '');
const canonical = modesHtml.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i)?.[1]
  ?? modesHtml.match(/<link[^>]+href="([^"]+)"[^>]+rel="canonical"/i)?.[1]
  ?? '';
const robots = modesHtml.match(/<meta[^>]+name="robots"[^>]+content="([^"]*)"/i)?.[1]
  ?? modesHtml.match(/<meta[^>]+content="([^"]*)"[^>]+name="robots"/i)?.[1]
  ?? '';
const comparisonIndex = modesHtml.indexOf('id="comparison"');
const exploreIndex = modesHtml.indexOf('id="explore-mode"');

test('modes 200', () => assert(modesResponse.status === 200, String(modesResponse.status)));
test('modes title', () => assert(title === expectedTitle, title));
test('modes exactly one H1', () => assert(h1s.length === 1 && h1s[0] === expectedH1, JSON.stringify(h1s)));
test('modes keyword in Title/H1', () => {
  assert(/scale modes/i.test(title), title);
  assert(/scale modes/i.test(h1s[0] ?? ''), h1s[0]);
});
test('modes description', () => assert(description.startsWith('Learn the seven scale modes on piano.'), description));
test('modes intro', () => assert(modesVisible.includes(expectedIntro), 'intro missing'));
test('modes canonical', () => assert(canonical === 'https://pianogrid.com/scales/modes' || canonical === '/scales/modes', canonical));
test('modes robots index,follow', () => {
  const value = robots.toLowerCase();
  assert(value.includes('index') && value.includes('follow') && !value.includes('noindex'), robots);
});
test('comparison before explorer', () => {
  assert(comparisonIndex > 0 && exploreIndex > comparisonIndex, `comparison=${comparisonIndex} explore=${exploreIndex}`);
});
test('comparison heading', () => assert(h2s.includes('Compare the Seven Scale Modes'), JSON.stringify(h2s)));
test('explorer heading', () => assert(h2s.includes('Explore a Mode'), JSON.stringify(h2s)));
test('educational headings', () => {
  assert(h2s.includes('How the Modes Differ'), JSON.stringify(h2s));
  assert(h2s.includes('Parallel vs. Relative Modes'), JSON.stringify(h2s));
  assert(h2s.includes('Hear the Difference'), JSON.stringify(h2s));
});
test('kept sections', () => {
  assert(/Check the notes/i.test(modesVisible), 'quiz missing');
  assert(/Practice with a pulse/i.test(modesVisible), 'practice missing');
  assert(/Frequently asked questions/.test(modesVisible), 'FAQ missing');
  assert(/Related references/.test(modesVisible), 'related missing');
  assert(/Print current scale/.test(modesVisible), 'print missing');
});
test('seven modes and C spellings', () => {
  for (const mode of modes) assert(modesVisible.includes(mode), `missing ${mode}`);
  for (const note of ionianNotes) assert(new RegExp(`\\b${note}\\b`).test(modesVisible), `missing ${note}`);
  assert(modesVisible.includes('W–W–H–W–W–W–H') || modesVisible.includes('W-W-H-W-W-W-H'), 'whole/half Ionian missing');
  assert(modesVisible.includes('2–2–1–2–2–2–1') || modesVisible.includes('2-2-1-2-2-2-1'), 'semitone Ionian missing');
});
test('no internal QA copy', () => {
  assert(!/AT-\d+/i.test(modesVisible), modesVisible.match(/AT-\d+/i)?.[0] || 'AT id');
  assert(!/Checked for:/.test(modesVisible), 'Checked for');
  assert(!/checking scope/.test(modesVisible), 'checking scope');
  assert(!/Current collection:/.test(modesVisible), 'Current collection');
  assert(!/Source record:/.test(modesVisible), 'Source record');
  assert(!/not the same as a teacher review/.test(modesVisible), 'teacher review');
  assert(!/Complete supported comparison/.test(modesVisible), 'old comparison heading');
  assert(!/Find the changing notes/.test(modesVisible), 'old differences heading');
  assert(!/Same tonic or same collection\?/.test(modesVisible), 'old relationships heading');
  assert(!/Try one comparison/.test(modesVisible), 'old practice heading');
});
test('source links kept', () => {
  assert(h2s.includes('Sources'), JSON.stringify(h2s));
  assert(/Open Music Theory/.test(modesVisible), 'Open Music Theory missing');
  assert(/Berklee PULSE/.test(modesVisible), 'Berklee missing');
  assert(/Texas A&M Open Digital Publishing/.test(modesVisible), 'Texas A&M missing');
  assert(modesHtml.includes('https://viva.pressbooks.pub/openmusictheory/chapter/intro-to-diatonic-modes-and-the-chromatic-scale/'), 'OMT link');
  assert(modesHtml.includes('https://pulse.berklee.edu/scales/c-dorian-scale.html'), 'Berklee Dorian link');
  assert(modesHtml.includes('https://odp.library.tamu.edu/stepstomusictheory/chapter/modes/'), 'TAMU link');
});

const bluesResponse = await fetch(`${base}/scales/blues`, { redirect: 'manual' });
const bluesHtml = await bluesResponse.text();
const bluesVisible = visible(bluesHtml);
test('blues 200 unchanged family page', () => assert(bluesResponse.status === 200, String(bluesResponse.status)));
test('blues keeps comparison heading', () => assert(/Complete supported comparison/.test(bluesVisible), 'blues comparison retitled'));
test('blues keeps Current scale', () => assert(/Current scale/.test(bluesVisible), 'blues explorer retitled'));

const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
const robotsTxt = await (await fetch(`${base}/robots.txt`)).text();
test('sitemap still lists modes', () => assert(sitemap.includes('https://pianogrid.com/scales/modes'), 'modes missing from sitemap'));
test('robots unchanged', () => assert(robotsTxt.includes('Allow: /') && !robotsTxt.includes('Disallow: /'), robotsTxt.slice(0, 200)));

let playwright = { ran: false, notes: [] };
const playwrightPath = process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright';
if (existsSync(playwrightPath)) {
  const { chromium } = createRequire(import.meta.url)(playwrightPath);
  const browser = await chromium.launch({ channel: 'chrome', headless: true });
  const page = await browser.newPage();
  playwright.ran = true;
  try {
    await page.setViewportSize({ width: 1440, height: 950 });
    await page.goto(`${base}/scales/modes`, { waitUntil: 'domcontentloaded' });
    const h1Count = await page.locator('h1').count();
    test('live one H1', () => assert(h1Count === 1, String(h1Count)));
    const modeSelect = page.getByLabel('Mode', { exact: true });
    await modeSelect.waitFor({ state: 'visible' });
    await page.waitForFunction(() => {
      const select = document.querySelector('select[aria-label="Mode"]');
      return select instanceof HTMLSelectElement && !select.disabled;
    }, null, { timeout: 15000 });
    await modeSelect.selectOption('c-lydian');
    const selected = await page.locator('#explore-mode .sc-result-head h3').innerText();
    test('mode selector', () => assert(/C Lydian/.test(selected), selected));
    const play = page.getByRole('button', { name: 'Play scale', exact: true });
    await play.click();
    await page.waitForTimeout(400);
    playwright.notes.push(`play: ${await page.locator('.sc-actions [role="status"], .kn-status, .kn-error').first().innerText().catch(() => '')}`);
    test('play clicked', () => assert(true));
    const stop = page.getByRole('button', { name: 'Stop', exact: true });
    if (await stop.isEnabled()) await stop.click();
    await page.getByRole('button', { name: 'Check answer' }).click();
    const quiz = await page.locator('.sc-feedback').first().innerText();
    test('quiz works', () => assert(quiz.length > 0, quiz));
    await page.getByRole('button', { name: 'Start practice' }).click();
    const practice = await page.locator('#follow-along').getAttribute('data-practice-state');
    playwright.notes.push(`practice state: ${practice}`);
    test('practice starts', () => assert(practice !== 'idle', String(practice)));
    await page.evaluate(() => { window.print = () => { window.dispatchEvent(new Event('beforeprint')); }; });
    await page.getByRole('button', { name: 'Print current scale' }).click();
    const printId = await page.locator('[data-print-scale]').getAttribute('data-print-scale');
    test('print snapshot', () => assert(/lydian/i.test(printId ?? ''), String(printId)));
    for (const width of [1440, 390]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${base}/scales/modes`, { waitUntil: 'domcontentloaded' });
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth + 1);
      test(`overflow ${width}`, () => assert(!overflow, `scrollWidth overflow at ${width}`));
    }
  } catch (error) {
    test('playwright suite', () => { throw error; });
  } finally {
    await browser.close();
  }
} else {
  test('playwright available', () => { throw new Error('NOT_RUN: playwright runtime missing'); });
}

await mkdir(outDir, { recursive: true });
const failed = results.filter((item) => !item.passed);
await writeFile(`${outDir}/live-validation.json`, JSON.stringify({
  executed_at: new Date().toISOString(),
  base,
  passed: results.length - failed.length,
  failed: failed.length,
  playwright,
  results,
}, null, 2) + '\n');
for (const item of failed) console.error('FAIL', item.name, item.detail);
console.log(`${results.length - failed.length}/${results.length} passed`);
process.exitCode = failed.length ? 1 : 0;
