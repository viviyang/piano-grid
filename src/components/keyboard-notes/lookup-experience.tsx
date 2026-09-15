'use client';
import { useEffect, useMemo, useState } from 'react';
import type { Layout, PianoKey } from '@/lib/keyboard-types';
import { lookupMessage, lookupShareParams, resolveLookup, restoreLookup, selectCandidate, selectPianoKey, type LookupResolution } from '@/lib/keyboard-resolution';
import { KeyboardDiagram } from './keyboard-diagram';
import { FindNotePractice } from './practice';
import { ShareControl } from './share-control';
import { LayoutChoice, NotePlayback } from './tool-controls';
import { useNoteAudio } from './use-note-audio';

export function LookupExperience({ layouts }: { layouts: Layout[] }) {
  const [layoutID, setLayoutID] = useState(layouts[0].layout_id);
  const [query, setQuery] = useState('');
  const [resolution, setResolution] = useState<LookupResolution>(() => resolveLookup('C4', layouts[0]));
  const [side, setSide] = useState(false);
  const audio = useNoteAudio();
  const layout = layouts.find(item => item.layout_id === layoutID) ?? layouts[0];
  const selection = resolution.selected;

  useEffect(() => {
    const restored = restoreLookup(new URLSearchParams(window.location.search), layouts);
    if (!restored.resolution) return;
    setLayoutID(restored.layout.layout_id);
    setResolution(restored.resolution);
    setQuery(restored.resolution.selected?.requestedSpelling.display ?? '');
  }, [layouts]);

  function find(raw: string, activeLayout = layout) {
    audio.cancel();
    setSide(false);
    if (/black.*key.*G/i.test(raw)) {
      setResolution({ rawInput: raw, status: 'invalid', normalizedPitchClass: null, displaySpelling: null, candidates: [], selected: null, messageKey: 'invalid' });
      setSide(true);
      return;
    }
    setResolution(resolveLookup(raw, activeLayout));
  }

  function changeLayout(id: string) {
    audio.cancel();
    const next = layouts.find(item => item.layout_id === id) ?? layouts[0];
    setLayoutID(next.layout_id);
    setSide(false);
    const value = query.trim() || selection?.requestedSpelling.display || '';
    setResolution(value ? resolveLookup(value, next, selection?.source === 'text_query' ? 'text_query' : 'share_restore') : resolveLookup('', next));
  }

  function chooseKey(key: PianoKey) {
    audio.cancel();
    const selected = selectPianoKey(key, layout);
    setQuery(selected.requestedSpelling.display);
    setResolution({ rawInput: selected.requestedSpelling.display, status: 'selected', normalizedPitchClass: selected.requestedSpelling.letter + (selected.requestedSpelling.accidental ?? ''), displaySpelling: selected.requestedSpelling.display, candidates: [], selected, messageKey: null });
    setSide(false);
  }

  const key = layout.keys.find(item => item.midi === selection?.midi);
  const message = side ? 'Which side of G?' : lookupMessage(resolution, layout);
  const shareParams = useMemo(() => lookupShareParams(layout, selection), [layout, selection]);
  return <>
    <section className="am-tool kn-tool" aria-label="Find a piano key">
      <div className="kn-toolbar">
        <LayoutChoice layouts={layouts} value={layoutID} ready={audio.ready} onChange={changeLayout}/>
        <form className="kn-query" onSubmit={event => { event.preventDefault(); find(query); }}>
          <label className="kn-field">Find a note<input value={query} onChange={event => setQuery(event.target.value)} placeholder="Try F3, A4, C, A-flat, B-sharp 3" disabled={!audio.ready}/></label>
          <button className="am-button am-secondary" disabled={!audio.ready}>Find</button>
        </form>
      </div>
      <p className="kn-range">{layout.label} · {layout.white_key_count} white / {layout.black_key_count} black keys</p>
      {resolution.status !== 'selected' && <div className="kn-resolution" role="status"><h2>{resolution.status === 'choose_octave' ? 'Which octave do you mean?' : resolution.messageKey === 'compound' ? 'Try a single note instead.' : resolution.status === 'outside_range' ? 'This note is outside the selected keyboard range.' : 'Enter one note name.'}</h2><p>{message}</p></div>}
      {side && <div className="kn-actions"><button type="button" className="am-button" onClick={() => { setQuery('F#'); find('F#'); }}>Lower / left of G: F# / Gb</button><button type="button" className="am-button" onClick={() => { setQuery('G#'); find('G#'); }}>Higher / right of G: G# / Ab</button></div>}
      {resolution.candidates.length > 0 && <div className="kn-actions" aria-label="Choose an octave">{resolution.candidates.map(candidate => <button type="button" className="am-button" key={candidate.display} onClick={() => { const next = selectCandidate(candidate, query, layout); setQuery(candidate.display); setResolution(next); }}>{candidate.display}</button>)}</div>}
      <div className="kn-result" data-selected-midi={selection?.midi ?? ''}><h2>{selection?.requestedSpelling.display ?? 'Choose a note'}</h2>{key && selection && <p>{key.color === 'black' ? 'Black key' : 'White key'}{selection.equivalentLabels.length ? ` · Same piano key as ${selection.equivalentLabels.join(' / ')}` : ''}{key.midi === 60 ? ' · Middle C' : ''}</p>}</div>
      <KeyboardDiagram keys={layout.keys} selected={selection?.midi} sounding={audio.sounding} onSelect={chooseKey} ready={audio.ready} label={layout.label}/>
      <p className="kn-hint">Swipe or scroll to explore the full range. On a key, use ← / →, Home or End to move focus; Enter selects.</p>
      <div className="kn-toolbar"><NotePlayback audio={audio} midi={selection?.midi ?? null}/><ShareControl path="/keyboard-notes" params={shareParams}/></div>
      <p className="kn-hint">{layout.scope_note}</p>
      <noscript><p>JavaScript is required for selection and sound. The keyboard and reference text remain readable.</p></noscript>
    </section>
    <FindNotePractice layout={layout}/>
  </>;
}
