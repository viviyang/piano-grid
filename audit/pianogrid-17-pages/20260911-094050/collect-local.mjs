import { execFileSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
const root=resolve('audit/pianogrid-17-pages/20260911-094050');
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const registry=await readFile('src/lib/site-routes.ts','utf8');
const plan=JSON.parse(await readFile('docs/product/url-plan.final.json','utf8'));
const planningMarkdown='docs/product/Piano_全站统一规划_最终版.md';
let planningExists=true;try{await readFile(planningMarkdown,'utf8');}catch{planningExists=false;}
const result={
  collected_at:new Date().toISOString(),timezone:'Asia/Shanghai (+08:00)',
  git:{head:git('rev-parse','HEAD'),branch:git('branch','--show-current'),status:git('status','--short').split(/\r?\n/).filter(Boolean),dirty:Boolean(git('status','--porcelain'))},
  planning:{urlPlanPath:'docs/product/url-plan.final.json',urlPlanVersion:plan.version,urlPlanCounts:plan.counts,planningMarkdown,planningExists},
  registry:{path:'src/lib/site-routes.ts',sha256:await (async()=>{const {createHash}=await import('node:crypto');return createHash('sha256').update(registry).digest('hex')})(),publicRoutes:[...registry.matchAll(/^\s*'([^']+)',\s*$/gm)].slice(0,17).map(x=>x[1])},
  separationNote:'Local HEAD and dirty working tree are recorded only as local code observations. No available production header or page marker proves that this commit or working tree is the deployed build.'
};
await writeFile(resolve(root,'evidence','local-version.json'),JSON.stringify(result,null,2)+'\n');
console.log(result.git.head,result.git.dirty,result.registry.publicRoutes.length);
