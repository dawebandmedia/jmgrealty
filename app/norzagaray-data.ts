import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import assets from "./norzagaray-assets.json";

export const norzagaraySource = "https://apechomes.com/";
export const norzagarayImages = assets.images as Record<string, OfficialModelImage>;
export const norzagarayAmenities = ["Parks and playground", "Community facility", "Water facility"];
export const norzagarayDevelopment: Development = {
  id:"apec-homes-norzagaray",name:"APEC Homes Norzagaray",area:"Bulacan",city:"Norzagaray",locality:"Partida",type:"House & Lot",
  image:norzagarayImages["townhouse-sheet"].displaySrc!,imageAlt:"APEC Homes Norzagaray Townhouse 44 architectural perspective and model specifications",
  imageCaption:"Original model sheet from the supplied project profile. Architectural design reference; confirm current specifications and turnover inclusions.",
  description:"An APEC Homes project in Barangay Partida, Norzagaray, Bulacan, with four house-type references: Townhouse 44, its carport-provision variant, Duplex 45.50 and Single Attached 45.50. Explore the original model sheets and floor plans, with bare-type turnover references.",
  amenities:norzagarayAmenities,sourceUrl:norzagaraySource,sourceName:"APEC Homes / supplied Norzagaray project material",
};

type NorzagarayModel = {key:string;title:string;type:string;floor:number;lot?:string;min:number|null;max:number|null;priceDate?:string;carport?:string;priceScope:string;description:string};
export const norzagarayModels:NorzagarayModel[] = [
  {key:"townhouse",title:"Townhouse 44",type:"Townhouse",floor:44,lot:"36–96 sqm · dated examples",min:1641000,max:2856280,priceDate:"24–26 Aug 2026",
    priceScope:"Combined model-level TCP range from the 24 and 26 August 2026 references, including different selling phases and lot positions. The range is before historical promotional discounts and does not establish current offers.",
    description:"A 44 sqm, two-level townhouse reference with ground-floor living, dining and kitchen spaces and one toilet and bath. The model sheet describes provision for two bedrooms; the original plan and shared bare-turnover reference show an open upper floor."},
  {key:"carport",title:"Townhouse 44 with Carport Provision",type:"Townhouse",floor:44,lot:"57 sqm · dated example only",min:2233000,max:2233000,priceDate:"26 Aug 2026",carport:"Carport provision",
    priceScope:"One dated TCP example from 26 August 2026, before the historical promotional discount. It is not a minimum price for every carport variant or a statement of current availability.",
    description:"The carport-provision variant retains the profile’s 44 sqm floor area and adds a parking provision to the ground-floor layout. The model sheet describes provision for two bedrooms and one toilet and bath. Exact lot size and parking inclusions require confirmation."},
  {key:"duplex",title:"Duplex 45.50",type:"Duplex",floor:45.5,lot:"58–74 sqm · dated examples",min:2313085,max:2954445,priceDate:"26 Aug 2026",carport:"Carport provision",
    priceScope:"Model-level TCP range from the 26 August 2026 reference, before historical discounts. Different lot configurations contribute to the range; request a matching current quotation.",
    description:"A 45.50 sqm duplex design reference with living spaces and one toilet and bath below an open upper floor. The supplied model sheet describes provision for two bedrooms and a carport. Confirm the partitions, offered lot and current delivery package."},
  {key:"single-attached",title:"Single Attached 45.50",type:"Single Attached",floor:45.5,min:null,max:null,carport:"Carport provision",
    priceScope:"No matching Single Attached price was found in the supplied August price references. Request a current quotation; prices from other APEC developments are not substituted.",
    description:"A 45.50 sqm single-attached design reference with a ground-floor living area, kitchen and one toilet and bath. Its sheet describes provision for two bedrooms and a carport. The matching original drawing shows an open upper floor; exact lot area and price remain on inquiry."},
];
export function norzagarayPrice(model:NorzagarayModel) {
  if(model.min===null||model.max===null)return "Price on inquiry";
  const php=(v:number)=>new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",maximumFractionDigits:0}).format(v);
  return model.min===model.max?php(model.min):`${php(model.min)}–${php(model.max)}`;
}
export const norzagarayProperties:Property[] = norzagarayModels.map(m=>({
  id:"apec-norzagaray-"+m.key,title:m.title,area:"Bulacan",city:"Norzagaray",locality:"Partida",developmentId:norzagarayDevelopment.id,type:m.type,
  price:m.min,priceText:m.min===null?"Price on inquiry":m.min===m.max?`₱${(m.min/1000000).toFixed(3)}M`:`₱${(m.min/1000000).toFixed(3)}M–₱${(m.max!/1000000).toFixed(3)}M`,
  priceLabel:m.min===null?"Request a current quotation":m.min===m.max?"Historical TCP example · before discounts":"Historical TCP range · before discounts",priceDate:m.priceDate,priceNote:m.priceScope,
  bedroomText:"Provision for 2 bedrooms",bathrooms:1,storeys:2,floorArea:m.floor===44?"44 sqm":"45.50 sqm",lotArea:m.lot,carport:m.carport,
  specificationNote:"The profile describes provision for two bedrooms, while the bare-type plan shows an open upper floor. Finished bedroom partitions are not established as included. Confirm the exact layout, finishes and parking provision.",
  image:norzagarayImages[m.key+"-sheet"].displaySrc!,imageAlt:m.title+" architectural perspective and specifications from the supplied Norzagaray profile",
  imageCaption:"Original architectural model sheet. Furniture, landscaping and finished bedroom partitions are not established as turnover inclusions; confirm the current package.",gallery:[norzagarayImages[m.key+"-sheet"].displaySrc!],
  description:m.description,features:[`${m.floor} sqm floor area`,`Provision for 2 bedrooms · open upper-floor reference`,"1 toilet & bath","Two-level bare-type design",...(m.carport?["Carport provision"]:[]),"Confirm utility meters, lighting fixtures and landscaping inclusions"],amenities:norzagarayAmenities,
  sourceUrl:norzagaraySource,sourceName:"APEC Homes / supplied Norzagaray marketing profile",sourceLocation:"Barangay Partida, Norzagaray, Bulacan",
  locationNote:"Barangay Partida, Norzagaray, Bulacan. Confirm the project entrance, selected phase and viewing arrangements with JMG.",importedAt:"2026-10-15",
}));

