import type { PianoKey, StaffNote } from './keyboard-types';

export type ScaleHand = 'RH' | 'LH';
export type ScaleDirection = 'ascending' | 'descending' | 'up_down';
export type ScaleFormID = 'major' | 'natural_minor' | 'harmonic_minor' | 'melodic_minor_classical';
export type ScaleCollectionFormID =
  | 'ionian' | 'dorian' | 'phrygian' | 'lydian' | 'mixolydian' | 'aeolian' | 'locrian'
  | 'minor_blues' | 'major_blues' | 'major_pentatonic' | 'minor_pentatonic'
  | 'harmonic_major' | 'chromatic' | 'major_arpeggio';
export type ScaleOptionFormID = ScaleFormID | ScaleCollectionFormID;

export type ScaleDetailRoute =
  | '/scales/c-major' | '/scales/a-minor' | '/scales/d-major' | '/scales/e-minor'
  | '/scales/f-major' | '/scales/g-major' | '/scales/a-major' | '/scales/c-minor'
  | '/scales/d-minor' | '/scales/e-major' | '/scales/b-minor' | '/scales/f-minor'
  | '/scales/a-sharp-minor' | '/scales/b-major' | '/scales/b-flat-major'
  | '/scales/g-minor' | '/scales/e-flat-major' | '/scales/f-sharp-minor'
  | '/scales/c-flat-major';

export type ScaleFamilyRoute =
  | '/scales/modes' | '/scales/blues' | '/scales/pentatonic'
  | '/scales/harmonic-major' | '/scales/chromatic';

export type ScaleRoute = '/scales' | ScaleDetailRoute | ScaleFamilyRoute | '/arpeggios';

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

export type ScaleFingeringNote = Record<ScaleHand, {
  ascending: string;
  descending: string;
}>;

export type ScaleSourceReference = {
  sourceID: string;
  title: string;
  publisher: string;
  url: string;
  scope: string;
  locator: string;
};

export type AuthoredScalePitch = {
  note?: string;
  spelling?: string;
  step?: string;
  alter?: number;
  written_octave?: number;
  octave?: number;
  midi: number;
  pitch_class?: number;
  physical_key_name?: string;
  scale_degree?: number;
  key_color: 'white' | 'black';
};

export type AuthoredFingeringRow = number[] | null;

export type ScaleAuthoringBlock = {
  id: string;
  heading: string;
  body: string;
};

export type ScaleAuthoringFAQ = {
  id: string;
  question: string;
  answer: string;
  source_ids: string[];
  evidence_status: string;
};

export type ScaleAuthoringPageBase = {
  url: '/scales' | '/scales/c-major' | '/scales/a-minor';
  title: string;
  description: string;
  blocks: ScaleAuthoringBlock[];
  faqs?: ScaleAuthoringFAQ[];
  source_ids: string[];
  source_groups: Array<{ id: string; [key: string]: unknown }>;
  template_id: 'T11' | 'T12';
  metadata: { title: string; description: string; canonical_path: string };
};

export type ScaleCenterAuthoringPage = ScaleAuthoringPageBase & {
  url: '/scales';
  template_id: 'T11';
  data: {
    default_selection: { tonic: string; form: ScaleFormID; range_octaves: 1; hand: 'right' | 'left'; direction: ScaleDirection };
    major_overview: Array<{ tonic: string; notes: string[]; source_ids: string[]; [key: string]: unknown }>;
    minor_overview: Array<{
      tonic: string;
      natural_ascending: string[];
      natural_descending: string[];
      harmonic_ascending: string[];
      harmonic_descending: string[];
      melodic_classical_ascending: string[];
      melodic_classical_descending: string[];
      fingering: null;
      source_ids: string[];
      [key: string]: unknown;
    }>;
    form_comparison: Array<{ id: string; steps_semitones?: number[]; ascending_steps_semitones?: number[]; [key: string]: unknown }>;
    scale_degrees: Array<Record<string, unknown>>;
    jazz_examples: Array<Record<string, unknown>>;
    print_assets: null | Record<string, unknown>;
    audio_assets: null | Record<string, unknown>;
    [key: string]: unknown;
  };
};

