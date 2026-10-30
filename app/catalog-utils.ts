import type { Property } from "./content";
import { catalogFacts } from "./catalog-facts";
import { propertyCategory } from "./listing-status";

export type CatalogFilters = {
  browse: "projects" | "models"; projectSort: "location" | "name";
  area: string; city: string; project: string; type: string; max: string;
  search: string; beds: string; minFloor: string; minLot: string; subtype: string; budgetBasis: "starting" | "full-range";
  pricing: "all" | "published" | "request";
  sort: "location" | "price-low" | "price-high" | "area-high";
  view: "grid" | "list"; page: number; pageSize: number;
};
export const defaultCatalogFilters: CatalogFilters = {
  browse: "models", projectSort: "location",
  area: "", city: "", project: "", type: "", max: "", search: "", beds: "",
  minFloor: "", minLot: "", subtype: "", budgetBasis: "starting", pricing: "all", sort: "location", view: "grid",
  page: 1, pageSize: 12,
};
export function readCatalogFilters(query: string): CatalogFilters {
  const q = new URLSearchParams(query);
  const positive = (key: string, limit: number) => {
    const value = q.get(key) || "";
    return value && Number.isFinite(Number(value)) && Number(value) > 0 && Number(value) <= limit ? value : "";
  };
  return {
    ...defaultCatalogFilters,
    // Ordinary searches open models; project browsing remains an explicit option.
    browse: q.get("browse") === "projects" ? "projects" : "models",
    projectSort: q.get("projectSort") === "name" ? "name" : "location",
    ...Object.fromEntries(["area", "city", "project", "type", "search", "subtype"].map(key => [key, (q.get(key) || "").slice(0, 200)])),
    type: ["Townhouse", "Duplex", "Single Attached", "Single Detached", "Socialized Housing"].includes(q.get("type") || "") ? "House & Lot" : (q.get("type") || ""),
    subtype: q.get("subtype") || (["Townhouse", "Duplex", "Single Attached", "Single Detached", "Socialized Housing"].includes(q.get("type") || "") ? q.get("type")! : ""),
    budgetBasis: q.get("budgetBasis") === "full-range" ? "full-range" : "starting",
    max: positive("max", 1e12), minFloor: positive("minFloor", 100000), minLot: positive("minLot", 100000),
    beds: ["1", "2", "3", "4", "5"].includes(q.get("beds") || "") ? q.get("beds")! : "",
    pricing: q.get("pricing") === "published" ? "published" : q.get("pricing") === "request" ? "request" : "all",
    sort: (["price-low", "price-high", "area-high"].includes(q.get("sort") || "") ? q.get("sort") : "location") as CatalogFilters["sort"],
    view: q.get("view") === "list" ? "list" : "grid",
    page: Math.max(1, Math.floor(Number(positive("page", 100000)) || 1)),
    pageSize: q.get("pageSize") === "24" ? 24 : 12,
  };
}
export function catalogQuery(filters: CatalogFilters) {
  const q = new URLSearchParams();
  q.set("browse", filters.browse);
  for (const [key, value] of Object.entries(filters)) {
    if (value !== "" && value !== defaultCatalogFilters[key as keyof CatalogFilters]) q.set(key, String(value));
  }
  return q.toString();
}
export function matchesCatalogProperty(p: Property, f: CatalogFilters, developmentName: string) {
  const floor = catalogFacts(p).floor?.min ?? null, lot = catalogFacts(p).lot?.min ?? null;
  return (!f.area || p.area === f.area) && (!f.city || p.city === f.city) &&
    (!f.project || p.developmentId === f.project) && (!f.type || propertyCategory(p) === f.type || p.type === f.type) && (!f.subtype || p.type === f.subtype) &&
    (!f.beds || (p.bedrooms != null && p.bedrooms >= Number(f.beds))) &&
    (!f.minFloor || (floor != null && floor >= Number(f.minFloor))) &&
    (!f.minLot || (lot != null && lot >= Number(f.minLot))) &&
    (!f.search.trim() || `${p.title} ${p.area} ${p.city} ${p.locality} ${p.sourceLocation} ${developmentName}`.toLowerCase().includes(f.search.trim().toLowerCase()));
}
export function sortCatalogProperties(list: Property[], sort: CatalogFilters["sort"]) {
  return [...list].sort((a, b) => {
    // Unquoted models remain last in both price directions.
    if (sort === "price-low" || sort === "price-high") {
      if (a.price === null) return b.price === null ? 0 : 1;
      if (b.price === null) return -1;
      return sort === "price-low" ? a.price - b.price : b.price - a.price;
    }
    if (sort === "area-high") return (catalogFacts(b).floor?.min ?? -1) - (catalogFacts(a).floor?.min ?? -1);
    return `${a.area} ${a.city} ${a.developmentId} ${a.title}`.localeCompare(`${b.area} ${b.city} ${b.developmentId} ${b.title}`);
  });
}
