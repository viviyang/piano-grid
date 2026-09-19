import fs from 'node:fs';
import { createRequire } from 'node:module';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const { chromium } = createRequire(import.meta.url)(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3128';
const outDir = resolve(root, 'docs/seo/chords/evidence-2026-09-18/tdh-alignment-2026-09-19/screenshots');
fs.mkdirSync(outDir, { recursive: true });

const pages = [
  { id: 'b7', path: '/chords/b-7', h1: 'B7 Chord' },
  { id: 'cmaj7', path: '/chords/c-maj7', h1: 'Cmaj7 Chord' },
  { id: 'cm7', path: '/chords/c-m7', h1: 'Cm7 Chord' },
  { id: 'bm7b5', path: '/chords/b-m7-flat5', h1: 'B Half-Diminished Chord (Bm7♭5)' },
  { id: 'csus2', path: '/chords/c-sus2', h1: 'Csus2 Chord' },
  { id: 'csus4', path: '/chords/c-sus4', h1: 'Csus4 Chord' },
  { id: 'dflat7', path: '/chords/d-flat-7', h1: 'D♭7 Chord' },
  { id: 'fsharpmaj7', path: '/chords/f-sharp-maj7', h1: 'F♯maj7 Chord' },
  { id: 'bminor', path: '/chords/b-minor', h1: 'B Minor Chord' },
  { id: 'hold-dfm7b5', path: '/chords/d-flat-m7-flat5', h1Includes: 'Half-Diminished Seventh Piano Chord' },
  { id: 'seventh', path: '/chords/seventh' },
  { id: 'hub', path: '/chords' },
];
const viewports = [
  { name: 'desktop', width: 1440, height: 900 },
  { name: 'mobile', width: 390, height: 844 },
];

const results = [];
const check = (name, passed, detail = '') => {
  results.push({ name, passed: Boolean(passed), detail });
  console.log(passed ? 'PASS' : 'FAIL', name, detail || '');
};

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  for (const vp of viewports) {
    const page = await browser.newPage({ viewport: { width: vp.width, height: vp.height } });
    page.setDefaultTimeout(30000);
    for (const item of pages) {
      const response = await page.goto(base + item.path, { waitUntil: 'domcontentloaded', timeout: 60000 });
      const status = response?.status() || 0;
      check(`${vp.name} ${item.id} 200`, status === 200, String(status));
      const h1 = ((await page.locator('h1').first().textContent()) || '').replace(/\s+/g, ' ').trim();
      if (item.h1) check(`${vp.name} ${item.id} h1`, h1 === item.h1, h1);
      if (item.h1Includes) check(`${vp.name} ${item.id} h1 includes pack label`, h1.includes(item.h1Includes), h1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      check(`${vp.name} ${item.id} no horizontal overflow`, overflow <= 1, 'delta=' + overflow);
      await page.screenshot({ path: resolve(outDir, `${item.id}-${vp.name}.png`), fullPage: false });
    }
    await page.close();
  }
} finally {
  await browser.close();
}

const failed = results.filter((item) => !item.passed);
fs.writeFileSync(resolve(root, 'docs/seo/chords/evidence-2026-09-18/tdh-alignment-2026-09-19/_smoke.json'), JSON.stringify({ base, failed: failed.length, results }, null, 2) + '\n');
if (failed.length) {
  console.error(failed);
  process.exit(1);
}
console.log(JSON.stringify({ ok: true, checks: results.length }, null, 2));
