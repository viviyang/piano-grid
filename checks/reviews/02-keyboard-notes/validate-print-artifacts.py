import hashlib
import json
from datetime import datetime, timezone
from pathlib import Path

from pypdf import PdfReader

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[2]
OUT = HERE / "machine"
FILES = {
    "chart-focus.pdf": {"pages": 5, "treble": True, "bass": True},
    "chart-treble.pdf": {"pages": 5, "treble": True, "bass": False},
    "chart-bass.pdf": {"pages": 5, "treble": False, "bass": True},
    "chart-88_keys.pdf": {"pages": 15, "treble": True, "bass": True},
}
results = []
artifacts = []


def check(name, passed, detail=""):
    results.append({"name": name, "passed": bool(passed), "detail": detail})


for name, expected in FILES.items():
    path = ROOT / "checks/batches/02-keyboard-notes/print-pdfs" / name
    reader = PdfReader(path)
    pages = [(page.extract_text() or "").strip() for page in reader.pages]
    artifacts.append({"path": str(path.relative_to(ROOT)).replace("\\", "/"), "bytes": path.stat().st_size, "sha256": hashlib.sha256(path.read_bytes()).hexdigest()})
    check(f"{name}: page count", len(pages) == expected["pages"], len(pages))
    check(f"{name}: no blank page", all(len(text) > 100 for text in pages))
    check(f"{name}: chart title on every page", all("Piano Notes Chart" in text for text in pages))
    check(f"{name}: selected pitch on every page", all("Selected:" in text for text in pages))
    check(f"{name}: keyboard order on every page", all("Keyboard order:" in text for text in pages))
    check(f"{name}: notation disclaimer on every page", all("Same pitch may have multiple spellings" in text for text in pages))
    check(f"{name}: treble inclusion matches", all(("Treble clef" in text) == expected["treble"] for text in pages))
    check(f"{name}: bass inclusion matches", all(("Bass clef" in text) == expected["bass"] for text in pages))

OUT.mkdir(parents=True, exist_ok=True)
report = {
    "executed_at": datetime.now(timezone.utc).isoformat(),
    "scope": "Independent parse and render inspection of the implementation handoff's browser-print PDF artifacts; current IAB snapshot state was checked separately.",
    "passed": sum(item["passed"] for item in results),
    "failed": sum(not item["passed"] for item in results),
    "artifacts": artifacts,
    "results": results,
}
(OUT / "print-artifact-validation.json").write_text(json.dumps(report, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")
print(f"Print artifact review: {report['passed']} passed, {report['failed']} failed.")
for failure in (item for item in results if not item["passed"]):
    print(f"FAIL: {failure['name']} {failure['detail']}")
raise SystemExit(1 if report["failed"] else 0)
