import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { locallyAvailableURLs, readAuthorizedPage, sourceAssetPath } from './site-content';
import type { Destination, HomeModel, IntegrationBlock, IntegrationPageModel, ToolDestination, ToolResource, ToolsModel } from './integration-types';

const blockIDs: Record<string, string[]> = { '/': ['tasks','three-notes','editions'], '/tools': ['jobs','printables'] };
const toolsPackPath = 'docs/content/PianoGrid_Practical_Tools_Final_Execution_Pack_2026-09-15/tools-content-data.json';
function getModel(url: '/' | '/tools', template: 'T01' | 'T02'): { page: any; model: IntegrationPageModel } {
  const { page } = readAuthorizedPage(url);
  if (page.template_id !== template || page.metadata.canonical_path !== url) throw new Error(`Invalid integration page identity: ${url}`);
  if (page.ready_for_publish !== false || page.deployment_status !== 'planning_only') throw new Error(`Release state changed unexpectedly: ${url}`);
  const ids=blockIDs[url];
  if (page.blocks.length!==ids.length) throw new Error(`Unexpected block count: ${url}`);
  return { page, model: { url, title: page.title, description: page.description, metadata: { title: page.metadata.title, description: page.metadata.description, canonicalPath: page.metadata.canonical_path }, blocks: page.blocks.map((block:any,index:number):IntegrationBlock=>({id:ids[index],heading:block.heading,body:block.body})) } };
}
const destination=(item:{label:string;url:string}):Destination=>({...item,available:locallyAvailableURLs.has(item.url)});
const downloadableAssets:Record<string,string>={
  'assets/blank-piano-staff-letter.pdf':'/reference/assets/blank-piano-staff-letter.pdf',
  'assets/blank-piano-staff-a4.pdf':'/reference/assets/blank-piano-staff-a4.pdf',
  'assets/piano-starter-and-reading.pdf':'/assets/guides/piano-starter-and-reading.pdf'
};
function verifyDownload(relative:string,url:string){
  const source=sourceAssetPath('/tools',relative),output=`public${url}`;
  if(!existsSync(output))throw new Error(`Missing public printable: ${url}`);
  const hash=(path:string)=>createHash('sha256').update(readFileSync(path)).digest('hex');
  if(hash(source)!==hash(output))throw new Error(`Printable differs from source: ${relative}`);
}
export function getHomeModel():HomeModel{
  const {page,model}=getModel('/','T01');
  if(page.data.navigation_release_policy!=='render a link only if its destination has passed the baseline release gate')throw new Error('Homepage release policy changed');
  const primaryTasks=page.data.primary_tasks.map(destination);
  const secondaryLink=destination(page.data.secondary_link);
  if(primaryTasks.filter((item:Destination)=>item.available).length!==6||!primaryTasks.find((item:Destination)=>item.url==='/sheet-music')?.available)throw new Error('Homepage destination release map is invalid');
  return {model,primaryTasks,secondaryLink,firstAction:page.data.first_action};
}
export function getToolsModel():ToolsModel{
  const {page,model}=getModel('/tools','T02');
  if(page.data.visibility_policy!=='show destination links only when that page is released; asset availability does not imply page release')throw new Error('Tools release policy changed');
  const pack=JSON.parse(readFileSync(toolsPackPath,'utf8')) as {page:{title:string;description:string;h1:string;intro:string};groups:Array<{id:string;items:Array<{id:string;label:string;target:string|null}>}>};
  if(pack.page.h1!=='Piano Tools and Printables'||pack.groups.map(group=>group.id).join(',')!=='find-identify,practice,print')throw new Error('Unexpected Practical Tools content contract');
  const descriptions:Record<string,string>={
    'note-lookup':'Locate a named note on the piano keyboard.',
    'staff-note-key':'Connect a written staff note to its piano key.',
    'chord-lookup':'Browse chord names, notes, diagrams, and sound.',
    'chord-finder':'Select notes and compare matching chord names.',
    'scale-lookup':'Browse scale notes, patterns, fingering, and sound.',
    'scale-finder':'Select notes and find scales that contain them.',
    'scale-pulse':'Use the scale-owned pulse while following its notes.',
    'practice-timer':'Set aside a focused block of practice time.',
    'note-trainer':'Answer a ten-question piano-key note practice.',
    'progressions':'Compare and play the existing validated examples.',
    'hear-the-difference':'Listen to two chords and find the one note that moved.',
    'blank-sheet':'Choose Letter or A4 grand-staff paper.',
    'labeled-keyboard':'Open printable 88-key and 61-key labeled layouts.',
    'notes-chart':'Print a staff-note and keyboard reference.',
    'scale-print':'Open scale references and ready-made PDF downloads.',
    'key-name-pack':'Download a C4–C5 reference, worksheet and answer pack.',
  };
  const targetOverrides:Record<string,string>={
    'scale-finder':'/scales#find-by-notes',
    'scale-pulse':'/scales#follow-along',
    'note-trainer':'/keyboard-notes#note-trainer',
  };
  const makeTask=(item:{id:string;label:string;target:string|null}):ToolDestination=>{
    const url=targetOverrides[item.id]??item.target;
    if(!url||!descriptions[item.id])throw new Error(`Incomplete Practical Tools task: ${item.id}`);
    return{id:item.id,label:item.label,description:descriptions[item.id],url,available:locallyAvailableURLs.has(url.split('#')[0])};
  };
  const findGroup=pack.groups.find(group=>group.id==='find-identify');
  const practiceGroup=pack.groups.find(group=>group.id==='practice');
  const printGroup=pack.groups.find(group=>group.id==='print');
  if(!findGroup||!practiceGroup||!printGroup)throw new Error('Missing Practical Tools task group');
  const findLinks=findGroup.items.map(makeTask).filter(item=>item.available);
  const practiceLinks=practiceGroup.items.map(makeTask).filter(item=>item.available);
  const printByID:Record<string,Array<{label:string;url:string;source?:string}>>={
    'blank-sheet':[
      {label:'Download US Letter PDF',url:'/reference/assets/blank-piano-staff-letter.pdf',source:'assets/blank-piano-staff-letter.pdf'},
      {label:'Download A4 PDF',url:'/reference/assets/blank-piano-staff-a4.pdf',source:'assets/blank-piano-staff-a4.pdf'},
    ],
    'notes-chart':[{label:'Download starter and reading PDF',url:'/assets/guides/piano-starter-and-reading.pdf',source:'assets/piano-starter-and-reading.pdf'}],
    'scale-print':[
      {label:'Download 12 major scales',url:'/downloads/scales/pianogrid-12-major-scales-note-reference.pdf'},
      {label:'Download major and minor atlas',url:'/downloads/scales/pianogrid-major-minor-note-atlas.pdf'},
      {label:'Download C major two-hand starter',url:'/downloads/scales/pianogrid-c-major-two-hand-starter.pdf'},
    ],
    'key-name-pack':[
      {label:'Download US Letter 3-page PDF',url:'/reference/generated/keyboard-notes/piano-key-names-c4-c5-letter.pdf'},
      {label:'Download A4 3-page PDF',url:'/reference/generated/keyboard-notes/piano-key-names-c4-c5-a4.pdf'},
    ],
  };
  const printResources:ToolResource[]=printGroup.items.map(makeTask).filter(item=>item.available).map(item=>{
    const downloads=(printByID[item.id]??[]).map(download=>{
      if(!existsSync(`public${download.url}`))throw new Error(`Missing public printable: ${download.url}`);
      if(download.source)verifyDownload(download.source,download.url);
      return{label:download.label,url:download.url};
    });
    return{...item,downloads};
  });
  if(findLinks.length!==6||practiceLinks.length!==5||printResources.length!==5)throw new Error('Practical Tools release map is incomplete');
  return {model:{...model,title:pack.page.h1,description:pack.page.intro,metadata:{...model.metadata,title:pack.page.title,description:pack.page.description}},findLinks,practiceLinks,printResources};
}
