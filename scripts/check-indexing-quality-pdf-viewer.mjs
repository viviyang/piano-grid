import fs from 'node:fs';
import { createRequire } from 'node:module';

const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3047';
const out = process.env.PIANO_CHECK_OUT || 'checks/indexing-quality-v2/pdf-render';
fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const page = await browser.newPage({ viewport: { width: 1080, height: 1100 } });
  for (const slug of ['b-flat-major', 'e-flat-major', 'd-flat-major', 'c-sharp-minor', 'f-sharp-minor', 'd-flat-diminished']) {
    const response = await page.goto(`${base}/reference/assets/chord-${slug}.pdf`);
    if (response?.status() !== 200) throw new Error(`${slug}: PDF HTTP ${response?.status()}`);
    await page.waitForTimeout(800);
    await page.screenshot({ path: `${out}/${slug}-noto-chrome.png` });
  }
} finally {
  await browser.close();
}
console.log('Chrome PDF viewer: 6 samples captured');
