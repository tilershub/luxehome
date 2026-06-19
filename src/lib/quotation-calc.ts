/* ============================================================
   LUXEHOME — Quotation Calculation Engine
   Edit RATES to update all prices globally.
   ============================================================ */

export type ProjectType     = 'renovation' | 'construction';
export type ShowerType      = 'none' | 'l-swing' | 'l-sliding' | 'panel-swing' | 'panel-sliding' | 'panel';
export type VanityType      = 'none' | 'vanity-top' | 'vanity-cupboard';
export type QuotationStatus = 'draft' | 'sent' | 'accepted' | 'rejected' | 'converted';
export type InvoiceStatus   = 'draft' | 'sent' | 'partially-paid' | 'paid' | 'cancelled';

/* ── All editable rates (change prices here) ─────────────── */
export const RATES = {
  demolition:     { perSqFt: 200 },   // Demolition Works (renovation only)
  debrisRemoval:  { perSqFt: 200 },   // Debris Removal & Site Cleaning (renovation only)
  wallPlastering: { perSqFt: 125 },   // Wall Plastering
  designPlanning: 30_000,             // fallback when hasDesignPlanning but no manual cost
  wallNiche:     { each: 10_000 },
  floorConcrete: { perSqFt: 350 },    // fallback when hasFloorConcrete but no manual cost
  dummyWall:     { perSqFt: 1_000 },
  wiring:        { perPoint: 1_500 }, // service labour only per point
  waterproofing: { perSqFt: 230 },
  ceiling:       { perSqFt: 1_000, flat: 20_000 }, // perSqFt = fallback; flat = when No
  lightFixture:  { perPoint: 500 },   // service per point
  floorConcreteMinimal: 1_000,        // flat rate when hasFloorConcrete is false
  overhead:     100_000,              // internal only — hidden from customer PDFs
  profitMargin: 0.10,
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
  showerCubicle:     ShowerType;
  showerCubiclePrice: number;
  hasGeyser:         boolean;
  geyserCostManual:  number;          // manual cost when hasGeyser = true
  hasCeiling:        boolean;
  ceilingCostManual: number;          // manual cost when hasCeiling = true
  vanityType:        VanityType;
  hasDoor:           boolean;
  doorCostManual:    number;          // manual cost when hasDoor = true
  hasWindow:         boolean;
  windowCostManual:  number;          // manual cost when hasWindow = true
  hasBathware:       boolean;
  hasMirror:         boolean;
  hasFloorConcrete:  boolean;
  floorConcreteCostManual: number;    // manual cost when hasFloorConcrete = true
  hasDesignPlanning: boolean;
  designPlanningCost: number;         // manual cost when hasDesignPlanning = true
  hasPlumbing:       boolean;
  insidePlumbingMaterial:  number;
  insidePlumbingService:   number;
  outsidePlumbingMaterial: number;
  outsidePlumbingService:  number;
  insidePlumbingCost:   number;       // kept for backward compat (old quotes)
  outsidePlumbingCost:  number;       // kept for backward compat (old quotes)
  hasElectricalWiring: boolean;
  hasLightFixtures:  boolean;
  tileIncluded:      boolean;
  tileRate:          number;          // material cost per sqft (when tileIncluded)
  tilingRate:        number;          // labour cost per sqft (always)
  bathwareMaterialCost: number;
  bathwareInstallCost:  number;
  mirrorAmount:      number;
  vanityAmount:      number;
  wiringMaterialsEnabled: boolean;
  wiringMaterialsCost:    number;
  wiringServiceEnabled:   boolean;
  wiringServiceRate:      number;     // per point, default 1500
  lightMaterialsCost:     number;
  lightServiceRate:       number;     // per point, default 500
  demolitionArea:       number;
  plasteringArea:       number;
  otherCostLabel:       string;
  otherCost:            number;
  profitMargin:      number;
  floorArea:         number;
  wallArea:          number;
  waterproofingArea: number;
  dummyWallArea:     number;
  wallNiches:        number;
  wiringPoints:      number;
  difficultyScore:   number;
  brands:            string[];
  paymentTerms:      PaymentTerm[];
  finalPriceOverride: number | null;
}

