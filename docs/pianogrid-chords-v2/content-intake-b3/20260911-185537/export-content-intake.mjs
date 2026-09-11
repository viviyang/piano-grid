import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import {pathToFileURL} from 'node:url';
import ts from 'typescript';

const repo=process.cwd();
const stamp='20260911-185537';
const outRoot=path.join(repo,'docs','pianogrid-chords-v2','content-intake-b3',stamp);
const pkg=path.join(outRoot,'PianoGrid_B3_Content_Intake');
const zipPath=path.join(outRoot,'PianoGrid_B3_Content_Intake.zip');
const records=[];
const missing=[];

const norm=value=>value.replaceAll('\\','/');
const shaBuffer=value=>crypto.createHash('sha256').update(value).digest('hex');
const shaFile=file=>shaBuffer(fs.readFileSync(file));
const ensure=file=>fs.mkdirSync(path.dirname(file),{recursive:true});
function addRecord({sourcePath=null,packagePath,mode,pointer=null,note=null}){
  const absolute=path.join(pkg,packagePath);
  records.push({source_path:sourcePath,package_path:norm(packagePath),sha256:shaFile(absolute),mode,source_pointer:pointer,note});
}
function copy(sourcePath,packagePath=path.join('source',sourcePath),note=null){
  const src=path.join(repo,sourcePath),dest=path.join(pkg,packagePath);
  if(!fs.existsSync(src)){missing.push({source_path:norm(sourcePath),impact:'Referenced material was not available for export.'});return;}
  ensure(dest);fs.copyFileSync(src,dest);addRecord({sourcePath:norm(sourcePath),packagePath:norm(packagePath),mode:'original',note});
}
function write(packagePath,value,{sourcePath=null,mode='derived',pointer=null,note=null}={}){
  const dest=path.join(pkg,packagePath);ensure(dest);
  const body=typeof value==='string'?value:JSON.stringify(value,null,2)+'\n';
  const normalized=packagePath.endsWith('.md')&&mode==='derived'?body.replace(/^\+/gm,''):body;
  fs.writeFileSync(dest,normalized,'utf8');addRecord({sourcePath,packagePath,mode,pointer,note});
}
const esc=value=>String(value??'').replaceAll('|','\\|').replaceAll('\n',' ');
const bool=value=>value?'yes':'no';
const readJson=rel=>JSON.parse(fs.readFileSync(path.join(repo,rel),'utf8'));

if(fs.existsSync(pkg)||fs.existsSync(zipPath))throw new Error(`Refusing to overwrite existing export: ${outRoot}`);
fs.mkdirSync(pkg,{recursive:true});

const baseline=readJson('docs/pianogrid-chords-v2/evidence/b3/B3_BASELINE.json');
const b3Result=fs.readFileSync(path.join(repo,'docs/pianogrid-chords-v2/B3_RESULT.md'),'utf8');
if(!/PASS_WITH_NOTES/.test(b3Result))throw new Error('B3_RESULT is not PASS_WITH_NOTES');
const head=execFileSync('git',['rev-parse','HEAD'],{cwd:repo,encoding:'utf8'}).trim();
const gitStatus=execFileSync('git',['status','--short'],{cwd:repo,encoding:'utf8'}).trim().split(/\r?\n/).filter(Boolean);
const baselineDrift=baseline.relevantFiles.flatMap(entry=>{
  const file=path.join(repo,entry.path);
  if(!fs.existsSync(file))return [{path:entry.path,expected:entry.sha256,actual:null}];
  const actual=shaFile(file);return actual===entry.sha256?[]:[{path:entry.path,expected:entry.sha256,actual}];
});
if(head!==baseline.head||baselineDrift.length)throw new Error(`B3 version mismatch: head=${head}, drift=${JSON.stringify(baselineDrift)}`);

// Resolve the current adapters with the same local TypeScript runtime used by the repository checks.
const work=path.join(outRoot,'export-work');fs.mkdirSync(work,{recursive:true});
for(const name of ['site-routes','site-content','chord-detail-model','chord-learning-content','a-minor-content','chord-content']){
  let code=ts.transpileModule(fs.readFileSync(path.join(repo,'src','lib',`${name}.ts`),'utf8'),{compilerOptions:{module:ts.ModuleKind.ESNext,target:ts.ScriptTarget.ES2020}}).outputText;
  code=code.replace(/from '(\.\/[^']+)'/g,"from '$1.mjs'");
  fs.writeFileSync(path.join(work,`${name}.mjs`),code);
}
const adapter=await import(`${pathToFileURL(path.join(work,'chord-content.mjs')).href}?v=${Date.now()}`);
const details={
  '/chords/a-minor':adapter.getChordDetail('/chords/a-minor'),
  '/chords/a-major':adapter.getChordDetail('/chords/a-major'),
  '/chords/c-major':adapter.getChordDetail('/chords/c-major'),
};
const hub=adapter.getChordCenter();
fs.rmSync(work,{recursive:true,force:true});

const legacy=readJson('docs/content/chords/page-content.json');
const master=readJson('docs/content/site-master/page-content.master.json');
const plan=readJson('docs/product/url-plan.final.json');
const publicRoutes=fs.readFileSync(path.join(repo,'src/lib/site-routes.ts'),'utf8').match(/export const PUBLIC_ROUTES = \[([\s\S]*?)\] as const/)?.[1].match(/'[^']+'/g)?.map(x=>x.slice(1,-1))||[];

