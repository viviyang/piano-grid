'use client';

import { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import type { Layout } from '@/lib/keyboard-types';
import { layoutCode } from '@/lib/keyboard-resolution';
import { clampRangeStart, labeledFullSegments, printCompactSegments, visibleMidiWindow } from '@/lib/keyboard-viewport';
import { KeyboardDiagram } from './keyboard-diagram';
import { ShareControl } from './share-control';
import { LayoutChoice } from './tool-controls';

function primaryLabel(label: string) {
  return label.split(' / ')[0];
}

export function compactSegments(layout: Layout) {
  return printCompactSegments(layout);
}

export function LabeledExperience({ layouts, sourceIDs }: { layouts: Layout[]; sourceIDs: string[] }) {
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
    const requestedPart = Number(params.get('printPart'));
    if (params.has('printPart') && Number.isInteger(requestedPart) && requestedPart >= 0) setPrintPart(requestedPart);
    setRangeStart(clampRangeStart(restored, 60, whiteSpan));
    setReady(true);
  }, [layouts]);

  useEffect(() => {
    setRangeStart(clampRangeStart(layout, 60, whiteSpan));
  }, [layout]);

  const { rangeMin, rangeMax, keys: visibleKeys } = useMemo(() => visibleMidiWindow(layout, rangeStart, whiteSpan), [layout, rangeStart]);
  const fullSegments = useMemo(() => labeledFullSegments(layout), [layout]);
  const print = snapshot ?? { layout, octaves };
  const printSegments = compactSegments(print.layout);
  const renderedSegments = printPart === null ? printSegments : printSegments.slice(printPart, printPart + 1);
  const shareParams = useMemo(() => new URLSearchParams({ layout: layoutCode(layout), octaves: octaves ? '1' : '0' }), [layout, octaves]);
  const canLower = rangeStart > layout.keys[0].midi;
  const canHigher = rangeMax < layout.keys.at(-1)!.midi;
  const pdfHref = `/reference/generated/keyboard-notes/labeled-${layout.key_count}-${octaves ? 'octaves' : 'letters'}.pdf`;

  return <>
    <section className="am-tool kn-tool kn-screen kn-labeled" aria-label="Labeled keyboard reference">
      <div className="kn-labeled-toolbar">
        <LayoutChoice layouts={layouts} value={layoutID} ready={ready} onChange={setLayoutID}/>
        <label className="kn-checkbox"><input type="checkbox" checked={octaves} disabled={!ready} onChange={event => setOctaves(event.target.checked)}/>Octave numbers</label>
        <div className="kn-labeled-actions">
          <button
            className="am-button am-secondary"
            disabled={!ready}
            onClick={() => {
              flushSync(() => setSnapshot({ layout, octaves }));
              try { window.print(); }
              catch { setError('Printing could not start. Download the reference PDF instead.'); }
            }}
          >
            Print reference
          </button>
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

      <details className="kn-labeled-full">
        <summary>View the full reference</summary>
        {fullSegments.map(segment => (
          <section className="kn-segment" key={segment.label} id={`labels-${segment.label.replace(/[^\w]+/g, '-').toLowerCase()}`} tabIndex={-1}>
            <h2>{segment.label}</h2>
            <KeyboardDiagram keys={segment.keys} octaves={octaves} label={`${segment.label} labels`}/>
          </section>
        ))}
      </details>

      <section className="kn-labeled-guide" aria-labelledby="kn-label-guide-title">
        <h2 id="kn-label-guide-title">How to label your keyboard</h2>
        <ol>
          <li>Match your layout</li>
          <li>Find the repeating pattern</li>
          <li>Add octave numbers when needed</li>
        </ol>
        <nav className="kn-actions" aria-label="Related keyboard tools">
          <a href="/keyboard-notes" className="am-button am-tertiary">Find a specific note →</a>
          <a href="/keyboard-notes/chart" className="am-button am-tertiary">Match keys to staff →</a>
          <a href="/keyboard-notes#note-trainer" className="am-button am-tertiary">Practice notes →</a>
        </nav>
      </section>
      <p>{layout.scope_note}</p>
      <p className="kn-print-sources">Sources: {sourceIDs.join(', ')}</p>
    </section>
    <div className="kn-print-only" data-print-layout={print.layout.layout_id} data-print-octaves={print.octaves}>
      {renderedSegments.map((keys, renderedIndex) => {
        const index = printPart ?? renderedIndex;
        return <section className="kn-print-sheet" key={keys[0].midi}>
          <div className="kn-print-title">Labeled Piano Keys</div>
          <p>{print.layout.label} · Part {index + 1} of {printSegments.length} · {keys[0].label_with_octave.split(' / ')[0]} to {keys.at(-1)!.label_with_octave.split(' / ')[0]}</p>
          <p>Octave numbers: {print.octaves ? 'shown' : 'hidden'}. Middle C = C4.</p>
          <KeyboardDiagram keys={keys} octaves={print.octaves}/>
          <footer>
            <p>PianoGrid · pianogrid.com/keyboard-notes/labeled</p>
            <p>Reference diagram — not a full-size sticker template.</p>
            <p className="kn-print-sources">Sources: {sourceIDs.join(', ')}</p>
          </footer>
        </section>;
      })}
    </div>
  </>;
}
