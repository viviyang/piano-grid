export type PlaybackMode = 'together' | 'ascending';
export type PlaybackEvent = { midi: number; frequency_hz: number; onset_ms: number; duration_ms: number };
export type TriadSubtype = 'major' | 'minor' | 'diminished' | 'augmented';
export type SuspendedSubtype = 'sus2' | 'sus4';
export type ThreeNoteSubtype = TriadSubtype | SuspendedSubtype;
export type SeventhSubtype = 'dominant7' | 'major7' | 'minor7' | 'halfDiminished7';
export type AddSubtype = 'add9' | 'minorAdd9';
export type ChordSubtype = ThreeNoteSubtype | SeventhSubtype | AddSubtype;
export type PublishedTriadSubtype = Extract<TriadSubtype, 'major' | 'minor'>;
export type ThreeNoteCategoryRoute = '/chords/major' | '/chords/minor' | '/chords/diminished' | '/chords/augmented' | '/chords/suspended';
export type ThreeNoteCategoryLabel = 'Major Chords' | 'Minor Chords' | 'Diminished Chords' | 'Augmented Chords' | 'Suspended Chords';
export type ChordCategoryRoute = ThreeNoteCategoryRoute | '/chords/seventh' | '/chords/add';
export type ChordCategoryLabel = ThreeNoteCategoryLabel | 'Seventh Chords' | 'Add Chords';
export type ChordPosition = {
  kind: 'root' | 'inversion'; inversionIndex: 0 | 1 | 2 | 3; label: string; bassDegree: string;
};
type ThreeNoteChordDefinitionBase = {
  qualityLabel: string;
  formulaDegrees: string[]; semitonesFromRoot: number[];
  expectedNoteCount: 3; expectedPositionCount: 3;
  positionLabels: string[]; positionBassDegrees: string[];
  categoryRoute: ThreeNoteCategoryRoute;
  categoryLabel: ThreeNoteCategoryLabel;
};
export type ThreeNoteChordDefinition = ThreeNoteChordDefinitionBase & {
  family: 'triad'; subtype: ThreeNoteSubtype; familyLabel: 'Triad';
};
export type PublishedThreeNoteChordDefinition = ThreeNoteChordDefinition & {
  categoryRoute: ThreeNoteCategoryRoute; categoryLabel: ThreeNoteCategoryLabel;
};
export type SeventhChordDefinition = {
  family: 'seventh'; subtype: SeventhSubtype; familyLabel: 'Seventh chord'; qualityLabel: string;
  formulaDegrees: string[]; semitonesFromRoot: number[];
  expectedNoteCount: 4; expectedPositionCount: 4;
  positionLabels: string[]; positionBassDegrees: string[];
  categoryRoute: '/chords/seventh'; categoryLabel: 'Seventh Chords';
};
export type AddChordDefinition = {
  family: 'add'; subtype: AddSubtype; familyLabel: 'Added-note chord'; qualityLabel: string;
  formulaDegrees: string[]; semitonesFromRoot: number[];
  expectedNoteCount: 4; expectedPositionCount: 2;
  exampleLabels: string[];
  categoryRoute: '/chords/add'; categoryLabel: 'Add Chords';
};
export type ChordDefinition = PublishedThreeNoteChordDefinition | SeventhChordDefinition | AddChordDefinition;
export type Voicing = {
  voicing_id: string; inversion_label: string; chord_symbol: string; bass_spelling: string;
  notes_low_to_high: { display_pitch: string; midi: number }[];
  diagram: { highlight_midi: number[]; alt_text: string; keyboard_range_midi: number[] };
  playback: Record<PlaybackMode, PlaybackEvent[]>;
  print_data: { spelled_pitches: string[]; highlight_midi: number[] };
};
export type AddExamplePosition = {kind:'example';exampleIndex:0|1;label:string;bassDegree:'1';notationHint:string};
export type DetailVoicing = Voicing & { position: ChordPosition | AddExamplePosition };
export type Block = { block_id: string; content: {
  heading: string; paragraphs: string[]; steps: string[];
  table: null | { columns: string[]; rows: string[][] };
  links: { label: string; url: string; published: boolean }[];
} };
export type SearchSection = { id: string; heading: string; text: string };
export type ChordQuality = ChordSubtype;
export type ChordDetailData = {
  url: string; namespace: string; toolId: string; pdf: {url:string;label:string}; rangeLabel: string;
  defaultId: string; options: { value: string; label: string }[];
  chord: { id:string; slug:string; name_en: string; symbol: string; root_spelling: string; quality:ChordQuality; note_spellings: string[]; formula_degrees: string[]; definition:ChordDefinition };
  voicings: DetailVoicing[]; whitePitchClasses: number[];
  microcopy: { loading: string; audio_error: string; audio_unavailable: string; print_error: string; selected_note_summary: string; playback_note: string };
  heading: string; toolHeading: string; printDisclaimer: string;
  fingeringStatus: 'verified_examples' | 'not_provided';
  selectorLegend?: string;
  selectorNoun?: string;
  noScriptDescription?: string;
};
export type FingeringExample = {
  id:string;voicingId:string;hand:'right'|'left';notes:string[];fingers:number[];
  scope:string;limitation:string;sourceIds:string[];
  verificationStatus:'source_verified_with_octave_adaptation';
};
export type ChordSource = {
  id:string;title:string;publisher:string;url:string;checkedOn:string;
  supports:string;limitation:string;
};
export type BasicChordPractice = {
  id:'practice';heading:string;prompt:string;scope:string;requiredPitchClassCount:number;
};
export type AddChordPractice = BasicChordPractice & {
  kind:'add';defaultMode:'chordTones';
  modes:[
    {id:'chordTones';label:string;instruction:string;expectedPitchClasses:number[];allowOctaveDoublings:true},
    {id:'matchExample';label:string;instruction:string;samePitchClassesWrongRegisterFeedback:string}
  ];
  midiRange:[number,number];
};
export type ChordPractice = BasicChordPractice | AddChordPractice;
export type ChordDetailModel = {
  metadata:{title:string;description:string;canonical_path:string};
  blocks:Block[];byId:Record<string,Block>;data:ChordDetailData;introduction:string[];answer:string;searchSections:SearchSection[];
  tocItems:{id:string;label:string}[];fingeringExamples:FingeringExample[];sources:ChordSource[];practice:ChordPractice;
};
// Compatibility name for the existing client component while the UI naming remains unchanged.
export type AMData = ChordDetailData;
