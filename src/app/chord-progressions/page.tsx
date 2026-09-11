import type { Metadata } from 'next';
import { ChordProgressionsPage } from '@/components/support/support-pages';
import { getChordProgressions } from '@/lib/support-content';

const { metadata: pageMetadata } = getChordProgressions().model;

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: { canonical: pageMetadata.canonicalPath },
  robots: { index: true, follow: true },
};

export default ChordProgressionsPage;
