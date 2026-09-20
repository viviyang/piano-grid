/** Display-only helpers for the 16-page TDH/value pass. Default consumers stay unchanged. */

export const PAGE_FIX_16 = [
  '/chords/b-7',
  '/chords/a-7',
  '/chords/g-7',
  '/chords/d-7',
  '/chords/e-7',
  '/chords/f-minor',
  '/chords/b-minor',
  '/chords/d-minor',
  '/chords/e-minor',
  '/chords/g-minor',
  '/guide/read-sheet-music',
  '/songs/easy',
  '/songs',
  '/keyboard-notes/labeled',
  '/sheet-music/easy',
  '/sheet-music/beginner',
] as const;

export type PageFix16Url = (typeof PAGE_FIX_16)[number];

export function isPageFix16(url: string): url is PageFix16Url {
  return (PAGE_FIX_16 as readonly string[]).includes(url);
}

export const FINGER_NUMBERS_NOTE =
  'Finger numbers are not included. The diagrams show note positions, not a prescribed hand shape.';

export const RELATED_HEADING = 'Related Chords and Practice';
export const BY_KEY_LABEL = 'Browse chords by key';
