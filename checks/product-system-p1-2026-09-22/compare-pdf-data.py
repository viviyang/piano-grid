import json
from pathlib import Path
r=Path.cwd();out=r/'checks/product-system-p1-2026-09-22';data=json.loads((out/'adapter-contract.json').read_text(encoding='utf8'));option=data['scale']['options'][0];pdfs=json.loads((out/'pdf-existing.json').read_text(encoding='utf8'));checks=[]
for pdf in pdfs:
 text='\n'.join(pdf['text'])
 for hand in ['RH','LH']:
  for direction in ['ascending','descending']:
   notes='Notes: '+' - '.join(x['note'] for x in option['sequences'][hand][direction]);fingers='Fingers: '+' - '.join(map(str,option['fingering'][hand][direction]));checks.append({'file':pdf['path'],'hand':hand,'direction':direction,'notesEqual':notes in text,'fingersEqual':fingers in text})
(out/'pdf-data-comparison.json').write_text(json.dumps({'checks':checks,'sourceIDs':[s['sourceID'] for s in option['sources']],'visualResult':'FAIL: Letter RH upper keyboard only two black keys; A4 cover text overlap; parser structure warnings; original assets unchanged'},indent=2),encoding='utf8');print(checks)