const relatedUrls=['/chords','/chords/a-major','/chords/a-minor','/chords/c-major','/chords/b-major','/chords/a-flat-major','/chords/e-major','/chords/c-minor','/chords/c-flat-major','/chords/g-major','/chords/by-key','/chords/finder','/chord-progressions','/guide/piano-chords','/keyboard-notes/finger-numbers'];
const sourceIds=new Set();
for(const url of relatedUrls){for(const id of master.pages[url]?.source_ids||[])sourceIds.add(id);}
const relevantSources=(master.sources||[]).filter(source=>sourceIds.has(source.id));
const relevantIssues=(master.open_issues||[]).filter(issue=>{const text=JSON.stringify(issue).toLowerCase();return relatedUrls.some(url=>text.includes(url))||text.includes('chord');});
const relevantAssets=Array.isArray(master.assets)?master.assets.filter(asset=>JSON.stringify(asset).toLowerCase().includes('chord')):master.assets;
const masterExtract={
  _export_note:'Exact excerpt from page-content.master.json. The production authoring target remains the full source file at the source_path below.',
  source_path:'docs/content/site-master/page-content.master.json',
  schema_version:master.schema_version,date:master.date,project:master.project,delivery_state:master.delivery_state,baseline_policy:master.baseline_policy,
  pages:Object.fromEntries(relatedUrls.filter(url=>master.pages[url]).map(url=>[url,master.pages[url]])),
  legacy_chords_support:master.legacy_chords_support,
  legacy_asset_base_by_page:master.legacy_asset_base_by_page,new_asset_base:master.new_asset_base,
  sources:relevantSources,source_variants:master.source_variants,open_issues:relevantIssues,assets:relevantAssets,
  integration_contract:master.integration_contract,
};
write('existing-content/docs/content/site-master/page-content.master.chords-extract.json',masterExtract,{sourcePath:'docs/content/site-master/page-content.master.json',mode:'excerpt',pointer:'/pages plus referenced sources, issues, assets and integration contract'});

const planPages=(plan.pages||[]).filter(item=>relatedUrls.includes(item.url));
const planSpecs=(plan.page_specs||[]).filter(item=>relatedUrls.includes(item.url)||relatedUrls.some(url=>JSON.stringify(item).includes(url)));
const planMappings=(plan.source_task_mapping||[]).filter(item=>relatedUrls.some(url=>JSON.stringify(item).includes(url))||JSON.stringify(item).toLowerCase().includes('chord'));
write('planning/original-plan-chord-entries.json',{
  _export_note:'Exact chord-related entries extracted from the original approved URL plan; this export does not add routes or planning.',
  source_path:'docs/product/url-plan.final.json',version:plan.version,date:plan.date,pages:planPages,page_specs:planSpecs,source_task_mapping:planMappings,
},{sourcePath:'docs/product/url-plan.final.json',mode:'excerpt',pointer:'/pages, /page_specs and /source_task_mapping filtered to listed related URLs'});

// Complete current examples: exact authoring records plus the B3 overlay that currently lives in TS.
const legacyVoicings=Object.fromEntries(legacy.pages['/chords/a-minor'].data.voicing_ids.map(id=>[id,legacy.shared_data.voicings[id]]));
const bundles={
  'a-minor':{
    status:'complete_current_example',write_targets:[
      {path:'docs/content/chords/page-content.json',package_reference:'source/docs/content/chords/page-content.json',pointers:['/pages/~1chords~1a-minor','/shared_data/chords/a-minor',...Object.keys(legacyVoicings).map(id=>`/shared_data/voicings/${id}`)]},
      {path:'src/lib/chord-learning-content.ts',package_reference:'source/src/lib/chord-learning-content.ts',exports:['sources','pageSourceIds','getChordLearning','fingeringBlock','practiceBlock']},
      {path:'src/lib/a-minor-content.ts',package_reference:'source/src/lib/a-minor-content.ts',exports:['getAMinorContent']},
    ],
    primary_page:legacy.pages['/chords/a-minor'],chord:legacy.shared_data.chords['a-minor'],voicings:legacyVoicings,
    shared_contracts:{playback_contract:legacy.playback_contract,print_contract:legacy.print_contract,white_pitch_classes:legacy.shared_data.conventions.white_pitch_classes},
    b3_learning_overlay:{fingeringExamples:details['/chords/a-minor'].fingeringExamples,sources:details['/chords/a-minor'].sources,practice:details['/chords/a-minor'].practice},
    resolved_model:'../resolved/a-minor.model.json',
  },
  'a-major':{
    status:'complete_current_example',write_targets:[
      {path:'docs/content/site-master/page-content.master.json',package_reference:'existing-content/docs/content/site-master/page-content.master.chords-extract.json',pointers:['/pages/~1chords~1a-major','/legacy_chords_support']},
      {path:'src/lib/chord-learning-content.ts',package_reference:'source/src/lib/chord-learning-content.ts',exports:['sources','pageSourceIds','getChordLearning','fingeringBlock','practiceBlock']},
      {path:'src/lib/chord-content.ts',package_reference:'source/src/lib/chord-content.ts',exports:['getChordDetail']},
    ],
    primary_page:master.pages['/chords/a-major'],shared_contracts:{legacy_chords_support:master.legacy_chords_support},
    b3_learning_overlay:{fingeringExamples:details['/chords/a-major'].fingeringExamples,sources:details['/chords/a-major'].sources,practice:details['/chords/a-major'].practice},
    resolved_model:'../resolved/a-major.model.json',
  },
  'c-major':{
    status:'complete_current_example',write_targets:[
      {path:'docs/content/site-master/page-content.master.json',package_reference:'existing-content/docs/content/site-master/page-content.master.chords-extract.json',pointers:['/pages/~1chords~1c-major','/legacy_chords_support']},
      {path:'src/lib/chord-learning-content.ts',package_reference:'source/src/lib/chord-learning-content.ts',exports:['sources','pageSourceIds','getChordLearning','fingeringBlock','practiceBlock','cMajorConnectionBlock']},
      {path:'src/lib/chord-content.ts',package_reference:'source/src/lib/chord-content.ts',exports:['getChordDetail']},
    ],
    primary_page:master.pages['/chords/c-major'],shared_contracts:{legacy_chords_support:master.legacy_chords_support},
    b3_learning_overlay:{fingeringExamples:details['/chords/c-major'].fingeringExamples,sources:details['/chords/c-major'].sources,practice:details['/chords/c-major'].practice},
    resolved_model:'../resolved/c-major.model.json',
  },
};
for(const [slug,bundle] of Object.entries(bundles))write(`examples/authoring/${slug}.authoring-bundle.json`,bundle,{mode:'derived',sourcePath:slug==='a-minor'?'docs/content/chords/page-content.json + src/lib/a-minor-content.ts + src/lib/chord-learning-content.ts':'docs/content/site-master/page-content.master.json + src/lib/chord-content.ts + src/lib/chord-learning-content.ts',pointer:'Exact records and B3 overlay assembled without renaming fields'});
for(const [url,model] of Object.entries(details))write(`examples/resolved/${url.split('/').at(-1)}.model.json`,model,{mode:'derived',sourcePath:'current getChordDetail(route)',pointer:url,note:'Pure-data resolved snapshot; not a write-back format.'});

