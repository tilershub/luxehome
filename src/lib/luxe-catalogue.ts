import type { Collection } from './luxe';

export interface CataloguePriceTier {
  label: 'Minimum fit' | 'Recommended fit' | 'Spacious fit';
  sqm: number;
  newPrice: number;
  renovationPrice: number;
}

export interface CatalogueDesign {
  slug: string;
  name: string;
  space: 'bathrooms' | 'kitchens' | 'staircases' | 'floors';
  collection: Collection;
  tagline: string;
  startingPrice: number | null;
  renovationStartingPrice?: number | null;
  minSqm: number | null;
  coverImage?: string;
  pricingTiers?: CataloguePriceTier[];
}

const design = (
  space: CatalogueDesign['space'], collection: Collection, name: string,
  tagline: string, startingPrice: number | null = null, minSqm: number | null = null,
  renovationStartingPrice: number | null = null,
  coverImage: string | undefined = undefined,
  pricingTiers: CataloguePriceTier[] | undefined = undefined,
  slugOverride: string | undefined = undefined,
): CatalogueDesign => ({
  space, collection, name, tagline, startingPrice, minSqm, renovationStartingPrice, coverImage, pricingTiers,
  slug: slugOverride ?? name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
});

export const CATALOGUE_DESIGNS: CatalogueDesign[] = [
  design('bathrooms', 'flora', 'Araliya', 'A bright, beautifully practical beginning.', 1_000_000, null, 1_000_000),
  design('bathrooms', 'flora', 'Olu', 'Soft tones and effortless everyday function.', 1_150_000, null, 1_150_000),
  design('bathrooms', 'flora', 'Kumudu', 'Warm texture in a compact, complete design.', 1_300_000, null, 1_300_000),
  design('bathrooms', 'island', 'Bentota', 'Calm, considered and quietly luxurious.', 1_590_000, 4, 1_681_000),
  design(
    'bathrooms',
    'island',
    'Ella',
    'Natural warmth with a tailored highland finish.',
    1_850_000,
    4.5,
    1_850_000,
    undefined,
    undefined,
    'ella-bathroom',
  ),
  design('bathrooms', 'island', 'Mirissa', 'Refined contrast with coastal hotel comfort.', 1_394_000, 4, 1_481_000),
  design(
    'bathrooms',
    'heritage',
    'Sigiriya',
    'Sculptural, serene and unmistakably special.',
    1_870_000,
    4.5,
    1_978_000,
    '/images/designs/manel/cover.jpeg',
    [
      { label: 'Minimum fit', sqm: 4.5, newPrice: 1_870_000, renovationPrice: 1_978_000 },
      { label: 'Recommended fit', sqm: 6, newPrice: 2_255_000, renovationPrice: 2_370_000 },
      { label: 'Spacious fit', sqm: 7, newPrice: 2_450_000, renovationPrice: 2_565_000 },
    ],
    'sigiriya-bathroom',
  ),
  design('bathrooms', 'heritage', 'Yapahuwa', 'A dramatic retreat built around ritual.', 1_767_000, 3.5, 1_857_000),
  design('bathrooms', 'heritage', 'Kuttam Pokuna', 'A complete expression of private bathing ritual.', 1_875_000, 4.5, 1_982_000),
  design(
    'bathrooms',
    'gems',
    'Moonstone',
    'A luminous retreat made for unhurried rituals.',
    null,
    9,
    null,
    '/images/designs/pichcha/pichcha-cover-v2.webp',
  ),

  design('kitchens', 'standard', 'Rampe', 'Fresh, light and beautifully organised for everyday cooking.'),
  design('kitchens', 'standard', 'Karapincha', 'Natural greens, clean lines and hard-working storage.'),
  design('kitchens', 'standard', 'Inguru', 'Warm, welcoming and confidently practical.'),
  design('kitchens', 'premium', 'Karabu', 'Deep, aromatic contrast layered with tactile detail.'),
  design('kitchens', 'premium', 'Goraka', 'Deep contrast balanced by quiet stone and soft light.'),
  design('kitchens', 'premium', 'Siyambala', 'Earthy, generous and designed for cooking together.'),
  design('kitchens', 'signature', 'Kurundu', 'Our iconic cinnamon-inspired kitchen, warm and sculptural.'),
  design('kitchens', 'signature', 'Sadikka', 'Warm sophistication, crafted detail and quiet ceremony.'),
  design('kitchens', 'signature', 'Wasawasi', 'Layered colour, rare character and architectural calm.'),

  design('staircases', 'standard', 'Ritigala', 'Quiet strength, grounded materials and timeless lines.'),
  design('staircases', 'standard', 'Dolukanda', 'A practical turn shaped with warmth and clarity.'),
  design('staircases', 'standard', 'Hanthana', 'Soft rhythm and familiar comfort for a modern home.'),
  design('staircases', 'premium', 'Namunukula', 'Layered levels with a composed architectural presence.'),
  design('staircases', 'premium', 'Kirigalpotta', 'Crisp stone character balanced by lightness and detail.'),
  design('staircases', 'premium', 'Thotupola', 'A generous transition with crafted rail and landing.'),
  design('staircases', 'signature', 'Dumbara', 'Bold geometry inspired by the folds of the Knuckles range.'),
  design('staircases', 'signature', 'Samanala', 'A graceful, light-filled ascent with sculptural movement.'),
  design('staircases', 'signature', 'Pidurutalagala', 'Our highest expression of staircase design—created as the heart of a home.'),

  design('floors', 'standard', 'Weligama', 'Soft sand tones and an easy, relaxed rhythm.'),
  design('floors', 'standard', 'Kalpitiya', 'Clean, breezy and made for bright contemporary rooms.'),
  design('floors', 'standard', 'Pasikuda', 'Gentle warmth with a seamless, open feeling.'),
  design('floors', 'premium', 'Habarana', 'Grounded earth tones with natural variation and depth.'),
  design('floors', 'premium', 'Ella', 'Cool highland calm expressed through soft stone movement.'),
  design('floors', 'premium', 'Sinharaja', 'Deep natural character balanced with refined detailing.'),
  design('floors', 'signature', 'Sigiriya', 'Monumental calm, warm stone and precise geometry.'),
  design('floors', 'signature', 'Yala', 'Wild texture refined into a confident interior statement.'),
  design('floors', 'signature', 'Horton', 'Expansive, quiet and detailed with highland precision.'),
];

export const SPACE_PRESENTATION = {
  bathrooms: { name: 'Bathrooms', eyebrow: 'Four expressions of Sri Lankan luxury', title: 'Bathrooms designed as complete rooms.' },
  kitchens: { name: 'Kitchens', eyebrow: 'The Sri Lankan spice collection', title: 'Kitchens inspired by flavour, ritual and home.' },
  staircases: { name: 'Staircases', eyebrow: 'The Sri Lankan highland collection', title: 'Staircases inspired by the island’s highlands.' },
  floors: { name: 'Floors', eyebrow: 'The Sri Lankan landscape collection', title: 'Floors inspired by Sri Lankan landscapes.' },
} as const;
