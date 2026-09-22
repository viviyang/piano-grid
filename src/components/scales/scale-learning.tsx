'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { KeyboardDiagram } from '@/components/keyboard-notes/keyboard-diagram';
import type { PianoKey } from '@/lib/keyboard-types';
import { buildPracticeEvents, evaluateOrderedPitches, evaluatePitchClasses, uniquePitchClasses } from '@/lib/scale-practice';
import { scaleSequence } from '@/lib/scale-resolver';
import type { ScaleDirection, ScaleHand, ScaleOption, ScalePitch } from '@/lib/scale-types';
import type { useScaleAudio } from './use-scale-audio';
import { emitScaleEvent } from '@/lib/scale-events';

type Audio = ReturnType<typeof useScaleAudio>;
type QuizType = 'note_set' | 'order' | 'classical_descent';
type PracticeState = 'idle' | 'preparing' | 'counting' | 'playing' | 'paused' | 'completed' | 'error' | 'unavailable';

const display = (value: string) => value.replaceAll('##', '𝄪').replaceAll('bb', '𝄫').replaceAll('#', '♯').replaceAll('b', '♭');
const pcLabels = ['C', 'C♯ / D♭', 'D', 'D♯ / E♭', 'E', 'F', 'F♯ / G♭', 'G', 'G♯ / A♭', 'A', 'A♯ / B♭', 'B'];

