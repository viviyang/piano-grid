import type { Layout, PianoKey } from '@/lib/keyboard-types';
import { keysInMidiRange } from '@/lib/keyboard-viewport';
import { createPracticePreset, practiceEntryHref, practicePresetParams } from '@/lib/keyboard-practice';

export const TEACHING_PACK_ID = 'piano-key-names-c4-c5' as const;
export const TEACHING_PACK_REVISION = 1 as const;
export const TEACHING_PACK_ANCHOR = 'teaching-pack' as const;
export const TEACHING_PACK_PATH = '/keyboard-notes/labeled';
export const TEACHING_PACK_START_MIDI = 60;
export const TEACHING_PACK_END_MIDI = 72;

export type TeachingPaper = 'letter' | 'a4';
export type TeachingPageKind = 'reference' | 'worksheet' | 'answers';
export type TeachingPageSet = 'full' | 'worksheet';

export type TeachingResourceAsset = {
  pdfPath: string;
  pageCount: number;
  suggestedName: string;
};

export type TeachingResource = {
  id: typeof TEACHING_PACK_ID;
  revision: typeof TEACHING_PACK_REVISION;
  kind: 'keyboard-worksheet';
  layoutRange: { startMidi: number; endMidi: number };
  answerPolicy: 'white-key-letter-names';
  pageKinds: TeachingPageKind[];
  printFormats: TeachingPaper[];
  matchingPractice: { optionId: 'natural-c4-c5'; presetVersion: 'v1' };
  assets: Record<TeachingPaper, TeachingResourceAsset>;
  worksheetAssets: Record<TeachingPaper, TeachingResourceAsset>;
  sourceRefs: string[];
};

export const WHITE_KEY_ANSWERS = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'] as const;
export const LOOK_AGAIN_ANSWERS = { circle: 'F4', dot: 'C5', betweenPair: 'D4' } as const;

export const TEACHING_RESOURCE: TeachingResource = {
  id: TEACHING_PACK_ID,
  revision: TEACHING_PACK_REVISION,
  kind: 'keyboard-worksheet',
  layoutRange: { startMidi: TEACHING_PACK_START_MIDI, endMidi: TEACHING_PACK_END_MIDI },
  answerPolicy: 'white-key-letter-names',
  pageKinds: ['reference', 'worksheet', 'answers'],
  printFormats: ['letter', 'a4'],
  matchingPractice: { optionId: 'natural-c4-c5', presetVersion: 'v1' },
  assets: {
    letter: {
      pdfPath: '/reference/generated/keyboard-notes/piano-key-names-c4-c5-letter.pdf',
      pageCount: 3,
      suggestedName: 'pianogrid-piano-key-names-c4-c5-letter.pdf',
    },
    a4: {
      pdfPath: '/reference/generated/keyboard-notes/piano-key-names-c4-c5-a4.pdf',
      pageCount: 3,
      suggestedName: 'pianogrid-piano-key-names-c4-c5-a4.pdf',
    },
  },
  worksheetAssets: {
    letter: {
      pdfPath: '/reference/generated/keyboard-notes/piano-key-names-c4-c5-letter-worksheet.pdf',
      pageCount: 1,
      suggestedName: 'pianogrid-piano-key-names-c4-c5-letter-worksheet.pdf',
    },
    a4: {
      pdfPath: '/reference/generated/keyboard-notes/piano-key-names-c4-c5-a4-worksheet.pdf',
      pageCount: 1,
      suggestedName: 'pianogrid-piano-key-names-c4-c5-a4-worksheet.pdf',
    },
  },
  sourceRefs: ['shared-keyboard-layout', 'keyboard-geometry', 'B06/02_PRINT_CONTENT.md'],
};

export type TeachingPackProjection = {
  keys: PianoKey[];
  whiteKeys: PianoKey[];
  blackKeys: PianoKey[];
  whiteLabels: string[];
};

export function projectTeachingPackKeys(layout: Layout): TeachingPackProjection {
  const keys = keysInMidiRange(layout, TEACHING_PACK_START_MIDI, TEACHING_PACK_END_MIDI);
  const whiteKeys = keys.filter(key => key.color === 'white');
  const blackKeys = keys.filter(key => key.color === 'black');
  const whiteLabels = whiteKeys.map(key => key.label_with_octave.split(' / ')[0]);
  return { keys, whiteKeys, blackKeys, whiteLabels };
}

export function assertTeachingPackProjection(projection: TeachingPackProjection) {
  if (projection.whiteKeys.length !== 8) throw new Error(`Teaching pack expects 8 white keys, got ${projection.whiteKeys.length}`);
  if (projection.blackKeys.length !== 5) throw new Error(`Teaching pack expects 5 black keys, got ${projection.blackKeys.length}`);
  if (WHITE_KEY_ANSWERS.join() !== projection.whiteLabels.join()) {
    throw new Error(`Teaching pack white labels mismatch: ${projection.whiteLabels.join(' ')}`);
  }
  return projection;
}

