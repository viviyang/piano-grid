'use client';
import { useState } from 'react';
import type { Layout } from '@/lib/keyboard-types';
import { displayNote, resolveLookup } from '@/lib/keyboard-resolution';
import { KeyboardDiagram } from './keyboard-diagram';

type Row = { pianoKey: number; midi: number; note: string; frequency: number };

export function FrequencyExperience({ layout, rows }: { layout: Layout; rows: Row[] }) {
  const [query, setQuery] = useState('A4');
  const [selected, setSelected] = useState(69);
  const [message, setMessage] = useState('A4 is MIDI 69, piano key 49, and 440.00 Hz with A4 = 440 Hz.');
  function find() {
    const value = query.trim();
    let midi: number | null = null;
    if (/^\d+$/.test(value)) midi = Number(value);
    else {
      const resolution = resolveLookup(value, layout);
      if (resolution.status === 'selected') midi = resolution.selected!.midi;
    }
    const row = rows.find(item => item.midi === midi);
    if (!row) { setSelected(-1); setMessage('Enter one note with an octave, such as C4 or A4, or a MIDI number from 21 to 108.'); return; }
    setSelected(row.midi);
    setMessage(`${displayNote(row.note)} is MIDI ${row.midi}, piano key ${row.pianoKey}, and ${row.frequency.toFixed(2)} Hz with A4 = 440 Hz.`);
  }
  return <section className="am-tool kn-tool kn-frequency" aria-label="Piano note frequency lookup"><form className="kn-query kn-screen" onSubmit={event => { event.preventDefault(); find(); }}><label className="kn-field">Find by note or MIDI<input value={query} onChange={event => setQuery(event.target.value)} placeholder="Try C4, A4, Bb4, or 69"/></label><button className="am-button am-secondary">Find</button></form><div className="kn-result"><h2>{selected >= 0 ? displayNote(rows.find(row => row.midi === selected)!.note) : 'Find a frequency'}</h2><p role="status">{message}</p></div><div className="kn-screen"><KeyboardDiagram keys={layout.keys} selected={selected >= 0 ? selected : null} onSelect={key => { const row = rows.find(item => item.midi === key.midi)!; setSelected(row.midi); setQuery(String(row.midi)); setMessage(`${displayNote(row.note)} is MIDI ${row.midi}, piano key ${row.pianoKey}, and ${row.frequency.toFixed(2)} Hz with A4 = 440 Hz.`); }} label="88-key frequency reference"/><p className="kn-hint">Swipe or scroll to locate the highlighted key.</p><button type="button" className="am-button am-secondary" onClick={() => window.print()}>Print frequency chart</button></div><div className="kn-table-scroll" role="region" aria-label="All 88 piano note frequencies" tabIndex={0}><table className="kn-frequency-table"><caption>88-key A440 equal-tempered reference</caption><thead><tr><th scope="col">Piano key</th><th scope="col">Note</th><th scope="col">MIDI</th><th scope="col">Frequency</th></tr></thead><tbody>{rows.map(row => <tr key={row.midi} className={row.midi === selected ? 'kn-current-row' : undefined}><td>{row.pianoKey}</td><th scope="row">{displayNote(row.note)}</th><td>{row.midi}</td><td>{row.frequency.toFixed(2)} Hz</td></tr>)}</tbody></table></div><p className="kn-print-footer">PianoGrid · pianogrid.com/keyboard-notes/frequencies · Calculated with f = 440 × 2^((m - 69) / 12). Values rounded to two decimals.</p></section>;
}
