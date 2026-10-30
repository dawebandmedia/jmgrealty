import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import records from "./urban-deca-assets.json";

export const urbanDecaSource = "https://www.decahomes.com.ph/urban-deca-homes-manila.html";
export const urbanDecaImages = records as Record<string, OfficialModelImage>;
export const urbanDecaAmenities = ["Swimming pool", "Covered basketball court", "Children’s playground", "Pocket parks", "Multipurpose / function hall", "Community mall", "Gated entrance and guardhouse"];
export const urbanDecaDevelopment: Development = {
  id: "urban-deca-homes-manila", name: "Urban Deca Homes Manila", area: "Metro Manila", city: "Manila", locality: "Tondo", type: "Condominium",
  image: urbanDecaImages["web-hero"].displaySrc!, imageAlt: "Urban Deca Homes Manila buildings in an undated public marketing photograph",
  imageCaption: "Undated marketing photograph from the supplied reference website. The promotion’s readiness wording does not confirm current unit availability or turnover.",
  description: "A Deca Homes condominium community on Vitas Street, Tondo, Manila. Compare six supplied unit types, from a 22.95 sqm studio to a 45.90 sqm two-bedroom layout, with original photo flyers, published unit plans where located and clearly dated sample price references.",
  amenities: urbanDecaAmenities, sourceUrl: urbanDecaSource, sourceName: "Supplied project materials / decahomes.com.ph reference",
};
export const urbanDecaSpecs = [
  { key: "studio", title: "Studio", floor: "22.95 sqm", bedrooms: 0, bathrooms: 1, flyer: "U072", plan: "web-studio-plan", min: null, max: null, sample: undefined },
  { key: "1-bedroom", title: "1 Bedroom", floor: "27.42 sqm", bedrooms: 1, bathrooms: 1, flyer: "U071", plan: "web-1br-plan", min: null, max: null, sample: undefined },
  { key: "2-bedroom-a", title: "2 Bedroom A", floor: "32.17 sqm", bedrooms: 2, bathrooms: 1, flyer: "U073", plan: "web-2br-a-plan", min: 2980000, max: 3214000, sample: "U066" },
  { key: "2-bedroom-b", title: "2 Bedroom B", floor: "30.60 sqm", bedrooms: 2, bathrooms: 1, flyer: "U075", plan: "web-2br-b-plan", min: 2382000, max: 3049000, sample: "U063" },
  { key: "2-bedroom-c", title: "2 Bedroom C", floor: "45.90 sqm", bedrooms: 2, bathrooms: undefined, flyer: "U074", plan: undefined, min: 3199000, max: 3199000, sample: "U035" },
  { key: "2-bedroom-d", title: "2 Bedroom D", floor: "34.42 sqm", bedrooms: 2, bathrooms: undefined, flyer: "U070", plan: undefined, min: 2800000, max: 2800000, sample: "U047" },
];
export const urbanDecaProperties: Property[] = urbanDecaSpecs.map(m => ({
  id: "urban-deca-manila-" + m.key, title: m.title, developmentId: urbanDecaDevelopment.id, area: "Metro Manila", city: "Manila", locality: "Tondo", type: "Condominium",
  bedrooms: m.bedrooms, bedroomText: m.bedrooms === 0 ? "Studio" : undefined, bathrooms: m.bathrooms, floorArea: m.floor,
  price: m.min, priceText: m.min === null ? "Price on inquiry" : m.min === m.max ? "₱" + m.min.toLocaleString("en-PH") : `₱${m.min / 1e6}M–₱${m.max! / 1e6}M`,
  priceLabel: m.min === null ? "Current quotation needed" : "Historical sample obligation", priceDate: m.min === null ? undefined : "Feb–Jun 2026",
  priceNote: m.min === null ? "No matching price computation was supplied for this unit type. Request a current quotation, charges and written inclusions." : "Historical total outstanding obligation before sample discounts. Figures vary by building, floor zone and position; they are not current TCP quotations. Some supplied reservation terms have expired. Confirm current price, eligibility, fees and financing in writing. Parking is separate.",
  specificationNote: (m.plan ? "The published unit drawing shows one toilet and bath. Confirm the exact building and layout." : "A matching internal unit plan and bathroom count were not located. Request the exact original plan; another unit type’s plan is not substituted.") + " Photo flyers advertise a standard AC while the reference website describes AC provision. Confirm appliances and turnover finishes in writing.",
  image: urbanDecaImages[m.flyer].displaySrc!, imageAlt: m.title + " original supplied photo flyer with " + m.floor + " label",
  imageCaption: "Original supplied ANAYA Realty Services photo flyer. Watermarks and specification text are preserved; confirm current turnover inclusions and the exact unit.", gallery: [urbanDecaImages[m.flyer].displaySrc!],
  description: `${m.title} is a ${m.floor} condominium reference at Urban Deca Homes Manila, Vitas Street, Tondo. ${m.bedrooms === 0 ? "Its studio layout combines living and sleeping space with a kitchen and a separate toilet and bath." : `The supplied photo flyer identifies ${m.bedrooms} ${m.bedrooms === 1 ? "bedroom" : "bedrooms"}, with living and kitchen spaces.`} ${m.plan ? "Inspect the original published unit layout alongside the supplied photo flyer." : "The supplied flyer and dated price samples identify this type; ask JMG for its matching internal unit plan before making layout decisions."}`,
  features: [m.floor + " published unit area", m.bedrooms === 0 ? "Studio layout" : m.bedrooms + " bedrooms", "Original supplied photo flyer", "Kitchen with base cabinet in supplied imagery", "Parking quoted separately"], amenities: urbanDecaAmenities,
  sourceUrl: urbanDecaSource, sourceName: "Supplied ANAYA photo / buyer references and decahomes.com.ph unit plans", sourceLocation: "Vitas Street, Tondo, Manila, Metro Manila", locationNote: "Vitas Street, Tondo, Manila. Confirm the entrance and your route before a viewing; reference distances are publisher estimates.", importedAt: "2026-10-16",
}));
export const urbanDecaMedia: Record<string, OfficialModelMedia> = Object.fromEntries(urbanDecaSpecs.map(m => ["urban-deca-manila-" + m.key, {
  modelId: "urban-deca-manila-" + m.key, sourceUrl: urbanDecaSource, publisher: "decahomes.com.ph / supplied project materials", interiorImages: [], floorPlans: m.plan ? [urbanDecaImages[m.plan]] : [],
  floorPlanDescription: "The original named unit layout includes its internal arrangement, source dimensions and typical building key plan. Confirm applicability to the exact building and offered unit.",
  floorPlanSourceNote: "Original published unit-layout image from the supplied reference website, preserved without cropping or redrawing. This is a generic layout, not an availability chart.", limitations: [],
} as OfficialModelMedia]));
export function urbanDecaGallery(id: string, heading: string, description: string, keys: string[], noun = "references"): OfficialModelMedia {
  return { modelId: id, galleryId: id, sourceUrl: urbanDecaSource, publisher: "Supplied project materials / decahomes.com.ph", imageNoun: noun, galleryEyebrow: "URBAN DECA MANILA / SUPPLIED REFERENCES", galleryHeading: heading, galleryDescription: description, gallerySourceNote: "Supplied source material; original captions and watermarks retained", galleryDisclaimer: "Reference material does not establish current unit availability, promotion eligibility, finishes or facility access. Confirm current details with JMG.", interiorImages: keys.map(k => urbanDecaImages[k]), floorPlans: [], limitations: [] };
}
