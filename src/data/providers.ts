export type ProviderType = 'brand' | 'professional' | 'contractor' | 'shop';

export type ProviderCategory =
  | 'waterproofing'
  | 'tiles'
  | 'adhesives-grout'
  | 'plumbing'
  | 'ceiling'
  | 'fixtures'
  | 'geysers'
  | 'electrical'
  | 'kitchen';

export interface Product {
  name: string;
  description?: string;
}

export interface Provider {
  slug: string;
  name: string;
  type: ProviderType;
  category: ProviderCategory;
  categoryLabel: string;
  origin?: string;
  tagline: string;
  description: string;
  logo?: string;
  website?: string;
  phone?: string;
  email?: string;
  address?: string;
  products: Product[];
  usedIn: string[];
  featured?: boolean;
}

export const CATEGORY_LABELS: Record<ProviderCategory, string> = {
  'waterproofing':    'Waterproofing',
  'tiles':            'Tiles',
  'adhesives-grout':  'Adhesives & Grout',
  'plumbing':         'Plumbing',
  'ceiling':          'Ceiling Systems',
  'fixtures':         'Bathroom Fixtures',
  'geysers':          'Water Heaters',
  'electrical':       'Electrical',
  'kitchen':          'Kitchen Hardware',
};

export const TYPE_LABELS: Record<ProviderType, string> = {
  'brand':        'Brand',
  'professional': 'Professional',
  'contractor':   'Contractor',
  'shop':         'Shop',
};

