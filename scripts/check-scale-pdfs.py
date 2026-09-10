import json
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path

from PIL import Image
from pypdf import PdfReader

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'checks' / 'batches' / '03-scales'
PDFS = OUT / 'print-pdfs'
RENDERS = OUT / 'print-renders'
POPPLER = Path(os.environ.get('PIANO_PDFTOPPM', r'C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe'))
EXPECTED = {
    'scales-center-c-major.pdf': ['C Major', 'Right hand', 'Ascending', 'Descending', 'Sources: AM-NOTES-C-MAJOR, AM-FINGER-LMT'],
    'c-major-lh-up-down.pdf': ['C Major', 'Left hand', 'Ascending', 'Descending', 'Sources: AM-NOTES-C-MAJOR, AM-FINGER-LMT'],
    'a-minor-natural-rh-ascending.pdf': ['A Natural minor', 'Right hand', '40 BPM', 'Fingers 1 2 3 1 2 3 4 5', 'Sources: AN-HMT-A, AN-PS-NAT'],
    'a-minor-melodic-rh-descending.pdf': ['A Melodic minor (classical exercise)', 'Right hand', '80 BPM', 'Descending Notes only', 'Notes A5 G5 F5 E5 D5 C5 B4 A4', 'Sources: AN-HMT-A, AN-DENTON'],
}

results = []


def check(name, passed, detail=''):
    results.append({'name': name, 'passed': bool(passed), 'detail': str(detail)})
    if not passed:
        print('FAIL', name, detail)


RENDERS.mkdir(parents=True, exist_ok=True)
for old in RENDERS.glob('*.png'):
    old.unlink()

check('pdftoppm is available', POPPLER.is_file(), POPPLER)
for filename, fragments in EXPECTED.items():
    path = PDFS / filename
    check(f'{filename} exists', path.is_file(), path)
    if not path.is_file():
        continue
    check(f'{filename} has substantial bytes', path.stat().st_size > 20_000, path.stat().st_size)
    reader = PdfReader(path)
    check(f'{filename} is one page', len(reader.pages) == 1, len(reader.pages))
    text = ' '.join((page.extract_text() or '').replace('\n', ' ') for page in reader.pages)
    normalized_text = text.replace('- ', '-')
    for fragment in fragments:
        check(f'{filename} contains {fragment}', fragment in normalized_text, text[:500])
    check(f'{filename} avoids all-scale PDF claim', 'all-scale' not in text.lower() and 'two-hand beginner pdf' not in text.lower())
    if POPPLER.is_file():
        stem = RENDERS / path.stem
        completed = subprocess.run([str(POPPLER), '-png', '-singlefile', '-r', '110', str(path), str(stem)], capture_output=True, text=True)
        check(f'{filename} renders', completed.returncode == 0, completed.stderr)
        render = stem.with_suffix('.png')
        if render.is_file():
            image = Image.open(render).convert('L')
            pixels = image.get_flattened_data() if hasattr(image, 'get_flattened_data') else image.getdata()
            dark = sum(1 for pixel in pixels if pixel < 245)
            check(f'{filename} render is nonblank', dark > 5_000, dark)

report = {
    'executed_at': datetime.now(timezone.utc).isoformat(),
    'python': os.sys.version.split()[0],
    'passed': sum(item['passed'] for item in results),
    'failed': sum(not item['passed'] for item in results),
    'results': results,
}
(OUT / 'pdf-validation.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
print(f"Scale PDFs: {report['passed']} passed, {report['failed']} failed.")
raise SystemExit(1 if report['failed'] else 0)
