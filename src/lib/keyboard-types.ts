export type PianoKey = { key_id: string; midi: number; color: 'white'|'black'; default_label: string; label_with_octave: string; lookup_spellings: string[]; white_key_index: number|null; black_key_between_white_indices: number[]|null };
export type Segment = { label: string; midi_range: number[] };
export type Layout = { layout_id: string; label: string; lowest_note: string; highest_note: string; key_count: number; white_key_count: number; black_key_count: number; keys: PianoKey[]; reading_segments: Segment[]; scope_note: string };
export type StaffNote = { note: string; midi: number; clef: 'treble'|'bass'; accidental: string|null; staff_step_from_bottom_line: number; ledger_line_steps: number[] };
export type ChartKey = { midi: number; color: 'white'|'black'; display_names: string[]; staff_spellings: { name: string; treble: StaffNote; bass: StaffNote }[] };
export type ReadingBlock = { id: string; heading: string; body: string };
export type KeyboardPageModel = { url: string; title: string; description: string; blocks: ReadingBlock[]; links: {url:string;label:string}[]; metadata: {title:string;description:string;canonical_path:string}; provenance: {template_id:string;source_groups:string[];source_ids:string[];block_ids:string[]} };
