import { canonical } from "../site-info";
import { Shell, ArrowUpRight } from "../components";
import { PropertyBrowser } from "../property-catalog";
import { properties, developments } from "../content";
import { ShortlistButton } from "../shortlist";
export const metadata = { title: "The Property Collection",
  description: "Explore property projects by location and type, or compare individual house models and condominium units. Review dated price guides and request current details from JMG Realty PH.",
  alternates: { canonical: canonical("/properties") },
};
export default async function Properties({searchParams}: {searchParams: Promise<Record<string,string|string[]|undefined>>}) {
  const query = await searchParams;
  const initialQuery = new URLSearchParams();
  for (const [key,value] of Object.entries(query)) {
    if (typeof value === "string") initialQuery.set(key,value);
  }
  return (
    <Shell className="site-catalog">
      <header className="catalog-masthead wrap">
        <div>
          <span className="eyebrow">
            JMG REALTY PH / PROPERTIES FOR SALE
          </span>
          <h1>
            Find your <em>kind of home.</em>
          </h1>
        </div>
        <div className="catalog-masthead-note">
          <p>
            {properties.length} models & unit categories · {developments.length} projects
          </p>
          <ShortlistButton />
          <a href="/developments" className="text-link">
            All project profiles <ArrowUpRight size={16} />
          </a>
        </div>
      </header>
      <section className="wrap catalog-main">
        <PropertyBrowser initialQuery={initialQuery.toString()} />
      </section>
      <section className="wrap catalog-match">
        <div>
          <span className="eyebrow">A MORE PERSONAL SEARCH</span>
          <h2>
            Looking for
            <br />
            <em>something else?</em>
          </h2>
          <p>
            Share your location, budget and priorities. Let’s explore what fits.
          </p>
        </div>
        <a className="button" href="/contact?service=Property%20Matching">
          Tell us what you have in mind
          <ArrowUpRight size={18} />
        </a>
      </section>
    </Shell>
  );
}
