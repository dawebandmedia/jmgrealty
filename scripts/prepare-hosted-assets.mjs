import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import externalAssetPaths from "../app/external-asset-paths.json" with { type: "json" };

const project = fileURLToPath(new URL("../", import.meta.url));
const client = path.resolve(project, "dist/client");
if (!fs.existsSync(path.join(project, "dist/server/index.js"))) {
  throw new Error("Build the website before preparing its hosting package.");
}
const allowedDirectories = ["images", "documents"];
for (const directory of allowedDirectories) {
  const target = path.resolve(client, directory);
  if (path.dirname(target) !== client || !target.startsWith(client + path.sep)) {
    throw new Error("Refusing to remove a path outside generated client assets.");
  }
  if (fs.existsSync(target)) {
    if (fs.lstatSync(target).isSymbolicLink()) throw new Error("Unexpected linked build output.");
    fs.rmSync(target, { recursive: true, force: true });
  }
}
console.log(`Prepared a lightweight hosting package; ${externalAssetPaths.length} original media/document paths are served unchanged from GitHub. Local source originals remain intact.`);
