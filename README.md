# Mebelux Furniture · LunAR Phase 1

Static Astro recreation of Mebelux’s home and project gallery pages. This is a prospect demo; the supplied brief confirms the prospect has not signed.

## Run locally

1. Install Node.js 22.23.4 or newer (the `.nvmrc` version follows Astro’s currently documented minimum).
2. Copy `.env.example` to `.env` if a public site URL is available. `PUBLIC_SITE_URL` is optional locally and falls back to `http://localhost:4321`.
3. Run `npm install`, then `npm run model:standin` for a disposable local GLB preview, then `npm run dev`.
4. Run `npm run check`, `npm run test:phase2`, `npm run build`, and `npm run test:qr`. `npm run test:noindex` temporarily flips the indexing flag, rebuilds to verify robots/sitemap behavior, restores the flag, and rebuilds the default indexed site. The browser suite `npm test` is available, but was not run for this delivery at the user's request.

## Deploy to Cloudflare Pages

Connect this GitHub repository as a **Pages** project. Use `npm run build` as the build command, `dist` as the build output directory, and the repository's production branch (`master` in this checkout). Leave the deploy command empty; Pages publishes the build output automatically. Do not use `npx wrangler deploy` for this static Pages project. That command configures an Astro Worker adapter and changes Astro's public output path to `dist/client/`.

## Project data

- `src/data/site.ts`: company information, navigation, public URLs, indexing and WhatsApp messages.
- `src/data/projects.ts`: ordered gallery projects, photos, permanent slugs and model file names. Update this record and keep lowercase root keys when adding an approved model.
- Other copy and service data live in separate files under `src/data/`.
- Photos and branding assets live under `src/assets/`.
- `docs/DECISIONS.md` records project choices and items awaiting human verification.

To add or edit a project, update `src/data/projects.ts`, add photo files beneath `src/assets/projects/<slug>/`, and keep its existing slug stable. Detail pages are generated from that data.

## Phase 2 model and AR

The approved Mrs. Yati model is delivered from a Cloudflare Worker bound to a private R2 bucket; confirm account and names in `docs/INFRA_RUNBOOK.md` before setup. The project is a static Pages build (`npm run build`, output `dist`), with no Astro Cloudflare adapter or `wrangler deploy`. `PUBLIC_ASSET_BASE` is the HTTPS Worker origin. Empty base URLs resolve to `/model/` and `/video/` for local development.

`npm run model:standin` creates an ignored, temporary GLB solely for local wiring checks. It is not an approved kitchen model and must not be uploaded. No USDZ is supplied. See `docs/MODEL_SPEC.md` for replacement acceptance and `docs/DEVICE_TEST_PLAN.md` for human device verification. The project ZIP omits `public/model/` and `public/video/` by design.