export interface QuotationBreakdown {
  totalTilingArea:    number;
  ceilingArea:        number;
  demolitionCost:     number;
  debrisRemovalCost:  number;
  wallPlasteringCost: number;
  designPlanning:     number;
  wallNicheCost:      number;
  floorConcreteCost:  number;
  dummyWallCost:      number;
  tilingCost:         number;
  insidePlumbingCost: number;
  outsidePlumbingCost: number;
  plumbingCost:       number;
  wiringCost:         number;
  waterproofingCost:  number;
  ceilingCost:        number;
  lightFixtureCost:   number;
  geyserCost:         number;
  vanityCost:         number;
  showerCost:         number;
  mirrorCost:         number;
  bathwareCost:       number;
  doorCost:           number;
  windowCost:         number;
  otherCost:          number;
  overhead:           number;
  projectCost:        number;
  difficultyAdjusted: number;
  profitAmount:       number;
  finalSellingPrice:  number;
  finalAmount:        number;
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
  package?:        string;   // legacy field — kept for backward compat
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

  const demolitionCost      = q.projectType === 'renovation' ? (q.demolitionArea || 0) * RATES.demolition.perSqFt : 0;
  const debrisRemovalCost   = q.projectType === 'renovation' ? (q.demolitionArea || 0) * RATES.debrisRemoval.perSqFt : 0;
  const wallPlasteringCost  = (q.plasteringArea || 0) * RATES.wallPlastering.perSqFt;

  // Design & Planning: manual cost when Yes; fallback to RATES for old quotes; 0 when No
  const designPlanning = (q.hasDesignPlanning ?? true)
    ? (Number(q.designPlanningCost) > 0 ? Number(q.designPlanningCost) : RATES.designPlanning)
    : 0;

  const wallNicheCost = q.wallNiches * RATES.wallNiche.each;

  // Floor Concrete: manual cost when Yes; fallback to perSqFt for old quotes; minimal flat when No
  const floorConcreteCost = (q.hasFloorConcrete !== false)
    ? (Number(q.floorConcreteCostManual) > 0
        ? Number(q.floorConcreteCostManual)
        : q.floorArea * RATES.floorConcrete.perSqFt)
    : RATES.floorConcreteMinimal;

  const dummyWallCost = q.dummyWallArea * RATES.dummyWall.perSqFt;

  const tilingMaterialRate = (q.tileIncluded ?? true) ? (q.tileRate || 0) : 0;
  const tilingLaborRate    = q.tilingRate || 0;
  const tilingCost         = totalTilingArea * (tilingMaterialRate + tilingLaborRate);

  // Plumbing: 4 sub-fields (material + service for inside + outside); fallback to legacy fields
  const hasPlumbing = q.hasPlumbing ?? true;
  const insidePlumbingCost = hasPlumbing
    ? (((Number(q.insidePlumbingMaterial) || 0) + (Number(q.insidePlumbingService) || 0))
       || (Number(q.insidePlumbingCost) || 0))
    : 0;
  const outsidePlumbingCost = hasPlumbing
    ? (((Number(q.outsidePlumbingMaterial) || 0) + (Number(q.outsidePlumbingService) || 0))
       || (Number(q.outsidePlumbingCost) || 0))
    : 0;
  const plumbingCost = insidePlumbingCost + outsidePlumbingCost;

  const wiringCost = (q.hasElectricalWiring !== false)
    ? ((q.wiringMaterialsEnabled !== false ? (q.wiringMaterialsCost || 0) : 0)
       + (q.wiringServiceEnabled !== false ? q.wiringPoints * (q.wiringServiceRate || RATES.wiring.perPoint) : 0))
    : 0;

  const waterproofingCost = q.waterproofingArea * RATES.waterproofing.perSqFt;

