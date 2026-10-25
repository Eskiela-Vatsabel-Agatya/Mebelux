# Phase 2 acceptance audit

Audit references Phase 2 brief §12 (design) and §10 (security). Status reflects this source delivery; production account, domain, model, and device checks remain pending.

## Design checklist (§12)

| Check | Result |
|---|---|
| Preserve site paths, content, palette, responsive layout | PASS: existing routes and component system retained |
| Lazy model viewer; hero photo remains initial poster | PASS in source; verify on production device |
| Four media states and Indonesian accessible loading/failure | PASS in media helper/controller; pure state checks included |
| Floor placement, exact AR mode order, touch pan-y | PASS in markup |
| Model only on Mrs. Yati; gallery badge only where model exists | PASS in project data and card template |
| Photos reachable with one tap and all existing gallery controls | PASS in detail tabs; verify manually |
| QR routes for all eight projects, Q correction, four-module quiet zone | PASS in generation configuration; decode check after build |
| QR popover keyboard dismissal and focus return | PASS in source; verify manually |
| No unsupported structured data added | PASS: existing ImageGallery / LocalBusiness data retained |
| Local model exists for local preview | PASS after `npm run model:standin`; generated file is ignored |

## Security checklist (§10)

| Check | Result |
|---|---|
| Tier A assets only; no private CAD or personal data in Worker | PASS: documented in Worker and model spec |
| Root-only lowercase key and allowed extensions | PASS in shared helper and Worker pattern |
| Exact Content-Type, nosniff, cache policy, ETag handling | Implemented; verify live R2 behavior before release |
| GET / HEAD / OPTIONS only; byte range response | Implemented with R2 stream/range; mocked checks cover methods and HEAD; live range remains VERIFY |
| Scoped CORS; no wildcard or credentials | PASS in source; `PAGES_PROJECT` and production origins require VERIFY |
| Private bucket; no public `r2.dev` | Runbook requires private bucket; no live bucket inspected |
| Secrets / credentials absent from front-end | PASS source review; no secrets configured |
| HTTPS Worker origin configured for both Pages environments | OPEN: no Pages project/config deployed |
| Runbook and model/device plans | PASS: `INFRA_RUNBOOK.md`, `MODEL_SPEC.md`, `DEVICE_TEST_PLAN.md` |
| Actual model licensed, valid, optimized, measured and approved | OPEN: model not supplied; placeholder is not production quality |
| Device testing, screenshots, Playwright, production response headers | NOT RUN: user requested no Playwright/visual check; external setup not available |

## Verification boundary

The source build and local scripted checks can confirm generated routes and code behavior. They cannot confirm the live account, bucket binding, CORS at production, real model quality, phone AR support, or Lighthouse scores. Review those checklist rows before enabling public production assets.
