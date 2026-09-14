import type { Metadata } from 'next';
import { ArpeggiosPage } from '@/components/scales/pages';
import { getArpeggios } from '@/lib/scale-completion-content';

const { metadata: pageMetadata } = getArpeggios().model;

export const metadata: Metadata = {
  title: pageMetadata.title,
  description: pageMetadata.description,
  alternates: { canonical: pageMetadata.canonical_path },
  robots: { index: true, follow: true },
};

export default ArpeggiosPage;
