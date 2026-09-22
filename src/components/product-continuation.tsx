import {CONTINUATIONS} from '@/lib/product-continuation';
import {ScaleTrackedLink} from './scales/scale-tracked-link';

export function ProductContinuation({path,primaryHref}:{path:string;primaryHref?:string}) {
 const item=CONTINUATIONS[path];if(!item)return null;
 const resolvedPrimaryHref=primaryHref??item.primary.href;
 const links=path==='/chords/finder'
  ? item.secondary
  : [{...item.primary,href:resolvedPrimaryHref},...item.secondary];
 return <aside className="am-content-section" data-product-continuation={path} aria-label="Continue from this reference"><p>{item.reason}</p><div className="am-section-actions">{links.map((link,index)=>path==='/scales/c-major'?<ScaleTrackedLink key={link.href} href={link.href} event="related" className={`am-button ${index?'am-tertiary':'am-primary'}`}>{link.label}</ScaleTrackedLink>:<a key={link.href} className={`am-button ${index?'am-tertiary':'am-primary'}`} href={link.href} data-relation={link.relation}>{link.label}</a>)}</div></aside>;
}
