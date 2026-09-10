import { spawnSync } from 'node:child_process';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '../../..');
const machine = join(here, 'machine');
const outputPath = 'checks/reviews/02-keyboard-notes/machine/foundation';
const scripts = [
  ['scripts/check-foundation.mjs', 'check-foundation.review.mjs'],
  ['scripts/check-css.mjs', 'check-css.review.mjs'],
];

await mkdir(machine, { recursive: true });
const runs = [];
for (const [sourcePath, runnerName] of scripts) {
  let source = await readFile(join(root, sourcePath), 'utf8');
  source = source.replace(
    /const root\s*=\s*dirname\(dirname\(fileURLToPath\(import\.meta\.url\)\)\);/,
    `const root=${JSON.stringify(root.replaceAll('\\', '/'))};`,
  );
  source = source.replaceAll('checks/batches/02-keyboard-notes', outputPath);
  const runnerPath = join(machine, runnerName);
  await writeFile(runnerPath, source);
  const run = spawnSync(process.execPath, [runnerPath], { cwd: root, encoding: 'utf8' });
  runs.push({
    source: sourcePath,
    runner: runnerPath.replaceAll('\\', '/'),
    exit_code: run.status,
    stdout: run.stdout,
    stderr: run.stderr,
  });
  process.stdout.write(run.stdout);
  process.stderr.write(run.stderr);
}

await writeFile(join(machine, 'foundation-command-results.json'), JSON.stringify({
  executed_at: new Date().toISOString(),
  derivation: 'Exact project check scripts with only root binding and report output path redirected into this independent review directory.',
  runs,
}, null, 2) + '\n');
process.exitCode = runs.some((run) => run.exit_code !== 0) ? 1 : 0;
