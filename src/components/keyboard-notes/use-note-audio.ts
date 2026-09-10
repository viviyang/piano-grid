'use client';
import {useEffect,useRef,useState} from 'react';
import {ReferenceAudio,type AudioStatus} from '@/lib/a-minor-audio';
export function useNoteAudio(){
  const audio=useRef<ReferenceAudio|null>(null),[ready,setReady]=useState(false),[state,setState]=useState<AudioStatus>('idle'),[message,setMessage]=useState(''),[sounding,setSounding]=useState<number[]>([]);
  useEffect(()=>{const a=new ReferenceAudio((s,m)=>{setState(s);setMessage(s==='playing'?'Playing note…':m);},setSounding,{loading:'Preparing sound…',audio_error:'Sound could not start. Try Play note again.',audio_unavailable:'Sound is unavailable in this browser.'});audio.current=a;setReady(true);if(!a.available){setState('unavailable');setMessage('Sound is unavailable in this browser.');}const cancel=()=>a.cancel();const hide=()=>{if(document.hidden)cancel();};window.addEventListener('beforeprint',cancel);document.addEventListener('visibilitychange',hide);return()=>{a.dispose();window.removeEventListener('beforeprint',cancel);document.removeEventListener('visibilitychange',hide);};},[]);
  return {ready,state,message,sounding,cancel:()=>audio.current?.cancel(),play:(midi:number)=>{const e={midi,frequency_hz:440*2**((midi-69)/12),onset_ms:0,duration_ms:1200};void audio.current?.play({playback:{together:[e],ascending:[e]}},'together');}};
}
