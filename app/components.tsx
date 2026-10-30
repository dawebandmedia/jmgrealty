"use client";
import { inspirationImages } from "./listing-inspiration";
import SimpleInquiry from "./simple-inquiry";
import { MotionControls } from "./motion";

import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type FormEvent,
} from "react";
import {
  ArrowUpRight,
  ArrowRight,
  ArrowDown,
  Menu,
  X,
  Plus,
  Minus,
  Phone,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  Maximize,
} from "lucide-react";
import {
  company,
  areas,
  services,
  properties,
  developments,
  faqs,
} from "./content";
import { ShortlistProvider, ShortlistButton } from "./shortlist";
export { ArrowUpRight, ArrowRight, ArrowDown, MapPin };

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <a
      className={`logo ${light ? "light" : ""}`}
      href="/"
      aria-label="JMG Realty PH home"
    >
      <img
        src={light ? "/brand/full-display.webp" : "/brand/header-display.webp"}
        alt=""
        aria-hidden="true"
        width={light ? 1488 : 2090}
        height={light ? 800 : 442}
        decoding="async"
      />
    </a>
  );
}
export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [path, setPath] = useState("");
  const progress = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setPath(window.location.pathname);
    let frame = 0;
    const update = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setScrolled(window.scrollY > 45);
        const height =
          document.documentElement.scrollHeight - window.innerHeight;
        if (progress.current)
          progress.current.style.transform = `scaleX(${height > 0 ? Math.min(1, window.scrollY / height) : 0})`;
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(frame);
    };
  }, []);
  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const previousFocus = document.activeElement as HTMLElement | null;
    const background = document.querySelectorAll<HTMLElement>(
      "main, footer, .mobile-call, .shortlist-tray",
    );
    background.forEach((element) => {
      element.inert = true;
    });
    document.body.style.overflow = "hidden";
    const firstLink = document.querySelector<HTMLAnchorElement>(".nav a");
    const menuButton =
      document.querySelector<HTMLButtonElement>(".menu-button");
    firstLink?.focus();
    const escape = (e: KeyboardEvent) => {
      if (document.querySelector("dialog[open]")) return;
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab") {
        if (e.shiftKey && document.activeElement === firstLink) {
          e.preventDefault();
          menuButton?.focus();
        } else if (!e.shiftKey && document.activeElement === menuButton) {
          e.preventDefault();
          firstLink?.focus();
        }
      }
    };
    window.addEventListener("keydown", escape);
    return () => {
      document.body.style.overflow = previous;
      background.forEach((element) => {
        element.inert = false;
      });
      previousFocus?.focus();
      window.removeEventListener("keydown", escape);
    };
  }, [open]);
  return (
    <>
      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className={`header ${scrolled ? "is-scrolled" : ""}`}>
        <Logo />
        <nav aria-label="Main navigation" className={open ? "nav open" : "nav"}>
          <a
            href="/properties"
            aria-current={path.startsWith("/properties") ? "page" : undefined}
          >
            Properties
          </a>
          <a
            href="/services"
            aria-current={path === "/services" ? "page" : undefined}
          >
            Our expertise
          </a>
          <a
            href="/about"
            aria-current={path === "/about" ? "page" : undefined}
          >
            About JMG
          </a>
          <a
            href="/areas"
            aria-current={path === "/areas" ? "page" : undefined}
          >
            Locations
          </a>
          <a
            href="/join"
            className="join-link"
            aria-current={path === "/join" ? "page" : undefined}
          >
            Join our team <ArrowUpRight size={14} />
          </a>
          <a href="/contact" className="button small">
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <ShortlistButton />
        </nav>
        <button
          className="menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <div className="page-progress" ref={progress} aria-hidden="true" />
      </header>
    </>
  );
}
export function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-top">
        <div>
          <span className="eyebrow">YOUR NEXT CHAPTER</span>
          <h2>
            Let’s make your
            <br />
            <em>next move.</em>
          </h2>
        </div>
        <a
          href="/contact"
          className="round-link"
          aria-label="Contact JMG Realty PH"
        >
          <ArrowUpRight size={38} />
        </a>
      </div>
      <div className="wrap footer-grid">
        <div>
          <Logo light />
          <p>{company.tagline}</p>
        </div>
        <div>
          <span className="eyebrow">EXPLORE</span>
          <a href="/properties">Find a property</a>
          <a href="/services">Our services</a>
          <a href="/about">About JMG</a>
          <a href="/areas">Areas we serve</a>
        </div>
        <div>
          <span className="eyebrow">CONNECT</span>
          <a href={`tel:${company.primaryTel}`}>Broker Cel · {company.primaryPhone}</a>
          <a href="tel:+639674269838">Home Empire PH · 0967 426 9838</a>
          <a href="/contact#contact-people">Viber, WhatsApp & public profiles ↗</a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          <p>
            Monday–Saturday
            <br />
            8:00 AM–5:00 PM · GMT+8
          </p>
        </div>
        <div>
          <span className="eyebrow">GROW WITH US</span>
          <a href="/join">
            Join our team <ArrowUpRight size={14} />
          </a>
          <a href="/services#training">Training & mentoring</a>
          <a href="/faq">Frequently asked questions</a>
          {company.socialLinks.map((s) => (
            <a href={s.url} key={s.label} target="_blank" rel="noreferrer">
              {s.label}
            </a>
          ))}
        </div>
      </div>
      <div className="wrap footer-bottom">
        <MotionControls />
        <span>© {new Date().getFullYear()} JMG Realty PH</span>
        <span>
          Property imagery:{" "}
          <a href="https://brokercel.com/" target="_blank" rel="noreferrer">
            BrokerCel
          </a>{", "}
          <a href="https://amaresa.com.ph/" target="_blank" rel="noreferrer">Amaresa</a>{" & "}
          <a href="https://shore3residences.com/" target="_blank" rel="noreferrer">Shore 3</a>{", "}
          <a href="https://vineresidences.com/" target="_blank" rel="noreferrer">Vine</a>{", "}<a href="https://hill-residences.com/" target="_blank" rel="noreferrer">Hill</a>{", "}
          <a href="https://glamresidences.com/" target="_blank" rel="noreferrer">Glam</a>{" & "}
          <a href="https://smdc.com/properties/glam-residences/" target="_blank" rel="noreferrer">SMDC</a>
          {" & "}<a href="https://rocka.ph/alegria/" target="_blank" rel="noreferrer">Rocka Homes & Villas</a>
          {", "}<a href="https://www.nila.ph/" target="_blank" rel="noreferrer">Mont / Nila</a>
          {", "}<a href="https://lanelloheights.phproperty.com/" target="_blank" rel="noreferrer">Lanello Heights reference</a>
          {", "}<a href="https://apechomes.com/" target="_blank" rel="noreferrer">APEC Homes / Greenway & Norzagaray</a>
          {", "}<a href="https://universityhome.com.ph/uhome-leon-guinto/" target="_blank" rel="noreferrer">UHome Leon Guinto</a>
          {", "}<a href="/images/properties/pacifictown-naic-5/naic5-flyer.jpg" target="_blank" rel="noreferrer">Pacifictown Naic 5 flyer</a>
        </span>
        <span> · </span><a href="https://eurotowersintl.com/" target="_blank" rel="noreferrer">Euro Towers International Inc.</a><a href="/privacy">Privacy</a>
      </div>
    </footer>
  );
}
export function Shell({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <ShortlistProvider>
      <div className={`site-shell ${className}`}>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <a className="mobile-call" href={`tel:${company.primaryTel}`}>
          <Phone size={17} /> Call JMG
        </a>
      </div>
    </ShortlistProvider>
  );
}
export function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window) || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("seen");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  italic,
  description,
  image = inspirationImages.living.src,
  imageAlt = inspirationImages.living.alt,
  imageCaption = inspirationImages.living.caption,
  imageHref = inspirationImages.living.href,
}: {
  eyebrow: string;
  title: string;
  italic?: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageCaption?: string;
  imageHref?: string;
}) {
  return (
    <section className="page-hero">
      <div className="wrap page-hero-content">
        <span className="eyebrow">{eyebrow}</span>
        <h1>
          {title}
          {italic && (
            <>
              <br />
              <em>{italic}</em>
            </>
          )}
        </h1>
        <p>{description}</p>
      </div>
      <div className="page-hero-image">
        <img
          src={
            image.startsWith("/") || image.startsWith("https://")
              ? image
              : `/images/${image}`
          }
          alt={imageAlt}
        />
        <span>{imageHref ? <a href={imageHref}>{imageCaption} ↗</a> : imageCaption}</span>
      </div>
    </section>
  );
}
export function Action({
  href,
  children,
  light = false,
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
}) {
  return (
    <a className={`button ${light ? "cream" : ""}`} href={href}>
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
export function FAQ({ limit }: { limit?: number }) {
  const [active, setActive] = useState<number | null>(null);
  return (
    <div className="faq-list">
      {faqs.slice(0, limit).map((f, i) => (
        <div className={`faq-item ${active === i ? "active" : ""}`} key={f.q}>
          <h3>
            <button
              aria-expanded={active === i}
              aria-controls={`faq-${i}`}
              onClick={() => setActive(active === i ? null : i)}
            >
              {f.q}
              {active === i ? <Minus size={19} /> : <Plus size={19} />}
            </button>
          </h3>
          <div id={`faq-${i}`} hidden={active !== i}>
            <p>{f.a}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
export function QuickStart() {
  const [purpose, setPurpose] = useState("buy"),
    [area, setArea] = useState("");
  function go(e: FormEvent) {
    e.preventDefault();
    const query = new URLSearchParams({ area });
    if (purpose === "join") window.location.href = "/join";
    else if (purpose === "buy") window.location.href = `/properties?${query}`;
    else
      window.location.href = `/contact?${new URLSearchParams({ area, service: purpose === "sell" ? "Real Estate Brokerage" : "Property Appraisal" })}`;
  }
  return (
    <form className="quick-start wrap" onSubmit={go}>
      <div className="quick-title">
        <span className="eyebrow">A NEW BEGINNING</span>
        <span>
          What’s your
          <br />
          next move?
        </span>
      </div>
      <label>
        <span>I’M LOOKING TO</span>
        <select value={purpose} onChange={(e) => setPurpose(e.target.value)}>
          <option value="buy">Find a property</option>
          <option value="sell">Sell my property</option>
          <option value="appraisal">Request an appraisal</option>
          <option value="join">Join the team</option>
        </select>
      </label>
      <label>
        <span>PREFERRED LOCATION</span>
        <select value={area} onChange={(e) => setArea(e.target.value)}>
          <option value="">Explore all areas</option>
          {areas.map((a) => (
            <option key={a}>{a}</option>
          ))}
        </select>
      </label>
      <button className="button cream" type="submit">
        Let’s begin <ArrowUpRight size={18} />
      </button>
    </form>
  );
}
export function Inspiration() {
  const slides = [
    {
      image: inspirationImages.courtyard,
      title: "Space beyond your front door.",
      label: "OUTDOORS",
      text: "Nila’s courtyard design brings landscaped spaces between its condominium residences. Architectural rendering; confirm the current design and facilities.",
      project: "Nila Residences",
    },
    {
      image: inspirationImages.living,
      title: "A room that feels like home.",
      label: "INTERIORS",
      text: "Explore the Amara Expanded model’s bright living area at Amaresa Homes. Furniture and styling are illustrative; confirm written turnover inclusions.",
      project: "Amara Expanded",
    },
    {
      image: inspirationImages.skyline,
      title: "A different view of the city.",
      label: "VIEWS",
      text: "Look across Metro Manila from Vivaldi Cubao’s SkyPool. This amenity photograph is a project reference; confirm current access and operating arrangements.",
      project: "Vivaldi Cubao amenities",
    },
  ];
  const [index, setIndex] = useState(0),
    [gallery, setGallery] = useState(false);
  const close = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    if (!gallery) return;
    close.current?.focus();
    const old = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") setGallery(false);
      if (e.key === "ArrowRight") setIndex((i) => (i + 1) % 3);
      if (e.key === "ArrowLeft") setIndex((i) => (i + 2) % 3);
      if (e.key === "Tab") {
        const nodes =
          document.querySelectorAll<HTMLButtonElement>(".lightbox button");
        const first = nodes[0],
          last = nodes[nodes.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    window.addEventListener("keydown", key);
    return () => {
      document.body.style.overflow = old;
      window.removeEventListener("keydown", key);
      document.getElementById("gallery-open")?.focus();
    };
  }, [gallery]);
  const s = slides[index];
  return (
    <>
      <div className="showcase">
        <div className="showcase-image">
          <img
            key={s.image.src}
            src={s.image.src}
            alt={s.image.alt}
            loading="lazy"
          />
          <button
            id="gallery-open"
            className="image-expand"
            onClick={() => setGallery(true)}
            aria-label="View inspiration gallery"
          >
            <Maximize size={19} />
          </button>
          <span className="image-label">
            {s.image.caption}
          </span>
        </div>
        <div className="showcase-story">
          <div
            className="showcase-tabs"
            role="tablist"
            aria-label="Property interests"
          >
            {slides.map((slide, i) => (
              <button
                role="tab"
                aria-selected={index === i}
                aria-controls="inspiration-panel"
                id={`inspiration-tab-${i}`}
                tabIndex={index === i ? 0 : -1}
                onClick={() => setIndex(i)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                    e.preventDefault();
                    const next = (i + (e.key === "ArrowRight" ? 1 : 2)) % 3;
                    setIndex(next);
                    document.getElementById(`inspiration-tab-${next}`)?.focus();
                  }
                }}
                className={index === i ? "active" : ""}
                key={slide.label}
              >
                {slide.label}
              </button>
            ))}
          </div>
          <div
            role="tabpanel"
            id="inspiration-panel"
            aria-labelledby={`inspiration-tab-${index}`}
          >
            <span className="eyebrow">0{index + 1} / 03</span>
            <h3>{s.title}</h3>
            <p>{s.text}</p>
            <a
              className="text-link"
              href={s.image.href}
            >
              Explore {s.project} <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="showcase-controls">
            <span>EXPLORE THE POSSIBILITIES</span>
            <button
              onClick={() => setIndex((index + 2) % 3)}
              aria-label="Previous inspiration"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={() => setIndex((index + 1) % 3)}
              aria-label="Next inspiration"
            >
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
      {gallery && (
        <div
          className="lightbox"
          role="dialog"
          aria-modal="true"
          aria-label="Architectural inspiration gallery"
        >
          <button
            ref={close}
            className="lightbox-close"
            onClick={() => setGallery(false)}
            aria-label="Close gallery"
          >
            <X />
          </button>
          <button
            onClick={() => setIndex((index + 2) % 3)}
            aria-label="Previous image"
          >
            <ChevronLeft />
          </button>
          <figure>
            <img
              src={s.image.src}
              alt={s.image.alt}
            />
            <figcaption>
              {s.image.caption}
            </figcaption>
          </figure>
          <button
            onClick={() => setIndex((index + 1) % 3)}
            aria-label="Next image"
          >
            <ChevronRight />
          </button>
        </div>
      )}
    </>
  );
}
export function InquiryForm({ kind = "inquiry" }: { kind?: "inquiry" | "application" }) {
  return kind === "inquiry" ? <SimpleInquiry /> : <LegacyInquiryForm kind="application" />;
}

function LegacyInquiryForm({
  kind = "inquiry",
}: {
  kind?: "inquiry" | "application";
}) {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">(
      "idle",
    ),
    [error, setError] = useState(""),
    [reference, setReference] = useState("");
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (kind !== "inquiry" || !form.current) return;
    const params = new URLSearchParams(window.location.search);
    for (const key of ["service", "area"]) {
      const field = form.current.elements.namedItem(
        key,
      ) as HTMLSelectElement | null;
      const value = params.get(key);
      if (
        field &&
        value &&
        Array.from(field.options).some((o) => o.value === value)
      )
        field.value = value;
    }
    const type = params.get("type");
    const property = params.get("property");
    if (property) {
      const field = form.current.elements.namedItem(
        "message",
      ) as HTMLTextAreaElement;
      field.value = `I’m interested in ${property}. Please share the current price, availability and viewing options.`;
    } else if (type) {
      const field = form.current.elements.namedItem(
        "message",
      ) as HTMLTextAreaElement;
      field.value = `I’m interested in ${type.toLowerCase()} property options. `;
    }
  }, [kind]);
  async function submit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, kind, consent: data.consent === "on" }),
      });
      const result = (await res.json()) as {
        error?: string;
        reference: string;
      };
      if (!res.ok)
        throw new Error(
          result.error || "We couldn’t save your request. Please try again.",
        );
      setReference(result.reference);
      setState("success");
    } catch (e) {
      setState("error");
      setError(
        e instanceof Error
          ? e.message
          : "Please try again or contact us directly.",
      );
    }
  }
  if (state === "success")
    return (
      <div className="form-success" role="status">
        <span className="success-icon">
          <Check size={28} />
        </span>
        <span className="eyebrow">A NEW CONVERSATION</span>
        <h3>
          {kind === "application"
            ? "Your interest is received."
            : "Your next chapter starts here."}
        </h3>
        <p>
          {kind === "application"
            ? "Thank you for expressing interest in joining JMG Realty PH. Your application inquiry has been saved for the team to review."
            : "Your inquiry has been saved for JMG Realty PH to review. For urgent questions, please contact us during office hours."}
        </p>
        <p className="reference">Reference: {reference}</p>
        <a className="text-link" href={`tel:${company.primaryTel}`}>
          <Phone size={17} />
          {company.primaryPhone}
        </a>
        <button className="text-link" onClick={() => setState("idle")}>
          Send another request <ArrowRight size={16} />
        </button>
      </div>
    );
  return (
    <form ref={form} className="inquiry-form" onSubmit={submit}>
      <div className="form-heading">
        <span className="eyebrow">
          {kind === "application"
            ? "EXPRESS YOUR INTEREST"
            : "START A CONVERSATION"}
        </span>
        <h2>
          {kind === "application"
            ? "Tell us about yourself."
            : "How can we help?"}
        </h2>
        <p>
          {kind === "application"
            ? "Share your background and goals. We’ll discuss the relevant requirements and next steps with you."
            : "A few details will help us understand your next move."}
        </p>
      </div>
      <div className="form-grid">
        <label>
          Full name <span>*</span>
          <input
            name="name"
            autoComplete="name"
            required
            maxLength={120}
            placeholder="Your full name"
          />
        </label>
        <label>
          Email address <span>*</span>
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={160}
            placeholder="you@example.com"
          />
        </label>
        <label>
          Contact number <span>*</span>
          <input
            name="phone"
            type="tel"
            autoComplete="tel"
            pattern="[+0-9() .-]{7,25}"
            required
            maxLength={25}
            placeholder="09XX XXX XXXX"
          />
        </label>
        <label>
          {kind === "application" ? "Your location" : "Preferred location"}
          <select name="area">
            <option value="">Select an area</option>
            {areas.map((a) => (
              <option key={a}>{a}</option>
            ))}
            <option>Other / To be discussed</option>
          </select>
        </label>
        {kind === "inquiry" ? (
          <>
            <label className="full">
              What can we help you with? <span>*</span>
              <select name="service" required>
                <option value="">Choose a service</option>
                {services.map((s) => (
                  <option key={s.id}>{s.name}</option>
                ))}
              </select>
            </label>
            <label>
              Property type
              <select name="propertyType">
                <option value="">Any / To be discussed</option>
                <option>House</option>
                <option>Condominium</option>
                <option>Townhouse</option>
                <option>Lot</option>
                <option>Commercial</option>
              </select>
            </label>
            <label>
              Budget or price range
              <input
                name="budget"
                maxLength={100}
                placeholder="Optional — e.g. ₱5M–₱8M"
              />
            </label>
          </>
        ) : (
          <>
            <input type="hidden" name="service" value="Agent recruitment" />
            <label>
              Experience level <span>*</span>
              <select name="experience" required>
                <option value="">Select your background</option>
                <option>New to real estate</option>
                <option>Some real estate experience</option>
                <option>Experienced salesperson</option>
                <option>Licensed broker</option>
                <option>Other</option>
              </select>
            </label>
            <label>
              Qualification / registration status
              <input
                name="qualification"
                maxLength={150}
                placeholder="Optional — tell us your current status"
              />
            </label>
          </>
        )}
        <label className="full">
          {kind === "application"
            ? "Your background and goals"
            : "Tell us more"}{" "}
          <span>*</span>
          <textarea
            name="message"
            rows={4}
            required
            minLength={10}
            maxLength={3000}
            placeholder={
              kind === "application"
                ? "What interests you about real estate and joining JMG?"
                : "Tell us about your property, preferences, or questions."
            }
          />
        </label>
      </div>
      <div className="honeypot" aria-hidden="true">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" name="consent" required />
        <span>
          {`I agree that JMG Realty PH may use these details to respond to my ${kind === "application" ? "application inquiry" : "request"}. Read the `}
          <a href="/privacy">privacy notice</a>.
        </span>
      </label>
      {state === "error" && (
        <p className="form-error" role="alert">
          {error} You can also <a href={`mailto:${company.email}`}>email us</a>.
        </p>
      )}
      <button className="button" type="submit" disabled={state === "sending"}>
        {state === "sending"
          ? "Saving your request…"
          : kind === "application"
            ? "Express my interest"
            : "Send my inquiry"}
        <ArrowUpRight size={18} />
      </button>
      <p className="form-note">
        Your request is saved for the JMG team. Office hours: Monday–Saturday,
        8:00 AM–5:00 PM (GMT+8).
      </p>
    </form>
  );
}
export { PropertyCard } from "./property-card";
