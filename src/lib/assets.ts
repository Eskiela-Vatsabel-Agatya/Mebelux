import { assetUrl, isValidAssetKey } from './asset-keys.js';

const base = import.meta.env.PUBLIC_ASSET_BASE ?? 'https://mebelux-3d-asset.lunarcreativa.workers.dev';

export function R2(name: string): string {
  return assetUrl(name, base);
}

export function R2Model(stem: string): { glb: string; usdz: string } {
  const glb = `${stem}.glb`; const usdz = `${stem}.usdz`;
  if (!isValidAssetKey(glb) || !isValidAssetKey(usdz)) throw new Error(`Invalid model stem: ${stem}`);
  return { glb, usdz };
}
