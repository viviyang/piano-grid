'use client';

import { useEffect, useState } from 'react';
import type { ByKeyTable, SupportLink } from '@/lib/support-content';
import { chordQualityLabel } from '@/lib/chord-quality-label';

const display = (value: string) => value.replaceAll('#', '♯').replaceAll('b', '♭');

function ChordLink({ url, symbol }: { url: string | null; symbol: string }) {
  return url ? <a href={url} aria-label={`View ${display(symbol)} chord details`}>{display(symbol)}</a> : <strong>{display(symbol)}</strong>;
}

export function ByKeyExperience({ keys, defaultKey, cMajorScaleLink }: { keys: ByKeyTable[]; defaultKey: string; cMajorScaleLink?: SupportLink }) {
  const [selectedKey, setSelectedKey] = useState(defaultKey);
  const [ready, setReady] = useState(false);
  const anchorFor=(key:ByKeyTable)=>key.id.replace('-natural_minor','-minor').replaceAll('_','-');
  useEffect(() => {const anchor=window.location.hash.slice(1),match=keys.find(key=>anchorFor(key)===anchor);if(match)setSelectedKey(match.key);setReady(true);}, [keys]);
  const selected = keys.find(key => key.key === selectedKey) || keys[0];
  return <section className="sp-result bk-result" aria-labelledby="by-key-table-heading">
    <div className="sp-result-head"><div><p className="sp-overline">{keys.length} verified key contexts · {keys.reduce((sum, key) => sum + key.chords.length, 0)} rows</p><h2 id="by-key-table-heading">Choose a key, then compare triads and sevenths</h2></div><p>Changing the key changes the scale collection. It does not filter the chord chart by one root note.</p></div>
    <div className="bk-picker"><label htmlFor="by-key-select">Key</label><select id="by-key-select" value={selectedKey} onChange={event => setSelectedKey(event.target.value)}>{keys.map(key => <option value={key.key} key={key.key}>{key.key}</option>)}</select><p aria-live="polite"><strong>{selected.key}</strong><span>{display(selected.scale.join(' · '))}</span></p></div>
    <div className="bk-key-panels">{keys.map(key => <section id={anchorFor(key)} className="bk-key-panel" data-key={key.key} hidden={ready && key.key !== selectedKey} key={key.key} aria-labelledby={`${anchorFor(key)}-heading`}>
      <header><div><p className="sp-overline">{key.basis} scale</p><h3 id={`${anchorFor(key)}-heading`}>{key.key} chords</h3></div><p><span>Scale notes</span><strong>{display(key.scale.join(' · '))}</strong>{key.key === 'C major' && cMajorScaleLink && <a href={cMajorScaleLink.url}>{cMajorScaleLink.label}</a>}</p></header>
      <div className="bk-table-scroll" tabIndex={0} role="region" aria-label={`${key.key} chord table`}><table><caption>Seven triads and seven seventh chords built from the named {key.basis} scale. Key, root, quality and Roman numeral are separate fields.</caption><thead><tr><th scope="col">Degree</th><th scope="col">Roman numeral</th><th scope="col">Chord</th><th scope="col">Root note</th><th scope="col">Chord quality</th><th scope="col">Chord tones</th></tr></thead><tbody>{key.chords.map(chord => <tr data-degree={chord.degree} data-quality={chord.quality} key={`${key.key}-${chord.roman}`}><td data-label="Degree">{chord.degree}</td><td data-label="Roman numeral"><span className={`bk-roman bk-${chord.quality}`}>{chord.roman}</span></td><td data-label="Chord">{chord.destination?<ChordLink url={chord.destination} symbol={chord.symbol}/>:<strong>{display(chord.symbol)}</strong>}</td><td data-label="Root note">{display(chord.notes[0])}</td><td data-label="Chord quality">{chordQualityLabel(chord.quality)}</td><td data-label="Chord tones">{display(chord.notes.join(' · '))}</td></tr>)}</tbody></table></div>
      {key.raisedLeadingToneOptions.length > 0 && <aside className="bk-altered" aria-labelledby="raised-leading-tone"><div><p className="sp-overline">Separate altered options</p><h4 id="raised-leading-tone">Raised-leading-tone choices</h4><p>These use C♯ and do not replace the D natural minor rows above.</p></div><div>{key.raisedLeadingToneOptions.map(option => <article key={option.roman}><span>{option.roman}</span><ChordLink url={option.detailURL} symbol={option.symbol}/><p>{display(option.notes.join(' · '))}</p><small>{option.change}</small></article>)}</div></aside>}
    </section>)}</div>
  </section>;
}
