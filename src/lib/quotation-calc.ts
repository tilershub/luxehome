/* ============================================================
   LUXEHOME — Quotation Calculation Engine
   Edit RATES to update all prices globally.
   ============================================================ */

export type PackageType     = 'basic' | 'premium' | 'signature';
export type ProjectType     = 'renovation' | 'construction';
export type PlumbingType    = 'basic' | 'premium' | 'signature';
export type ShowerType      = 'none' | 'l-type' | 'p-type';
export type QuotationStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'converted';
export type InvoiceStatus   = 'draft' | 'sent' | 'partially-paid' | 'paid' | 'cancelled';

/* ── All editable rates (change prices here) ─────────────── */
export const RATES = {
  renovation:    { perSqFt: 250 },
  designPlanning: 30_000,
  wallNiche:     { each: 10_000 },
  floorConcrete: { perSqFt: 350 },
  dummyWall:     { perSqFt: 1_000 },
  tiling: {
    basic: 850, premium: 1_000, signature: 1_300,
  } as Record<PackageType, number>,
  plumbing: {
    basic: 45_000, premium: 60_000, signature: 80_000,
  } as Record<PlumbingType, number>,
  wiring:        { perPoint: 3_000 },
  waterproofing: { perSqFt: 230 },
  ceiling:       { perSqFt: { basic: 800, premium: 1_000, signature: 1_200 } as Record<PackageType, number>, flat: 20_000 },
  lightFixture: {
    basic: 3_000, premium: 3_500, signature: 4_000,
  } as Record<PackageType, number>,
  geyser: 60_000,
  vanity: {
    basic: 30_000, premium: 50_000, signature: 60_000,
  } as Record<PackageType, number>,
  mirror: {
    basic: 15_000, premium: 20_000, signature: 25_000,
  } as Record<PackageType, number>,
  bathware: {
    basic: 200_000, premium: 250_000, signature: 350_000,
  } as Record<PackageType, number>,
  door: {
    basic: 40_000, premium: 50_000, signature: 60_000,
  } as Record<PackageType, number>,
  window: {
    basic: 20_000, premium: 30_000, signature: 40_000,
  } as Record<PackageType, number>,
  shower: {
    lType: { perLinFt: 18_000 },
    pType: { perLinFt: 17_000 },
  },
  overhead:     100_000,   // internal only — hidden from customer PDFs
  profitMargin: 0.15,
  clientSupply: {
    tileRate:  500,     // per sq.ft — labour only when client supplies tiles
    bathware:  20_000,  // installation only when client supplies bathware
    mirror:    1_000,   // installation only when client supplies mirror
    geyser:    5_000,   // installation only when client supplies geyser unit
  },
};

/* ── Defaults ─────────────────────────────────────────────── */
export const DEFAULT_BRANDS = [
  'Slon Pipes & Fittings',
  'Rocell Tiles',
  'Swiss Bathware & Tapware',
  'Swisstek Adhesive',
  'Swisstek Grout',
  'Tokyo Super 2K Waterproofing',
  'ACL Cables',
];

export const DEFAULT_PAYMENT_TERMS: PaymentTerm[] = [
  { label: 'Initial Payment',     percentage: 50 },
  { label: 'After Waterproofing', percentage: 30 },
  { label: 'Final Payment',       percentage: 20 },
];

/* ── Data interfaces ──────────────────────────────────────── */
export interface PaymentTerm { label: string; percentage: number; }
export interface Payment     { date: string; amount: number; note: string; }

export interface QuotationInputs {
  clientName:        string;
  clientPhone:       string;
  projectLocation:   string;
  projectName:       string;
  quotationDate:     string;
  projectType:       ProjectType;
  package:           PackageType;
  plumbing:          PlumbingType;
  showerCubicle:     ShowerType;
  showerLength:      number;
  hasGeyser:         boolean;
  hasCeiling:        boolean;
  hasVanity:         boolean;
  hasDoor:           boolean;
  hasWindow:         boolean;
  clientSupplyTiles:    boolean;
  clientSupplyBathware: boolean;
  clientSupplyMirror:   boolean;
  clientSupplyGeyser:   boolean;
  profitMargin:      number;
  floorArea:         number;
  wallArea:          number;
  waterproofingArea: number;
  dummyWallArea:     number;
  wallNiches:        number;
  wiringPoints:      number;
  difficultyScore:   number;
  renovationRate:    number;
  brands:            string[];
  paymentTerms:      PaymentTerm[];
  finalPriceOverride: number | null;
}

