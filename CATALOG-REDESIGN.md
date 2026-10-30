# Compact property catalog

Prepared for JMG Realty PH on 15 October 2026. This is the complete cumulative website source package. Open `Launch JMG Realty.cmd` after extracting the ZIP.

## Reference research

The public [Mapiles house-and-lot catalog](https://mapiles.ai/for-sale/house-and-lot/) uses a short heading, keyword search, province/city/type controls, a three-column desktop grid and 12 results per page. Cards present a photograph, price, model, location, icon-based specifications, project attribution and a detail link. Rendered cards use equal-height card containers; the inspected desktop thumbnails were 160px high with `object-fit: cover`. Its desktop inquiry form occupies a right column. On a 390px viewport, cards and filters stack into one column, and navigation collapses. Pagination retains the selected province in the URL. These observations were checked in a live browser, including Bulacan filtering and page 2. The button labeled “Advanced Search” submits the visible location/type selections. [Source](https://mapiles.ai/for-sale/house-and-lot/)

The [Mapiles homepage](https://mapiles.ai/) also emphasizes price, location, compact specifications and project attribution in its featured-property presentations, with separate search and comparison tools. [Source](https://mapiles.ai/)

Research covers public page structure, rendered styles and browser behavior. JMG's implementation was written for the existing React/Vinext application. Property data, photos, pricing and source caveats remain JMG's existing catalog content.

## Changes applied

- A smaller catalog header brings search and results closer to the top.
- Keyword search and the four main desktop filters remain visible. Development, bedrooms, floor area, lot area and price-information controls are available under **More filters**.
- Mobile has an inline **Filters** panel with a **Show results** button. The layout was inspected at 390px and 320px widths.
- A continuous grid replaces the large location/development sections between listings. Every card includes its development link, so models retain their project context.
- The same compact cards appear in development collections and related-model sections. Homepage feature presentations retain their existing editorial layout.
- Desktop uses three columns, tablet two and mobile one. A list-view control provides an alternate layout.
- Results show their total and visible range. Numbered pages, previous/next controls and 12/24-per-page options limit scrolling.
- Global sorting offers location, ascending/descending price and largest floor area. Sorting runs across the full matching collection before pagination.
- Search, filters, sorting, view, page and page size are represented in the URL. Shared links and return navigation restore the chosen results; initial server rendering also reads the query.
- Existing saved-model comparisons, request links, property tours and all model/detail pages remain available. Tours are expandable to keep the listing page shorter.

## Content and pricing safeguards

The exact notice remains beside every card price: **Pricing may change at any time. Contact JMG Realty PH for current prices.** Its soft sage treatment is retained, with readable 12px text on compact cards and the existing larger treatment on model pages.

Price basis and dates stay visible. Longer specification notes can be expanded on each card. Unknown prices never count as budget matches, and unquoted models stay last in either price-sort direction. A separate helper identifies models needing price confirmation. Unknown bedroom counts and bedroom provisions do not satisfy a numeric minimum-bedroom filter. Range-based area filtering continues to use the lower published value.

JMG thumbnails preserve the whole source image with `object-fit: contain`; this keeps model-sheet and flyer information from being cropped. Original media, flyers, floor plans, source labels and prior privacy exclusions remain in place. No Mapiles scores, price records, photos or contact forms were added.

## Verification

- TypeScript and production build completed successfully.
- Twelve focused checks passed for URL validation/round trips, unknown prices, global sorting and source-aware space/bedroom filters.
- Browser checks covered pagination, page size, combined filters, price-confirmation messaging, keyword search, grid/list controls, empty results, saved comparison, model navigation and return to results.
- Responsive inspection found no horizontal overflow at 320px and 390px, including mobile filters and list view.
- Shared development and related-model cards retained their price notices and model links.
- The package preserves all prior property data, original media and Windows launcher/storage files, and excludes runtime databases, test requests and private source material.

The ZIP is for local use and later deployment by the owner; this update has not been published.