const rootPc=item=>item.voicing.notes_low_to_high[0].midi%12;
const hubExport={
  export_kind:'resolved_current_hub_snapshot',source:'getChordCenter()',publication_evidence:'src/lib/site-routes.ts plus B3 raw HTML for the four chord routes',
  root_spelling_note:'root is the written spelling; root_pitch_class is MIDI modulo 12. B and C-flat therefore share pitch class 11 while retaining different spelling.',
  filters:hub.filters,practiceLinks:hub.practiceLinks,blocks:hub.blocks,metadata:hub.metadata,pdf:hub.pdf,whitePitchClasses:hub.whitePitchClasses,
  items:hub.items.map(item=>({...item,root_pitch_class:rootPc(item),detail_route_registered:item.url!==null,publication_status:item.url!==null?'registered_public_route':'collection_only_no_detail_route'})),
  comparisons:hub.comparisons,
};
write('examples/hub/chord-center.current.json',hubExport,{mode:'derived',sourcePath:'current getChordCenter()',pointer:'/items (19), /filters, /practiceLinks, /comparisons'});

const authoringReadme=`# Three complete current examples\n\n+[已核实] The three JSON bundles are assembled from the exact current inputs and B3 overlays. They preserve all current page copy, voicings, FAQ/blocks, links, resource references, fingering cases, practice data, sources and default states. They are reference bundles, not a new production schema.\n\n+| Example | Production authoring inputs | Adapter | Runtime validator | Resolved snapshot |\n+|---|---|---|---|---|\n+| A minor | \`docs/content/chords/page-content.json\` + \`src/lib/chord-learning-content.ts\` | \`getAMinorContent()\` | \`finalizeChordDetailModel()\` | \`../resolved/a-minor.model.json\` |\n+| A major | \`docs/content/site-master/page-content.master.json#/pages/~1chords~1a-major\` + \`src/lib/chord-learning-content.ts\` | \`getChordDetail('/chords/a-major')\` | \`finalizeChordDetailModel()\` | \`../resolved/a-major.model.json\` |\n+| C major | \`docs/content/site-master/page-content.master.json#/pages/~1chords~1c-major\` + \`src/lib/chord-learning-content.ts\` | \`getChordDetail('/chords/c-major')\` | \`finalizeChordDetailModel()\` | \`../resolved/c-major.model.json\` |\n+\n+The package copies the legacy JSON and TS inputs under \`source/\`; the large master JSON is represented by an exact chord-only excerpt under \`existing-content/\`, and each bundle names that package reference. Edit the original repository locations shown above; do not write the resolved snapshots back. Shared values must remain shared: MIDI drives keyboard, audio and print highlights; default voicing drives the current one-hand fingering; route registration controls detail links.\n+`;
write('examples/authoring/README.md',authoringReadme,{mode:'derived'});

// Minimal exact source and configuration copies.
const sourceFiles=[
  'src/lib/a-minor-types.ts','src/lib/chord-detail-model.ts','src/lib/chord-learning-content.ts','src/lib/a-minor-content.ts','src/lib/chord-content.ts','src/lib/site-content.ts','src/lib/site-routes.ts','src/lib/a-minor-audio.ts','src/lib/keyboard-geometry.ts','src/lib/site-config.ts','src/lib/utils.ts',
  'src/app/chords/page.tsx','src/app/chords/a-minor/page.tsx','src/app/chords/a-major/page.tsx','src/app/chords/c-major/page.tsx','src/app/chords/a-minor/a-minor.css',
  ...fs.readdirSync(path.join(repo,'src/components/chords')).map(name=>`src/components/chords/${name}`),
  ...fs.readdirSync(path.join(repo,'src/components/a-minor')).map(name=>`src/components/a-minor/${name}`),
  'src/components/site-navigation.tsx','src/components/site-navigation.css',
  'src/components/ui/site-brand.tsx','src/components/ui/site-brand.css','src/components/ui/breadcrumb.tsx','src/components/ui/breadcrumb.css','src/components/ui/rolling-text.tsx',
  'scripts/check-content-adapters.mjs','scripts/check-chord-b3.mjs','scripts/check-chord-batch.mjs','scripts/check-a-minor.mjs','package.json','package-lock.json','tsconfig.json','next.config.ts','postcss.config.mjs',
  'docs/content/chords/page-content.json','docs/content/chords/content-pack.md','docs/content/chords/README.md',
];
for(const source of sourceFiles)copy(source,norm(path.join('source',source)));

const existingFiles=[
  'docs/content/site-master/content-master-index.md','docs/content/site-master/source-ledger.master.md','docs/content/site-master/unresolved-issues.master.md',
  'docs/product/Piano_全站统一规划_最终版.md','docs/product/Piano_URL规划说明.md','docs/tasks/batch-implementation/01-chords.md','docs/tasks/site-implementation-plan.md',
  'docs/content/site-master/preserved-chords/content-pack.md',
  'docs/content/site-master/preserved-chords/assets/piano-chord-chart-selected.pdf','docs/content/site-master/preserved-chords/assets/a-minor-notes-inversions.pdf',
  'docs/content/site-master/assets/chord-a-major.pdf','docs/content/site-master/assets/chord-c-major.pdf',
];
for(const source of existingFiles)copy(source,norm(path.join('existing-content',source)));

