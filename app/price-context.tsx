import type { Property } from "./content";
import { priceStatus, referenceStatus } from "./listing-status";

export default function PriceContext({ property, details = false }: { property: Property; details?: boolean }) {
  const status = priceStatus(property), reference = referenceStatus(property);
  return <div className="price-context"><span className={`price-status ${status.label === "Expired sample" ? "is-expired" : ""}`}>{status.label}</span><span className="price-source-date">{status.dateLabel}</span>{details && <span className="price-basis-detail">{status.basis}</span>}{reference && <span className="listing-reference">{reference}</span>}</div>;
}
