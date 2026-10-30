"use client";
import PriceNotice from "./price-notice";
import PriceContext from "./price-context";

import { useEffect, useRef, useState } from "react";
import {
  ArrowDown,
  ArrowUpRight,
  ArrowRight,
  BedDouble,
  Bath,
  Check,
  Play,
  X,
  MapPin,
  ChevronRight,
} from "lucide-react";
import {
  areas,
  company,
  properties,
  developments,
  propertyTours,
  services,
  type PropertyTour,
} from "./content";
import { SaveButton } from "./shortlist";
import { inspirationImages } from "./listing-inspiration";
import { ArchitecturalLine, MotionImage, SelectionMarker } from "./motion";
import { CountUp, SplitLine } from "./cinema";
import { GoldenHourCanvas } from "./golden-hero";

export function ArchitecturalHero() {
  const [area, setArea] = useState("");
  const [budget, setBudget] = useState("");
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let request = 0;
    const update = () => {
      if (request) return;
      request = requestAnimationFrame(() => {
        request = 0;
        if (!frame.current) return;
        const offset =
          media.matches || window.innerWidth < 931
            ? 0
            : Math.min(window.scrollY, 600) * 0.035;
        frame.current.style.setProperty("--image-offset", `${offset}px`);
      });
    };
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    if (typeof media.addEventListener === "function") media.addEventListener("change", update);
    else media.addListener(update);
    update();
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (typeof media.removeEventListener === "function") media.removeEventListener("change", update);
      else media.removeListener(update);
      cancelAnimationFrame(request);
    };
  }, []);
  return (
    <section className="architectural-hero">
      <div className="hero-grid wrap">
        <div className="architectural-copy">
          <span className="eyebrow">
            <i /> JMG REALTY PH · YOUR TRUSTED PARTNER
          </span>
          <h1 aria-label="Find a place. Build a future." className="jmg-split">
            <span aria-hidden="true"><SplitLine text="Find a place." /></span>
            <em aria-hidden="true"><SplitLine text="Build a future." offset={13} /></em>
          </h1>
          <p>
            Find house models and condominium unit types in the Philippines.
            <br />
            Begin with guidance that puts you first.
          </p>
          <div className="architectural-actions">
            <a href="/properties" className="button cream">
              Browse properties
              <ArrowDown size={18} />
            </a>
            <a href="/contact#send-inquiry" className="quiet-link">
              Ask for guidance
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="hero-signature">
            <span className="signature-rule" />
            BROKERAGE · APPRAISAL · INVESTMENT
          </div>
          <ArchitecturalLine />
        </div>
        <div className="architectural-frame" ref={frame}>
          <div className="frame-image">
            <img
              src={inspirationImages.courtyard.src}
              alt={inspirationImages.courtyard.alt}
              fetchPriority="high"
              width={inspirationImages.courtyard.width}
              height={inspirationImages.courtyard.height}
            />
            <GoldenHourCanvas src={inspirationImages.courtyard.src} />
            <span className="frame-label">NILA RESIDENCES / COURTYARD LIVING</span>
          </div>
          <div className="frame-caption">
            <span>ARCHITECTURAL RENDERING</span>
            <a href={inspirationImages.courtyard.href}>Explore Nila <ArrowUpRight size={12}/></a>
          </div>
        </div>
      </div>
      <form className="hero-discovery wrap" action="/properties">
        <input type="hidden" name="browse" value="models" />
        <div className="discovery-title">
          <span className="eyebrow">BEGIN YOUR SEARCH</span>
          <span>
            Where do you <em>see yourself?</em>
          </span>
        </div>
        <label>
          Preferred location
          <select
            name="area"
            value={area}
            onChange={(e) => setArea(e.target.value)}
          >
            <option value="">Explore all areas</option>
            {[...new Set(properties.map(p => p.area))].sort().map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
        </label>
        <label>
          Property budget
          <select
            name="max"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
          >
            <option value="">Any budget</option>
            {[3,5,10,20,50,100,150,200].map(value => <option key={value} value={value * 1000000}>Up to ₱{value} million</option>)}
          </select>
        </label>
        <button className="button cream" type="submit">
          Find my place
          <ArrowUpRight size={18} />
        </button>
      </form>
      <div className="collection-facts wrap">
        <span>LOCAL KNOWLEDGE. PERSONAL GUIDANCE.</span>
        <span>
          <b><CountUp value={properties.length} /></b> models & unit categories
        </span>
        <span>
          <b><CountUp value={propertyTours.length} /></b> property tours
        </span>
        <span>
          <b><CountUp value={areas.length} /></b> service areas
        </span>
      </div>
    </section>
  );
}