  // Ceiling: manual cost when Yes; fallback to perSqFt for old quotes; flat when No
  const ceilingCost = q.hasCeiling
    ? (Number(q.ceilingCostManual) > 0
        ? Number(q.ceilingCostManual)
        : ceilingArea * RATES.ceiling.perSqFt)
    : RATES.ceiling.flat;

  const lightFixtureCost = (q.hasLightFixtures !== false)
    ? (q.lightMaterialsCost || 0) + q.wiringPoints * (q.lightServiceRate || RATES.lightFixture.perPoint)
    : 0;

  // Geyser: manual cost when Yes; 0 when No
  const geyserCost = q.hasGeyser ? Math.max(0, Number(q.geyserCostManual) || 0) : 0;

  const vanityType = q.vanityType ?? ((q as any).hasVanity ? 'vanity-cupboard' : 'none');
  const vanityCost = vanityType !== 'none' ? (q.vanityAmount || 0) : 0;
  const showerCost = q.showerCubicle !== 'none' ? Math.max(0, Number(q.showerCubiclePrice) || 0) : 0;
  const mirrorCost = (q.hasMirror ?? true) ? (q.mirrorAmount || 0) : 0;
  const bathwareCost = (q.hasBathware ?? true)
    ? ((q.bathwareMaterialCost || 0) + (q.bathwareInstallCost || 0))
    : 0;

  // Door & Window: manual cost when Yes; 0 when No
  const doorCost   = q.hasDoor   ? Math.max(0, Number(q.doorCostManual)   || 0) : 0;
  const windowCost = q.hasWindow ? Math.max(0, Number(q.windowCostManual) || 0) : 0;

  const otherCost = Math.max(0, Number(q.otherCost) || 0);
  const overhead  = RATES.overhead;

  const projectCost = demolitionCost + debrisRemovalCost + wallPlasteringCost
    + designPlanning + wallNicheCost + floorConcreteCost
    + dummyWallCost + tilingCost + plumbingCost + wiringCost + waterproofingCost
    + ceilingCost + lightFixtureCost + geyserCost + vanityCost + showerCost
    + mirrorCost + bathwareCost + doorCost + windowCost + otherCost + overhead;

  const profitMargin       = Math.max(0, Math.min(0.5, Number(q.profitMargin) || RATES.profitMargin));
  const difficultyAdjusted = projectCost * difficultyScore;
  const profitAmount       = difficultyAdjusted * profitMargin;
  const finalSellingPrice  = difficultyAdjusted + profitAmount;
  const finalAmount        = finalPriceOverride != null ? finalPriceOverride : finalSellingPrice;

  return {
    totalTilingArea, ceilingArea,
    demolitionCost, debrisRemovalCost, wallPlasteringCost,
    designPlanning, wallNicheCost, floorConcreteCost,
    dummyWallCost, tilingCost,
    insidePlumbingCost, outsidePlumbingCost, plumbingCost,
    wiringCost, waterproofingCost,
    ceilingCost, lightFixtureCost, geyserCost, vanityCost, showerCost,
    mirrorCost, bathwareCost, doorCost, windowCost, otherCost, overhead,
    projectCost, difficultyAdjusted, profitAmount, finalSellingPrice, finalAmount,
  };
}

const SHOWER_LABELS: Record<ShowerType, string> = {
  'none': '',
  'l-swing':      'L-Shape Swing Door Shower Cubicle',
  'l-sliding':    'L-Shape Sliding Door Shower Cubicle',
  'panel-swing':  'Panel Shape Swing Door Shower Cubicle',
  'panel-sliding':'Panel Shape Sliding Door Shower Cubicle',
  'panel':        'Panel Shower Cubicle',
};

