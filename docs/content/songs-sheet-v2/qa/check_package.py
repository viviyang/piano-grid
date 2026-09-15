#!/usr/bin/env python3
"""Validate delivery files, scope and references only; not the website or legal clearance.
Uses the standard library. Optional manifest verification does not modify reports.
"""
import argparse,hashlib,json,pathlib,re,sys
ROOT=pathlib.Path(__file__).resolve().parents[1]
def load(rel):return json.loads((ROOT/rel).read_text(encoding='utf-8'))
def sha(path):return hashlib.sha256(path.read_bytes()).hexdigest()
def main():
 ap=argparse.ArgumentParser();ap.add_argument('--output');ap.add_argument('--check-manifest',action='store_true');args=ap.parse_args()
 checks=[]
 def ck(name,ok):
  checks.append({'check':name,'passed':bool(ok)})
  if not ok:raise AssertionError(name)
 for p in ROOT.rglob('*.json'):json.loads(p.read_text(encoding='utf-8'))
 ck('All JSON files parse',True)
 cat=load('content-data/catalog.v2.json');routes=load('content-data/route-diff.json');old=load('content-data/baseline/pages.CD.readonly.json')['pages'];new=load('evidence/current/pages.CD.readonly.json')['pages']
 ck('64 C/D pages equal current handoff extract',len(old)==64 and old==new)
 ck('All 64 approved route/task records retained',len(routes['rows'])==64 and {x['url']for x in routes['rows']}==set(new))
 ck('22 songs and 41 sheet plus one tool',sum(x['url'].startswith('/songs')for x in routes['rows'])==22 and sum(x['url'].startswith('/sheet-music')for x in routes['rows'])==41)
 ck('265 old resource locations mapped',len(cat['aliases'])==265 and len({(a['page_url'],a['location'])for a in cat['aliases']})==265)
 ck('200 external + 3 original arrangements',len(cat['arrangements'])==203 and sum(a['representation']=='external_reference'for a in cat['arrangements'])==200)
 ck('No runtime grants manufactured',cat['runtime_grants']==[])
 ck('Actual local file count 24',len(cat['assets'])==24 and len([p for p in(ROOT/'content-data/assets').rglob('*')if p.is_file()])==24)
 aid={a['arrangement_id']:a for a in cat['arrangements']};assets={a['asset_id']:a for a in cat['assets']};resources={r['resource_id']:r for r in cat['resources']}
 for a in cat['assets']:
  p=(ROOT/a['path']).resolve();ck('asset exists inside package: '+a['asset_id'],p.is_relative_to(ROOT)and p.is_file())
  ck('asset bytes/hash: '+a['asset_id'],p.stat().st_size==a['bytes']and sha(p)==a['sha256'])
  ck('asset same arrangement/resource: '+a['asset_id'],a['arrangement_id'] in aid and resources[a['resource_id']]['arrangement_id']==a['arrangement_id'])
  ck('asset not prematurely published: '+a['asset_id'],a['release_state']=='staging'and aid[a['arrangement_id']]['release']['public_asset_enabled'] is False)
 for a in cat['arrangements']:
  if a['representation']=='external_reference':
   ck('external has no local score/audio: '+a['arrangement_id'],a['score_asset_id'] is None and a['audio_asset_id'] is None)
 for alias in cat['aliases']:
  node=new[alias['page_url']]
  for part in alias['location'].split('/'):node=node[int(part)]if isinstance(node,list)else node[part]
  ck('alias loc resolves: '+alias['page_url']+'/'+alias['location'],alias['arrangement_id'] in aid and node.get('id')==alias['legacy_id'])
 patches=load('content-data/english/pages.patch.json');sections=load('content-data/page-section-contracts.v2.json');cards=load('content-data/english/learning-cards.v2.json');cardids={a['card_id']for a in cards}
 first={x['url']for x in routes['rows']if x['decision']=='S0_FIRST_IMPLEMENTATION'}
 ck('Exactly 8 first page patches and contracts',len(first)==8 and first=={x['url']for x in patches}=={x['url']for x in sections})
 ck('Six real learning cards resolve',len(cards)==6 and all(x['arrangement_id']in aid for x in cards))
 for x in sections:
  ck('original source groups retained: '+x['url'],x['required_source_groups']==new[x['url']]['source_groups'])
  ck('shared cards resolve: '+x['url'],bool(x['new_learning_cards'])and all(i in cardids for i in x['new_learning_cards']))
 ck('19 paused rows retained',routes['counts']['paused_module_urls']==19)
 ck('17 unassigned tasks and 2 historical clues retained',len(routes['unassigned_tasks'])==17 and len(routes['historical_unmapped_evidence'])==2)
 plan=(ROOT/'PLAN.md').read_text(encoding='utf-8')
 ck('All A-O chapters delivered',all(re.search(r'^## '+x+r'\.',plan,re.M)for x in 'ABCDEFGHIJKLMNO'))
 ck('No font binaries bundled',not any(p.suffix.lower()in{'.ttf','.otf','.woff','.woff2'}for p in ROOT.rglob('*')))
 ck('No pre-filled website RESULT.md',not(ROOT/'RESULT.md').exists())
 music=load('qa/music-check-results.v2.json');ck('Three music checks passed and three mutations caught',music['status']=='PASS'and len(music['results'])==3 and set(music['negative_controls_detected'])=={'xml_pitch','midi_pitch','audio_silence'})
 pdfs=load('qa/pdf-render-checks.v2.json');ck('Six one-page PDFs and preserved return links',len(pdfs)==6 and all(x['pages']==1 and any('#pg-ex='in l for l in x['links']) for x in pdfs))
 if args.check_manifest:
  manifest=load('MANIFEST.json')
  for x in manifest['files']:ck('manifest hash: '+x['path'],sha(ROOT/x['path'])==x['sha256'])
 report={'scope':'Delivery package integrity only; not website/rights/teacher/manual/production acceptance','status':'PASS_PACKAGE_INTEGRITY','checks_passed':len(checks),'checks':checks}
 text=json.dumps(report,ensure_ascii=False,indent=2)+'\n'
 if args.output:(ROOT/args.output).write_text(text,encoding='utf-8')
 print(json.dumps({'status':report['status'],'checks_passed':len(checks),'manifest_checked':args.check_manifest}))
if __name__=='__main__':
 try:main()
 except (AssertionError,KeyError,OSError,ValueError) as exc:
  print('FAIL: '+str(exc),file=sys.stderr);sys.exit(1)
