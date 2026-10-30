# Vercel preview deployment

This setup is for the user's preview deployment. The current client-facing Sites deployment remains in place. No Vercel plan upgrade or production-domain switch is part of this change.

## Build

Vercel reads `vercel.json`, installs with `npm ci`, and runs `npm run build:vercel`. That command builds the existing application with Next.js and Webpack. The standard `npm run build` and Windows launcher retain their Vinext/Cloudflare path.

Original images, plans, flyers, PDFs, and logos are not recompressed. The existing production asset-delivery proxy loads original files from their immutable GitHub commit; `.vercelignore` excludes duplicate source media from CLI uploads. The complete original media remains in this repository.

## Existing secure backend

Vercel API routes forward only `/api/submissions`, `/api/inbox`, and `/api/inbox/login` to the existing backend at `https://jmg-realty-ph.otakubarb.chatgpt.site`. No client database is copied or exported. Keep that backend running while this preview uses it.

The browser continues using same-origin API endpoints. The Vercel server checks write-request origins, forwards only the owner session cookie to inbox endpoints, and marks API responses `no-store`. Backend validation, consent, rate limits, authentication, and database operations remain on the original service. No owner password or database secret is needed in the Vercel source.

`JMG_BACKEND_ORIGIN` optionally selects a replacement HTTPS backend. Do not point it at the Vercel deployment itself. `NEXT_PUBLIC_SITE_URL` can override metadata URLs; otherwise Vercel's project production hostname is used when supplied.

## Verification

The Next.js production build, including TypeScript, passed. Direct local checks covered the homepage, catalog filters, a model page, a viewing-request page, owner page, anonymous inbox denial, invalid inquiry rejection, and cross-origin rejection. No valid inquiry was submitted and no automated test suite was run. Authenticated inbox editing still requires the owner to verify their actual session.

Vercel's default preview access protection should remain enabled. Do not promote this preview or attach a client-facing domain unless the user requests it.

The configured ignore command skips production builds. Preview metadata and robots rules discourage search indexing. Remove the preview-only guard only after the user explicitly requests a production deployment.
