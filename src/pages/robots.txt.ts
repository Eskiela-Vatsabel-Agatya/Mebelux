import { site } from '../data/site';
export function GET(){const body=site.noindex?'User-agent: *\nDisallow: /\n':'User-agent: *\nAllow: /\nSitemap: '+new URL('/sitemap-index.xml',site.baseUrl).toString()+'\n';return new Response(body,{headers:{'Content-Type':'text/plain; charset=utf-8'}});}
