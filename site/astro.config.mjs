import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkStripTitle from './src/lib/remark-strip-title.mjs';
import rehypeFaqDetails from './src/lib/rehype-faq-details.mjs';
import rehypeAccessibleTables from './src/lib/rehype-accessible-tables.mjs';
import rehypeImageDimensions from './src/lib/rehype-image-dimensions.mjs';

export default defineConfig({
  site: 'https://www.katridout.com.au',
  output: 'static',
  trailingSlash: 'always',
  integrations: [sitemap({
    // noindex pages: keep out of the sitemap
    filter: (page) => !/\/(thank-you|book-a-free-call|guide|telehealth-terms|one-question-consult|one-question-intake|oneq-approve)\/$/.test(page),
  })],
  markdown: { remarkPlugins: [remarkStripTitle], rehypePlugins: [rehypeFaqDetails, rehypeAccessibleTables, rehypeImageDimensions] },
  build: { inlineStylesheets: 'always' },
});
