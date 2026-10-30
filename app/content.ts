// Edit this file to update company information and publish verified listings,
// team profiles and testimonials. Empty collections stay out of the public site.
export const company = {
  name: "JMG Realty PH",
  tagline:
    "Your Trusted Partner in Real Estate Brokerage, Property Appraisal & Investment Solutions.",
  about:
    "JMG Realty PH is a real estate company dedicated to helping clients buy, sell, invest in, and appraise properties. We provide professional guidance throughout the property buying and selling process while delivering honest, reliable, and customer-focused service.",
  email: "jmgrealtyph@gmail.com",
  primaryPhone: "0933 566 1347",
  secondaryPhone: "0967 521 8935",
  primaryTel: "+639335661347",
  secondaryTel: "+639675218935",
  hours: "Monday–Saturday, 8:00 AM–5:00 PM (GMT+8)",
  address: "",
  socialLinks: [] as { label: string; url: string }[],
};
export const areas = [
  "Metro Manila",
  "Bulacan",
  "Pampanga",
  "Tarlac",
  "Cavite",
  "Rizal",
  "Batangas",
  "Quezon",
];
export const services = [
  {
    id: "brokerage",
    number: "01",
    name: "Real Estate Brokerage",
    short: "The next chapter starts with the right property.",
    description:
      "Assistance in buying, selling, and marketing residential, commercial, and investment properties.",
    detail:
      "Tell us what you want to buy or sell. JMG Realty PH can help you explore options and understand the steps involved in your property transaction.",
    items: [
      "Buying and selling guidance",
      "Residential and commercial properties",
      "Investment property inquiries",
    ],
  },
  {
    id: "appraisal",
    number: "02",
    name: "Property Appraisal",
    short: "Know your property's value. Plan your next move.",
    description:
      "Property valuation inquiries with Maricel Gacutan (Broker Cel), PRC Licensed Real Estate Appraiser, License No. 0014262. Confirm the engagement scope and requirements with JMG.",
    detail:
      "Start by sharing the property's location, type and the purpose of your appraisal. Our team will discuss the appropriate scope, required information and next steps with you.",
    items: [
      "Property valuation inquiries",
      "Scope and document guidance",
      "Appraisal for informed decisions",
    ],
  },
  {
    id: "marketing",
    number: "03",
    name: "Property Marketing",
    short: "Give your property the attention it deserves.",
    description:
      "Marketing strategies designed to connect property owners with qualified buyers and investors.",
    detail:
      "Share your property details and goals. We can discuss how to present your property and connect with people looking for the right opportunity.",
    items: [
      "Property presentation",
      "Marketing strategy guidance",
      "Buyer and investor connections",
    ],
  },
  {
    id: "documentation",
    number: "04",
    name: "Documentation Assistance",
    short: "Clarity through every step of the paperwork.",
    description:
      "Guidance in preparing and processing real estate documents, ownership transfers, and other required paperwork.",
    detail:
      "Tell us where you are in the process. JMG Realty PH will help you identify the documents and steps relevant to your transaction.",
    items: [
      "Document preparation guidance",
      "Ownership transfer assistance",
      "Transaction paperwork support",
    ],
  },
  {
    id: "matching",
    number: "05",
    name: "Property Matching",
    short: "A property that fits the life you have in mind.",
    description:
      "Helping clients find properties that match their preferred location, budget, lifestyle, and investment goals.",
    detail:
      "Tell us your preferred area, property type, budget and priorities. We will use that information to guide your property search.",
    items: [
      "Location and budget preferences",
      "Lifestyle and space priorities",
      "Investment goal matching",
    ],
  },
  {
    id: "training",
    number: "06",
    name: "Training & Mentoring",
    short: "Build your path in real estate.",
    description:
      "Training and guidance for aspiring real estate salespersons and individuals interested in the real estate industry.",
    detail:
      "Explore the industry with professional guidance. Contact us to discuss training, mentoring and opportunities to join JMG Realty PH.",
    items: [
      "Aspiring salesperson guidance",
      "Real estate industry learning",
      "Training and mentoring inquiries",
    ],
  },
];
export type Property = {
  id: string;
  title: string;
  area: string;
  city: string;
  locality: string;
  developmentId: string;
  type: string;
  price: number | null;
  priceText: string;
  bedrooms?: number;
  bedroomText?: string;
  storeys?: number;
  region?: string;
  bathrooms?: number;
  lotArea?: string;
  floorArea?: string;
  carport?: string;
  badge?: string;
  image: string;
  imageAlt: string;
  imageCaption: string;
  gallery: string[];
  description: string;
  features: string[];
  amenities: string[];
  sourceUrl: string;
  sourceLocation: string;
  locationNote?: string;
  importedAt: string;
  sourceName?: string;
  priceLabel?: string;
  priceNote?: string;
  priceDate?: string;
  specificationNote?: string;
};
export type Development = {
  id: string;
  name: string;
  area: string;
  city: string;
  locality: string;
  image: string;
  imageAlt: string;
  description: string;
  amenities: string[];
  sourceUrl: string;
  sourceName?: string;
  type?: string;
  imageCaption?: string;
  region?: string;
};
export type PropertyTour = {
  id: string;
  title: string;
  developmentId: string;
  development: string;
  area: string;
  city: string;
  url: string;
  description: string;
  date: string;
  sourceUrl: string;
};
export { properties, developments, propertyTours } from "./property-data";
export const team: {
  name: string;
  role: string;
  credentials: string;
  photo?: string;
}[] = [];
export const testimonials: { name: string; quote: string; context: string }[] =
  [];
