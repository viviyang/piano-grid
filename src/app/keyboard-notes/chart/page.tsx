import {KeyboardChartPage} from '@/components/keyboard-notes/pages';
import {getKeyboardPage} from '@/lib/keyboard-content';
const {metadata:meta}=getKeyboardPage('/keyboard-notes/chart').model;
export const metadata={title:meta.title,description:meta.description,alternates:{canonical:meta.canonical_path},robots:{index:false,follow:false}};
export default KeyboardChartPage;
