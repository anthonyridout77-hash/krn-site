import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const common = {
  title: z.string(),
  description: z.string().optional(),
  date: z.coerce.date().optional(),
  updated: z.coerce.date().optional(),
  image: z.string().optional(),
  imageAlt: z.string().optional(),
  wpId: z.union([z.string(), z.number()]).transform(String).optional(),
  wpUrl: z.string().optional(),
};

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/blog' }),
  schema: z.object({
    ...common,
    categories: z.array(z.string()).optional().default([]),
  }),
});

const recipes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/recipes' }),
  schema: z.object({ ...common }),
});

const services = defineCollection({
  loader: glob({ pattern: '**/*.md', base: '../content/services' }),
  schema: z.object({
    ...common,
    parent: z.union([z.string(), z.number()]).transform(String).optional(),
  }),
});

export const collections = { blog, recipes, services };
