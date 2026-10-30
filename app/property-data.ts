// Imported from the user-owned BrokerCel website on 11 October 2026.
// Edit these records to update listings. Prices are null when not published.
import type { Property, Development, PropertyTour } from "./content";
import { shore3Development, shore3Properties } from "./shore3-data";
import { glamDevelopment, glamProperties } from "./glam-data";
import { alegriaDevelopment, alegriaProperties } from "./alegria-data";
import { vineDevelopment, vineProperties } from "./vine-data";
import { hillDevelopment, hillProperties } from "./hill-data";
import { nilaDevelopment, nilaProperties } from "./nila-data";
import { lanelloDevelopment, lanelloProperties } from "./lanello-data";
import { greenwayDevelopments, greenwayProperties } from "./greenway-data";
import { uhomeDevelopment, uhomeProperties } from "./uhome-data";
import { pacifictownDevelopment, pacifictownProperties } from "./pacifictown-data";
import { norzagarayDevelopment, norzagarayProperties } from "./norzagaray-data";
import { eurotowersDevelopments, eurotowersProperties } from "./eurotowers-data";
import { mawingDevelopment, mawingProperties } from "./mawing-data";
import { urbanDecaDevelopment, urbanDecaProperties } from "./urban-deca-data";
import { plaridelDevelopment, plaridelProperties } from "./plaridel-data";

export const developments: Development[] = [
  plaridelDevelopment,
  mawingDevelopment,
  urbanDecaDevelopment,
  ...eurotowersDevelopments,
  norzagarayDevelopment,
  uhomeDevelopment,
  pacifictownDevelopment,
  ...greenwayDevelopments,
  lanelloDevelopment,
  nilaDevelopment,
  hillDevelopment,
  vineDevelopment,
  alegriaDevelopment,
  glamDevelopment,
  shore3Development,
  {
    id: "amaresa",
    name: "Amaresa Homes",
    area: "Bulacan",
    city: "Marilao",
    locality: "Loma de Gato",
    image: "/images/properties/amaresa-homes.webp",
    imageAlt: "Amaresa Homes development image published on BrokerCel",
    sourceUrl: "https://brokercel.com/developments/amaresa",
    description:
      "Explore Amaresa Homes in Loma de Gato, Marilao, with four featured house models.",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Basketball Court",
      "Landscaped Parks",
      "Children's Playground",
    ],
  },
  {
    id: "north-orchard",
    name: "North Orchard Residences",
    area: "Bulacan",
    city: "Santa Maria",
    locality: "",
    image: "/images/properties/florence.webp",
    imageAlt:
      "North Orchard Residences development image published on BrokerCel",
    sourceUrl: "https://brokercel.com/developments/north-orchard",
    description:
      "Discover the Florence single-attached home in North Orchard Residences, Sta. Maria, Bulacan.",
    amenities: [
      "Gate and Guardhouse",
      "Clubhouse",
      "Swimming Pool",
      "Basketball Court",
      "Badminton Court",
      "Soccer Court",
      "Koi Pond",
    ],
  },
  {
    id: "madonna-residences",
    name: "Madonna Residences",
    area: "Pampanga",
    city: "San Fernando",
    locality: "",
    image: "/images/properties/madonna-residences.webp",
    imageAlt: "Madonna Residences development image published on BrokerCel",
    sourceUrl: "https://brokercel.com/developments/madonna-residences",
    description:
      "A residential community in the City of San Fernando with fully furnished single-detached house models.",
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Playground",
      "Grand Lawn",
      "Picnic Area",
      "Basketball Court",
      "Jogging Path",
    ],
  },
];

