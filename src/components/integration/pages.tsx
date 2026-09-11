import type { ReactNode } from 'react';
import Image from 'next/image';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { HomeChordDiscovery, HomeHeader, HomePianoDemo } from '@/components/integration/home-experience';
import {
  GrandPianoIllustration,
  HomeArrow,
  ReadingCover,
  SongsCover,
  TaskIllustration,
} from '@/components/integration/home-visuals';
import { SiteBrand } from '@/components/ui/site-brand';
import { RollingText } from '@/components/ui/rolling-text';
import { getChordCenter } from '@/lib/chord-content';
import { getHomeModel, getToolsModel } from '@/lib/integration-content';
import type { Destination, IntegrationBlock, IntegrationPageModel, PrintableDestination } from '@/lib/integration-types';
import { SITE_NAME } from '@/lib/site-config';
import { SITE_NAVIGATION } from '@/lib/site-routes';
import '@/app/chords/a-minor/a-minor.css';
import './integration.css';
import './home-color-repair.css';
import './home-hero-background.css';

function Shell({model,current,children}:{model:IntegrationPageModel;current:'Home'|'Tools';children:ReactNode}){
  return <div className="am-page in-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current={current}/><main id="main" className="pr-container" tabIndex={-1}><header className="in-heading"><p className="in-kicker">{SITE_NAME}</p><h1>{model.title}</h1><p>{model.description}</p></header>{children}</main><SiteFooter url={model.url}/></div>;
}
function Reading({blocks,children}:{blocks:IntegrationBlock[];children?:(block:IntegrationBlock)=>ReactNode}){
  return <div className="am-reading in-reading">{blocks.map(block=><section className="am-content-section" id={`in-${block.id}`} data-block-id={block.id} key={block.id} tabIndex={-1} aria-labelledby={`in-${block.id}-heading`}><h2 id={`in-${block.id}-heading`}>{block.heading}</h2><div className="am-content-body"><p>{block.body}</p>{block.actions?.length?<nav className="in-reading-actions" aria-label={`${block.heading} actions`}>{block.actions.map(action=><a href={action.url} key={action.url}>{action.label} <span aria-hidden="true">→</span></a>)}</nav>:null}{children?.(block)}</div></section>)}</div>;
}
function DestinationCard({item,index}:{item:Destination;index:number}){
  const content=<><span className="in-card-number">{String(index+1).padStart(2,'0')}</span><strong>{item.label}</strong><span>{item.available?'Open reference':'Not yet available'}</span></>;
  return item.available?<a className="in-task-card" href={item.url}>{content}</a>:<div className="in-task-card in-unavailable" aria-label={`${item.label}, not yet available`}>{content}</div>;
}
const taskDescriptions: Record<string,string> = {
  '/keyboard-notes':'Put a name to every key.',
  '/chords':'Find the notes. See the shape.',
  '/scales':'Follow the notes, step by step.',
  '/songs':'Find something you want to play.',
  '/guide':'Build understanding, one idea at a time.',
  '/tools':'Keep useful references close.',
};
function HomeTaskCard({item,index}:{item:Destination;index:number}){
  return <a className="ph-task" href={item.url}><div className="ph-task-top"><span>{String(index+1).padStart(2,'0')}</span><HomeArrow/></div><div className="ph-task-illustration"><TaskIllustration route={item.url}/></div><h3>{item.label}</h3><p>{taskDescriptions[item.url]}</p></a>;
}
function PrintableCard({item}:{item:PrintableDestination}){
  return <article className={item.available?'in-print-card':'in-print-card in-unavailable'}><div><span>{item.available?'Available now':'Not currently offered'}</span><h3>{item.label}</h3><p>{item.task}</p></div>{item.available?<div className="in-card-actions"><a href={item.url}>Open resource</a>{item.downloadURL&&<a href={item.downloadURL} download>Download PDF</a>}</div>:null}</article>;
}
function HomeFooter(){
  return <footer className="ph-footer"><div className="pr-container ph-footer-main"><SiteBrand className="ph-footer-brand"/><nav aria-label="Footer navigation"><a href="/keyboard-notes">Keyboard Notes</a><a href="/chords">Chords</a><a href="/scales">Scales</a><a href="/songs">Songs</a><a href="/guide">Learn</a><a href="/tools">Tools</a></nav></div><div className="pr-container ph-footer-bottom"><p>Clear references for the moments you sit down to play.</p><a href="#main">Back to top ↑</a></div></footer>;
}
function HomeReferenceDirectory(){
  return <section className="pr-container ph-reference-directory" aria-labelledby="home-reference-directory-title"><div className="ph-section-heading"><div><p className="ph-eyebrow">Every published reference</p><h2 id="home-reference-directory-title">Browse every<br/>piano reference.</h2></div><p>Open a focused reference directly, or start with a section overview.</p></div><nav className="ph-reference-directory-grid" aria-label="All piano references">{SITE_NAVIGATION.map(section=><section className="ph-reference-group" key={section.href} aria-labelledby={`home-reference-${section.href.slice(1).replaceAll('/','-')}`}><h3 id={`home-reference-${section.href.slice(1).replaceAll('/','-')}`}><a href={section.href}>{section.label}<HomeArrow/></a></h3><ul>{section.children.map(child=><li key={child.href}><a href={child.href}>{child.label}</a></li>)}</ul></section>)}</nav></section>;
}
export function HomePage(){
  const data=getHomeModel();
  const chordData=getChordCenter();
  const minor=chordData.items.find(item=>item.root==='A'&&item.quality==='minor');
  const major=chordData.items.find(item=>item.root==='A'&&item.quality==='major');
  if(!minor||!major)throw new Error('Homepage chord examples are unavailable');
  const blocks=Object.fromEntries(data.model.blocks.map(block=>[block.id,block]));
  const taskOrder=['/chords','/scales','/keyboard-notes','/songs','/guide','/tools'];
  const taskLinks=[...data.primaryTasks.filter(item=>item.available),data.secondaryLink].filter(item=>item.available).sort((a,b)=>taskOrder.indexOf(a.url)-taskOrder.indexOf(b.url));
  const quickLinks=taskLinks.filter(item=>item.url!=='/tools');
  return <div className="am-page in-page home-page"><a className="am-skip ph-skip" href="#main">Skip to content</a><HomeHeader/><main id="main" tabIndex={-1}>
    <section className="ph-hero" aria-labelledby="home-hero-title"><Image className="ph-hero-image" src="/assets/home/east-lake-piano-hero.png" alt="Hands playing a grand piano beside East Lake" fill priority sizes="100vw"/><div className="ph-hero-scrim" aria-hidden="true"/><div className="pr-container ph-hero-grid"><div className="ph-hero-copy"><p className="ph-eyebrow ph-hero-enter ph-hero-enter-eyebrow"><span/>Piano reference &amp; practice tools</p><h1 id="home-hero-title"><span className="ph-hero-title-line"><span>Clear Piano References.</span></span><span className="ph-hero-title-line ph-hero-title-line-accent"><em>Better Practice.</em></span></h1><p className="ph-hero-description ph-hero-enter ph-hero-enter-description">Find chords, scales, keyboard notes, beginner songs, sheet music, and practical tools—without digging through long lessons.</p><div className="ph-hero-actions ph-hero-enter ph-hero-enter-actions"><a className="ph-button ph-button-primary" href={data.secondaryLink.url}><RollingText>Explore Piano Tools</RollingText><HomeArrow/></a><a className="ph-button ph-button-secondary" href="/songs"><RollingText>Browse Songs</RollingText><HomeArrow/></a></div><nav className="ph-quick-links ph-hero-enter ph-hero-enter-links" aria-label="Quick piano tasks">{quickLinks.map((item,index)=><span key={item.url}><a href={item.url}>{item.label}</a>{index<quickLinks.length-1&&<i aria-hidden="true"/>}</span>)}</nav></div></div></section>
    <div className="pr-container ph-stage-wrap"><HomePianoDemo chord={minor} copy={chordData.microcopy}/></div>
    <section className="pr-container ph-section ph-task-panel" id="explore" aria-labelledby="home-task-title" data-block-id="tasks"><div className="ph-section-heading"><div><p className="ph-eyebrow">Start with what you need</p><h2 id="home-task-title">What do you want<br/>to work on?</h2></div><p>{blocks.tasks.body}</p></div><div className="ph-task-grid">{taskLinks.map((item,index)=><HomeTaskCard item={item} index={index} key={item.url}/>)}</div><aside className="ph-starter-note" data-block-id="three-notes" aria-labelledby="home-starter-title"><div><p className="ph-eyebrow">A simple first action</p><h2 id="home-starter-title">{blocks['three-notes'].heading}</h2><p>{blocks['three-notes'].body}</p></div><div className="ph-first-action"><div aria-label={`Notes ${data.firstAction.notes.join(', ')}`}>{data.firstAction.notes.map(note=><strong key={note}>{note}</strong>)}</div><p>{data.firstAction.instruction}</p><a href="/guide">Start the beginner guide <HomeArrow/></a></div></aside></section>
    <section className="pr-container ph-discovery-shell" aria-labelledby="home-discovery-title"><div className="ph-discovery"><div className="ph-discovery-copy"><p className="ph-eyebrow">A small discovery</p><h2 id="home-discovery-title">Change one note.<br/><em>Hear the difference.</em></h2><p>A minor is A, C, and E. Raise C to C♯ and you have A major. Same root. A different third.</p><a href="/chords/a-minor">Explore the A minor reference <HomeArrow/></a></div><HomeChordDiscovery chords={[minor,major]} copy={chordData.microcopy}/></div></section>
    <section className="pr-container ph-section ph-music" id="songs" aria-labelledby="home-music-title" data-block-id="editions"><div className="ph-section-heading"><div><p className="ph-eyebrow">From knowing to playing</p><h2 id="home-music-title">Make room<br/>for a little music.</h2></div><p>{blocks.editions.body}</p></div><div className="ph-editorial-grid"><a href="/songs/easy" className="ph-editorial-card"><SongsCover/><div className="ph-editorial-copy"><p>01 / Songs</p><h3>Find your next piece.</h3><p>Explore easy piano song ideas. Choose an arrangement that fits.</p><span>Explore easy piano songs <HomeArrow/></span></div></a><a href="/guide/read-sheet-music" className="ph-editorial-card"><ReadingCover/><div className="ph-editorial-copy"><p>02 / Learning guides</p><h3>Read what you play.</h3><p>Start making sense of notes, the staff, and the keyboard.</p><span>Explore the reading guide <HomeArrow/></span></div></a></div></section>
    <section className="pr-container ph-resources" aria-labelledby="home-resources-title"><div className="ph-resource-intro"><p className="ph-eyebrow">The useful little things</p><h2 id="home-resources-title">Keep them<br/>within reach.</h2><p>References for the questions that come up when you sit down to play.</p></div><div className="ph-resource-list"><a href="/keyboard-notes/chart"><span>01</span><div><h3>Piano notes chart</h3><p>Match note names, piano keys, and pitches.</p></div><HomeArrow/></a><a href="/tools/blank-sheet-music"><span>02</span><div><h3>Blank sheet music</h3><p>A clear page for your next musical idea.</p></div><HomeArrow/></a><a href="/guide"><span>03</span><div><h3>A beginner’s starting point</h3><p>Get familiar with the keyboard and the basics.</p></div><HomeArrow/></a></div></section>
    <HomeReferenceDirectory/>
    <section className="ph-closing" aria-labelledby="home-closing-title"><div className="pr-container ph-closing-inner"><div><p className="ph-eyebrow">A clearer place for your piano time</p><h2 id="home-closing-title">Your next note<br/><em>starts here.</em></h2><a className="ph-button ph-button-primary" href="/tools"><RollingText>Explore Piano Tools</RollingText><HomeArrow/></a></div><GrandPianoIllustration/></div></section>
  </main><HomeFooter/></div>;
}
export function ToolsPage(){
  const data=getToolsModel();
  return <Shell model={data.model} current="Tools"><section className="in-tool-directory" aria-labelledby="in-tools-title"><div className="in-section-head"><p>Working references</p><h2 id="in-tools-title">Choose the result you need</h2></div><div className="in-lookup-grid">{data.lookupLinks.map((item,index)=><DestinationCard item={item} index={index} key={item.url}/>)}</div></section>
    <section className="in-printables" aria-labelledby="in-printables-title"><div className="in-section-head"><p>Original downloads</p><h2 id="in-printables-title">Print something useful</h2></div><div className="in-print-grid">{data.printables.map(item=><PrintableCard item={item} key={item.url}/>)}</div></section>
    <Reading blocks={data.model.blocks}/>
  </Shell>;
}
