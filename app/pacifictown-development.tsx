import PriceNotice from "./price-notice";
import { ArrowUpRight, Check, MapPin } from "lucide-react";
import { Shell, PropertyCard } from "./components";
import ModelMedia from "./model-media";
import {
  pacifictownDevelopment,
  pacifictownEnclaveSource,
  pacifictownFlyerClaims,
  pacifictownImages,
  pacifictownModels,
  pacifictownProperties,
  pacifictownRelatedAmenities,
  pacifictownRelatedEnclaveMedia,
  pacifictownRelatedTownhouseMedia,
  pacifictownSource,
  pacifictownTownhouseSource,
} from "./pacifictown-data";
import "./pacifictown.css";

export default function PacifictownDevelopment() {
  const flyer = pacifictownImages.flyer;
  return (
    <Shell className="site-development site-vine site-pacifictown">
      <div className="wrap development-page">
        <nav className="property-breadcrumb" aria-label="Development breadcrumb">
          <a href="/developments">Developments</a><span>/</span>
          <a href="/properties?area=Cavite">Cavite</a><span>/</span>
          <a href="/properties?area=Cavite&city=Naic">Naic</a><span>/</span>
          <span aria-current="page">Pacifictown Naic 5</span>
        </nav>
        <header className="development-heading">
          <div>
            <span className="eyebrow"><MapPin size={14} /> NAIC / CAVITE</span>
            <h1>Pacifictown <span className="pacifictown-phase-title">Naic 5<em>.</em></span></h1>
            <p>{pacifictownDevelopment.description}</p>
          </div>
          <div className="glam-hero-actions">
            <a className="button" href="#development-models">Compare 3 home types<ArrowUpRight size={18}/></a>
            <a className="text-link" href={`/request?intent=price&development=${pacifictownDevelopment.id}`}>Ask about current prices<ArrowUpRight size={17}/></a>
          </div>
        </header>
        <nav className="shore3-development-nav" aria-label="Explore Pacifictown Naic 5">
          <a href="#overview">Overview</a><a href="#development-models">Models & prices</a>
          <a href="#amenities">Amenities</a><a href="#advertised-claims">Flyer details</a><a href="#related-images">Images & plan references</a>
          <a href="#naic-location">Location & sources</a><a href="#naic-inquiry">Inquire</a>
        </nav>
        <figure className="development-hero pacifictown-hero">
          <a href={flyer.src} target="_blank" rel="noreferrer" aria-label="Open the full supplied Pacifictown Naic 5 flyer">
            <img src={flyer.src} alt={flyer.label} width={flyer.width} height={flyer.height} fetchPriority="high"/>
          </a>
          <figcaption>{pacifictownDevelopment.imageCaption} <a href={flyer.src} target="_blank" rel="noreferrer">Open original flyer ↗</a></figcaption>
        </figure>
        <section id="overview" className="development-community pacifictown-overview">
          <div>
            <span className="eyebrow">01 / THE PROJECT</span>
            <h2>Three ways<br/><em>to start.</em></h2>
            <p>The supplied flyer names Naic, Cavite and presents three pre-selling house options. It is undated, and it does not give the exact barangay, street address, bedroom counts, bath counts or model floor plans.</p>
          </div>
          <dl className="glam-overview-facts">
            <div><dt>Developer name on official website</dt><dd>Pacifictown Property Ventures Inc.</dd></div>
            <div><dt>Advertised location</dt><dd>Naic, Cavite</dd></div>
            <div><dt>Reservation fee on flyer</dt><dd>₱5,000 · confirm current terms</dd></div>
            <div><dt>Price reference</dt><dd>Undated supplied flyer</dd></div>
          </dl>
        </section>
        <section id="development-models" className="glam-section">
          <div className="editorial-heading"><div><span className="eyebrow">02 / MODELS & FLYER PRICES</span><h2>Find your<br/><em>ideal home type.</em></h2></div><a className="text-link" href="/properties?area=Cavite&city=Naic">Browse Naic homes<ArrowUpRight size={17}/></a></div>
          <div className="property-grid">
            {pacifictownProperties.map((property) => <PropertyCard key={property.id} property={property}/>) }
          </div>
          <PriceNotice/>
          <p className="pacifictown-price-note">These are the amounts printed on an undated marketing flyer, not current written quotations or guaranteed total contract prices. Request a matching lot, current TCP, fees, financing terms and availability from JMG.</p>
          <div className="glam-table-scroll" role="region" aria-label="Pacifictown Naic 5 model comparison" tabIndex={0}>
            <table className="glam-spec-table"><caption>Model facts transcribed from the supplied flyer</caption><thead><tr><th scope="col">Advertised type</th><th scope="col">Flyer price</th><th scope="col">Lot area</th><th scope="col">Floor area</th><th scope="col">Bedrooms / baths</th></tr></thead><tbody>
              {pacifictownModels.map((model) => <tr key={model.id}><th scope="row"><a href={`/properties/${model.id}`}>{model.title}</a></th><td>{model.priceText} · undated flyer</td><td>{model.lot} sqm</td><td>{model.floor} sqm</td><td>Not specified in flyer</td></tr>)}
            </tbody></table>
          </div>
          <p className="development-fact-note">All dimensions and prices above are transcribed from the supplied Naic 5 flyer. The provided details do not state bedrooms, bathrooms, exact interior layout or turnover inclusions.</p>
        </section>
        <section id="advertised-claims" className="glam-section pacifictown-claims">
          <span className="eyebrow">03 / WHAT THE FLYER SAYS</span><h2>Claims to<br/><em>verify.</em></h2>
          <p>The promotional material displays the following selling points. They are presented as advertising claims, not independent site inspections or financing approval.</p>
          <div className="glam-amenity-list">{pacifictownFlyerClaims.map((claim) => <div key={claim}><Check size={17}/><span>{claim}</span></div>)}</div>
        </section>
        <section id="amenities" className="glam-section">
          <span className="eyebrow">COMMUNITY AMENITIES / CONFIRM PHASE 5 DETAILS</span><h2>The community<br/><em>around your home.</em></h2>
          <p>The Naic 5 flyer does not provide an amenity list or amenity photographs. Ask JMG for the current phase-specific facilities and access details.</p>
          <aside className="glam-discrepancy"><strong>Related Naic facilities</strong><p>Separate Pacifictown Naic listings mention a basketball court, clubhouse, playground and landscaped parks; those facilities are not confirmed here as Naic 5 amenities.</p></aside>
          <div className="pacifictown-related-amenities"><span className="eyebrow">RELATED LISTING REFERENCES · NOT VERIFIED FOR PHASE 5</span><div>{pacifictownRelatedAmenities.map((item) => <span key={item}>{item}</span>)}</div><a className="text-link" href={pacifictownTownhouseSource} target="_blank" rel="noreferrer">Related townhouse listing amenity reference ↗</a></div>
        </section>
        <section id="related-images" className="glam-section">
          <span className="eyebrow">04 / RELATED NAIC VISUALS</span><h2>Compare the<br/><em>published references.</em></h2>
          <p>These galleries come from secondary Naic listings for Pacifictown homes. They provide nearby design context only; neither source identifies its photographs as Naic 5 Phase 5. Use the model thumbnails above as the direct Naic 5 flyer references.</p>
          <ModelMedia title="Related Pacifictown Naic townhouse listing" media={pacifictownRelatedTownhouseMedia}/>
          <ModelMedia title="Related Pacifictown Enclave listing" media={pacifictownRelatedEnclaveMedia}/>
          <aside className="glam-discrepancy"><strong>Floor plan reference is not confirmed for Naic 5</strong><p>The Single Attached detail page includes one plan from the separate Pacifictown Enclave listing. That listing labels it 54 sqm lot and 52.72 sqm floor area; the supplied Naic 5 flyer rounds its Single Attached floor area to 53 sqm. Similar dimensions do not verify the drawing’s phase or applicability.</p><a className="text-link" href={`/properties/pacifictown-naic-5-single-attached#floor-plans`}>Open the related plan reference<ArrowUpRight size={17}/></a></aside>
        </section>
        <section id="naic-location" className="glam-section pacifictown-location">
          <span className="eyebrow">05 / LOCATION & SOURCE CHECK</span><h2>Naic,<br/><em>Cavite.</em></h2>
          <p>The flyer identifies Naic, Cavite. No Phase 5 barangay, street address or exact map pin was established from the official project materials reviewed. Confirm the development entrance and current site status before traveling.</p>
          <div className="pacifictown-source-links">
            <a className="text-link" href="https://www.google.com/maps/search/?api=1&query=Pacifictown+Naic+5%2C+Naic%2C+Cavite" target="_blank" rel="noreferrer">Search map for Pacifictown Naic 5 ↗</a>
            <a className="text-link" href={pacifictownSource} target="_blank" rel="noreferrer">Pacifictown Property Ventures Inc. website ↗</a>
            <a className="text-link" href={pacifictownTownhouseSource} target="_blank" rel="noreferrer">Related townhouse listing ↗</a>
            <a className="text-link" href={pacifictownEnclaveSource} target="_blank" rel="noreferrer">Related Pacifictown Enclave listing ↗</a>
            <a className="text-link" href="https://www.sbnaic.com/resolutions?page=5" target="_blank" rel="noreferrer">Naic municipal resolutions ↗</a>
          </div>
          <p className="pacifictown-source-caveat">The PPVI public site currently shows “Coming Soon” and has no Naic 5 detail page. The municipal resolution located during research names Naic Prime / Pacifictown Naic Phase 4; it is not treated as Phase 5 confirmation.</p>
        </section>
        <section id="naic-inquiry" className="development-next-step">
          <div><span className="eyebrow">YOUR NEXT CONVERSATION</span><h2>Confirm what<br/><em>is available.</em></h2><p>Ask for the current quotation, exact project address, model plan and financing terms for the specific lot.</p></div>
          <div><a className="button cream" href={`/request?intent=price&development=${pacifictownDevelopment.id}`}>Request current details<ArrowUpRight size={18}/></a><a className="text-link" href={`/request?intent=viewing&development=${pacifictownDevelopment.id}`}>Ask about a viewing<ArrowUpRight size={17}/></a></div>
        </section>
        <p className="development-source">Research reviewed 15 October 2026. Model prices, areas, ₱5,000 reservation fee and flyer claims are copied from the user-supplied, undated Naic 5 flyer. Third-party photos and one plan are from related Pacifictown Naic listings and are explicitly marked as unverified for Phase 5. No Phase 5 floor plans or amenity photos were found in the public sources reviewed.</p>
      </div>
    </Shell>
  );
}

