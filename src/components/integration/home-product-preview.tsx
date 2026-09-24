import type { CSSProperties, ReactNode } from 'react';

/** Decorative, homepage-only previews of the real destination types. */
const previewKeys = ['C', 'D', 'E', 'F', 'G', 'A', 'B', 'C'];
const waveform = [12, 23, 38, 27, 50, 31, 43, 20, 34, 16, 25, 12];

function MiniKeyboard({ chord = false }: { chord?: boolean }) {
  const keys = chord ? ['G', 'A', 'B', 'C', 'D', 'E', 'F'] : previewKeys;
  const blackPositions = chord ? [13, 27, 56, 70] : [11, 24, 49, 62, 75];
  return <div className="hv-mini-keyboard"><div className="hv-mini-whites">{keys.map((key, index) => <span className={chord && [1, 3, 5].includes(index) ? 'is-marked' : undefined} key={`${key}-${index}`}>{key}</span>)}</div><div className="hv-mini-blacks" aria-hidden="true">{blackPositions.map(left => <i key={left} style={{ left: `${left}%` }}/>)}</div></div>;
}

function PreviewWindow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`hv-preview-window ${className}`}>{children}</div>;
}

export function HomeProductPreview({ kind }: { kind: 'notes' | 'chords' | 'scales' | 'songs' | 'sheet' | 'hearing' }) {
  if (kind === 'notes') return <div className="hv-preview hv-preview-blue" aria-hidden="true"><PreviewWindow><div className="hv-preview-head"><b>Piano notes</b><b>C4</b></div><div className="hv-preview-note"><em>C</em><span><strong>Middle C</strong><small>A place to begin.</small></span></div><MiniKeyboard/></PreviewWindow><span className="hv-preview-arrow">→</span></div>;
  if (kind === 'chords') return <div className="hv-preview hv-preview-lilac" aria-hidden="true"><PreviewWindow className="hv-preview-tilt-right"><div className="hv-preview-head"><b>A minor</b><b>Am</b></div><div className="hv-preview-chips"><span>A</span><span>C</span><span>E</span></div><MiniKeyboard chord/></PreviewWindow><span className="hv-preview-arrow">→</span></div>;
  if (kind === 'scales') return <div className="hv-preview hv-preview-blue" aria-hidden="true"><PreviewWindow className="hv-preview-tilt-left"><div className="hv-preview-head"><b>C major</b><b>8 notes</b></div><div className="hv-scale-steps">{previewKeys.map((key, index) => <span key={`${key}-${index}`} style={{ '--step': index } as CSSProperties}><b>{key}</b><small>{index + 1}</small></span>)}</div><p>One octave. Step by step.</p></PreviewWindow><span className="hv-preview-arrow">→</span></div>;
  if (kind === 'songs') return <div className="hv-preview hv-preview-pink" aria-hidden="true"><PreviewWindow><div className="hv-preview-head"><b>Your next piece</b><b>♫</b></div>{[['01', 'Hot Cross Buns', 'First-lesson materials'], ['02', 'Twinkle, Twinkle', 'A 10-minute starting plan'], ['03', 'Ode to Joy', 'Compare the edition']].map(row => <div className="hv-song-row" key={row[0]}><span>{row[0]}</span><span><strong>{row[1]}</strong><small>{row[2]}</small></span><b>›</b></div>)}</PreviewWindow><span className="hv-preview-arrow">→</span></div>;
  if (kind === 'sheet') return <div className="hv-preview hv-preview-sheet" aria-hidden="true"><div className="hv-sheet-back"/><PreviewWindow className="hv-sheet-front"><b>Find the right edition</b><div className="hv-sheet-staves">{[0, 1].map(index => <span key={index}/>)}</div><div className="hv-sheet-meta"><span>Source<br/>Access</span><strong>Publisher<br/>Check details →</strong></div></PreviewWindow><span className="hv-preview-arrow">→</span></div>;
  return <div className="hv-preview hv-preview-lilac" aria-hidden="true"><PreviewWindow><div className="hv-preview-head"><b>Hear the difference</b><b>▶</b></div><div className="hv-wave-labels"><span>Chord 1</span><span>Chord 2</span></div><div className="hv-wave-pair"><div className="hv-wave">{waveform.map((height, index) => <i key={index} style={{ height }}/>)}</div><span>→</span><div className="hv-wave">{waveform.map((height, index) => <i key={index} style={{ height: waveform[(index + 4) % waveform.length] }}/>)}</div></div><p>One note changes. Can you hear it?</p></PreviewWindow><span className="hv-preview-arrow">→</span></div>;
}
