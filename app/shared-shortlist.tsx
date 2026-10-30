"use client";
import { type Property } from "./content";
import { ModelComparison, ShareModels } from "./comparison";
import { SaveButton } from "./shortlist";
import { PropertyRequestLinks } from "./property-requests";
export default function SharedShortlist({ models }: { models: Property[] }) {
  return (
    <div className="shared-shortlist-body">
      <ModelComparison
        models={models}
        renderAction={(p) => <SaveButton property={p} compact />}
      />
      <ShareModels models={models} />
      <div className="shared-shortlist-next">
        <div>
          <h2>Take the next step.</h2>
          <p>
            Request current details or tell JMG when you’d like to explore these
            homes.
          </p>
        </div>
        <PropertyRequestLinks ids={models.map((p) => p.id)} />
      </div>
    </div>
  );
}
