import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
OUT = HERE / "machine"
ASSETS = json.loads((ROOT / "docs/content/asset-map.json").read_text(encoding="utf-8"))["generated_keyboard_notes"]

results = []


def check(name, passed, detail=""):
    results.append({"name": name, "passed": bool(passed), "detail": detail})


for asset in ASSETS:
    path = ROOT / asset["output_path"]
    reader = PdfReader(path)
    expected_pages = 9 if "labeled-88-" in asset["output_path"] else 6
    expected_mode = "shown" if asset["output_path"].endswith("-octaves.pdf") else "hidden"
    texts = [(page.extract_text() or "").strip() for page in reader.pages]
    check(f"{asset['output_path']}: pypdf page count", len(texts) == expected_pages, len(texts))
    check(f"{asset['output_path']}: no blank extracted page", all(len(text) > 100 for text in texts))
    check(f"{asset['output_path']}: title appears on each page", all("Labeled Piano Keys" in text for text in texts))
    check(f"{asset['output_path']}: selected label mode appears on each page", all(f"Octave numbers: {expected_mode}" in text for text in texts))
    check(f"{asset['output_path']}: reference-only disclaimer on each page", all("not a full-size sticker template" in text for text in texts))
    check(f"{asset['output_path']}: source IDs on each page", all("Sources:" in text for text in texts))
    check(f"{asset['output_path']}: hash matches asset map", hashlib.sha256(path.read_bytes()).hexdigest() == asset["sha256"])

OUT.mkdir(parents=True, exist_ok=True)
report = {
    "executed_at": datetime.now(timezone.utc).isoformat(),
    "runtime": "pypdf",
    "passed": sum(item["passed"] for item in results),
    "failed": sum(not item["passed"] for item in results),
    "results": results,
}
(OUT / "pdf-text-validation.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"PDF text review: {report['passed']} passed, {report['failed']} failed.")
for failure in (item for item in results if not item["passed"]):
    print(f"FAIL: {failure['name']} {failure['detail']}")
raise SystemExit(1 if report["failed"] else 0)
