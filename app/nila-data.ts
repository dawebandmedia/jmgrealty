import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import assets from "./nila-assets.json";

export const nilaSource = "https://www.nila.ph";
export const nilaImages = assets.images as Record<string, OfficialModelImage>;
export const nilaAmenities = [
  "Swimming pool", "Clubhouse", "Gym", "Yoga studio", "Playground",
  "Shared courtyards", "Landscaped walkways", "Car-free podium",
];
export const nilaDevelopment: Development = {
  id: "nila-residences",
  name: "Nila Residences",
  area: "Metro Manila",
  city: "Manila",
  locality: "Paco / Otis",
  type: "Condominium",
  image: nilaImages.courtyard.displaySrc!,
  imageAlt: "Nila Residences landscaped courtyard architectural rendering",
  imageCaption: "Mont project architectural rendering. Design perspectives illustrate planned spaces; finishes and landscaping may vary.",
  description: "A condominium community of multi-level courtyard residences by The Mont Property Group in Paco, Manila. Explore three- and four-bedroom units with private lifts, covered parking and landscaped shared spaces.",
  amenities: nilaAmenities,
  sourceUrl: nilaSource + "/",
  sourceName: "The Mont Property Group / nila.ph",
};

export const nilaUnitTypes = [
  {
    id: "nila-premium-3-bedroom", title: "Premium 3 Bedroom", bedrooms: 3,
    area: "Approx. 241.50 sqm", planArea: "241.50 sqm", parking: "2 Cars",
    minPrice: 72933000, maxPrice: 77763000, priceText: "₱72.93M–₱77.76M",
    rangeText: "₱72,933,000–₱77,763,000", plan: "premium-3-plan",
    description: "A three-bedroom home arranged across four levels, with social spaces on the upper ground floor and bedrooms above. The published plan includes a patio, a private lift, staff and service spaces, and two covered parking spaces.",
    note: "241.50 sqm is the published reference layout. Exact area, patio size and facade depend on the subtype.",
    features: ["3 bedrooms", "Patio", "Master’s walk-in closet", "2-vehicle parking on the published plan"],
  },
  {
    id: "nila-signature-3-bedroom", title: "Signature 3 Bedroom", bedrooms: 3,
    area: "Approx. 286.50 sqm", planArea: "286.50 sqm", parking: "2 Cars",
    minPrice: 87955500, maxPrice: 97410000, priceText: "₱87.96M–₱97.41M",
    rangeText: "₱87,955,500–₱97,410,000", plan: "signature-3-plan",
    description: "The Signature three-bedroom layout adds a lounge to its living, dining and kitchen spaces. Four levels connect through stairs and a private lift, with a patio, a master’s walk-in closet and covered parking below.",
    note: "286.50 sqm is the published reference layout. Exact area, patio size and facade depend on the subtype.",
    features: ["3 bedrooms", "Additional lounge", "Patio", "2-vehicle parking on the published plan"],
  },
  {
    id: "nila-premium-4-bedroom", title: "Premium 4 Bedroom", bedrooms: 4,
    area: "Approx. 370.25 sqm · type overview", planArea: "352.50 sqm · published plan",
    parking: "3 Cars · standard plan",
    minPrice: 106379500, maxPrice: 123525000, priceText: "₱106.38M–₱123.53M",
    rangeText: "₱106,379,500–₱123,525,000", plan: "premium-4-plan",
    description: "A four-bedroom residence with a family area, open living and dining spaces, a main kitchen, patio and private lift. The published standard plan includes staff quarters and a service area below, with a master’s retreat on the top level.",
    note: "Mont’s type overview gives approximately 370.25 sqm; the original standard plan totals 352.50 sqm. These refer to different configurations. Request the matching subtype plan and area.",
    features: ["4 bedrooms", "Family area", "Patio and balconies on the reference plan", "3-vehicle parking on the published plan"],
  },
  {
    id: "nila-garden-4-bedroom", title: "Garden 4 Bedroom", bedrooms: 4,
    area: "Approx. 388.00 sqm", planArea: "388.00 sqm · published plan",
    parking: "3 Cars shown · verify subtype",
    minPrice: 143698250, maxPrice: 159653750, priceText: "₱143.70M–₱159.65M",
    rangeText: "₱143,698,250–₱159,653,750", plan: "garden-4-plan",
    description: "A four-bedroom through-unit reference with a private garden beside its upper ground living spaces. The layout combines a family area, patio, top-floor master’s suite, staff and service spaces, and a private lift across four levels.",
    note: "The plan totals 388.00 sqm and labels a 35.50 sqm garden. It shows three parking spaces, while Mont’s separate Unit C2 summary says two. Confirm parking and garden inclusions for the offered subtype.",
    features: ["4 bedrooms", "Private garden · 35.50 sqm on the reference plan", "Family area and patio", "Parking count depends on the offered subtype"],
  },
];

