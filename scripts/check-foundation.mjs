/** Dependency-free Foundation guard. No routes, preview pages, or components are generated. */
import { readFile, readdir, access, mkdir, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { createHash } from 'node:crypto';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const results = [];
const warnings = [];
const read = (p) => readFile(join(root, p), 'utf8');
const exists = async (p) => { try { await access(join(root, p)); return true; } catch { return false; } };
const check = (name, ok, detail = '') => results.push({ name, passed: Boolean(ok), detail });
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const e of entries) {
    const p = join(dir, e.name);
    files.push(...(e.isDirectory() ? await walk(p) : [p]));
  }
  return files;
}
try {
  const pkg = JSON.parse(await read('package.json'));
  const config = JSON.parse(await read('components.json'));
  const ts = JSON.parse(await read('tsconfig.json'));
  const globals = await read('src/app/globals.css');
  const tokens = await read('src/styles/tokens.css');
  const foundation = await read('src/styles/foundation.css');
  const pageCSS = await read('src/app/chords/a-minor/a-minor.css') + await read('src/components/chords/shared.css') + await read('src/components/chords/center.css') + await read('src/components/keyboard-notes/keyboard-notes.css') + await read('src/components/scales/scales.css') + await read('src/components/songs/songs.css') + await read('src/components/guides/guides.css') + await read('src/components/blank-sheet/blank-sheet.css') + await read('src/components/integration/integration.css') + await read('src/components/ui/breadcrumb.css') + await read('src/components/ui/site-brand.css');
  const util = await read('src/lib/utils.ts');
  const breadcrumb = await read('src/components/ui/breadcrumb.tsx');
  const siteBrand = await read('src/components/ui/site-brand.tsx');
  const layout = await read('src/app/layout.tsx');
  const tokenManifest = JSON.parse(await read('docs/design/tokens.json'));
  const sourceManifest = JSON.parse(await read('docs/design/source-manifest.json'));
  const stripComments = (s) => s.replace(/\/\*[\s\S]*?\*\//g, '');
  const css = stripComments(globals + '\n' + tokens + '\n' + foundation + '\n' + pageCSS);
  const declarations = new Set([...css.matchAll(/(--[\w-]+)\s*:/g)].map(m => m[1]));
  const refs = new Set([...css.matchAll(/var\(\s*(--[\w-]+)/g)].map(m => m[1]));
  // A declared name can still be invalid through a self/mutual reference.
  const edges = new Map();
  for (const m of css.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
    const dependencies = edges.get(m[1]) || new Set();
    for (const ref of m[2].matchAll(/var\(\s*(--[\w-]+)/g)) dependencies.add(ref[1]);
    edges.set(m[1], dependencies);
  }
  const visiting = new Set(), visited = new Set();
  function acyclic(name) {
    if (visiting.has(name)) return false;
    if (visited.has(name)) return true;
    visiting.add(name);
    for (const dependency of edges.get(name) || []) if (!acyclic(dependency)) return false;
    visiting.delete(name); visited.add(name); return true;
  }
  check('No CSS variable cycles', [...edges.keys()].every(acyclic));
  check('Full colors are not HSL-wrapped', !/hsl\(\s*var\(/i.test(css));
  const normalize = value => value.replace(/\s+/g, '').toLowerCase();
  for (const variable of refs) check(`CSS variable resolves: ${variable}`, declarations.has(variable));
  for (const token of tokenManifest.tokens) {
    const escaped = token.name.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
    const m = stripComments(tokens).match(new RegExp(escaped + '\\s*:\\s*([^;]+);'));
    check(`Manifest token: ${token.name}`, Boolean(m), m ? m[1].trim() : 'missing');
    check(`Manifest value: ${token.name}`, Boolean(m) && normalize(m[1]) === normalize(token.value), `expected ${token.value}; actual ${m?.[1]?.trim()}`);
    for (const [field, threshold] of [['at_min_48rem', 'min-width: 48rem'], ['at_max_22rem', 'max-width: 22rem']]) {
      if (!(field in token)) continue;
      const block = stripComments(tokens).split(`@media (${threshold})`)[1]?.match(/:root\s*\{([^}]+)\}/)?.[1] || '';
      const responsive = block.match(new RegExp(escaped + '\\s*:\\s*([^;]+);'));
      // Unchanged responsive values correctly inherit the root declaration.
      const effective = responsive?.[1] ?? m?.[1];
      check(`Manifest ${field}: ${token.name}`, effective !== undefined && normalize(effective) === normalize(token[field]));
    }
  }
  check('Tailwind v4 selected', pkg.devDependencies.tailwindcss === '4.3.3');
  check('Matching v4 PostCSS', pkg.devDependencies['@tailwindcss/postcss'] === pkg.devDependencies.tailwindcss);
  check('React and React DOM match', pkg.dependencies.react === pkg.dependencies['react-dom']);
  check('Real v4 PostCSS entry', (await read('postcss.config.mjs')).includes('"@tailwindcss/postcss"'));
  check('Tailwind import and src-only scanning', globals.includes('@import "tailwindcss" source("../");'));
  check('Inline semantic theme mapping', globals.includes('@theme inline'));
  check('Primary semantic mapping', globals.includes('--color-primary: var(--primary)'));
  check('No Tailwind v3 config', !(await exists('tailwind.config.ts')) && !(await exists('tailwind.config.js')));
  check('No legacy Tailwind directives', !/@tailwind\s+(base|components|utilities)/.test(css));
  check('shadcn CSS path', config.tailwind.css === 'src/app/globals.css');
  check('shadcn config blank for v4', config.tailwind.config === '');
  check('shadcn semantic colors', config.tailwind.cssVariables === true);
  check('shadcn aliases', config.aliases.utils === '@/lib/utils' && config.aliases.ui === '@/components/ui');
  check('TypeScript source alias', ts.compilerOptions.paths['@/*'][0] === './src/*');
  check('Root layout imports globals', layout.includes('import "./globals.css"'));
  check('Root layout: no business chrome', !/<(Header|Piano|Chord|Footer)/.test(layout));
  check('Root layout: no external font', !/next\/font/.test(layout));
  check('cn registers custom text sizes', util.includes('extendTailwindMerge') && util.includes('"pr-body"'));
  check('Shared breadcrumb uses Next Link', breadcrumb.includes("from 'next/link'") && breadcrumb.includes('data-slot="breadcrumb-link"'));
  check('Shared breadcrumb current-page semantics', breadcrumb.includes('aria-current="page"') && breadcrumb.includes('aria-disabled="true"'));
  check('Shared site brand uses Next Link', siteBrand.includes("from 'next/link'") && siteBrand.includes('data-slot="site-brand"'));
  check('Shared site brand owns piano mark and visible name', siteBrand.includes('data-slot="site-brand-mark"') && siteBrand.includes('<span>{SITE_NAME}</span>'));
  check('Visible focus', foundation.includes(':focus-visible') && foundation.includes('var(--pr-focus-width)'));
  check('Reduced motion', css.includes('prefers-reduced-motion') && css.includes('--pr-duration-fast: 0ms'));
  check('Forced colors focus', css.includes('forced-colors') && css.includes('Highlight'));
  check('No hidden main on print', !/main\s*\{[^}]*display\s*:\s*none/.test(css));
  check('No dark palette', !/\.dark\s*\{/.test(stripComments(tokens)));
  check('No global animation dependency', !Object.keys({...pkg.dependencies,...pkg.devDependencies}).some(n => /framer-motion|^motion$|^gsap$|tw-animate-css/.test(n)));
  const srcFiles = (await walk(join(root,'src'))).map(p=>relative(root,p).replaceAll('\\','/'));
  const allowedComponents = ['experience.tsx', 'keyboard.tsx', 'icon.tsx', 'page-search.tsx'].map(p => `src/components/a-minor/${p}`);
  allowedComponents.push(...['site-chrome','playback-controls','detail-page','keyboard-viewport','print-voicing','center-page','center-experience'].map(n=>`src/components/chords/${n}.tsx`));
  allowedComponents.push('src/components/chords/shared.css','src/components/chords/center.css');
  allowedComponents.push(...['pages.tsx','keyboard-diagram.tsx','lookup-experience.tsx','labeled-experience.tsx','chart-experience.tsx','staff-diagram.tsx','tool-controls.tsx','use-note-audio.ts','keyboard-notes.css'].map(n=>`src/components/keyboard-notes/${n}`));
  allowedComponents.push(...['pages.tsx','center-experience.tsx','detail-experience.tsx','scale-reference.tsx','use-scale-audio.ts','scales.css'].map(n=>`src/components/scales/${n}`));
  allowedComponents.push(...['pages.tsx','center-experience.tsx','easy-experience.tsx','resource-card.tsx','songs.css'].map(n=>`src/components/songs/${n}`));
  allowedComponents.push('src/components/guides/pages.tsx','src/components/guides/guides.css');
  allowedComponents.push('src/components/blank-sheet/pages.tsx','src/components/blank-sheet/blank-sheet-tool.tsx','src/components/blank-sheet/blank-sheet.css');
  allowedComponents.push('src/components/integration/pages.tsx','src/components/integration/home-experience.tsx','src/components/integration/home-visuals.tsx','src/components/integration/integration.css','src/components/integration/home-color-repair.css','src/components/integration/home-hero-background.css');
  allowedComponents.push('src/components/site-navigation.tsx','src/components/site-navigation.css');
  allowedComponents.push('src/components/ui/breadcrumb.tsx','src/components/ui/breadcrumb.css','src/components/ui/site-brand.tsx','src/components/ui/site-brand.css');
  const allowedPages=['src/app/page.tsx','src/app/tools/page.tsx','src/app/chords/page.tsx',...['a-minor','a-major','c-major'].map(n=>`src/app/chords/${n}/page.tsx`)];
  allowedPages.push('src/app/keyboard-notes/page.tsx','src/app/keyboard-notes/labeled/page.tsx','src/app/keyboard-notes/chart/page.tsx');
  allowedPages.push('src/app/scales/page.tsx','src/app/scales/c-major/page.tsx','src/app/scales/a-minor/page.tsx');
  allowedPages.push('src/app/songs/page.tsx','src/app/songs/easy/page.tsx');
  allowedPages.push('src/app/guide/page.tsx','src/app/guide/read-sheet-music/page.tsx');
  allowedPages.push('src/app/tools/blank-sheet-music/page.tsx');
  check('Only seventeen authorized routes', JSON.stringify(srcFiles.filter(p => /\/(page|route|not-found)\.[mc]?[jt]sx?$/.test(p)).sort()) === JSON.stringify([...allowedPages].sort()));
  check('Only authorized layout/page/component TSX', srcFiles.filter(p=>p.endsWith('.tsx')).every(p => ['src/app/layout.tsx', ...allowedPages, ...allowedComponents].includes(p)));
  check('Only necessary authorized chord components', srcFiles.filter(p => p.startsWith('src/components/') && !p.endsWith('.gitkeep')).every(p => allowedComponents.includes(p)));
  check('Next does not rewrite agent rules', (await read('next.config.ts')).includes('agentRules: false'));
  const publicFiles = await exists('public') ? (await walk(join(root,'public'))).map(p=>relative(root,p).replaceAll('\\','/')) : [];
  check('Only authorized static assets', publicFiles.every(p => ['public/assets/home/east-lake-grand-piano.webp','public/assets/home/east-lake-piano-hero.png','public/assets/chords/a-minor-notes-inversions.pdf','public/assets/guides/piano-starter-and-reading.pdf','public/reference/assets/chord-a-major.pdf','public/reference/assets/chord-c-major.pdf','public/reference/assets/blank-piano-staff-letter.pdf','public/reference/assets/blank-piano-staff-a4.pdf','public/reference/assets/blank-piano-staff-preview.svg','public/reference/preserved-chords/assets/piano-chord-chart-selected.pdf', ...[88,61].flatMap(n=>['octaves','letters'].map(m=>`public/reference/generated/keyboard-notes/labeled-${n}-${m}.pdf`))].includes(p)));
  for (const source of sourceManifest.sources) {
    const b = await readFile(join(root,source.path));
    check(`Source unchanged: ${source.path}`, createHash('sha256').update(b).digest('hex')===source.sha256);
  }
  const planPath = 'docs/product/Piano_全站统一规划_最终版.md';
  if (await exists(planPath)) {
    const content = JSON.parse(await read('docs/content/chords/page-content.json'));
    const baseline = content.baseline.files.find(file => file.name.startsWith('Piano_全站统一规划_最终版'));
    const hash = createHash('sha256').update(await readFile(join(root, planPath))).digest('hex');
    check('Planning Markdown matches content baseline hash', baseline && hash === baseline.sha256, hash);
    if (sourceManifest.missing_sources.includes(planPath)) warnings.push('source-manifest 的规划 Markdown 缺失记录已过时；当前文件存在且已对照内容包基线哈希验证，详见 local-validation.md。');
  }
  if (!(await exists('docs/product/Piano_全站统一规划_最终版.md'))) warnings.push('原全站规划 Markdown 未随包提供；放入 docs/product/。不阻止 Foundation，业务阶段前需补齐。');
  if (!(await exists('package-lock.json'))) warnings.push('尚无实际 npm 锁文件；首次 npm install 后生成并提交，以后使用 npm ci。');
  const report={stage:'design-foundation',executed_at:new Date().toISOString(),runtime:process.version,passed:results.filter(x=>x.passed).length,failed:results.filter(x=>!x.passed).length,warnings,results,not_covered:['npm dependency installation','Next build','Tailwind compilation','real component interaction','full accessibility compliance']};
  report.stage = '07-site-integration';
  await mkdir(join(root,'checks/batches/07-site-integration'),{recursive:true});
  await writeFile(join(root,'checks/batches/07-site-integration/foundation.json'),JSON.stringify(report,null,2)+'\n');
  console.log(`Foundation: ${report.passed} passed, ${report.failed} failed.`);
  for (const w of warnings) console.warn(`NOTE: ${w}`);
  for (const r of results.filter(x=>!x.passed)) console.error(`FAIL: ${r.name} ${r.detail}`);
  process.exitCode=report.failed?1:0;
} catch(e) {console.error(e instanceof Error ? e.message : e);process.exitCode=1;}
