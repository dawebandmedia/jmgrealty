import { getDb } from "../../../db";
import { submissions } from "../../../db/schema";
import { and, eq, gt, count } from "drizzle-orm";
import { services, areas, properties } from "../../content";
import {
  validModelIds,
  modelDescription,
  manilaToday,
} from "../../property-utils";
import { z } from "zod";
import { normalizeInquiryPhone, validateInquiryIdentity, type InquiryErrors } from "../../inquiry-validation";
import { inquiryChoices, inquiryLocations, inquiryPropertyTypes } from "../../inquiry-options";
export const dynamic = "force-dynamic";
const schema = z.object({
  kind: z.enum(["inquiry", "application"]),
  name: z.string().trim().min(2).max(120),
  email: z
    .string()
    .trim()
    .max(160)
    .pipe(z.union([z.string().email(), z.literal("")]))
    .default(""),
  phone: z
    .string()
    .trim()
    .max(25)
    .refine(
      (value) =>
        !value ||
        (/^[+0-9()\s.\-\u2010-\u2015]+$/.test(value) && value.replace(/\D/g, "").length >= 7),
    )
    .default(""),
  service: z.string().max(100),
  area: z.string().max(100).default(""),
  city: z.string().max(100).default(""),
  inquiryPurpose: z.string().max(100).default(""),
  message: z.string().trim().max(3000).default(""),
  consent: z.literal(true),
  website: z.string().max(0).optional(),
  budget: z.string().max(100).optional(),
  propertyType: z.string().max(100).optional(),
  experience: z.string().max(100).optional(),
  qualification: z.string().max(150).optional(),
  intent: z.enum(["viewing", "price"]).optional(),
  propertyIds: z.array(z.string().max(100)).max(3).default([]),
  contactPreference: z.enum(["", "Phone call", "SMS", "Email"]).default(""),
  preferredDate: z.string().max(10).default(""),
  scheduleFlexible: z.boolean().default(false),
  timeWindow: z
    .enum(["", "Morning (8 AM–12 PM)", "Afternoon (12–5 PM)", "Flexible"])
    .default(""),
  viewingMode: z
    .enum(["", "On-site viewing", "Discuss remote viewing"])
    .default(""),
});
export async function POST(request: Request) {
  if (request.headers.get("sec-fetch-site") === "cross-site")
    return Response.json(
      { error: "Please send your request from this website." },
      { status: 403 },
    );
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    return Response.json({ error: "Invalid request origin." }, { status: 403 });
  if (Number(request.headers.get("content-length") || 0) > 16000)
    return Response.json(
      { error: "Your message is too long." },
      { status: 413 },
    );
  let body;
  try {
    const text = await request.text();
    if (text.length > 16000)
      return Response.json(
        { error: "Your message is too long." },
        { status: 413 },
      );
    body = JSON.parse(text);
  } catch {
    return Response.json(
      { error: "Please check your request and try again." },
      { status: 400 },
    );
  }
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    const fields: InquiryErrors = {};
    if (body?.kind === "inquiry" && !body?.intent) {
      for (const issue of parsed.error.issues) {
        const field = String(issue.path[0]);
        if (field === "name") fields.name = "Please enter your full name using 2–120 characters.";
        else if (field === "email" || field === "phone") fields.contact = "Please enter a valid email address or mobile number.";
        else if (field === "service" || field === "inquiryPurpose") fields.service = "Please choose what you need help with.";
        else if (field === "consent") fields.consent = "Please agree so JMG Realty PH can respond to your inquiry.";
        else if (field === "area" || field === "city") fields.location = "Please choose a supported location.";
        else if (field === "message") fields.message = "Please keep your message within 3,000 characters.";
        else if (field === "budget") fields.budget = "Please keep the price range within 100 characters.";
        else if (field === "propertyType") fields.propertyType = "Please choose a property type.";
      }
    }
    return Response.json({ error: "Please check your contact details and privacy consent.", fields }, { status: 400 });
  }
  const data = parsed.data;
  const modelIds = validModelIds(data.propertyIds);
  const selectedModels = modelIds.map(
    (id) => properties.find((p) => p.id === id)!,
  );
  if (data.intent) {
    const fields = validateInquiryIdentity({ name: data.name, contact: data.email || data.phone, service: data.service, consent: data.consent });
    if (data.phone) {
      const normalized = normalizeInquiryPhone(data.phone);
      if (!normalized) fields.contact = "Please enter a valid mobile number.";
      else data.phone = normalized;
    }
    if (Object.keys(fields).length) return Response.json({ error: "Please check your name, contact details and privacy consent.", fields }, { status: 400 });
    if (
      data.kind !== "inquiry" ||
      data.service !== "Real Estate Brokerage" ||
      !modelIds.length ||
      modelIds.length !== data.propertyIds.length
    )
      return Response.json(
        { error: "Please choose one to three valid homes or units." },
        { status: 400 },
      );
    if (
      !data.contactPreference ||
      (data.contactPreference === "Email" ? !data.email : !data.phone)
    )
      return Response.json(
        {
          error:
            "Please provide the contact details for your chosen contact method.",
        },
        { status: 400 },
      );
    if (data.intent === "viewing" && !data.scheduleFlexible) {
      const date = /^\d{4}-\d{2}-\d{2}$/.test(data.preferredDate)
        ? new Date(data.preferredDate + "T00:00:00Z")
        : null;
      if (
        !date ||
        !Number.isFinite(date.getTime()) ||
        date.toISOString().slice(0, 10) !== data.preferredDate ||
        data.preferredDate < manilaToday() ||
        !data.timeWindow ||
        !data.viewingMode
      )
        return Response.json(
          {
            error:
              "Please choose a valid future or current date, time window and viewing preference.",
          },
          { status: 400 },
        );
    }
  } else if (data.kind === "inquiry") {
    const fields = validateInquiryIdentity({ name: data.name, contact: data.email || data.phone, service: data.service, consent: data.consent });
    if (data.phone) {
      const phone = normalizeInquiryPhone(data.phone);
      if (!phone) fields.contact = "Enter a valid mobile number, such as 0912 345 6789 or +63 912 345 6789.";
      else data.phone = phone;
    }
    if (data.inquiryPurpose && !inquiryChoices.some(choice => choice.value === data.inquiryPurpose && choice.service === data.service)) fields.service = "Please choose what you need help with.";
    if (data.city && !inquiryLocations.some(place => place.area === data.area && place.cities.includes(data.city))) fields.location = "Please choose a city within the selected area.";
    if (data.propertyType && !inquiryPropertyTypes.some(type => type.value === data.propertyType) && !properties.some(property => property.type === data.propertyType)) fields.propertyType = "Please choose a property type, or select Other.";
    if (Object.keys(fields).length) return Response.json({ error: "Please check the highlighted fields.", fields }, { status: 400 });
  } else if (!data.email || !data.phone || data.message.length < 10) {
    return Response.json(
      {
        error:
          "Please provide your email, contact number and a message of at least 10 characters.",
      },
      { status: 400 },
    );
  }
  if (data.kind === "inquiry" && !services.some((s) => s.name === data.service))
    return Response.json(
      { error: "Please choose a service.", fields: { service: "Please choose what you need help with." } },
      { status: 400 },
    );
  if (
    data.kind === "application" &&
    (!data.experience || data.service !== "Agent recruitment")
  )
    return Response.json(
      { error: "Please select your experience level." },
      { status: 400 },
    );
  if (
    data.area &&
    !areas.includes(data.area) &&
    data.area !== "Other / To be discussed"
  )
    return Response.json(
      { error: "Please choose a location.", fields: { location: "Please choose a supported location." } },
      { status: 400 },
    );
  try {
    const db = getDb(),
      since = new Date(Date.now() - 3600000).toISOString();
    const [recent] = await db
      .select({ value: count() })
      .from(submissions)
      .where(
        and(
          data.email
            ? eq(submissions.email, data.email.toLowerCase())
            : eq(submissions.phone, data.phone.replace(/[^+0-9]/g, "")),
          gt(submissions.createdAt, since),
        ),
      );
    if (recent.value >= 5)
      return Response.json(
        {
          error:
            "You’ve already sent several requests. Please contact JMG directly or try again later.",
        },
        { status: 429 },
      );
    const id = crypto.randomUUID();
    await db.insert(submissions).values({
      id,
      kind: data.kind,
      name: data.name,
      email: data.email.toLowerCase(),
      phone: data.phone.replace(/[^+0-9]/g, ""),
      service: data.service,
      area:
        data.intent && new Set(selectedModels.map((p) => p.area)).size === 1
          ? selectedModels[0].area
          : data.area,
      message: data.intent
        ? `${data.intent === "viewing" ? "Viewing request" : "Current price and availability request"}: ${selectedModels.map(modelDescription).join("; ")}.${data.message ? "\n\n" + data.message : ""}`
        : data.message,
      details: JSON.stringify({
        budget: data.budget || "",
        propertyType: data.propertyType || "",
        experience: data.experience || "",
        qualification: data.qualification || "",
        ...(data.kind === "inquiry" && !data.intent ? {
          inquiryPurpose: data.inquiryPurpose,
          city: data.city,
          contactPreference: data.contactPreference || (data.email ? "Email" : "Phone call"),
        } : {}),
        ...(data.intent
          ? {
              intent: data.intent,
              propertyIds: modelIds.join(","),
              contactPreference: data.contactPreference,
              ...(data.intent === "viewing"
                ? {
                    preferredDate: data.preferredDate,
                    scheduleFlexible: data.scheduleFlexible ? "Please help choose a schedule" : "Preferred schedule supplied",
                    timeWindow: data.timeWindow,
                    viewingMode: data.viewingMode,
                  }
                : {}),
            }
          : {}),
      }),
      createdAt: new Date().toISOString(),
      status: "new",
    });
    return Response.json(
      { reference: `JMG-${id.slice(0, 8).toUpperCase()}` },
      { status: 201, headers: { "Cache-Control": "no-store" } },
    );
  } catch {
    return Response.json(
      {
        error:
          "We couldn’t save your request right now. Please try again or contact JMG directly.",
      },
      { status: 503 },
    );
  }
}
