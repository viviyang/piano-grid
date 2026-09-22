const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),ts=require('typescript');
// Execute existing server adapters using the locked TypeScript compiler; no copied music model.
require.extensions['.ts']=(module,filename)=>module._compile(ts.transpileModule(fs.readFileSync(filename,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,esModuleInterop:true}}).outputText,filename);
const {getChordCenter}=require('../src/lib/chord-content.ts');
const {getChordFinder,getPianoChordsGuide}=require('../src/lib/support-content.ts');
const finder=getChordFinder(getChordCenter().items),guide=getPianoChordsGuide();
assert.equal(finder.data.chords.length,433);
const help=finder.model.blocks.find(b=>b.id==='how-to-enter').paragraphs.join(' ');
assert.ok(help.includes('Select each different note'));assert.ok(!help.includes('Enter pitch names with octave'));
assert.ok(guide.model.links.some(l=>l.url==='/chords/finder'&&l.label==='Identify a chord from selected notes'));
assert.ok(!guide.model.links.some(l=>l.url==='/chords#find-a-chord'));
const knownSets=new Set(finder.data.chords.flatMap(c=>[c.pitchClasses,...c.suppliedVoicings.map(v=>v.pitchClasses)]).map(s=>s.join(',')));
let noMatch;
for(let a=0;a<12&&!noMatch;a++)for(let b=a+1;b<12&&!noMatch;b++)if(!knownSets.has(`${a},${b}`))noMatch=[a,b];
assert.ok(noMatch);
const out=process.env.PIANO_CHECK_OUT||'checks/product-system-p0-2026-09-22';fs.mkdirSync(out,{recursive:true});
const report={passed:5,registryCount:433,noMatch,help,guideLink:guide.model.links.find(l=>l.url==='/chords/finder'&&l.label==='Identify a chord from selected notes')};
fs.writeFileSync(path.join(out,'product-data.json'),JSON.stringify(report,null,2));console.log(JSON.stringify(report));
