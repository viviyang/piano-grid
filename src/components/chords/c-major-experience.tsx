'use client';

import { Children, isValidElement, Fragment, useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import type { ChordDetailData, ChordPractice, SearchSection } from '@/lib/a-minor-types';
import type { StaffNote } from '@/lib/keyboard-types';
import { ReferenceAudio, type AudioStatus } from '@/lib/a-minor-audio';
import { emptyChordAttempt, toggleChordNote, clearChordAttempt, checkChordAttempt, chordAttemptKind, chordAttemptMessage } from '@/lib/chord-pilot-practice';
import { Button } from '../ui/button';
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from '../ui/collapsible';
import { ChordSectionTitle, ChordTopicIcon } from './page-toc';
import { ShareDialog } from '../keyboard-notes/share-control';
import { StaffDiagram } from '../keyboard-notes/staff-diagram';
import { PageSearch } from '../a-minor/page-search';
import { PrintContext, PrintActions, SelectedVoicingContext, StopPlaybackContext } from '../a-minor/experience';
import { SiteHeader, SiteFooter } from './site-chrome';
import { KeyboardViewport } from './keyboard-viewport';
import { PrintVoicing } from './print-voicing';
import './c-major-pilot.css';
import './piano-surface.css';

type Props = {
  data: ChordDetailData; heading: ReactNode; toolNotes: ReactNode; introduction: ReactNode;
  children: ReactNode; searchSections: SearchSection[]; practice: ChordPractice;
  fingering: ReactNode; staffByVoicing: Record<string, StaffNote[]>;
};
const noteNames = ['C','C♯ / D♭','D','D♯ / E♭','E','F','F♯ / G♭','G','G♯ / A♭','A','A♯ / B♭','B'];

export function CmajorExperience({ data, heading, toolNotes, introduction, children, searchSections, practice, fingering, staffByVoicing }: Props) {
  const [ready,setReady]=useState(false), [position,setPosition]=useState(data.defaultId);
  const [mode,setMode]=useState<'reference'|'practice'>('reference'), [started,setStarted]=useState(false);
  const [attempt,setAttempt]=useState(emptyChordAttempt);
  const [panels,setPanels]=useState<Record<string,boolean>>({notice:true,compare:true,fingering:true,theory:true});
  const openPanel=(id:string)=>setPanels(value=>({...value,[id]:true}));
  const [share,setShare]=useState(false);
  const settingsPanel=useRef<HTMLDivElement>(null);
  const [volume,setVolume]=useState(67), [labels,setLabels]=useState(true), [sustain,setSustain]=useState(false);
  const [sounding,setSounding]=useState<number[]>([]), [pressed,setPressed]=useState<number[]>([]);
  const [audio,setAudio]=useState<{state:AudioStatus;message:string;scheduled?:boolean}>({state:'idle',message:''});
  const [printId,setPrintId]=useState<string|null>(null), [printError,setPrintError]=useState('');
  const player=useRef<ReferenceAudio|null>(null), holders=useRef(new Map<string,number>());
  const settingsTrigger=useRef<HTMLButtonElement>(null), shareTrigger=useRef<HTMLButtonElement>(null);
  const workspace=useRef<HTMLElement>(null), currentPosition=useRef(position), printSnapshot=useRef<string|null>(null);
  const positionSettings=useCallback(()=>{
    const trigger=settingsTrigger.current,popover=settingsPanel.current;
    if(!trigger||!popover||!popover.matches(':popover-open'))return;
    const rect=trigger.getBoundingClientRect(),width=popover.offsetWidth,height=popover.offsetHeight;
    const top=rect.bottom+8+height<=window.innerHeight-16?rect.bottom+8:rect.top-height-8;
    popover.style.left=`${Math.max(16,Math.min(rect.left,window.innerWidth-width-16))}px`;
    popover.style.top=`${Math.max(16,Math.min(top,window.innerHeight-height-16))}px`;
  },[]);
  useEffect(()=>{
    window.addEventListener('resize',positionSettings);window.addEventListener('scroll',positionSettings,true);
    return()=>{window.removeEventListener('resize',positionSettings);window.removeEventListener('scroll',positionSettings,true);};
  },[positionSettings]);
  const voicing=data.voicings.find(item=>item.voicing_id===position)!;
  const printed=data.voicings.find(item=>item.voicing_id===(printId||position))!;
  const root=data.voicings.find(item=>item.voicing_id===data.defaultId)!;
  const answer=root.notes_low_to_high.map(note=>note.midi);
  const inPractice=mode==='practice';
  const stop=useCallback(()=>{
    holders.current.clear();setPressed([]);player.current?.cancel('Playback stopped.','stopped');
  },[]);
  useEffect(()=>{
    const engine=new ReferenceAudio((state,message,playbackMode)=>setAudio({state,message,scheduled:!!playbackMode}),setSounding,data.microcopy);
    player.current=engine;setReady(true);if(!engine.available)engine.cancel();
    const hide=()=>{if(document.hidden)stop();};
    window.addEventListener('blur',stop);window.addEventListener('pagehide',stop);document.addEventListener('visibilitychange',hide);
    return()=>{engine.dispose();player.current=null;holders.current.clear();window.removeEventListener('blur',stop);window.removeEventListener('pagehide',stop);document.removeEventListener('visibilitychange',hide);};
  },[data.microcopy,stop]);
  useEffect(()=>{player.current?.setVolume(volume/100);},[volume]);
  useEffect(()=>{player.current?.setSustain(sustain);},[sustain]);
  useEffect(()=>{
    const before=()=>{stop();const id=printSnapshot.current||currentPosition.current;printSnapshot.current=id;flushSync(()=>setPrintId(id));};
    const after=()=>{printSnapshot.current=null;setPrintId(null);};
    window.addEventListener('beforeprint',before);window.addEventListener('afterprint',after);
    return()=>{window.removeEventListener('beforeprint',before);window.removeEventListener('afterprint',after);};
  },[stop]);
  function reference(){
    stop();setMode('reference');requestAnimationFrame(()=>document.querySelector<HTMLButtonElement>('.cp-start-practice')?.focus({preventScroll:true}));
  }
  function enterPractice(){
    stop();setStarted(true);setMode('practice');setAttempt(value=>({...value,viewedReference:true}));
    requestAnimationFrame(()=>document.getElementById('practice')?.focus({preventScroll:true}));
  }
  // Retain existing IDs. Opening an answer-bearing anchor is an explicit reference visit.
  const revealAnchor=useCallback((raw:string)=>{
      let id='';try{id=decodeURIComponent(raw);}catch{return;}
      if(!id)return;
      if(id===`${data.namespace}-print`){stop();requestAnimationFrame(()=>document.getElementById('cp-print-actions')?.scrollIntoView({block:'center'}));return;}
      if(id==='practice'){stop();setStarted(true);setMode('practice');setAttempt(value=>({...value,viewedReference:true}));}
      else if(id!==data.toolId&&id!=='main'){
        if(started)setAttempt(value=>({...value,viewedReference:true}));
        stop();setPanels(value=>({...value,[id.startsWith(`${data.namespace}-fingering`)?'fingering':id.endsWith('-notice')?'notice':id.endsWith('-inversions')?'compare':'theory']:true}));
      }
      requestAnimationFrame(()=>{const target=document.getElementById(id);target?.scrollIntoView({block:'start'});target?.focus({preventScroll:true});});
  },[data.namespace,data.toolId,started,stop]);
  useEffect(()=>{
    const reveal=()=>revealAnchor(window.location.hash.slice(1));
    // Only initial hash and actual hash changes; state updates must not replay navigation.
    if(!ready)reveal();
    window.addEventListener('hashchange',reveal);
    return()=>window.removeEventListener('hashchange',reveal);
  },[ready,revealAnchor]);
  function changePosition(next:string){stop();currentPosition.current=next;setPosition(next);}
  function print(){
    stop();setPrintError('');printSnapshot.current=currentPosition.current;
    flushSync(()=>setPrintId(currentPosition.current));
    try{if(typeof window.print!=='function')throw new Error('Unavailable');window.print();}
    catch{printSnapshot.current=null;setPrintId(null);setPrintError(data.microcopy.print_error);}
  }
  function press(midi:number,source:string){holders.current.set(source,midi);setPressed([...new Set(holders.current.values())]);void player.current?.press(midi,source);}
  function release(source:string){holders.current.delete(source);setPressed([...new Set(holders.current.values())]);player.current?.release(source);}
  const feedback=attempt.result==='unanswered'?undefined:attempt.result==='correct'?'correct':attempt.result==='revealed'?'revealed':'wrong';
  const sections=Children.toArray(children);
  const sectionId=(child:ReactNode)=>isValidElement<{id?:string}>(child)?child.props.id:undefined;
  const featured=[`${data.namespace}-notice`,`${data.namespace}-inversions`];
  const panes=[{id:'notice',label:'What to notice',content:sections.filter(child=>sectionId(child)===featured[0])},{id:'compare',label:'Compare three positions',content:sections.filter(child=>sectionId(child)===featured[1])},{id:'fingering' as const,label:'Root-position fingering examples',content:fingering},{id:'theory' as const,label:'Theory and references',content:<>{introduction}<div className="am-tool-notes">{toolNotes}</div><div className="am-reading">{sections.filter(child=>!featured.includes(sectionId(child)||''))}</div></>}];
  return <PrintContext.Provider value={{ready,print,pdf:data.pdf}}><StopPlaybackContext.Provider value={stop}><SelectedVoicingContext.Provider value={position}>
    <div className={`am-page cp-pilot${inPractice?' cp-practice':''}`} data-selected-voicing={position} data-position={voicing.inversion_label} data-note-count={data.chord.definition.expectedNoteCount} data-family={data.chord.definition.family} onClickCapture={event=>{
      const link=event.target instanceof Element?event.target.closest('a[href^="#"]'):null;
      const hash=link?.getAttribute('href');
      if(hash&&hash===window.location.hash)revealAnchor(hash.slice(1));
    }}>
      <a className="am-skip am-screen" href={`#${data.toolId}`}>Skip to chord tool</a>
      <SiteHeader search={<PageSearch ready={ready} sections={searchSections.filter(section=>section.id!==`${data.namespace}-print`)} onOpen={stop}/>}/>
      <main className="pr-container am-screen" id="main">
        <div className="cp-heading">{heading}</div>
        <div id="cp-print-actions" className="cp-reference-actions"><PrintActions/><Button ref={shareTrigger} variant="ghost" disabled={!ready} onClick={()=>{stop();setShare(true);}}>Share</Button></div>
        <section ref={workspace} className="am-tool cp-workspace" id={data.toolId} data-block-id={data.toolId} data-voicing-id={position} data-audio-state={audio.state} data-mode={mode} tabIndex={-1} aria-labelledby="tool-heading">
          <h2 id="tool-heading" className="pr-sr-only">{data.toolHeading}</h2>
          <div className="cp-reference-summary">
        <dl className="am-summary"><div><dt>{data.chord.name_en}</dt><dd className="am-chord-id">{data.chord.symbol}</dd></div><div><dt>Chord tones</dt><dd className="am-tone-list">{data.chord.note_spellings.map((n,i)=><Fragment key={n}>{i>0&&<span className="am-separator" aria-hidden="true">–</span>}<span>{n}</span></Fragment>)}</dd></div><div><dt>Formula</dt><dd className="am-formula">{data.chord.formula_degrees.map((n,i)=><Fragment key={n}>{i>0&&<span className="am-separator" aria-hidden="true">·</span>}<span>{n}</span></Fragment>)}</dd></div></dl>
        <dl className="am-quick-facts" aria-label="Quick facts"><div><dt><span className="am-fact-icon"><ChordTopicIcon id={`${data.namespace}-intro`}/></span>Notes</dt><dd>{data.chord.note_spellings.join(' · ')}</dd></div><div><dt><span className="am-fact-icon"><ChordTopicIcon id={`${data.namespace}-${data.chord.definition.subtype}`}/></span>Quality</dt><dd>{data.chord.definition.qualityLabel}</dd></div><div><dt><span className="am-fact-icon"><ChordTopicIcon id={`${data.namespace}-inversions`}/></span>Formula</dt><dd>{data.chord.formula_degrees.map(n=>n).join(' · ')}</dd></div><div><dt><span className="am-fact-icon"><ChordTopicIcon id={data.toolId}/></span>Keyboard range</dt><dd>{data.rangeLabel}</dd></div></dl>

            {!inPractice&&<><div className="cp-position-row"><fieldset className="am-position-fieldset" disabled={!ready}><legend>Position</legend><div className="am-positions">{data.options.map(option=><label className="am-radio-label" key={option.value}><input type="radio" name="position" value={option.value} checked={position===option.value} onChange={()=>changePosition(option.value)}/><span className="am-segment">{option.label}</span></label>)}</div></fieldset>
            <div className="cp-current"><span className="am-field-label">{data.microcopy.selected_note_summary}</span><strong id="note-order">{voicing.notes_low_to_high.map(note=>note.display_pitch).join(' – ')}</strong><span id="current-symbol">{voicing.chord_symbol} · Bass: <span id="current-bass">{voicing.bass_spelling}</span></span></div></div>
            <p className="cp-formula">Formula: {data.chord.formula_degrees.join(' · ')} <span>· scale degrees, not finger numbers</span></p></>}
          </div>

          <div className={`cp-instrument${inPractice?' cp-instrument-practice':''}`}>
            <div className="cp-piano-column">
          <KeyboardViewport key={mode} id="keyboard-scroll" voicing={inPractice?root:voicing} whitePitchClasses={data.whitePitchClasses} sounding={sounding} ready={ready} rangeLabel={data.rangeLabel} input={{ready,practice:inPractice,labels,selected:attempt.selected,pressed,feedback,press,release,toggle:midi=>setAttempt(value=>toggleChordNote(value,midi))}}/>
            </div>
            {!inPractice&&<section className="cp-nearby-staff" id="c-major-staff" tabIndex={-1} aria-labelledby="cp-staff-heading">
              <h3 id="cp-staff-heading">Staff notation</h3>
              <StaffDiagram notes={staffByVoicing[position]} selected="" highlightedMidi={sounding} compact/>
              <p>Current pitches, low to high. This is a pitch reference, not a rhythm or hand assignment.</p>
            </section>}
          </div>
          <details className="cp-key-help"><summary>Keyboard help</summary><p>Press and hold a key to play. With a key focused, use Enter or Space; Tab moves to the next control.{inPractice?' Select a note again to remove it. Notes with the same name count as one, regardless of octave.':''}</p></details>
          <div className="cp-toolbar">
            {!inPractice&&<><Button variant="secondary" disabled={!ready||audio.state==='unavailable'} onClick={()=>{stop();void player.current?.play(voicing,'together');}}>Play chord</Button><Button variant="secondary" disabled={!ready||audio.state==='unavailable'} onClick={()=>{stop();void player.current?.play(voicing,'ascending');}}>Play notes one at a time</Button></>}
            <Button variant="secondary" disabled={!ready||(sounding.length===0&&pressed.length===0&&audio.state!=='playing'&&audio.state!=='loading')} onClick={stop}>Stop sound</Button>
            <Button ref={settingsTrigger} variant="ghost" disabled={!ready} popoverTarget="cp-sound-settings" onClick={stop}>Sound settings</Button>
            <Button className="cp-start-practice" disabled={!ready} onClick={inPractice?reference:enterPractice}>{inPractice?'Back to reference':started?'Resume practice':'Start practice'}</Button>
          </div>
          <div className={volume===0||audio.state==='unavailable'||audio.state==='error'?'cp-audio-status':'pr-sr-only'} id="audio-status" role="status" aria-live="polite">{volume===0?'Sound is muted. Visual practice is still available.':audio.state==='unavailable'||audio.state==='error'?`${audio.message} Visual practice is still available.`:audio.scheduled?audio.message:''}</div>
          {!inPractice&&<p className="cp-sound-scope">{data.microcopy.playback_note}</p>}
          <div id="practice" data-block-id="practice" tabIndex={-1} data-practice-state={attempt.result} data-answer-kind={attempt.result==='correct'||attempt.revealed?chordAttemptKind(attempt):undefined}>
            {inPractice&&<p className="cp-practice-prompt">Select three different note names to build C major, then check your answer. Reference material stays available.</p>}
            <h3 id="practice-heading" className="pr-sr-only">{inPractice?'Your selection':practice.heading}</h3>
            {inPractice&&<> 
              <p className="cp-selected">{attempt.selected.length?attempt.selected.map(pc=>noteNames[pc]).join(' · '):'No notes selected'} <span>({attempt.selected.length} / {practice.requiredPitchClassCount} different notes)</span></p>
              <div className="cp-toolbar"><Button disabled={attempt.selected.length<practice.requiredPitchClassCount} onClick={()=>{stop();setAttempt(value=>checkChordAttempt(value,answer));}}>Check answer</Button><Button variant="secondary" onClick={()=>{stop();setAttempt(clearChordAttempt);}}>Clear</Button>{!attempt.revealed&&<Button variant="ghost" disabled={attempt.hinted} onClick={()=>setAttempt(value=>({...value,hinted:true}))}>{attempt.hinted?'Hint shown':'Hint'}</Button>}<Button variant="ghost" onClick={()=>{stop();setAttempt(value=>({...value,selected:answer.map(midi=>midi%12),revealed:true,result:'revealed'}));}}>Show answer</Button></div>
              {attempt.hinted&&!attempt.revealed&&<p className="cp-hint" role="status">Hint: start with C, then skip a white key between each chord tone.</p>}
              {attempt.result==='revealed'?<p>Answer viewed: {data.chord.note_spellings.join(' · ')}.</p>:attempt.revealed&&<p>You viewed the answer earlier. Further attempts on this question remain marked as helped.</p>}
              <p className="cp-result" role="status" aria-live="polite">{chordAttemptMessage(attempt, true)}</p>
              {(attempt.result==='correct'||attempt.result==='revealed')&&<div className="cp-toolbar"><Button variant="secondary" onClick={()=>setAttempt(clearChordAttempt)}>Try again</Button><Button variant="ghost" onClick={()=>{reference();openPanel('theory');}}>Next: explore the chord connections</Button></div>}
            </>}
          </div>
          <noscript><p>The root-position reference and PDF are available. Enable JavaScript to play keys, switch positions or practice.</p><style>{'.cp-pilot .cp-panels .pr-collapsible-content[hidden]{display:block!important}.cp-pilot .cp-panels .pr-collapsible-trigger{display:none}'}</style></noscript>
        </section>
        <div className="cp-panels">{panes.map(item=><Collapsible key={item.id} open={!!panels[item.id]} onOpenChange={open=>{setPanels(value=>({...value,[item.id]:open}));if(open&&inPractice)setAttempt(value=>({...value,viewedReference:true}));}}><h2 className="cp-panel-heading"><CollapsibleTrigger id={`cp-section-${item.id}`}><ChordSectionTitle id={item.id==='compare'?`${data.namespace}-inversions`:item.id==='fingering'?`${data.namespace}-fingering-example`:`${data.namespace}-${item.id}`} text={item.label}/></CollapsibleTrigger></h2><CollapsibleContent aria-labelledby={`cp-section-${item.id}`}>{item.content}</CollapsibleContent></Collapsible>)}</div>
        <p role="status">{printError}</p>
      </main>
      <SiteFooter url={data.url}/>
      <div ref={settingsPanel} id="cp-sound-settings" popover="auto" onToggle={event=>{if(event.newState==='open')positionSettings();}} className="cp-settings-popover" role="dialog" aria-labelledby="cp-settings-title">
        <div className="am-dialog-head"><h2 id="cp-settings-title">Sound settings</h2><Button variant="ghost" popoverTarget="cp-sound-settings" popoverTargetAction="hide" aria-label="Close sound settings">Close</Button></div>
        <div className="cp-settings"><label htmlFor="cp-volume">Volume: {volume}%</label><input id="cp-volume" type="range" min="0" max="100" value={volume} onChange={e=>setVolume(Number(e.target.value))}/>
          <label><input type="checkbox" checked={labels} onChange={e=>setLabels(e.target.checked)}/> Show note names</label>
          <label><input type="checkbox" checked={sustain} onChange={e=>setSustain(e.target.checked)}/> Sustain held notes after release</label><p>Stop sound always silences every note, including sustain.</p>
        </div>
      </div>
      <ShareDialog open={share} onClose={()=>setShare(false)} returnFocusRef={shareTrigger} title="Share C major" description="Share this chord reference. Your practice selections and results stay on this page." url="https://pianogrid.com/chords/c-major"/>
      <article className="am-print-only" id="print-content" data-voicing-id={printed.voicing_id}><PrintVoicing voicing={printed} whitePitchClasses={data.whitePitchClasses} title={data.heading} tones={data.chord.note_spellings} formula={data.chord.formula_degrees} url={data.url} disclaimer={data.printDisclaimer}/></article>
    </div>
  </SelectedVoicingContext.Provider></StopPlaybackContext.Provider></PrintContext.Provider>;
}
