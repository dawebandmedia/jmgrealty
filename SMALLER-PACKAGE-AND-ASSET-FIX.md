# Smaller website package and asset-size startup repair

The Windows startup screenshot showed a Cloudflare asset-size error after a successful build. Two Plaridel Modern Minimalist plan JPEGs were 33,925,551 and 33,186,881 bytes, above the 25 MiB (26,214,400 bytes) per-file limit. The preceding Vinext route-classification message is informational; it did not cause this asset rejection.

## What changed

The 25 large Plaridel originals, totaling 394,360,248 bytes, are separated into an optional originals archive outside the website. Their existing optimized images, up to 3200 pixels on the longest edge, now serve both the gallery viewer and full-size-image links. These are the same files the viewer used before this repair, so normal viewing and interactive zoom have no additional compression or resolution change. Small display previews, original flyers and useful source PDFs remain in the website.

Links to these optimized files say "Open full-size image" rather than claiming they are unmodified original masters. Other original-image links remain unchanged. The image manifest preserves original filenames, source hashes and original dimensions, and records the replacement file hashes and dimensions. The optional archive retains all 25 master files unchanged with its own manifest. No original artwork or property data is lost.

The normal build and Windows launcher check all public asset sizes before setup. The launcher also checks the built client assets before database migrations and server startup. Oversized files now produce an early message naming the file and explaining the remedy. The current release contains no public or built asset above 25 MiB.

Official limit reference: https://developers.cloudflare.com/workers/platform/limits/#static-assets

## Open this release

Extract the updated WEBSITE ZIP into a new folder. Do not copy it over the older folder: that can leave the old oversized image files behind. Double-click Launch JMG Realty.cmd in the newly extracted JMG-Realty-PH folder. No optional originals are needed to run the site.

The optional Plaridel originals archive is for source-file storage. Keep it separate from the website folder and do not put those originals back into public. No existing local inbox records or database folders were erased by this repair. The first launch from a new extraction may use a separate local inbox location; retain your old extraction/data if you have records you need.

## Verification scope

Checks cover image/link/hash integrity, all 20 projects and 74 model/unit records, all source and emitted asset sizes, the preflight size validator, TypeScript, production build and both archive integrity checks. No automated test suite or inquiry submission is run. Full browser/server-startup verification remains limited by the earlier preview access restriction; the exact oversized-asset cause is checked directly in the source and built output.

The requested pricing notice, model-first card titles, all property records, contacts, original flyers, motion preferences and existing launcher database protections are retained. Delivery is local ZIP files only, without publication.