export interface QuotationBreakdown {
  totalTilingArea:   number;
  ceilingArea:       number;
  renovationCost:    number;
  designPlanning:    number;
  wallNicheCost:     number;
  floorConcreteCost: number;
  dummyWallCost:     number;
  tilingCost:        number;
  plumbingCost:      number;
  wiringCost:        number;
  waterproofingCost: number;
  ceilingCost:       number;
  lightFixtureCost:  number;
  geyserCost:        number;
  vanityCost:        number;
  showerCost:        number;
  mirrorCost:        number;
  bathwareCost:      number;
  doorCost:          number;
  windowCost:        number;
  overhead:          number;
  projectCost:       number;
  difficultyAdjusted: number;
  profitAmount:      number;
  finalSellingPrice: number;
  finalAmount:       number;
}

export interface Quotation extends QuotationInputs {
  id:        string;
  createdAt: string;
  updatedAt: string;
  status:    QuotationStatus;
  breakdown: QuotationBreakdown;
}

export interface Invoice {
  id:              string;
  quotationId:     string;
  quotationRef:    string;
  createdAt:       string;
  updatedAt:       string;
  status:          InvoiceStatus;
  invoiceDate:     string;
  dueDate:         string;
  finalAmount:     number;
  paidAmount:      number;
  payments:        Payment[];
  clientName:      string;
  clientPhone:     string;
  projectLocation: string;
  projectName:     string;
  package:         PackageType;
  projectType:     ProjectType;
  paymentTerms:    PaymentTerm[];
}

/* ── Calculation ──────────────────────────────────────────── */
export function calculateQuotation(q: QuotationInputs): QuotationBreakdown {
  // Clamp difficultyScore — mobile range inputs may produce values outside min/max
  const difficultyScore = Math.max(0.8, Math.min(1.5, Number(q.difficultyScore) || 1.0));
  // Guard finalPriceOverride: treat 0 or negative same as null
  const finalPriceOverride = (q.finalPriceOverride != null && q.finalPriceOverride > 0) ? q.finalPriceOverride : null;

  const totalTilingArea  = q.floorArea + q.wallArea;
  const ceilingArea      = q.floorArea;
  const renovationRate   = Math.max(0, Number(q.renovationRate) || RATES.renovation.perSqFt);
  const renovationCost   = q.projectType === 'renovation' ? totalTilingArea * renovationRate : 0;
  const designPlanning   = RATES.designPlanning;
  const wallNicheCost    = q.wallNiches * RATES.wallNiche.each;
  const floorConcreteCost = q.floorArea * RATES.floorConcrete.perSqFt;
  const dummyWallCost    = q.dummyWallArea * RATES.dummyWall.perSqFt;
  const tilingCost       = q.clientSupplyTiles
    ? totalTilingArea * RATES.clientSupply.tileRate
    : totalTilingArea * RATES.tiling[q.package];
  const plumbingCost     = RATES.plumbing[q.plumbing];
  const wiringCost       = q.wiringPoints * RATES.wiring.perPoint;
  const waterproofingCost = q.waterproofingArea * RATES.waterproofing.perSqFt;
  const ceilingCost      = q.hasCeiling ? ceilingArea * RATES.ceiling.perSqFt[q.package] : RATES.ceiling.flat;
  const lightFixtureCost = q.wiringPoints * RATES.lightFixture[q.package];
  const geyserCost       = q.hasGeyser
    ? (q.clientSupplyGeyser ? RATES.clientSupply.geyser : RATES.geyser)
    : 0;
  const vanityCost       = q.hasVanity ? RATES.vanity[q.package] : RATES.vanity.basic;
  const showerCost       = q.showerCubicle === 'l-type'
    ? q.showerLength * RATES.shower.lType.perLinFt
    : q.showerCubicle === 'p-type'
    ? q.showerLength * RATES.shower.pType.perLinFt : 0;
  const mirrorCost    = q.clientSupplyMirror   ? RATES.clientSupply.mirror   : RATES.mirror[q.package];
  const bathwareCost  = q.clientSupplyBathware ? RATES.clientSupply.bathware : RATES.bathware[q.package];
  const doorCost      = q.hasDoor   ? RATES.door[q.package]   : 0;
  const windowCost    = q.hasWindow ? RATES.window[q.package] : 0;
  const overhead      = RATES.overhead;

  const projectCost = renovationCost + designPlanning + wallNicheCost + floorConcreteCost
    + dummyWallCost + tilingCost + plumbingCost + wiringCost + waterproofingCost
    + ceilingCost + lightFixtureCost + geyserCost + vanityCost + showerCost
    + mirrorCost + bathwareCost + doorCost + windowCost + overhead;

  const profitMargin       = Math.max(0, Math.min(0.5, Number(q.profitMargin) || 0.15));
  const difficultyAdjusted = projectCost * difficultyScore;
  const profitAmount       = difficultyAdjusted * profitMargin;
  const finalSellingPrice  = difficultyAdjusted + profitAmount;
  const finalAmount        = finalPriceOverride != null ? finalPriceOverride : finalSellingPrice;

  return {
    totalTilingArea, ceilingArea,
    renovationCost, designPlanning, wallNicheCost, floorConcreteCost,
    dummyWallCost, tilingCost, plumbingCost, wiringCost, waterproofingCost,
    ceilingCost, lightFixtureCost, geyserCost, vanityCost, showerCost,
    mirrorCost, bathwareCost, doorCost, windowCost, overhead,
    projectCost, difficultyAdjusted, profitAmount, finalSellingPrice, finalAmount,
  };
}

