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
export type AMData = {
  url: string; namespace: string; toolId: string; pdf: {url:string;label:string}; rangeLabel: string;
  defaultId: string; options: { value: string; label: string }[];
  chord: { name_en: string; symbol: string; root_spelling: string; note_spellings: string[]; formula_degrees: string[] };
  voicings: Voicing[]; whitePitchClasses: number[];
  microcopy: { loading: string; audio_error: string; audio_unavailable: string; print_error: string; selected_note_summary: string; playback_note: string };
  heading: string; toolHeading: string; printDisclaimer: string;
};
