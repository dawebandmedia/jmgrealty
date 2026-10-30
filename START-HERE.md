# Your updated JMG Realty PH website

## Latest update - smaller package and asset-size startup fix

Use **JMG-Realty-PH-Smaller-Website-Asset-Fix.zip**. Extract it into a **new folder**, then open **Launch JMG Realty.cmd**. Copying over an older extraction can leave oversized files behind. Large Plaridel masters are now in a separate optional archive; the website keeps its existing optimized viewer images and working full-size links. The optional originals are not needed to run the website and must stay outside the website's public folder. See **SMALLER-PACKAGE-AND-ASSET-FIX.md** for the repair and verification notes.

## Latest addition - Plaridel Heights

Plaridel Heights is included under **Bulacan > Plaridel**, with seven supplied model/design references, original drawings, model imagery and the original Clara/Esia flyers. Undated price samples are labeled, shared Brisa plans are identified, and Modern Minimalist's exact measured specifications and price remain on inquiry. Inventory files, allocation/status maps, videos and raw lot-specific computations are excluded. See **PLARIDEL-HEIGHTS-ADDITION.md** for source and verification notes. The collection now contains **20 developments and 74 model/unit records**.

## Latest update - model name first, project name underneath

Listing cards show the model or unit name in large text, with the project name directly underneath in slightly smaller, readable text. **Browse by model** is the default again. Optional project browsing and the visible Project filter remain available. Featured properties and model detail pages follow the same name order. See **PROJECT-BROWSING.md** for details and verification limits.

## Latest additions — Mawing and Urban Deca Manila

Mawing Residences Sta. Cruz (Porac, Pampanga) and Urban Deca Homes Manila (Tondo, Manila) are included. See **MAWING-AND-URBAN-DECA-ADDITION.md** and the **property-catalogs** folder for the property data, workbook, source notes and verification limits. Original flyers are retained on model/unit pages. Exact Urban Deca C/D plans and Studio/1 Bedroom prices remain on request.

## Smooth motion

All ten motion enhancements are included, with a footer Reduce motion control, device-preference support, touch-friendly behavior and graceful animation fallbacks. See **MOTION-UPDATE.md** for the effect list, compatibility scope and verification limits.

## Audit improvements and confirmed contacts

See **AUDIT-IMPROVEMENTS.md** for the completed changes, manual verification and items still requiring owner/developer confirmation. Broker Cel / Maricel Gacutan and Home Empire PH now have named contact profiles. Maricel's experience and PRC credentials are included from the owner's supplied information. Prices have clearer status/date labels; inquiries, mobile filters, comparisons, SEO and display performance have been improved. All 58 model/category records and 17 developments remain included. This is a ZIP delivery; nothing was published.

This version includes all 20 developments and 74 model/unit records, together with their website images, plans and JMG pages. The separated original masters remain available in the optional Plaridel archive.

## Open on Windows

1. Extract the ZIP into a new folder. A simple location such as Documents\JMG Realty is convenient. Open the extracted **JMG-Realty-PH** folder.
2. Double-click **Launch JMG Realty.cmd**.
3. Keep its window open while browsing. The first launch installs the website packages, builds the site, prepares its local records and checks the styles, scripts and images before opening your browser.

Node.js **22.13 or later**, including npm, and an internet connection are required for the first launch. Later launches reuse installed packages. If the browser does not open, use the address beside **JMG PREVIEW READY**. It starts at http://127.0.0.1:4187/ when that port is free, or prints another available address. Use that printed address.

Each launch builds a separate copy of the website so the files served by an open preview stay consistent. Close an older JMG launcher and its browser tab before opening the updated version.

## The Windows database fix

The launcher keeps its working files in a short, writable folder under **%LOCALAPPDATA%\JMGRealtyPH**. This avoids the Windows SQLite failure that can occur when a ZIP is extracted into a long folder path. The launcher prints the exact **Local records folder**.

