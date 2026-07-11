// @ts-check
import { defineConfig } from 'astro/config';
import cloudflare from '@astrojs/cloudflare';

// https://astro.build/config
export default defineConfig({
  site: 'https://mathlacome.mathlacome.workers.dev',
  output: 'server',
  adapter: cloudflare(),
});
