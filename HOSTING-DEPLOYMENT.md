# Public hosting preparation — 30 October 2026

## Original quality preserved

The user requested no image-quality reduction. The temporary lossy image optimization was rolled back. All original website image files are restored, including their exact bytes, dimensions, and existing source/display variants.

The existing hosting service limits a deployment archive to 256 MiB. Its remote build also failed on the complete large asset package. To fit the application without altering media, production requests for the listed `/images/` and `/documents/` files redirect to the identical original files in the public GitHub repository at immutable commit `5c318097fa9aa55a50ce0c374b99c64d55a77ec2`.

The lightweight Sites source checkout contains the application and external asset manifest. The complete GitHub repository remains the local-preview source with all original `public/images` and `public/documents` files. Copies from the hosting checkout were moved into a retained local backup, not recompressed or deleted. Use the GitHub repository for local previews.

`middleware.ts` performs that delivery redirect only for exact paths listed in `app/external-asset-paths.json`. Local previews on loopback use the original files directly. Logos, fonts, application code, forms, and the owner inbox remain hosted with the application. No client records, credentials, or inventory data are added.

## Build and package

Run the normal production build, then run:

```sh
node scripts/prepare-hosted-assets.mjs
```

That step removes only generated copies of `dist/client/images` and `dist/client/documents` from the deployment package. It does not delete or edit source files under `public/`. The complete originals remain in GitHub and in local source.

The website still contains 20 development profiles and 74 model/unit-category records, with all distinct images, original plans, flyers, source notes, and price labels retained. No sample inquiry submission or automated test suite was run.

## Updating media later

Keep the referenced GitHub repository and commit accessible publicly. If original media changes, publish the new original files to GitHub first, refresh the immutable commit used by `middleware.ts`, regenerate/review the external path list, and redeploy. New unlisted paths are not redirected. Full-quality external media delivery depends on GitHub availability and its request limits; a dedicated asset CDN can replace the origin later without recompressing the originals.
