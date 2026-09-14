import { CompletionCategoryPage } from '@/components/chords/completion-category';
import { getCompletionCategory } from '@/lib/chord-completion-content';
const model = getCompletionCategory('extended');
export function generateMetadata(){return {title:model.title,description:model.description,alternates:{canonical:model.canonicalPath},robots:{index:true,follow:true}};}
export default function Page(){return <CompletionCategoryPage model={model}/>;}
