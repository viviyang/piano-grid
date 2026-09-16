/**
 * Isolated audit probes against the supplied B02/B03 snapshot.
 * Does NOT mount React or run the complete application or actual audio.
 * Functions are extracted from the uploaded source, not rewritten.
 * A minimal synthetic Layout is used solely to exercise the pure model.
 * Usage: node --experimental-strip-types probe-handoff.mjs /path/to/extracted-b02b03 [/path/to/report.json]
 */
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { pathToFileURL } from 'node:url';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
let ts;
try { ts = require('typescript'); } catch {
  const p = process.env.TYPESCRIPT_PATH;
  if (!p) throw new Error('Install/use existing TypeScript or set TYPESCRIPT_PATH to its module.');
  ts = require(p);
}
const root=path.resolve(process.argv[2] ?? '');
if(!fs.existsSync(path.join(root,'src/components/keyboard-notes/keyboard-notes-workspace.tsx'))) throw new Error('Pass the extracted B02/B03 handoff root.');
const workspace=fs.readFileSync(path.join(root,'src/components/keyboard-notes/keyboard-notes-workspace.tsx'),'utf8');
const sf=ts.createSourceFile('workspace.tsx', workspace,ts.ScriptTarget.ESNext,true,ts.ScriptKind.TSX);
function sourceFunction(name){let found;function walk(n){if(ts.isFunctionDeclaration(n)&&n.name?.text===name)found=n;ts.forEachChild(n,walk);}walk(sf);if(!found)throw new Error(`missing ${name}`);return found.getText(sf);}
function functionIn(name,bindings){const text=ts.transpileModule(sourceFunction(name),{compilerOptions:{target:ts.ScriptTarget.ES2022}}).outputText;return vm.runInNewContext(text+`\n${name}`,bindings);}
const model=await import(pathToFileURL(path.join(root,'src/lib/keyboard-practice.ts')));
const resolution=await import(pathToFileURL(path.join(root,'src/lib/keyboard-resolution.ts')));
const pc=[['C'],['C#','Db'],['D'],['D#','Eb'],['E'],['F'],['F#','Gb'],['G'],['G#','Ab'],['A'],['A#','Bb'],['B']];
const keys=Array.from({length:88},(_,i)=>{
 const midi=21+i, octave=Math.floor(midi/12)-1, names=pc[midi%12].map(n=>`${n}${octave}`);
 const lookup=[...names];if(midi===60)lookup.push('B#3');
 return {midi,key_id:`fixture-${midi}`,color:names.length===1?'white':'black',label_with_octave:names.join(' / '),default_label:pc[midi%12].join(' / '),lookup_spellings:lookup};
});
const layout={layout_id:'88-key-A0-C8',label:'Synthetic test layout',lowest_note:'A0',highest_note:'C8',keys};
const observations=[];
const hint=functionIn('keyPattern',{});
observations.push({id:'P01',status:'REPRODUCED_IN_ISOLATION',title:'Black-key hint uses only the first letter',samples:['C♯4','D♭4','D♯4','F♯4','A♭4'].map(note=>({note,hint:hint(note)})),source:'workspace.tsx:49-58,453-454'});
function startBindings(sharedOption,uiOption){const state={option:uiOption,phase:'start',questions:[],records:[],roundPreset:null};
 const bindings={layout,option:uiOption,phase:'start',questions:[],records:[],roundPreset:null,
 sharedPreset:{status:'valid',preset:model.createPracticePreset(sharedOption,20260916)},
 audio:{cancel(){}},createPracticePreset:model.createPracticePreset,generatePresetPractice:model.generatePresetPractice,
 advancing:{current:false},resetQuestionState(){},emitKeyboardPracticeEvent(){}};
 for(const [setter,field] of Object.entries({setRoundPreset:'roundPreset',setQuestions:'questions',setIndex:'index',setRecords:'records',setIsReview:'isReview',setPhase:'phase'}))bindings[setter]=v=>{state[field]=v;};
 return {state,bindings};}
for(const [sharedOption,uiOption] of [['natural-c4-c5','black-c4-c5'],['black-c4-c5','natural-c4-c5']]){
 const {state,bindings}=startBindings(sharedOption,uiOption);functionIn('startPractice',bindings)();
 const disabledTargets=state.questions.filter(t=>{const key=keys.find(k=>k.midi===t.midi);return uiOption==='black-c4-c5'?key.color!=='black':key.color!=='white';});
 observations.push({id:'P02',status:'REPRODUCED_IN_ISOLATION',sharedOption,changedVisibleOption:uiOption,generatedPreset:state.roundPreset,generatedTargets:state.questions,disabledTargetCount:disabledTargets.length,total:state.questions.length,source:'workspace.tsx:278-294,415,446'});
}
{
 const calls=[];const target={midi:60,label:'C4'};const b={audio:{cancel(){calls.push('audio.cancel');}},target,resolved:'independent',advancing:{current:false},records:[],index:0,questions:[target,{midi:62,label:'D4'}],savedResult:null,isReview:false,resetQuestionState(){calls.push('resetQuestionState');},setRecords(){calls.push('setRecords');},setIndex(){calls.push('setIndex');},setPhase(){},summarizePractice:model.summarizePractice,emitKeyboardPracticeEvent(){}};
 functionIn('nextQuestion',b)();observations.push({id:'P03',status:'REPRODUCED_IN_ISOLATION',title:'Next question does not invoke audio cancellation',calls,source:'workspace.tsx:328-342'});
}
{
 const state={savedResult:[{target:{midi:60,label:'C4'},kind:'independent'}]};
 const b={audio:{cancel(){}},sharedPreset:{status:'none',preset:null},resetQuestionState(){}};
 for(const [setter,field] of Object.entries({setPhase:'phase',setQuestions:'questions',setRecords:'records',setSavedResult:'savedResult',setRoundPreset:'roundPreset',setIsReview:'isReview'}))b[setter]=v=>{state[field]=v;};
 functionIn('leavePractice',b)();observations.push({id:'P04',status:'REPRODUCED_IN_ISOLATION',title:'Existing leave handler also clears original result while reviewing',result:state,source:'workspace.tsx:350-358,466-470'});
}
{
 const selected=keys.find(k=>k.midi===60),original=resolution.resolveLookup('B#3',layout);
 let copied;const b={selected,layout,selectPianoKey:resolution.selectPianoKey,lookupShareParams:resolution.lookupShareParams,buildShareURL:(p,q)=>`https://example.test${p}?${q}`,copyShareURL:async u=>{copied=u;return true;},setCopyMessage(){}};
 await functionIn('copyNoteLink',b)();observations.push({id:'P05',status:'REPRODUCED_IN_ISOLATION',title:'Note copy discards requested enharmonic spelling',requested:original.selected.requestedSpelling.display,copiedURL:copied,source:'workspace.tsx:164-168'});
}
const output={auditDate:'2026-09-16',method:'Supplied functions extracted with TypeScript AST and executed with controlled bindings. Pure model imported from supplied .ts files. Synthetic Layout fixture, not original layout data. No full app, browser, runtime audio, deployment or current B04 source validated.',observations};
const out=process.argv[3];if(out)fs.writeFileSync(out,JSON.stringify(output,null,2));console.log(JSON.stringify(output,null,2));
