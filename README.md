# Mebelux Furniture · LunAR Phase 1

Static Astro recreation of Mebelux’s home and project gallery pages. This is a prospect demo; the supplied brief confirms the prospect has not signed.

## Run locally

1. Install Node.js 22.23.4 or newer (the `.nvmrc` version follows Astro’s currently documented minimum).
2. Copy `.env.example` to `.env` if a public site URL is available. `PUBLIC_SITE_URL` is optional locally and falls back to `http://localhost:4321`.
3. Run `npm install`, then `npm run dev`.
4. Run `npm run check`, `npm run build`, and `npm test`. `npm test` requires the Playwright Chromium browser (`npx playwright install chromium`). `npm run test:noindex` temporarily flips the indexing flag, rebuilds to verify robots/sitemap behavior, restores the flag, and rebuilds the default indexed site.

## Deploy to Cloudflare Pages

Connect this GitHub repository as a **Pages** project. Use `npm run build` as the build command, `dist` as the build output directory, and the repository's production branch (`master` in this checkout). Leave the deploy command empty; Pages publishes the build output automatically. Do not use `npx wrangler deploy` for this static Pages project. That command configures an Astro Worker adapter and changes Astro's public output path to `dist/client/`.

## Project data

- `src/data/site.ts`: company information, navigation, public URLs, indexing and WhatsApp messages.
- `src/data/projects.ts`: ordered gallery projects, photos and permanent slugs.
- Other copy and service data live in separate files under `src/data/`.
- Photos and branding assets live under `src/assets/`.
- `docs/DECISIONS.md` records project choices and items awaiting human verification.

To add or edit a project, update `src/data/projects.ts`, add photo files beneath `src/assets/projects/<slug>/`, and keep its existing slug stable. Detail pages are generated from that data.

## Phase 1 scope

The hero and project-detail media areas are photo-only; Phase 2 adds the markerless WebAR model and its Cloudflare Worker/R2 delivery. No 3D library or model request is included here. No screenshots were taken for verification.
