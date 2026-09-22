import json,hashlib
from pathlib import Path
r=Path.cwd();o=r/'checks/product-system-p1-2026-09-22'
files=list((r/'src').rglob('*'))+list((r/'scripts').glob('*'))
(o/'inherited-file-hashes.json').write_text(json.dumps({str(p.relative_to(r)).replace('\\','/'):hashlib.sha256(p.read_bytes()).hexdigest() for p in files if p.is_file()},indent=2),encoding='utf8')