const evidenceFiles=[
  'docs/pianogrid-chords-v2/B3_RESULT.md','docs/pianogrid-chords-v2/evidence/b3/B3_BASELINE.json','docs/pianogrid-chords-v2/implementation-log.md',
  'docs/pianogrid-chords-v2/evidence/b3/isolated-build.json','docs/pianogrid-chords-v2/evidence/b3/adapter-validation.json','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/b3-validation.json',
  'docs/pianogrid-chords-v2/evidence/b3/production-browser-final/chords-1440.png','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/chords-390.png','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/chords-raw.html',
  'docs/pianogrid-chords-v2/evidence/b3/production-browser-final/a-minor-1440.png','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/a-minor-390.png','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/a-minor-raw.html','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/a-minor-fingering.png','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/a-minor-practice-answer.png',
  'docs/pianogrid-chords-v2/evidence/b3/production-browser-final/a-major-raw.html','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/a-major-fingering.png','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/a-major-practice-answer.png',
  'docs/pianogrid-chords-v2/evidence/b3/production-browser-final/c-major-raw.html','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/c-major-fingering.png','docs/pianogrid-chords-v2/evidence/b3/production-browser-final/c-major-practice-answer.png',
  'docs/pianogrid-chords-v2/evidence/b3/a-minor-regression-final/print-root.png','docs/pianogrid-chords-v2/evidence/b3/a-minor-regression-final/page-validation.json',
];
for(const source of evidenceFiles)copy(source,norm(path.join('evidence',source.replace('docs/pianogrid-chords-v2/',''))));

const contract=`# Authoring contract\n\n+## Verified current pipeline\n+\n+[已核实] Content is currently a **JSON + pure-data TypeScript combination**. It is not one universal write-back JSON schema.\n+\n+1. Raw inputs: A minor and the hub start in \`docs/content/chords/page-content.json\`; A major, C major and the 19-item expansion source start in \`docs/content/site-master/page-content.master.json\`. B3 hand-specific fingering, source attribution, practice copy and C-major connection copy live in \`src/lib/chord-learning-content.ts\`.\n+2. Adapters: \`getAMinorContent()\` and \`getChordDetail(route)\` normalize those inputs. \`getChordCenter()\` assembles the hub and resolves link availability with \`isPublicRoute()\`.\n+3. Validator: every detail model passes \`finalizeChordDetailModel()\` before React receives it. This is the current runtime validator.\n+4. React props: \`ChordDetailPage\` receives \`ChordDetailModel\`; \`ChordCenterPage\` receives \`CenterModel\`. Keyboard, playback and print all consume the same resolved \`Voicing\` MIDI values. Fingering references the selected default/root \`voicingId\`; practice derives its correct answer from the resolved chord pitch classes.\n+\n+The resolved JSON files are safe pure-data snapshots. They contain no JSX, functions, Map, Date or \`undefined\`, but they are outputs and must not be treated as authoring inputs. Production TypeScript contains functions and types, so a JSON-only delivery cannot replace it without an approved interface change.\n+\n+## Current fields and rules\n+\n+### Detail identity, metadata and chord definition\n+\n+| Field | Type / status | Rule |\n+|---|---|---|\n+| \`metadata.title\`, \`description\`, \`canonical_path\` | string, required | canonical must equal \`data.url\`; pages create Next metadata from this model. |\n+| \`data.url\` | current \`ChordDetailRoute\` enum | Only \`/chords/a-minor\`, \`/chords/a-major\`, \`/chords/c-major\`. Must be in \`PUBLIC_ROUTES\`. |\n+| \`data.namespace\`, \`toolId\` | string, required | Prefix/anchor IDs; IDs must be unique and every TOC ID must resolve. |\n+| \`data.chord.id\`, \`slug\` | string, required | Both must match the URL slug. |\n+| \`name_en\`, \`symbol\`, \`root_spelling\` | string, required | Preserve written accidentals. Root spelling is not interchangeable with pitch class. |\n+| \`quality\` | \`major\` or \`minor\` | Current validator only supports these two triad qualities. |\n+| \`note_spellings\` | exactly 3 strings | Pitch-class spellings; must match every voicing after accidental normalization. |\n+| \`formula_degrees\` | exactly \`1,3,5\` or \`1,b3,5\` | Determined by quality; order is required. |\n+| \`data.rangeLabel\`, \`heading\`, \`toolHeading\`, \`printDisclaimer\` | non-empty strings | Display copy; range must agree with diagrams and disclaimer must not promise a fingering. |\n+| \`data.pdf{url,label}\` | object, currently required | URL and action label; no null/default behavior exists. |\n+| \`data.whitePitchClasses\` | ordered number array | Shared keyboard geometry input; current source is the legacy shared convention. |\n+| \`data.microcopy\` | required string map | Loading, audio/print error, selected-note and playback text; hub adds \`no_results\`. |\n+\n+### Voicing, display, audio and print\n+\n+Each detail requires exactly three ordered \`voicings\` and three matching ordered \`options\`. \`defaultId\` must identify the root-position voicing. A voicing requires \`voicing_id\`, \`inversion_label\`, \`chord_symbol\`, \`bass_spelling\`, exactly three low-to-high \`notes_low_to_high[{display_pitch,midi}]\`, \`diagram{highlight_midi,alt_text,keyboard_range_midi}\`, \`playback{together,ascending}\`, and \`print_data{spelled_pitches,highlight_midi}\`. MIDI order must be identical across notes, keyboard highlights, both playback modes and print highlights; the first note is the bass; all MIDI values must be in the keyboard range. Playback events require numeric \`midi\`, \`frequency_hz\`, \`onset_ms\`, \`duration_ms\`. No nullable voicing fields are supported.\n+\n+### Page copy and anchors\n+\n+\`blocks[]\` are ordered. Each \`Block\` requires a unique \`block_id\` and \`content{heading,paragraphs,steps,table,links}\`. Empty arrays are meaningful; \`table\` is the only nullable field and is either \`null\` or \`{columns,rows}\`. Links require \`label,url,published\`; only registered routes may be exposed as published. \`answer\`, \`introduction[]\`, \`searchSections[]\` and ordered \`tocItems[]\` are required resolved fields. FAQ content is presently represented in block tables, not a special FAQ schema.\n+\n+\`byId\` is a derived record keyed by every block ID; authors do not maintain it separately. \`searchSections\` is also derived from blocks. \`options[{value,label}]\` must match the voicing IDs and inversion labels in the same order. Empty \`introduction[]\` is valid for A/C; A minor has two adapted introduction paragraphs. There is no implicit null substitution for missing strings or arrays.\n+\n+### Fingering, practice, resources and evidence\n+\n+Each current detail has exactly two \`FingeringExample\` records: \`hand\` is \`right\` or \`left\`; \`voicingId\` must equal the root/default voicing; \`notes[]\` must match its display pitches; \`fingers[]\` is currently right \`1,3,5\` and left \`5,3,1\`. \`sourceIds[]\` must resolve to complete \`ChordSource\` records. The only accepted status is \`source_verified_with_octave_adaptation\`; it explicitly means the source supports tones/fingers but not PianoGrid's chosen octave. Scope and limitation are required. Inversion fingerings are not supported.\n+\n+\`practice\` currently supports one ID, \`practice\`, with heading, prompt and scope. The UI checks an unordered set of three pitch classes; order/octave/fingering/performance are outside its scoring scope. The rendered no-JS self-check remains available in the page block. A new question type or scoring mode requires code first.\n+\n+Resources are current path/label pairs. A missing PDF must not produce a download action; this currently needs an adapter/template decision because the detail type declares \`pdf\` required. Staff notation is not implemented and has no authoring field. SEO enters through each page's raw \`metadata\` and adapter overrides, then Next route \`generateMetadata\`; do not author a second SEO source.\n+\n+### Hub model\n+\n+\`CenterModel\` requires title/metadata, ordered blocks, \`items[]\`, comparisons, practice links, filters, microcopy, white-key pitch classes and a PDF path. Each \`CenterItem\` requires \`id,name,root,quality,url,voicing,tones,formula\`. \`url\` is the intentional nullable field: \`null\` means the object is available in the hub but has no registered detail link. Current quality options are major/minor; root options preserve C♯/C♭/F♯/G♯/A♭/B♭ spelling. Filter defaults use nullable root/quality and a required selected chord ID. The item order is explicit in \`getChordCenter()\`; downstream must not alphabetize it. Comparisons reference resolved items, and the three practice links point to published detail anchors.\n+\n+## Validation in the original repository\n+\n+Run \`node scripts/check-content-adapters.mjs\` for adapter/validator integrity and \`node scripts/check-chord-b3.mjs\` for B3 content behavior. Broader project commands are recorded in the copied \`package.json\` and B3 result. This export intentionally did not rerun product checks.\n+`;
write('contract/AUTHORING_CONTRACT.md',contract,{mode:'derived'});

