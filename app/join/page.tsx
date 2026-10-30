import { canonical } from "../site-info";
import { inspirationImages } from "../listing-inspiration";
import { Shell, Reveal, InquiryForm, ArrowDown } from "../components";
export const metadata = { title: "Join Our Team",
  description: "Ask JMG Realty PH about salesperson opportunities, training and mentoring. Share your background and goals with the team.",
  alternates: { canonical: canonical("/join") },
};
export default function Join() {
  return (
    <Shell className="site-recruitment">
      <section className="recruitment-header">
        <div className="wrap">
          <div>
            <span className="eyebrow">JMG REALTY PH / CAREERS</span>
            <h1>
              Bring your ambition.
              <br />
              <em>Explore your future.</em>
            </h1>
            <p>
              For aspiring salespersons and experienced professionals. Connect
              with JMG to explore real estate opportunities, training and
              mentoring.
            </p>
            <a className="button cream" href="#apply">
              Introduce yourself
              <ArrowDown size={18} />
            </a>
          </div>
          <div className="recruitment-frame">
            <img
              src={inspirationImages.exterior.src}
              alt={inspirationImages.exterior.alt}
            />
            <span><a href={inspirationImages.exterior.href}>{inspirationImages.exterior.caption} ↗</a></span>
          </div>
        </div>
      </section>
      <section className="section wrap recruitment-intro">
        <Reveal>
          <span className="eyebrow">BUILD YOUR PATH</span>
          <h2>
            People skills.
            <br />
            Property knowledge.
            <br />
            <em>Room to grow.</em>
          </h2>
          <p>
            Tell us about your background, interests, and the kind of
            opportunity you’re looking for. We’ll discuss the relevant
            requirements and what joining JMG Realty PH could involve.
          </p>
          <a className="text-link" href="#apply">
            Express your interest <ArrowDown size={17} />
          </a>
        </Reveal>
        <Reveal>
          <div className="recruitment-points">
            <article>
              <span>01</span>
              <div>
                <h3>Training & mentoring</h3>
                <p>
                  Guidance for aspiring real estate salespersons and people
                  interested in the industry.
                </p>
              </div>
            </article>
            <article>
              <span>02</span>
              <div>
                <h3>Explore your fit</h3>
                <p>
                  Discuss your experience, goals, qualifications, and
                  opportunities with the JMG team.
                </p>
              </div>
            </article>
            <article>
              <span>03</span>
              <div>
                <h3>Understand the next steps</h3>
                <p>
                  Ask about role requirements, working arrangements,
                  compensation, and support before you proceed.
                </p>
              </div>
            </article>
          </div>
        </Reveal>
      </section>
      <section className="process-section">
        <div className="wrap">
          <span className="eyebrow">THE APPLICATION CONVERSATION</span>
          <h2>
            Every journey
            <br />
            <em>starts somewhere.</em>
          </h2>
          <div className="process-grid">
            {[
              {
                n: "01",
                t: "Introduce yourself",
                p: "Share your contact details, background and what you hope to achieve.",
              },
              {
                n: "02",
                t: "Discuss the opportunity",
                p: "Talk with the team about fit, relevant requirements and available training.",
              },
              {
                n: "03",
                t: "Explore the next step",
                p: "Confirm the details and decide how you’d like to move forward.",
              },
            ].map((p) => (
              <Reveal key={p.n}>
                <span>{p.n}</span>
                <h3>{p.t}</h3>
                <p>{p.p}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section className="section wrap application-layout" id="apply">
        <Reveal>
          <span className="eyebrow">READY FOR A CONVERSATION?</span>
          <h2>
            Your ambition.
            <br />
            <em>A new possibility.</em>
          </h2>
          <p>
            Complete the form to express interest in joining JMG Realty PH. This
            begins a conversation; specific roles and terms will be discussed
            with you.
          </p>
          <img
            src={inspirationImages.livingDining.src}
            alt={inspirationImages.livingDining.alt}
            loading="lazy"
          />
          <a className="listing-photo-caption" href={inspirationImages.livingDining.href}>{inspirationImages.livingDining.caption} ↗</a>
        </Reveal>
        <InquiryForm kind="application" />
      </section>
    </Shell>
  );
}
