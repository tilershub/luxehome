/* ============================================================
   Structured data (JSON-LD) shared across public pages.
   One business entity with a stable @id, so Google and AI answer
   engines resolve "BathSpace", "LUXEhome" and "LUXEhome (Pvt) Ltd"
   to the same company.
   ============================================================ */
import { SITE_URL, WHATSAPP_NUMBER } from './luxe-config';

export const ORG_ID = `${SITE_URL}/#business`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

/** Add public profile URLs here (Facebook, Instagram, YouTube, TikTok,
    Google Business Profile). They strengthen entity matching in AI answers. */
export const SAME_AS: string[] = [];

export const businessSchema = {
  '@type': 'HomeAndConstructionBusiness',
  '@id': ORG_ID,
  name: 'BathSpace by LUXEhome',
  alternateName: ['LUXEhome', 'BathSpace', 'LUXEhome Sri Lanka'],
  legalName: 'LUXEhome (Pvt) Ltd',
  url: `${SITE_URL}/`,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  image: `${SITE_URL}/og-bathroom.jpg`,
  description:
    'Complete bathroom renovation company in Sri Lanka. One accountable team handles design, 3D visuals, plumbing, electrical, waterproofing, tiling, fixtures and handover, with a 24-month workmanship warranty.',
  telephone: `+${WHATSAPP_NUMBER}`,
  priceRange: 'LKR 1,500,000 – 2,500,000 per bathroom',
  currenciesAccepted: 'LKR',
  address: { '@type': 'PostalAddress', addressCountry: 'LK' },
  areaServed: { '@type': 'Country', name: 'Sri Lanka' },
  knowsAbout: [
    'Bathroom renovation',
    'Bathroom waterproofing',
    'Bathroom tiling',
    'Bathroom design',
    'Wall-hung WC and concealed cistern installation',
    'Shower glass partitions',
  ],
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: `+${WHATSAPP_NUMBER}`,
    contactType: 'customer service',
    areaServed: 'LK',
    availableLanguage: ['English', 'Sinhala'],
  },
  ...(SAME_AS.length ? { sameAs: SAME_AS } : {}),
};

export const websiteSchema = {
  '@type': 'WebSite',
  '@id': WEBSITE_ID,
  url: `${SITE_URL}/`,
  name: 'BathSpace by LUXEhome',
  inLanguage: 'en-LK',
  publisher: { '@id': ORG_ID },
};

export const renovationServiceSchema = {
  '@type': 'Service',
  '@id': `${SITE_URL}/#bathroom-renovation`,
  name: 'Complete bathroom renovation in Sri Lanka',
  serviceType: 'Bathroom renovation',
  provider: { '@id': ORG_ID },
  areaServed: { '@type': 'Country', name: 'Sri Lanka' },
  description:
    'Design-led bathroom renovation from site visit, layout plan, 3D images and walkthrough video to demolition, plumbing, electrical, waterproofing with flood testing, tiling, fixtures, cleaning and documented handover.',
  offers: [
    {
      '@type': 'Offer',
      name: 'Design and quotation package (per bathroom)',
      price: 30000,
      priceCurrency: 'LKR',
      description: 'Site visit, layout plan, 3D images, walkthrough video and detailed quotation. Fully credited against construction if BathSpace is appointed.',
    },
    {
      '@type': 'Offer',
      name: 'Complete bathroom renovation',
      priceSpecification: {
        '@type': 'PriceSpecification',
        minPrice: 1500000,
        maxPrice: 2500000,
        priceCurrency: 'LKR',
      },
    },
  ],
};

export function faqSchema(items: Array<{ q: string; a: string }>) {
  return {
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbSchema(crumbs: Array<{ name: string; path: string }>) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: `${SITE_URL}${crumb.path === '/' ? '/' : crumb.path}`,
    })),
  };
}

/** Serialise one or more schema nodes into a single @graph document. Escapes
    "<" so CMS text can never close the script tag. */
export function jsonLd(...nodes: object[]): string {
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': nodes }).replace(/</g, '\\u003c');
}
