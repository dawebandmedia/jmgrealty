import type { MetadataRoute } from "next";
import { properties, developments } from "./content";
import { siteUrl, contentUpdatedAt } from "./site-info";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/services",
    "/properties",
    "/developments",
    "/about",
    "/areas",
    "/join",
    "/contact",
    "/faq",
    "/privacy",
    ...properties.map((p) => `/properties/${p.id}`),
    ...developments.map((d) => `/developments/${d.id}`),
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: contentUpdatedAt,
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
