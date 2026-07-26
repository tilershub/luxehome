/* ============================================================
   LUXEhome catalogue — shared configuration
   ============================================================ */

/** The one place the WhatsApp number lives. */
export const WHATSAPP_NUMBER = '94774503744';

/** GA4 properties tagged on every public page through LuxeLayout. Each entry
    gets its own gtag config call, so add an ID here to tag a second property. */
export const GA_MEASUREMENT_IDS = ['G-XKXFPFS3VN'];

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** "LKR 2.06M" — the bare amount, without the "From" prefix. */
export function lkrM(rupees: number): string {
  const millions = rupees / 1_000_000;
  const label = millions >= 10 ? millions.toFixed(0) : (Math.round(millions * 1000) / 1000).toString();
  return `LKR ${label}M`;
}

/** "From LKR X M" — store rupees in DB, format in UI. */
export function formatLKRM(rupees: number): string {
  const millions = rupees / 1_000_000;
  // Preserve exact catalogue prices down to LKR 1,000 (for example 2.175M)
  // without adding trailing zeroes to round figures such as 1M or 1.6M.
  const label = millions >= 10 ? millions.toFixed(0) : (Math.round(millions * 1000) / 1000).toString();
  return `From LKR ${label}M`;
}

export const SITE_URL = 'https://luxehome.lk';

/** Social crawlers cannot resolve a relative path — "/images/x.jpg" is simply
    dropped, and the share falls back to no image at all. Every og:image must
    be absolute. */
