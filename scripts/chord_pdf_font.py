"""Register an embeddable, regular-weight music-symbol font for chord PDFs."""

import tempfile
from pathlib import Path

from fontTools.ttLib import TTFont as FontToolsFont
from fontTools.varLib.instancer import instantiateVariableFont
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont as ReportLabFont


def register_chord_pdf_font(source: Path, name: str) -> None:
    if not source.exists():
        raise SystemExit(f"Missing required Unicode font: {source}")
    regular = Path(tempfile.gettempdir()) / "pianogrid-noto-sans-sc-regular.ttf"
    if not regular.exists() or regular.stat().st_mtime < source.stat().st_mtime:
        font = FontToolsFont(source)
        if font["OS/2"].fsType != 0:
            raise SystemExit("Chord PDF font does not allow embedding")
        license_text = " ".join(record.toUnicode() for record in font["name"].names if record.nameID in (13, 14)).lower()
        if "open font license" not in license_text:
            raise SystemExit("Chord PDF font license was not verified")
        instance = instantiateVariableFont(font, {"wght": 400}, inplace=False)
        temporary = regular.with_suffix(".tmp")
        instance.save(temporary)
        temporary.replace(regular)
        instance.close()
        font.close()
    pdfmetrics.registerFont(ReportLabFont(name, str(regular)))
