import type { ChordCategoryModel } from '@/lib/chord-content';
import { editorialHeading } from '@/lib/seo-editorial';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { ChordSectionTitle } from './page-toc';
import { ChordCategoryExperience } from './category-experience';
import { SupplementIndex } from './supplement-index';
import '@/app/chords/a-minor/a-minor.css';
import './shared.css';
import './center.css';
import './category.css';

export function ChordCategoryPage({model}:{model:ChordCategoryModel}) {
  const headingText=editorialHeading(model.url, model.title);
  const heading=<header className="am-page-heading" data-block-id="category-intro"><PageBreadcrumb items={[{label:'Chords',href:'/chords'},{label:headingText}]}/><p className="am-eyebrow">Piano chord family</p><h1><ChordSectionTitle id="category-intro" text={headingText}/></h1><p className="am-direct-answer">{model.directAnswer}</p><p className="ch-category-intro">Choose a root and chord type, then open a chord to see its notes, hear it and explore inversions.</p></header>;
  const {url,quality,items,rootOrder,familySubtypes,contentBlocks,whitePitchClasses}=model;
  return <ChordCategoryExperience model={{url,quality,items,rootOrder,familySubtypes,contentBlocks,whitePitchClasses}} heading={heading}>
    {model.contentBlocks.map((block,index)=><section className="am-content-section" key={block.heading} id={`category-${index+1}`} aria-labelledby={`category-${index+1}-heading`}><h2 id={`category-${index+1}-heading`}>{block.heading}</h2><div className="am-content-body"><p>{block.body}</p></div></section>)}
    <SupplementIndex route={model.url}/>
    <section className="am-content-section" id="category-related" aria-labelledby="category-related-heading"><h2 id="category-related-heading">Keep learning</h2><nav className="am-content-body ch-category-links" aria-label="Related chord references">{model.links.map(link=><a className="am-button am-tertiary" href={link.url} key={link.url}>{link.label}</a>)}</nav></section>
  </ChordCategoryExperience>;
}
