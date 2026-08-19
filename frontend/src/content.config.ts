import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const nyheter = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/nyheter' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().default(''),
    date: z.coerce.date(),
    image: z.string().optional().nullable(),
  }),
});

const arrangement = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/arrangement' }),
  schema: z.object({
    title: z.string(),
    excerpt: z.string().optional().default(''),
    date: z.coerce.date().optional().nullable(),
    location: z.string().optional().nullable(),
    image: z.string().optional().nullable(),
  }),
});

const aktiviteter = defineCollection({
  loader: glob({ pattern: '**/*.{json,md}', base: './src/content/aktiviteter' }),
  schema: z.object({
    activity: z.string(),
    day: z.string(),
    time: z.string(),
    location: z.string().optional().nullable(),
    type: z.enum(['Inne', 'Ute']),
    description: z.string().optional().nullable(),
    order: z.number().default(0),
  }),
});

export const collections = { nyheter, arrangement, aktiviteter };
