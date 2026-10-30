"use client";
import { ArrowUpRight, Bath, BedDouble, CarFront, MapPin, Maximize } from "lucide-react";
import { developments, type Property } from "./content";
import { SaveButton } from "./shortlist";
import PriceNotice from "./price-notice";
import PriceContext from "./price-context";

export function PropertyCard({property:p, headingLevel=3}: {property:Property; headingLevel?:2|3}) {
  const Title = headingLevel === 2 ? "h2" : "h3";
  const dev = developments.find(d=>d.id===p.developmentId);
  const isUnit = p.type === "Condominium";
  return <article className="catalog-card">
    <a className="catalog-card-image" href={`/properties/${p.id}`} aria-label={`View ${p.title} at ${dev?.name || "JMG Realty PH"}`}><img src={p.image} alt={p.imageAlt} loading="lazy" decoding="async" /></a>
    <div className="catalog-card-body">
      <div className="catalog-card-heading"><Title><a href={`/properties/${p.id}`}>{p.title}</a></Title>{dev && <p className="catalog-card-project"><a href={`/developments/${dev.id}`}>{dev.name}</a></p>}<p className="catalog-card-kind">{p.type}</p><p className="catalog-card-location"><MapPin size={14} aria-hidden="true" /><span>{[p.locality, p.city, p.area].filter(Boolean).join(", ")}</span></p></div>
      <div className="catalog-card-pricing"><p className="catalog-card-price">{p.priceText}</p><PriceContext property={p} details /><PriceNotice /></div>
      <ul className="catalog-card-specs">
        {(p.bedroomText || p.bedrooms!=null) && <li><BedDouble size={15} aria-hidden="true" /><span>{p.bedroomText || `${p.bedrooms} ${p.bedrooms===1?"bedroom":"bedrooms"}`}</span></li>}
        {p.bathrooms!=null && <li><Bath size={15} aria-hidden="true" /><span>{p.bathrooms} {p.bathrooms===1?"bath":"baths"}</span></li>}
        {p.floorArea && <li><Maximize size={14} aria-hidden="true" /><span>Floor {p.floorArea}</span></li>}
        {p.lotArea && <li><Maximize size={14} aria-hidden="true" /><span>Lot {p.lotArea}</span></li>}
        {p.carport && <li><CarFront size={15} aria-hidden="true" /><span>{p.carport}</span></li>}
      </ul>
      {p.specificationNote && <details className="catalog-card-notes"><summary>Specification notes</summary><p>{p.specificationNote}</p></details>}
      {p.developmentId === "madonna-residences" && <p className="catalog-card-price-basis">Development entrance illustration</p>}
      <div className="catalog-card-actions"><div className="catalog-card-links"><a className="text-link" href={`/properties/${p.id}`} aria-label={`View ${p.title} at ${dev?.name || "this project"}`}>{isUnit ? "View unit" : "View model"}<ArrowUpRight size={15} /></a><a className="text-link" href={`/developments/${p.developmentId}`} aria-label={`Explore ${dev?.name || "this project"}`}>Explore project<ArrowUpRight size={15} /></a></div><SaveButton property={p} compact /></div>
    </div>
  </article>;
}
