import type { MetadataRoute } from "next";
import { siteUrl } from "./site-info";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: process.env.VERCEL_ENV === "preview"
      ? { userAgent: "*", disallow: "/" }
      : { userAgent: "*", allow: "/", disallow: ["/owner", "/api/"] },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
