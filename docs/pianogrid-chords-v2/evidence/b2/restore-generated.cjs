const fs=require('node:fs');
const cp=require('node:child_process');

const output=cp.execFileSync('git',['status','--porcelain','--','checks/batches/01-chords'],{encoding:'utf8'});
for(const line of output.trimEnd().split(/\r?\n/).filter(Boolean)){
  const status=line.slice(0,2);
  const file=line.slice(3);
  if(status==='??')continue;
  const bytes=cp.execFileSync('git',['show',`HEAD:${file}`],{encoding:null,maxBuffer:20*1024*1024});
  fs.writeFileSync(file,bytes);
}
