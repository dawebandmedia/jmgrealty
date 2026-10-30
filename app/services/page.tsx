import { canonical } from "../site-info";
import { inspirationImages } from "../listing-inspiration";
import { Shell, PageHero, Reveal, Action, ArrowUpRight } from "../components";
import { services } from "../content";
export const metadata = { title: "Our Services",
  description: "Explore JMG Realty PH brokerage, property matching, marketing, documentation assistance, appraisal inquiries and training services.",
  alternates: { canonical: canonical("/services") },
};
export default function Services() {
  return (
    <Shell>
      <PageHero
        eyebrow="EXPERTISE FOR EVERY STEP"
        title="Your goals."
        italic="Our guidance."
        description="Real estate brokerage, property appraisal, marketing, documentation, matching, and mentoring — with your next move in mind."
        image={inspirationImages.highCeiling.src}
        imageAlt={inspirationImages.highCeiling.alt}
        imageCaption={inspirationImages.highCeiling.caption}
        imageHref={inspirationImages.highCeiling.href}
      />
      <section className="section wrap">
        <nav className="service-jump" aria-label="Services">
          {services.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.name}
              <ArrowUpRight size={15} />
            </a>
          ))}
        </nav>
        {services.map((s) => (
          <Reveal key={s.id} className="service-detail">
            <article id={s.id}>
              <span className="service-number">{s.number}</span>
              <div>
                <span className="eyebrow">{s.name}</span>
                <h2>{s.short}</h2>
                <p className="large-copy">{s.description}</p>
                <p>{s.detail}</p>
                <Action
                  href={
                    s.id === "training"
                      ? "/join"
                      : `/contact?service=${encodeURIComponent(s.name)}`
                  }
                >
                  {s.id === "training"
                    ? "Explore joining JMG"
                    : "Inquire about this service"}
                </Action>
              </div>
              <ul>
                {s.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </Reveal>
        ))}
      </section>
      <section className="process-section">
        <div className="wrap">
          <span className="eyebrow">HOW WE HELP</span>
          <h2>
            Your next move,
            <br />
            <em>one step at a time.</em>
          </h2>
          <div className="process-grid">
            {[
              {
                n: "01",
                t: "Share your goals",
                p: "Tell us about your property, preferred location, budget, or the support you need.",
              },
              {
                n: "02",
                t: "Understand your options",
                p: "Discuss suitable services, the information required, and the steps relevant to your plans.",
              },
              {
                n: "03",
                t: "Move forward with guidance",
                p: "Confirm the details and proceed with professional support throughout the process.",
              },
            ].map((step) => (
              <Reveal key={step.n}>
                <span>{step.n}</span>
                <h3>{step.t}</h3>
                <p>{step.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </Shell>
  );
}
