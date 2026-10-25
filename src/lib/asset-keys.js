export const KEY_PATTERN = /^[a-z0-9][a-z0-9._-]*\.(?:glb|usdz|mp4|webm)$/i;

export function isValidAssetKey(name) {
  return typeof name === 'string'
    && name === name.toLowerCase()
    && !name.includes('..')
    && !name.includes('/')
    && !name.includes('\\')
    && KEY_PATTERN.test(name);
}

export function assetUrl(name, base = '') {
  if (!isValidAssetKey(name)) throw new Error(`Invalid R2 asset key: ${String(name)}`);
  if (!base) return `${name.endsWith('.mp4') || name.endsWith('.webm') ? '/video/' : '/model/'}${name}`;

  let url;
  try {
    url = new URL(base);
  } catch {
    throw new Error('PUBLIC_ASSET_BASE must be an absolute HTTPS Worker URL.');
  }
  if (url.protocol !== 'https:' || url.pathname !== '/' || url.search || url.hash || url.username || url.password) {
    throw new Error('PUBLIC_ASSET_BASE must be an HTTPS Worker origin without a path, query, or credentials.');
  }
  if (url.hostname.toLowerCase().endsWith('.r2.dev')) throw new Error('Public r2.dev URLs are not allowed.');
  return `${url.origin}/${name}`;
}

export function modelUrls(stem, base = '') {
  if (typeof stem !== 'string' || !/^[a-z0-9][a-z0-9._-]*$/.test(stem) || stem.includes('..')) {
    throw new Error(`Invalid model stem: ${String(stem)}`);
  }
  return { glb: assetUrl(`${stem}.glb`, base), usdz: assetUrl(`${stem}.usdz`, base) };
}
