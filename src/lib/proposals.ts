export type ProposalStatus = 'draft' | 'approved' | 'sent' | 'accepted' | 'declined' | 'expired';

export interface ProposalScopeItem {
  title: string;
  description: string;
  included?: boolean;
}

export interface ProposalMaterial {
  system: string;
  brand: string;
  specification: string;
  image_url?: string;
  logo_urls?: string[];
  product_code?: string;
  colour?: string;
  size?: string;
  finish?: string;
  value_note?: string;
}

export interface ProposalImageItem {
  url: string;
  view: string;
  title: string;
  caption: string;
}

export interface ProposalFixture {
  category: string;
  name: string;
  brand: string;
  model: string;
  dimensions: string;
  finish: string;
  quantity: number;
  specification: string;
  warranty: string;
  value_note: string;
  image_url?: string;
  included?: boolean;
}

export interface ProposalPriceItem {
  category: string;
  description: string;
  amount_lkr: number;
}

export interface ProposalPaymentItem {
  stage: string;
  percentage: number;
  due_milestone: string;
  evidence: string;
}

export const PROPOSAL_BRANDS = [
  { name: 'Tokyo Cement Group', logoUrl: '/images/brands/tokyo-cement.webp', matches: [/\btokyo\b/i] },
  { name: 'S-lon', logoUrl: '/images/brands/slon.webp', matches: [/\bs[\s-]?lon\b/i] },
  { name: 'Swisstek', logoUrl: '/images/brands/swisstek.webp', matches: [/\bswisstek\b/i] },
  { name: 'ACL Cables', logoUrl: '/images/brands/acl-cables.webp', matches: [/\bacl\b/i] },
  { name: 'Swiss Bathware', logoUrl: '/images/brands/swiss-bathware.webp', matches: [/\bswiss(?:\s+bathware)?\b/i] },
  { name: 'Rocell', logoUrl: '/images/brands/rocell.webp', matches: [/\brocell\b/i] },
  { name: 'Mega Tile', logoUrl: '/images/brands/mega-tile.webp', matches: [/\bmega(?:\s+tile)?s?\b/i] },
] as const;

export function proposalBrandLogoUrls(brand: string): string[] {
  return PROPOSAL_BRANDS
    .filter((entry) => entry.matches.some((pattern) => pattern.test(brand)))
    .map((entry) => entry.logoUrl);
}

export function withProposalBrandLogos(material: ProposalMaterial): ProposalMaterial {
  return {
    ...material,
    logo_urls: proposalBrandLogoUrls(material.brand),
  };
}

export interface ProposalTimelineItem {
  week: string;
  title: string;
  description: string;
  start_date?: string;
  end_date?: string;
  milestone?: string;
}

export interface ProposalQualityItem {
  title: string;
  description: string;
}

export interface ProposalWarranty {
  item: string;
  period: string;
  basis: string;
}

export interface ProposalRecord {
  id?: string;
  proposal_number?: string;
  proposal_template_version: number;
  revision: number;
  revision_of?: string | null;
  status: ProposalStatus;
  source_inspection_id?: string | null;
  design_id?: string | null;
  client_name: string;
  client_phone: string;
  client_email: string;
  property_location: string;
  project_type: 'renovation' | 'new';
  project_title: string;
  bathroom_name: string;
  room_dimensions: string;
  room_sqm?: number | null;
  client_brief: string;
  site_findings: string;
  design_vision: string;
  value_points: string[];
  design_name: string;
  design_collection: string;
  selected_image_urls: string[];
  image_items: ProposalImageItem[];
  video_url: string;
  fixtures: ProposalFixture[];
  scope_items: ProposalScopeItem[];
  exclusions: string[];
  assumptions: string[];
  client_supplied_items: string[];
  variation_terms: string;
  materials: ProposalMaterial[];
  timeline: ProposalTimelineItem[];
  estimated_duration: string;
  proposed_start_date: string | null;
  proposed_handover_date: string | null;
  programme_extension_days: number;
  quality_items: ProposalQualityItem[];
  warranties: ProposalWarranty[];
  warranty_exclusions: string[];
  warranty_claim_contact: string;
  price_items: ProposalPriceItem[];
  discount_lkr: number;
  tax_lkr: number;
  adjustment_lkr: number;
  payment_schedule: ProposalPaymentItem[];
  contract_value_lkr: number;
  initiation_credit_lkr: number;
  validity_days: number;
  issued_at: string;
  valid_until: string;
  commencement_days: number;
  prepared_by: string;
  internal_notes: string;
  approved_at?: string | null;
  sent_at?: string | null;
  accepted_at?: string | null;
  created_at?: string;
  updated_at?: string;
}

