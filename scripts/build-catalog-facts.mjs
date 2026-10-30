import { build } from "esbuild";
import { writeFile } from "node:fs/promises";

// Authoring helper. Rebuild after editing model data, then review the JSON.
// Conflicting measurements are intentionally excluded from numeric filters.
const result = await build({ stdin: { contents: 'export { properties } from "./app/content.ts";', resolveDir: process.cwd() }, bundle: true, platform: "node", format: "esm", write: false });
const { properties } = await import(`data:text/javascript;base64,${Buffer.from(result.outputFiles[0].text).toString("base64")}`);
function measure(text, id, kind) {
  if (!text || /conflict|unverified|on inquiry/i.test(text) || (id === "nila-premium-4-bedroom" && kind === "floor")) return null;
  const match = text.replaceAll(",", "").match(/^(?:(?:Approx\.?|Minimum|From)\s*)?(\d+(?:\.\d+)?)(?:[–−-](\d+(?:\.\d+)?))?\s*sqm(?:\s*·.*)?$/i);
  return match ? { min: Number(match[1]), max: Number(match[2] || match[1]), basis: text } : null;
}
const facts = Object.fromEntries(properties.map(p => {
  const range = p.priceText.match(/₱([\d.]+)M[–-]₱([\d.]+)M/);
  return [p.id, { floor: measure(p.floorArea, p.id, "floor"), lot: measure(p.lotArea, p.id, "lot"), displayedPriceMax: p.price === null ? null : range ? Math.max(p.price, Number(range[2]) * 1e6) : p.price }];
}));
await writeFile("app/catalog-facts.json", JSON.stringify(facts, null, 2) + "\n");
console.log(`Wrote reviewed filter bounds for ${properties.length} model/category records. Conflicts and unknowns remain null.`);
