// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';
import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://mathlacome.mathlacome.workers.dev',
  output: 'server',
  adapter: cloudflare(),
  integrations: [mdx()],
});
