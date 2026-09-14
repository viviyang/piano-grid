#!/usr/bin/env python3
"""Compare exported repository route inventories, without network or app mutations.
Input JSON: {"publicBusinessUrls":["/", ...], "sitemapUrls":[...],
             "frameworkOutputs":[...], "buildHead":"..."}
An optional --before-json checks that unrelated pre-existing pages are preserved.
"""
import argparse,json,sys
from pathlib import Path
from urllib.parse import urlsplit
ROOT=Path(__file__).resolve().parents[1]
def read(p):return json.loads(Path(p).read_text(encoding='utf-8'))
def route(value):
    if not isinstance(value,str):raise ValueError('URL must be a string')
    p=urlsplit(value)
    if p.query or p.fragment:raise ValueError('Business route cannot contain query/fragment: '+value)
    path=p.path
    if not path.startswith('/'):raise ValueError('Absolute route path required: '+value)
    return path.rstrip('/') or '/'
def load(doc):
    if not isinstance(doc,dict) or not isinstance(doc.get('publicBusinessUrls'),list):
        raise ValueError('Export publicBusinessUrls explicitly; do not pass unclassified build outputs.')
    allpaths=[route(x) for x in doc['publicBusinessUrls']]
    if len(set(allpaths))!=len(allpaths):raise ValueError('Duplicate publicBusinessUrls')
    return set(allpaths)
def compare(after,before=None,final=False):
    a=load(after);b=load(before) if before else set()
    reported={r['url'] for r in read(ROOT/'02_routes/current-chord-routes.reported.json')}
    allowed={r['url'] for r in read(ROOT/'02_routes/new-routes.allowlist.json')}
    baseline=read(ROOT/'baseline/url-plan.final.json')
    original={x['url'] for x in baseline['pages']}
    core=(original & reported)
    actualchord={p for p in a if p.startswith('/chords/') or p=='/chords' or p in {'/chord-progressions','/guide/piano-chords','/keyboard-notes/finger-numbers'}}
    problems=[]
    missing=sorted(reported-a)
    unexpected=sorted(actualchord-reported-allowed)
    if missing:problems.append('reported_chord_routes_missing: verify actual baseline; do not recreate blindly')
    if unexpected:problems.append('unlisted_chord_routes: classify before any deletion/release')
    lost=sorted(b-a)
    if lost:problems.append('preexisting_business_routes_lost')
    missing_new=sorted(allowed-a)
    if final and missing_new:problems.append('required_new_routes_not_present')
    sm=after.get('sitemapUrls')
    sitemap_diff=None
    if sm is not None:
        if not isinstance(sm,list):raise ValueError('sitemapUrls must be a list')
        sl=[route(x) for x in sm];s=set(sl)
        sitemap_diff={'notInSitemap':sorted(a-s),'sitemapNotPublic':sorted(s-a),'duplicates':len(sl)-len(s)}
        if final and any(sitemap_diff.values()):problems.append('public_registry_sitemap_mismatch')
    return {'status':'REQUIRES_RECONCILIATION' if problems else ('PASS_ROUTE_SETS_ONLY' if sm is not None else 'PASS_REPORTED_SET_WITH_SITEMAP_UNCHECKED'),
     'mode':'final' if final else 'baseline','buildHead':after.get('buildHead'),'problems':problems,
     'counts':{'originalPlanningTotal':len(original),'originalCoreSharedScope':len(core),'reportedChordTotal':len(reported),
     'actualBusiness':len(a),'actualChord':len(actualchord),'actualAddedSinceBefore':len(a-b) if before else None,
     'frameworkOutputsReported':len(after.get('frameworkOutputs',[]))},
     'originalCoreMissing':sorted(core-a),'reportedChordMissing':missing,'newAllowlistMissing':missing_new,
     'unlistedChordRoutes':unexpected,'lostExistingBusinessRoutes':lost,'addedSinceBefore':sorted(a-b) if before else None,
     'newlyAddedNonChordRoutes':sorted((a-b)-actualchord) if before else None,
     'sitemap':sitemap_diff,'frameworkOutputs':after.get('frameworkOutputs',[]),
     'doesNotVerify':['HTTP_200','actual_DOM','deployed_release','indexing','human_testing']}
def self_test():
    r=[x['url'] for x in read(ROOT/'02_routes/current-chord-routes.reported.json')]
    n=[x['url'] for x in read(ROOT/'02_routes/new-routes.allowlist.json')]
    b={'publicBusinessUrls':r+['/','/scales']}
    a={'publicBusinessUrls':r+n+['/','/scales','/scales/new-parallel-example'],
       'sitemapUrls':r+n+['/','/scales','/scales/new-parallel-example']}
    assert compare(a,b,True)['status']=='PASS_ROUTE_SETS_ONLY'
    broken=dict(a);broken['publicBusinessUrls']=[p for p in a['publicBusinessUrls'] if p!='/chords/a-minor']
    assert compare(broken,b,True)['reportedChordMissing']==['/chords/a-minor']
    extra=dict(a);extra['publicBusinessUrls']=a['publicBusinessUrls']+['/chords/unapproved-variant']
    assert '/chords/unapproved-variant' in compare(extra,b,True)['unlistedChordRoutes']
    missingnew={'publicBusinessUrls':r+['/','/scales'],'sitemapUrls':r+['/','/scales']}
    assert len(compare(missingnew,b,True)['newAllowlistMissing'])==2
    print(json.dumps({'status':'PASS_SELF_TEST','cases':4,'actualRepositoryChecked':False},ensure_ascii=False))
if __name__=='__main__':
    p=argparse.ArgumentParser(description=__doc__);p.add_argument('--actual-json');p.add_argument('--before-json');p.add_argument('--final',action='store_true');p.add_argument('--out');p.add_argument('--self-test',action='store_true');a=p.parse_args()
    if a.self_test:self_test();sys.exit(0)
    if not a.actual_json:p.error('--actual-json required')
    try:r=compare(read(a.actual_json),read(a.before_json) if a.before_json else None,a.final)
    except (ValueError,KeyError,TypeError) as e:p.error(str(e))
    s=json.dumps(r,ensure_ascii=False,indent=2)
    if a.out:Path(a.out).write_text(s+'\n',encoding='utf-8')
    print(s);sys.exit(1 if r['problems'] else 0)
