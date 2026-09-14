import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';

const root = process.cwd();
const name = 'PianoGrid_Scales_Completion_Handoff';
const out = join(root, name);
if (existsSync(out)) throw new Error(`${name} already exists; refusing to overwrite it.`);
mkdirSync(out, { recursive: true });

const write = (path, content) => {
  const target = join(out, path);
  mkdirSync(dirname(target), { recursive: true });
  writeFileSync(target, content.endsWith('\n') ? content : `${content}\n`, 'utf8');
};
const json = (path, value) => write(path, JSON.stringify(value, null, 2));
const copy = (source, target = source) => {
  const from = join(root, source);
  if (!existsSync(from)) throw new Error(`Missing handoff input: ${source}`);
  const to = join(out, target);
  mkdirSync(dirname(to), { recursive: true });
  cpSync(from, to, { recursive: true });
};
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8', maxBuffer: 64 * 1024 * 1024 });

const head = git('rev-parse', 'HEAD').trim();
const status = git('status', '--short');
const generatedAt = new Date().toISOString();
const bundle = JSON.parse(readFileSync(join(root, 'checks/scales-completion/current-authoring-bundle.json'), 'utf8'));
const ledger = JSON.parse(readFileSync(join(root, 'docs/content/site-master/A-Scales/completion/scales-27-route-ledger.json'), 'utf8'));

copy('checks/scales-completion/input-pack/PianoGrid_Scales_Completion_Pack', 'CURRENT_INPUTS/original-completion-pack');
copy('checks/scales-completion/current-authoring-bundle.json', 'CURRENT_INPUTS/candidate/current-authoring-bundle.json');
copy('checks/scales-completion/import-dry-run.json', 'CURRENT_INPUTS/candidate/import-dry-run.json');
copy('checks/scales-completion/contract-validation.json', 'CURRENT_INPUTS/candidate/contract-validation.json');
copy('docs/content/site-master/A-Scales/completion', 'CURRENT_INPUTS/repository-authoring-materials');

const sourceFiles = [
  'src/app/arpeggios/page.tsx',
  'src/app/guide/piano-scales/page.tsx',
  'src/app/scales/[slug]/page.tsx',
  'src/components/integration/pages.tsx',
  'src/lib/integration-content.ts',
  'src/lib/site-routes.ts',
  'docs/content/site-master/page-content.master.json',
  'scripts/check-css.mjs',
  'scripts/build-scale-completion-handoff.mjs',
  'scripts/check-foundation.mjs',
  'scripts/check-scale-batch.mjs',
  'scripts/check-scale-completion-contract.mjs',
  'scripts/check-scale-completion-pdfs.py',
  'scripts/check-scale-events.mjs',
  'scripts/check-scale-fallbacks.mjs',
  'scripts/check-scale-final.mjs',
  'scripts/export-scale-authoring.mjs',
  'scripts/generate-scale-completion-pdfs.py',
  'scripts/generate-scale-pdfs.py',
  'scripts/import-scale-authoring.mjs',
  'scripts/scale-authoring-contract.mjs',
];
for (const file of readdirSync(join(root, 'src/components/scales'))) sourceFiles.push(`src/components/scales/${file}`);
for (const file of readdirSync(join(root, 'src/lib')).filter((file) => file.startsWith('scale-'))) sourceFiles.push(`src/lib/${file}`);
for (const file of [...new Set(sourceFiles)].sort()) copy(file, `SOURCE_CHANGES/files/${file}`);

const resourceNames = [
  'pianogrid-scales-notes-check-worksheet.pdf',
  'pianogrid-scales-starter-reference.pdf',
  'pianogrid-12-major-scales-note-reference.pdf',
  'pianogrid-12-major-scales-note-reference-a4.pdf',
  'pianogrid-major-minor-note-atlas.pdf',
  'pianogrid-major-minor-note-atlas-a4.pdf',
  'pianogrid-c-major-two-hand-starter.pdf',
  'pianogrid-c-major-two-hand-starter-a4.pdf',
];
for (const file of resourceNames) copy(`public/downloads/scales/${file}`, `RESOURCES/${file}`);
copy('checks/scales-completion/pdf/generation-metadata.json', 'RESOURCES/generation-metadata.json');
copy('checks/scales-completion/pdf/pdf-validation.json', 'RESOURCES/pdf-validation.json');
copy('scripts/generate-scale-completion-pdfs.py', 'RESOURCES/generate-scale-completion-pdfs.py');

