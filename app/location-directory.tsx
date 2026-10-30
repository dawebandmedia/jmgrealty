import { areas, properties, propertyTours } from "./content";
import { ArrowUpRight, MapPin } from "./components";

export default function LocationDirectory() {
  return (
    <div className="location-grid catalog-directory">
      {areas.map((area, i) => {
        const models = properties.filter((p) => p.area === area);
        const tours = propertyTours.filter((t) => t.area === area);
        const cities = [
          ...new Set([...models, ...tours].map((p) => p.city)),
        ].sort();
        return (
          <article key={area} className="location-card">
            <div>
              <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
              <MapPin size={23} strokeWidth={1} />
            </div>
            <h2>{area}</h2>
            {cities.length ? (
              <>
                <p>
                  {models.length} models & unit categories · {tours.length}{" "}
                  {tours.length === 1 ? "property tour" : "property tours"}
                </p>
                <ul className="directory-cities">
                  {cities.map((city) => {
                    const records = [
                      ...models
                        .filter((p) => p.city === city)
                        .map((p) => ({ id: p.developmentId, name: "" })),
                      ...tours
                        .filter((p) => p.city === city)
                        .map((p) => ({
                          id: p.developmentId,
                          name: p.development,
                        })),
                    ];
                    return (
                      <li key={city}>
                        <a
                          href={`/properties?${new URLSearchParams({ area, city })}`}
                        >
                          <span>{city}</span>
                          <ArrowUpRight size={16} />
                        </a>
                        <small>
                          {[...new Set(records.map((r) => r.id))].length}{" "}
                          {[...new Set(records.map((r) => r.id))].length === 1
                            ? "development"
                            : "developments"}
                        </small>
                      </li>
                    );
                  })}
                </ul>
                <a
                  href={`/properties?area=${encodeURIComponent(area)}`}
                  className="text-link"
                >
                  Explore {area} <ArrowUpRight size={17} />
                </a>
              </>
            ) : (
              <>
                <p>
                  Ask about buying, selling, appraisal and property matching in{" "}
                  {area}. Tell us your preferred location and budget to explore
                  options.
                </p>
                <a
                  href={`/contact?area=${encodeURIComponent(area)}`}
                  className="text-link"
                >
                  Ask about properties <ArrowUpRight size={17} />
                </a>
              </>
            )}
          </article>
        );
      })}
    </div>
  );
}

