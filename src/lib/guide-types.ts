import type { PianoKey, StaffNote } from './keyboard-types';

export type GuideURL = '/guide' | '/guide/read-sheet-music';
export type GuideBlock = { id: string; heading: string; body: string; sourceIDs: string[] };
export type GuideModel = {
  url: GuideURL;
  title: string;
  description: string;
  blocks: GuideBlock[];
  metadata: { title: string; description: string; canonicalPath: string };
  sourceGroups: string[];
};
export type GuidePathStep = { step: number; task: string; url: string; available: boolean };
export type ExerciseEvent = { pitch: string; kind: 'note'; onsetQuarters: number; durationQuarters: number; finger: null };
export type ExerciseBar = { number: number; events: ExerciseEvent[]; totalQuarters: number };
export type ReadingExercise = {
  id: string;
  title: string;
  clef: 'treble';
  meter: string;
  keySignature: string;
  quarterUnitsPerBar: number;
  bars: ExerciseBar[];
  goal: string;
  difficultyLabel: string;
  fingeringStatus: string;
};
export type GuideCenterData = { model: GuideModel; path: GuidePathStep[]; firstExample: ExerciseBar; keyboardKeys: PianoKey[]; printableURL: string };
export type ReadingGuideData = {
  model: GuideModel;
  anchors: { clef: 'treble' | 'bass'; pitch: string; position: string; staff: StaffNote }[];
  trebleSpaces: string[];
  bassSpaces: string[];
  exercise: ReadingExercise;
  printableURL: string;
  chartURL: string;
};
