import type { ChordCategoryModel } from '@/lib/chord-content';
import { PageBreadcrumb } from '@/components/ui/breadcrumb';
import { ChordSectionTitle } from './page-toc';
import { ChordCategoryExperience } from './category-experience';
import '@/app/chords/a-minor/a-minor.css';
import './shared.css';
import './center.css';
import './category.css';

export function ChordCategoryPage({model}:{model:ChordCategoryModel}) {
  const heading=<header className="am-page-heading" data-block-id="category-intro"><PageBreadcrumb items={[{label:'Chords',href:'/chords'},{label:model.title}]}/><p className="am-eyebrow">Piano chord family</p><h1><ChordSectionTitle id="category-intro" text={model.title}/></h1><p className="am-direct-answer">{model.directAnswer}</p><p className="ch-category-intro">Every card below is present in the initial page HTML. Choose a root to focus the grid, then open a detail page for root position, inversions, sound and print.</p></header>;
  return <ChordCategoryExperience model={model} heading={heading}>
    {model.contentBlocks.map((block,index)=><section className="am-content-section" key={block.heading} id={`category-${index+1}`}><h2>{block.heading}</h2><div className="am-content-body"><p>{block.body}</p></div></section>)}
    <section className="am-content-section" id="category-related"><h2>Keep learning</h2><div className="am-content-body ch-category-links">{model.links.map(link=><a className="am-button am-tertiary" href={link.url} key={link.url}>{link.label}</a>)}</div></section>
  </ChordCategoryExperience>;
}
