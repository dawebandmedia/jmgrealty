"use client";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { Shell, ArrowUpRight } from "../components";
import { RefreshCw } from "lucide-react";
import { allStages, applicationStages, inquiryStages } from "../lead-utils";
import { LeadCard, type Lead } from "./lead-card";
type Overview = { needsResponse: number; overdue: number; upcoming: number };
export default function Owner() {
  const [authenticated, setAuthenticated] = useState(false),
    [loading, setLoading] = useState(true),
    [records, setRecords] = useState<Lead[]>([]),
    [kind, setKind] = useState("all"),
    [stage, setStage] = useState(""),
    [followUp, setFollowUp] = useState(""),
    [page, setPage] = useState(0),
    [total, setTotal] = useState(0),
    [overview, setOverview] = useState<Overview>({
      needsResponse: 0,
      overdue: 0,
      upcoming: 0,
    }),
    [error, setError] = useState(""),
    [pending, setPending] = useState(false),
    [deleteId, setDeleteId] = useState<string | null>(null);
  const requestSequence = useRef(0),
    requestController = useRef<AbortController | null>(null);
  async function load() {
    const sequence = ++requestSequence.current;
    requestController.current?.abort();
    const controller = new AbortController();
    requestController.current = controller;
    setLoading(true);
    setError("");
    try {
      const query = new URLSearchParams({
        kind,
        status: stage,
        followUp,
        page: String(page),
      });
      const res = await fetch("/api/inbox?" + query, {
        cache: "no-store",
        signal: controller.signal,
      });
      if (sequence !== requestSequence.current) return;
      if (res.status === 401) {
        setAuthenticated(false);
        setRecords([]);
        return;
      }
      const data = (await res.json()) as {
        error?: string;
        records: Lead[];
        total: number;
        overview: Overview;
      };
      if (!res.ok) throw new Error(data.error || "Could not load inbox.");
      setAuthenticated(true);
      setRecords(data.records);
      setTotal(data.total);
      setOverview(data.overview);
    } catch (e) {
      if (!controller.signal.aborted)
        setError(e instanceof Error ? e.message : "Could not load inbox.");
    } finally {
      if (sequence === requestSequence.current) setLoading(false);
    }
  }
  useEffect(() => {
    load();
    return () => requestController.current?.abort();
  }, [kind, stage, followUp, page]);
  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    const password = new FormData(event.currentTarget).get("password");
    try {
      const response = await fetch("/api/inbox/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not sign in.");
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not sign in.");
    } finally {
      setPending(false);
    }
  }
  function saved(updated: Lead) {
    const previous = records.find((r) => r.id === updated.id);
    if (!previous) return;
    const now = Date.now();
    const flags = (r: Lead) => ({
      needsResponse: Number(r.status === "new"),
      overdue: Number(
        r.status !== "closed" &&
          !!r.followUpAt &&
          new Date(r.followUpAt).getTime() < now,
      ),
      upcoming: Number(
        r.status !== "closed" &&
          !!r.followUpAt &&
          new Date(r.followUpAt).getTime() > now,
      ),
    });
    const oldFlags = flags(previous),
      newFlags = flags(updated);
    setOverview((values) => ({
      needsResponse: Math.max(
        0,
        values.needsResponse + newFlags.needsResponse - oldFlags.needsResponse,
      ),
      overdue: Math.max(
        0,
        values.overdue + newFlags.overdue - oldFlags.overdue,
      ),
      upcoming: Math.max(
        0,
        values.upcoming + newFlags.upcoming - oldFlags.upcoming,
      ),
    }));
    const matchesDate =
      !followUp ||
      (followUp === "overdue"
        ? newFlags.overdue === 1
        : followUp === "upcoming"
          ? newFlags.upcoming === 1
          : !updated.followUpAt);
    const stillMatches = (!stage || updated.status === stage) && matchesDate;
    setRecords((values) =>
      values.flatMap((r) =>
        r.id === updated.id ? (stillMatches ? [updated] : []) : [r],
      ),
    );
    if (!stillMatches) setTotal((value) => Math.max(0, value - 1));
  }
  async function remove(id: string) {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/inbox", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = (await response.json()) as { error?: string };
      if (!response.ok) throw new Error(data.error || "Could not delete.");
      setDeleteId(null);
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not delete.");
    } finally {
      setPending(false);
    }
  }
  const stages =
    kind === "application"
      ? applicationStages
      : kind === "inquiry"
        ? inquiryStages
        : allStages;
  return (
    <Shell>
      <section className="section wrap owner-page enhanced-owner">
        {process.env.NEXT_PUBLIC_JMG_PREVIEW === "1" && <p className="inbox-operating-note"><strong>Preview only.</strong> Client records are read-only here. Changes and deletions are disabled.</p>}
        <div className="owner-title">
          <div>
            <span className="eyebrow">JMG REALTY PH · OWNER ACCESS</span>
            <h1>
              Your <em>inbox.</em>
            </h1>
          </div>
          {authenticated && (
            <div className="owner-actions">
              <button className="text-link" disabled={loading} onClick={load}>
                <RefreshCw size={16} />
                Refresh inbox
              </button>
              <button
                className="text-link"
                disabled={pending}
                onClick={async () => {
                  setPending(true);
                  setError("");
                  try {
                    const response = await fetch("/api/inbox/login", {
                      method: "DELETE",
                    });
                    if (!response.ok)
                      throw new Error("Could not sign out. Please try again.");
                    setAuthenticated(false);
                    setRecords([]);
                  } catch (e) {
                    setError(
                      e instanceof Error ? e.message : "Could not sign out.",
                    );
                  } finally {
                    setPending(false);
                  }
                }}
              >
                Sign out
              </button>
            </div>
          )}
        </div>
        {error && (
          <p className="form-error" role="alert">
            {error}
          </p>
        )}
        {!authenticated ? (
          loading ? (
            <p role="status">Loading inbox…</p>
          ) : (
            <form className="owner-form" onSubmit={login}>
              <h2>Owner sign in.</h2>
              <p>
                Review property requests, agent applications and your follow-up
                tasks.
              </p>
              <label>
                Owner password
                <input
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </label>
              <button className="button" disabled={pending} type="submit">
                {pending ? "Signing in…" : "Open inbox"}
                <ArrowUpRight size={17} />
              </button>
            </form>
          )
        ) : (
          <>
            <div className="inbox-operating-note"><strong>Daily response checklist</strong><p>Refresh this inbox at the start and end of your working day. Open new requests, record the next action and assign a follow-up date. Automatic email, SMS and messaging alerts are not connected; a saved request is held in this inbox.</p></div>
            <div
              className="inbox-overview"
              aria-label="Request overview for this inbox category"
            >
              <button
                onClick={() => {
                  setStage("new");
                  setFollowUp("");
                  setPage(0);
                }}
              >
                <span>Awaiting a response</span>
                <strong>{overview.needsResponse}</strong>
              </button>
              <button
                className={overview.overdue ? "has-overdue" : ""}
                onClick={() => {
                  setStage("");
                  setFollowUp("overdue");
                  setPage(0);
                }}
              >
                <span>Overdue follow-ups</span>
                <strong>{overview.overdue}</strong>
              </button>
              <button
                onClick={() => {
                  setStage("");
                  setFollowUp("upcoming");
                  setPage(0);
                }}
              >
                <span>Upcoming follow-ups</span>
                <strong>{overview.upcoming}</strong>
              </button>
            </div>
            <div className="inbox-tabs">
              {[
                { id: "all", label: "All requests" },
                { id: "inquiry", label: "Property inquiries" },
                { id: "application", label: "Agent applications" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  className={kind === tab.id ? "active" : ""}
                  aria-pressed={kind === tab.id}
                  onClick={() => {
                    setKind(tab.id);
                    setStage("");
                    setFollowUp("");
                    setPage(0);
                  }}
                >
                  {tab.label}
                </button>
              ))}
            </div>
            <div className="inbox-filter-row">
              <label>
                Filter by stage
                <select
                  value={stage}
                  onChange={(e) => {
                    setStage(e.target.value);
                    setPage(0);
                  }}
                >
                  <option value="">All stages</option>
                  {stages.map(([id, title]) => (
                    <option key={id} value={id}>
                      {title}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Filter follow-up dates
                <select
                  value={followUp}
                  onChange={(e) => {
                    setFollowUp(e.target.value);
                    setPage(0);
                  }}
                >
                  <option value="">All follow-up dates</option>
                  <option value="overdue">Overdue</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="none">No follow-up date</option>
                </select>
              </label>
              <span role="status">
                {total} {total === 1 ? "request" : "requests"}
                {loading ? " · Refreshing…" : ""}
              </span>
              {(stage || followUp) && (
                <button
                  className="text-link"
                  onClick={() => {
                    setStage("");
                    setFollowUp("");
                    setPage(0);
                  }}
                >
                  Clear filters
                </button>
              )}
            </div>
            <p className="inbox-guide">
              Follow-up dates use Philippine time (GMT+8). Check this inbox for
              new requests and reminder indicators; automatic notifications are
              not enabled.
            </p>
            {loading ? (
              <p role="status">Loading requests…</p>
            ) : records.length ? (
              records.map((lead) => (
                <LeadCard
                  key={lead.id}
                  lead={lead}
                  onSaved={saved}
                  onDelete={() => setDeleteId(lead.id)}
                  deletePending={pending}
                  deleteId={deleteId}
                  onCancelDelete={() => setDeleteId(null)}
                  onConfirmDelete={() => remove(lead.id)}
                />
              ))
            ) : (
              <div className="empty-listings">
                <h2>
                  {stage || followUp
                    ? "No requests match these filters."
                    : "A new conversation awaits."}
                </h2>
                <p>
                  {stage || followUp
                    ? "Clear a filter to return to the rest of the inbox."
                    : "Submitted inquiries and applications will appear here."}
                </p>
              </div>
            )}
            <div className="owner-pagination">
              <button
                disabled={page === 0 || loading}
                onClick={() => setPage((value) => value - 1)}
              >
                Previous
              </button>
              <span>Page {page + 1}</span>
              <button
                disabled={(page + 1) * 30 >= total || loading}
                onClick={() => setPage((value) => value + 1)}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>
    </Shell>
  );
}
