import type { Metadata } from 'next';
import { SITE_ORIGIN } from './site-config';
import type { ChordDetailModel } from './a-minor-types';
import { CHORD_DETAIL_SEO_COPY, type ChordDetailSeoCopy } from './chord-detail-seo-copy';
import { BY_KEY_LABEL, FINGER_NUMBERS_NOTE, isPageFix16, RELATED_HEADING } from './page-fix-16';

export type { ChordDetailSeoCopy };
type Copy = ChordDetailSeoCopy;
export const SEO_COPY: Record<string, Copy> = {
  ...CHORD_DETAIL_SEO_COPY,
  '/': { title: 'Learn Piano: Chords, Scales & Practice Tools | PianoGrid', description: 'Explore piano notes, chords, scales, songs, and sheet music. Start playing with beginner guides, blank staff paper, and practical tools on PianoGrid.' },
  '/keyboard-notes': { title: 'Piano Keys and Notes: Find, Hear & Practice | PianoGrid', h1: 'Piano Keys and Notes', description: 'Find a piano note by name and octave, hear it, and try a short note-recognition practice. Explore labeled layouts and printable learning resources.' },
  '/keyboard-notes/labeled': {
    title: 'Piano Keyboard Keys Labeled – Note Names & Layout | PianoGrid',
    h1: 'Piano Keyboard Keys Labeled',
    description: 'See piano keyboard keys labeled with note names, find middle C, understand black and white keys, and print a reference or practice worksheet.',
    intro: 'Find the note names on a piano keyboard, starting with the repeating groups of two and three black keys. Use the labeled layout, then try the white-key worksheet.',
    h2: {
      'Read letters and octave labels': 'White-Key Names',
      'Where to start on the 61-key example': 'How Notes Repeat Across the Keyboard',
    },
  },
  '/keyboard-notes/chart': { title: 'Piano Notes Chart: Staff Notes to Keyboard', h1: 'Piano Notes Chart', description: 'Match treble and bass clef notes to piano keys. Locate middle C and compare note names and octaves across the supported keyboard ranges.' },
  '/keyboard-notes/finger-numbers': { title: 'Piano Finger Numbers: Left & Right Hand Chart', h1: 'Piano Finger Numbers', description: 'Learn finger numbers 1–5 for both hands. Use the hand chart and examples to distinguish fingering from note names, octaves and scale degrees.' },
  '/keyboard-notes/frequencies': { title: 'Piano Note Frequency Chart: A0–C8', description: 'Look up all 88 piano keys by note, MIDI number and calculated frequency in hertz, using A4 = 440 Hz.' },
  '/keyboard-notes/blank': { title: 'Blank Piano Keyboard Worksheet', description: 'Print an unlabeled 13-key or 25-key keyboard segment to write note names, mark a scale or make your own exercise.' },
  '/chords': { title: 'Piano Chord Chart: Notes, Diagrams & Sound', description: 'Find piano chords by name, root or type. See their notes and keyboard positions, hear examples, and open detailed chord and inversion guides.' },
  '/chords/b-minor': {
    title: 'B Minor Chord – Piano Notes & Inversions | PianoGrid',
    h1: 'B Minor Chord',
    description: 'Learn the B minor chord on piano: B, D and F♯. See the keyboard diagram and two inversions, hear the notes, and download a printable reference.',
    intro: 'The B minor chord (Bm) contains B, D and F♯. Use the piano diagram to find the notes and compare root position with two inversions.',
    fingering: 'Finger numbers are not included. The diagrams show note positions, not a prescribed hand shape.',
    h2: {
      'B minor keyboard and inversions': 'B Minor Chord Notes and Keyboard Diagram',
      'Chord & positions': 'B Minor Chord Notes and Keyboard Diagram',
      'How the B Minor chord is built': 'How the B Minor Chord Is Built',
      'Root position and inversions': 'B Minor Chord Inversions',
      'Questions about this chord': 'Questions About B Minor',
      'Build Bm on the keyboard': 'Build Bm on the Keyboard',
      'Print this chord reference': 'Print the B Minor Chord Reference',
      'Related chord references': 'Related Chords and Practice',
      'Fingering is not provided for this reference': 'Playing the B Minor Chord',
    },
  },
  '/chords/d-minor': {
    title: 'D Minor Chord – Piano Notes & Inversions | PianoGrid',
    h1: 'D Minor Chord',
    description: 'Learn the D minor chord on piano: D, F and A. See the keyboard diagram and two inversions, hear the notes, and download a printable reference.',
    intro: 'The D minor chord (Dm) contains D, F and A. Use the piano diagram to find the notes and compare root position with two inversions.',
    fingering: 'Finger numbers are not included. The diagrams show note positions, not a prescribed hand shape.',
    h2: {
      'D minor keyboard and inversions': 'D Minor Chord Notes and Keyboard Diagram',
      'Chord & positions': 'D Minor Chord Notes and Keyboard Diagram',
      'How the D Minor chord is built': 'How the D Minor Chord Is Built',
      'Root position and inversions': 'D Minor Chord Inversions',
      'Questions about this chord': 'Questions About D Minor',
      'Build Dm on the keyboard': 'Build Dm on the Keyboard',
      'Print this chord reference': 'Print the D Minor Chord Reference',
      'Related chord references': 'Related Chords and Practice',
      'Fingering is not provided for this reference': 'Playing the D Minor Chord',
    },
  },
  '/chords/e-minor': {
    title: 'E Minor Chord – Piano Notes & Inversions | PianoGrid',
    h1: 'E Minor Chord',
    description: 'Learn the E minor chord on piano: E, G and B. See the keyboard diagram and two inversions, hear the notes, and download a printable reference.',
    intro: 'The E minor chord (Em) contains E, G and B. Use the piano diagram to find the notes and compare root position with two inversions.',
    fingering: 'Finger numbers are not included. The diagrams show note positions, not a prescribed hand shape.',
    h2: {
      'E minor keyboard and inversions': 'E Minor Chord Notes and Keyboard Diagram',
      'Chord & positions': 'E Minor Chord Notes and Keyboard Diagram',
      'How the E Minor chord is built': 'How the E Minor Chord Is Built',
      'Root position and inversions': 'E Minor Chord Inversions',
      'Questions about this chord': 'Questions About E Minor',
      'Build Em on the keyboard': 'Build Em on the Keyboard',
      'Print this chord reference': 'Print the E Minor Chord Reference',
      'Related chord references': 'Related Chords and Practice',
      'Fingering is not provided for this reference': 'Playing the E Minor Chord',
    },
  },
  '/chords/g-minor': {
    title: 'G Minor Chord – Piano Notes & Inversions | PianoGrid',
    h1: 'G Minor Chord',
    description: 'Learn the G minor chord on piano: G, B♭ and D. See the keyboard diagram and two inversions, hear the notes, and download a printable reference.',
    intro: 'The G minor chord (Gm) contains G, B♭ and D. Use the piano diagram to find the notes and compare root position with two inversions.',
    fingering: 'Finger numbers are not included. The diagrams show note positions, not a prescribed hand shape.',
    h2: {
      'G minor keyboard and inversions': 'G Minor Chord Notes and Keyboard Diagram',
      'Chord & positions': 'G Minor Chord Notes and Keyboard Diagram',
      'How the G Minor chord is built': 'How the G Minor Chord Is Built',
      'Root position and inversions': 'G Minor Chord Inversions',
      'Questions about this chord': 'Questions About G Minor',
      'Build Gm on the keyboard': 'Build Gm on the Keyboard',
      'Print this chord reference': 'Print the G Minor Chord Reference',
      'Related chord references': 'Related Chords and Practice',
      'Fingering is not provided for this reference': 'Playing the G Minor Chord',
    },
  },
  '/chords/f-minor': {
    title: 'F Minor Chord – Piano Notes & Inversions | PianoGrid',
    h1: 'F Minor Chord',
    description: 'Learn the F minor chord on piano: F, A♭ and C. See the keyboard diagram and two inversions, hear the notes, and download a printable reference.',
    intro: 'The F minor chord (Fm) contains F, A♭ and C. Use the piano diagram to find the notes and compare root position with two inversions.',
    fingering: 'Finger numbers are not included. The diagrams show note positions, not a prescribed hand shape.',
    h2: {
      'F minor keyboard and inversions': 'F Minor Chord Notes and Keyboard Diagram',
      'Chord & positions': 'F Minor Chord Notes and Keyboard Diagram',
      'How the F Minor chord is built': 'How the F Minor Chord Is Built',
      'Root position and inversions': 'F Minor Chord Inversions',
      'Questions about this chord': 'Questions About F Minor',
      'Build Fm on the keyboard': 'Build Fm on the Keyboard',
      'Print this chord reference': 'Print the F Minor Chord Reference',
      'Related chord references': 'Related Chords and Practice',
      'Fingering is not provided for this reference': 'Playing the F Minor Chord',
    },
  },
  '/chords/diminished': { title: 'Diminished Chords: Piano Notes, Formula & Inversions | PianoGrid', h1: 'Diminished Chords', description: 'Browse diminished piano triads by root. See notes, the 1–♭3–♭5 formula, keyboard diagrams and detailed inversion pages.' },
  '/chords/augmented': { title: 'Augmented Chords: Piano Notes, Formula & Inversions | PianoGrid', h1: 'Augmented Chords', description: 'Browse augmented piano triads by root. See notes, the 1–3–♯5 formula, keyboard diagrams and detailed inversion pages.' },
  '/chords/suspended': { title: 'Suspended Chords: Sus2 & Sus4 Piano Notes & Inversions | PianoGrid', h1: 'Suspended Chords', description: 'Browse sus2 and sus4 piano chords by root. Compare 1–2–5 with 1–4–5, see keyboard diagrams and detailed inversion pages.' },
  '/chords/add': { title: 'Add9 Chords: Major & Minor Piano Notes & Voicings | PianoGrid', h1: 'Add9 Chords', description: 'Browse 24 major and minor add9 piano chords. Compare notes and two keyboard layouts, practise chord tones, and open printable reference pages.' },
  '/chords/extended': { title: 'Extended Chords: 9th, 11th & 13th Piano Chords | PianoGrid', h1: 'Extended Chords', description: 'Explore ninth, eleventh and thirteenth piano chords. Compare full formulas with explicit voicing examples, hear the notes and practise a selected layout.' },
  '/chords/altered': { title: 'Altered Dominant Chords: Piano Notes, Formulas & Voicings | PianoGrid', h1: 'Altered Dominant Chords', description: 'Compare explicit altered dominant chords on piano. Read changed degrees, hear written-note voicings, check omissions and practise a selected example.' },
  '/scales': { title: 'Piano Scales: Notes, Patterns & Fingering', description: 'Explore major, minor and other piano scales. See their notes and patterns, hear examples, and check available fingering before you practice.' },
  '/songs': {
    title: 'Piano Songs to Learn – Find Your Next Piece | PianoGrid',
    h1: 'Piano Songs to Learn',
    description: 'Find piano songs to learn, compare skill levels and practice goals, and follow links to learning plans and clearly identified sheet music editions.',
    intro: 'Find your next piano piece by comparing the published level, playing goal and access options of a specific edition. For a first session, start with the easy-song selection.',
    h2: {
      'Looking for a place to start?': 'Piano Songs for Beginners',
      'Choose a checked edition': 'Choose a Piano Song to Learn',
    },
  },
  '/songs/easy': {
    title: 'Easy Piano Songs for Beginners – Songs to Learn | PianoGrid',
    h1: 'Easy Piano Songs for Beginners',
    description: 'Choose easy piano songs for beginners, compare specific editions and access options, and use a short practice plan to get started.',
    intro: 'Choose one piece and one small goal for your next practice session. Compare the named editions below, check how to get the music, and follow a starting plan.',
    h2: {
      'Choose a starting point': 'Easy Piano Songs to Start With',
      'Your first 10 minutes': 'Practice an Easy Piano Song',
      'Understand your starting point': 'How to Choose Your First Piano Song',
    },
  },
  '/sheet-music': { title: 'Piano Sheet Music: Find an Edition | PianoGrid', h1: 'Piano Sheet Music', description: 'Find piano sheet music by edition and level. Check the provider, format and access conditions before downloading, printing or starting a practice plan.' },
  '/sheet-music/easy': {
    title: 'Easy Piano Sheet Music: Compare Editions | PianoGrid',
    h1: 'Easy Piano Sheet Music',
    description: 'Compare easy piano sheet music editions, publisher levels and access options. Find a suitable version and get the score from its publisher.',
    intro: 'Compare easy piano sheet music by the exact edition, publisher level and access format. Open edition details here, then get the score from its publisher.',
  },
  '/sheet-music/beginner': {
    title: 'Beginner Piano Sheet Music: Where to Start | PianoGrid',
    h1: 'Beginner Piano Sheet Music',
    description: 'Find beginner piano sheet music with clear edition and access details. Choose a first piece and use note-reading help before you start.',
    intro: 'Start with one beginner edition and check how to get its score. Use the reading and keyboard references when a note or symbol is unfamiliar.',
  },
  '/sheet-music/hot-cross-buns': { title: 'Hot Cross Buns Piano Sheet Music: Edition & Access | PianoGrid', h1: 'Hot Cross Buns Piano Sheet Music', description: 'Check Hoffman Academy’s Lesson 1 materials for Hot Cross Buns, including its parent-guide context, external access route and beginner practice links.' },
  '/sheet-music/twinkle-twinkle-little-star': { title: 'Twinkle, Twinkle Piano Sheet Music: Edition & Plan | PianoGrid', h1: 'Twinkle, Twinkle, Little Star Piano Sheet Music', description: 'Check the Early Elementary Twinkle, Twinkle, Little Star edition from Hoffman Academy, its external access requirements and a focused 10-minute practice plan.' },
  '/sheet-music/ode-to-joy': { title: 'Ode to Joy Piano Sheet Music: Edition & Access | PianoGrid', h1: 'Ode to Joy Piano Sheet Music', description: 'Check the Early Elementary Ode to Joy edition from Hoffman Academy. See access conditions and version details before choosing materials for practice.' },
  '/guide': { title: 'How to Play Piano for Beginners: First Steps', description: 'Start with C, D and E, try a four-count pattern, and learn the first steps of reading music. Follow links to piano notes, chords and scale practice.' },
  '/guide/read-sheet-music': {
    title: 'How to Read Sheet Music for Piano – Beginner Guide | PianoGrid',
    h1: 'How to Read Sheet Music for Piano',
    description: 'Learn how to read sheet music for piano with staff and keyboard examples, note values, rests, and a short reading exercise with answers.',
    intro: 'Start with the clef, find the note on the staff, match it to a piano key, and count its length. Then put the steps together in a short reading exercise.',
    h2: {
      'Read in a useful order': 'Piano Sheet Music Basics',
      'Use anchors, then count steps': 'Treble Clef and Bass Clef',
      'FACE has a specific job': 'How to Read Notes on the Staff',
      'Check yourself': 'Practice Reading Piano Sheet Music',
    },
  },
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

export function editorialIntro(url: string, fallback: string): string {
  return SEO_COPY[url]?.intro ?? fallback;
}

export function editorialSectionHeading(url: string, original: string): string {
  if (isPageFix16(url) && original === 'Related chord references') return RELATED_HEADING;
  return SEO_COPY[url]?.h2?.[original] ?? original;
}

const ENGINEERING_FINGERING = /No independently authorized fingering dataset is provided|No independent fingering dataset is authorized/;
const PLAIN_FINGERING = 'Fingerings are not included on this page. The diagram shows note positions, not a prescribed hand shape.';

function replaceEngineeringFingering(paragraphs: string[], url: string): string[] {
  const plain = isPageFix16(url) ? FINGER_NUMBERS_NOTE : PLAIN_FINGERING;
  return paragraphs.map((paragraph) => (ENGINEERING_FINGERING.test(paragraph) ? plain : paragraph));
}

function relatedLinksFor(url: string, links: ChordDetailModel['blocks'][number]['content']['links']) {
  if (!isPageFix16(url)) return links;
  return links.map((link) => (link.url === '/chords/by-key' ? { ...link, label: BY_KEY_LABEL } : link));
}

export function applyEditorialChordCopy(model: ChordDetailModel): ChordDetailModel {
  const url = model.data.url;
  const copy = SEO_COPY[url];
  if (!copy) {
    let changed = false;
    const blocks = model.blocks.map((block) => {
      if (!block.block_id.endsWith('-fingering-example')) return block;
      const paragraphs = replaceEngineeringFingering(block.content.paragraphs, url);
      if (paragraphs.every((paragraph, index) => paragraph === block.content.paragraphs[index])) return block;
      changed = true;
      return { ...block, content: { ...block.content, paragraphs } };
    });
    if (!changed) return model;
    return {
      ...model,
      blocks,
      byId: Object.fromEntries(blocks.map((block) => [block.block_id, block])),
      searchSections: model.searchSections.map((section) => {
        const block = blocks.find((item) => item.block_id === section.id);
        return block ? { ...section, text: JSON.stringify(block.content) } : section;
      }),
    };
  }
  const heading = editorialHeading(url, model.data.heading);
  const mapHeading = (value: string) => editorialSectionHeading(url, value);
  const toolHeading = mapHeading(model.data.toolHeading);
  const blocks = model.blocks.map((block) => {
    let content = { ...block.content, heading: mapHeading(block.content.heading) };
    if (copy.theory && block.block_id.endsWith('-intro') && content.paragraphs.length > 0) {
      content = { ...content, paragraphs: [copy.theory, ...content.paragraphs.slice(1)] };
    }
    if (block.block_id.endsWith('-fingering-example') && content.paragraphs.length > 0) {
      const fingering = copy.fingering
        ? [copy.fingering, ...content.paragraphs.slice(1)]
        : replaceEngineeringFingering(content.paragraphs, url);
      content = { ...content, paragraphs: fingering };
    }
    if (copy.keyboardHelp && block.block_id === model.data.toolId) {
      content = { ...content, paragraphs: [...content.paragraphs, copy.keyboardHelp] };
    }
    if (copy.faq && block.block_id.endsWith('-questions') && content.table) {
      content = { ...content, table: { ...content.table, rows: copy.faq.map((item) => [item.q, item.a]) } };
    }
    if (block.block_id.endsWith('-related')) {
      content = { ...content, links: relatedLinksFor(url, content.links) };
    }
    return { ...block, content };
  });
  return {
    ...model,
    answer: copy.intro ?? model.answer,
    data: { ...model.data, heading, toolHeading },
    blocks,
    byId: Object.fromEntries(blocks.map((block) => [block.block_id, block])),
    searchSections: model.searchSections.map((section) => {
      const block = blocks.find((item) => item.block_id === section.id);
      return {
        ...section,
        heading: mapHeading(section.heading),
        text: block ? JSON.stringify(block.content) : section.text,
      };
    }),
    tocItems: model.tocItems.map((item) => ({ ...item, label: mapHeading(item.label) })),
    practice: { ...model.practice, heading: mapHeading(model.practice.heading) },
  };
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
