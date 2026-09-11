from pathlib import Path
from PIL import Image, ImageOps, ImageDraw, ImageStat
import json

root = Path(__file__).parent
evidence = root / "evidence"
records = []

for path in sorted(evidence.rglob("*.png")):
    with Image.open(path) as image:
        rgb = image.convert("RGB")
        stat = ImageStat.Stat(rgb.resize((64, 64)))
        extrema = rgb.getextrema()
        records.append({
            "path": path.relative_to(root).as_posix(),
            "width": image.width,
            "height": image.height,
            "mode": image.mode,
            "mean_rgb": [round(value, 2) for value in stat.mean],
            "stddev_rgb": [round(value, 2) for value in stat.stddev],
            "extrema": extrema,
            "blank_risk": max(stat.stddev) < 3,
        })

(evidence / "image-inspection.json").write_text(json.dumps(records, indent=2) + "\n", encoding="utf-8")

def contact_sheet(folder, name, viewport_height, thumb_size, columns):
    paths = sorted((evidence / folder).glob("*.png"))
    rows = (len(paths) + columns - 1) // columns
    cell_w, cell_h = thumb_size[0] + 20, thumb_size[1] + 48
    sheet = Image.new("RGB", (cell_w * columns, cell_h * rows), "#e7e7e7")
    draw = ImageDraw.Draw(sheet)
    for index, path in enumerate(paths):
        with Image.open(path) as source:
            crop = source.convert("RGB").crop((0, 0, source.width, min(source.height, viewport_height)))
            thumb = ImageOps.contain(crop, thumb_size)
        x = (index % columns) * cell_w + 10
        y = (index // columns) * cell_h + 10
        sheet.paste(thumb, (x, y))
        draw.text((x, y + thumb_size[1] + 5), path.stem[:34], fill="black")
    out = evidence / f"contact-{name}.jpg"
    sheet.save(out, quality=88)
    return out

contact_sheet("desktop", "desktop-top", 1000, (288, 200), 4)
contact_sheet("mobile", "mobile-top", 844, (195, 422), 5)
contact_sheet("extra", "extra-top", 844, (160, 422), 5)
print(f"inspected {len(records)} PNG files")
