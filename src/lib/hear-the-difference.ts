import { getChordCenter, getChordDetail, type CenterItem } from './chord-content';
import type { ChordDetailRoute } from './chord-detail-model';
import type { DetailVoicing } from './a-minor-types';
import { getLayouts } from './keyboard-content';
import type { PianoKey } from './keyboard-types';
import {
  HEAR_PAIR_ORDER,
  type HearPairData,
  type HearPairId,
  type HearPlayback,
} from './hear-the-difference-core';

export type { HearPairData, HearPairId, HearRevealMethod, HearVoice } from './hear-the-difference-core';
export {
  HEAR_PAIR_ORDER,
  HEAR_PATH,
  findHearPair,
  hearCompareRoles,
  hearPairCount,
  hearPairIndex,
  hearShareParams,
  isHearPairId,
  nextHearPairId,
  parseHearPairId,
  restoreHearPair,
} from './hear-the-difference-core';

const EXPECTED: Record<HearPairId, {
  root: string;
  minorId: string;
  majorId: string;
  minor: [string, string, string];
  major: [string, string, string];
  minorMidi: [number, number, number];
  majorMidi: [number, number, number];
}> = {
  a: { root: 'A', minorId: 'a-minor', majorId: 'a-major', minor: ['A3', 'C4', 'E4'], major: ['A3', 'C♯4', 'E4'], minorMidi: [57, 60, 64], majorMidi: [57, 61, 64] },
  c: { root: 'C', minorId: 'c-minor', majorId: 'c-major', minor: ['C4', 'E♭4', 'G4'], major: ['C4', 'E4', 'G4'], minorMidi: [60, 63, 67], majorMidi: [60, 64, 67] },
  d: { root: 'D', minorId: 'd-minor', majorId: 'd-major', minor: ['D4', 'F4', 'A4'], major: ['D4', 'F♯4', 'A4'], minorMidi: [62, 65, 69], majorMidi: [62, 66, 69] },
  e: { root: 'E', minorId: 'e-minor', majorId: 'e-major', minor: ['E4', 'G4', 'B4'], major: ['E4', 'G♯4', 'B4'], minorMidi: [64, 67, 71], majorMidi: [64, 68, 71] },
};

function display(value: string) {
  return value.replaceAll('#', '♯').replaceAll('b', '♭');
}

function letterOnly(pitch: string) {
  return pitch.replace(/\d+$/, '');
}

function events(midis: number[], mode: 'together' | 'ascending'): HearPlayback['together'] {
  return midis.map((midi, index) => ({
    midi,
    frequency_hz: 440 * 2 ** ((midi - 69) / 12),
    onset_ms: mode === 'together' ? 0 : index * 600,
    duration_ms: mode === 'together' ? 1200 : 500,
  }));
}

function playbackFor(notes: { display_pitch: string; midi: number }[]): HearPlayback {
  const midis = notes.map(note => note.midi);
  return { together: events(midis, 'together'), ascending: events(midis, 'ascending') };
}

function spellingsFor(item: CenterItem | null, detail: DetailVoicing | null, expected: [string, string, string]): [string, string, string] {
  const source = detail?.notes_low_to_high ?? item?.voicing.notes_low_to_high;
  if (!source || source.length !== 3) return expected.map(display) as [string, string, string];
  return expected.map((pitch, index) => {
    const letter = letterOnly(display(source[index].display_pitch));
    const octave = pitch.match(/\d+$/)?.[0] ?? '';
    return `${letter}${octave}`;
  }) as [string, string, string];
}

function resolveNotes(expectedNames: [string, string, string], expectedMidi: [number, number, number], spellings: [string, string, string]) {
  return expectedMidi.map((midi, index) => ({ display_pitch: spellings[index] || display(expectedNames[index]), midi }));
}

function assertPairMusic(pair: HearPairData) {
  const [root, third, fifth] = pair.minorNotes;
  const [rootM, thirdM, fifthM] = pair.majorNotes;
  if (root.midi !== rootM.midi) throw new Error(`B04 root drifted: ${pair.id}`);
  if (fifth.midi !== fifthM.midi) throw new Error(`B04 fifth drifted: ${pair.id}`);
  if (thirdM.midi - third.midi !== 1) throw new Error(`B04 third not +1 semitone: ${pair.id}`);
  if (!(third.midi > root.midi && third.midi < fifth.midi)) throw new Error(`B04 third is not middle voice: ${pair.id}`);
}

