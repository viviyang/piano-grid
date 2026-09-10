import { spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(import.meta.dirname, "../../..");
const outputPath = resolve(
  projectRoot,
  "checks/reviews/02-keyboard-notes/machine/command-results.json",
);

const runs = [];

for (const args of [
  ["run", "typecheck"],
  ["run", "build"],
]) {
  const result = spawnSync("npm", args, {
    cwd: projectRoot,
    encoding: "utf8",
    shell: true,
    windowsHide: true,
  });

  runs.push({
    command: `npm ${args.join(" ")}`,
    exit_code: result.status,
    stdout: result.stdout,
    stderr: result.stderr,
    error: result.error?.message ?? "",
  });

  if (result.status !== 0) {
    break;
  }
}

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  `${JSON.stringify(
    {
      executed_at: new Date().toISOString(),
      runs,
    },
    null,
    2,
  )}\n`,
);

for (const run of runs) {
  process.stdout.write(`${run.command}: exit ${run.exit_code}\n`);
}

process.exit(runs.every((run) => run.exit_code === 0) ? 0 : 1);
