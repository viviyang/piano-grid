import type { ScaleFamilyRoute, ScaleHand, ScaleOption, ScalePageModel, ScaleSourceReference } from './scale-types';

export type ScaleFamilyExample = {
  id: string;
  label: string;
  collectionLabel: string;
  option: ScaleOption;
  summary: string;
  comparison: string;
  family: string;
};

export type ScaleFamilyPageData = {
  model: ScalePageModel;
  examples: ScaleFamilyExample[];
  defaultExampleID: string;
  scope: string;
  keyboardKeys: import('./keyboard-types').PianoKey[];
};

export type ArpeggioExample = {
  id: string;
  label: string;
  collectionLabel: string;
  option: ScaleOption;
  summary: string;
  comparison: string;
  defaultHand: 'RH' | 'LH';
  viewID: string | null;
  viewHand: ScaleHand | null;
  renderHand: ScaleHand;
  handSelectable: boolean;
};

export type ArpeggioPageData = {
  model: ScalePageModel;
  examples: ArpeggioExample[];
  defaultExampleID: string;
  scope: string;
  keyboardKeys: import('./keyboard-types').PianoKey[];
};

export type ScaleCompletionSource = ScaleSourceReference & {
  evidenceStatus?: string;
};

export const SCALE_FAMILY_ROUTES: ScaleFamilyRoute[] = [
  '/scales/modes',
  '/scales/blues',
  '/scales/pentatonic',
  '/scales/harmonic-major',
  '/scales/chromatic',
];
