export const PUBLIC_ROUTES = [
  '/',
  '/tools',
  '/chords',
  '/chords/major',
  '/chords/minor',
  '/chords/a-minor',
  '/chords/a-major',
  '/chords/c-major',
  '/chords/g-major',
  '/chords/c-minor',
  '/chords/e-major',
  '/chords/b-major',
  '/chords/a-flat-major',
  '/chords/c-flat-major',
  '/chords/f-major',
  '/chords/d-minor',
  '/chords/e-minor',
  '/chords/d-major',
  '/chords/b-minor',
  '/chords/f-sharp-minor',
  '/chords/c-sharp-minor',
  '/chords/g-sharp-minor',
  '/chords/b-flat-major',
  '/chords/g-minor',
  '/chords/d-flat-major',
  '/chords/e-flat-major',
  '/chords/f-sharp-major',
  '/chords/f-minor',
  '/chords/b-flat-minor',
  '/chords/e-flat-minor',
  '/chords/by-key',
  '/chords/finder',
  '/chord-progressions',
  '/keyboard-notes',
  '/keyboard-notes/labeled',
  '/keyboard-notes/chart',
  '/keyboard-notes/finger-numbers',
  '/scales',
  '/scales/c-major',
  '/scales/a-minor',
  '/songs',
  '/songs/easy',
  '/guide',
  '/guide/read-sheet-music',
  '/guide/piano-chords',
  '/tools/blank-sheet-music',
] as const;

export type PublicRoute = (typeof PUBLIC_ROUTES)[number];

export const SITE_NAVIGATION = [
  {
    label: 'Keyboard Notes',
    href: '/keyboard-notes',
    children: [
      { label: 'Labeled Keyboard', href: '/keyboard-notes/labeled' },
      { label: 'Piano Notes Chart', href: '/keyboard-notes/chart' },
      { label: 'Finger Numbers', href: '/keyboard-notes/finger-numbers' },
    ],
  },
  {
    label: 'Chords',
    href: '/chords',
    children: [
      { label: 'Major Chords', href: '/chords/major', group: 'Browse' },
      { label: 'Minor Chords', href: '/chords/minor', group: 'Browse' },
      { label: 'Chords by Key', href: '/chords/by-key', group: 'Explore' },
      { label: 'Chord Progressions', href: '/chord-progressions', group: 'Explore' },
      { label: 'Chord Finder', href: '/chords/finder', group: 'Explore' },
      { label: 'Piano Chord Guide', href: '/guide/piano-chords', group: 'Learn' },
      { label: 'Finger Numbers', href: '/keyboard-notes/finger-numbers', group: 'Learn' },
    ],
  },
  {
    label: 'Scales',
    href: '/scales',
    children: [
      { label: 'C Major Scale', href: '/scales/c-major' },
      { label: 'A Minor Scale', href: '/scales/a-minor' },
    ],
  },
  {
    label: 'Songs',
    href: '/songs',
    children: [{ label: 'Easy Piano Songs', href: '/songs/easy' }],
  },
  {
    label: 'Guide',
    href: '/guide',
    children: [
      { label: 'Read Sheet Music', href: '/guide/read-sheet-music' },
      { label: 'Piano Chords', href: '/guide/piano-chords' },
    ],
  },
  {
    label: 'Tools',
    href: '/tools',
    children: [{ label: 'Blank Sheet Music', href: '/tools/blank-sheet-music' }],
  },
] as const satisfies ReadonlyArray<{
  label: string;
  href: PublicRoute;
  children: ReadonlyArray<{ label: string; href: PublicRoute; group?: 'Browse' | 'Explore' | 'Learn' }>;
}>;

const publicRouteSet = new Set<string>(PUBLIC_ROUTES);

export function isPublicRoute(url: string): url is PublicRoute {
  return publicRouteSet.has(url);
}
