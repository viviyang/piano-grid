import type { ChartKey, Layout, StaffNote } from './keyboard-types';
import { displayNote } from './keyboard-resolution.ts';

export type PracticeLevel = '1' | '2' | '3';
export type PracticeTarget = { midi: number; label: string; clef?: 'treble' | 'bass'; staff?: StaffNote };

function random(seed: number) {
  let state = seed >>> 0;
  return () => ((state = (state * 1664525 + 1013904223) >>> 0) / 4294967296);
}

function sample<T>(items: T[], seed: number, count = 10) {
  if (!items.length) throw new Error('Practice pool is empty');
  const next = random(seed);
  return Array.from({ length: count }, () => items[Math.floor(next() * items.length)]);
}

export function generateFindPractice(layout: Layout, level: PracticeLevel, seed: number, count = 10): PracticeTarget[] {
  const keys = layout.keys.filter(key => {
    if (level === '1') return key.color === 'white' && key.midi >= 48 && key.midi <= 72;
    if (level === '2') return key.color === 'white' && key.midi >= 36 && key.midi <= 84;
    return key.color === 'black' && key.midi >= 48 && key.midi <= 84;
  });
  const pool = keys.map((key, index) => {
    const spellings = key.label_with_octave.split(' / ');
    const name = level === '3' ? spellings[index % spellings.length] : spellings[0];
    return { midi: key.midi, label: displayNote(name) };
  });
  return sample(pool, seed, count);
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
