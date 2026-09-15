import { editorialMetadata } from '@/lib/seo-editorial';
import type { Metadata } from 'next';
import { PianoScalesGuidePage } from '@/components/scales/scale-guide-page';

export const metadata: Metadata = editorialMetadata({
  title: 'Piano Scales for Beginners: A Simple Practice Routine | PianoGrid',
  description: 'Start with one piano scale, check its notes and fingering, then use a short practice routine with guided playback, note checks and printable references.',
  alternates: { canonical: '/guide/piano-scales' },
  robots: { index: true, follow: true },
});

export default PianoScalesGuidePage;
