export type PlaybackMode = 'together' | 'ascending';
export type PlaybackEvent = { midi: number; frequency_hz: number; onset_ms: number; duration_ms: number };
export type Voicing = {
  voicing_id: string; inversion_label: string; chord_symbol: string; bass_spelling: string;
  notes_low_to_high: { display_pitch: string; midi: number }[];
  diagram: { highlight_midi: number[]; alt_text: string; keyboard_range_midi: number[] };
  playback: Record<PlaybackMode, PlaybackEvent[]>;
  print_data: { spelled_pitches: string[]; highlight_midi: number[] };
};
export type Block = { block_id: string; content: {
  heading: string; paragraphs: string[]; steps: string[];
  table: null | { columns: string[]; rows: string[][] };
  links: { label: string; url: string; published: boolean }[];
} };
export type SearchSection = { id: string; heading: string; text: string };
export type ChordQuality = 'major' | 'minor';
export type ChordDetailData = {
  url: string; namespace: string; toolId: string; pdf: {url:string;label:string}; rangeLabel: string;
  defaultId: string; options: { value: string; label: string }[];
  chord: { id:string; slug:string; name_en: string; symbol: string; root_spelling: string; quality:ChordQuality; note_spellings: string[]; formula_degrees: string[] };
  voicings: Voicing[]; whitePitchClasses: number[];
  microcopy: { loading: string; audio_error: string; audio_unavailable: string; print_error: string; selected_note_summary: string; playback_note: string };
  heading: string; toolHeading: string; printDisclaimer: string;
  fingeringStatus: 'verified_examples' | 'not_provided';
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
export type ChordPractice = {
  id:'practice';heading:string;prompt:string;scope:string;
};
export type ChordDetailModel = {
  metadata:{title:string;description:string;canonical_path:string};
  blocks:Block[];byId:Record<string,Block>;data:ChordDetailData;introduction:string[];answer:string;searchSections:SearchSection[];
  tocItems:{id:string;label:string}[];fingeringExamples:FingeringExample[];sources:ChordSource[];practice:ChordPractice;
};
// Compatibility name for the existing client component while the UI naming remains unchanged.
export type AMData = ChordDetailData;
