import type { Development, Property } from "./content";
import assets from "./glam-assets.json";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";

export const glamSource = "https://glamresidences.com";
export const glamDeveloperSource = "https://smdc.com/properties/glam-residences/";
export const glamImages = assets.images as Record<string, OfficialModelImage>;
export const glamAmenities = ["Lap Pool", "Kiddie Pool", "Fitness Gym", "Lounge Area", "Function Room", "Commercial Strip", "Kid’s Play Area", "Pool Deck", "Grand Lobby", "Sky Lounge", "Jacuzzi", "Landscaped Gardens"];
export const glamDevelopment: Development = {
  id: "glam-residences", name: "Glam Residences", area: "Metro Manila", city: "Quezon City", locality: "EDSA / South Triangle",
  type: "Condominium", image: glamImages["official-2"].displaySrc!, imageAlt: "Glam Residences facade rendering published by SMDC",
  imageCaption: "Development facade rendering from SMDC; artistic presentation, not a photograph of current construction.",
  description: "An SMDC condominium along EDSA in Quezon City’s South Triangle, with one- and two-bedroom configurations, shared leisure spaces and access to the GMA-Kamuning MRT corridor.",
  amenities: glamAmenities, sourceUrl: glamSource + "/", sourceName: "SMDC / glamresidences.com",
};

const common = {
  area: "Metro Manila", city: "Quezon City", locality: "EDSA / South Triangle", developmentId: glamDevelopment.id, type: "Condominium",
  sourceName: "glamresidences.com", amenities: glamAmenities, importedAt: "2026-10-13", sourceLocation: "EDSA, South Triangle, Quezon City",
  locationNote: "Published location: EDSA, South Triangle, Quezon City. Confirm the specific floor, orientation and available unit with JMG.",
  priceLabel: "Published list price", priceDate: "8 Oct 2025",
  priceNote: "Source computation dated 8 October 2025. List price is a historical example; discounts, VAT, other charges, payment terms and current availability require confirmation.",
};
export const glamProperties: Property[] = [
  { ...common, id: "glam-1-bedroom", title: "1 Bedroom", bedrooms: 1, bathrooms: 1, price: 5770000, priceText: "₱5,770,000", floorArea: "Approx. 23.72 sqm",
    image: glamImages["556"].displaySrc!, imageAlt: "Glam one-bedroom unit marketing illustration", imageCaption: "Source unit illustration; furniture, decor and finishes are illustrative. Current unit inclusions require confirmation.", gallery: [glamImages["556"].src],
    description: "The one-bedroom source example lists 23.72 sqm. Its drawing labels a bedroom and toilet and bath, with open living, dining and kitchen space. The plan prints an approximate area; the furnished illustration is a design reference rather than an available-unit photograph.",
    features: ["1 Bedroom", "Drawing labels approximately 23.72 sqm", "Bedroom and toilet & bath on the source drawing"], sourceUrl: glamSource + "/1-bedroom/" },
  { ...common, id: "glam-1-bedroom-balcony", title: "1 Bedroom with Balcony", bedrooms: 1, price: 7592000, priceText: "₱7,592,000", floorArea: "26.82 / 30.23 sqm · source conflict",
    specificationNote: "Area conflict: drawing/model card 26.82 sqm; computation 30.23 sqm. Confirm exact unit.",
    image: glamImages["555"].displaySrc!, imageAlt: "Glam one-bedroom balcony unit marketing illustration", imageCaption: "Source balcony-unit illustration; the reference drawing and computation disagree on area.", gallery: [glamImages["555"].src],
    description: "This type adds a balcony to a one-bedroom layout. The October 2025 computation uses 30.23 sqm, while the model card and original drawing state approximately 26.82 sqm. The drawing labels a bedroom, toilet and bath and balcony. JMG must confirm which configuration applies to a quoted unit.",
    features: ["1 Bedroom with Balcony", "Source computation example: 30.23 sqm", "Original drawing: approximately 26.82 sqm", "Area discrepancy requires confirmation"], sourceUrl: glamSource + "/1-bedroom-with-balcony/" },
  { ...common, id: "glam-1-bedroom-end-balcony", title: "1 Bedroom End with Balcony", bedrooms: 1, price: 9693000, priceText: "₱9,693,000", floorArea: "33.30 sqm · source example",
    specificationNote: "Shared drawing labels 26.82 sqm; a distinct 33.30 sqm end-unit plan and interior are unverified.",
    image: glamImages["official-2"].displaySrc!, imageAlt: "Glam development facade rendering; distinct end-unit interior image unavailable", imageCaption: "Development exterior rendering from SMDC. A distinct, reliably identified one-bedroom end-unit interior was not found; this image represents the development.", gallery: [glamImages["official-2"].src],
    description: "The one-bedroom end type with balcony lists 33.30 sqm in the source computation. Its page repeats the balcony drawing labeled approximately 26.82 sqm. A distinct end-unit drawing and reliably identified interior image were not found; confirm the exact layout and specifications with JMG.",
    features: ["1 Bedroom End with Balcony", "Source computation example: 33.30 sqm", "Shared 26.82 sqm drawing; end layout unverified", "Distinct interior image requires confirmation"], sourceUrl: glamSource + "/1-bedroom-end-with-balcony/" },
  { ...common, id: "glam-2-bedroom-end-balcony", title: "2 Bedroom End with Balcony", bedrooms: 2, bathrooms: 1, price: 13435000, priceText: "₱13,435,000", floorArea: "Approx. 45.56 sqm",
    image: glamImages["554"].displaySrc!, imageAlt: "Glam two-bedroom end unit with balcony marketing illustration", imageCaption: "Source two-bedroom end-unit illustration; design presentation only. Confirm actual finishes and inclusions.", gallery: [glamImages["554"].src],
    description: "The two-bedroom end type with balcony lists 45.56 sqm. Its original drawing prints approximately 45.56 sqm and shows two bedroom spaces, a bathroom fixture group, living and dining areas and a balcony. Current unit details and furnishings require confirmation.",
    features: ["2 Bedroom End with Balcony", "Drawing labels approximately 45.56 sqm", "Two bedroom spaces and one bathroom on the drawing"], sourceUrl: glamSource + "/2-bedroom-end-with-balcony/" },
];

