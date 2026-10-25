# Asset provenance

- `src/assets/hero/hero-kitchen.jpg`: optimized from the supplied `Scandinavian Kitchen with Open Space.png` (the Phase 1 hero background).
- `src/assets/services/svc-1.jpg` through `svc-6.jpg`: embedded image extraction from landing PDF pages 2–3, in the brief’s service order.
- `src/assets/brand/logo-raster.jpg`: 586×138 logo extracted from landing PDF page 4; temporary until Mebelux supplies an SVG.
- `src/assets/gallery-teaser/g-1.jpg` through `g-8.jpg`: eight portrait photos extracted from landing PDF page 6.
- `src/assets/projects/mr-alvin`, `mrs-anis`, `mrs-risa`, `mrs-widia`, `mrs-gofi`, `mr-wawan`: two thumbnails per project extracted from the gallery PDF, paired in PDF paint order. TEMP and VERIFY; pairing requires human visual confirmation.
- `src/assets/projects/awk-office/awk-1.jpg` through `awk-5.jpg`: supplied full-resolution AWK Office photos, recompressed to JPEG quality 82.
- `src/assets/projects/mrs-yati/yati-1.jpg` through `yati-4.jpg`: supplied numbered Mrs. Yati JPEGs, recompressed to JPEG quality 84. Their source filenames differed from the phase table; see `DECISIONS.md`.
- `src/assets/about/awk-3.jpg`: temporary real Mebelux AWK Office interior used in the About section instead of the stock meeting photo.
- `src/assets/brand/favicon.svg`, generated `public/favicon-32.png`, `public/apple-touch-icon.png`, and `public/og-default.png`: geometric/generated TEMP branding until client assets arrive.

`scripts/extract-pdf-images.py` reproduces the PDF extraction from the provided `work/mebelux-source/DOCS FOR MEBELUX/` folder. `scripts/check-assets.mjs` reports image dimensions/weights and enforces per-file/total size limits. The source documents remain in the workspace but are omitted from the deliverable ZIP to keep it under the 25 MB delivery limit. To rerun extraction, provide the uploaded ZIP at the documented work path.
