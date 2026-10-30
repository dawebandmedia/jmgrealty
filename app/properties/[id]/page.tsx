import { notFound } from "next/navigation";
import PriceNotice from "../../price-notice";
import PriceContext from "../../price-context";
import { listingShareDescription } from "../../listing-status";
import { BreadcrumbData, canonical } from "../../site-info";
import { Check, MapPin, Phone, ArrowDown } from "lucide-react";
import {
  properties,
  developments,
  propertyTours,
  company,
} from "../../content";
import { Shell, ArrowUpRight, PropertyCard } from "../../components";
import { SaveButton } from "../../shortlist";
import { TourPlayer } from "../../experience";
import PropertyGallery from "../../property-gallery";
import { PropertyRequestLinks } from "../../property-requests";
import { amaresaMedia } from "../../amaresa-media";
import ModelMedia from "../../model-media";
import { shore3Media, Shore3PriceNote } from "../../shore3-sections";
import { glamMedia } from "../../glam-data";
import { GlamPriceNote } from "../../glam-development";
import { alegriaMedia, amarisIllustrationMedia } from "../../alegria-data";
import { vineMedia } from "../../vine-data";
import { VinePriceNote } from "../../vine-development";
import { hillMedia } from "../../hill-data";
import { HillPriceNote } from "../../hill-development";
import { nilaMedia } from "../../nila-data";
import { NilaPriceNote } from "../../nila-development";
import { lanelloMedia } from "../../lanello-data";
import { LanelloPriceNote } from "../../lanello-development";
import { greenwayMedia } from "../../greenway-data";
import { GreenwayPriceNote } from "../../greenway-development";
import { uhomeMedia } from "../../uhome-data";
import { UHomePriceNote, UHomePlanRequest } from "../../uhome-development";
import { pacifictownMedia, pacifictownFlyerMedia } from "../../pacifictown-data";
import { norzagarayMedia } from "../../norzagaray-data";
import { NorzagarayPriceNote } from "../../norzagaray-development";
import { eurotowersMedia } from "../../eurotowers-data";
import { EuroTowersPriceNote } from "../../eurotowers-development";
import { mawingMedia, mawingFlyers } from "../../mawing-data";
import { urbanDecaMedia, urbanDecaSpecs, urbanDecaGallery, urbanDecaImages } from "../../urban-deca-data";
import { AddedPriceNote, UrbanDecaPlanRequest } from "../../new-development";
import { plaridelMedia, plaridelFlyers } from "../../plaridel-data";
import { PlaridelPriceNote, PlaridelFlyerRequest } from "../../plaridel-development";
type Props = { params: Promise<{ id: string }> };
export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const p = properties.find((p) => p.id === id);
  return {
    title: p
      ? p.title +
        " — " +
        developments.find((d) => d.id === p.developmentId)?.name +
        ", " +
        p.city
      : "Property Not Found",
    description: p ? listingShareDescription(p) : undefined,
    alternates: p ? { canonical: canonical(`/properties/${p.id}`) } : undefined,
    openGraph: p
      ? {
          title: `${p.title} — ${p.city}, ${p.area} | JMG Realty PH`,
          description: listingShareDescription(p),
          url: canonical(`/properties/${p.id}`),
          images: [{ url: p.image, alt: p.imageAlt }],
        }
      : undefined,
  };
}
export default async function PropertyDetail({ params }: Props) {
  const { id } = await params;
  const p = properties.find((p) => p.id === id);
  if (!p) notFound();
  const development = developments.find((d) => d.id === p.developmentId)!;
  let officialMedia = amaresaMedia[p.id] || shore3Media[p.id] || glamMedia[p.id] || alegriaMedia[p.id] || vineMedia[p.id] || hillMedia[p.id] || nilaMedia[p.id] || lanelloMedia[p.id] || greenwayMedia[p.id] || uhomeMedia[p.id] || pacifictownMedia[p.id] || norzagarayMedia[p.id] || eurotowersMedia[p.id] || mawingMedia[p.id] || urbanDecaMedia[p.id] || plaridelMedia[p.id];
  const suppliedInteriorSources = new Set((officialMedia?.interiorImages || []).flatMap(image => [image.src, image.displaySrc].filter(Boolean)));
  const galleryImages = [...new Set(p.gallery)].filter((src, index) => index === 0 || !suppliedInteriorSources.has(src));
  const galleryAssets = galleryImages.map(src => {
    const asset = officialMedia?.interiorImages.find(image => image.src === src || image.displaySrc === src);
    return { src, alt: asset?.label || p.imageAlt, caption: asset ? `${asset.label}. ${officialMedia?.galleryDisclaimer || p.imageCaption}` : p.imageCaption, sourceUrl: asset?.sourceUrl || p.sourceUrl, width: asset?.width, height: asset?.height };
  });
  if (officialMedia) officialMedia = { ...officialMedia, interiorImages: officialMedia.interiorImages.filter(image => !galleryImages.includes(image.src) && !galleryImages.includes(image.displaySrc || "")) };
  const isShore3 = p.developmentId === "shore-3-residences";
  const isGlam = p.developmentId === "glam-residences";
  const isVine = p.developmentId === "vine-residences";
  const isHill = p.developmentId === "hill-residences";
  const isNila = p.developmentId === "nila-residences";
  const isLanello = p.developmentId === "lanello-heights";
  const isGreenway = p.developmentId === "greenway-place-phase-1" || p.developmentId === "greenway-place-phase-2";
  const greenwayPhase = p.developmentId === "greenway-place-phase-2" ? 2 : 1;
  const isUHome = p.developmentId === "uhome-leon-guinto";
  const isNorzagaray = p.developmentId === "apec-homes-norzagaray";
  const isPacifictown = p.developmentId === "pacifictown-naic-5";
  const isEuroTowers = p.developmentId === "milan-residenze-fairview" || p.developmentId === "vivaldi-residences-cubao";
  const isMawing = p.developmentId === "mawing-residences";
  const isUrbanDeca = p.developmentId === "urban-deca-homes-manila";
  const isPlaridel = p.developmentId === "plaridel-heights";
  const urbanSpec = isUrbanDeca ? urbanDecaSpecs.find(m => "urban-deca-manila-" + m.key === p.id) : undefined;
  const isCondo = isShore3 || isGlam || isVine || isHill || isUHome || isEuroTowers || isNila || isUrbanDeca;
  const isAlegria = p.developmentId === "alegria";
  const tours = propertyTours.filter(
    (t) => t.developmentId === p.developmentId,
  );
  const related = properties.filter(
    (model) => model.developmentId === p.developmentId && model.id !== p.id,
  );
  return (
    <Shell className="site-model">
      <BreadcrumbData items={[{name:"Properties",path:"/properties"},{name:development.name,path:`/developments/${development.id}`},{name:p.title,path:`/properties/${p.id}`}]} />
      <div className="wrap model-page">
        <nav className="property-breadcrumb" aria-label="Property breadcrumb">
          <a href="/properties">The collection</a>
          <span>/</span>
          {isAlegria && <><span>Central Luzon</span><span>/</span></>}
          <a href={"/properties?area=" + encodeURIComponent(p.area)}>
            {p.area}
          </a>
          <span>/</span>
          {isShore3 && <><a href="/properties?area=Metro%20Manila&city=Pasay">Pasay</a><span>/</span></>}
          {(isGlam || isVine || isHill || isEuroTowers) && <><a href="/properties?area=Metro%20Manila&city=Quezon%20City">Quezon City</a><span>/</span></>}
          {isEuroTowers && <><span>{p.locality}</span><span>/</span></>}
          {isAlegria && <><a href="/properties?area=Bulacan&city=Marilao">Marilao</a><span>/</span></>}
          {isNila && <><a href="/properties?area=Metro%20Manila&city=Manila">Manila</a><span>/</span><span>Paco</span><span>/</span></>}
          {isLanello && <><a href="/properties?area=Cavite&city=General%20Trias">General Trias</a><span>/</span></>}
          {isNorzagaray && <><a href="/properties?area=Bulacan&city=Norzagaray">Norzagaray</a><span>/</span><span>Partida</span><span>/</span></>}
          {isPacifictown && <><a href="/properties?area=Cavite&city=Naic">Naic</a><span>/</span></>}
          {isUHome && <><a href="/properties?area=Metro%20Manila&city=Manila">Manila</a><span>/</span><span>Malate</span><span>/</span></>}
          {isMawing && <><a href="/properties?area=Pampanga&city=Porac">Porac</a><span>/</span><span>Sta. Cruz</span><span>/</span></>}
          {isUrbanDeca && <><a href="/properties?area=Metro%20Manila&city=Manila">Manila</a><span>/</span><span>Tondo</span><span>/</span></>}
          {isGreenway && <><a href="/properties?area=Bulacan&city=Santa%20Maria">Santa Maria</a><span>/</span><span>Caysio</span><span>/</span></>}
          <a href={`/developments/${development.id}`}>{development.name}</a>
          <span>/</span>
          <span aria-current="page">{p.title}</span>
        </nav>
        <header className="model-identity">
          <div>
            <h1>
              {p.title}
              <em>.</em>
            </h1>
            <a className="model-project-title" href={`/developments/${development.id}`}>{development.name}</a>
            <span className="eyebrow">
              {p.city}, {p.area}
            </span>
            <p>
              {p.type}{p.bedroomText ? ` · Bedrooms: ${p.bedroomText}` : p.bedrooms != null && ` · ${p.bedrooms} ${p.bedrooms === 1 ? "bedroom" : "bedrooms"}`}{p.bathrooms != null && ` · ${p.bathrooms} ${p.bathrooms === 1 ? "bathroom" : "bathrooms"}`}
            </p>
          </div>
          <div className="model-first-price">
            <span className="eyebrow">{p.priceLabel?.toUpperCase() || "PUBLISHED MODEL PRICE"}</span>
            <strong>{p.priceText}</strong>
            <PriceNotice />
            <PriceContext property={p} details />
            <a href="#model-inquiry" className="text-link">
              Ask about this home
              <ArrowDown size={16} />
            </a>
          </div>
        </header>
        <PropertyGallery
          stage
          images={galleryAssets}
          title={p.title}
          alt={p.imageAlt}
          caption={p.imageCaption}
        />
        {urbanSpec && <p className="development-fact-note">The complete supplied unit photo flyer appears above. <a className="text-link" href={urbanDecaImages[urbanSpec.flyer].src} target="_blank" rel="noreferrer">Open the original flyer ↗</a></p>}
        <dl className="model-specs">
          {[
            ["Bedrooms", p.bedroomText || p.bedrooms],
            ["Bathrooms", p.bathrooms],
            ["Lot area", p.lotArea],
            ["Floor area", p.floorArea],
            ["Carport", p.carport],
            [isUHome ? "Levels · advertised category" : "Storeys · source drawing", p.storeys],
          ].map(
            ([label, value]) =>
              value != null && (
                <div key={label}>
                  <dt>{label}</dt>
                  <dd>{value}</dd>
                </div>
              ),
          )}
        </dl>
        {p.specificationNote && <aside className="glam-discrepancy">{p.specificationNote}</aside>}
        <div className="model-layout">
          <article className="model-story">
            <nav className="model-jump-links" aria-label="Explore this model">
              <a href="#model-overview">The home</a>
              <a href="#community">Community</a>
              <a href="#imagery">Imagery</a>
              {officialMedia?.interiorImages.length > 0 && <a href={isNorzagaray ? "#model-sheet" : "#interiors"}>{isNorzagaray ? "Model sheet" : isGreenway ? greenwayPhase === 1 ? "Model styling" : "Model profile" : isLanello ? "Facade details" : isCondo || isNila ? "Unit imagery" : "Interiors"}</a>}
              {officialMedia?.floorPlans.length > 0 && <a href="#floor-plans">{isEuroTowers ? "Unit sheets & plans" : isPacifictown ? "Related plan" : "Floor Plan"}</a>}
              {isUHome && <a href="#floor-plans">Floor plan request</a>}
              {(isMawing || isPlaridel) && <a href="#model-flyer">Model flyer</a>}
              {isUrbanDeca && !urbanSpec?.plan && <a href="#floor-plans">Request exact plan</a>}
              {(isCondo || isNila || isLanello || isGreenway || isNorzagaray || isMawing || isPlaridel) && <a href={`/developments/${development.id}#amenities`}>Amenities</a>}
              {isPacifictown && <><a href="#model-flyer">Flyer</a><a href={`/developments/${development.id}#amenities`}>Amenities</a></>}
              {isAlegria && <><a href="/developments/alegria#location-vicinity">Vicinity map</a><a href="/developments/alegria#amenities">Project features</a></>}
              {tours.length > 0 && <a href="#model-tours">Tour</a>}
            </nav>
            <section id="model-overview" className="model-story-section">
              <span className="eyebrow">01 / THE HOME</span>
              <h2>
                Space for
                <br />
                <em>your everyday.</em>
              </h2>
              <p>{p.description}</p>
              {isShore3 && <Shore3PriceNote />}
              {isGlam && <GlamPriceNote />}
              {isVine && <VinePriceNote />}
              {isHill && <HillPriceNote />}
              {isNila && <NilaPriceNote />}
              {isLanello && <LanelloPriceNote />}
              {isGreenway && <GreenwayPriceNote phase={greenwayPhase} />}
              {isUHome && <UHomePriceNote />}
              {isNorzagaray && <NorzagarayPriceNote />}
              {isEuroTowers && <EuroTowersPriceNote projectId={p.developmentId} />}
              {(isMawing || isUrbanDeca) && <AddedPriceNote urban={isUrbanDeca} />}
              {isPlaridel && <PlaridelPriceNote />}
              <ul className="model-feature-list">
                {p.features.map((f) => (
                  <li key={f}>
                    <Check size={18} />
                    {f}
                  </li>
                ))}
              </ul>
            </section>
            <section id="community" className="model-story-section">
              <span className="eyebrow">02 / THE COMMUNITY</span>
              <h2>
                Life at
                <br />
                <em>{development.name}.</em>
              </h2>
              <p>{development.description}</p>
              {!isCondo && !isAlegria && !isNila && !isLanello && !isGreenway && !isPacifictown && !isNorzagaray && !isMawing && !isPlaridel && <div className="amenity-grid">
                {p.amenities.map((a) => (
                  <div key={a}>
                    <Check size={17} />
                    <span>{a}</span>
                  </div>
                ))}
              </div>}
              {isShore3 && <a className="button outline shore3-unit-amenity-link" href="/developments/shore-3-residences#amenities">Explore Shore 3 amenities <ArrowUpRight size={17} /></a>}
              {isGlam && <a className="button outline shore3-unit-amenity-link" href="/developments/glam-residences#amenities">Explore Glam amenities <ArrowUpRight size={17} /></a>}
              {isAlegria && <a className="button outline shore3-unit-amenity-link" href="/developments/alegria#amenities">Explore Alegria project features <ArrowUpRight size={17} /></a>}
              {isVine && <a className="button outline shore3-unit-amenity-link" href="/developments/vine-residences#amenities">Explore Vine amenities <ArrowUpRight size={17} /></a>}
              {isHill && <a className="button outline shore3-unit-amenity-link" href="/developments/hill-residences#amenities">Explore Hill amenities <ArrowUpRight size={17} /></a>}
              {isNila && <a className="button outline shore3-unit-amenity-link" href="/developments/nila-residences#amenities">Explore Nila amenities <ArrowUpRight size={17} /></a>}
              {isLanello && <a className="button outline shore3-unit-amenity-link" href="/developments/lanello-heights#amenities">Explore Lanello amenities <ArrowUpRight size={17} /></a>}
              {isGreenway && <a className="button outline shore3-unit-amenity-link" href={`/developments/${development.id}#amenities`}>Explore Phase {greenwayPhase} amenities <ArrowUpRight size={17} /></a>}
              {isUHome && <a className="button outline shore3-unit-amenity-link" href="/developments/uhome-leon-guinto#amenities">Explore UHome amenities <ArrowUpRight size={17} /></a>}
              {isNorzagaray && <a className="button outline shore3-unit-amenity-link" href="/developments/apec-homes-norzagaray#amenities">Explore Norzagaray community features <ArrowUpRight size={17} /></a>}
              {isEuroTowers && <a className="button outline shore3-unit-amenity-link" href={`/developments/${development.id}#amenities`}>Explore {p.locality} amenities <ArrowUpRight size={17} /></a>}
              {isPacifictown && <a className="button outline shore3-unit-amenity-link" href="/developments/pacifictown-naic-5#amenities">View community details <ArrowUpRight size={17} /></a>}
              {(isMawing || isUrbanDeca || isPlaridel) && <a className="button outline shore3-unit-amenity-link" href={`/developments/${development.id}#amenities`}>Explore community amenities <ArrowUpRight size={17} /></a>}
              <div className="model-location">
                <MapPin size={22} />
                <div>
                  <h3>
                    {p.city}, {p.area}
                  </h3>
                  {p.locality && <p>{p.locality}</p>}
                  <p>
                    {p.locationNote ||
                      "Published location: " + p.sourceLocation + "."}
                  </p>
                  <a
                    href={`/developments/${development.id}`}
                    className="text-link"
                  >
                    Explore this development
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </section>
            {isPacifictown && <ModelMedia title={p.title} media={pacifictownFlyerMedia} />}
            {isMawing && <ModelMedia title={p.title} media={mawingFlyers[p.id]} />}
            {isPlaridel && (plaridelFlyers[p.id] ? <ModelMedia title={p.title} media={plaridelFlyers[p.id]} /> : <PlaridelFlyerRequest modelId={p.id} />)}
            {officialMedia && <ModelMedia title={p.title} media={officialMedia} />}
            {isUrbanDeca && !urbanSpec?.plan && <UrbanDecaPlanRequest modelId={p.id} />}
            {urbanSpec?.sample && <details className="added-reference-details historical-sample-section"><summary>View an original historical computation</summary><ModelMedia title={p.title + " historical computation"} media={urbanDecaGallery("historical-computation", "The dated buyer sample.", "Original June 2026 buyer reference. Some supplied reservation terms have expired. Loan-takeout dates alone do not establish current promotion eligibility. Amounts, loan rates, discounts and eligibility are historical and conditional; request a current written quotation before relying on them.", [urbanSpec.sample], "sample sheet")} /></details>}
            {isUHome && <UHomePlanRequest modelId={p.id} />}
            {p.id === "alegria-amaris" && <ModelMedia title="Amaris" media={amarisIllustrationMedia} />}
            {tours.length > 0 && (
              <section id="model-tours" className="model-story-section">
                <span className="eyebrow">03 / EXPLORE THE DEVELOPMENT</span>
                <h2>
                  A closer <em>look.</em>
                </h2>
                <p>
                  Development tours published on BrokerCel. Ask JMG which
                  models, finishes and inclusions are currently offered.
                </p>
                {tours.map((t) => (
                  <TourPlayer key={t.id} tour={t} compact />
                ))}
              </section>
            )}
            <div className="model-source">
              {(isMawing || isUrbanDeca) && <p>{isMawing ? "Mawing model sheets and photographs supplied from Herencia de Julieta; reviewed 16 October 2026. The price is a dated 8 October 2026 package reference. Complete original model-plan pages and promotional flyers are retained. Furnished inclusions and contract-specific turnover require written confirmation." : "Original supplied ANAYA Realty Services photo flyer, with watermark retained. Additional named unit drawings and community reference: decahomes.com.ph. Reviewed 16 October 2026. Historical sample obligations are dated February–June 2026 and reservation deadlines have passed. Exact C/D plans, current quotations and written inclusions remain on request."}</p>}
              {isPlaridel && <p>Original model materials supplied for JMG from 5R Prime Properties; reviewed 17 October 2026. Dogwood photographs are model references; other model imagery is supplied artist’s perspectives. All price computations are undated examples, not current offers. Clara and Esia include their original flyers. Shared Brisa plans, Dogwood’s sample-package mismatch and Modern Minimalist’s missing measured specification remain labeled. Exact plans, final inclusions and current quotations require confirmation.</p>}
              {!isMawing && !isUrbanDeca && !isPlaridel && (<p>
                {isEuroTowers ? "Euro Towers International Inc. official project page and supplied property references. Reviewed 15 October 2026. Original model/layout sheets and selected photographs are preserved. Gross areas include balcony space; representative-plan and photo-matching limitations remain labeled. Historical sample quotations have expired, and the Vivaldi Studio web estimate is undated. Request the current configuration-matched quotation, exact plan, fees and written inclusions." : isNorzagaray ? "APEC Homes Norzagaray model sheets and original floor plans from the supplied project profile. Reviewed 15 October 2026. Prices are dated August 2026 TCP references before historical discounts; Single Attached is on inquiry. The profile describes bedroom provision, with open upper-floor plans. Confirm the offered configuration, current price and written turnover inclusions." : isPacifictown ? "Pacifictown Naic 5 facts, prices and original flyer supplied for this listing. The flyer is undated; exact location, current terms, amenities and measured Naic 5 plans require confirmation. Any Enclave plan shown is a related reference with unverified Phase 5 applicability." : isUHome ? "University Home official Leon Guinto page and project gallery, plus project-specific broker references. Reviewed 15 October 2026. These are architectural renderings, with shared-category limits labeled. Current official prices, measured plans and exact areas remain on inquiry; confirm current policies and turnover inclusions." : isGreenway ? `Greenway Place Phase ${greenwayPhase} source marketing and anonymous historical price summary. Reviewed 15 October 2026. Phase 1 bedroom provision remains unconfirmed; Phase 2 has 56 sqm floor area and 68 sqm developable area as separate measures. Original phase-specific drawings are preserved. Current prices and turnover inclusions require confirmation.` : isLanello ? "Lanello Heights model photographs and promotional details were supplied for JMG’s listing. Original brochures, facade illustrations and location references: lanelloheights.phproperty.com. Reviewed 15 October 2026. Prices are indicative JMG guide ranges; current quotations and turnover inclusions require confirmation." : isNila ? "Nila project information and generic unit-type drawings: The Mont Property Group. Reviewed 15 October 2026. Shared interior images are architectural renderings. Type price ranges are dated 23 June 2026 and require a current quotation; exact areas and parking depend on the subtype." : isHill ? "Unit presentations and original shared layouts: hill-residences.com, a seller’s reference website. Reviewed 13 October 2026. Standard and End list examples dated 5 August 2025; the balcony guide is undated and its calculator has no matching unit. Shared illustrations do not verify an exact End or Balcony plan. Confirm current terms and the actual unit configuration with JMG." : isVine ? "Unit presentations and original reference drawings: vineresidences.com, a seller’s reference website. Reviewed 13 October 2026. Flexi and End list examples are dated 5 August 2025; the balcony advertised guide is undated and its loft computation is mismatched. Source conflicts remain labeled; confirm current terms and the exact offered unit with JMG." : isAlegria ? "Rocka Homes & Villas official model information, photographs and media archive. Reviewed 13 October 2026. Archived drawings and current model pages may differ; confirm the offered configuration and inclusions with JMG." : isGlam ? "Unit examples and drawings: glamresidences.com, an accredited seller’s reference website. Imported 13 October 2026; computation dated 8 October 2025. Current terms and unit specifications require confirmation. Development facts cross-checked with SMDC." : isShore3 ? "Unit information and marketing imagery: shore3residences.com, an accredited seller’s reference website. Imported 13 October 2026. Its pricing is dated 24 October 2025; current terms and unit specifications require confirmation." : <>Property information and imagery: BrokerCel. Imported 11 October
                2026. Open its homepage and select {development.name} to view
                the original development and model pages.</>}
              </p>)}
              <a
                href={isCondo || isAlegria || isNila || isLanello || isGreenway || isPacifictown || isNorzagaray || isMawing || isPlaridel ? p.sourceUrl : "https://brokercel.com/"}
                target="_blank"
                rel="noreferrer"
                className="text-link"
              >
                View the source
                <ArrowUpRight size={16} />
              </a>
            </div>
          </article>
          <aside className="model-inquiry" id="model-inquiry">
            <span className="eyebrow">YOUR NEXT CONVERSATION</span>
            <h3>
              Let’s talk
              <br />
              about {p.title}.
            </h3>
            <p className="inquiry-price">{p.priceText}</p>
            <PriceContext property={p} details />
            <PriceNotice />
            {p.priceNote && <p className="inquiry-price-note">{p.priceNote}</p>}
            <PropertyRequestLinks ids={[p.id]} light />
            <SaveButton property={p} />
            <a className="inquiry-call" href={"tel:" + company.primaryTel}>
              <Phone size={17} />
              {company.primaryPhone}
            </a>
            <div className="inquiry-checklist">
              <p>
                <Check size={15} />
                Ask about current availability
              </p>
              <p>
                <Check size={15} />
                Confirm finishes and inclusions
              </p>
              <p>
                <Check size={15} />
                Discuss your next steps
              </p>
            </div>
            <a className="inquiry-call" href="/contact#contact-people">Message Broker Cel or Home Empire PH ↗</a>
            <p className="inquiry-hours">Mon–Sat · 8:00 AM–5:00 PM GMT+8</p>
          </aside>
        </div>
        {related.length > 0 && (
          <section className="model-related">
            <div className="editorial-heading">
              <div>
                <span className="eyebrow">KEEP EXPLORING</span>
                <h2>
                  Another way
                  <br />
                  to <em>feel at home.</em>
                </h2>
              </div>
              <p>More models at {development.name}.</p>
            </div>
            <div className="property-grid">
              {related.map((m) => (
                <PropertyCard key={m.id} property={m} />
              ))}
            </div>
          </section>
        )}
      </div>
    </Shell>
  );
}




