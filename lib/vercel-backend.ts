const defaultBackend = "https://jmg-realty-ph.otakubarb.chatgpt.site";
const allowedPaths = new Set([
  "/api/submissions",
  "/api/inbox",
  "/api/inbox/login",
]);

export function usesVercelBackend() {
  return process.env.JMG_VERCEL_BUILD === "1" || process.env.VERCEL === "1";
}

// Keep the existing D1 records and owner authentication on their original service.
// Browsers call their current website origin; this server forwards only known APIs.
export async function forwardToBackend(request: Request) {
  const current = new URL(request.url);
  if (!allowedPaths.has(current.pathname)) {
    return Response.json({ error: "Unknown endpoint." }, { status: 404 });
  }
  const writes = !["GET", "HEAD"].includes(request.method);
  if (process.env.NEXT_PUBLIC_JMG_PREVIEW === "1" && writes &&
      (current.pathname === "/api/submissions" || current.pathname === "/api/inbox")) {
    return Response.json(
      { error: "Preview only: inquiries and client-record changes are disabled. Nothing has been saved." },
      { status: 403, headers: { "Cache-Control": "no-store" } },
    );
  }
  if (writes) {
    const origin = request.headers.get("origin");
    // Next's internal URL can use localhost while the incoming request uses
    // 127.0.0.1 or a deployment alias. Host is browser-controlled, unlike an
    // arbitrary X-Forwarded-Host supplied by a caller.
    const requestHost = request.headers.get("host");
    const browserOrigin = requestHost
      ? new URL(`${current.protocol}//${requestHost}`).origin
      : current.origin;
    if (
      request.headers.get("sec-fetch-site") === "cross-site" ||
      (origin && origin !== browserOrigin)
    ) {
      return Response.json({ error: "Invalid request origin." }, { status: 403 });
    }
  }
  const backend = new URL(process.env.JMG_BACKEND_ORIGIN || defaultBackend);
  if (
    backend.protocol !== "https:" || backend.username || backend.password ||
    backend.origin === current.origin
  ) {
    return Response.json({ error: "The inquiry service is not configured." }, { status: 503 });
  }
  const destination = new URL(current.pathname + current.search, backend.origin);
  const headers = new Headers({ Accept: "application/json" });
  const contentType = request.headers.get("content-type");
  if (contentType) headers.set("Content-Type", contentType);
  const ownerCookie = (request.headers.get("cookie") || "")
    .split(";").map(value => value.trim())
    .find(value => /^jmg_owner=[A-Za-z0-9.]+$/.test(value));
  if (ownerCookie && current.pathname.startsWith("/api/inbox")) {
    headers.set("Cookie", ownerCookie);
  }
  // Preserve same-origin CSRF checks at the browser boundary above, then send
  // the validated server request to the existing service's own origin.
  if (writes) {
    headers.set("Origin", backend.origin);
    headers.set("Sec-Fetch-Site", "same-origin");
  }
  let body: string | undefined;
  if (writes) {
    if (Number(request.headers.get("content-length") || 0) > 16000) {
      return Response.json({ error: "Your request is too long." }, { status: 413 });
    }
    body = await request.text();
    if (new TextEncoder().encode(body).length > 16000) {
      return Response.json({ error: "Your request is too long." }, { status: 413 });
    }
  }
  try {
    const upstream = await fetch(destination, {
      method: request.method, headers, body,
      redirect: "error", cache: "no-store", signal: AbortSignal.timeout(20000),
    });
    if (!upstream.headers.get("content-type")?.includes("application/json")) {
      return Response.json(
        { error: "The inquiry service is temporarily unavailable. Please contact JMG directly." },
        { status: 503, headers: { "Cache-Control": "no-store" } },
      );
    }
    const responseHeaders = new Headers({
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    });
    const sessionCookie = upstream.headers.get("set-cookie");
    if (current.pathname === "/api/inbox/login" && sessionCookie?.startsWith("jmg_owner=")) {
      responseHeaders.set("Set-Cookie", sessionCookie.replace(/;\s*Domain=[^;]+/gi, ""));
    }
    return new Response(upstream.body, { status: upstream.status, headers: responseHeaders });
  } catch {
    return Response.json(
      { error: "We couldn’t reach the inquiry service. Please try again or contact JMG directly." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