export const norzagarayMedia:Record<string,OfficialModelMedia> = Object.fromEntries(norzagarayModels.map(m=>["apec-norzagaray-"+m.key,{
  modelId:"apec-norzagaray-"+m.key,sourceUrl:norzagaraySource,publisher:"APEC Homes / supplied Norzagaray project profile",imageNoun:"sheets",galleryId:"model-sheet",
  galleryEyebrow:"NORZAGARAY / ORIGINAL MODEL SHEET",galleryHeading:"The original model sheet.",
  galleryDescription:"The complete original model sheet shows the architectural perspective and published construction specifications. Select it to enlarge, zoom or open the original image.",
  gallerySourceNote:"Complete source model sheet",galleryDisclaimer:"Architectural design reference; confirm current plans, specifications and inclusions. The specification table excludes landscaping, utility meters and lighting fixtures, while the summary wording is broader. Request the current written turnover schedule.",
  interiorImages:[norzagarayImages[m.key+"-sheet"]],floorPlans:[norzagarayImages[m.key+"-plan"]],
  floorPlanDescription:"Original ground- and second-floor drawing for "+m.title+". The upper floor is shown open, with provision for bedrooms rather than verified finished partitions.",
  floorPlanSourceNote:"Original source artwork preserved with its complete labels, dimensions and proportions. The sheet is a model reference, not the approved plan of a specific offered lot. Confirm the matching plan and current specifications with JMG.",limitations:[],
} as OfficialModelMedia]));
export function norzagarayGallery(id:string,heading:string,description:string,keys:string[],noun="images"):OfficialModelMedia {
  return {modelId:id,galleryId:id,sourceUrl:norzagaraySource,publisher:"APEC Homes / supplied Norzagaray materials",imageNoun:noun,galleryEyebrow:"NORZAGARAY / PROJECT REFERENCES",galleryHeading:heading,galleryDescription:description,
    gallerySourceNote:"Supplied property reference",galleryDisclaimer:"Confirm current site conditions, access and delivery. Archived photographs do not establish present completion or turnover.",interiorImages:keys.map(k=>norzagarayImages[k]),floorPlans:[],limitations:[]};
}
