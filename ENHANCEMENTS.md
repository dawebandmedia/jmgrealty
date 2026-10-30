# JMG Realty PH — immediate enhancements

Implemented 12 October 2026.

## Delivered

| Improvement | Behavior |
| --- | --- |
| Viewing requests | Selected model context, preferred date/time and viewing format, chosen contact method, consent, saved reference and explicit appointment-confirmation message. |
| Price and availability requests | Selected model context, development-specific choice, contact method, optional question and saved reference. |
| Shared shortlists | Validated model IDs, up to three models, independent local saving, copyable link and published-fact comparison. No personal details in the link. |
| Comparison differences | Different rows highlighted, differences-only toggle, factual comparisons without synthetic scores or financial projections. |
| Development pages | Three dedicated developments, corresponding models, published amenities and tours, source captions, location links and request actions. |
| Search refinements | Minimum bedrooms, floor and lot areas, price-information filter, URL persistence, removable selections and accurate treatment of missing prices. |
| Owner follow-up inbox | Internal notes, stages for inquiries/applications, Philippine-time dates, overdue/upcoming filters and counts, first-contact timestamp, record conflict protection and authenticated access. |

## Verification

Production builds and TypeScript checks completed successfully. Browser review covered desktop and phone widths of 390 and 320 pixels. No horizontal page overflow was observed on the new request, comparison, development, catalog or owner layouts reviewed.

Synthetic viewing and price requests saved locally, appeared in the owner inbox and retained their selected models and preferred contact methods. The viewing response explicitly stated that the visit was not yet confirmed. Email-only and phone-only contact preferences were exercised. Empty required fields blocked submission.

The two-model comparison highlighted four differing facts and the differences-only switch displayed four rows per model. Copying its link worked; the shared page retained the selected models. The filtered catalog returned the three Madonna models for 4+ bedrooms, at least 135 sqm floor area and at least 160 sqm lot area, preserving approximate labels. Maximum-price searches excluded unknown prices, with a separate route to request their prices.

Owner stage and notes changes saved. A date-only change saved as 9:30 AM Philippine time, persisted after reload, updated upcoming counts, became overdue when changed to a past date, and appeared alone under the overdue filter. Clearing the date removed that record from the overdue filter. The final sample was restored to a future follow-up. Existing records remained after the additive database migration. Synthetic records remain only in the development database; no client was contacted.

## Operational limits

- Requests require JMG's response and confirmation. They are not live appointment bookings or availability guarantees.
- The inbox displays reminder indicators. Automated email, SMS and calendar notifications are not connected.
- The catalog is an 11 October 2026 snapshot, not live inventory. Published approximate measurements and illustration captions remain visible.
- A localhost shortlist link works on the same computer. Cross-device sharing requires a published site and recipient access.
- The existing owner-private Site has no live deployment. You authorized temporary repository write access and private publication; that authorization was accepted. The next step was rejected by the session terminal policy when sending the credential through the publishing helper's required stdin channel. No source was pushed or deployed.

## Source and database

New presentation is in `app/enhancements.css`; focused requests are in `app/property-requests.tsx` and `app/request/page.tsx`; comparisons are in `app/comparison.tsx` and `app/shortlist/page.tsx`; developments are in `app/developments/`; owner tools are in `app/owner/` and `app/api/inbox/handlers.ts`.

`drizzle/0001_faulty_richard_fisk.sql` adds four follow-up fields to the existing submissions table. The previous migration remains unchanged. The Windows launcher applies pending local migrations. Local and hosted databases are separate. The ZIP includes source, images and migrations, and excludes runtime data, dependencies and secrets.



