import type { PlaybackEvent } from './a-minor-types';

export type ExerciseEvent = { measure: number; onset_quarters: number; duration_quarters: number; pitch: string; midi: number; hand: string };
export type ExerciseEventFile = {
  arrangement_id: string;
  tempo_bpm: number;
  measure_count: number;
  events: ExerciseEvent[];
  segments: Array<{ id: 'all' | 'bars-1-2' | 'bars-3-4'; start_measure: number; end_measure: number }>;
};

export function prepareExerciseEvents(source: ExerciseEventFile, segmentID: string, speedPercent: 50 | 75 | 100): PlaybackEvent[] {
  const segment = source.segments.find((item) => item.id === segmentID);
  if (!segment) throw new Error(`Unknown exercise segment: ${segmentID}`);
  const selected = source.events.filter((event) => event.measure >= segment.start_measure && event.measure <= segment.end_measure);
  if (!selected.length) throw new Error(`Empty exercise segment: ${segmentID}`);
  const startQuarter = Math.min(...selected.map((event) => event.onset_quarters));
  const quarterMs = 60_000 / (source.tempo_bpm * speedPercent / 100);
  return selected.map((event) => ({
    midi: event.midi,
    frequency_hz: 440 * 2 ** ((event.midi - 69) / 12),
    onset_ms: (event.onset_quarters - startQuarter) * quarterMs,
    duration_ms: Math.max(80, event.duration_quarters * quarterMs * .9),
  }));
}
