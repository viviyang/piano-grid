import { createRequire } from 'node:module';
import { mkdir, copyFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);
const { chromium } = require(process.env.PIANO_PLAYWRIGHT_PATH || 'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');

const base = process.env.PIANO_BASE_URL || 'http://localhost:3116';
const outDir = resolve(process.env.PIANO_PDF_OUT || 'public/reference/generated/keyboard-notes');
const jobs = [
  { paper: 'letter', pageSet: 'full', file: 'piano-key-names-c4-c5-letter.pdf', format: 'Letter', width: '8.5in', height: '11in' },
  { paper: 'a4', pageSet: 'full', file: 'piano-key-names-c4-c5-a4.pdf', format: 'A4', width: '210mm', height: '297mm' },
  { paper: 'letter', pageSet: 'worksheet', file: 'piano-key-names-c4-c5-letter-worksheet.pdf', format: 'Letter', width: '8.5in', height: '11in' },
  { paper: 'a4', pageSet: 'worksheet', file: 'piano-key-names-c4-c5-a4-worksheet.pdf', format: 'A4', width: '210mm', height: '297mm' },
];

const browser = await chromium.launch({ channel: 'chrome', headless: true });
try {
  await mkdir(outDir, { recursive: true });
  const page = await browser.newPage({ viewport: { width: 1200, height: 1600 } });
  for (const job of jobs) {
    const url = `${base}/keyboard-notes/labeled?printResource=piano-key-names-c4-c5&paper=${job.paper}&pageSet=${job.pageSet}`;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 90000 });
    await page.waitForFunction(() => {
      const root = document.documentElement;
      return root.dataset.pgPrintResource === 'piano-key-names-c4-c5'
        && document.querySelectorAll('.pg-teaching-pack-print-only .pg-teaching-pack-sheet').length >= 1;
    }, undefined, { timeout: 60000 });

    await page.addStyleTag({ content: `
      @page { size: ${job.paper === 'a4' ? 'A4' : 'Letter'} portrait; margin: 14mm; }
      html, body { background: #fff !important; }
      body * { visibility: hidden !important; }
      .pg-teaching-pack-print-only, .pg-teaching-pack-print-only * { visibility: visible !important; }
      .pg-teaching-pack-print-only { display: block !important; position: static !important; }
      .pg-teaching-pack-print-only[hidden] { display: block !important; }
      .kn-page .kn-screen, .kn-page .am-screen, .kn-page .kn-print-only, header, footer, .am-skip, .kn-share-dialog, .pg-teaching-pack-dialog-root { display: none !important; }
      .pg-teaching-pack-sheet { break-after: page; page-break-after: always; break-inside: avoid; }
      .pg-teaching-pack-sheet:last-child { break-after: auto; page-break-after: auto; }
    ` });

    const expected = job.pageSet === 'worksheet' ? 1 : 3;
    const count = await page.locator('.pg-teaching-pack-print-only .pg-teaching-pack-sheet').count();
    if (count !== expected) throw new Error(`${job.file}: expected ${expected} sheets, got ${count}`);

    await page.emulateMedia({ media: 'print' });
    const tmpDir = resolve('tmp/teaching-pack-pdfs');
    await mkdir(tmpDir, { recursive: true });
    const tmp = resolve(tmpDir, job.file);
    await page.pdf({
      path: tmp,
      width: job.width,
      height: job.height,
      printBackground: true,
      preferCSSPageSize: false,
      margin: { top: '14mm', right: '14mm', bottom: '14mm', left: '14mm' },
    });
    await copyFile(tmp, resolve(outDir, job.file));
    const { size } = await import('node:fs').then(fs => fs.promises.stat(resolve(outDir, job.file)));
    if (size < 5000) throw new Error(`${job.file} too small (${size} bytes) — likely blank`);
    console.log('wrote', job.file, 'pages', expected, 'bytes', size);
  }
} finally {
  await browser.close();
}
