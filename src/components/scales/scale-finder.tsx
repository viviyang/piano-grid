'use client';

import { useMemo, useState } from 'react';
import type { ScaleOption } from '@/lib/scale-types';
import { emitScaleEvent } from '@/lib/scale-events';

const keys = [
  { pc: 0, label: 'C' }, { pc: 1, label: 'C♯ / D♭' }, { pc: 2, label: 'D' }, { pc: 3, label: 'D♯ / E♭' },
  { pc: 4, label: 'E' }, { pc: 5, label: 'F' }, { pc: 6, label: 'F♯ / G♭' }, { pc: 7, label: 'G' },
  { pc: 8, label: 'G♯ / A♭' }, { pc: 9, label: 'A' }, { pc: 10, label: 'A♯ / B♭' }, { pc: 11, label: 'B' },
] as const;

function pitchClasses(option: ScaleOption) {
  return [...new Set(option.sequences.RH.ascending.slice(0, -1).map((note) => ((note.midi % 12) + 12) % 12))].sort((a, b) => a - b);
}

export function ScaleFinder({ options, onChoose }: { options: ScaleOption[]; onChoose: (option: ScaleOption) => void }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [mode, setMode] = useState<'contains' | 'exact'>('contains');
  const [submitted, setSubmitted] = useState(false);
  const [page, setPage] = useState(0);
  const unique = useMemo(() => [...new Map(options.map((option) => [option.id, option])).values()], [options]);
  const results = submitted && selected.length ? unique.filter((option) => {
    const pcs = pitchClasses(option);
    return mode === 'exact' ? pcs.length === selected.length && pcs.every((pc) => selected.includes(pc)) : selected.every((pc) => pcs.includes(pc));
  }) : [];
  const pageSize = 10;
  const pages = Math.max(1, Math.ceil(results.length / pageSize));
  const visible = results.slice(page * pageSize, page * pageSize + pageSize);
  const submit = () => {
    setSubmitted(true); setPage(0);
    const count = selected.length ? unique.filter((option) => {
      const pcs = pitchClasses(option);
      return mode === 'exact' ? pcs.length === selected.length && pcs.every((pc) => selected.includes(pc)) : selected.every((pc) => pcs.includes(pc));
    }).length : 0;
    emitScaleEvent('scale_finder_result', { mode, selected_count: selected.length, match_count: count, status: selected.length ? (count ? 'matches' : 'no_match') : 'empty' });
  };
  const clear = () => { setSelected([]); setSubmitted(false); setPage(0); };

  return <section className="am-tool sc-finder sc-screen" id="find-by-notes" aria-labelledby="find-by-notes-heading">
    <h2 id="find-by-notes-heading">Find a scale by notes</h2>
    <p>Select the piano keys you already know. Contains finds supported scales that include every selected key; Exact finds the same pitch-class set. Results name the written spelling used by each scale.</p>
    <fieldset><legend>Notes</legend><div className="sc-finder-keys">{keys.map((key) => <label key={key.pc}><input type="checkbox" checked={selected.includes(key.pc)} onChange={(event) => { setSubmitted(false); setSelected((values) => event.target.checked ? [...values, key.pc].sort((a,b) => a-b) : values.filter((value) => value !== key.pc)); }}/><span>{key.label}</span></label>)}</div></fieldset>
    <fieldset className="sc-finder-mode"><legend>Match</legend><label><input type="radio" name="finder-mode" checked={mode === 'contains'} onChange={() => { setMode('contains'); setSubmitted(false); }}/> Contains all selected notes</label><label><input type="radio" name="finder-mode" checked={mode === 'exact'} onChange={() => { setMode('exact'); setSubmitted(false); }}/> Exact pitch-class set</label></fieldset>
    <div className="sc-actions"><button type="button" className="am-button am-primary" onClick={submit}>Find scales</button><button type="button" className="am-button am-secondary" onClick={clear}>Clear</button></div>
    <div className="sc-finder-results" aria-live="polite">
      {!submitted && selected.length === 0 && <p>No notes selected yet. Choose one or more keys, then find matching scales.</p>}
      {!submitted && selected.length > 0 && <p>{selected.length} {selected.length === 1 ? 'note is' : 'notes are'} selected. Choose Find scales to run the search.</p>}
      {submitted && selected.length === 0 && <p>Select at least one note to search.</p>}
      {submitted && selected.length > 0 && results.length === 0 && <p>No supported scale matches this selection. Try Contains or clear one note.</p>}
      {results.length > 0 && <><p><strong>{results.length} matches</strong> in the current 60-object major/minor collection.</p><ol start={page * pageSize + 1}>{visible.map((option) => <li key={option.id}><strong>{option.tonic} {option.formLabel}</strong> <span>- {option.sequences.RH.ascending.slice(0, -1).map((note) => note.spelling.replaceAll('#','♯').replaceAll('b','♭')).join(' - ')}</span><div>{option.detailURL && <a href={option.detailURL} onClick={() => emitScaleEvent('scale_next_task_opened', { object_id: option.id, target: option.detailURL })}>Open detail</a>}<button type="button" className="am-button am-tertiary" onClick={() => { onChoose(option); document.querySelector('.sc-tool')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); }}>Load in explorer</button></div></li>)}</ol>{pages > 1 && <div className="sc-pagination"><button type="button" disabled={page === 0} onClick={() => setPage((value) => value - 1)}>Previous</button><span>Page {page + 1} of {pages}</span><button type="button" disabled={page + 1 >= pages} onClick={() => setPage((value) => value + 1)}>Next</button></div>}</>}
    </div>
    <noscript><p>Interactive matching requires JavaScript. The major and minor tables on this page list the complete current collection for manual comparison.</p></noscript>
  </section>;
}
