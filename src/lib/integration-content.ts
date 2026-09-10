import { existsSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { locallyAvailableURLs, readAuthorizedPage, sourceAssetPath } from './site-content';
import type { Destination, HomeModel, IntegrationBlock, IntegrationPageModel, PrintableDestination, ToolsModel } from './integration-types';

const blockIDs: Record<string, string[]> = { '/': ['tasks','three-notes','editions'], '/tools': ['jobs','printables'] };
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
  const lookupLinks=page.data.lookup_links.map(destination);
  const printables=page.data.printables.map((item:{label:string;task:string;url:string;asset:string}):PrintableDestination=>{const available=locallyAvailableURLs.has(item.url),downloadURL=available?(downloadableAssets[item.asset]??null):null;if(downloadURL)verifyDownload(item.asset,downloadURL);return{label:item.label,task:item.task,url:item.url,available,downloadURL};});
  if(lookupLinks.filter((item:Destination)=>item.available).length!==3||printables.filter((item:PrintableDestination)=>item.available).length!==2)throw new Error('Tools destination release map is invalid');
  return {model,lookupLinks,printables};
}
