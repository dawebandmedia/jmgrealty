import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import content from "./eurotowers-content.json";

export type EuroModel = {
  id:string; title:string; area:number; areaText:string; bedrooms:number; bedroomText?:string; bathrooms:number;
  price:number|null; priceLabel:string; priceDate?:string; priceNote:string; specificationNote:string;
  description:string; features:string[]; heroKey:string; galleryKeys:string[]; planKeys:string[]; sheetKeys:string[];
  photoNote:string; planDescription:string; planNote:string; representativePlan:boolean;
};
export type EuroProject = {
  key:string; id:string; name:string; locality:string; address:string; sourceUrl:string; description:string;
  heroKey:string; mapKeys:string[]; amenityKeys:string[]; amenities:string[]; nearby:string[]; buildingFeatures:string[];
  overviewNote:string; pricingNotes:string[]; sourceNote:string; models:EuroModel[]; assets:Record<string,OfficialModelImage>;
};
export const eurotowersProjects:EuroProject[] = content.projects.map(d=>({
  ...d,
  models:d.models.map(m=>({...m,bedroomText:m.bedroomText||undefined,priceDate:m.priceDate||undefined})),
  assets:Object.fromEntries(Object.entries(d.assets).filter(([,asset])=>asset!==undefined)),
}));
export const eurotowersDevelopments:Development[] = eurotowersProjects.map(d=>({
  id:d.id,name:d.name,area:"Metro Manila",city:"Quezon City",locality:d.locality,type:"Condominium",
  image:d.assets[d.heroKey].displaySrc!,imageAlt:d.assets[d.heroKey].label,
  imageCaption:d.key==="milan"?"Developer exterior photograph. Confirm the current condition and availability of the selected unit.":"Architectural exterior perspective from the supplied project presentation. Illustrative image, not a current exterior photograph.",
  description:d.description,amenities:d.amenities,sourceUrl:d.sourceUrl,sourceName:"Euro Towers International Inc. / supplied project material",
}));
export function euroPrice(model:EuroModel) {
  return model.price===null?"Price on inquiry":new Intl.NumberFormat("en-PH",{style:"currency",currency:"PHP",minimumFractionDigits:model.price%1?2:0,maximumFractionDigits:2}).format(model.price);
}
export const eurotowersProperties:Property[] = eurotowersProjects.flatMap(d=>d.models.map(m=>({
  id:m.id,title:m.title,area:"Metro Manila",city:"Quezon City",locality:d.locality,developmentId:d.id,type:"Condominium",
  price:m.price,priceText:euroPrice(m),priceLabel:m.priceLabel,priceDate:m.priceDate,priceNote:m.priceNote,
  bedrooms:m.bedrooms,bedroomText:m.bedroomText,bathrooms:m.bathrooms,floorArea:`${m.area.toFixed(2)} sqm · approx. gross incl. balcony`,
  specificationNote:m.specificationNote,image:d.assets[m.heroKey].displaySrc!,imageAlt:d.assets[m.heroKey].label,
  imageCaption:m.photoNote,gallery:m.galleryKeys.map(k=>d.assets[k].displaySrc!),description:m.description,
  features:m.features,amenities:d.amenities,sourceUrl:d.sourceUrl,sourceName:"Euro Towers International Inc. / supplied project material",
  sourceLocation:d.address,locationNote:`${d.address}. Confirm the entrance and viewing arrangements with JMG Realty PH.`,importedAt:"2026-10-15",
})));
export const eurotowersMedia:Record<string,OfficialModelMedia> = Object.fromEntries(eurotowersProjects.flatMap(d=>d.models.map(m=>[m.id,{
  modelId:m.id,sourceUrl:d.sourceUrl,publisher:"Euro Towers International Inc. / supplied property references",
  galleryEyebrow:`${d.locality.toUpperCase()} / UNIT PHOTOGRAPHS`,galleryHeading:"Inside the unit.",
  galleryDescription:"Explore the supplied unit photographs and developer model imagery. Select an image to enlarge, zoom or view the original.",
  gallerySourceNote:"Unit-type photograph references",galleryDisclaimer:m.photoNote,imageNoun:"photographs",
  interiorImages:m.galleryKeys.map(k=>d.assets[k]),floorPlans:[...new Set([...m.planKeys,...m.sheetKeys])].map(k=>d.assets[k]),
  floorPlanHeading:m.representativePlan?"Representative unit layout.":"Original layouts & model sheets.",
  floorPlanDescription:m.planDescription,floorPlanSourceNote:m.planNote,limitations:[],
} as OfficialModelMedia])));
export function euroProjectGallery(d:EuroProject,id:string,heading:string,description:string,keys:string[],note:string):OfficialModelMedia {
  return {modelId:id,galleryId:id,sourceUrl:d.sourceUrl,publisher:"Euro Towers International Inc. / supplied project references",imageNoun:"images",
    galleryEyebrow:`${d.locality.toUpperCase()} / PROJECT IMAGERY`,galleryHeading:heading,galleryDescription:description,
    gallerySourceNote:"Selected original project imagery",galleryDisclaimer:note,interiorImages:keys.map(k=>d.assets[k]),floorPlans:[],limitations:[]};
}