for (const file of ['local-baseline.json', 'scope-and-conflicts.md', 'evidence-reuse.json', 'build-and-checks.json', 'production-sample-2026-09-14.json', 'data-and-contract-validation.json']) copy(`checks/scales-completion/${file}`, `EVIDENCE/${file}`);
for (const folder of ['browser', 'events', 'regression', 'pdf/rendered']) copy(`checks/scales-completion/${folder}`, `EVIDENCE/${folder.replace('/', '-')}`);

write('SOURCE_CHANGES/git-status.txt', status);
write('SOURCE_CHANGES/git-diff-stat.txt', git('diff', '--stat'));
const patchText = git('diff', '--', '.', ':(exclude)public/downloads/scales/*.pdf', ':(exclude)checks/batches/**');
write('SOURCE_CHANGES/tracked-text-changes.patch', patchText || '# No tracked text changes.');

function fingeringCounts(value, path = '', result = { populated_rows: 0, null_slots: 0, populated_paths: [], null_paths: [] }) {
  if (Array.isArray(value)) {
    if (/finger/i.test(path) && value.length && value.every((item) => Number.isInteger(item))) {
      result.populated_rows += 1;
      result.populated_paths.push(path);
    } else value.forEach((item, index) => fingeringCounts(item, `${path}[${index}]`, result));
  } else if (value && typeof value === 'object') {
    for (const [key, item] of Object.entries(value)) {
      const next = path ? `${path}.${key}` : key;
      if (/finger/i.test(next) && item === null) {
        result.null_slots += 1;
        result.null_paths.push(next);
      } else fingeringCounts(item, next, result);
    }
  }
  return result;
}
const directProduction = new Map([
  ['/scales', 'VERIFIED_HTTP_200_2026-09-14'], ['/scales/c-major', 'VERIFIED_HTTP_200_2026-09-14'], ['/scales/a-minor', 'VERIFIED_HTTP_200_2026-09-14'],
  ['/scales/d-major', 'VERIFIED_HTTP_404_2026-09-14'], ['/arpeggios', 'VERIFIED_HTTP_404_2026-09-14'], ['/guide/piano-scales', 'VERIFIED_HTTP_404_2026-09-14'],
]);
const routeRows = ledger.rows.map((row) => {
  const page = bundle.pages[row.url];
  const issues = (page.issues ?? []).map((issue) => typeof issue === 'string' ? issue : issue.issue_id ?? issue.id ?? issue.status ?? JSON.stringify(issue));
  return {
    url: row.url,
    template_id: page.template_id,
    original_keyword: row.original_keyword,
    original_priority: row.original_priority,
    original_required_delivery: row.original_required_delivery,
    source_groups: row.source_groups,
    local_candidate: 'HTTP_200_AND_INITIAL_HTML_VERIFIED',
    local_candidate_registry: true,
    authoring_release_fields_preserved: { ready_for_publish: page.ready_for_publish, deployment_status: page.deployment_status },
    production_status: directProduction.get(row.url) ?? (row.url.startsWith('/scales/') || row.url === '/arpeggios' || row.url === '/guide/piano-scales' ? 'ABSENT_FROM_173_URL_PRODUCTION_SITEMAP_DIRECT_HTTP_NOT_CHECKED' : 'UNKNOWN'),
    blocks: page.blocks?.length ?? 0,
    source_ids: page.source_ids,
    fingering: fingeringCounts(page.data),
    preserved_issue_ids: issues,
    release_gate: 'MANUAL_REVIEW_AND_EXPLICIT_DEPLOY_AUTHORIZATION_PENDING',
  };
});
json('ROUTES_TASKS_AND_GAPS.json', {
  generated_at: generatedAt,
  contract_version: bundle.contract_version,
  route_count: routeRows.length,
  local_sitemap_count: 197,
  production_sitemap_count: 173,
  statuses_are_not_interchangeable: true,
  routes: routeRows,
  global_gaps: [
    'Physical printing, specialist engraving review, screen-reader review, and iPhone Safari listening were not run.',
    'Fingering remains notes-only wherever exact form/hand/direction/range evidence is absent.',
    'The natural-minor descending supplement remains unimported because source_written_register and target_display_register are null.',
    'Production deployment was not authorized or performed.',
  ],
});

