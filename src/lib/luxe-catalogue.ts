import type { Collection } from './luxe';

export interface CatalogueDesign {
  slug: string;
  name: string;
  space: 'bathrooms' | 'kitchens' | 'staircases' | 'floors';
  collection: Collection;
  tagline: string;
  startingPrice: number | null;
  minSqm: number | null;
}

const design = (
  space: CatalogueDesign['space'], collection: Collection, name: string,
  tagline: string, startingPrice: number | null = null, minSqm: number | null = null,
): CatalogueDesign => ({
  space, collection, name, tagline, startingPrice, minSqm,
  slug: name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
});

export const CATALOGUE_DESIGNS: CatalogueDesign[] = [
  design('bathrooms', 'standard', 'Araliya', 'A bright, beautifully practical beginning.', 1_000_000),
  design('bathrooms', 'standard', 'Olu', 'Soft tones and effortless everyday function.', 1_150_000),
  design('bathrooms', 'standard', 'Kumudu', 'Warm texture in a compact, complete design.', 1_300_000),
  design('bathrooms', 'premium', 'Nelum', 'Calm, considered and quietly luxurious.', 1_600_000, 4),
  design('bathrooms', 'premium', 'Sandun', 'Natural warmth with a tailored finish.', 1_850_000, 4.5),
  design('bathrooms', 'premium', 'Orchid', 'Refined contrast with hotel-like comfort.', 2_100_000, 5),
  design('bathrooms', 'signature', 'Manel', 'Sculptural, serene and unmistakably special.', 2_500_000, 6),
  design('bathrooms', 'signature', 'Binara', 'A generous retreat built around ritual.', 3_000_000, 7),
  design('bathrooms', 'signature', 'Idda', 'Our most complete expression of private luxury.', 3_600_000, 8),

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
  bathrooms: { name: 'Bathrooms', eyebrow: 'The Sri Lankan floral collection', title: 'Bathrooms designed as complete rooms.' },
  kitchens: { name: 'Kitchens', eyebrow: 'The Sri Lankan spice collection', title: 'Kitchens inspired by flavour, ritual and home.' },
  staircases: { name: 'Staircases', eyebrow: 'The Sri Lankan highland collection', title: 'Staircases inspired by the island’s highlands.' },
  floors: { name: 'Floors', eyebrow: 'The Sri Lankan landscape collection', title: 'Floors inspired by Sri Lankan landscapes.' },
} as const;
