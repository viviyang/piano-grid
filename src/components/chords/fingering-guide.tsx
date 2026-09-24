'use client';
import {useContext,useState} from 'react';
import type {Block,ChordSource,FingeringExample} from '@/lib/a-minor-types';
import {SelectedVoicingContext} from '../a-minor/experience';

function noteName(pitch:string){return pitch.replace(/-?\d+$/,'');}

function FingerNumbersDiagram({hand}:{hand:'left'|'right'}) {
 const labels=[{x:36,y:124,n:1},{x:83,y:48,n:2},{x:123,y:30,n:3},{x:164,y:46,n:4},{x:200,y:84,n:5}];
 return <figure className="cp-hand-guide"><svg viewBox="0 0 240 260" role="img" aria-label={`${hand} hand finger numbers: thumb 1, index 2, middle 3, ring 4, little 5. Player’s view.`}>
   <path transform={hand==='left'?'translate(240 0) scale(-1 1)':undefined} d="M71 240 C65 218 45 200 31 177 L14 146 C5 127 28 114 40 130 L62 157 L62 52 C62 22 99 22 99 52 L99 31 C99 1 140 1 140 31 L140 47 C140 17 179 17 179 47 L179 86 C179 61 219 61 219 86 L219 174 C219 206 199 226 196 240 Z" fill="var(--surface)" stroke="var(--foreground)" strokeWidth="2" strokeLinejoin="round"/>
   {labels.map(({x,y,n})=><g key={n}><circle cx={hand==='left'?240-x:x} cy={y} r="14" fill="var(--background)" stroke="var(--primary)"/><text x={hand==='left'?240-x:x} y={y+5} textAnchor="middle" fill="var(--primary)" fontSize="16">{n}</text></g>)}
 </svg><figcaption>Finger numbers: 1 thumb · 2 index · 3 middle · 4 ring · 5 little. This diagram explains numbering; the note-to-finger example below is specific to the selected position.</figcaption></figure>;
}

export function ChordSourceList({sources,hideSourceCodes=false,hideAuditNotes=false}:{sources:ChordSource[];hideSourceCodes?:boolean;hideAuditNotes?:boolean}){
 return <>{sources.map(source=><article key={source.id}><h3><a href={source.url} rel="noreferrer">{source.title}</a></h3><p>{source.publisher}</p><p><strong>Supports:</strong> {source.supports}</p>{hideAuditNotes?null:<p><strong>Scope limit:</strong> {source.limitation}</p>}</article>)}</>;
}

export function FingeringGuide({block,examples,sources,defaultVoicingId,hideSourceCodes=false,hideAuditNotes=false,illustrated=false,bothHands=false}:{block:Block;examples:FingeringExample[];sources:ChordSource[];defaultVoicingId:string;hideSourceCodes?:boolean;hideAuditNotes?:boolean;illustrated?:boolean;bothHands?:boolean}){
 const selectedVoicingId=useContext(SelectedVoicingContext);
 const [hand,setHand]=useState<'right'|'left'>('right');
 const example=examples.find(item=>item.hand===hand&&item.voicingId===selectedVoicingId);
 return <section className="am-content-section ch-fingering" id={block.block_id} data-block-id={block.block_id} data-hand={hand} data-fingering-visible={example?'true':'false'} tabIndex={-1} aria-labelledby={`${block.block_id}-heading`}>
  <div className="ch-section-heading"><div className="ch-section-kicker">Playing example</div><h2 id={`${block.block_id}-heading`}>{block.content.heading}</h2></div>
  <div className="am-content-body ch-learning-panel">
   {block.content.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
   {!bothHands&&<><fieldset className="ch-hand-switch"><legend>Choose one hand</legend><div>
    {(['right','left'] as const).map(value=><label key={value}><input type="radio" name={`${block.block_id}-hand`} checked={hand===value} onChange={()=>setHand(value)}/><span>{value==='right'?'Right hand':'Left hand'}</span></label>)}
   </div></fieldset></>}
   <div className={bothHands?"cp-both-hands":undefined}>{(bothHands?(['left','right'] as const):[hand]).map(shownHand=>{
    const shownExample=examples.find(item=>item.hand===shownHand&&item.voicingId===selectedVoicingId);
    const shownRoot=examples.find(item=>item.hand===shownHand&&item.voicingId===defaultVoicingId)!;
    return <div key={shownHand} data-hand={shownHand}>   {illustrated&&<FingerNumbersDiagram hand={shownHand}/>}
   {shownExample?<div className="ch-fingering-example" role="group" aria-label={`${shownHand} hand fingering for root position`}>
    <div className="ch-fingering-title"><strong>{shownHand==='right'?'Right-hand':'Left-hand'} root position</strong><span>one hand · low to high</span></div>
    <ol className="ch-finger-map" aria-label="Notes and corresponding finger numbers">{shownExample.notes.map((pitch,index)=><li key={pitch}><span className="ch-finger-number" aria-label={`finger ${shownExample.fingers[index]}`}>{shownExample.fingers[index]}</span><span className="ch-finger-line" aria-hidden="true"/><strong>{noteName(pitch)}</strong><small>{pitch}</small></li>)}</ol>
    <p className="ch-fingering-scope">{shownExample.scope} {shownExample.limitation}</p>
   </div>:<div className="ch-fingering-unavailable" role="status"><strong>No verified fingering is shown for this inversion.</strong><p>The root-position {shownHand}-hand example ({shownRoot.notes.map(noteName).join('–')}) remains available when you select Root position. The current chord tones, keyboard, sound, and print selection still follow the inversion above.</p></div>}
</div>;
   })}</div>
   <details className="ch-source-details"><summary>{hideSourceCodes||hideAuditNotes?'Sources':'Sources and scope'}</summary><div>{<ChordSourceList sources={sources} hideSourceCodes={hideSourceCodes} hideAuditNotes={hideAuditNotes}/>}</div></details>
  </div>
 </section>;
}
