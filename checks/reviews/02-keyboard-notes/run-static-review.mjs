import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { mkdir, readFile, readdir, stat, writeFile } from 'node:fs/promises';
import { dirname, join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../..');
const out = join(here, 'machine');
const results = [];

const check = (name, passed, detail = '') => {
  results.push({ name, passed: Boolean(passed), detail });
};
const read = async (path, encoding = 'utf8') => readFile(join(root, path), encoding);
const json = async (path) => JSON.parse(await read(path));
const hash = (buffer) => createHash('sha256').update(buffer).digest('hex');
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

async function walk(path) {
  const base = join(root, path);
  const entries = await readdir(base, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const child = join(base, entry.name);
    if (entry.isDirectory()) files.push(...await walk(relative(root, child)));
    else files.push(relative(root, child).replaceAll('\\', '/'));
  }
  return files;
}

function noteToMidi(note) {
  const match = note.match(/^([A-G])([#b]?)(-?\d+)$/);
  if (!match) return NaN;
  const pitch = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[match[1]];
  const accidental = match[2] === '#' ? 1 : match[2] === 'b' ? -1 : 0;
  return 12 * (Number(match[3]) + 1) + pitch + accidental;
}

function staffStep(note, clef) {
  const match = note.match(/^([A-G])([#b]?)(-?\d+)$/);
  if (!match) return NaN;
  const letter = { C: 0, D: 1, E: 2, F: 3, G: 4, A: 5, B: 6 }[match[1]];
  const index = Number(match[3]) * 7 + letter;
  return index - (clef === 'treble' ? 30 : 18); // E4 and G2 are the bottom lines.
}

function ledgerLines(step) {
  const lines = [];
  if (step <= -2) for (let line = -2; line >= step; line -= 2) lines.push(line);
  if (step >= 10) for (let line = 10; line <= step; line += 2) lines.push(line);
  return lines;
}

try {
  const master = await json('docs/content/site-master/page-content.master.json');
  const plan = await json('docs/product/url-plan.final.json');
  const contentMap = await json('docs/content/content-source-map.json');
  const assetMap = await json('docs/content/asset-map.json');
  const coverage = await json('checks/batches/02-keyboard-notes/coverage.json');
  const implementationSnapshot = await json('checks/batches/02-keyboard-notes/source-after.json');
  const urls = ['/keyboard-notes', '/keyboard-notes/labeled', '/keyboard-notes/chart'];
  const templates = ['T03', 'T04', 'T05'];

  check('Master schema is 3.0.0', master.schema_version === '3.0.0', master.schema_version);
  check('Product plan retains 127 URLs', plan.pages.length === 127, plan.pages.length);
  check('Content master retains 127 URLs', Object.keys(master.pages).length === 127, Object.keys(master.pages).length);

  for (const [index, url] of urls.entries()) {
    const page = master.pages[url];
    const planned = plan.pages.find((item) => item.url === url);
    check(`${url}: page exists`, Boolean(page));
    check(`${url}: template matches ${templates[index]}`, page?.template_id === templates[index], page?.template_id);
    check(`${url}: plan template matches`, planned?.template_id === templates[index], planned?.template_id);
    check(`${url}: source groups match plan`, same(page?.source_groups.map((g) => g.id), planned?.source_groups.map((g) => g.id)));
    check(`${url}: metadata title matches page`, page?.metadata.title === page?.title);
    check(`${url}: canonical path matches`, page?.metadata.canonical_path === url, page?.metadata.canonical_path);
    check(`${url}: remains unpublished`, page?.ready_for_publish === false && page?.deployment_status === 'planning_only');
  }

  for (const url of ['/keyboard-notes', '/keyboard-notes/labeled']) {
    const layouts = master.pages[url].data.layouts;
    check(`${url}: only verified 88/61 layouts`, same(layouts.map((layout) => layout.layout_id), ['88-key-A0-C8', '61-key-C2-C7']));
    for (const layout of layouts) {
      const expected = layout.key_count === 88
        ? { first: 21, last: 108, white: 52, black: 36, low: 'A0', high: 'C8' }
        : { first: 36, last: 96, white: 36, black: 25, low: 'C2', high: 'C7' };
      check(`${url}/${layout.layout_id}: exact key count`, layout.keys.length === layout.key_count, layout.keys.length);
      check(`${url}/${layout.layout_id}: endpoints`, layout.keys[0].midi === expected.first && layout.keys.at(-1).midi === expected.last);
      check(`${url}/${layout.layout_id}: endpoint labels`, layout.lowest_note === expected.low && layout.highest_note === expected.high);
      check(`${url}/${layout.layout_id}: contiguous MIDI`, layout.keys.every((key, i) => key.midi === expected.first + i));
      check(`${url}/${layout.layout_id}: unique key IDs`, new Set(layout.keys.map((key) => key.key_id)).size === layout.keys.length);
      check(`${url}/${layout.layout_id}: white count`, layout.keys.filter((key) => key.color === 'white').length === expected.white);
      check(`${url}/${layout.layout_id}: black count`, layout.keys.filter((key) => key.color === 'black').length === expected.black);
      check(`${url}/${layout.layout_id}: declared counts`, layout.white_key_count === expected.white && layout.black_key_count === expected.black);
      check(`${url}/${layout.layout_id}: color follows pitch class`, layout.keys.every((key) => [0, 2, 4, 5, 7, 9, 11].includes(key.midi % 12) === (key.color === 'white')));
      check(`${url}/${layout.layout_id}: lookup spellings resolve to the same pitch`, layout.keys.every((key) => key.lookup_spellings.every((name) => noteToMidi(name) === key.midi)));
      const covered = layout.reading_segments.flatMap((segment) => layout.keys.filter((key) => key.midi >= segment.midi_range[0] && key.midi <= segment.midi_range[1]).map((key) => key.midi));
      check(`${url}/${layout.layout_id}: reading segments cover each key once`, covered.length === layout.keys.length && new Set(covered).size === layout.keys.length);
    }
  }

  const lookupKeys = master.pages['/keyboard-notes'].data.layouts[0].keys;
  check('B#3 resolves to middle C without respelling', lookupKeys.find((key) => key.midi === 60)?.lookup_spellings.includes('B#3'));
  check('Cb4 resolves to B3 without respelling', lookupKeys.find((key) => key.midi === 59)?.lookup_spellings.includes('Cb4'));
  check('Ambiguous queries require octave choice', master.pages['/keyboard-notes'].data.query_rules.no_octave_provided === 'show choices; selected_note remains null');
  check('Autoplay is disabled by source default', master.pages['/keyboard-notes'].data.default_state.autoplay === false);

  const chart = master.pages['/keyboard-notes/chart'].data;
  check('Chart contains all 88 physical pitches', chart.keyboard_notes.length === 88);
  check('Chart MIDI range is A0-C8 and contiguous', chart.keyboard_notes.every((key, i) => key.midi === 21 + i));
  check('Chart default is middle C', chart.default_linked_example.selected_note === 'C4' && chart.default_linked_example.selected_midi === 60);
  check('Chart has explicit treble and bass views', same(Object.keys(chart.core_views), ['treble', 'bass']));
  check('61-key chart preset remains deferred', chart.range_modes.find((range) => range.id === '61_keys')?.first_release_scope === '后续同页补齐');
  check('Solfege remains disabled', chart.solfege.enabled === false);
  for (const key of chart.keyboard_notes) {
    check(`chart MIDI ${key.midi}: key color`, [0, 2, 4, 5, 7, 9, 11].includes(key.midi % 12) === (key.color === 'white'));
    check(`chart MIDI ${key.midi}: has spelling`, key.staff_spellings.length > 0);
    for (const spelling of key.staff_spellings) {
      check(`${spelling.name}: name resolves to MIDI`, noteToMidi(spelling.name) === key.midi, key.midi);
      for (const clef of ['treble', 'bass']) {
        const note = spelling[clef];
        check(`${spelling.name}/${clef}: pitch and clef`, note.note === spelling.name && note.midi === key.midi && note.clef === clef);
        check(`${spelling.name}/${clef}: staff coordinate`, note.staff_step_from_bottom_line === staffStep(note.note, clef), note.staff_step_from_bottom_line);
        check(`${spelling.name}/${clef}: ledger lines`, same(note.ledger_line_steps, ledgerLines(note.staff_step_from_bottom_line)), note.ledger_line_steps.join(','));
      }
    }
  }

  const expectedGroups = urls.flatMap((url) => master.pages[url].source_groups.map((group) => `${url}:${group.id}`)).sort();
  check('Coverage contains 26 source groups', coverage.length === 26, coverage.length);
  check('Coverage matches the current three pages', same(coverage.map((item) => `${item.url}:${item.source_group}`).sort(), expectedGroups));
  check('Coverage does not mark reserved source tasks complete', coverage.every((item) => !['BN-U069-SOLFEGE', 'BN-U069-RANGE', 'BK-STICKER-FIT', 'BK-OTHER-NUMBERS'].includes(item.source_group)));

  const routes = (await walk('src/app')).filter((path) => /\/(page|route|not-found)\.[mc]?[jt]sx?$/.test(path)).sort();
  const allowedRoutes = [
    'src/app/chords/a-major/page.tsx',
    'src/app/chords/a-minor/page.tsx',
    'src/app/chords/c-major/page.tsx',
    'src/app/chords/page.tsx',
    'src/app/keyboard-notes/chart/page.tsx',
    'src/app/keyboard-notes/labeled/page.tsx',
    'src/app/keyboard-notes/page.tsx',
  ].sort();
  check('Only seven authorized business routes exist', same(routes, allowedRoutes), routes.join(', '));
  check('No dynamic route exists', routes.every((path) => !path.includes('[')));

  const pagesSource = await read('src/components/keyboard-notes/pages.tsx');
  check('Three distinct page templates are exported', ['KeyboardLookupPage', 'LabeledKeyboardPage', 'KeyboardChartPage'].every((name) => pagesSource.includes(`function ${name}`)));
  check('Site chrome is actually imported', pagesSource.includes("from '../chords/site-chrome'"));
  const keyboardSource = await read('src/components/keyboard-notes/keyboard-diagram.tsx');
  const oldKeyboardSource = await read('src/components/a-minor/keyboard.tsx');
  check('New keyboard imports shared geometry', keyboardSource.includes("from '@/lib/keyboard-geometry'"));
  check('A minor keyboard imports shared geometry', oldKeyboardSource.includes("from '@/lib/keyboard-geometry'"));
  const clientSources = await Promise.all((await walk('src/components/keyboard-notes')).filter((path) => path.endsWith('.tsx') || path.endsWith('.ts')).map((path) => read(path)));
  check('Client components do not read the master or filesystem', clientSources.every((source) => !/page-content\.master|node:fs|readAuthorizedPage/.test(source)));

  const publicFiles = await walk('public');
  check('No internal Markdown/JSON/HTML is public', publicFiles.every((path) => !/\.(md|json|html)$/i.test(path)));
  const generated = assetMap.generated_keyboard_notes;
  check('Asset map has four keyboard PDFs', generated.length === 4, generated.length);
  for (const asset of generated) {
    const bytes = await readFile(join(root, asset.output_path));
    check(`${asset.output_path}: hash matches asset map`, hash(bytes) === asset.sha256, hash(bytes));
    check(`${asset.output_path}: byte count matches asset map`, bytes.length === asset.bytes, bytes.length);
    check(`${asset.output_path}: declared generated provenance`, asset.provenance.includes('derived from supplied key arrays'));
  }

  const manifest = await json('docs/design/source-manifest.json');
  for (const source of manifest.sources) {
    const bytes = await readFile(join(root, source.path));
    check(`Read-only design source unchanged: ${source.path}`, hash(bytes) === source.sha256);
  }

  const changedSinceImplementation = [];
  for (const item of implementationSnapshot) {
    try {
      const bytes = await readFile(join(root, item.path));
      if (hash(bytes) !== item.sha256) changedSinceImplementation.push(item.path);
    } catch {
      changedSinceImplementation.push(item.path);
    }
  }
  check('Current reviewed files match the 02 implementation handoff snapshot', changedSinceImplementation.length === 0, changedSinceImplementation.join(', '));

  const contentPages = Array.isArray(contentMap) ? contentMap : contentMap.pages;
  for (const url of urls) {
    const record = Array.isArray(contentPages) ? contentPages.find((item) => item.url === url) : contentPages?.[url];
    check(`${url}: content source map entry exists`, Boolean(record));
  }

  const tracked = [
    ...await walk('src'),
    ...await walk('public/reference/generated/keyboard-notes'),
    'docs/content/asset-map.json',
    'docs/content/content-source-map.json',
    'docs/design/component-spec.md',
    'docs/design/template-map.md',
    'package.json',
    'package-lock.json',
    'next.config.ts',
    'tsconfig.json',
  ].sort();
  const sourceHashes = [];
  for (const path of tracked) {
    const bytes = await readFile(join(root, path));
    sourceHashes.push({ path, bytes: bytes.length, sha256: hash(bytes) });
  }

  let git = {};
  try {
    git = {
      root: execFileSync('git', ['rev-parse', '--show-toplevel'], { cwd: root, encoding: 'utf8' }).trim(),
      head: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(),
      status: execFileSync('git', ['status', '--short'], { cwd: root, encoding: 'utf8' }).trim().split(/\r?\n/).filter(Boolean),
    };
  } catch (error) {
    git = { error: String(error) };
  }

  await mkdir(out, { recursive: true });
  const report = {
    executed_at: new Date().toISOString(),
    runtime: process.version,
    passed: results.filter((item) => item.passed).length,
    failed: results.filter((item) => !item.passed).length,
    results,
  };
  await writeFile(join(out, 'static-data-validation.json'), JSON.stringify(report, null, 2) + '\n');
  await writeFile(join(out, 'source-hashes.json'), JSON.stringify({ executed_at: report.executed_at, git, files: sourceHashes }, null, 2) + '\n');
  console.log(`Static/data review: ${report.passed} passed, ${report.failed} failed.`);
  for (const failure of results.filter((item) => !item.passed)) console.error(`FAIL: ${failure.name} ${failure.detail}`);
  process.exitCode = report.failed ? 1 : 0;
} catch (error) {
  await mkdir(out, { recursive: true });
  const message = error instanceof Error ? error.stack ?? error.message : String(error);
  await writeFile(join(out, 'static-data-validation.json'), JSON.stringify({ executed_at: new Date().toISOString(), passed: 0, failed: 1, error: message }, null, 2) + '\n');
  console.error(message);
  process.exitCode = 1;
}