export function absoluteUrl(path: string | null | undefined): string | null {
  if (!path) return null;
  if (/^https?:\/\//i.test(path)) return path;
  return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/** Areas are numeric in Postgres and come back as strings ("3.50"), so render
    them without trailing zeros: 3.5 m², 5 m², 5.3 m². */
export function formatArea(value: number | string | null | undefined): string | null {
  if (value === null || value === undefined || value === '') return null;
  const n = Number(value);
  return Number.isFinite(n) ? String(n) : String(value);
}

/** Cloudinary delivery helper: f_auto,q_auto + width on Cloudinary URLs,
    pass-through for everything else. */
export function cloudinary(url: string | null | undefined, width?: number): string {
  if (!url) return '';
  if (!url.includes('res.cloudinary.com') || !url.includes('/upload/')) return url;
  const t = width ? `f_auto,q_auto,w_${width}` : 'f_auto,q_auto';
  return url.replace('/upload/', `/upload/${t}/`);
}

/** Fixture category presets per space (admin dropdown suggestions;
    free text is always allowed). Keys = lx_spaces.slug. */
export const FIXTURE_CATEGORIES: Record<string, string[]> = {
  // Ordered the way clients actually look through a bathroom. This order also
  // sequences the fixture schedule on the design page when sort_order is unset.
  bathrooms: [
    'Water Closet', 'Bidet Spray', 'Paper Holder',
    'Wash Basin', 'Basin Mixer / Tap',
    'Shower', 'Angle Valve', 'Accessories',
    'Gully Cover', 'Magic Hose', 'Flexible Hose', 'Magic Bend',
    'Mirror', 'Vanity Cupboard', 'Shower Cubicle',
    'Water Heater', 'Exhaust Fan', 'Light Fixtures',
    'Door', 'Window', 'Other',
  ],

  kitchens: [
    'Tile', 'Pantry Cupboards', 'Countertop', 'Sink & Tap', 'Hob & Hood',
    'Backsplash', 'Ceiling', 'Light Fixtures', 'Accessories', 'Door', 'Window', 'Other',
  ],
  staircases: [
    'Steps & Treads', 'Railing & Balustrade', 'Handrail', 'Cladding / Tile',
    'Light Fixtures', 'Landing', 'Other',
  ],
  floors: [
    'Tile / Material', 'Skirting', 'Waterproofing', 'Floor Preparation',
    'Transitions & Trims', 'Other',
  ],
};

/** Material and surface presets used by the admin checklist. These are
    intentionally category-only: the exact brand, item and finish must be
    confirmed for each design before the row appears on the public page. */
export const MATERIAL_CATEGORIES: Record<string, string[]> = {
  bathrooms: [
    'Wall Tiles', 'Floor Tiles', 'Tile Adhesive', 'Grout',
    'Waterproofing System', 'Plumbing Pipes & Fittings',
    'Electrical Wiring & Cables', 'Ceiling System / Finish',
    'Paint / Coating', 'Vanity Material / Finish', 'Niche Finish',
    'Shower Glass & Hardware Finish', 'Silicone & Sealants',
    'Door & Window Finish', 'Other',
  ],
  kitchens: [
    'Floor Tiles', 'Wall Tiles / Backsplash', 'Pantry Material & Finish',
    'Countertop', 'Tile Adhesive', 'Grout', 'Waterproofing System',
    'Plumbing Pipes & Fittings', 'Electrical Wiring & Cables',
    'Ceiling System / Finish', 'Paint / Coating', 'Silicone & Sealants',
    'Other',
  ],
  staircases: [
    'Step / Tread Material', 'Riser Finish', 'Skirting',
    'Railing & Handrail Finish', 'Adhesive', 'Grout',
    'Lighting Finish', 'Paint / Coating', 'Sealants', 'Other',
  ],
  floors: [
    'Floor Tile / Material', 'Skirting', 'Tile Adhesive', 'Grout',
    'Floor Preparation', 'Waterproofing System',
    'Transitions & Trims', 'Sealants', 'Other',
  ],
};

/** Default construction materials inserted when admin creates a design. */
export const DEFAULT_MATERIALS: Array<{ category: string; brand: string; item: string }> = [
  { category: 'Tile Adhesive',  brand: 'Swisstek',       item: 'Tile Adhesive' },
  { category: 'Grout',          brand: 'Swisstek',       item: 'Grout' },
  { category: 'Pipes',          brand: 'S-lon',          item: 'Pipes & Accessories' },
  { category: 'Waterproofing',  brand: 'Tokyo Super 2K', item: 'Waterproofing' },
  { category: 'Wiring',         brand: 'ACL',            item: 'Wiring & Cables' },
];

/** Journey stages pre-seeded into every new project in admin. */
export const DEFAULT_JOURNEY_STAGES = [
  'First inquiry', 'Site visit', 'Design & approval',
  'Work begins', 'Construction', 'Clean & handover',
];

/** The four technical drawings are one shared set, sampled for a 2.5 m × 2 m
    room. They are not uploaded per design — every design file is drawn to the
    same conventions, so the samples on every design page are identical. */
export const STANDARD_DRAWINGS = [
  { kind: 'civil',          label: 'Civil Drawing',           tag: 'Plan & levels',      image: '/images/drawings/civil.webp' },
  { kind: 'supply_water',   label: 'Water Supply Layout',     tag: 'Plumbing',           image: '/images/drawings/supply-water.webp' },
  { kind: 'waste_drainage', label: 'Waste & Drainage Layout', tag: 'Plumbing',           image: '/images/drawings/waste-drainage.webp' },
  { kind: 'electrical',     label: 'Electrical Layout',       tag: 'Points & lighting',  image: '/images/drawings/electrical.webp' },
] as const;

/** What a client pays before construction. The design package is refundable
    and is charged on top of the site inspection. */
export const PRE_CONSTRUCTION_FEES = {
  inspection: {
    amount: 10_000,
    title: 'Site inspection',
    copy: 'We measure the room, review services, site condition and access, then recommend the design that fits.',
  },
  designPackage: {
    amount: 40_000,
    refundable: true,
    title: 'Customised design package',
    copy: 'Your chosen design worked up around your actual room and issued as a complete set.',
    includes: [
      '3D video walkthrough of your room',
      'Civil layout',
      'Supply water drawing',
      'Waste & drainage layout',
      'Electrical diagram',
    ],
  },
  /** Both stages taken together. */
  combined: 50_000,
} as const;

/** "Built the LUXEhome Way" — the construction system every bathroom follows.
    The dedicated page renders these in full; the BuildProcess highlight on the
    home and design pages renders just the titles, so the two cannot drift. */
export const BUILD_STAGES: Array<{
  n: string; title: string; lead: string; points?: string[]; close?: string;
}> = [
  {
    n: '01', title: 'Consultation & Site Inspection',
    lead: 'We inspect your home, understand your requirements, take precise measurements, and identify technical requirements before any design work begins.',
  },
  {
    n: '02', title: 'Design & Planning',
    lead: 'We create a detailed 3D design and prepare the complete technical drawings including:',
    points: ['Plumbing layout', 'Electrical layout', 'Tile layout', 'Ceiling layout', 'Material schedule'],
    close: 'Everything is finalised before construction starts.',
  },
  {
    n: '03', title: 'Material Procurement',
    lead: 'Premium materials are sourced and quality checked.',
    close: 'We carefully schedule deliveries so every stage has the correct materials at the right time.',
  },
  {
    n: '04', title: 'Site Protection & Preparation',
    lead: 'Your home is protected before work begins.',
    points: ['Floor protection', 'Dust control', 'Material storage', 'Safety setup'],
  },
  {
    n: '05', title: 'Demolition & Civil Works',
    lead: 'Existing finishes are removed safely. This stage includes:',
    points: ['Demolition', 'Debris removal', 'Floor correction', 'Wall plastering', 'Dummy walls', 'Structural modifications'],
  },
  {
    n: '06', title: 'Plumbing & Electrical',
    lead: 'Hidden systems are installed before surfaces are closed. Including:',
    points: ['Water supply', 'Drainage', 'Hot water lines', 'Electrical wiring', 'Lighting preparation', 'Exhaust preparation'],
    close: 'Every system is pressure tested before proceeding.',
  },
  {
    n: '07', title: 'Premium Waterproofing',
    lead: 'The most critical stage of the project. Our waterproofing system includes:',
    points: ['Surface preparation', 'Corner reinforcement', 'Pipe penetration sealing', 'Multiple waterproof coats', 'Reinforcement mesh', '24–48 hour flood test'],
    close: 'Only after passing the flood test does tiling begin.',
  },
  {
    n: '08', title: 'Precision Tiling',
    lead: 'Large-format tile installation using professional techniques.',
    points: ['Laser alignment', 'Tile levelling system', 'Premium adhesive', 'Precision cutting', 'Premium grout', 'Silicone finishing'],
    close: 'Every tile is installed for perfect alignment and long-term durability.',
  },
  {
    n: '09', title: 'Ceiling & Lighting',
    lead: 'We complete the architectural finishes. Including:',
    points: ['Ceiling installation', 'Painting', 'LED lighting', 'Ambient lighting', 'Ventilation', 'Switches & sockets'],
  },
  {
    n: '10', title: 'Fixture Installation',
    lead: 'Premium bathroom fixtures are installed. Including:',
    points: ['Vanity', 'Basin', 'Water closet', 'Shower system', 'Shower cubicle', 'Mirror', 'Accessories'],
    close: 'Everything is levelled, sealed, and tested.',
  },
  {
    n: '11', title: 'Final Quality Inspection',
    lead: 'Before handover, every bathroom goes through our internal quality checklist. We inspect:',
    points: ['Waterproofing', 'Tile alignment', 'Grouting', 'Silicone', 'Plumbing', 'Electrical', 'Water pressure', 'Drainage', 'Cleaning', 'Finish quality'],
  },
  {
    n: '12', title: 'Handover & Warranty',
    lead: 'Your bathroom is professionally cleaned and handed over. You’ll receive:',
    points: ['Project walkthrough', 'Maintenance guidance', 'Warranty information', 'Care instructions'],
  },
];

/** Why homeowners choose LUXEhome — shown under the construction system. */
export const WHY_LUXEHOME = [
  'Professional planning before construction',
  'Technical drawings for every project',
  'Premium waterproofing system',
  'Precision workmanship',
  'High-quality materials',
  'Dedicated project management',
  'Strict quality inspections',
  'Clean, organised worksites',
  'Transparent communication',
  'Workmanship warranty',
];

/** Warranty is given per task, not as one blanket cover. Each part of the
    work carries its own documented period. The one place these live. */
export const WARRANTY_SCHEDULE: Array<{ item: string; period: string }> = [
  { item: 'Bathware',          period: '15 years' },
  { item: 'Waterproofing',     period: '10 years' },
  { item: 'Plumbing',          period: '10 years' },
  { item: 'Wiring',            period: '10 years' },
  { item: 'Taps & showers',    period: '5 years' },
  { item: 'Ceiling',           period: '5 years' },
  { item: 'Light fixtures',    period: '1 year' },
  { item: 'Tempered glass',    period: '1 year' },
];

/** Brands strip for home / landing pages. */
export const BRAND_STRIP = [
  'Swiss Bathware', 'Rocell', 'Swisstek', 'S-lon', 'Tokyo Super 2K',
  'ACL', 'iPanel', '10mm Malaysian Tempered Glass', 'Eco Board', '5mm Mirrors',
];

/** Whole-house planner multipliers (editable in one place). */
export const PLANNER = {
  collections: {
    standard:  { label: 'Standard',  basePrice: 1_000_000 },
    premium:   { label: 'Premium',   basePrice: 1_600_000 },
    signature: { label: 'Signature', basePrice: 2_175_000 },
  },
  /** Size multipliers applied to a collection's base price. */
  sizeMultipliers: {
    compact:  { label: 'Compact (under 4 m²)', factor: 1.0 },
    standard: { label: 'Standard (4–6 m²)',    factor: 1.15 },
    large:    { label: 'Large (6 m²+)',        factor: 1.35 },
  },
} as const;

/** File completeness checks for the legacy admin designs list (7 checks). */
export const COMPLETENESS_CHECKS = [
  { key: 'drawings',  label: '5 room images' },
  { key: 'video',     label: '3D video' },
  { key: 'pricing',   label: '3 size prices' },
  { key: 'fixtures',  label: '≥5 fixtures' },
  { key: 'materials', label: '≥4 materials' },
  { key: 'workflow',  label: 'workflow note' },
  { key: 'faq',       label: '≥1 FAQ' },
] as const;
