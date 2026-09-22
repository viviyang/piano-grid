import hashlib, json, subprocess
from pathlib import Path

r = Path.cwd()
out = r / 'checks/product-system-p1-2026-09-22/remediation'
for name in ['next-env.d.ts', 'tsconfig.json']:
    (r/name).write_bytes((out/('before-'+name)).read_bytes())
p = out/'compare-builds.py'
p.write_text(p.read_text(encoding='utf-8').replace(".next-p1-remediation/", ".next-p1-remediation-clock/"), encoding='utf-8')
exec(compile(p.read_text(encoding='utf-8'), str(p), 'exec'))
before = json.loads((out/'before-hashes.json').read_text(encoding='utf-8-sig'))
changed = [name for name, old in before.items() if not (r/name).exists() or hashlib.sha256((r/name).read_bytes()).hexdigest()!=old]
original = subprocess.check_output(['git','-C',str(r.parent/'piano'),'status','--porcelain'], text=True)
saved = (out/'original-workspace-status.txt').read_text(encoding='utf-8-sig')
result = {'changedSinceRemediationStart':changed,'originalWorkspaceStatusEqual':original.strip()==saved.strip(),'head':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'originMain':subprocess.check_output(['git','rev-parse','origin/main'],text=True).strip(),'branch':subprocess.check_output(['git','branch','--show-current'],text=True).strip()}
(out/'final-scope.json').write_text(json.dumps(result,indent=2),encoding='utf-8')
shots = sorted(p.name for p in out.glob('*-continue.png'))
(out/'screenshot-manifest.json').write_text(json.dumps({'count':len(shots),'files':shots,'scope':'Continuation regions; /chords filtered to root C. UI unchanged between production builds on 4353 and 4354; final 27 layout assertions ran on 4354.'},indent=2),encoding='utf-8')
report=r/'docs/product-system-p1-2026-09-22/RESULT.md'
backup=out/'RESULT-before-remediation.md'
if not backup.exists(): backup.write_bytes(report.read_bytes())
(out/'delivery-manifest.json').write_text(json.dumps({str(p.relative_to(r)):hashlib.sha256(p.read_bytes()).hexdigest() for p in out.iterdir() if p.is_file() and p.name!='delivery-manifest.json'},indent=2),encoding='utf-8')
print(json.dumps(result,indent=2));print('screenshots',len(shots))
