"use client";

export function PreviewNotice() {
  if (process.env.NEXT_PUBLIC_JMG_PREVIEW !== "1") return null;
  return <p className="form-note" role="note"><strong>Preview only.</strong> You can explore this form, but inquiries are not sent or saved from this preview.</p>;
}
