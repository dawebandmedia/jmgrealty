import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import assets from "./greenway-assets.json";

export type GreenwayPhase = 1 | 2;
export const greenwaySource = "https://apechomes.com/";
export const greenwayImages = assets.images as Record<string, OfficialModelImage>;
export const greenwayAmenities: Record<GreenwayPhase, string[]> = {
  1: ["Entrance gate and guardhouse", "Multipurpose hall / clubhouse", "Parks and playground", "Basketball court", "Water facility / elevated water tank", "Material recovery facility", "Concrete roads, curbs and gutters", "Underground drainage"],
  2: ["Entrance gate with guardhouse", "Multipurpose hall", "Basketball court", "Parks and playground", "Elevated water tank", "Curbs and gutters", "Concrete roads", "Underground drainage system", "Material recovery facility"],
};
export const greenwayDevelopments: Development[] = [
  {id:"greenway-place-phase-1",name:"Greenway Place Phase 1",area:"Bulacan",city:"Santa Maria",locality:"Caysio",type:"House & Lot",
    image:greenwayImages["p1-townhouse-exterior"].displaySrc!,imageAlt:"Greenway Place Phase 1 Townhouse 44 architectural rendering",
    imageCaption:"Phase 1 architectural rendering from the supplied marketing profile. Confirm the offered house, lot and turnover inclusions.",
    description:"An APEC Homes community in Barangay Caysio, Santa Maria, Bulacan, with four Phase 1 house-type references: two townhouse configurations, a duplex and a single-attached home. Explore the original bare-type plans and shared model-home styling.",
    amenities:greenwayAmenities[1],sourceUrl:greenwaySource,sourceName:"APEC Homes / supplied Phase 1 marketing material"},
  {id:"greenway-place-phase-2",name:"Greenway Place Phase 2",area:"Bulacan",city:"Santa Maria",locality:"Caysio",type:"House & Lot",
    image:greenwayImages["p2-model-specifications"].displaySrc!,imageAlt:"Greenway Place Phase 2 Townhouse 68 with Garage rendering and specifications",
    imageCaption:"Phase 2 model reference from the official profile dated 7 July 2026. Floor area is 56 sqm; the separately stated developable area is 68 sqm.",
    description:"The separate Phase 2 community in Caysio, Santa Maria, Bulacan presents Townhouse 68 with Garage. Its July 2026 profile specifies three bedrooms, 56 sqm of floor area and a separate 68 sqm developable area.",
    amenities:greenwayAmenities[2],sourceUrl:greenwaySource,sourceName:"APEC Homes / supplied Phase 2 profile"},
];

