import { editorialMetadata } from '@/lib/seo-editorial';
import { ScalesCenterPage } from '@/components/scales/pages';
import { getScalePage } from '@/lib/scale-content';

const { metadata: meta } = getScalePage('/scales').model;
export const metadata = editorialMetadata({ title: meta.title, description: meta.description, alternates: { canonical: meta.canonical_path }, robots: { index: true, follow: true } });
export default ScalesCenterPage;
