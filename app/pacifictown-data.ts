import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import assets from "./pacifictown-assets.json";

export const pacifictownSource = "https://ppvi.ph/";
export const pacifictownTownhouseSource = "https://properties.riseandshinerealty.com.ph/property/Naic/Cavite/138/PACIFICTOWN-NAIC-";
export const pacifictownEnclaveSource = "https://properties.riseandshinerealty.com.ph/property/Naic/Cavite/600/Pacifictown-Enclave-";
export const pacifictownImages = assets.images as Record<string, OfficialModelImage>;

export const pacifictownFlyerClaims = [
  "Modern design",
  "Quality construction",
  "Flood-free area — advertising claim, not independently verified",
  "Secure community — advertising claim, details not independently verified",
  "Pag-IBIG 4PH badge shown — eligibility and financing terms require confirmation",
];

export const pacifictownRelatedAmenities = [
  "Gate and guardhouse",
  "Basketball court",
  "Clubhouse",
  "Playground",
  "Landscaped parks",
];

export const pacifictownDevelopment: Development = {
  id: "pacifictown-naic-5",
  name: "Pacifictown Naic 5",
  area: "Cavite",
  city: "Naic",
  locality: "",
  type: "House & Lot",
  image: pacifictownImages.flyer.src,
  imageAlt: "Supplied Pacifictown Naic 5 marketing flyer with three advertised house types and prices",
  imageCaption: "Undated marketing flyer supplied for this listing. Its location text identifies Naic, Cavite; exact barangay and phase-specific project details require confirmation.",
  description: "A pre-selling Pacifictown project advertised for Naic, Cavite. Compare the Socialized Housing, Townhouse and Single Attached options and their undated flyer prices. Confirm the exact project address, current price and availability with JMG.",
  amenities: [],
  sourceUrl: pacifictownSource,
  sourceName: "Supplied Pacifictown Naic 5 flyer / Pacifictown Property Ventures Inc.",
};

type ModelRecord = {
  id: string;
  title: string;
  type: string;
  price: number;
  priceText: string;
  lot: number;
  floor: number;
  imageKey: string;
  summary: string;
};

export const pacifictownModels: ModelRecord[] = [
  {
    id: "pacifictown-naic-5-socialized-housing",
    title: "Socialized Housing",
    type: "Socialized Housing",
    price: 1_100_000,
    priceText: "₱1.1M",
    lot: 36,
    floor: 32,
    imageKey: "socialized-card",
    summary: "The supplied flyer lists a 36 sqm lot and 32 sqm floor area. It does not state bedrooms, bathrooms or a detailed layout.",
  },
  {
    id: "pacifictown-naic-5-townhouse",
    title: "Townhouse",
    type: "Townhouse",
    price: 1_500_000,
    priceText: "₱1.5M",
    lot: 40,
    floor: 42,
    imageKey: "townhouse-card",
    summary: "The supplied flyer lists a 40 sqm lot and 42 sqm floor area. It does not state bedrooms, bathrooms or a detailed layout.",
  },
  {
    id: "pacifictown-naic-5-single-attached",
    title: "Single Attached",
    type: "Single Attached",
    price: 2_500_000,
    priceText: "₱2.5M",
    lot: 54,
    floor: 53,
    imageKey: "single-attached-card",
    summary: "The supplied flyer lists a 54 sqm lot and 53 sqm floor area. It does not state bedrooms, bathrooms or a Phase 5 floor plan.",
  },
];

const priceNote = "Price transcribed from the undated Naic 5 flyer. It is an advertised amount, not a current quotation or guaranteed total contract price; confirm availability, taxes, fees, financing and terms with JMG.";

export const pacifictownProperties: Property[] = pacifictownModels.map((model) => {
  const card = pacifictownImages[model.imageKey];
  return {
    id: model.id,
    title: model.title,
    area: "Cavite",
    city: "Naic",
    locality: "",
    developmentId: pacifictownDevelopment.id,
    type: model.type,
    price: model.price,
    priceText: model.priceText,
    priceLabel: "Undated supplied flyer price",
    priceNote,
    lotArea: `${model.lot} sqm`,
    floorArea: `${model.floor} sqm`,
    badge: "Pre-Selling · flyer",
    specificationNote: "The supplied Naic 5 flyer publishes floor area, lot area and price only. It does not publish a bedroom count, bathroom count, exact floor plan or turnover specification for this model.",
    image: card.src,
    imageAlt: `${model.title} thumbnail cropped from the supplied Pacifictown Naic 5 flyer; not an independently verified as-built photograph`,
    imageCaption: `Flyer thumbnail for ${model.title}. The complete supplied flyer is shown in its own section below; confirm current construction, finishes and terms.`,
    gallery: [card.src],
    description: model.summary,
    features: [`${model.floor} sqm floor area · flyer`, `${model.lot} sqm lot area · flyer`, `Advertised price ${model.priceText} · undated flyer`],
    amenities: [],
    sourceUrl: pacifictownSource,
    sourceName: "User-supplied Pacifictown Naic 5 flyer; developer website checked 15 October 2026",
    sourceLocation: "Naic, Cavite (as stated in supplied flyer)",
    locationNote: "The supplied flyer names Naic, Cavite but does not give a barangay, street address or map pin for Phase 5. Confirm the exact entrance and project phase before a viewing.",
    importedAt: "2026-10-15",
  };
});

