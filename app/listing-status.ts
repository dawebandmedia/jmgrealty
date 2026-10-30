import type { Property } from "./content";

export function priceStatus(p: Property) {
  const basis = p.priceLabel || (p.price === null ? "Request a current quotation" : "Published model price");
  const sourceDate = p.developmentId === "shore-3-residences" ? "24 Oct 2025" : p.priceDate?.startsWith("Checked") ? "" : p.priceDate || "";
  const label = /expired/i.test(basis) ? "Expired sample" : p.developmentId === "lanello-heights" ? "JMG guide" : p.price === null && !/advertised guide/i.test(basis) ? "Price on inquiry" : sourceDate ? "Historical guide" : "Undated guide";
  return { label, basis, sourceDate, dateLabel: sourceDate ? `Source: ${sourceDate}` : p.price === null && !/advertised guide/i.test(basis) ? "Current quotation needed" : "Price effective date not supplied" };
}

export function referenceStatus(p: Property): string | null {
  if (p.id === "plaridel-brisa-modern-minimalist") return "Concept reference · specifications on request";
  if (p.id.startsWith("plaridel-brisa-")) return "Series reference · facade quotation needed";
  if (p.id === "plaridel-dogwood") return "Sample package · matching plan needed";
  if (p.developmentId === "uhome-leon-guinto") return "Category reference · exact details on request";
  if (/source conflict/i.test(p.floorArea || "") || p.id === "nila-premium-4-bedroom") return "Area conflict · matching plan needed";
  return null;
}

export function listingShareDescription(p: Property) {
  const status = priceStatus(p);
  return `${p.priceText} · ${status.label}${status.sourceDate ? ` (${status.sourceDate})` : ""}. Current price and availability require confirmation. ${p.description}`;
}

export function propertyCategory(p: Property) {
  return p.type === "Condominium" ? "Condominium" : ["House & Lot", "Townhouse", "Single Attached", "Single Detached", "Duplex", "Socialized Housing"].includes(p.type) ? "House & Lot" : p.type;
}