export function EditorialCollection() {
  const models = ["amaresa-alexandria", "lanello-brenda", "nila-premium-3-bedroom", "milan-fairview-one-bedroom"].map(id => properties.find(property => property.id === id)!);
  const [index, setIndex] = useState(0);
  const p = models[index];
  const development = developments.find((d) => d.id === p.developmentId)!;
  return (
    <section className="editorial-collection section wrap" id="collection">
      <div className="editorial-heading">
        <div>
          <span className="eyebrow">01 / THE PROPERTY COLLECTION</span>
          <h2>
            Homes with room
            <br />
            for <em>what comes next.</em>
          </h2>
        </div>
        <div>
          <p>
            Explore house models and condominium unit categories across the collection. Compare the space, location and dated price guides that fit your plans.
          </p>
          <a href="/properties?browse=models" className="text-link">
            Browse all {properties.length} models
            <ArrowUpRight size={18} />
          </a>
        </div>
      </div>
      <div className="editorial-stage" id="showcase-model">
        <div className="editorial-image">
          <a href={`/properties/${p.id}`} aria-label={`Explore ${p.title}`}>
            <MotionImage src={p.image} alt={p.imageAlt} loading="lazy" />
          </a>
          <span className="image-index">
            0{index + 1}
            <span>/ 04</span>
          </span>
          <span className="model-image-label">
            {p.type.toUpperCase()} · IMAGE REFERENCE
          </span>
        </div>
        <div className="editorial-model">
          <div className="model-heading-line">
            <span className="eyebrow">
              <MapPin size={13} />
              {p.city}, {p.area}
            </span>
            <SaveButton property={p} compact />
          </div>
          <div aria-live="polite" aria-atomic="true">
            <h3>{p.title}</h3>
            <p className="model-development"><a href={`/developments/${development.id}`}>{development.name}</a></p>
            <p className="editorial-price">{p.priceText}</p>
            <PriceContext property={p} /><PriceNotice />
            <p className="editorial-description">
              {p.description.split(". ")[0]}.
            </p>
            <dl className="editorial-specs">
              <div>
                <dt>
                  <BedDouble size={17} />
                  Bedrooms
                </dt>
                <dd>{p.bedrooms}</dd>
              </div>
              <div>
                <dt>
                  <Bath size={17} />
                  Bathrooms
                </dt>
                <dd>{p.bathrooms ?? "Ask JMG"}</dd>
              </div>
              <div>
                <dt>Floor area</dt>
                <dd>{p.floorArea}</dd>
              </div>
              <div>
                <dt>{p.lotArea ? "Lot area" : "Property type"}</dt>
                <dd>{p.lotArea || p.type}</dd>
              </div>
            </dl>
          </div>
          <a className="button" href={`/properties/${p.id}`}>
            Explore this home
            <ArrowUpRight size={18} />
          </a>
          <p className="editorial-source">
            {p.imageCaption} Ask JMG about current prices, availability and inclusions.
          </p>
        </div>
      </div>
      <div
        className="model-selector motion-choice-group"
        aria-label="Choose a featured property model"
      >
        {models.map((model, i) => (
          <button
            key={model.id}
            onClick={() => setIndex(i)}
            aria-pressed={i === index}
            aria-controls="showcase-model"
            aria-label={`Show ${model.title} at ${developments.find(d => d.id === model.developmentId)?.name}`}
          >
            <span>0{i + 1}</span>
            <div>
              <strong>{model.title}</strong>
              <small>
                {developments.find(d => d.id === model.developmentId)?.name} · {model.city}
              </small>
            </div>
            <ArrowUpRight size={18} />
          </button>
        ))}
        <SelectionMarker selected={index} />
      </div>
    </section>
  );
}

