import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { KeyboardDiagram } from '@/components/keyboard-notes/keyboard-diagram';
import { StaffDiagram } from '@/components/keyboard-notes/staff-diagram';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { getGuideCenter, getReadingGuide } from '@/lib/guide-content';
import type { ExerciseBar, GuideBlock, GuideModel } from '@/lib/guide-types';
import '@/app/chords/a-minor/a-minor.css';
import '@/components/keyboard-notes/keyboard-notes.css';
import './guides.css';

function GuideShell({ model, children }: { model: GuideModel; children: ReactNode }) {
  const detail = model.url !== '/guide';
  return <div className="am-page gd-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Guide"/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading"><PageBreadcrumb items={detail ? [{ label: 'Guide', href: '/guide' }, { label: 'Read sheet music' }] : [{ label: 'Guide' }]}/><h1>{model.title}</h1><p className="am-direct-answer">{model.description}</p></header>
    {children}
  </main><SiteFooter url={model.url}/></div>;
}

function Section({ block, children }: { block: GuideBlock; children?: ReactNode }) {
  return <section className="am-content-section" id={block.id} data-block-id={block.id} tabIndex={-1} aria-labelledby={`${block.id}-heading`}><h2 id={`${block.id}-heading`}>{block.heading}</h2><div className="am-content-body"><p>{block.body}</p>{children}</div></section>;
}

function BeatPattern({ bar, compact = false }: { bar: ExerciseBar; compact?: boolean }) {
  return <div className={`gd-beat-pattern${compact ? ' gd-compact-pattern' : ''}`} role="img" aria-label={bar.events.map((item) => `${item.pitch} for ${item.durationQuarters} ${item.durationQuarters === 1 ? 'count' : 'counts'}`).join(', ')}>
    {bar.events.map((item, index) => <div key={`${item.pitch}-${index}`} style={{ gridColumn: `${item.onsetQuarters + 1} / span ${item.durationQuarters}` }}><strong>{item.pitch}</strong><span>{item.durationQuarters === 1 ? `count ${item.onsetQuarters + 1}` : `counts ${item.onsetQuarters + 1}–${item.onsetQuarters + item.durationQuarters}`}</span></div>)}
  </div>;
}

function Printable({ url }: { url: string }) {
  return <aside className="gd-printable" aria-labelledby="gd-printable-title"><div><p className="gd-overline">Original printable · 4 pages</p><h2 id="gd-printable-title">Piano Starter and Reading Pack</h2><p>Both-clef note examples, two short reading lines, two rhythm lines and an answer key.</p></div><a className="am-button am-primary" href={url} download>Download the PDF</a></aside>;
}

export function GuideCenterPage() {
  const data = getGuideCenter();
  return <GuideShell model={data.model}><section className="gd-start" aria-labelledby="gd-start-title"><div><p className="gd-overline">Start here · about 3 minutes</p><h2 id="gd-start-title">Find three keys, then play four counts</h2><p>Locate middle C and try one complete bar before choosing another reading task.</p></div><BeatPattern bar={data.firstExample}/></section>
    <div className="gd-keyboard"><KeyboardDiagram keys={data.keyboardKeys} selected={60} marked={[60,62,64]} octaves label="C4, D4 and E4 on the piano keyboard"/></div>
    <ol className="gd-path" aria-label="Beginner learning path">{data.path.map((step) => <li key={step.step}><span className="gd-step-number">{String(step.step).padStart(2,'0')}</span><div><strong>{step.task}</strong>{step.available ? <a href={step.url}>Open this step <span aria-hidden="true">→</span></a> : <span className="gd-planned">Planned guide</span>}</div></li>)}</ol>
    <div className="am-reading gd-reading">{data.model.blocks.map((block) => <Section key={block.id} block={block}>{block.id === 'four-count-pattern' && <BeatPattern bar={data.firstExample} compact/>}{block.id === 'three-keys' && <a className="am-button am-tertiary gd-inline-link" href="/keyboard-notes/chart">Open the keyboard note chart</a>}{block.id === 'next-step' && <a className="am-button am-tertiary gd-inline-link" href="/chords">Open the chord guide</a>}</Section>)}</div><Printable url={data.printableURL}/>
  </GuideShell>;
}

export function ReadSheetMusicPage() {
  const data = getReadingGuide();
  const treble = data.anchors.filter((item) => item.clef === 'treble');
  const bass = data.anchors.filter((item) => item.clef === 'bass');
  return <GuideShell model={data.model}><nav className="gd-toc" aria-label="On this page"><span>On this page</span>{data.model.blocks.map((block) => <a key={block.id} href={`#${block.id}`}>{block.heading}</a>)}</nav>
    <div className="am-reading gd-reading">{data.model.blocks.map((block) => <Section key={block.id} block={block}>
      {block.id === 'reading-order' && <ol className="gd-read-order"><li>Clef</li><li>Key signature and accidentals</li><li>Line or space</li><li>Duration</li></ol>}
      {block.id === 'anchors' && <div className="gd-anchor-grid"><div><h3>Treble anchors</h3><StaffDiagram notes={treble.map((item) => item.staff)} selected=""/><dl>{treble.map((item) => <div key={item.pitch}><dt>{item.pitch}</dt><dd>{item.position}</dd></div>)}</dl></div><div><h3>Bass anchors</h3><StaffDiagram notes={bass.map((item) => item.staff)} selected=""/><dl>{bass.map((item) => <div key={item.pitch}><dt>{item.pitch}</dt><dd>{item.position}</dd></div>)}</dl></div></div>}
      {block.id === 'face' && <div className="gd-memory"><div><span>Treble spaces</span><strong>{data.trebleSpaces.join(' · ')}</strong><p>FACE applies here.</p></div><div><span>Bass spaces</span><strong>{data.bassSpaces.join(' · ')}</strong><p>A separate set of notes.</p></div></div>}
      {block.id === 'check-yourself' && <div className="gd-exercise" data-exercise-id={data.exercise.id}><div className="gd-exercise-head"><div><p className="gd-overline">{data.exercise.clef} clef · {data.exercise.meter} · {data.exercise.keySignature}</p><h3>{data.exercise.title}</h3></div><span>{data.exercise.difficultyLabel}</span></div><div className="gd-bars">{data.exercise.bars.map((bar) => <div key={bar.number}><span>Bar {bar.number}</span><BeatPattern bar={bar} compact/></div>)}</div><details><summary>Reveal the pitch answer</summary><p>{data.exercise.bars.map((bar) => `Bar ${bar.number}: ${bar.events.map((item) => item.pitch).join(' ')}`).join(' | ')}</p></details><p className="gd-scope">{data.exercise.goal} Fingering is not supplied.</p><a className="am-button am-tertiary gd-inline-link" href={data.chartURL}>Find C4–F4 on the keyboard chart</a></div>}
    </Section>)}</div><Printable url={data.printableURL}/>
  </GuideShell>;
}
