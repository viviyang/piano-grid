/**
 * B07 T14 — first-screen screenshots for in-scope pages + light B04/B03 smoke.
 */
import { createRequire } from 'node:module';
import { mkdir, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3116';
const outDir = resolve('docs/product-upgrade/b05-b07-v2/delivery/b07');
const shotDir = resolve(outDir, 'screenshots');
await mkdir(shotDir, { recursive: true });

const pages = [
  '/songs',
  '/songs/easy',
  '/sheet-music',
  '/sheet-music/easy',
  '/sheet-music/beginner',
  '/sheet-music/twinkle-twinkle-little-star',
  '/keyboard-notes',
  '/keyboard-notes/labeled',
  '/tools',
  '/tools/hear-the-difference',
];

const results = [];
function check(name, passed, detail = '') {
  results.push({ name, passed: Boolean(passed), detail });
  if (!passed) console.error('FAIL', name, detail);
}

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const path of pages) {
    for (const [label, viewport] of [
      ['1440', { width: 1440, height: 1000 }],
      ['390', { width: 390, height: 844 }],
    ]) {
      const page = await browser.newPage({ viewport });
      const res = await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
      check(`${path} ${label} status`, res?.status() === 200, String(res?.status()));
      const file = `${path.replace(/\W+/g, '_').replace(/^_/, '') || 'home'}-${label}.png`;
      await page.screenshot({ path: resolve(shotDir, file), fullPage: false });
      check(`${path} ${label} h1`, (await page.locator('h1').count()) === 1);
      await page.close();
    }
  }

  // B03-ish practice share smoke: labeled practice link restores option
  {
    const page = await browser.newPage();
    await page.goto(`${base}/keyboard-notes/labeled#teaching-pack`, { waitUntil: 'networkidle' });
    const href = await page.getByRole('link', { name: /matching online practice/i }).first().getAttribute('href');
    check('practice href present', Boolean(href));
    check('practice natural-c4-c5', Boolean(href && href.includes('practice-option=natural-c4-c5')), href || '');
    if (href) {
      await page.goto(`${base}${href}`, { waitUntil: 'networkidle' });
      check('practice page loads', (await page.locator('h1').count()) >= 1);
    }
    await page.close();
  }

  // B04 hear-the-difference still present
  {
    const page = await browser.newPage();
    const res = await page.goto(`${base}/tools/hear-the-difference`, { waitUntil: 'networkidle' });
    check('B04 page 200', res?.status() === 200);
    check('B04 listen CTA', await page.getByRole('button', { name: /listen|play|start/i }).count() >= 1);
    await page.close();
  }
} finally {
  await browser.close();
}

const summary = {
  at: new Date().toISOString(),
  base,
  passed: results.filter((r) => r.passed).length,
  failed: results.filter((r) => !r.passed).length,
  results,
};
await writeFile(resolve(outDir, 'browser-results.json'), JSON.stringify(summary, null, 2));
console.log(JSON.stringify({ passed: summary.passed, failed: summary.failed }, null, 2));
process.exit(summary.failed ? 1 : 0);
