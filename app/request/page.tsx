import { Shell } from "../components";
import { properties, developments, company } from "../content";
import { validModelIds } from "../property-utils";
import { PropertyRequestForm } from "../property-requests";

type Props = {
  searchParams: Promise<{
    intent?: string;
    homes?: string;
    development?: string;
  }>;
};
export const metadata = {
  title: "Request a Viewing or Current Property Details",
  robots: { index: false, follow: true },
};
export default async function RequestPage({ searchParams }: Props) {
  const query = await searchParams;
  const intent = query.intent === "viewing" ? "viewing" : "price";
  const models = validModelIds(query.homes).map(
    (id) => properties.find((p) => p.id === id)!,
  );
  const development = developments.find((d) => d.id === query.development);
  const choices = development
    ? properties.filter((p) => p.developmentId === development.id)
    : properties;
  return (
    <Shell className="site-property-request">
      <header className="request-page-heading wrap">
        <a href="/properties" className="text-link">
          ← The property collection
        </a>
        <span className="eyebrow">JMG REALTY PH / PROPERTY REQUEST</span>
        <h1>
          {intent === "viewing" ? (
            <>
              See it.
              <br />
              <em>Picture your future.</em>
            </>
          ) : (
            <>
              A clearer price.
              <br />
              <em>A confident next step.</em>
            </>
          )}
        </h1>
        <p>
          {intent === "viewing"
            ? "Tell us when you’d like to explore a home. JMG will contact you to confirm the details."
            : "Ask JMG about current prices, available units and what is included."}
        </p>
      </header>
      <div className="request-page-layout wrap">
        <aside className="request-page-aside">
          {models[0] ? (
            <figure>
              <img src={models[0].image} alt={models[0].imageAlt} />
              <figcaption>{models[0].imageCaption}</figcaption>
            </figure>
          ) : development ? (
            <figure>
              <img src={development.image} alt={development.imageAlt} />
              <figcaption>
                {development.imageCaption || (development.id === "shore-3-residences" ? "Shore 3 development marketing illustration from shore3residences.com." : development.id === "north-orchard"
                  ? "Florence model image from BrokerCel."
                  : "Development image from BrokerCel.")}
              </figcaption>
            </figure>
          ) : null}
          <h2>
            {development
              ? development.name
              : "A helpful conversation starts here."}
          </h2>
          <p>
            These are model and unit-category references. JMG will discuss which units,
            finishes and inclusions are currently offered.
          </p>
          <div className="request-office">
            <span className="eyebrow">CONTACT JMG</span>
            <a href={`tel:${company.primaryTel}`}>{company.primaryPhone}</a>
            <p>{company.hours}</p><a href="/contact#contact-people" className="text-link">Viber, WhatsApp & contact people ↗</a>
          </div>
        </aside>
        <PropertyRequestForm
          models={models}
          choices={choices}
          intent={intent}
        />
      </div>
    </Shell>
  );
}
