import fs from 'node:fs';
import path from 'node:path';
import { SCALE_URLS } from './scale-authoring-contract.mjs';
import { attachScaleFaqSupplement } from './scale-faq-contract.mjs';

const outputIndex = process.argv.indexOf('--output');
if (outputIndex < 0 || !process.argv[outputIndex + 1]) throw new Error('Usage: node scripts/export-scale-authoring.mjs --output <bundle.json> [--master <master.json>]');
const masterIndex = process.argv.indexOf('--master');
const masterPath = masterIndex >= 0 ? process.argv[masterIndex + 1] : 'docs/content/site-master/page-content.master.json';
const outputPath = process.argv[outputIndex + 1];
const master = JSON.parse(fs.readFileSync(masterPath, 'utf8'));
const pages = attachScaleFaqSupplement(Object.fromEntries(SCALE_URLS.map((url) => [url, master.pages[url]])));
function nestedSourceIDs(value, found = new Set()) {
  if (Array.isArray(value)) value.forEach((item) => nestedSourceIDs(item, found));
  else if (value && typeof value === 'object') for (const [key, item] of Object.entries(value)) {
    if (key === 'source_id' && typeof item === 'string') found.add(item);
    else if ((key === 'source_ids' || key.endsWith('_source_ids')) && Array.isArray(item)) item.forEach((id) => typeof id === 'string' && found.add(id));
    else nestedSourceIDs(item, found);
  }
  return found;
}
const sourceIDs = nestedSourceIDs(Object.values(pages));
const sources = master.sources.filter((source) => sourceIDs.has(source.source_id));
const bundle = {
  contract_version: '2026-09-14-SCALES-COMPLETION-1',
  source_master_path: masterPath.replaceAll('\\', '/'),
  pages,
  sources,
};
fs.mkdirSync(path.dirname(outputPath), { recursive: true });
fs.writeFileSync(outputPath, `${JSON.stringify(bundle, null, 2)}\n`);
console.log(outputPath);
