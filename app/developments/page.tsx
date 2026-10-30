import { canonical } from "../site-info";
import { Shell, ArrowUpRight } from "../components";
import { developments } from "../content";
import ProjectCard from "../project-card";
export const metadata = {
  title: "Explore Our Property Projects",
  description: `Explore ${developments.length} property projects in Metro Manila, Bulacan, Pampanga and Cavite, including house models, condominium unit types and community information.`,
  alternates: { canonical: canonical("/developments") },
};
export default function DevelopmentsPage() {
  return (
    <Shell className="site-developments">
      <div className="wrap development-index">
        <header>
          <span className="eyebrow">JMG REALTY PH / PROPERTY PROJECTS</span>
          <h1>
            Find your place.
            <br />
            <em>Explore the projects.</em>
          </h1>
          <p>
            Start with one of {developments.length} projects in Metro Manila, Bulacan,
            Pampanga and Cavite. Explore its location and community, then compare its
            house models or condominium unit types.
          </p>
          <a href="/properties?browse=models" className="text-link">
            Browse all models & unit categories
            <ArrowUpRight size={17} />
          </a>
        </header>
        <div className="catalog-project-grid">
          {developments.map(d => <ProjectCard key={d.id} development={d} />)}
        </div>
        <div className="development-index-note">
          <p>
            Each project profile identifies its sources and any details requiring confirmation.
            Model and unit-type counts describe the published collection, not available inventory.
            Ask JMG for current prices, availability, amenities and written inclusions.
          </p>
          <a href="/areas" className="text-link">
            All eight service areas
            <ArrowUpRight size={17} />
          </a>
        </div>
      </div>
    </Shell>
  );
}


