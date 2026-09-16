import { createRequire } from 'node:module';
import { writeFileSync, mkdirSync } from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require(
  process.env.PIANO_PLAYWRIGHT_PATH ||
    'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright',
);
const base = process.env.PIANO_BASE_URL || 'http://localhost:3116';
const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const out = [];
const check = (n, p, d = '') => {
  out.push({ n, p: Boolean(p), d });
  console.log(p ? 'PASS' : 'FAIL', n, d);
};

await page.goto(`${base}/songs/easy`, { waitUntil: 'networkidle' });
check('easy overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
await page.getByRole('button', { name: 'Share this plan' }).click();
check('plan share dialog', (await page.getByRole('dialog').count()) > 0);
const html = await page.content();
check('plan share has plan query', html.includes('plan=twinkle-early-elementary'));
await page.keyboard.press('Escape');

await page.goto(`${base}/keyboard-notes/labeled#teaching-pack`, { waitUntil: 'networkidle' });
check('teaching pack visible', (await page.locator('#teaching-pack').count()) > 0);
const pdfs = await page.locator('a[href*="piano-key-names-c4-c5"]').count();
check('teaching pdf links', pdfs >= 2, `count=${pdfs}`);

await page.goto(`${base}/tools/hear-the-difference`, { waitUntil: 'networkidle' });
check('hear play CTA', (await page.getByRole('button', { name: /Play comparison|Play/i }).count()) > 0);

await page.setViewportSize({ width: 390, height: 844 });
await page.goto(`${base}/songs/easy`, { waitUntil: 'networkidle' });
check('mobile easy overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));
await page.goto(`${base}/sheet-music/hot-cross-buns`, { waitUntil: 'networkidle' });
check('mobile sheet collapse', (await page.locator('[data-slot="collapsible-trigger"]').count()) > 0);
check('mobile sheet overflow', await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1));

await page.goto(`${base}/songs/easy`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: 'Start the plan' }).focus();
check(
  'start plan focusable',
  await page.evaluate(() => (document.activeElement?.textContent || '').includes('Start the plan')),
);

await browser.close();
mkdirSync('docs/product-upgrade/b05-b07-v2/delivery/final/closeout-logs', { recursive: true });
writeFileSync(
  'docs/product-upgrade/b05-b07-v2/delivery/final/closeout-logs/interaction-smoke.json',
  JSON.stringify({ total: out.length, failed: out.filter((x) => !x.p).length, checks: out }, null, 2),
);
const failed = out.filter((x) => !x.p);
console.log(JSON.stringify({ total: out.length, failed: failed.length }));
process.exit(failed.length ? 1 : 0);
