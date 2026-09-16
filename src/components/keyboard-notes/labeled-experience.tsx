'use client';

import { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import type { Layout } from '@/lib/keyboard-types';
import { layoutCode } from '@/lib/keyboard-resolution';
import { practiceEntryHref } from '@/lib/keyboard-practice';
import { clampRangeStart, labeledFullSegments, printCompactSegments, visibleMidiWindow } from '@/lib/keyboard-viewport';
import { KeyboardDiagram } from './keyboard-diagram';
import { ShareControl } from './share-control';
import { LayoutChoice } from './tool-controls';
import { LabeledFullReferenceCollapsible } from './labeled-full-reference-collapsible';
import { TeachingPackExperience } from './teaching-pack';

export type LabeledSourceRef = { id: string; title: string; publisher: string; url: string };

function primaryLabel(label: string) {
  return label.split(' / ')[0];
}

export function compactSegments(layout: Layout) {
  return printCompactSegments(layout);
}

export function LabeledExperience({ layouts, sources }: { layouts: Layout[]; sources: LabeledSourceRef[] }) {
  const [layoutID, setLayoutID] = useState(layouts[0].layout_id);
  const [octaves, setOctaves] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState('');
  const [printPart, setPrintPart] = useState<number | null>(null);
  const [snapshot, setSnapshot] = useState<{ layout: Layout; octaves: boolean } | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const layout = layouts.find(item => item.layout_id === layoutID) ?? layouts[0];
  const whiteSpan = 12;
  const [rangeStart, setRangeStart] = useState(60);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const code = params.get('layout') === '61' ? '61' : '88';
    const restored = layouts.find(item => layoutCode(item) === code) ?? layouts[0];
    setLayoutID(restored.layout_id);
    if (params.get('octaves') === '0') setOctaves(false);
    setRangeStart(clampRangeStart(restored, 60, whiteSpan));
    setReady(true);
  }, [layouts]);

  useEffect(() => {
    setRangeStart(clampRangeStart(layout, 60, whiteSpan));
  }, [layout]);

  useEffect(() => {
    const segments = printCompactSegments(layout);
    const params = new URLSearchParams(window.location.search);
    if (!params.has('printPart')) {
      setPrintPart(null);
      return;
    }
    const requestedPart = Number(params.get('printPart'));
    if (Number.isInteger(requestedPart) && requestedPart >= 0 && requestedPart < segments.length) {
      setPrintPart(requestedPart);
      return;
    }
    setPrintPart(null);
  }, [layout]);

  useEffect(() => {
    const clear = () => setSnapshot(null);
    window.addEventListener('afterprint', clear);
    return () => window.removeEventListener('afterprint', clear);
  }, []);

  useEffect(() => {
    const capture = () => {
      flushSync(() => setSnapshot({ layout, octaves }));
    };
    window.addEventListener('beforeprint', capture);
    return () => window.removeEventListener('beforeprint', capture);
  }, [layout, octaves]);

  const { rangeMin, rangeMax, keys: visibleKeys } = useMemo(() => visibleMidiWindow(layout, rangeStart, whiteSpan), [layout, rangeStart]);
  const fullSegments = useMemo(() => labeledFullSegments(layout), [layout]);
  const print = snapshot ?? { layout, octaves };
  const printSegments = compactSegments(print.layout);
  const activePrintPart = printPart !== null && printPart < printSegments.length ? printPart : null;
  const renderedSegments = activePrintPart === null ? printSegments : printSegments.slice(activePrintPart, activePrintPart + 1);
  const shareParams = useMemo(() => new URLSearchParams({ layout: layoutCode(layout), octaves: octaves ? '1' : '0' }), [layout, octaves]);
  const canLower = rangeStart > layout.keys[0].midi;
  const canHigher = rangeMax < layout.keys.at(-1)!.midi;
  const pdfHref = `/reference/generated/keyboard-notes/labeled-${layout.key_count}-${octaves ? 'octaves' : 'letters'}.pdf`;

  function startPrint() {
    flushSync(() => setSnapshot({ layout, octaves }));
    try { window.print(); }
    catch { setError('Printing could not start. Download the reference PDF instead.'); }
  }

  return <>
    <section className="am-tool kn-tool kn-screen kn-labeled" aria-label="Labeled keyboard reference">
      <div className="kn-labeled-toolbar">
        <LayoutChoice layouts={layouts} value={layoutID} ready={ready} onChange={setLayoutID}/>
        <label className="kn-checkbox"><input type="checkbox" checked={octaves} disabled={!ready} onChange={event => setOctaves(event.target.checked)}/>Octave numbers</label>
        <div className="kn-labeled-actions">
          <button className="am-button am-primary" disabled={!ready} onClick={startPrint}>Print reference</button>
          <div className="kn-labeled-more">
            <button type="button" className="am-button am-tertiary" aria-expanded={moreOpen} onClick={() => setMoreOpen(value => !value)}>More</button>
            {moreOpen ? (
              <div className="kn-labeled-more-panel">
                <a className="am-button am-tertiary" download href={pdfHref}>Download PDF</a>
                <ShareControl path="/keyboard-notes/labeled" params={shareParams} label="Share reference"/>
              </div>
            ) : null}
          </div>
          <a className="am-button am-tertiary kn-labeled-desktop-only" download href={pdfHref}>Download PDF</a>
          <div className="kn-labeled-desktop-only"><ShareControl path="/keyboard-notes/labeled" params={shareParams} label="Share reference"/></div>
        </div>
      </div>
      <p role="status" className="kn-error">{error}</p>
      <p className="kn-hint">Reference diagram — not a full-size sticker template. Octave numbers identify register, not fingers.</p>

      <div className="kn-labeled-viewport">
        <KeyboardDiagram
          keys={visibleKeys}
          octaves={octaves}
          fit
          autoCenter={false}
          label={`Labeled keys ${primaryLabel(visibleKeys[0]?.label_with_octave ?? '')} to ${primaryLabel(visibleKeys.at(-1)?.label_with_octave ?? '')}`}
        />
        <div className="kn-v2-range-row">
          <button type="button" className="kn-v2-text-button" disabled={!canLower || !ready} onClick={() => setRangeStart(value => clampRangeStart(layout, value - whiteSpan, whiteSpan))} aria-pressed={false}>Lower notes</button>
          <p>Showing {primaryLabel(visibleKeys[0]?.label_with_octave ?? '')}–{primaryLabel(visibleKeys.at(-1)?.label_with_octave ?? '')}</p>
          <button type="button" className="kn-v2-text-button" disabled={!canHigher || !ready} onClick={() => setRangeStart(value => clampRangeStart(layout, value + whiteSpan, whiteSpan))}>Higher notes</button>
        </div>
        <div className="kn-v2-overview" aria-label={`${layout.label} overview. Current visible range is marked.`}>
          <KeyboardDiagram keys={layout.keys} marked={visibleKeys.map(key => key.midi)} octaves={false} showVisualLabels={false} fit autoCenter={false}/>
        </div>
      </div>

      <LabeledFullReferenceCollapsible defaultOpen>
        {fullSegments.map(segment => (
          <section className="kn-segment" key={segment.label} id={`labels-${segment.label.replace(/[^\w]+/g, '-').toLowerCase()}`} tabIndex={-1}>
            <h2>{segment.label}</h2>
            <KeyboardDiagram keys={segment.keys} octaves={octaves} label={`${segment.label} labels`}/>
          </section>
        ))}
      </LabeledFullReferenceCollapsible>
    </section>

    <TeachingPackExperience layout={layout} />

    <section className="kn-screen kn-labeled-followup" aria-label="Labeled keyboard guide">
      <section className="kn-labeled-guide" aria-labelledby="kn-label-guide-title">
        <h2 id="kn-label-guide-title">How to label your keyboard</h2>
        <ol>
          <li>Match your layout</li>
          <li>Find the repeating pattern</li>
          <li>Add octave numbers when needed</li>
        </ol>
        <nav className="kn-actions" aria-label="Related keyboard tools">
          <a href="/keyboard-notes" className="am-button am-tertiary">Find or hear a piano note →</a>
          <a href="/keyboard-notes/chart" className="am-button am-tertiary">Match keys to staff →</a>
          <a href={practiceEntryHref()} className="am-button am-tertiary">Practice notes →</a>
        </nav>
      </section>
      <p>{layout.scope_note}</p>
      <section className="kn-source-list" aria-labelledby="kn-labeled-sources-title">
        <h2 id="kn-labeled-sources-title">Sources</h2>
        <ul>
          {sources.map(source => (
            <li key={source.id}>
              <a href={source.url} rel="noopener noreferrer">{source.title}</a>
              <span> · {source.publisher}</span>
            </li>
          ))}
        </ul>
      </section>
    </section>
    <div className="kn-print-only" data-print-layout={print.layout.layout_id} data-print-octaves={print.octaves}>
      {renderedSegments.map((keys, renderedIndex) => {
        const index = activePrintPart ?? renderedIndex;
        return <section className="kn-print-sheet" key={keys[0].midi}>
          <div className="kn-print-title">Labeled Piano Keys</div>
          <p>{print.layout.label} · Part {index + 1} of {printSegments.length} · {keys[0].label_with_octave.split(' / ')[0]} to {keys.at(-1)!.label_with_octave.split(' / ')[0]}</p>
          <p>Octave numbers: {print.octaves ? 'shown' : 'hidden'}. Middle C = C4.</p>
          <KeyboardDiagram keys={keys} octaves={print.octaves}/>
          <footer>
            <p>PianoGrid · pianogrid.com/keyboard-notes/labeled</p>
            <p>Reference diagram — not a full-size sticker template.</p>
            <p className="kn-print-sources">Sources: {sources.map(source => source.title).join('; ')}</p>
          </footer>
        </section>;
      })}
    </div>
  </>;
}
