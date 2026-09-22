import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { getChordFinder, getChordProgressions, getChordsByKey, getFingerNumbersReference, getPianoChordsGuide, type SupportBlock, type SupportLink } from '@/lib/support-content';
import { getChordCenter } from '@/lib/chord-content';
import { editorialHeading, editorialIntro } from '@/lib/seo-editorial';
import { ByKeyExperience } from './by-key-experience';
import { FinderExperience } from './finder-experience';
import { ProgressionExperience } from './progression-experience';
import '@/app/chords/a-minor/a-minor.css';
import './support-pages.css';

function SupportShell({ kind, title, description, scope, url, children }: { kind: 'Guide' | 'Keyboard Notes' | 'Chords'; title: string; description: string; scope: string; url: string; children: ReactNode }) {
  const parent = kind === 'Guide' ? '/guide' : kind === 'Keyboard Notes' ? '/keyboard-notes' : '/chords';
  return <div className="am-page sp-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current={kind}/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading"><PageBreadcrumb items={[{ label: kind, href: parent }, { label: title }]}/><h1>{editorialHeading(url, title)}</h1><p className="am-direct-answer">{editorialIntro(url, description)}</p><p className="sp-scope">{scope}</p></header>{children}
  </main><SiteFooter url={url}/></div>;
}

function Links({ links, className = '' }: { links: SupportLink[]; className?: string }) {
  if (!links.length) return null;
  return <nav className={`sp-links ${className}`} aria-label="Related published references">{links.map(link => <a className="am-button am-tertiary" href={link.url} key={link.id}>{link.label}</a>)}</nav>;
}

