import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { join, relative } from 'node:path';

const root = process.cwd();
const handoff = join(root, 'PianoGrid_Scales_Completion_Handoff');
const manifest = JSON.parse(readFileSync(join(handoff, 'manifest.json'), 'utf8'));
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory() ? walk(join(dir, entry.name)) : [join(dir, entry.name)]);
const actual = walk(handoff).map((path) => relative(handoff, path).replaceAll('\\', '/')).filter((path) => path !== 'manifest.json').sort();
const listed = manifest.files.map((item) => item.path).sort();
const failures = [];
if (JSON.stringify(actual) !== JSON.stringify(listed)) failures.push('manifest path coverage mismatch');
for (const item of manifest.files) {
  const path = join(handoff, item.path);
  const bytes = readFileSync(path);
  const hash = createHash('sha256').update(bytes).digest('hex');
  if (statSync(path).size !== item.bytes || hash !== item.sha256) failures.push(`hash/size mismatch: ${item.path}`);
}
const bannedPaths = [...actual, 'manifest.json'].filter((path) => /(^|\/)(?:\.env(?:\.|$)|\.git(?:\/|$)|node_modules(?:\/|$)|\.next(?:\/|$))|\.(?:ttf|otf|woff2?|eot)$/i.test(path));
if (bannedPaths.length) failures.push(`banned paths: ${bannedPaths.join(', ')}`);
const textExtensions = new Set(['.md', '.txt', '.json', '.js', '.mjs', '.ts', '.tsx', '.css', '.py', '.html']);
const secretPatterns = [
  /-----BEGIN [A-Z ]*PRIVATE KEY-----/,
  /\bsk-[A-Za-z0-9_-]{20,}\b/,
  /\bghp_[A-Za-z0-9]{30,}\b/,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\bAIza[0-9A-Za-z_-]{30,}\b/,
];
const secretHits = [];
for (const path of actual) {
  const ext = path.slice(path.lastIndexOf('.')).toLowerCase();
  if (!textExtensions.has(ext)) continue;
  const text = readFileSync(join(handoff, path), 'utf8');
  if (secretPatterns.some((pattern) => pattern.test(text))) secretHits.push(path);
}
if (secretHits.length) failures.push(`secret-like content: ${secretHits.join(', ')}`);
for (const required of ['RESULT.md', 'AUTHORING_CONTRACT.md', 'COMMANDS.md', 'ROUTES_TASKS_AND_GAPS.json', 'MANUAL_AND_RELEASE_GATE.md', 'manifest.json']) {
  if (!walk(handoff).some((path) => relative(handoff, path).replaceAll('\\', '/') === required)) failures.push(`missing required file: ${required}`);
}
const routes = JSON.parse(readFileSync(join(handoff, 'ROUTES_TASKS_AND_GAPS.json'), 'utf8'));
if (routes.route_count !== 27 || routes.routes.length !== 27) failures.push('route inventory is not 27');
const resources = readdirSync(join(handoff, 'RESOURCES')).filter((file) => file.endsWith('.pdf'));
if (resources.length !== 8) failures.push(`expected 8 PDFs, found ${resources.length}`);
const report = {
  executed_at: new Date().toISOString(),
  status: failures.length ? 'FAIL' : 'PASS',
  manifest_files: manifest.file_count,
  actual_non_manifest_files: actual.length,
  pdf_count: resources.length,
  route_count: routes.routes.length,
  banned_paths: bannedPaths,
  secret_like_hits: secretHits,
  failures,
};
writeFileSync(join(root, 'checks/scales-completion/handoff-package-qa.json'), `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify(report, null, 2));
process.exitCode = failures.length ? 1 : 0;
