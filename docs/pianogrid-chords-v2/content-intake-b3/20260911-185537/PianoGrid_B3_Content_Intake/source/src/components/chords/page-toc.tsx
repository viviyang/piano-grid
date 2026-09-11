import './page-toc.css';

const topicPaths={
  keyboard:<><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M8 5v14m8-14v14M6 5v7h4V5m4 0v7h4V5"/></>,
  book:<><path d="M12 6C9 4 5 4 3 5v14c3-1 6-1 9 1 3-2 6-2 9-1V5c-2-1-6-1-9 1v14"/></>,
  compare:<><path d="M5 19V12m7 7V5m7 14V9M3 21h18"/></>,
  layers:<><path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5M3 16l9 5 9-5"/></>,
  print:<><path d="M7 8V3h10v5M7 17H4V9h16v8h-3M7 14h10v7H7z"/></>,
  question:<><circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5m0 3h.01"/></>,
  practice:<><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/></>,
  next:<><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-2 2M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l2-2"/></>,
  sound:<path d="M4 10v4m4-9v14m4-16v18m4-15v12m4-8v4"/>,
};
function topic(id:string):keyof typeof topicPaths {
  if(id.endsWith('intro'))return 'sound';
  if(id.endsWith('print'))return 'print';
  if(id.endsWith('questions'))return 'question';
  if(id.endsWith('next'))return 'next';
  if(id.endsWith('practice'))return 'practice';
  if(id.endsWith('inversions'))return 'layers';
  if(id.endsWith('minor')||id.endsWith('major'))return 'compare';
  if(id.includes('read')||id.includes('example'))return 'book';
  return 'keyboard';
}
export function ChordTopicIcon({id}:{id:string}) {
  return <svg className="ch-topic-icon" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.65" strokeLinecap="round" strokeLinejoin="round">{topicPaths[topic(id)]}</svg>;
}
export function ChordSectionTitle({id,text}:{id:string;text:string}) {
  return <span className="ch-section-title"><span className="ch-topic-badge"><ChordTopicIcon id={id}/></span><span>{text}</span></span>;
}
export function ChordPageToc({items}:{items:ReadonlyArray<{id:string;label:string}>}) {
  return <nav className="ch-page-toc" aria-label="On this page">
    <p className="ch-page-toc-label">On this page</p>
    <ul>{items.map(({id,label})=><li key={id}><a href={`#${id}`}><ChordTopicIcon id={id}/><span>{label}</span></a></li>)}</ul>
  </nav>;
}
