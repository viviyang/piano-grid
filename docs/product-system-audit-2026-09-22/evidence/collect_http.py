from pathlib import Path
import json,re,urllib.request,concurrent.futures,datetime
from html.parser import HTMLParser
OUT=Path(__file__).parent
class Parser(HTMLParser):
 def __init__(self):
  super().__init__();self.meta={};self.links=[];self.h1=[];self.title='';self.capture=None;self.scripts=[];self.schema=[];self.ld=False
 def handle_starttag(self,t,a):
  a=dict(a)
  if t=='meta':self.meta[a.get('name',a.get('property',''))]=a.get('content','')
  if t=='link' and a.get('rel')=='canonical':self.meta['canonical']=a.get('href')
  if t=='a' and a.get('href'):self.links.append(a['href'])
  if t in ['h1','title']:self.capture=t;self.h1.append('') if t=='h1' else None
  if t=='script':
   self.scripts.append(a.get('src','')); self.ld=a.get('type')=='application/ld+json'
 def handle_endtag(self,t):
  if t==self.capture:self.capture=None
  if t=='script':self.ld=False
 def handle_data(self,d):
  if self.capture=='h1':self.h1[-1]+=d
  if self.capture=='title':self.title+=d
  if self.ld:self.schema.append(d)
def get(path):
 try:
  url='https://pianogrid.com'+path
  with urllib.request.urlopen(urllib.request.Request(url,headers={'User-Agent':'PianoGrid read-only audit'}),timeout=25) as r:
   body=r.read().decode('utf-8');status=r.status;headers=dict(r.headers);final=r.url
  if path in ['/sitemap.xml','/robots.txt']:
   (OUT/('live-'+path[1:])).write_text(body,encoding='utf-8');return {'path':path,'status':status,'url':final,'headers':headers}
  p=Parser();p.feed(body)
  return {'path':path,'status':status,'url':final,'title':p.title,'meta':p.meta,'h1':p.h1,'links':sorted(set(p.links)),'scripts':p.scripts,'schema':p.schema,'xRobots':headers.get('X-Robots-Tag'),'server':headers.get('Server')}
 except Exception as e:return {'path':path,'error':str(e)}
paths=json.loads((OUT/'repo-routes.json').read_text())+['/sitemap.xml','/robots.txt']
with concurrent.futures.ThreadPoolExecutor(max_workers=5) as pool: rows=list(pool.map(get,paths))
(OUT/'live-http.json').write_text(json.dumps({'capturedAt':datetime.datetime.now(datetime.timezone.utc).isoformat(),'rows':rows},ensure_ascii=False,indent=2),encoding='utf-8')
print('HTTP rows',len(rows),'errors',sum('error' in x for x in rows))
