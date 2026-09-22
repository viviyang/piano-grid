'use client';
import { useEffect, useRef, useState, type RefObject } from 'react';
import { sendAnalyticsEvent, type AnalyticsEventValue } from './analytics';
import { createMeasurementSession, createSettler, createPracticeAttempt, isP0Path } from './product-measurement-core';

type Payload = Record<string, AnalyticsEventValue>;
const allowed = new Set(['object_id','result_state','selected_count','match_count','mode','outcome','assisted','target','match_kind','attempt','hand','direction','status','context_id','relation','task_id']);
// A wire event represents one fact. Legacy domain events are not re-emitted as aliases.
export function emitPilotEvent(name:string, properties:Payload={}) {
  if(typeof window==='undefined'||!isP0Path(window.location.pathname))return;
  const safe:Payload={measurement_version:'p0-v1',page_path:window.location.pathname};
  for(const [key,value] of Object.entries(properties))if(allowed.has(key))safe[key]=value;
  try { const externallySent=sendAnalyticsEvent(name,safe);window.dispatchEvent(new CustomEvent('pianogrid:product-event',{detail:{name,properties:safe,externallySent}})); } catch { /* Measurement must not break the task. */ }
}

// One mounted task/reference owns a logical view; rerenders and listener reinstalls retain it.
export function useResultExposure(ref:RefObject<HTMLElement|null>, objectId:string, resultState='reference', enabled=true) {
  const session=useRef(createMeasurementSession());
  const latest=useRef({objectId,resultState});latest.current={objectId,resultState};
  useEffect(()=>{
    if(!isP0Path(window.location.pathname)||!enabled||!ref.current||typeof IntersectionObserver==='undefined')return;
    const element=ref.current,key=`${objectId}:${resultState}`;
    let active=true;
    const observer=new IntersectionObserver(entries=>{
      const style=getComputedStyle(element);
      if(active&&entries.some(entry=>entry.isIntersecting&&entry.intersectionRatio>=0.1)&&document.visibilityState==='visible'&&element.getClientRects().length&&style.visibility!=='hidden'&&style.opacity!=='0'&&session.current.once(`seen:${key}`))emitPilotEvent('p0_result_seen',{object_id:objectId,result_state:resultState});
    },{threshold:0.1});
    observer.observe(element);
    const visibility=()=>{observer.unobserve(element);observer.observe(element);};
    document.addEventListener('visibilitychange',visibility);
    return()=>{active=false;observer.disconnect();document.removeEventListener('visibilitychange',visibility);};
  },[ref,objectId,resultState,enabled]);
  useEffect(()=>{
    if(!isP0Path(window.location.pathname)||!ref.current)return;
    // Scope to this task's containing main, excluding header/footer navigation.
    const main=ref.current.closest('main');
    const click=(event:Event)=>{
      const link=event.target instanceof Element?event.target.closest('a[href]'):null;
      if(!link||!main?.contains(link))return;
      const url=new URL(link.getAttribute('href')!,window.location.href);
      const {objectId,resultState}=latest.current,key=`${objectId}:${resultState}`;
      if(url.origin!==location.origin)return;
      const legacyScale=window.location.pathname==='/scales/c-major';
      if(link.hasAttribute('download')||url.pathname.endsWith('.pdf')){if(!legacyScale)emitPilotEvent('p0_download_request',{object_id:objectId,target:url.pathname});return;}
      if(url.pathname===location.pathname&&!url.hash)return;
      const relation=link.getAttribute('data-relation');const context=url.searchParams.get('pg-context')==='c-major'?'c-major':null;
      if(!legacyScale)emitPilotEvent('p0_next_step_click',{object_id:objectId,result_state:resultState,target:url.pathname,context_id:context,relation:relation&&['practice','context','scale','compare','browse','identify','chord'].includes(relation)?relation:null});
      if(session.current.engage(key))emitPilotEvent('p0_result_engaged',{object_id:objectId,result_state:resultState});
    };
    main?.addEventListener('click',click);return()=>main?.removeEventListener('click',click);
  },[ref]);
}

export function useStableToolResult(fingerprint:string, selectedCount:number, matchCount:number, interacted:boolean) {
  const counted=useRef(new Set<string>());
  const [settled,setSettled]=useState('');
  useEffect(()=>{
    if(!interacted||selectedCount<2||!isP0Path(window.location.pathname))return;
    const settler=createSettler((callback,ms)=>window.setTimeout(callback,ms),id=>window.clearTimeout(id as number|undefined));
    settler.update(()=>{
      setSettled(fingerprint);
      if(counted.current.has(fingerprint))return;counted.current.add(fingerprint);
      emitPilotEvent(matchCount?'p0_tool_result':'finder_no_match',{object_id:'chord-finder',result_state:fingerprint,selected_count:selectedCount,match_count:matchCount});
    });
    return()=>settler.cancel();
  },[fingerprint,selectedCount,matchCount,interacted]);
  return settled;
}

export function usePilotAudio(state:string, objectId:string, mode:string|null=null) {
  const previous=useRef('idle');
  useEffect(()=>{if(state==='playing'&&previous.current!=='playing')emitPilotEvent('p0_audio_play',{object_id:objectId,mode:mode??'reference'});previous.current=state;},[state,objectId,mode]);
}
export function usePilotPractice(objectId:string,mode:string) {
  const attempt=useRef(createPracticeAttempt());
  const start=()=>{const number=attempt.current.start();if(number!==null)emitPilotEvent('p0_practice_start',{object_id:objectId,mode,attempt:number});};
  return {start,reveal(){start();attempt.current.reveal();},reset(){attempt.current.reset();},complete(assisted=false){start();const result=attempt.current.complete(assisted);if(result)emitPilotEvent('p0_practice_complete',{object_id:objectId,mode,...result});}};
}
