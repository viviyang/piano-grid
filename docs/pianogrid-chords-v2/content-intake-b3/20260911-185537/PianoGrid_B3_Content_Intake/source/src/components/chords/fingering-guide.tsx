'use client';
import {useContext,useState} from 'react';
import type {Block,ChordSource,FingeringExample} from '@/lib/a-minor-types';
import {SelectedVoicingContext} from '../a-minor/experience';

function noteName(pitch:string){return pitch.replace(/-?\d+$/,'');}

export function FingeringGuide({block,examples,sources,defaultVoicingId}:{block:Block;examples:FingeringExample[];sources:ChordSource[];defaultVoicingId:string}){
 const selectedVoicingId=useContext(SelectedVoicingContext);
 const [hand,setHand]=useState<'right'|'left'>('right');
 const example=examples.find(item=>item.hand===hand&&item.voicingId===selectedVoicingId);
 const rootExample=examples.find(item=>item.hand===hand&&item.voicingId===defaultVoicingId)!;
 return <section className="am-content-section ch-fingering" id={block.block_id} data-block-id={block.block_id} data-hand={hand} data-fingering-visible={example?'true':'false'} tabIndex={-1} aria-labelledby={`${block.block_id}-heading`}>
  <div className="ch-section-heading"><div className="ch-section-kicker">Playing example</div><h2 id={`${block.block_id}-heading`}>{block.content.heading}</h2></div>
  <div className="am-content-body ch-learning-panel">
   {block.content.paragraphs.map(paragraph=><p key={paragraph}>{paragraph}</p>)}
   <fieldset className="ch-hand-switch"><legend>Choose one hand</legend><div>
    {(['right','left'] as const).map(value=><label key={value}><input type="radio" name={`${block.block_id}-hand`} checked={hand===value} onChange={()=>setHand(value)}/><span>{value==='right'?'Right hand':'Left hand'}</span></label>)}
   </div></fieldset>
   {example?<div className="ch-fingering-example" role="group" aria-label={`${hand} hand fingering for root position`}>
    <div className="ch-fingering-title"><strong>{hand==='right'?'Right-hand':'Left-hand'} root position</strong><span>one hand · low to high</span></div>
    <ol className="ch-finger-map" aria-label="Notes and corresponding finger numbers">{example.notes.map((pitch,index)=><li key={pitch}><span className="ch-finger-number" aria-label={`finger ${example.fingers[index]}`}>{example.fingers[index]}</span><span className="ch-finger-line" aria-hidden="true"/><strong>{noteName(pitch)}</strong><small>{pitch}</small></li>)}</ol>
    <p className="ch-fingering-scope">{example.scope} {example.limitation}</p>
   </div>:<div className="ch-fingering-unavailable" role="status"><strong>No verified fingering is shown for this inversion.</strong><p>The root-position {hand}-hand example ({rootExample.notes.map(noteName).join('–')}) remains available when you select Root position. The current chord tones, keyboard, sound, and print selection still follow the inversion above.</p></div>}
   <details className="ch-source-details"><summary>Sources and scope</summary><div>{sources.map(source=><article key={source.id} id={`${block.block_id}-${source.id.toLowerCase()}`}><h3><a href={source.url} rel="noreferrer">{source.title}</a></h3><p>{source.publisher}</p><p><strong>Supports:</strong> {source.supports}</p><p><strong>Scope limit:</strong> {source.limitation}</p><small>Checked {source.checkedOn} · {source.id}</small></article>)}</div></details>
  </div>
 </section>;
}
