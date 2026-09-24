import type { ReactNode } from 'react';
import Image from 'next/image';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { HomeChordDiscovery, HomeHeader, HomePianoDemo } from '@/components/integration/home-experience';
import { HomeProductPreview } from '@/components/integration/home-product-preview';
import { PracticeTimer } from '@/components/integration/practice-timer';
import { HomeArrow, ReadingCover, SongsCover } from '@/components/integration/home-visuals';
import { Button } from '@/components/ui/button';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { SiteBrand } from '@/components/ui/site-brand';
import { getChordCenter } from '@/lib/chord-content';
import { getHomeModel, getToolsModel } from '@/lib/integration-content';
import type { IntegrationPageModel, ToolDestination, ToolResource } from '@/lib/integration-types';
import { SITE_NAME } from '@/lib/site-config';
import { isPublicRoute, SITE_NAVIGATION } from '@/lib/site-routes';
import '@/app/chords/a-minor/a-minor.css';
import './integration.css';
import './home-color-repair.css';
import './home-hero-background.css';
import './home-v4-final.css';

function Shell({model,current,children}:{model:IntegrationPageModel;current:'Home'|'Tools';children:ReactNode}){
  return <div className="am-page in-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current={current}/><main id="main" className="pr-container" tabIndex={-1}><header className="in-heading"><p className="in-kicker">{SITE_NAME}</p><h1>{model.title}</h1><p>{model.description}</p></header>{children}</main><SiteFooter url={model.url}/></div>;
}
function ToolTaskCard({item,index}:{item:ToolDestination;index:number}){
  const cta=item.id==='hear-the-difference'?'Start listening':'Open task';
  return <a className="in-task-card in-tool-task-card" href={item.url}><span className="in-card-number">{String(index+1).padStart(2,'0')}</span><span><strong>{item.label}</strong><small>{item.description}</small></span><span>{cta} <span aria-hidden="true">→</span></span></a>;
}
function ToolResourceCard({item}:{item:ToolResource}){
  return <article className="in-print-card"><div><span>Available now</span><h3>{item.label}</h3><p>{item.description}</p></div><div className="in-card-actions"><a href={item.url}>{item.label}</a>{item.downloads.map(download=><a href={download.url} download key={download.url}>{download.label}</a>)}</div></article>;
}

const productCards = [
  {title:'Find piano notes',href:'/keyboard-notes',kind:'notes',description:'Find a key, learn its name, and hear its sound.',action:'Explore the keyboard'},
  {title:'Look up a chord',href:'/chords',kind:'chords',description:'See the notes, explore inversions, and listen.',action:'Browse piano chords'},
  {title:'Explore piano scales',href:'/scales',kind:'scales',description:'Follow the notes and see how the pattern works.',action:'Find a piano scale'},
  {title:'Choose your next song',href:'/songs',kind:'songs',description:'Find a starting point and compare arrangements.',action:'Explore piano songs'},
  {title:'Find sheet music',href:'/sheet-music',kind:'sheet',description:'Compare editions, sources, and access details.',action:'Browse sheet music'},
  {title:'Hear the difference',href:'/tools/hear-the-difference',kind:'hearing',description:'Listen to two chords. Discover what changed.',action:'Try the listening challenge'},
] as const;

const resources = [
  {title:'Piano notes chart',description:'Match note names, piano keys, and pitches.',href:'/keyboard-notes/chart'},
  {title:'Blank sheet music',description:'A clear page for your next musical idea.',href:'/tools/blank-sheet-music'},
  {title:'A beginner’s starting point',description:'Get familiar with the keyboard and the basics.',href:'/guide'},
  {title:'Labeled keyboard',description:'Keep note names nearby.',href:'/keyboard-notes/labeled'},
] as const;

const faq = [
  {question:'Is PianoGrid free?',answer:'Yes. PianoGrid’s piano tools and guides are free to use. External sheet-music providers may require payment or an account.'},
  {question:'Do I need to create an account?',answer:'No PianoGrid account is needed to use these tools. External sheet-music providers may have their own sign-in requirements.'},
  {question:'Do I need a piano to get started?',answer:'No. You can explore notes and sounds in your browser. A real piano or keyboard is helpful when you are ready to practise playing.'},
  {question:'Can I print a reference?',answer:'Yes. Open a printable reference or blank staff paper, then use the print or PDF options on that page. For external sheet music, check the provider’s access terms first.'},
] as const;

function HomeFooter(){
  return <footer className="ph-footer hv-footer"><div className="pr-container ph-footer-main"><div><SiteBrand className="ph-footer-brand"/><p>Clear references for the moments you sit down to play.</p></div><nav aria-label="Footer navigation">{SITE_NAVIGATION.map(section=><a href={section.href} key={section.href}>{section.label}</a>)}</nav></div><div className="pr-container ph-footer-bottom"><p>PianoGrid · Free piano tools &amp; references</p><a href="#main">Back to top ↑</a></div></footer>;
}

