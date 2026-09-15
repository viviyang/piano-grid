import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  const output = process.env.PIANO_PDF_OUT || 'tmp/pdfs/keyboard-notes';
  const parts = `${output}/parts`;
  await mkdir(parts, { recursive: true });
  const page = await browser.newPage();
  const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3000';
  const pdfOptions = { format: 'Letter', landscape: true, preferCSSPageSize: true, printBackground: true };
  for (const count of [88, 61]) for (const octaves of [true, false]) {
    const pageCount = count === 88 ? 3 : 2;
    for (let part = 0; part < pageCount; part += 1) {
      await page.goto(`${base}/keyboard-notes/labeled?layout=${count}&octaves=${octaves ? '1' : '0'}&printPart=${part}`);
      await page.waitForFunction(() => !document.querySelector('select').disabled && document.querySelectorAll('.kn-print-sheet').length === 1);
      await page.pdf({ ...pdfOptions, path: `${parts}/labeled-${count}-${octaves ? 'octaves' : 'letters'}-${part + 1}.pdf` });
    }
    console.log(count, octaves, pageCount);
  }
  await page.goto(`${base}/keyboard-notes/chart?range=61_keys&clef=both&note=Gb4&prefer=flat`);
  await page.waitForFunction(() => !document.querySelector('select').disabled);
  await page.pdf({ ...pdfOptions, path: `${output}/chart-61-gb4.pdf` });
} finally { await browser.close(); }
