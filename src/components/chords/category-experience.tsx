'use client';
import { useEffect, useState } from 'react';
import type { ChordCategoryModel } from '@/lib/chord-content';
import { SiteHeader, SiteFooter } from './site-chrome';
import { KeyboardViewport } from './keyboard-viewport';
import { PageSearch } from '../a-minor/page-search';
import { RollingText } from '../ui/rolling-text';

type CategoryInteractionModel=Pick<ChordCategoryModel,'url'|'quality'|'items'|'rootOrder'|'familySubtypes'|'contentBlocks'|'whitePitchClasses'>;
export function ChordCategoryExperience({ model, heading, children }:{ model:CategoryInteractionModel; heading:React.ReactNode; children:React.ReactNode }) {
  const [root,setRoot]=useState('');
  const [subtype,setSubtype]=useState('');
  const [ready,setReady]=useState(false);
  useEffect(()=>setReady(true),[]);
  const visibleItems=model.items.filter(item=>(!root||item.root===root)&&(!subtype||item.quality===subtype));
  const visibleCount=visibleItems.length;
  const familyName=model.quality==='major'?'Major':model.quality==='minor'?'Minor':model.quality==='diminished'?'Diminished':model.quality==='augmented'?'Augmented':model.quality==='seventh'?'Seventh':model.quality==='add'?'Add':'Suspended';
  const subtypeLabel=(value:string)=>({dominant7:'Dominant 7',major7:'Major 7',minor7:'Minor 7',halfDiminished7:'Half-diminished 7',sus2:'Sus2',sus4:'Sus4',add9:'Major add9',minorAdd9:'Minor add9'}[value]??value);
  const accidental=(value:string)=>value.replaceAll('bb','𝄫').replaceAll('##','𝄪').replaceAll('b','♭').replaceAll('#','♯');
  const sections=[{id:'category-grid',heading:`${model.quality} chord grid`,text:model.items.map(item=>`${item.name} ${item.tones.join(' ')}`).join(' ')},{id:'category-theory',heading:`About ${model.quality} chords`,text:model.contentBlocks.map(block=>`${block.heading} ${block.body}`).join(' ')}];
  return <div className="am-page ch-category-page" data-quality={model.quality} data-filter-root={root}>
    <a className="am-skip am-screen" href="#category-grid">Skip to chord grid</a>
    <SiteHeader search={<PageSearch sections={sections} ready={ready} onOpen={()=>{}}/>}/>
    <main id="main" className="pr-container am-screen">{heading}
      <section className="ch-category-grid-section" id="category-grid" tabIndex={-1} aria-labelledby="category-grid-heading">
        <div className="ch-category-section-heading"><div><p className="am-eyebrow">Browse by root note</p><h2 id="category-grid-heading">{familyName} chord chart</h2></div><p aria-live="polite">{visibleCount} {visibleCount===1?'chord':'chords'}</p></div>
        <div className="ch-root-chips" role="group" aria-label="Filter by root note">
          <button type="button" aria-pressed={!root} disabled={!ready} onClick={()=>setRoot('')}>All</button>
          {model.rootOrder.map(rootValue=><button type="button" key={rootValue} aria-pressed={root===rootValue} disabled={!ready} onClick={()=>setRoot(rootValue)}>{accidental(rootValue)}</button>)}
        </div>
        {model.familySubtypes.length>1&&<div className="ch-subtype-chips" role="group" aria-label={`Filter by ${familyName.toLowerCase()} chord type`}><button type="button" aria-pressed={!subtype} disabled={!ready} onClick={()=>setSubtype('')}>All types</button>{model.familySubtypes.map(value=><button type="button" key={value} aria-pressed={subtype===value} disabled={!ready} onClick={()=>setSubtype(value)}>{subtypeLabel(value)}</button>)}</div>}
        <div className="ch-category-grid">
          {model.items.map(item=><article className="ch-category-card" key={item.id} data-chord-id={item.id} data-subtype={item.quality} hidden={Boolean(ready&&((root&&root!==item.root)||(subtype&&subtype!==item.quality)))}>
            <div className="ch-category-card-heading"><h3>{item.name}</h3><span>{item.voicing.chord_symbol}</span></div>
            <p className="ch-category-tones"><strong>{item.tones.join(' – ')}</strong><span>Formula {item.formula.map(accidental).join('–')}</span></p>
            <KeyboardViewport voicing={item.voicing} whitePitchClasses={model.whitePitchClasses} ready={ready}/>
            <a className="am-button am-tertiary" href={item.url!}><RollingText>{model.quality==='add'?'Notes and layouts':'Notes and inversions'}</RollingText><span className="pr-sr-only">: {item.name}</span></a>
          </article>)}
        </div>
        <noscript><p>JavaScript is off. All {model.items.length} chord cards remain visible; filters require JavaScript.</p></noscript>
      </section>
      <div className="am-reading" id="category-theory">{children}</div>
    </main>
    <SiteFooter url={model.url}/>
  </div>;
}
