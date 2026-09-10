from pathlib import Path
from PIL import Image, ImageDraw

HERE = Path(__file__).resolve().parent
RENDERS = HERE / "pdf-renders"

for folder in sorted(path for path in RENDERS.iterdir() if path.is_dir()):
    pages = sorted(folder.glob("page-*.png"), key=lambda path: int(path.stem.split("-")[-1]))
    if not pages:
        continue
    thumbs = []
    for page in pages:
        image = Image.open(page).convert("RGB")
        image.thumbnail((420, 544))
        thumbs.append((page, image.copy()))
    cols = 3
    rows = (len(thumbs) + cols - 1) // cols
    sheet = Image.new("RGB", (cols * 450, rows * 584), "#e7e7e7")
    draw = ImageDraw.Draw(sheet)
    for index, (page, image) in enumerate(thumbs):
        x = (index % cols) * 450 + 15
        y = (index // cols) * 584 + 25
        sheet.paste(image, (x, y))
        draw.text((x, 7 + (index // cols) * 584), page.stem, fill="#111111")
    sheet.save(RENDERS / f"{folder.name}-contact.png")
