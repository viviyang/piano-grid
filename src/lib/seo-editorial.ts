import type { Metadata } from 'next';

// Published-page editorial overrides. Original keyword/content sources stay intact.
// Future Sheet Music copy lives in the plan until its destination is available.
type Copy = { title: string; description: string; h1?: string };
export const SEO_COPY: Record<string, Copy> = {
  '/': { title: 'Learn Piano: Chords, Scales & Practice Tools | PianoGrid', description: 'Explore piano notes, chords, scales, songs, and sheet music. Start playing with beginner guides, blank staff paper, and practical tools on PianoGrid.' },
  '/keyboard-notes': { title: 'Piano Keys and Notes: Names & Keyboard Layout', h1: 'Piano Keys and Notes', description: 'Find piano key names, locate notes by octave, and explore 88-key and 61-key layouts. Start with middle C, then check the black and white keys.' },
  '/keyboard-notes/labeled': { title: 'Labeled Piano Keys: 88-Key & 61-Key Layouts', h1: 'Labeled Piano Keys', description: 'See letter names and octave labels on 88-key and 61-key piano layouts, then use the guide to label the keys on your own keyboard.' },
  '/keyboard-notes/chart': { title: 'Piano Notes Chart: Staff Notes to Keyboard', h1: 'Piano Notes Chart', description: 'Match treble and bass clef notes to piano keys. Locate middle C and compare note names and octaves across the supported keyboard ranges.' },
  '/keyboard-notes/finger-numbers': { title: 'Piano Finger Numbers: Left & Right Hand Chart', h1: 'Piano Finger Numbers', description: 'Learn finger numbers 1–5 for both hands. Use the hand chart and examples to distinguish fingering from note names, octaves and scale degrees.' },
  '/chords': { title: 'Piano Chord Chart: Notes, Diagrams & Sound', description: 'Find piano chords by name, root or type. See their notes and keyboard positions, hear examples, and open detailed chord and inversion guides.' },
  '/scales': { title: 'Piano Scales: Notes, Patterns & Fingering', description: 'Explore major, minor and other piano scales. See their notes and patterns, hear examples, and check available fingering before you practice.' },
  '/songs': { title: 'Piano Songs: Find Your Next Piece to Play', description: 'Explore piano songs by mood, level and playing goal. Compare arrangements and edition details to choose a piece that suits your next practice.' },
  '/songs/easy': { title: 'Easy Piano Songs: Find an Arrangement That Fits', h1: 'Easy Piano Songs', description: 'Compare easy piano song arrangements, beginner options and edition details. Choose a version that matches your current skills and playing goals.' },
  '/guide': { title: 'How to Play Piano for Beginners: First Steps', description: 'Start with C, D and E, try a four-count pattern, and learn the first steps of reading music. Follow links to piano notes, chords and scale practice.' },
  '/guide/read-sheet-music': { title: 'How to Read Piano Sheet Music: Notes & Rhythm', description: 'Learn how clefs, staff positions and note values connect to piano keys. Use the examples and short checks to begin reading notes and rhythm.' },
  '/guide/piano-chords': { title: 'How to Play Piano Chords: Your First Chord Changes', h1: 'How to Play Piano Chords', description: 'Learn chord symbols and note names, explore hand examples, and follow a C-to-Am change before moving on to chord charts and progressions.' },
  '/guide/piano-scales': { title: 'Piano Scales for Beginners: A Practice Routine', description: 'Choose one piano scale, check its notes and available fingering, then follow a short routine with playback, note checks and printable resources.' },
  '/chords/by-key': { title: 'Piano Chords by Key: Triads & Seventh Chords', description: 'Compare triads and seventh chords in the available keys. Read Roman numerals and chord notes, and distinguish natural-minor from altered options.' },
  '/chord-progressions': { title: 'Piano Chord Progressions: Patterns & Practice', h1: 'Piano Chord Progressions', description: 'Explore piano chord progressions, read Roman numerals and chord notes, and compare the available key examples before practicing each change.' },
  '/chords/finder': { title: 'Piano Chord Finder: Identify Chords from Notes', description: 'Select piano notes to find possible chord names. Compare bass notes and alternative spellings, and see when your notes fall outside the supported library.' },
  '/tools': { title: 'Piano Tools & Printables for Practice', description: 'Choose a piano tool for finding chords, checking notes or exploring scales. Find blank staff paper and printable resources for your next practice.' },
  '/tools/blank-sheet-music': { title: 'Blank Piano Sheet Music: A4 & Letter PDF', description: 'Choose A4 or US Letter blank piano staff paper. Preview the grand staffs, then download a PDF or print a page for lessons, notation or composition.' },
  '/arpeggios': { title: 'Piano Arpeggios: C & G Major Notes and Fingering', description: 'Explore C and G major arpeggio notes, compare chord tones with scales, and use the available fingering examples to plan a short practice.' },
};

export function editorialHeading(url: string, original: string): string {
  return SEO_COPY[url]?.h1 ?? original;
}

/** Preserve canonical/indexing and family-specific promises; synchronize social copy. */
export function editorialMetadata(original: Metadata): Metadata {
  const canonical = original.alternates?.canonical;
  if (typeof canonical !== 'string') return original;
  const url = canonical.startsWith('https://') ? new URL(canonical).pathname : canonical;
  const copy = SEO_COPY[url];
  const title = copy?.title ?? original.title;
  const description = (copy?.description ?? original.description)?.replace(/\bthe ([a-g])(?= (?:major|minor|dominant|diminished|augmented|suspended))/g, (_, root: string) => `the ${root.toUpperCase()}`);
  if (typeof title !== 'string' || !description) return original;
  // Long specific titles retain their detail instead of forcing a brand suffix.
  const branded = title.includes('PianoGrid') || title.length > 52 ? title : `${title} | PianoGrid`;
  return { ...original, title: branded, description,
    openGraph: { ...original.openGraph, title: branded, description },
    twitter: { ...original.twitter, title: branded, description },
  };
}
