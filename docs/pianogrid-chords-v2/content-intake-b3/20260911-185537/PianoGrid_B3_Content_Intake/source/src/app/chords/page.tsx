import {getChordCenter} from '@/lib/chord-content';
import {ChordCenterPage} from '@/components/chords/center-page';
export function generateMetadata(){const {metadata}=getChordCenter();return {title:metadata.title,description:metadata.description,alternates:{canonical:metadata.canonical_path},robots:{index:true,follow:true}};}
export default function Page(){return <ChordCenterPage model={getChordCenter()}/>;}
