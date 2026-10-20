import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkStripTitle from './src/lib/remark-strip-title.mjs';

export default defineConfig({
  site: 'https://www.katridout.com.au',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap()],
  markdown: { remarkPlugins: [remarkStripTitle] },
  build: { inlineStylesheets: 'auto' },
});