const deliverables=`# Downstream content deliverables\n\n+| Deliverable | Actual format | Production intake location | Current validation | Required |\n+|---|---|---|---|---|\n+| Planned page record | JSON object preserving the selected page's existing raw shape | Existing object under \`docs/content/site-master/page-content.master.json#/pages/<escaped-url>\` | \`readAuthorizedPage()\`, adapter checks | Yes |\n+| Chord definition and 3 voicings | JSON data in that page's \`data\` fields; preserve spellings, MIDI and order | Same page object; A minor remains in \`docs/content/chords/page-content.json\` until a separately approved migration | \`finalizeChordDetailModel()\`, adapter checks | Yes |\n+| English body, direct answer, theory/comparison/FAQ/links | JSON strings/arrays using the chosen existing page shape | Page \`blocks\`, metadata and related fields; do not put prose into React | Adapter checks plus editorial/source review | Yes |\n+| Root-position right/left examples and source records | Pure-data TypeScript objects matching \`FingeringExample\`/\`ChordSource\` | \`src/lib/chord-learning-content.ts\` under the current interface | \`finalizeChordDetailModel()\` | Yes for a B3-level detail page |\n+| Practice prompt/scope | Pure-data TypeScript returned by \`getChordLearning()\`; answer remains derived from chord pitch classes | \`src/lib/chord-learning-content.ts\` | Validator and B3 check | Yes for a B3-level detail page |\n+| PDF/resource declaration | Existing JSON asset record plus actual first-party file and adapter path | Master/legacy asset entry and approved public asset location | resource path checks and human print/PDF review | Optional until a page promises a download |\n+| Related links | JSON/TS link records with target, relation text, placement and publication state | Page blocks or current learning overlay | \`isPublicRoute()\`; unpublished targets stay hidden/null | Optional; no dead links |\n+| Source dossier | Markdown/JSON source entry with URL, checked date, exact support and limitation | Existing source ledger/page source IDs; B3 fingering sources currently in TS | ID resolution + human evidence review | Yes for factual/music/fingering claims |\n+| Staff notation | Unsupported | No current field or renderer | None | No; requires code/product approval first |\n+\n+The handoff should therefore return a combination: page JSON records, pure-data TS additions for the current learning overlay, source-ledger evidence, and any approved first-party resource files. The three authoring bundles show the full current examples; the resolved files show expected outputs only.\n+`;
write('contract/DELIVERABLES.md',deliverables,{mode:'derived'});

