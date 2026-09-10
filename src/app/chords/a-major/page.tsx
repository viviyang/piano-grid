import {getChordDetail} from '@/lib/chord-content';
import {ChordDetailPage} from '@/components/chords/detail-page';
export function generateMetadata(){const {metadata}=getChordDetail('/chords/a-major');return {title:metadata.title,description:metadata.description,alternates:{canonical:metadata.canonical_path},robots:{index:false,follow:false},icons:{icon:'data:,'}};}
export default function Page(){return <ChordDetailPage model={getChordDetail('/chords/a-major')}/>;}
