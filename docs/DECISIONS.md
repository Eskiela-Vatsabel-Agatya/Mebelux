# Mebelux project decisions

| # | Decision | Notes / guardrails |
|---|---|---|
| D1 | Astro `output: 'static'` | Exact-pinned packages and lockfile; no adapter, `functions/`, or root `wrangler.*`. |
| D2 | Git-linked Cloudflare Pages | Production only from the repository's production branch (`master` in this checkout); feature branches preview; no functions/bindings; check first build log. Public config must be in dashboard for Production and Preview. |
| D3 | Neumorphic soft UI | Raised/inset containers; CTAs/text/outlined AR pill flat and high contrast; real control borders; light grey surface. |
| D4 | Original paths and permanent slugs | `/`, `/gallery-proyek/`, and the eight provided project slugs. |
| D5 | No prices, stock, or product cards | Projects are bespoke rooms; WhatsApp consultation is the conversion action. |
| D6 | Preserve original section order | Header, Hero, Alur Kerja, Service, About, Why Us, Gallery, Reviews, CTA, Footer. |
| D7 | Mrs. Yati kitchen is the Phase 2 room model | Phase 1 hero poster is Mrs. Yati’s supplied cover photo; AWK Office is not the model. |
| D8 | Indexing enabled by default | `site.noindex` defaults false; when true, robots/meta disable indexing and post-build removes sitemap XML. |
| D9 | Apply copy corrections from the brief | “Dipasang”, “penyimpanan”, “terstruktur”, “menginspirasi”, description swap, and footer punctuation correction. |
| D10 | WhatsApp dark green | Fill `#0F7A3D`, white text; brighter WhatsApp green is icon accent only. |
| D11 | Raster logo is temporary | Extracted 586×138 raster; blend into grey surface. Favicon and OG image are generated temporary assets. |
| D12 | Three supplied reviews | Initial avatars, no auto-advance; consent marked VERIFY. |
| D13 | LunAR additions | Photo showcase slot; floating WhatsApp; optional footer credit. The Mrs. Yati 3D badge and AR affordances are Phase 2. |
| D14 | Logo yellow is primary; heading slate is ink | Sample from supplied raster/PDF/source artwork by pixel statistics; see recorded values below. |
| D15 | Public site URL via `PUBLIC_SITE_URL` | Fallback is `http://localhost:4321`; no Pages project name is invented. |
| D16 | Temporary gallery thumbnails | Six projects use two low-resolution PDF thumbnails each; their paint-order pairing is a best guess and needs human visual verification. |
| D17 | Flat lowercase root asset keys | `kitchen-corner.glb` and `.usdz` at the confirmed Worker bucket root; replacements use new names. The UI and Worker share a conservative root-key pattern. |
| D18 | Cloudflare model origin | R2 bucket `mebelux-3d-asset`, Worker `mebelux-3d-asset`, and origin `https://mebelux-3d-asset.lunarcreativa.workers.dev` confirmed by user screenshot/URL. Pages project/domain remain **VERIFY**. |
| D19 | Exact-pinned model viewer | `@google/model-viewer` 4.4.0, dynamically imported after paint and near-viewport observation. |
| D20 | AR placement | Floor placement, Y-up and origin at floor center; real dimensions require approved model measurements. |
| D21 | Touch and hero controls | `touch-action: pan-y`; hero showcase does not expose camera zoom; detail model supports interaction. |
| D22 | Local placeholder model | Generator creates a minimal wiring-only GLB in ignored `public/model/`; no USDZ. It is excluded from the deliverable ZIP. |
| D23 | 3D gallery marker | Neutral “Model 3D” badge only on projects with a model; currently Mrs. Yati. |
| D24 | Phase 2 verification | Scripted checks only; no Playwright, screenshot, live Cloudflare, or device checks at user request / unavailable external setup. |
| D25 | Uploaded Mebelux models | Use the supplied kitchen-corner GLB and USDZ for the Mrs. Yati showcase. Cloudflare currently responds with wildcard CORS; update the deployed Worker to scoped origins before production use. |

## Appended by agents

- **Node runtime pin:** `.nvmrc` uses 22.23.4. The supplied brief says Node ≥22.22, but current Astro installation documentation requires ≥22.23.4. Local runtime was Node 24.22.1.
- **Source-file naming mismatch:** Phase 1 lists four Mrs. Yati PNGs named by numeric timestamps; the ZIP actually contains `Mrs. Yati 1.jpg` through `Mrs. Yati 4.jpg`. Mapped in that supplied order to `yati-1.jpg` through `yati-4.jpg`.
- **Hero layout:** ≥1024 px uses the inset window at the right of the photo; 640–1023 follows the same right-side treatment, scaled down; below 760 px the window moves under the banner and overlaps by 24 px.
- **Asset extraction:** `scripts/extract-pdf-images.py` uses pypdf’s embedded image order, dimensions, and source page order. PDF thumbnail pairing cannot be confirmed without human visual review.
- **Colour sampling notes:** `scripts/sample-colors.py` samples the raster logo’s dominant saturated-yellow bin as `#F8C000`; the mockup’s top 14% near-neutral mode is `#E0E0E0`; dark slate is `#1E293B`, the explicit `--ink-slate` fallback in the supplied logo SVG. The script also rasterizes PDF page 4 and records its dark-pixel mode as a cross-check. These replace the brief’s approximate `#F5B400` / `#E4E4E4` fallback values. Contrast math is enforced by `npm run contrast`.
- **Account ownership:** Phase 1 is a local pitch demo only; Cloudflare account, Pages project, Worker, R2 bucket, and deployment ownership are intentionally unconfigured and must be decided before Phase 2 shipping.
- **Prospect status:** Mebelux has not signed; use only brief-approved facts. Opening hours and founding-year claims are omitted.
- **ZIP source mismatch:** the ZIP contains named service photos and numbered JPEGs rather than all timestamped PNGs shown in A1. Service images were extracted from the specified landing PDF pages.
