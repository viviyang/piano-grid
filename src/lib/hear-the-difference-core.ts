export type HearPairId = 'a' | 'c' | 'd' | 'e';
export type HearVoice = 'low' | 'middle' | 'high';
export type HearRevealMethod = 'correct' | 'show_answer';

export type HearNote = { display_pitch: string; midi: number };

export type HearPlayback = {
  together: { midi: number; frequency_hz: number; onset_ms: number; duration_ms: number }[];
  ascending: { midi: number; frequency_hz: number; onset_ms: number; duration_ms: number }[];
};

export type HearPairData = {
  id: HearPairId;
  root: string;
  minorChordId: string;
  majorChordId: string;
  minorName: string;
  majorName: string;
  minorURL: string;
  majorURL: string;
  voicing: 'root-position-close';
  changedDegree: 3;
  direction: 'raise-one-semitone';
  answer: 'middle';
  minorNotes: HearNote[];
  majorNotes: HearNote[];
  sourceThird: HearNote;
  targetThird: HearNote;
  minorPlayback: HearPlayback;
  majorPlayback: HearPlayback;
  revealCopy: string;
  rootExplain: string;
  thirdExplain: string;
  fifthExplain: string;
  keyboardLow: number;
  keyboardHigh: number;
};

export const HEAR_PATH = '/tools/hear-the-difference' as const;
export const HEAR_PAIR_ORDER: HearPairId[] = ['a', 'c', 'd', 'e'];

export function isHearPairId(value: string | null | undefined): value is HearPairId {
  return value === 'a' || value === 'c' || value === 'd' || value === 'e';
}

export function parseHearPairId(value: string | null | undefined): HearPairId {
  return isHearPairId(value) ? value : 'a';
}

export function nextHearPairId(current: HearPairId): HearPairId {
  const index = HEAR_PAIR_ORDER.indexOf(current);
  return HEAR_PAIR_ORDER[(index + 1) % HEAR_PAIR_ORDER.length];
}

export function hearPairIndex(id: HearPairId) {
  return HEAR_PAIR_ORDER.indexOf(id) + 1;
}

export function hearPairCount() {
  return HEAR_PAIR_ORDER.length;
}

export function hearShareParams(pair: HearPairId, extras: Record<string, string> = {}) {
  return new URLSearchParams({ pair, ...extras });
}

export function restoreHearPair(params: URLSearchParams) {
  return parseHearPairId(params.get('pair'));
}

export function hearCompareRoles(pair: HearPairData): Record<number, 'common' | 'source' | 'target'> {
  return {
    [pair.minorNotes[0].midi]: 'common',
    [pair.minorNotes[2].midi]: 'common',
    [pair.sourceThird.midi]: 'source',
    [pair.targetThird.midi]: 'target',
  };
}

export function findHearPair(pairs: HearPairData[], id: HearPairId) {
  const pair = pairs.find(item => item.id === id);
  if (!pair) throw new Error(`Unknown hear pair: ${id}`);
  return pair;
}
