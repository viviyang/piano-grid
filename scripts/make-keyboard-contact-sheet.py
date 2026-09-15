from pathlib import Path
from PIL import Image, ImageDraw

source = Path("checks/keyboard-completion/screenshots")
files = sorted(source.glob("*.png"))
cell_w, cell_h, columns = 360, 620, 5
rows = (len(files) + columns - 1) // columns
sheet = Image.new("RGB", (cell_w * columns, cell_h * rows), "white")
draw = ImageDraw.Draw(sheet)
for index, path in enumerate(files):
    image = Image.open(path).convert("RGB")
    image.thumbnail((cell_w - 20, cell_h - 45))
    x = (index % columns) * cell_w + 10
    y = (index // columns) * cell_h + 30
    sheet.paste(image, (x, y))
    draw.text((x, y - 22), path.stem, fill="black")
sheet.save("checks/keyboard-completion/contact-sheet.png")
