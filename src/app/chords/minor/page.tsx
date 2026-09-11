import { ChordCategoryPage } from '@/components/chords/category-page';
import { getChordCategory } from '@/lib/chord-content';
export function generateMetadata(){const {metadata}=getChordCategory('minor');return {title:metadata.title,description:metadata.description,alternates:{canonical:metadata.canonical_path},robots:{index:true,follow:true}};}
export default function Page(){return <ChordCategoryPage model={getChordCategory('minor')}/>;}