export const faqs = [
  { q: "Are the displayed prices current quotations?", a: "Pricing may change at any time. Contact JMG Realty PH for current prices. Each listing labels its price basis and source date when available. Historical samples, expired quotations and undated guides do not establish a current offer or available unit." },
  { q: "What should I confirm before comparing prices?", a: "Request a written quotation for the exact configuration. Ask whether VAT, transfer charges, parking, move-in fees, financing charges and other costs are included. A model range can cover different lots, sizes or unit positions." },
  { q: "Do the photographs and plans show the exact unit I will buy?", a: "Some images show model homes, shared interiors or architectural renderings. Representative and conflicting layouts are labeled. Request the matching measured plan, actual-unit details and written turnover inclusions before deciding." },
  { q: "Is my viewing confirmed when I send the form?", a: "No. The form saves a viewing request. JMG will contact you to confirm property access, availability and the final schedule. You can also call or message the contact people listed on the Contact page." },
  { q: "Does the result count show available inventory?", a: "The catalog counts house models and advertised unit categories. It does not show live inventory or guarantee an available unit. Prices and availability must be confirmed with JMG." },
  {
    q: "How do I start looking for a property?",
    a: "Share your preferred location, budget, property type and must-have features. JMG Realty PH can help you explore options that match your priorities.",
  },
  {
    q: "Can JMG Realty PH help me sell my property?",
    a: "Yes. We provide brokerage and property marketing assistance. Send your property's location, type and available details so we can discuss the next steps.",
  },
  {
    q: "How do I request a property appraisal?",
    a: "Send us the property's location, type and the purpose of the appraisal. Our team will discuss the scope, required documents, fees and availability before you proceed.",
  },
  {
    q: "Which locations do you serve?",
    a: "We currently serve Metro Manila, Bulacan, Pampanga, Tarlac, Cavite, Rizal, Batangas and Quezon. Contact us to ask about a property outside these areas.",
  },
  {
    q: "Can beginners apply to join the team?",
    a: "Aspiring real estate salespersons and experienced professionals can express interest. Tell us your background and goals so we can discuss suitable opportunities, requirements and training.",
  },
  {
    q: "How can I reach your team?",
    a: "Contact Broker Cel at 0933 566 1347 or 0967 521 8935, or Home Empire PH at +63 967 426 9838. Our Contact page lists their Viber, WhatsApp and public profiles. You can also email jmgrealtyph@gmail.com or send an inquiry. Office hours are Monday to Saturday, 8:00 AM to 5:00 PM, GMT+8.",
  },
];