export const DEFAULT_SCOPE: ProposalScopeItem[] = [
  {
    title: 'Preparation and demolition',
    description: 'Protection, controlled removal of existing finishes and fixtures, debris handling and working-area preparation.',
    included: true,
  },
  {
    title: 'Civil and service work',
    description: 'Required masonry, plaster repairs, floor build-up, concealed plumbing, drainage adjustments and electrical rough-in within the agreed bathroom scope.',
    included: true,
  },
  {
    title: 'Waterproofing and testing',
    description: 'Surface preparation, fillets, reinforced junctions, specified waterproofing coats and flood testing before tiling.',
    included: true,
  },
  {
    title: 'Tiling and ceiling',
    description: 'Tile setting, cutting, alignment, adhesive, grouting, ceiling construction and preparation of light and exhaust points.',
    included: true,
  },
  {
    title: 'Fixtures and joinery',
    description: 'Bathware, tapware, vanity, mirror, accessories, lighting and agreed electrical fixtures installed to the approved layout.',
    included: true,
  },
  {
    title: 'Glass, commissioning and clean',
    description: 'Shower cubicle installation, operational testing, snag corrections, final clean, client walkthrough and handover record.',
    included: true,
  },
];

export const DEFAULT_EXCLUSIONS = [
  'Work outside the agreed bathroom area.',
  'Utility authority charges and upgrades outside the written scope.',
  'Concealed defects that could not reasonably be identified during the site visit.',
  'Major structural alterations or client-requested additions unless expressly listed.',
];

export const DEFAULT_MATERIALS: ProposalMaterial[] = [
  { system: 'Waterproofing', brand: 'Tokyo Super 2K', specification: 'Reinforced wet-area system with flood testing', value_note: 'Protects the completed room before finishes conceal the substrate.' },
  { system: 'Water supply', brand: 'S-lon', specification: 'Approved pressure-rated pipes and fittings', value_note: 'A coordinated concealed system designed for reliable long-term service.' },
  { system: 'Tile fixing', brand: 'Swisstek', specification: 'Adhesive and grout selected for substrate and tile', value_note: 'Matched installation products support bond strength and a consistent finish.' },
  { system: 'Electrical wiring', brand: 'ACL', specification: 'Bathroom points, switching and protected circuits', value_note: 'Known cable specification and documented testing reduce hidden risk.' },
  { system: 'Bathware', brand: 'Swiss Bathware', specification: 'WC, basin and selected sanitary fixtures', value_note: 'Coordinated products create a consistent visual and functional result.' },
  { system: 'Tapware', brand: 'Swiss / approved', specification: 'Basin, shower and matching control fittings', value_note: 'Matching controls simplify selection, use and future servicing.' },
  { system: 'Tiles', brand: 'Rocell / Mega / approved', specification: 'Final model, size and finish listed after selection', value_note: 'The approved tile schedule controls colour, scale, alignment and procurement.' },
  { system: 'Glass and mirror', brand: 'Tempered glass / 5 mm mirror', specification: 'Measured after finished tile surfaces', value_note: 'Final measurement after tiling provides a cleaner, safer fit.' },
].map(withProposalBrandLogos);