write('RESULT.md', `# PianoGrid Scales completion result

[已核实] Base: fetched \`origin/main\` at \`${head}\`, then implemented in an isolated same-repository worktree. The original dirty Chords worktree was not reset, cleaned, stashed, or overwritten. No commit, push, dependency install, or deployment occurred.

## Four-layer status

- [已核实] Input/contract: package integrity 22/22; 27 pages and 74 source records validate; 9/9 negative/edge probes reject invalid spelling, MIDI, key color, order, source closure and fingering scope. CLI and server rendering call the same validator.
- [已核实] Model/UI: 60 center objects, five families with 20 named examples, C/G arpeggios, 27 route pages, Finder, guide, resources, printing, practice, quiz and local event adapter are implemented. Data/model checks 670/670; browser regression 350/350; fallbacks 30/30; local events 8/8.
- [已核实] Resources: two existing PDFs retained; three new categories were generated in Letter and A4. PDF checks 63/63 and seven rendered pages were visually inspected.
- [已核实] Build/release: webpack production build completed 202 static outputs and local sitemap has 197 public routes. Current production remains a different version: its sitemap has 173 URLs; the three existing Scales pages sampled 200, while sampled new D major/arpeggios/guide URLs returned 404.

Implementation state: **LOCAL_DELIVERY_COMPLETE** within the explicitly displayed notes-only/fingering limits. **CORE_USER_READY: NOT_DETERMINED** because the concentrated human checks are NOT_RUN and the candidate is not deployed. **PRODUCT/SEO_VALIDATED: NOT_RUN**.

## Preserved limits

- [已核实] Source authoring records retain \`ready_for_publish: false\` / \`planning_only\`; local candidate registry and production status are reported separately.
- [已核实] A natural-minor descending fingering already present on latest main keeps its explicit source/register adaptation and \`teacher_reviewed: false\`. The provided supplement was not imported because both register fields are null.
- [已核实] Missing exact fingering evidence stays \`null\`/notes-only. Nothing was generalized to two octaves, hands together, or unapproved tonic/form URL combinations.
- [已核实] Events remain a local browser event channel; no analytics vendor or personal-data collection was added.

See \`ROUTES_TASKS_AND_GAPS.json\`, \`MANUAL_AND_RELEASE_GATE.md\`, and \`EVIDENCE/\` for exact status and results.`);

write('AUTHORING_CONTRACT.md', `# Implemented Scales authoring contract

Contract version: \`${bundle.contract_version}\`.

## Actual flow

\`CURRENT_INPUTS/candidate/current-authoring-bundle.json\` (27 complete pages + 74 source dependencies)
→ \`SOURCE_CHANGES/files/scripts/scale-authoring-contract.mjs\` (shared CLI/server invariant implementation)
→ \`scale-authoring.ts\` plus \`scale-completion-types.ts\`
→ \`scale-content.ts\` / \`scale-completion-content.ts\` adapters
→ typed \`ScaleOption\` / page models
→ route pages, keyboard/staff, Web Audio, quiz/practice and print/PDF outputs.

The maintainable inputs are the page/source records and the approved English guide/resource files in \`CURRENT_INPUTS\`. Rendered React props are derived outputs, not the authoring source. Raw T12/T13/T14/T22 records stay in their native JSON shape; the guide source stays Markdown; JSX and functions stay TypeScript/TSX. No JSON stringify conversion is used to erase functions or undefined values.

## Invariants and fields consumed

- Identity: approved URL allowlist, template discriminator, tonic, scale/form type, canonical path, title/description and original content blocks.
- Pitch: written spelling/step/alter/written octave, strict ordered MIDI, calculated key color, actual ascent/descent, range and endpoint. C-flat and double accidentals are preserved as written identities even when a physical key is enharmonic.
- Structure: major definition, natural/harmonic/classical-melodic form semantics, variable 5/6/7/12-note family sequences, and four-event one-way/seven-event round-trip arpeggios.
- Fingering: only source-scoped non-null rows for the exact form, hand, direction and one-octave register. \`null\` means no supported row; it never inherits the previous selection.
- Provenance/content: nested source closure, source locator/supports, source groups, original blocks, FAQ/relations/resources/issues and metadata.
- Outputs: staff/keyboard derive from ordered written pitches; synthesized audio has no bundled audio file requirement; browser print is current-selection output; fixed PDFs list exact coverage.

## Error behavior

Import and server rendering reject unknown URLs, duplicate/missing blocks, unknown nested sources, non-HTTPS/incomplete source rows, inconsistent spelling/MIDI/key color, wrong order/length/endpoints, scale-definition pollution, and unscoped non-null fingerings. Optional resources and fingerings remain null; they are not default-filled.

## Compatibility

The exporter includes only the 27 approved pages plus dependency closure. Import dry-run reports 100 preserved non-Scales pages and no semantic write for the current bundle. The original 23-page raw snapshot and conversion evidence are preserved under \`CURRENT_INPUTS\`; it is not passed directly to the importer.`);

