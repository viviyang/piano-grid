'use client';

import { useEffect, useRef, useState } from 'react';
import { flushSync } from 'react-dom';
import type { PianoKey } from '@/lib/keyboard-types';
import type { ScaleDirection, ScaleFormID, ScaleHand, ScaleOption } from '@/lib/scale-types';
import { SITE_NAME } from '@/lib/site-config';
import { ScalePractice, ScaleQuiz } from './scale-learning';
import { ScaleCurrentAnswer, ScaleReference } from './scale-reference';
import { useScaleAudio } from './use-scale-audio';
import { ScaleFinder } from './scale-finder';
import { emitScaleEvent } from '@/lib/scale-events';

const formOrder: ScaleFormID[] = ['major', 'natural_minor', 'harmonic_minor', 'melodic_minor_classical'];
const formNames: Record<ScaleFormID, string> = { major: 'Major', natural_minor: 'Natural minor', harmonic_minor: 'Harmonic minor', melodic_minor_classical: 'Melodic minor (classical)' };

type Snapshot = { option: ScaleOption; hand: ScaleHand; direction: ScaleDirection; tempo: number };

export function ScaleCenterExperience({ options, keyboardKeys, detailURLs }: { options: ScaleOption[]; keyboardKeys: PianoKey[]; detailURLs: string[] }) {
  const audio = useScaleAudio();
  const [form, setForm] = useState<ScaleFormID>('major');
  const [tonic, setTonic] = useState('C');
  const [hand, setHand] = useState<ScaleHand>('RH');
  const [direction, setDirection] = useState<ScaleDirection>('ascending');
  const [snapshot, setSnapshot] = useState<Snapshot | null>(null);
  const [printError, setPrintError] = useState('');
  const available = options.filter((option) => option.form === form);
  const option = available.find((item) => item.tonic === tonic) ?? available[0];
  const lastReference = useRef(`${option.id}:${hand}:${direction}`);
  const print = snapshot ?? { option, hand, direction, tempo: 60 };
  const change = (callback: () => void) => { audio.cancel('settings'); setPrintError(''); callback(); };
  useEffect(() => {
    emitScaleEvent('scale_reference_viewed', { object_id: option.id, form: option.form, hand, direction, range: 'one_octave' });
    // This effect intentionally records only the initially rendered reference.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    const prepare = () => { audio.cancel('printing'); flushSync(() => setSnapshot({ option, hand, direction, tempo: 60 })); };
    const release = () => setSnapshot(null);
    window.addEventListener('beforeprint', prepare); window.addEventListener('afterprint', release);
    return () => { window.removeEventListener('beforeprint', prepare); window.removeEventListener('afterprint', release); };
  }, [option, hand, direction]);
  useEffect(() => {
    const value = `${option.id}:${hand}:${direction}`;
    if (value !== lastReference.current) emitScaleEvent('scale_reference_changed', { object_id: option.id, form: option.form, hand, direction, range: 'one_octave' });
    lastReference.current = value;
  }, [option, hand, direction]);
  const startPrint = () => {
    audio.cancel('printing');
    flushSync(() => setSnapshot({ option, hand, direction, tempo: 60 }));
    emitScaleEvent('scale_print_requested', { asset_id: 'browser_print_current_scale', object_id: option.id, hand, direction });
    try { window.print(); } catch { setPrintError('Printing could not start. Please use your browser’s print command.'); }
  };

  return <>
    <section className="am-tool sc-tool sc-screen" aria-label="Piano scale explorer" data-current-scale={option.id}>
      <ScaleCurrentAnswer option={option} hand={hand} direction={direction} tempo={60}/>
      <div className="sc-controls">
        <label className="kn-field">Scale type<select aria-label="Scale type" value={form} disabled={!audio.ready} onChange={(event) => change(() => { const next = event.target.value as ScaleFormID; setForm(next); if (!options.some((item) => item.form === next && item.tonic === tonic)) setTonic(options.find((item) => item.form === next)!.tonic); })}>{formOrder.map((id) => <option key={id} value={id}>{formNames[id]}</option>)}</select></label>
        <label className="kn-field">Starting note<select aria-label="Starting note" value={option.tonic} disabled={!audio.ready} onChange={(event) => change(() => setTonic(event.target.value))}>{available.map((item) => <option key={item.tonic} value={item.tonic}>{item.tonic}</option>)}</select></label>
        <label className="kn-field">Hand<select aria-label="Hand" value={hand} disabled={!audio.ready} onChange={(event) => change(() => setHand(event.target.value as ScaleHand))}><option value="RH">Right hand</option><option value="LH">Left hand</option></select></label>
        <label className="kn-field">Direction<select aria-label="Direction" value={direction} disabled={!audio.ready} onChange={(event) => change(() => setDirection(event.target.value as ScaleDirection))}><option value="ascending">Ascending</option><option value="descending">Descending</option><option value="up_down">Up and down</option></select></label>
      </div>
      <ScaleReference option={option} keyboardKeys={keyboardKeys} hand={hand} direction={direction} tempo={60} audio={audio} showSummary={false}/>
      <div className="sc-print-bar"><button type="button" className="am-button am-secondary" disabled={!audio.ready} onClick={startPrint}>Print current scale</button>{option.detailURL && detailURLs.includes(option.detailURL) ? <a className="am-button am-tertiary" href={option.detailURL} onClick={() => emitScaleEvent('scale_related_reference_opened', { object_id: option.id, target: option.detailURL })}>Open this scale detail</a> : null}</div>
      <p role="status" className="kn-error">{printError}</p>
      <p className="sc-scope-note">This button prints the current one-octave selection. Fixed all-major, major-and-minor, and C-major starter PDFs are listed in the resources section with their exact coverage.</p>
      <ScaleQuiz key={`quiz:${option.id}:${hand}:${direction}`} option={option} hand={hand} direction={direction} keyboardKeys={keyboardKeys} ready={audio.ready}/>
      <ScalePractice key={`practice:${option.id}:${hand}:${direction}`} option={option} hand={hand} direction={direction} audio={audio} ready={audio.ready}/>
    </section>
    <ScaleFinder options={options} onChoose={(selected) => change(() => { setForm(selected.form as ScaleFormID); setTonic(selected.tonic); })}/>
    <div className="sc-print-only" data-print-scale={print.option.id} data-print-hand={print.hand} data-print-direction={print.direction} data-print-tempo={print.tempo}>
      <p className="sc-print-brand">{SITE_NAME}</p><div className="sc-print-title">{print.option.tonic} {print.option.formLabel}</div>
      <ScaleReference {...print} keyboardKeys={keyboardKeys} print/>
      <p className="sc-print-foot">Current one-octave reference. Finger numbers appear only for the hand and direction combinations covered by the sources listed above.</p>
    </div>
  </>;
}
