/* Shared schema.org entities. Every page emits the same Organization + Person + WebSite
   graph (stable @id values) so search engines and AI assistants can tie articles, services
   and city pages back to one practice and one practitioner. */

export const SITE = 'https://www.katridout.com.au';
export const ORG_ID = `${SITE}/#organization`;
export const PERSON_ID = `${SITE}/#katrina-ridout`;
export const WEBSITE_ID = `${SITE}/#website`;

export const SAME_AS = [
  'https://www.instagram.com/katrinaridoutnutrition/',
  'https://www.facebook.com/katrinaridoutnutrition/',
  'https://www.linkedin.com/in/katrinaridout/',
  'https://g.page/r/CaPM342_gamiEBM',
  'https://member.dietitiansaustralia.org.au/FAAPD_Profile?ID=48159',
];

export const ADDRESS = {
  '@type': 'PostalAddress',
  streetAddress: 'Milton Village Medical, Level 1, 36 Baroona Road',
  addressLocality: 'Milton',
  addressRegion: 'QLD',
  postalCode: '4064',
  addressCountry: 'AU',
};

export const KNOWS_ABOUT = [
  'Fertility nutrition',
  'Preconception nutrition',
  'IVF nutrition',
  'PMOS (polycystic ovary syndrome) nutrition',
  'Endometriosis nutrition',
  'Pregnancy nutrition',
  'Gestational diabetes',
  'Postpartum nutrition',
  'Breastfeeding nutrition',
  'Dietetics',
];

export const PERSON = {
  '@type': 'Person',
  '@id': PERSON_ID,
  name: 'Katrina Ridout',
  alternateName: 'Kat Ridout',
  jobTitle: 'Accredited Practising Dietitian',
  honorificSuffix: 'APD',
  url: `${SITE}/about-kat/`,
  image: `${SITE}/images/kat-ridout-apd.jpg`,
  worksFor: { '@id': ORG_ID },
  memberOf: { '@type': 'Organization', name: 'Dietitians Australia', url: 'https://dietitiansaustralia.org.au/' },
  alumniOf: [
    { '@type': 'CollegeOrUniversity', name: 'Queensland University of Technology' },
    { '@type': 'CollegeOrUniversity', name: 'The University of Queensland' },
  ],
  knowsAbout: KNOWS_ABOUT,
  sameAs: SAME_AS,
};

export const ORGANIZATION = {
  '@type': ['MedicalBusiness', 'Organization'],
  '@id': ORG_ID,
  name: 'Katrina Ridout Nutrition',
  alternateName: 'KRN',
  url: `${SITE}/`,
  logo: `${SITE}/images/wp/2023/01/katlogo.png`,
  image: `${SITE}/images/kat-ridout-apd.jpg`,
  telephone: '+611300640104',
  email: 'info@katridout.com.au',
  address: ADDRESS,
  areaServed: [
    { '@type': 'Country', name: 'Australia' },
    { '@type': 'City', name: 'Brisbane' },
    { '@type': 'City', name: 'Sydney' },
    { '@type': 'City', name: 'Melbourne' },
    { '@type': 'City', name: 'Perth' },
    { '@type': 'City', name: 'Adelaide' },
    { '@type': 'City', name: 'Gold Coast' },
    { '@type': 'City', name: 'Canberra' },
  ],
  medicalSpecialty: 'Dietetic',
  founder: { '@id': PERSON_ID },
  employee: { '@id': PERSON_ID },
  knowsAbout: KNOWS_ABOUT,
  sameAs: SAME_AS,
};

export const WEBSITE = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE}/`,
  name: 'Katrina Ridout Nutrition',
  publisher: { '@id': ORG_ID },
  inLanguage: 'en-AU',
};

/** Graph emitted on every page. */
export const BASE_GRAPH = {
  '@context': 'https://schema.org',
  '@graph': [ORGANIZATION, PERSON, WEBSITE],
};

export function breadcrumbList(crumbs: { label: string; href?: string }[], currentUrl: string) {
  if (!crumbs.length) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: c.label,
      item: c.href ? new URL(c.href, SITE).toString() : currentUrl,
    })),
  };
}

/** Extract Q&A pairs from a markdown body: "### question" headings after a "## Frequently Asked Questions" heading. */
export function faqFromMarkdown(body: string | undefined): { q: string; a: string }[] {
  if (!body) return [];
  const idx = body.search(/^##\s+Frequently Asked Questions/im);
  if (idx < 0) return [];
  const section = body.slice(idx).split('\n').slice(1).join('\n');
  // Stop at the next H2.
  const end = section.search(/^##\s+[^#]/m);
  const faq = end >= 0 ? section.slice(0, end) : section;
  const parts = faq.split(/^###\s+/m).slice(1);
  const strip = (s: string) =>
    s
      .replace(/!\[[^\]]*\]\([^)]*\)/g, '')
      .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
      .replace(/<[^>]+>/g, '')
      .replace(/[*_`>]/g, '')
      .replace(/\s+/g, ' ')
      .trim();
  return parts
    .map((p) => {
      const nl = p.indexOf('\n');
      const q = strip(nl >= 0 ? p.slice(0, nl) : p);
      const a = strip(nl >= 0 ? p.slice(nl + 1) : '');
      return { q, a };
    })
    .filter((x) => x.q && x.a.length > 20);
}

export function faqPage(pairs: { q: string; a: string }[]) {
  if (!pairs.length) return undefined;
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: pairs.map((p) => ({
      '@type': 'Question',
      name: p.q,
      acceptedAnswer: { '@type': 'Answer', text: p.a },
    })),
  };
}
