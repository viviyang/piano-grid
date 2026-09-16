'use client';
import { useEffect, useMemo, useRef } from 'react';
import { keyGeometry } from '@/lib/keyboard-geometry';
import type { PianoKey } from '@/lib/keyboard-types';
export type KeyboardKeyRole = 'common' | 'source' | 'target';
export function KeyboardDiagram({keys,selected=null,marked=[],sounding=[],keyRoles={},onSelect,octaves=true,keyLabels={},label='Piano keyboard',ready=true,showVisualLabels=true,selectedState='selected',selectedLabel,fit=false,autoCenter=true,className='',isKeyDisabled}:{keys:PianoKey[];selected?:number|null;marked?:number[];sounding?:number[];keyRoles?:Partial<Record<number,KeyboardKeyRole>>;onSelect?:(k:PianoKey)=>void;octaves?:boolean;keyLabels?:Record<number,string>;label?:string;ready?:boolean;showVisualLabels?:boolean;selectedState?:'selected'|'wrong'|'correct'|'revealed';selectedLabel?:string;fit?:boolean;autoCenter?:boolean;className?:string;isKeyDisabled?:(key:PianoKey)=>boolean}) {
  const ref=useRef<HTMLDivElement>(null),whites=keys.filter(k=>k.color==='white'),leading=keys[0]?.color==='black'?1:0,trailing=keys.at(-1)?.color==='black'?1:0,count=whites.length+leading+trailing;
  const enabledKeys=useMemo(()=>keys.filter(key=>ready&&!isKeyDisabled?.(key)),[keys,ready,isKeyDisabled]);
  useEffect(()=>{if(!autoCenter)return;const center=()=>{const el=ref.current?.querySelector<HTMLElement>(`[data-midi="${selected}"]`);if(el&&ref.current)ref.current.scrollLeft=el.offsetLeft-ref.current.clientWidth/2+el.clientWidth/2;};center();const observer=new ResizeObserver(center);if(ref.current)observer.observe(ref.current);return()=>observer.disconnect();},[selected,keys,autoCenter]);
  return <div ref={ref} className={`kn-key-scroll ${className}`.trim()} role="region" aria-label={label} tabIndex={onSelect?-1:0}>
    <div className="kn-keyboard" style={{width:fit?'100%':`${Math.max(count,1)*5.25}rem`}}>
      {keys.map(k=>{const white=k.color==='white',index=leading+whites.filter(w=>w.midi<k.midi).length,labels=(keyLabels[k.midi]??(octaves?k.label_with_octave:k.default_label)).split(' / '),isMarked=marked.includes(k.midi);
        const isSelected=selected===k.midi,disabled=!ready||Boolean(isKeyDisabled?.(k)),marker=isSelected?(selectedState==='wrong'?'×':selectedState==='correct'||selectedState==='revealed'?'✓':'●'):isMarked?'●':'';
        const content=<>{showVisualLabels&&<span className="kn-key-text">{labels.map(l=><span key={l}>{l}</span>)}</span>}{isSelected&&selectedLabel&&selectedState!=='selected'&&<span className="kn-state-label" aria-hidden="true">{selectedLabel}</span>}{marker&&<span className="kn-selected-mark" aria-hidden="true">{marker}</span>}{showVisualLabels&&k.midi===60&&<span className="kn-middle" aria-hidden="true">C4</span>}</>;
        const role=keyRoles[k.midi];
        const cls=`kn-key ${white?'kn-white':'kn-black'} ${isMarked?'kn-marked':''} ${selected===k.midi?`kn-selected kn-selected-${selectedState}`:''} ${sounding.includes(k.midi)?'kn-sounding':''} ${role?`kn-role kn-role-${role}`:''}`;
        const accessibleLabel=keyLabels[k.midi]??k.label_with_octave;
        return onSelect?<button key={k.midi} type="button" data-midi={k.midi} data-key-state={isSelected?selectedState:'idle'} data-key-role={role||undefined} className={cls} style={keyGeometry(index,white,count)} aria-label={accessibleLabel} aria-pressed={isSelected} aria-invalid={isSelected&&selectedState==='wrong'?true:undefined} disabled={disabled} tabIndex={disabled?-1:isSelected||(!enabledKeys.some(key=>key.midi===selected)&&enabledKeys[0]?.midi===k.midi)?0:-1} onClick={()=>onSelect(k)} onKeyDown={e=>{const i=enabledKeys.findIndex(key=>key.midi===k.midi);const next=e.key==='ArrowRight'?i+1:e.key==='ArrowLeft'?i-1:e.key==='Home'?0:e.key==='End'?enabledKeys.length-1:null;if(next!==null&&enabledKeys.length){e.preventDefault();const target=enabledKeys[Math.max(0,Math.min(enabledKeys.length-1,next))];ref.current?.querySelector<HTMLButtonElement>(`button[data-midi="${target.midi}"]`)?.focus();}}}>{content}</button>:<span key={k.midi} data-midi={k.midi} data-key-role={role||undefined} className={cls} style={keyGeometry(index,white,count)} aria-label={accessibleLabel}>{content}</span>;
      })}
    </div>
  </div>;
}
