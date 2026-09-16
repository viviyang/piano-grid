import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3116';
const outDir = resolve('docs/product-upgrade/b05-b07-v2/delivery/b06');
await mkdir(`${outDir}/screenshots`, { recursive: true });

const results = [];
function check(name, passed, detail = '') {
  results.push({ name, passed: Boolean(passed), detail });
  if (!passed) console.error('FAIL', name, detail);
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  const response = await page.goto(`${base}/keyboard-notes/labeled`, { waitUntil: 'networkidle' });
  check('labeled status 200', response?.status() === 200, String(response?.status()));
  await page.waitForSelector('#teaching-pack');
  check('teaching pack section present', await page.locator('#teaching-pack').count() === 1);
  check('download 3-page PDF label', await page.getByRole('link', { name: 'Download 3-page PDF' }).count() >= 1);
  check('print this pack control', await page.getByRole('button', { name: 'Print this pack' }).count() >= 1);
  check('share resource control', await page.getByRole('button', { name: 'Share resource' }).count() >= 1);
  check('matching practice link', await page.getByRole('link', { name: /matching online practice/i }).count() >= 1);
  const practiceHref = await page.getByRole('link', { name: /matching online practice/i }).first().getAttribute('href');
  check('practice uses natural-c4-c5', Boolean(practiceHref && practiceHref.includes('practice-option=natural-c4-c5')), practiceHref || '');
  check('practice not design fixture seed', !(practiceHref || '').includes('20260916'), practiceHref || '');

  await page.getByRole('radio', { name: 'A4' }).check();
  const download = page.getByRole('link', { name: 'Download 3-page PDF' }).first();
  check('A4 download href', (await download.getAttribute('href'))?.includes('a4.pdf') === true, await download.getAttribute('href') || '');

  await page.getByRole('button', { name: /Answers/ }).click();
  check('answers thumb pressed', await page.locator('.pg-teaching-pack-thumb[aria-pressed="true"]').textContent().then(t => /Answers/i.test(t || '')) === true);

  await page.getByRole('button', { name: 'Share resource' }).click();
  await page.waitForTimeout(200);
  const shareDialog = page.getByRole('dialog', { name: 'A piano-key practice pack' });
  check('share dialog open', await shareDialog.count() >= 1);
  const shareText = await shareDialog.innerText();
  check('share mentions teaching pack', /teaching-pack|piano-key practice pack|C4–C5|C4-C5/i.test(shareText), shareText.slice(0, 240));

  await page.keyboard.press('Escape');
  await page.getByRole('button', { name: 'Print this pack' }).click();
  check('print options dialog', await page.locator('#pg-teaching-pack-print-dialog').count() === 1);
  await page.getByRole('radio', { name: /Worksheet only/ }).check();
  check('worksheet-only selected', await page.getByRole('radio', { name: /Worksheet only/ }).isChecked());

  await page.screenshot({ path: `${outDir}/screenshots/teacher-1440.png`, fullPage: true });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto(`${base}/keyboard-notes/labeled#teaching-pack`, { waitUntil: 'networkidle' });
  await page.screenshot({ path: `${outDir}/screenshots/teacher-390.png`, fullPage: true });

  // Old labeled print still exposes Print reference
  check('legacy print reference retained', await page.getByRole('button', { name: 'Print reference' }).count() >= 1);
} finally {
  await browser.close();
}

await writeFile(`${outDir}/browser-results.json`, `${JSON.stringify({ results, failed: results.filter(r => !r.passed).length }, null, 2)}\n`);
console.log(`B06 browser: ${results.filter(r => r.passed).length} passed, ${results.filter(r => !r.passed).length} failed`);
if (results.some(r => !r.passed)) process.exitCode = 1;
