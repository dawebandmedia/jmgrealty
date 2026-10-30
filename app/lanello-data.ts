import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import assets from "./lanello-assets.json";

export const lanelloSource = "https://lanelloheights.phproperty.com";
export const lanelloImages = assets.images as Record<string, OfficialModelImage>;
export const lanelloAmenities = ["Basketball court", "Playground", "Multipurpose hall", "Jogging path"];
export const lanelloDevelopment: Development = {
  id: "lanello-heights", name: "Lanello Heights", area: "Cavite", city: "General Trias",
  locality: "Pasong Camachile II", type: "House & Lot",
  image: lanelloImages["abbie-photo"].displaySrc!,
  imageAlt: "Abbie model exterior in the supplied Lanello Heights promotional photograph",
  imageCaption: "Supplied Masaito Homes promotional photograph of Abbie. The advertised reservation fee and current inclusions require confirmation.",
  description: "A Masaito Homes community in Barangay Pasong Camachile II, General Trias, Cavite. Explore Abbie, Brenda and Chelsea, with two- and three-bedroom layouts, model photographs and original brochure floor plans.",
  amenities: lanelloAmenities, sourceUrl: lanelloSource + "/", sourceName: "Lanello Heights reference / supplied Masaito promotional images",
};

export const lanelloModelSpecs = [
  { key: "abbie", title: "Abbie", bedrooms: 3, bathrooms: 2, floorArea: "Approx. 73 sqm", lotArea: "88 sqm",
    description: "Abbie offers three bedrooms and two toilets and baths across a two-storey home. Its reference layout includes a balcony, a front lawn, a carport and a service area, with room for family living and everyday routines.",
    features: ["3 bedrooms", "2 toilets & baths", "Balcony", "Front lawn", "Carport", "Service area"],
    note: "The reference brochure gives 72.99 sqm, rounded to 73 sqm in the supplied promotional photograph. Lot dimensions and finishes depend on the offered property." },
  { key: "brenda", title: "Brenda", bedrooms: 2, bathrooms: 2, floorArea: "60 sqm", lotArea: "77 sqm",
    description: "Brenda brings two bedrooms and two toilets and baths into a two-storey layout. Living, dining and kitchen spaces are complemented by a carport and a service area. Explore its original brochure for the ground- and second-floor arrangements.",
    features: ["2 bedrooms", "2 toilets & baths", "Living and dining spaces", "Kitchen", "Carport", "Service area"], note: undefined },
  { key: "chelsea", title: "Chelsea", bedrooms: 2, bathrooms: 1, floorArea: "49 sqm", lotArea: "66 sqm",
    description: "Chelsea is a compact two-storey option with two bedrooms and one toilet and bath. Its reference layout includes living and dining spaces, a kitchen, a carport and a service area, giving you a practical starting point for comparing your needs.",
    features: ["2 bedrooms", "1 toilet & bath", "Living and dining spaces", "Kitchen", "Carport", "Service area"], note: undefined },
];

export const lanelloProperties: Property[] = lanelloModelSpecs.map(model => ({
  id: "lanello-" + model.key, title: model.title,
  area: "Cavite", city: "General Trias", locality: "Pasong Camachile II",
  developmentId: lanelloDevelopment.id, type: "House & Lot", storeys: 2,
  bedrooms: model.bedrooms, bathrooms: model.bathrooms,
  floorArea: model.floorArea, lotArea: model.lotArea, carport: "1 Car",
  price: 2300000, priceText: "₱2.3M–₱3M", priceLabel: "JMG guide price range",
  priceNote: "Indicative JMG guide range. Exact price, charges, financing and reservation terms depend on the offered house and lot; request a current quotation. Default starting-price matching uses the lower range bound.",
  specificationNote: model.note,
  image: lanelloImages[model.key + "-photo"].displaySrc!,
  imageAlt: model.title + " exterior in the supplied Masaito Homes promotional photograph",
  imageCaption: "Supplied " + model.title + " promotional photograph. The ₱20,000 reservation fee is advertised on the image; confirm current terms, finishes and inclusions with JMG.",
  gallery: [lanelloImages[model.key + "-photo"].displaySrc!],
  description: model.description, features: model.features, amenities: lanelloAmenities,
  sourceUrl: lanelloSource + "/lanello-heights-models/" + model.key + "-house-model",
  sourceName: "Lanello Heights reference / supplied Masaito promotional images",
  sourceLocation: "Barangay Pasong Camachile II, General Trias, Cavite",
  locationNote: "Barangay Pasong Camachile II, General Trias, Cavite, near the Imus boundary. Confirm the entrance and route before your viewing.",
  importedAt: "2026-10-15",
}));

export const lanelloMedia: Record<string, OfficialModelMedia> = Object.fromEntries(lanelloModelSpecs.map(model => ["lanello-" + model.key, {
  modelId: "lanello-" + model.key,
  sourceUrl: lanelloSource + "/lanello-heights-models/" + model.key + "-house-model",
  publisher: "Lanello Heights reference website", imageNoun: "illustrations",
  galleryEyebrow: "LANELLO / MODEL FACADE REFERENCE", galleryHeading: "The facade details.",
  galleryDescription: "The publisher’s annotated exterior illustration identifies facade design details. Compare it with the supplied model photograph and ask JMG about current finishes.",
  gallerySourceNote: "Published facade illustration",
  galleryDisclaimer: "Design details and finishes may differ from the property offered.",
  interiorImages: [lanelloImages[model.key + "-facade"]],
  floorPlans: [lanelloImages[model.key + "-brochure"]],
  floorPlanDescription: "The original " + model.title + " brochure includes separate ground- and second-floor plans, model areas and reference specifications. The entire sheet is retained so its context remains visible.",
  floorPlanSourceNote: "Original publisher brochure, preserved at the available source resolution. It is a generic model reference; its semi-complete finish specifications may differ from current packages. Confirm the exact lot, layout and turnover inclusions with JMG.",
  limitations: [],
} as OfficialModelMedia]));

export function lanelloGallery(id: string, heading: string, description: string, keys: string[], sourceUrl = lanelloSource + "/lanello-heights-photo-gallery"): OfficialModelMedia {
  return {
    modelId: id, galleryId: id, sourceUrl, publisher: "Lanello Heights reference website",
    imageNoun: "illustrations", galleryEyebrow: "LANELLO / PUBLISHED PROJECT REFERENCES",
    galleryHeading: heading, galleryDescription: description,
    gallerySourceNote: "Published source illustrations",
    galleryDisclaimer: "Marketing perspectives do not establish current construction, operation or access. Confirm current details with JMG.",
    interiorImages: keys.map(key => lanelloImages[key]), floorPlans: [], limitations: [],
  };
}
