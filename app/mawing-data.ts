import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import records from "./mawing-assets.json";

export const mawingSource = "https://www.pampanga-properties.com/mawing-residences-sta-cruz-porac.html";
export const mawingImages = records as Record<string, OfficialModelImage>;
export const mawingAmenities = ["Clubhouse", "Basketball court", "Parks", "Jogging path"];
export const mawingDevelopment: Development = {
  id: "mawing-residences", name: "Mawing Residences Sta. Cruz", area: "Pampanga", city: "Porac", locality: "Sta. Cruz", region: "Central Luzon", type: "House & Lot",
  image: mawingImages.S064.displaySrc!, imageAlt: "Architectural streetscape perspective of the three Mawing house models",
  imageCaption: "Supplied architectural perspective. Landscaping, furnishings and finishes are illustrative; confirm the offered home and written inclusions.",
  description: "A Herencia de Julieta community in Sta. Cruz, Porac, Pampanga. Compare Julieta, Gregoria and Gerardo: three two-storey, single-attached models with three bedrooms, a 96 sqm reference lot and approximately 92 sqm of floor area.",
  amenities: mawingAmenities, sourceUrl: mawingSource, sourceName: "Supplied Herencia de Julieta model sheets / Pampanga Properties reference",
};
export const mawingSpecs = [
  { key: "julieta", image: "S061", flyer: "S012", photos: Array.from({ length: 13 }, (_, n) => `S${48 + n}`.replace(/^S(\d{2})$/, "S0$1")) },
  { key: "gregoria", image: "S063", flyer: "S010", photos: Array.from({ length: 17 }, (_, n) => `S${31 + n}`.replace(/^S(\d{2})$/, "S0$1")) },
  { key: "gerardo", image: "S062", flyer: "S011", photos: Array.from({ length: 17 }, (_, n) => `S${14 + n}`.replace(/^S(\d{2})$/, "S0$1")) },
];
export const mawingProperties: Property[] = mawingSpecs.map(m => ({
  id: "mawing-" + m.key, title: m.key[0].toUpperCase() + m.key.slice(1), developmentId: mawingDevelopment.id,
  area: "Pampanga", city: "Porac", locality: "Sta. Cruz", region: "Central Luzon", type: "Single Attached",
  storeys: 2, bedrooms: 3, bathrooms: 2, floorArea: "Approx. 92 sqm", lotArea: "96 sqm", carport: "1 Car",
  price: 5958750, priceText: "₱5,958,750.00", priceLabel: "Dated 96 sqm package reference", priceDate: "8 Oct 2026",
  priceNote: "A 96 sqm package example in the supplied 8 October 2026 pricelist. This is not a current quotation or a starting-price promise for every lot or orientation. Confirm the exact property, charges, reservation and financing terms with JMG.",
  specificationNote: "The supplied model sheet specifies 3 bedrooms, 2 toilets and baths and 1 carport. Furnished inclusions are advertised separately; photographs show varying fit-out stages. Confirm the matching plan and written turnover package.",
  image: mawingImages[m.image].displaySrc!, imageAlt: m.key + " exterior architectural perspective from the supplied Mawing materials",
  imageCaption: "Supplied " + m.key + " architectural perspective, shown as an illustration. Finishes, landscaping and furnishings may differ from the offered property.",
  gallery: [mawingImages[m.image].displaySrc!],
  description: `${m.key[0].toUpperCase() + m.key.slice(1)} is a two-storey single-attached home with three bedrooms, two toilets and baths, a balcony and a one-car carport. Its original model sheet presents a 96 sqm lot and approximately 92 sqm of floor area, with living, dining, kitchen, storage and service spaces. Compare the ground- and second-floor arrangements in its own source plan.`,
  features: ["Two-storey single-attached home", "3 bedrooms", "2 toilets & baths", "Balcony and porch", "Living, dining and formal kitchen", "Service, laundry and storage areas", "One-car carport"],
  amenities: mawingAmenities, sourceUrl: mawingSource, sourceName: "Supplied Herencia de Julieta model sheets / Pampanga Properties reference", sourceLocation: "Sta. Cruz, Porac, Pampanga",
  locationNote: "Sta. Cruz, Porac, Pampanga. Confirm the entrance and route before your viewing. Distances and opening dates in source maps are publisher references.", importedAt: "2026-10-16",
}));
export const mawingMedia: Record<string, OfficialModelMedia> = Object.fromEntries(mawingSpecs.map(m => ["mawing-" + m.key, {
  modelId: "mawing-" + m.key, sourceUrl: mawingSource, publisher: "Supplied Mawing / Herencia de Julieta materials",
  galleryEyebrow: "MAWING / SUPPLIED MODEL PHOTOGRAPHS", galleryHeading: "A closer look at the model.",
  galleryDescription: "Model photographs assigned by the supplied folder names. These show varying fit-out stages; confirm the exact home and written inclusions with JMG.",
  gallerySourceNote: "Supplied model photographs", galleryDisclaimer: "Reference photographs do not establish current availability, condition or included furniture. Confirm the offered property and written inclusions.",
  interiorImages: m.photos.map(id => mawingImages[id]), floorPlans: [mawingImages[m.key + "-plan"]],
  floorPlanDescription: "The complete original model sheet includes its named facade and separate ground- and second-floor plans. Julieta, Gregoria and Gerardo have different arrangements; use the named sheet for comparison.",
  floorPlanSourceNote: "Supplied Product Knowledge Seminar, model pages 10–12. Complete source page rendered to PNG without cropping or redrawing. The source’s L.D. December 2030 completion wording does not establish a specific home’s turnover date.", limitations: [],
} as OfficialModelMedia]));
export const mawingFlyers: Record<string, OfficialModelMedia> = Object.fromEntries(mawingSpecs.map(m => ["mawing-" + m.key, {
  modelId: "mawing-" + m.key + "-flyer", galleryId: "model-flyer", sourceUrl: mawingSource, publisher: "Supplied Mawing marketing materials", imageNoun: "flyer",
  galleryEyebrow: "ORIGINAL MODEL FLYER", galleryHeading: "The model flyer.", galleryDescription: "The original supplied promotional sheet, retained with its model caption and artwork.",
  gallerySourceNote: "Supplied model flyer", galleryDisclaimer: "Architectural perspective. Confirm current finishes and inclusions.", interiorImages: [mawingImages[m.flyer]], floorPlans: [], limitations: [],
} as OfficialModelMedia]));
export function mawingGallery(id: string, heading: string, description: string, keys: string[], noun = "references"): OfficialModelMedia {
  return { modelId: id, galleryId: id, sourceUrl: mawingSource, publisher: "Supplied Mawing / Herencia de Julieta materials", galleryEyebrow: "MAWING / SOURCE REFERENCES", galleryHeading: heading, galleryDescription: description, imageNoun: noun, interiorImages: keys.map(k => mawingImages[k]), floorPlans: [], gallerySourceNote: "Supplied source material", galleryDisclaimer: "Advertised source reference. Confirm current details and the offered package with JMG.", limitations: [] };
}
