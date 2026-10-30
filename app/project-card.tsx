import { ArrowUpRight, MapPin } from "lucide-react";
import { properties, type Development } from "./content";
import { propertyCategory } from "./listing-status";

export default function ProjectCard({ development: d, matchingCount, modelsUrl }: {
  development: Development; matchingCount?: number; modelsUrl?: string;
}) {
  const models = properties.filter(p => p.developmentId === d.id);
  const categories = [...new Set(models.map(propertyCategory))];
  const category = categories.length ? categories.join(" / ") : d.type || "Residential project";
  const noun = categories.length === 1 && categories[0] === "Condominium" ? "unit type" : "house model";
  const count = matchingCount ?? models.length;
  const modelLink = modelsUrl || "/properties?" + new URLSearchParams({ browse: "models", project: d.id });
  return <article className="catalog-project-card">
    <a className="catalog-project-image" href={`/developments/${d.id}`} aria-label={`Explore ${d.name}`}>
      <img src={d.image} alt={d.imageAlt} width={960} height={640} loading="lazy" decoding="async" />
    </a>
    <div className="catalog-project-body">
      <h2><a href={`/developments/${d.id}`}>{d.name}</a></h2>
      <p className="catalog-project-kind">{category}</p>
      <p className="catalog-project-location"><MapPin size={15} aria-hidden="true" /><span>{[d.locality, d.city, d.area].filter(Boolean).join(", ")}</span></p>
      <p className="catalog-project-intro">{d.description}</p>
      <p className="catalog-project-count"><strong>{models.length}</strong> {noun}{models.length === 1 ? "" : "s"}{count < models.length && <span>{count} {count === 1 ? "matches" : "match"} your filters</span>}</p>
      <details className="catalog-project-image-note"><summary>About this image</summary><p>{d.imageCaption || d.imageAlt}</p></details>
      <div className="catalog-project-actions"><a className="text-link" href={`/developments/${d.id}`}>Explore project <ArrowUpRight size={16} /></a><a className="text-link" href={modelLink}>{noun === "unit type" ? "View unit types" : "View models"} <ArrowUpRight size={16} /></a></div>
    </div>
  </article>;
}