export function LocationIndex() {
  const [area, setArea] = useState("Bulacan");
  const locations = [...developments, ...propertyTours];
  const cities = [
    ...new Set(locations.filter((l) => l.area === area).map((l) => l.city)),
  ].sort();
  const models = properties.filter((p) => p.area === area);
  const tours = propertyTours.filter((t) => t.area === area);
  return (
    <section className="location-experience" id="locations">
      <div className="wrap section">
        <div className="location-title">
          <span className="eyebrow">03 / A SENSE OF PLACE</span>
          <h2>
            Your location.
            <br />
            <em>Your possibilities.</em>
          </h2>
          <p>
            Eight areas we serve. A closer look at the places in our current
            property collection.
          </p>
        </div>
        <div className="location-master">
          <div className="location-index motion-choice-group" aria-label="Select a service area">
            {areas.map((a, i) => (
              <button
                key={a}
                aria-pressed={area === a}
                aria-controls="location-panel"
                onClick={() => setArea(a)}
              >
                <span>0{i + 1}</span>
                <strong>{a}</strong>
                <ChevronRight size={17} />
              </button>
            ))}
            <SelectionMarker selected={area} />
          </div>
          <div className="location-panel" id="location-panel">
            <span className="location-watermark" aria-hidden="true">
              {area === "Metro Manila"
                ? "MM"
                : area.substring(0, 2).toUpperCase()}
            </span>
            <div className="location-panel-content" aria-live="polite">
              <span className="eyebrow">JMG REALTY PH / LOCATION INDEX</span>
              <h3>{area}</h3>
              {cities.length ? (
                <>
                  <p>
                    {models.length} models & unit categories · {tours.length} property{" "}
                    {tours.length === 1 ? "tour" : "tours"}
                  </p>
                  <div className="location-city-list">
                    {cities.map((city) => {
                      const cityModels = models.filter((m) => m.city === city);
                      const cityTours = tours.filter((t) => t.city === city);
                      const names = [
                        ...new Set(
                          locations
                            .filter((l) => l.area === area && l.city === city)
                            .map((l) => ("name" in l ? l.name : l.development)),
                        ),
                      ];
                      return (
                        <a
                          key={city}
                          href={`/properties?${new URLSearchParams({ area, city })}`}
                        >
                          <div>
                            <strong>{city}</strong>
                            <small>{names.join(" · ")}</small>
                          </div>
                          <span>
                            {cityModels.length
                              ? `${cityModels.length} ${cityModels.length === 1 ? "model" : "models"}`
                              : `${cityTours.length} ${cityTours.length === 1 ? "tour" : "tours"}`}
                            <ArrowUpRight size={17} />
                          </span>
                        </a>
                      );
                    })}
                  </div>
                  <a
                    href={`/properties?area=${encodeURIComponent(area)}`}
                    className="button cream"
                  >
                    Explore {area}
                    <ArrowUpRight size={18} />
                  </a>
                </>
              ) : (
                <>
                  <p>Professional property guidance in {area}.</p>
                  <p className="location-no-models">
                    We haven’t published homes or units for this area yet. Tell us
                    your preferred city, budget and priorities so we can help
                    you explore your options.
                  </p>
                  <a
                    className="button cream"
                    href={`/contact?${new URLSearchParams({ area, service: "Property Matching" })}`}
                  >
                    Find a property in {area}
                    <ArrowUpRight size={18} />
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceGuide() {
  const [index, setIndex] = useState(0);
  const service = services[index];
  return (
    <section className="section wrap service-experience" id="guidance">
      <div className="editorial-heading">
        <div>
          <span className="eyebrow">04 / PEOPLE BEHIND THE PROPERTY</span>
          <h2>
            Good decisions start
            <br />
            with <em>honest guidance.</em>
          </h2>
        </div>
        <div>
          <p>{company.about}</p>
          <a className="text-link" href="/about">
            Meet JMG Realty PH
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
      <div className="service-guide">
        <div className="service-index" aria-label="Choose a service">
          {services.map((s, i) => (
            <button
              key={s.id}
              onClick={() => setIndex(i)}
              aria-pressed={i === index}
              aria-controls="service-panel"
            >
              <span>{s.number}</span>
              {s.name}
              <ArrowRight size={18} />
            </button>
          ))}
        </div>
        <div className="service-panel" id="service-panel">
          <span className="service-large-number" aria-hidden="true">
            {service.number}
          </span>
          <div
            className="service-panel-copy"
            key={service.id}
            aria-live="polite"
          >
            <span className="eyebrow">HOW WE CAN HELP</span>
            <h3>{service.short}</h3>
            <p>{service.detail}</p>
            <ul>
              {service.items.map((item) => (
                <li key={item}>
                  <Check size={16} />
                  {item}
                </li>
              ))}
            </ul>
            <a
              className="button"
              href={
                service.id === "training"
                  ? "/join"
                  : `/contact?${new URLSearchParams({ service: service.name })}`
              }
            >
              Let’s talk about{" "}
              {service.id === "training" ? "your career" : "your plans"}
              <ArrowUpRight size={18} />
            </a>
            <a className="subtle-link" href={`/services#${service.id}`}>
              More about {service.name}
            </a>
          </div>
        </div>
      </div>
      <div className="client-steps">
        {[
          {
            title: "Share your priorities",
            copy: "Tell us your location, budget and the move you have in mind.",
          },
          {
            title: "Explore your options",
            copy: "Discuss suitable properties, valuation or transaction support.",
          },
          {
            title: "Agree the next step",
            copy: "Confirm the details, documents and scope with our team.",
          },
        ].map((step, i) => (
          <div key={step.title}>
            <span>0{i + 1}</span>
            <h3>{step.title}</h3>
            <p>{step.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export function TourPlayer({
  tour,
  compact = false,
}: {
  tour: PropertyTour;
  compact?: boolean;
}) {
  const [active, setActive] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const videoId = new URL(tour.url).searchParams.get("v");
  const validVideoId = !!videoId && /^[A-Za-z0-9_-]{11}$/.test(videoId);
  const development = developments.find((d) => d.id === tour.developmentId);
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
  return (
    <>
      <article className={`tour-experience ${compact ? "compact" : ""}`}>
        <button
          className="tour-poster"
          aria-label={`Play tour: ${tour.title}`}
          onClick={() => {
            setActive(true);
            dialog.current?.showModal();
          }}
        >
          {development && (
            <img
              src={development.image}
              alt={development.imageAlt}
              loading="lazy"
            />
          )}
          <span className="tour-poster-shade" />
          <span className="tour-play">
            <Play size={23} />
          </span>
          <span className="tour-poster-label">
            PROPERTY TOUR / {tour.city.toUpperCase()}
          </span>
        </button>
        <div className="tour-copy">
          <span className="eyebrow">{tour.development}</span>
          <h4>{tour.title}</h4>
          <p>Published {tour.date} · BrokerCel</p>
          <a
            className="text-link"
            href={`/contact?${new URLSearchParams({ area: tour.area, service: "Real Estate Brokerage", property: `${tour.development} in ${tour.city}, ${tour.area}` })}`}
          >
            Ask about this development
            <ArrowUpRight size={16} />
          </a>
        </div>
      </article>
      <dialog
        ref={dialog}
        className="video-dialog"
        aria-label={`${tour.development} property tour`}
        onClose={() => setActive(false)}
        onClick={(e) => {
          if (e.currentTarget === e.target) dialog.current?.close();
        }}
      >
        <div className="video-heading">
          <span>
            {tour.development} · {tour.city}, {tour.area}
          </span>
          <button
            autoFocus
            className="icon-button"
            onClick={() => dialog.current?.close()}
            aria-label="Close property tour"
          >
            <X />
          </button>
        </div>
        {active && validVideoId && (
          <iframe
            title={tour.title}
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
            allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}
        <div className="video-caption">
          <p>{tour.title}</p>
          <a
            href={tour.url}
            target="_blank"
            rel="noreferrer"
            className="text-link"
          >
            Watch on YouTube
            <ArrowUpRight size={16} />
          </a>
        </div>
      </dialog>
    </>
  );
}
