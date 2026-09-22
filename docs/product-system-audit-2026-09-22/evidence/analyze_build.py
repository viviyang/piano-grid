from pathlib import Path
import json,re,hashlib,subprocess,urllib.request
from html.parser import HTMLParser
from urllib.parse import urlsplit,unquote
out=Path('docs/product-system-audit-2026-09-22/evidence')
routes=json.loads((out/'repo-routes.json').read_text())
class P(HTMLParser):
 def __init__(self):super().__init__();self.c=None;self.h1=[];self.title='';self.meta={};self.links=[];self.ids=set();self.ld=False;self.schemas=[];self.text=[]
 def handle_starttag(self,t,a):
  a=dict(a)
  if a.get('id'):self.ids.add(a['id'])
  if t=='meta':self.meta[a.get('name','')]=a.get('content','')
  if t=='link' and a.get('rel')=='canonical':self.meta['canonical']=a.get('href')
  if t=='a' and a.get('href'):self.links.append(a['href'])
  if t=='h1':self.h1.append('');self.c='h1'
  if t=='title':self.c='title'
  if t=='script':self.ld=a.get('type')=='application/ld+json'
 def handle_endtag(self,t):
  if t==self.c:self.c=None
  if t=='script':self.ld=False
 def handle_data(self,d):
  if self.c=='h1':self.h1[-1]+=d
  if self.c=='title':self.title+=d
  if self.ld:self.schemas.append(d)
rows=[]; parsers={}
for r in routes:
 f=Path('.next-audit/server/app')/('index.html' if r=='/' else r[1:]+'.html')
 if f.exists(): html=f.read_text(encoding='utf-8');source=str(f)
 else:
  html=urllib.request.urlopen('http://127.0.0.1:4347'+r,timeout=20).read().decode();source='local production HTTP'
 p=P();p.feed(html);parsers[r]=p
 rows.append({'path':r,'source':source,'title':p.title,'h1':p.h1,'canonical':p.meta.get('canonical'),'robots':p.meta.get('robots'),'links':sorted(set(p.links)),'schema':p.schemas})
(out/'build-pages.json').write_text(json.dumps(rows,ensure_ascii=False,indent=2),encoding='utf-8')
manifest=json.loads(Path('.next-audit/prerender-manifest.json').read_text(encoding='utf-8'))
(out/'prerender-routes.json').write_text(json.dumps(list(manifest['routes']),indent=2))
bad=[];incoming={r:set() for r in routes}
for row in rows:
 for h in row['links']:
  u=urlsplit(h)
  if u.netloc and u.netloc!='pianogrid.com':continue
  if not h.startswith(('/', '#','https://pianogrid.com')):continue
  path=u.path or row['path']
  if path in routes:
   if path!=row['path']:incoming[path].add(row['path'])
   if u.fragment and unquote(u.fragment) not in parsers[path].ids:bad.append({'source':row['path'],'href':h,'kind':'missing_static_anchor'})
  elif not (Path('public')/path.lstrip('/')).exists():bad.append({'source':row['path'],'href':h,'kind':'unresolved_path'})
summary={'routes':len(rows),'prerenderPublic':len(set(routes)&set(manifest['routes'])),'dynamicPublic':list(set(routes)-set(manifest['routes'])),'canonicalErrors':[r['path'] for r in rows if r['canonical']!='https://pianogrid.com'+('/' if r['path']=='/' else r['path'])],'robotsErrors':[r['path'] for r in rows if 'noindex' in (r['robots'] or '') or not r['robots']],'h1Errors':[r['path'] for r in rows if len(r['h1'])!=1],'noIncoming':[r for r,x in incoming.items() if not x],'linkIssues':bad,'schemaTypes':sorted(set(t for r in rows for s in r['schema'] for t in re.findall(r'"@type"\s*:\s*"([^"]+)"',s)))}
(out/'build-audit-summary.json').write_text(json.dumps(summary,ensure_ascii=False,indent=2),encoding='utf-8');print(json.dumps({**summary,'linkIssues':bad[:10]},ensure_ascii=False))
