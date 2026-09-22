from pathlib import Path
import subprocess,json,hashlib,datetime
out=Path(__file__).parent
def git(*args): return subprocess.check_output(['git',*args])
def sha(data): return hashlib.sha256(data).hexdigest()
head=git('rev-parse','HEAD').decode().strip()
target='d15c0142cc6d00b01d060ba17092000a5bf060ca'
sources=json.loads(Path('checks/batches/07-site-integration/source-before.json').read_text(encoding='utf-8'))['files']
failures=json.loads((out/'preflight-old-head/data-validation.json').read_text(encoding='utf-8'))['results']
failed={x['name'].removeprefix('Protected source unchanged: ') for x in failures if not x['passed']}
rows=[]
for f in sources:
 p=f['path']
 if p not in failed:continue
 raw=Path(p).read_bytes(); blob=git('show',f'HEAD:{p}'); remote=git('show',f'{target}:{p}')
 lf=raw.replace(b'\r\n',b'\n')
 newline_only=lf==blob and sha(lf)==f['sha256']
 row={'path':p,'old_expected_hash':f['sha256'],'baseline_hash':sha(blob),'working_tree_hash':sha(raw),'lf_hash':sha(lf),'target_d15_hash':sha(remote),'target_same_as_HEAD':remote==blob,'classification':'CRLF_ONLY' if newline_only else 'REAL_CONTENT_CHANGE','disposition':'DIAGNOSED_NOT_FIXED','approval_reference':'NOT_ESTABLISHED'}
 if not newline_only:
  commit=git('log','-1','--format=%H','--',p).decode().strip()
  row['last_touching_commit']=commit
  name='source-change-'+str(len([x for x in rows if x['classification']=='REAL_CONTENT_CHANGE'])+1)+'.diff'
  (out/name).write_bytes(git('show','--format=fuller',commit,'--',p))
  row['actual_diff']=name
 rows.append(row)
(out/'hash-diagnosis-current.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
docs=Path('docs/product-system-audit-2026-09-22')
manifest=[{'path':str(p),'sha256':sha(p.read_bytes())} for p in sorted(docs.rglob('*')) if p.is_file()]
(out/'audit-materials-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
preflight={'timestamp':datetime.datetime.now(datetime.timezone.utc).isoformat(),'cwd':str(Path.cwd()),'head':head,'expected':target,'branch':git('branch','--show-current').decode().strip() or 'DETACHED','tracked_diff':git('diff','--name-only').decode(),'lock_sha256':sha(Path('package-lock.json').read_bytes()),'requested_instruction_exists':(docs/'10_P0_REVIEW_AND_EXECUTION.md').exists(),'found_instruction':'10_P0_REVIEW_AND_EXECUTION.md','found_instruction_sha256':sha(Path('10_P0_REVIEW_AND_EXECUTION.md').read_bytes()),'audit_file_count':len(manifest),'hash_failures':len(rows),'newline_only':sum(x['classification']=='CRLF_ONLY' for x in rows),'real_content':sum(x['classification']=='REAL_CONTENT_CHANGE' for x in rows),'integration_data_exit':1,'baseline_gate':'BLOCKED','implementation':'NOT_STARTED'}
(out/'preflight.json').write_text(json.dumps(preflight,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps(preflight,ensure_ascii=False))
