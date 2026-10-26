# Phase 2 Cloudflare runbook

The supplied screenshot and endpoint confirm the Worker origin, bucket name, and two uploaded objects. This is a Git-linked static Pages project, not an Astro Worker deployment. Pages project name and production domain still need verification.

## Names to confirm

| Item | Proposed value | State |
|---|---|---|
| Pages project | `mebelux` | VERIFY; existing Git-linked project and account owner unknown |
| R2 bucket | `mebelux-3d-asset` | Confirmed by supplied screenshot |
| Worker | `mebelux-3d-asset` | Confirmed by supplied endpoint |
| Worker URL | `https://mebelux-3d-asset.lunarcreativa.workers.dev` | Confirmed by supplied endpoint |
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
2. The screenshot shows `kitchen-corner.glb` (6.91 MB) and `kitchen-corner.usdz` (7.01 MB) already at bucket root. The site now references those exact keys. Keep CAD and customer data out.
3. Deploy `infra/worker/index.js` as the agreed Worker using `infra/worker/wrangler.toml.example` as a guide. Set binding name `MY_BUCKET` to the chosen bucket.
4. In `index.js`, replace `PAGES_PROJECT = 'REPLACE_ME'` with the exact Pages project slug. Add exact production origin(s) to `PRODUCTION_ORIGINS`. Keep the narrow preview origin expression. Do not add wildcard origins or credentials.
5. **Security follow-up:** live checks returned HTTP 200 for both uploaded model keys. The live preflight currently returns `Access-Control-Allow-Origin: *`, and HEAD requests return `application/octet-stream` for both extensions. Before production, deploy the scoped CORS and extension-specific MIME behavior in this repository with the confirmed Pages project/custom domain origins. The Pages project/domain are still unknown, so do not replace the source placeholders yet.
6. `PUBLIC_ASSET_BASE` now defaults in source to the supplied Worker origin. It can also be set explicitly to this origin in Pages Production and Preview. The production deploy must wait for scoped Worker CORS to be active.
6. Keep the Worker source in Git. The project ZIP includes Worker source but does not deploy/update the live Worker.

## Local model wiring

Run `npm run model:standin` to generate an ignored, disposable GLB in `public/model/`. Use an empty `PUBLIC_ASSET_BASE` for local preview. The stand-in validates wiring only; it is not the real kitchen model and must never be uploaded. For remote-origin compile checks, set `PUBLIC_ASSET_BASE` to a placeholder HTTPS Worker origin such as `https://assets.example.workers.dev`, never to a real bucket URL.

## Checks and troubleshooting

- `npm run check` validates Astro types, colors, contrast, images, asset keys and local GLB presence.
- `npm run test:phase2` runs pure Node checks for asset helpers, media states, and mocked Worker behavior. `npm run test:qr` decodes generated QR output after a build.
- `npm run build` creates static output in `dist/`. Confirm `dist/robots.txt`, project routes, and all eight `/qr/<slug>.svg` files.
- For a live asset fetch, check CORS origin, key spelling, `Content-Type`, cache headers, ETag/304 and a `Range: bytes=0-15` response. Confirm `206` and `Content-Range`; a phone model not loading can be a Worker CORS or model validity issue.
- If QR scanning resolves to localhost, rebuild with the actual public `PUBLIC_SITE_URL`. Never leave a placeholder URL in a production build.
