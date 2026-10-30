"use client";
import { SuccessMark } from "./motion";
import { PreviewNotice } from "./preview-notice";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, CalendarDays, Check, Phone } from "lucide-react";
import { properties, developments, company, type Property } from "./content";
import { manilaToday, requestUrl } from "./property-utils";
import { parseInquiryContact, validateInquiryIdentity, type InquiryErrors } from "./inquiry-validation";

export function PropertyRequestLinks({ ids, light = false }: { ids: string[]; light?: boolean }) {
  return <div className="property-request-links"><a className={`button ${light ? "cream" : ""}`} href={requestUrl("viewing", ids)}><CalendarDays size={18}/>Request a viewing<ArrowUpRight size={17}/></a><a className="text-link" href={requestUrl("price", ids)}>Get current price & availability<ArrowUpRight size={17}/></a></div>;
}
export function PropertyRequestForm({ models, choices, intent }: { models: Property[]; choices: Property[]; intent: "viewing" | "price" }) {
  const [selected, setSelected] = useState(models.map(p => p.id));
  const [name, setName] = useState(""), [contact, setContact] = useState("");
  const [scheduleFlexible, setScheduleFlexible] = useState(true);
  const [state, setState] = useState<"idle" | "saving" | "success">("idle");
  const [error, setError] = useState(""), [errors, setErrors] = useState<InquiryErrors>({}), [reference, setReference] = useState("");
  const [minDate] = useState(manilaToday);
  const lock = useRef(false), form = useRef<HTMLFormElement>(null), success = useRef<HTMLElement>(null);
  const currentModels = selected.map(id => properties.find(p => p.id === id)!).filter(Boolean);
  useEffect(() => { if (state === "success") success.current?.focus(); }, [state]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); if (lock.current) return;
    const data = Object.fromEntries(new FormData(event.currentTarget));
    const fields = validateInquiryIdentity({name,contact,service:"Real Estate Brokerage",consent:data.consent === "on"});
    setErrors(fields);
    if (Object.keys(fields).length) { form.current?.querySelector<HTMLElement>(`[name="${Object.keys(fields)[0]}"]`)?.focus(); return; }
    if (!currentModels.length) { setError("Choose a home model or unit category to continue."); return; }
    const parsed = parseInquiryContact(contact)!;
    lock.current = true;setState("saving");setError("");
    try {
      const response = await fetch("/api/submissions", {method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({...data,...parsed,name:name.trim(),kind:"inquiry",service:"Real Estate Brokerage",area:"",intent,propertyIds:selected,scheduleFlexible:intent === "viewing" && scheduleFlexible,consent:data.consent === "on"})});
      const result = await response.json() as { reference?: string; error?: string };
      if (!response.ok || !/^JMG-[A-F0-9]{8}$/.test(result.reference || "")) throw new Error(result.error || "We couldn’t confirm that your request was saved. Please try again.");
      setReference(result.reference!);setState("success");
    } catch (cause) {setError(cause instanceof Error ? cause.message : "Please try again or contact JMG directly.");setState("idle");}
    finally {lock.current = false;}
  }
  if (state === "success") return <section className="request-success" role="status" tabIndex={-1} ref={success}>
    <SuccessMark /><span className="eyebrow">YOUR REQUEST IS SAVED</span>
    <h2>{intent === "viewing" ? "Let’s plan your visit." : "Let’s clarify the details."}</h2>
    <p>{intent === "viewing" ? "JMG will contact you to discuss the property, schedule and viewing arrangements. Your visit is not yet confirmed." : "JMG will review your request for current prices, availability and inclusions, then contact you using the details you provided."}</p>
    <p className="reference">Reference: {reference}</p><p>Office hours: {company.hours}.</p>
    <a href={`tel:${company.primaryTel}`} className="text-link"><Phone size={17}/>{company.primaryPhone}</a><a href="/contact#contact-people" className="text-link">Message our contact people ↗</a><a href="/properties" className="button">Return to the collection<ArrowUpRight size={18}/></a>
  </section>;
  return <form className="property-request-form" onSubmit={submit} ref={form} aria-busy={state === "saving"}>
    <PreviewNotice />
    <div className="request-form-heading"><span className="eyebrow">{intent === "viewing" ? "YOUR VIEWING REQUEST" : "YOUR NEXT CONVERSATION"}</span><h2>{intent === "viewing" ? "A closer look." : "The details you need."}</h2><p>Leave your name and one way to reach you. Fields marked * are required.</p></div>
    <fieldset disabled={state === "saving"}><legend className="sr-only">Request details</legend>
      {!models.length && <label><span>Home model or unit category *</span><select name="model" required value={selected[0] || ""} onChange={e=>setSelected(e.target.value ? [e.target.value] : [])}><option value="">Choose a model</option>{choices.map(p=><option key={p.id} value={p.id}>{p.title} · {developments.find(d=>d.id===p.developmentId)?.name}</option>)}</select></label>}
      {currentModels.length > 0 && <div className="request-context"><span className="eyebrow">YOUR REQUEST CONCERNS</span>{currentModels.map(p=><a href={`/properties/${p.id}`} key={p.id}>{p.title}<span>{developments.find(d=>d.id===p.developmentId)?.name} · {p.city}, {p.area}</span></a>)}</div>}
      <div className="request-fields">
        <label className="full"><span>Full name *</span><input name="name" value={name} onChange={e=>{setName(e.target.value);setErrors(v=>({...v,name:undefined}));}} autoComplete="name" required minLength={2} maxLength={120} placeholder="Your full name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "request-name-error" : undefined}/>{errors.name && <span className="field-error" id="request-name-error">{errors.name}</span>}</label>
        <label className="full"><span>Email address or mobile number *</span><input name="contact" aria-label="Email address or mobile number" value={contact} onChange={e=>{setContact(e.target.value);setErrors(v=>({...v,contact:undefined}));}} required maxLength={160} type="text" inputMode={contact.includes("@") ? "email" : undefined} autoComplete="off" autoCapitalize="none" spellCheck={false} placeholder="you@example.com or 09XX XXX XXXX" aria-invalid={!!errors.contact} aria-describedby={`request-contact-help${errors.contact ? " request-contact-error" : ""}`}/><span className="request-contact-help" id="request-contact-help">One is enough. We’ll email you or call the number you provide.</span>{errors.contact && <span className="field-error" id="request-contact-error">{errors.contact}</span>}</label>
        {intent === "viewing" && <div className="full request-schedule"><label className="consent"><input name="scheduleFlexible" type="checkbox" checked={scheduleFlexible} onChange={e=>setScheduleFlexible(e.target.checked)}/><span>Help me choose a viewing schedule.</span></label>{!scheduleFlexible && <div className="request-fields"><label><span>Preferred date *</span><input name="preferredDate" type="date" min={minDate} required/></label><label><span>Preferred time (GMT+8) *</span><select name="timeWindow" required defaultValue=""><option value="">Choose a time window</option><option>Morning (8 AM–12 PM)</option><option>Afternoon (12–5 PM)</option><option>Flexible</option></select></label><label className="full"><span>Viewing preference *</span><select name="viewingMode" required defaultValue=""><option value="">Choose a preference</option><option>On-site viewing</option><option>Discuss remote viewing</option></select></label></div>}</div>}
        <label className="full"><span>Anything else to share? <small>(optional)</small></span><textarea name="message" rows={3} maxLength={1500} placeholder={intent === "viewing" ? "Share any questions or viewing needs." : "Ask about the price, availability or inclusions."}/></label>
      </div>
      <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off"/></label></div>
      <label className="consent"><input type="checkbox" name="consent" required aria-invalid={!!errors.consent}/><span>I agree that JMG Realty PH may use these details to respond to my request. Read the <a href="/privacy" target="_blank" rel="noopener noreferrer">privacy notice (opens a new tab)</a>.</span></label>
      {errors.consent && <p className="field-error">{errors.consent}</p>}{error && <p className="form-error" role="alert">{error} You can also <a href="/contact#contact-people">contact our team directly</a>.</p>}
      <button type="submit" className="button">{state === "saving" ? "Saving your request…" : intent === "viewing" ? "Send viewing request" : "Request current details"}<ArrowUpRight size={18}/></button>
    </fieldset>
    <p className="request-confirmation-note">{intent === "viewing" ? "This saves a request. JMG will confirm availability and viewing arrangements with you." : "Published prices are guides. Request a current written quotation for your selected configuration."}</p>
  </form>;
}