Records persist when you launch again from the same extracted source folder. A different extracted folder has its own records folder. The ZIP contains no runtime databases or test requests.

If you update a source folder that already contains .wrangler\state, close its old launcher first. On its first updated launch, the new launcher copies those records to the shorter location, keeps the original files, and applies only database changes still needed. An existing short-location database takes priority. A separate fresh extraction cannot discover records from an unrelated older folder; keep that older folder if its records matter.

If your Windows profile folder is unusually long or restricted, an advanced user can set **JMG_LOCAL_DATA_DIR** to a short writable folder before launching. The usual launcher needs no manual setting. Adding --remote would use a different database and is not the repair.

## Easier inquiry form

On **Contact Us**, the general inquiry form asks for a full name, one email address or mobile number, a service and privacy consent. **Add more details (optional)** reveals location, property type, budget and message. Optional details remain optional for every service. Inquiry purposes and city choices are saved in the existing Owner inbox. The separate viewing/price request and recruitment forms retain their established flows. Read **INQUIRY-FORM-UPDATE.md** for validation and delivery notes.

Submissions save to the website database for owner review. Automatic email or SMS notifications are not configured. Local preview records stay on that computer and do not synchronize with the hosted site.

## JMG branding

Your supplied green-and-gold logo replaces the previous placeholder mark. The header uses a transparent compact version without the tagline; the footer and About page retain your full original logo and tagline. The browser icon uses the building emblem. Original artwork and prepared assets are in **public/brand**. See **BRANDING-UPDATE.md** for preparation notes.

## Listing imagery

Main page imagery now comes from your property collection: Nila, Alegria, Amaresa, Milan and Vivaldi. Captions link to the pictured properties and distinguish model styling, amenities and renderings. See **LISTING-IMAGERY-UPDATE.md** for the image-to-page map.

## Explore the additions

- **Milan Residenze Fairview and Vivaldi Residences Cubao:** Metro Manila → Quezon City. Five Milan residential references and three Cubao unit types, with selected unit photographs, original layout/model sheets, separate amenities and location maps. Milan’s sample prices are dated 23 September 2026 and expired 30 September; Vivaldi’s one-/two-bedroom samples are dated 25 September and expired 2 October. The Vivaldi Studio uses an undated developer website estimate. Milan Corner is on inquiry. Gross areas include balconies; source-area differences and representative plans remain labeled. See **MILAN-VIVALDI-ADDITION.md** for exact guide figures and limitations. No videos, inventories, raw price PDFs, client material or full sales decks from these folders are included.

- **APEC Homes Norzagaray:** Bulacan → Norzagaray → Partida. Four original model sheets and matching plans: Townhouse 44, its carport-provision variant, Duplex 45.50 and Single Attached 45.50. Each model page includes its complete model sheet, with zoom controls. A shared bare-turnover reference and vicinity map are included. Prices are anonymous model-level TCP references dated 24–26 August 2026, before discounts; Single Attached is on inquiry. Open upper floors and two-bedroom provision are labeled clearly. Client records, inventories, lot-level price PDFs, complete sales presentations and internal material are excluded.

- **Pacifictown Naic 5:** Cavite → Naic. Socialized Housing, Townhouse and Single Attached with flyer prices of ₱1.1M, ₱1.5M and ₱2.5M, plus lot and floor areas transcribed from the supplied undated flyer. Related Naic listing photos and one similar-size single-attached plan are clearly identified as unverified for Phase 5. No Naic 5-specific plan, exact address or amenity photographs were found; the displayed reservation fee, Pag-IBIG badge and flood-free statement are flyer claims requiring confirmation.

- **UHome Leon Guinto:** Metro Manila → Manila → Malate. Studio Residential, One-Bedroom Residential, Bi-Level Loft, Tri-Level Loft and Condormitel, with architectural renderings, separate amenities and a location map. Prices are on inquiry; verified measured plans and current official prices were not found. Category-specific and shared imagery limitations are labeled. Unknown areas and bedroom counts do not match numeric space filters; unpriced categories do not match a budget ceiling.

