import subprocess,json,hashlib,difflib
from pathlib import Path
r=Path.cwd();e=r/'checks/product-system-p1-2026-09-22'
tracked=subprocess.check_output(['git','diff','--name-only'],text=True).splitlines();new=subprocess.check_output(['git','ls-files','--others','--exclude-standard'],text=True).splitlines();impl=[p for p in new if p.startswith(('src/','scripts/'))]
(e/'combined-working-tree.diff').write_bytes(subprocess.check_output(['git','diff','--binary']))
(e/'new-implementation.diff').write_text(''.join(''.join(difflib.unified_diff([], (r/p).read_text(encoding='utf-8-sig').splitlines(keepends=True),fromfile='/dev/null',tofile='b/'+p)) for p in impl),encoding='utf8')
paths=list(dict.fromkeys(tracked+new));items=[{'path':p,'kind':'tracked_modified' if p in tracked else 'untracked','sha256':hashlib.sha256((r/p).read_bytes()).hexdigest()} for p in paths if (r/p).is_file() and p!='checks/product-system-p1-2026-09-22/delivery-files.json'];(e/'delivery-files.json').write_text(json.dumps({'cumulativeWithP0':True,'files':items},ensure_ascii=False,indent=2),encoding='utf8');print({'trackedModified':len(tracked),'newImplementation':len(impl),'manifestFiles':len(items)})
