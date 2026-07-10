// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  // TODO: once the Cloudflare Pages project exists, update this to its
  // real domain (the *.pages.dev URL, or your custom domain).
  site: 'https://mathlacome.mathlacome.workers.dev',
  output: 'server',
  adapter: cloudflare(),
});
