import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import assets from "./uhome-assets.json";

export const uhomeSource = "https://universityhome.com.ph/uhome-leon-guinto/";
export const uhomeBrokerSource = "https://www.investateph.com/property/uhome-leon-guinto-condo-near-lasalle-taft-manila/";
export const uhomeImages = assets.images as Record<string, OfficialModelImage>;
export const uhomeAddress = "2370 Leon Guinto Street, corner J.B. Roxas Street, Malate, Manila";
export const uhomeAmenities = ["Rooftop swimming pool", "Pool deck, lawn and gazebos", "Study hall", "Fitness gym", "Game room", "Reception / lobby lounge", "Entrance and elevator lobby"];
export const uhomeDevelopment: Development = {
  id: "uhome-leon-guinto", name: "UHome Leon Guinto", area: "Metro Manila", city: "Manila", locality: "Malate", type: "Condominium",
  image: uhomeImages.tower.displaySrc!, imageAlt: "UHome Leon Guinto tower architectural rendering from the official project gallery",
  imageCaption: "Official Leon Guinto architectural perspective. Current construction, occupancy and turnover require confirmation.",
  description: "University Home Leon Guinto in Malate, Manila brings together residential condominium and managed condormitel concepts near DLSU, Benilde and St. Scholastica’s College. Explore five advertised sales categories, project renderings and planned amenities.",
  amenities: uhomeAmenities, sourceUrl: uhomeSource, sourceName: "University Home / UHome and project-specific broker references",
};

type UHomeCategory = { key:string; title:string; bedrooms?:number; bedroomText?:string; levels?:number; image:string; keys:string[]; description:string; areaNote:string; mediaNote:string; features:string[] };
const sharedResidential = ["shared-residential-1", "shared-residential-2", "shared-residential-3"];
const sharedLofts = ["loft-1", "loft-2", "loft-3", "loft-4", "loft-5"];
export const uhomeCategories: UHomeCategory[] = [
  {key:"studio",title:"Studio Residential",bedrooms:0,bedroomText:"Studio · open layout",levels:1,image:"tower",keys:sharedResidential,
    description:"An advertised studio residential category for an open living and sleeping arrangement. Exact Leon Guinto sales dimensions, bathroom layout and balcony options require the selected unit’s developer documents.",
    areaNote:"Exact studio sales area is unverified. The shared booking-room figure of 22.9 sqm is not used as a Leon Guinto studio sales specification.",
    mediaNote:"These official Leon Guinto residential perspectives illustrate the project’s design. Their exact sales category and layout are unconfirmed; they are not verified studio interiors.",
    features:["Advertised studio residential category","Exact area and bathroom layout on inquiry","Confirm balcony variant and turnover inclusions"]},
  {key:"one-bedroom",title:"One-Bedroom Residential",bedrooms:1,levels:1,image:"one-bedroom-2",keys:["one-bedroom-1","one-bedroom-2"],
    description:"The one-bedroom residential family has two broker-hosted architectural perspectives. Ask JMG for the measured layout, selected unit’s area and current finish schedule before comparing individual configurations.",
    areaNote:"The broker’s floor-group area table mixes sizes and does not verify each area as a one-bedroom layout. A separate 30.03 sqm, six-bed listing is a specific secondary example, not a universal model specification.",
    mediaNote:"Project-specific one-bedroom perspectives from Investate Realty. Furniture and finishes are illustrative; the images are not measured unit plans or completed-unit photographs.",
    features:["One-bedroom residential family","Balcony variants advertised; confirm exact layout","Measured area and delivery specifications on inquiry"]},
  {key:"bi-level-loft",title:"Bi-Level Loft",bedroomText:"Layout on inquiry",levels:2,image:"loft-1",keys:sharedLofts,
    description:"An advertised two-level residential loft category. Its living and upper-level arrangement should be checked against the developer’s matching plans; bedroom counts and exact area are unconfirmed.",
    areaNote:"Secondary broker size groups: 31–33 sqm, 36.48 sqm and 42–48 sqm, including balcony for some variants. These are separate advertised groups, not a verified continuous area range or measured sales schedule.",
    mediaNote:"Shared residential loft perspectives from the broker gallery. A specific two- versus three-level layout and size cannot be assigned to any individual rendering.",
    features:["Two levels advertised by the project broker","Exact bedroom count and area on inquiry","Confirm balcony basis and floor-by-floor plan"]},
  {key:"tri-level-loft",title:"Tri-Level Loft",bedroomText:"Layout on inquiry",levels:3,image:"loft-4",keys:sharedLofts,
    description:"An advertised three-level residential loft category. Explore the shared loft design perspectives, then request the matching floor-by-floor plans and quotation for the selected configuration.",
    areaNote:"Secondary broker size groups: 41–42 sqm, 47 sqm and 60 sqm, including balcony for some variants. Exact internal, loft and balcony areas remain unverified.",
    mediaNote:"Shared residential loft perspectives from the broker gallery. These are not verified tri-level-specific images, and none establishes the number of bedrooms or exact area.",
    features:["Three levels advertised by the project broker","Exact bedroom count and area on inquiry","Matching floor-by-floor plans required"]},
  {key:"condormitel",title:"Condormitel",bedroomText:"Room layout on inquiry",image:"tower",keys:sharedResidential,
    description:"A managed condominium, dormitory and hotel accommodation concept. Management terms, furnishing, leasing arrangements and permitted use depend on the purchase and management agreements for the selected unit.",
    areaNote:"Secondary marketing advertises four-, six- and eight-bed capacity options. Bed capacity is not bedroom count, and no common floor area is assigned to these options.",
    mediaNote:"Official Leon Guinto residential perspectives provide project context only. They are not confirmed condormitel configurations. Shared booking-room photographs from other branch pages are excluded.",
    features:["Managed condormitel concept","4 / 6 / 8 beds advertised in secondary marketing; confirm capacity","Confirm management agreement and furnishing","Rental proceeds and occupancy are not guaranteed"]},
];

