import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../..');
const out = join(here, 'machine');
const base = process.env.PIANO_BASE_URL || 'http://127.0.0.1:3000';
const results = [];
const check = (name, passed, detail = '') => results.push({ name, passed: Boolean(passed), detail });
const sha256 = (buffer) => createHash('sha256').update(buffer).digest('hex');

try {
  const pages = [
    ['/keyboard-notes', 'Piano Keys and Notes: Find Any Key'],
    ['/keyboard-notes/labeled', 'Labeled Piano Keys: 88-Key and 61-Key References'],
    ['/keyboard-notes/chart', 'Piano Notes Chart: Staff, Note Names &amp; Keyboard'],
  ];
  for (const [path, title] of pages) {
    const response = await fetch(base + path);
    const html = await response.text();
    check(`${path}: HTTP 200`, response.status === 200, response.status);
    check(`${path}: title`, html.includes(`<title>${title}</title>`));
    check(`${path}: noindex/nofollow`, /<meta[^>]+name="robots"[^>]+content="noindex, nofollow"/.test(html));
    check(`${path}: canonical metadata is not published`, !/<link[^>]+rel="canonical"/.test(html));
    check(`${path}: audit ledger does not leak`, !/piano_keyword_research_combined\.xlsx|merge_decision_status|schema_version|source-ledger\.master/.test(html));
    check(`${path}: unrelated source groups do not leak`, !/P001|P179|P226/.test(html));
    check(`${path}: no client-side runtime error page`, !/Application error|Internal Server Error/.test(html));
  }

  for (const path of ['/chords', '/chords/a-minor', '/chords/a-major', '/chords/c-major']) {
    const response = await fetch(base + path);
    check(`${path}: regression HTTP 200`, response.status === 200, response.status);
  }

  for (const path of ['/', '/scales', '/keyboard-notes/frequencies', '/keyboard-notes/finger-numbers', '/keyboard-notes/blank', '/keyboard-notes/key-signatures', '/tools/piano-cheat-sheet']) {
    const response = await fetch(base + path);
    check(`${path}: unauthorized route is 404`, response.status === 404, response.status);
  }

  const assets = JSON.parse(await readFile(join(root, 'docs/content/asset-map.json'), 'utf8')).generated_keyboard_notes;
  for (const asset of assets) {
    const response = await fetch(base + asset.url);
    const bytes = Buffer.from(await response.arrayBuffer());
    check(`${asset.url}: HTTP 200`, response.status === 200, response.status);
    check(`${asset.url}: PDF content type`, response.headers.get('content-type')?.includes('application/pdf'), response.headers.get('content-type') ?? '');
    check(`${asset.url}: served hash matches manifest`, sha256(bytes) === asset.sha256, sha256(bytes));
  }

  await mkdir(out, { recursive: true });
  const report = {
    executed_at: new Date().toISOString(),
    base,
    passed: results.filter((item) => item.passed).length,
    failed: results.filter((item) => !item.passed).length,
    results,
  };
  await writeFile(join(out, 'http-validation.json'), JSON.stringify(report, null, 2) + '\n');
  console.log(`HTTP review: ${report.passed} passed, ${report.failed} failed.`);
  for (const failure of results.filter((item) => !item.passed)) console.error(`FAIL: ${failure.name} ${failure.detail}`);
  process.exitCode = report.failed ? 1 : 0;
} catch (error) {
  await mkdir(out, { recursive: true });
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  await writeFile(join(out, 'http-validation.json'), JSON.stringify({ executed_at: new Date().toISOString(), base, passed: 0, failed: 1, error: message }, null, 2) + '\n');
  console.error(message);
  process.exitCode = 1;
}
