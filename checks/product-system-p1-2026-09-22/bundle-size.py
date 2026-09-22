import json
from pathlib import Path
r=Path.cwd();rows={}
for name in ['.next-p0-final','.next-p1-final']:
 files=list((r/name/'static/chunks').glob('*.js'));rows[name]={'chunkCount':len(files),'allChunkBytes':sum(p.stat().st_size for p in files)}
(r/'checks/product-system-p1-2026-09-22/bundle-size.json').write_text(json.dumps({'scope':'all emitted JS chunks; not per-route download or Web Vitals','builds':rows},indent=2),encoding='utf8');print(rows)
