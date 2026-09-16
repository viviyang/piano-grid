import type { ChartKey, Layout, StaffNote } from './keyboard-types';
import { displayNote, parseNoteInput } from './keyboard-resolution.ts';

export type PracticeLevel = '1' | '2' | '3';
export type PracticeTarget = { midi: number; label: string; clef?: 'treble' | 'bass'; staff?: StaffNote };
export type PracticeAnswerKind = 'independent' | 'assisted' | 'revealed';
export type PracticeAnswerRecord = { target: PracticeTarget; kind: PracticeAnswerKind };
export type PracticeOption = 'natural-c4-c5' | 'natural-c3-c5' | 'natural-c2-c6' | 'black-c4-c5';
export type PracticePreset = { version: 1; option: PracticeOption; seed: number; count: 10 };
export type PracticePresetRestore =
  | { status: 'none'; preset: null }
  | { status: 'valid'; preset: PracticePreset }
  | { status: 'invalid'; preset: null };

export const PRACTICE_LENGTH = 10;
export const PRACTICE_OPTIONS: Record<PracticeOption, { label: string; detail: string; level: PracticeLevel; min: number; max: number }> = {
  'natural-c4-c5': { label: 'Natural notes · C4–C5', detail: 'White keys around middle C', level: '1', min: 60, max: 72 },
  'natural-c3-c5': { label: 'Natural notes · C3–C5', detail: 'Two octaves of white keys', level: '1', min: 48, max: 72 },
  'natural-c2-c6': { label: 'Natural notes · C2–C6', detail: 'A wider white-key range', level: '2', min: 36, max: 84 },
  'black-c4-c5': { label: 'Black keys · C4–C5', detail: 'Sharps and flats near middle C', level: '3', min: 60, max: 72 },
};

