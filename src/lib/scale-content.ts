import { getLayouts } from './keyboard-content';
import type { PianoKey, StaffNote } from './keyboard-types';
import { readAuthorizedPage } from './site-content';
import { isPublicRoute } from './site-routes';
import type {
  ScaleDirection,
  ScaleFingering,
  ScaleFormID,
  ScaleHand,
  ScaleOption,
  ScalePageModel,
  ScalePitch,
} from './scale-types';

const blockIDs = {
  '/scales': ['start', 'formula', 'minor', 'compare', 'degrees', 'jazz', 'types', 'practice', 'print'],
  '/scales/c-major': ['notes', 'focus', 'fingering', 'practice'],
  '/scales/a-minor': ['section-1', 'section-2', 'section-3', 'section-4'],
} as const;

const formLabels: Record<ScaleFormID, string> = {
  major: 'Major',
  natural_minor: 'Natural minor',
  harmonic_minor: 'Harmonic minor',
  melodic_minor_classical: 'Melodic minor (classical)',
};

const letterPitch: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
const blackPitchClasses = new Set([1, 3, 6, 8, 10]);

type SourcePitch = { note?: string; spelling?: string; written_octave?: number; octave?: number; midi: number; key_color: 'white' | 'black' };

function accidentalOffset(accidental: string) {
  return [...accidental].reduce((sum, symbol) => sum + (symbol === '#' ? 1 : -1), 0);
}

