import re,json
from pathlib import Path
root=Path.cwd();entries=[]
for p in (root/'.next-p1/server/app').rglob('*.html'):
 s=p.read_text(encoding='utf8');matches=re.findall(r'<aside[^>]*data-product-continuation="([^"]+)"',s)
 if matches:entries.append({'html':str(p.relative_to(root/'.next-p1/server/app')),'areas':matches})
(root/'checks/product-system-p1-2026-09-22/ssr-pilot-scope.json').write_text(json.dumps(entries,indent=2),encoding='utf8');print(entries)
