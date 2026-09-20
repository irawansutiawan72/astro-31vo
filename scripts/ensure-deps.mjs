import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const viteBinary = path.join(
  workspaceRoot,
  "artifacts",
  "numatik",
  "node_modules",
  ".bin",
  "vite",
);

if (existsSync(viteBinary)) {
  process.exit(0);
}

console.log(
  "[workspace] Vite is not installed; installing workspace dependencies...",
);

function install(args) {
  return spawnSync("pnpm", args, {
    cwd: workspaceRoot,
    stdio: "inherit",
  });
}

let result = install(["install", "--frozen-lockfile"]);

if (result.status !== 0) {
  console.warn(
    "[workspace] Frozen-lockfile install failed; retrying without the frozen lockfile.",
  );
  result = install(["install", "--no-frozen-lockfile"]);
}

if (result.status !== 0) {
  console.warn(
    "[workspace] Full workspace install failed; retrying with the Numatik dependency graph.",
  );
  result = install([
    "install",
    "--filter",
    "@workspace/numatik...",
    "--frozen-lockfile",
  ]);
}

if (result.error) {
  console.error(`[workspace] Failed to start pnpm install: ${result.error.message}`);
  process.exit(1);
}

if (result.status !== 0) {
  console.error(`[workspace] pnpm install failed with exit code ${result.status}.`);
  process.exit(result.status ?? 1);
}

if (!existsSync(viteBinary)) {
  console.error(
    `[workspace] pnpm install completed, but ${viteBinary} is still missing.`,
  );
  process.exit(1);
}