export function generateScopeOfWork(q: QuotationInputs): string[] {
  const scope: string[] = [];
  if (q.projectType === 'renovation' && (q.demolitionArea || 0) > 0) {
    scope.push('Demolition Works', 'Debris Removal & Site Cleaning');
  }
  if ((q.plasteringArea || 0) > 0) scope.push('Wall Plastering');
  if (q.hasDesignPlanning ?? true) scope.push('Bathroom Design & Planning');
  scope.push(
    'Floor Concrete Works',
    'Electrical Wiring Works',
    'Waterproofing Before Tiling',
    `Tiling & Grouting${(q.tileIncluded ?? true) ? '' : ' (Labour Only)'}`,
  );
  if (q.hasCeiling) scope.push('Ceiling Installation');
  if (q.hasLightFixtures !== false) scope.push('Light & Plug Fixture Installation');
  else scope.push('Basic Light Provision');
  if (q.hasPlumbing ?? true) {
    scope.push('Inside Plumbing Works');
    const outsideTotal = ((Number(q.outsidePlumbingMaterial) || 0) + (Number(q.outsidePlumbingService) || 0))
      || (Number(q.outsidePlumbingCost) || 0);
    if (outsideTotal > 0) scope.push('Outside Plumbing Works');
  }
  const vanityTypeSow = q.vanityType ?? ((q as any).hasVanity ? 'vanity-cupboard' : 'none');
  if (vanityTypeSow === 'vanity-top')      scope.push('Vanity Top');
  if (vanityTypeSow === 'vanity-cupboard') scope.push('Vanity Cupboard & Countertop');
  if (q.showerCubicle !== 'none') scope.push(SHOWER_LABELS[q.showerCubicle] || 'Shower Cubicle / Glass Partition');
  if (q.hasBathware ?? true) scope.push('Bathware & Tapware Installation');
  if (q.hasMirror ?? true) scope.push('Mirror Installation');
  if (q.hasDoor)   scope.push('Door Works');
  if (q.hasWindow) scope.push('Window Works');
  if (q.hasGeyser) scope.push('Water Heater (Geyser) Installation');
  if (q.wallNiches > 0)    scope.push('Wall Niche Construction');
  if (q.dummyWallArea > 0) scope.push('Dummy Wall Construction');
  if ((q.otherCost || 0) > 0 && q.otherCostLabel) scope.push(q.otherCostLabel);
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
    projectType: 'renovation',
    showerCubicle: 'none', showerCubiclePrice: 0,
    hasGeyser: false, geyserCostManual: 0,
    hasCeiling: true, ceilingCostManual: 0,
    vanityType: 'none', vanityAmount: 0,
    hasDoor: false, doorCostManual: 0,
    hasWindow: false, windowCostManual: 0,
    hasBathware: true, hasMirror: true,
    hasFloorConcrete: true, floorConcreteCostManual: 0,
    hasDesignPlanning: true, designPlanningCost: 0,
    hasPlumbing: true,
    insidePlumbingMaterial: 0, insidePlumbingService: 0,
    outsidePlumbingMaterial: 0, outsidePlumbingService: 0,
    insidePlumbingCost: 0, outsidePlumbingCost: 0,
    hasElectricalWiring: true, hasLightFixtures: true,
    tileIncluded: true, tileRate: 0, tilingRate: 850,
    bathwareMaterialCost: 0, bathwareInstallCost: 0,
    mirrorAmount: 0,
    wiringMaterialsEnabled: true, wiringMaterialsCost: 0,
    wiringServiceEnabled: true, wiringServiceRate: 1500,
    lightMaterialsCost: 0, lightServiceRate: 500,
    demolitionArea: 0, plasteringArea: 0,
    otherCostLabel: '', otherCost: 0,
    profitMargin: 0.10,
    floorArea: 0, wallArea: 0, waterproofingArea: 0, dummyWallArea: 0,
    wallNiches: 0, wiringPoints: 0,
    difficultyScore: 1.00,
    brands: [...DEFAULT_BRANDS],
    paymentTerms: DEFAULT_PAYMENT_TERMS.map(t => ({ ...t })),
    finalPriceOverride: null,
  };
}

export function statusColor(s: string): string {
  const map: Record<string, string> = {
    draft: '#888', sent: '#2563eb', accepted: '#16a34a', rejected: '#dc2626',
    converted: '#7c3aed', 'partially-paid': '#d97706', paid: '#16a34a', cancelled: '#888',
  };
  return map[s] ?? '#888';
}
