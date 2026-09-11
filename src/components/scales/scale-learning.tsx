'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardDiagram } from '@/components/keyboard-notes/keyboard-diagram';
import type { PianoKey } from '@/lib/keyboard-types';
import { buildPracticeEvents, evaluateOrderedPitches, evaluatePitchClasses, uniquePitchClasses } from '@/lib/scale-practice';
import { scaleSequence } from '@/lib/scale-resolver';
import type { ScaleDirection, ScaleHand, ScaleOption, ScalePitch } from '@/lib/scale-types';
import type { useScaleAudio } from './use-scale-audio';

type Audio = ReturnType<typeof useScaleAudio>;
type QuizType = 'note_set' | 'order' | 'classical_descent';
type PracticeState = 'idle' | 'counting' | 'playing' | 'paused' | 'completed';

const display = (value: string) => value.replaceAll('##', '𝄪').replaceAll('bb', '𝄫').replaceAll('#', '♯').replaceAll('b', '♭');
const pcLabels = ['C', 'C♯ / D♭', 'D', 'D♯ / E♭', 'E', 'F', 'F♯ / G♭', 'G', 'G♯ / A♭', 'A', 'A♯ / B♭', 'B'];

function StaticAnswers({ option, hand }: { option: ScaleOption; hand: ScaleHand }) {
  const ascending = option.sequences[hand].ascending;
  const descending = option.sequences[hand].descending;
  return <div className="sc-static-answers">
    <details><summary>Static answer: select the notes</summary><p>{uniquePitchClasses(ascending).map((pitch) => display(pitch.spelling)).join(' - ')}</p></details>
    <details><summary>Static answer: ordered notes</summary><p>{ascending.map((pitch) => display(pitch.note)).join(' - ')}</p></details>
    {option.form === 'melodic_minor_classical' && <details><summary>Static answer: classical melodic-minor descent</summary><p>{descending.map((pitch) => display(pitch.note)).join(' - ')}. The sixth and seventh return to their natural-minor values in this exercise.</p></details>}
  </div>;
}

function NoteSetQuiz({ expected, ready }: { expected: ScalePitch[]; ready: boolean }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const expectedUnique = uniquePitchClasses(expected);
  const toggle = (pc: number) => {
    setSelected((current) => current.includes(pc) ? current.filter((value) => value !== pc) : [...current, pc]);
    if (feedback) setFeedback('Answer changed. Check it again when you are ready.');
  };
  return <div className="sc-quiz-panel" data-quiz="note-set">
    <p>Select every note in <strong>{display(expected[0].spelling)} {expected[0].midi < expected.at(-1)!.midi ? 'ascending' : 'descending'} scale reference</strong>. Octave and order do not matter for this question.</p>
    <div className="sc-pitch-buttons" aria-label="Pitch classes">{pcLabels.map((label, pc) => <button key={label} type="button" disabled={!ready} aria-pressed={selected.includes(pc)} onClick={() => toggle(pc)}>{label}</button>)}</div>
    <p className="sc-chosen">Chosen: {selected.length ? selected.sort((a, b) => a - b).map((pc) => pcLabels[pc]).join(', ') : 'None'}</p>
    <div className="sc-quiz-actions"><button type="button" className="am-button am-primary" disabled={!ready} onClick={() => setFeedback(evaluatePitchClasses(expected, selected))}>Check answer</button><button type="button" className="am-button am-secondary" disabled={!ready} onClick={() => { setSelected([]); setFeedback(''); }}>Clear</button><button type="button" className="am-button am-tertiary" disabled={!ready} onClick={() => { setSelected(expectedUnique.map((pitch) => pitch.midi % 12)); setFeedback(`Answer shown - not counted as a correct attempt. ${expectedUnique.map((pitch) => display(pitch.spelling)).join('-')}.`); }}>Show answer</button></div>
    <p className="sc-feedback" role="status">{feedback}</p>
  </div>;
}

