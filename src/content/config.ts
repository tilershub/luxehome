import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    author: z.string().default('TILERSHUB Team'),
    category: z.string(),
    readingTime: z.string(),
  }),
});

export const collections = { blog };
