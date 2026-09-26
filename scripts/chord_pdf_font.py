"""Register a user-supplied, embeddable font without depending on one computer.

Set PIANOGRID_PDF_FONT to an OFL-licensed TrueType font with music accidentals.
The original Windows path remains a compatibility fallback, not a requirement.
No font is downloaded, copied into the repository, or silently substituted.
"""
from hashlib import sha256
import os
from pathlib import Path
import tempfile

from fontTools.ttLib import TTFont as FontToolsFont
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as ReportLabFont

REQUIRED_CHARACTERS = ''.join(chr(code) for code in range(32, 127)) + '♭♯♮–—·'
LEGACY_FONT = Path(r'C:\Windows\Fonts\NotoSansSC-VF.ttf')


def resolve_font(source: Path | None = None) -> Path:
    override = os.environ.get('PIANOGRID_PDF_FONT')
    path = Path(override).expanduser() if override else (source or LEGACY_FONT)
    if not path.is_file():
        raise SystemExit('Missing chord PDF font. Set PIANOGRID_PDF_FONT to an existing '
                         'OFL-licensed TrueType font containing Latin text and ♭ ♯ ♮. '
                         f'Attempted: {path}')
    return path.resolve()


def validate_font(font: FontToolsFont) -> None:
    # Licensing and coverage are checked even when a cached instance exists.
    if 'OS/2' not in font or font['OS/2'].fsType != 0:
        raise SystemExit('Chord PDF font must allow installable embedding (OS/2 fsType=0).')
    license_text = ' '.join(record.toUnicode() for record in font['name'].names
                            if record.nameID in (13, 14)).lower()
    if 'open font license' not in license_text and 'openfontlicense.org' not in license_text:
        raise SystemExit('Chord PDF font license was not verified as OFL.')
    if 'glyf' not in font:
        raise SystemExit('Use a TrueType-outline font; this ReportLab exporter does not use CFF outlines.')
    cmap = font.getBestCmap() or {}
    missing = [char for char in REQUIRED_CHARACTERS if ord(char) not in cmap or cmap[ord(char)] == '.notdef']
    if missing:
        raise SystemExit('Chord PDF font lacks required glyphs: ' + ' '.join(f'U+{ord(c):04X}' for c in missing))


def register_chord_pdf_font(source: Path | None, name: str) -> None:
    path = resolve_font(source)
    with FontToolsFont(path) as font:
        validate_font(font)
        if 'fvar' not in font:
            pdfmetrics.registerFont(ReportLabFont(name, str(path)))
            return
        axes = {axis.axisTag: axis.defaultValue for axis in font['fvar'].axes}
        weight = next((axis for axis in font['fvar'].axes if axis.axisTag == 'wght'), None)
        if weight:
            if not weight.minValue <= 400 <= weight.maxValue:
                raise SystemExit('Chord PDF font does not provide regular weight 400.')
            axes['wght'] = 400
        identity = sha256(path.read_bytes() + repr(sorted(axes.items())).encode() + b'pdf-font-v2').hexdigest()
        cache = Path(tempfile.gettempdir()) / 'pianogrid-pdf-fonts'
        cache.mkdir(exist_ok=True)
        regular = cache / f'{identity}.ttf'
        usable = False
        if regular.is_file():
            try:
                with FontToolsFont(regular) as cached:
                    validate_font(cached)
                    usable = 'fvar' not in cached
            except (Exception, SystemExit):
                usable = False
        if not usable:
            instance = instantiateVariableFont(font, axes, inplace=False)
            fd, temporary = tempfile.mkstemp(prefix=identity + '-', suffix='.tmp', dir=cache)
            os.close(fd)
            try:
                instance.save(temporary)
                os.replace(temporary, regular)
            finally:
                instance.close()
                Path(temporary).unlink(missing_ok=True)
        pdfmetrics.registerFont(ReportLabFont(name, str(regular)))
