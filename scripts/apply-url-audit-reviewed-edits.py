"""Apply reviewed line edits only when original and resulting Git blob hashes match.

Temporary delivery bridge, removed after the same-branch verified commit.
All files are validated before any are written. No Git or network operations.
"""
import hashlib
import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]

def blob(data):
    return hashlib.sha1(b'blob ' + str(len(data)).encode() + b'\0' + data).hexdigest()

records = json.loads((ROOT / 'scripts/url-audit-reviewed-edits.json').read_text())
pending = []
for record in records:
    path = ROOT / record['path']
    if path.is_symlink() or ROOT not in path.resolve().parents or Path(record['path']).parts[0] not in ('scripts', 'src'):
        raise SystemExit('Unsafe target: ' + record['path'])
    before = path.read_bytes()
    if blob(before) == record['sha']:
        continue
    if blob(before) != record['base']:
        raise SystemExit('Baseline changed; refusing overwrite: ' + record['path'])
    lines = before.decode('utf-8').splitlines(keepends=True)
    for start, end, content in reversed(record['edits']):
        lines[start:end] = [content]
    after = ''.join(lines).encode('utf-8')
    if blob(after) != record['sha']:
        raise SystemExit('Result checksum mismatch: ' + record['path'])
    pending.append((path, after))
for path, content in pending:
    path.write_bytes(content)
print(f'Applied {len(pending)} reviewed files after complete checksum validation.')