function splitSpelling(spelling: string) {
  const match = spelling.match(/^([A-G])(#{1,2}|b{1,2})?$/);
  if (!match) throw new Error(`Unsupported scale spelling: ${spelling}`);
  return { letter: match[1], accidental: match[2] ?? '' };
}

function midiFor(spelling: string, octave: number) {
  const { letter, accidental } = splitSpelling(spelling);
  return (octave + 1) * 12 + letterPitch[letter] + accidentalOffset(accidental);
}

function staffFor(spelling: string, octave: number, midi: number, clef: 'treble' | 'bass'): StaffNote {
  const { letter, accidental } = splitSpelling(spelling);
  const absoluteStep = octave * 7 + 'CDEFGAB'.indexOf(letter);
  const bottomLine = clef === 'treble' ? 4 * 7 + 2 : 2 * 7 + 4;
  const step = absoluteStep - bottomLine;
  const ledger: number[] = [];
  if (step < 0) for (let value = -2; value >= step; value -= 2) ledger.push(value);
  if (step > 8) for (let value = 10; value <= step; value += 2) ledger.push(value);
  return {
    note: `${spelling}${octave}`,
    midi,
    clef,
    accidental: accidental || null,
    staff_step_from_bottom_line: step,
    ledger_line_steps: ledger,
  };
}

function pitch(spelling: string, octave: number, hand: ScaleHand): ScalePitch {
  const midi = midiFor(spelling, octave);
  return {
    spelling,
    note: `${spelling}${octave}`,
    midi,
    key_color: blackPitchClasses.has(((midi % 12) + 12) % 12) ? 'black' : 'white',
    staff: staffFor(spelling, octave, midi, hand === 'RH' ? 'treble' : 'bass'),
  };
}

function ascendingPitches(notes: string[], hand: ScaleHand) {
  let octave = hand === 'RH' ? 4 : 3;
  let previous = Number.NEGATIVE_INFINITY;
  return notes.map((spelling) => {
    let current = midiFor(spelling, octave);
    while (current <= previous) {
      octave += 1;
      current = midiFor(spelling, octave);
    }
    previous = current;
    return pitch(spelling, octave, hand);
  });
}

function descendingPitches(notes: string[], hand: ScaleHand) {
  let octave = hand === 'RH' ? 5 : 4;
  let previous = Number.POSITIVE_INFINITY;
  return notes.map((spelling) => {
    let current = midiFor(spelling, octave);
    while (current >= previous) {
      octave -= 1;
      current = midiFor(spelling, octave);
    }
    previous = current;
    return pitch(spelling, octave, hand);
  });
}

function normalizeSourcePitch(value: SourcePitch, hand: ScaleHand): ScalePitch {
  const note = value.note ?? `${value.spelling}${value.written_octave}`;
  const match = note.match(/^([A-G](?:#{1,2}|b{1,2})?)(-?\d+)$/);
  if (!match) throw new Error(`Invalid source pitch: ${note}`);
  const spelling = value.spelling ?? match[1];
  const octave = value.written_octave ?? value.octave ?? Number(match[2]);
  if (midiFor(spelling, octave) !== value.midi) throw new Error(`Scale pitch mismatch: ${note}`);
  return { ...pitch(spelling, octave, hand), key_color: value.key_color };
}

function blankFingering(): ScaleFingering {
  return {
    RH: { ascending: null, descending: null },
    LH: { ascending: null, descending: null },
  };
}

function optionFromNotes({
  tonic,
  form,
  ascending,
  descending,
  semitoneSteps,
  fingering = blankFingering(),
  detailURL = null,
  sourceIDs,
}: {
  tonic: string;
  form: ScaleFormID;
  ascending: string[];
  descending: string[];
  semitoneSteps: number[];
  fingering?: ScaleFingering;
  detailURL?: string | null;
  sourceIDs: string[];
}): ScaleOption {
  return {
    id: `${form}:${tonic}`,
    tonic,
    form,
    formLabel: formLabels[form],
    semitoneSteps,
    sequences: {
      RH: { ascending: ascendingPitches(ascending, 'RH'), descending: descendingPitches(descending, 'RH') },
      LH: { ascending: ascendingPitches(ascending, 'LH'), descending: descendingPitches(descending, 'LH') },
    },
    fingering,
    detailURL,
    sourceIDs,
  };
}

function cMajorOption(data: any): ScaleOption {
  const fingering: ScaleFingering = {
    RH: { ascending: data.fingering.RH.ascending, descending: data.fingering.RH.descending },
    LH: { ascending: data.fingering.LH.ascending, descending: data.fingering.LH.descending },
  };
  const sequences = Object.fromEntries((['RH', 'LH'] as const).map((hand) => [hand, {
    ascending: data.pitch_sequences[hand].ascending.map((value: SourcePitch) => normalizeSourcePitch(value, hand)),
    descending: data.pitch_sequences[hand].descending.map((value: SourcePitch) => normalizeSourcePitch(value, hand)),
  }])) as ScaleOption['sequences'];
  return {
    id: 'major:C',
    tonic: 'C',
    form: 'major',
    formLabel: formLabels.major,
    semitoneSteps: data.intervals.ascending_semitones,
    sequences,
    fingering,
    detailURL: '/scales/c-major',
    sourceIDs: data.note_source_ids,
  };
}

function aMinorOptions(data: any): ScaleOption[] {
  return data.forms.map((form: any) => {
    const fingering: ScaleFingering = {
      RH: { ascending: form.fingering.ascending.right_hand, descending: form.fingering.descending.right_hand },
      LH: { ascending: form.fingering.ascending.left_hand, descending: form.fingering.descending.left_hand },
    };
    const sequences = Object.fromEntries((['RH', 'LH'] as const).map((hand) => [hand, {
      ascending: form.pitch_mapping[hand === 'RH' ? 'right_hand_ascending_example' : 'left_hand_ascending_example'].map((value: SourcePitch) => normalizeSourcePitch(value, hand)),
      descending: form.pitch_mapping[hand === 'RH' ? 'right_hand_descending_example' : 'left_hand_descending_example'].map((value: SourcePitch) => normalizeSourcePitch(value, hand)),
    }])) as ScaleOption['sequences'];
    return {
      id: `${form.id}:A`,
      tonic: 'A',
      form: form.id,
      formLabel: form.label,
      semitoneSteps: form.ascending_semitone_steps,
      sequences,
      fingering,
      detailURL: '/scales/a-minor',
      sourceIDs: form.source_ids,
    };
  });
}

function keyboardKeys(): PianoKey[] {
  return getLayouts('/keyboard-notes')[0].keys;
}

export function getScalePage(url: keyof typeof blockIDs) {
  const { page } = readAuthorizedPage(url);
  const actual = page.blocks.map((block: { id: string }) => block.id);
  if (actual.join() !== blockIDs[url].join()) throw new Error(`Unknown or missing scale content block: ${url}`);
  const model: ScalePageModel = {
    url,
    title: page.title,
    description: page.description,
    blocks: page.blocks.map((block: { id: string; heading: string; body: string }) => ({ id: block.id, heading: block.heading, body: block.body })),
    metadata: page.metadata,
    provenance: {
      template_id: page.template_id,
      source_groups: page.source_groups.map((group: { id: string }) => group.id),
      source_ids: page.source_ids,
      block_ids: actual,
    },
  };
  return { model, data: page.data };
}

export function getScaleCenter() {
  const { model, data } = getScalePage('/scales');
  const cData = getScalePage('/scales/c-major').data;
  const aData = getScalePage('/scales/a-minor').data;
  const cOption = cMajorOption(cData);
  const aOptions = aMinorOptions(aData);
  const major: ScaleOption[] = data.major_overview.map((entry: any) => {
    if (entry.tonic === 'C') return cOption;
    const ascending = [...entry.notes, entry.tonic];
    return optionFromNotes({
      tonic: entry.tonic,
      form: 'major',
      ascending,
      descending: [...ascending].reverse(),
      semitoneSteps: data.form_comparison.find((item: any) => item.id === 'major').steps_semitones,
      sourceIDs: entry.source_ids,
    });
  });
  const minor: ScaleOption[] = data.minor_overview.flatMap((entry: any) => ([
    ['natural_minor', entry.natural_ascending, entry.natural_descending],
    ['harmonic_minor', entry.harmonic_ascending, entry.harmonic_descending],
    ['melodic_minor_classical', entry.melodic_classical_ascending, entry.melodic_classical_descending],
  ] as const).map(([form, ascending, descending]) => {
    const verified = entry.tonic === 'A' ? aOptions.find((option) => option.form === form) : null;
    if (verified) return verified;
    const comparison = data.form_comparison.find((item: any) => item.id.replaceAll('-', '_') === form);
    return optionFromNotes({
      tonic: entry.tonic,
      form,
      ascending,
      descending,
      semitoneSteps: comparison?.steps_semitones ?? comparison?.ascending_steps_semitones,
      sourceIDs: entry.source_ids,
    });
  }));
  return {
    model,
    options: [...major, ...minor],
    keyboardKeys: keyboardKeys(),
    formComparison: data.form_comparison,
    scaleDegrees: data.scale_degrees,
    jazzExamples: data.jazz_examples,
    defaultSelection: data.default_selection,
    availableDetailURLs: ['/scales/c-major', '/scales/a-minor'].filter(isPublicRoute),
  };
}

export function getScaleDetail(url: '/scales/c-major' | '/scales/a-minor') {
  const { model, data } = getScalePage(url);
  if (url === '/scales/c-major') {
    return {
      model,
      options: [cMajorOption(data)],
      keyboardKeys: keyboardKeys(),
      defaultForm: 'major' as ScaleFormID,
      tempoOptions: [data.renderer_payload.default_tempo_bpm],
      keySignature: data.key_signature.count === 0 ? 'No sharps or flats' : data.key_signature.ordered_accidentals.join(', '),
      relatedLinks: data.related_links.filter((link: { url: string }) => link.url === '/scales' && isPublicRoute(link.url)),
      chords: [],
    };
  }
  return {
    model,
    options: aMinorOptions(data),
    keyboardKeys: keyboardKeys(),
    defaultForm: data.default_form as ScaleFormID,
    tempoOptions: data.print_and_audio.tempo_presets_bpm,
    keySignature: data.key_signature.count === 0 ? 'No sharps or flats' : data.key_signature.accidentals.join(', '),
    relatedLinks: [
      { url: '/scales', label: 'All piano scales' },
      { url: data.natural_scale_chords.voicing_reference_url, label: 'A minor chord reference' },
    ].filter((link) => isPublicRoute(link.url)),
    chords: data.natural_scale_chords.items,
  };
}

export function scaleSequence(option: ScaleOption, hand: ScaleHand, direction: ScaleDirection) {
  if (direction !== 'up_down') return option.sequences[hand][direction];
  return [...option.sequences[hand].ascending, ...option.sequences[hand].descending.slice(1)];
}
