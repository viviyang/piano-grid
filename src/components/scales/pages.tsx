import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { getScaleCenter, getScaleDetail } from '@/lib/scale-content';
import { getArpeggios, getCompletionScaleDetail, getScaleFamily, validateCompletionAuthoringPage } from '@/lib/scale-completion-content';
import type { ScaleCopySection, ScaleDetailRoute, ScaleFamilyRoute, ScalePageModel } from '@/lib/scale-types';
import { ScaleCenterExperience } from './center-experience';
import { ScaleDetailExperience } from './detail-experience';
import { ScaleCollectionExperience } from './scale-collection-experience';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { SCALE_FAMILY_ROUTES } from '@/lib/scale-completion-types';
import { editorialHeading, editorialIntro, editorialSectionHeading, hideInternalScaleSources, publicSourceAttribution } from '@/lib/seo-editorial';
import { ScaleTrackedLink } from './scale-tracked-link';
import { ScaleAdLayoutSlot } from './scale-ad-layout-slot';
import '@/app/chords/a-minor/a-minor.css';
import '@/components/keyboard-notes/keyboard-notes.css';
import './scales.css';

const display = (value: string) => value.replaceAll('##', '𝄪').replaceAll('bb', '𝄫').replaceAll('#', '♯').replaceAll('b', '♭');
const wholeHalfPattern = (steps: number[]) => steps.map((step) => (step === 2 ? 'W' : step === 1 ? 'H' : String(step))).join('–');

function ScaleShell({ model, children }: { model: ScalePageModel; children: ReactNode }) {
  validateCompletionAuthoringPage(model.url);
  const detail = model.url !== '/scales';
  const h1 = editorialHeading(model.url, model.copy.h1);
  const intro = editorialIntro(model.url, model.copy.intro);
  const jumps = model.url === '/scales/modes'
    ? [{ label: 'Compare the Seven Scale Modes', href: '#comparison' }, { label: 'Explore a Mode', href: '#explore-mode' }, ...model.copy.jumps.map((jump) => ({ ...jump, label: editorialSectionHeading(model.url, jump.label) }))]
    : model.copy.jumps;
  return <div className={`am-page sc-page${model.url === '/scales/modes' ? ' sc-modes' : ''}`}><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Scales"/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading sc-screen"><PageBreadcrumb items={detail ? [{ label: 'Scales', href: '/scales' }, { label: h1.replace(/:.*$/, '') }] : [{ label: 'Scales' }]}/><h1>{h1}</h1><p className="am-direct-answer">{intro}</p><nav className="sc-jumps" aria-label="On this page">{jumps.map((jump) => <a href={jump.href} key={jump.href}>{jump.label}</a>)}</nav></header>
    <noscript><p className="sc-nojs-note">Enable JavaScript for audio and answer checking. The reference and static answers remain available.</p></noscript>{children}
  </main><SiteFooter url={model.url}/></div>;
}