export const providers: Provider[] = [

  /* ── Waterproofing ─────────────────────────────────────── */

  {
    slug: 'laticrete',
    name: 'Laticrete',
    type: 'brand',
    category: 'waterproofing',
    categoryLabel: 'Waterproofing',
    origin: 'USA',
    tagline: 'The world standard in tile & stone installation systems.',
    description: 'Laticrete is the global leader in tile installation systems and waterproofing membranes, trusted by contractors in over 100 countries. LUXEHOME specifies Laticrete waterproofing in every bathroom package because of its 10-year system warranty, superior bonding strength, and proven performance in Sri Lanka\'s high-humidity conditions.',
    website: 'https://laticrete.com',
    products: [
      { name: 'HydroBan',         description: 'Waterproofing and anti-fracture membrane' },
      { name: '9235 Membrane',    description: 'Two-component waterproofing membrane for wet areas' },
      { name: '254 Platinum',     description: 'Multi-purpose large-format tile adhesive' },
      { name: 'SpectraLock Pro',  description: 'Stain-proof epoxy grout — 40+ colour options' },
    ],
    usedIn: ['Essential Bath', 'Comfort Bath', 'Signature Bath', 'Floor Tiling', 'Bathroom Waterproofing'],
    featured: true,
  },

  {
    slug: 'tokyo-cement',
    name: 'Tokyo Cement',
    type: 'brand',
    category: 'waterproofing',
    categoryLabel: 'Waterproofing',
    origin: 'Sri Lanka',
    tagline: 'Sri Lanka\'s most trusted cement and construction materials brand.',
    description: 'Tokyo Cement is one of Sri Lanka\'s largest cement manufacturers, producing high-performance tile adhesives, waterproofing membranes, and construction materials used across residential and commercial projects island-wide. Their Tokyo Super range is a go-to for reliable, locally supported tile installation.',
    products: [
      { name: 'Tokyo Super HP',              description: 'High-performance tile adhesive for heavy tiles' },
      { name: 'Tokyo Super 2K',              description: '2-component flexible waterproofing membrane' },
      { name: 'Tokyo Super Tile Adhesive',   description: 'Standard adhesive for floors and walls' },
    ],
    usedIn: ['Floor Tiling', 'Bathroom Tiling', 'Staircase Tiling', 'Bathroom Waterproofing'],
    featured: false,
  },

  /* ── Adhesives & Grout ─────────────────────────────────── */

  {
    slug: 'swisstek',
    name: 'Swisstek',
    type: 'brand',
    category: 'adhesives-grout',
    categoryLabel: 'Adhesives & Grout',
    tagline: 'Swiss-quality tile adhesives and grout systems.',
    description: 'Swisstek provides professional-grade tile adhesives and grout systems trusted by contractors across Sri Lanka. LUXEHOME includes Swisstek adhesive and grout as standard in all floor tiling and bathroom tiling packages for their consistent quality and wide colour range.',
    products: [
      { name: 'Swisstek Tile Adhesive', description: 'Professional adhesive for floors and walls' },
      { name: 'Swisstek Grout',         description: 'Standard cement grout — multiple colour options' },
    ],
    usedIn: ['Essential Bath', 'Comfort Bath', 'Floor Tiling', 'Bathroom Tiling'],
    featured: true,
  },

  {
    slug: 'kerakoll',
    name: 'Kerakoll',
    type: 'brand',
    category: 'adhesives-grout',
    categoryLabel: 'Adhesives & Grout',
    origin: 'Italy',
    tagline: 'Italian precision in designer grouts and eco-friendly installation systems.',
    description: 'Kerakoll is an Italian manufacturer known for premium designer grouts and environmentally responsible tile installation systems. Their Fugabella epoxy grout, available in 30+ colours, is used in LUXEHOME\'s Signature Bath packages for its unmatched stain resistance and colour permanence.',
    website: 'https://kerakoll.com',
    products: [
      { name: 'Fugabella',  description: 'Designer epoxy grout — 30+ colours, stain-proof, suitable for large joints' },
      { name: 'Kerakoll H40', description: 'High-performance adhesive for large format tiles' },
    ],
    usedIn: ['Signature Bath'],
    featured: false,
  },

  /* ── Tiles ─────────────────────────────────────────────── */

  {
    slug: 'rocell',
    name: 'Rocell',
    type: 'brand',
    category: 'tiles',
    categoryLabel: 'Tiles',
    origin: 'Sri Lanka',
    tagline: 'Sri Lanka\'s most trusted tile manufacturer.',
    description: 'Rocell is Sri Lanka\'s premier tile manufacturer, producing a comprehensive range of wall and floor tiles from standard to large format. LUXEHOME recommends and supplies Rocell tiles for floor tiling and bathroom finishes, backed by island-wide availability and consistent quality.',
    products: [
      { name: 'Floor Tiles',        description: 'Matte and polished finishes up to 4×2 ft' },
      { name: 'Wall Tiles',         description: 'Bathroom wall tiles in multiple sizes and textures' },
      { name: 'Large Format Tiles', description: '800×1600mm and above for contemporary interiors' },
    ],
    usedIn: ['Floor Tiling', 'Bathroom Tiling', 'Essential Bath', 'Comfort Bath'],
    featured: true,
  },

  {
    slug: 'mega-tiles',
    name: 'Mega Tiles',
    type: 'brand',
    category: 'tiles',
    categoryLabel: 'Tiles',
    origin: 'Sri Lanka',
    tagline: 'Large format tiles for modern Sri Lankan interiors.',
    description: 'Mega Tiles offers a wide selection of large format tiles ideal for contemporary flooring and wall applications. Available through LUXEHOME\'s floor tiling service as an alternative to Rocell, with sizes up to 4×2 ft.',
    products: [
      { name: 'Large Format Tiles', description: 'Up to 4×2 ft for floors and feature walls' },
      { name: 'Porcelain Tiles',    description: 'High-density porcelain for wet and dry areas' },
    ],
    usedIn: ['Floor Tiling', 'Bathroom Tiling'],
    featured: false,
  },

  /* ── Plumbing ───────────────────────────────────────────── */

  {
    slug: 'slon',
    name: 'Slon Pipes & Fittings',
    type: 'brand',
    category: 'plumbing',
    categoryLabel: 'Plumbing',
    origin: 'Sri Lanka',
    tagline: 'Sri Lanka\'s trusted UPVC and CPVC pipe systems.',
    description: 'Slon is a leading manufacturer of UPVC and CPVC pipes and fittings in Sri Lanka. LUXEHOME uses Slon pipes for all hot and cold water plumbing installations — UPVC for waste and cold supply, CPVC for hot water lines that require heat resistance.',
    products: [
      { name: 'Slon UPVC Pipes',   description: 'Cold water supply lines and waste drainage' },
      { name: 'Slon CPVC Pipes',   description: 'Hot water supply — heat resistant to 93°C' },
      { name: 'Slon Fittings',     description: 'Elbows, tees, reducers and push-fit connectors' },
    ],
    usedIn: ['Essential Bath', 'Comfort Bath', 'Signature Bath', 'Bathroom Plumbing'],
    featured: false,
  },

  /* ── Ceiling Systems ────────────────────────────────────── */

  {
    slug: 'ipanel',
    name: 'iPanel',
    type: 'brand',
    category: 'ceiling',
    categoryLabel: 'Ceiling Systems',
    tagline: 'Moisture-resistant PVC ceiling systems for wet areas.',
    description: 'iPanel manufactures premium PVC ceiling boards and aluminium framing systems engineered for bathrooms and high-humidity spaces. Their concealed fixing system delivers a seamless finish with no exposed screws or joints. Included as standard in LUXEHOME\'s Comfort Bath and Signature Bath packages.',
    products: [
      { name: 'iPanel PVC Boards',       description: 'Moisture-proof panels with tongue-and-groove fit' },
      { name: 'iPanel Aluminium Frame',  description: 'Concealed sub-frame for flush ceiling installation' },
    ],
    usedIn: ['Comfort Bath', 'Signature Bath', 'Bathroom Ceiling'],
    featured: false,
  },

  {
    slug: 'armstrong',
    name: 'Armstrong',
    type: 'brand',
    category: 'ceiling',
    categoryLabel: 'Ceiling Systems',
    origin: 'USA',
    tagline: 'Premium ceiling solutions trusted worldwide.',
    description: 'Armstrong is a global leader in ceiling systems with over 160 years of expertise. LUXEHOME uses Armstrong coffered PVC ceiling systems in Signature Bath packages, delivering the hotel-grade finish that defines luxury bathroom renovations.',
    website: 'https://armstrongceilings.com',
    products: [
      { name: 'Armstrong Mineral Fibre', description: 'Sound-absorbing suspended ceiling tiles' },
      { name: 'Armstrong PVC Coffered',  description: 'Premium coffered ceiling — Signature Bath exclusive' },
    ],
    usedIn: ['Signature Bath'],
    featured: false,
  },

  /* ── Bathroom Fixtures ──────────────────────────────────── */

  {
    slug: 'roca',
    name: 'Roca',
    type: 'brand',
    category: 'fixtures',
    categoryLabel: 'Bathroom Fixtures',
    origin: 'Spain',
    tagline: 'European design in every bathroom fixture.',
    description: 'Roca is a globally recognised Spanish manufacturer of premium bathroom fixtures, present in over 170 countries. LUXEHOME includes Roca wall-hung WCs, countertop basins, and mixer taps in Comfort and Signature Bath packages, available in standard white, Brushed Gold, and Gun Grey finishes.',
    website: 'https://roca.com',
    products: [
      { name: 'Wall-Hung WC',       description: 'Space-saving wall-mounted toilet with concealed cistern' },
      { name: 'Countertop Basin',   description: 'Countertop wash basin for vanity installation' },
      { name: 'Mixer Taps',         description: 'Single-lever mixer in standard, Brushed Gold and Gun Grey' },
    ],
    usedIn: ['Comfort Bath', 'Signature Bath'],
    featured: true,
  },

  {
    slug: 'american-standard',
    name: 'American Standard',
    type: 'brand',
    category: 'fixtures',
    categoryLabel: 'Bathroom Fixtures',
    origin: 'USA',
    tagline: 'Trusted bathroom solutions with a century of heritage.',
    description: 'American Standard is one of the world\'s most recognised bathroom fixture brands with a long heritage of quality. Available as an alternative fixture option in LUXEHOME\'s Essential Bath package for clients who prefer American Standard\'s product range.',
    website: 'https://americanstandard.com',
    products: [
      { name: 'Wall-Hung WC',     description: 'Wall-mounted toilet suite' },
      { name: 'Countertop Basin', description: 'Wash basin for vanity installation' },
      { name: 'Mixer Taps',       description: 'Standard finish single-lever mixer' },
    ],
    usedIn: ['Essential Bath'],
    featured: false,
  },

  {
    slug: 'grohe',
    name: 'Grohe',
    type: 'brand',
    category: 'fixtures',
    categoryLabel: 'Bathroom Fixtures',
    origin: 'Germany',
    tagline: 'German precision engineering for the ultimate bathroom experience.',
    description: 'Grohe is a premium German manufacturer renowned for technically superior bathroom fittings, thermostatic shower systems, and concealed installation technology. LUXEHOME features Grohe in Signature Bath packages for their concealed mixers, thermostatic valves, and in-wall cistern frames.',
    website: 'https://grohe.com',
    products: [
      { name: 'Grohe Concealed Mixer',       description: 'Thermostatic concealed shower mixer valve' },
      { name: 'Grohe Cistern Frame',         description: 'In-wall cistern and carrier frame for wall-hung WC' },
      { name: 'Grohe Basin Mixer',           description: 'Premium single-lever basin tap' },
    ],
    usedIn: ['Signature Bath'],
    featured: true,
  },

  {
    slug: 'kohler',
    name: 'Kohler',
    type: 'brand',
    category: 'fixtures',
    categoryLabel: 'Bathroom Fixtures',
    origin: 'USA',
    tagline: 'Bold design. Gracious living.',
    description: 'Kohler is a globally recognised American manufacturer of premium bathroom products with a design philosophy centred on both function and beauty. Available as a premium alternative to Grohe in LUXEHOME\'s Signature Bath packages.',
    website: 'https://kohler.com',
    products: [
      { name: 'Kohler Wall-Hung WC',   description: 'Premium wall-mounted toilet' },
      { name: 'Kohler Cistern Frame',  description: 'In-wall cistern and frame' },
      { name: 'Kohler Basin Mixer',    description: 'Designer single-lever basin tap' },
    ],
    usedIn: ['Signature Bath'],
    featured: false,
  },

  {
    slug: 'swiss-bathware',
    name: 'Swiss Bathware & Tapware',
    type: 'shop',
    category: 'fixtures',
    categoryLabel: 'Bathroom Fixtures',
    tagline: 'Premium bathware and tapware collections for luxury renovations.',
    description: 'Swiss Bathware & Tapware is a specialist supplier of premium coordinated bathroom collections. LUXEHOME sources luxury bathware sets and high-end tapware through Swiss Bathware for clients upgrading to premium finishes in Comfort and Signature Bath packages.',
    products: [
      { name: 'Bathware Collections',  description: 'Coordinated bathroom hardware sets in multiple finishes' },
      { name: 'Tapware Range',         description: 'Premium mixer taps and shower sets' },
    ],
    usedIn: ['Comfort Bath', 'Signature Bath'],
    featured: false,
  },

  /* ── Water Heaters ──────────────────────────────────────── */

  {
    slug: 'heatline',
    name: 'Heatline',
    type: 'brand',
    category: 'geysers',
    categoryLabel: 'Water Heaters',
    tagline: 'Reliable electric water heating for Sri Lankan homes.',
    description: 'Heatline manufactures electric storage water heaters (geysers) widely used in Sri Lankan residential projects. The Heatline 10L geyser is the standard water heater included in LUXEHOME\'s Essential Bath package.',
    products: [
      { name: 'Heatline 10L Geyser', description: 'Electric storage water heater — Essential Bath standard' },
    ],
    usedIn: ['Essential Bath'],
    featured: false,
  },

  {
    slug: 'panasonic',
    name: 'Panasonic',
    type: 'brand',
    category: 'geysers',
    categoryLabel: 'Water Heaters',
    origin: 'Japan',
    tagline: 'Japanese reliability in home appliances.',
    description: 'Panasonic is a globally trusted Japanese electronics and appliances manufacturer with a 100-year heritage of quality. LUXEHOME includes the Panasonic 15L electric water heater in Comfort Bath packages for its energy efficiency, safety features, and long service life.',
    website: 'https://panasonic.net',
    products: [
      { name: 'Panasonic 15L Water Heater', description: 'Electric storage geyser — Comfort Bath standard' },
    ],
    usedIn: ['Comfort Bath'],
    featured: false,
  },

  {
    slug: 'ferroli',
    name: 'Ferroli',
    type: 'brand',
    category: 'geysers',
    categoryLabel: 'Water Heaters',
    origin: 'Italy',
    tagline: 'Italian heating technology for the modern bathroom.',
    description: 'Ferroli is an Italian manufacturer of heating products with a strong presence across Asia and Europe. LUXEHOME offers Ferroli geysers in 15L and 25L storage configurations, as well as their tankless instant water heater, as upgrade options in Comfort and Signature Bath packages.',
    website: 'https://ferroli.com',
    products: [
      { name: 'Ferroli 15L Geyser',         description: 'Electric storage water heater' },
      { name: 'Ferroli 25L Geyser',          description: 'Larger-capacity storage geyser for busy households' },
      { name: 'Ferroli Instant Heater',      description: 'Tankless on-demand water heater — no waiting' },
    ],
    usedIn: ['Comfort Bath', 'Signature Bath'],
    featured: false,
  },

  /* ── Electrical ─────────────────────────────────────────── */

  {
    slug: 'acl-cables',
    name: 'ACL Cables',
    type: 'brand',
    category: 'electrical',
    categoryLabel: 'Electrical',
    origin: 'Sri Lanka',
    tagline: 'Sri Lanka\'s leading electrical cable manufacturer since 1962.',
    description: 'ACL Cables (Associated Cables Lanka) is Sri Lanka\'s largest manufacturer of electrical cables and wiring accessories, trusted in residential and industrial projects alike. LUXEHOME uses ACL Cables for all bathroom electrical installations — geyser circuits, lighting circuits, and switched power points — for their compliance with Sri Lankan electrical standards.',
    products: [
      { name: 'ACL House Wiring Cable',   description: 'Standard residential electrical wiring' },
      { name: 'ACL Geyser Circuit Cable', description: 'Heavy-duty cable for geyser and high-load circuits' },
      { name: 'ACL Accessories',          description: 'Switches, sockets, and wiring accessories' },
    ],
    usedIn: ['Essential Bath', 'Comfort Bath', 'Signature Bath', 'Bathroom Electrical'],
    featured: false,
  },

  /* ── Kitchen Hardware ───────────────────────────────────── */

  {
    slug: 'mcoco',
    name: 'Mcoco',
    type: 'brand',
    category: 'kitchen',
    categoryLabel: 'Kitchen Hardware',
    tagline: 'Precision hardware for built-in kitchens and cupboards.',
    description: 'Mcoco manufactures precision kitchen and cabinet hardware including soft-close hinges, full-extension drawer channels, and cabinet organiser systems. LUXEHOME uses Mcoco hardware in kitchen pantry cupboard installations for their smooth operation and long-term reliability.',
    products: [
      { name: 'Soft-Close Hinges',    description: 'Cabinet door hinges with integrated damper — no slamming' },
      { name: 'Drawer Channels',      description: 'Full-extension soft-close drawer slides' },
      { name: 'Cabinet Accessories',  description: 'Handles, pull-outs, and organiser inserts' },
    ],
    usedIn: ['Kitchen Pantry Cupboard'],
    featured: false,
  },

];
