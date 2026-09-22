'use client';
import {useEffect,useRef,useState} from 'react';
import {isPilotDetail,restoreVoicing} from './product-continuation-state';
import type {ChordDetailData} from './a-minor-types';

export function useDetailContinuation(data:ChordDetailData, select:(id:string)=>void, stop:()=>void) {
  const [message,setMessage]=useState('');
  const actions=useRef({select,stop});actions.current={select,stop};
  useEffect(()=>{
    if(!isPilotDetail(data.url))return;
    const restore=()=>{const next=restoreVoicing(location.search,data.chord.id,data.voicings,data.defaultId);actions.current.stop();actions.current.select(next.id);setMessage(next.message);};
    restore();window.addEventListener('popstate',restore);
    return()=>window.removeEventListener('popstate',restore);
  },[data]);
  return message;
}
