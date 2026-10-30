# JMG Realty PH

**Live public website:** [Open JMG Realty PH](https://jmg-realty-ph.otakubarb.chatgpt.site)

**Vercel preview:** [Open the preview](https://jmg-realty-ph-preview-r4k7c83ti-dawebandmedia.vercel.app) — preview only; inquiry saving and client-record changes are disabled. Vercel sign-in may be required.

The live website preserves the original image quality. Its application is hosted separately, while the original property media is delivered from this repository. See `HOSTING-DEPLOYMENT.md` for maintenance details.

## Current repository snapshot

This repository contains the latest local website source, including 20 development profiles and 74 model/unit-category records, property photographs, floor plans, flyers, JMG brand assets, and the Windows launcher. These are catalog records, not live inventory counts. GitHub upload does not deploy the website or change the existing hosted Site.

Use Node.js 22.13 or later. For a Windows preview, double-click **Launch JMG Realty.cmd**. For development, run `npm ci` followed by `npm run dev`; build with `npm run build`. GitHub Pages alone cannot run the server-backed forms and owner inbox.

Runtime databases, private inventory exports, credentials, dependencies, caches, and generated builds are excluded from Git. Keep them excluded in future commits. Production owner access requires `ADMIN_ACCESS_KEY` in the hosting environment; it is not included here. Forms save to D1 without sending email or SMS notifications.

Property media, plans, logos, and fonts retain their respective owners' rights; this repository does not grant a new license to third-party material. Preserve source notes, rendering labels, shared-plan caveats, and historical price dates. Confirm current prices, applicable plans, availability, and media permissions before publication.

The website displays: “Pricing may change at any time. Contact JMG Realty PH for current prices.”

See the project-specific `*-ADDITION.md` files, `AUDIT-IMPROVEMENTS.md`, and `SMALLER-PACKAGE-AND-ASSET-FIX.md` for subsequent changes. The original notes below describe earlier development stages; catalog counts, imagery, and team details in those notes may have been superseded by the current source.

## Original implementation notes

A green, cinematic real estate website with separate client and agent recruitment paths. The October 2026 redesign uses a framed architectural opening, an interactive model collection, location index, service guide and dedicated career invitation.

## Explore the redesigned experience

The homepage presents actual BrokerCel house models immediately after the hero. Buyers can switch featured models, explore all eight service areas and choose from all six services. The property collection keeps province → city → development grouping, URL filters and published-price budget matching. Additional filters open on request, keeping real models visible sooner on desktop and phones.

Use **Save model** to keep up to three house models in a browser's local storage, then open **Saved** to compare published price, location, bedrooms, bathrooms, floor/lot areas and carport. Different facts are highlighted; **Show differences only** hides shared facts. **Copy link** shares the selected model IDs in a read-only comparison page without overwriting the recipient's saved homes. The link contains no contact details. Links from a loopback preview work on the same computer; sharing across devices requires a published website and recipient access. Saved homes are specific to the browser and website address; private sessions or disabled storage may not retain them. No buyer account is required.

The catalog now filters by minimum bedrooms, floor area, lot area and whether prices are published. Filters remain in the page address after a reload. Models without a numeric price are excluded from a maximum-price search; the separate price-request option lets visitors explore them without suggesting they fit the budget. Approximate areas retain their labels.

Dedicated development pages at `/developments` and `/developments/[id]` group available models, community information and tours by their existing location records. Their images and facts come from the catalog. No exact unit availability, payment terms or facilities have been invented.

Property and comparison pages provide **Request a viewing** and **Get current price & availability**. The focused form carries selected models forward, records a preferred contact channel and requires only the matching email or phone field. Viewing requests include a date, time window and on-site or remote-discussion preference. A saved request is not a confirmed appointment. JMG must confirm the actual unit and arrangements. Development requests offer that development's model choices.

Property pages include an uncropped image stage, native image dialog, specification ribbon, community information, related models and an inquiry panel. Available YouTube tours load only after the visitor chooses to play one; the dialog includes a YouTube fallback link. No third-party video is loaded on initial page visit. The recruitment page retains its consent-based application form.

The composition and interaction styling are in `app/experience.css`; the new request, comparison, development and inbox styling is in `app/enhancements.css`. Interactive homepage sections and video dialogs are in `app/experience.tsx`; shortlist storage is in `app/shortlist.tsx`; comparison and link sharing are in `app/comparison.tsx`; request forms are in `app/property-requests.tsx`. Scroll behavior remains native, and reduced-motion preferences disable decorative movement. See `DESIGN-AUDIT.md` for the ranked design decisions and source-material limitations, and `ENHANCEMENTS.md` for the latest changes.

## Content updates

Edit `app/content.ts` for company contacts, the eight service areas, services, FAQs, team profiles, and genuine testimonials. Team and testimonial sections appear automatically when their arrays contain approved content.

Edit `app/property-data.ts` for the imported property catalog: eight house models, three development pages and five property tours from the user-owned BrokerCel website. Records are organized by province, city and development. There are six developments represented overall, including three with video tours only. Null prices display as Contact for Price and are excluded from budget filtering. Preserve approximate sizes and image captions when updating records. The catalog is a snapshot imported on 11 October 2026; it is not automatically synchronized.

Update recruitment wording in `app/join/page.tsx`. Add confirmed compensation, role requirements and support details when available. Replace photographs under `public/images/` with authorized brand or property images. Inspiration photographs are labeled stock imagery. Property images under `public/images/properties/` came from BrokerCel. Madonna's three model pages share a development entrance illustration, labeled accordingly.

The layout is in `app/components.tsx`; visual styling and motion are in `app/globals.css`. Public pages respect reduced motion preferences. The contact and recruitment forms save to D1. They do not send email notifications. Review requests in `/owner`.

## Owner inbox

Production access uses the secret `ADMIN_ACCESS_KEY` stored in Sites runtime settings. This value is not included in source files. Sign in at `/owner` using the supplied owner inbox password. You can filter requests by type, stage and follow-up date, add internal notes and schedule follow-up dates in Philippine time (GMT+8). Overview tiles show requests awaiting a response, overdue follow-ups and upcoming follow-ups. Client inquiries and agent applications have their own stages. Email and phone links open the owner's preferred contact app; the site does not send messages. Permanent deletion still requires explicit confirmation.

The inbox records when a request is first marked contacted. Updates include a record version check to prevent one session silently overwriting another session's edits. Notes and dates are only returned through the authenticated owner API. Reminder indicators appear in the inbox; automatic email, SMS and calendar notifications are not enabled.

On a loopback-only local preview the password is `local-preview-only`. Production never falls back to this password.

## Development

For a Windows preview, double-click `Launch JMG Realty.cmd` and keep its window open. It installs missing dependencies, builds in a fresh `.sites-runtime/preview-builds/` folder, prepares the local database and checks that the page's CSS, browser scripts and images are served before opening the browser. It selects an available loopback port starting at 4187, so use the address printed beside `JMG PREVIEW READY` and the matching owner inbox address. Each running preview retains its own build assets; subsequent launches cannot clear them.

If an older preview shows plain text or broken images, close that tab and its launcher window, extract the corrected ZIP into a fresh folder and launch it there. Use the newly opened address. Owner records remain in the extracted project's `.wrangler/state/` folder; keep the original folder if it contains records you want to preserve.

Use Node 22.13 or later. Install using `npm ci`, then `npm run dev`. Run `npm run db:generate` after editing the schema, build with `npm run build`, and apply the generated SQL to the local D1 database as described by the bundled starter documentation. The new `drizzle/0001_faulty_richard_fisk.sql` migration adds internal notes, follow-up time, first contact time and update time while preserving existing requests. The Windows launcher applies unapplied migrations automatically. Local and production databases are separate. Production migrations are applied during deployment. Runtime databases, passwords and dependencies are excluded from the downloadable source archive.

The tracked `.openai/hosting.json` retains the existing Site ID. Reuse that Site when publishing updates; do not create a second Site for this source.

## Before a public launch

Review current property prices and availability, add professional profiles and approved client feedback, and confirm recruitment arrangements and the privacy notice. Add the office address and social links if you want to publish them. The registered Site is private and publication is still pending; change its audience when ready for a public launch.

## Image sources

Architectural inspiration from Unsplash image IDs:

- `photo-1600585154340-be6161a56a0c` (hero)
- `photo-1600607687920-4e2a09cf159d` (interior)
- `photo-1600047509782-20d39509f26d` (architecture)
- `photo-1600566753086-00f18fb6b3ea` (living)

Fonts: Cormorant Garamond and Manrope, downloaded from Google Fonts and served locally.
