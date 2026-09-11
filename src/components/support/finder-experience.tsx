'use client';

import { useMemo, useState } from 'react';
import type { FinderChord } from '@/lib/support-content';

const keys = [
  { pc: 0, label: 'C', aria: 'C', kind: 'white', left: 0 },
  { pc: 1, label: 'C♯ / D♭', aria: 'C sharp or D flat', kind: 'black', left: 10 },
  { pc: 2, label: 'D', aria: 'D', kind: 'white', left: 0 },
  { pc: 3, label: 'D♯ / E♭', aria: 'D sharp or E flat', kind: 'black', left: 24.3 },
  { pc: 4, label: 'E', aria: 'E', kind: 'white', left: 0 },
  { pc: 5, label: 'F', aria: 'F', kind: 'white', left: 0 },
  { pc: 6, label: 'F♯ / G♭', aria: 'F sharp or G flat', kind: 'black', left: 52.8 },
  { pc: 7, label: 'G', aria: 'G', kind: 'white', left: 0 },
  { pc: 8, label: 'G♯ / A♭', aria: 'G sharp or A flat', kind: 'black', left: 67.1 },
  { pc: 9, label: 'A', aria: 'A', kind: 'white', left: 0 },
  { pc: 10, label: 'A♯ / B♭', aria: 'A sharp or B flat', kind: 'black', left: 81.4 },
  { pc: 11, label: 'B / C♭', aria: 'B or C flat', kind: 'white', left: 0 },
] as const;
const display = (value: string) => value.replaceAll('#', '♯').replaceAll('b', '♭');
const same = (left: number[], right: number[]) => left.length === right.length && left.every((value, index) => value === right[index]);

function bassName(chord: FinderChord, pitchClass: number) {
  return chord.tones.find(tone => {
    const normalized = tone.replaceAll('♯', '#').replaceAll('♭', 'b');
    const letter = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[normalized[0] as 'A'|'B'|'C'|'D'|'E'|'F'|'G'];
    const accidental = normalized[1] === '#' ? 1 : normalized[1] === 'b' ? -1 : 0;
    return (letter + accidental + 12) % 12 === pitchClass;
  }) || keys.find(key => key.pc === pitchClass)?.label || '';
}

export function FinderExperience({ chords, labels }: { chords: FinderChord[]; labels: { multiple: string; none: string; incomplete: string } }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [bass, setBass] = useState<number | null>(null);
  const matches = useMemo(() => chords.filter(chord => same(chord.pitchClasses, selected)), [chords, selected]);
  const whiteKeys = keys.filter(key => key.kind === 'white');
  const blackKeys = keys.filter(key => key.kind === 'black');
  function toggle(pc: number) {
    setSelected(current => {
      const next = current.includes(pc) ? current.filter(value => value !== pc) : [...current, pc].sort((a, b) => a - b);
      if (!next.includes(pc) && bass === pc) setBass(null);
      return next;
    });
  }
  function clear() { setSelected([]); setBass(null); }
  const selectedLabels = selected.map(pc => keys.find(key => key.pc === pc)!.label);
  const state = selected.length === 0 ? 'empty' : selected.length < 3 ? 'incomplete' : matches.length ? 'matches' : 'none';
  return <section className="sp-result fd-result" aria-labelledby="finder-heading" data-result-state={state}>
    <div className="sp-result-head"><div><p className="sp-overline">Shared 19-chord catalogue</p><h2 id="finder-heading">Choose the keys you are playing</h2></div><p>Select distinct sounding keys in one octave. Octave doubling does not change this matcher’s pitch-class set.</p></div>
    <fieldset className="fd-fieldset"><legend>Select piano keys</legend><div className="fd-keyboard" role="group" aria-label="One octave from C to B">
      <div className="fd-white-keys">{whiteKeys.map(key => <button type="button" className="fd-key fd-white" data-pitch-class={key.pc} aria-label={key.aria} aria-pressed={selected.includes(key.pc)} onClick={() => toggle(key.pc)} key={key.pc}><span>{key.label}</span></button>)}</div>
      {blackKeys.map(key => <button type="button" className="fd-key fd-black" style={{ left: `${key.left}%` }} data-pitch-class={key.pc} aria-label={key.aria} aria-pressed={selected.includes(key.pc)} onClick={() => toggle(key.pc)} key={key.pc}><span>{key.label}</span></button>)}
    </div></fieldset>
    <div className="fd-controls"><div><strong>Selected notes</strong><p>{selectedLabels.length ? selectedLabels.join(' · ') : 'No keys selected yet.'}</p></div><label htmlFor="finder-bass"><span>Lowest note (optional)</span><select id="finder-bass" value={bass ?? ''} disabled={!selected.length} onChange={event => setBass(event.target.value === '' ? null : Number(event.target.value))}><option value="">Bass not specified</option>{selected.map(pc => <option value={pc} key={pc}>{keys.find(key => key.pc === pc)!.label}</option>)}</select></label><button type="button" className="am-button am-secondary" onClick={clear} disabled={!selected.length}>Clear</button></div>
    <div className="fd-results" aria-live="polite" aria-atomic="true">
      {state === 'empty' && <div className="fd-state"><strong>Start with three different keys.</strong><p>For example, choose C, E and G. You can then identify the lowest note if you know it.</p></div>}
      {state === 'incomplete' && <div className="fd-state"><strong>{labels.incomplete}</strong><p>This matcher needs all three distinct tones of a major or minor triad. It does not guess the missing third or fifth.</p></div>}
      {state === 'none' && <div className="fd-state"><strong>{labels.none}</strong><p>The selected keys remain visible. No major or minor triad in the shared 19-chord catalogue uses this exact pitch-class set.</p></div>}
      {state === 'matches' && <div><div className="fd-result-heading"><div><p className="sp-overline">{matches.length > 1 ? labels.multiple : 'Chord match'}</p><h3>{matches.length} {matches.length === 1 ? 'candidate' : 'candidates'}</h3></div><p>{bass === null ? 'The note set matches exactly; choose a lowest note to identify root position or an inversion.' : `Lowest selected note: ${keys.find(key => key.pc === bass)?.label}`}</p></div><div className="fd-candidates">{matches.map(chord => {
        const bassSpelling = bass === null ? null : bassName(chord, bass);
        const inversion = bass !== null && bass !== chord.rootPitchClass;
        const symbol = bassSpelling && inversion ? `${chord.symbol}/${bassSpelling}` : chord.symbol;
        return <article key={chord.id} data-chord-id={chord.id} data-match={inversion ? 'inversion' : 'exact'}><div><span>{inversion ? 'Same pitch-class set · inversion' : bass === null ? 'Exact pitch-class set' : 'Exact match · root position'}</span><h4>{display(symbol)}</h4><p>{chord.name} · {chord.quality} triad</p></div><dl><div><dt>Root</dt><dd>{display(chord.root)}</dd></div><div><dt>Chord tones</dt><dd>{chord.tones.map(display).join(' · ')}</dd></div><div><dt>Bass</dt><dd>{bassSpelling ? display(bassSpelling) : 'Not specified'}</dd></div></dl>{chord.detailURL ? <a className="am-button am-tertiary" href={chord.detailURL}>Open the {chord.name} reference</a> : <p className="fd-no-link">No published detail page is available for this candidate.</p>}</article>;
      })}</div></div>}
    </div>
    <noscript><p className="fd-noscript">The explanation and supported-vocabulary notes remain readable without JavaScript. Enable JavaScript to select keys and compare matches.</p></noscript>
  </section>;
}
