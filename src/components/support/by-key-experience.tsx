'use client';

import { useEffect, useState } from 'react';
import type { ByKeyTable, SupportLink } from '@/lib/support-content';

const display = (value: string) => value.replaceAll('#', '♯').replaceAll('b', '♭');

function ChordLink({ url, symbol }: { url: string | null; symbol: string }) {
  return url ? <a href={url} aria-label={`View ${display(symbol)} chord details`}>{display(symbol)}</a> : <strong>{display(symbol)}</strong>;
}

export function ByKeyExperience({ keys, defaultKey, cMajorScaleLink }: { keys: ByKeyTable[]; defaultKey: string; cMajorScaleLink?: SupportLink }) {
  const [selectedKey, setSelectedKey] = useState(defaultKey);
  const [ready, setReady] = useState(false);
  useEffect(() => setReady(true), []);
  const selected = keys.find(key => key.key === selectedKey) || keys[0];
  return <section className="sp-result bk-result" aria-labelledby="by-key-table-heading">
    <div className="sp-result-head"><div><p className="sp-overline">Seven prepared key tables</p><h2 id="by-key-table-heading">Choose a key, then read its seven degrees</h2></div><p>Changing the key changes the scale collection. It does not filter the chord chart by one root note.</p></div>
    <div className="bk-picker"><label htmlFor="by-key-select">Key</label><select id="by-key-select" value={selectedKey} onChange={event => setSelectedKey(event.target.value)}>{keys.map(key => <option value={key.key} key={key.key}>{key.key}</option>)}</select><p aria-live="polite"><strong>{selected.key}</strong><span>{display(selected.scale.join(' · '))}</span></p></div>
    <div className="bk-key-panels">{keys.map(key => <section className="bk-key-panel" data-key={key.key} hidden={ready && key.key !== selectedKey} key={key.key} aria-labelledby={`key-${key.key.replace(' ', '-')}`}>
      <header><div><p className="sp-overline">{key.basis} scale</p><h3 id={`key-${key.key.replace(' ', '-')}`}>{key.key} chords</h3></div><p><span>Scale notes</span><strong>{display(key.scale.join(' · '))}</strong>{key.key === 'C major' && cMajorScaleLink && <a href={cMajorScaleLink.url}>{cMajorScaleLink.label}</a>}</p></header>
      <div className="bk-table-scroll" tabIndex={0} role="region" aria-label={`${key.key} chord table`}><table><caption>Triads built by stacking scale degrees 1, 3 and 5 in {key.key}.</caption><thead><tr><th scope="col">Degree</th><th scope="col">Roman</th><th scope="col">Chord</th><th scope="col">Root note</th><th scope="col">Quality</th><th scope="col">Chord tones</th><th scope="col">Reference register</th></tr></thead><tbody>{key.chords.map(chord => <tr data-degree={chord.degree} data-quality={chord.quality} key={`${key.key}-${chord.degree}`}><td data-label="Degree">{chord.degree}</td><td data-label="Roman"><span className={`bk-roman bk-${chord.quality}`}>{chord.roman}</span></td><td data-label="Chord"><ChordLink url={chord.detailURL} symbol={chord.symbol}/></td><td data-label="Root note">{display(chord.notes[0])}</td><td data-label="Quality">{chord.quality}</td><td data-label="Chord tones">{display(chord.notes.join(' · '))}</td><td data-label="Reference register">{display(chord.referenceVoicing.join(' · '))}<small>No fingering assigned</small></td></tr>)}</tbody></table></div>
      {key.raisedLeadingToneOptions.length > 0 && <aside className="bk-altered" aria-labelledby="raised-leading-tone"><div><p className="sp-overline">Separate altered options</p><h4 id="raised-leading-tone">Raised-leading-tone choices</h4><p>These use C♯ and do not replace the D natural minor rows above.</p></div><div>{key.raisedLeadingToneOptions.map(option => <article key={option.roman}><span>{option.roman}</span><ChordLink url={option.detailURL} symbol={option.symbol}/><p>{display(option.notes.join(' · '))}</p><small>{option.change}</small></article>)}</div></aside>}
    </section>)}</div>
  </section>;
}
