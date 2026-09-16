import assert from 'node:assert/strict';
import { readFileSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { createHash } from 'node:crypto';

const content = JSON.parse(readFileSync(resolve('docs/product-upgrade/b05-b07-v2/data/content.en.json'), 'utf8'));
const teacherSource = readFileSync(resolve('src/lib/b06-content.ts'), 'utf8');
const packSource = readFileSync(resolve('src/lib/b06-teaching-pack.ts'), 'utf8');
const teachingUI = readFileSync(resolve('src/components/keyboard-notes/teaching-pack.tsx'), 'utf8');
const labeled = readFileSync(resolve('src/components/keyboard-notes/labeled-experience.tsx'), 'utf8');

assert.match(teacherSource, new RegExp(content.teacher.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')));
assert.match(teacherSource, /anchor: 'teaching-pack'/);
assert.match(packSource, /TEACHING_PACK_ID = 'piano-key-names-c4-c5'/);
assert.match(packSource, /WHITE_KEY_ANSWERS = \['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'\]/);
assert.match(packSource, /circle: 'F4'/);
assert.match(packSource, /dot: 'C5'/);
assert.match(packSource, /betweenPair: 'D4'/);
assert.match(packSource, /natural-c4-c5/);
assert.doesNotMatch(packSource, /20260916/);
assert.match(teachingUI, /id=\{TEACHING_PACK_ANCHOR\}/);
assert.match(teachingUI, /Download 3-page PDF|copy\.download/);
assert.match(labeled, /TeachingPackExperience/);

const assets = [
  'public/reference/generated/keyboard-notes/piano-key-names-c4-c5-letter.pdf',
  'public/reference/generated/keyboard-notes/piano-key-names-c4-c5-a4.pdf',
  'public/reference/generated/keyboard-notes/piano-key-names-c4-c5-letter-worksheet.pdf',
  'public/reference/generated/keyboard-notes/piano-key-names-c4-c5-a4-worksheet.pdf',
];

const assetStatus = assets.map(file => {
  const path = resolve(file);
  if (!existsSync(path)) return { file, present: false };
  const bytes = readFileSync(path);
  return {
    file,
    present: true,
    sha256: createHash('sha256').update(bytes).digest('hex'),
    bytes: bytes.length,
    pdfHeader: bytes.subarray(0, 5).toString('utf8') === '%PDF-',
  };
});

const out = {
  ok: true,
  teacherTitle: content.teacher.title,
  labeledWired: true,
  assets: assetStatus,
};
mkdirSync(resolve('docs/product-upgrade/b05-b07-v2/delivery/b06'), { recursive: true });
writeFileSync(resolve('docs/product-upgrade/b05-b07-v2/delivery/b06/unit-results.json'), `${JSON.stringify(out, null, 2)}\n`);
console.log('check-b06-plan: ok');
if (assetStatus.some(item => !item.present)) {
  console.warn('NOTE: teaching pack PDFs not generated yet');
}