function record(p: Property, imageId: string | null, planId: string, limitations: string[]): OfficialModelMedia {
  return { modelId: p.id, sourceUrl: p.sourceUrl, publisher: "glamresidences.com", imageNoun: "illustrations", galleryEyebrow: "GLAM RESIDENCES / SOURCE UNIT ILLUSTRATION", galleryHeading: "A design reference.",
    galleryDescription: "Published unit marketing illustration. Furniture and styling do not establish the finishes or inclusions of a purchasable unit.", gallerySourceNote: "Marketing illustration, not an actual-unit photograph",
    interiorImages: imageId ? [{ ...glamImages[imageId], label: `${p.title} — marketing illustration` }] : [],
    floorPlans: [{ ...glamImages[planId], label: planId === "536" ? "Shared 1-bedroom balcony drawing — approximately 26.82 sqm" : `${p.title} — original source drawing`, levels: ["Unit layout"] }], limitations: [],
    floorPlanDescription: limitations[0] || "Original drawing with the approximate area printed by the source. Confirm the exact unit layout and dimensions with JMG.",
    floorPlanSourceNote: "Original source image preserved without altering geometry, labels or dimensions. Some labels are small or soft; zoom cannot recover detail absent from the original." };
}
export const glamMedia: Record<string, OfficialModelMedia> = {
  "glam-1-bedroom": record(glamProperties[0], "556", "529", ["The drawing prints an approximate 23.72 sqm. It is a model reference and does not identify a currently available unit."]),
  "glam-1-bedroom-balcony": record(glamProperties[1], "555", "536", ["Area discrepancy: this drawing prints approximately 26.82 sqm, while the dated computation uses 30.23 sqm. Confirm the drawing for the actual unit."]),
  "glam-1-bedroom-end-balcony": record(glamProperties[2], null, "536", ["The end-unit page reuses this approximately 26.82 sqm balcony drawing although its computation lists 33.30 sqm. A distinct end-unit plan and interior image remain unverified."]),
  "glam-2-bedroom-end-balcony": record(glamProperties[3], "554", "550", ["The source drawing prints an approximate 45.56 sqm. Confirm dimensions, finishes and the particular unit with JMG."]),
};

export function glamGallery(key: string, heading: string, description: string, ids: string[], labels: string[], sourceUrl = glamSource + "/"): OfficialModelMedia {
  return { modelId: key, sourceUrl, publisher: sourceUrl.includes("smdc.com") ? "SMDC" : "glamresidences.com", galleryId: key, galleryHeading: heading, galleryEyebrow: "GLAM RESIDENCES / GALLERY", galleryDescription: description, gallerySourceNote: "Architectural marketing renderings; completed spaces and unit inclusions may differ", imageNoun: "renderings", interiorImages: ids.map((id, i) => ({ ...glamImages[id], label: labels[i] })), floorPlans: [], limitations: [] };
}
