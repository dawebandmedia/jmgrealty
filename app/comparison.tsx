"use client";
import PriceNotice from "./price-notice";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowUpRight, Bookmark, Copy, Check, Trash2, X } from "lucide-react";
import { developments, type Property } from "./content";
import { comparisonFacts, differentFacts } from "./property-utils";
import { PropertyRequestLinks } from "./property-requests";

export function ShareModels({ models }: { models: Property[] }) {
  const [url, setUrl] = useState("");
  const [feedback, setFeedback] = useState("");
  const [localPreview, setLocalPreview] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const ids = models.map((p) => p.id).join(",");
  useEffect(() => {
    setUrl(
      `${window.location.origin}/shortlist?${new URLSearchParams({ homes: ids })}`,
    );
    setFeedback("");
    setLocalPreview(
      ["localhost", "127.0.0.1", "::1", "[::1]"].includes(
        window.location.hostname,
      ),
    );
  }, [ids]);
  async function copy() {
    try {
      await navigator.clipboard.writeText(url);
      setFeedback("Link copied. Share it with someone helping you choose.");
    } catch {
      input.current?.focus();
      input.current?.select();
      setFeedback("Select and copy the link below.");
    }
  }
  return (
    <div className="share-models">
      <div>
        <span className="eyebrow">SHARE THIS SELECTION</span>
        <p>
          The link contains model selections only. Your contact details and
          saved homes stay separate.
        </p>
        {localPreview && (
          <p className="local-share-note">
            Preview links open on this computer. Sharing across devices becomes
            available after publication.
          </p>
        )}
      </div>
      <label>
        <span className="sr-only">Shortlist share link</span>
        <input
          ref={input}
          readOnly
          value={url}
          onFocus={(e) => e.currentTarget.select()}
        />
      </label>
      <button
        className="button outline"
        type="button"
        disabled={!url}
        onClick={copy}
      >
        {feedback.startsWith("Link copied") ? (
          <Check size={17} />
        ) : (
          <Copy size={17} />
        )}
        Copy link
      </button>
      <p className="share-feedback" role="status">
        {feedback}
      </p>
    </div>
  );
}

export function ModelComparison({
  models,
  onRemove,
  renderAction,
}: {
  models: Property[];
  onRemove?: (id: string) => void;
  renderAction?: (p: Property) => ReactNode;
}) {
  const [differencesOnly, setDifferencesOnly] = useState(false);
  const differences = differentFacts(models);
  const hasComparison = models.length > 1;
  const selectionKey = models.map(p=>p.id).join(",");
  return (
    <>
      <div className="comparison-controls">
        <p role="status">
          {hasComparison
            ? `${differences.size} published ${differences.size === 1 ? "fact differs" : "facts differ"} across this selection.`
            : "Add another model to compare published facts."}
        </p>
        <button
          type="button"
          className="comparison-toggle"
          aria-pressed={differencesOnly && hasComparison}
          disabled={!hasComparison}
          onClick={() => setDifferencesOnly((value) => !value)}
        >
          {differencesOnly && hasComparison ? <Check size={16} /> : null}Show
          differences only
        </button>
      </div>
      {differencesOnly && hasComparison && !differences.size && (
        <p className="comparison-identical">
          These models share the same published comparison facts. Ask JMG about
          the individual units, finishes and availability.
        </p>
      )}
      <div
        className="compare-models"
        style={{ "--compare-count": models.length } as React.CSSProperties}
      >
        {models.map((p) => (
          <article key={p.id} className="compare-model">
            <div className="compare-photo">
              <img src={p.image} alt={p.imageAlt} />
              {onRemove && (
                <button
                  className="icon-button"
                  onClick={() => onRemove(p.id)}
                  aria-label={`Remove ${p.title} from saved homes`}
                >
                  <X size={18} />
                </button>
              )}
            </div>
            <p className="eyebrow">
              {p.city}, {p.area}
            </p>
            <h3>{p.title}</h3>
            <p className="compare-development">
              <a href={`/developments/${p.developmentId}`}>
                {developments.find((d) => d.id === p.developmentId)?.name}
              </a>
            </p>
            <dl>
              {comparisonFacts(p)
                .filter(
                  ([label]) =>
                    !differencesOnly ||
                    !hasComparison ||
                    differences.has(label),
                )
                .map(([label, value]) => (
                  <div
                    key={label}
                    className={differences.has(label) ? "is-different" : ""}
                  >
                    {differences.has(label) && <span key={`${selectionKey}-${label}-${differencesOnly}`} className="comparison-glow" aria-hidden="true"/>}
                    <dt>
                      {label}
                      {differences.has(label) && <small>Different</small>}
                    </dt>
                    <dd>{value}{label === "Published price" && <PriceNotice />}</dd>
                  </div>
                ))}
            </dl>
            {p.developmentId === "madonna-residences" && (
              <p className="property-image-note">
                Image: development entrance illustration
              </p>
            )}
            <div className="compare-model-links">
              <a className="text-link" href={`/properties/${p.id}`}>
                Explore {p.title}
                <ArrowUpRight size={16} />
              </a>
              {renderAction?.(p)}
            </div>
          </article>
        ))}
      </div>
      <details className="comparison-source-note"><summary>Price & specification notes for this selection</summary>
      {models.map(p => <div key={p.id}><strong>{p.title} · {developments.find(d => d.id === p.developmentId)?.name}</strong><p>{p.priceNote || "Published price information requires a current quotation."} {p.specificationNote || ""}</p><a href={p.sourceUrl} target="_blank" rel="noopener noreferrer">View source ↗</a></div>)}</details>
    </>
  );
}

export function ShortlistContents({
  saved,
  onRemove,
  onClear,
  onClose,
}: {
  saved: Property[];
  onRemove: (id: string) => void;
  onClear: () => void;
  onClose: () => void;
}) {
  return (
    <>
      <header className="compare-header">
        <div>
          <span className="eyebrow">YOUR PERSONAL COLLECTION</span>
          <h2 id="compare-title">
            A clearer <em>choice.</em>
          </h2>
          <p>
            Compare up to three models. Saved on this browser when storage is
            available.
          </p>
          {saved.length === 3 && (
            <p className="compare-limit" role="status">
              Your shortlist holds three models. Remove one to save another.
            </p>
          )}
        </div>
        <button
          autoFocus
          className="icon-button"
          aria-label="Close saved homes"
          onClick={onClose}
        >
          <X />
        </button>
      </header>
      {saved.length ? (
        <>
          <ModelComparison models={saved} onRemove={onRemove} />
          <ShareModels models={saved} />
          <div className="compare-bottom">
            <button className="text-link" onClick={onClear}>
              <Trash2 size={15} />
              Clear saved homes
            </button>
            <PropertyRequestLinks ids={saved.map((p) => p.id)} />
          </div>
        </>
      ) : (
        <div className="compare-empty">
          <Bookmark size={35} />
          <h3>Keep the homes that catch your eye.</h3>
          <p>
            Use “Save model” on a property. Compare its published space, price
            and location here, then share your selection.
          </p>
          <a href="/properties" className="button">
            Explore the collection
            <ArrowUpRight size={18} />
          </a>
        </div>
      )}
    </>
  );
}
