import records from "./amaresa-media-data.json";

export type OfficialModelImage = {
  src: string;
  displaySrc?: string;
  viewerSrc?: string;
  downloadLabel?: string;
  label: string;
  width: number;
  height: number;
  sourceUrl: string;
  originalFilename: string;
  sha256: string;
  levels?: string[];
};

export type OfficialModelMedia = {
  sourceUrl: string;
  modelId: string;
  interiorImages: OfficialModelImage[];
  floorPlans: OfficialModelImage[];
  limitations: string[];
  publisher?: string;
  galleryHeading?: string;
  galleryEyebrow?: string;
  galleryDescription?: string;
  gallerySourceNote?: string;
  galleryDisclaimer?: string;
  floorPlanDescription?: string;
  floorPlanSourceNote?: string;
  floorPlanSourceUrl?: string;
  floorPlanHeading?: string;
  floorPlanEyebrow?: string;
  galleryId?: string;
  plansId?: string;
  imageNoun?: string;
};

// Official media is separate from the existing property specifications and prices.
export const amaresaMedia = records as Record<string, OfficialModelMedia>;