export function generateScopeOfWork(q: QuotationInputs): string[] {
  const scope: string[] = [];
  if (q.projectType === 'renovation') {
    scope.push('Demolition Works', 'Debris Removal & Site Cleaning');
  }
  scope.push(
    'Bathroom Design & Planning',
    'Floor Concrete Works',
    'Plumbing Works',
    'Electrical Wiring Works',
    'Waterproofing Before Tiling',
    `Tiling & Grouting${q.clientSupplyTiles ? ' (Client Supply)' : ''}`,
  );
  if (q.hasCeiling) scope.push('Ceiling Installation');
  scope.push(
    'Light & Plug Fixture Installation',
    'Exhaust Fan Installation',
  );
  if (q.hasVanity) scope.push('Vanity Cupboard & Countertop');
  if (q.showerCubicle !== 'none') scope.push('Shower Glass / Cubicle Installation');
  scope.push(
    `Bathware & Tapware Installation${q.clientSupplyBathware ? ' (Client Supply)' : ''}`,
    `Mirror Installation${q.clientSupplyMirror ? ' (Client Supply)' : ''}`,
  );
  if (q.hasDoor)           scope.push('Door Works');
  if (q.hasWindow)         scope.push('Window Works');
  if (q.hasGeyser) scope.push(`Geyser Installation${q.clientSupplyGeyser ? ' (Client Supply)' : ''}`);
  if (q.wallNiches > 0)    scope.push('Wall Niche Construction');
  if (q.dummyWallArea > 0) scope.push('Dummy Wall Construction');
  return scope;
}

/* ── Formatting & ID generators ──────────────────────────── */
export function fmtRs(n: number): string {
  return 'Rs. ' + Math.round(n).toLocaleString('en-IN');
}

export function fmtDate(iso: string): string {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }); }
  catch { return iso; }
}

export function fmtDateShort(iso: string): string {
  if (!iso) return '—';
  try { return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: '2-digit' }); }
  catch { return iso; }
}

export function qtnNumber(counter: number): string {
  return `LH-QTN-${new Date().getFullYear()}-${String(counter).padStart(4, '0')}`;
}

export function invNumber(counter: number): string {
  return `LH-INV-${new Date().getFullYear()}-${String(counter).padStart(4, '0')}`;
}

export function defaultInputs(): QuotationInputs {
  return {
    clientName: '', clientPhone: '', projectLocation: '', projectName: '',
    quotationDate: new Date().toISOString().split('T')[0],
    projectType: 'renovation', package: 'basic', plumbing: 'basic',
    showerCubicle: 'none', showerLength: 0,
    hasGeyser: false, hasCeiling: true, hasVanity: true, hasDoor: false, hasWindow: false,
    clientSupplyTiles: false, clientSupplyBathware: false, clientSupplyMirror: false, clientSupplyGeyser: false,
    profitMargin: 0.15,
    floorArea: 0, wallArea: 0, waterproofingArea: 0, dummyWallArea: 0,
    wallNiches: 0, wiringPoints: 0,
    difficultyScore: 1.00,
    renovationRate: RATES.renovation.perSqFt,
    brands: [...DEFAULT_BRANDS],
    paymentTerms: DEFAULT_PAYMENT_TERMS.map(t => ({ ...t })),
    finalPriceOverride: null,
  };
}

export function packageLabel(p: PackageType): string {
  return p === 'basic' ? 'Basic' : p === 'premium' ? 'Premium' : 'Signature';
}

export function statusColor(s: string): string {
  const map: Record<string, string> = {
    draft: '#888', sent: '#2563eb', accepted: '#16a34a', rejected: '#dc2626',
    converted: '#7c3aed', 'partially-paid': '#d97706', paid: '#16a34a', cancelled: '#888',
  };
  return map[s] ?? '#888';
}
