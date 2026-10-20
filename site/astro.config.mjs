import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkStripTitle from './src/lib/remark-strip-title.mjs';

export default defineConfig({
  site: 'https://www.katridout.com.au',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    // noindex pages: keep out of the sitemap
    filter: (page) => !/\/(thank-you|guide|telehealth-terms|one-question-consult)\/$/.test(page),
  })],
  markdown: { remarkPlugins: [remarkStripTitle] },
  build: { inlineStylesheets: 'auto' },
});