const sharedInteriorKeys = ["living", "dining-kitchen", "bedroom", "bedroom-alternate", "private-lift", "bathroom"];
export const nilaProperties: Property[] = nilaUnitTypes.map((unit) => ({
  id: unit.id, title: unit.title,
  area: "Metro Manila", city: "Manila", locality: "Paco / Otis",
  developmentId: nilaDevelopment.id, type: "Condominium",
  bedrooms: unit.bedrooms, bathrooms: 4, storeys: 4,
  floorArea: unit.area, carport: unit.parking,
  price: unit.minPrice, priceText: unit.priceText,
  priceLabel: "Indicative type range · VAT inclusive", priceDate: "23 Jun 2026",
  priceNote: "Price guide dated 23 June 2026. Transfer and other charges are excluded. Default starting-price search uses the lower end of this historical type range; obtain a current quotation for the chosen configuration.",
  specificationNote: unit.note,
  image: nilaImages.living.displaySrc!,
  imageAlt: "Shared Nila living-room architectural rendering; no specific unit type identified",
  imageCaption: "Shared Nila project interior renderings. These illustrate design styling and are not assigned to a specific unit type; furniture and finishes require confirmation.",
  gallery: sharedInteriorKeys.map((key) => nilaImages[key].displaySrc!),
  description: unit.description,
  features: [...unit.features, "Private lift", "3 main toilet & baths, staff toilet & bath and a powder room", "Staff quarters and utility / service area", "Solar-assisted power in the developer’s overview"],
  amenities: nilaAmenities,
  sourceUrl: nilaSource + "/courtyardunits",
  sourceName: "The Mont Property Group / nila.ph",
  sourceLocation: "M. Guazon St., Otis, Paco, Manila City",
  locationNote: "Project location: M. Guazon Street, Otis, Paco, Manila City. Confirm the entrance, exact configuration and viewing arrangements with JMG.",
  importedAt: "2026-10-15",
}));

export const nilaMedia: Record<string, OfficialModelMedia> = Object.fromEntries(nilaUnitTypes.map((unit) => [unit.id, {
  modelId: unit.id, sourceUrl: nilaSource + "/courtyardunits", publisher: "The Mont Property Group",
  imageNoun: "renderings", galleryEyebrow: "NILA / SHARED PROJECT DESIGN PERSPECTIVES",
  galleryHeading: "A glimpse of the design.",
  galleryDescription: "Shared project perspectives of living spaces, bedrooms, a private lift and a bathroom. The supplied marketing images do not identify a particular unit type.",
  gallerySourceNote: "Mont architectural renderings",
  galleryDisclaimer: "Furniture, finishes and proportions shown require confirmation for your chosen configuration.",
  interiorImages: sharedInteriorKeys.map((key) => nilaImages[key]),
  floorPlans: [nilaImages[unit.plan]],
  floorPlanDescription: unit.note,
  floorPlanSourceUrl: nilaSource + "/courtyardunits",
  floorPlanSourceNote: "Original generic unit-type drawing from Mont’s Unit Layouts marketing sheets, with its dimensions, room labels and geometry retained. Four levels are shown. Facades, patio sizes and layouts can vary by subtype; confirm a matching plan with JMG.",
  limitations: [],
} as OfficialModelMedia]));

export function nilaGallery(id: string, heading: string, description: string, keys: string[], sourceUrl = nilaSource + "/"): OfficialModelMedia {
  return {
    modelId: id, galleryId: id, sourceUrl, publisher: "The Mont Property Group",
    imageNoun: "renderings", galleryEyebrow: "NILA / ARCHITECTURAL PERSPECTIVES",
    galleryHeading: heading, galleryDescription: description,
    gallerySourceNote: "Mont project marketing imagery",
    galleryDisclaimer: "Architectural perspectives illustrate planned design. Confirm current facilities, finishes and access with JMG.",
    interiorImages: keys.map((key) => nilaImages[key]), floorPlans: [], limitations: [],
  };
}
