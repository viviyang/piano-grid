import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const out='docs/pianogrid-chords-v2/evidence/b1-refinement/checks';fs.mkdirSync(out,{recursive:true});
const files=['foundation.json','tailwind-compile.json','data-validation.json'].map(n=>'checks/batches/07-site-integration/'+n);
const saved=new Map(files.map(p=>[p,fs.readFileSync(p)]));
const results=[];
try{
 for(const [name,args] of [
  ['foundation',['scripts/check-foundation.mjs']],
  ['typecheck',['node_modules/typescript/bin/tsc','--noEmit','--incremental','false']],
  ['css',['scripts/check-css.mjs']],
  ['integration-data',['scripts/check-integration-data.mjs']],
  ['build',['node_modules/next/dist/bin/next','build']],
 ]){const r=spawnSync(process.execPath,args,{encoding:'utf8',maxBuffer:20*1024*1024});const log=(r.stdout||'')+(r.stderr||'');fs.writeFileSync(`${out}/${name}.log`,log);results.push({name,args,exitCode:r.status,error:r.error?.message});console.log(name,r.status,log.slice(-1800));}
 for(const p of files)fs.copyFileSync(p,`${out}/${p.split('/').at(-1)}`);
}finally{
 for(const [p,bytes] of saved)fs.writeFileSync(p,bytes);
 fs.writeFileSync(`${out}/commands.json`,JSON.stringify(results,null,2));
}
