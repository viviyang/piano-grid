'use client';
import { useEffect, useRef, useState } from 'react';
import type { SearchSection } from '@/lib/a-minor-types';
import { Dialog, DialogClose } from '@/components/ui/dialog';
import { Icon } from './icon';

export function PageSearch({sections,ready,onOpen}:{sections:SearchSection[];ready:boolean;onOpen:()=>void}) {
  const input=useRef<HTMLInputElement>(null), trigger=useRef<HTMLButtonElement>(null);
  const pendingSection=useRef<string|null>(null);
  const [open,setOpen]=useState(false);
  const [query,setQuery]=useState('');
  const results=sections.filter(s=>!query.trim()||s.text.toLowerCase().includes(query.trim().toLowerCase()));

  useEffect(() => {
    if (open) return;
    const id = pendingSection.current;
    if (!id) return;
    pendingSection.current = null;
    requestAnimationFrame(() => document.getElementById(id)?.focus({preventScroll:true}));
  }, [open]);

  return <>
    <button type="button" ref={trigger} className="am-search-trigger" hidden={!ready} aria-label="Search this page" aria-haspopup="dialog" onClick={()=>{onOpen();setOpen(true);}}><Icon name="search"/><span>Search this page</span></button>
    <Dialog open={open} onClose={()=>setOpen(false)} returnFocusRef={trigger} initialFocusRef={input} labelledBy="search-title" id="page-search">
      <div className="am-dialog-head"><h2 id="search-title">Search this page</h2><DialogClose aria-label="Close search"><Icon name="close"/></DialogClose></div>
      <label htmlFor="page-search-input" className="am-search-label">Find notes, inversions, or an explanation on this page</label>
      <input ref={input} id="page-search-input" className="am-search-input" type="search" autoComplete="off" placeholder="For example: inversions" value={query} onChange={e=>setQuery(e.target.value)}/>
      <div className="am-search-status" role="status">{results.length?`${results.length} sections on this page`:'No matching section on this page.'}</div>
      <div className="am-search-results">{results.map(s=><a key={s.id} href={`#${s.id}`} className="am-search-result" onClick={()=>{pendingSection.current=s.id;setOpen(false);}}>{s.heading}</a>)}</div>
    </Dialog>
  </>;
}
