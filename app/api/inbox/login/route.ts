import { forwardToBackend, usesVercelBackend } from "../../../../lib/vercel-backend";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  if (usesVercelBackend()) return forwardToBackend(request);
  const native = await import("./cloudflare-route");
  return native.POST(request);
}
export async function DELETE(request: Request) {
  if (usesVercelBackend()) return forwardToBackend(request);
  const native = await import("./cloudflare-route");
  return native.DELETE(request);
}
