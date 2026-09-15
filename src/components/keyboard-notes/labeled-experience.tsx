'use client';
import { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import type { Layout } from '@/lib/keyboard-types';
import { layoutCode } from '@/lib/keyboard-resolution';
import { KeyboardDiagram } from './keyboard-diagram';
import { ShareControl } from './share-control';
import { LayoutChoice } from './tool-controls';

export function compactSegments(layout: Layout) {
  const pages = layout.key_count === 88 ? 3 : 2;
  const size = Math.ceil(layout.keys.length / pages);
  return Array.from({ length: pages }, (_, index) => layout.keys.slice(index * size, (index + 1) * size)).filter(segment => segment.length);
}

export function LabeledExperience({ layouts, sourceIDs }: { layouts: Layout[]; sourceIDs: string[] }) {
  const [layoutID, setLayoutID] = useState(layouts[0].layout_id);
  const [octaves, setOctaves] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [printPart, setPrintPart] = useState<number | null>(null);
  const [snapshot, setSnapshot] = useState<{ layout: Layout; octaves: boolean } | null>(null);
  const layout = layouts.find(item => item.layout_id === layoutID) ?? layouts[0];

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('layout') === '61' ? '61' : '88';
    const restored = layouts.find(item => layoutCode(item) === code) ?? layouts[0];
    setLayoutID(restored.layout_id);
    if (params.get('octaves') === '0') setOctaves(false);
    const requestedPart = Number(params.get('printPart'));
    if (params.has('printPart') && Number.isInteger(requestedPart) && requestedPart >= 0) setPrintPart(requestedPart);
    setReady(true);
  }, [layouts]);

  const print = snapshot ?? { layout, octaves };
  const printSegments = compactSegments(print.layout);
  const renderedSegments = printPart === null ? printSegments : printSegments.slice(printPart, printPart + 1);
  const shareParams = useMemo(() => new URLSearchParams({ layout: layoutCode(layout), octaves: octaves ? '1' : '0' }), [layout, octaves]);
  return <>
    <section className="am-tool kn-tool kn-screen" aria-label="Labeled keyboard reference">
      <div className="kn-toolbar"><LayoutChoice layouts={layouts} value={layoutID} ready={ready} onChange={setLayoutID}/><label className="kn-checkbox"><input type="checkbox" checked={octaves} disabled={!ready} onChange={event => setOctaves(event.target.checked)}/>Show octave numbers</label></div>
      <p className="kn-range">{layout.label} · {layout.white_key_count} white / {layout.black_key_count} black keys</p>
      <div className="kn-toolbar"><button className="am-button am-secondary" disabled={!ready} onClick={() => { flushSync(() => setSnapshot({ layout, octaves })); try { window.print(); } catch { setError('Printing could not start. Download the reference PDF instead.'); } }}>Print this reference</button><a className="am-button am-tertiary" download href={`/reference/generated/keyboard-notes/labeled-${layout.key_count}-${octaves ? 'octaves' : 'letters'}.pdf`}>Download reference PDF</a><ShareControl path="/keyboard-notes/labeled" params={shareParams} label="Share this reference"/></div>
      <p role="status" className="kn-error">{error}</p><p className="kn-hint">Reference diagram - not a full-size sticker template. Octave numbers identify register, not fingers.</p>
      <nav className="kn-actions" aria-label="Octave sections">{layout.reading_segments.map((segment, index) => <a key={segment.label} href={`#labels-section-${index}`} className="am-button am-tertiary">{segment.label}</a>)}</nav>
      {layout.reading_segments.map((segment, index) => <section className="kn-segment" key={segment.label} id={`labels-section-${index}`} tabIndex={-1}><h2>{segment.label}</h2><KeyboardDiagram keys={layout.keys.filter(key => key.midi >= segment.midi_range[0] && key.midi <= segment.midi_range[1])} octaves={octaves} label={`${segment.label} labels`}/></section>)}
      <p>{layout.scope_note}</p>
    </section>
    <div className="kn-print-only" data-print-layout={print.layout.layout_id} data-print-octaves={print.octaves}>{renderedSegments.map((keys, renderedIndex) => { const index = printPart ?? renderedIndex; return <section className="kn-print-sheet" key={keys[0].midi}><div className="kn-print-title">Labeled Piano Keys</div><p>{print.layout.label} · Part {index + 1} of {printSegments.length} · {keys[0].label_with_octave.split(' / ')[0]} to {keys.at(-1)!.label_with_octave.split(' / ')[0]}</p><p>Octave numbers: {print.octaves ? 'shown' : 'hidden'}. Middle C = C4.</p><KeyboardDiagram keys={keys} octaves={print.octaves}/><footer><p>PianoGrid · pianogrid.com/keyboard-notes/labeled</p><p>Reference diagram - not a full-size sticker template.</p><p className="kn-print-sources">Sources: {sourceIDs.join(', ')}</p></footer></section>;})}</div>
  </>;
}