export const DEFAULT_TIMELINE: ProposalTimelineItem[] = [
  { week: 'Week 1', title: 'Mobilisation and demolition', description: 'Protection, procurement, controlled demolition and debris removal.', milestone: 'Demolition completed' },
  { week: 'Week 1', title: 'Civil, plumbing and electrical', description: 'Masonry, floor preparation, concealed services and pressure testing.', milestone: 'Concealed services tested' },
  { week: 'Week 2', title: 'Waterproofing and flood test', description: 'Waterproofing application, inspection, curing and flood testing before tiling.', milestone: 'Flood test passed' },
  { week: 'Week 3', title: 'Tiling and grouting', description: 'Approved tile layout, installation, alignment, curing and grout completion.', milestone: 'Tiling completed' },
  { week: 'Week 4', title: 'Ceiling, lighting and fixtures', description: 'Ceiling, lights, bathware, tapware, vanity, mirror and accessories.', milestone: 'Fixtures commissioned' },
  { week: 'Week 4', title: 'Glass, final checks and handover', description: 'Shower cubicle, functional testing, snag corrections, cleaning and walkthrough.', milestone: 'Client handover' },
];

export const DEFAULT_VALUE_POINTS = [
  'The room is resolved in 3D before construction, reducing avoidable site decisions and rework.',
  'One accountable LUXEhome team coordinates design, procurement, construction, testing and handover.',
  'Critical concealed work is inspected and tested before it is covered by finishes.',
  'Fixtures, materials, brands and payment milestones are documented before appointment.',
];

export const DEFAULT_PRICE_ITEMS: ProposalPriceItem[] = [
  {
    category: 'Complete bathroom project',
    description: 'Design coordination, procurement, construction, quality checks, final installation and handover',
    amount_lkr: 0,
  },
];

export const DEFAULT_PAYMENT_SCHEDULE: ProposalPaymentItem[] = [
  { stage: 'Project confirmation', percentage: 25, due_milestone: 'On signed acceptance, before procurement and mobilisation', evidence: 'Approved proposal and commencement confirmation' },
  { stage: 'Demolition completed', percentage: 25, due_milestone: 'After controlled demolition and debris bagging', evidence: 'Stage photos and site update' },
  { stage: 'Waterproofing completed', percentage: 20, due_milestone: 'After waterproofing application and before flood testing', evidence: 'Waterproofing inspection record' },
  { stage: 'Tiling completed', percentage: 10, due_milestone: 'After tiling and grouting are completed', evidence: 'Tiling quality check' },
  { stage: 'Ceiling and lighting completed', percentage: 10, due_milestone: 'After ceiling and light fixtures are installed', evidence: 'Electrical and ceiling stage check' },
  { stage: 'Completion and handover', percentage: 10, due_milestone: 'When final testing, cleaning and handover are ready', evidence: 'Handover checklist' },
];

export const DEFAULT_WARRANTY_EXCLUSIONS = [
  'Misuse, accidental damage, normal wear or inadequate routine maintenance.',
  'Abnormal water pressure, water quality, post-handover blockages or building movement.',
  'Unauthorised third-party alterations and product defects outside LUXEhome workmanship.',
  'Work, products or conditions outside the accepted written proposal scope.',
];

export const DEFAULT_VARIATION_TERMS = 'Additional or changed work proceeds only after written client approval of the price and programme effect. The accepted proposal is never silently overwritten.';

export const DEFAULT_QUALITY: ProposalQualityItem[] = [
  { title: 'Service routes', description: 'Confirm supply, waste and electrical routes against the approved layout before closing walls.' },
  { title: 'Plumbing pressure test', description: 'Test concealed water lines before finishes and correct any loss of pressure.' },
  { title: 'Waterproofing application', description: 'Check preparation, fillets, reinforced junctions and specified coverage.' },
  { title: 'Flood test', description: 'Begin after the waterproofing milestone payment. Correct and retest any identified issue before tiling.' },
  { title: 'Tile installation', description: 'Check datum lines, falls, alignment, joints, edges, hollow areas and grout finish.' },
  { title: 'Final commissioning', description: 'Test drainage, taps, showers, WC, lights, ventilation, glass hardware and sealants.' },
];

