export type ProposalStatus = 'draft' | 'approved' | 'sent' | 'accepted' | 'declined' | 'expired';

export interface ProposalScopeItem {
  title: string;
  description: string;
}

export interface ProposalMaterial {
  system: string;
  brand: string;
  specification: string;
  image_url?: string;
  logo_urls?: string[];
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
  bathroom_name: string;
  room_dimensions: string;
  room_sqm?: number | null;
  client_brief: string;
  site_findings: string;
  design_name: string;
  design_collection: string;
  selected_image_urls: string[];
  video_url: string;
  scope_items: ProposalScopeItem[];
  exclusions: string[];
  materials: ProposalMaterial[];
  timeline: ProposalTimelineItem[];
  quality_items: ProposalQualityItem[];
  warranties: ProposalWarranty[];
  contract_value_lkr: number;
  initiation_credit_lkr: number;
  validity_days: number;
  issued_at: string;
  valid_until: string;
  commencement_days: number;
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
  },
  {
    title: 'Civil and service work',
    description: 'Required masonry, plaster repairs, floor build-up, concealed plumbing, drainage adjustments and electrical rough-in within the agreed bathroom scope.',
  },
  {
    title: 'Waterproofing and testing',
    description: 'Surface preparation, fillets, reinforced junctions, specified waterproofing coats and flood testing before tiling.',
  },
  {
    title: 'Tiling and ceiling',
    description: 'Tile setting, cutting, alignment, adhesive, grouting, ceiling construction and preparation of light and exhaust points.',
  },
  {
    title: 'Fixtures and joinery',
    description: 'Bathware, tapware, vanity, mirror, accessories, lighting and agreed electrical fixtures installed to the approved layout.',
  },
  {
    title: 'Glass, commissioning and clean',
    description: 'Shower cubicle installation, operational testing, snag corrections, final clean, client walkthrough and handover record.',
  },
];

export const DEFAULT_EXCLUSIONS = [
  'Work outside the agreed bathroom area.',
  'Utility authority charges and upgrades outside the written scope.',
  'Concealed defects that could not reasonably be identified during the site visit.',
  'Major structural alterations or client-requested additions unless expressly listed.',
];

export const DEFAULT_MATERIALS: ProposalMaterial[] = [
  { system: 'Waterproofing', brand: 'Tokyo Super 2K', specification: 'Reinforced wet-area system with flood testing' },
  { system: 'Water supply', brand: 'S-lon', specification: 'Approved pressure-rated pipes and fittings' },
  { system: 'Tile fixing', brand: 'Swisstek', specification: 'Adhesive and grout selected for substrate and tile' },
  { system: 'Electrical wiring', brand: 'ACL', specification: 'Bathroom points, switching and protected circuits' },
  { system: 'Bathware', brand: 'Swiss Bathware', specification: 'WC, basin and selected sanitary fixtures' },
  { system: 'Tapware', brand: 'Swiss / approved', specification: 'Basin, shower and matching control fittings' },
  { system: 'Tiles', brand: 'Rocell / Mega / approved', specification: 'Final model, size and finish listed after selection' },
  { system: 'Glass and mirror', brand: 'Tempered glass / 5 mm mirror', specification: 'Measured after finished tile surfaces' },
].map(withProposalBrandLogos);

export const DEFAULT_TIMELINE: ProposalTimelineItem[] = [
  { week: 'Week 1', title: 'Mobilisation and preparation', description: 'Protection, procurement, demolition and debris removal.' },
  { week: 'Weeks 1-2', title: 'Civil, plumbing and electrical', description: 'Masonry, floor preparation, concealed services and pressure testing.' },
  { week: 'Week 2', title: 'Waterproofing and flood test', description: 'Waterproofing is completed; the 20% milestone is paid before flood testing begins.' },
  { week: 'Weeks 3-4', title: 'Tiling and grouting', description: 'Approved tile layout, installation, alignment, curing and grout completion.' },
  { week: 'Week 5', title: 'Ceiling and fixtures', description: 'Ceiling, lights, bathware, tapware, vanity, mirror and accessories.' },
  { week: 'Week 6', title: 'Glass, final checks and handover', description: 'Shower cubicle, functional testing, snag corrections, cleaning and walkthrough.' },
];

export const DEFAULT_QUALITY: ProposalQualityItem[] = [
  { title: 'Service routes', description: 'Confirm supply, waste and electrical routes against the approved layout before closing walls.' },
  { title: 'Plumbing pressure test', description: 'Test concealed water lines before finishes and correct any loss of pressure.' },
  { title: 'Waterproofing application', description: 'Check preparation, fillets, reinforced junctions and specified coverage.' },
  { title: 'Flood test', description: 'Begin after the waterproofing milestone payment. Correct and retest any identified issue before tiling.' },
  { title: 'Tile installation', description: 'Check datum lines, falls, alignment, joints, edges, hollow areas and grout finish.' },
  { title: 'Final commissioning', description: 'Test drainage, taps, showers, WC, lights, ventilation, glass hardware and sealants.' },
];

export const DEFAULT_WARRANTIES: ProposalWarranty[] = [
  { item: 'Bathware', period: 'Up to 15 years', basis: 'Manufacturer and supplied-model conditions' },
  { item: 'Waterproofing workmanship', period: '10 years', basis: 'Within the agreed wet-area construction scope' },
  { item: 'Plumbing workmanship', period: '10 years', basis: 'Internal bathroom supply and waste scope' },
  { item: 'Electrical workmanship', period: '10 years', basis: 'Bathroom wiring completed by LUXEhome' },
  { item: 'Taps and showers', period: 'Up to 5 years', basis: 'Manufacturer and product conditions' },
  { item: 'Ceiling workmanship', period: '5 years', basis: 'Installed ceiling system and agreed scope' },
  { item: 'Light fixtures', period: 'Up to 1 year', basis: 'Manufacturer and supplied-model conditions' },
  { item: 'Tempered glass', period: 'Up to 1 year', basis: 'Hardware and installation conditions apply' },
];

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
    revision: 0,
    status: 'draft',
    source_inspection_id: null,
    design_id: null,
    client_name: '',
    client_phone: '',
    client_email: '',
    property_location: '',
    project_type: 'renovation',
    bathroom_name: 'Main bathroom',
    room_dimensions: '',
    room_sqm: null,
    client_brief: '',
    site_findings: '',
    design_name: '',
    design_collection: '',
    selected_image_urls: [],
    video_url: '',
    scope_items: structuredClone(DEFAULT_SCOPE),
    exclusions: [...DEFAULT_EXCLUSIONS],
    materials: structuredClone(DEFAULT_MATERIALS),
    timeline: structuredClone(DEFAULT_TIMELINE),
    quality_items: structuredClone(DEFAULT_QUALITY),
    warranties: structuredClone(DEFAULT_WARRANTIES),
    contract_value_lkr: 0,
    initiation_credit_lkr: 50_000,
    validity_days: 30,
    issued_at: issued,
    valid_until: addCalendarDays(issued, 30),
    commencement_days: 7,
    internal_notes: '',
  };
}
