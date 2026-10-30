import records from "./catalog-facts.json";
import type { Property } from "./content";

type Bounds = { min: number; max: number; basis: string };
type Fact = { floor: Bounds | null; lot: Bounds | null; displayedPriceMax: number | null };
const facts: Record<string, Fact> = records;
export function catalogFacts(p: Property): Fact {
  // A new unreviewed record must not silently inherit a guessed area or upper price.
  return facts[p.id] || { floor: null, lot: null, displayedPriceMax: null };
}
export function matchesBudget(p: Property, maximum: string, basis: "starting" | "full-range") {
  if (!maximum) return true;
  const value = basis === "full-range" ? catalogFacts(p).displayedPriceMax : p.price;
  return value !== null && value <= Number(maximum);
}