- **Greenway Place Phase 1 and Phase 2:** Bulacan → Santa Maria → Caysio, as separate developments. Phase 1 has four house types, original open-upper-floor drawings, shared dressed-up model-home photographs and a bare-turnover reference. Phase 2 has Townhouse 68 with Garage: 56 sqm floor area, separate 68 sqm developable area, three bedrooms and its own profile/plan sheets. Prices are historical July 2026 TCP guides, before discounts. Inventories and private sales/payment material are excluded.

- **Lanello Heights:** Cavite → General Trias. Abbie, Brenda and Chelsea, with the three supplied model photographs, original brochure floor plans, facade illustrations, community perspectives, a vicinity map and separate amenities. Each model shows the requested ₱2.3M–₱3M indicative JMG guide range. Confirm current quotation and reservation terms.

- **Nila Residences:** Metro Manila → Manila → Paco. Classified as **Condominium** across cards, model pages and search filters. Four unit types with original generic floor plans, shared architectural interior renderings, exterior perspectives and separate amenities. Type price ranges are dated 23 June 2026, inclusive of VAT and exclusive of transfer/other charges. Ask for a current quotation and matching subtype plan; parking and area differences remain labeled. No inventory or client documents are included.

- **Vine Residences:** Metro Manila → Quezon City → Vine. Three source unit presentations, original colored/monochrome plans, shared interiors, location maps and separate amenities. Area and calculator conflicts are marked.
- **Hill Residences:** Metro Manila → Quezon City → Hill. Three Flexi Suite variants, preserved shared source layouts, model galleries, maps and separate amenities. Its balcony calculator has no matching unit; the advertised guide and exact-plan limitation remain labeled.

Both developments’ standard/End prices are historical list examples dated 5 August 2025. Undated balcony advertised guides require matching quotations and are excluded from numeric budget matching. Hill bedroom counts remain flexible/unverified and do not match numeric minimum-bedroom filters.

- **Alegria Lifestyle Residences:** Properties → Bulacan → Marilao → Alegria. Five models, 59 interior photos, five exterior photos, original archived floor drawings, the original vicinity map, an archived site layout and separate project features. Expand a model study or open its full guide. Select images to enlarge, zoom and inspect the originals.
- **Glam Residences:** Metro Manila → Quezon City. Four unit types, source drawings, model/shared imagery, a location guide and a separate amenities section.
- **Shore 3 Residences:** Metro Manila → Pasay. Three priced unit types, available source drawings and imagery, with amenities in a separate section.
- **Amaresa Homes:** Bulacan → Marilao. The four existing models retain their added official interiors and original floor plans.

Alegria prices and availability require inquiry. Amaris has an unresolved four/five-bedroom conflict between Rocka pages and its archived drawing. Averie’s archive drawing filename mentions Darien, so its applicability to an Alegria lot is marked unverified. Source dates, approximate areas and condo drawing conflicts remain visible.

## Flyers on model pages

Always include the complete supplied flyer in a visible, zoomable section on each relevant model page. Pacifictown Naic 5 has this section on Socialized Housing, Townhouse and Single Attached; its original flyer is preserved unchanged. Model thumbnails use self-contained crops of the same flyer.

## Price notice

Every property card, featured-home price, model header, inquiry sidebar and comparison price uses the shared notice: **Pricing may change at any time. Contact JMG Realty PH for current prices.** Each development price table also has the notice beside its guide. It uses a soft sage background and readable text, with a light version on dark inquiry panels. New property entries inherit it automatically through the shared components; use PriceNotice for any new custom price presentation. Source-date, fees and price-basis notes remain visible.

## Search, compare and inquire