const limits=`# Current expansion limits\n\n+## Safe within the present detail contract\n+\n+[已核实] The current detail validator accepts one of three registered routes, major/minor quality, exactly three pitch classes, exactly three positions (root, first inversion, second inversion), three distinct MIDI notes per position, and a keyboard range declared per voicing. It supports together/ascending playback, keyboard and print highlights, one sourced right-hand and one sourced left-hand root-position example, one unordered pitch-class builder exercise, blocks/FAQ/TOC, related links and one PDF action.\n+\n+Adding another object with this same musical shape still requires: a complete raw page record; all three spellings/MIDI voicings; a route added through an approved URL batch; an adapter registration; metadata; two sourced root-position fingering cases with limitations; practice text; resource/link status; route/sitemap registration only when publishable; and the existing validation commands. A chord may appear in the hub without a detail route: its \`url\` remains \`null\`, so no empty page or fake detail button is created.\n+\n+The hub currently contains 19 major/minor triads, 13 written root spellings and two qualities. It derives most collection rows from \`/chords/by-key\`; only A minor, A major and C major link to current detail pages. Written spelling is preserved separately from pitch class, including B versus C-flat.\n+\n+## Requires code/product work before content intake\n+\n+Seventh, diminished, power, jazz and extended chords; more/fewer than three notes; more/fewer than three positions; alternate practice/scoring modes; inversion-specific fingering; optional/no-PDF details under the current required PDF type; staff notation; new URL families; and batch route generation are outside this contract. Unknown fingering must remain absent/unpublished instead of being inferred. Missing source, body copy or resource must block the affected promise/link, not create an empty page, button or sitemap entry.\n+\n+The source status \`source_verified_with_octave_adaptation\` must remain on all six current hand examples until PianoGrid's exact octave/hand presentation receives independent professional review. Human audition, physical-device, screen-reader, physical-print and tagged-PDF accessibility checks remain separate release gates.\n+`;
write('contract/EXPANSION_LIMITS.md',limits,{mode:'derived'});

function findPlanPage(url){return plan.pages.find(item=>item.url===url)||{};}
function routeFile(url){return url==='/'?'src/app/page.tsx':`src/app${url}/page.tsx`;}
const inventoryRows=relatedUrls.map(url=>{
  const p=master.pages[url]||{},u=findPlanPage(url),route=routeFile(url),exists=fs.existsSync(path.join(repo,route)),published=publicRoutes.includes(url);
  const data=JSON.stringify(p.data||{}),body=JSON.stringify(p.blocks||{}),fingering=details[url]?.fingeringExamples?.length===2?'complete B3 pair':data.includes('fingering')?'planned/raw only':'none in current detail contract';
  const practice=details[url]?.practice?'B3 builder':data.includes('practice')||body.toLowerCase().includes('practice')?'planned/raw only':'none';
  const batch=u.batch||p.batch||(['/chords','/chords/a-minor'].includes(url)?'legacy preserved; no letter batch in source':'not stated');
  return {url,task:u.id||p.baseline_page_id||'',keyword:u.keyword||p.main_keyword||'',batch,route:exists?'exists':'absent',publication:published?'registered public route':'not registered',music:data.length>2?'raw data present':'not found',body:body.length>2?'content blocks present':'not found',fingering,practice,sources:(p.source_ids||[]).length?`${p.source_ids.length} raw source IDs`:'none found',resource:data.includes('.pdf')||body.includes('.pdf')?'declared':'not found',template:p.template_id||'',gap:published?'human gates retained':'route/code registration + B3-level learning fields needed'};
});
let inventory='# Chord-related page inventory\n\n+[已核实] Publication status below means registration in the current \`PUBLIC_ROUTES\`; for the four chord routes, B3 raw HTML/validation is included as evidence. A route file alone is not treated as proof of public deployment.\n\n+| URL | Original task / keyword / batch | Route | Publication | Music / body | Fingering / practice | Sources / resource | Reusable template | Gap before detail publication |\n+|---|---|---|---|---|---|---|---|---|\n+';
for(const row of inventoryRows)inventory+=`| ${esc(row.url)} | ${esc([row.task,row.keyword,row.batch].filter(Boolean).join(' / '))} | ${row.route} | ${row.publication} | ${row.music}; ${row.body} | ${row.fingering}; ${row.practice} | ${row.sources}; ${row.resource} | ${esc(row.template)} | ${esc(row.gap)} |\n`;
inventory+='\nOriginal records are in `original-plan-chord-entries.json` and the exact master excerpt under `existing-content/`. Current and future routes are intentionally separated.\n';
write('planning/page-inventory.md',inventory,{mode:'derived',sourcePath:'docs/product/url-plan.final.json + docs/content/site-master/page-content.master.json + src/lib/site-routes.ts'});

let catalog='# Current 19-item chord catalog\n\n+[已核实] This is the full current hub collection from \`getChordCenter()\`. Root spelling is textual; pitch class is the root MIDI modulo 12. A detail URL appears only when registered.\n\n+| ID | Root spelling | Root pitch class | Type | Tones | Root voicing | Detail | Current material | Concrete gap |\n+|---|---:|---:|---|---|---|---|---|---|\n+';
for(const item of hubExport.items){const source=['a-minor','a-major','c-major'].includes(item.id)?'complete B3 example':'by-key raw row + hub adapter';const gap=item.url?'human gates retained':'no approved/registered detail route; full B3 body, sources, two hand cases and resource decision required';catalog+=`| ${item.id} | ${esc(item.root)} | ${item.root_pitch_class} | ${item.quality} | ${esc(item.tones.join('–'))} | ${esc(item.voicing.notes_low_to_high.map(n=>n.display_pitch).join('–'))} | ${item.url||'none'} | ${source} | ${gap} |\n`;}
catalog+='\nCurrent hub types are major and minor only. Diminished rows in the planning source are not adapted into this 19-item collection.\n';
write('planning/chord-catalog.md',catalog,{mode:'derived',sourcePath:'current getChordCenter()'});