type GreenwayModel = {
  phase:GreenwayPhase; id:string; title:string; type:string; floor:number; lot:string;
  observedLots:string; min:number; max:number; exterior:string; plan:string; carport?:string;
  bedrooms?:number; bedroomText?:string; developable?:number; note:string; description:string; features:string[];
};
export const greenwayModels:GreenwayModel[] = [
  {phase:1,id:"greenway-phase-1-townhouse-44",title:"Townhouse 44",type:"Townhouse",floor:44,lot:"36–119 sqm · model guide",observedLots:"36–116 sqm",min:1649395.65,max:3388972.83,exterior:"p1-townhouse-exterior",plan:"p1-townhouse-plan",bedroomText:"Open upper floor",
    note:"The original bare-type drawing shows an open upper floor. Bedroom divisions and furnished styling are not established as turnover inclusions; confirm bedroom provision with JMG.",
    description:"A two-level townhouse reference with living and dining spaces, a kitchen area and one toilet and bath below an open upper floor. Its published model-guide lot range is 36–119 sqm. The dated price range includes different lot positions and sizes.",
    features:["44 sqm floor area","Open upper-floor layout","Living, dining and kitchen spaces","One toilet & bath","Bare-type reference; confirm bedroom provision"]},
  {phase:1,id:"greenway-phase-1-townhouse-44-carport",title:"Townhouse 44 with Carport Provision",type:"Townhouse",floor:44,lot:"48–132 sqm · model guide",observedLots:"48–72 sqm",min:1970875.62,max:2647647.48,exterior:"p1-carport-exterior",plan:"p1-carport-plan",carport:"Carport provision",bedroomText:"Open upper floor",
    note:"The plan shows carport provision and an open upper floor. The model-guide lot range is wider than the lots represented in the July price guide; request a matching lot and plan.",
    description:"The carport-provision townhouse keeps the 44 sqm floor-area reference while adding a dedicated parking provision to the layout. Its model sheet lists 48–132 sqm lots and an open upper floor. Bedroom configuration and turnover details require confirmation.",
    features:["44 sqm floor area","Carport provision","Open upper-floor layout","One toilet & bath","Confirm partitioning and parking inclusions"]},
  {phase:1,id:"greenway-phase-1-duplex-45-50",title:"Duplex 45.50",type:"Duplex",floor:45.5,lot:"58.50–100 sqm · model guide",observedLots:"69–94 sqm",min:3002129.25,max:3522691.87,exterior:"p1-duplex-exterior",plan:"p1-duplex-plan",carport:"Garage in priced reference",bedroomText:"Open upper floor",
    note:"The July price summary names “Duplex with Garage” and represents a limited set of lot sizes. The generic model sheet lists 58.50–100 sqm lots and an open upper floor. Confirm the applicable garage configuration.",
    description:"A 45.50 sqm duplex reference arranged over two levels, with ground-floor living spaces and an open upper floor in the bare-type plan. The price guide applies to the duplex-with-garage reference; exact lot size, bedroom provision and parking require confirmation.",
    features:["45.50 sqm floor area","Duplex layout","Open upper-floor reference","One toilet & bath","Garage variant in the dated price guide"]},
  {phase:1,id:"greenway-phase-1-single-attached-45-50",title:"Single Attached 45.50",type:"Single Attached",floor:45.5,lot:"65–108 sqm · model guide",observedLots:"65–68 sqm",min:2742870.32,max:3098144.61,exterior:"p1-single-exterior",plan:"p1-single-plan",bedroomText:"Open upper floor",
    note:"The generic model sheet lists 65–108 sqm lots. The July price guide represents only 65–68 sqm examples. Its open upper-floor plan does not establish finished bedrooms.",
    description:"The single-attached model provides a 45.50 sqm, two-level reference on lots within the published 65–108 sqm model-guide range. Living spaces and a toilet and bath sit below an open upper floor. Explore the original drawing, then confirm the offered configuration.",
    features:["45.50 sqm floor area","Single-attached reference","Open upper-floor layout","One toilet & bath","Exact lot and bedroom provision require confirmation"]},
  {phase:2,id:"greenway-phase-2-townhouse-68-garage",title:"Townhouse 68 with Garage",type:"Townhouse",floor:56,developable:68,lot:"From 50 sqm · confirm exact lot",observedLots:"50–161 sqm",min:2509000,max:5583460,exterior:"p2-model-specifications",plan:"p2-floor-plan",carport:"Garage",bedrooms:3,
    note:"The official 7 July 2026 profile states 56 sqm FLOOR AREA and 68 sqm DEVELOPABLE AREA. The model name “Townhouse 68” does not mean 68 sqm of delivered floor area. Inner, end and corner are lot-position variants of this one model.",
    description:"Phase 2’s Townhouse 68 with Garage is a three-bedroom reference with one toilet and bath. Its official profile states 56 sqm floor area and a separate 68 sqm developable area. The July price guide spans 50–161 sqm lots, including larger end and corner configurations.",
    features:["56 sqm provided floor area","68 sqm developable area — separate measure","3 bedrooms in the official profile","One toilet & bath","Garage","Source exclusions include landscaping, utility meters and lighting fixtures; confirm current inclusions"]},
];
export const greenwayExactPrice = (m:GreenwayModel) => {
  const format=new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",minimumFractionDigits:m.phase===1?2:0,maximumFractionDigits:m.phase===1?2:0});
  return `${format.format(m.min)}–${format.format(m.max)}`;
};
export const greenwayProperties:Property[] = greenwayModels.map(m => ({
  id:m.id,title:m.title,area:"Bulacan",city:"Santa Maria",locality:"Caysio",developmentId:`greenway-place-phase-${m.phase}`,type:m.type,
  price:m.min,priceText:`₱${(m.min/1000000).toFixed(3)}M–₱${(m.max/1000000).toFixed(3)}M`,priceLabel:"Historical TCP range · before discounts",priceDate:m.phase===1?"13 Jul 2026":"Jul 2026",
  priceNote:"Anonymous model-level TCP guide from the supplied July 2026 summary, before promotional discounts. Larger end/corner lots can raise the upper bound. Default starting-price matching uses the lower bound; current terms and the final charges breakdown require confirmation.",
  bedrooms:m.bedrooms,bedroomText:m.bedroomText,bathrooms:1,storeys:2,floorArea:`${m.floor.toFixed(m.floor===45.5?2:0)} sqm${m.phase===2?" · provided floor area":""}`,lotArea:m.lot,carport:m.carport,specificationNote:m.note,
  image:greenwayImages[m.exterior].displaySrc!,imageAlt:`${m.title} — Phase ${m.phase} architectural rendering / source model sheet`,
  imageCaption:m.phase===1?"Original Phase 1 architectural rendering. Furnishings and completed bedroom divisions are not established as bare-turnover inclusions.":"Official Phase 2 model rendering and specifications, 7 July 2026. Floor area: 56 sqm; developable area: 68 sqm. Confirm exact turnover inclusions.",
  gallery:[greenwayImages[m.exterior].displaySrc!],description:m.description,features:m.features,amenities:greenwayAmenities[m.phase],sourceUrl:greenwaySource,sourceName:`APEC Homes / supplied Phase ${m.phase} marketing material`,
  sourceLocation:"Barangay Caysio, Santa Maria, Bulacan",locationNote:`Greenway Place Phase ${m.phase}, Barangay Caysio, Santa Maria, Bulacan. Confirm the phase entrance, exact lot and route with JMG before a viewing.`,importedAt:"2026-10-15",
}));

