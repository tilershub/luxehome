import type { Collection } from './luxe';

export type BathroomCollection = 'flora' | 'island' | 'heritage' | 'gems';

export interface BathroomCollectionDefinition {
  key: BathroomCollection;
  label: string;
  shortLabel: string;
  level: number;
  note: string;
  copy: string;
  slugs: readonly string[];
}

export const BATHROOM_COLLECTIONS: readonly BathroomCollectionDefinition[] = [
  {
    key: 'flora',
    label: 'Flora Collection',
    shortLabel: 'Flora',
    level: 1,
    note: 'Essential luxury, naturally resolved.',
    copy: 'Soft, practical bathrooms shaped by familiar Sri Lankan flowers and calm everyday function.',
    slugs: ['araliya', 'kumudu', 'olu'],
  },
  {
    key: 'island',
    label: 'Island Collection',
    shortLabel: 'Island',
    level: 2,
    note: 'Refined comfort, inspired by place.',
    copy: 'Richer finishes and resort-like comfort inspired by memorable destinations across Sri Lanka.',
    slugs: ['bentota', 'ella-bathroom', 'mirissa'],
  },
  {
    key: 'heritage',
    label: 'Heritage Collection',
    shortLabel: 'Heritage',
    level: 3,
    note: 'Architectural luxury with a deeper story.',
    copy: 'Expressive bathrooms shaped by Sri Lankan architecture, bathing rituals and water engineering.',
    slugs: ['sigiriya-bathroom', 'yapahuwa', 'kuttam-pokuna'],
  },
  {
    key: 'gems',
    label: 'Ceylon Gems Collection',
    shortLabel: 'Ceylon Gems',
    level: 4,
    note: 'The most complete expression of private luxury.',
    copy: 'Flagship, highly resolved retreats inspired by the colour, light and rarity of Sri Lankan gems.',
    slugs: ['moonstone'],
  },
];

export const ALL_COLLECTION_KEYS: readonly Collection[] = [
  'flora',
  'island',
  'heritage',
  'gems',
  'standard',
  'premium',
  'signature',
];

export const LEGACY_BATHROOM_DESIGN_REDIRECTS = {
  nelum: 'bentota',
  sandun: 'ella-bathroom',
  orchid: 'mirissa',
  manel: 'sigiriya-bathroom',
  binara: 'yapahuwa',
  idda: 'kuttam-pokuna',
  pichcha: 'moonstone',
} as const;

const LEGACY_IDENTITY = {
  nelum: { slug: 'bentota', name: 'Bentota', collection: 'island' },
  sandun: { slug: 'ella-bathroom', name: 'Ella', collection: 'island' },
  orchid: { slug: 'mirissa', name: 'Mirissa', collection: 'island' },
  manel: { slug: 'sigiriya-bathroom', name: 'Sigiriya', collection: 'heritage' },
  binara: { slug: 'yapahuwa', name: 'Yapahuwa', collection: 'heritage' },
  idda: { slug: 'kuttam-pokuna', name: 'Kuttam Pokuna', collection: 'heritage' },
  pichcha: { slug: 'moonstone', name: 'Moonstone', collection: 'gems' },
} as const satisfies Record<
  keyof typeof LEGACY_BATHROOM_DESIGN_REDIRECTS,
  { slug: string; name: string; collection: BathroomCollection }
>;

export const LEGACY_SLUG_BY_CURRENT = Object.fromEntries(
  Object.entries(LEGACY_BATHROOM_DESIGN_REDIRECTS).map(([legacy, current]) => [current, legacy]),
) as Record<string, string>;

export function normalizeBathroomDesignIdentity<
  T extends { slug: string; name: string; collection: Collection | string },
>(design: T): T {
  const replacement = LEGACY_IDENTITY[design.slug as keyof typeof LEGACY_IDENTITY];
  if (!replacement) return design;
  return { ...design, ...replacement };
}

export function collectionShortLabel(collection: Collection | string): string {
  const bathroomCollection = BATHROOM_COLLECTIONS.find((item) => item.key === collection);
  if (bathroomCollection) return bathroomCollection.shortLabel;
  return collection.charAt(0).toUpperCase() + collection.slice(1);
}
