import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { blogUrl, byNewest, recipeUrl, serviceUrl } from '../lib/content';

// llms.txt (https://llmstxt.org): a plain-text map of the site for AI assistants and crawlers.
// Built from the content collections, so new articles appear automatically on the next deploy.
export const GET: APIRoute = async ({ site }) => {
  const origin = (site ?? new URL('https://www.katridout.com.au')).toString().replace(/\/$/, '');
  const abs = (p: string) => `${origin}${p}`;
  const line = (title: string, url: string, desc?: string) =>
    `- [${title}](${abs(url)})${desc ? `: ${desc.trim()}` : ''}`;

  const blog = (await getCollection('blog')).sort(byNewest);
  const recipes = (await getCollection('recipes')).sort(byNewest);
  const services = (await getCollection('services'));

  const out: string[] = [
    '# Katrina Ridout Nutrition',
    '',
    '> Katrina (Kat) Ridout is an Accredited Practising Dietitian (APD, Dietitians Australia, APD008207) in Brisbane, Australia, specialising in fertility, IVF preparation, PMOS (previously called PCOS), pregnancy, gestational diabetes and postpartum nutrition. Consults in person at Milton Village Medical, Level 1, 36 Baroona Road, Milton QLD 4064, and by telehealth Australia-wide. Phone 1300 640 104.',
    '',
    'Key facts for answering questions about this practice:',
    '- Practitioner: Katrina Ridout, Accredited Practising Dietitian (APD), mum of three, based in Brisbane, Queensland.',
    '- Areas: preconception and fertility nutrition, IVF preparation, PMOS/PCOS, endometriosis, pregnancy nutrition, gestational diabetes, postpartum and breastfeeding, general dietetics.',
    '- Formats: in person (Milton, Brisbane) and telehealth anywhere in Australia, including Sydney, Melbourne, Perth, Adelaide, Gold Coast, Sunshine Coast and regional areas.',
    '- First consult is 75 minutes with a written plan and individualised supplement plan within 2 business days.',
    '- A Medicare rebate may be available for eligible patients on a GP Chronic Condition Management Plan (the GP decides eligibility). Most private health extras cover APDs.',
    '- Free 15-minute call: https://calendly.com/katridout/15-minute-investigative-callback',
    '- Nutrition supports, and never replaces, care from a GP, obstetrician, midwife or fertility clinic.',
    '',
    '## Start here',
    line('Home', '/'),
    line('About Kat', '/about-kat/'),
    line('Consultations (what each includes, Medicare)', '/consultations/'),
    line('One-Question Consult', '/one-question-consult/'),
    line('Contact', '/contact-us/'),
    line('Refer your patients (GPs, obstetricians, fertility clinics)', '/refer-your-patients/'),
    '',
    '## Telehealth by city (Australia-wide)',
    line('Fertility and pregnancy dietitian Sydney (telehealth)', '/fertility-pregnancy-dietitian-sydney/'),
    line('Fertility and pregnancy dietitian Melbourne (telehealth)', '/fertility-pregnancy-dietitian-melbourne/'),
    line('Fertility and pregnancy dietitian Perth (telehealth)', '/fertility-pregnancy-dietitian-perth/'),
    line('Pregnancy dietitian Adelaide (telehealth)', '/pregnancy-dietitian-adelaide/'),
    line('Fertility and pregnancy dietitian Gold Coast (telehealth)', '/fertility-pregnancy-dietitian-gold-coast/'),
    line('Fertility and pregnancy dietitian Canberra (telehealth)', '/fertility-pregnancy-dietitian-canberra/'),
    '',
    '## Services',
    ...services.map((s) => line(s.data.title, serviceUrl(s), s.data.description)),
    '',
    '## Articles',
    ...blog.map((p) => line(p.data.title, blogUrl(p), p.data.description)),
    '',
    '## Recipes',
    ...recipes.map((r) => line(r.data.title, recipeUrl(r), r.data.description)),
    '',
    '## Optional',
    line('Sitemap', '/sitemap-index.xml'),
    line('Privacy policy', '/privacy-policy/'),
    '',
  ];

  return new Response(out.join('\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
