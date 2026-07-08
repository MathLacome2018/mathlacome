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

export const collections = { publications };
