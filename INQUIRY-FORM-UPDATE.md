# Easier general inquiry form — JMG Realty PH

The Contact page’s “How can we help?” form now starts with three fields: full name, one email address or mobile number, and the service needed. Privacy consent remains required and unchecked. A message, budget, location and property type are genuinely optional.

## What changed

- One contact input accepts email or a mobile number. Philippine mobile formatting includes 09, +63, country-code-only, spaces, parentheses, hyphens and optional trunk zero. Supported Philippine numbers normalize to +63 for reliable contact storage. Complete international numbers are also accepted for overseas clients. Invalid supplied contact details receive an inline explanation.
- “Add more details (optional)” stays collapsed initially. It retains entered values when collapsed and submits those values. The current eight service areas and existing catalog/tour city hierarchy supply location choices; no cities were invented. Existing property categories remain available.
- Buying, selling, rental/leasing, investment, property inquiry and “Other / Not Sure Yet” choices are available alongside every existing JMG service. The established backend service categories remain intact. A separate inquiry-purpose detail preserves the client’s more specific selection in the inbox.
- The same four optional fields use appropriate labels and guidance for the selected service. There are no new service-specific required fields.
- Existing service, area, city, property and type query context is retained where recognized. Prefilled property interest is identified above the collapsed details.
- Required-field errors appear beside their controls and focus moves to the first field needing attention. Editing clears that field’s error. Validation does not insert errors during a pointer click, preventing moving controls on blur.
- The dark green submit button shows a loading state. An immediate submission lock and disabled controls prevent a double-click from creating another request while processing. A failed request retains every value and consent choice, exposes retry and direct contact options, and never shows success.
- Confirmation appears only after the existing endpoint confirms a saved inquiry with a valid reference. “Send another inquiry” clears the form and consent for a new inquiry.
- Privacy wording explains the response purpose and links to the existing `/privacy` page in a new tab, so the draft remains in place.
- The layout uses two columns where there is room and one column on tablet/mobile. Focus styles, 48px inputs, 44px expansion control, readable labels, 16px mobile inputs and reduced-motion styles are scoped to this form.

## Integration and scope

The shared general `InquiryForm` now renders `SimpleInquiry`. Recruitment continues using its original form. Viewing and price/availability requests retain their original component and requirements. No property listings, site navigation, media, pricing notices, unrelated page layouts or existing animations were redesigned.

The existing `/api/submissions` endpoint, database table and protected owner inbox remain in use. General inquiries accept email-only or phone-only contact and an omitted message. Application requirements and property-specific viewing checks remain in place. New purpose, city and contact-preference details use the existing details JSON, with inbox labels added; no database migration or new integration is needed. Origin checks, size limits, honeypot and rate limits remain active.

## Validation completed

- TypeScript check and production build passed on the final implementation.
- The included `scripts/test-inquiry.mjs` passed 42 validation checks covering contact formats, normalization, malformed values, name boundaries, consent and minimum fields.
- 41 local endpoint response checks passed: minimum email-only and phone-only inquiries; optional data omitted; short optional messages; complete details; all six new purpose choices and all six existing services; missing fields; invalid email/phone/city/type/service; mismatched purpose; consent; honeypot; cross-origin protection; malformed JSON; rate limiting; existing application, price and viewing requests; invalid viewing date. Stored records were read back from the protected test inbox to verify optional details and normalized contact values.
- Browser checks passed for missing-field messages and first-error focus; invalid mobile contact; one-click expansion after editing; keyboard Tab/Enter navigation; collapse/reopen without data loss; varied service labels without extra required fields; query prefills remaining collapsed; unselected consent; reset after success; and desktop, 1024px tablet and 390px mobile layout without horizontal overflow.
- A local test proxy simulated a 20-second failed submission. The loading state disabled the button; a double-click caused exactly one request. The failure preserved all fields, showed no confirmation and enabled retry. Retry saved to the actual local endpoint. Saved city, type, budget and message were read back and matched.
- A mobile browser submitted only a name, international-format Philippine mobile number, chosen service and consent. The saved record contained no email or optional details.

All API and browser submissions used synthetic test entries in an isolated local database. The test database, proxy, sessions and submitted records are excluded from the delivered ZIP.

## Existing backend limits

This website saves inquiries to its database for review in the Owner inbox. It does not currently send automatic email, SMS or messaging notifications. Local preview records stay on the same computer and do not synchronize with hosted records. The confirmation says the inquiry was saved for review; it does not claim a separate notification was delivered or promise a response deadline. This delivery is a complete updated source ZIP, with no publication or deployment.

## Files to edit later

- `app/simple-inquiry.tsx`: general form, validation presentation and submission states.
- `app/inquiry-options.ts`: service purposes, existing location/category choices and contextual prompts.
- `app/inquiry-validation.ts`: shared name/contact/consent checks and phone normalization.
- `app/inquiry.css`: scoped form presentation and responsive styles.
- `app/api/submissions/route.ts`: existing endpoint, contact acceptance and saved details.
- `app/owner/lead-card.tsx`: inbox labels for city and inquiry purpose.
- `scripts/test-inquiry.mjs`: repeatable validation checks using installed TypeScript and Node.

All prior property additions, the compact catalog, original images and floor plans, pricing notices, Nila Condominium classification, logo placements and Windows launcher repairs are preserved.