function useQuizAttempt(option: ScaleOption, type: QuizType, context: Record<string, string>) {
  const [attempt, setAttempt] = useState(1);
  const [assisted, setAssisted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const reveal = () => {
    if (!assisted) emitScaleEvent('scale_question_revealed', { object_id: option.id, type, attempt, ...context });
    setAssisted(true);
  };
  const submit = (status: 'correct' | 'incorrect') => {
    if (!submitted) emitScaleEvent('scale_question_submitted', { object_id: option.id, type, status, assisted, attempt, first_submit: true, ...context });
    setSubmitted(true);
  };
  const reset = () => {
    emitScaleEvent('scale_question_reset', { object_id: option.id, type, attempt, ...context });
    setAttempt((value) => value + 1);
    setAssisted(false);
    setSubmitted(false);
  };
  return { assisted, submitted, reveal, submit, reset };
}

function StaticAnswers({ option, hand, direction }: { option: ScaleOption; hand: ScaleHand; direction: 'ascending' | 'descending' }) {
  const expected = option.sequences[hand][direction];
  const descending = option.sequences[hand].descending;
  const fullName = `${display(option.tonic)} ${option.formLabel}`;
  const handName = hand === 'RH' ? 'right hand' : 'left hand';
  return <div className="sc-static-answers">
    <details><summary>Answer reference: {fullName}, {direction} - note set</summary><p>{uniquePitchClasses(expected).map((pitch) => display(pitch.spelling)).join(' - ')}. Octave and order are not scored in this question.</p></details>
    <details><summary>Answer reference: {fullName}, {direction} - {handName}</summary><p>{expected.map((pitch) => display(pitch.note)).join(' - ')}</p></details>
    {option.form === 'melodic_minor_classical' && <details><summary>Static answer: classical melodic-minor descent</summary><p>{descending.map((pitch) => display(pitch.note)).join(' - ')}. The sixth and seventh return to their natural-minor values in this exercise.</p></details>}
  </div>;
}

function NoteSetQuiz({ option, direction, expected, ready }: { option: ScaleOption; direction: 'ascending' | 'descending'; expected: ScalePitch[]; ready: boolean }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const expectedUnique = uniquePitchClasses(expected);
  const attempt = useQuizAttempt(option, 'note_set', { direction });
  const toggle = (pc: number) => {
    setSelected((current) => current.includes(pc) ? current.filter((value) => value !== pc) : [...current, pc]);
    if (feedback) setFeedback('Answer changed. Check it again when you are ready.');
  };
  return <div className="sc-quiz-panel" data-quiz="note-set">
    <p>Select every note used in <strong>{display(option.tonic)} {option.formLabel}, {direction}</strong>. This question checks the note set; octave and order do not matter.</p>
    <div className="sc-pitch-buttons" aria-label="Pitch classes">{pcLabels.map((label, pc) => <button key={label} type="button" disabled={!ready} aria-pressed={selected.includes(pc)} onClick={() => toggle(pc)}>{label}</button>)}</div>
    <p className="sc-chosen">Chosen: {selected.length ? selected.sort((a, b) => a - b).map((pc) => pcLabels[pc]).join(', ') : 'None'}</p>
    <div className="sc-quiz-actions"><button type="button" className="am-button am-primary" disabled={!ready} onClick={() => { const result=evaluatePitchClasses(expected, selected); setFeedback(result); attempt.submit(result.startsWith('Correct') ? 'correct' : 'incorrect'); }}>Check answer</button><button type="button" className="am-button am-secondary" disabled={!ready} onClick={() => { setSelected([]); setFeedback(''); attempt.reset(); }}>Reset attempt</button><button type="button" className="am-button am-tertiary" disabled={!ready} onClick={() => { attempt.reveal(); setSelected(expectedUnique.map((pitch) => pitch.midi % 12)); setFeedback(`Answer shown - this attempt is assisted. ${expectedUnique.map((pitch) => display(pitch.spelling)).join('-')}.`); }}>Show answer</button></div>
    <p className="sc-attempt-note">Attempt {attempt.submitted ? 'submitted' : 'open'} · {attempt.assisted ? 'assisted' : 'unassisted'}</p>
    <p className="sc-feedback" role="status">{feedback}</p>
  </div>;
}

function OrderQuiz({ option, hand, direction, expected, keyboardKeys, ready }: { option: ScaleOption; hand: ScaleHand; direction: 'ascending' | 'descending'; expected: ScalePitch[]; keyboardKeys: PianoKey[]; ready: boolean }) {
  const [selected, setSelected] = useState<number[]>([]);
  const [feedback, setFeedback] = useState('');
  const min = Math.min(...expected.map((pitch) => pitch.midi)) - 2;
  const max = Math.max(...expected.map((pitch) => pitch.midi)) + 2;
  const keys = keyboardKeys.filter((key) => key.midi >= min && key.midi <= max);
  const labels = Object.fromEntries(expected.map((pitch) => [pitch.midi, display(pitch.note)]));
  const attempt = useQuizAttempt(option, 'order', { hand, direction });
  const append = (key: PianoKey) => { setSelected((current) => [...current, key.midi]); if (feedback) setFeedback('Answer changed. Check it again when you are ready.'); };
  const show = (midi: number) => labels[midi] ?? `${pcLabels[((midi % 12) + 12) % 12].split(' / ')[0]}${Math.floor(midi / 12) - 1}`;
  return <div className="sc-quiz-panel" data-quiz="order">
    <p>Enter <strong>{display(option.tonic)} {option.formLabel}, {direction}</strong>, for the <strong>{hand === 'RH' ? 'right hand' : 'left hand'}</strong>, from <strong>{display(expected[0].note)} to {display(expected.at(-1)!.note)}</strong>. Add one note at a time and include the final tonic that completes the octave.</p>
    <KeyboardDiagram keys={keys} selected={selected.at(-1) ?? null} marked={selected} onSelect={append} keyLabels={labels} ready={ready} label="Add notes to the ordered scale answer"/>
    <p className="sc-order-answer">Your order: {selected.length ? selected.map(show).join(' - ') : 'No notes yet'}</p>
    <div className="sc-quiz-actions"><button type="button" className="am-button am-secondary" disabled={!ready || !selected.length} onClick={() => { setSelected((current) => current.slice(0, -1)); setFeedback(''); }}>Undo last note</button><button type="button" className="am-button am-secondary" disabled={!ready} onClick={() => { setSelected([]); setFeedback(''); attempt.reset(); }}>Reset attempt</button><button type="button" className="am-button am-primary" disabled={!ready} onClick={() => { const result=evaluateOrderedPitches(expected, selected); setFeedback(result); attempt.submit(result.startsWith('Correct') ? 'correct' : 'incorrect'); }}>Check order</button><button type="button" className="am-button am-tertiary" disabled={!ready} onClick={() => { attempt.reveal(); setSelected(expected.map((pitch) => pitch.midi)); setFeedback('Reference sequence shown - this attempt is assisted.'); }}>Show answer</button></div>
    <p className="sc-attempt-note">Attempt {attempt.submitted ? 'submitted' : 'open'} · {attempt.assisted ? 'assisted' : 'unassisted'}</p>
    <p className="sc-feedback" role="status">{feedback}</p>
  </div>;
}

function ClassicalQuiz({ option, hand, ready }: { option: ScaleOption; hand: ScaleHand; ready: boolean }) {
  const correct = option.sequences[hand].descending;
  const reverse = [...option.sequences[hand].ascending].reverse();
  const [choice, setChoice] = useState('');
  const [feedback, setFeedback] = useState('');
  const attempt = useQuizAttempt(option, 'classical_descent', { hand, direction: 'descending' });
  const naturalSeventh = display(correct[1].spelling);
  const naturalSixth = display(correct[2].spelling);
  return <div className="sc-quiz-panel" data-quiz="classical-descent">
    <p>Which sequence matches <strong>{display(option.tonic)} melodic minor descending under the classical scale-exercise convention</strong>?</p>
    {([['correct', correct], ['reverse', reverse]] as const).map(([value, sequence], index) => <label className="sc-choice" key={value}><input type="radio" name="classical-descent" value={value} checked={choice === value} disabled={!ready} onChange={() => { setChoice(value); setFeedback(''); }}/><span>Choice {index ? 'B' : 'A'}: {sequence.map((pitch) => display(pitch.note)).join(' - ')}</span></label>)}
    <div className="sc-quiz-actions"><button type="button" className="am-button am-primary" disabled={!ready} onClick={() => { const result=!choice ? 'Choose one sequence, then check your answer.' : choice === 'correct' ? `Correct for the classical scale-exercise convention. Descending uses this key's natural-minor sixth and seventh degrees: ${naturalSixth} and ${naturalSeventh}. Jazz melodic minor commonly keeps the raised form in both directions.` : `This choice keeps the raised sixth and seventh from the ascent. For this classical descending exercise, use this key's natural-minor sixth and seventh degrees: ${naturalSixth} and ${naturalSeventh}. Jazz melodic minor is a different task.`; setFeedback(result); if (choice) attempt.submit(choice === 'correct' ? 'correct' : 'incorrect'); }}>Check answer</button><button type="button" className="am-button am-secondary" disabled={!ready} onClick={() => { setChoice(''); setFeedback(''); attempt.reset(); }}>Reset attempt</button><button type="button" className="am-button am-tertiary" disabled={!ready} onClick={() => { attempt.reveal(); setChoice('correct'); setFeedback('Choice A is the reference answer. This attempt is assisted.'); }}>Show answer</button></div>
    <p className="sc-attempt-note">Attempt {attempt.submitted ? 'submitted' : 'open'} · {attempt.assisted ? 'assisted' : 'unassisted'}</p>
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
    <div key={`${quiz}:${option.id}:${hand}:${quizDirection}`}>{quiz === 'note_set' ? <NoteSetQuiz option={option} direction={quizDirection} expected={expected} ready={ready}/> : quiz === 'order' ? <OrderQuiz option={option} hand={hand} direction={quizDirection} expected={expected} keyboardKeys={keyboardKeys} ready={ready}/> : <ClassicalQuiz option={option} hand={hand} ready={ready}/>}</div>
    <StaticAnswers option={option} hand={hand} direction={quizDirection}/>
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
  const runGeneration = useRef(0);
  const practiceStartedRef = useRef(false);
  const timeline = useMemo(() => buildPracticeEvents(sequence, tempo, notesPerBeat, passes), [sequence, tempo, notesPerBeat, passes]);
  const beatMs = 60_000 / tempo;
  const noteMs = beatMs / notesPerBeat;
  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  const resetLocal = (copy: string) => {
    runGeneration.current += 1;
    clearTimers();
    setState('idle');
    setCount(0);
    setActive(-1);
    activeRef.current = -1;
    setNextIndex(0);
    setMessage(copy);
    setSelfReport('');
  };
  useEffect(() => audio.registerCancellation((reason) => {
    if (practiceStartedRef.current) {
      emitScaleEvent('scale_practice_stopped', { object_id: option.id, hand, direction, stop_reason: reason });
      practiceStartedRef.current = false;
    }
    const copy = reason === 'printing'
      ? 'Practice stopped for printing. Start again when you are ready.'
      : reason === 'settings'
        ? 'Settings changed. The previous practice has stopped. Start again with the new settings.'
        : reason === 'hidden'
          ? 'Practice stopped because the page was hidden. Start again when ready.'
          : reason === 'stopped'
            ? 'Practice stopped. Start again when ready.'
            : 'The previous audio or practice session stopped.';
    resetLocal(copy);
    if (reason === 'audio_error') {
      setState('error');
      setMessage('Sound stopped unexpectedly. Try again, or continue with a silent visual guide.');
    }
  }), [audio.registerCancellation, option.id, hand, direction]);
  useEffect(() => () => { runGeneration.current += 1; clearTimers(); }, []);
  const schedule = (run: number, at: number, callback: () => void) => {
    timers.current.push(setTimeout(() => { if (run === runGeneration.current) callback(); }, Math.max(0, at - performance.now())));
  };
  const runFrom = async (startIndex: number, silentOverride = false) => {
    const remaining = timeline.slice(startIndex);
    if (!remaining.length) { setState('completed'); setMessage('The reference is complete. You can replay it or mark your own practice complete.'); return; }
    if (!practiceStartedRef.current) {
      emitScaleEvent('scale_practice_started', { object_id: option.id, hand, direction, tempo, notes_per_beat: notesPerBeat });
      practiceStartedRef.current = true;
    }
    const token = audio.beginSession('practice');
    const run = ++runGeneration.current;
    clearTimers();
    activeRef.current = startIndex - 1;
    setNextIndex(startIndex);
    setActive(-1);
    setCount(0);
    setSelfReport('');
    const relativeOrigin = remaining[0].onsetMs;
    const countInMs = beatMs * 4;
    const musicDuration = remaining.at(-1)!.onsetMs - relativeOrigin + noteMs;
    const totalDuration = countInMs + musicDuration;
    const raw: Array<{ midi: number; frequency_hz: number; onset_ms: number; duration_ms: number }> = [];
    if (!silentOverride && sound) for (const event of remaining) raw.push({ midi: event.pitch.midi, frequency_hz: 440 * 2 ** ((event.pitch.midi - 69) / 12), onset_ms: countInMs + event.onsetMs - relativeOrigin, duration_ms: Math.max(70, noteMs * .8) });
    if (!silentOverride && metronome) for (let onset = 0; onset < totalDuration; onset += beatMs) raw.push({ midi: -1, frequency_hz: 1760, onset_ms: onset, duration_ms: 45 });
    setState(raw.length ? 'preparing' : 'counting');
    setMessage(raw.length ? 'Preparing the reference sound…' : 'Silent visual guide selected. Four-beat count-in.');
    const started = raw.length ? await audio.playRawEvents(raw.sort((a, b) => a.onset_ms - b.onset_ms), token) : { ok: true, startedAtMs: performance.now() };
    if (run !== runGeneration.current || !audio.isCurrent(token)) return;
    if (!started.ok) {
      setState(started.reason === 'unavailable' ? 'unavailable' : 'error');
      setMessage(started.reason === 'unavailable' ? 'Audio practice is unavailable in this browser. The note reference remains available.' : 'Sound could not start. Try again, or continue with a silent visual guide.');
      return;
    }
    const origin = started.startedAtMs;
    setState('counting');
    setCount(1);
    setMessage(silentOverride ? 'Silent visual guide selected. Four-beat count-in.' : 'Four-beat count-in.');
    for (let beat = 2; beat <= 4; beat += 1) schedule(run, origin + (beat - 1) * beatMs, () => setCount(beat));
    schedule(run, origin + countInMs, () => {
      setState('playing');
      setCount(0);
      setMessage(`Pass ${remaining[0].pass} of ${passes} · ${direction === 'up_down' ? 'Up and down' : direction === 'ascending' ? 'Ascending' : 'Descending'}`);
    });
    remaining.forEach((event, offset) => schedule(run, origin + countInMs + event.onsetMs - relativeOrigin, () => {
      const index = startIndex + offset;
      activeRef.current = index;
      setActive(index);
      if (event.indexInPass === 0) setMessage(`Pass ${event.pass} of ${passes} · ${direction === 'up_down' ? 'Up and down' : direction === 'ascending' ? 'Ascending' : 'Descending'}`);
    }));
    schedule(run, origin + totalDuration, () => {
      if (practiceStartedRef.current) {
        emitScaleEvent('scale_practice_stopped', { object_id: option.id, hand, direction, stop_reason: 'completed' });
        practiceStartedRef.current = false;
      }
      setState('completed');
      setActive(-1);
      setNextIndex(timeline.length);
      setMessage('The reference is complete. You can replay it or mark your own practice complete.');
    });
  };
  const start = () => { setNextIndex(0); activeRef.current = -1; void runFrom(0); };
  const pause = () => {
    const next = Math.min(Math.max(activeRef.current + 1, nextIndex), timeline.length);
    audio.cancel('superseded');
    runGeneration.current += 1;
    clearTimers();
    setNextIndex(next);
    setState(next >= timeline.length ? 'completed' : 'paused');
    setActive(-1);
    setMessage(next >= timeline.length ? 'The reference is complete. You can replay it or mark your own practice complete.' : 'Paused. Resume starts with a new count-in before the next unplayed note.');
  };
  const stop = () => { audio.cancel('stopped'); resetLocal('Practice stopped. Start again when ready.'); };
  const setting = (callback: () => void) => { audio.cancel('settings'); callback(); resetLocal('Settings changed. Start again with the new settings.'); };
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
    <p className="sc-range-copy">Practice tempo: {tempo} BPM · 1 octave · {hand === 'RH' ? 'Right hand' : 'Left hand'} · {display(sequence.reduce((a, b) => a.midi < b.midi ? a : b).note)}-{display(sequence.reduce((a, b) => a.midi > b.midi ? a : b).note)} · 4-beat count-in</p>
    <div className="sc-practice-actions">{state === 'idle' || state === 'completed' ? <button type="button" className="am-button am-primary" disabled={!ready} onClick={start}>Start practice</button> : state === 'paused' ? <button type="button" className="am-button am-primary" disabled={!ready} onClick={() => void runFrom(nextIndex)}>Resume</button> : state === 'error' || state === 'unavailable' ? <><button type="button" className="am-button am-primary" disabled={!ready} onClick={() => void runFrom(nextIndex)}>Try sound again</button><button type="button" className="am-button am-tertiary" disabled={!ready} onClick={() => void runFrom(nextIndex, true)}>Use silent guide</button></> : <button type="button" className="am-button am-primary" disabled={!ready || state === 'preparing'} onClick={pause}>Pause</button>}<button type="button" className="am-button am-secondary" disabled={!ready || state === 'idle'} onClick={stop}>Stop and reset</button></div>
    <p className="sc-feedback" role="status">{message}</p>
    {state === 'completed' && <div className="sc-self-report"><button type="button" className="am-button am-secondary" onClick={() => { setSelfReport('Marked complete by you for this session. No playing accuracy was measured.'); emitScaleEvent('scale_practice_self_reported', { object_id: option.id, hand, direction, report: 'complete' }); }}>Mark this practice complete</button><button type="button" className="am-button am-tertiary" onClick={() => { setSelfReport('Comfortable - recorded only in this page session.'); emitScaleEvent('scale_practice_self_reported', { object_id: option.id, hand, direction, report: 'comfortable' }); }}>Comfortable</button><button type="button" className="am-button am-tertiary" onClick={() => { setSelfReport('Needs another try - recorded only in this page session.'); emitScaleEvent('scale_practice_self_reported', { object_id: option.id, hand, direction, report: 'needs_another_try' }); }}>Needs another try</button><button type="button" className="am-button am-tertiary" disabled={tempo >= 120} onClick={() => { const next = Math.min(120, tempo + 5); setTempo(next); resetLocal(`Practice tempo set to ${next} BPM. Start again when ready.`); }}>Try 5 BPM faster</button></div>}
    <p className="sc-feedback" role="status">{selfReport}</p>
  </section>;
}
