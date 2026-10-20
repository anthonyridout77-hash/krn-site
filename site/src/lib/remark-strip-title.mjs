/** Remove a leading heading whose text equals the frontmatter title (the page template already renders the H1). */
export default function remarkStripTitle() {
  return (tree, file) => {
    const title = file?.data?.astro?.frontmatter?.title;
    if (!title || !Array.isArray(tree.children)) return;
    const norm = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
    const idx = tree.children.findIndex((n) => n.type !== 'yaml');
    const first = tree.children[idx];
    if (!first || first.type !== 'heading') return;
    const text = (first.children ?? []).map((c) => c.value ?? '').join('');
    if (norm(text) === norm(title)) tree.children.splice(idx, 1);
  };
}
