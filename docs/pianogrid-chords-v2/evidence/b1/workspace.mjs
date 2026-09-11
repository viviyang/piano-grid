import fs from 'node:fs';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
const out='docs/pianogrid-chords-v2/evidence/b1';
const git=(...args)=>execFileSync('git',args,{encoding:'utf8'}).trim();
const files=git('ls-files','--cached','--others','--exclude-standard','-z').split('\0').filter(p=>p&&!p.startsWith(out+'/'));
const hashes=Object.fromEntries(files.filter(p=>fs.existsSync(p)).map(p=>[p,crypto.createHash('sha256').update(fs.readFileSync(p)).digest('hex')]));
const phase=process.argv[2]||'before';
const data={head:git('rev-parse','HEAD'),branch:git('branch','--show-current'),status:git('status','--short'),hashes};
if(phase==='before'){
 const old=JSON.parse(fs.readFileSync('docs/pianogrid-chords-v2/evidence/workspace-before.json'));
 data.changesSinceReview=Object.keys(old.hashes).filter(p=>old.hashes[p]!==hashes[p]);
 fs.mkdirSync(out+'/source-before',{recursive:true});
 for(const p of files.filter(p=>p.startsWith('src/')||p==='next-env.d.ts')){fs.mkdirSync(out+'/source-before/'+p.slice(0,p.lastIndexOf('/')),{recursive:true});fs.copyFileSync(p,out+'/source-before/'+p);}
}else{
 const old=JSON.parse(fs.readFileSync(out+'/workspace-before.json'));
 data.changedExisting=Object.keys(old.hashes).filter(p=>old.hashes[p]!==hashes[p]);
 data.newFiles=Object.keys(hashes).filter(p=>!(p in old.hashes));
}
fs.writeFileSync(out+`/workspace-${phase}.json`,JSON.stringify(data,null,2));
console.log(JSON.stringify({phase,changesSinceReview:data.changesSinceReview,changedExisting:data.changedExisting,newFiles:data.newFiles}));
