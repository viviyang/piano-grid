import {getChordDetail} from '@/lib/chord-content';
import {ChordDetailPage} from '@/components/chords/detail-page';
export function generateMetadata(){const {metadata}=getChordDetail('/chords/c-major');return {title:metadata.title,description:metadata.description,alternates:{canonical:metadata.canonical_path},robots:{index:true,follow:true}};}
export default function Page(){return <ChordDetailPage model={getChordDetail('/chords/c-major')}/>;}
