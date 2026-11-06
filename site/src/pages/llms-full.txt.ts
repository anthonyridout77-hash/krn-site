import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { blogUrl, byNewest, isoDate, recipeUrl, serviceUrl } from '../lib/content';

// llms-full.txt: the full text of every public article, recipe and service page in one
// plain-text file, so AI assistants can read the practice's content without crawling.
// Generated at build time from the content collections.

function toText(md: string | undefined): string {
  if (!md) return '';
  return md
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
    .replace(/<img[^>]*>/gi, '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/(p|div|li|h[1-6]|tr|section)>/gi, '\n')
    .replace(/<[^>]+>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&rsquo;/g, '’')
    .replace(/&#8216;|&lsquo;/g, '‘')
    .replace(/&#8220;|&ldquo;/g, '“')
    .replace(/&#8221;|&rdquo;/g, '”')
    .replace(/&#8211;|&ndash;/g, '-')
    .replace(/&#8212;|&mdash;/g, '-')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL('https://www.katridout.com.au')).toString().replace(/\/$/, '');
  const blog = (await getCollection('blog')).sort(byNewest);
  const recipes = (await getCollection('recipes')).sort(byNewest);
  const services = await getCollection('services');

  const header = [
    '# Katrina Ridout Nutrition: full text',
    '',
    '> Katrina (Kat) Ridout is an Accredited Practising Dietitian (APD, Dietitians Australia, APD008207) in Brisbane, Australia, specialising in fertility, IVF preparation, PMOS (previously called PCOS), pregnancy, gestational diabetes and postpartum nutrition. Consults in person at Milton Village Medical, Level 1, 36 Baroona Road, Milton QLD 4064, and by telehealth video Australia-wide. Phone 1300 640 104. Free 15-minute call: https://calendly.com/katridout/15-minute-investigative-callback',
    '',
    `Site map for assistants: ${origin}/llms.txt`,
    'Nutrition advice on this site is general information. It supports, and never replaces, care from a GP, obstetrician, midwife or fertility clinic.',
    '',
  ];

  const section = (title: string, url: string, meta: string[], body: string) =>
    [`---`, ``, `## ${title}`, `URL: ${url}`, ...meta, ``, body, ``].join('\n');

  const out: string[] = [...header, '# Services', ''];
  for (const s of services) {
    out.push(section(s.data.title, `${origin}${serviceUrl(s)}`, s.data.description ? [`Summary: ${s.data.description}`] : [], toText(s.body)));
  }
  out.push('# Articles', '');
  for (const p of blog) {
    const meta = [
      p.data.description ? `Summary: ${p.data.description}` : '',
      p.data.date ? `Published: ${isoDate(p.data.date)}` : '',
      p.data.updated ? `Updated: ${isoDate(p.data.updated)}` : '',
      'Author: Katrina Ridout, Accredited Practising Dietitian',
    ].filter(Boolean);
    out.push(section(p.data.title, `${origin}${blogUrl(p)}`, meta, toText(p.body)));
  }
  out.push('# Recipes', '');
  for (const r of recipes) {
    out.push(section(r.data.title, `${origin}${recipeUrl(r)}`, r.data.description ? [`Summary: ${r.data.description}`] : [], toText(r.body)));
  }

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
