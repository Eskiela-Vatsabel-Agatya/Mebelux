// Tier A only: public, non-sensitive static model/video assets. Never place CAD, credentials, or customer data here.
export const KEY_PATTERN = /^[a-z0-9][a-z0-9._-]*\.(?:glb|usdz|mp4|webm)$/i;
const PAGES_PROJECT = 'REPLACE_ME'; // VERIFY: set exact Pages project slug.
const PREVIEW_ORIGIN = new RegExp(`^https://${PAGES_PROJECT}-[a-z0-9-]+\\.pages\\.dev$`);
const PRODUCTION_ORIGINS = [
  // VERIFY: add the exact production custom domain(s).
];
// TEMPORARY local origins only: add localhost values during local testing, then remove before deployment.
// const LOCAL_ORIGINS = ['http://localhost:4321'];
const mime = { glb:'model/gltf-binary', usdz:'model/vnd.usdz+zip', mp4:'video/mp4', webm:'video/webm' };
function corsOrigin(origin) {
  if (!origin) return null;
  if (PRODUCTION_ORIGINS.includes(origin) || origin === `https://${PAGES_PROJECT}.pages.dev` || PREVIEW_ORIGIN.test(origin)) return origin;
  // TEMPORARY local origins are intentionally not enabled in production.
  // if (LOCAL_ORIGINS.includes(origin)) return origin;
  return null;
}
function headers(origin, type) {
  const h = new Headers({ 'Vary':'Origin', 'X-Content-Type-Options':'nosniff', 'Cache-Control':'public, max-age=3600' });
  if (type) h.set('Content-Type', type);
  if (origin) h.set('Access-Control-Allow-Origin', origin);
  return h;
}
export default {
  async fetch(request, env) {
    const method = request.method.toUpperCase();
    const origin = corsOrigin(request.headers.get('Origin'));
    if (method === 'OPTIONS') {
      if (request.headers.has('Origin') && !origin) return new Response(null, { status:403, headers:headers(null) });
      const h = headers(origin); h.set('Access-Control-Allow-Methods','GET, HEAD, OPTIONS'); h.set('Access-Control-Allow-Headers','Range, If-None-Match'); h.set('Access-Control-Max-Age','86400');
      return new Response(null, { status:204, headers:h });
    }
    if (!['GET','HEAD'].includes(method)) return new Response('Method not allowed', { status:405, headers:headers(origin) });
    const key = new URL(request.url).pathname.replace(/^\//,'');
    if (!key || key !== key.toLowerCase() || key.includes('/') || key.includes('..') || !KEY_PATTERN.test(key)) return new Response('Not found', { status:404, headers:headers(origin) });
    if (!env?.MY_BUCKET) return new Response('Asset service unavailable', { status:503, headers:headers(origin) });
    const ext = key.slice(key.lastIndexOf('.')+1).toLowerCase();
    const object = await env.MY_BUCKET.get(key, { range:request.headers, onlyIf:request.headers });
    if (!object) return new Response('Not found', { status:404, headers:headers(origin) });
    const h = headers(origin, mime[ext]);
    if (object.etag) h.set('ETag', object.etag);
    if (object.httpEtag) h.set('ETag', object.httpEtag);
    if (object.range) {
      h.set('Accept-Ranges','bytes'); h.set('Content-Range',`bytes ${object.range.offset}-${object.range.offset+object.range.length-1}/${object.size}`); h.set('Content-Length',String(object.range.length));
    } else if (object.size != null) { h.set('Accept-Ranges','bytes'); h.set('Content-Length',String(object.size)); }
    if (object.body === null && object.etag) return new Response(null, { status:304, headers:h });
    return new Response(method === 'HEAD' ? null : object.body, { status:object.range ? 206 : 200, headers:h });
  }
};
