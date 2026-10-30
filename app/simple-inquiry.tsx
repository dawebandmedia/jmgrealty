"use client";

import { SuccessMark } from "./motion";
import { PreviewNotice } from "./preview-notice";
import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowUpRight, Check, ChevronDown, LoaderCircle, Phone, ShieldCheck } from "lucide-react";
import { company } from "./content";
import { inquiryChoices, inquiryGuidance, inquiryLocations, inquiryPropertyTypes } from "./inquiry-options";
import { parseInquiryContact, validateInquiryIdentity, type InquiryErrors } from "./inquiry-validation";

const emptyValues = { name: "", contact: "", service: "", location: "", propertyType: "", budget: "", message: "", consent: false };

export default function SimpleInquiry() {
  const uid = useId();
  const form = useRef<HTMLFormElement>(null), success = useRef<HTMLDivElement>(null), sending = useRef(false);
  const [values, setValues] = useState(emptyValues);
  const [open, setOpen] = useState(false), [context, setContext] = useState("");
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [errors, setErrors] = useState<InquiryErrors>({}), [error, setError] = useState(""), [reference, setReference] = useState("");
  const guidance = inquiryGuidance(values.service);
  const id = (name: string) => `${uid}-${name}`;

  useEffect(() => {
    const q = new URLSearchParams(window.location.search);
    const service = inquiryChoices.find(choice => choice.value === q.get("service"))?.value || "";
    const location = inquiryLocations.find(place => place.area === q.get("area"));
    const city = location?.cities.find(city => city === q.get("city"));
    const type = (q.get("type") || "").slice(0, 100), property = (q.get("property") || "").slice(0, 200);
    const propertyType = inquiryPropertyTypes.find(option => option.value.toLowerCase() === type.toLowerCase() || option.label.toLowerCase() === type.toLowerCase())?.value || (type === "House & Lot" ? "House" : "");
    const message = property ? `I’m interested in ${property}. Please share the current price, availability and viewing options.` : type && !propertyType ? `I’m interested in ${type.toLowerCase()} property options.` : "";
    setValues(current => ({ ...current, service, location: location ? `${location.area}|${city || ""}` : "", propertyType, message }));
    if (property || type) setContext(property ? `Your interest in ${property} is included in the optional details.` : "Your property preference is included in the optional details.");
  }, []);

  useEffect(() => { if (state === "success") success.current?.focus(); }, [state]);

  function update<K extends keyof typeof emptyValues>(name: K, value: (typeof emptyValues)[K]) {
    setValues(current => ({ ...current, [name]: value }));
    setErrors(current => ({ ...current, [name]: undefined }));
  }
  function showErrors(next: InquiryErrors) {
    setErrors(next);
    const first = Object.keys(next)[0];
    if (["location", "propertyType", "budget", "message"].some(key => next[key as keyof InquiryErrors])) setOpen(true);
    requestAnimationFrame(() => form.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus());
  }
  const fieldError = (name: keyof InquiryErrors) => errors[name] ? <span className="inquiry-field-error" id={id(`${name}-error`)}>{errors[name]}</span> : null;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const checked = validateInquiryIdentity(values);
    if (Object.keys(checked).length) { setState("idle"); setError(""); showErrors(checked); return; }
    const choice = inquiryChoices.find(choice => choice.value === values.service);
    if (!choice) { showErrors({ service: "Please choose what you need help with." }); return; }
    const contact = parseInquiryContact(values.contact)!;
    const [area = "", city = ""] = values.location.split("|");
    sending.current = true;
    setState("sending"); setError(""); setErrors({});
    try {
      const response = await fetch("/api/submissions", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ kind: "inquiry", name: values.name.trim(), ...contact, service: choice.service, inquiryPurpose: choice.value, area, city, propertyType: values.propertyType, budget: values.budget.trim(), message: values.message.trim(), consent: values.consent, website: new FormData(event.currentTarget).get("website") || "" }),
      });
      const result = await response.json().catch(() => null) as { reference?: string; error?: string; fields?: InquiryErrors } | null;
      if (!response.ok) {
        if (result?.fields) showErrors(result.fields);
        throw new Error(result?.error || "We couldn’t save your inquiry. Please try again or contact JMG directly.");
      }
      if (!result?.reference || !/^JMG-[A-F0-9]{8}$/.test(result.reference)) throw new Error("We couldn’t confirm that your inquiry was saved. Please contact JMG before sending it again.");
      setReference(result.reference); setState("success");
    } catch (cause) {
      setState("error");
      setError(cause instanceof TypeError ? "We couldn’t connect. Check your connection and try again, or contact JMG directly." : cause instanceof Error ? cause.message : "We couldn’t confirm your inquiry. Please try again or contact JMG directly.");
    } finally { sending.current = false; }
  }

  if (state === "success") return (
    <div className="form-success simple-inquiry-success" ref={success} tabIndex={-1} role="status">
      <SuccessMark />
      <span className="eyebrow">YOUR INQUIRY IS SAVED</span>
      <h2>Thank you for reaching out!</h2>
      <p>Your inquiry has been saved for JMG Realty PH to review. Our team will respond using the contact details you provided.</p>
      <p className="reference">Reference: {reference}</p>
      <p>Office hours: {company.hours}.</p>
      <a className="text-link" href={`tel:${company.primaryTel}`}><Phone size={17} aria-hidden="true" />{company.primaryPhone}</a>
      <button type="button" className="text-link" onClick={() => { setValues(emptyValues); setOpen(false); setContext(""); setState("idle"); setErrors({}); setError(""); requestAnimationFrame(() => form.current?.querySelector<HTMLInputElement>('[name="name"]')?.focus()); }}>Send another inquiry <ArrowUpRight size={16} aria-hidden="true" /></button>
    </div>
  );

  return (
    <form className="inquiry-form simple-inquiry" ref={form} onSubmit={submit} noValidate aria-busy={state === "sending"}>
      <PreviewNotice />
      <div className="form-heading">
        <span className="eyebrow">START A CONVERSATION</span>
        <h2>How can we help?</h2>
        <p>Tell us your name, how to reach you and what you need. We can work out the details together.</p>
      </div>
      <p className="inquiry-required-note">Fields marked <span aria-hidden="true">*</span> are required.</p>
      <fieldset disabled={state === "sending"} className="inquiry-controls">
        <legend className="sr-only">Your inquiry</legend>
        <div className="inquiry-fields">
          <div className="inquiry-field">
            <label htmlFor={id("name")}>Full name <span aria-hidden="true">*</span></label>
            <input id={id("name")} name="name" type="text" autoComplete="name" autoCapitalize="words" required maxLength={120} placeholder="Your full name" value={values.name} onChange={e => update("name", e.target.value)} aria-invalid={!!errors.name} aria-describedby={errors.name ? id("name-error") : undefined} />
            {fieldError("name")}
          </div>
          <div className="inquiry-field">
            <label htmlFor={id("contact")}>Preferred contact method <span aria-hidden="true">*</span></label>
            <input id={id("contact")} name="contact" type="text" inputMode={values.contact && !/[a-z@]/i.test(values.contact) ? "tel" : "email"} autoCapitalize="none" autoCorrect="off" spellCheck={false} required maxLength={160} placeholder="Email address or mobile number" value={values.contact} onChange={e => update("contact", e.target.value)} aria-invalid={!!errors.contact} aria-describedby={`${id("contact-help")}${errors.contact ? ` ${id("contact-error")}` : ""}`} />
            <small id={id("contact-help")}>One is enough: email, 09XX or +63 mobile.</small>
            {fieldError("contact")}
          </div>
          <div className="inquiry-field inquiry-full">
            <label htmlFor={id("service")}>What can we help you with? <span aria-hidden="true">*</span></label>
            <select id={id("service")} name="service" required value={values.service} onChange={e => update("service", e.target.value)} aria-invalid={!!errors.service} aria-describedby={errors.service ? id("service-error") : undefined}>
              <option value="">Choose a service</option>
              <optgroup label="Your property plans">{inquiryChoices.slice(0, 6).map(choice => <option key={choice.value} value={choice.value}>{choice.label}</option>)}</optgroup>
              <optgroup label="JMG services">{inquiryChoices.slice(6).map(choice => <option key={choice.value} value={choice.value}>{choice.label}</option>)}</optgroup>
            </select>
            {fieldError("service")}
          </div>
        </div>
        {context && <p className="inquiry-context">{context}</p>}
        <div className="inquiry-optional">
          <button type="button" className="inquiry-details-toggle" aria-expanded={open} aria-controls={id("optional")} onClick={() => setOpen(!open)}>Add more details (optional)<ChevronDown size={18} aria-hidden="true" /></button>
          <p className="inquiry-optional-description" id={id("optional-help")}>Help us understand what you're looking for. You can skip this section and submit your inquiry anytime.</p>
          <div id={id("optional")} hidden={!open} className="inquiry-optional-content" aria-describedby={id("optional-help")}>
            <p className="inquiry-service-hint">{guidance.hint}</p>
            <div className="inquiry-fields">
              <div className="inquiry-field">
                <label htmlFor={id("location")}>{guidance.location} <small>(optional)</small></label>
                <select id={id("location")} name="location" value={values.location} onChange={e => update("location", e.target.value)} aria-invalid={!!errors.location} aria-describedby={errors.location ? id("location-error") : undefined}>
                  <option value="">Any location</option>
                  {inquiryLocations.map(place => <optgroup key={place.area} label={place.area}><option value={`${place.area}|`}>Anywhere in {place.area}</option>{place.cities.map(city => <option key={city} value={`${place.area}|${city}`}>{city} · {place.area}</option>)}</optgroup>)}
                  <option value="Other / To be discussed|">Other / To be discussed</option>
                </select>
                {fieldError("location")}
              </div>
              <div className="inquiry-field">
                <label htmlFor={id("propertyType")}>Property type <small>(optional)</small></label>
                <select id={id("propertyType")} name="propertyType" value={values.propertyType} onChange={e => update("propertyType", e.target.value)} aria-invalid={!!errors.propertyType} aria-describedby={errors.propertyType ? id("propertyType-error") : undefined}>
                  <option value="">Any / To be discussed</option>{inquiryPropertyTypes.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
                </select>
                {fieldError("propertyType")}
              </div>
              <div className="inquiry-field inquiry-full">
                <label htmlFor={id("budget")}>{guidance.budget} <small>(optional)</small></label>
                <input id={id("budget")} name="budget" type="text" maxLength={100} placeholder="e.g. ₱5M–₱8M" value={values.budget} onChange={e => update("budget", e.target.value)} aria-invalid={!!errors.budget} aria-describedby={errors.budget ? id("budget-error") : undefined} />
                {fieldError("budget")}
              </div>
              <div className="inquiry-field inquiry-full">
                <label htmlFor={id("message")}>{guidance.message} <small>(optional)</small></label>
                <textarea id={id("message")} name="message" rows={4} maxLength={3000} placeholder={guidance.placeholder} value={values.message} onChange={e => update("message", e.target.value)} aria-invalid={!!errors.message} aria-describedby={errors.message ? id("message-error") : undefined} />
                {fieldError("message")}
              </div>
            </div>
          </div>
        </div>
        <div className="honeypot" aria-hidden="true"><label>Website<input name="website" tabIndex={-1} autoComplete="off" /></label></div>
        <label className="consent inquiry-consent" htmlFor={id("consent")}>
          <input id={id("consent")} type="checkbox" name="consent" required checked={values.consent} onChange={e => update("consent", e.target.checked)} aria-invalid={!!errors.consent} aria-describedby={errors.consent ? id("consent-error") : undefined} />
          <span>I agree that JMG Realty PH may use the information I provide to respond to my inquiry. Read the <a href="/privacy" target="_blank" rel="noreferrer">privacy notice<span className="sr-only"> (opens in a new tab)</span></a>.</span>
        </label>
        {fieldError("consent")}
        {Object.values(errors).some(Boolean) && state !== "error" && <p className="inquiry-error-summary" role="alert">Please check the highlighted fields.</p>}
        {state === "error" && <div className="form-error" role="alert"><p>{error}</p><p>Your entered details are still here. You can also <a href={`mailto:${company.email}`}>email us</a> or <a href={`tel:${company.primaryTel}`}>call JMG</a>.</p></div>}
        <button className="button inquiry-submit" type="submit" disabled={state === "sending"}>{state === "sending" ? <><span>Sending your inquiry…</span><LoaderCircle className="inquiry-spinner" size={18} aria-hidden="true" /></> : <><span>Send my inquiry</span><ArrowUpRight size={18} aria-hidden="true" /></>}</button>
      </fieldset>
      <p className="inquiry-trust"><ShieldCheck size={15} aria-hidden="true" />Your details are used to respond to your inquiry.</p>
      <p className="form-note">Office hours: {company.hours}.</p>
    </form>
  );
}
