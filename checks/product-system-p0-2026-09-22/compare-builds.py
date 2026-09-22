import json,re,hashlib,subprocess
from pathlib import Path
from html.parser import HTMLParser
root=Path.cwd();out=root/'checks/product-system-p0-2026-09-22'
class Head(HTMLParser):
 def __init__(self):super().__init__();self.d={'title':'','description':[],'canonical':[],'robots':[],'h1':[]};self.tag=None
 def handle_starttag(self,tag,attrs):
  a=dict(attrs)
  if tag in ('title','h1'):self.tag=tag
  if tag=='meta' and a.get('name') in ('description','robots'):self.d[a['name']].append(a.get('content'))
  if tag=='link' and a.get('rel')=='canonical':self.d['canonical'].append(a.get('href'))
 def handle_endtag(self,tag):
  if tag==self.tag:self.tag=None
 def handle_data(self,data):
  if self.tag=='title':self.d['title']+=data
  if self.tag=='h1':self.d['h1'].append(data)
def scan(dist):
 d={}
 for p in (root/dist/'server/app').rglob('*.html'):
  h=Head();h.feed(p.read_text(encoding='utf8'));d[str(p.relative_to(root/dist/'server/app')).replace('\\','/')]=h.d
 return d
before=scan('.next-p0-baseline');after=scan('.next-p0-final')
changes=[{'path':k,'before':before.get(k),'after':after.get(k)} for k in sorted(before.keys()|after.keys()) if before.get(k)!=after.get(k)]
routeA=json.loads((root/'.next-p0-baseline/routes-manifest.json').read_text());routeB=json.loads((root/'.next-p0-final/routes-manifest.json').read_text())
result={'htmlCountBefore':len(before),'htmlCountAfter':len(after),'metadataAndH1Changes':changes,'staticRoutesIdentical':routeA['staticRoutes']==routeB['staticRoutes'],'dynamicRoutesIdentical':routeA['dynamicRoutes']==routeB['dynamicRoutes'],'protectedSourceDiff':subprocess.check_output(['git','diff','--name-only','--','docs/content','public','package.json','package-lock.json','src/app','src/lib/site-routes.ts'],text=True).splitlines()}
(out/'final/metadata-route-comparison.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8');print(json.dumps(result,ensure_ascii=False))
