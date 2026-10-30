import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const cli = fileURLToPath(new URL("../node_modules/next/dist/bin/next", import.meta.url));
const result = spawnSync(process.execPath, [cli, "build", "--webpack"], {
  cwd: root,
  env: { ...process.env, JMG_VERCEL_BUILD: "1", NEXT_TELEMETRY_DISABLED: "1" },
  stdio: "inherit", windowsHide: true,
});
if (result.error) throw result.error;
process.exit(result.status ?? 1);
