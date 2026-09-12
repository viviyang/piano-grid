'use client';
import {useEffect,useMemo,useState} from 'react';
import type {ChordDetailData,ChordPractice} from '@/lib/a-minor-types';

const KEYS=[
 {pc:0,label:'C',black:false},{pc:1,label:'C♯ / D♭',black:true},{pc:2,label:'D',black:false},{pc:3,label:'D♯ / E♭',black:true},
 {pc:4,label:'E',black:false},{pc:5,label:'F',black:false},{pc:6,label:'F♯ / G♭',black:true},{pc:7,label:'G',black:false},
 {pc:8,label:'G♯ / A♭',black:true},{pc:9,label:'A',black:false},{pc:10,label:'A♯ / B♭',black:true},{pc:11,label:'B',black:false},
];
const keyClass:Record<number,string>={0:'c',1:'cs',2:'d',3:'ds',4:'e',5:'f',6:'fs',7:'g',8:'gs',9:'a',10:'as',11:'b'};
const pc=(midi:number)=>((midi%12)+12)%12;

export function ChordBuilderPractice({data,practice}:{data:ChordDetailData;practice:ChordPractice}){
 const [ready,setReady]=useState(false),[selected,setSelected]=useState<number[]>([]),[feedback,setFeedback]=useState<{kind:'success'|'error'|'info';text:string}|null>(null);
 useEffect(()=>setReady(true),[]);
 const root=data.voicings.find(voicing=>voicing.voicing_id===data.defaultId)!;
 const answer=useMemo(()=>root.notes_low_to_high.map(note=>pc(note.midi)),[root]);
 const answerNames=new Map(answer.map((value,index)=>[value,data.chord.note_spellings[index]]));
 const display=(value:number)=>answerNames.get(value)||KEYS.find(key=>key.pc===value)!.label;
 const countWord=practice.requiredPitchClassCount===3?'three':String(practice.requiredPitchClassCount);
 function toggle(value:number){setSelected(current=>current.includes(value)?current.filter(item=>item!==value):[...current,value]);setFeedback(null);}
 function check(){
  if(selected.length===0){setFeedback({kind:'error',text:`No notes selected. Choose the ${countWord} pitch classes in ${data.chord.symbol}, then check again.`});return;}
  const missing=answer.filter(value=>!selected.includes(value)),extra=selected.filter(value=>!answer.includes(value));
  if(!missing.length&&!extra.length){setFeedback({kind:'success',text:`Correct: ${data.chord.symbol} contains ${data.chord.note_spellings.join(', ')}. Octave and selection order do not affect this check.`});return;}
  const parts=[];if(missing.length)parts.push(`Missing: ${missing.map(display).join(', ')}`);if(extra.length)parts.push(`Extra: ${extra.map(display).join(', ')}`);
  setFeedback({kind:'error',text:`Not yet. ${parts.join('. ')}.`});
 }
 function retry(){setSelected([]);setFeedback(null);}
 function show(){setSelected([...answer]);setFeedback({kind:'info',text:`Answer shown: ${data.chord.note_spellings.join(', ')}. This reveal is not recorded as a correct attempt.`});}
 return <section className="am-content-section ch-practice" id="practice" data-block-id="practice" data-practice-state={feedback?.kind||'unanswered'} tabIndex={-1} aria-labelledby="practice-heading">
  <div className="ch-section-heading"><div className="ch-section-kicker">Interactive practice</div><h2 id="practice-heading">{practice.heading}</h2></div>
  <div className="am-content-body ch-learning-panel"><p>{practice.prompt}</p><p>{practice.scope}</p>
   <div className="ch-practice-task"><div><span className="ch-practice-count">{practice.requiredPitchClassCount}</span><strong>Choose {countWord} pitch classes</strong></div><p>One octave, C through B. Select a key again to remove it.</p></div>
   <fieldset className="ch-practice-fieldset" disabled={!ready}><legend className="pr-sr-only">One-octave keyboard from C through B</legend><div className="ch-practice-keyboard">
    {KEYS.map(key=><button key={key.pc} type="button" className={`ch-practice-key ${key.black?'is-black':'is-white'} key-${keyClass[key.pc]}`} aria-label={`${key.label} pitch class`} aria-pressed={selected.includes(key.pc)} onClick={()=>toggle(key.pc)}><span>{key.label}</span></button>)}
   </div></fieldset>
   <div className="ch-current-selection"><strong>Selected:</strong> <span>{selected.length?selected.map(display).join(' · '):'none'}</span></div>
   <div className="ch-practice-actions"><button className="am-button am-primary" type="button" disabled={!ready} onClick={check}>Check answer</button><button className="am-button am-secondary" type="button" disabled={!ready} onClick={retry}>Try again</button><button className="am-button am-tertiary" type="button" disabled={!ready} onClick={show}>Show answer</button></div>
   <div className={`ch-practice-feedback${feedback?` is-${feedback.kind}`:''}`} role="status" aria-live="polite" aria-atomic="true">{feedback?.text||'Your result will appear here after you check the selected keys.'}</div>
   <noscript><details className="ch-static-answer"><summary>Show the non-interactive answer</summary><p>{data.chord.symbol} uses the pitch classes {data.chord.note_spellings.join(', ')}. JavaScript is required to select keys and receive feedback.</p></details></noscript>
  </div>
 </section>;
}
