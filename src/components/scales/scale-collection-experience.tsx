'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { PianoKey } from '@/lib/keyboard-types';
import type { ArpeggioExample, ScaleFamilyExample } from '@/lib/scale-completion-types';
import type { ScaleDirection, ScaleHand } from '@/lib/scale-types';
import { ScalePractice, ScaleQuiz } from './scale-learning';
import { ScaleCurrentAnswer, ScaleReference } from './scale-reference';
import { useScaleAudio } from './use-scale-audio';
import { emitScaleEvent } from '@/lib/scale-events';
import { SITE_NAME } from '@/lib/site-config';

type Snapshot = { exampleID: string; option: (ScaleFamilyExample | ArpeggioExample)['option']; hand: ScaleHand; eventHand: ScaleHand | null; handLabel: string; direction: ScaleDirection };

export function ScaleCollectionExperience({ examples, keyboardKeys, defaultExampleID, kind, scope, conciseSources = false }: {
  examples: Array<ScaleFamilyExample | ArpeggioExample>;
  keyboardKeys: PianoKey[];
  defaultExampleID: string;
  kind: 'scale' | 'arpeggio';
  scope: string;
  conciseSources?: boolean;
}) {
  const audio = useScaleAudio();
  const [exampleID, setExampleID] = useState(defaultExampleID);
  const [direction, setDirection] = useState<ScaleDirection>('ascending');
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [printError, setPrintError] = useState('');
  const selected = examples.find((example) => example.id === exampleID) ?? examples[0];
  const arpeggio = 'viewHand' in selected ? selected as ArpeggioExample : null;
  const defaultHand: ScaleHand = arpeggio?.renderHand ?? 'RH';
  const [hand, setHand] = useState<ScaleHand>(defaultHand);
  const eventHand: ScaleHand | null = arpeggio?.viewID ? arpeggio.viewHand : hand;
  const selectedHandLabel = eventHand === null ? 'No hand assigned' : eventHand === 'LH' ? 'Left hand' : 'Right hand';
  const lastReference = useRef(`${selected.id}:${defaultHand}:${direction}`);
  const print = snapshot ?? { exampleID: selected.id, option: selected.option, hand, eventHand, handLabel: selectedHandLabel, direction };
  useEffect(() => { setHand(defaultHand); }, [defaultHand]);
  useEffect(() => {
    emitScaleEvent('scale_reference_viewed', { object_id: selected.id, form: selected.option.form, view_id: arpeggio?.viewID ?? null, hand: eventHand, direction, range: 'one_octave' });
    // This effect intentionally records only the initially rendered reference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const prepare = () => {
      audio.cancel('printing');
      flushSync(() => setSnapshot({ exampleID: selected.id, option: selected.option, hand, eventHand, handLabel: selectedHandLabel, direction }));
    };
    const release = () => setSnapshot(null);
    window.addEventListener('beforeprint', prepare);
    window.addEventListener('afterprint', release);
    return () => { window.removeEventListener('beforeprint', prepare); window.removeEventListener('afterprint', release); };
  }, [selected, hand, eventHand, selectedHandLabel, direction, audio]);
  useEffect(() => {
    const referenceHand = arpeggio?.viewID ? defaultHand : hand;
    const value = `${selected.id}:${referenceHand}:${direction}`;
    if (value !== lastReference.current) emitScaleEvent('scale_reference_changed', { object_id: selected.id, form: selected.option.form, view_id: arpeggio?.viewID ?? null, hand: eventHand, direction, range: 'one_octave' });
    lastReference.current = value;
  }, [selected, hand, direction, arpeggio, defaultHand, eventHand]);
  const change = (callback: () => void) => { audio.cancel('settings'); setPrintError(''); callback(); };
  const startPrint = () => {
    audio.cancel('printing');
    flushSync(() => setSnapshot({ exampleID: selected.id, option: selected.option, hand, eventHand, handLabel: selectedHandLabel, direction }));
    emitScaleEvent('scale_print_requested', { asset_id: `browser_print_current_${kind}`, object_id: selected.id, view_id: arpeggio?.viewID ?? null, hand: eventHand, direction });
    try { window.print(); } catch { setPrintError('Printing could not start. Please use your browser’s print command.'); }
  };

  return <><section className="am-tool sc-tool sc-screen sc-collection" aria-label={`${selected.collectionLabel} explorer`} data-current-scale={selected.id} data-view-id={arpeggio?.viewID ?? undefined}>
    <ScaleCurrentAnswer option={selected.option} hand={hand} direction={direction} tempo={60} objectLabel={kind} heading={selected.label} handLabelOverride={selectedHandLabel}/>
    <div className="sc-controls">
      <label className="kn-field">{kind === 'arpeggio' ? 'Reference view' : 'Example'}<select aria-label={kind === 'arpeggio' ? 'Reference view' : 'Example'} value={selected.id} disabled={!audio.ready} onChange={(event) => change(() => setExampleID(event.target.value))}>{examples.map((example) => <option value={example.id} key={example.id}>{example.label}</option>)}</select></label>
      {kind === 'arpeggio' && arpeggio?.handSelectable && <label className="kn-field">Hand<select aria-label="Hand" value={hand} disabled={!audio.ready} onChange={(event) => change(() => setHand(event.target.value as ScaleHand))}><option value="RH">Right hand</option><option value="LH">Left hand</option></select></label>}
      <label className="kn-field">Direction<select aria-label="Direction" value={direction} disabled={!audio.ready} onChange={(event) => change(() => setDirection(event.target.value as ScaleDirection))}><option value="ascending">Ascending</option><option value="descending">Descending</option><option value="up_down">Up and down</option></select></label>
    </div>
    <p className="sc-collection-summary">{selected.summary}</p><p>{selected.comparison}</p>
    <ScaleReference option={selected.option} keyboardKeys={keyboardKeys} hand={hand} direction={direction} tempo={60} audio={audio} showSummary={false} playLabel={kind === 'arpeggio' ? 'Play arpeggio' : 'Play scale'} handLabelOverride={selectedHandLabel} eventHand={eventHand} conciseSources={conciseSources}/>
    <p className="sc-scope-note">Current collection: {scope}. Unknown fingering remains notes-only and is never copied from the previous selection.</p>
    {eventHand !== null && <><ScaleQuiz key={`quiz:${selected.id}:${hand}:${direction}`} option={selected.option} hand={hand} direction={direction} keyboardKeys={keyboardKeys} ready={audio.ready}/><ScalePractice key={`practice:${selected.id}:${hand}:${direction}`} option={selected.option} hand={hand} direction={direction} audio={audio} ready={audio.ready}/></>}
    {eventHand === null && <p className="sc-scope-note">This treble reference is not assigned to a hand and has no fingering or guided single-hand practice.</p>}
    <div className="sc-print-bar"><button type="button" className="am-button am-secondary" onClick={startPrint}>Print current {kind}</button></div>
    <p role="status" className="kn-error">{printError}</p>
  </section>
  <div className="sc-print-only" data-print-scale={print.option.id} data-print-view={print.exampleID} data-print-hand={print.eventHand ?? 'none'} data-print-direction={print.direction}>
    <p className="sc-print-brand">{SITE_NAME}</p><div className="sc-print-title">{selected.collectionLabel}: {print.option.tonic} {print.option.formLabel}</div><p>View: {print.handLabel} · Direction: {print.direction.replace('_', ' ')} · Range: one octave</p>
    <ScaleReference option={print.option} keyboardKeys={keyboardKeys} hand={print.hand} direction={print.direction} tempo={60} print handLabelOverride={print.handLabel} eventHand={print.eventHand} conciseSources={conciseSources}/>
    <p className="sc-print-foot">Current selected reference. Notes, staff, keyboard and any finger numbers come from this same view. Missing fingering remains notes-only.</p>
  </div></>;
}
