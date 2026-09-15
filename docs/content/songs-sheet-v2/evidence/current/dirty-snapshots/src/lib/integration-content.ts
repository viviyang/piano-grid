import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { locallyAvailableURLs, readAuthorizedPage, sourceAssetPath } from './site-content';
import type { Destination, HomeModel, IntegrationBlock, IntegrationPageModel, PrintableDestination, ToolsModel } from './integration-types';

const blockIDs: Record<string, string[]> = { '/': ['tasks','three-notes','editions'], '/tools': ['jobs','printables'] };
const toolsMetadataDescription = 'Choose practical piano tools for keyboard notes, chord and scale references, blank sheet music, printable guides, and focused practice tasks.';
function getModel(url: '/' | '/tools', template: 'T01' | 'T02'): { page: any; model: IntegrationPageModel } {
  const { page } = readAuthorizedPage(url);
  if (page.template_id !== template || page.metadata.canonical_path !== url) throw new Error(`Invalid integration page identity: ${url}`);
  if (page.ready_for_publish !== false || page.deployment_status !== 'planning_only') throw new Error(`Release state changed unexpectedly: ${url}`);
  const ids=blockIDs[url];
  if (page.blocks.length!==ids.length) throw new Error(`Unexpected block count: ${url}`);
  return { page, model: { url, title: page.title, description: page.description, metadata: { title: page.metadata.title, description: url === '/tools' ? toolsMetadataDescription : page.metadata.description, canonicalPath: page.metadata.canonical_path }, blocks: page.blocks.map((block:any,index:number):IntegrationBlock=>({id:ids[index],heading:block.heading,body:block.body})) } };
}
const destination=(item:{label:string;url:string}):Destination=>({...item,available:locallyAvailableURLs.has(item.url)});
const downloadableAssets:Record<string,string>={
  'assets/blank-piano-staff-letter.pdf':'/reference/assets/blank-piano-staff-letter.pdf',
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
  if(primaryTasks.filter((item:Destination)=>item.available).length!==5||primaryTasks.find((item:Destination)=>item.url==='/sheet-music')?.available)throw new Error('Homepage destination release map is invalid');
  return {model,primaryTasks,secondaryLink,firstAction:page.data.first_action};
}
export function getToolsModel():ToolsModel{
  const {page,model}=getModel('/tools','T02');
  if(page.data.visibility_policy!=='show destination links only when that page is released; asset availability does not imply page release')throw new Error('Tools release policy changed');
  const allLookupLinks:Destination[]=page.data.lookup_links.map(destination);
  const allPrintables:PrintableDestination[]=page.data.printables.map((item:{label:string;task:string;url:string;asset:string}):PrintableDestination=>{const downloadURL=downloadableAssets[item.asset]??null,available=locallyAvailableURLs.has(item.url)&&downloadURL!==null;if(available)verifyDownload(item.asset,downloadURL);return{label:item.label,task:item.task,url:item.url,available,downloadURL:available?downloadURL:null};});
  const lookupLinks=allLookupLinks.filter(item=>item.available);
  const printables=allPrintables.filter(item=>item.available);
  if(lookupLinks.length!==4||printables.length!==2)throw new Error('Tools destination release map is invalid');
  const blocks=model.blocks.map(block=>block.id==='jobs'
    ? {...block,body:'Choose an available reference for the task you want to complete. Every option on this page opens the matching reference.',actions:lookupLinks.map(({label,url})=>({label,url}))}
    : {...block,body:'Choose an available printable, open its resource page for details, or download its verified PDF.',actions:printables.map(({label,url})=>({label,url}))});
  return {model:{...model,blocks},lookupLinks,printables};
}
