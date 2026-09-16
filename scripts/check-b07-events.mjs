/**
 * B07 T13 — verify local CustomEvent dispatch + whitelist; no external collector expected.
 * Usage: PIANO_BASE_URL=http://localhost:3116 node scripts/check-b07-events.mjs
 */
import { createRequire } from 'node:module';
import { writeFileSync } from 'node:fs';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://localhost:3116';
const outDir = resolve('docs/product-upgrade/b05-b07-v2/delivery/b07');

const browser = await chromium.launch({ channel: 'chrome', headless: true });
const page = await browser.newPage();
const captured = [];

await page.exposeFunction('__pgCapture', (detail) => {
  captured.push(detail);
});
await page.addInitScript(() => {
  const wrap = (type) => {
    window.addEventListener(type, (event) => {
      const detail = event.detail || {};
      window.__pgCapture({ channel: type, name: detail.name, properties: detail.properties, externallySent: detail.externallySent });
    });
  };
  wrap('pianogrid:song-plan-event');
  wrap('pianogrid:teaching-pack-event');
});

await page.goto(`${base}/songs/easy`, { waitUntil: 'networkidle' });
await page.getByRole('button', { name: /start the plan/i }).click();
await page.waitForTimeout(200);
await page.getByRole('button', { name: /share this plan/i }).first().click().catch(() => {});
await page.waitForTimeout(200);

await page.goto(`${base}/keyboard-notes/labeled#teaching-pack`, { waitUntil: 'networkidle' });
await page.waitForSelector('#teaching-pack');
await page.waitForTimeout(300);
const practice = page.getByRole('link', { name: /matching online practice/i });
if (await practice.count()) await practice.first().click({ modifiers: ['Control'] }).catch(() => {});

const sensitiveKeys = ['url', 'href', 'search', 'pathname', 'email', 'name', 'answer', 'answers', 'checkin', 'focusChoice', 'raw'];
const findings = captured.map((item) => ({
  ...item,
  hasSensitive: Object.keys(item.properties || {}).some((key) => sensitiveKeys.includes(key.toLowerCase())),
}));

const status = {
  at: new Date().toISOString(),
  base,
  collector: 'INSTRUMENTED_NOT_COLLECTED',
  reason: 'No third-party analytics SDK / collector endpoint configured for B05/B06 events. Local CustomEvent only; externallySent remains false.',
  channels: {
    songPlan: 'pianogrid:song-plan-event',
    teachingPack: 'pianogrid:teaching-pack-event',
  },
  contractMapping: [
    { contract: 'song_plan_* / share_* / edition_open / valid_shared_landing', implementedAs: 'b05-events.ts SongPlanEventName' },
    { contract: 'resource_preview / resource_download_click / resource_print_requested', implementedAs: 'teaching_pack_preview_page / teaching_pack_download / teaching_pack_print_dialog (B06 naming)' },
    { contract: 'share_panel_open (resource)', implementedAs: 'teaching_pack_share_open' },
  ],
  localDispatchSample: findings.slice(0, 40),
  localDispatchCount: findings.length,
  sensitiveLeak: findings.some((f) => f.hasSensitive),
  providersScanned: {
    gtagGlobalOnSongsEasy: await page.evaluate(() => typeof window.gtag === 'function'),
    plausible: await page.evaluate(() => typeof window.plausible === 'function'),
    dataLayer: await page.evaluate(() => Array.isArray(window.dataLayer)),
  },
};

writeFileSync(resolve(outDir, 'EVENT_STATUS.json'), JSON.stringify(status, null, 2));
console.log(JSON.stringify({
  collector: status.collector,
  localDispatchCount: status.localDispatchCount,
  sensitiveLeak: status.sensitiveLeak,
  providers: status.providersScanned,
}, null, 2));

await browser.close();
process.exit(status.sensitiveLeak || status.localDispatchCount < 1 ? 1 : 0);