function OrderQuiz({ expected, keyboardKeys, ready }: { expected: ScalePitch[]; keyboardKeys: PianoKey[]; ready: boolean }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const min = Math.min(...expected.map((pitch) => pitch.midi)) - 2;
  const max = Math.max(...expected.map((pitch) => pitch.midi)) + 2;
  const keys = keyboardKeys.filter((key) => key.midi >= min && key.midi <= max);
  const labels = Object.fromEntries(expected.map((pitch) => [pitch.midi, display(pitch.note)]));
  const append = (key: PianoKey) => { setSelected((current) => [...current, key.midi]); if (feedback) setFeedback('Answer changed. Check it again when you are ready.'); };
  const show = (midi: number) => labels[midi] ?? `${pcLabels[((midi % 12) + 12) % 12].split(' / ')[0]}${Math.floor(midi / 12) - 1}`;
  return <div className="sc-quiz-panel" data-quiz="order">
    <p>Enter <strong>{display(expected[0].note)} to {display(expected.at(-1)!.note)}</strong>, one note at a time. Include the final tonic that completes the octave.</p>
    <KeyboardDiagram keys={keys} selected={selected.at(-1) ?? null} marked={selected} onSelect={append} keyLabels={labels} ready={ready} label="Add notes to the ordered scale answer"/>
    <p className="sc-order-answer">Your order: {selected.length ? selected.map(show).join(' - ') : 'No notes yet'}</p>
    <div className="sc-quiz-actions"><button type="button" className="am-button am-secondary" disabled={!ready || !selected.length} onClick={() => { setSelected((current) => current.slice(0, -1)); setFeedback(''); }}>Undo last note</button><button type="button" className="am-button am-secondary" disabled={!ready || !selected.length} onClick={() => { setSelected([]); setFeedback(''); }}>Clear sequence</button><button type="button" className="am-button am-primary" disabled={!ready} onClick={() => setFeedback(evaluateOrderedPitches(expected, selected))}>Check order</button><button type="button" className="am-button am-tertiary" disabled={!ready} onClick={() => { setSelected(expected.map((pitch) => pitch.midi)); setFeedback('Reference sequence shown - not counted as a correct attempt.'); }}>Show answer</button></div>
    <p className="sc-feedback" role="status">{feedback}</p>
  </div>;
}

function ClassicalQuiz({ option, hand, ready }: { option: ScaleOption; hand: ScaleHand; ready: boolean }) {
  const correct = option.sequences[hand].descending;
  const reverse = [...option.sequences[hand].ascending].reverse();
  const [choice, setChoice] = useState('');
  const [feedback, setFeedback] = useState('');
  return <div className="sc-quiz-panel" data-quiz="classical-descent">
    <p>Which sequence matches <strong>{display(option.tonic)} melodic minor descending under the classical scale-exercise convention</strong>?</p>
    {([['correct', correct], ['reverse', reverse]] as const).map(([value, sequence], index) => <label className="sc-choice" key={value}><input type="radio" name="classical-descent" value={value} checked={choice === value} disabled={!ready} onChange={() => { setChoice(value); setFeedback(''); }}/><span>Choice {index ? 'B' : 'A'}: {sequence.map((pitch) => display(pitch.note)).join(' - ')}</span></label>)}
    <div className="sc-quiz-actions"><button type="button" className="am-button am-primary" disabled={!ready} onClick={() => setFeedback(!choice ? 'Choose one sequence, then check your answer.' : choice === 'correct' ? 'Correct for the classical exercise convention. The descending line uses the natural sixth and seventh.' : 'This choice keeps the raised sixth and seventh from the ascent. For this classical descending exercise, use the natural sixth and seventh. Jazz melodic minor is a different task.')}>Check answer</button><button type="button" className="am-button am-tertiary" disabled={!ready} onClick={() => { setChoice('correct'); setFeedback('Choice A is the reference answer. Showing it does not count as a correct attempt.'); }}>Show answer</button></div>
    <p className="sc-feedback" role="status">{feedback}</p>
  </div>;
}

export function ScaleQuiz({ option, hand, direction, keyboardKeys, ready }: { option: ScaleOption; hand: ScaleHand; direction: ScaleDirection; keyboardKeys: PianoKey[]; ready: boolean }) {
  const [quiz, setQuiz] = useState<QuizType>('note_set');
  const quizDirection = direction === 'up_down' ? 'ascending' : direction;
  const expected = option.sequences[hand][quizDirection];
  const classical = option.form === 'melodic_minor_classical';
  return <section className="sc-learning-card" id="check-notes" aria-labelledby="check-notes-heading">
    <div className="sc-learning-head"><div><span className="sc-field-name">Practice task</span><h2 id="check-notes-heading">Check the notes</h2></div><label className="kn-field">Question type<select aria-label="Question type" value={quiz} disabled={!ready} onChange={(event) => setQuiz(event.target.value as QuizType)}><option value="note_set">Select the notes</option><option value="order">Put the notes in order</option>{classical && <option value="classical_descent">Classical descending pattern</option>}</select></label></div>
    {direction === 'up_down' && <p className="sc-boundary">Quiz direction: Ascending. The main up-and-down reference is unchanged.</p>}
    <div key={`${quiz}:${option.id}:${hand}:${quizDirection}`}>{quiz === 'note_set' ? <NoteSetQuiz expected={expected} ready={ready}/> : quiz === 'order' ? <OrderQuiz expected={expected} keyboardKeys={keyboardKeys} ready={ready}/> : <ClassicalQuiz option={option} hand={hand} ready={ready}/>}</div>
    <StaticAnswers option={option} hand={hand}/>
  </section>;
}

