import PriceNotice from "./price-notice";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Shell, PropertyCard } from "./components";
import ModelMedia from "./model-media";
import { nilaAmenities, nilaDevelopment, nilaGallery, nilaImages, nilaMedia, nilaProperties, nilaSource, nilaUnitTypes } from "./nila-data";

export function NilaPriceNote() {
  return <aside className="shore3-price-note">
    <span className="eyebrow">PRICE GUIDE / 23 JUNE 2026</span>
    <p>These indicative ranges group prices by unit type from the dated price guide. They include VAT and exclude transfer and other charges. Prices and terms may change; request a current quotation. Default starting-price search uses the lower end of each range.</p>
  </aside>;
}

const interiors = nilaGallery("nila-project-interiors", "Inside the design.", "Shared project renderings show possible styling for living spaces, bedrooms, a private lift and a bathroom. They do not identify a specific unit type or confirm furniture inclusions.", ["living", "dining-kitchen", "bedroom", "bedroom-alternate", "private-lift", "bathroom"], nilaSource + "/courtyardunits");
const exterior = nilaGallery("nila-exterior-gallery", "A courtyard setting.", "Published architectural perspectives of the entrance, courtyard and landscaped walkways.", ["entrance", "courtyard", "courtyard-overview"]);
const amenities = nilaGallery("nila-amenity-gallery", "Space to slow down.", "Pool and landscaping perspectives from Mont’s marketing material. The amenities listed below are described on the official project website.", ["pool", "poolside"], nilaSource + "/elevated-living");

