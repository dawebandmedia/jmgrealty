import {
  existsSync,
  cpSync,
  readFileSync,
  mkdirSync,
  writeFileSync,
} from "node:fs";
import { spawn, spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  createPreviewSnapshot,
  checkBuiltAssets,
  findPreviewPort,
  waitForPreview,
} from "./local-preview.mjs";
import { localStoragePaths, preserveLegacyDatabase, applyLocalMigrations } from "./local-storage.mjs";
import { assertAssetSizes } from "./check-static-assets.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
process.chdir(root);
const npmCli = path.join(
  path.dirname(process.execPath),
  "node_modules",
  "npm",
  "bin",
  "npm-cli.js",
);
function run(args, cwd = root) {
  const result = spawnSync(process.execPath, args, {
    cwd,
    stdio: "inherit",
    windowsHide: true,
  });
  if (result.error || result.status !== 0)
    throw new Error(
      result.error?.message ||
        "A setup step could not complete. Read the message above and try again.",
    );
}
let server;
let stopping = false;
function stopPreview() {
  if (
    stopping ||
    !server ||
    server.exitCode !== null ||
    server.signalCode !== null
  )
    return;
  stopping = true;
  if (process.platform === "win32") {
    const stopped = spawnSync(
      "taskkill.exe",
      ["/PID", String(server.pid), "/T", "/F"],
      { windowsHide: true, stdio: "ignore" },
    );
    if (stopped.error || stopped.status !== 0) server.kill("SIGTERM");
  } else server.kill("SIGTERM");
}
process.on("SIGINT", () => {
  stopPreview();
  process.exit(0);
});
process.on("SIGTERM", () => {
  stopPreview();
  process.exit(0);
});
if (process.platform === "win32")
  process.on("SIGBREAK", () => {
    stopPreview();
    process.exit(0);
  });
process.on("exit", stopPreview);
try {
  console.log("Checking website image and document sizes…");
  assertAssetSizes(path.join(root, "public"));
  const storage = localStoragePaths(root);
  process.env.XDG_CONFIG_HOME ??= path.join(storage.runtime, "xdg-config");
  process.env.SITES_RUNTIME_ROOT = storage.runtime;
  mkdirSync(process.env.XDG_CONFIG_HOME, { recursive: true });
  await preserveLegacyDatabase(root, storage);
  const readyFile = path.join(storage.packages, ".jmg-packages-ready");
  const packagesReady = existsSync(readyFile) && readFileSync(readyFile, "utf8") === storage.packageKey;
  if (!packagesReady || !existsSync(path.join(storage.packages, "node_modules", "vinext")) || !existsSync(storage.wrangler)) {
    if (!existsSync(npmCli))
      throw new Error(
        "Install the current Node.js LTS release (which includes npm), then launch this file again.",
      );
    console.log(
      "Installing the website packages. The first launch needs an internet connection.",
    );
    mkdirSync(storage.packages, { recursive: true });
    for (const file of ["package.json", "package-lock.json", ".npmrc"])
      if (existsSync(path.join(root, file))) cpSync(path.join(root, file), path.join(storage.packages, file));
    run([
      npmCli,
      "ci",
      "--workspaces=false",
      "--include=dev",
      "--include=optional",
      "--no-audit",
      "--no-fund",
    ], storage.packages);
    writeFileSync(readyFile, storage.packageKey);
  }
  console.log("Preparing your website…");
  const snapshot = createPreviewSnapshot(root, { buildsRoot: storage.builds });
  run(
    [path.join(storage.packages, "node_modules", "vinext", "dist", "cli.js"), "build"],
    snapshot,
  );
  checkBuiltAssets(snapshot);
  const config = path.join(snapshot, "dist", "server", "wrangler.json");
  const database = storage.database;
  applyLocalMigrations(root, config, storage);
  const port = await findPreviewPort();
  const url = `http://127.0.0.1:${port}/`;
  server = spawn(
    process.execPath,
    [
      "--import",
      "./scripts/sites-env.mjs",
      storage.wrangler,
      "dev",
      "--config",
      config,
      "--local",
      "--persist-to",
      database,
      "--ip",
      "127.0.0.1",
      "--port",
      String(port),
      "--inspector-port",
      "0",
      "--log-level",
      "error",
    ],
    { cwd: root, stdio: ["ignore", "pipe", "pipe"], windowsHide: true },
  );
  const closed = new Promise((resolve) => server.once("exit", resolve));
  server.stdout.on("data", (chunk) => process.stdout.write(chunk));
  server.stderr.on("data", (chunk) => process.stderr.write(chunk));
  server.on("error", (error) => {
    console.error(error.message);
    process.exitCode = 1;
  });
  server.on("exit", (code) => {
    process.exitCode = stopping ? 0 : code || 0;
  });
  const assets = await waitForPreview(url, server);
  writeFileSync(
    path.join(storage.runtime, "local-server.json"),
    JSON.stringify({
      pid: server.pid,
      url,
      buildRoot: snapshot,
      assetsChecked: assets,
    }),
  );
  console.log(
    `\nJMG PREVIEW READY: ${url}\nStyles, browser scripts and images checked.\nLocal records folder: ${database}\nOwner inbox: ${url}owner\nLocal owner password: local-preview-only\nKeep this window open while viewing the website. Close it to stop the local server.\n`,
  );
  if (port !== 4187)
    console.log(
      "An older preview is already open. This launch uses the new address above.",
    );
  if (process.platform === "win32" && process.env.JMG_SKIP_BROWSER_OPEN !== "1")
    spawn("cmd.exe", ["/d", "/s", "/c", `start "" "${url}"`], {
      windowsHide: true,
      stdio: "ignore",
    });
  if (process.env.JMG_PREVIEW_STOP_AFTER_MS)
    setTimeout(stopPreview, Number(process.env.JMG_PREVIEW_STOP_AFTER_MS));
  await closed;
} catch (error) {
  stopPreview();
  console.error(`\n${error.message}`);
  process.exitCode = 1;
}
