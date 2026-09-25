'use client';

import { KeyboardDiagram } from '@/components/keyboard-notes/keyboard-diagram';
import { StaffDiagram } from '@/components/keyboard-notes/staff-diagram';
import type { PianoKey } from '@/lib/keyboard-types';
import { scaleSequence } from '@/lib/scale-resolver';
import type { ScaleDirection, ScaleHand, ScaleOption, ScalePitch } from '@/lib/scale-types';
import type { useScaleAudio } from './use-scale-audio';
import { emitScaleEvent } from '@/lib/scale-events';
import { publicSourceAttribution } from '@/lib/seo-editorial';

type Audio = ReturnType<typeof useScaleAudio>;

const display = (value: string) => value.replaceAll('##', '𝄪').replaceAll('bb', '𝄫').replaceAll('#', '♯').replaceAll('b', '♭');
const directionLabel: Record<ScaleDirection, string> = { ascending: 'Ascending', descending: 'Descending', up_down: 'Up and down' };
const handLabel: Record<ScaleHand, string> = { RH: 'Right hand', LH: 'Left hand' };

export function ScaleCurrentAnswer({ option, hand, direction, tempo, objectLabel = 'scale', heading, handLabelOverride, fieldName, headingLevel = 'h2' }: { option: ScaleOption; hand: ScaleHand; direction: ScaleDirection; tempo: number; objectLabel?: 'scale' | 'arpeggio'; heading?: string; handLabelOverride?: string; fieldName?: string; headingLevel?: 'h2' | 'h3' }) {
  const playback = scaleSequence(option, hand, direction);
  const directionSteps = playback.slice(1).map((item, index) => Math.abs(item.midi - playback[index].midi));
  const low = playback.reduce((current, pitch) => pitch.midi < current.midi ? pitch : current);
  const high = playback.reduce((current, pitch) => pitch.midi > current.midi ? pitch : current);
  const range = `${display(low.note)}-${display(high.note)}`;
  const movement = direction === 'up_down'
    ? `${display(playback[0].note)} → ${display(option.sequences[hand].ascending.at(-1)!.note)} → ${display(playback.at(-1)!.note)}`
    : `${display(playback[0].note)} → ${display(playback.at(-1)!.note)}`;
  const ResultHeading = headingLevel;
  return <div className="sc-current-answer" aria-live="polite">
    <div className="sc-result-head">
      <div><span className="sc-field-name">{fieldName ?? `Current ${objectLabel}`}</span><ResultHeading>{heading ?? `${display(option.tonic)} ${option.formLabel}`}</ResultHeading></div>
      <dl className="sc-result-meta"><div><dt>Hand</dt><dd>{handLabelOverride ?? handLabel[hand]}</dd></div><div><dt>Range</dt><dd>{range} · 1 octave</dd></div><div><dt>Demo / print tempo</dt><dd>{tempo} BPM</dd></div></dl>
    </div>
    <p className="sc-note-line" aria-label={`${option.formLabel} ${directionLabel[direction]} notes`}>{playback.map((item) => display(item.spelling)).join(' – ')}</p>
    <p className="sc-step-line">Direction: {directionLabel[direction]} · {movement} · Semitone movement: {directionSteps.join(' – ')}</p>
  </div>;
}

function parts(option: ScaleOption, hand: ScaleHand, direction: ScaleDirection) {
  if (direction === 'up_down') return [
    { id: 'ascending' as const, label: 'Ascending', pitches: option.sequences[hand].ascending, fingers: option.fingering[hand].ascending, note: option.fingeringNote[hand].ascending },
    { id: 'descending' as const, label: 'Descending', pitches: option.sequences[hand].descending, fingers: option.fingering[hand].descending, note: option.fingeringNote[hand].descending },
  ];
  return [{
    id: direction,
    label: directionLabel[direction],
    pitches: option.sequences[hand][direction],
    fingers: option.fingering[hand][direction], note: option.fingeringNote[hand][direction],
  }];
}

function SequenceTable({ label, pitches, fingers, sounding, note }: { label: string; pitches: ScalePitch[]; fingers: number[] | null; sounding: number[]; note: string }) {
  return <div className="sc-sequence-block" data-sequence={label.toLowerCase()}>
    <div className="sc-sequence-heading"><h3>{label}</h3><span>{fingers ? 'Fingering from the listed sources' : 'Notes only'}</span></div>
    <div className="sc-sequence-scroll" role="region" tabIndex={0} aria-label={`${label} notes and fingering`}>
      <table className="sc-sequence-table">
        <tbody>
          <tr><th scope="row">Notes</th>{pitches.map((item, index) => <td key={`${item.note}-${index}`} className={sounding.includes(item.midi) ? 'sc-is-sounding' : ''} data-midi={item.midi} data-note={item.note}>{display(item.note)}</td>)}</tr>
          {fingers && <tr><th scope="row">Fingers</th>{fingers.map((finger, index) => <td key={`${finger}-${index}`} data-finger={finger}>{finger}</td>)}</tr>}
        </tbody>
      </table>
    </div>
    <p className="sc-fingering-note">{note}</p>
  </div>;
}