export const pacifictownFlyerMedia: OfficialModelMedia = {
  modelId: "pacifictown-naic-5-flyer",
  galleryId: "model-flyer",
  sourceUrl: pacifictownImages.flyer.src,
  publisher: "Supplied Pacifictown Naic 5 promotional flyer",
  imageNoun: "flyers",
  galleryEyebrow: "PACIFICTOWN NAIC 5 / ORIGINAL PROMOTIONAL FLYER",
  galleryHeading: "The complete promotional flyer.",
  galleryDescription: "The full supplied flyer shows all three advertised home types, their prices and areas. Select it to enlarge, zoom or open the original image.",
  gallerySourceNote: "Undated supplied marketing flyer",
  galleryDisclaimer: "Pricing may change at any time. Contact JMG Realty PH for current prices. The reservation fee, financing badge and promotional claims require current confirmation.",
  interiorImages: [pacifictownImages.flyer],
  floorPlans: [],
  limitations: [],
};

export const pacifictownMedia: Record<string, OfficialModelMedia> = {
  "pacifictown-naic-5-single-attached": {
    modelId: "pacifictown-naic-5-single-attached",
    sourceUrl: pacifictownEnclaveSource,
    publisher: "Rise & Shine Realty · Pacifictown Enclave listing",
    imageNoun: "published plans",
    galleryEyebrow: "RELATED PACIFICTOWN NAIC REFERENCE",
    galleryHeading: "A related layout reference.",
    galleryDescription: "This is a floor plan from a different, third-party Pacifictown Enclave listing in Naic. Its 54 sqm lot and 52.72 sqm floor-area labels are close to, but not identical with, the Naic 5 flyer’s rounded 54 sqm and 53 sqm figures. The listing does not identify this drawing as Naic 5.",
    gallerySourceNote: "Third-party listing image · phase not specified",
    galleryDisclaimer: "Not a verified Naic 5 or Single Attached Phase 5 plan. Do not use it to describe the advertised unit without confirmation.",
    interiorImages: [],
    floorPlans: [pacifictownImages["related-enclave-floor-plan"]],
    floorPlanHeading: "Related Enclave plan reference.",
    floorPlanEyebrow: "RELATED LISTING / NOT VERIFIED FOR NAIC 5",
    floorPlanDescription: "Related single-attached plan only. The Naic 5 flyer does not include a floor plan; this drawing is retained as a clearly separated research reference.",
    floorPlanSourceNote: "The source listing calls this Pacifictown Enclave and gives 54 sqm lot area / 52.72 sqm floor area. Confirm whether any drawing applies to the exact Naic 5 lot before relying on its room labels or measurements.",
    floorPlanSourceUrl: pacifictownEnclaveSource,
    limitations: [],
  },
};

export const pacifictownRelatedTownhouseMedia: OfficialModelMedia = {
  modelId: "pacifictown-related-townhouse-reference",
  sourceUrl: pacifictownTownhouseSource,
  publisher: "Rise & Shine Realty · Pacifictown Naic listing",
  imageNoun: "listing images",
  galleryEyebrow: "RELATED NAIC LISTING / PHASE NOT CONFIRMED",
  galleryHeading: "Townhouse references from Naic.",
  galleryDescription: "These images accompany a separate Pacifictown Naic listing with a 40 sqm lot and 42 sqm floor area, matching the dimensions printed for the Naic 5 Townhouse. The listing does not identify the photographs as Naic 5; treat them as comparative references only.",
  gallerySourceNote: "Third-party Pacifictown Naic listing",
  galleryDisclaimer: "Not confirmed as Phase 5 model-unit photography. Finishes and exact configuration may differ.",
  interiorImages: ["related-townhouse-01", "related-townhouse-02", "related-townhouse-03", "related-townhouse-04", "related-townhouse-05"].map((key) => pacifictownImages[key]),
  floorPlans: [],
  limitations: [],
};

export const pacifictownRelatedEnclaveMedia: OfficialModelMedia = {
  modelId: "pacifictown-related-enclave-reference",
  sourceUrl: pacifictownEnclaveSource,
  publisher: "Rise & Shine Realty · Pacifictown Enclave listing",
  imageNoun: "listing images",
  galleryEyebrow: "RELATED NAIC LISTING / PHASE NOT CONFIRMED",
  galleryHeading: "Single-attached references from Naic.",
  galleryDescription: "These photos and architectural perspectives accompany the separate Pacifictown Enclave listing in Naic. Its 54 sqm lot and 52.72 sqm floor area are similar to the Naic 5 flyer’s 54 sqm lot and rounded 53 sqm floor area, but the source does not connect them to Phase 5.",
  gallerySourceNote: "Third-party Pacifictown Enclave listing",
  galleryDisclaimer: "Not confirmed as Phase 5 imagery. Treat the pictures as related project references only.",
  interiorImages: ["related-enclave-01", "related-enclave-02", "related-enclave-03", "related-enclave-04", "related-enclave-05", "related-enclave-06", "related-rowhouse-rendering"].map((key) => pacifictownImages[key]),
  floorPlans: [],
  limitations: [],
};


