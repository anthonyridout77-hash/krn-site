/**
 * Turn a markdown "## Frequently Asked Questions" section into native <details> disclosures.
 * Each "### Question" plus the content up to the next H3/H2 becomes one <details>.
 * Native details/summary: keyboard operable, expanded state announced, no JavaScript needed.
 * The question's original id moves to the <details> so existing #anchors still resolve.
 */
const text = (n) => (n.type === 'text' ? n.value : (n.children || []).map(text).join(''));
const isEl = (n, tag) => n && n.type === 'element' && n.tagName === tag;

export default function rehypeFaqDetails() {
  return (tree) => {
    const kids = tree.children || [];
    const start = kids.findIndex((n) => isEl(n, 'h2') && /^\s*(frequently asked questions|common questions)\s*$/i.test(text(n)));
    if (start < 0) return;
    let end = kids.findIndex((n, i) => i > start && isEl(n, 'h2'));
    if (end < 0) end = kids.length;
    const out = [];
    let cur = null;
    for (const n of kids.slice(start + 1, end)) {
      if (isEl(n, 'h3')) {
        const id = n.properties && n.properties.id;
        cur = { type: 'element', tagName: 'details', properties: { className: ['faq'], ...(id ? { id } : {}) }, children: [
          { type: 'element', tagName: 'summary', properties: {}, children: [{ type: 'text', value: text(n).trim() }] },
          { type: 'element', tagName: 'div', properties: { className: ['faq-a'] }, children: [] },
        ] };
        out.push(cur);
      } else if (cur) {
        cur.children[1].children.push(n);
      } else {
        out.push(n);
      }
    }
    kids[start].properties = { ...(kids[start].properties || {}), className: ['faq-h'] };
    tree.children = [...kids.slice(0, start + 1), { type: 'element', tagName: 'div', properties: { className: ['faq-list'] }, children: out }, ...kids.slice(end)];
  };
}
