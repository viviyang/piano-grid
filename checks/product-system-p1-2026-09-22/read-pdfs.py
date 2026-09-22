from pathlib import Path
from pypdf import PdfReader
import json
out=Path('checks/product-system-p1-2026-09-22');rows=[]
for name in ['pianogrid-c-major-two-hand-starter.pdf','pianogrid-c-major-two-hand-starter-a4.pdf']:
 p=Path('public/downloads/scales')/name;reader=PdfReader(p);texts=[page.extract_text() for page in reader.pages];rows.append({'path':str(p),'pages':len(reader.pages),'sizes':[[float(x) for x in page.mediabox] for page in reader.pages],'text':texts});
(out/'pdf-existing.json').write_text(json.dumps(rows,indent=2,ensure_ascii=False),encoding='utf8');print(json.dumps(rows,ensure_ascii=False))
try:
 import fitz
 for row in rows:
  doc=fitz.open(row['path'])
  for i,page in enumerate(doc):page.get_pixmap(matrix=fitz.Matrix(1.25,1.25)).save(str(out/(Path(row['path']).stem+f'-{i+1}.png')))
 print('rendered with bundled PyMuPDF')
except ImportError:print('PyMuPDF unavailable')
