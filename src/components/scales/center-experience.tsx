'use client';

import { useState } from 'react';
import { flushSync } from 'react-dom';
import type { PianoKey } from '@/lib/keyboard-types';
import type { ScaleDirection, ScaleFormID, ScaleHand, ScaleOption } from '@/lib/scale-types';
import { SITE_NAME } from '@/lib/site-config';
import { ScaleReference } from './scale-reference';
import { useScaleAudio } from './use-scale-audio';

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
  const print = snapshot ?? { option, hand, direction, tempo: 60 };
  const change = (callback: () => void) => { audio.cancel(); setPrintError(''); callback(); };
  const startPrint = () => {
    audio.cancel();
    flushSync(() => setSnapshot({ option, hand, direction, tempo: 60 }));
    try { window.print(); } catch { setPrintError('Printing could not start. Please use your browser’s print command.'); }
  };

  return <>
    <section className="am-tool sc-tool sc-screen" aria-label="Piano scale explorer" data-current-scale={option.id}>
      <div className="sc-controls">
        <label className="kn-field">Scale type<select aria-label="Scale type" value={form} disabled={!audio.ready} onChange={(event) => change(() => { const next = event.target.value as ScaleFormID; setForm(next); setTonic(options.find((item) => item.form === next)!.tonic); })}>{formOrder.map((id) => <option key={id} value={id}>{formNames[id]}</option>)}</select></label>
        <label className="kn-field">Starting note<select aria-label="Starting note" value={option.tonic} disabled={!audio.ready} onChange={(event) => change(() => setTonic(event.target.value))}>{available.map((item) => <option key={item.tonic} value={item.tonic}>{item.tonic}</option>)}</select></label>
        <label className="kn-field">Hand<select aria-label="Hand" value={hand} disabled={!audio.ready} onChange={(event) => change(() => setHand(event.target.value as ScaleHand))}><option value="RH">Right hand</option><option value="LH">Left hand</option></select></label>
        <label className="kn-field">Direction<select aria-label="Direction" value={direction} disabled={!audio.ready} onChange={(event) => change(() => setDirection(event.target.value as ScaleDirection))}><option value="ascending">Ascending</option><option value="descending">Descending</option><option value="up_down">Up and down</option></select></label>
      </div>
      <ScaleReference option={option} keyboardKeys={keyboardKeys} hand={hand} direction={direction} tempo={60} audio={audio}/>
      <div className="sc-print-bar"><button type="button" className="am-button am-secondary" disabled={!audio.ready} onClick={startPrint}>Print current scale</button>{detailURLs.map((url) => { const target = options.find((item) => item.detailURL === url); return target ? <a className="am-button am-tertiary" href={url} key={url}>Open {target.tonic} detail</a> : null; })}</div>
      <p role="status" className="kn-error">{printError}</p>
      <p className="sc-scope-note">This release prints the current one-octave reference. It does not claim an all-scales or two-hand beginner PDF collection.</p>
    </section>
    <div className="sc-print-only" data-print-scale={print.option.id} data-print-hand={print.hand} data-print-direction={print.direction} data-print-tempo={print.tempo}>
      <p className="sc-print-brand">{SITE_NAME}</p><div className="sc-print-title">{print.option.tonic} {print.option.formLabel}</div>
      <ScaleReference {...print} keyboardKeys={keyboardKeys} print/>
      <p className="sc-print-foot">Current one-octave reference. Finger numbers appear only for the hand and direction combinations covered by the sources listed above.</p>
    </div>
  </>;
}
