import { createRequire } from 'node:module';
import fs from 'node:fs';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3115';
const out = process.env.PIANO_SHOT_OUT || 'docs/product-upgrade/2026-09-16/release-closeout-delivery/screenshots';

fs.mkdirSync(`${out}/desktop`, { recursive: true });
fs.mkdirSync(`${out}/mobile`, { recursive: true });

const shots = [
  ['desktop/b04-landing', { width: 1440, height: 960 }, '/tools/hear-the-difference'],
  ['mobile/b04-landing', { width: 390, height: 844 }, '/tools/hear-the-difference'],
  ['desktop/keyboard-explore', { width: 1440, height: 960 }, '/keyboard-notes'],
  ['mobile/keyboard-explore', { width: 390, height: 844 }, '/keyboard-notes'],
  ['desktop/keyboard-practice-hash', { width: 1440, height: 960 }, '/keyboard-notes#note-trainer'],
  ['mobile/keyboard-practice-hash', { width: 390, height: 844 }, '/keyboard-notes#note-trainer'],
  ['desktop/labeled', { width: 1440, height: 960 }, '/keyboard-notes/labeled'],
  ['mobile/labeled', { width: 390, height: 844 }, '/keyboard-notes/labeled'],
];

const browser = await chromium.launch({ headless: true });
try {
  for (const [name, viewport, path] of shots) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    if (path.includes('/keyboard-notes') && !path.includes('labeled')) {
      await page.locator('.kn-v2-shell[data-hydrated="true"]').waitFor({ timeout: 10000 }).catch(() => {});
    }
    await page.screenshot({ path: `${out}/${name}.png`, fullPage: true });
    await context.close();
  }
  console.log(JSON.stringify({ ok: true, count: shots.length }));
} finally {
  await browser.close();
}