function random(seed: number) {
  let state = seed >>> 0;
  return () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function sample<T>(items: T[], seed: number, count = 10) {
  if (!items.length) throw new Error('Practice pool is empty');
  const next = random(seed);
  return Array.from({ length: count }, () => items[Math.floor(next() * items.length)]);
}

function findPracticePool(layout: Layout, level: PracticeLevel) {
  const keys = layout.keys.filter(key => {
    if (level === '1') return key.color === 'white' && key.midi >= 48 && key.midi <= 72;
    if (level === '2') return key.color === 'white' && key.midi >= 36 && key.midi <= 84;
    return key.color === 'black' && key.midi >= 48 && key.midi <= 84;
  });
  return keys.map((key, index) => {
    const spellings = key.label_with_octave.split(' / ');
    const name = level === '3' ? spellings[index % spellings.length] : spellings[0];
    return { midi: key.midi, label: displayNote(name) };
  });
}

export function generateFindPractice(layout: Layout, level: PracticeLevel, seed: number, count = 10): PracticeTarget[] {
  return sample(findPracticePool(layout, level), seed, count);
}

export function createPracticeSeed() {
  if (typeof crypto !== 'undefined' && 'getRandomValues' in crypto) return crypto.getRandomValues(new Uint32Array(1))[0];
  return (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0;
}

export function createPracticePreset(option: PracticeOption = 'natural-c4-c5', seed = createPracticeSeed()): PracticePreset {
  return { version: 1, option, seed: seed >>> 0, count: PRACTICE_LENGTH };
}

export function generatePresetPractice(layout: Layout, preset: PracticePreset): PracticeTarget[] {
  const config = PRACTICE_OPTIONS[preset.option];
  const pool = findPracticePool(layout, config.level).filter(target => target.midi >= config.min && target.midi <= config.max);
  return sample(pool, preset.seed, preset.count);
}

export function practicePresetParams(preset: PracticePreset) {
  return new URLSearchParams({
    practice: `v${preset.version}`,
    'practice-option': preset.option,
    'practice-seed': String(preset.seed),
    'practice-count': String(preset.count),
  });
}

export function restorePracticePreset(params: URLSearchParams): PracticePresetRestore {
  if (!params.has('practice')) return { status: 'none', preset: null };
  const version = params.get('practice');
  const option = params.get('practice-option');
  const seedRaw = params.get('practice-seed');
  const countRaw = params.get('practice-count');
  const seed = seedRaw !== null && /^\d{1,10}$/.test(seedRaw) ? Number(seedRaw) : Number.NaN;
  const validOption = option !== null && Object.prototype.hasOwnProperty.call(PRACTICE_OPTIONS, option);
  if (version !== 'v1' || !validOption || !Number.isSafeInteger(seed) || seed < 0 || seed > 0xffffffff || countRaw !== String(PRACTICE_LENGTH)) return { status: 'invalid', preset: null };
  return { status: 'valid', preset: { version: 1, option: option as PracticeOption, seed, count: PRACTICE_LENGTH } };
}

export function classifyPracticeAnswer({ attemptedWrong, hinted, revealed }: { attemptedWrong: boolean; hinted: boolean; revealed: boolean }): PracticeAnswerKind {
  if (revealed) return 'revealed';
  return attemptedWrong || hinted ? 'assisted' : 'independent';
}

export function summarizePractice(records: PracticeAnswerRecord[]) {
  const independent = records.filter(record => record.kind === 'independent').length;
  const assisted = records.filter(record => record.kind === 'assisted').length;
  const revealed = records.filter(record => record.kind === 'revealed').length;
  return { independent, assisted, revealed, total: records.length };
}

export function reviewPracticeTargets(records: PracticeAnswerRecord[]) {
  const unique = new Map<number, PracticeTarget>();
  records.filter(record => record.kind !== 'independent').forEach(record => unique.set(record.target.midi, record.target));
  return [...unique.values()];
}

export function generateReadPractice(notes: ChartKey[], level: PracticeLevel, seed: number, count = 10): PracticeTarget[] {
  const clefs: ('treble' | 'bass')[] = level === '1' ? ['treble'] : level === '2' ? ['bass'] : ['treble', 'bass'];
  const pool: PracticeTarget[] = [];
  for (const key of notes) for (const clef of clefs) {
    const spelling = level === '3' && key.color === 'black' ? key.staff_spellings[(key.midi + (clef === 'bass' ? 1 : 0)) % key.staff_spellings.length] : key.staff_spellings.find(item => !item[clef].accidental);
    if (!spelling) continue;
    const staff = spelling[clef];
    const inCore = level === '1' ? key.midi >= 60 && key.midi <= 84 : level === '2' ? key.midi >= 36 && key.midi <= 60 : key.midi >= 48 && key.midi <= 84;
    if (inCore && (level === '3' || key.color === 'white')) pool.push({ midi: key.midi, label: displayNote(spelling.name), clef, staff });
  }
  return sample(pool, seed, count);
}

export function scorePractice(targetMidi: number, answerMidi: number) {
  if (targetMidi === answerMidi) return 'correct' as const;
  return (targetMidi - answerMidi) % 12 === 0 ? 'wrong_octave' as const : 'wrong_note' as const;
}

const BLACK_PITCH_HINTS: Record<number, string> = {
  1: 'Find the left black key in the pair of two black keys in this octave.',
  3: 'Find the right black key in the pair of two black keys in this octave.',
  6: 'Find the left black key in the group of three black keys in this octave.',
  8: 'Find the middle black key in the group of three black keys in this octave.',
  10: 'Find the right black key in the group of three black keys in this octave.',
};

const WHITE_LETTER_HINTS: Record<string, string> = {
  C: 'Find the white key just before a pair of black keys.',
  D: 'Find the white key between the pair of black keys.',
  E: 'Find the white key just after a pair of black keys.',
  F: 'Find the white key just before a group of three black keys.',
  G: 'Find the white key between the first two keys in a group of three black keys.',
  A: 'Find the white key between the last two keys in a group of three black keys.',
  B: 'Find the white key just after a group of three black keys.',
};

export function pitchClassFromMidi(midi: number) {
  return ((midi % 12) + 12) % 12;
}

export function practiceGeometryHint(label: string, midi?: number) {
  const parsed = parseNoteInput(label);
  const pitchClass = typeof midi === 'number'
    ? pitchClassFromMidi(midi)
    : parsed && parsed.octave !== null
      ? pitchClassFromMidi(12 * (parsed.octave + 1) + ({ C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 }[parsed.letter] ?? 0) + (parsed.accidental === '#' ? 1 : parsed.accidental === 'b' ? -1 : 0))
      : null;
  if (pitchClass !== null && BLACK_PITCH_HINTS[pitchClass]) return BLACK_PITCH_HINTS[pitchClass];
  const letter = parsed?.letter ?? label.replace(/[^A-Ga-g]/g, '').charAt(0).toUpperCase();
  return WHITE_LETTER_HINTS[letter] ?? 'Use the repeating pattern of two and three black keys to find the note.';
}

export function practiceWrongFeedback(selectedLabel: string, targetMidi: number, selectedMidi: number) {
  if (scorePractice(targetMidi, selectedMidi) === 'wrong_octave') {
    return `Not quite. You chose ${selectedLabel}. That is the right note name in a different octave. Try another key, or ask for a hint.`;
  }
  return `Not quite. You chose ${selectedLabel}. Try another key, or ask for a hint.`;
}

export type ActiveRoundConfig = {
  preset: PracticePreset;
  option: PracticeOption;
  showLabels: boolean;
  isCustom: boolean;
  fromShared: boolean;
};

export function resolveStartPreset(incoming: PracticePresetRestore, draftOption: PracticeOption): { preset: PracticePreset; isCustom: boolean; fromShared: boolean } {
  if (incoming.status === 'valid' && incoming.preset.option === draftOption) {
    return { preset: incoming.preset, isCustom: false, fromShared: true };
  }
  return {
    preset: createPracticePreset(draftOption),
    isCustom: incoming.status === 'valid',
    fromShared: false,
  };
}
