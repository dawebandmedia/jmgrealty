import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import assets from "./alegria-assets.json";

export const alegriaSource = "https://rocka.ph/alegria/";
export const alegriaImages = assets.images as Record<string, OfficialModelImage>;
export const alegriaAmenities = ["Pedestrian linear park", "Walking path", "Jogging path", "Outdoor gym & playground"];
export const alegriaDevelopment: Development = {
  id: "alegria", name: "Alegria Lifestyle Residences", region: "Central Luzon", area: "Bulacan", city: "Marilao", locality: "Loma de Gato",
  type: "House & Lot", image: alegriaImages["1798"].displaySrc!, imageAlt: "Alegria aerial architectural perspective from Rocka’s 2017 media archive",
  imageCaption: "Rocka’s archived aerial concept rendering, uploaded in 2017. It illustrates the development concept rather than current construction or available lots.",
  description: "A house-and-lot community by Rocka Homes & Villas in Loma de Gato, Marilao, Bulacan. Explore five house models, published community features and the original developer vicinity map.",
  amenities: alegriaAmenities, sourceUrl: alegriaSource, sourceName: "Rocka Homes & Villas",
};
const common = {
  region: "Central Luzon", area: "Bulacan", city: "Marilao", locality: "Loma de Gato", developmentId: "alegria", type: "House & Lot",
  price: null, priceText: "Contact for Price", priceLabel: "Price on inquiry", bathrooms: 3, lotArea: "Minimum 168 sqm", carport: "2 cars", storeys: 2,
  amenities: alegriaAmenities, importedAt: "2026-10-13", sourceName: "Rocka Homes & Villas", sourceLocation: "Loma de Gato, Marilao, Bulacan",
  locationNote: "Loma de Gato, Marilao, Bulacan, Central Luzon. View the developer’s original vicinity map on the Alegria development page; confirm the specific lot and current access with JMG.",
  priceNote: "The reviewed Rocka model pages do not publish an asking price. Ask JMG for current pricing, available configurations, inclusions and payment terms.",
};
export const alegriaProperties: Property[] = [
  { ...common, id: "alegria-alyanna", title: "Alyanna", bedrooms: 4, floorArea: "181 sqm",
    image: alegriaImages["7322"].displaySrc!, imageAlt: "Rocka’s Alyanna model exterior photograph", imageCaption: "Alyanna model-house photograph published by Rocka. It does not identify an available lot or establish included furniture and finishes.", gallery: [alegriaImages["7322"].src],
    description: "Alyanna’s published specifications list four bedrooms, three toilets and baths, a minimum 168 sqm lot and 181 sqm total floor area. Its features include a family area, balcony, full kitchen, dining and living areas, laundry area and two-car carport.",
    features: ["4 bedrooms · 3 toilets & baths", "Full kitchen, dining and living areas", "Family area and balcony", "Laundry area", "Carport for 2 cars", "Two floors shown on the archived drawing"], sourceUrl: "https://rocka.ph/alyanna/" },
  { ...common, id: "alegria-amaris", title: "Amaris", bedroomText: "4 / 5 · source conflict", floorArea: "168 sqm",
    specificationNote: "Bedroom conflict: supplied Amaris page and drawing show 5; newer photo page lists 4. Confirm the offered configuration.",
    image: alegriaImages["7321"].displaySrc!, imageAlt: "Rocka’s Amaris model exterior photograph", imageCaption: "Amaris model-house photograph from Rocka’s newer photo page. That page’s bedroom count differs from the supplied plan page.", gallery: [alegriaImages["7321"].src],
    description: "Both Amaris pages list a minimum 168 sqm lot, 168 sqm floor area, three toilets and baths and a two-car carport. The supplied page and archived drawing show five bedrooms; the newer photo page lists four. The older page includes a lanai, while the newer page lists a family area. Ask JMG which configuration applies.",
    features: ["Minimum lot 168 sqm · floor area 168 sqm", "3 toilets & baths · 2-car carport", "Full kitchen, dining, living and laundry areas", "Lanai on supplied page; family area on newer page", "Bedroom count remains unresolved"], sourceUrl: "https://rocka.ph/amaris-2/" },
  { ...common, id: "alegria-anatalia", title: "Anatalia", bedrooms: 4, floorArea: "181 sqm",
    image: alegriaImages["7320"].displaySrc!, imageAlt: "Rocka’s Anatalia model exterior photograph", imageCaption: "Anatalia model-house photograph published by Rocka; confirm the offered lot, finishes and inclusions.", gallery: [alegriaImages["7320"].src],
    description: "Anatalia lists four bedrooms, three toilets and baths, a minimum 168 sqm lot and 181 sqm total floor area. The source names a high-ceiling living area, full kitchen, dining and laundry areas, lanai and two-car carport.",
    features: ["4 bedrooms · 3 toilets & baths", "Living area with high ceiling", "Full kitchen and dining area", "Laundry area and lanai", "Carport for 2 cars", "Ground and second floors on the archived drawing"], sourceUrl: "https://rocka.ph/anatalia/" },
  { ...common, id: "alegria-arella", title: "Arella", bedrooms: 4, floorArea: "175 sqm",
    image: alegriaImages["7319"].displaySrc!, imageAlt: "Rocka’s Arella model exterior photograph", imageCaption: "Arella model-house photograph published by Rocka. Confirm current finishes and inclusions with JMG.", gallery: [alegriaImages["7319"].src],
    description: "Arella lists four bedrooms, three toilets and baths, a minimum 168 sqm lot and 175 sqm total floor area. Its published feature list includes a full kitchen, family area, dining and living areas, laundry area and two-car carport.",
    features: ["4 bedrooms · 3 toilets & baths", "Full kitchen and family area", "Dining, living and laundry areas", "Carport for 2 cars", "Ground and second floors on the archived drawing"], sourceUrl: "https://rocka.ph/arella/" },
  { ...common, id: "alegria-averie", title: "Averie", bedrooms: 4, floorArea: "170 sqm",
    specificationNote: "Archive drawing filename mentions Averie and Darien; its applicability to an Alegria lot is unconfirmed.",
    image: alegriaImages["7318"].displaySrc!, imageAlt: "Rocka’s Averie model exterior photograph", imageCaption: "Averie model-house photograph published by Rocka. The separate archive drawing carries an applicability limitation.", gallery: [alegriaImages["7318"].src],
    description: "Averie lists four bedrooms, three toilets and baths, a minimum 168 sqm lot and 170 sqm total floor area. Features include a high-ceiling living area, full kitchen, dining and laundry areas, lanai and two-car carport. The archive drawing’s filename mentions Darien; confirm its relevance to the actual Alegria offering.",
    features: ["4 bedrooms · 3 toilets & baths", "Living area with high ceiling", "Full kitchen and dining area", "Laundry area and lanai", "Carport for 2 cars", "Archive drawing requires applicability confirmation"], sourceUrl: "https://rocka.ph/averie-2/" },
];