export default function NilaDevelopment() {
  const d = nilaDevelopment;
  return <Shell className="site-development site-vine site-nila"><div className="wrap development-page">
    <nav className="property-breadcrumb" aria-label="Development breadcrumb">
      <a href="/developments">Developments</a><span>/</span>
      <a href="/properties?area=Metro%20Manila">Metro Manila</a><span>/</span>
      <a href="/properties?area=Metro%20Manila&city=Manila">Manila</a><span>/</span>
      <span>Paco</span><span>/</span><span aria-current="page">Nila Residences</span>
    </nav>
    <header className="development-heading"><div>
      <span className="eyebrow"><MapPin size={14} /> PACO / MANILA / METRO MANILA</span>
      <h1>Nila Residences<em>.</em></h1><p>{d.description}</p>
    </div><div className="glam-hero-actions">
      <a href="#development-models" className="button">Explore the four unit types <ArrowUpRight size={18} /></a>
      <a href={`/request?intent=price&development=${d.id}`} className="text-link">Ask JMG about Nila <ArrowUpRight size={17} /></a>
    </div></header>
    <nav className="shore3-development-nav" aria-label="Explore Nila">
      <a href="#overview">Overview</a><a href="#development-models">Unit types & prices</a><a href="#model-studies">Floor plans</a><a href="#nila-project-interiors">Interiors</a><a href="#amenities">Amenities</a><a href="#nila-location">Location</a><a href="#nila-inquiry">Inquire</a>
    </nav>
    <figure className="development-hero"><img src={d.image} alt={d.imageAlt} width={nilaImages.courtyard.width} height={nilaImages.courtyard.height} fetchPriority="high" /><figcaption>{d.imageCaption}</figcaption></figure>
    <section id="overview" className="development-community"><div>
      <span className="eyebrow">01 / COURTYARD LIVING IN PACO</span>
      <h2>Life across levels.<br /><em>Room to connect.</em></h2>
      <p>Nila’s residences bring generous living spaces and private retreats together around landscaped courtyards. Parking and service areas occupy the lower level, with communal living spaces and bedrooms above.</p>
      <p>Four unit-type guides help you compare the space, layouts and price range. Each reference plan retains the publisher’s original dimensions and labels.</p>
    </div><div><dl className="glam-overview-facts">
      <div><dt>Property type</dt><dd>Condominium</dd></div>
      <div><dt>Developer</dt><dd>The Mont Property Group, Inc.</dd></div>
      <div><dt>Location</dt><dd>M. Guazon Street, Otis, Paco, Manila</dd></div>
      <div><dt>Unit types</dt><dd>4 · three- and four-bedroom residences</dd></div>
      <div><dt>Published price-guide date</dt><dd>23 June 2026</dd></div>
    </dl><a className="text-link" href={nilaSource + "/courtyardunits"} target="_blank" rel="noreferrer">Mont’s official unit overview ↗</a></div></section>

    <section id="development-models" className="glam-section">
      <div className="editorial-heading"><div><span className="eyebrow">02 / FOUR WAYS TO MAKE ROOM</span><h2>Find your<br /><em>kind of home.</em></h2></div><a className="text-link" href="/properties?area=Metro%20Manila&city=Manila&project=nila-residences">Filter this collection <ArrowUpRight size={17} /></a></div>
      <div className="property-grid">{nilaProperties.map(p => <PropertyCard key={p.id} property={p} />)}</div>
      <NilaPriceNote />
      <PriceNotice /><div className="glam-table-scroll" role="region" aria-label="Compare Nila unit types and price ranges" tabIndex={0}><table className="glam-spec-table">
        <caption>Unit-type reference guide · prices dated 23 June 2026</caption>
        <thead><tr><th scope="col">Unit type</th><th scope="col">Developer type overview</th><th scope="col">Original plan area</th><th scope="col">VAT-inclusive price range</th><th scope="col">Parking reference</th></tr></thead>
        <tbody>{nilaUnitTypes.map(unit => <tr key={unit.id}><th scope="row"><a href={`/properties/${unit.id}`}>{unit.title}</a></th><td>{unit.area}</td><td>{unit.planArea}</td><td>{unit.rangeText}</td><td>{unit.parking}</td></tr>)}</tbody>
      </table></div>
      <p className="development-fact-note">Areas and parking can vary by subtype. The Premium 4 type overview and its standard drawing use different areas; Garden parking descriptions also differ. See the matching model guide before requesting a quotation.</p>
    </section>

    <section id="model-studies" className="glam-section">
      <span className="eyebrow">03 / ORIGINAL UNIT-TYPE FLOOR PLANS</span><h2>Look closer.<br /><em>Understand the space.</em></h2>
      <p>Open each type to inspect its four-level drawing. Enlarge, zoom or open the original-resolution image to read room dimensions and layout details.</p>
      <div className="glam-model-studies">{nilaProperties.map(p => <details id={`study-${p.id}`} key={p.id}>
        <summary><span><strong>{p.title}</strong><small>{p.floorArea}</small></span><span className="glam-study-toggle">Explore <span aria-hidden="true">+</span></span></summary>
        <div className="glam-study-content"><p>{p.description}</p>
          <ModelMedia title={p.title} media={{ ...nilaMedia[p.id], interiorImages: [], plansId: `${p.id}-floor-plans` }} />
          <div className="glam-study-actions"><a className="text-link" href={`/properties/${p.id}`}>Full unit guide <ArrowUpRight size={17} /></a><a className="button outline" href={`/request?intent=price&homes=${p.id}`}>Ask about this configuration <ArrowUpRight size={17} /></a></div>
        </div>
      </details>)}</div>
    </section>
    <ModelMedia title="Nila project interiors" media={interiors} />
    <ModelMedia title="Nila exterior perspectives" media={exterior} />

    <section id="amenities" className="glam-section">
      <span className="eyebrow">04 / AMENITIES & SHARED SPACES</span><h2>Life beyond<br /><em>your front door.</em></h2>
      <p>Mont’s official project guide presents leisure spaces and landscaped routes for everyday community life. Ask JMG about delivery, access and operating arrangements.</p>
      <div className="glam-amenity-list">{nilaAmenities.map(name => <div key={name}><Check size={17} /><span>{name}</span></div>)}</div>
      <ModelMedia title="Nila amenities" media={amenities} />
      <a className="text-link" href={nilaSource + "/elevated-living"} target="_blank" rel="noreferrer">Explore the official amenities guide ↗</a>
    </section>
    <section id="nila-location" className="glam-section">
      <span className="eyebrow">05 / METRO MANILA → MANILA → PACO</span><h2>At home<br /><em>in historic Manila.</em></h2>
      <p>M. Guazon Street, Otis, Paco, Manila City. The official project guide describes access through Mendiola Extension and Quirino Avenue. Confirm your route and the entrance before a viewing.</p>
      <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Nila+Residences+M.+Guazon+Paco+Manila" target="_blank" rel="noreferrer">Explore the location in Google Maps ↗</a>
    </section>
    <section id="nila-inquiry" className="development-next-step"><div><span className="eyebrow">YOUR NEXT CONVERSATION</span><h2>Let’s explore<br /><em>what fits.</em></h2><p>Ask JMG for the matching subtype plan, a current quotation and viewing arrangements.</p></div><div><a className="button cream" href={`/request?intent=viewing&development=${d.id}`}>Request a viewing <ArrowUpRight size={18} /></a><a className="text-link" href={`/request?intent=price&development=${d.id}`}>Get current property details <ArrowUpRight size={17} /></a></div></section>
    <p className="development-source">Reviewed 15 October 2026. Project descriptions cross-checked with <a href={nilaSource + "/"} target="_blank" rel="noreferrer">Nila’s official website</a>. Generic layouts and architectural renderings are from Mont’s supplied marketing material. Price ranges use the 23 June 2026 guide and require a current quotation.</p>
  </div></Shell>;
}