export const properties: Property[] = [
  {
    id: "amaresa-alexandria",
    title: "Alexandria",
    area: "Bulacan",
    city: "Marilao",
    locality: "Loma de Gato",
    developmentId: "amaresa",
    type: "House & Lot",
    price: 12205760.0,
    priceText: "₱12,205,760.00",
    bedrooms: 5,
    bathrooms: 3,
    lotArea: "138 sqm",
    floorArea: "159 sqm",
    carport: "1 Car",
    badge: "Available",
    image: "/images/properties/alexandria.webp",
    imageAlt: "Alexandria model image published on BrokerCel",
    imageCaption:
      "Model image published on BrokerCel. Finishes and inclusions may vary.",
    gallery: ["/images/properties/alexandria.webp"],
    description:
      "Alexandria is a two-storey, single-attached home with an attic, featuring five bedrooms and three bathrooms. It includes dedicated living, dining, and kitchen areas, a sliding door leading to the lanai, and a carport with deck. The home is listed as complete finish upon turnover.",
    features: ["House & Lot", "Complete finish upon turnover"],
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Basketball Court",
      "Landscaped Parks",
      "Children's Playground",
    ],
    sourceUrl: "https://brokercel.com/developments/amaresa/alexandria",
    sourceLocation: "Amaresa, Bulacan",
    importedAt: "2026-10-11",
    locationNote:
      "The Amaresa development page publishes Loma de Gato, Marilao as a location. The model page identifies Amaresa, Bulacan; confirm the exact phase and lot with JMG.",
  },
  {
    id: "amaresa-amara-expanded",
    title: "Amara Expanded",
    area: "Bulacan",
    city: "Marilao",
    locality: "Loma de Gato",
    developmentId: "amaresa",
    type: "House & Lot",
    price: 9444400.0,
    priceText: "₱9,444,400.00",
    bedrooms: 3,
    bathrooms: 3,
    lotArea: "110 sqm",
    floorArea: "131 sqm",
    carport: "1 Car",
    badge: "Available",
    image: "/images/properties/amaraexpanded.webp",
    imageAlt: "Amara Expanded model image published on BrokerCel",
    imageCaption:
      "Model image published on BrokerCel. Finishes and inclusions may vary.",
    gallery: ["/images/properties/amaraexpanded.webp"],
    description:
      "Amara Expanded is a two-storey, single-attached home with an attic, offering three bedrooms and three bathrooms. The layout includes living, dining, and kitchen areas, along with a maid’s room, lanai access through a sliding door, and a carport with deck. The home is listed as complete finish upon turnover.",
    features: ["House & Lot", "Complete finish upon turnover"],
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Basketball Court",
      "Landscaped Parks",
      "Children's Playground",
    ],
    sourceUrl: "https://brokercel.com/developments/amaresa/amara-expanded",
    sourceLocation: "Amaresa, Bulacan",
    importedAt: "2026-10-11",
    locationNote:
      "The Amaresa development page publishes Loma de Gato, Marilao as a location. The model page identifies Amaresa, Bulacan; confirm the exact phase and lot with JMG.",
  },
  {
    id: "amaresa-kayla-prime",
    title: "Kayla Prime",
    area: "Bulacan",
    city: "Marilao",
    locality: "Loma de Gato",
    developmentId: "amaresa",
    type: "House & Lot",
    price: 7097440.0,
    priceText: "₱7,097,440.00",
    bedrooms: 3,
    bathrooms: 2,
    lotArea: "96 sqm",
    floorArea: "79 sqm",
    carport: "1 Car",
    badge: "Available",
    image: "/images/properties/kaylaprime.webp",
    imageAlt: "Kayla Prime model image published on BrokerCel",
    imageCaption:
      "Model image published on BrokerCel. Finishes and inclusions may vary.",
    gallery: ["/images/properties/kaylaprime.webp"],
    description:
      "Kayla Prime is a two-storey, single-attached home with three bedrooms and two bathrooms. It features a high-ceiling living area, dining and kitchen areas, and a carport with deck, providing a practical layout for everyday family living. The home is listed as complete finish upon turnover.",
    features: ["House & Lot", "Complete finish upon turnover"],
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Basketball Court",
      "Landscaped Parks",
      "Children's Playground",
    ],
    sourceUrl: "https://brokercel.com/developments/amaresa/kayla-prime",
    sourceLocation: "Amaresa, Bulacan",
    importedAt: "2026-10-11",
    locationNote:
      "The Amaresa development page publishes Loma de Gato, Marilao as a location. The model page identifies Amaresa, Bulacan; confirm the exact phase and lot with JMG.",
  },
  {
    id: "amaresa-arya-prime",
    title: "Arya Prime",
    area: "Bulacan",
    city: "Marilao",
    locality: "Loma de Gato",
    developmentId: "amaresa",
    type: "House & Lot",
    price: 7265440.0,
    priceText: "₱7,265,440.00",
    bedrooms: 3,
    bathrooms: 2,
    lotArea: "96 sqm",
    floorArea: "84 sqm",
    carport: "1 Car",
    badge: "Available",
    image: "/images/properties/aryaprime.webp",
    imageAlt: "Arya Prime model image published on BrokerCel",
    imageCaption:
      "Model image published on BrokerCel. Finishes and inclusions may vary.",
    gallery: ["/images/properties/aryaprime.webp"],
    description:
      "Arya Prime is a two-storey, single-attached home with three bedrooms and two bathrooms. Its confirmed features include a family room, dining and kitchen areas, and a carport with deck for a functional family-oriented layout. The home is listed as complete finish upon turnover.",
    features: ["House & Lot", "Complete finish upon turnover"],
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Basketball Court",
      "Landscaped Parks",
      "Children's Playground",
    ],
    sourceUrl: "https://brokercel.com/developments/amaresa/arya-prime",
    sourceLocation: "Amaresa Homes, Bulacan",
    importedAt: "2026-10-11",
    locationNote:
      "The Amaresa development page publishes Loma de Gato, Marilao as a location. The model page identifies Amaresa, Bulacan; confirm the exact phase and lot with JMG.",
  },
  {
    id: "north-orchard-florence",
    title: "Florence",
    area: "Bulacan",
    city: "Santa Maria",
    locality: "",
    developmentId: "north-orchard",
    type: "Single Attached",
    price: null,
    priceText: "Contact for Price",
    bedrooms: 3,
    bathrooms: 2,
    lotArea: "80 sqm",
    floorArea: "112.36 sqm",
    carport: "2 Cars",
    badge: "Available",
    image: "/images/properties/florence.webp",
    imageAlt: "Florence model image published on BrokerCel",
    imageCaption:
      "Model image published on BrokerCel. Finishes and inclusions may vary.",
    gallery: ["/images/properties/florence.webp"],
    description:
      "Florence is a beautifully crafted single-attached home at North Orchard Residences in Sta. Maria, Bulacan. Designed for growing families, it offers spacious interiors, a contemporary layout, and comfortable modern living.",
    features: ["Single Attached"],
    amenities: [
      "Gate and Guardhouse",
      "Clubhouse",
      "Swimming Pool",
      "Basketball Court",
      "Badminton Court",
      "Soccer Court",
      "Koi Pond",
    ],
    sourceUrl: "https://brokercel.com/developments/north-orchard",
    sourceLocation: "North Orchard Residences, Sta. Maria, Bulacan",
    importedAt: "2026-10-11",
  },
  {
    id: "madonna-residences-rojul",
    title: "Rojul",
    area: "Pampanga",
    city: "San Fernando",
    locality: "",
    developmentId: "madonna-residences",
    type: "Single Detached",
    price: null,
    priceText: "Contact for Price",
    bedrooms: 4,
    bathrooms: 3,
    lotArea: "Approx. 164 sqm",
    floorArea: "Approx. 135 sqm",
    carport: "2 Cars",
    badge: "Fully Furnished",
    image: "/images/properties/madonna-residences.webp",
    imageAlt:
      "Madonna Residences entrance illustration shared across the three source model pages",
    imageCaption:
      "Development entrance illustration; an individual model photo is not published on the source page.",
    gallery: ["/images/properties/madonna-residences.webp"],
    description:
      "Rojul is a fully furnished single-detached home at Madonna Residences, designed with generous living spaces for comfortable family living.",
    features: ["Single Detached", "Fully Furnished"],
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Playground",
      "Grand Lawn",
      "Picnic Area",
      "Basketball Court",
      "Jogging Path",
    ],
    sourceUrl: "https://brokercel.com/developments/madonna-residences/rojul",
    sourceLocation: "Madonna Residences, San Fernando, Pampanga",
    importedAt: "2026-10-11",
  },
  {
    id: "madonna-residences-abigail",
    title: "Abigail",
    area: "Pampanga",
    city: "San Fernando",
    locality: "",
    developmentId: "madonna-residences",
    type: "Single Detached",
    price: null,
    priceText: "Contact for Price",
    bedrooms: 4,
    bathrooms: 3,
    lotArea: "Approx. 164 sqm",
    floorArea: "Approx. 135 sqm",
    carport: "2 Cars",
    badge: "Fully Furnished",
    image: "/images/properties/madonna-residences.webp",
    imageAlt:
      "Madonna Residences entrance illustration shared across the three source model pages",
    imageCaption:
      "Development entrance illustration; an individual model photo is not published on the source page.",
    gallery: ["/images/properties/madonna-residences.webp"],
    description:
      "Abigail is a fully furnished single-detached home at Madonna Residences offering spacious interiors, multiple bedrooms, and practical living areas for growing families.",
    features: ["Single Detached", "Fully Furnished"],
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Playground",
      "Grand Lawn",
      "Picnic Area",
      "Basketball Court",
      "Jogging Path",
    ],
    sourceUrl: "https://brokercel.com/developments/madonna-residences/abigail",
    sourceLocation: "Madonna Residences, San Fernando, Pampanga",
    importedAt: "2026-10-11",
  },
  {
    id: "madonna-residences-julieta",
    title: "Julieta",
    area: "Pampanga",
    city: "San Fernando",
    locality: "",
    developmentId: "madonna-residences",
    type: "Single Detached",
    price: null,
    priceText: "Contact for Price",
    bedrooms: 4,
    bathrooms: 3,
    lotArea: "Approx. 164 sqm",
    floorArea: "Approx. 135 sqm",
    carport: "2 Cars",
    badge: "Fully Furnished",
    image: "/images/properties/madonna-residences.webp",
    imageAlt:
      "Madonna Residences entrance illustration shared across the three source model pages",
    imageCaption:
      "Development entrance illustration; an individual model photo is not published on the source page.",
    gallery: ["/images/properties/madonna-residences.webp"],
    description:
      "Julieta is a fully furnished single-detached home at Madonna Residences created for families looking for generous space, comfort, and modern residential living.",
    features: ["Single Detached", "Fully Furnished"],
    amenities: [
      "Clubhouse",
      "Swimming Pool",
      "Playground",
      "Grand Lawn",
      "Picnic Area",
      "Basketball Court",
      "Jogging Path",
    ],
    sourceUrl: "https://brokercel.com/developments/madonna-residences/julieta",
    sourceLocation: "Madonna Residences, San Fernando, Pampanga",
    importedAt: "2026-10-11",
  },
];

