'use client';
import { useEffect, useMemo, useState } from 'react';
import { flushSync } from 'react-dom';
import type { ChartKey, PianoKey, StaffNote } from '@/lib/keyboard-types';
import { asciiNote, displayNote } from '@/lib/keyboard-resolution';
import { KeyboardDiagram } from './keyboard-diagram';
import { ReadNotePractice } from './practice';
import { ShareControl } from './share-control';
import { StaffDiagram } from './staff-diagram';
import { NotePlayback } from './tool-controls';
import { useNoteAudio } from './use-note-audio';

type Range = { id: string; label: string; min_midi: number; max_midi: number };
type ClefChoice = 'both' | 'treble' | 'bass';

function keysFor(notes: ChartKey[]): PianoKey[] {
  return notes.map(key => ({ key_id: `pitch-${key.midi}`, midi: key.midi, color: key.color, default_label: key.display_names.map(name => name.replace(/\d+$/, '')).join(' / '), label_with_octave: key.display_names.join(' / '), lookup_spellings: key.display_names, white_key_index: null, black_key_between_white_indices: null }));
}

function defaultSpelling(key: ChartKey, preferFlat: boolean) {
  return key.staff_spellings[preferFlat ? key.staff_spellings.length - 1 : 0];
}

export function ChartExperience({ notes, ranges, defaultNote }: { notes: ChartKey[]; ranges: Range[]; defaultNote: string }) {
  const [rangeID, setRangeID] = useState('focus');
  const [clef, setClef] = useState<ClefChoice>('both');
  const [selected, setSelected] = useState(defaultNote);
  const [explicitSpelling, setExplicitSpelling] = useState(false);
  const [flat, setFlat] = useState(false);
  const [error, setError] = useState('');
  const [snapshot, setSnapshot] = useState<{ range: Range; clef: ClefChoice; selected: string; flat: boolean } | null>(null);
  const audio = useNoteAudio();
  const range = ranges.find(item => item.id === rangeID) ?? ranges[0];
  const current = notes.find(key => key.staff_spellings.some(item => item.name === asciiNote(selected))) ?? notes.find(key => key.midi === 60)!;
  const visible = notes.filter(key => key.midi >= range.min_midi && key.midi <= range.max_midi);
  const keys = keysFor(visible);

  function spelling(key: ChartKey, preferFlat = flat) {
    return key.midi === current.midi && explicitSpelling ? key.staff_spellings.find(item => item.name === asciiNote(selected)) ?? defaultSpelling(key, preferFlat) : defaultSpelling(key, preferFlat);
  }

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const nextRange = ranges.find(item => item.id === params.get('range'));
    const nextClef = params.get('clef');
    const preferFlat = params.get('prefer') === 'flat';
    const note = asciiNote(params.get('note') ?? '');
    const matched = notes.find(key => key.staff_spellings.some(item => item.name === note));
    if (nextRange) setRangeID(nextRange.id);
    if (nextClef === 'treble' || nextClef === 'bass' || nextClef === 'both') setClef(nextClef);
    setFlat(preferFlat);
    if (matched && (!nextRange || (matched.midi >= nextRange.min_midi && matched.midi <= nextRange.max_midi))) { setSelected(displayNote(note)); setExplicitSpelling(true); }
  }, [notes, ranges]);

  function pick(note: StaffNote) { audio.cancel(); setSelected(displayNote(note.note)); setExplicitSpelling(true); }

  function chooseRange(id: string) {
    audio.cancel();
    const next = ranges.find(item => item.id === id) ?? ranges[0];
    setRangeID(next.id);
    if (current.midi < next.min_midi || current.midi > next.max_midi) {
      const first = notes.find(key => key.midi === next.min_midi)!;
      setSelected(displayNote(defaultSpelling(first, flat).name));
      setExplicitSpelling(false);
    }
  }

  const shareParams = useMemo(() => new URLSearchParams({ range: range.id, clef, note: asciiNote(selected), prefer: flat ? 'flat' : 'sharp' }), [range.id, clef, selected, flat]);
  const print = snapshot ?? { range, clef, selected, flat };
  const printCurrent = notes.find(key => key.staff_spellings.some(item => item.name === asciiNote(print.selected))) ?? current;
  const printSpelling = printCurrent.staff_spellings.find(item => item.name === asciiNote(print.selected)) ?? defaultSpelling(printCurrent, print.flat);
  const printKeys = notes.filter(key => key.midi >= print.range.min_midi && key.midi <= print.range.max_midi);

  return <>
    <section className="am-tool kn-tool kn-screen" aria-label="Staff and keyboard chart">
      <div className="kn-toolbar">
        <label className="kn-field">Displayed range<select value={rangeID} disabled={!audio.ready} onChange={event => chooseRange(event.target.value)}>{ranges.map(item => <option key={item.id} value={item.id}>{item.label}</option>)}</select></label>
        <label className="kn-field">Clef<select value={clef} disabled={!audio.ready} onChange={event => { audio.cancel(); setClef(event.target.value as ClefChoice); }}><option value="both">Treble and bass</option><option value="treble">Treble</option><option value="bass">Bass</option></select></label>
        <label className="kn-checkbox"><input type="checkbox" checked={flat} disabled={!audio.ready} onChange={event => { audio.cancel(); const next = event.target.checked; setFlat(next); if (!explicitSpelling) setSelected(displayNote(defaultSpelling(current, next).name)); }}/>Prefer flat spelling</label>
      </div>
      <div className="kn-result" data-selected-midi={current.midi}><h2>{displayNote(selected)}</h2><p>{current.display_names.map(displayNote).join(' / ')}{current.midi === 60 ? ' · Middle C' : ''}</p></div>
      <p className="kn-hint">Select a note on the staff or a key below. Scroll each diagram to explore {range.label}.</p>
      {(['treble', 'bass'] as const).filter(item => clef === 'both' || clef === item).map(item => <div className="kn-staff-block" key={item}><h3>{item === 'treble' ? 'Treble clef' : 'Bass clef'}</h3><StaffDiagram notes={visible.map(key => spelling(key)[item])} selected={asciiNote(selected)} onSelect={pick} ready={audio.ready}/></div>)}
      <KeyboardDiagram keys={keys} selected={current.midi} sounding={audio.sounding} ready={audio.ready} onSelect={key => { audio.cancel(); const next = defaultSpelling(notes.find(item => item.midi === key.midi)!, flat); setSelected(displayNote(next.name)); setExplicitSpelling(false); }} label={range.label}/>
      <div className="kn-toolbar"><NotePlayback audio={audio} midi={current.midi}/><button className="am-button am-secondary" disabled={!audio.ready} onClick={() => { audio.cancel(); flushSync(() => setSnapshot({ range, clef, selected, flat })); try { window.print(); } catch { setError('Printing could not start. Please use your browser’s print command.'); } }}>Print current range</button><ShareControl path="/keyboard-notes/chart" params={shareParams}/></div>
      <p role="status" className="kn-error">{error}</p>
      <p className="kn-hint">The 61-key reference uses C2–C7. Check your keyboard’s endpoints and transpose setting before matching the chart.</p>
    </section>
    <div className="kn-print-only" data-print-range={print.range.id} data-print-selected={print.selected} data-print-clef={print.clef} data-print-prefer={print.flat ? 'flat' : 'sharp'}><section className="kn-print-sheet kn-chart-print"><div className="kn-print-title">Piano Notes Chart</div><p>{print.range.label} · Selected: {displayNote(print.selected)} · Clef: {print.clef === 'both' ? 'treble and bass' : print.clef}</p>{printCurrent.display_names.length > 1 && <p>Enharmonic key names: {printCurrent.display_names.map(displayNote).join(' / ')}</p>}<div className="kn-print-staves">{(['treble', 'bass'] as const).filter(item => print.clef === 'both' || print.clef === item).map(item => <div key={item}><h2>{item === 'treble' ? 'Treble clef' : 'Bass clef'}</h2><StaffDiagram compact notes={[printSpelling[item]]} selected={asciiNote(print.selected)}/></div>)}</div><KeyboardDiagram keys={keysFor(printKeys)} selected={printCurrent.midi}/><footer><p>PianoGrid · pianogrid.com/keyboard-notes/chart · Middle C = C4.</p></footer></section></div>
    <ReadNotePractice notes={notes}/>
  </>;
}
