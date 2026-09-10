import { GuideCenterPage } from '@/components/guides/pages';
import { getGuidePage } from '@/lib/guide-content';

const { metadata: meta } = getGuidePage('/guide');
export const metadata = { title: meta.title, description: meta.description, alternates: { canonical: meta.canonicalPath }, robots: { index: false, follow: false } };
export default GuideCenterPage;