function DataTable({ label, columns, rows }: { label: string; columns: string[]; rows: (string | number)[][] }) {
  const hintID = `table-hint-${label.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
  return <div className="sc-table-wrap"><p className="sc-table-hint" id={hintID}>On a narrow screen, scroll this table horizontally to read every column.</p><div className="am-table-scroll sc-table-scroll" role="region" tabIndex={0} aria-label={label} aria-describedby={hintID}><table className="sc-data-table"><caption className="pr-sr-only">{label}</caption><thead><tr>{columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div></div>;
}

const compatibilityAnchors: Record<string, string[]> = {
  start: ['what-is-a-scale', 'two-hand-printable'], formula: ['chart', 'major', 'formulas'], minor: ['minor', 'major-vs-minor'], degrees: ['fingering', 'scale-degrees'], jazz: ['jazz'], types: ['explore'], practice: ['practice'], print: ['print'],
  notes: [], focus: [], fingering: ['fingering'], 'section-1': [], 'section-2': [], 'section-3': ['practice'], 'section-4': [],
};

function CopySection({ section, model, children }: { section: ScaleCopySection; model: ScalePageModel; children?: ReactNode }) {
  const block = section.legacyBlockID ? model.blocks.find((item) => item.id === section.legacyBlockID) : null;
  const id = block ? `sc-${block.id}` : section.id;
  return <section className="am-content-section sc-copy-section" id={id} data-block-id={block?.id} tabIndex={-1} aria-labelledby={`${id}-heading`}>
    {(compatibilityAnchors[block?.id ?? ''] ?? []).map((anchor) => <span className="sc-anchor" id={anchor} key={anchor} aria-hidden="true"/>)}
    <h2 id={`${id}-heading`}>{editorialSectionHeading(model.url, section.heading)}</h2><div className="am-content-body">
      {block && <p className="sc-preserved-copy">{block.body}</p>}
      {section.noteLines?.map((line) => <p className="sc-copy-note-line" key={line}>{display(line)}</p>)}
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.table && <DataTable label={section.table.label} columns={section.table.columns} rows={section.table.rows}/>} 
      {children}
      {section.links && <nav className="sc-related" aria-label={`${editorialSectionHeading(model.url, section.heading)} links`}>{section.links.map((link) => <ScaleTrackedLink event="related" className="am-button am-tertiary" href={link.href} key={link.href}>{link.label}</ScaleTrackedLink>)}</nav>}
    </div>
  </section>;
}

function FAQAndSources({ model }: { model: ScalePageModel }) {
  const modes = model.url === '/scales/modes';
  const concise = modes || hideInternalScaleSources(model.url);
  const sourceIntro = modes
    ? 'References for the mode notes, interval patterns and C examples on this page.'
    : 'References for the notes, patterns and examples on this page.';
  return <>
    <section className="am-content-section sc-copy-section" id="faq"><h2>Frequently asked questions</h2><div className="am-content-body sc-faq-list">{model.copy.faqs.map((faq) => <details key={faq.id ?? faq.question} data-faq-id={faq.id}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
    <section className="am-content-section sc-copy-section" id="sources"><h2>{concise ? 'Sources' : 'Sources and scope'}</h2><div className="am-content-body"><p>{concise ? sourceIntro : model.copy.sourceNote}</p><div className="sc-page-sources">{model.pageSources.map((source) => <article key={source.sourceID}><h3><a href={source.url}>{source.publisher} — {source.title}</a></h3>{concise ? <p>{publicSourceAttribution(source.scope)}</p> : <><p><strong>Supports:</strong> {source.scope}</p><p><strong>Location:</strong> {source.locator}</p><p className="sc-source-id">Source record: {source.sourceID}</p></>}</article>)}</div></div></section>
  </>;
}

function ScaleResourceLibrary() {
  const resources = [
    { title: '12 Major Scales - Note Reference', scope: 'Twelve tonic pitch classes; one-octave ascending and descending note, staff and keyboard references.', letter: '/downloads/scales/pianogrid-12-major-scales-note-reference.pdf', a4: '/downloads/scales/pianogrid-12-major-scales-note-reference-a4.pdf' },
    { title: 'Major & Minor Scale Note Atlas', scope: 'All 60 named references in the current chart; each minor form prints its actual ascent and descent.', letter: '/downloads/scales/pianogrid-major-minor-note-atlas.pdf', a4: '/downloads/scales/pianogrid-major-minor-note-atlas-a4.pdf' },
    { title: 'C Major Two-Hand Starter Reference', scope: 'Separate RH C4-C5 and LH C3-C4 one-octave rows; not a two-hand performance assessment.', letter: '/downloads/scales/pianogrid-c-major-two-hand-starter.pdf', a4: '/downloads/scales/pianogrid-c-major-two-hand-starter-a4.pdf' },
  ];
  return <section className="am-content-section sc-resource-library sc-screen" id="resources"><h2>Printable scale resources</h2><div className="am-content-body"><p>Choose the exact coverage and paper size you need. Fingering coverage varies by selection; these resources do not extend one-octave fingerings to longer ranges.</p><div className="sc-resource-grid">{resources.map((resource) => { const asset = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'); return <article key={resource.title}><h3>{resource.title}</h3><p>{resource.scope}</p><div className="sc-related"><ScaleTrackedLink event="resource" assetID={`${asset}-letter`} paperSize="Letter" className="am-button am-secondary" href={resource.letter}>Letter PDF</ScaleTrackedLink><ScaleTrackedLink event="resource" assetID={`${asset}-a4`} paperSize="A4" className="am-button am-tertiary" href={resource.a4}>A4 PDF</ScaleTrackedLink></div></article>; })}</div><p><ScaleTrackedLink event="resource" assetID="starter-reference" href="/downloads/scales/pianogrid-scales-starter-reference.pdf">C major and A minor one-octave reference</ScaleTrackedLink> and <ScaleTrackedLink event="resource" assetID="notes-check-worksheet" href="/downloads/scales/pianogrid-scales-notes-check-worksheet.pdf">scale-notes worksheet</ScaleTrackedLink> remain available at their existing paths.</p></div></section>;
}

function routeLabel(url: string) {
  if (url === '/arpeggios') return 'Major arpeggios';
  if (url === '/guide/piano-scales') return 'Piano scales practice guide';
  return url.split('/').at(-1)!.split('-').map((word) => word === 'a' ? 'A' : word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

function ScaleRouteDirectory({ detailURLs }: { detailURLs: string[] }) {
  const urls = [...detailURLs, ...SCALE_FAMILY_ROUTES, '/arpeggios', '/guide/piano-scales'];
  return <section className="am-content-section sc-copy-section sc-screen" id="supported-references"><h2>Supported scale references</h2><div className="am-content-body"><p>Open a ready detail, family comparison, arpeggio reference or practice guide. These links do not create filter-state URLs.</p><nav className="sc-route-directory" aria-label="Supported scale references">{[...new Set(urls)].map((url) => <ScaleTrackedLink event="related" href={url} key={url}>{routeLabel(url)}</ScaleTrackedLink>)}</nav></div></section>;
}

export function ScalesCenterPage() {
  const data = getScaleCenter();
  const majorRows = data.options.filter((option) => option.form === 'major').map((option) => [`${display(option.tonic)} major`, option.sequences.RH.ascending.slice(0, -1).map((note) => display(note.spelling)).join(' – ')]);
  const aMinorRows = data.options.filter((option) => option.tonic === 'A' && option.form !== 'major').map((option) => [option.formLabel, option.sequences.RH.ascending.map((note) => display(note.spelling)).join(' – '), option.sequences.RH.descending.map((note) => display(note.spelling)).join(' – ')]);
  const minorRows = data.options.filter((option) => option.form === 'natural_minor').map((natural) => {
    const harmonic = data.options.find((option) => option.tonic === natural.tonic && option.form === 'harmonic_minor')!;
    const melodic = data.options.find((option) => option.tonic === natural.tonic && option.form === 'melodic_minor_classical')!;
    return [display(natural.tonic), natural.sequences.RH.ascending.slice(0, -1).map((note) => display(note.spelling)).join(' – '), display(harmonic.sequences.RH.ascending.at(-2)!.spelling), melodic.sequences.RH.ascending.slice(-3, -1).map((note) => display(note.spelling)).join(', ')];
  });
  return <ScaleShell model={data.model}>
    <ScaleCenterExperience options={data.options} keyboardKeys={data.keyboardKeys} detailURLs={data.availableDetailURLs}/>
    <ScaleAdLayoutSlot id="scales-center-after-workspace"/>
    <div className="am-reading sc-reading"><ScaleRouteDirectory detailURLs={data.availableDetailURLs}/></div>
    <div className="am-reading sc-reading"><ScaleResourceLibrary/></div>
    <div className="am-reading sc-reading sc-screen">{data.model.copy.sections.map((section) => <CopySection section={section} model={data.model} key={section.id}>
      {section.legacyBlockID === 'formula' && <><DataTable label="Major scales at a glance" columns={['Scale', 'Seven note names']} rows={majorRows}/><DataTable label="Scale form interval comparison" columns={['Form', 'Semitone steps']} rows={data.formComparison.map((item: any) => [display(item.id.replaceAll('-', ' ')), (item.steps_semitones ?? item.ascending_steps_semitones).join(' – ')])}/></>}
      {section.legacyBlockID === 'minor' && <><DataTable label="A minor form comparison" columns={['Form', 'Ascending', 'Descending']} rows={aMinorRows}/><DataTable label="Minor changes for fifteen retained tonics" columns={['Tonic', 'Natural minor: seven notes', 'Harmonic: raised seventh', 'Classical ascent: raised sixth and seventh']} rows={minorRows}/></>}
      {section.legacyBlockID === 'degrees' && <DataTable label="Scale degree names in C major" columns={['Degree', 'Note', 'Name']} rows={data.scaleDegrees.map((item: any, index: number) => [item.degree, ['C','D','E','F','G','A','B'][index], item.name])}/>} 
      {section.legacyBlockID === 'jazz' && <DataTable label="Jazz-related scale examples" columns={['Example', 'Notes or performance order']} rows={data.jazzExamples.map((item: any) => [item.name, (item.notes ?? item.descending).map(display).join(' – ')])}/>} 
    </CopySection>)}<FAQAndSources model={data.model}/></div>
  </ScaleShell>;
}

export function ScaleDetailPage({ url }: { url: ScaleDetailRoute }) {
  const data = url === '/scales/c-major' || url === '/scales/a-minor' ? getScaleDetail(url) : getCompletionScaleDetail(url);
  return <ScaleShell model={data.model}>
    <ScaleDetailExperience options={data.options} keyboardKeys={data.keyboardKeys} defaultForm={data.defaultForm} tempoOptions={data.tempoOptions} keySignature={data.keySignature} conciseSources={hideInternalScaleSources(url)}/>
    <ScaleAdLayoutSlot id="scale-detail-after-workspace"/>
    <div className="am-reading sc-reading sc-screen">{data.model.copy.sections.map((section) => <CopySection section={section} model={data.model} key={section.id}>
      {url === '/scales/a-minor' && section.legacyBlockID === 'section-4' && <DataTable label="Triads from A natural minor" columns={['Degree', 'Chord', 'Notes']} rows={data.chords.map((item: any) => [item.degree, item.name, item.notes.map(display).join(' – ')])}/>} 
    </CopySection>)}<FAQAndSources model={data.model}/></div>
  </ScaleShell>;
}

function FamilyComparison({ url, data }: { url: ScaleFamilyRoute; data: ReturnType<typeof getScaleFamily> }) {
  const modes = url === '/scales/modes';
  const columns = modes ? ['Mode', 'Notes on C', 'Whole/half-step pattern', 'Semitone pattern'] : ['Example', 'Ascending notes', 'Interval steps'];
  const rows = data.examples.map((example) => {
    const notes = example.option.sequences.RH.ascending.map((note) => display(note.spelling)).join(' – ');
    const semitones = example.option.semitoneSteps.join(modes ? '–' : ' – ');
    return modes ? [example.option.formLabel, notes, wholeHalfPattern(example.option.semitoneSteps), semitones] : [example.label, notes, semitones];
  });
  return <section className="am-content-section" id="comparison">
    <h2>{modes ? 'Compare the Seven Scale Modes' : 'Complete supported comparison'}</h2>
    <div className="am-content-body">
      <p>{modes ? 'Each row keeps C as the tonic so the seven mode patterns can be compared side by side. The last C repeats the tonic one octave higher.' : 'This table lists every named example supported on this page. The final repeated note is the octave endpoint.'}</p>
      <DataTable label={modes ? 'Seven scale modes on C' : `${data.model.title} supported examples`} columns={columns} rows={rows}/>
    </div>
  </section>;
}

export function ScaleFamilyPage({ url }: { url: ScaleFamilyRoute }) {
  const data = getScaleFamily(url);
  const modes = url === '/scales/modes';
  const comparison = <FamilyComparison url={url} data={data}/>;
  return <ScaleShell model={data.model}>
    {modes && <div className="am-reading sc-reading sc-screen">{comparison}</div>}
    <ScaleCollectionExperience examples={data.examples} keyboardKeys={data.keyboardKeys} defaultExampleID={data.defaultExampleID} kind="scale" scope={data.scope} conciseSources={hideInternalScaleSources(url)} explorerHeading={modes ? 'Explore a Mode' : undefined} hideScopeNote={modes}/>
    <ScaleAdLayoutSlot id="scale-family-after-workspace"/>
    <div className="am-reading sc-reading sc-screen">{!modes && comparison}{data.model.copy.sections.map((section) => <CopySection section={section} model={data.model} key={section.id}/>)}<FAQAndSources model={data.model}/></div>
  </ScaleShell>;
}

export function ArpeggiosPage() {
  const data = getArpeggios();
  return <ScaleShell model={data.model}>
    <ScaleCollectionExperience examples={data.examples} keyboardKeys={data.keyboardKeys} defaultExampleID={data.defaultExampleID} kind="arpeggio" scope={data.scope}/>
    <ScaleAdLayoutSlot id="arpeggio-after-workspace"/>
    <div className="am-reading sc-reading sc-screen"><span className="sc-anchor" id="c-major" aria-hidden="true"/><span className="sc-anchor" id="g-major" aria-hidden="true"/><section className="am-content-section" id="comparison"><h2>C and G arpeggio comparison</h2><div className="am-content-body"><DataTable label="Supported major arpeggios" columns={['Reference view', 'Ascending notes', 'Fingering scope']} rows={data.examples.map((example) => [example.label, example.option.sequences[example.renderHand].ascending.map((note) => display(note.spelling)).join(' – '), example.viewHand === null ? 'No hand assigned; notes only' : `${example.viewHand === 'RH' ? 'Right' : 'Left'} hand, one octave`])}/></div></section>{data.model.copy.sections.map((section) => <CopySection section={section} model={data.model} key={section.id}/>)}<FAQAndSources model={data.model}/></div>
  </ScaleShell>;
}
