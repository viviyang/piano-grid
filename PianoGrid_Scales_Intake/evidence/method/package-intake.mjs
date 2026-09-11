import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { copyFileSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve } from 'node:path';

const root = resolve(process.cwd());
const out = join(root, 'PianoGrid_Scales_Intake');
const origins = new Map();

function ensure(path) { mkdirSync(path, { recursive: true }); }
function write(rel, value) {
  const target = join(out, rel);
  ensure(dirname(target));
  writeFileSync(target, value);
  if (!origins.has(rel.replaceAll('\\', '/'))) origins.set(rel.replaceAll('\\', '/'), 'generated from scoped repository evidence by evidence/method/package-intake.mjs');
}
function json(rel, value) { write(rel, `${JSON.stringify(value, null, 2)}\n`); }
function copy(rel, dest = join('source', rel)) {
  const source = join(root, rel);
  if (!existsSync(source)) throw new Error(`Missing required source: ${rel}`);
  const target = join(out, dest);
  ensure(dirname(target));
  copyFileSync(source, target);
  origins.set(dest.replaceAll('\\', '/'), rel.replaceAll('\\', '/'));
}

const sourceFiles = [
  'src/app/globals.css',
  'src/app/layout.tsx',
  'src/app/scales/page.tsx',
  'src/app/scales/c-major/page.tsx',
  'src/app/scales/a-minor/page.tsx',
  'src/styles/tokens.css',
  'src/styles/foundation.css',
  'src/components/scales/pages.tsx',
  'src/components/scales/center-experience.tsx',
  'src/components/scales/detail-experience.tsx',
  'src/components/scales/scale-reference.tsx',
  'src/components/scales/use-scale-audio.ts',
  'src/components/scales/scales.css',
  'src/components/keyboard-notes/keyboard-diagram.tsx',
  'src/components/keyboard-notes/staff-diagram.tsx',
  'src/components/keyboard-notes/keyboard-notes.css',
  'src/components/chords/site-chrome.tsx',
  'src/components/site-navigation.tsx',
  'src/components/site-navigation.css',
  'src/components/ui/site-brand.tsx',
  'src/components/ui/site-brand.css',
  'src/components/ui/breadcrumb.tsx',
  'src/components/ui/breadcrumb.css',
  'src/lib/scale-types.ts',
  'src/lib/scale-content.ts',
  'src/lib/site-content.ts',
  'src/lib/site-routes.ts',
  'src/lib/site-config.ts',
  'src/lib/keyboard-content.ts',
  'src/lib/keyboard-types.ts',
  'src/lib/keyboard-geometry.ts',
  'src/lib/a-minor-audio.ts',
  'src/lib/a-minor-types.ts',
  'src/lib/utils.ts',
  'src/app/chords/a-minor/a-minor.css',
  'docs/design/design-system.md',
  'docs/design/inspection.md',
  'docs/design/tokens.json',
  'scripts/check-scale-data.mjs',
  'scripts/check-scale-batch.mjs',
  'scripts/check-scale-fallbacks.mjs',
  'scripts/check-scale-production.mjs',
  'scripts/check-scale-pdfs.py',
];
sourceFiles.forEach((file) => copy(file));

const contentFiles = [
  'docs/content/site-master/A-Scales/batch-content-pack.md',
  'docs/content/site-master/A-Scales/batch-open-issues.md',
  'docs/content/site-master/A-Scales/batch-page-content.json',
  'docs/content/site-master/A-Scales/batch-source-ledger.md',
  'docs/content/site-master/content-master-index.md',
  'docs/tasks/batch-implementation/03-scales.md',
  'docs/release/release-readiness.md',
  'docs/tasks/site-implementation-plan.md',
];
contentFiles.forEach((file) => copy(file, join('planning-and-content', 'originals', file)));

