# Source and verification report

Review date: 16 October 2026.

## Coverage

- 102 files accounted for: 32 PDFs, 47 HEIC photographs, 10 JPGs and 13 PNGs.
- All 70 image files decoded and visually categorized. There are 69 unique image hashes; two bedroom-ad files are exact duplicates.
- All 22 pages of the seminar and all three generic marketing PDFs were text/visually reviewed.
- All 27 price/computation PDFs were opened and screened for public intent, document dates and sensitive schema. The dated pricelist was visually checked for model/area/amount matching. Raw lot-specific computations are excluded; their full financial schedules were not audited for publication.
- The inventory file was identified and metadata checked only. Its stock/lot contents were intentionally not extracted.
- No corrupt or inaccessible file was found.
- Three model sheets contain six floor levels: three ground-floor plans and three second-floor plans. They are not interchangeable: compare each named model sheet.

## Verification issues

### V01: Prices

The dated pricelist and computation sheets identify individual lots. Only a generic 96 sqm package-price reference is released.

Action: Obtain current public model-level quotations.

Source: S101; S075-S100.

### V02: Promotions and financing

Lot-specific computations contain dated schedules, different financing assumptions and discounts. Public validity is unconfirmed.

Action: Do not publish raw computations, discounts or monthly amounts until a current public offer is approved.

Source: S075-S100.

### V03: Amenities

Reference website advertises swimming pool, security and playground. Supplied seminar instead identifies clubhouse, basketball court, parks and jogging path.

Action: Use supplied seminar list and confirm current amenities; omit conflicting website claims.

Source: S102 page 7; W001.

### V04: Bathrooms

Website says provision for two bathrooms; supplied model sheets explicitly specify two toilets and baths.

Action: Use primary model sheets and confirm offered turnover specifications.

Source: S102 pages 10-12; S013; W001.

### V05: Completion

Marketing pages show L.D. December 2030. It does not establish the turnover date of every home.

Action: Keep original wording and request contract-specific completion and turnover.

Source: S102; S013.

### V06: Furnished inclusions

Furnished marketing schedule and source photos show different fit-out stages.

Action: Show schedule as advertised, with written inclusions required.

Source: S013; S014-S060.

### V07: Original photo metadata

All 47 HEIC photographs contain GPS metadata.

Action: Publish full-resolution JPEG conversions with EXIF/GPS removed; source HEICs stay in supplied folder.

Source: S014-S060.

### V08: Image association

Shared styled photographs and nine interior renders do not identify a model.

Action: Keep shared project media separate; do not assign to a specific model.

Source: S004-S009; S065-S073.

### V09: Duplicate media

interior 5.jpg and interior4.jpg have the same SHA-256.

Action: Keep two source records with one physical output asset.

Source: S004; S009.

### V10: Map currency

Supplied vicinity map labels some landmarks as very soon. Distances are publisher estimates.

Action: Use schematic map and neutral landmark names; verify openings and route before viewing.

Source: S074; S102 pages 5-6.

### V11: Permissions and regulation

Developer assets supplied for JMG use; independent licensing and regulator validation are not supplied.

Action: Retain source attribution and obtain any required redistribution clearance; verify regulatory claims before treating them as independently confirmed.

Source: S102.

### V12: Lot-size variants

Pricing material also contains nonstandard lot-size examples tied to individual inventory.

Action: Do not create additional model types or publish inventory-specific variants; request public variant sheets.

Source: S101.

## Source key

- S102: Product Knowledge Seminar - Mawing Residences Sta. Cruz.pdf, 22 pages. Generic facts: pages 3, 7, 8, 10-12, 16, 19. Pages with inventory or individual pricing context are excluded.
- S013: Marketing Materials/INCLUSIONS.pdf.
- S002: Marketing Materials/BANK CHECKLIST REQUIREMENTS.pdf, blank generic checklist.
- S074: Marketing Materials/VICINITY MAP.pdf. Some nearby openings and distances are unverified.
- S101: Price and Computation/PRICELIST - OCT 8.pdf. Its page explicitly dates the official pricelist 8 October 2026. Only the anonymous 96 sqm model-level price portion is used. The original table is withheld.
- S075-S100: individual-lot computation sources. Their source filenames are withheld because they identify inventory.
- S001: inventory source, excluded.
- Other source IDs: image records in the workbook / JSON source-review ledger.

[W001: Pampanga Properties reference page](https://www.pampanga-properties.com/mawing-residences-sta-cruz-porac.html), accessed 16 October 2026. This is a broker reference, not a verified regulator record or current developer quotation.

## Implementation verification

Production build and TypeScript checks passed. Local source checks cover identifiers, asset files/hashes, typed prices, measurement filter bounds, named plan matching, inquiry URL context and confidentiality exclusions. No automated test suite ran. No inquiry was submitted or saved.

Live browser inspection could not be completed: browser policy blocked an existing error-page tab and automatic approval review rejected a subsequent local preview read as an alternate access path. A preview startup also encountered a sandbox access denial for Wrangler user configuration. Source/build checks do not establish visual behavior on physical phones or other browser engines.
