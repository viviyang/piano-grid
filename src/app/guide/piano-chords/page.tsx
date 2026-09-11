import type { Metadata } from 'next';
import { PianoChordsGuidePage } from '@/components/support/support-pages';
import { getPianoChordsGuide } from '@/lib/support-content';

const { metadata: pageMetadata } = getPianoChordsGuide().model;

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: { canonical: pageMetadata.canonicalPath },
  robots: { index: true, follow: true },
};

export default PianoChordsGuidePage;
