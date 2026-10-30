import {
  adminKey,
  passwordMatches,
  sessionToken,
  validOrigin,
  cookie,
} from "../auth";
export const dynamic = "force-dynamic";
export async function POST(request: Request) {
  if (!validOrigin(request))
    return Response.json({ error: "Invalid request." }, { status: 403 });
  let body;
  try {
    body = (await request.json()) as { password?: string };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  const key = adminKey(request);
  if (!key)
    return Response.json(
      { error: "Owner access has not been configured." },
      { status: 503 },
    );
  if (
    !body ||
    typeof body.password !== "string" ||
    body.password.length > 150 ||
    !passwordMatches(body.password, key)
  )
    return Response.json(
      { error: "Incorrect owner password." },
      { status: 401 },
    );
  const token = await sessionToken(request);
  return Response.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": cookie(request, token!),
        "Cache-Control": "no-store",
      },
    },
  );
}
export async function DELETE(request: Request) {
  if (!validOrigin(request))
    return Response.json({ error: "Invalid request." }, { status: 403 });
  return Response.json(
    { ok: true },
    {
      headers: {
        "Set-Cookie": cookie(request, "", 0),
        "Cache-Control": "no-store",
      },
    },
  );
}
