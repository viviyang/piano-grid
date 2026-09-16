import { createRequire } from 'node:module';
import { readFileSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const require = createRequire(import.meta.url);

function loadPdfParse() {
  const candidates = [
    process.env.PIANO_PDF_PARSE_PATH,
    'C:/Users/Admin/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/pdf-parse',
    'pdf-parse',
  ].filter(Boolean);
  for (const candidate of candidates) {
    try {
      return require(candidate);
    } catch {
      // try next
    }
  }
  return null;
}

const assets = [
  { file: 'public/reference/generated/keyboard-notes/piano-key-names-c4-c5-letter.pdf', pages: 3, answers: true },
  { file: 'public/reference/generated/keyboard-notes/piano-key-names-c4-c5-a4.pdf', pages: 3, answers: true },
  { file: 'public/reference/generated/keyboard-notes/piano-key-names-c4-c5-letter-worksheet.pdf', pages: 1, answers: false },
  { file: 'public/reference/generated/keyboard-notes/piano-key-names-c4-c5-a4-worksheet.pdf', pages: 1, answers: false },
];

const answers = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
const lookAgain = ['F4', 'C5', 'D4'];
const results = [];
const pdfParse = loadPdfParse();

for (const asset of assets) {
  const path = resolve(asset.file);
  if (!existsSync(path)) {
    results.push({ file: asset.file, ok: false, error: 'missing' });
    continue;
  }
  const bytes = readFileSync(path);
  const sha256 = createHash('sha256').update(bytes).digest('hex');
  const header = bytes.subarray(0, 5).toString('utf8');
  const entry = { file: asset.file, ok: header === '%PDF-', sha256, bytes: bytes.length, header };
  if (pdfParse) {
    try {
      const parsed = await pdfParse(bytes);
      entry.pageCount = parsed.numpages;
      entry.text = parsed.text;
      entry.ok = entry.ok && parsed.numpages === asset.pages;
      if (asset.answers) {
        for (const label of answers) {
          if (!parsed.text.includes(label)) {
            entry.ok = false;
            entry.missingLabel = label;
          }
        }
        for (const label of lookAgain) {
          if (!parsed.text.includes(label)) {
            entry.ok = false;
            entry.missingLookAgain = label;
          }
        }
      } else {
        for (const label of answers) {
          // Worksheet must not pre-fill white-key answer letters as extractable note labels.
          // Allow the resource URL / footer words, but reject clustered answer row.
          if (parsed.text.includes(answers.join(' · ')) || parsed.text.includes(answers.join(' '))) {
            entry.ok = false;
            entry.worksheetLeak = 'answer-row';
          }
        }
        if (parsed.text.includes('Use page 3 to check')) {
          entry.ok = false;
          entry.worksheetLeak = 'page-3-footer';
        }
      }
    } catch (error) {
      entry.ok = false;
      entry.parseError = String(error);
    }
  } else {
    entry.warning = 'pdf-parse unavailable; header/size only';
  }
  results.push(entry);
}

const outDir = resolve('docs/product-upgrade/b05-b07-v2/delivery/b06');
mkdirSync(outDir, { recursive: true });
writeFileSync(resolve(outDir, 'pdf-check.json'), `${JSON.stringify(results, null, 2)}\n`);
const failed = results.filter(item => !item.ok);
console.log(JSON.stringify({ checked: results.length, failed: failed.length, pdfParse: Boolean(pdfParse) }, null, 2));
if (failed.length) process.exitCode = 1;
