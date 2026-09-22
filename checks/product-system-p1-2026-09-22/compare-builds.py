import json,re
from pathlib import Path
r=Path.cwd();out=r/'checks/product-system-p1-2026-09-22';a=r/'.next-p0-final/server/app';b=r/'.next-p1-final/server/app'
def meta(p):
 s=p.read_text(encoding='utf8');return {k:re.findall(pattern,s) for k,pattern in {'title':r'<title>(.*?)</title>','description':r'<meta name="description" content="([^"]*)"','canonical':r'<link rel="canonical" href="([^"]*)"','robots':r'<meta name="robots" content="([^"]*)"','h1':r'<h1[^>]*>(.*?)</h1>'}.items()}
old={str(p.relative_to(a)):meta(p) for p in a.rglob('*.html')};new={str(p.relative_to(b)):meta(p) for p in b.rglob('*.html')};changes=[p for p in old.keys()|new.keys() if old.get(p)!=new.get(p)]
ma=json.loads((r/'.next-p0-final/routes-manifest.json').read_text());mb=json.loads((r/'.next-p1-final/routes-manifest.json').read_text());result={'before':len(old),'after':len(new),'metadataChanges':changes,'staticRoutesEqual':ma['staticRoutes']==mb['staticRoutes'],'dynamicRoutesEqual':ma['dynamicRoutes']==mb['dynamicRoutes']};(out/'metadata-comparison.json').write_text(json.dumps(result,indent=2),encoding='utf8');print(result)

