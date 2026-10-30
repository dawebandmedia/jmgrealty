"use client";
import { useEffect, useState, type FormEvent } from "react";
import { CalendarDays, Check } from "lucide-react";
import {
  applicationStages,
  inquiryStages,
  followUpInput,
  manilaDateTime,
} from "../lead-utils";
import { properties } from "../content";

export type Lead = {
  id: string;
  kind: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  area: string;
  message: string;
  details: string;
  createdAt: string;
  status: string;
  internalNotes: string;
  followUpAt: string | null;
  firstContactedAt: string | null;
  updatedAt: string | null;
};
const detailLabels: Record<string, string> = {
  budget: "Budget",
  inquiryPurpose: "Inquiry about",
  city: "City / municipality",
  propertyType: "Property type",
  experience: "Experience",
  qualification: "Qualification",
  contactPreference: "Contact preference",
  preferredDate: "Preferred date (GMT+8)",
  scheduleFlexible: "Schedule arrangement",
  timeWindow: "Preferred time (GMT+8)",
  viewingMode: "Viewing preference",
};

export function LeadCard({
  lead,
  onSaved,
  onDelete,
  deletePending,
  deleteId,
  onCancelDelete,
  onConfirmDelete,
}: {
  lead: Lead;
  onSaved: (lead: Lead) => void;
  onDelete: () => void;
  deletePending: boolean;
  deleteId: string | null;
  onCancelDelete: () => void;
  onConfirmDelete: () => void;
}) {
  const [stage, setStage] = useState(lead.status),
    [notes, setNotes] = useState(lead.internalNotes),
    [followUp, setFollowUp] = useState(followUpInput(lead.followUpAt));
  const [saving, setSaving] = useState(false),
    [error, setError] = useState(""),
    [feedback, setFeedback] = useState("");
  const [now, setNow] = useState(Date.now);
  useEffect(() => {
    setStage(lead.status);
    setNotes(lead.internalNotes);
    setFollowUp(followUpInput(lead.followUpAt));
  }, [lead]);
  useEffect(() => {
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, []);
  let details: Record<string, string> = {};
  try {
    details = JSON.parse(lead.details);
  } catch {}
  const models = (details.propertyIds || "")
    .split(",")
    .map((id) => properties.find((p) => p.id === id))
    .filter((p) => !!p);
  const stages =
    lead.kind === "application" ? applicationStages : inquiryStages;
  const overdue =
    lead.status !== "closed" &&
    !!lead.followUpAt &&
    new Date(lead.followUpAt).getTime() < now;
  const dirty =
    stage !== lead.status ||
    notes !== lead.internalNotes ||
    followUp !== followUpInput(lead.followUpAt);
  async function save(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    setSaving(true);
    setError("");
    setFeedback("");
    try {
      const formValues = new FormData(event.currentTarget);
      const enteredFollowUp = String(formValues.get("followUpLocal") || "");
      const followUpAt = enteredFollowUp
        ? new Date(
            enteredFollowUp +
              (enteredFollowUp.length === 16 ? ":00" : "") +
              "+08:00",
          ).toISOString()
        : null;
      const response = await fetch("/api/inbox", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: lead.id,
          status: String(formValues.get("stage") || stage),
          internalNotes: String(formValues.get("internalNotes") || ""),
          followUpAt,
          expectedUpdatedAt: lead.updatedAt,
        }),
      });
      const result = (await response.json()) as {
        error?: string;
        record: Lead;
      };
      if (!response.ok)
        throw new Error(result.error || "Couldn’t save these changes.");
      onSaved(result.record);
      setFeedback("Follow-up details saved.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Couldn’t save these changes.");
    } finally {
      setSaving(false);
    }
  }
  const label =
    lead.kind === "application"
      ? "Agent application"
      : details.intent === "viewing"
        ? "Viewing request"
        : details.intent === "price"
          ? "Price & availability request"
          : "Property inquiry";
  return (
    <article className={`lead follow-up-lead ${overdue ? "lead-overdue" : ""}`}>
      <div className="lead-top">
        <div>
          <span className="eyebrow">
            {label} · JMG-{lead.id.slice(0, 8).toUpperCase()}
          </span>
          <h3>{lead.name}</h3>
        </div>
        <span
          className={`lead-status-badge ${lead.status === "new" ? "needs-response" : ""}`}
        >
          {stages.find(([id]) => id === lead.status)?.[1] || lead.status}
        </span>
      </div>
      <div className="lead-contact">
        {lead.email && <a href={`mailto:${lead.email}`}>{lead.email}</a>}
        {lead.phone && (
          <a href={`tel:${lead.phone.replace(/[^+0-9]/g, "")}`}>{lead.phone}</a>
        )}
      </div>
      {models.length > 0 && (
        <div className="lead-models">
          {models.map((p) => (
            <a href={`/properties/${p.id}`} key={p.id}>
              {p.title} · {p.city}
            </a>
          ))}
        </div>
      )}
      <p className="lead-message">{lead.message}</p>
      <div className="lead-meta">
        <span>{lead.service}</span>
        {lead.area && <span>{lead.area}</span>}
        {Object.entries(details)
          .filter(([key, value]) => value && detailLabels[key])
          .map(([key, value]) => (
            <span key={key}>
              {detailLabels[key]}: {value}
            </span>
          ))}
      </div>
      <div className="lead-timeline">
        <span>Received {manilaDateTime(lead.createdAt)} · GMT+8</span>
        {lead.firstContactedAt && (
          <span>
            First marked contacted {manilaDateTime(lead.firstContactedAt)} ·
            GMT+8
          </span>
        )}
        {lead.followUpAt && (
          <span
            className={overdue ? "follow-up-overdue" : "follow-up-scheduled"}
          >
            <CalendarDays size={15} />
            {lead.status === "closed"
              ? "Previous follow-up"
              : overdue
                ? "Overdue follow-up"
                : "Follow-up"}
            : {manilaDateTime(lead.followUpAt)} · GMT+8
          </span>
        )}
      </div>
      <form className="lead-follow-up-form" onSubmit={save} aria-busy={saving}>
        <fieldset disabled={saving}>
          <legend>Manage this request</legend>
          <div className="lead-follow-up-fields">
            <label>
              Stage for {lead.name}
              <select
                name="stage"
                value={stage}
                onChange={(e) => {
                  setStage(e.target.value);
                  setFeedback("");
                }}
              >
                {stages.map(([id, title]) => (
                  <option key={id} value={id}>
                    {title}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Follow-up for {lead.name} (GMT+8)
              <input
                name="followUpLocal"
                type="datetime-local"
                value={followUp}
                onInput={(e) => {
                  setFollowUp(e.currentTarget.value);
                  setFeedback("");
                }}
                onChange={(e) => {
                  setFollowUp(e.target.value);
                  setFeedback("");
                }}
              />
            </label>
            <label className="full">
              Internal notes for {lead.name}
              <textarea
                name="internalNotes"
                value={notes}
                onChange={(e) => {
                  setNotes(e.target.value);
                  setFeedback("");
                }}
                rows={3}
                maxLength={4000}
                placeholder="Record the next action, questions or conversation notes."
              />
            </label>
          </div>
          <div className="lead-save-row">
            <button className="button" type="submit" disabled={!dirty}>
              {saving ? "Saving…" : "Save follow-up"}
              <Check size={16} />
            </button>
            {followUp && (
              <button
                className="text-link"
                type="button"
                onClick={() => {
                  setFollowUp("");
                  setFeedback("");
                }}
              >
                Clear follow-up date
              </button>
            )}
            <span className="lead-save-feedback" role="status">
              {dirty ? "Unsaved changes" : feedback}
            </span>
          </div>
        </fieldset>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        <p className="internal-notes-note">
          Notes and follow-up dates are visible in the owner inbox. Reminder
          indicators appear here; automatic notifications are not enabled.
        </p>
      </form>
      {deleteId === lead.id ? (
        <div className="lead-delete-confirm">
          <p>Delete this request permanently?</p>
          <button
            className="text-link"
            disabled={deletePending || saving}
            onClick={onConfirmDelete}
          >
            Yes, delete
          </button>
          <button className="text-link" onClick={onCancelDelete}>
            Cancel
          </button>
        </div>
      ) : (
        <button className="lead-delete" disabled={saving} onClick={onDelete}>
          Delete request
        </button>
      )}
    </article>
  );
}
