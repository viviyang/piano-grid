from pathlib import Path
import json,re,hashlib,subprocess,datetime
base=Path('docs/product-system-audit-2026-09-22'); ev=base/'evidence'
routes=json.loads((ev/'repo-routes.json').read_text(encoding='utf-8'))
inventory=(base/'ROUTE_TEMPLATE_INVENTORY.md').read_text(encoding='utf-8')
listed=re.findall(r'^\| `(/[^`]*)` \|',inventory,re.M)
assert len(listed)==206 and set(listed)==set(routes)
required=['00_CURRENT_STATE','01_RESEARCH_EVIDENCE_MATRIX','02_PRODUCT_SYSTEM_MAP','03_URL_TASK_AUDIT','04_GAP_ANALYSIS','05_PAGE_GATE','06_P0_P1_BACKLOG','07_IMPLEMENTATION_PLAN','08_ACCEPTANCE_CRITERIA','09_DECISION_LOG']
assert all((base/(x+'.md')).exists() for x in required)
readme=(base/'README.md').read_text(encoding='utf-8')
assert all((base/x).exists() for x in re.findall(r'\]\(([^)]+\.md)\)',readme))
pilot=['/chords','/chords/finder','/chords/c-major','/chords/a-minor','/chords/c-maj7','/chords/c-diminished','/chords/c-add9','/scales/c-major','/keyboard-notes']
assert set(pilot)<=set(routes)
sources=[('A','bodytypecalculator.org 全方位竞品逆向研究：从一个关键词到一个产品型 SEO 网站.pdf','b41f521eb4bddbc053f899b25ade6b1c20909a52126599193911a975383813a6'),('B','Body Type Calculator Reverse Research.pdf','7b4fcbd7f1889d6379be9285d3dc44fb4834ad3d1d1c042773ebc841e315f5bd'),('P','PianoGrid 产品型 SEO 落地方案：从“查答案”升级为“可验证、可练习的下一步”.pdf','d6cf24287b167c03b22e59861efa551cfa04d3aae60dd9f45dfea30a6fa6d361')]
hashes=[]
for k,name,expected in sources:
 p=Path('C:/Users/Admin/Downloads')/name
 digest=hashlib.sha256(p.read_bytes()).hexdigest()
 assert digest==expected,(k,digest)
 hashes.append({'source':k,'path':str(p),'sha256':digest,'unchanged':True})
diff=subprocess.check_output(['git','diff','--name-only'],text=True).strip()
assert not diff,diff
status=subprocess.check_output(['git','status','--short'],text=True).strip()
assert status=='?? docs/product-system-audit-2026-09-22/',status
out={'verifiedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'sha':subprocess.check_output(['git','rev-parse','HEAD'],text=True).strip(),'mainDocs':len(required),'inventoryRows':len(listed),'pilotValid':True,'readmeLinksValid':True,'sourceFiles':hashes,'trackedDiff':diff,'status':status,'productImplementation':'NOT_STARTED','browserAcceptance':'BLOCKED / NOT_COMPLETED','planningVerdict':'READY_FOR_IMPLEMENTATION'}
(ev/'final-verification.json').write_text(json.dumps(out,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in out.items() if k!='sourceFiles'},ensure_ascii=False))