const evidenceFiles = [
  ['checks/reviews/03-scales/review.md', 'evidence/existing-scale-review/review.md'],
  ['checks/reviews/03-scales/run-summary.json', 'evidence/existing-scale-review/run-summary.json'],
  ['checks/reviews/03-scales/source-hash-verification.json', 'evidence/existing-scale-review/source-hash-verification.json'],
  ['checks/reviews/03-scales/machine/data-validation.json', 'evidence/existing-scale-review/machine/data-validation.json'],
  ['checks/reviews/03-scales/machine/validation.json', 'evidence/existing-scale-review/machine/validation.json'],
  ['checks/reviews/03-scales/machine/fallback-validation.json', 'evidence/existing-scale-review/machine/fallback-validation.json'],
  ['checks/reviews/03-scales/machine/pdf-validation.json', 'evidence/existing-scale-review/machine/pdf-validation.json'],
  ['checks/reviews/03-scales/machine/production-validation.json', 'evidence/existing-scale-review/machine/production-validation.json'],
  ['checks/reviews/03-scales/print-renders/scales-center-c-major.png', 'evidence/existing-scale-review/print-renders/scales-center-c-major.png'],
  ['checks/reviews/03-scales/print-renders/c-major-lh-up-down.png', 'evidence/existing-scale-review/print-renders/c-major-lh-up-down.png'],
  ['checks/reviews/03-scales/print-renders/a-minor-natural-rh-ascending.png', 'evidence/existing-scale-review/print-renders/a-minor-natural-rh-ascending.png'],
  ['checks/reviews/03-scales/print-renders/a-minor-melodic-rh-descending.png', 'evidence/existing-scale-review/print-renders/a-minor-melodic-rh-descending.png'],
  ['checks/release/public-launch/independent-reverification/review.md', 'evidence/current-public/review.md'],
  ['checks/release/public-launch/independent-reverification/live/production-validation.json', 'evidence/current-public/production-validation.json'],
  ['checks/release/public-launch/independent-reverification/public-boundary.json', 'evidence/current-public/public-boundary.json'],
  ['docs/pianogrid-chords-v2/B3_RESULT.md', 'evidence/chords-b3/B3_RESULT.md'],
  ['docs/pianogrid-chords-v2/evidence/b3/adapter-validation.json', 'evidence/chords-b3/adapter-validation.json'],
];
for (const [from, to] of evidenceFiles) copy(from, to);

for (const name of ['scales', 'scales--c-major', 'scales--a-minor']) {
  for (const width of ['1440', '390']) {
    copy(
      `checks/release/public-launch/independent-reverification/live/screenshots/${name}-${width}.png`,
      `evidence/current-public/screenshots/${name}-${width}.png`,
    );
  }
  copy(
    `checks/release/public-launch/independent-reverification/live/html/${name}.html`,
    `evidence/current-public/html/${name}.html`,
  );
  copy(
    `checks/release/public-launch/independent-reverification/live/headers/${name}.json`,
    `evidence/current-public/headers/${name}.json`,
  );
}

const masterPath = join(root, 'docs/content/site-master/page-content.master.json');
const master = JSON.parse(readFileSync(masterPath, 'utf8'));
const targetUrls = ['/scales', '/scales/c-major', '/scales/a-minor'];
const targetPages = Object.fromEntries(targetUrls.map((url) => [url, master.pages[url]]));
const sourceById = new Map(master.sources.map((source) => [source.source_id, source]));
const referencedIds = new Set();
function collectSourceIds(value) {
  if (Array.isArray(value)) return value.forEach(collectSourceIds);
  if (value && typeof value === 'object') return Object.values(value).forEach(collectSourceIds);
  if (typeof value === 'string' && sourceById.has(value)) referencedIds.add(value);
}
Object.values(targetPages).forEach(collectSourceIds);
const referencedSources = [...referencedIds].sort().map((id) => sourceById.get(id));

json('examples/scales-center.page.json', targetPages['/scales']);
json('examples/c-major.page.json', targetPages['/scales/c-major']);
json('examples/a-minor.page.json', targetPages['/scales/a-minor']);
json('examples/referenced-sources.json', { source_ids: [...referencedIds].sort(), sources: referencedSources });
json('planning-and-content/page-content.master.scales-current.extract.json', {
  extraction_note: 'Exact parsed page objects for the three implemented Scales routes plus every directly referenced source record. The original full master is intentionally not duplicated outside scope.',
  original_path: 'docs/content/site-master/page-content.master.json',
  schema_version: master.schema_version,
  date: master.date,
  delivery_state: master.delivery_state,
  pages: targetPages,
  sources: referencedSources,
  baseline_page_registry: (master.baseline_page_registry ?? []).filter((entry) => targetUrls.includes(entry.url)),
  open_issues: (master.open_issues ?? []).filter((entry) => {
    const text = JSON.stringify(entry);
    return targetUrls.some((url) => text.includes(url));
  }),
});