export type CMajorAuthoringPage = ScaleAuthoringPageBase & {
  url: '/scales/c-major';
  template_id: 'T12';
  data: {
    tonic: 'C';
    scale_type: 'major';
    notes_ascending: string[];
    notes_descending: string[];
    pitch_sequences: Record<ScaleHand, Record<'ascending' | 'descending', AuthoredScalePitch[]>>;
    fingering: Record<ScaleHand, Record<'ascending' | 'descending', AuthoredFingeringRow>> & Record<string, unknown>;
    note_source_ids: string[];
    renderer_payload: { default_tempo_bpm: number; [key: string]: unknown };
    key_signature: { count: number; ordered_accidentals: string[]; [key: string]: unknown };
    related_links: Array<{ url: string; label: string; [key: string]: unknown }>;
    [key: string]: unknown;
  };
};

export type AMinorAuthoringForm = {
  id: Exclude<ScaleFormID, 'major'>;
  label: string;
  notes_ascending: string[];
  notes_descending: string[];
  source_ids: string[];
  ascending_semitone_steps: number[];
  pitch_mapping: Record<'right_hand_ascending_example' | 'right_hand_descending_example' | 'left_hand_ascending_example' | 'left_hand_descending_example', AuthoredScalePitch[]> & Record<string, unknown>;
  fingering: {
    ascending: { right_hand: AuthoredFingeringRow; left_hand: AuthoredFingeringRow };
    descending: { right_hand: AuthoredFingeringRow; left_hand: AuthoredFingeringRow };
    source_ids: string[];
    [key: string]: unknown;
  };
  [key: string]: unknown;
};

export type AMinorAuthoringPage = ScaleAuthoringPageBase & {
  url: '/scales/a-minor';
  template_id: 'T12';
  data: {
    tonic: 'A';
    default_form: Exclude<ScaleFormID, 'major'>;
    forms: AMinorAuthoringForm[];
    approved_playback_octaves: [1];
    print_and_audio: { tempo_presets_bpm: number[]; [key: string]: unknown };
    key_signature: { count: number; accidentals: string[]; [key: string]: unknown };
    natural_scale_chords: {
      voicing_reference_url: string;
      items: Array<{ degree: string; name: string; notes: string[]; [key: string]: unknown }>;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
};

export type ScaleAuthoringPage = ScaleCenterAuthoringPage | CMajorAuthoringPage | AMinorAuthoringPage;

export type ScaleOption = {
  id: string;
  tonic: string;
  form: ScaleOptionFormID;
  formLabel: string;
  semitoneSteps: number[];
  sequences: Record<ScaleHand, {
    ascending: ScalePitch[];
    descending: ScalePitch[];
  }>;
  fingering: ScaleFingering;
  fingeringNote: ScaleFingeringNote;
  detailURL: string | null;
  sources: ScaleSourceReference[];
};

export type ScaleBlock = {
  id: string;
  heading: string;
  body: string;
};

export type ScaleCopyTable = {
  label: string;
  columns: string[];
  rows: string[][];
};

export type ScaleCopySection = {
  id: string;
  legacyBlockID?: string;
  heading: string;
  paragraphs: string[];
  noteLines?: string[];
  table?: ScaleCopyTable;
  links?: Array<{ label: string; href: string }>;
};

export type ScalePageCopy = {
  h1: string;
  intro: string;
  jumps: Array<{ label: string; href: string }>;
  sections: ScaleCopySection[];
  faqs: Array<{ id?: string; question: string; answer: string; sourceIDs?: string[] }>;
  sourceNote: string;
};

export type ScalePageModel = {
  url: ScaleRoute;
  title: string;
  description: string;
  blocks: ScaleBlock[];
  copy: ScalePageCopy;
  pageSources: ScaleSourceReference[];
  metadata: { title: string; description: string; canonical_path: string };
  provenance: {
    template_id: 'T11' | 'T12' | 'T13' | 'T14';
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
