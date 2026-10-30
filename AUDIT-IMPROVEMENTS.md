# JMG Realty PH — audit improvements, 15 October 2026

This delivery is an updated source ZIP only. No hosted version or audience setting was changed.

## Completed in this delivery

- Added the owner-supplied Broker Cel and Home Empire PH contact profiles to About and Contact. Phone, Viber, WhatsApp and supplied public profiles are distinct, labeled channels. Footer links lead to the same contact section.
- Added Maricel Gacutan's owner-supplied 15 years of Philippine real estate experience; PRC Broker License No. 0037391; PRC Appraiser License No. 0014262; and PFRESPI membership. No independently checked license-status badge, expiry date, testimonial or office address was invented. The accidentally copied `svg` words are omitted.
- Named Maricel as the appraisal inquiry contact, using the credentials supplied by the owner.
- Standardized historical / expired / undated / JMG-guide / on-inquiry status and source dates on cards, detail headers, inquiry panels and comparisons. The required price notice remains unchanged. Milan and other property social previews include the price status rather than presenting an expired sample as a current offer. A source review date is explicitly distinguished from a price refresh.
- Changed result counts to model and unit categories, not available inventory. UHome's category-only entries and known area conflicts have visible labels.
- Added House & Lot as a parent search category, with house subtype filters. Old subtype URLs still populate the correct controls. Added starting-price versus full-displayed-range budget matching. These compare reference prices, not final all-in costs; additional fees and changing quotations still apply.
- Added an explicit reviewed measurement/budget-bound record for every one of the 58 model/category entries. Conflicting or unverified areas are excluded from numeric space matching. Minimum-area matching uses the minimum published value for ranges. Unknown bedroom counts and bedroom provisions remain excluded from minimum-bedroom filters.
- Broadened homepage budgets from ₱3M to ₱200M, limited the discovery dropdown to catalog regions, prioritized property discovery and inquiry, and featured models from multiple developments and locations. Other service areas remain accessible in the location section.
- Added direct Contact-page inquiry/message anchors. The inquiry form appears before long contact information on mobile. Property-specific forms accept one email address or mobile number and allow an undecided viewing schedule; chosen schedules remain preferences requiring confirmation. Server-side checks, consent, rate limits and model-context validation remain in place. No database migration was needed.
- Removed duplicate primary/gallery interior presentations while retaining unique images, original plans and flyers. Primary image dialogs have per-image labels, captions and source links where matching asset records exist. Source geometry and original images were not redrawn or replaced.
- Replaced the all-development comparison disclaimer with expandable notes for selected models only. Added visitor FAQs about price guides, fees, representative imagery, viewing confirmation and catalog counts.
- Improved mobile filter labels, control sizes and advanced-filter stacking. Content remains visible when JavaScript/reveal observers are unavailable. Reduced-motion preferences are respected.
- Added canonical URLs, targeted page descriptions, organization/contact structured data and property/development breadcrumbs. No current-price Offer schema is emitted from historical prices. Sitemap modification dates are fixed to the actual content update, rather than regenerated on every request. Set `NEXT_PUBLIC_SITE_URL` to the intended domain before rebuilding for a different host.
- Added owner-inbox daily response guidance. Existing response/follow-up queues remain usable. Automatic email, SMS, Viber and WhatsApp notifications are **not connected**; the website does not claim otherwise.

## Display performance

The original files remain in the package. Smaller display copies are used for navigation, footer/About and browser icons. Format conversion preserves the source artwork; it does not create new architectural imagery.

| Asset | Previously served | New display asset |
| --- | ---: | ---: |
| Header artwork | 637,864 bytes | 23,524 bytes |
| Full logo wrapper | 141,225 bytes | 29,370 bytes |
| Favicon | 836,709 bytes | 2,386 bytes |
| Apple icon | 627,339 bytes | 26,536 bytes |
| Nine fonts combined | 1,837,460 bytes | 444,828 bytes |

The fonts are now true WOFF2 files with the complete original glyph coverage. These totals describe assets, not a measured page-load or Core Web Vitals score. The large archive includes original plans, flyers and photographs; its size is not the homepage download size. Development-directory images are lazy-loaded with reserved display proportions.

## Owner actions before public publication

