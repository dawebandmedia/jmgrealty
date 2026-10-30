# Official Amaresa interiors and original floor plans

Added 12 October 2026 to the existing JMG Realty PH model pages.

## Open the updated website

Extract this ZIP into a fresh folder and double-click **Launch JMG Realty.cmd**. Keep the launcher window open. Open an Amaresa model and use the new **Interiors** and **Floor Plan** section links. Use the newly printed preview address rather than an older preview tab.

This delivery is an updated source ZIP. No hosted Site publication was requested or performed.

## Included material

| Existing model | Official source | Interior photographs | Original combined plan |
| --- | --- | --- | --- |
| Alexandria | [Official model page](https://www.amaresa.ph/alexandriaamamarilao) | 5 | 1800 × 527; three layout panels, including attic |
| Amara Expanded | [Official model page](https://www.amaresa.ph/amaraamamarilao) | 5 | 2500 × 1054; three layout panels, including attic |
| Arya Prime | [Official model page](https://www.amaresa.ph/aryaamamarilao) | 5 | 2400 × 1500; two layout panels |
| Kayla Prime | [Official model page](https://www.amaresa.ph/kaylaamamarilao) | 5 | 2400 × 1500; two layout panels |

All twenty photographs were visually checked as interiors from their respective official pages. Existing exterior/model images remain in their existing gallery. The new images are attached to the existing model IDs and routes; no new duplicate property records were created.

## Original drawings and image files

Each floor plan is the complete official combined image, stored as an unmodified JPEG or PNG returned by its official image URL. No drawing was generated, redrawn, cropped, recolored, stretched or re-encoded. All panels, room annotations and margins remain available together. The page preview and enlarged viewer preserve the source aspect ratio.

The viewer initially fits the whole drawing. It provides zoom in/out, bounded drag/pan, fit/reset, keyboard zoom and pan, touch pinch/drag support, and an original-resolution link. Full-screen mode is offered where the browser permits it; the embedded Codex preview refused full-screen requests, and the viewer displayed its fallback guidance. Standard modal zoom and the original-image link worked in that preview.

Photo originals are also retained. Separate 1280-pixel WebP display copies provide lighter gallery and thumbnail loading. Enlarged photographs and original links use the original downloaded JPEG files. Drawings use the preserved original files directly; no optimized drawing copy replaces them.

Assets are organized under `public/images/properties/amaresa/`, with separate folders for each model. `app/amaresa-media-data.json` records the official page, source image URL, publisher filename, actual dimensions, SHA-256 checksum, source response format and captions. The JPEG/PNG response was explicitly requested from the CDN to avoid its automatic WebP substitution. Original JPEG/PNG bytes were saved directly, without local image processing.

## Source limitations and accurate labeling

The drawings do not print separate Ground Floor/Second Floor headings. Their layout order implies those floors, and the official pages describe two-storey houses, but the website uses the conservative label **Two-storey layouts**. Alexandria prints **ATTIC** and Amara prints **ATTIC AREA**, supporting the additional **Attic** label. The combined images were not split or annotated to add headings.

Some Amara and Kayla photographs have larger dimensions in the publisher's HTML than the public CDN delivers. The accessible files are capped at 2500 pixels wide; requesting original or 5000-pixel delivery for representative assets did not return a larger version. Actual downloadable dimensions are used for display, and publisher dimensions remain recorded where they differ. All four floor-plan dimensions match the published page metadata and the drawings' room labels are readable at original resolution. No inaccessible or unreadable plan required a replacement.

Official minimum lot areas differ from the existing BrokerCel catalog for Alexandria, Arya and Kayla. The original catalog's prices, areas and other facts were preserved as requested. This addition supplies media; it does not replace the original listing specifications.

## Existing website preserved

The integration changes only the global layout's stylesheet imports and the model detail page's added media sections/navigation. All original catalog data, prices, descriptions, images, general galleries, forms, APIs, database schema/migrations, shortlist tools and other routes remain unchanged.

New application files:

- `app/amaresa-media-data.json`: source-to-model asset manifest.
- `app/amaresa-media.ts`: separate presentation media types and mapping.
- `app/model-media.tsx`: galleries and accessible image viewer.
- `app/model-media.css`: scoped media styling.

No new dependency was added. Synthetic leads or runtime databases are not included in the ZIP.

## Verification

- TypeScript checks and production build passed.
- All four model pages and all 24 original files returned successful responses; served original bytes matched the saved checksums. All twenty photo display copies loaded correctly.
- All five photographs were navigated on every model; next/previous and thumbnail selection were checked.
- Every plan viewer opened, zoomed, reset and linked to the matching original file. Dragging, keyboard zoom/pan/reset and native modal closing were exercised.
- Every plan initially fit completely at desktop, tablet (768px) and phone (390px and 320px) viewport settings. No document overflow was found on those four model pages.
- Touch pinch/drag handling is implemented, but a physical touchscreen gesture was not independently exercised with the available desktop browser controls.
- Browser error/warning review was empty after the media checks. Existing route checks passed.
- Packaging compares every original file with the supplied ZIP; only the two intended integration files are permitted to differ.

Current prices, units, finishes, inclusions and applicable plans still require confirmation with JMG and the developer.
