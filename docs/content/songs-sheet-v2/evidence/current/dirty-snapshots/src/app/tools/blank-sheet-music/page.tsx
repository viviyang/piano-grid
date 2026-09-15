import { BlankSheetPage } from '@/components/blank-sheet/pages';
import { getBlankSheetModel } from '@/lib/blank-sheet-content';

const { metadata: meta } = getBlankSheetModel();
export const metadata = { title: meta.title, description: meta.description, alternates: { canonical: meta.canonicalPath }, robots: { index: true, follow: true } };
export default BlankSheetPage;
