import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { getScaleCenter, getScaleDetail } from '@/lib/scale-content';
import type { ScaleCopySection, ScalePageModel } from '@/lib/scale-types';
import { ScaleCenterExperience } from './center-experience';
import { ScaleDetailExperience } from './detail-experience';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import '@/app/chords/a-minor/a-minor.css';
import '@/components/keyboard-notes/keyboard-notes.css';
import './scales.css';

const display = (value: string) => value.replaceAll('##', '𝄪').replaceAll('bb', '𝄫').replaceAll('#', '♯').replaceAll('b', '♭');

function ScaleShell({ model, children }: { model: ScalePageModel; children: ReactNode }) {
  const detail = model.url !== '/scales';
  return <div className="am-page sc-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Scales"/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading sc-screen"><PageBreadcrumb items={detail ? [{ label: 'Scales', href: '/scales' }, { label: model.url.endsWith('c-major') ? 'C major' : 'A minor' }] : [{ label: 'Scales' }]}/><h1>{model.copy.h1}</h1><p className="am-direct-answer">{model.copy.intro}</p><nav className="sc-jumps" aria-label="On this page">{model.copy.jumps.map((jump) => <a href={jump.href} key={jump.href}>{jump.label}</a>)}</nav></header>
    <noscript><p className="sc-nojs-note">Enable JavaScript for audio and answer checking. The reference and static answers remain available.</p></noscript>{children}
  </main><SiteFooter url={model.url}/></div>;
}

function DataTable({ label, columns, rows }: { label: string; columns: string[]; rows: (string | number)[][] }) {
  return <div className="am-table-scroll" role="region" tabIndex={0} aria-label={label}><table className="sc-data-table"><caption className="pr-sr-only">{label}</caption><thead><tr>{columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

const compatibilityAnchors: Record<string, string[]> = {
  start: ['two-hand-printable'], formula: ['chart', 'major', 'formulas'], minor: ['minor'], jazz: ['jazz'], types: ['explore'], practice: ['practice'], print: ['print'],
  notes: [], focus: [], fingering: ['fingering'], 'section-1': [], 'section-2': [], 'section-3': [], 'section-4': [],
};

function CopySection({ section, model, children }: { section: ScaleCopySection; model: ScalePageModel; children?: ReactNode }) {
  const block = section.legacyBlockID ? model.blocks.find((item) => item.id === section.legacyBlockID) : null;
  const id = block ? `sc-${block.id}` : section.id;
  return <section className="am-content-section sc-copy-section" id={id} data-block-id={block?.id} tabIndex={-1} aria-labelledby={`${id}-heading`}>
    {(compatibilityAnchors[block?.id ?? ''] ?? []).map((anchor) => <span className="sc-anchor" id={anchor} key={anchor} aria-hidden="true"/>)}
    <h2 id={`${id}-heading`}>{section.heading}</h2><div className="am-content-body">
      {block && <p className="sc-preserved-copy">{block.body}</p>}
      {section.noteLines?.map((line) => <p className="sc-copy-note-line" key={line}>{display(line)}</p>)}
      {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      {section.table && <DataTable label={section.table.label} columns={section.table.columns} rows={section.table.rows}/>} 
      {children}
      {section.links && <nav className="sc-related" aria-label={`${section.heading} links`}>{section.links.map((link) => <a className="am-button am-tertiary" href={link.href} key={link.href}>{link.label}</a>)}</nav>}
    </div>
  </section>;
}

function FAQAndSources({ model }: { model: ScalePageModel }) {
  return <>
    <section className="am-content-section sc-copy-section" id="faq"><h2>Frequently asked questions</h2><div className="am-content-body sc-faq-list">{model.copy.faqs.map((faq) => <details key={faq.question}><summary>{faq.question}</summary><p>{faq.answer}</p></details>)}</div></section>
    <section className="am-content-section sc-copy-section" id="sources"><h2>Sources and scope</h2><div className="am-content-body"><p>{model.copy.sourceNote}</p></div></section>
  </>;
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
    <div className="am-reading sc-reading sc-screen">{data.model.copy.sections.map((section) => <CopySection section={section} model={data.model} key={section.id}>
      {section.legacyBlockID === 'formula' && <><DataTable label="Major scales at a glance" columns={['Scale', 'Seven note names']} rows={majorRows}/><DataTable label="Scale form interval comparison" columns={['Form', 'Semitone steps']} rows={data.formComparison.map((item: any) => [display(item.id.replaceAll('-', ' ')), (item.steps_semitones ?? item.ascending_steps_semitones).join(' – ')])}/></>}
      {section.legacyBlockID === 'minor' && <><DataTable label="A minor form comparison" columns={['Form', 'Ascending', 'Descending']} rows={aMinorRows}/><DataTable label="Minor changes for fifteen retained tonics" columns={['Tonic', 'Natural minor: seven notes', 'Harmonic: raised seventh', 'Classical ascent: raised sixth and seventh']} rows={minorRows}/></>}
      {section.legacyBlockID === 'degrees' && <DataTable label="Scale degree names in C major" columns={['Degree', 'Note', 'Name']} rows={data.scaleDegrees.map((item: any, index: number) => [item.degree, ['C','D','E','F','G','A','B'][index], item.name])}/>} 
      {section.legacyBlockID === 'jazz' && <DataTable label="Jazz-related scale examples" columns={['Example', 'Notes or performance order']} rows={data.jazzExamples.map((item: any) => [item.name, (item.notes ?? item.descending).map(display).join(' – ')])}/>} 
    </CopySection>)}<FAQAndSources model={data.model}/></div>
  </ScaleShell>;
}

export function ScaleDetailPage({ url }: { url: '/scales/c-major' | '/scales/a-minor' }) {
  const data = getScaleDetail(url);
  return <ScaleShell model={data.model}>
    <ScaleDetailExperience options={data.options} keyboardKeys={data.keyboardKeys} defaultForm={data.defaultForm} tempoOptions={data.tempoOptions} keySignature={data.keySignature}/>
    <div className="am-reading sc-reading sc-screen">{data.model.copy.sections.map((section) => <CopySection section={section} model={data.model} key={section.id}>
      {url === '/scales/a-minor' && section.legacyBlockID === 'section-4' && <DataTable label="Triads from A natural minor" columns={['Degree', 'Chord', 'Notes']} rows={data.chords.map((item: any) => [item.degree, item.name, item.notes.map(display).join(' – ')])}/>} 
    </CopySection>)}<FAQAndSources model={data.model}/></div>
  </ScaleShell>;
}
