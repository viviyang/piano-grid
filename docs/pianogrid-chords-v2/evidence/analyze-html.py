from html.parser import HTMLParser
from pathlib import Path
import json,re
class Node:
 def __init__(self,tag='',attrs=(),parent=None):self.tag=tag;self.attrs=dict(attrs);self.parent=parent;self.children=[]
 def text(self):return ''.join(c if isinstance(c,str) else c.text() for c in self.children)
 def all(self,tag=None):
  a=[]
  for c in self.children:
   if not isinstance(c,str):
    if tag is None or c.tag==tag:a.append(c)
    a.extend(c.all(tag))
  return a
class Tree(HTMLParser):
 def __init__(self):super().__init__();self.root=Node();self.current=self.root
 def handle_starttag(self,tag,attrs):
  n=Node(tag,attrs,self.current);self.current.children.append(n)
  if tag not in ['area','base','br','col','embed','hr','img','input','link','meta','param','source','track','wbr']:self.current=n
 def handle_endtag(self,tag):
  n=self.current
  while n.parent and n.tag!=tag:n=n.parent
  if n.parent:self.current=n.parent
 def handle_data(self,data):self.current.children.append(data)
def norm(s):return re.sub(r'\s+',' ',s).strip()
out=Path(__file__).parent
report=[]
for slug in ['chords','chords--a-minor','chords--a-major','chords--c-major']:
 pair=[]
 for scope in ['local','live']:
  tree=Tree();tree.feed((out/f'{scope}-{slug}.html').read_text(encoding='utf-8'));r=tree.root;main=r.all('main')[0]
  pair.append({'scope':scope,'title':r.all('title')[0].text(),'metadata':{n.attrs.get('name'):n.attrs.get('content') for n in r.all('meta')},'canonical':[n.attrs.get('href') for n in r.all('link') if n.attrs.get('rel')=='canonical'],'h1':[n.text() for n in main.all('h1')],'headings':[{'tag':n.tag,'id':n.attrs.get('id'),'text':n.text()} for n in main.all() if n.tag in ['h2','h3']],'paragraphs':[norm(n.text()) for n in main.all('p')],'rows':[norm(n.text()) for n in main.all('tr')],'faq':[norm(n.text()) for n in main.all('details')],'figures':len(main.all('figure')),'cards':sum('ch-result' in n.attrs.get('class','').split() for n in main.all()),'jsonld':sum(n.attrs.get('type')=='application/ld+json' for n in r.all('script')),'nojs':[n.text() for n in main.all('noscript')],'links':[{'href':n.attrs.get('href'),'text':norm(n.text())} for n in main.all('a')],'mainText':norm(main.text())})
 report.append({'slug':slug,'sameMainText':pair[0]['mainText']==pair[1]['mainText'],'records':pair})
(out/'html-analysis.json').write_text(json.dumps(report,ensure_ascii=False,indent=2),encoding='utf-8')
print(json.dumps([{'slug':r['slug'],'sameMainText':r['sameMainText'],'figures':r['records'][0]['figures'],'jsonld':r['records'][0]['jsonld'],'cards':r['records'][0]['cards'],'paragraphs':len(r['records'][0]['paragraphs']),'faq':len(r['records'][0]['faq']),'canonical':r['records'][0]['canonical']} for r in report]))