const gaps=`# Precise gaps and retained gates\n\n+| Object / page | Missing field or evidence | Impact | Kind |\n+|---|---|---|---|\n+| All current/future chord details | Staff notation has no current data field, model contract or renderer. | Content authors must not supply or promise notation; adding it requires approved code/product work. | code |\n+| A minor, A major, C major fingerings | Sources support tones and 1-3-5 / 5-3-1, but do not specify PianoGrid's exact octave placements; all six records retain \`source_verified_with_octave_adaptation\`. | Content may reuse the examples with the limitation; exact site-specific presentation still needs independent professional review. | material + human |\n+| Current audio | No recorded human audition of timbre, timing and pitch on the final B3 build. | Automated MIDI alignment passed, but perceptual acceptance is still open. | human |\n+| Current responsive pages | No physical mobile/tablet device run was recorded; screenshots are browser viewports. | Browser layouts are evidenced; touch/device behavior is not fully signed off. | human |\n+| Current detail and hub pages | No screen-reader run. | Semantics and announcements require assistive-technology verification. | human |\n+| Current print resources | No physical print review; tagged-PDF accessibility decision/test remains open. | Print/PDF cannot be described as fully accessible or physically approved. | human |\n+| 16 hub-only items | No registered detail route and no complete B3-level page bundle. | They may remain filterable/playable hub items, but cannot receive a detail link, sitemap entry or page until an approved batch supplies content and code registration. | material + code |\n+| Future non-triad/other-type chords | Current validator fixes quality to major/minor, three notes and three positions. | Seventh/diminished/power/jazz/extended chord intake needs an explicit contract/code revision first. | code |\n+| Detail pages without a PDF | \`ChordDetailData.pdf\` is currently required; no optional-resource behavior is defined. | A future page must include a real approved resource or first receive a template/type change; no fake button is allowed. | code + material |\n+| Source ledger consolidation | B3 Skoove fingering records live in \`src/lib/chord-learning-content.ts\`, while older sources live in JSON/Markdown ledgers. | Downstream delivery must update both actual inputs or propose a separately reviewed consolidation; IDs cannot be assumed globally centralized. | material |\n+\n+[推断] These gaps do not block content preparation for new major/minor triads because the present contract and three complete examples are locatable. They do block claims of complete product/release acceptance and some future chord types.\n+`;
write('gaps.md',gaps,{mode:'derived'});

const readme=`# PianoGrid B3 Content Intake\n\n+**Status: READY_FOR_CONTENT**\n+\n+[已核实] This package corresponds to B3 \`PASS_WITH_NOTES\` at Git HEAD \`${head}\`. All ${baseline.relevantFiles.length} files in the B3 baseline matched their recorded SHA-256 both before and after export. The workspace was dirty at export, as it was at B3 baseline; no relevant baseline file drifted.\n+\n+Use this package to prepare the next approved major/minor triad content. It is a content handoff, not a standalone Next.js project and not permission to add routes. Start with \`contract/AUTHORING_CONTRACT.md\`, then inspect the three exact authoring bundles and their resolved outputs. The complete current 19-item hub snapshot is under \`examples/hub/\`; original chord-related plans and existing materials are under \`planning/\` and \`existing-content/\`.\n+\n+The downstream format is deliberately mixed because that is the actual implementation: page JSON records + pure-data TypeScript learning overlays + source-ledger evidence + optional approved first-party resource files. Edit the original repository targets named in the contract. Do not write resolved snapshots back into production.\n+\n+Human gates remain open: independent review of octave-adapted fingering presentation, real listening, physical devices, screen readers, physical printing and tagged-PDF accessibility. Staff notation is outside the current model.\n+\n+The manifest identifies every package file as original, excerpt or derived. No business source, page, theme, route, dependency or build configuration was modified to create this package; no commit or deployment occurred.\n+`;
write('README.md',readme,{mode:'derived'});

// Re-check the B3 version after copying and generating derivatives.
const afterDrift=baseline.relevantFiles.flatMap(entry=>{const file=path.join(repo,entry.path);const actual=fs.existsSync(file)?shaFile(file):null;return actual===entry.sha256?[]:[{path:entry.path,expected:entry.sha256,actual}];});
if(afterDrift.length)throw new Error(`Relevant files changed during export: ${JSON.stringify(afterDrift)}`);

const manifest={
  schema_version:1,export_status:'READY_FOR_CONTENT',exported_at:new Date().toISOString(),export_timestamp_directory:stamp,
  repository:{head,dirty:gitStatus.length>0,git_status_entry_count:gitStatus.length,b3_status:'PASS_WITH_NOTES',baseline_head:baseline.head,baseline_generated_at:baseline.generatedAt,version_mapping:`HEAD matched and all ${baseline.relevantFiles.length} B3 relevant SHA-256 values matched before and after export.`},
  scope:{business_source_modified:false,routes_added:false,dependencies_changed:false,product_tests_rerun:false,commit:false,deployment:false},
  file_count:records.length,files:records.sort((a,b)=>a.package_path.localeCompare(b.package_path)),
  missing_items:missing,
  known_gaps:[
    {item:'staff notation',impact:'Unsupported by current model; code/product work required before intake.'},
    {item:'human release gates',impact:'Audition, physical devices, screen reader, physical print, tagged PDF and independent fingering review remain open.'},
    {item:'future detail routes',impact:'Hub-only chords remain unlinked until an approved batch supplies complete content and route registration.'},
  ],
  self_hash_policy:'manifest.json and the ZIP are intentionally excluded from the files array to avoid self-reference; ZIP SHA-256 is stored beside the ZIP.',
};
const manifestPath=path.join(pkg,'manifest.json');fs.writeFileSync(manifestPath,JSON.stringify(manifest,null,2)+'\n','utf8');

