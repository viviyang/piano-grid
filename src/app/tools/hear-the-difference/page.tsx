import type { Metadata } from 'next';
import { HearTheDifferencePage } from '@/components/hear-the-difference/pages';
import { editorialMetadata } from '@/lib/seo-editorial';
import { SITE_ORIGIN } from '@/lib/site-config';

const TITLE = 'Major vs Minor Piano Chords: Hear the Difference | PianoGrid';
const DESCRIPTION = 'Listen to minor and major piano chords, find the one note that changes, and see how raising the third by one semitone changes the chord.';
const CANONICAL = '/tools/hear-the-difference';
const OG_IMAGE = `${SITE_ORIGIN}/assets/tools/hear-the-difference-og.png`;

export const metadata: Metadata = editorialMetadata({
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: CANONICAL },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'Can you hear the one note that changed?',
    description: 'Two piano chords. One note moves. Listen to the comparison and choose which part changed.',
    type: 'website',
    url: `${SITE_ORIGIN}${CANONICAL}`,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: 'PianoGrid listening challenge preview without the answer' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Can you hear the one note that changed?',
    description: 'Two piano chords. One note moves. Listen to the comparison and choose which part changed.',
    images: [OG_IMAGE],
  },
});

/** Static page: pair/from/source restore on the client so the route can prerender. */
export default function Page() {
  return <HearTheDifferencePage />;
}