function buildPairs(): HearPairData[] {
  const center = getChordCenter();
  return HEAR_PAIR_ORDER.map(id => {
    const spec = EXPECTED[id];
    const minorURL = `/chords/${spec.minorId}` as ChordDetailRoute;
    const majorURL = `/chords/${spec.majorId}` as ChordDetailRoute;
    const minorItem = center.items.find(item => item.id === spec.minorId) ?? null;
    const majorItem = center.items.find(item => item.id === spec.majorId) ?? null;
    const minorDetail = getChordDetail(minorURL).data.voicings.find(voicing => /root/i.test(voicing.inversion_label)) ?? getChordDetail(minorURL).data.voicings[0];
    const majorDetail = getChordDetail(majorURL).data.voicings.find(voicing => /root/i.test(voicing.inversion_label)) ?? getChordDetail(majorURL).data.voicings[0];
    const minorSpellings = spellingsFor(minorItem, minorDetail, spec.minor);
    const majorSpellings = spellingsFor(majorItem, majorDetail, spec.major);
    const minorNotes = resolveNotes(spec.minor, spec.minorMidi, minorSpellings);
    const majorNotes = resolveNotes(spec.major, spec.majorMidi, majorSpellings);
    const minorName = minorItem?.name ?? `${spec.root} minor`;
    const majorName = majorItem?.name ?? `${spec.root} major`;
    const sourceThird = minorNotes[1];
    const targetThird = majorNotes[1];
    const midis = [...minorNotes, ...majorNotes].map(note => note.midi);
    const pair: HearPairData = {
      id,
      root: spec.root,
      minorChordId: spec.minorId,
      majorChordId: spec.majorId,
      minorName,
      majorName,
      minorURL,
      majorURL,
      voicing: 'root-position-close',
      changedDegree: 3,
      direction: 'raise-one-semitone',
      answer: 'middle',
      minorNotes,
      majorNotes,
      sourceThird,
      targetThird,
      minorPlayback: playbackFor(minorNotes),
      majorPlayback: playbackFor(majorNotes),
      revealCopy: id === 'a'
        ? 'A minor uses C natural. Raise C to C♯ and the chord becomes A major. A and E stay the same.'
        : `${minorName} uses ${letterOnly(sourceThird.display_pitch)}. Raise ${letterOnly(sourceThird.display_pitch)} to ${letterOnly(targetThird.display_pitch)} and the chord becomes ${majorName}. ${letterOnly(minorNotes[0].display_pitch)} and ${letterOnly(minorNotes[2].display_pitch)} stay the same.`,
      rootExplain: `Both chords are built on ${spec.root}.`,
      thirdExplain: `${letterOnly(sourceThird.display_pitch)} → ${letterOnly(targetThird.display_pitch)} changes the minor third to a major third.`,
      fifthExplain: `${letterOnly(minorNotes[2].display_pitch)} stays fixed.`,
      keyboardLow: Math.min(...midis) - 2,
      keyboardHigh: Math.max(...midis) + 2,
    };
    assertPairMusic(pair);
    return pair;
  });
}

let cachedPairs: HearPairData[] | null = null;

export function getHearPairs(): HearPairData[] {
  if (!cachedPairs) cachedPairs = buildPairs();
  return cachedPairs;
}

export function getHearPair(id: HearPairId): HearPairData {
  const pair = getHearPairs().find(item => item.id === id);
  if (!pair) throw new Error(`Unknown hear pair: ${id}`);
  return pair;
}

export function hearKeyboardKeys(pair: HearPairData): PianoKey[] {
  const layout = getLayouts('/keyboard-notes')[0];
  const keys = layout.keys.filter(key => key.midi >= pair.keyboardLow && key.midi <= pair.keyboardHigh);
  if (keys.length < 5) throw new Error(`B04 keyboard slice too small for ${pair.id}`);
  return keys;
}

export function getHearPageModel(initialPair: HearPairId) {
  const pairs = getHearPairs();
  return {
    pairs,
    initialPair,
    keyboards: Object.fromEntries(pairs.map(pair => [pair.id, hearKeyboardKeys(pair)])) as Record<HearPairId, PianoKey[]>,
  };
}
