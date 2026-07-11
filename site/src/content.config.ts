import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  schema: z.object({
    type: z.enum(['book', 'article']),
    year: z.number(),
    title: z.string(),
    journal: z.string(),
    doi: z.string().optional().default(''),
    doiUrl: z.string().default('#'),
    pdfUrl: z.string().default('#'),
    order: z.number(),
  }),
});

const experiments = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/experiments' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    status: z.enum(['running', 'done', 'abandoned']),
    hypothesis: z.string(),
    // One-sentence finding, shown above the fold. Often absent while a
    // "running" experiment hasn't concluded yet.
    result: z.string().optional(),
    tags: z.array(z.string()).default([]),
    updated: z.coerce.date().optional(),
  }),
});

export const collections = { publications, experiments };
