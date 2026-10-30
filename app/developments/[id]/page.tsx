import { notFound } from "next/navigation";
import { canonical } from "../../site-info";
import { Check, MapPin, ArrowUpRight } from "lucide-react";
import { Shell, PropertyCard } from "../../components";
import { developments, properties, propertyTours } from "../../content";
import { TourPlayer } from "../../experience";
import { areaValue } from "../../property-utils";
import { Shore3Amenities, Shore3PriceNote, Shore3ShowUnit } from "../../shore3-sections";
import GlamDevelopment from "../../glam-development";
import AlegriaDevelopment from "../../alegria-development";
import VineDevelopment from "../../vine-development";
import HillDevelopment from "../../hill-development";
import NilaDevelopment from "../../nila-development";
import LanelloDevelopment from "../../lanello-development";
import GreenwayDevelopment from "../../greenway-development";
import UHomeDevelopment from "../../uhome-development";
import PacifictownDevelopment from "../../pacifictown-development";
import NorzagarayDevelopment from "../../norzagaray-development";
import EuroTowersDevelopment from "../../eurotowers-development";
import { eurotowersProjects } from "../../eurotowers-data";
import AddedDevelopment from "../../new-development";
import PlaridelDevelopment from "../../plaridel-development";

type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const d = developments.find((d) => d.id === id);
  return {
    title: d ? `${d.name} — ${d.city}, ${d.area}` : "Development Not Found",
    description: d?.description,
    alternates: d ? { canonical: canonical(`/developments/${d.id}`) } : undefined,
    openGraph: d
      ? {
          title: `${d.name} | JMG Realty PH`,
          description: d.description,
          images: [{ url: d.image, alt: d.imageAlt }],
        }
      : undefined,
  };
}
export default async function DevelopmentPage({ params }: Props) {
  const { id } = await params;
  const d = developments.find((d) => d.id === id);
  if (!d) notFound();
  if (d.id === "plaridel-heights") return <PlaridelDevelopment />;
  if (d.id === "mawing-residences") return <AddedDevelopment />;
  if (d.id === "urban-deca-homes-manila") return <AddedDevelopment urban />;
  const euroProject=eurotowersProjects.find(project=>project.id===d.id);
  if(euroProject)return <EuroTowersDevelopment project={euroProject}/>;
  if (d.id === "glam-residences") return <GlamDevelopment />;
  if (d.id === "alegria") return <AlegriaDevelopment />;
  if (d.id === "vine-residences") return <VineDevelopment />;
  if (d.id === "hill-residences") return <HillDevelopment />;
  if (d.id === "nila-residences") return <NilaDevelopment />;
  if (d.id === "lanello-heights") return <LanelloDevelopment />;
  if (d.id === "greenway-place-phase-1") return <GreenwayDevelopment phase={1} />;
  if (d.id === "greenway-place-phase-2") return <GreenwayDevelopment phase={2} />;
  if (d.id === "uhome-leon-guinto") return <UHomeDevelopment />;
  if (d.id === "pacifictown-naic-5") return <PacifictownDevelopment />;
  if (d.id === "apec-homes-norzagaray") return <NorzagarayDevelopment />;
  const isShore3 = d.id === "shore-3-residences";
  const models = properties.filter((p) => p.developmentId === id);
  const tours = propertyTours.filter((t) => t.developmentId === id);
  const catalog = `/properties?${new URLSearchParams({ area: d.area, city: d.city, project: id })}`;
  const caption = isShore3 ? "Shore 3 development marketing illustration from shore3residences.com. Actual facilities and finishes may differ."
    : d.id === "madonna-residences"
      ? "Development entrance illustration from BrokerCel. Individual house photos are not published in the imported records."
      : d.id === "north-orchard"
        ? "Florence model image from BrokerCel. Finishes and inclusions may vary."
        : "Development image published on BrokerCel.";
  const range = (values: (number | null)[]) => {
    const numbers = values.filter((v): v is number => v !== null);
    return numbers.length
      ? `${Math.min(...numbers)}${Math.min(...numbers) !== Math.max(...numbers) ? `–${Math.max(...numbers)}` : ""}`
      : "Ask JMG";
  };
  return (
    <Shell className="site-development">
      <div className="wrap development-page">
        <nav
          className="property-breadcrumb"
          aria-label="Development breadcrumb"
        >
          <a href="/developments">Developments</a>
          <span>/</span>
          <a href={`/properties?area=${encodeURIComponent(d.area)}`}>
            {d.area}
          </a>
          <span>/</span>
          <span aria-current="page">{d.name}</span>
        </nav>
        <header className="development-heading">
          <div>
            <span className="eyebrow">
              <MapPin size={14} />
              {[d.locality, d.city, d.area].filter(Boolean).join(" / ")}
            </span>
            <h1>
              {d.name}
              <em>.</em>
            </h1>
            <p>{d.description}</p>
          </div>
          <a href="#development-models" className="button">
            Explore {models.length} {isShore3 ? "unit types" : "models"}
            <ArrowUpRight size={18} />
          </a>
        </header>
        {isShore3 && <nav className="shore3-development-nav" aria-label="Explore Shore 3"><a href="#development-models">Unit types & prices</a><a href="#amenities">Amenities</a><a href="#show-unit-gallery">Show-unit gallery</a><a href="#shore3-location">Location</a></nav>}
        <figure className="development-hero">
          <img src={d.image} alt={d.imageAlt} fetchPriority="high" />
          <figcaption>{caption}</figcaption>
        </figure>
        <div className="development-facts">
          <div>
            <span>{isShore3 ? "Unit types" : "House models"}</span>
            <strong>{models.length}</strong>
          </div>
          <div>
            <span>Bedrooms</span>
            <strong>{range(models.map((p) => p.bedrooms ?? null))}</strong>
          </div>
          <div>
            <span>Floor area · sqm</span>
            <strong>{range(models.map((p) => areaValue(p.floorArea)))}</strong>
          </div>
          <div>
            <span>{isShore3 ? "Developer" : "Lot area · sqm"}</span>
            <strong>{isShore3 ? "SMDC" : range(models.map((p) => areaValue(p.lotArea)))}</strong>
          </div>
        </div>
        <p className="development-fact-note">
          {isShore3 ? "Unit area range from the source’s pricing examples. Exact layouts, included areas and available units must be confirmed." : <>Published model ranges. Approximate measurements remain labeled on
          individual model pages.</>}
        </p>
        <section className="development-model-section" id="development-models">
          <div className="editorial-heading">
            <div>
              <span className="eyebrow">01 / CHOOSE YOUR SPACE</span>
              <h2>
                Different homes.
                <br />
                <em>One setting.</em>
              </h2>
            </div>
            <a className="text-link" href={catalog}>
              Filter this collection
              <ArrowUpRight size={17} />
            </a>
          </div>
          <div className="property-grid">
            {models.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </div>
          {isShore3 && <Shore3PriceNote />}
        </section>
        {isShore3 ? <><Shore3Amenities /><Shore3ShowUnit /><section id="shore3-location" className="development-community"><div><span className="eyebrow">METRO MANILA / PASAY</span><h2>At the <em>bay.</em></h2><p>Seaside Boulevard, corner Sunrise Drive, Mall of Asia Complex, Pasay City.</p><a className="text-link" href="https://shore3residences.com/location/" target="_blank" rel="noreferrer">View the source location guide ↗</a></div><div><p>Developer: SM Development Corporation (SMDC).</p><p>The reference website lists completion as TBA. Ask JMG about the applicable tower’s current status and the unit offered.</p><a href="/properties?area=Metro+Manila&city=Pasay&project=shore-3-residences" className="text-link">Explore units in Pasay ↗</a></div></section></> : <section className="development-community">
          <div>
            <span className="eyebrow">02 / THE COMMUNITY</span>
            <h2>
              Life at
              <br />
              <em>{d.name}.</em>
            </h2>
            <p>
              Community amenities published by BrokerCel. Ask JMG about their
              current availability and the units offered.
            </p>
          </div>
          <ul>
            {d.amenities.map((a) => (
              <li key={a}>
                <Check size={17} />
                {a}
              </li>
            ))}
          </ul>
        </section>}
        {tours.length > 0 && (
          <section className="development-tour-section">
            <span className="eyebrow">03 / EXPLORE THE DEVELOPMENT</span>
            <h2>
              A closer <em>look.</em>
            </h2>
            <p>
              Development tours from the source catalog. Confirm which models
              and finishes are currently offered with JMG.
            </p>
            <div className="tour-grid">
              {tours.map((t) => (
                <TourPlayer key={t.id} tour={t} />
              ))}
            </div>
          </section>
        )}
        <section className="development-next-step">
          <div>
            <span className="eyebrow">YOUR NEXT CONVERSATION</span>
            <h2>
              Explore what
              <br />
              <em>could fit.</em>
            </h2>
            <p>
              Choose a model and ask JMG about current prices, availability or
              viewing arrangements.
            </p>
          </div>
          <div>
            <a
              href={`/request?${new URLSearchParams({ intent: "viewing", development: id })}`}
              className="button cream"
            >
              Request a viewing
              <ArrowUpRight size={18} />
            </a>
            <a
              className="text-link"
              href={`/request?${new URLSearchParams({ intent: "price", development: id })}`}
            >
              Ask for current details
              <ArrowUpRight size={17} />
            </a>
          </div>
        </section>
        <p className="development-source">
          Property information and imagery imported from{" "}
          <a href={isShore3 ? "https://shore3residences.com/" : "https://brokercel.com/"} target="_blank" rel="noreferrer">
            {isShore3 ? "shore3residences.com" : "BrokerCel"}
          </a>{" "}
          on {isShore3 ? "13" : "11"} October 2026. This is a model catalog; current units and prices
          are confirmed through a conversation with JMG.
          {isShore3 && " The reference identifies itself as an accredited seller’s website; smdc.com is the official developer website. Source images are marketing material attributed to SMDC."}
        </p>
      </div>
    </Shell>
  );
}


