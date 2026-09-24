#!/usr/bin/env python3
"""Check published chord PDF text against the existing source packages."""

import json
import hashlib
from pathlib import Path

import pymupdf

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / 'public/reference/assets'
PACKS = [
    ('N1', ROOT / 'docs/pianogrid-chords-next-expansion/04_details_next', ROOT / 'docs/pianogrid-chords-next-expansion/09_generated_assets'),
    ('N2B', ROOT / 'docs/pianogrid-chords-n2b/03_details', ROOT / 'docs/pianogrid-chords-n2b/09_generated_assets'),
    ('N2C', ROOT / 'docs/pianogrid-chords-n2c/03_details', ROOT / 'docs/pianogrid-chords-n2c/09_generated_assets'),
    ('N2D', ROOT / 'docs/pianogrid-chords-n2d-v2/03_content/details', ROOT / 'docs/pianogrid-chords-n2d-v2/09_generated_assets'),
]
BAD_GLYPHS = ('\x00', '\ufffd', '\u25a1', '\u1d12')


def exported(value):
    return value.replace('𝄫', '♭♭').replace('𝄪', '♯♯')


def sha(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


def expected_names(pack, raw):
    if pack == 'N1':
        return [raw['data']['symbol'], *raw['data']['pitch_classes'], *[note for v in raw['data']['voicings'] for note in v['notes']]]
    if pack in ('N2B', 'N2C'):
        return [raw['symbol'], *raw['definition']['toneSpellings'], *[note for v in raw['voicings'] for note in v['notesLowToHigh']]]
    return [raw['symbol'], *[part['spelling'] for part in raw['definition']['components']], *[note for v in raw['realizations'] for note in v['notesLowToHigh']]]


def main():
    failures = []
    checked = []
    for pack, details, generated in PACKS:
        for source in sorted(details.glob('*.page.json')):
            raw = json.loads(source.read_text(encoding='utf-8'))
            slug = raw['url'].split('/')[-1]
            public_pdf = PUBLIC / f'chord-{slug}.pdf'
            generated_pdf = generated / public_pdf.name
            public_svg = PUBLIC / f'chord-{slug}.svg'
            generated_svg = generated / public_svg.name
            if not all(path.exists() for path in (public_pdf, generated_pdf, public_svg, generated_svg)):
                failures.append({'slug': slug, 'issue': 'missing generated or public asset'})
                continue
            if sha(public_pdf) != sha(generated_pdf) or sha(public_svg) != sha(generated_svg):
                failures.append({'slug': slug, 'issue': 'public/generated asset mismatch'})
            with pymupdf.open(public_pdf) as document:
                text = '\n'.join(page.get_text() for page in document)
                embedded_fonts = {font[3] for page in document for font in page.get_fonts()}
            missing = sorted({exported(name) for name in expected_names(pack, raw) if exported(name) not in text})
            if missing:
                failures.append({'slug': slug, 'issue': 'source spelling absent from PDF text', 'missing': missing})
            if any(char in text for char in BAD_GLYPHS):
                failures.append({'slug': slug, 'issue': 'replacement, square or truncated music glyph'})
            if not any('NotoSansSC' in font for font in embedded_fonts):
                failures.append({'slug': slug, 'issue': 'expected Unicode font not embedded'})
            if any(f'{internal} source ledger' in text for internal in ('N2B', 'N2C', 'N2D')):
                failures.append({'slug': slug, 'issue': 'internal source ID in PDF'})
            checked.append({'pack': pack, 'url': raw['url'], 'pdf': '/reference/assets/' + public_pdf.name})
    for path in sorted((ROOT / 'public').rglob('*.pdf')):
        with pymupdf.open(path) as document:
            text = '\n'.join(page.get_text() for page in document)
        if any(char in text for char in BAD_GLYPHS):
            failures.append({'pdf': str(path.relative_to(ROOT)).replace('\\', '/'), 'issue': 'bad extracted glyph in public PDF scan'})
    report = {'generated_chord_pdfs_checked': len(checked), 'all_public_pdfs_scanned': len(list((ROOT / 'public').rglob('*.pdf'))), 'failures': failures, 'affected_chord_urls': [item['url'] for item in checked], 'regenerated_pdf_urls': [item['pdf'] for item in checked]}
    out = ROOT / 'checks/indexing-quality-v2/pdf-assets.json'
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(report, ensure_ascii=False, indent=2) + '\n', encoding='utf-8')
    print(f"Checked {report['generated_chord_pdfs_checked']} generated chord PDFs and {report['all_public_pdfs_scanned']} public PDFs; failures: {len(failures)}")
    for failure in failures[:15]:
        print(json.dumps(failure, ensure_ascii=False))
    return 1 if failures else 0


if __name__ == '__main__':
    raise SystemExit(main())
