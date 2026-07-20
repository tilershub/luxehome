/* ============================================================
   LUXEhome catalogue — shared configuration
   ============================================================ */

/** The one place the WhatsApp number lives. */
export const WHATSAPP_NUMBER = '94774503744';

export function waLink(message: string): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

/** "From LKR X M" — store rupees in DB, format in UI. */
export function formatLKRM(rupees: number): string {
  const millions = rupees / 1_000_000;
  // Preserve exact catalogue prices down to LKR 1,000 (for example 2.175M)
  // without adding trailing zeroes to round figures such as 1M or 1.6M.
  const label = millions >= 10 ? millions.toFixed(0) : (Math.round(millions * 1000) / 1000).toString();
  return `From LKR ${label}M`;
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
  bathrooms: [
    'Tile', 'Water Closet', 'Wash Basin', 'Shower', 'Shower Cubicle', 'Mirror',
    'Cupboard / Vanity', 'Ceiling', 'Bathtub & Mixer', 'Light Fixtures',
    'Bidet Spray', 'Gully Covers', 'Accessories', 'Door', 'Window', 'Other',
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

/** File completeness checks for the admin designs list (6 checks). */
export const COMPLETENESS_CHECKS = [
  { key: 'drawings',  label: '≥6 drawings' },
  { key: 'video',     label: '3D video' },
  { key: 'fixtures',  label: '≥5 fixtures' },
  { key: 'materials', label: '≥4 materials' },
  { key: 'workflow',  label: 'workflow + timeline' },
  { key: 'faq',       label: '≥1 FAQ' },
] as const;
