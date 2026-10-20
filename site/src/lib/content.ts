import type { CollectionEntry } from 'astro:content';

export const BOOK_URL = 'https://calendly.com/katridout/15-minute-investigative-callback';

/** Slug for a URL path: lowercase, ampersand -> and, non-alphanumerics -> hyphen. */
export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/** Path segment(s) of a wpUrl after the given prefix, e.g. prefix '/blogs/' */
function wpPathAfter(wpUrl: string | undefined, prefix: string): string | undefined {
  if (!wpUrl) return undefined;
  try {
    const path = new URL(wpUrl).pathname;
    if (!path.startsWith(prefix)) return undefined;
    const rest = path.slice(prefix.length).replace(/^\/+|\/+$/g, '');
    return rest || undefined;
  } catch {
    return undefined;
  }
}

export function blogSlug(entry: CollectionEntry<'blog'>): string {
  return wpPathAfter(entry.data.wpUrl, '/blogs/') ?? entry.id;
}

export function serviceSlug(entry: CollectionEntry<'services'>): string {
  return wpPathAfter(entry.data.wpUrl, '/our-services/') ?? entry.id;
}

export function recipeSlug(entry: CollectionEntry<'recipes'>): string {
  return entry.id;
}

export function blogUrl(entry: CollectionEntry<'blog'>): string {
  return `/blogs/${blogSlug(entry)}/`;
}
export function recipeUrl(entry: CollectionEntry<'recipes'>): string {
  return `/recipes-for-pregnancy/${recipeSlug(entry)}/`;
}
export function serviceUrl(entry: CollectionEntry<'services'>): string {
  return `/our-services/${serviceSlug(entry)}/`;
}
export function categoryUrl(category: string): string {
  return `/blogs/category/${slugify(category)}/`;
}

export function formatDate(d?: Date): string {
  if (!d) return '';
  return d.toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });
}

export function isoDate(d?: Date): string | undefined {
  return d ? d.toISOString().slice(0, 10) : undefined;
}

/** Newest first by date (falls back to updated). */
export function byNewest<T extends { data: { date?: Date; updated?: Date } }>(a: T, b: T): number {
  const ad = (a.data.date ?? a.data.updated ?? new Date(0)).getTime();
  const bd = (b.data.date ?? b.data.updated ?? new Date(0)).getTime();
  return bd - ad;
}

/** Up to n posts sharing a category with the given post, excluding itself; pads with newest others. */
export function relatedPosts(
  post: CollectionEntry<'blog'>,
  all: CollectionEntry<'blog'>[],
  n = 3,
): CollectionEntry<'blog'>[] {
  const cats = new Set(post.data.categories ?? []);
  const others = all.filter((p) => p.id !== post.id).sort(byNewest);
  const same = others.filter((p) => (p.data.categories ?? []).some((c) => cats.has(c)));
  const picked = same.slice(0, n);
  if (picked.length < n) {
    for (const p of others) {
      if (picked.length >= n) break;
      if (!picked.includes(p)) picked.push(p);
    }
  }
  return picked;
}
