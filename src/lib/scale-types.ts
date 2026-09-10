import type { PianoKey, StaffNote } from './keyboard-types';

export type ScaleHand = 'RH' | 'LH';
export type ScaleDirection = 'ascending' | 'descending' | 'up_down';
export type ScaleFormID = 'major' | 'natural_minor' | 'harmonic_minor' | 'melodic_minor_classical';

export type ScalePitch = {
  spelling: string;
  note: string;
  midi: number;
  key_color: 'white' | 'black';
  staff: StaffNote;
};

export type ScaleFingering = Record<ScaleHand, {
  ascending: number[] | null;
  descending: number[] | null;
}>;

export type ScaleOption = {
  id: string;
  tonic: string;
  form: ScaleFormID;
  formLabel: string;
  semitoneSteps: number[];
  sequences: Record<ScaleHand, {
    ascending: ScalePitch[];
    descending: ScalePitch[];
  }>;
  fingering: ScaleFingering;
  detailURL: string | null;
  sourceIDs: string[];
};

export type ScaleBlock = {
  id: string;
  heading: string;
  body: string;
};

export type ScalePageModel = {
  url: '/scales' | '/scales/c-major' | '/scales/a-minor';
  title: string;
  description: string;
  blocks: ScaleBlock[];
  metadata: { title: string; description: string; canonical_path: string };
  provenance: {
    template_id: 'T11' | 'T12';
    source_groups: string[];
    source_ids: string[];
    block_ids: string[];
  };
};

export type ScaleWorkbenchData = {
  option: ScaleOption;
  keyboardKeys: PianoKey[];
  hand: ScaleHand;
  direction: ScaleDirection;
  tempo: number;
};
