import { z } from "zod";

export type InquiryErrors = Partial<Record<"name" | "contact" | "service" | "consent" | "location" | "propertyType" | "budget" | "message", string>>;

export function normalizeInquiryPhone(value: string): string | null {
  const compact = value.trim().replace(/[\s().\-\u2010-\u2015]/g, "");
  if (!/^[+\d]+$/.test(compact)) return null;
  const local = compact.match(/^(?:0|(?:\+|00)?63(?:0)?)?(9\d{9})$/);
  if (local) return `+63${local[1]}`;
  // Overseas clients may provide another country's complete international number.
  if (!compact.startsWith("+63") && /^\+[1-9]\d{7,14}$/.test(compact)) return compact;
  return null;
}

export function parseInquiryContact(value: string) {
  const trimmed = value.trim();
  if (trimmed.includes("@")) {
    if (trimmed.length > 160 || !z.string().email().safeParse(trimmed).success) return null;
    return { email: trimmed.toLowerCase(), phone: "", contactPreference: "Email" as const };
  }
  const phone = normalizeInquiryPhone(trimmed);
  return phone ? { email: "", phone, contactPreference: "Phone call" as const } : null;
}

export function validateInquiryIdentity(values: { name: string; contact: string; service: string; consent: boolean }): InquiryErrors {
  const errors: InquiryErrors = {};
  if (!values.name.trim()) errors.name = "Please enter your full name.";
  else if (values.name.trim().length < 2 || values.name.trim().length > 120) errors.name = "Please enter your name using 2–120 characters.";
  if (!values.contact.trim()) errors.contact = "Please enter an email address or mobile number.";
  else if (!parseInquiryContact(values.contact)) errors.contact = "Enter a valid email or mobile number, such as 0912 345 6789 or +63 912 345 6789.";
  if (!values.service) errors.service = "Please choose what you need help with.";
  if (!values.consent) errors.consent = "Please agree so JMG Realty PH can respond to your inquiry.";
  return errors;
}
