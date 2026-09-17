import type { Metadata } from 'next';
import { SITE_ORIGIN } from '@/lib/site-config';

// Published-page editorial overrides. Original keyword/content sources stay intact.
// B05–B07 TDH candidates live in docs/product-upgrade/b05-b07-v2/data/page-seo.json.
type Copy = { title: string; description: string; h1?: string };
export const SEO_COPY: Record<string, Copy> = {
  '/': { title: 'Learn Piano: Chords, Scales & Practice Tools | PianoGrid', description: 'Explore piano notes, chords, scales, songs, and sheet music. Start playing with beginner guides, blank staff paper, and practical tools on PianoGrid.' },
  '/keyboard-notes': { title: 'Piano Keys and Notes: Find, Hear & Practice | PianoGrid', h1: 'Piano Keys and Notes', description: 'Find a piano note by name and octave, hear it, and try a short note-recognition practice. Explore labeled layouts and printable learning resources.' },
  '/keyboard-notes/labeled': { title: 'Labeled Piano Keys & Printable Practice Pack | PianoGrid', h1: 'Labeled Piano Keys', description: 'Explore labeled 88-key and 61-key piano layouts. Print a C4–C5 reference, white-key worksheet and answer page, then try the matching online practice.' },
  '/keyboard-notes/chart': { title: 'Piano Notes Chart: Staff Notes to Keyboard', h1: 'Piano Notes Chart', description: 'Match treble and bass clef notes to piano keys. Locate middle C and compare note names and octaves across the supported keyboard ranges.' },
  '/keyboard-notes/finger-numbers': { title: 'Piano Finger Numbers: Left & Right Hand Chart', h1: 'Piano Finger Numbers', description: 'Learn finger numbers 1–5 for both hands. Use the hand chart and examples to distinguish fingering from note names, octaves and scale degrees.' },
  '/keyboard-notes/frequencies': { title: 'Piano Note Frequency Chart: A0–C8', description: 'Look up all 88 piano keys by note, MIDI number and calculated frequency in hertz, using A4 = 440 Hz.' },
  '/keyboard-notes/blank': { title: 'Blank Piano Keyboard Worksheet', description: 'Print an unlabeled 13-key or 25-key keyboard segment to write note names, mark a scale or make your own exercise.' },
  '/chords': { title: 'Piano Chord Chart: Notes, Diagrams & Sound', description: 'Find piano chords by name, root or type. See their notes and keyboard positions, hear examples, and open detailed chord and inversion guides.' },
  '/chords/diminished': { title: 'Diminished Chords: Piano Notes, Formula & Inversions | PianoGrid', h1: 'Diminished Chords', description: 'Browse diminished piano triads by root. See notes, the 1–♭3–♭5 formula, keyboard diagrams and detailed inversion pages.' },
  '/chords/augmented': { title: 'Augmented Chords: Piano Notes, Formula & Inversions | PianoGrid', h1: 'Augmented Chords', description: 'Browse augmented piano triads by root. See notes, the 1–3–♯5 formula, keyboard diagrams and detailed inversion pages.' },
  '/chords/suspended': { title: 'Suspended Chords: Sus2 & Sus4 Piano Notes & Inversions | PianoGrid', h1: 'Suspended Chords', description: 'Browse sus2 and sus4 piano chords by root. Compare 1–2–5 with 1–4–5, see keyboard diagrams and detailed inversion pages.' },
  '/chords/add': { title: 'Add9 Chords: Major & Minor Piano Notes & Voicings | PianoGrid', h1: 'Add9 Chords', description: 'Browse 24 major and minor add9 piano chords. Compare notes and two keyboard layouts, practise chord tones, and open printable reference pages.' },
  '/chords/extended': { title: 'Extended Chords: 9th, 11th & 13th Piano Chords | PianoGrid', h1: 'Extended Chords', description: 'Explore ninth, eleventh and thirteenth piano chords. Compare full formulas with explicit voicing examples, hear the notes and practise a selected layout.' },
  '/chords/altered': { title: 'Altered Dominant Chords: Piano Notes, Formulas & Voicings | PianoGrid', h1: 'Altered Dominant Chords', description: 'Compare explicit altered dominant chords on piano. Read changed degrees, hear written-note voicings, check omissions and practise a selected example.' },
  '/scales': { title: 'Piano Scales: Notes, Patterns & Fingering', description: 'Explore major, minor and other piano scales. See their notes and patterns, hear examples, and check available fingering before you practice.' },
  '/songs': { title: 'Piano Songs: Choose a Version to Practice | PianoGrid', h1: 'Piano Songs: Choose Your Next Piece', description: 'Compare piano pieces by edition, playing demands and access. Find a beginner starting point or browse versions for your next practice session.' },
  '/songs/easy': { title: 'Easy Piano Songs & a 10-Minute Practice Plan | PianoGrid', h1: 'Easy Piano Songs for Beginners', description: 'Compare three beginner piano editions, check how to access the music, and start a focused 10-minute plan for one version of Twinkle, Twinkle, Little Star.' },
  '/sheet-music': { title: 'Piano Sheet Music: Find an Edition | PianoGrid', h1: 'Piano Sheet Music', description: 'Find piano sheet music by edition and level. Check the provider, format and access conditions before downloading, printing or starting a practice plan.' },
  '/sheet-music/easy': { title: 'Easy Piano Sheet Music: Compare Editions | PianoGrid', h1: 'Easy Piano Sheet Music', description: 'Compare easy piano sheet-music editions and publisher levels. Check access and preview options, then choose a version for your next practice session.' },
  '/sheet-music/beginner': { title: 'Beginner Piano Sheet Music: Where to Start | PianoGrid', h1: 'Beginner Piano Sheet Music', description: 'Choose beginner piano sheet music by exact edition. Check hand guidance, available previews and access, with links to a focused practice plan.' },
  '/sheet-music/hot-cross-buns': { title: 'Hot Cross Buns Piano Sheet Music: Edition & Access | PianoGrid', h1: 'Hot Cross Buns Piano Sheet Music', description: 'Check Hoffman Academy’s Lesson 1 materials for Hot Cross Buns, including its parent-guide context, external access route and beginner practice links.' },
  '/sheet-music/twinkle-twinkle-little-star': { title: 'Twinkle, Twinkle Piano Sheet Music: Edition & Plan | PianoGrid', h1: 'Twinkle, Twinkle, Little Star Piano Sheet Music', description: 'Check the Early Elementary Twinkle, Twinkle, Little Star edition from Hoffman Academy, its external access requirements and a focused 10-minute practice plan.' },
  '/sheet-music/ode-to-joy': { title: 'Ode to Joy Piano Sheet Music: Edition & Access | PianoGrid', h1: 'Ode to Joy Piano Sheet Music', description: 'Check the Early Elementary Ode to Joy edition from Hoffman Academy. See access conditions and version details before choosing materials for practice.' },
  '/guide': { title: 'How to Play Piano for Beginners: First Steps', description: 'Start with C, D and E, try a four-count pattern, and learn the first steps of reading music. Follow links to piano notes, chords and scale practice.' },
  '/guide/read-sheet-music': { title: 'How to Read Piano Sheet Music: Notes & Rhythm', description: 'Learn how clefs, staff positions and note values connect to piano keys. Use the examples and short checks to begin reading notes and rhythm.' },
  '/guide/piano-chords': { title: 'How to Play Piano Chords: Your First Chord Changes', h1: 'How to Play Piano Chords', description: 'Learn chord symbols and note names, explore hand examples, and follow a C-to-Am change before moving on to chord charts and progressions.' },
  '/guide/piano-scales': { title: 'Piano Scales for Beginners: A Practice Routine', description: 'Choose one piano scale, check its notes and available fingering, then follow a short routine with playback, note checks and printable resources.' },
  '/chords/by-key': { title: 'Piano Chords by Key: Triads & Seventh Chords', description: 'Compare triads and seventh chords in the available keys. Read Roman numerals and chord notes, and distinguish natural-minor from altered options.' },
  '/chord-progressions': { title: 'Piano Chord Progressions: Patterns & Practice', h1: 'Piano Chord Progressions', description: 'Explore piano chord progressions, read Roman numerals and chord notes, and compare the available key examples before practicing each change.' },
  '/chords/finder': { title: 'Piano Chord Finder: Identify Chords from Notes', description: 'Select piano notes to find possible chord names. Compare bass notes and alternative spellings, and see when your notes fall outside the supported library.' },
  '/tools': { title: 'Piano Tools & Printables for Practice | PianoGrid', description: 'Find piano notes, chords and scales, try a listening comparison, or choose a printable reference for your next practice session.' },
  '/tools/blank-sheet-music': { title: 'Blank Piano Sheet Music PDF — Letter & A4 | PianoGrid', h1: 'Blank Piano Sheet Music', description: 'Download free blank piano sheet music with six grand-staff systems. Choose US Letter or A4, preview the page, and print without an account.' },
  '/tools/hear-the-difference': { title: 'Major vs Minor Piano Chords: Hear the Difference | PianoGrid', h1: 'Hear the Difference Between Major and Minor Chords', description: 'Listen to minor and major piano chords, find the one note that changes, and see how raising the third by one semitone changes the chord.' },
  '/arpeggios': { title: 'Piano Arpeggios: C & G Major Notes and Fingering', description: 'Explore C and G major arpeggio notes, compare chord tones with scales, and use the available fingering examples to plan a short practice.' },
};

