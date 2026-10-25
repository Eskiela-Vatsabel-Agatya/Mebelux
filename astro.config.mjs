import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

const siteUrl = process.env.PUBLIC_SITE_URL || 'http://localhost:4321';
export default defineConfig({
  output: 'static',
  site: siteUrl,
  integrations: [sitemap()],
});
