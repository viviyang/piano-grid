'use client';
import { useMemo, useState } from 'react';
import type { ChartKey, Layout, PianoKey } from '@/lib/keyboard-types';
import { displayNote } from '@/lib/keyboard-resolution';
import { generateFindPractice, generateReadPractice, scorePractice, type PracticeLevel, type PracticeTarget } from '@/lib/keyboard-practice';
import { KeyboardDiagram } from './keyboard-diagram';
import { StaffDiagram } from './staff-diagram';

function LevelChoice({ value, onChange, prefix }: { value: PracticeLevel; onChange: (level: PracticeLevel) => void; prefix: string }) {
  return <label className="kn-field">Level<select value={value} onChange={event => onChange(event.target.value as PracticeLevel)}><option value="1">Level 1 - naturals</option><option value="2">Level 2 - octave precision</option><option value="3">Level 3 - sharps and flats</option></select><span className="kn-sr-only" id={`${prefix}-level-help`}>Choose a practice difficulty.</span></label>;
}

function Session({ targets, keys, staff = false, sessionKey, onRetry }: { targets: PracticeTarget[]; keys: PianoKey[]; staff?: boolean; sessionKey: string; onRetry: () => void }) {
  const [index, setIndex] = useState(0), [correct, setCorrect] = useState(0), [feedback, setFeedback] = useState(''), [answer, setAnswer] = useState<number | null>(null);
  const complete = index >= targets.length;
  const target = targets[Math.min(index, targets.length - 1)];
  function choose(key: PianoKey) {
    if (complete || answer !== null) return;
    const result = scorePractice(target.midi, key.midi);
    const answerLabel = displayNote(key.label_with_octave.split(' / ')[0]);
    setAnswer(key.midi);
    if (result === 'correct') { setCorrect(value => value + 1); setFeedback(staff ? `Correct - the staff note is ${target.label}.` : `Correct - ${target.label} is the selected key.`); }
    else if (result === 'wrong_octave') setFeedback(`Not quite - that was ${answerLabel}. Find ${target.label}. The octave number identifies a different pitch.`);
    else setFeedback(staff ? `Not quite - you selected ${answerLabel}. Look again at the clef, line or space, and octave.` : `Not quite - that was ${answerLabel}. Try ${target.label}.`);
  }
  if (complete) return <div className="kn-practice-summary" data-practice-complete="true"><h3>{correct} / 10 correct</h3><p>Your result stays on this device only for this session.</p><button type="button" className="am-button am-primary" onClick={onRetry}>Practice again</button></div>;
  return <div key={sessionKey} data-practice-index={index + 1}><p className="kn-practice-progress">Question {index + 1} of {targets.length}</p>{staff && target.staff ? <div className="kn-practice-staff"><StaffDiagram notes={[target.staff]} selected={target.staff.note}/></div> : <h3 className="kn-practice-prompt">Find {target.label}</h3>}<KeyboardDiagram keys={keys} selected={answer} onSelect={choose} label="Practice piano keyboard"/><p className="kn-hint">The octave matters. Select one piano key.</p><p className="kn-practice-feedback" aria-live="polite">{feedback}</p>{answer !== null && <button type="button" className="am-button am-primary" onClick={() => { setIndex(value => value + 1); setAnswer(null); setFeedback(''); }}>Next note</button>}</div>;
}

export function FindNotePractice({ layout }: { layout: Layout }) {
  const [level, setLevel] = useState<PracticeLevel>('1'), [run, setRun] = useState(0);
  const seed = 20260915 + run * 97 + Number(level);
  const targets = useMemo(() => generateFindPractice(layout, level, seed), [layout, level, seed]);
  return <section className="kn-practice" aria-labelledby="find-practice-title"><div className="kn-practice-heading"><div><h2 id="find-practice-title">Find this note</h2><p>See a note name, then select the matching piano key. The octave matters.</p></div><LevelChoice prefix="find" value={level} onChange={value => { setLevel(value); setRun(current => current + 1); }}/></div><Session key={`${layout.layout_id}-${level}-${run}`} sessionKey={`${level}-${run}`} targets={targets} keys={layout.keys} onRetry={() => setRun(value => value + 1)}/></section>;
}

function chartKeys(notes: ChartKey[]): PianoKey[] {
  return notes.map(key => ({ key_id: `pitch-${key.midi}`, midi: key.midi, color: key.color, default_label: key.display_names.map(name => name.replace(/\d+$/, '')).join(' / '), label_with_octave: key.display_names.join(' / '), lookup_spellings: key.display_names, white_key_index: null, black_key_between_white_indices: null }));
}

export function ReadNotePractice({ notes }: { notes: ChartKey[] }) {
  const [level, setLevel] = useState<PracticeLevel>('1'), [run, setRun] = useState(0);
  const seed = 20260915 + run * 101 + Number(level) * 11;
  const targets = useMemo(() => generateReadPractice(notes, level, seed), [notes, level, seed]);
  const visibleNotes = notes.filter(key => key.midi >= 36 && key.midi <= 96);
  return <section className="kn-practice" aria-labelledby="read-practice-title"><div className="kn-practice-heading"><div><h2 id="read-practice-title">Read this note</h2><p>Read the note on the staff, then select the matching piano key.</p></div><LevelChoice prefix="read" value={level} onChange={value => { setLevel(value); setRun(current => current + 1); }}/></div><Session key={`${level}-${run}`} sessionKey={`${level}-${run}`} staff targets={targets} keys={chartKeys(visibleNotes)} onRetry={() => setRun(value => value + 1)}/></section>;
}
