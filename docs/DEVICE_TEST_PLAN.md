# Phase 2 device and release test plan

Run after an approved real model is in place and the Pages/Worker configuration is verified. These are human verification steps; no device, screenshot, or browser automation run was performed for this delivery.

## Desktop

- Open the homepage. Confirm the hero photo loads immediately and the model library loads only near the showcase. Confirm the model appears, drag rotates it, no automatic rotation occurs, and the detail link works.
- Open the Mrs. Yati project. Confirm model tab first, photo tab opens the supplied photo set, thumbnails and arrows work, and AR help disclosure is readable.
- Open the QR popover by keyboard and pointer. Confirm its SVG scans to the public detail URL; Escape closes and restores focus; outside click closes it.
- Check all eight QR URLs and project pages. Confirm only Mrs. Yati shows the 3D badge.

## Android

- Test current Chrome on a supported ARCore device. Open Mrs. Yati detail, wait for the model, activate AR, place at floor level, move around, and exit AR back to the page.
- Test unsupported/ineligible device behavior: no AR launch control should be exposed; model and photos remain usable.

## iPhone / iPad

- Test current Safari on a Quick Look capable device. Confirm GLB preview and USDZ Quick Look launch. If no approved USDZ exists, AR may be unavailable on iOS; photo/model web view must remain usable.

## Failure and accessibility

- Temporarily use an invalid model URL and verify timeout/error gives an Indonesian fallback and the supplied photos remain reachable. Restore URL and confirm retry works.
- Check narrow viewport touch scroll, keyboard focus, visible focus rings, screen-reader loading/failure announcement, reduced-motion preference, and contrast.
- Verify the Worker allows only production Pages/custom origins and the intended Pages preview domain; check `OPTIONS`, `GET`, `HEAD`, ETag and byte ranges.

## Performance / release

- Test on mobile data and throttled network. Main hero photo is the LCP asset; no model JS should be requested until near viewport. Model is under the approved mobile budget (target <10 MB GLB).
- Run Lighthouse on production and review performance, accessibility, best practices and SEO. No numeric pass threshold was supplied, so record measured scores and agree release thresholds with the project owner.