export function teachingPackAsset(paper: TeachingPaper, pageSet: TeachingPageSet = 'full') {
  return pageSet === 'worksheet' ? TEACHING_RESOURCE.worksheetAssets[paper] : TEACHING_RESOURCE.assets[paper];
}

export function teachingPackShareParams(paper?: TeachingPaper) {
  const params = new URLSearchParams();
  if (paper && paper !== 'letter') params.set('paper', paper);
  return params;
}

export function teachingPackSharePath(paper?: TeachingPaper) {
  const params = teachingPackShareParams(paper);
  const query = params.size ? `?${params}` : '';
  return `${TEACHING_PACK_PATH}${query}#${TEACHING_PACK_ANCHOR}`;
}

/** Fresh seed on each call — do not hardcode design-fixture seeds. */
export function teachingPackPracticeHref(seed?: number) {
  const preset = createPracticePreset(TEACHING_RESOURCE.matchingPractice.optionId, seed);
  return practiceEntryHref(practicePresetParams(preset));
}

export function parseTeachingPaper(value: string | null | undefined): TeachingPaper {
  return value === 'a4' ? 'a4' : 'letter';
}

export function parseTeachingPageKind(value: string | null | undefined): TeachingPageKind {
  if (value === 'worksheet' || value === '1') return 'worksheet';
  if (value === 'answers' || value === '2') return 'answers';
  return 'reference';
}

export function parseTeachingPageSet(value: string | null | undefined): TeachingPageSet {
  return value === 'worksheet' ? 'worksheet' : 'full';
}

export const PAGE_COPY = {
  reference: {
    title: 'Meet the white keys',
    subtitle: 'One small part of the piano: C4 to C5.',
    groupsHeading: 'Look for the groups',
    groups: [
      'C is the white key just before a group of two black keys.',
      'D sits between those two black keys.',
      'F is the white key just before a group of three black keys.',
    ],
    sayHeading: 'Say the names, then find them',
    sayBody: 'Move from left to right: C, D, E, F, G, A, B, C. The letters repeat; the octave number changes at the next C.',
    footnote: 'Middle C is labeled C4 in this pack. Octave numbers are not finger numbers. This is a reference diagram, not a full-size sticker template.',
  },
  worksheet: {
    title: 'Your turn: name the keys',
    subtitle: 'Use the same C4–C5 range. Cover the reference page while you try.',
    instruction: 'Write the letter name on each white key. Add octave numbers when you are ready.',
    lookHeading: 'Look again',
    lookItems: [
      'Circle the white key just before the group of three black keys.',
      'Put a dot on the higher C.',
      'Point to the white key between the group of two black keys.',
    ],
    footerFull: 'Use page 3 to check your answers. You can return to the reference page at any time.',
    footerSolo: 'Find the reference and answers on the resource page below.',
  },
  answers: {
    title: 'Check the names together',
    subtitle: 'White keys, from left to right.',
    answerRow: WHITE_KEY_ANSWERS.join(' · '),
    lookAgain: `Circle: ${LOOK_AGAIN_ANSWERS.circle}. Dot: ${LOOK_AGAIN_ANSWERS.dot}. Between the pair: ${LOOK_AGAIN_ANSWERS.betweenPair}.`,
    useHeading: 'Use the pack in a lesson',
    useBody: 'Begin with the labeled page. Ask the learner to notice the two- and three-black-key groups. Move to the worksheet, then use this page to check and discuss the answers. Repeat a small part rather than treating the page as a speed test.',
    screenHeading: 'Try it on screen',
    screenBody: 'Open the resource page and choose “Try the matching online practice.” It uses this same white-key range. The exercise checks note recognition, not piano technique.',
  },
  howTo: [
    {
      title: 'Start with the reference',
      body: 'Point out the two- and three-black-key groups. Find the white keys beside and between them.',
    },
    {
      title: 'Try the worksheet',
      body: 'Cover the labels and write the white-key names. Add octave numbers only when they are part of your lesson.',
    },
    {
      title: 'Check and revisit',
      body: 'Compare with the answer page. Revisit the notes that need another look, then optionally try the online practice.',
    },
  ],
  accessible: [
    'The white keys are C4, D4, E4, F4, G4, A4, B4 and C5.',
    'Black keys form a group of two, then three.',
    `Circle ${LOOK_AGAIN_ANSWERS.circle}; mark the higher C at ${LOOK_AGAIN_ANSWERS.dot}; ${LOOK_AGAIN_ANSWERS.betweenPair} is between the pair.`,
    'The worksheet asks you to name these keys; it does not assess piano technique.',
  ],
} as const;
