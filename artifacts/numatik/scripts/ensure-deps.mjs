import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptsDir = path.dirname(fileURLToPath(import.meta.url));
const packageDir = path.resolve(scriptsDir, "..");
const workspaceRoot = path.resolve(packageDir, "..", "..");
const viteBinary = path.join(packageDir, "node_modules", ".bin", "vite");

if (existsSync(viteBinary)) {
  process.exit(0);
}

console.log(
  "[numatik] Vite is not installed; installing the workspace dependencies...",
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
    "[numatik] Full workspace install failed; retrying with the Numatik dependency graph.",
  );
  result = install([
    "install",
    "--filter",
    "@workspace/numatik...",
    "--frozen-lockfile",
  ]);
}

if (result.error) {
  console.error(`[numatik] Failed to start pnpm install: ${result.error.message}`);
  process.exit(1);
}

if (result.status !== 0) {
  console.error(`[numatik] pnpm install failed with exit code ${result.status}.`);
  process.exit(result.status ?? 1);
}

if (!existsSync(viteBinary)) {
  console.error(
    `[numatik] pnpm install completed, but ${viteBinary} is still missing.`,
  );
  process.exit(1);
}