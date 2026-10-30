import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, writeFileSync, unlinkSync } from "node:fs";
import { createHash, randomUUID } from "node:crypto";
import path from "node:path";
import os from "node:os";
import { spawnSync } from "node:child_process";

// Windows workerd cannot reliably open SQLite files under long extraction paths.
// Keep persistent records and preview builds in one short, per-project location.
export function localStoragePaths(root) {
  const base = process.env.JMG_LOCAL_DATA_DIR || (process.platform === "win32"
    ? path.join(process.env.LOCALAPPDATA || path.join(os.homedir(), "AppData", "Local"), "JMGRealtyPH")
    : path.join(root, ".sites-runtime", "local"));
  const key = createHash("sha256").update(path.resolve(root).toLowerCase()).digest("hex").slice(0, 12);
  const runtime = path.resolve(base, key);
  const database = path.join(runtime, "state");
  const packageKey = createHash("sha256").update(readFileSync(path.join(root, "package-lock.json"))).digest("hex").slice(0, 12);
  const packages = path.resolve(base, "packages", packageKey);
  if (process.platform === "win32" && database.length > 140)
    throw new Error("The local data folder is too long for Windows. Set JMG_LOCAL_DATA_DIR to a short writable folder, then launch again.");
  mkdirSync(runtime, { recursive: true });
  const probe = path.join(runtime, `.write-check-${randomUUID()}`);
  try { writeFileSync(probe, "ok", { flag: "wx" }); unlinkSync(probe); }
  catch { throw new Error(`The local data folder is not writable: ${runtime}. Choose a writable folder with JMG_LOCAL_DATA_DIR.`); }
  return { runtime, database, packages, packageKey, builds: path.join(packages, "previews", key),
    wrangler: path.join(packages, "node_modules", "wrangler", "bin", "wrangler.js"),
    journal: path.join(runtime, "local-applied-migrations.json") };
}

export async function preserveLegacyDatabase(root, storage) {
  const legacy = path.join(root, ".wrangler", "state");
  if (existsSync(storage.database) || !existsSync(legacy)) return;
  const infoFile = path.join(root, ".sites-runtime", "local-server.json");
  if (existsSync(infoFile)) {
    try {
      const info = JSON.parse(readFileSync(infoFile, "utf8"));
      const url = new URL(info.url);
      if (url.hostname === "127.0.0.1") {
        const response = await fetch(url, { signal: AbortSignal.timeout(1200) });
        if ((await response.text()).includes("JMG Realty PH"))
          throw new Error("Close this folder’s previous JMG launcher before the first updated launch, so its local records can be safely preserved.");
      }
    } catch (error) {
      if (error.message.startsWith("Close this folder")) throw error;
    }
  }
  console.log("Preserving the existing local database in the new data folder. The original files remain in place.");
  cpSync(legacy, storage.database, { recursive: true, force: false, errorOnExist: true });
  const oldJournal = path.join(root, ".sites-runtime", "local-applied-migrations.json");
  if (existsSync(oldJournal)) cpSync(oldJournal, storage.journal, { force: false, errorOnExist: true });
}

function execute(root, config, storage, sql) {
  const database = storage.database;
  const cli = existsSync(storage.wrangler) ? storage.wrangler : path.join(root, "node_modules", "wrangler", "bin", "wrangler.js");
  const result = spawnSync(process.execPath, ["--import", "./scripts/sites-env.mjs",
    cli, "d1", "execute", "DB", "--local",
    "--config", config, "--persist-to", database, "--command", sql, "--json"],
    { cwd: root, encoding: "utf8", windowsHide: true, env: process.env });
  if (result.error || result.status !== 0) {
    if (result.stderr) process.stderr.write(result.stderr);
    throw new Error(`The local database could not be prepared at ${database}. Close older launchers and check that this data folder is writable. ${result.error?.message || ""}`);
  }
  try { return JSON.parse(result.stdout); }
  catch { throw new Error("The local database returned an unexpected setup response. No migration was marked as complete."); }
}

export function applyLocalMigrations(root, config, storage) {
  mkdirSync(storage.database, { recursive: true });
  const result = execute(root, config, storage, 'PRAGMA table_info("submissions")');
  const columns = new Set(result.flatMap(part => part.results || []).map(column => column.name));
  const applied = existsSync(storage.journal) ? JSON.parse(readFileSync(storage.journal, "utf8")) : [];
  if (!Array.isArray(applied) || applied.some(file => typeof file !== "string"))
    throw new Error("The local migration record has an unexpected format. The database was preserved; setup stopped without replacing records.");
  // Discover filenames instead of depending on Drizzle's generated labels.
    for (const file of readdirSync(path.join(root, "drizzle")).filter(name => name.endsWith(".sql")).sort()) {
      const sql = readFileSync(path.join(root, "drizzle", file), "utf8");
      const statements = sql.split(/-->\s*statement-breakpoint/).map(value => value.trim()).filter(Boolean);
      const knownSchema = statements.every(statement => /^CREATE TABLE `submissions`|^ALTER TABLE `submissions` ADD `/i.test(statement));
      if (!knownSchema && applied.includes(file)) continue;
      console.log(`Checking local database update: ${file}`);
      for (const statement of statements) {
        if (/^CREATE TABLE `submissions`/i.test(statement) && columns.size) {
          const required = ["id", "kind", "name", "email", "phone", "service", "area", "message", "details", "created_at", "status"];
          if (required.some(name => !columns.has(name)))
            throw new Error("The existing local request table has an unexpected structure. Its records were preserved; setup stopped without replacing it.");
          continue;
        }
        const added = statement.match(/^ALTER TABLE `submissions` ADD `([^`]+)`/i)?.[1];
        if (added && columns.has(added)) continue;
        execute(root, config, storage, statement);
        if (added) columns.add(added);
        else if (/^CREATE TABLE `submissions`/i.test(statement)) {
          const updated = execute(root, config, storage, 'PRAGMA table_info("submissions")');
          updated.flatMap(part => part.results || []).forEach(column => columns.add(column.name));
        }
      }
      if (!applied.includes(file)) applied.push(file);
      writeFileSync(storage.journal, JSON.stringify(applied));
    }
  return { columns: [...columns], database: storage.database };
}
