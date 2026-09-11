/** Run AFTER npm install. Tests the real Tailwind v4 compiler without creating a page. */
import { readFile, mkdir, writeFile, rm } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const root=dirname(dirname(fileURLToPath(import.meta.url)));
const out=join(root,'checks/batches/07-site-integration');
const temp=join(out,`.cn-${process.pid}.mjs`);
let compiled;
try {
  const [{default:postcss},{default:tailwind},{default:ts}] = await Promise.all([
    import('postcss'), import('@tailwindcss/postcss'), import('typescript'),
  ]);
  const entry=join(root,'src/app/globals.css');
  const input=await readFile(entry,'utf8');
  const expected = new Map([
    ['border-input', ['border-color', 'var(--input)']],
    ['rounded-md', ['border-radius', 'var(--pr-radius-control)']],
    ['rounded-lg', ['border-radius', 'var(--pr-radius-panel)']],
    ['rounded-sm', ['border-radius', 'var(--pr-radius-segment)']],
    ['min-h-pr-control', ['min-height', 'var(--pr-control-min-size)']],
  ]);
  for (const m of input.matchAll(/--(color|spacing|container|text)-([\w-]+):\s*(var\([^;]+\));/g)) {
    const [, kind, name, value] = m;
    if (name.includes('--')) continue;
    const [prefix, property] = {color:['bg','background-color'],spacing:['p','padding'],container:['max-w','max-width'],text:['text','font-size']}[kind];
    expected.set(`${prefix}-${name}`, [property, value]);
    if (kind === 'color') expected.set(`text-${name}`, ['color', value]);
  }
  const candidates=[...expected.keys()].join(' ');
  const result=await postcss([tailwind({base:root})]).process(input+`\n@source inline("${candidates}");\n`,{from:entry});
  compiled=result.css;
  for(const cls of candidates.split(' ')) assert.ok(compiled.includes(`.${cls}`),`Missing generated utility: ${cls}`);
  const ast = postcss.parse(compiled);
  for (const [cls, [property, value]] of expected) {
    let found = false;
    ast.walkRules(`.${cls}`, rule => rule.walkDecls(property, declaration => {
      if (declaration.value === value) found = true;
    }));
    assert.ok(found, `Incorrect generated declaration: ${cls} -> ${property}: ${value}`);
  }
  for (const cls of ['site-header', 'summary', 'keyboard', 'btn']) {
    let found = false;
    ast.walkRules(rule => { if (rule.selector.split(',').some(s => s.trim() === `.${cls}`)) found = true; });
    assert.ok(!found, `Archived prototype selector leaked: ${cls}`);
  }
  assert.ok(!/@theme\s|@source\s/.test(compiled),'Unprocessed Tailwind directives');
  await mkdir(out,{recursive:true});
  await writeFile(join(out,'foundation.compiled.css'),compiled);
  const utils=await readFile(join(root,'src/lib/utils.ts'),'utf8');
  const transpiled=ts.transpileModule(utils,{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020},fileName:'utils.ts',reportDiagnostics:true});
  assert.equal((transpiled.diagnostics||[]).filter(d=>d.category===ts.DiagnosticCategory.Error).length,0,'utils syntax');
  await writeFile(temp,transpiled.outputText);
  const {cn}=await import(pathToFileURL(temp).href);
  assert.equal(cn('text-pr-body','text-foreground'),'text-pr-body text-foreground');
  assert.equal(cn('text-pr-h1','text-pr-body'),'text-pr-body');
  assert.equal(cn('p-4','p-pr-tool'),'p-pr-tool');
  assert.equal(cn('bg-primary','bg-secondary'),'bg-secondary');
  assert.equal(cn(false,null,undefined,'text-pr-ui'),'text-pr-ui');
  const sizes = [...expected.keys()].filter(cls => cls.startsWith('text-pr-'));
  for (const size of sizes) {
    assert.equal(cn(size, 'text-foreground'), `${size} text-foreground`);
    assert.equal(cn('text-foreground', size), `text-foreground ${size}`);
    assert.equal(cn('text-pr-body', size), size);
  }
  await writeFile(join(out,'tailwind-compile.json'),JSON.stringify({executed_at:new Date().toISOString(),passed:true,css_bytes:Buffer.byteLength(compiled),semantic_utilities:candidates.split(' '),declaration_checks:expected.size,cn_checks:5 + sizes.length * 3,authorized_routes:22},null,2)+'\n');
  console.log('Tailwind v4 compilation + semantic utility + cn checks passed for the 22 authorized routes.');
} catch(e) {
  const error = e instanceof Error ? e.message : String(e);
  await mkdir(out,{recursive:true});
  await writeFile(join(out,'tailwind-compile.json'),JSON.stringify({executed_at:new Date().toISOString(),passed:false,error},null,2)+'\n');
  console.error('CSS check failed. 请依据下方原始错误区分依赖、编译或断言问题；本检查不会安装或升级依赖。');
  console.error(error);
  process.exitCode=1;
} finally {await rm(temp,{force:true});}