write('COMMANDS.md', `# Commands

Run from the repository root with the existing installed dependencies.

\`node scripts/export-scale-authoring.mjs --output checks/scales-completion/current-authoring-bundle.json\`

\`node scripts/scale-authoring-contract.mjs --input checks/scales-completion/current-authoring-bundle.json\`

\`node scripts/import-scale-authoring.mjs --input checks/scales-completion/current-authoring-bundle.json --preview checks/scales-completion/import-dry-run.json\`

Only after reviewing the preview and resolving parallel ownership: \`node scripts/import-scale-authoring.mjs --input checks/scales-completion/current-authoring-bundle.json --preview checks/scales-completion/import-write-report.json --write\`. This command is documented but was not needed in this run because dry-run hashes were identical.

Validation used: \`npm run check\`; \`node scripts/check-scale-completion-contract.mjs\`; \`node --experimental-strip-types scripts/check-scale-final.mjs\`; \`node scripts/check-scale-batch.mjs\`; \`node scripts/check-scale-fallbacks.mjs\`; \`node scripts/check-scale-events.mjs\`; and the bundled Python runtime with \`scripts/check-scale-completion-pdfs.py\`.

Build/start: a normal checkout may use \`npm run build\`. This isolated worktree reused dependencies through a directory junction, which Turbopack rejects, so the verified candidate command was \`npx next build --webpack\`. Preview with \`npx next start -p 3100\`, then use \`http://localhost:3100\` on this computer only. The address is not accessible to ChatGPT or a phone without an authorized network setup.

Rollback/merge: review \`SOURCE_CHANGES/tracked-text-changes.patch\` and the full copied files. Revert or omit only the listed Scales candidate fields/files through a field-level change; do not reset/clean/stash a dirty shared worktree. The 24 newly proposed production routes and six new PDFs are the main deployment rollback surface.`);

write('MANUAL_AND_RELEASE_GATE.md', `# Manual and release gate

No manual item below was represented as passed.

| Task | Candidate selection | Status | Pass record |
| --- | --- | --- | --- |
| iPhone Safari | C major; A classical melodic minor descending; C-flat or A-sharp example | NOT_RUN | Record device/OS, route, selection, overflow/readability result |
| Listen/stop/background | Play; count-in stop; form change; lock/background; return | NOT_RUN | Confirm only selected notes and no old timer/audio restart |
| Screen reader | Default answer; settings; one quiz; feedback | NOT_RUN | Record reader/browser and focus/name/feedback result |
| Native print cancel | Start practice, open print, cancel, wait beyond one loop | NOT_RUN | Confirm no resumed sound and correct title/hand/direction |
| Physical print | C-major two-hand plus accidental/bass-clef atlas page | NOT_RUN | Record printer/paper and clipping/clef/finger/accidental readability |
| Unassisted user task | Find D major; classical descent; answer one quiz; download right PDF | NOT_RUN | Record completion and exact sticking point |

## Release state

- [已核实] Commit/push/deploy authorization was not supplied; none occurred.
- [已核实] Local candidate: 27/27 route HTTP 200 with initial HTML; proposed sitemap count 197.
- [已核实] Production evidence on 2026-09-14: sitemap 173; existing Scales center/C/A sampled 200; D major, arpeggios and new guide sampled 404. Other new routes were not directly fetched.
- [推断] Deploying this candidate would expose 24 additional production URLs and six new PDF assets at once. Review route inventory, canonical/sitemap delta, human gates and rollback owner before authorization.
- [已核实] No public tunnel, DNS change, search-platform submission, canonical-origin change or analytics service was created.

Suggested result format: \`date | candidate HEAD | device/browser/printer | route + exact selection | PASS/FAIL | observed evidence | owner/next action\`.`);

function walk(dir) {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const path = join(dir, entry.name);
    return entry.isDirectory() ? walk(path) : [path];
  });
}
const manifestFiles = walk(out).filter((path) => relative(out, path).replaceAll('\\', '/') !== 'manifest.json').sort();
const manifest = {
  artifact: name,
  generated_at: generatedAt,
  repository_head: head,
  repository_dirty: Boolean(status.trim()),
  contract_version: bundle.contract_version,
  file_count: manifestFiles.length,
  excluded: ['.env and secrets', '.git', 'node_modules', '.next/build caches', 'font files', 'cookies/tokens', 'personal documents outside the supplied plan pack'],
  files: manifestFiles.map((path) => {
    const rel = relative(out, path).replaceAll('\\', '/');
    const bytes = readFileSync(path);
    return { path: rel, bytes: statSync(path).size, sha256: createHash('sha256').update(bytes).digest('hex') };
  }),
};
json('manifest.json', manifest);
console.log(JSON.stringify({ output: out, files: manifest.file_count, head }, null, 2));
