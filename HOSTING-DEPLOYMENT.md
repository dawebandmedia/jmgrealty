# Public hosting preparation — 30 October 2026

The original source upload and deployment package exceeded hosting transport limits. The publishing copy therefore uses optimized web images while preserving all 1,273 public asset paths, 20 development profiles, and 74 model/unit records.

296 large JPEG/PNG assets were optimized. Ordinary photographs use up to 2,400 pixels on the longest edge and JPEG quality 90. Plans, flyers, maps, and other text-heavy references use up to 3,600 pixels and JPEG quality 95 with full chroma detail where applicable. PNG output uses lossless compression after any necessary web-size scaling. Images are never enlarged. Logos, fonts, PDFs, SVGs, and existing WebP images are unchanged.

The public asset folder decreased from approximately 937.5 MiB to 409.6 MiB. Representative photographs, a promotional flyer, and a floor plan were visually reviewed. The production build and static-asset size check passed. No automated test suite or sample inquiry submission was run.

Original larger website images remain available in GitHub commit `5c318097fa9aa55a50ce0c374b99c64d55a77ec2` and the retained local website source. Optimization changes web delivery, not source attribution, property facts, price notices, or original plan designs.

The full website requires Worker hosting and D1 for its inquiry forms and owner inbox; GitHub Pages alone is insufficient. The GitHub repository stores the source. The public website is deployed separately through the existing Sites project declared in `.openai/hosting.json`.
