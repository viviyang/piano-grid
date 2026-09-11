import type { Metadata } from 'next';
import { FingerNumbersPage } from '@/components/support/support-pages';
import { getFingerNumbersReference } from '@/lib/support-content';

const { metadata: pageMetadata } = getFingerNumbersReference().model;

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: { canonical: pageMetadata.canonicalPath },
  robots: { index: true, follow: true },
};

export default FingerNumbersPage;
