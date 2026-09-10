import { BlankSheetPage } from '@/components/blank-sheet/pages';
import { getBlankSheetModel } from '@/lib/blank-sheet-content';

const { metadata: meta } = getBlankSheetModel();
export const metadata = { title: meta.title, description: meta.description, alternates: { canonical: meta.canonicalPath }, robots: { index: false, follow: false } };
export default BlankSheetPage;
