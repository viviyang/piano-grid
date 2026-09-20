import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { KeyboardDiagram } from '@/components/keyboard-notes/keyboard-diagram';
import { StaffDiagram } from '@/components/keyboard-notes/staff-diagram';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { RollingText } from '@/components/ui/rolling-text';
import { getGuideCenter, getReadingGuide } from '@/lib/guide-content';
import { getLayouts } from '@/lib/keyboard-content';
import { editorialIntro } from '@/lib/seo-editorial';
import type { ExerciseBar, GuideBlock, GuideModel } from '@/lib/guide-types';
import '@/app/chords/a-minor/a-minor.css';
import '@/components/keyboard-notes/keyboard-notes.css';
import './guides.css';

function GuideShell({ model, children }: { model: GuideModel; children: ReactNode }) {
  const detail = model.url !== '/guide';
  return <div className="am-page gd-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Guide"/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading"><PageBreadcrumb items={detail ? [{ label: 'Guide', href: '/guide' }, { label: 'Read sheet music' }] : [{ label: 'Guide' }]}/><h1>{model.title}</h1><p className="am-direct-answer">{editorialIntro(model.url, model.description)}</p></header>
    {children}
    {model.links.length > 0 && <nav className="gd-related" aria-label="Related published guides">{model.links.map(link => <a className="am-button am-tertiary" href={link.url} key={link.url}>{link.label}</a>)}</nav>}
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

type TeachingBeat = { label: string; kind: 'note' | 'rest'; onset: number; duration: number };

function TeachingPattern({ events, caption }: { events: TeachingBeat[]; caption: string }) {
  return <div className="gd-beat-pattern gd-compact-pattern" role="img" aria-label={caption}>
    {events.map((item, index) => <div key={`${item.label}-${item.onset}-${index}`} className={item.kind === 'rest' ? 'gd-rest' : undefined} style={{ gridColumn: `${item.onset + 1} / span ${item.duration}` }}><strong>{item.kind === 'rest' ? 'rest' : item.label}</strong><span>{item.duration === 1 ? `count ${item.onset + 1}` : `counts ${item.onset + 1}–${item.onset + item.duration}`}</span></div>)}
  </div>;
}

function Printable({ url }: { url: string }) {
  return <aside className="gd-printable" aria-labelledby="gd-printable-title"><div><p className="gd-overline">Original printable · 4 pages</p><h2 id="gd-printable-title">Piano Starter and Reading Pack</h2><p>Both-clef note examples, two short reading lines, two rhythm lines and an answer key.</p></div><a className="am-button am-primary" href={url} download><RollingText>Download the PDF</RollingText></a></aside>;
}

export function GuideCenterPage() {
  const data = getGuideCenter();
  return <GuideShell model={data.model}><section className="gd-start" aria-labelledby="gd-start-title"><div><p className="gd-overline">Start here · about 3 minutes</p><h2 id="gd-start-title">Find three keys, then play four counts</h2><p>Locate middle C and try one complete bar before choosing another reading task.</p></div><BeatPattern bar={data.firstExample}/></section>
    <div className="gd-keyboard"><KeyboardDiagram keys={data.keyboardKeys} selected={60} marked={[60,62,64]} octaves label="C4, D4 and E4 on the piano keyboard"/></div>
    <ol className="gd-path" aria-label="Beginner learning path">{data.path.map((step) => <li key={step.step}><span className="gd-step-number">{String(step.step).padStart(2,'0')}</span><div><strong>{step.task}</strong>{step.available ? <a href={step.url}>Open this step <span aria-hidden="true">→</span></a> : <span className="gd-planned">Planned guide</span>}</div></li>)}</ol>
    <div className="am-reading gd-reading">{data.model.blocks.map((block) => <Section key={block.id} block={block}>{block.id === 'four-count-pattern' && <BeatPattern bar={data.firstExample} compact/>}{block.id === 'three-keys' && <a className="am-button am-tertiary gd-inline-link" href="/keyboard-notes/chart"><RollingText>Open the keyboard note chart</RollingText></a>}{block.id === 'next-step' && <a className="am-button am-tertiary gd-inline-link" href="/chords"><RollingText>Open the chord guide</RollingText></a>}</Section>)}</div><Printable url={data.printableURL}/>
  </GuideShell>;
}

const extraReadingBlocks: GuideBlock[] = [
  {
    id: 'match-keys',
    heading: 'Match Written Notes to Piano Keys',
    body: 'Middle C is C4. In treble clef it sits on the first ledger line below the staff; in bass clef it sits on the first ledger line above. Both written notes point to the same piano key. Read the clef before choosing the key.',
    sourceIDs: [],
  },
  {
    id: 'note-values',
    heading: 'Count Note Values and Rests',
    body: 'In these 4/4 examples, a quarter note lasts one beat, a half note lasts two beats, and a whole note lasts four beats. A rest tells you to remain silent for its value while keeping the beat moving. This beat counting applies to 4/4 here; it is not a claim that a quarter note lasts one beat in every time signature, or that note values equal a fixed number of seconds.',
    sourceIDs: [],
  },
  {
    id: 'time-accidentals',
    heading: 'Read Time Signatures and Accidentals',
    body: 'In 4/4, each bar contains four quarter-note beats. A sharp raises a written note by a semitone, a flat lowers it by a semitone, and a natural cancels the applicable sharp or flat. Check the key signature as well as any accidental beside the note.',
    sourceIDs: [],
  },
  {
    id: 'grand-staff',
    heading: 'Read the Grand Staff',
    body: 'Piano music often joins treble and bass staves into a grand staff. Notes written at the same beat line up in time. Read the clef on each staff; it identifies pitch, not an unbreakable rule about which hand must play.',
    sourceIDs: [],
  },
];

export function ReadSheetMusicPage() {
  const data = getReadingGuide();
  const treble = data.anchors.filter((item) => item.clef === 'treble');
  const bass = data.anchors.filter((item) => item.clef === 'bass');
  const c4Treble = data.anchors.find((item) => item.clef === 'treble' && item.pitch === 'C4');
  const c4Bass = data.anchors.find((item) => item.clef === 'bass' && item.pitch === 'C4');
  const c4Keys = getLayouts('/keyboard-notes')[0].keys.filter((key) => key.midi >= 55 && key.midi <= 67);
  const displayBlocks = data.model.blocks.flatMap((block) => block.id === 'face' ? [block, ...extraReadingBlocks] : [block]);
  return <GuideShell model={data.model}><nav className="gd-toc" aria-label="On this page"><span>On this page</span>{displayBlocks.map((block) => <a key={block.id} href={`#${block.id}`}>{block.heading}</a>)}</nav>
    <div className="am-reading gd-reading">{displayBlocks.map((block) => <Section key={block.id} block={block}>
      {block.id === 'reading-order' && <ol className="gd-read-order"><li>Clef</li><li>Key signature and accidentals</li><li>Line or space</li><li>Duration</li></ol>}
      {block.id === 'anchors' && <div className="gd-anchor-grid"><div><h3>Treble anchors</h3><StaffDiagram notes={treble.map((item) => item.staff)} selected=""/><dl>{treble.map((item) => <div key={item.pitch}><dt>{item.pitch}</dt><dd>{item.position}</dd></div>)}</dl></div><div><h3>Bass anchors</h3><StaffDiagram notes={bass.map((item) => item.staff)} selected=""/><dl>{bass.map((item) => <div key={item.pitch}><dt>{item.pitch}</dt><dd>{item.position}</dd></div>)}</dl></div></div>}
      {block.id === 'face' && <div className="gd-memory"><div><span>Treble spaces</span><strong>{data.trebleSpaces.join(' · ')}</strong><p>FACE applies here.</p></div><div><span>Bass spaces</span><strong>{data.bassSpaces.join(' · ')}</strong><p>A separate set of notes.</p></div></div>}
      {block.id === 'match-keys' && c4Treble && c4Bass && <div className="gd-c4-match"><div className="gd-anchor-grid"><div><h3>C4 in treble</h3><StaffDiagram notes={[c4Treble.staff]} selected="C4"/><p>{c4Treble.position}.</p></div><div><h3>C4 in bass</h3><StaffDiagram notes={[c4Bass.staff]} selected="C4"/><p>{c4Bass.position}.</p></div></div><div className="gd-keyboard"><KeyboardDiagram keys={c4Keys} selected={60} marked={[60]} octaves label="Middle C, C4, on the piano keyboard"/></div></div>}
      {block.id === 'note-values' && <div className="gd-rhythm-examples">
        <figure><figcaption>Four quarter notes · 1 / 2 / 3 / 4</figcaption><TeachingPattern caption="Four C4 quarter notes, one beat each" events={[{ label: 'C4', kind: 'note', onset: 0, duration: 1 }, { label: 'C4', kind: 'note', onset: 1, duration: 1 }, { label: 'C4', kind: 'note', onset: 2, duration: 1 }, { label: 'C4', kind: 'note', onset: 3, duration: 1 }]}/></figure>
        <figure><figcaption>One half note plus two quarter notes · hold 1–2 / 3 / 4</figcaption><TeachingPattern caption="C4 half note for beats 1 to 2, then two C4 quarter notes" events={[{ label: 'C4', kind: 'note', onset: 0, duration: 2 }, { label: 'C4', kind: 'note', onset: 2, duration: 1 }, { label: 'C4', kind: 'note', onset: 3, duration: 1 }]}/></figure>
        <figure><figcaption>Quarter note, quarter rest, half note · play 1 / rest 2 / hold 3–4</figcaption><TeachingPattern caption="C4 on beat 1, rest on beat 2, C4 half note on beats 3 to 4" events={[{ label: 'C4', kind: 'note', onset: 0, duration: 1 }, { label: 'rest', kind: 'rest', onset: 1, duration: 1 }, { label: 'C4', kind: 'note', onset: 2, duration: 2 }]}/></figure>
        <figure><figcaption>One whole note · hold 1–4</figcaption><TeachingPattern caption="C4 whole note held for four beats" events={[{ label: 'C4', kind: 'note', onset: 0, duration: 4 }]}/></figure>
      </div>}
      {block.id === 'grand-staff' && c4Treble && c4Bass && <div className="gd-grand-staff" role="img" aria-label="Treble and bass C4 aligned on the same beat, both naming middle C"><div><h3>Same beat, treble</h3><StaffDiagram notes={[c4Treble.staff]} selected="C4"/></div><div><h3>Same beat, bass</h3><StaffDiagram notes={[c4Bass.staff]} selected="C4"/></div><p>These two written C4 notes line up in time and name the same piano key. They are a reading alignment example, not a two-hand performance course.</p></div>}
      {block.id === 'check-yourself' && <div className="gd-exercise" data-exercise-id={data.exercise.id}><div className="gd-exercise-head"><div><p className="gd-overline">{data.exercise.clef} clef · {data.exercise.meter} · {data.exercise.keySignature}</p><h3>{data.exercise.title}</h3></div><span>{data.exercise.difficultyLabel}</span></div><div className="gd-bars">{data.exercise.bars.map((bar) => <div key={bar.number}><span>Bar {bar.number}</span><BeatPattern bar={bar} compact/></div>)}</div><details><summary>Reveal the pitch answer</summary><p>{data.exercise.bars.map((bar) => `Bar ${bar.number}: ${bar.events.map((item) => item.pitch).join(' ')}`).join(' | ')}</p></details><p className="gd-scope">{data.exercise.goal} Fingering is not supplied.</p><a className="am-button am-tertiary gd-inline-link" href={data.chartURL}><RollingText>Find C4–F4 on the keyboard chart</RollingText></a></div>}
    </Section>)}</div><Printable url={data.printableURL}/>
  </GuideShell>;
}