export const uhomeProperties: Property[] = uhomeCategories.map(c => ({
  id: "uhome-leon-guinto-"+c.key, title:c.title, area:"Metro Manila", city:"Manila", locality:"Malate", developmentId:uhomeDevelopment.id, type:"Condominium",
  price:null, priceText:"Price on inquiry", priceLabel:"Request a current quotation", priceNote:"No current official total selling-price schedule was supplied or found in the reviewed project pages. Undated broker asking prices are not used as model-wide prices.",
  bedrooms:c.bedrooms, bedroomText:c.bedroomText, storeys:c.levels, specificationNote:c.areaNote,
  image:uhomeImages[c.image].displaySrc!, imageAlt:c.title+" — UHome Leon Guinto architectural design reference",
  imageCaption:c.image==="tower"?"Official Leon Guinto tower rendering, used as project context because category-specific imagery is unverified.":c.key.includes("loft")?"Shared broker-hosted loft rendering. The exact two- or three-level model and area are unverified.":"Broker-hosted one-bedroom architectural perspective. Furnishings and finishes require confirmation.",
  gallery:[uhomeImages[c.image].displaySrc!], description:c.description, features:c.features, amenities:uhomeAmenities, sourceUrl:uhomeSource,
  sourceName:"University Home / UHome; project-specific broker references", sourceLocation:uhomeAddress,
  locationNote:uhomeAddress+". Confirm the building entrance and viewing arrangements with JMG.", importedAt:"2026-10-15",
}));

export const uhomeMedia:Record<string,OfficialModelMedia> = Object.fromEntries(uhomeCategories.map(c => ["uhome-leon-guinto-"+c.key, {
  modelId:"uhome-leon-guinto-"+c.key,sourceUrl:c.key==="studio"||c.key==="condormitel"?"https://universityhome.com.ph/uhome-leon-guinto-gallery/":uhomeBrokerSource,
  publisher:c.key==="studio"||c.key==="condormitel"?"University Home official project gallery":"Investate Realty / project broker reference",
  imageNoun:"renderings",galleryEyebrow:"UHOME / ARCHITECTURAL DESIGN REFERENCES",galleryHeading:c.key.includes("loft")?"Shared loft design perspectives.":c.key==="one-bedroom"?"One-bedroom design perspectives.":"Project design perspectives.",
  galleryDescription:c.mediaNote,gallerySourceNote:"Architectural renderings; model association limits stated above",galleryDisclaimer:"Design illustrations do not establish completed-unit finishes, exact geometry or furniture inclusions. Confirm the chosen layout and current turnover package.",
  interiorImages:c.keys.map(k=>uhomeImages[k]),floorPlans:[],limitations:[],
} as OfficialModelMedia]));

export function uhomeGallery(id:string, heading:string, description:string, keys:string[]):OfficialModelMedia {
  return {modelId:id,galleryId:id,sourceUrl:uhomeBrokerSource,publisher:"UHome / Investate Realty project references",imageNoun:"renderings",galleryEyebrow:"UHOME / PROJECT DESIGN REFERENCES",galleryHeading:heading,galleryDescription:description,
    gallerySourceNote:"Original source artwork preserved",galleryDisclaimer:"Architectural perspectives show advertised designs; current completion, access and delivery require confirmation.",interiorImages:keys.map(k=>uhomeImages[k]),floorPlans:[],limitations:[]};
}
