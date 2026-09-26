// Portable entry point. The Python standard-library parser keeps body directory
// links and measures shortest paths rather than guessing depth from hub names.
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';
const script = fileURLToPath(new URL('../../../scripts/audit-url-141.py', import.meta.url));
const python = process.env.PIANO_PYTHON || (process.platform === 'win32' ? 'python' : 'python3');
const result = spawnSync(python, [script, ...process.argv.slice(2)], { stdio: 'inherit' });
if (result.error) console.error(result.error.message);
process.exit(result.status ?? 1);
