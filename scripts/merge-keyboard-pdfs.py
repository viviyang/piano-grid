from pathlib import Path
from pypdf import PdfReader, PdfWriter

root = Path("tmp/pdfs/keyboard-notes-final")
parts = root / "parts"
for count, pages in ((88, 3), (61, 2)):
    for mode in ("octaves", "letters"):
        writer = PdfWriter()
        for page in range(1, pages + 1):
            source = parts / f"labeled-{count}-{mode}-{page}.pdf"
            reader = PdfReader(source)
            if len(reader.pages) != 1:
                raise RuntimeError(f"Expected one page in {source}, found {len(reader.pages)}")
            writer.add_page(reader.pages[0])
        destination = root / f"labeled-{count}-{mode}.pdf"
        with destination.open("wb") as stream:
            writer.write(stream)
        if len(PdfReader(destination).pages) != pages:
            raise RuntimeError(f"Merged page count mismatch: {destination}")
        print(destination)
