import type { Development, Property } from "./content";
import type { OfficialModelImage, OfficialModelMedia } from "./amaresa-media";
import assets from "./vine-assets.json";

export const vineSource = "https://vineresidences.com";
export const vineDeveloperSource = "https://smdc.com/properties/vine-residences/";
export const vineImages = assets.images as Record<string, OfficialModelImage>;
export const vineAmenities = ["Adult lounge pools", "Children’s splash pool", "Children’s play zone", "Sunken gardens", "Eco / jogging trail", "Basketball / volleyball court", "Lounge pods", "Camp hill site"];
export const vineDevelopment: Development = {
  id:"vine-residences", name:"Vine Residences", area:"Metro Manila", city:"Quezon City", locality:"San Bartolome / Novaliches", type:"Condominium",
  image:vineImages["392"].displaySrc!, imageAlt:"Vine Residences exterior architectural rendering",
  imageCaption:"Publisher exterior architectural rendering. This design perspective does not establish current construction, access or available units.",
  description:"An SMDC condominium community within the SM City Novaliches complex in Barangay San Bartolome, Quezon City. Explore three source unit presentations, original layout drawings and a separate guide to shared amenities.",
  amenities:vineAmenities, sourceUrl:vineSource+"/", sourceName:"vineresidences.com / SMDC",
};
const common = {
  area:"Metro Manila", city:"Quezon City", locality:"San Bartolome / Novaliches", developmentId:vineDevelopment.id, type:"Condominium", bedrooms:2,
  amenities:vineAmenities, importedAt:"2026-10-13", sourceName:"vineresidences.com", sourceLocation:"SM City Novaliches complex, Brgy. San Bartolome, Quezon City",
  locationNote:"Published project location: SM City Novaliches complex, Barangay San Bartolome, Novaliches, Quezon City. Confirm the actual tower, floor, orientation and available unit with JMG.",
};
export const vineProperties: Property[] = [
  {...common,id:"vine-flexi-suite",title:"Flexi Suite",price:3884000,priceText:"₱3,884,000",priceLabel:"Published list-price example",priceDate:"5 Aug 2025",bathrooms:1,
    floorArea:"29.65 / 29.98 sqm · source conflict",specificationNote:"The Flexi card states 29.98 sqm and ₱3.6M; its drawing and dated calculator use a 29.65 sqm 2-bedroom unit. Confirm the offered configuration.",
    priceNote:"The Flexi page’s 5 August 2025 calculator identifies a 2 BR, 29.65 sqm amenity-view example at ₱3,884,000. Its undated card advertises ₱3.6M. These different price bases are not current quotations.",
    image:vineImages["386"].displaySrc!,imageAlt:"Vine dressed-up interior image shared by Flexi Suite and 2 Bedroom End pages",imageCaption:"Dressed-up marketing interior shared by the Flexi and End pages; it does not verify a distinct unit layout or included furniture.",gallery:[vineImages["386"].src],
    description:"The Flexi Suite page presents a furnished model interior and a two-bedroom drawing associated with approximately 29.65 sqm by its source filename. Its calculator uses that same 29.65 sqm example, while the model card says 29.98 sqm. The source drawing shows two bedrooms, a toilet and bath, and open living, dining and kitchen spaces. Confirm the actual configuration before choosing a unit.",
    features:["2-bedroom layout on the source drawing","One toilet & bath shown on the reference drawing","Living, dining and kitchen spaces","Card and drawing areas differ","Shared dressed-up interior; inclusions require confirmation"],sourceUrl:vineSource+"/flexi-suite/"},
  {...common,id:"vine-2-bedroom-end",title:"2 Bedroom End",price:4141000,priceText:"₱4,141,000",priceLabel:"Published list-price example",priceDate:"5 Aug 2025",
    floorArea:"31.62 sqm · computation example",specificationNote:"The End calculator uses 31.62 sqm, but its page repeats the 29.65 sqm standard drawing and Flexi interior. A distinct end-unit layout is unverified.",
    priceNote:"The End page’s 5 August 2025 calculator lists ₱4,141,000 for a 31.62 sqm amenity-view example. The undated model card advertises ₱3.8M; discounts and other charges use different bases.",
    image:vineImages["386"].displaySrc!,imageAlt:"Shared Vine dressed-up interior; distinct 31.62 sqm End unit imagery unverified",imageCaption:"The source End page repeats the Flexi dressed-up interior. This is shared design imagery, not proof of the 31.62 sqm end configuration.",gallery:[vineImages["386"].src],
    description:"The supplied End page lists a 31.62 sqm, two-bedroom example in its dated computation. It reuses the standard approximately 29.65 sqm drawing and the Flexi interior image. The 31.62 sqm end-specific drawing and bathroom specification remain unverified. Ask JMG for the exact plan and quotation for the offered unit.",
    features:["2-bedroom end type named by the source","31.62 sqm in the dated calculator","Shared standard 29.65 sqm plan; end geometry unverified","Undated advertised card: ₱3.8M","Exact unit drawing and inclusions require confirmation"],sourceUrl:vineSource+"/2-bedroom-end/"},
  {...common,id:"vine-2-bedroom-end-balcony",title:"2 Bedroom End with Balcony",price:null,priceText:"₱4.0M · advertised guide",priceLabel:"Undated advertised guide · confirm price",
    floorArea:"Approx. 31.45 sqm · source drawing",specificationNote:"The balcony page shows a 31.45 sqm standard balcony drawing, but its calculator names a 49.54 sqm loft at ₱6,248,000. That loft price is not assigned to this type.",
    priceNote:"The source index advertises ₱4.0M without an effective date or detailed matching computation. The page’s dated calculator instead describes a different 49.54 sqm loft. A verified current balcony quotation is needed; this guide is excluded from numeric budget matching.",
    image:vineImages["388"].displaySrc!,imageAlt:"Vine dressed-up interior published on the End with Balcony page",imageCaption:"Dressed-up marketing interior from the balcony page. It does not establish a distinct end-unit geometry, included furniture or current availability.",gallery:[vineImages["388"].src],
    description:"The source advertises a two-bedroom end type with balcony at ₱4.0M and 31.45 sqm. Its drawing is the standard two-bedroom balcony layout, not an explicitly identified end plan. The calculator on the same page describes a different 49.54 sqm loft. Keep that loft example separate and request an exact balcony/end plan and current price from JMG.",
    features:["2 Bedroom End with Balcony — source title","Standard balcony reference drawing: approximately 31.45 sqm","Undated advertised guide: ₱4.0M","Distinct end geometry remains unverified","49.54 sqm loft calculator is a different configuration"],sourceUrl:vineSource+"/2-bedroom-end-with-balcony/"},
];
function media(p:Property,photo:string,colored:string,original:string,description:string):OfficialModelMedia {
  return {modelId:p.id,sourceUrl:p.sourceUrl,publisher:"vineresidences.com",imageNoun:"images",galleryEyebrow:"VINE / DRESSED-UP MODEL INTERIOR",galleryHeading:"A furnished design reference.",galleryDescription:"Marketing imagery published on this source page. Shared images are labeled; furniture and finishes do not establish turnover inclusions.",gallerySourceNote:"Dressed-up marketing interior",interiorImages:[vineImages[photo]],galleryDisclaimer:p.imageCaption,
    floorPlans:[{...vineImages[colored],label:"Published colored reference drawing",levels:["Unit layout"]},{...vineImages[original],label:"Original monochrome reference drawing",levels:["Unit layout"]}],floorPlanDescription:description,floorPlanSourceUrl:vineSource+"/floor-plans/",floorPlanSourceNote:"Original source files preserved with all labels and geometry. Area associations come from the source filenames and page headings; no numeric area or dimensions are printed in these unit drawings. These reference drawings do not certify a particular available unit. Confirm exact dimensions and inclusions with JMG.",limitations:[]};
}
export const vineMedia:Record<string,OfficialModelMedia> = {
  "vine-flexi-suite":media(vineProperties[0],"386","482","479","The model page’s colored drawing and floor-plan page’s monochrome drawing are associated with a standard approximately 29.65 sqm 2-bedroom unit by their source filenames. No numeric area or dimensions are printed inside these drawings. The Flexi card says 29.98 sqm; confirm which configuration applies."),
  "vine-2-bedroom-end":media(vineProperties[1],"386","482","479","The End page repeats this standard approximately 29.65 sqm 2-bedroom drawing. Its calculator uses 31.62 sqm. A separate end-specific plan is not verified; these shared drawings are reference material."),
  "vine-2-bedroom-end-balcony":media(vineProperties[2],"388","483","480","The source drawing shows a standard approximately 31.45 sqm 2-bedroom unit with balcony. A distinct end-unit plan is unverified. The 49.54 sqm loft calculator on the page does not match this drawing."),
};
export function vineGallery(id:string,heading:string,description:string,ids:string[],sourceUrl=vineSource+"/"):OfficialModelMedia {
  return {modelId:id,sourceUrl,publisher:sourceUrl.includes("smdc.com") ? "SMDC" : "vineresidences.com",galleryId:id,galleryEyebrow:"VINE RESIDENCES / SOURCE GALLERY",galleryHeading:heading,galleryDescription:description,gallerySourceNote:"Published marketing material",imageNoun:"images",interiorImages:ids.map(key=>vineImages[key]),floorPlans:[],galleryDisclaimer:"Design presentations and dressed-up spaces may differ from current facilities, available units and included finishes.",limitations:[]};
}
