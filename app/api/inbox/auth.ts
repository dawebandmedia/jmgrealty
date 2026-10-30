import { env } from "cloudflare:workers";
const encoder = new TextEncoder();
export function adminKey(request: Request) {
  const settings = env as unknown as { ADMIN_ACCESS_KEY?: string };
  if (settings.ADMIN_ACCESS_KEY) return settings.ADMIN_ACCESS_KEY;
  const hostname = new URL(request.url).hostname;
  if (["127.0.0.1", "localhost"].includes(hostname))
    return "local-preview-only";
  return null;
}
async function signature(value: string, key: string) {
  const imported = await crypto.subtle.importKey(
    "raw",
    encoder.encode(key),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const bytes = new Uint8Array(
    await crypto.subtle.sign("HMAC", imported, encoder.encode(value)),
  );
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}
function same(a: string, b: string) {
  const left = encoder.encode(a),
    right = encoder.encode(b);
  let result = left.length ^ right.length;
  for (let i = 0; i < Math.max(left.length, right.length); i++)
    result |= (left[i] || 0) ^ (right[i] || 0);
  return result === 0;
}
export function passwordMatches(a: string, b: string) {
  return same(a, b);
}
export async function sessionToken(request: Request) {
  const key = adminKey(request);
  if (!key) return null;
  const expiry = String(Date.now() + 8 * 3600000);
  return `${expiry}.${await signature(expiry, key)}`;
}
export async function isAdmin(request: Request) {
  const key = adminKey(request);
  if (!key) return false;
  const cookies = request.headers.get("cookie") || "";
  const token = cookies
    .split(";")
    .map((p) => p.trim())
    .find((p) => p.startsWith("jmg_owner="))
    ?.slice(10);
  if (!token) return false;
  const [expiry, sig] = token.split(".");
  if (
    !expiry ||
    !sig ||
    !/^\d+$/.test(expiry) ||
    Number(expiry) < Date.now() ||
    Number(expiry) > Date.now() + 8 * 3600000
  )
    return false;
  return same(sig, await signature(expiry, key));
}
export function validOrigin(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  return !origin || origin === new URL(request.url).origin;
}
export function cookie(request: Request, value: string, maxAge = 28800) {
  return `jmg_owner=${value}; Path=/; HttpOnly; SameSite=Strict; Max-Age=${maxAge}${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
}
