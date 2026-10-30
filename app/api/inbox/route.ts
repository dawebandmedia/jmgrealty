import { getInbox, updateInbox } from "./handlers";
import { getDb } from "../../../db";
import { submissions } from "../../../db/schema";
import { eq } from "drizzle-orm";
import { isAdmin, validOrigin } from "./auth";
export const dynamic = "force-dynamic";
export async function GET(request: Request) {
  return getInbox(request);
}
export async function PATCH(request: Request) {
  return updateInbox(request);
}
export async function DELETE(request: Request) {
  if (!validOrigin(request) || !(await isAdmin(request)))
    return Response.json({ error: "Access denied." }, { status: 403 });
  let body;
  try {
    body = (await request.json()) as { id?: string; status?: string };
  } catch {
    return Response.json({ error: "Invalid request." }, { status: 400 });
  }
  if (!body || typeof body.id !== "string")
    return Response.json({ error: "Invalid request." }, { status: 400 });
  try {
    await getDb().delete(submissions).where(eq(submissions.id, body.id));
    return Response.json(
      { ok: true },
      { headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      { error: "Couldn’t delete this request." },
      { status: 503 },
    );
  }
}
