/* Isolated source-handler probes. NOT React DOM, browser audio or full repository tests. */
const fs=require('fs'),path=require('path'),vm=require('vm');
const root=process.env.PIANOGRID_HANDOFF_ROOT || process.argv[2];
if(!root){console.error('Usage: node probe.cjs <path-to-extracted-handoff> (requires TypeScript; set TYPESCRIPT_PATH if needed)');process.exit(2);}
const projectRequire=require('node:module').createRequire(path.join(path.resolve(root),'package.json'));
let ts; try { ts=process.env.TYPESCRIPT_PATH ? require(process.env.TYPESCRIPT_PATH) : projectRequire('typescript'); } catch(e) { console.error('TypeScript is required in the repository, or specify TYPESCRIPT_PATH.'); process.exit(2); }
let current; const events=[];
class H {
 constructor(fn,props){this.fn=fn;this.props=props;this.slots=[];this.effects=[];this.dirty=true;}
 render(){current=this;this.i=0;this.effects=[];this.dirty=false;this.tree=this.fn(this.props);current=null;for(const e of this.effects)e();return this.tree;}
 flush(){let n=0;do{this.render();if(++n>25)throw Error('render loop')}while(this.dirty);return this.tree;}
}
const react={
 useState(initial){const h=current,i=h.i++;if(!h.slots[i])h.slots[i]={value:typeof initial==='function'?initial():initial};return [h.slots[i].value,v=>{const value=typeof v==='function'?v(h.slots[i].value):v;if(!Object.is(value,h.slots[i].value)){h.slots[i].value=value;h.dirty=true;}}];},
 useRef(value){const h=current,i=h.i++;return (h.slots[i]??=( {current:value}));},
 useId(){const h=current,i=h.i++;return `audit-${i}`;},
 useEffect(fn,deps){const h=current,i=h.i++,old=h.slots[i];if(!old||!deps||deps.some((v,j)=>!Object.is(v,old.deps[j]))){h.slots[i]={deps};h.effects.push(fn);}},
 useMemo(fn,deps){const h=current,i=h.i++,old=h.slots[i];if(!old||deps.some((v,j)=>!Object.is(v,old.deps[j])))h.slots[i]={deps,value:fn()};return h.slots[i].value;},
};
const jsx=(type,props)=>({type,props:props||{}});
const element={jsx,jsxs:jsx,Fragment:'fragment'};
const named=n=>Object.defineProperty(function(){},'name',{value:n});
const empty=n=>new Proxy({},{get:(_,k)=>named(String(k))});
const imports={react,'react/jsx-runtime':element,'@/lib/keyboard-events':{emitKeyboardPracticeEvent:(...a)=>events.push(a)},'@/lib/hear-the-difference-events':{emitHearEvent:(...a)=>events.push(a)}};
function load(file,extra=''){
 const code=ts.transpileModule(fs.readFileSync(file,'utf8')+'\n'+extra,{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022,jsx:ts.JsxEmit.ReactJSX}}).outputText;
 const mod={exports:{}};
 function req(id){if(id.endsWith('.css'))return {};if(id in imports)return imports[id];if(id.includes('keyboard-resolution'))return {displayNote:s=>s.replaceAll('#','♯').replaceAll('b','♭'),parseNoteInput:s=>{const m=/^([A-G])([#b♯♭]?)(-?\d+)$/.exec(s);return m?{letter:m[1],accidental:m[2].replace('♯','#').replace('♭','b')||null,octave:+m[3]}:null;},resolveLookup:()=>({status:'selected',selected:null,candidates:[]}),restoreLookup:()=>({resolution:null})};return empty(id);}
 new Function('require','module','exports',code)(req,mod,mod.exports);return mod.exports;
}
global.window={location:{search:'',hash:'#note-trainer',origin:'https://pianogrid.com'},history:{replaceState(){}},matchMedia:()=>({matches:false,addEventListener(){},removeEventListener(){}}),addEventListener(){},removeEventListener(){}};
global.document={hidden:false};
const core=load(path.join(root,'src/lib/hear-the-difference-core.ts'));
imports['@/lib/hear-the-difference-core']=core;
const practice=load(path.join(root,'src/lib/keyboard-practice.ts'));
imports['@/lib/keyboard-practice']=practice;
imports['@/lib/keyboard-viewport']=load(path.join(root,'src/lib/keyboard-viewport.ts'));
const noteAudio={ready:true,state:'playing',message:'',sounding:[],cancel(){events.push(['cancelNote'])},play(){}};
imports['./use-note-audio']={useNoteAudio:()=>noteAudio};
const workspace=load(path.join(root,'src/components/keyboard-notes/keyboard-notes-workspace.tsx'),'export { ExploreNotes, PracticeNotes };');
const pairs=core.HEAR_PAIR_ORDER.map(id=>({id,root:id.toUpperCase(),answer:'middle',minorNotes:[{midi:57},{midi:60},{midi:64}],majorNotes:[{midi:57},{midi:61},{midi:64}],sourceThird:{midi:60},targetThird:{midi:61},minorName:'A minor',majorName:'A major'}));
const pending=[];const audio={ready:true,state:'idle',phase:'idle',sounding:[],message:'',playComparison(){audio.phase='chord1';return new Promise(resolve=>pending.push(resolve))},playSide(){return Promise.resolve(true)},stop(){audio.phase='idle'},resetPhase(){audio.phase='idle'}};
imports['./use-comparison-audio']={useComparisonAudio:()=>audio};
const exp=load(path.join(root,'src/components/hear-the-difference/experience.tsx'));
function walk(n,out=[]){if(n===null||n===undefined||typeof n==='boolean')return out;if(Array.isArray(n)){n.forEach(x=>walk(x,out));return out}if(typeof n==='object'){out.push(n);walk(n.props.children,out)}return out;}
function text(n){if(!n||typeof n==='boolean')return '';if(Array.isArray(n))return n.map(text).join('');if(typeof n==='object')return text(n.props.children);return String(n);}
function button(h,label){const b=walk(h.tree).find(n=>n.type==='button'&&text(n)===label);if(!b)throw Error('Missing button '+label);return b;}
const results=[];function record(id,result,detail){results.push({id,observed:result,detail})}
(async()=>{
 const layout={layout_id:'88-key-A0-C8',keys:[{midi:21},{midi:108}]};
 const w=new H(workspace.KeyboardNotesWorkspace,{layouts:[layout]});w.flush();
 const tabs=walk(w.tree).find(n=>typeof n.type==='function'&&n.type.name==='ModeTabs');
 record('P01_hash_only_practice_entry',tabs.props.value,'Current component mount with #note-trainer and no practice query leaves active mode explore. Browser scroll behavior was not simulated.');
 const e=new H(workspace.ExploreNotes,{layout,layouts:[layout],active:true,compact:false,blocks:[],links:[],onLayoutChange(){},onPractice(){}});e.flush();events.length=0;walk(e.tree).find(n=>n.type==='form').props.onSubmit({preventDefault(){}});e.flush();record('P02_find_note_cancels_audio',events.some(x=>x[0]==='cancelNote'),'Submitting Find did not invoke useNoteAudio.cancel in this handler isolation.');
 const h=new H(exp.HearTheDifferenceExperience,{pairs,keyboards:Object.fromEntries(pairs.map(p=>[p.id,[]])),initialPair:'a'});h.flush();
 button(h,'Play comparison').props.onClick();h.flush();pending.shift()(true);await Promise.resolve();h.flush();
 button(h,'Low note').props.onClick();h.flush();
 const replay=walk(h.tree).filter(n=>n.type==='button'&&text(n)==='Replay comparison').at(-1);replay.props.onClick();h.flush();
 const show=button(h,'Show answer');record('P03_replay_show_answer_enabled',!show.props.disabled,'Show answer is enabled during a pending comparison after a wrong guess.');show.props.onClick();h.flush();record('P04_phase_before_replay_completion',h.tree.props['data-phase'],'The reveal is visible before pending replay resolves.');
 pending.shift()(true);await Promise.resolve();h.flush();record('P05_phase_after_replay_completion',h.tree.props['data-phase'],'Same current source handler changed reveal back to ready after replay completed. Audio was a controllable test double, not a real device.');
 // SharePanel: error is not cleared when url prop changes while component remains mounted.
 const sh=load(path.join(root,'src/components/keyboard-notes/share-control.tsx'));
 global.navigator={clipboard:{writeText:async()=>{throw Error('denied')}}};
 const panel=new H(sh.SharePanel,{description:'d',url:'https://pianogrid.com/tools/hear-the-difference?pair=a'});panel.flush();await button(panel,'Copy link').props.onClick();await Promise.resolve();panel.flush();
 panel.props={...panel.props,url:'https://pianogrid.com/tools/hear-the-difference?pair=c'};panel.flush();
 record('P06_manual_copy_url_after_pair_change',walk(panel.tree).find(n=>n.type==='textarea')?.props.value,'Failed-copy textarea retains prior pair a after url prop changed to c. Current copy handler would generate new URL if pressed again.');
 // Actual hint helper edge verification; not currently generated by trainer.
 record('P07_white_enharmonic_hint',practice.practiceGeometryHint('B♯3',60),'Helper describes B geometry for physical C4. Optional hardening: current trainer does not generate this spelling.');
 const diff=fs.readFileSync(path.join(root,'FULL.diff'),'utf8');
 record('P08_diff_covers_b04_source',/^diff --git .*hear-the-difference/m.test(diff),'FULL.diff lists only nine tracked paths and has a PowerShell warning preamble; several supplied B04 files are absent from this patch.');
 record('P09_raw_results_in_delivery',fs.existsSync(path.resolve(root,'../checks')),'Manifest refers to external raw JSON paths but the ZIP does not include checks/results JSON.');
 fs.writeFileSync(process.env.PROBE_OUT || path.join(__dirname,'probe-results.json'),JSON.stringify({kind:'isolated-current-source-handlers',limitations:['No full Next repository','No real React DOM layout','Audio and browser globals replaced by explicit test doubles','No claim of production reproduction'],results},null,2));console.log(JSON.stringify(results,null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
