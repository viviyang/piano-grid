import type { Metadata } from 'next';
import { ChordsByKeyPage } from '@/components/support/support-pages';
import { getChordsByKey } from '@/lib/support-content';

const { metadata: pageMetadata } = getChordsByKey().model;

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: { canonical: pageMetadata.canonicalPath },
  robots: { index: true, follow: true },
};

export default ChordsByKeyPage;
