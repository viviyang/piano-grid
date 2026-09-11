export const PUBLIC_ROUTES = [
  '/',
  '/tools',
  '/chords',
  '/chords/a-minor',
  '/chords/a-major',
  '/chords/c-major',
  '/chords/g-major',
  '/chords/c-minor',
  '/chords/e-major',
  '/chords/b-major',
  '/chords/a-flat-major',
  '/keyboard-notes',
  '/keyboard-notes/labeled',
  '/keyboard-notes/chart',
  '/scales',
  '/scales/c-major',
  '/scales/a-minor',
  '/songs',
  '/songs/easy',
  '/guide',
  '/guide/read-sheet-music',
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
    ],
  },
  {
    label: 'Chords',
    href: '/chords',
    children: [
      { label: 'A Minor Chord', href: '/chords/a-minor' },
      { label: 'A Major Chord', href: '/chords/a-major' },
      { label: 'C Major Chord', href: '/chords/c-major' },
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
    children: [{ label: 'Read Sheet Music', href: '/guide/read-sheet-music' }],
  },
  {
    label: 'Tools',
    href: '/tools',
    children: [{ label: 'Blank Sheet Music', href: '/tools/blank-sheet-music' }],
  },
] as const satisfies ReadonlyArray<{
  label: string;
  href: PublicRoute;
  children: ReadonlyArray<{ label: string; href: PublicRoute }>;
}>;

const publicRouteSet = new Set<string>(PUBLIC_ROUTES);

export function isPublicRoute(url: string): url is PublicRoute {
  return publicRouteSet.has(url);
}