const sharedInteriorKeys=Array.from({length:11},(_,i)=>`p1-interior-${String(i+1).padStart(2,"0")}`);
export const greenwayMedia:Record<string,OfficialModelMedia> = Object.fromEntries(greenwayModels.map(m => [m.id,{
  modelId:m.id,sourceUrl:greenwaySource,publisher:`APEC Homes / supplied Phase ${m.phase} material`,imageNoun:m.phase===1?"photographs":"sheet",
  galleryEyebrow:m.phase===1?"PHASE 1 / SHARED DRESSED-UP MODEL HOME":"PHASE 2 / OFFICIAL MODEL PROFILE",
  galleryHeading:m.phase===1?"A shared styling reference.":"The Phase 2 design reference.",
  galleryDescription:m.phase===1?"Decorated model-home photographs from the Phase 1 package. Nine files are archived as 11 August 2025; two collages are undated. A specific house-type association is unverified.":"The official profile dated 7 July 2026 includes the model’s architectural perspective and construction specifications. No Phase 2 interior photographs were supplied.",
  gallerySourceNote:m.phase===1?"Shared illustrative model-home photographs":"Official Phase 2 profile sheet",
  galleryDisclaimer:m.phase===1?"Decorations, furniture and bedroom partitions illustrate styling; they are not evidence of furnished or partitioned bare turnover.":"The image is an architectural rendering. Confirm current specifications and inclusions for the offered property.",
  interiorImages:m.phase===1?sharedInteriorKeys.map(k=>greenwayImages[k]):[greenwayImages[m.exterior]],floorPlans:[greenwayImages[m.plan]],
  floorPlanDescription:m.note,
  floorPlanSourceNote:`Original Phase ${m.phase} ground- and second-floor drawing retained with all dimensions, labels, geometry and proportions. ${m.phase===1?"The upper floor is shown as an open bare space; a numeric completed-bedroom count is not assigned.":"The profile confirms three bedrooms, 56 sqm floor area and 68 sqm developable area as different measures."} Confirm the applicable layout and offered lot with JMG.`,limitations:[],
} as OfficialModelMedia]));

export function greenwayGallery(phase:GreenwayPhase,id:string,heading:string,description:string,keys:string[],noun="images"):OfficialModelMedia {
  return {modelId:id,galleryId:id,sourceUrl:greenwaySource,publisher:`APEC Homes / supplied Phase ${phase} material`,imageNoun:noun,galleryEyebrow:`GREENWAY PLACE / PHASE ${phase}`,galleryHeading:heading,galleryDescription:description,gallerySourceNote:"Supplied phase-specific marketing reference",galleryDisclaimer:"Check the published date and source context. Current design, access, operation and inclusions require confirmation.",interiorImages:keys.map(k=>greenwayImages[k]),floorPlans:[],limitations:[]};
}