function HomeReferenceDirectory(){
  return <section className="pr-container hv-directory" id="topics" aria-labelledby="home-reference-directory-title"><div className="hv-directory-heading"><div><p className="ph-eyebrow">The complete piano directory</p><h2 id="home-reference-directory-title">Find your next piano topic.</h2></div><p>Open a focused reference directly, or start with a section overview.</p></div><nav aria-label="Piano topics">{SITE_NAVIGATION.map(section=><section className="hv-directory-row" key={section.href} aria-labelledby={`home-reference-${section.href.slice(1).replaceAll('/','-')}`}><h3 id={`home-reference-${section.href.slice(1).replaceAll('/','-')}`}><a href={section.href}>{section.label}<HomeArrow/></a></h3><ul>{section.children.map(child=><li key={child.href}><a href={child.href}>{child.label}</a></li>)}</ul></section>)}</nav></section>;
}

export function HomePage(){
  const data=getHomeModel();
  const chordData=getChordCenter();
  const minor=chordData.items.find(item=>item.root==='A'&&item.quality==='minor');
  const major=chordData.items.find(item=>item.root==='A'&&item.quality==='major');
  if(!minor||!major)throw new Error('Homepage chord examples are unavailable');
  const available = new Set([...data.primaryTasks, data.secondaryLink].filter(item=>item.available).map(item=>item.url));
  if (productCards.some(card=>!isPublicRoute(card.href)||!available.has(card.href) && card.href !== '/tools/hear-the-difference')) throw new Error('Homepage product destination is unavailable');
  if (resources.some(item=>!isPublicRoute(item.href))) throw new Error('Homepage resource destination is unavailable');
  const blocks=Object.fromEntries(data.model.blocks.map(block=>[block.id,block]));
  return <div className="am-page in-page home-page home-v4-final"><a className="am-skip ph-skip" href="#main">Skip to content</a><HomeHeader/><main id="main" tabIndex={-1}>
    <section className="ph-hero" id="home-hero" aria-labelledby="home-hero-title"><Image className="ph-hero-image" src="/assets/home/pianogrid-hero-sunset.png" alt="Pianist playing a grand piano at sunset, with musical notes sweeping above the instrument" fill priority sizes="100vw"/><div className="ph-hero-scrim" aria-hidden="true"/><div className="pr-container ph-hero-grid"><div className="ph-hero-copy"><p className="hv-free-badge">✓ &nbsp; Free tools · No account needed</p><p className="ph-eyebrow">Piano learning &amp; practice tools</p><h1 id="home-hero-title"><span className="ph-hero-title-line"><span>Learn Piano.</span></span>{' '}<span className="ph-hero-title-line ph-hero-title-line-accent"><em>One Step at a Time.</em></span></h1><p className="ph-hero-description">Learn piano with free tools and beginner guides. Find notes on the keyboard, hear chords and scales, explore songs and sheet music, and print blank staff paper.</p><div className="ph-hero-actions"><Button asChild variant="secondary" className="hv-pill hv-pill-dark"><a href="/keyboard-notes">Find piano notes <HomeArrow/></a></Button><Button asChild variant="secondary" className="hv-pill hv-pill-light"><a href="/chords">Look up a chord <HomeArrow/></a></Button></div><p className="hv-hero-trust"><span>✓ No sign-up. No login.</span><span>✓ Works in your browser.</span></p></div></div></section>
    <div className="hv-practice" id="try-piano"><div className="pr-container ph-stage-wrap"><HomePianoDemo chord={minor} copy={chordData.microcopy}/></div></div>
    <section className="pr-container hv-toolkit" id="explore" aria-labelledby="home-task-title" data-block-id="tasks"><div className="hv-toolkit-heading"><div><p className="ph-eyebrow">Your piano toolkit</p><h2 id="home-task-title"><em>What do you want to explore?</em></h2></div><a href="/tools">All tools <HomeArrow/></a></div><div className="hv-product-grid">{productCards.map(card=><article className="hv-product-card" key={card.href}><HomeProductPreview kind={card.kind}/><h3><a className="hv-product-link" href={card.href}>{card.title}</a></h3><p>{card.description}</p><span className="hv-product-action" aria-hidden="true">{card.action} <HomeArrow/></span></article>)}</div><div className="hv-toolkit-extra"><div><p>A little guidance, or something to print?</p><small>PianoGrid tools are free. Check sheet-music sources and licenses; external providers may require payment or an account.</small></div><nav aria-label="More ways to explore"><a href="/guide">Learn the basics <HomeArrow/></a><a href="/tools">Tools and printables <HomeArrow/></a></nav></div></section>
    <div className="hv-learning-band"><section className="pr-container hv-beginner" id="start-small" aria-labelledby="home-starter-title" data-block-id="three-notes"><div><p className="ph-eyebrow">Start learning · Find your first notes</p><h2 id="home-starter-title">New to piano? Try three notes</h2><p>{blocks['three-notes'].body}</p><Button asChild variant="secondary" className="hv-pill hv-pill-dark"><a href="/guide">Start the beginner guide <HomeArrow/></a></Button></div><div className="hv-beginner-notes"><div aria-label={`Notes ${data.firstAction.notes.join(', ')}`}>{data.firstAction.notes.map(note=><strong key={note}>{note}</strong>)}</div><p>Locate C to the left of two black keys, then the next two white keys.</p></div></section><section className="pr-container hv-listening" id="listen" aria-labelledby="home-discovery-title"><div className="ph-discovery-copy"><p className="ph-eyebrow">Try a listening exercise</p><h2 id="home-discovery-title">Change one note.<br/><em>Hear the difference.</em></h2><p>A minor is A, C, and E. Raise C to C♯ and you have A major. Same root. A different third.</p><a href="/tools/hear-the-difference">Try the listening challenge <HomeArrow/></a><a className="ph-discovery-secondary" href="/chords/a-minor">Explore the A minor reference <HomeArrow/></a></div><HomeChordDiscovery chords={[minor,major]} copy={chordData.microcopy}/></section></div>
    <section className="pr-container hv-music" id="music" aria-labelledby="home-music-title" data-block-id="editions"><div className="hv-music-heading"><div><p className="ph-eyebrow">Put it into practice · Songs and reading</p><h2 id="home-music-title">Make room for a little music.</h2></div></div><div className="ph-editorial-grid"><a href="/songs/easy" className="ph-editorial-card"><SongsCover/><div className="ph-editorial-copy"><p>01 / Songs</p><h3>Find your next piece.</h3><p>Explore easy piano song ideas. Choose an arrangement that fits.</p><span>Explore easy piano songs <HomeArrow/></span></div></a><a href="/guide/read-sheet-music" className="ph-editorial-card"><ReadingCover/><div className="ph-editorial-copy"><p>02 / Learning guides</p><h3>Read what you play.</h3><p>Start making sense of notes, the staff, and the keyboard.</p><span>Explore the reading guide <HomeArrow/></span></div></a></div></section>
    <section className="pr-container hv-resources" id="references" aria-labelledby="home-resources-title"><div className="ph-resource-intro"><p className="ph-eyebrow">Quick references &amp; printables</p><h2 id="home-resources-title">Keep them within reach.</h2><p>References for the questions that come up when you sit down to play.</p></div><div className="hv-resource-grid">{resources.map((item,index)=><a href={item.href} key={item.href}><span>{String(index+1).padStart(2,'0')}</span><div><h3>{item.title}</h3><p>{item.description}</p></div><HomeArrow/></a>)}</div></section>
    <HomeReferenceDirectory/>
    <section className="pr-container hv-faq" aria-labelledby="home-faq-title"><div><h2 id="home-faq-title">Just open. Explore. Play.</h2><p>No PianoGrid account. No installation.<br/>A few things you might be wondering.</p></div><div className="hv-faq-list">{faq.map(item=><Collapsible className="pr-collapsible-plain hv-faq-item" key={item.question}><CollapsibleTrigger>{item.question}</CollapsibleTrigger><CollapsibleContent><p>{item.answer}</p></CollapsibleContent></Collapsible>)}</div></section>
    <section className="hv-closing" aria-labelledby="home-closing-title"><div className="pr-container hv-closing-inner"><div><p className="ph-eyebrow">A clearer place for your piano time</p><h2 id="home-closing-title">Your next note <em>starts here.</em></h2><p>Free PianoGrid tools. No sign-up or login.</p></div><Button asChild variant="secondary" className="hv-pill hv-pill-dark"><a href="/tools">Explore Piano Tools <HomeArrow/></a></Button></div></section>
  </main><HomeFooter/></div>;
}

export function ToolsPage(){
  const data=getToolsModel();
  return <Shell model={data.model} current="Tools"><section className="in-tool-directory" aria-labelledby="in-find-title"><div className="in-section-head"><p>Find the right reference</p><h2 id="in-find-title">Find or identify</h2></div><div className="in-lookup-grid">{data.findLinks.map((item,index)=><ToolTaskCard item={item} index={index} key={item.id}/>)}</div></section>
    <section className="in-tool-directory in-practice-directory" aria-labelledby="in-practice-title"><div className="in-section-head"><p>Work on one skill</p><h2 id="in-practice-title">Practice</h2></div><div className="in-lookup-grid">{data.practiceLinks.map((item,index)=><ToolTaskCard item={item} index={index} key={item.id}/>)}</div></section>
    <PracticeTimer/>
    <section className="in-printables" aria-labelledby="in-printables-title"><div className="in-section-head"><p>References to keep nearby</p><h2 id="in-printables-title">Print and download</h2></div><div className="in-print-grid">{data.printResources.map(item=><ToolResourceCard item={item} key={item.id}/>)}</div></section>
  </Shell>;
}
