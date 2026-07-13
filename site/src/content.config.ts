import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const publications = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/publications' }),
  // Only `title` is required. Every other field is optional with a sensible
  // fallback so that a single missing field in a hand-added paper can never
  // break the whole build -- the entry just renders without that piece.
  schema: z.object({
    title: z.string(),
    // Any unrecognised value falls back to "article".
    type: z.enum(['book', 'book-chapter', 'article']).catch('article'),
    year: z.number().optional(),
    // Full author list, e.g. "Buchheit M., Lacome M., Simpson B.M." --
    // "Lacome M." is rendered in bold automatically.
    authors: z.string().optional().default(''),
    journal: z.string().optional().default(''),
    // The link the DOI / View box points at: a paper's DOI, or an Amazon
    // page for a book. Full URL preferred; a bare DOI also works.
    url: z.string().optional().default(''),
    doi: z.string().optional().default(''),
    doiUrl: z.string().default('#'),
    pdfUrl: z.string().default('#'),
    // Optional manual tiebreaker. The list sorts by year (newest first);
    // set this only when you want to pin ordering within the same year.
    order: z.number().optional(),
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
