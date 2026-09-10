import type { ReactNode } from 'react';
import { SiteFooter, SiteHeader } from '@/components/chords/site-chrome';
import { getScaleCenter, getScaleDetail } from '@/lib/scale-content';
import type { ScalePageModel } from '@/lib/scale-types';
import { ScaleCenterExperience } from './center-experience';
import { ScaleDetailExperience } from './detail-experience';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import '@/app/chords/a-minor/a-minor.css';
import '@/components/keyboard-notes/keyboard-notes.css';
import './scales.css';

function ScaleShell({ model, children }: { model: ScalePageModel; children: ReactNode }) {
  const detail = model.url !== '/scales';
  return <div className="am-page sc-page"><a className="am-skip" href="#main">Skip to content</a><SiteHeader search={null} current="Scales"/><main id="main" className="pr-container" tabIndex={-1}>
    <header className="am-page-heading sc-screen"><PageBreadcrumb items={detail ? [{ label: 'Scales', href: '/scales' }, { label: model.url.endsWith('c-major') ? 'C major' : 'A minor' }] : [{ label: 'Scales' }]}/><h1>{model.title}</h1><p className="am-direct-answer">{model.description}</p></header>
    {children}
  </main><SiteFooter url={model.url}/></div>;
}

function ReadingSection({ block, children }: { block: ScalePageModel['blocks'][number]; children?: ReactNode }) {
  return <section className="am-content-section" id={`sc-${block.id}`} data-block-id={block.id} tabIndex={-1} aria-labelledby={`sc-${block.id}-heading`}><h2 id={`sc-${block.id}-heading`}>{block.heading}</h2><div className="am-content-body"><p>{block.body}</p>{children}</div></section>;
}

function DataTable({ label, columns, rows }: { label: string; columns: string[]; rows: (string | number)[][] }) {
  return <div className="am-table-scroll" role="region" tabIndex={0} aria-label={label}><table className="sc-data-table"><caption className="pr-sr-only">{label}</caption><thead><tr>{columns.map((column) => <th scope="col" key={column}>{column}</th>)}</tr></thead><tbody>{rows.map((row, index) => <tr key={`${row[0]}-${index}`}>{row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}</tr>)}</tbody></table></div>;
}

export function ScalesCenterPage() {
  const data = getScaleCenter();
  const majorRows = data.options.filter((option) => option.form === 'major').map((option) => [option.tonic, option.sequences.RH.ascending.map((note) => note.spelling).join(' – ')]);
  const aMinorRows = data.options.filter((option) => option.tonic === 'A' && option.form !== 'major').map((option) => [option.formLabel, option.sequences.RH.ascending.map((note) => note.spelling).join(' – '), option.sequences.RH.descending.map((note) => note.spelling).join(' – ')]);
  return <ScaleShell model={data.model}>
    <ScaleCenterExperience options={data.options} keyboardKeys={data.keyboardKeys} detailURLs={data.availableDetailURLs}/>
    <div className="am-reading sc-reading sc-screen">{data.model.blocks.map((block) => <ReadingSection block={block} key={block.id}>
      {block.id === 'formula' && <><DataTable label="Major scale note chart" columns={['Starting note', 'Notes, tonic to tonic']} rows={majorRows}/><DataTable label="Scale form interval comparison" columns={['Form', 'Semitone steps']} rows={data.formComparison.map((item: any) => [item.id.replaceAll('-', ' '), (item.steps_semitones ?? item.ascending_steps_semitones).join(' – ')])}/></>}
      {block.id === 'minor' && <DataTable label="A minor form comparison" columns={['Form', 'Ascending', 'Descending']} rows={aMinorRows}/>} 
      {block.id === 'degrees' && <DataTable label="Scale degree names" columns={['Degree', 'Name']} rows={data.scaleDegrees.map((item: any) => [item.degree, item.name])}/>} 
      {block.id === 'jazz' && <DataTable label="Jazz scale examples" columns={['Example', 'Notes']} rows={data.jazzExamples.map((item: any) => [item.name, (item.notes ?? item.descending).join(' – ')])}/>} 
      {block.id === 'print' && <p className="sc-boundary">The current one-octave selection can be printed from the explorer. An all-scales or two-hand beginner PDF is not included in this release.</p>}
    </ReadingSection>)}</div>
  </ScaleShell>;
}

export function ScaleDetailPage({ url }: { url: '/scales/c-major' | '/scales/a-minor' }) {
  const data = getScaleDetail(url);
  return <ScaleShell model={data.model}>
    <ScaleDetailExperience options={data.options} keyboardKeys={data.keyboardKeys} defaultForm={data.defaultForm} tempoOptions={data.tempoOptions} keySignature={data.keySignature}/>
    <div className="am-reading sc-reading sc-screen">{data.model.blocks.map((block) => <ReadingSection block={block} key={block.id}>
      {url === '/scales/a-minor' && block.id === 'section-4' && <DataTable label="A natural minor scale chords" columns={['Degree', 'Chord', 'Notes']} rows={data.chords.map((item: any) => [item.roman, item.name, item.notes.join(' – ')])}/>} 
    </ReadingSection>)}
    {data.relatedLinks.length > 0 && <nav className="sc-related" aria-label="Related available references">{data.relatedLinks.map((link: { url: string; label: string }) => <a className="am-button am-tertiary" key={link.url} href={link.url}>{link.label}</a>)}</nav>}
    </div>
  </ScaleShell>;
}
