import QRCode from 'qrcode';
import { projects } from '../../data/projects';
import { site } from '../../data/site';
export function getStaticPaths() { return projects.map((project) => ({ params: { slug: project.slug }, props: { project } })); }
export async function GET({ props }: { props: { project: (typeof projects)[number] } }) {
  const url = new URL(`/gallery-proyek/${props.project.slug}/`, site.baseUrl).toString();
  const body = await QRCode.toString(url, { type: 'svg', errorCorrectionLevel: 'Q', margin: 4, color: { dark: '#000000', light: '#ffffff' } });
  return new Response(body, { headers: { 'Content-Type': 'image/svg+xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600' } });
}
