import { Shell, Reveal, FAQ, ArrowUpRight } from "./components";
import {
  ArchitecturalHero,
  EditorialCollection,
  LocationIndex,
  ServiceGuide,
} from "./experience";
import { testimonials } from "./content";
import { canonical } from "./site-info";
import { CollectionMarquee, MortgageEstimator, RegionJourney } from "./cinema-sections";

export const metadata = { alternates: {canonical:canonical("/")}, description:"Explore house models and condominium unit categories in Metro Manila, Bulacan, Pampanga and Cavite. Compare property guides and contact Broker Cel or Home Empire PH at JMG Realty PH." };

export default function Home() {
  return (
    <Shell className="site-home">
      <ArchitecturalHero />
      <CollectionMarquee />
      <EditorialCollection />
      <RegionJourney />
      <LocationIndex />
      <ServiceGuide />
      <MortgageEstimator />
      <section className="career-invitation" id="careers">
        <div className="wrap">
          <Reveal className="career-invitation-heading">
            <span className="eyebrow">06 / YOUR FUTURE WITH JMG</span>
            <div className="career-heading-row">
              <h2>
                Your ambition.
                <br />
                <em>A place to grow.</em>
              </h2>
              <span className="career-monogram" aria-hidden="true">
                JMG<span>CAREERS</span>
              </span>
            </div>
            <p>
              Good with people? Curious about property?
              <br />
              Let’s explore your future in real estate.
            </p>
          </Reveal>
          <div className="career-entry-paths">
            <a href="/join">
              <span>01 / START YOUR PATH</span>
              <h3>Aspiring salesperson</h3>
              <p>Explore the industry, training and mentoring.</p>
              <ArrowUpRight size={25} />
            </a>
            <a href="/join">
              <span>02 / TAKE YOUR NEXT STEP</span>
              <h3>Experienced professional</h3>
              <p>Talk about your background, goals and fit.</p>
              <ArrowUpRight size={25} />
            </a>
          </div>
          <div className="career-invitation-bottom">
            <p>
              Introduce yourself. Discuss the opportunity.
              <br />
              Decide your next step with the team.
            </p>
            <a href="/join#apply" className="button cream">
              Let’s start a conversation
              <ArrowUpRight size={19} />
            </a>
          </div>
        </div>
      </section>
      {testimonials.length > 0 && (
        <section className="section wrap testimonials">
          <span className="eyebrow">CLIENT EXPERIENCES</span>
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
      <section className="section wrap closing-questions">
        <Reveal>
          <span className="eyebrow">07 / A LITTLE CLARITY</span>
          <h2>
            Before your
            <br />
            <em>next move.</em>
          </h2>
          <p>Clear answers. A helpful starting point.</p>
          <a className="text-link" href="/faq">
            All questions
            <ArrowUpRight size={17} />
          </a>
        </Reveal>
        <FAQ limit={3} />
      </section>
    </Shell>
  );
}
