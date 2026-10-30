import { getDb } from "../../../db";
import { submissions } from "../../../db/schema";
import { and, asc, count, desc, eq, gt, isNull, lt, ne } from "drizzle-orm";
import { z } from "zod";
import { isAdmin, validOrigin } from "./auth";
import { allStages, applicationStages, inquiryStages } from "../../lead-utils";

const noStore = { "Cache-Control": "no-store" };
export async function getInbox(request: Request) {
  if (!(await isAdmin(request)))
    return Response.json(
      { error: "Please sign in to the owner inbox." },
      { status: 401, headers: noStore },
    );
  const url = new URL(request.url),
    kind = url.searchParams.get("kind"),
    status = url.searchParams.get("status"),
    followUp = url.searchParams.get("followUp");
  if (status && !allStages.some(([id]) => id === status))
    return Response.json(
      { error: "Choose a valid inbox stage." },
      { status: 400, headers: noStore },
    );
  const page = Math.floor(
    Math.min(10000, Math.max(0, Number(url.searchParams.get("page")) || 0)),
  );
  const now = new Date().toISOString();
  const category =
    kind === "inquiry" || kind === "application"
      ? eq(submissions.kind, kind)
      : undefined;
  const active = ne(submissions.status, "closed");
  const due = and(active, lt(submissions.followUpAt, now));
  const upcoming = and(active, gt(submissions.followUpAt, now));
  const filter = and(
    category,
    status ? eq(submissions.status, status) : undefined,
    followUp === "overdue"
      ? due
      : followUp === "upcoming"
        ? upcoming
        : followUp === "none"
          ? isNull(submissions.followUpAt)
          : undefined,
  );
  try {
    const db = getDb();
    const [records, [total], [newCount], [overdue], [planned]] =
      await Promise.all([
        db
          .select()
          .from(submissions)
          .where(filter)
          .orderBy(
            ...(followUp === "overdue" || followUp === "upcoming"
              ? [asc(submissions.followUpAt), desc(submissions.createdAt)]
              : [desc(submissions.createdAt)]),
          )
          .limit(30)
          .offset(page * 30),
        db.select({ value: count() }).from(submissions).where(filter),
        db
          .select({ value: count() })
          .from(submissions)
          .where(and(category, eq(submissions.status, "new"))),
        db
          .select({ value: count() })
          .from(submissions)
          .where(and(category, due)),
        db
          .select({ value: count() })
          .from(submissions)
          .where(and(category, upcoming)),
      ]);
    return Response.json(
      {
        records,
        total: total.value,
        overview: {
          needsResponse: newCount.value,
          overdue: overdue.value,
          upcoming: planned.value,
        },
      },
      { headers: noStore },
    );
  } catch {
    return Response.json(
      { error: "Couldn’t load the inbox. Please try again." },
      { status: 503, headers: noStore },
    );
  }
}

const updateSchema = z
  .object({
    id: z.string().uuid(),
    status: z.string().max(40).optional(),
    internalNotes: z.string().max(4000).optional(),
    followUpAt: z.string().datetime({ offset: true }).nullable().optional(),
    expectedUpdatedAt: z.string().nullable().optional(),
  })
  .strict()
  .refine(
    (data) =>
      data.status !== undefined ||
      data.internalNotes !== undefined ||
      data.followUpAt !== undefined,
  );

export async function updateInbox(request: Request) {
  if (!validOrigin(request) || !(await isAdmin(request)))
    return Response.json(
      { error: "Access denied." },
      { status: 403, headers: noStore },
    );
  if (Number(request.headers.get("content-length") || 0) > 18000)
    return Response.json(
      { error: "This update is too long." },
      { status: 413, headers: noStore },
    );
  let body: unknown;
  try {
    const text = await request.text();
    if (text.length > 18000)
      return Response.json(
        { error: "This update is too long." },
        { status: 413, headers: noStore },
      );
    body = JSON.parse(text);
  } catch {
    return Response.json(
      { error: "Invalid request." },
      { status: 400, headers: noStore },
    );
  }
  const parsed = updateSchema.safeParse(body);
  if (!parsed.success)
    return Response.json(
      { error: "Please check the stage, notes and follow-up date." },
      { status: 400, headers: noStore },
    );
  const data = parsed.data;
  try {
    const db = getDb();
    const [record] = await db
      .select()
      .from(submissions)
      .where(eq(submissions.id, data.id))
      .limit(1);
    if (!record)
      return Response.json(
        { error: "This request could not be found. Refresh the inbox." },
        { status: 404, headers: noStore },
      );
    const stages =
      record.kind === "application" ? applicationStages : inquiryStages;
    if (data.status !== undefined && !stages.some(([id]) => id === data.status))
      return Response.json(
        { error: "Choose a stage for this request type." },
        { status: 400, headers: noStore },
      );
    if (
      data.expectedUpdatedAt !== undefined &&
      record.updatedAt !== data.expectedUpdatedAt
    )
      return Response.json(
        {
          error:
            "This request changed in another session. Refresh before saving again.",
        },
        { status: 409, headers: noStore },
      );
    const now = new Date().toISOString();
    const values = {
      status: data.status ?? record.status,
      internalNotes: data.internalNotes ?? record.internalNotes,
      followUpAt:
        data.followUpAt === undefined
          ? record.followUpAt
          : data.followUpAt === null
            ? null
            : new Date(data.followUpAt).toISOString(),
      firstContactedAt:
        record.firstContactedAt || (data.status === "contacted" ? now : null),
      updatedAt: now,
    };
    const concurrency =
      data.expectedUpdatedAt === undefined
        ? undefined
        : data.expectedUpdatedAt === null
          ? isNull(submissions.updatedAt)
          : eq(submissions.updatedAt, data.expectedUpdatedAt);
    const updated = await db
      .update(submissions)
      .set(values)
      .where(and(eq(submissions.id, data.id), concurrency))
      .returning();
    if (!updated.length)
      return Response.json(
        { error: "This request changed. Refresh before saving again." },
        { status: 409, headers: noStore },
      );
    return Response.json(
      { ok: true, record: updated[0] },
      { headers: noStore },
    );
  } catch {
    return Response.json(
      { error: "Couldn’t save this follow-up. Please try again." },
      { status: 503, headers: noStore },
    );
  }
}
