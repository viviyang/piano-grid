'use client';

import { useEffect, useState } from 'react';
import type { ByKeyChord, ByKeyTable, ProgressionPattern } from '@/lib/support-content';

const display = (value: string) => value.replaceAll('#', '♯').replaceAll('b', '♭');

function ChordSymbol({ chord }: { chord: ByKeyChord }) {
  return chord.detailURL
    ? <a href={chord.detailURL} aria-label={`View ${display(chord.symbol)} chord details`}>{display(chord.symbol)}</a>
    : <strong>{display(chord.symbol)}</strong>;
}

function PatternCard({ pattern, keyTable }: { pattern: ProgressionPattern; keyTable: ByKeyTable }) {
  const chords = pattern.romans.map(roman => {
    const chord = keyTable.chords.find(item => item.roman === roman);
    if (!chord) throw new Error(`Missing ${roman} in ${keyTable.key}`);
    return chord;
  });
  return <article className="pg-pattern" data-pattern={pattern.romans.join('-')}>
    <header><div><p className="sp-overline">{pattern.romans.length} chord positions</p><h3>{pattern.title}</h3></div><strong>{pattern.romans.join('–')}</strong></header>
    <p className="pg-pattern-note">{pattern.explanation}</p>
    <ol className="pg-chord-line" aria-label={`${pattern.romans.join('–')} in ${keyTable.key}`}>
      {chords.map((chord, index) => <li key={`${pattern.id}-${index}`}>
        <span className="pg-position">{index + 1}</span>
        <div className="pg-roman"><small>Roman numeral</small><b>{pattern.romans[index]}</b></div>
        <div className="pg-symbol"><small>Chord symbol</small><ChordSymbol chord={chord}/></div>
        <div className="pg-notes"><small>Chord notes</small><span>{display(chord.notes.join(' · '))}</span></div>
        <div className="pg-quality"><small>Quality</small><span>{chord.quality}</span></div>
      </li>)}
    </ol>
    <footer><strong>How to practice</strong><p>{pattern.practice}</p><small>No fingering is assigned by this progression.</small></footer>
  </article>;
}

export function ProgressionExperience({ keys, patterns, defaultKey }: { keys: ByKeyTable[]; patterns: ProgressionPattern[]; defaultKey: string }) {
  const [selectedKey, setSelectedKey] = useState(defaultKey);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const selected = keys.find(key => key.key === selectedKey) || keys[0];
  return <section className="sp-result pg-result" aria-labelledby="progression-examples-heading">
    <div className="sp-result-head"><div><p className="sp-overline">Shared by-key chord source</p><h2 id="progression-examples-heading">Choose a key and map each degree</h2></div><p>The pattern keeps its Roman numerals. The selected key supplies each chord symbol, quality and note spelling.</p></div>
    <div className="pg-picker"><label htmlFor="progression-key">Key</label><select id="progression-key" value={selectedKey} onChange={event => setSelectedKey(event.target.value)}>{keys.map(key => <option key={key.key}>{key.key}</option>)}</select><p aria-live="polite"><strong>{selected.key}</strong><span>{display(selected.scale.join(' · '))}</span></p></div>
    <div className="pg-key-panels">{keys.map(key => <section className="pg-key-panel" data-key={key.key} hidden={ready && key.key !== selectedKey} key={key.key} aria-labelledby={`progressions-${key.key.replace(' ', '-')}`}>
      <header><p className="sp-overline">Selected key</p><h3 id={`progressions-${key.key.replace(' ', '-')}`}>{key.key} progression map</h3><p>Key: <strong>{key.key}</strong> · Scale notes: {display(key.scale.join(' · '))}</p></header>
      <div className="pg-patterns">{patterns.map(pattern => <PatternCard pattern={pattern} keyTable={key} key={pattern.id}/>)}</div>
    </section>)}</div>
  </section>;
}
