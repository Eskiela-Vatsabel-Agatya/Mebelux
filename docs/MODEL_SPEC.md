# Mrs. Yati model specification

## Status

The user supplied the Cloudflare Worker endpoint and screenshot showing `kitchen-corner.glb` (6.91 MB) and `kitchen-corner.usdz` (7.01 MB) in the Mebelux R2 bucket. The website references these exact uploaded keys. The generated `public/model/mrs-yati.glb` remains a tiny local wiring stand-in only; it is ignored by Git and omitted from the Phase 2 ZIP. It does not replace or describe the uploaded model.

## Required content and scale

- File names: `kitchen-corner.glb` and `kitchen-corner.usdz`; lowercase flat keys at the root of R2. Replacement versions use new names and matching project data changes.
- Confirm with Mebelux that the supplied kitchen-corner model is the approved representation for the Mrs. Yati project. No hidden cabinet interiors, hardware mechanisms, construction drawings, or CAD details should be exposed.
- Y-up; floor contact at Y=0; model centered on the kitchen footprint. Author to real-world measured dimensions supplied by the client; measurements remain **VERIFY**. Do not infer measurements from photographs.
- Optimize for mobile AR: target under 10 MB GLB, compressed textures, modest geometry, baked/neutral lighting, sensible pivots and no animation unless approved.

## Rights and safety

- Confirm rights/approval for the room imagery, model, website display, and AR distribution. The files are uploaded but their approval paperwork was not provided here.
- Remove faces, personal items, documents, location metadata, and identifiable reflections. Do not include customer names beyond the approved public project label.
- Keep source CAD and working files private; publish only a flattened presentation asset. No credentials, private URLs, or personal data in model metadata.
- Use neutral approved materials and avoid misleading claims about exact materials, dimensions, or construction.

## Acceptance

Check GLB/USDZ file validity, scale, orientation, geometry, file size, device performance, and parity with approved photos. Client/producer must approve before replacing the stand-in or uploading to R2.
