import type { Layout, PianoKey } from '@/lib/keyboard-types';

export function keysInMidiRange(layout: Layout, min: number, max: number): PianoKey[] {
  return layout.keys.filter(key => key.midi >= min && key.midi <= max);
}

export function clampRangeStart(layout: Layout, raw: number, whiteSpan: number) {
  const first = layout.keys[0]?.midi ?? 21;
  const last = layout.keys.at(-1)?.midi ?? 108;
  return Math.max(first, Math.min(raw, last - whiteSpan));
}

export function visibleMidiWindow(layout: Layout, rangeStart: number, whiteSpan: number) {
  const rangeMin = Math.max(layout.keys[0]?.midi ?? 21, rangeStart);
  const rangeMax = Math.min(layout.keys.at(-1)?.midi ?? 108, rangeMin + whiteSpan);
  return { rangeMin, rangeMax, keys: keysInMidiRange(layout, rangeMin, rangeMax) };
}

/** Default labeled/explore focus around middle C. */
export function defaultRangeStart(layout: Layout, compact: boolean) {
  const preferred = compact ? 60 : 48;
  return clampRangeStart(layout, preferred, compact ? 12 : 24);
}

export function labeledFullSegments(layout: Layout) {
  if (layout.key_count === 88) {
    const cuts: Array<[number, number, string]> = [
      [21, 35, 'A0–B1'],
      [36, 47, 'C2–B2'],
      [48, 59, 'C3–B3'],
      [60, 71, 'C4–B4'],
      [72, 83, 'C5–B5'],
      [84, 95, 'C6–B6'],
      [96, 108, 'C7–C8'],
    ];
    return cuts
      .map(([min, max, label]) => ({ label, keys: keysInMidiRange(layout, min, max) }))
      .filter(segment => segment.keys.length > 0);
  }
  const cuts: Array<[number, number, string]> = [
    [36, 47, 'C2–B2'],
    [48, 59, 'C3–B3'],
    [60, 71, 'C4–B4'],
    [72, 83, 'C5–B5'],
    [84, 96, 'C6–C7'],
  ];
  return cuts
    .map(([min, max, label]) => ({ label, keys: keysInMidiRange(layout, min, max) }))
    .filter(segment => segment.keys.length > 0);
}

export function printCompactSegments(layout: Layout) {
  const pages = layout.key_count === 88 ? 3 : 2;
  const size = Math.ceil(layout.keys.length / pages);
  return Array.from({ length: pages }, (_, index) => layout.keys.slice(index * size, (index + 1) * size)).filter(segment => segment.length);
}
