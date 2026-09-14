import crypto from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import { validateScaleAuthoringBundle } from './scale-authoring-contract.mjs';

function argument(name, fallback) {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : fallback;
}

const inputPath = argument('--input');
const masterPath = argument('--master', 'docs/content/site-master/page-content.master.json');
const previewPath = argument('--preview');
const write = process.argv.includes('--write');
if (!inputPath) throw new Error('Usage: node scripts/import-scale-authoring.mjs --input <bundle.json> [--master <master.json>] [--preview <report.json>] [--write]');

const beforeBytes = fs.readFileSync(masterPath);
const master = JSON.parse(beforeBytes.toString('utf8'));
const bundle = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
const validation = validateScaleAuthoringBundle(bundle, master);
const next = structuredClone(master);

for (const [url, page] of Object.entries(bundle.pages)) next.pages[url] = page;
if (bundle.sources) {
  const indexByID = new Map(next.sources.map((source, index) => [source.source_id, index]));
  for (const source of bundle.sources) {
    if (!indexByID.has(source.source_id)) throw new Error(`sources: new source id ${source.source_id} is not approved by the current master`);
    next.sources[indexByID.get(source.source_id)] = source;
  }
}

const semanticChange = JSON.stringify(master) !== JSON.stringify(next);
const output = semanticChange ? `${JSON.stringify(next, null, 2)}\n` : beforeBytes.toString('utf8');
const afterBytes = Buffer.from(output);
const sha256 = (bytes) => crypto.createHash('sha256').update(bytes).digest('hex');
const report = {
  mode: write ? 'write' : 'dry-run',
  input: path.resolve(inputPath),
  master: path.resolve(masterPath),
  validation,
  changed_page_keys: Object.keys(bundle.pages),
  preserved_non_scale_page_count: Object.keys(master.pages).filter((url) => !Object.hasOwn(bundle.pages, url)).length,
  before_sha256: sha256(beforeBytes),
  after_sha256: sha256(afterBytes),
  would_change: semanticChange,
};

if (previewPath) {
  fs.mkdirSync(path.dirname(previewPath), { recursive: true });
  fs.writeFileSync(previewPath, `${JSON.stringify(report, null, 2)}\n`);
}

if (write && semanticChange) {
  const tempPath = `${masterPath}.scales-import-${process.pid}.tmp`;
  const backupPath = `${masterPath}.scales-import-${process.pid}.bak`;
  fs.writeFileSync(tempPath, afterBytes, { flag: 'wx' });
  try {
    fs.renameSync(masterPath, backupPath);
    try {
      fs.renameSync(tempPath, masterPath);
      fs.unlinkSync(backupPath);
    } catch (error) {
      fs.renameSync(backupPath, masterPath);
      throw error;
    }
  } finally {
    if (fs.existsSync(tempPath)) fs.unlinkSync(tempPath);
  }
}

console.log(JSON.stringify(report, null, 2));
