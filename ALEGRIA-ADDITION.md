# Alegria addition and Windows launcher repair

Completed 13 October 2026. Delivery: **JMG-Realty-PH-Alegria-complete-fixed-launcher.zip**, source ZIP only.

## A. Research completed

The supplied official Rocka pages were examined:

- [Alegria project](https://rocka.ph/alegria/)
- [Alyanna](https://rocka.ph/alyanna/)
- [Amaris supplied page](https://rocka.ph/amaris-2/)
- [Anatalia](https://rocka.ph/anatalia/)
- [Arella](https://rocka.ph/arella/)
- [Averie](https://rocka.ph/averie-2/)

Additional official resources examined were the [newer Amaris photo page](https://rocka.ph/amaris/), [gallery](https://rocka.ph/gallery/), [clubhouses](https://rocka.ph/clubhouses-2/), [buyers guide](https://rocka.ph/buyers-guide/), [about](https://rocka.ph/about-us/), [contact](https://rocka.ph/contact-us/), [promos](https://rocka.ph/promos/), [news and events](https://rocka.ph/news-events-2/), and Rocka’s public WordPress media catalog searches for Alegria and all five models. These supplied additional original drawings, the site layout and archival project rendering. The official project page links a [drone video dated 2 July 2024](https://www.youtube.com/watch?v=d-i1Q481Lik); it is linked from the new page.

The web reader could not load several model pages, so their full public HTML and original media were retrieved directly and checked. No current Alegria-specific brochure or verified project amenity photographs were found. Material for unrelated Rocka developments was excluded.

## B. Property content added

The development sits under **Central Luzon → Bulacan → Marilao → Loma de Gato**. Rocka’s project page gives a published land area of **345,846 sqm**, road frontage of **146 linear metres**, and **HLURB LTS No. 035004**. These are source statements, not current construction or availability certification.

| Model | Minimum lot | Total floor area | Bedrooms | Toilets & baths | Carport | Interior photos |
| --- | --- | --- | --- | --- | --- | --- |
| Alyanna | 168 sqm | 181 sqm | 4 | 3 | 2 cars | 11 |
| Amaris | 168 sqm | 168 sqm | 4 / 5, source conflict | 3 | 2 cars | 11 |
| Anatalia | 168 sqm | 181 sqm | 4 | 3 | 2 cars | 13 |
| Arella | 168 sqm | 175 sqm | 4 | 3 | 2 cars | 13 |
| Averie | 168 sqm | 170 sqm | 4 | 3 | 2 cars | 11 |

Model-specific features follow the published lists. Alyanna includes a family area and balcony; Anatalia and Averie name high-ceiling living areas and lanais; Arella names a family area. Amaris’s supplied page names a lanai and five bedrooms, while its newer page names a family area and four bedrooms. Both versions are explained without choosing an unsupported current configuration.

Included are **59 interior photographs**, **five model exterior photographs**, **five original combined ground/second-floor 2D drawings**, the **original vicinity map**, an **archived site layout**, an **archived aerial concept rendering**, and **three Amaris design illustrations** (one exterior rendering and two 3D layouts). This is **75 original source assets**, plus **73 separate optimized display copies**. The two Amaris 3D illustrations retain their original display files.

| Model | Original drawing | Evidence and limit |
| --- | --- | --- |
| Alyanna | `ALYANNA-MODEL-UPDATED.jpg` | Titled Alyanna drawing, dated 14 January 2021, both floors |
| Amaris | `AMARIS-UPDATED.jpg` | Supplied Amaris page, both floors; five bedrooms conflict with newer page |
| Anatalia | `ANATALIA-MODEL-PLAN-2.jpg` | Titled Anatalia drawing, both floors |
| Arella | `ARELLA-MODEL-PLAN.jpg` | Titled Arella drawing, both floors |
| Averie | `AVERIE-FOR-DARIEN.jpg` | Filename association only, no printed model title; Alegria applicability unverified |

All original files retain their downloaded bytes, aspect ratios, labels and geometry. None of these five drawings prints numeric floor/lot areas or room dimensions. Webpage areas are shown separately; no measurements were invented. Optimized plan/map thumbnails are separate files, and the viewer opens the full-resolution original.

The project features section includes pedestrian linear park, walking path, jogging path and outdoor gym/playground. The adjacent commercial town centre, sports/leisure centre and events venue are explicitly **proposed**. Seven nearby landmarks use Rocka’s published estimates from the entrance, with historical/current-route context.

## C. Vicinity map status

The original official map was **found on the supplied [Alegria project page](https://rocka.ph/alegria/)** and successfully included in the **Location and Vicinity Map** section.

Source: [original vicinity map](https://rocka.ph/wp-content/uploads/2021/08/NEW-VICINITY-MAP-2021-alegria-w-BG.jpg), **4961 × 2417 pixels**. Its labels, roads, landmarks and north arrow are preserved. The viewer supports enlargement, zoom, reset, panning, keyboard controls and the existing touch gestures.

The separate [archived site layout](https://rocka.ph/wp-content/uploads/2021/07/ALEGRIA-MAP-LATEST.png) is included with its 2021 context. Its A–I markers have no supplied legend, so none is assigned an invented facility name. The Google Maps link searches the verified published project address; no unverified coordinates or interactive location pin were created.

## D. Implementation completed

- A dedicated `/developments/alegria` page contains overview, five model cards, a responsive specifications table, exterior gallery, expandable model studies, location/map, project features, inquiries and related Marilao homes.
- Five distinct `/properties/alegria-*` routes contain model specifications, correctly associated galleries/drawings, source context and JMG inquiry actions.
- Alegria joins the existing development directory, catalog search, Bulacan/Marilao filters, saved homes, comparisons and request workflow. The catalog now has **20 models/units across six developments**.
- Amaris’s uncertain count is omitted from numeric minimum-bedroom matching. All five models use **Contact for Price**, so numeric budget filtering does not invent prices.
- Existing styles and components are reused. Separate optimized display assets and lazy loading preserve original detail without immediately loading every full-resolution gallery file.
- Titles, descriptions, geographic breadcrumbs, image descriptions and internal links follow the existing framework. No new framework or dependency was introduced.

## E. Missing information or assets

- No verified current asking prices, payment plans, specific available lots, completion status or current furniture/finish inclusions were supplied by the examined model pages.
- Amaris’s current bedroom configuration remains unresolved. The newer gallery does not settle which configuration is offered.
- Averie’s archive drawing refers to Darien in its filename; an exact current Alegria-specific drawing remains needed before treating it as the offered plan.
- No current Alegria brochure or verified project-specific amenity photos were found. Unrelated community photos were not substituted.
- The 2017 aerial rendering, 2021 drawings/map/site layout and publisher landmark estimates are historical material, clearly labeled. They do not prove current construction or available lots.
- JMG’s presentation credits the publisher and does not claim Rocka endorsement. Original source provenance is recorded; retrieval is not represented as independent commercial licensing clearance.

## F. Testing results

Passed:

- TypeScript validation and production build.
- Full asset delivery: **75 original files** matched their SHA-256 records and the bytes served locally; **73 display copies** loaded intact.
- **20 page/route checks**, covering all five Alegria models, development/catalog/request/shortlist pages and representative existing pages.
- Desktop, tablet (**768 × 1024**) and phone (**390 × 844**) browser review. No page-wide horizontal overflow was observed. The narrow comparison table is contained in a scrollable region.
- All five model studies opened with the correct original plan links. Alyanna gallery next-image navigation and plan zoom worked. The vicinity map opened, zoomed and reset on desktop and opened/zoomed on phone. Existing shared viewer behavior is retained; a physical-device pinch gesture was not separately tested.
- Catalog filtering returned five Alegria models in Bulacan/Marilao; minimum four bedrooms returned the four confirmed models; a numeric maximum budget returned none; Contact for Price returned all five.
- Shared comparison showed published areas and the Amaris conflict correctly. Show differences only worked. The viewing link retained three selected Alegria models. A development inquiry offered only its five models, and selecting email correctly made email required.
- Checked model markup had no duplicate IDs, missing same-page anchor targets or broken loaded images. Browser error logs checked during review were empty.
- Fresh long-source-path launcher build, database setup, server startup and visual asset checks passed. Database setup also passed repeat initialization and partial-update resumption. A legacy database copied from a **367-character SQLite file path** retained its probe row, resumed its schema update, and left the original database unchanged.
- The actual **Launch JMG Realty.cmd** was also tested from a fresh extraction with a **216-character source path**, no source dependencies and an empty package cache. First-time package installation, production build, local database setup and served visual assets passed. It reached the ready address and its timed smoke test exited with code zero.

The Windows fix moves local records and builds to a shorter writable location, preserves legacy files, checks actual schema state and avoids repeating completed changes. See **WINDOWS-LAUNCHER-FIX.md**.

Inquiry choices, selected-model context and conditional required fields were tested. **No inquiry was submitted**, so an end-to-end form-save claim is not made. Earlier automatic approval review rejected a dummy local inquiry submission because the website request did not explicitly authorize writing test contact information. That submission was left unperformed; existing form/API code is preserved. QA databases and probe rows are excluded from the ZIP.

No unresolved display or launcher failure remains in the completed checks. Verification was on this Windows computer and local preview; it is not a guarantee for every Windows installation, antivirus policy or network condition.

## G. Existing website preservation

All files from the preceding **Glam/Shore 3/Amaresa ZIP** are retained. The original 15 model/unit records and five development definitions are preserved, and Alegria adds five models and one development. The original eight BrokerCel property records keep their ordering. Glam, Shore 3 and Amaresa asset/data files remain byte-identical.

Necessary shared changes are limited to optional geographic/bedroom/storey fields, gallery source notes and plan thumbnails, displaying those fields, catalog/source attribution, comparison attribution, development dispatch and the Alegria integration. Launcher/storage helpers and startup instructions changed for the expressly requested Windows repair. No unrelated page redesign, dependency update, database schema change, hosting manifest change, publication or deletion of user records was performed.

The packaged archive excludes installed dependencies, builds, runtime state, databases, research downloads and synthetic QA fixtures. Original asset checksums and source URLs are included in **ALEGRIA-ASSETS.json**.
