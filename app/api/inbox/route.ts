import { forwardToBackend, usesVercelBackend } from "../../../lib/vercel-backend";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  if (usesVercelBackend()) return forwardToBackend(request);
  const native = await import("./cloudflare-route");
  return native.GET(request);
}
export async function PATCH(request: Request) {
  if (usesVercelBackend()) return forwardToBackend(request);
  const native = await import("./cloudflare-route");
  return native.PATCH(request);
}
export async function DELETE(request: Request) {
  if (usesVercelBackend()) return forwardToBackend(request);
  const native = await import("./cloudflare-route");
  return native.DELETE(request);
}
