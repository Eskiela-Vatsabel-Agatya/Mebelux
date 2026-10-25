# Phase 2 Cloudflare runbook

**Prepare-only. No Cloudflare resource has been created.** All proposed names and live endpoints below are **VERIFY**. This is a Git-linked static Pages project, not an Astro Worker deployment.

## Names to confirm

| Item | Proposed value | State |
|---|---|---|
| Pages project | `mebelux` | VERIFY; existing Git-linked project and account owner unknown |
| R2 bucket | `mebelux-3d-asset` | VERIFY; names are account-global |
| Worker | `mebelux-3d-asset` | VERIFY; same proposed label, separate resource |
| Worker URL | `https://<worker>.<account-subdomain>.workers.dev` | VERIFY |
| Pages production URL / custom domain | dashboard value | VERIFY |
| Production branch | `master` in this checkout | Confirm dashboard branch |

## Account and Pages

1. Confirm the prospect has signed and choose the account owner. LunAR may own the demo infrastructure; if ownership transfers to the client, use the client's account and grant LunAR Admin access only while needed.
2. In Cloudflare Dashboard, open **Workers & Pages → Create application → Pages → Connect to Git**. Select `Eskiela-Vatsabel-Agatya/Mebelux` and the agreed production branch.
3. Set framework preset **Astro**, build command `npm run build`, build output directory `dist`, and root directory `/`. Leave any deploy command blank. Do not run `wrangler deploy` for this Pages site.
4. In project **Settings → Environment variables**, configure `PUBLIC_SITE_URL` and `PUBLIC_ASSET_BASE` for Production and Preview. Leave asset base empty until the Worker is deployed; the site then uses local `/model/` assets for local development only.
5. Add the confirmed production custom domain through the Pages project and verify HTTPS and the production branch build. Keep the repository's Astro config at static output without an adapter.

## R2 bucket and Worker

1. In **R2 Object Storage**, create the approved private bucket. Do not enable public `r2.dev` access.
2. Upload approved `mrs-yati.glb` and, if provided, `mrs-yati.usdz` to the bucket root. Verify object names and sizes. Keep CAD and customer data out.
3. Deploy `infra/worker/index.js` as the agreed Worker using `infra/worker/wrangler.toml.example` as a guide. Set binding name `MY_BUCKET` to the chosen bucket.
4. In `index.js`, replace `PAGES_PROJECT = 'REPLACE_ME'` with the exact Pages project slug. Add exact production origin(s) to `PRODUCTION_ORIGINS`. Keep the narrow preview origin expression. Do not add wildcard origins or credentials.
5. Verify the Worker endpoint and allowed Origins; set `PUBLIC_ASSET_BASE` to the Worker origin only (no path) for Pages Production and Preview, then rebuild/redeploy Pages.
6. Keep the Worker source in Git. The project ZIP includes Worker source but does not deploy/update the live Worker.

## Local model wiring

Run `npm run model:standin` to generate an ignored, disposable GLB in `public/model/`. Use an empty `PUBLIC_ASSET_BASE` for local preview. The stand-in validates wiring only; it is not the real kitchen model and must never be uploaded. For remote-origin compile checks, set `PUBLIC_ASSET_BASE` to a placeholder HTTPS Worker origin such as `https://assets.example.workers.dev`, never to a real bucket URL.

## Checks and troubleshooting

- `npm run check` validates Astro types, colors, contrast, images, asset keys and local GLB presence.
- `npm run test:phase2` runs pure Node checks for asset helpers, media states, and mocked Worker behavior. `npm run test:qr` decodes generated QR output after a build.
- `npm run build` creates static output in `dist/`. Confirm `dist/robots.txt`, project routes, and all eight `/qr/<slug>.svg` files.
- For a live asset fetch, check CORS origin, key spelling, `Content-Type`, cache headers, ETag/304 and a `Range: bytes=0-15` response. Confirm `206` and `Content-Range`; a phone model not loading can be a Worker CORS or model validity issue.
- If QR scanning resolves to localhost, rebuild with the actual public `PUBLIC_SITE_URL`. Never leave a placeholder URL in a production build.