const STATIC_OG: Record<string, { title: string; description: string; image: string; alt: string }> = {
  '/songs/easy': {
    title: 'A small plan for your next piano session',
    description: 'Five steps for one Early Elementary Twinkle edition. Check the publisher materials, then choose one small practice goal.',
    image: `${SITE_ORIGIN}/assets/social/song-plan-og.png`,
    alt: 'PianoGrid five-step practice plan for one Twinkle edition; materials supplied externally.',
  },
  '/keyboard-notes/labeled': {
    title: 'Piano key names: a printable practice pack',
    description: 'C4–C5 reference, worksheet and answers, with an optional matching online practice.',
    image: `${SITE_ORIGIN}/assets/social/teacher-pack-og.png`,
    alt: 'PianoGrid C4–C5 key-name pack: reference, worksheet, and answers.',
  },
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
  // B04 share cards must stay non-spoiler; keep page-provided social metadata.
  if (url === '/tools/hear-the-difference') {
    return { ...original, title: branded, description };
  }
  const og = STATIC_OG[url];
  if (og) {
    const image = { url: og.image, width: 1200, height: 630, alt: og.alt };
    return {
      ...original,
      title: branded,
      description,
      openGraph: {
        ...original.openGraph,
        title: og.title,
        description: og.description,
        type: 'website',
        url: `${SITE_ORIGIN}${url}`,
        images: [image],
      },
      twitter: {
        ...original.twitter,
        card: 'summary_large_image',
        title: og.title,
        description: og.description,
        images: [og.image],
      },
    };
  }
  return {
    ...original,
    title: branded,
    description,
    twitter: { ...original.twitter, title: branded, description },
    openGraph: { ...original.openGraph, title: branded, description },
  };
}