export const DEFAULT_WARRANTIES: ProposalWarranty[] = [
  {
    item: 'LUXEhome workmanship',
    period: '24 months',
    basis: 'Eligible waterproofing, plumbing, electrical, tiling, ceiling and installation workmanship within the agreed written scope',
  },
  {
    item: 'Handover snag review',
    period: '30 days',
    basis: 'Completion items reported after documented handover; this review does not shorten the workmanship period',
  },
  {
    item: 'Products and fixtures',
    period: 'Manufacturer terms',
    basis: 'Selected-model warranty, exclusions and proof-of-purchase conditions apply separately',
  },
  {
    item: 'Supplier-backed systems',
    period: 'Project-specific',
    basis: 'Longer cover applies only when formally registered and issued in writing for this project',
  },
  {
    item: 'Client-supplied products',
    period: 'Installation only',
    basis: 'LUXEhome covers eligible installation workmanship, not defects in the supplied product',
  },
];

const LEGACY_DEFAULT_WARRANTY_ITEMS = [
  'Bathware',
  'Waterproofing workmanship',
  'Plumbing workmanship',
  'Electrical workmanship',
  'Taps and showers',
  'Ceiling workmanship',
  'Light fixtures',
  'Tempered glass',
];

/** Move unissued drafts off the former 15/10/5-year default without silently
 * rewriting an approved, sent or accepted proposal snapshot. */
export function applyCurrentWarrantyPolicy(
  warranties: ProposalWarranty[],
  status: ProposalStatus,
): ProposalWarranty[] {
  const isLegacyDefault = warranties.length === LEGACY_DEFAULT_WARRANTY_ITEMS.length
    && LEGACY_DEFAULT_WARRANTY_ITEMS.every((item) => warranties.some((warranty) => warranty.item === item));
  return status === 'draft' && isLegacyDefault
    ? structuredClone(DEFAULT_WARRANTIES)
    : warranties;
}

export interface ProposalPaymentSchedule {
  initiationCredit: number;
  commencementAllocation: number;
  commencementDue: number;
  waterproofing: number;
  tiling: number;
  fixtures: number;
  final: number;
  furtherPayments: number;
}

export function calculateProposalPayments(contractValue: number, initiationCredit: number): ProposalPaymentSchedule {
  const value = Math.max(0, Number(contractValue) || 0);
  const commencementAllocation = Math.round(value * 0.5);
  const credit = Math.min(commencementAllocation, Math.max(0, Number(initiationCredit) || 0));
  const waterproofing = Math.round(value * 0.2);
  const tiling = Math.round(value * 0.1);
  const fixtures = Math.round(value * 0.1);
  return {
    initiationCredit: credit,
    commencementAllocation,
    commencementDue: Math.max(0, commencementAllocation - credit),
    waterproofing,
    tiling,
    fixtures,
    final: Math.max(0, Math.round(value - commencementAllocation - waterproofing - tiling - fixtures)),
    furtherPayments: Math.max(0, value - credit),
  };
}

export interface CalculatedPaymentItem extends ProposalPaymentItem {
  gross_amount_lkr: number;
  credit_applied_lkr: number;
  amount_due_lkr: number;
}

export function calculatePaymentSchedule(
  contractValue: number,
  initiationCredit: number,
  schedule: ProposalPaymentItem[] = DEFAULT_PAYMENT_SCHEDULE,
): {
  rows: CalculatedPaymentItem[];
  percentageTotal: number;
  grossTotal: number;
  creditApplied: number;
  amountDueTotal: number;
} {
  const value = Math.max(0, Math.round(Number(contractValue) || 0));
  const cleaned = schedule.map((item) => ({
    ...item,
    percentage: Math.max(0, Number(item.percentage) || 0),
  }));
  const percentageTotal = cleaned.reduce((sum, item) => sum + item.percentage, 0);
  const grossAmounts = cleaned.map((item) => Math.round(value * item.percentage / 100));
  if (grossAmounts.length && Math.abs(percentageTotal - 100) < 0.0001) {
    grossAmounts[grossAmounts.length - 1] += value - grossAmounts.reduce((sum, amount) => sum + amount, 0);
  }
  const requestedCredit = Math.max(0, Math.round(Number(initiationCredit) || 0));
  const firstGross = grossAmounts[0] || 0;
  const creditApplied = Math.min(firstGross, requestedCredit);
  const rows = cleaned.map<CalculatedPaymentItem>((item, index) => {
    const gross = grossAmounts[index] || 0;
    const rowCredit = index === 0 ? creditApplied : 0;
    return {
      ...item,
      gross_amount_lkr: gross,
      credit_applied_lkr: rowCredit,
      amount_due_lkr: Math.max(0, gross - rowCredit),
    };
  });
  return {
    rows,
    percentageTotal,
    grossTotal: rows.reduce((sum, item) => sum + item.gross_amount_lkr, 0),
    creditApplied,
    amountDueTotal: rows.reduce((sum, item) => sum + item.amount_due_lkr, 0),
  };
}

