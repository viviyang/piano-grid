'use client';
import { createContext, Fragment, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { flushSync } from 'react-dom';
import { cn } from '@/lib/utils';
import { ReferenceAudio, type AudioStatus } from '@/lib/a-minor-audio';
import type { AMData, PlaybackMode, SearchSection } from '@/lib/a-minor-types';
import { KeyboardViewport } from '../chords/keyboard-viewport';
import { PrintVoicing } from '../chords/print-voicing';
import { Icon } from './icon';
import { PageSearch } from './page-search';
import { SiteHeader, SiteFooter } from '../chords/site-chrome';
import { PlaybackControls } from '../chords/playback-controls';

const PrintContext=createContext({ready:false,print:()=>{},pdf:{url:'',label:''}});
const SelectedVoicingContext=createContext<string|null>(null);

export function InversionRow({voicingId,position,cells}:{voicingId:string;position:string;cells:string[]}) {
  const selectedVoicingId=useContext(SelectedVoicingContext);
  const isCurrent=selectedVoicingId===voicingId;
  return <tr data-voicing-id={voicingId} data-position={position} aria-current={isCurrent?'true':undefined}>
    <td><span className="am-current-row-mark" aria-hidden="true"/>{cells[0]}{isCurrent&&<span className="pr-sr-only">, current selection</span>}</td>
    <td>{cells[1]}</td><td className="am-pitch-cell">{cells[2]}</td><td>{cells[3]}</td>
  </tr>;
}
export function PrintActions({section=false}:{section?:boolean}) {
  const {ready,print,pdf}=useContext(PrintContext);
  return <div className={section?'am-section-actions':'am-print-actions'}>
    {section&&<a className="am-button am-tertiary" href={pdf.url} download><Icon name="download"/><span>{pdf.label}</span></a>}
    <button type="button" className="am-button am-tertiary am-print" data-print-current disabled={!ready} onClick={print}><Icon name="print"/><span>Print this position</span></button>
    {!section&&<a className="am-button am-tertiary" href={pdf.url} download><Icon name="download"/><span>{pdf.label}</span></a>}
  </div>;
}

export function AMinorExperience({data,heading,toolNotes,introduction,children,searchSections}:{data:AMData;heading:ReactNode;toolNotes:ReactNode;introduction:ReactNode;children:ReactNode;searchSections:SearchSection[]}) {
  const [selectedVoicingId,setSelected]=useState(data.defaultId);
  const selected=useRef(data.defaultId);
  const [ready,setReady]=useState(false);
  const [audio,setAudio]=useState<{state:AudioStatus;message:string;mode:PlaybackMode|null}>({state:'idle',message:'',mode:null});
  const [sounding,setSounding]=useState<number[]>([]), [announcement,setAnnouncement]=useState('');
  const player=useRef<ReferenceAudio|null>(null);
  const printSnapshot=useRef<string|null>(null);
  const [printId,setPrintId]=useState<string|null>(null), [printError,setPrintError]=useState('');
  const voicing=data.voicings.find(v=>v.voicing_id===selectedVoicingId)!;
  const printed=data.voicings.find(v=>v.voicing_id===(printId||selectedVoicingId))!;
  useEffect(()=>{
    const audioPlayer=new ReferenceAudio((state,message,mode)=>setAudio({state,message,mode}),setSounding,data.microcopy);
    player.current=audioPlayer;setReady(true);
    if(!audioPlayer.available)audioPlayer.cancel();
    const hide=()=>{if(document.hidden)audioPlayer.cancel('Playback stopped.','stopped');};
    const leave=()=>audioPlayer.cancel('', 'idle', false);
    document.addEventListener('visibilitychange',hide);window.addEventListener('pagehide',leave);
    return ()=>{audioPlayer.dispose();player.current=null;document.removeEventListener('visibilitychange',hide);window.removeEventListener('pagehide',leave);};
  },[data.microcopy]);
  useEffect(()=>{
    const before=()=>{player.current?.cancel();const id=printSnapshot.current||selected.current;printSnapshot.current=id;flushSync(()=>setPrintId(id));};
    const after=()=>{printSnapshot.current=null;setPrintId(null);};
    window.addEventListener('beforeprint',before);window.addEventListener('afterprint',after);
    return ()=>{window.removeEventListener('beforeprint',before);window.removeEventListener('afterprint',after);};
  },[]);
  function change(id:string) {
    const v=data.voicings.find(v=>v.voicing_id===id);if(!v)return;
    player.current?.cancel();selected.current=id;setSelected(id);
    setAnnouncement(`${v.inversion_label}. ${v.chord_symbol}. ${data.microcopy.selected_note_summary}: ${v.notes_low_to_high.map(n=>n.display_pitch).join(', ')}. Bass: ${v.bass_spelling}.`);
  }
  function print() {
    player.current?.cancel();setPrintError('');printSnapshot.current=selected.current;
    flushSync(()=>setPrintId(selected.current));
    try { if(typeof window.print!=='function')throw new Error('Print unavailable');window.print(); }
    catch {printSnapshot.current=null;setPrintId(null);setPrintError(data.microcopy.print_error);}
  }
  const notes=voicing.notes_low_to_high;
  return <PrintContext.Provider value={{ready,print,pdf:data.pdf}}><SelectedVoicingContext.Provider value={selectedVoicingId}><div className="am-page" data-selected-voicing={selectedVoicingId} data-position={voicing.inversion_label}>
    <a className="am-skip am-screen" href={`#${data.toolId}`}>Skip to chord tool</a>
    <SiteHeader search={<PageSearch ready={ready} sections={searchSections} onOpen={()=>player.current?.cancel()}/>}/>
    <main className="pr-container am-screen" id="main">{heading}
      <section className="am-tool" id={data.toolId} data-block-id={data.toolId} data-voicing-id={selectedVoicingId} data-audio-state={audio.state} tabIndex={-1} aria-labelledby="tool-heading">
        <h2 className="pr-sr-only" id="tool-heading">{data.toolHeading}</h2>
        <dl className="am-summary"><div><dt>{data.chord.name_en}</dt><dd className="am-chord-id">{data.chord.symbol}</dd></div><div><dt>Chord tones</dt><dd className="am-tone-list">{data.chord.note_spellings.map((n,i)=><Fragment key={n}>{i>0&&<span className="am-separator" aria-hidden="true">–</span>}<span>{n}</span></Fragment>)}</dd></div><div><dt>Formula</dt><dd className="am-formula">{data.chord.formula_degrees.map((n,i)=><Fragment key={n}>{i>0&&<span className="am-separator" aria-hidden="true">·</span>}<span>{n.replace('b','♭')}</span></Fragment>)}</dd></div></dl>
        <div className="am-select-result"><fieldset className="am-position-fieldset" disabled={!ready}><legend>Position</legend><div className="am-positions">{data.options.map(o=><label className="am-radio-label" key={o.value}><input type="radio" name="position" value={o.value} checked={selectedVoicingId===o.value} onChange={()=>change(o.value)}/><span className="am-segment">{o.label}</span></label>)}</div></fieldset><div className="am-current-result"><div><div className="am-field-label">{data.microcopy.selected_note_summary}</div><div className="am-note-order" id="note-order" aria-label={`${data.microcopy.selected_note_summary}: ${notes.map(n=>n.display_pitch).join(', ')}`}>{notes.map((n,i)=><Fragment key={n.midi}>{i>0&&<span className="am-separator" aria-hidden="true">–</span>}<span data-midi={n.midi} className={cn('am-pitch',sounding.includes(n.midi)&&'am-sounding')}>{n.display_pitch}</span></Fragment>)}</div></div><div className="am-current-symbol"><strong id="current-symbol">{voicing.chord_symbol}</strong><div>Bass: <span id="current-bass">{voicing.bass_spelling}</span></div></div></div></div>
        <KeyboardViewport id="keyboard-scroll" voicing={voicing} whitePitchClasses={data.whitePitchClasses} sounding={sounding} ready={ready} rangeLabel={data.rangeLabel}/>
        <div className="am-controls"><div className="am-control-bar"><PlaybackControls ready={ready} state={audio.state} mode={audio.mode} onPlay={mode=>void player.current?.play(voicing,mode)} onStop={()=>player.current?.cancel('Playback stopped.','stopped')}/><PrintActions/></div><div className="am-playback-feedback"><span>{data.microcopy.playback_note}</span><div className={cn('am-playback-status',['error','unavailable'].includes(audio.state)&&'am-error')} id="audio-status" role="status" aria-live="polite" aria-atomic="true">{audio.message}</div></div><div className="am-resource-feedback" role="status">{printError}</div></div>
        <noscript><p className="am-nojs-note">JavaScript is off. The root-position diagram, comparison table, explanations, and PDF remain available. Enable JavaScript to switch positions or play sound.</p></noscript>
        <div className="am-tool-notes">{toolNotes}</div>
      </section>
      <div className="pr-sr-only" role="status" aria-live="polite" aria-atomic="true">{announcement}</div>
      {introduction}<div className="am-reading">{children}</div>
    </main>
    <SiteFooter url={data.url}/>
    <article className="am-print-only" id="print-content" data-voicing-id={printed.voicing_id}><PrintVoicing voicing={printed} whitePitchClasses={data.whitePitchClasses} title={data.heading} tones={data.chord.note_spellings} formula={data.chord.formula_degrees} url={data.url} disclaimer={data.printDisclaimer}/></article>
  </div></SelectedVoicingContext.Provider></PrintContext.Provider>;
}