function ScaleSources({ option, print, concise = false }: { option: ScaleOption; print: boolean; concise?: boolean }) {
  return <section className="sc-sources" aria-label={concise ? 'Sources' : 'Sources and checking scope'}>
    <h3>{concise ? 'Sources' : 'Sources and checking scope'}</h3>
    <ul>{option.sources.map((source) => <li key={source.url}>
      <a href={source.url}>{source.publisher}: {source.title}</a>
      {print && <span className="sc-source-url"> ({source.url})</span>}
      {concise ? <span className="sc-source-scope">{publicSourceAttribution(source.scope)}</span> : <span className="sc-source-scope"><strong>Supports:</strong> {publicSourceAttribution(source.scope)}</span>}
      {!concise && <span className="sc-source-scope"><strong>Location:</strong> {publicSourceAttribution(source.locator)}</span>}
    </li>)}</ul>
  </section>;
}

export function ScaleReference({ option, keyboardKeys, hand, direction, tempo, audio = null, print = false, showSummary = true, playLabel = 'Play scale', handLabelOverride, eventHand = hand, conciseSources = false }: { option: ScaleOption; keyboardKeys: PianoKey[]; hand: ScaleHand; direction: ScaleDirection; tempo: number; audio?: Audio | null; print?: boolean; showSummary?: boolean; playLabel?: string; handLabelOverride?: string; eventHand?: ScaleHand | null; conciseSources?: boolean }) {
  const segments = parts(option, hand, direction);
  const playback = scaleSequence(option, hand, direction);
  const allPitches = segments.flatMap((segment) => segment.pitches);
  const min = Math.min(...allPitches.map((item) => item.midi));
  const max = Math.max(...allPitches.map((item) => item.midi));
  const keys = keyboardKeys.filter((key) => key.midi >= min && key.midi <= max);
  const labels = Object.fromEntries(allPitches.map((item) => [item.midi, display(item.note)]));
  const sounding = audio?.sounding ?? [];
  const selected = sounding[0] ?? playback[0].midi;

  return <div className={print ? 'sc-print-reference' : 'sc-reference'} data-scale-id={option.id} data-hand={hand} data-direction={direction} data-tempo={tempo}>
    {showSummary && <ScaleCurrentAnswer option={option} hand={hand} direction={direction} tempo={tempo} handLabelOverride={handLabelOverride}/>}
    {segments.map((segment) => <div className="sc-notation" key={segment.id}>
      <SequenceTable label={segment.label} pitches={segment.pitches} fingers={segment.fingers} sounding={sounding} note={segment.note}/>
      <StaffDiagram notes={segment.pitches.map((item) => item.staff)} selected={segment.pitches.find((item) => sounding.includes(item.midi))?.note ?? ''}/>
    </div>)}
    <div className="sc-keyboard-heading"><h3>Keyboard</h3><span>{direction === 'up_down' ? `${display(playback[0].note)} to ${display(option.sequences[hand].ascending.at(-1)!.note)} to ${display(playback.at(-1)!.note)}` : `${display(playback[0].note)} to ${display(playback.at(-1)!.note)}`}</span></div>
    <KeyboardDiagram keys={keys} selected={selected} marked={[...new Set(allPitches.map((item) => item.midi))]} sounding={sounding} keyLabels={labels} label={`${display(option.tonic)} ${option.formLabel}, ${handLabelOverride ?? handLabel[hand]}, ${directionLabel[direction]}`}/>
    {!print && audio && <div className="sc-actions">
      <button type="button" className="am-button am-primary" disabled={!audio.ready || audio.state === 'unavailable'} onClick={() => { void audio.play(playback, tempo).then((result) => emitScaleEvent(result.ok ? 'scale_playback_started' : 'scale_playback_error', { object_id: option.id, form: option.form, hand: eventHand, direction, range: 'one_octave', reason: result.reason ?? 'started' })); }}>{playLabel}</button>
      <button type="button" className="am-button am-secondary" disabled={!['loading', 'playing'].includes(audio.state)} onClick={() => { audio.cancel('stopped'); emitScaleEvent('scale_playback_stopped', { object_id: option.id, form: option.form, hand: eventHand, direction, reason: 'user_stop' }); }}>Stop</button>
      <p role="status" className={audio.state === 'error' ? 'kn-error' : 'kn-status'}>{audio.message}</p>
    </div>}
    <ScaleSources option={option} print={print} concise={conciseSources}/>
  </div>;
}