const urlPlanPath = join(root, 'docs/product/url-plan.final.json');
const urlPlan = JSON.parse(readFileSync(urlPlanPath, 'utf8'));
const scopedPlan = {
  extraction_note: 'Exact parsed records whose URL, template, keyword, or mapping belongs to Scales/Arpeggios. Planning status is not deployment status.',
  original_path: 'docs/product/url-plan.final.json',
  version: urlPlan.version,
  date: urlPlan.date,
  document_status: urlPlan.document_status,
  mode: urlPlan.mode,
  pages: (urlPlan.pages ?? []).filter((entry) => /^\/(scales|arpeggios)(?:\/|$)/.test(entry.url ?? '')),
  page_specs: (urlPlan.page_specs ?? []).filter((entry) => ['T11', 'T12', 'T13', 'T14'].includes(entry.template_id ?? entry.id)),
  source_task_mapping: (urlPlan.source_task_mapping ?? []).filter((entry) => /scale|arpeggio|音阶|琶音/i.test(JSON.stringify(entry))),
  retained_without_url: (urlPlan.retained_without_url ?? []).filter((entry) => /scale|arpeggio|音阶|琶音/i.test(JSON.stringify(entry))),
};
json('planning-and-content/url-plan.final.scales-arpeggios.extract.json', scopedPlan);

function section(text, start, end) {
  const a = text.indexOf(start);
  if (a < 0) throw new Error(`Missing section start: ${start}`);
  const b = end ? text.indexOf(end, a + start.length) : text.length;
  if (b < 0) throw new Error(`Missing section end: ${end}`);
  return text.slice(a, b).trimEnd();
}
const planPath = join(root, 'docs/product/Piano_全站统一规划_最终版.md');
const planText = readFileSync(planPath, 'utf8');
const planExtract = [
  '# Scales / Arpeggios scoped extract from Piano_全站统一规划_最终版.md',
  '',
  '> Exact contiguous sections copied from `docs/product/Piano_全站统一规划_最终版.md`; headings outside scope are omitted. The original file hash is recorded in `manifest.json`.',
  '',
  section(planText, '## 3. 已确认的内容到底覆盖到哪里', '## 4. 全站页面分工与交付模板'),
  '',
  section(planText, '#### T11｜音阶中心', '#### T15｜选曲中心'),
  '',
  section(planText, '### 音阶｜25 条 URL', '### 学习与练习指南｜14 条 URL'),
  '',
  section(planText, '### 音阶｜36 个原任务', '### 学习与练习指南｜48 个原任务'),
  '',
  section(planText, '## 7. 暂缓与已知范围缺口', '## 8. 准备与发布顺序'),
  '',
  section(planText, '## 8. 准备与发布顺序', '## 9. 本版明确修正了哪些地方'),
  '',
].join('\n');
write('planning-and-content/Piano_全站统一规划_最终版.scales-arpeggios.extract.md', planExtract);

