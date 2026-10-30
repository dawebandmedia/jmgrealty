# Vine and Hill Residences additions

Reviewed 13 October 2026. Updated source ZIP only; no publication or deployment.

## Sources examined

Vine: [homepage](https://vineresidences.com/), [prices and computations](https://vineresidences.com/prices-and-computations/), [Flexi Suite](https://vineresidences.com/flexi-suite/), [2 Bedroom End](https://vineresidences.com/2-bedroom-end/), [2 Bedroom End with Balcony](https://vineresidences.com/2-bedroom-end-with-balcony/), [unit gallery](https://vineresidences.com/units/), [floor plans](https://vineresidences.com/floor-plans/), [amenities](https://vineresidences.com/amenities/), [location](https://vineresidences.com/location/) and [SMDC’s official project page](https://smdc.com/properties/vine-residences/).

Hill: [homepage](https://hill-residences.com/), [Flexi Suite](https://hill-residences.com/flexi-suite/), [Flexi Suite End](https://hill-residences.com/flexi-suite-end/), [Flexi Suite with Balcony](https://hill-residences.com/flexi-suite-with-balcony/), [prices and computations](https://hill-residences.com/prices-and-computations/), [unit gallery](https://hill-residences.com/units/), [floor plans](https://hill-residences.com/floor-plans/), [amenities](https://hill-residences.com/amenities/), [location](https://hill-residences.com/location/) and [SMDC’s official project page](https://smdc.com/properties/hill-residences/).

Full public page HTML was examined, including source price calculator text. Original media URLs, dimensions and SHA-256 checksums are supplied in **VINE-ASSETS.json** and **HILL-ASSETS.json**. The reference domains identify themselves as accredited sellers’ websites; SMDC’s developer pages were used to cross-check project identity and location.

## Content and price basis

Both projects sit under **Metro Manila → Quezon City**. Vine is within the SM City Novaliches complex in Barangay San Bartolome. Hill is on Reliance Street in Barangay Nagkaisang Nayon, Novaliches.

| Development / type | Price shown | Source area | Context |
| --- | --- | --- | --- |
| Vine Flexi Suite | ₱3,884,000 | Calculator 29.65 sqm; card 29.98 sqm | List-price example dated 5 August 2025; undated card advertises ₱3.6M |
| Vine 2 Bedroom End | ₱4,141,000 | Calculator 31.62 sqm | List-price example dated 5 August 2025; undated card advertises ₱3.8M |
| Vine 2 Bedroom End with Balcony | ₱4.0M advertised guide | Card/drawing reference 31.45 sqm | Undated guide; page’s calculator names a different loft |
| Hill Flexi Suite | ₱3,262,000 | Calculator 28.52 sqm, West View | List-price example dated 5 August 2025; card rounds to ₱3.3M |
| Hill Flexi Suite End | ₱3,478,000 | Calculator 29.76 sqm, South View | List-price example dated 5 August 2025; card rounds to ₱3.5M |
| Hill Flexi Suite with Balcony | ₱3.3M advertised guide | Undated card 28.52 sqm | Calculator returns “Unit not found” |

List prices are historical examples, not current quotations or total acquisition costs. Discounts, VAT where applicable, additional charges and current terms require confirmation. Dynamic reservation dates shown by the source calculators were not imported as fixed deadlines. No new payment calculator, financing advice or invented monthly payment was added.

The two undated balcony guides are displayed but use no numeric price for budget matching. They remain available for inquiry instead of being incorrectly treated as verified priced inventory.

## Vine imagery and original plans

Vine has **22 preserved original assets and 22 separate display copies**: two dressed-up unit interiors, four unit-plan images (two monochrome and their colored counterparts), publisher/developer exterior and amenity perspectives, two vicinity maps and a site development drawing.

Flexi and End repeat the same interior and the same standard two-bedroom plan. The standard plan’s 29.65 sqm association comes from its source filename/page heading; the Flexi card says 29.98 sqm, and the End calculator says 31.62 sqm. A distinct End drawing was not verified. The balcony page uses the standard balcony plan associated with 31.45 sqm. No distinct end-with-balcony geometry was verified.

The unit drawings show two bedrooms and a toilet and bath; the balcony drawing adds BAL. No numeric areas, room dimensions or model titles are printed inside these drawings. Their original source files are 617 × 783 pixels; zoom cannot recover detail absent from the source. Original filenames contain “cropped”; the files were downloaded intact without additional cropping or redrawing.

The balcony calculator describes a **different 49.54 sqm 2BR Loft at ₱6,248,000**. This is explained separately on the development page and is not assigned to the 31.45 sqm balcony listing. A distinct loft drawing/interior was not verified, so a complete loft model was not invented.

All collected Vine project/interior imagery appears illustrative or architectural. Official amenity images explicitly say “Artist’s Perspective.” None is claimed to be a verified current, as-built interior photograph.

## Hill imagery and layout limitations

All three supplied Hill model pages repeat the same dressed-up unit image and three flexible layout illustrations. These originals are included for each page as **shared reference material**. The standard/End source computations identify different floor areas, but the repeated illustrations do not establish exact variant geometry. A distinct balcony plan and matching dated price were not verified.

Hill’s bedroom configuration remains described as **Flexible · shared layout references**. No numeric bedroom count is assigned to an offered variant from an illustrative furniture arrangement. These models therefore do not match numeric minimum-bedroom filters. Additional source floor-plan material, shared interiors, project/amenity imagery and location diagrams are kept separate from exact-unit claims.

Hill includes **22 preserved originals and 22 optimized displays**: seven colored layout references, four model/interior images, seven amenity perspectives, one project hero, a vicinity map and two site development drawings. The model-page diagrams are only 302 × 370, 296 × 359 and 291 × 354 pixels. The source floor-plan page adds three larger 1484 × 2316 references plus a narrow 406 × 693 studio. All originals are retained without alteration. The layouts print no numeric area or dimensions; “1.5HP WAC” identifies air-conditioning equipment rather than a measurement.

All Hill project/interior/amenity imagery is illustrative or architectural. The shared model gallery explicitly labels Artist’s Perspective. No current as-built interior or completed-amenity photograph is claimed.

## Website integration

New development pages are `/developments/vine-residences` and `/developments/hill-residences`. Six separate model routes are appended to the property data. Each includes the correct source image, original drawings, price context, source conflicts and JMG inquiry links.

Both pages have unit cards, responsive specification tables, expandable model studies, galleries, original-source links, location maps, distinct **Amenities** sections and development-specific inquiry actions. Existing image viewers supply zoom, reset, image navigation and keyboard controls. Optimized displays and lazy loading are separate from the original artwork.

The catalog now contains **26 models/units across eight developments**. Metro Manila has 13 models, and Quezon City has 10. Search, geographic filters, saved homes, shared comparisons and inquiry choices use the existing framework. No new dependencies or database schema changes were introduced.

## Preservation and delivery

Every file from the previous Alegria ZIP is retained. Its 20 property/model records and six development definitions remain unchanged; Vine and Hill append six models and two developments. Amaresa, Shore 3, Glam and Alegria data/asset files remain byte-identical.

Shared changes are limited to development/model dispatch, source attribution, styles and the new content integration. The previously repaired Windows launcher, package lock, migration SQL and hosting identity are preserved without modification. The startup guide names the latest ZIP and explains the additions.

The delivery excludes dependencies, build outputs, runtime databases, research downloads and QA fixtures. It is ZIP delivery only; nothing was published.

## Verification completed

- TypeScript validation and a production build of the combined website passed. The preserved Windows launcher reached its ready address and checked served styles, scripts and images.
- **44 new original assets** matched their recorded SHA-256 values and their served bytes. **44 optimized display copies** also served intact. All collected assets were visually audited.
- **24 route checks** passed, covering both developments, all six new model pages, catalog/location/request/shortlist pages and representative older properties and developments.
- Vine desktop and phone (390 × 844) layouts were reviewed. Hill desktop, tablet (768 × 1024) and phone layouts were reviewed. No page-wide horizontal overflow was observed; specification tables scroll inside their own 335-pixel-wide phone containers.
- All six model studies opened with their associated originals: two drawings per Vine study and seven shared drawings per Hill study. Vine plan zoom and colored/monochrome navigation worked; Hill larger plan zoom and image navigation worked. Original source quality limitations remain documented.
- Hill amenity-gallery navigation worked, and its vicinity map opened and zoomed on phone. Separate amenities sections are present for both developments.
- Vine and Hill each returned three models under Metro Manila/Quezon City/development filtering. A ₱5M maximum budget returned only each project’s two dated-price examples. Hill’s numeric minimum-bedroom filter excluded its unverified flexible configurations.
- A mixed Vine/Hill shortlist preserved the advertised-price labels and flexible-bedroom text. Show differences only worked; the viewing inquiry retained all three selected models. The Vine development inquiry offered only its own three choices.

Physical-device pinch/full-screen behavior was not separately tested during this addition. No live inquiry was submitted or contact record written. The checks are for the local Windows website; no hosted deployment was performed.

## Limits

Current available units, exact offered configurations, completed facility operation and final purchase quotations require confirmation. Historical completion dates and promotional wording were not used to certify current status. JMG’s listing does not imply developer endorsement.

The sources identify SMDC as the owner of their marketing media and include reproduction restrictions. Attribution and original provenance are retained; this delivery does not claim independent commercial licensing clearance.

No inquiry was submitted during these checks. Earlier automatic approval review rejected a dummy local form submission because writing test contact information was not specifically authorized. Inquiry selection/context can be checked without writing a contact record; form-save verification is not claimed.