Open **Properties** for the compact catalog. Search and the main filters are visible on desktop; use **Filters** on mobile and **More filters** for development, bedroom and area controls. Switch between grid/list views, sort the full collection, and use numbered pages with 12 or 24 results per page. Filters and page choices are retained in the URL. See **CATALOG-REDESIGN.md** for the reference research and validation. The compact card style also appears on development and related-model sections. A maximum budget matches only models with numeric published prices. **Contact for Price** shows models needing a price request. Amaris does not match numeric minimum-bedroom filters because its count is uncertain.

Save up to three models and open **Saved** to compare them. **Show differences only** and **Copy link** work with selected models. Local preview links open on the same computer; sharing across devices requires a published website. Saved selections belong to the browser and website address.

**Request a viewing** and **Get current price & availability** retain selected model context. A development inquiry offers that development’s models. Viewing preferences are requests for JMG to confirm, not confirmed appointments.

## Owner inbox

Open the **Owner inbox** address printed by the launcher, or add /owner to the preview address. The local password is **local-preview-only**.

Requests save locally. Notes, stages and follow-up dates use Philippine time (GMT+8). Reminders do not send email, SMS or calendar notifications. Local and hosted databases are separate.

## Edit later

| Content | Source file |
| --- | --- |
| Company contacts, services, FAQs and team | app/content.ts |
| Original properties, developments and BrokerCel tours | app/property-data.ts |
| Pacifictown Naic 5 facts and assets | app/pacifictown-data.ts, app/pacifictown-assets.json |
| Pacifictown Naic 5 page and styles | app/pacifictown-development.tsx, app/pacifictown.css |
| Greenway phase facts and assets | app/greenway-data.ts, app/greenway-assets.json |
| Greenway phase presentation | app/greenway-development.tsx, app/greenway.css |
| Lanello facts and assets | app/lanello-data.ts, app/lanello-assets.json |
| Lanello development presentation | app/lanello-development.tsx, app/lanello.css |
| Nila facts and assets | app/nila-data.ts, app/nila-assets.json |
| Nila development presentation | app/nila-development.tsx |
| Vine / Hill facts and asset mappings | app/vine-data.ts, app/vine-assets.json, app/hill-data.ts, app/hill-assets.json |
| Alegria facts and model-to-asset mapping | app/alegria-data.ts, app/alegria-assets.json |
| Alegria development presentation | app/alegria-development.tsx, app/alegria.css |
| Glam facts and assets | app/glam-data.ts, app/glam-assets.json |
| Shore 3 facts and assets | app/shore3-data.ts, app/shore3-assets.json |
| Amaresa interiors and plans | app/amaresa-media-data.json |
| Shared gallery and zoom viewer | app/model-media.tsx |
| General inquiry form, options and validation | app/simple-inquiry.tsx, app/inquiry-options.ts, app/inquiry-validation.ts, app/inquiry.css |
| Inquiry submission endpoint | app/api/submissions/route.ts |
| Request form and comparison | app/property-requests.tsx, app/comparison.tsx |
| Windows launcher and local storage | scripts/open-local.mjs, scripts/local-storage.mjs |

## Delivery and reports

This is an **updated source ZIP only**. No website was published or deployed as part of these additions. The existing hosting identity remains in the source for possible later use.

Read **PACIFICTOWN-NAIC-5-ADDITION.md** for research, limitations and source notes, and **PACIFICTOWN-NAIC-5-ASSETS.json** for original asset provenance and checksums. Read **GREENWAY-ADDITION.md** for the latest two phase additions and **GREENWAY-ASSETS.json** for their original asset checksums. Read **LANELLO-ADDITION.md** for the earlier Lanello addition and **LANELLO-ASSETS.json** for its original asset provenance. Read **NILA-ADDITION.md** for the earlier Nila addition and source limitations, and **NILA-ASSETS.json** for asset provenance and checksums. Read **VINE-HILL-ADDITION.md** for the earlier Vine and Hill additions. Read **ALEGRIA-ADDITION.md** for the required research and completion report, **ALEGRIA-ASSETS.json** for original asset provenance and checksums, and **WINDOWS-LAUNCHER-FIX.md** for repair details. Earlier addition reports remain included.







