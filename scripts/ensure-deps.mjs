import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import os from "node:os";
import path from "node:path";
import { fileURLToPath } from "node:url";

const workspaceRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const scriptPath = fileURLToPath(import.meta.url);
const lockHeld = process.argv[2] === "--install-lock-held";
const packageName = process.argv[lockHeld ? 3 : 2] ?? "@workspace/numatik";
const packageSlug = packageName.startsWith("@workspace/")
  ? packageName.slice("@workspace/".length)
  : "";

if (!/^[a-z0-9-]+$/.test(packageSlug)) {
  console.error(
    `[workspace] Invalid workspace package name: "${packageName}".`,
  );
  process.exit(1);
}

const packageDir = path.join(workspaceRoot, "artifacts", packageSlug);
if (!existsSync(path.join(packageDir, "package.json"))) {
  console.error(
    `[workspace] Cannot find package.json for workspace package "${packageName}".`,
  );
  process.exit(1);
}

const viteBinary = path.join(packageDir, "node_modules", ".bin", "vite");

if (existsSync(viteBinary)) {
  process.exit(0);
}

if (!lockHeld) {
  const result = spawnSync(
    "flock",
    [
      "--exclusive",
      path.join(os.tmpdir(), "numatik-workspace-pnpm-install.lock"),
      process.execPath,
      scriptPath,
      "--install-lock-held",
      packageName,
    ],
    {
      cwd: workspaceRoot,
      stdio: "inherit",
    },
  );

  if (result.error) {
    console.error(
      `[workspace] Failed to coordinate dependency setup: ${result.error.message}`,
    );
    process.exit(1);
  }
  process.exit(result.status ?? 1);
}

console.log(
  `[workspace] Vite is not installed for ${packageName}; installing workspace dependencies...`,
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
    `[workspace] Full workspace install failed; retrying with the ${packageName} dependency graph.`,
  );
  result = install([
    "install",
    "--filter",
    `${packageName}...`,
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
    `[workspace] pnpm install completed, but Vite for ${packageName} is still missing at ${viteBinary}.`,
  );
  process.exit(1);
}