"""Audit every public PDF; compare regenerated music against the committed files.

Uses the existing PDF toolchain, not OCR. Raster proofs are supplementary:
passing this script does not establish physical-print or accessibility approval.
"""
import hashlib
import json
from pathlib import Path
import re
import subprocess
import sys
import fitz

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'checks/url-audit-final'
AUDIT = re.compile(r'\b(?:N2[A-D]|AM|AN)-[A-Z0-9-]+|source ledger|package validation passed|Input SHA-256:|Generator:|turn\d+(?:view|search)\d+|approved Scales plan evidence|source-scoped', re.I)


def music_rows(doc):
    return [line.strip() for page in doc for line in page.get_text().splitlines()
            if re.match(r'(?:Notes:|Fingers:|[A-G](?:#|b){0,2}[0-9]$)', line.strip())]


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    rows, errors, pairs, regressions = [], [], [], []
    for path in sorted((ROOT / 'public').rglob('*.pdf')):
        relative = path.relative_to(ROOT).as_posix()
        try:
            with fitz.open(path) as doc:
                issues = []
                for number, page in enumerate(doc, 1):
                    text = page.get_text()
                    if re.search('[\ufffd\u25a0\x00]', text):
                        issues.append(f'page {number}: replacement or box character')
                    if AUDIT.search(text):
                        issues.append(f'page {number}: internal audit wording')
                    if any(char[1] == 0 and char[0] not in (0, 32)
                           for span in page.get_texttrace() for char in span['chars']):
                        issues.append(f'page {number}: missing glyph')
                rows.append({'path': relative, 'pages': len(doc), 'issues': issues})
                errors.extend(f'{relative}: {issue}' for issue in issues)
                if path.parent == ROOT / 'public/downloads/scales':
                    old_bytes = subprocess.check_output(['git', 'show', 'HEAD:' + relative], cwd=ROOT)
                    with fitz.open(stream=old_bytes, filetype='pdf') as old:
                        matching = len(old) == len(doc) and music_rows(old) == music_rows(doc)
                        matching = matching and all(a.rect == b.rect for a, b in zip(old, doc))
                        regressions.append({'path': relative, 'music_rows_unchanged': matching,
                                            'music_rows': len(music_rows(doc)), 'pages': len(doc)})
                        if not matching:
                            errors.append(relative + ': music rows, page count or paper size changed')
        except Exception as error:
            errors.append(relative + ': ' + str(error))
    for folder in ['pianogrid-chords-next-expansion', 'pianogrid-chords-n2b', 'pianogrid-chords-n2c', 'pianogrid-chords-n2d-v2']:
        for source in sorted((ROOT / 'docs' / folder / '09_generated_assets').glob('*.pdf')):
            public = ROOT / 'public/reference/assets' / source.name
            match = public.is_file() and hashlib.sha256(source.read_bytes()).digest() == hashlib.sha256(public.read_bytes()).digest()
            pairs.append({'path': public.relative_to(ROOT).as_posix(), 'source_copy_matches': match})
            if not match:
                errors.append(str(public) + ': differs from generated source copy')
    report = {'public_pdfs': len(rows), 'pages_scanned': sum(row['pages'] for row in rows),
              'generated_pairs': len(pairs), 'regenerated_scale_resources': len(regressions),
              'errors': errors, 'rows': rows, 'pairs': pairs, 'music_regressions': regressions,
              'physical_print': 'NOT_RUN', 'pdf_accessibility': 'NOT_VERIFIED'}
    (OUT / 'PDF_AUDIT.json').write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(json.dumps({key: report[key] for key in ['public_pdfs', 'pages_scanned', 'generated_pairs', 'regenerated_scale_resources', 'errors']}, indent=2))
    return bool(errors)


if __name__ == '__main__':
    sys.exit(main())
