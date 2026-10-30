import { Check } from "lucide-react";
import ModelMedia from "./model-media";
import { shore3AmenityGroups, shore3PriceDate, shore3Source } from "./shore3-data";
import records from "./shore3-media-data.json";
import developmentMedia from "./shore3-development-media.json";
import type { OfficialModelMedia } from "./amaresa-media";

export const shore3Media = records as Record<string, OfficialModelMedia>;

export function Shore3Amenities() {
  return (
    <section className="shore3-amenities" id="amenities">
      <header>
        <span className="eyebrow">SHORE 3 RESIDENCES / AMENITIES</span>
        <h2>Room for <em>more.</em></h2>
        <p>Explore the facilities listed by the reference website. JMG can confirm which amenities are operational, their access arrangements and any fees.</p>
      </header>
      <div className="shore3-amenity-groups">
        {shore3AmenityGroups.map((group, index) => (
          <article key={group.name}>
            <span className="eyebrow">0{index + 1}</span>
            <h3>{group.name}</h3>
            <ul>{group.items.map((item) => <li key={item}><Check size={17} /><span>{item}</span></li>)}</ul>
          </article>
        ))}
      </div>
      <p className="shore3-source-note">Published amenities · <a href={`${shore3Source}/amenities/`} target="_blank" rel="noreferrer">Source amenities page ↗</a>. Dedicated parking is a development feature; a parking slot is not assumed to be included with a listed unit.</p>
      <ModelMedia title="Shore 3 amenities" media={developmentMedia.amenities as OfficialModelMedia} />
    </section>
  );
}

export function Shore3ShowUnit() {
  return <div className="shore3-show-unit"><ModelMedia title="Shore 3 show unit" media={developmentMedia.showUnit as OfficialModelMedia} /></div>;
}

export function Shore3PriceNote() {
  return (
    <div className="shore3-price-note">
      <span className="eyebrow">PUBLISHED PRICE SNAPSHOT / {shore3PriceDate.toUpperCase()}</span>
      <p>Prices in this collection are the source’s list prices. Its payment examples apply different discounts, VAT and other charges, so the list price is not the final amount payable.</p>
      <a href={`${shore3Source}/prices-and-computations/`} className="text-link" target="_blank" rel="noreferrer">View source prices and payment examples ↗</a>
      <p>Ask JMG for current prices, applicable promotions, available units and payment terms.</p>
    </div>
  );
}