properties.push(...shore3Properties);
properties.push(...glamProperties);
properties.push(...alegriaProperties);
properties.push(...vineProperties);
properties.push(...hillProperties);
properties.push(...nilaProperties);
properties.push(...lanelloProperties);
properties.push(...greenwayProperties);
properties.push(...uhomeProperties);
properties.push(...pacifictownProperties);
properties.push(...norzagarayProperties);
properties.push(...eurotowersProperties);
properties.push(...mawingProperties, ...urbanDecaProperties, ...plaridelProperties);

export const propertyTours: PropertyTour[] = [
  {
    id: "eLsEQ-5jf_U",
    title: "Affordable Townhouse in PHrist Park Homes in Magalang East!",
    developmentId: "phirst-magalang-east",
    development: "PHirst Park Homes Magalang East",
    area: "Pampanga",
    city: "Magalang",
    url: "https://www.youtube.com/watch?v=eLsEQ-5jf_U",
    description:
      "Looking for an affordable, stylish, and fully finished home near Clark and Metro Manila? PHirst Park Homes Magalang East offers the Calista Mid—a smart-choice townhouse perfect for starting families and investors!",
    date: "December 02, 2025",
    sourceUrl: "https://brokercel.com/#blog",
  },
  {
    id: "kwaR8VTMdCk",
    title: "Mura at Accessible na Townhouse with Parking near Metro Manila",
    developmentId: "beverly-homes",
    development: "Beverly Homes",
    area: "Bulacan",
    city: "San Jose del Monte",
    url: "https://www.youtube.com/watch?v=kwaR8VTMdCk",
    description:
      "Looking for an affordable house and lot near Metro Manila? Beverly Homes in San Jose del Monte, Bulacan is perfect for millennials, Gen Z, and OFW investors!",
    date: "March 27, 2025",
    sourceUrl: "https://brokercel.com/#blog",
  },
  {
    id: "JB1MT1a1o2A",
    title:
      "Pinaka murang Townhouse w/ Parking in San Jose del Monte Bul! Beverly Homes Near QC!",
    developmentId: "beverly-homes",
    development: "Beverly Homes",
    area: "Bulacan",
    city: "San Jose del Monte",
    url: "https://www.youtube.com/watch?v=JB1MT1a1o2A",
    description:
      "Looking for an affordable house and lot near Quezon City? Beverly Homes in San Jose del Monte, Bulacan offers modern, quality, and flood-free homes perfect for your family!",
    date: "March 20, 2025",
    sourceUrl: "https://brokercel.com/#blog",
  },
  {
    id: "5lpa1jJ9qfg",
    title: "Amaresa Marilao - 4 Single Attached Dressed Up Model Units!",
    developmentId: "amaresa",
    development: "Amaresa Homes",
    area: "Bulacan",
    city: "Marilao",
    url: "https://www.youtube.com/watch?v=5lpa1jJ9qfg",
    description:
      "Discover Your Dream Home in Amaresa Marilao – A Safe, Flood-Free Community!",
    date: "March 19, 2025",
    sourceUrl: "https://brokercel.com/#blog",
  },
  {
    id: "C36T-klti78",
    title:
      "Bellavista Subd in Sta. Maria Bulacan! Single - Attached! Complete! Non Flooded Area!",
    developmentId: "bellavista",
    development: "Bellavista Subdivision",
    area: "Bulacan",
    city: "Santa Maria",
    url: "https://www.youtube.com/watch?v=C36T-klti78",
    description:
      "This 𝗽𝗿𝗲𝗺𝗶𝗲𝗿 𝗰𝗼𝗺𝗺𝘂𝗻𝗶𝘁𝘆 offers the  perfect blend of 𝗰𝗼𝗺𝗳𝗼𝗿𝘁 𝗮𝗻𝗱 𝗰𝗼𝗻𝘃𝗲𝗻𝗶𝗲𝗻𝗰𝗲, just short drive from Metro Manila.",
    date: "March 19, 2025",
    sourceUrl: "https://brokercel.com/#blog",
  },
];




