import { company } from "./content";
import { contactPeople } from "./contact-people";

// Change only when content has actually been edited or reviewed; never on requests.
export const contentUpdatedAt = "2026-10-17";
export const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "") ||
  "https://jmg-realty-ph.otakubarb.chatgpt.site").replace(/\/$/, "");
export const canonical = (path: string) => `${siteUrl}${path}`;
export function JsonLd({ value }: { value: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(value).replace(/</g, "\\u003c") }} />;
}
export function OrganizationData() {
  return <JsonLd value={{ "@context": "https://schema.org", "@type": "RealEstateAgent", "@id": `${siteUrl}/#organization`, name: company.name, url: siteUrl, logo: `${siteUrl}/brand/full-display.webp`, email: company.email, telephone: company.primaryTel, employee: contactPeople.map(person => ({ "@type": "Person", name: person.fullName || person.name, alternateName: person.fullName ? person.name : undefined, jobTitle: person.role, sameAs: person.links.map(link => link.url) })), contactPoint: contactPeople.map(person => ({ "@type": "ContactPoint", name: person.name, contactType: person.role, telephone: person.tel })) }} />;
}
export function BreadcrumbData({ items }: { items: { name: string; path: string }[] }) {
  return <JsonLd value={{ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: canonical(item.path) })) }} />;
}
