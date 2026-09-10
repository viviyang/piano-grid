import { ScalesCenterPage } from '@/components/scales/pages';
import { getScalePage } from '@/lib/scale-content';

const { metadata: meta } = getScalePage('/scales').model;
export const metadata = { title: meta.title, description: meta.description, alternates: { canonical: meta.canonical_path }, robots: { index: false, follow: false } };
export default ScalesCenterPage;
