'use client';
import { useRef, useState } from 'react';
import type { SearchSection } from '@/lib/a-minor-types';
import { Icon } from './icon';

export function PageSearch({sections,ready,onOpen}:{sections:SearchSection[];ready:boolean;onOpen:()=>void}) {
  const dialog=useRef<HTMLDialogElement>(null), input=useRef<HTMLInputElement>(null), trigger=useRef<HTMLButtonElement>(null);
  const [query,setQuery]=useState('');
  const results=sections.filter(s=>!query.trim()||s.text.toLowerCase().includes(query.trim().toLowerCase()));
  function close() { dialog.current?.close(); trigger.current?.focus(); }
  return <>
    <button type="button" ref={trigger} className="am-search-trigger" hidden={!ready} aria-label="Search this page" aria-haspopup="dialog" onClick={()=>{onOpen();dialog.current?.showModal();input.current?.focus();}}><Icon name="search"/><span>Search this page</span></button>
    <dialog ref={dialog} id="page-search" aria-labelledby="search-title" onCancel={e=>{e.preventDefault();close();}} onKeyDownCapture={e=>{if(e.key==='Escape'){e.preventDefault();e.stopPropagation();close();}}} onClick={e=>{if(e.target===dialog.current){const r=dialog.current.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)close();}}}>
      <div className="am-dialog-head"><h2 id="search-title">Search this page</h2><button type="button" className="am-button am-tertiary" aria-label="Close search" onClick={close}><Icon name="close"/></button></div>
      <label htmlFor="page-search-input" className="am-search-label">Find notes, inversions, or an explanation on this page</label>
      <input ref={input} id="page-search-input" className="am-search-input" type="search" autoComplete="off" placeholder="For example: inversions" value={query} onChange={e=>setQuery(e.target.value)}/>
      <div className="am-search-status" role="status">{results.length?`${results.length} sections on this page`:'No matching section on this page.'}</div>
      <div className="am-search-results">{results.map(s=><a key={s.id} href={`#${s.id}`} className="am-search-result" onClick={()=>{dialog.current?.close();requestAnimationFrame(()=>document.getElementById(s.id)?.focus({preventScroll:true}));}}>{s.heading}</a>)}</div>
    </dialog>
  </>;
}
