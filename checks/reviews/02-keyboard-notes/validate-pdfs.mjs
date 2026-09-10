import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../..');
const out = join(here, 'machine');
const assets = JSON.parse(await readFile(join(root, 'docs/content/asset-map.json'), 'utf8')).generated_keyboard_notes;
const results = [];
const check = (name, passed, detail = '') => results.push({ name, passed: Boolean(passed), detail });

for (const asset of assets) {
  const path = join(root, asset.output_path);
  const bytes = await readFile(path);
  const info = execFileSync('pdfinfo', [path], { encoding: 'utf8' });
  const expectedPages = asset.output_path.includes('labeled-88-') ? 9 : 6;
  const pages = Number(info.match(/^Pages:\s+(\d+)/m)?.[1]);
  check(`${asset.output_path}: SHA-256`, createHash('sha256').update(bytes).digest('hex') === asset.sha256);
  check(`${asset.output_path}: page count`, pages === expectedPages, pages);
  check(`${asset.output_path}: US Letter pages`, /^Page size:\s+612 x 792 pts \(letter\)$/m.test(info));
}

await mkdir(out, { recursive: true });
const report = {
  executed_at: new Date().toISOString(),
  tools: {
    pdfinfo: execFileSync('pdfinfo', ['-v'], { encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] }).trim(),
  },
  passed: results.filter((item) => item.passed).length,
  failed: results.filter((item) => !item.passed).length,
  results,
};
await writeFile(join(out, 'pdf-validation.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`PDF review: ${report.passed} passed, ${report.failed} failed.`);
for (const failure of results.filter((item) => !item.passed)) console.error(`FAIL: ${failure.name} ${failure.detail}`);
process.exitCode = report.failed ? 1 : 0;
