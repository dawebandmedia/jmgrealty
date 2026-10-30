import { Shell } from "../components";
import { properties } from "../content";
import { validModelIds } from "../property-utils";
import SharedShortlist from "../shared-shortlist";
export const metadata = {
  title: "Shared Property Shortlist",
  robots: { index: false, follow: true },
};
export default async function SharedPage({
  searchParams,
}: {
  searchParams: Promise<{ homes?: string }>;
}) {
  const query = await searchParams;
  const models = validModelIds(query.homes).map(
    (id) => properties.find((p) => p.id === id)!,
  );
  return (
    <Shell className="site-shared-shortlist">
      <div className="wrap shared-shortlist-page">
        <header>
          <a href="/properties" className="text-link">
            ← The property collection
          </a>
          <span className="eyebrow">A SELECTION TO EXPLORE TOGETHER</span>
          <h1>
            A shared <em>possibility.</em>
          </h1>
          <p>
            {models.length
              ? `${models.length} ${models.length === 1 ? "model or unit category" : "models & unit categories"} in this shared link. Save any model to your own browser shortlist.`
              : "This link does not contain a valid model selection. Explore the collection to create a new shortlist."}
          </p>
        </header>
        {models.length ? (
          <SharedShortlist models={models} />
        ) : (
          <a href="/properties" className="button">
            Explore models & unit categories ↗
          </a>
        )}
      </div>
    </Shell>
  );
}

