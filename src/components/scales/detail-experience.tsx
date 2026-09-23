'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { PianoKey } from '@/lib/keyboard-types';
import type { ScaleDirection, ScaleFormID, ScaleHand, ScaleOption } from '@/lib/scale-types';
import { SITE_NAME } from '@/lib/site-config';
import { ScalePractice, ScaleQuiz } from './scale-learning';
import { ScaleCurrentAnswer, ScaleReference } from './scale-reference';
import { useScaleAudio } from './use-scale-audio';
import { emitScaleEvent } from '@/lib/scale-events';

type Snapshot = { option: ScaleOption; hand: ScaleHand; direction: ScaleDirection; tempo: number };

export function ScaleDetailExperience({ options, keyboardKeys, defaultForm, tempoOptions, keySignature, conciseSources = false }: { options: ScaleOption[]; keyboardKeys: PianoKey[]; defaultForm: ScaleFormID; tempoOptions: number[]; keySignature: string; conciseSources?: boolean }) {
  const audio = useScaleAudio();
  const [form, setForm] = useState(defaultForm);
  const [hand, setHand] = useState<ScaleHand>('RH');
  const [direction, setDirection] = useState<ScaleDirection>('ascending');
  const [tempo, setTempo] = useState(tempoOptions.includes(60) ? 60 : tempoOptions[0]);
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [printError, setPrintError] = useState('');
  const option = options.find((item) => item.form === form) ?? options[0];
  const lastReference = useRef(`${option.id}:${hand}:${direction}:${tempo}`);
  const print = snapshot ?? { option, hand, direction, tempo };
  const change = (callback: () => void) => { audio.cancel('settings'); setPrintError(''); callback(); };
  useEffect(() => {
    emitScaleEvent('scale_reference_viewed', { object_id: option.id, form: option.form, hand, direction, range: 'one_octave', tempo });
    // This effect intentionally records only the initially rendered reference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const prepare = () => { audio.cancel('printing'); flushSync(() => setSnapshot({ option, hand, direction, tempo })); };
    const release = () => setSnapshot(null);
    window.addEventListener('beforeprint', prepare); window.addEventListener('afterprint', release);
    return () => { window.removeEventListener('beforeprint', prepare); window.removeEventListener('afterprint', release); };
  }, [option, hand, direction, tempo]);
  useEffect(() => {
    const value = `${option.id}:${hand}:${direction}:${tempo}`;
    if (value !== lastReference.current) emitScaleEvent('scale_reference_changed', { object_id: option.id, form: option.form, hand, direction, range: 'one_octave', tempo });
    lastReference.current = value;
  }, [option, hand, direction, tempo]);
  const startPrint = () => {
    audio.cancel('printing');
    flushSync(() => setSnapshot({ option, hand, direction, tempo }));
    emitScaleEvent('scale_print_requested', { asset_id: 'browser_print_current_scale', object_id: option.id, hand, direction });
    try { window.print(); } catch { setPrintError('Printing could not start. Please use your browser’s print command.'); }
  };

  return <>
    <section className="am-tool sc-tool sc-screen" aria-label={`${option.tonic} scale reference`} data-current-scale={option.id}>
      <div className="sc-fixed-summary"><div><span>Starting note</span><strong>{option.tonic}</strong></div><div><span>Key signature</span><strong>{keySignature}</strong></div><div><span>Range</span><strong>1 octave</strong></div></div>
      <ScaleCurrentAnswer option={option} hand={hand} direction={direction} tempo={tempo}/>
      <div className="sc-controls">
        {options.length > 1 && <label className="kn-field">Minor form<select aria-label="Minor form" value={form} disabled={!audio.ready} onChange={(event) => change(() => setForm(event.target.value as ScaleFormID))}>{options.map((item) => <option key={item.form} value={item.form}>{item.formLabel}</option>)}</select></label>}
        <label className="kn-field">Hand<select aria-label="Hand" value={hand} disabled={!audio.ready} onChange={(event) => change(() => setHand(event.target.value as ScaleHand))}><option value="RH">Right hand</option><option value="LH">Left hand</option></select></label>
        <label className="kn-field">Direction<select aria-label="Direction" value={direction} disabled={!audio.ready} onChange={(event) => change(() => setDirection(event.target.value as ScaleDirection))}><option value="ascending">Ascending</option><option value="descending">Descending</option><option value="up_down">Up and down</option></select></label>
        {tempoOptions.length > 1 ? <label className="kn-field">Tempo<select aria-label="Tempo" value={tempo} disabled={!audio.ready} onChange={(event) => change(() => setTempo(Number(event.target.value)))}>{tempoOptions.map((value) => <option key={value} value={value}>{value} BPM</option>)}</select></label> : <div className="sc-static-field"><span>Tempo</span><strong>{tempo} BPM</strong></div>}
      </div>
      <ScaleReference option={option} keyboardKeys={keyboardKeys} hand={hand} direction={direction} tempo={tempo} audio={audio} showSummary={false} conciseSources={conciseSources}/>
      <div className="sc-print-bar"><button type="button" className="am-button am-secondary" disabled={!audio.ready} onClick={startPrint}>Print current scale</button></div>
      <p role="status" className="kn-error">{printError}</p>
      <p className="sc-scope-note">Finger numbers identify fingers, not scale degrees. Only one-octave, separately checked rows are shown.</p>
      <ScaleQuiz key={`quiz:${option.id}:${hand}:${direction}`} option={option} hand={hand} direction={direction} keyboardKeys={keyboardKeys} ready={audio.ready}/>
      <ScalePractice key={`practice:${option.id}:${hand}:${direction}`} option={option} hand={hand} direction={direction} audio={audio} ready={audio.ready}/>
    </section>
    <div className="sc-print-only" data-print-scale={print.option.id} data-print-hand={print.hand} data-print-direction={print.direction} data-print-tempo={print.tempo}>
      <p className="sc-print-brand">{SITE_NAME}</p><div className="sc-print-title">{print.option.tonic} {print.option.formLabel}</div><p>Key signature: {keySignature}</p>
      <ScaleReference {...print} keyboardKeys={keyboardKeys} print conciseSources={conciseSources}/>
      <p className="sc-print-foot">One-octave reference. Finger numbers appear only for the hand and direction combinations covered by the sources listed above.</p>
    </div>
  </>;
}
