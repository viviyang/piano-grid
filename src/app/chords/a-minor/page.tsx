import {getAMinorContent} from '@/lib/a-minor-content';
import {ChordDetailPage} from '@/components/chords/detail-page';
export function generateMetadata(){const {metadata}=getAMinorContent();return {title:metadata.title,description:metadata.description,alternates:{canonical:metadata.canonical_path},robots:{index:true,follow:true},icons:{icon:'data:,'}};}
export default function Page(){return <ChordDetailPage model={getAMinorContent()}/>;}