export function ScalePractice({ option, hand, direction, audio, ready }: { option: ScaleOption; hand: ScaleHand; direction: ScaleDirection; audio: Audio; ready: boolean }) {
  const sequence = scaleSequence(option, hand, direction);
  const [tempo, setTempo] = useState(60);
  const [notesPerBeat, setNotesPerBeat] = useState<1 | 2>(1);
  const [passes, setPasses] = useState<1 | 2 | 4>(1);
  const [sound, setSound] = useState(true);
  const [metronome, setMetronome] = useState(true);
  const [state, setState] = useState<PracticeState>('idle');
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(-1);
  const [nextIndex, setNextIndex] = useState(0);
  const [message, setMessage] = useState('This guide does not listen to your piano. Completion is self-reported.');
  const [selfReport, setSelfReport] = useState('');
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const activeRef = useRef(-1);
  const timeline = useMemo(() => buildPracticeEvents(sequence, tempo, notesPerBeat, passes), [sequence, tempo, notesPerBeat, passes]);
  const beatMs = 60_000 / tempo;
  const noteMs = beatMs / notesPerBeat;
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const stop = (copy = 'Practice stopped. Start again when ready.') => { clearTimers(); audio.cancel(); setState('idle'); setCount(0); setActive(-1); activeRef.current = -1; setNextIndex(0); setMessage(copy); setSelfReport(''); };
  const runFrom = (startIndex: number) => {
    clearTimers(); audio.cancel(); setState('counting'); setCount(1); setMessage('Count in: 1');
    for (let beat = 2; beat <= 4; beat += 1) timers.current.push(setTimeout(() => { setCount(beat); setMessage(`Count in: ${beat}`); }, (beat - 1) * beatMs));
    timers.current.push(setTimeout(() => {
      const remaining = timeline.slice(startIndex);
      if (!remaining.length) { setState('completed'); setMessage('The reference is complete. You can replay it or mark your own practice complete.'); return; }
      const origin = remaining[0].onsetMs;
      const raw = sound ? remaining.map((event) => ({ midi: event.pitch.midi, frequency_hz: 440 * 2 ** ((event.pitch.midi - 69) / 12), onset_ms: event.onsetMs - origin, duration_ms: Math.max(70, noteMs * .8) })) : [];
      const duration = remaining.at(-1)!.onsetMs - origin + noteMs;
      if (metronome) for (let onset = 0; onset < duration; onset += beatMs) raw.push({ midi: -1, frequency_hz: 1760, onset_ms: onset, duration_ms: 45 });
      if (raw.length) audio.playRawEvents(raw.sort((a, b) => a.onset_ms - b.onset_ms));
      setState('playing'); setCount(0); setMessage(`Pass ${remaining[0].pass} of ${passes} · ${direction === 'up_down' ? 'Up and down' : direction === 'ascending' ? 'Ascending' : 'Descending'}`);
      remaining.forEach((event, offset) => timers.current.push(setTimeout(() => { const index = startIndex + offset; activeRef.current = index; setActive(index); setMessage(`Pass ${event.pass} of ${passes} · ${direction === 'up_down' ? 'Up and down' : direction === 'ascending' ? 'Ascending' : 'Descending'} · ${display(event.pitch.note)}`); }, event.onsetMs - origin)));
      timers.current.push(setTimeout(() => { audio.cancel(); setState('completed'); setActive(-1); setNextIndex(timeline.length); setMessage('The reference is complete. You can replay it or mark your own practice complete.'); }, duration));
    }, 4 * beatMs));
  };
  const start = () => { setSelfReport(''); setNextIndex(0); activeRef.current = -1; runFrom(0); };
  const pause = () => { clearTimers(); audio.cancel(); const next = Math.min(Math.max(activeRef.current + 1, nextIndex), timeline.length); setNextIndex(next); setState('paused'); setActive(-1); setMessage('Paused. Resume starts with a new count-in before the next unplayed note.'); };
  const setting = (callback: () => void) => { const wasActive = state !== 'idle' && state !== 'completed'; clearTimers(); audio.cancel(); callback(); setState('idle'); setActive(-1); setNextIndex(0); setSelfReport(''); if (wasActive) setMessage('Settings changed. Start again when ready.'); };
  useEffect(() => { const hidden = () => document.hidden && stop('Practice stopped because the page was hidden. Start again when ready.'); document.addEventListener('visibilitychange', hidden); return () => { document.removeEventListener('visibilitychange', hidden); clearTimers(); audio.cancel(); }; }, []); // the parent remounts this component when the scale reference changes
  const activeEvent = active >= 0 ? timeline[active] : null;
  return <section className="sc-learning-card" id="follow-along" aria-labelledby="follow-along-heading" data-practice-state={state}>
    <div className="sc-learning-head"><div><span className="sc-field-name">Single-hand guide</span><h2 id="follow-along-heading">Practice with a pulse</h2></div><strong>{state === 'counting' ? `Count in ${count}` : activeEvent ? display(activeEvent.pitch.note) : `${tempo} BPM`}</strong></div>
    <p>This guide does not listen to your piano. Completion is self-reported. The staff is a pitch reference; the pulse controls timing.</p>
    <div className="sc-practice-controls">
      <label className="kn-field">Tempo (BPM)<input aria-label="Tempo BPM" type="number" min="40" max="120" step="5" value={tempo} disabled={!ready} onChange={(event) => setting(() => setTempo(Math.max(40, Math.min(120, Number(event.target.value) || 60))))}/></label>
      <div className="sc-tempo-shortcuts" aria-label="Tempo shortcuts">{[40,60,80].map((value) => <button type="button" key={value} disabled={!ready} aria-pressed={tempo === value} onClick={() => setting(() => setTempo(value))}>{value}</button>)}</div>
      <label className="kn-field">Notes per beat<select aria-label="Notes per beat" value={notesPerBeat} disabled={!ready} onChange={(event) => setting(() => setNotesPerBeat(Number(event.target.value) as 1 | 2))}><option value="1">1</option><option value="2">2</option></select></label>
      <label className="kn-field">Passes<select aria-label="Passes" value={passes} disabled={!ready} onChange={(event) => setting(() => setPasses(Number(event.target.value) as 1 | 2 | 4))}><option value="1">1</option><option value="2">2</option><option value="4">4</option></select></label>
      <label className="sc-check"><input type="checkbox" checked={sound} disabled={!ready} onChange={(event) => setting(() => setSound(event.target.checked))}/>Scale sound</label>
      <label className="sc-check"><input type="checkbox" checked={metronome} disabled={!ready} onChange={(event) => setting(() => setMetronome(event.target.checked))}/>Metronome</label>
    </div>
    <p className="sc-range-copy">1 octave · {hand === 'RH' ? 'Right hand' : 'Left hand'} · {display(sequence[0].note)}-{display(sequence.at(-1)!.note)} · 4-beat count-in</p>
    <div className="sc-practice-actions">{state === 'idle' || state === 'completed' ? <button type="button" className="am-button am-primary" disabled={!ready} onClick={start}>Start practice</button> : state === 'paused' ? <button type="button" className="am-button am-primary" disabled={!ready} onClick={() => runFrom(nextIndex)}>Resume</button> : <button type="button" className="am-button am-primary" disabled={!ready || state === 'counting'} onClick={pause}>Pause</button>}<button type="button" className="am-button am-secondary" disabled={!ready || state === 'idle'} onClick={() => stop()}>Stop and reset</button></div>
    <p className="sc-feedback" role="status">{message}</p>
    {state === 'completed' && <div className="sc-self-report"><button type="button" className="am-button am-secondary" onClick={() => setSelfReport('Marked complete by you for this session. No playing accuracy was measured.')}>Mark this practice complete</button><button type="button" className="am-button am-tertiary" onClick={() => setSelfReport('Comfortable - recorded only in this page session.')}>Comfortable</button><button type="button" className="am-button am-tertiary" onClick={() => setSelfReport('Needs another try - recorded only in this page session.')}>Needs another try</button></div>}
    <p className="sc-feedback" role="status">{selfReport}</p>
  </section>;
}
