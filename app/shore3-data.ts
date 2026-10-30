import type { Development, Property } from "./content";

export const shore3Source = "https://shore3residences.com";
export const shore3PriceDate = "24 October 2025";
export const shore3ImportedDate = "2026-10-13";
export const shore3AmenityGroups = [
  { name: "Swimming & water features", items: ["Olympic-length lap pool", "Kiddie / wading pool", "Lounge pool", "Beach-entry pool", "In-water garden coves"] },
  { name: "Relaxation & leisure", items: ["Pool pavilion", "Sunken lounges", "View decks", "Entry deck / lounge", "Lush gardens & landscaped paths", "Central lawn"] },
  { name: "Wellness & activity", items: ["Jog paths", "Outdoor gym circuit"] },
  { name: "Community & social spaces", items: ["Grand lobbies", "Function rooms", "Lounge areas", "Commercial strips"] },
  { name: "Family & play", items: ["Kids’ play area"] },
  { name: "Building services", items: ["24-hour security", "Property management services", "Dedicated parking slots"] },
];
export const shore3Amenities = shore3AmenityGroups.flatMap((group) => group.items);
export const shore3Development: Development = {
  id: "shore-3-residences",
  name: "Shore 3 Residences",
  area: "Metro Manila",
  city: "Pasay",
  locality: "Mall of Asia Complex",
  image: "/images/properties/shore-3/originals/813-display.webp",
  imageAlt: "Shore 3 Residences development marketing illustration published on shore3residences.com",
  description: "An SMDC condominium development in Pasay’s Mall of Asia Complex, with three priced unit types in this catalog and a separate guide to its published amenities.",
  amenities: shore3Amenities,
  sourceUrl: shore3Source + "/",
};

const common = {
  area: "Metro Manila",
  city: "Pasay",
  locality: "Mall of Asia Complex",
  developmentId: shore3Development.id,
  type: "Condominium",
  amenities: shore3Amenities,
  sourceName: "shore3residences.com",
  sourceLocation: "Seaside Boulevard, corner Sunrise Drive, Mall of Asia Complex, Pasay City",
  locationNote: "Published address: Seaside Boulevard, corner Sunrise Drive, Mall of Asia Complex, Pasay City. Ask JMG about the specific tower, floor, unit and current availability.",
  importedAt: shore3ImportedDate,
  priceLabel: "Published list price",
  priceNote: "Source pricing dated 24 October 2025. This is a list price, not the total amount payable. Discounts, VAT, other charges, payment terms and current availability must be confirmed with JMG.",
};
export const shore3Properties: Property[] = [
  {
    ...common,
    id: "shore-3-1-bedroom-balcony",
    title: "1 Bedroom + Balcony",
    price: 10172000,
    priceText: "₱10,172,000",
    bedrooms: 1,
    bathrooms: 1,
    floorArea: "32.16 sqm",
    image: "/images/properties/shore-3/originals/821-display.webp",
    imageAlt: "One-bedroom show-unit marketing illustration published on the Shore 3 reference website",
    imageCaption: "Show-unit marketing illustration from shore3residences.com. Furnishings are illustrative; confirm the actual unit and inclusions.",
    gallery: ["/images/properties/shore-3/originals/821-3.webp"],
    description: "A one-bedroom condominium with a balcony at Shore 3 Residences in Pasay. The source price example lists 32.16 sqm and a Mall of Asia view. The published drawing shows one bedroom, a toilet and bath, and a balcony; the exact unit layout and view require confirmation.",
    features: ["1 bedroom with balcony", "Published unit area: 32.16 sqm", "Mall of Asia view in source price example"],
    sourceUrl: shore3Source + "/1-bedroom-balcony/",
  },
  {
    ...common,
    id: "shore-3-2-bedroom-balcony",
    title: "2 Bedroom + Balcony",
    price: 11306000,
    priceText: "₱11,306,000",
    bedrooms: 2,
    bathrooms: 1,
    floorArea: "37.94 sqm",
    image: "/images/properties/shore-3/originals/820-display.webp",
    imageAlt: "Two-bedroom show-unit marketing illustration published on the Shore 3 reference website",
    imageCaption: "Show-unit marketing illustration from shore3residences.com. The source also uses this image on its end-unit page; it is not evidence of a specific unit’s interior.",
    gallery: ["/images/properties/shore-3/originals/820-2-1.webp"],
    description: "A two-bedroom condominium with a balcony at Shore 3 Residences. The source price example lists 37.94 sqm and an amenity view. Its published layout includes two bedrooms and a toilet and bath, but does not print an area or dimensions; confirm the drawing applicable to the actual unit.",
    features: ["2 bedrooms with balcony", "Published unit area: 37.94 sqm", "Amenity view in source price example"],
    sourceUrl: shore3Source + "/2-bedroom-balcony/",
  },
  {
    ...common,
    id: "shore-3-2-bedroom-end-balcony",
    title: "2 Bedroom End + Balcony",
    price: 17296000,
    priceText: "₱17,296,000",
    bedrooms: 2,
    floorArea: "58.73 sqm",
    image: "/images/properties/shore-3/originals/820-display.webp",
    imageAlt: "Shared two-bedroom show-unit illustration used on the source’s Shore 3 end-unit page",
    imageCaption: "Shared two-bedroom marketing illustration from the source end-unit page. A distinct end-unit interior and floor plan are not separately identified.",
    gallery: ["/images/properties/shore-3/originals/820-2-1.webp"],
    description: "The end-unit type in the Shore 3 pricing catalog lists two bedrooms, a balcony, 58.73 sqm and an amenity view. The source repeats the standard two-bedroom image and drawing on this page. A distinct end-unit layout, bathroom count and current unit specifications require confirmation with JMG.",
    features: ["2-bedroom end-unit type with balcony", "Published unit area: 58.73 sqm", "Amenity view in source price example", "Distinct end-unit layout: request confirmation"],
    sourceUrl: shore3Source + "/2-bedroom-end-balcony/",
  },
];