function ContentBlock({ block, links = [], children }: { block: SupportBlock; links?: SupportLink[]; children?: ReactNode }) {
  return <section className="am-content-section" id={block.id} data-block-id={block.id} tabIndex={-1} aria-labelledby={`${block.id}-heading`}><h2 id={`${block.id}-heading`}>{block.heading}</h2><div className="am-content-body">
    {block.originalBlocks.map(original => <div className="sp-original" key={original.heading}><h3>{original.heading}</h3><p>{original.body}</p></div>)}
    {block.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    {block.steps.length > 0 && <ol className="am-steps">{block.steps.map(step => <li key={step}><span>{step}</span></li>)}</ol>}
    {block.table && <div className="sp-faq">{block.table.rows.map(row => <details key={row[0]}><summary>{row[0]}<span aria-hidden="true">+</span></summary><p>{row[1]}</p></details>)}</div>}
    {children}<Links links={links}/>
  </div></section>;
}

function linkAt(links: SupportLink[], placement: string) { return links.filter(link => link.placement === placement); }

export function PianoChordsGuidePage() {
  const { model, data } = getPianoChordsGuide();
  const topLinks = linkAt(model.links, 'starter table');
  return <SupportShell kind="Guide" title={model.title} description={model.description} scope={model.scope} url={model.url}>
    <nav className="sp-toc" aria-label="On this page"><span>On this page</span>{model.blocks.map(block => <a href={`#${block.id}`} key={block.id}>{block.heading}</a>)}</nav>
    <section className="sp-result" aria-labelledby="starter-chords-heading"><div className="sp-result-head"><div><p className="sp-overline">Four starter triads</p><h2 id="starter-chords-heading">Read the symbol, then name the notes</h2></div><p>The cards are a starting set. The full chord chart remains the lookup tool.</p></div><div className="sp-chord-grid">{data.starter_chords.map(chord => <article key={chord.name}><span>{chord.name === 'A minor' ? 'Am' : chord.name[0]}</span><h3>{chord.name}</h3><p>{chord.notes.join(' · ')}</p></article>)}</div><Links links={topLinks}/></section>
    <div className="am-reading sp-reading">{model.blocks.map(block => <ContentBlock block={block} key={block.id} links={linkAt(model.links, block.id)}>
      {block.id === 'hands' && <div className="sp-fingering-example" aria-label="Right-hand C major fingering example"><p><strong>Right hand · root-position C major</strong><span>{data.verified_fingering_example.scope}</span></p><div>{data.verified_fingering_example.notes.map((note, index) => <span key={note}><b>{data.verified_fingering_example.fingers[index]}</b><small>{note}</small></span>)}</div></div>}
      {block.id === 'first-change' && <div className="sp-transition" aria-label="C major to A minor over C and back">{data.transition_voicings.map((notes, index) => <div key={`${notes.join('-')}-${index}`}><span>{index === 1 ? 'Am/C' : 'C'}</span><strong>{notes.join(' · ')}</strong><small>{index === 1 ? 'G4 moves to A4' : index === 2 ? 'A4 returns to G4' : 'Start here'}</small></div>)}</div>}
    </ContentBlock>)}</div><Links links={linkAt(model.links, 'after instructions')} className="sp-final-links"/>
  </SupportShell>;
}

function HandDiagram({ hand }: { hand: ReturnType<typeof getFingerNumbersReference>['data']['hands'][number] }) {
  const fingers = new Map(hand.fingers.map(finger => [finger.number, finger]));
  return <figure className="sp-hand" data-hand={hand.hand} data-order={hand.diagram.fingertip_numbers_left_to_right.join(',')}><figcaption><span>{hand.abbreviation}</span><div><strong>{hand.label}</strong><small>Player’s view · thumb toward the middle</small></div></figcaption><div className="sp-hand-shape" role="img" aria-label={`${hand.label}, left to right: ${hand.diagram.fingertip_numbers_left_to_right.map(number => `finger ${number}, ${fingers.get(number)?.name}`).join('; ')}`}>
    <div className="sp-fingers">{hand.diagram.fingertip_numbers_left_to_right.map(number => <span className="sp-finger" data-number={number} key={number}><b>{number}</b><small>{fingers.get(number)?.name.replace(' finger','')}</small></span>)}</div><div className="sp-palm"><strong>{hand.abbreviation}</strong><span>{hand.hand === 'left' ? '5 · 4 · 3 · 2 · 1' : '1 · 2 · 3 · 4 · 5'}</span></div>
  </div></figure>;
}

export function FingerNumbersPage() {
  const { model, data } = getFingerNumbersReference();
  const blocks = model.blocks.map((block) => block.id === 'quick-answer' ? { ...block, heading: 'Both Thumbs Are Finger 1', originalBlocks: block.originalBlocks.map((original) => original.heading === 'Both thumbs are 1' ? { ...original, heading: 'Finger Numbers for Each Hand' } : original) } : block);
  return <SupportShell kind="Keyboard Notes" title={model.title} description={model.description} scope={model.scope} url={model.url}>
    <nav className="sp-toc" aria-label="On this page"><span>On this page</span>{blocks.map(block => <a href={`#${block.id}`} key={block.id}>{block.heading}</a>)}</nav>
    <section className="sp-result sp-finger-result" aria-labelledby="finger-chart-heading"><div className="sp-result-head"><div><p className="sp-overline">LH and RH reference</p><h2 id="finger-chart-heading">Each hand starts at the thumb</h2></div><p>{data.diagram_contract.shared_caption}</p></div><div className="sp-hand-grid">{data.hands.map(hand => <HandDiagram hand={hand} key={hand.hand}/>)}</div><div className="sp-finger-key" aria-label="Finger name mapping">{data.hands[0].fingers.map(finger => <div key={finger.number}><b>{finger.number}</b><span>{finger.name}{finger.aliases.length ? ` (${finger.aliases.join(', ')})` : ''}</span></div>)}</div></section>
    <div className="am-reading sp-reading">{blocks.map(block => <ContentBlock block={block} key={block.id} links={block.id === 'use-in-context' ? linkAt(model.links, 'use-in-context') : []}>
      {block.id === 'three-number-systems' && <div className="sp-number-contrast" aria-label="Finger 4, C4, and scale degree examples"><article><span>Finger number</span><strong>4</strong><p>Ring finger of the named hand</p></article><article><span>Pitch label</span><strong>C4</strong><p>C in octave 4; the 4 is part of the pitch name</p></article><article><span>Scale degree</span><strong>3̂</strong><p>Third degree relative to the tonic</p></article></div>}
      {block.id === 'self-check' && <details className="sp-answer"><summary>Show the two prepared answers</summary>{data.reading_examples.map(example => <p key={example.instruction}><strong>{example.instruction}</strong> → {example.answer}</p>)}</details>}
    </ContentBlock>)}</div><Links links={linkAt(model.links, 'after instructions')} className="sp-final-links"/>
  </SupportShell>;
}

export function ChordsByKeyPage() {
  const { model, data } = getChordsByKey();
  const scaleLink = model.links.find(link => link.placement === 'C major table caption');
  return <SupportShell kind="Chords" title={model.title} description={model.description} scope={model.scope} url={model.url}>
    <nav className="sp-toc" aria-label="On this page"><span>On this page</span><a href="#key-tables">Key tables</a>{model.blocks.map(block => <a href={`#${block.id}`} key={block.id}>{block.heading}</a>)}</nav>
    <section className="bk-terms" aria-labelledby="key-terms-heading"><div><p className="sp-overline">Read four labels separately</p><h2 id="key-terms-heading">Key, root, quality and Roman numeral answer different questions</h2></div><dl><div><dt>Key</dt><dd>The selected scale collection, such as C major.</dd></div><div><dt>Root note</dt><dd>The note a particular chord is built on.</dd></div><div><dt>Chord quality</dt><dd>Major, minor, diminished, or a named seventh structure.</dd></div><div><dt>Roman numeral</dt><dd>The chord’s scale degree and quality inside this key.</dd></div></dl></section>
    <div id="key-tables"><ByKeyExperience keys={data.keys} defaultKey={data.defaultKey} cMajorScaleLink={scaleLink}/></div>
    <div className="am-reading sp-reading">{model.blocks.map(block => <ContentBlock block={block} key={block.id} links={block.id === 'use-the-table' ? linkAt(model.links, 'use-the-table') : []}/>)}</div>
    <Links links={linkAt(model.links, 'after instructions')} className="sp-final-links"/>
  </SupportShell>;
}

export function ChordProgressionsPage() {
  const { model, data } = getChordProgressions();
  return <SupportShell kind="Chords" title={model.title} description={model.description} scope={model.scope} url={model.url}>
    <nav className="sp-toc" aria-label="On this page"><span>On this page</span><a href="#progression-examples">Progression maps</a>{model.blocks.map(block => <a href={`#${block.id}`} key={block.id}>{block.heading}</a>)}</nav>
    <section className="pg-terms" aria-labelledby="progression-terms-heading"><div><p className="sp-overline">Read the labels in order</p><h2 id="progression-terms-heading">One pattern, four kinds of information</h2></div><dl><div><dt>Key</dt><dd>The named major or natural-minor context.</dd></div><div><dt>Roman numeral</dt><dd>The scale degree and chord quality written relative to that key.</dd></div><div><dt>Chord symbol</dt><dd>The actual named chord after the degree is mapped into that key.</dd></div><div><dt>Chord notes</dt><dd>The validated written spelling used in this example.</dd></div></dl></section>
    <div id="progression-examples"><ProgressionExperience patterns={data.patterns} examples={data.examples} defaultExample={data.defaultExample}/></div>
    <div className="am-reading sp-reading">{model.blocks.map(block => <ContentBlock block={block} key={block.id} links={block.id === 'pattern-notes' ? linkAt(model.links, 'pattern-notes') : block.id === 'what-next' ? linkAt(model.links, 'what-next') : []}/>)}</div>
    <Links links={linkAt(model.links, 'after instructions')} className="sp-final-links"/>
  </SupportShell>;
}

export function ChordFinderPage() {
  const centre = getChordCenter();
  const { model, data } = getChordFinder(centre.items.map(item => ({ id: item.id, name: item.name, root: item.root, quality: item.quality, url: item.url, tones: item.tones })));
  return <SupportShell kind="Chords" title={model.title} description={model.description} scope={model.scope} url={model.url}>
    <nav className="sp-toc" aria-label="On this page"><span>On this page</span><a href="#finder-tool">Find a chord</a>{model.blocks.map(block => <a href={`#${block.id}`} key={block.id}>{block.heading}</a>)}</nav>
    <div id="finder-tool"><FinderExperience chords={data.chords} labels={data.labels}/></div>
    <div className="am-reading sp-reading">{model.blocks.map(block => <ContentBlock block={block} key={block.id} links={block.id === 'how-to-enter' ? linkAt(model.links, 'how-to-enter') : block.id === 'read-results' ? linkAt(model.links, 'read-results') : []}/>)}</div>
    <Links links={linkAt(model.links, 'after instructions')} className="sp-final-links"/>
  </SupportShell>;
}
