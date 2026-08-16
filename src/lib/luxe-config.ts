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

/** Responsive image delivery helper.

    Cloudinary assets use its automatic format/quality transformation. CMS
    uploads live in Supabase Storage; the object endpoint returns the original
    upload (some older `.webp` files are actually 5 MB PNGs) with `no-cache`.
    Supabase's render endpoint converts those originals to a correctly-sized,
    long-cached WebP/AVIF response based on the browser's Accept header. */
export function cloudinary(
  url: string | null | undefined,
  width?: number,
  height?: number,
): string {
  if (!url) return '';
  if (url.includes('res.cloudinary.com') && url.includes('/upload/')) {
    const dimensions = [
      width ? `w_${width}` : '',
      height ? `h_${height}` : '',
      height ? 'c_fill,g_auto' : '',
    ].filter(Boolean);
    const t = ['f_auto', 'q_auto', ...dimensions].join(',');
    return url.replace('/upload/', `/upload/${t}/`);
  }

  if (width && url.includes('.supabase.co/storage/v1/object/public/')) {
    try {
      const transformed = new URL(url);
      transformed.pathname = transformed.pathname.replace(
        '/storage/v1/object/public/',
        '/storage/v1/render/image/public/',
      );
      transformed.searchParams.set('width', String(width));
      if (height) transformed.searchParams.set('height', String(height));
      transformed.searchParams.set('quality', '72');
      // A requested height means the UI has a known crop and Supabase can
      // discard off-screen pixels before transfer. Width-only images retain
      // their intrinsic aspect ratio instead of decoding thousands of rows.
      transformed.searchParams.set('resize', height ? 'cover' : 'contain');
      return transformed.toString();
    } catch {
      return url;
    }
  }

  return url;
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
  'Project initiation', 'Site consultation', 'Proposal & approval',
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

/** The single paid start to a LUXEhome bathroom project. It covers one
    bathroom proposal and becomes an advance against construction when the
    client appoints LUXEhome to build that bathroom. */
export const PROJECT_INITIATION = {
  amount: 50_000,
  title: 'Bathroom project initiation deposit',
  copy: 'One site consultation, a detailed bathroom design and a complete construction proposal for one bathroom.',
  credit: '100% credited toward the LUXEhome construction balance for that bathroom.',
  delivery: 'The complete proposal is delivered within seven working days after the site visit.',
  includes: [
    'Site consultation, measurements and technical review',
    'Detailed bathroom design with five presentation images',
    'Material and finish selection, with reference images where useful',
    'Project timeline, quality commitments and applicable warranties',
    'Final construction quotation in one proposal PDF',
    '3D walkthrough video link',
  ],
  multipleBathrooms: 'For multiple bathrooms, begin with one. Review its complete proposal before deciding whether to initiate the remaining bathrooms.',
} as const;

/** "Built the LUXEhome Way" — the construction system every bathroom follows.
    The dedicated page renders these in full; the BuildProcess highlight on the
    home and design pages renders just the titles, so the two cannot drift. */
export const BUILD_STAGES: Array<{
  n: string; title: string; lead: string; points?: string[]; close?: string;
}> = [
  {
    n: '01', title: 'Site Consultation & Measurements',
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

/** LUXEhome's workmanship promise is kept separate from third-party product
    and supplier warranties. These labels are the public single source of truth. */
export const WARRANTY_SCHEDULE: Array<{ item: string; period: string }> = [
  { item: 'LUXEhome workmanship',    period: '24 months' },
  { item: 'Handover snag review',    period: '30 days' },
  { item: 'Product warranties',      period: 'Manufacturer terms' },
  { item: 'Supplier-backed systems', period: 'Written per project' },
];

/** Brands strip for home / landing pages. */
export const BRAND_STRIP = [
  'Swiss Bathware', 'Rocell', 'Swisstek', 'S-lon', 'Tokyo Super 2K',
  'ACL', 'iPanel', '10mm Malaysian Tempered Glass', 'Eco Board', '5mm Mirrors',
];

/** Whole-house planner multipliers (editable in one place). */
export const PLANNER = {
  collections: {
    flora:    { label: 'Level 1 · Flora',        basePrice: 1_000_000 },
    island:   { label: 'Level 2 · Island',       basePrice: 1_394_000 },
    heritage: { label: 'Level 3 · Heritage',     basePrice: 1_767_000 },
    gems:     { label: 'Level 4 · Ceylon Gems',  basePrice: null },
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
