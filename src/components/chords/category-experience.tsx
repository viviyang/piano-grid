'use client';
import { useEffect, useState } from 'react';
import type { ChordCategoryModel } from '@/lib/chord-content';
import { SiteHeader, SiteFooter } from './site-chrome';
import { KeyboardViewport } from './keyboard-viewport';
import { PageSearch } from '../a-minor/page-search';
import { RollingText } from '../ui/rolling-text';

export function ChordCategoryExperience({ model, heading, children }:{ model:ChordCategoryModel; heading:React.ReactNode; children:React.ReactNode }) {
  const [root,setRoot]=useState('');
  const [ready,setReady]=useState(false);
  useEffect(()=>setReady(true),[]);
  const visibleCount=root?1:model.items.length;
  const sections=[{id:'category-grid',heading:`${model.quality} chord grid`,text:model.items.map(item=>`${item.name} ${item.tones.join(' ')}`).join(' ')},{id:'category-theory',heading:`About ${model.quality} chords`,text:model.contentBlocks.map(block=>`${block.heading} ${block.body}`).join(' ')}];
  return <div className="am-page ch-category-page" data-quality={model.quality} data-filter-root={root}>
    <a className="am-skip am-screen" href="#category-grid">Skip to chord grid</a>
    <SiteHeader search={<PageSearch sections={sections} ready={ready} onOpen={()=>{}}/>}/>
    <main id="main" className="pr-container am-screen">{heading}
      <section className="ch-category-grid-section" id="category-grid" tabIndex={-1} aria-labelledby="category-grid-heading">
        <div className="ch-category-section-heading"><div><p className="am-eyebrow">Browse by root note</p><h2 id="category-grid-heading">{model.quality==='major'?'Major':'Minor'} chord chart</h2></div><p aria-live="polite">{visibleCount} {visibleCount===1?'chord':'chords'}</p></div>
        <div className="ch-root-chips" role="group" aria-label="Filter by root note">
          <button type="button" aria-pressed={!root} disabled={!ready} onClick={()=>setRoot('')}>All</button>
          {model.items.map(item=><button type="button" key={item.id} aria-pressed={root===item.root} disabled={!ready} onClick={()=>setRoot(item.root)}>{item.root.replaceAll('#','♯').replaceAll('b','♭')}</button>)}
        </div>
        <div className="ch-category-grid">
          {model.items.map(item=><article className="ch-category-card" key={item.id} data-chord-id={item.id} hidden={Boolean(ready&&root&&root!==item.root)}>
            <div className="ch-category-card-heading"><h3>{item.name}</h3><span>{item.voicing.chord_symbol}</span></div>
            <p className="ch-category-tones"><strong>{item.tones.join(' – ')}</strong><span>Formula {item.formula.join('–').replace('b','♭')}</span></p>
            <KeyboardViewport voicing={item.voicing} whitePitchClasses={model.whitePitchClasses} ready={ready} rangeLabel="C3–C5"/>
            <a className="am-button am-tertiary" href={item.url!}><RollingText>Notes and inversions</RollingText><span className="pr-sr-only">: {item.name}</span></a>
          </article>)}
        </div>
        <noscript><p>JavaScript is off. All {model.items.length} chord cards remain visible; the root filter requires JavaScript.</p></noscript>
      </section>
      <div className="am-reading" id="category-theory">{children}</div>
    </main>
    <SiteFooter url={model.url}/>
  </div>;
}
