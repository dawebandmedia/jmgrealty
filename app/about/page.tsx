import { canonical } from "../site-info";
import { inspirationImages } from "../listing-inspiration";
import { Shell, PageHero, Reveal, Action } from "../components";
import { company, testimonials } from "../content";
import ContactPeople from "../contact-people";
export const metadata = { title: "About JMG",
  description: "Meet Broker Cel and Home Empire PH, the people behind JMG Realty PH. Explore our approach to property guidance and contact the team directly.",
  alternates: { canonical: canonical("/about") },
};
export default function About() {
  return (
    <Shell>
      <PageHero
        eyebrow="MEET JMG REALTY PH"
        title="Professional guidance."
        italic="A personal approach."
        description={company.tagline}
        image={inspirationImages.livingDining.src}
        imageAlt={inspirationImages.livingDining.alt}
        imageCaption={inspirationImages.livingDining.caption}
        imageHref={inspirationImages.livingDining.href}
      />
      <section className="section wrap intro">
        <Reveal>
          <span className="eyebrow">OUR COMPANY</span>
          <h2>
            Real estate is personal.
            <br />
            <em>So is our service.</em>
          </h2>
          <div className="company-brand">
            <img src="/brand/full-display.webp" alt="JMG Realty PH — Building dreams. Securing homes." width={1488} height={800} loading="lazy" />
          </div>
        </Reveal>
        <Reveal className="intro-copy">
          <p>{company.about}</p>
          <p>
            Our approach starts with understanding your goals, explaining the
            options, and helping you move through the process with clarity.
          </p>
          <Action href="/contact">Connect with JMG</Action>
        </Reveal>
      </section>
      <section className="values-section">
        <div className="wrap">
          <span className="eyebrow">THE WAY WE WORK</span>
          <h2>
            Trust begins
            <br />
            <em>with the details.</em>
          </h2>
          <div className="values-grid">
            {[
              {
                n: "01",
                t: "Honest guidance",
                p: "Straightforward conversations about your goals, options and next steps.",
              },
              {
                n: "02",
                t: "Reliable support",
                p: "Professional assistance throughout the buying, selling and appraisal process.",
              },
              {
                n: "03",
                t: "You at the center",
                p: "Guidance shaped around your preferences, needs and property priorities.",
              },
            ].map((v) => (
              <Reveal key={v.n}>
                <span className="eyebrow">{v.n}</span>
                <h3>{v.t}</h3>
                <p>{v.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap" id="our-team"><span className="eyebrow">THE PEOPLE BEHIND JMG</span><h2>A familiar name.<br/><em>A direct conversation.</em></h2><p className="team-intro">Speak with Broker Cel or Home Empire PH about your property plans.</p><ContactPeople expandedCredentials /></section>
      {testimonials.length > 0 && (
        <section className="section wrap testimonials">
          <h2>Client experiences.</h2>
          {testimonials.map((t) => (
            <blockquote key={t.name}>
              <p>“{t.quote}”</p>
              <cite>
                {t.name} · {t.context}
              </cite>
            </blockquote>
          ))}
        </section>
      )}
      <section className="section wrap split-cta">
        <div>
          <span className="eyebrow">GROW WITH JMG</span>
          <h2>
            Make your next chapter
            <br />
            <em>a career in real estate.</em>
          </h2>
        </div>
        <Action href="/join">Explore joining our team</Action>
      </section>
    </Shell>
  );
}

