import { getLayouts } from './keyboard-content';
import { validateScaleAuthoringPage } from './scale-authoring';
import { SCALE_PAGE_COPY } from './scale-page-copy';
export { scaleSequence } from './scale-resolver';
import type { PianoKey, StaffNote } from './keyboard-types';
import { readAuthorizedPage } from './site-content';
import { isPublicRoute } from './site-routes';
import type {
  ScaleFingering,
  ScaleFingeringNote,
  ScaleFormID,
  ScaleHand,
  ScaleOption,
  ScalePageModel,
  ScalePitch,
  ScaleSourceReference,
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
type SourceRecord = { source_id: string; title: string; publisher: string; url: string };

function publicSourceScope(sourceID: string, tonic: string, form: ScaleFormID) {
  const formLabel = formLabels[form].toLowerCase();
  const scopes: Record<string, string | null> = {
    'AC-01': 'Major-scale whole-step and half-step pattern.',
    'AC-02': `${tonic} ${formLabel} note pattern${form === 'melodic_minor_classical' ? ' and the classical ascending and descending convention' : ''}.`,
    'AC-03': null,
    'AC-04': `${tonic} major note spelling within the 12-key overview.`,
    'AM-NOTES-C-MAJOR': 'C major note spelling and its key signature.',
    'AM-FINGER-LMT': tonic === 'A' && form === 'natural_minor'
      ? 'A natural minor one-octave descending fingering; source register A3-A4. The right-hand A4-A5 display is an explicit octave adaptation.'
      : 'C major one-octave note spelling and fingering for both hands, ascending and descending.',
    'AM-FINGER-MF': 'Independent comparison of that one-octave fingering for both hands and directions.',
    'AN-HMT-A': `A ${formLabel} note spelling${form === 'melodic_minor_classical' ? ' and the classical descending form' : ''}.`,
    'AN-PS-NAT': 'A natural minor note spelling and one-octave ascending fingering for both hands.',
    'AN-PS-HAR': 'A harmonic minor note spelling and one-octave ascending fingering for both hands.',
    'AN-DENTON': 'A classical melodic minor note spelling and its different ascending and descending forms.',
    'AN-HA-A': 'One-octave ascending fingering for both hands across the A minor forms.',
  };
  if (!(sourceID in scopes)) throw new Error(`Scale source has no public scope: ${sourceID}`);
  return scopes[sourceID];
}

function publicSources(master: { sources: SourceRecord[] }, sourceIDs: string[], tonic: string, form: ScaleFormID): ScaleSourceReference[] {
  const sourceByID = new Map(master.sources.map((source) => [source.source_id, source]));
  return [...new Set(sourceIDs)].flatMap((sourceID) => {
    const source = sourceByID.get(sourceID);
    if (!source?.title || !source.publisher || !source.url?.startsWith('https://')) throw new Error(`Scale source is not ready for public display: ${sourceID}`);
    const scope = publicSourceScope(sourceID, tonic, form);
    return scope ? [{ title: source.title, publisher: source.publisher, url: source.url, scope }] : [];
  });
}

function accidentalOffset(accidental: string) {
  return [...accidental].reduce((sum, symbol) => sum + (symbol === '#' ? 1 : -1), 0);
}

function splitSpelling(spelling: string) {
  const match = spelling.match(/^([A-G])(#{1,2}|b{1,2})?$/);
  if (!match) throw new Error(`Unsupported scale spelling: ${spelling}`);
  return { letter: match[1], accidental: match[2] ?? '' };
}

export function midiForScalePitch(spelling: string, octave: number) {
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
  const midi = midiForScalePitch(spelling, octave);
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
    let current = midiForScalePitch(spelling, octave);
    while (current <= previous) {
      octave += 1;
      current = midiForScalePitch(spelling, octave);
    }
    previous = current;
    return pitch(spelling, octave, hand);
  });
}

function descendingPitches(notes: string[], hand: ScaleHand) {
  let octave = hand === 'RH' ? 5 : 4;
  let previous = Number.POSITIVE_INFINITY;
  return notes.map((spelling) => {
    let current = midiForScalePitch(spelling, octave);
    while (current >= previous) {
      octave -= 1;
      current = midiForScalePitch(spelling, octave);
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
  if (midiForScalePitch(spelling, octave) !== value.midi) throw new Error(`Scale pitch mismatch: ${note}`);
  return { ...pitch(spelling, octave, hand), key_color: value.key_color };
}

function blankFingering(): ScaleFingering {
  return {
    RH: { ascending: null, descending: null },
    LH: { ascending: null, descending: null },
  };
}

const notesOnly = 'Notes only - fingering for this form, hand, direction and range has not yet been source-checked.';

function blankFingeringNote(): ScaleFingeringNote {
  return { RH: { ascending: notesOnly, descending: notesOnly }, LH: { ascending: notesOnly, descending: notesOnly } };
}

function optionFromNotes({
  tonic,
  form,
  ascending,
  descending,
  semitoneSteps,
  fingering = blankFingering(),
  detailURL = null,
  sources,
}: {
  tonic: string;
  form: ScaleFormID;
  ascending: string[];
  descending: string[];
  semitoneSteps: number[];
  fingering?: ScaleFingering;
  detailURL?: string | null;
  sources: ScaleSourceReference[];
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
    fingeringNote: blankFingeringNote(),
    detailURL,
    sources,
  };
}

function cMajorOption(data: any, master: { sources: SourceRecord[] }): ScaleOption {
  const fingering: ScaleFingering = {
    RH: { ascending: data.fingering.RH.ascending, descending: data.fingering.RH.descending },
    LH: { ascending: data.fingering.LH.ascending, descending: data.fingering.LH.descending },
  };
  const fingeringNote: ScaleFingeringNote = {
    RH: { ascending: 'Source-documented one-octave row.', descending: 'Source-documented one-octave row.' },
    LH: { ascending: 'Source-documented one-octave row.', descending: 'Source-documented one-octave row.' },
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
    fingeringNote,
    detailURL: '/scales/c-major',
    sources: publicSources(master, [...data.note_source_ids, ...data.fingering.source_ids], 'C', 'major'),
  };
}

function aMinorOptions(data: any, master: { sources: SourceRecord[] }): ScaleOption[] {
  return data.forms.map((form: any) => {
    const fingering: ScaleFingering = {
      RH: { ascending: form.fingering.ascending.right_hand, descending: form.fingering.descending.right_hand },
      LH: { ascending: form.fingering.ascending.left_hand, descending: form.fingering.descending.left_hand },
    };
    const available = 'Source-checked one-octave row.';
    const fingeringNote: ScaleFingeringNote = form.id === 'natural_minor' ? {
      RH: { ascending: available, descending: 'Source checked; the displayed A4-A5 register is an octave adaptation of the source A3-A4 row.' },
      LH: { ascending: available, descending: 'Source-transcribed one-octave row in the same A3-A4 register.' },
    } : {
      RH: { ascending: available, descending: notesOnly },
      LH: { ascending: available, descending: notesOnly },
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
      fingeringNote,
      detailURL: '/scales/a-minor',
      sources: publicSources(master, [...form.source_ids, ...(form.fingering.source_ids ?? [])], 'A', form.id),
    };
  });
}

function keyboardKeys(): PianoKey[] {
  return getLayouts('/keyboard-notes')[0].keys;
}

export function getScalePage(url: keyof typeof blockIDs) {
  const { page, master } = readAuthorizedPage(url);
  validateScaleAuthoringPage(url, page);
  const actual = page.blocks.map((block: { id: string }) => block.id);
  if (actual.join() !== blockIDs[url].join()) throw new Error(`Unknown or missing scale content block: ${url}`);
  const model: ScalePageModel = {
    url,
    title: page.title,
    description: page.description,
    blocks: page.blocks.map((block: { id: string; heading: string; body: string }) => ({ id: block.id, heading: block.heading, body: block.body })),
    copy: SCALE_PAGE_COPY[url],
    metadata: page.metadata,
    provenance: {
      template_id: page.template_id,
      source_groups: page.source_groups.map((group: { id: string }) => group.id),
      source_ids: page.source_ids,
      block_ids: actual,
    },
  };
  return { model, data: page.data, master };
}

export function getScaleCenter() {
  const { model, data, master } = getScalePage('/scales');
  const cData = getScalePage('/scales/c-major').data;
  const aData = getScalePage('/scales/a-minor').data;
  const cOption = cMajorOption(cData, master);
  const aOptions = aMinorOptions(aData, master);
  const major: ScaleOption[] = data.major_overview.map((entry: any) => {
    if (entry.tonic === 'C') return cOption;
    const ascending = [...entry.notes, entry.tonic];
    return optionFromNotes({
      tonic: entry.tonic,
      form: 'major',
      ascending,
      descending: [...ascending].reverse(),
      semitoneSteps: data.form_comparison.find((item: any) => item.id === 'major').steps_semitones,
      sources: publicSources(master, entry.source_ids, entry.tonic, 'major'),
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
      sources: publicSources(master, entry.source_ids, entry.tonic, form),
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
  const { model, data, master } = getScalePage(url);
  if (url === '/scales/c-major') {
    return {
      model,
      options: [cMajorOption(data, master)],
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
    options: aMinorOptions(data, master),
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
