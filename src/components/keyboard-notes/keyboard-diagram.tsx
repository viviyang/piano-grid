'use client';
import { useEffect, useRef } from 'react';
import { keyGeometry } from '@/lib/keyboard-geometry';
import type { PianoKey } from '@/lib/keyboard-types';
export function KeyboardDiagram({keys,selected=null,marked=[],sounding=[],onSelect,octaves=true,keyLabels={},label='Piano keyboard',ready=true}:{keys:PianoKey[];selected?:number|null;marked?:number[];sounding?:number[];onSelect?:(k:PianoKey)=>void;octaves?:boolean;keyLabels?:Record<number,string>;label?:string;ready?:boolean}) {
  const ref=useRef<HTMLDivElement>(null),whites=keys.filter(k=>k.color==='white'),leading=keys[0]?.color==='black'?1:0,trailing=keys.at(-1)?.color==='black'?1:0,count=whites.length+leading+trailing;
  useEffect(()=>{const center=()=>{const el=ref.current?.querySelector<HTMLElement>(`[data-midi="${selected}"]`);if(el&&ref.current)ref.current.scrollLeft=el.offsetLeft-ref.current.clientWidth/2+el.clientWidth/2;};center();const observer=new ResizeObserver(center);if(ref.current)observer.observe(ref.current);return()=>observer.disconnect();},[selected,keys]);
  return <div ref={ref} className="kn-key-scroll" role="region" aria-label={label} tabIndex={0}>
    <div className="kn-keyboard" style={{width:`${Math.max(count,1)*5.25}rem`}}>
      {keys.map(k=>{const white=k.color==='white',index=leading+whites.filter(w=>w.midi<k.midi).length,labels=(keyLabels[k.midi]??(octaves?k.label_with_octave:k.default_label)).split(' / '),isMarked=marked.includes(k.midi);
        const content=<><span className="kn-key-text">{labels.map(l=><span key={l}>{l}</span>)}</span>{(selected===k.midi||isMarked)&&<span className="kn-selected-mark" aria-hidden="true">●</span>}{k.midi===60&&<span className="kn-middle" aria-hidden="true">C4</span>}</>;
        const cls=`kn-key ${white?'kn-white':'kn-black'} ${isMarked?'kn-marked':''} ${selected===k.midi?'kn-selected':''} ${sounding.includes(k.midi)?'kn-sounding':''}`;
        const accessibleLabel=keyLabels[k.midi]??k.label_with_octave;
        return onSelect?<button key={k.midi} type="button" data-midi={k.midi} className={cls} style={keyGeometry(index,white,count)} aria-label={accessibleLabel} aria-pressed={selected===k.midi} disabled={!ready} onClick={()=>onSelect(k)} onKeyDown={e=>{const i=keys.indexOf(k);const n=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:e.key==='Home'?0:e.key==='End'?keys.length-1:null;if(n!==null){e.preventDefault();ref.current?.querySelector<HTMLButtonElement>(`button[data-midi="${keys[Math.max(0,Math.min(keys.length-1,n))].midi}"]`)?.focus();}}}>{content}</button>:<span key={k.midi} data-midi={k.midi} className={cls} style={keyGeometry(index,white,count)} aria-label={accessibleLabel}>{content}</span>;
      })}
    </div>
  </div>;
}