1. **Current written quotations:** obtain exact-configuration prices, validity dates, VAT basis, parking, transfer/move-in/financing charges, payment terms and availability. Historical numbers were preserved, not refreshed or guessed. Lanello's ₱2.3M–₱3M remains the owner's indicative JMG guide.
2. **Matching unit documents:** resolve Nila Premium 4 Bedroom's 370.25 sqm overview versus 352.50 sqm standard plan, and parking differences by subtype. Confirm Vine/Glam area conflicts, Hill shared-variant plans, Milan reference-area mismatches and representative 1BR imagery. UHome needs measured sales areas, matched plans and a current price schedule. Pacifictown Naic 5 needs phase-specific plans and a confirmed entrance/address. Confirm Greenway/Norzagaray provision versus delivered layout. Existing explanatory notes remain visible.
3. **Image permissions:** attribution is not commercial reuse permission. In particular, the reviewed Glam seller material and Vine/Hill reference sites include reproduction restrictions. Obtain rights-holder permission or replace restricted assets with approved developer/JMG-owned assets before a public release. See GLAM-ADDITION.md, VINE-HILL-ADDITION.md, ALEGRIA-ADDITION.md and SHORE3-ADDITION.md for source limitations. Packaging retained existing originals and did not publish them anywhere new.
4. **Professional credentials:** the supplied license numbers, experience and membership are recorded as owner-provided facts. Confirm current PRC registration and membership directly; no independent status verification was completed. Public social pages may require login or block automated access; link correctness is not verification of account ownership or current account status.
5. **Lead operations:** choose and configure a notification service and authorized recipient if automatic alerts are desired. Until then, check `/owner` at the beginning and end of each working day. Keep production owner credentials secret, confirm database/backups and make one approved sample inquiry on the intended environment before opening it to clients. Do not use the local preview password on a public server.
6. **Hosting:** confirm the final domain, public audience, HTTPS, live database, contact app behavior and search indexing before publication. The previously referenced host requires sign-in; this local ZIP delivery does not change that. Do not assume a local share URL works for clients.

No videos, inventories, raw price lists, client records or runtime databases were added. No notification/message was sent to any owner or client. Automated test suites were not run; build/type checks and manual browser checks are documented with the delivery.

## Verification in this delivery

- Type checking and the production build completed successfully.
- Manually inspected desktop and 390 × 844 mobile views. Contact and sampled catalog/model/request pages had no observed horizontal overflow.
- Contact's mobile inquiry form begins around 755 pixels from the top, before the long contact section, and its direct inquiry anchor works. The earlier audit measured roughly 1,582 pixels before the change.
- Followed homepage Cavite / ₱3M search to six model categories, opened Lanello Abbie, opened and closed its image dialog, and confirmed access to its original-plan controls. No broken loaded images were observed on that inspected page.
- Parent House & Lot plus ₱3M returned thirteen starting-guide matches; full-displayed-range matching returned ten, excluding the three ranges that exceeded the ceiling. These are model references, not available inventory.
- UHome with a positive floor-area minimum returned zero results, as all five categories lack reviewed measured sales areas. Nila Premium 4 Bedroom visibly labels its area conflict. Unique primary/gallery images remain available without duplicating the same interior sequence.
- Checked Milan's canonical URL, visible expired status/date and expired-price social description. Property and special development pages emitted organization and breadcrumb structured data. UHome cards displayed their category-reference labels.
- Confirmed the single-contact property form and the undecided-schedule option. Turning that option off reveals date, time and viewing-format controls. No real visitor information was entered.
- **A newly saved sample submission was not verified:** automatic approval review rejected creating a persistent sample lead in the local inbox. The owner subsequently chose to skip saving a sample; no inquiry was submitted. The submission path remains unverified end to end. No successful save, owner alert or live-service connection is claimed.

Public links supplied by the owner are retained as given. Some Facebook/website pages were inaccessible to the browsing tool; those accounts and license status were not independently verified. Real-device messaging-app behavior, production indexing, production delivery and measured Core Web Vitals remain outside these local checks.

## Maintaining filter facts

After editing model price/area data, run the optional authoring helper `node scripts/build-catalog-facts.mjs`, then review `app/catalog-facts.json`. It preserves nulls for identified conflicts and unknowns; add explicit conflict rules when new source conflicts are discovered. A new entry without a reviewed facts record is excluded from space filters and full-range budget filtering rather than assigned guessed values. Do not treat a displayed price range's maximum as an all-in payable amount.

