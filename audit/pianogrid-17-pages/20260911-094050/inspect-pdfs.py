from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageStat
from pypdf import PdfReader
import hashlib, json, subprocess

root = Path(__file__).parent
downloads = root / "evidence" / "downloads"
render_root = root / "evidence" / "pdf-renders"
render_root.mkdir(parents=True, exist_ok=True)
pdftoppm = Path(r"C:\Users\Admin\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe")
records = []

for pdf in sorted(downloads.glob("*.pdf")):
    target = render_root / pdf.stem
    target.mkdir(exist_ok=True)
    subprocess.run([str(pdftoppm), "-png", "-r", "120", str(pdf), str(target / "page")], check=True, capture_output=True)
    reader = PdfReader(str(pdf))
    root_object = reader.trailer.get("/Root", {})
    pages = []
    for index, page in enumerate(reader.pages, start=1):
        box = page.mediabox
        images = list(page.images)
        text = page.extract_text() or ""
        rendered = sorted(target.glob(f"page-{index}.png"))
        image_record = None
        if rendered:
            with Image.open(rendered[0]) as image:
                stat = ImageStat.Stat(image.convert("RGB").resize((64, 64)))
                image_record = {"path": rendered[0].relative_to(root).as_posix(), "width": image.width, "height": image.height, "stddev_rgb": [round(x,2) for x in stat.stddev], "blank_risk": max(stat.stddev) < 3}
        pages.append({"page": index, "width_points": float(box.width), "height_points": float(box.height), "text_chars": len(text), "text_excerpt": text[:500], "embedded_images": len(images), "render": image_record})
    data = pdf.read_bytes()
    records.append({
        "file": pdf.relative_to(root).as_posix(), "bytes": len(data), "sha256": hashlib.sha256(data).hexdigest(),
        "page_count": len(reader.pages), "encrypted": reader.is_encrypted,
        "tagged": bool(root_object.get("/StructTreeRoot")), "mark_info": str(root_object.get("/MarkInfo")),
        "metadata": {str(k): str(v) for k,v in (reader.metadata or {}).items()}, "pages": pages,
    })

(root / "evidence" / "pdf-inspection.json").write_text(json.dumps(records, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

images = sorted(render_root.rglob("page-*.png"))
columns, thumb = 4, (280, 360)
rows = (len(images) + columns - 1) // columns
sheet = Image.new("RGB", ((thumb[0]+30)*columns, (thumb[1]+55)*rows), "#dddddd")
draw = ImageDraw.Draw(sheet)
for index, path in enumerate(images):
    with Image.open(path) as source:
        preview = ImageOps.contain(source.convert("RGB"), thumb)
    x = (index % columns) * (thumb[0]+30) + 15
    y = (index // columns) * (thumb[1]+55) + 10
    sheet.paste(preview, (x,y))
    draw.text((x,y+thumb[1]+7), f"{path.parent.name}/{path.name}", fill="black")
sheet.save(root / "evidence" / "contact-pdf-renders.jpg", quality=90)
print(f"inspected {len(records)} PDFs and {len(images)} rendered pages")
