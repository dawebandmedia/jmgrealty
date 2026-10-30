import { areas, properties, propertyTours, services } from "./content";

export const inquiryChoices = [
  ...["Buying a Property", "Selling a Property", "Renting or Leasing", "Property Investment", "Property Inquiry", "Other / Not Sure Yet"].map(value => ({ value, label: value, service: "Real Estate Brokerage" })),
  ...services.map(service => ({ value: service.name, label: service.name, service: service.name })),
];

export const inquiryLocations = areas.map(area => ({
  area,
  cities: [...new Set([...properties, ...propertyTours].filter(p => p.area === area).map(p => p.city))].sort(),
}));

export const inquiryPropertyTypes = [
  { value: "House", label: "House and Lot" },
  { value: "Condominium", label: "Condominium" },
  { value: "Townhouse", label: "Townhouse" },
  { value: "Lot", label: "Lot Only" },
  { value: "Commercial", label: "Commercial Property" },
  ...[...new Set(properties.map(p => p.type))].filter(type => !["House & Lot", "Condominium", "Townhouse"].includes(type)).map(type => ({ value: type, label: type })),
  { value: "Other", label: "Other" },
];

export function inquiryGuidance(service: string) {
  switch (service) {
    case "Buying a Property": case "Property Matching":
      return { location: "Preferred location", budget: "Budget or price range", message: "Tell us more", placeholder: "Tell us about your preferred property, requirements, or questions.", hint: "An area, property type or budget can help us find options that fit." };
    case "Selling a Property": case "Property Marketing":
      return { location: "Property location", budget: "Asking price or price range", message: "Tell us about your property", placeholder: "Share the property location, type, features and what you would like help with.", hint: "Share what you can about the property you want to sell or market." };
    case "Renting or Leasing":
      return { location: "Preferred or property location", budget: "Monthly rental budget or asking rent", message: "Rental or leasing preferences", placeholder: "Are you looking to rent, or offering a property for lease? Share any preferences or questions.", hint: "Let us know whether you are looking to rent or offering a property for lease." };
    case "Property Investment":
      return { location: "Preferred investment location", budget: "Investment budget or price range", message: "Your investment interests", placeholder: "Share your preferred property, investment goals, timeframe, or questions.", hint: "You can share an area, budget or investment goal whenever you are ready." };
    case "Property Appraisal":
      return { location: "Property location", budget: "Price range, if known", message: "Appraisal needs", placeholder: "Tell us about the property and the purpose of the appraisal. Please do not include private documents.", hint: "A property location and the reason for the appraisal help us understand the next step." };
    default:
      return { location: "Preferred location", budget: "Budget or price range", message: "Tell us more", placeholder: "Tell us about your preferred property, requirements, or questions.", hint: "Share only what you know so far. We can discuss the rest together." };
  }
}
