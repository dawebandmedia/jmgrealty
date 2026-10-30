import { existsSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Cloudflare Workers Static Assets: maximum size of an individual file is 25 MiB.
// https://developers.cloudflare.com/workers/platform/limits/#static-assets
export const MAX_STATIC_ASSET_BYTES = 25 * 1024 * 1024;
export function assertAssetSizes(directory) {
  const root = path.resolve(directory);
  if (!existsSync(root)) throw new Error(`The website asset folder is missing: ${root}`);
  let count = 0;
  let largest = { file: "", bytes: 0 };
  const oversized = [];
  function walk(folder) {
    for (const entry of readdirSync(folder, { withFileTypes: true })) {
      const file = path.join(folder, entry.name);
      if (entry.isDirectory()) walk(file);
      else if (entry.isFile()) {
        const bytes = statSync(file).size;
        count++;
        if (bytes > largest.bytes) largest = { file: path.relative(root, file), bytes };
        if (bytes > MAX_STATIC_ASSET_BYTES) oversized.push({ file: path.relative(root, file), bytes });
      }
    }
  }
  walk(root);
  if (oversized.length) {
    const details = oversized.slice(0, 8).map(({ file, bytes }) => `  ${file} (${(bytes / 1048576).toFixed(2)} MiB)`).join("\n");
    throw new Error(`The website contains ${oversized.length} file(s) above the 25 MiB asset limit:\n${details}\nUse optimized copies and keep large originals outside the public folder. If files were copied over an older website version, extract the updated ZIP into a new folder instead.`);
  }
  return { files: count, largest, maximumBytes: MAX_STATIC_ASSET_BYTES };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  try {
    const result = assertAssetSizes(process.argv[2] || fileURLToPath(new URL("../public", import.meta.url)));
    console.log(`Asset size check passed: ${result.files} files; largest ${(result.largest.bytes / 1048576).toFixed(2)} MiB (limit 25 MiB).`);
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}