const mapping = assets.modelMappings;
const keys = ["alyanna", "amaris-2", "anatalia", "arella", "averie-2"] as const;
export const alegriaMedia: Record<string, OfficialModelMedia> = Object.fromEntries(alegriaProperties.map((p, i) => {
  const model = mapping[keys[i]];
  const ids = model.interiorIds;
  const isAmaris = p.id === "alegria-amaris";
  const isAverie = p.id === "alegria-averie";
  const plan = alegriaImages[model.planIds[0]];
  const media: OfficialModelMedia = {
    modelId: p.id, sourceUrl: isAmaris ? "https://rocka.ph/amaris/" : p.sourceUrl, publisher: "Rocka Homes & Villas", imageNoun: "photographs",
    galleryEyebrow: "OFFICIAL ROCKA / MODEL-HOUSE PHOTOGRAPHY", galleryHeading: `Inside ${p.title}.`,
    galleryDescription: "Explore the developer’s model-house photographs. Room names follow the source gallery; the photographs do not establish current unit availability or furniture inclusions.",
    gallerySourceNote: "Official model-house photo gallery", interiorImages: ids.map(id => alegriaImages[id]),
    floorPlans: [{ ...plan, label: isAverie ? "Averie archive filename reference — Alegria applicability unverified" : `${p.title} — original archived 2D drawing`, levels: ["Ground Floor Plan", "Second Floor Plan"] }],
    floorPlanDescription: isAverie ? "This unchanged Rocka archive file is named AVERIE-FOR-DARIEN.jpg and has no printed model title. Its association comes from the filename; its applicability to an Alegria lot remains unconfirmed. Inspect it as an archive reference and request the exact current drawing from JMG."
      : isAmaris ? "The original drawing on the supplied Amaris page shows ground and second floors and five bedrooms. Rocka’s newer photo page lists four bedrooms. Confirm the configuration offered before relying on this archived drawing."
      : "Original combined ground- and second-floor drawing from Rocka’s 2021 media archive. Published webpage areas are separate specifications; this drawing does not print numeric floor area, lot area or room dimensions.",
    floorPlanSourceUrl: isAmaris ? p.sourceUrl : plan.sourceUrl,
    floorPlanSourceNote: "Historical drawing preserved without changing labels, dimensions or geometry. Confirm the current lot-specific plan and inclusions with JMG; no dimensions have been invented.",
    limitations: [],
  };
  return [p.id, media];
}));

export function alegriaGallery(id: string, heading: string, description: string, ids: string[], sourceUrl = alegriaSource): OfficialModelMedia {
  return { modelId: id, sourceUrl, publisher: "Rocka Homes & Villas", galleryId: id, galleryHeading: heading, galleryEyebrow: "OFFICIAL ROCKA / PROJECT MATERIAL", galleryDescription: description, imageNoun: "images", gallerySourceNote: "Original publisher material", interiorImages: ids.map(key => alegriaImages[key]), floorPlans: [], limitations: [] };
}
export const alegriaVicinityMedia: OfficialModelMedia = { ...alegriaGallery("vicinity-map-gallery", "Location and Vicinity Map.", "Rocka’s original project vicinity map, located on the Alegria page. Enlarge and zoom to inspect the full diagram; labels, roads and landmarks remain unchanged.", ["6753"]), imageNoun: "map", galleryDisclaimer: "Publisher diagram uploaded in 2021. Landmark labels are historical references; confirm current routes with JMG." };
export const alegriaSiteMedia: OfficialModelMedia = { ...alegriaGallery("site-layout-gallery", "An archived site layout.", "Original Alegria layout from Rocka’s 2021 media catalog. It includes markers A–I without a supplied legend and does not establish current lot availability.", ["6607"], alegriaImages["6607"].sourceUrl), imageNoun: "drawing", galleryDisclaimer: "Archived project layout; request the applicable current site plan and lot information." };
export const amarisIllustrationMedia: OfficialModelMedia = { ...alegriaGallery("amaris-layout-illustrations", "Amaris design references.", "The supplied Amaris page also publishes an exterior rendering and two 3D layout illustrations. These are separate from the original 2D drawing and the newer model photographs.", ["6079", "6076", "6077"], "https://rocka.ph/amaris-2/"), imageNoun: "illustrations" };
