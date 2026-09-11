import type { ScalePitch } from './scale-types';

export type PracticeEvent = {
  pitch: ScalePitch;
  onsetMs: number;
  pass: number;
  indexInPass: number;
};

export function uniquePitchClasses(pitches: ScalePitch[]) {
  return [...new Map(pitches.map((pitch) => [((pitch.midi % 12) + 12) % 12, pitch])).values()];
}

export function evaluatePitchClasses(expected: ScalePitch[], selected: number[]) {
  if (!selected.length) return 'Choose at least one note, then check your answer.';
  const wanted = uniquePitchClasses(expected);
  const wantedPC = new Set(wanted.map((pitch) => pitch.midi % 12));
  const actual = new Set(selected);
  const display = (value: string) => value.replaceAll('##', '𝄪').replaceAll('bb', '𝄫').replaceAll('#', '♯').replaceAll('b', '♭');
  const missing = wanted.filter((pitch) => !actual.has(pitch.midi % 12)).map((pitch) => display(pitch.spelling));
  const extra = [...actual].filter((pc) => !wantedPC.has(pc)).map((pc) => ['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'][pc]);
  if (!missing.length && !extra.length) return `Correct. These are the ${wanted.length} pitch classes of this scale.`;
  return [missing.length ? `Missing: ${missing.join(', ')}.` : '', extra.length ? `Extra: ${extra.join(', ')}.` : ''].filter(Boolean).join(' ');
}

export function evaluateOrderedPitches(expected: ScalePitch[], actualMidi: number[]) {
  const display = (pitch: ScalePitch) => pitch.note.replaceAll('##', '𝄪').replaceAll('bb', '𝄫').replaceAll('#', '♯').replaceAll('b', '♭');
  if (!actualMidi.length) return 'Add the first note to begin.';
  if (actualMidi.length < expected.length) {
    const prefix = actualMidi.every((midi, index) => midi === expected[index].midi);
    if (prefix && actualMidi.length === expected.length - 1) return `One note is missing. The octave needs its final ${display(expected.at(-1)!)}.`;
    return `You entered ${actualMidi.length} notes; this reference has ${expected.length}. Add the missing note or notes, then check again.`;
  }
  if (actualMidi.length > expected.length) return `You entered ${actualMidi.length} notes; this reference has ${expected.length}. Remove the extra note, then check again.`;
  const mismatch = expected.findIndex((pitch, index) => pitch.midi !== actualMidi[index]);
  if (mismatch < 0) return `Correct. The notes match this ${expected[0].midi < expected.at(-1)!.midi ? 'ascending' : 'descending'} one-octave reference, including the final tonic.`;
  const actual = actualMidi[mismatch];
  const expectedPitch = expected[mismatch];
  const samePhysicalClass = ((actual % 12) + 12) % 12 === expectedPitch.midi % 12;
  const actualName = ['C','C♯','D','E♭','E','F','F♯','G','A♭','A','B♭','B'][((actual % 12) + 12) % 12] + (Math.floor(actual / 12) - 1);
  if (samePhysicalClass) return `The note at position ${mismatch + 1} is in the wrong octave: use ${display(expectedPitch)}, not ${actualName}.`;
  return `The first mismatch is at position ${mismatch + 1}: you entered ${actualName}; this reference expects ${display(expectedPitch)}.`;
}

export function buildPracticeEvents(sequence: ScalePitch[], bpm: number, notesPerBeat: 1 | 2, passes: 1 | 2 | 4): PracticeEvent[] {
  const beatMs = 60_000 / bpm;
  const noteMs = beatMs / notesPerBeat;
  const passSpan = sequence.length * noteMs + beatMs;
  return Array.from({ length: passes }, (_, pass) => sequence.map((pitch, indexInPass) => ({ pitch, pass: pass + 1, indexInPass, onsetMs: pass * passSpan + indexInPass * noteMs }))).flat();
}
