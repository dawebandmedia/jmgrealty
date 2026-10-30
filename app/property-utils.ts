import { properties, developments, type Property } from "./content";
import { priceStatus } from "./listing-status";

export function areaValue(value?: string): number | null {
  const number = value?.replace(/,/g, "").match(/\d+(?:\.\d+)?/);
  return number ? Number(number[0]) : null;
}

export function validModelIds(value: unknown): string[] {
  const values =
    typeof value === "string"
      ? value.split(",")
      : Array.isArray(value)
        ? value
        : [];
  return [
    ...new Set(
      values.filter(
        (id): id is string =>
          typeof id === "string" && properties.some((p) => p.id === id),
      ),
    ),
  ].slice(0, 3);
}

export function modelDescription(property: Property): string {
  return `${property.title} at ${developments.find((d) => d.id === property.developmentId)?.name}, ${property.city}, ${property.area}`;
}

export function requestUrl(intent: "viewing" | "price", ids: string[]): string {
  return `/request?${new URLSearchParams({ intent, homes: validModelIds(ids).join(",") })}`;
}

export function manilaToday(): string {
  const parts = new Intl.DateTimeFormat("en", {
    timeZone: "Asia/Manila",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const part = (type: string) => parts.find((p) => p.type === type)?.value;
  return `${part("year")}-${part("month")}-${part("day")}`;
}

export function comparisonFacts(property: Property): [string, string][] {
  return [
    ["Published price", property.priceText],
    ["Price status", priceStatus(property).label],
    ["Price basis", priceStatus(property).basis],
    ["Price source date", priceStatus(property).dateLabel],
    ["Type", property.type],
    ["Bedrooms", property.bedroomText || String(property.bedrooms ?? "Ask JMG")],
    ["Bathrooms", String(property.bathrooms ?? "Ask JMG")],
    ["Lot area", property.lotArea || "Ask JMG"],
    ["Floor area", property.floorArea || "Ask JMG"],
    ["Carport", property.carport || "Ask JMG"],
    ["Location", `${property.city}, ${property.area}`],
  ];
}

export function differentFacts(models: Property[]): Set<string> {
  if (models.length < 2) return new Set();
  return new Set(
    comparisonFacts(models[0])
      .filter(([label], index) => {
        const values = models.map((p) =>
          comparisonFacts(p)[index][1].trim().toLowerCase(),
        );
        return new Set(values).size > 1;
      })
      .map(([label]) => label),
  );
}