const masterLedgerPath = join(root, 'docs/content/site-master/source-ledger.master.md');
const masterLedger = readFileSync(masterLedgerPath, 'utf8');
const ledgerBlocks = [...masterLedger.matchAll(/^## ([^\r\n]+)[\s\S]*?(?=^## |\Z)/gm)];
const ledgerById = new Map(ledgerBlocks.map((match) => [match[1].trim(), match[0].trimEnd()]));
const batch = JSON.parse(readFileSync(join(root, 'docs/content/site-master/A-Scales/batch-page-content.json'), 'utf8'));
const batchIds = new Set();
collectBatch(batch);
function collectBatch(value) {
  if (Array.isArray(value)) return value.forEach(collectBatch);
  if (value && typeof value === 'object') return Object.values(value).forEach(collectBatch);
  if (typeof value === 'string' && ledgerById.has(value)) batchIds.add(value);
}
json('planning-and-content/object-page-directory.json', batch.pages.map((page) => ({
  url: page.url,
  title: page.title,
  template_id: page.template_id,
  source_group_ids: (page.source_groups ?? []).map((group) => group.id),
  source_ids: page.source_ids ?? [],
  content_blocks: (page.blocks ?? []).map((block) => block.id),
  data_fields: Object.keys(page.data ?? {}),
  route_exists_in_current_source: targetUrls.includes(page.url),
  deployment_verified_by_packaged_public_evidence: targetUrls.includes(page.url),
  status_note: targetUrls.includes(page.url)
    ? 'Implemented route. Public deployment evidence is packaged; current dirty local tree is not claimed byte-identical to that deployment.'
    : 'Planning/content object only. No route or deployment claim.',
}))); 
write('planning-and-content/source-ledger.master.scales-arpeggios.extract.md', [
  '# Scales / Arpeggios source-ledger master extract',
  '',
  '> Exact source sections referenced by `A-Scales/batch-page-content.json`, copied from `docs/content/site-master/source-ledger.master.md`.',
  '',
  ...[...batchIds].sort().flatMap((id) => [ledgerById.get(id), '']),
].join('\n'));

const issuesPath = join(root, 'docs/content/site-master/unresolved-issues.master.md');
const issuesText = readFileSync(issuesPath, 'utf8');
write('planning-and-content/unresolved-issues.master.scales-arpeggios.extract.md', [
  '# Scales / Arpeggios unresolved-issues master extract',
  '',
  '> Exact Batch A section copied from `docs/content/site-master/unresolved-issues.master.md`.',
  '',
  section(issuesText, '### Batch A', '### Batch B'),
  '',
].join('\n'));

const head = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim();
const branch = execFileSync('git', ['branch', '--show-current'], { cwd: root, encoding: 'utf8' }).trim();
const status = execFileSync('git', ['status', '--short'], { cwd: root, encoding: 'utf8' });
write('evidence/workspace-status.txt', `captured_at=${new Date().toISOString()}\nhead=${head}\nbranch=${branch}\n\n${status}`);

const originalReferencePaths = [
  'docs/content/site-master/page-content.master.json',
  'docs/content/site-master/source-ledger.master.md',
  'docs/content/site-master/unresolved-issues.master.md',
  'docs/product/Piano_全站统一规划_最终版.md',
  'docs/product/url-plan.final.json',
];
json('planning-and-content/original-reference-index.json', originalReferencePaths.map((rel) => ({
  original_path: rel,
  sha256: createHash('sha256').update(readFileSync(join(root, rel))).digest('hex'),
  packaged_as: rel.includes('page-content.master') ? 'page-content.master.scales-current.extract.json'
    : rel.includes('source-ledger.master') ? 'source-ledger.master.scales-arpeggios.extract.md'
    : rel.includes('unresolved-issues.master') ? 'unresolved-issues.master.scales-arpeggios.extract.md'
    : rel.includes('Piano_') ? 'Piano_全站统一规划_最终版.scales-arpeggios.extract.md'
    : 'url-plan.final.scales-arpeggios.extract.json',
})));

function filesUnder(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? filesUnder(path) : [path];
  });
}
const manifestEntries = filesUnder(out)
  .map((path) => relative(out, path).replaceAll('\\', '/'))
  .filter((rel) => rel !== 'manifest.json')
  .sort()
  .map((rel) => ({
    path: rel,
    source: origins.get(rel) ?? (rel === 'evidence/current-local/computed-styles.json'
      ? 'current local browser DOM/computed-style read on 2026-09-11'
      : 'generated intake documentation from the packaged repository evidence'),
    bytes: statSync(join(out, rel)).size,
    sha256: createHash('sha256').update(readFileSync(join(out, rel))).digest('hex'),
  }));
json('manifest.json', {
  package: 'PianoGrid_Scales_Intake',
  generated_at: new Date().toISOString(),
  workspace: { head, branch, dirty: status.trim().length > 0 },
  scope: ['/scales', '/scales/c-major', '/scales/a-minor'],
  visual_capture: {
    current_local_pages_opened: true,
    current_local_full_page_screenshots_saved: false,
    reused_public_full_page_screenshots: true,
    reused_viewports_css_px: [1440, 390],
    note: 'Public screenshots/HTML belong to the packaged 2026-09-10 independent live verification. The dirty local tree was separately opened and read; byte identity with production is not claimed.',
  },
  exclusions: ['.env and secrets', 'cookies/tokens/private connection data', '.git', 'node_modules', 'build caches', 'personal documents', 'font files'],
  files: manifestEntries,
});

console.log(`Prepared ${relative(root, out)} from ${head}`);