export function calculateProposalInvestment(
  items: ProposalPriceItem[],
  discountLkr = 0,
  taxLkr = 0,
  adjustmentLkr = 0,
): {
  subtotal: number;
  discount: number;
  tax: number;
  adjustment: number;
  total: number;
} {
  const subtotal = items.reduce((sum, item) => sum + Math.max(0, Number(item.amount_lkr) || 0), 0);
  const discount = Math.max(0, Number(discountLkr) || 0);
  const tax = Math.max(0, Number(taxLkr) || 0);
  const adjustment = Number(adjustmentLkr) || 0;
  return {
    subtotal,
    discount,
    tax,
    adjustment,
    total: Math.max(0, Math.round(subtotal - discount + tax + adjustment)),
  };
}

export function formatLkr(value: number): string {
  return `LKR ${Math.round(Number(value) || 0).toLocaleString('en-LK')}`;
}

export function addCalendarDays(value: string, days: number): string {
  const date = value ? new Date(`${value}T00:00:00`) : new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}

export function createProposalDraft(): ProposalRecord {
  const issued = new Date().toISOString().slice(0, 10);
  return {
    proposal_template_version: 2,
    revision: 0,
    status: 'draft',
    source_inspection_id: null,
    design_id: null,
    client_name: '',
    client_phone: '',
    client_email: '',
    property_location: '',
    project_type: 'renovation',
    project_title: 'Bathroom renovation proposal',
    bathroom_name: 'Main bathroom',
    room_dimensions: '',
    room_sqm: null,
    client_brief: '',
    site_findings: '',
    design_vision: '',
    value_points: [...DEFAULT_VALUE_POINTS],
    design_name: '',
    design_collection: '',
    selected_image_urls: [],
    image_items: [],
    video_url: '',
    fixtures: [],
    scope_items: structuredClone(DEFAULT_SCOPE),
    exclusions: [...DEFAULT_EXCLUSIONS],
    assumptions: [],
    client_supplied_items: [],
    variation_terms: DEFAULT_VARIATION_TERMS,
    materials: structuredClone(DEFAULT_MATERIALS),
    timeline: structuredClone(DEFAULT_TIMELINE),
    estimated_duration: '3–4 weeks',
    proposed_start_date: null,
    proposed_handover_date: null,
    programme_extension_days: 14,
    quality_items: structuredClone(DEFAULT_QUALITY),
    warranties: structuredClone(DEFAULT_WARRANTIES),
    warranty_exclusions: [...DEFAULT_WARRANTY_EXCLUSIONS],
    warranty_claim_contact: 'WhatsApp 077 450 3744 · luxehome@gmail.com',
    price_items: structuredClone(DEFAULT_PRICE_ITEMS),
    discount_lkr: 0,
    tax_lkr: 0,
    adjustment_lkr: 0,
    payment_schedule: structuredClone(DEFAULT_PAYMENT_SCHEDULE),
    contract_value_lkr: 0,
    initiation_credit_lkr: 50_000,
    validity_days: 14,
    issued_at: issued,
    valid_until: addCalendarDays(issued, 14),
    commencement_days: 7,
    prepared_by: 'LUXEhome Project Team',
    internal_notes: '',
  };
}
