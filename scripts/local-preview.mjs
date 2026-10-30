import { cpSync, existsSync, mkdirSync, readdirSync, statSync } from "node:fs";
import { createServer } from "node:net";
import path from "node:path";
import { assertAssetSizes } from "./check-static-assets.mjs";

// Each launch builds a separate snapshot so a running preview keeps its assets.
export function createPreviewSnapshot(root, { buildsRoot } = {}) {
  const builds = buildsRoot || path.join(root, ".sites-runtime", "preview-builds");
  mkdirSync(builds, { recursive: true });
  const snapshot = path.join(builds, `${Date.now()}-${process.pid}`);
  mkdirSync(snapshot);
  const excluded = new Set([
    "node_modules",
    ".git",
    ".sites-runtime",
    ".vinext",
    ".next",
    ".review-npm-cache",
    ".wrangler",
    "dist",
    "outputs",
    "work",
    ".agents",
    ".codex",
  ]);
  for (const name of readdirSync(root)) {
    if (
      excluded.has(name) ||
      name.startsWith(".env") ||
      name.endsWith(".tsbuildinfo")
    )
      continue;
    cpSync(path.join(root, name), path.join(snapshot, name), {
      recursive: true,
    });
  }
  return snapshot;
}

export function checkBuiltAssets(snapshot) {
  const client = path.join(snapshot, "dist", "client");
  const files = [];
  function walk(dir) {
    for (const name of readdirSync(dir)) {
      const file = path.join(dir, name);
      if (statSync(file).isDirectory()) walk(file);
      else files.push(file);
    }
  }
  if (!existsSync(client))
    throw new Error("The website build did not include its visual files.");
  assertAssetSizes(client);
  walk(client);
  for (const extension of [".css", ".js"]) {
    if (
      !files.some((file) => file.endsWith(extension) && statSync(file).size > 0)
    )
      throw new Error(`The website build is missing ${extension} files.`);
  }
  for (const image of ["hero.webp", "properties/alexandria.webp"]) {
    const file = path.join(client, "images", image);
    if (!existsSync(file) || statSync(file).size === 0)
      throw new Error(`The website build is missing the image ${image}.`);
  }
}

export async function findPreviewPort() {
  for (let port = 4187; port < 4220; port++) {
    const available = await new Promise((resolve, reject) => {
      const probe = createServer();
      probe.once("error", (error) =>
        ["EADDRINUSE", "EACCES"].includes(error.code)
          ? resolve(false)
          : reject(error),
      );
      probe.listen(port, "127.0.0.1", () => probe.close(() => resolve(true)));
    });
    if (available) return port;
  }
  throw new Error(
    "No local preview port is available. Close an older website launcher and try again.",
  );
}

async function readAsset(url, kind) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(4000),
    cache: "no-store",
  });
  const contentType = response.headers.get("content-type") || "";
  const bytes = await response.arrayBuffer();
  if (!response.ok || bytes.byteLength === 0 || !contentType.includes(kind))
    throw new Error(
      `A required website file did not load: ${new URL(url).pathname}`,
    );
  return new TextDecoder().decode(bytes);
}

export async function checkRunningPreview(url) {
  const response = await fetch(url, {
    signal: AbortSignal.timeout(4000),
    cache: "no-store",
  });
  const html = await response.text();
  if (!response.ok || !html.includes("JMG Realty PH"))
    throw new Error("The JMG website has not finished starting.");
  const references = [
    ...html.matchAll(/(?:href|src)="([^"<>]+\.(?:css|js)(?:\?[^"<>]*)?)"/g),
  ].map((match) => match[1].replaceAll("&amp;", "&"));
  const styles = [
    ...new Set(references.filter((file) => /\.css(?:\?|$)/.test(file))),
  ];
  const scripts = [
    ...new Set(references.filter((file) => /\.js(?:\?|$)/.test(file))),
  ];
  if (!styles.length || !scripts.length)
    throw new Error(
      "The website page is missing its style or browser script references.",
    );
  const checks = await Promise.allSettled([
    ...styles.map((file) => readAsset(new URL(file, url), "text/css")),
    ...scripts.map((file) => readAsset(new URL(file, url), "javascript")),
    readAsset(new URL("/images/hero.webp", url), "image/"),
    readAsset(new URL("/images/properties/alexandria.webp", url), "image/"),
  ]);
  const failures = checks.filter((result) => result.status === "rejected");
  if (failures.length) throw failures[0].reason;
  return { styles: styles.length, scripts: scripts.length, images: 2 };
}

export async function waitForPreview(url, server) {
  const deadline = Date.now() + 45000;
  let lastError;
  while (Date.now() < deadline) {
    if (server.exitCode !== null || server.signalCode !== null)
      throw new Error("The local website server stopped before it was ready.");
    try {
      return await checkRunningPreview(url);
    } catch (error) {
      lastError = error;
    }
    await new Promise((resolve) => setTimeout(resolve, 800));
  }
  throw lastError || new Error("The local website could not start.");
}
