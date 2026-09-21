import { classifyPracticeAnswer, type PracticeAnswerKind } from './keyboard-practice.ts';

export type ChordAttempt = {
  selected: number[];
  attemptedWrong: boolean;
  hinted: boolean;
  viewedReference: boolean;
  revealed: boolean;
  result: 'unanswered' | 'wrong' | 'correct' | 'revealed';
};
export const emptyChordAttempt = (): ChordAttempt => ({ selected: [], attemptedWrong: false, hinted: false, viewedReference: false, revealed: false, result: 'unanswered' });
export const pitchClass = (midi: number) => ((midi % 12) + 12) % 12;
export function toggleChordNote(state: ChordAttempt, midi: number): ChordAttempt {
  const pc = pitchClass(midi);
  return { ...state, selected: state.selected.includes(pc) ? state.selected.filter(n => n !== pc) : [...state.selected, pc], result: 'unanswered' };
}
export function clearChordAttempt(state: ChordAttempt): ChordAttempt {
  // Clearing/retrying the same question must never launder its help history.
  return { ...state, selected: [], result: 'unanswered' };
}
export function checkChordAttempt(state: ChordAttempt, answer: number[]): ChordAttempt {
  const expected = [...new Set(answer.map(pitchClass))];
  if (state.selected.length < expected.length) return state;
  const correct = state.selected.length === expected.length && expected.every(n => state.selected.includes(n));
  return { ...state, attemptedWrong: state.attemptedWrong || !correct, result: correct ? 'correct' : 'wrong' };
}
export function chordAttemptKind(state: ChordAttempt): PracticeAnswerKind {
  return classifyPracticeAnswer({ attemptedWrong: state.attemptedWrong, hinted: state.hinted || state.viewedReference, revealed: state.revealed });
}
export function chordAttemptMessage(state: ChordAttempt, referencePractice = false): string {
  if (referencePractice && state.result === 'revealed') return 'Answer shown. Try building the chord again when you are ready.';
  if (referencePractice && state.result === 'correct') return 'Correct. You selected C, E and G.';
  if (state.result === 'revealed') return 'Answer shown. This is not an independent correct answer.';
  if (state.result === 'wrong') return 'Not yet. Change your selection and try again, or use a hint.';
  if (state.result !== 'correct') return 'Choose three different note names, then check your answer.';
  if (state.revealed) return 'Correct after viewing the answer. Recorded as answer viewed.';
  if (state.hinted || state.viewedReference) return 'Correct with help. You used a hint or viewed the reference.';
  if (state.attemptedWrong) return 'Correct after retrying, without a hint.';
  return 'Correct on your first try, without help.';
}