// Package checks before compression.
const packageFiles=[];function walk(dir){for(const entry of fs.readdirSync(dir,{withFileTypes:true})){const full=path.join(dir,entry.name);if(entry.isDirectory())walk(full);else packageFiles.push(full);}}walk(pkg);
const listed=new Set(manifest.files.map(x=>x.package_path));
const actualNonManifest=packageFiles.map(file=>norm(path.relative(pkg,file))).filter(rel=>rel!=='manifest.json');
const unlisted=actualNonManifest.filter(rel=>!listed.has(rel));
const absent=manifest.files.filter(entry=>!fs.existsSync(path.join(pkg,entry.package_path))).map(entry=>entry.package_path);
const hashMismatch=manifest.files.filter(entry=>shaFile(path.join(pkg,entry.package_path))!==entry.sha256).map(entry=>entry.package_path);
const jsonErrors=[];for(const file of packageFiles.filter(file=>file.endsWith('.json'))){try{JSON.parse(fs.readFileSync(file,'utf8'));}catch(error){jsonErrors.push({file:norm(path.relative(pkg,file)),error:error.message});}}
const forbidden=packageFiles.filter(file=>/\.(woff2?|ttf|otf|eot)$/i.test(file)||norm(file).includes('/node_modules/')||norm(file).includes('/.git/')||path.basename(file).toLowerCase().startsWith('.env')).map(file=>norm(path.relative(pkg,file)));
const huge=packageFiles.filter(file=>fs.statSync(file).size>10*1024*1024).map(file=>({file:norm(path.relative(pkg,file)),bytes:fs.statSync(file).size}));
const secretPattern=/(?:sk-[A-Za-z0-9_-]{20,}|gh[pousr]_[A-Za-z0-9]{20,}|-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----|Authorization:\s*Bearer\s+[A-Za-z0-9._-]{12,})/;
const secrets=[];for(const file of packageFiles){if(fs.statSync(file).size>5*1024*1024)continue;const ext=path.extname(file).toLowerCase();if(!['.md','.json','.ts','.tsx','.js','.mjs','.html','.css'].includes(ext))continue;const text=fs.readFileSync(file,'utf8');if(secretPattern.test(text))secrets.push(norm(path.relative(pkg,file)));}
const required=['README.md','contract/AUTHORING_CONTRACT.md','contract/DELIVERABLES.md','contract/EXPANSION_LIMITS.md','examples/authoring/a-minor.authoring-bundle.json','examples/authoring/a-major.authoring-bundle.json','examples/authoring/c-major.authoring-bundle.json','examples/hub/chord-center.current.json','source/src/lib/a-minor-types.ts','source/src/lib/chord-detail-model.ts','source/src/lib/chord-content.ts','gaps.md','manifest.json'];
const bundleRefs=Object.values(bundles).flatMap(bundle=>bundle.write_targets.map(target=>target.package_reference));
const resolvedRefs=Object.values(bundles).map(bundle=>norm(path.join('examples','authoring',bundle.resolved_model)));
const requiredMissing=[...new Set([...required,...bundleRefs,...resolvedRefs])].filter(rel=>!fs.existsSync(path.join(pkg,rel)));
if(unlisted.length||absent.length||hashMismatch.length||jsonErrors.length||forbidden.length||huge.length||secrets.length||requiredMissing.length||hub.items.length!==19)throw new Error(JSON.stringify({unlisted,absent,hashMismatch,jsonErrors,forbidden,huge,secrets,requiredMissing,hubCount:hub.items.length},null,2));

// Compress from the timestamp root so the archive has one named top-level folder.
execFileSync('powershell.exe',['-NoProfile','-Command',`Compress-Archive -LiteralPath '${pkg.replaceAll("'","''")}' -DestinationPath '${zipPath.replaceAll("'","''")}' -CompressionLevel Optimal`],{cwd:repo,stdio:'inherit'});
const extractDir=path.join(outRoot,'zip-check');
execFileSync('powershell.exe',['-NoProfile','-Command',`Expand-Archive -LiteralPath '${zipPath.replaceAll("'","''")}' -DestinationPath '${extractDir.replaceAll("'","''")}' -Force`],{cwd:repo,stdio:'inherit'});
const extractedPkg=path.join(extractDir,'PianoGrid_B3_Content_Intake');
const extractedManifest=JSON.parse(fs.readFileSync(path.join(extractedPkg,'manifest.json'),'utf8'));
const extractProblems=extractedManifest.files.filter(entry=>!fs.existsSync(path.join(extractedPkg,entry.package_path))||shaFile(path.join(extractedPkg,entry.package_path))!==entry.sha256).map(entry=>entry.package_path);
if(extractProblems.length)throw new Error(`ZIP extraction/hash check failed: ${extractProblems.join(', ')}`);
fs.rmSync(extractDir,{recursive:true,force:true});
const zipSha=shaFile(zipPath);fs.writeFileSync(`${zipPath}.sha256`,`${zipSha}  PianoGrid_B3_Content_Intake.zip\n`,'utf8');
const check={status:'PASS',checked_at:new Date().toISOString(),zip_path:norm(path.relative(repo,zipPath)),zip_sha256:zipSha,zip_bytes:fs.statSync(zipPath).size,package_file_count:packageFiles.length,manifest_listed_file_count:manifest.files.length,json_files_parsed:packageFiles.filter(file=>file.endsWith('.json')).length,hub_item_count:hub.items.length,b3_relevant_files_rechecked:baseline.relevantFiles.length,checks:['ZIP extracted successfully','all manifest-listed files existed and matched SHA-256','all JSON parsed as UTF-8','three authoring examples, hub, types, validator and contracts were located','no secret signature, font, node_modules, .git, .env or file over 10 MiB','B3 HEAD and relevant hashes remained unchanged']};
fs.writeFileSync(path.join(outRoot,'EXPORT_CHECK.json'),JSON.stringify(check,null,2)+'\n','utf8');
console.log(JSON.stringify({status:'READY_FOR_CONTENT',zipPath,zipSha,zipBytes:check.zip_bytes,packageFiles:check.package_file_count,manifestFiles:manifest.files.length,missing,checks:check.checks},null,2));
