/**
 * Markdown tables: column headers get scope="col", the first cell of each body row becomes a row
 * header (scope="row"), and the table sits in a keyboard-focusable, labelled scroll region so wide
 * tables can be scrolled without a mouse on small screens. The label is the nearest preceding heading.
 */
const text = (n) => (n.type === 'text' ? n.value : (n.children || []).map(text).join(''));
const isEl = (n, t) => n && n.type === 'element' && n.tagName === t;
export default function rehypeAccessibleTables() {
  return (tree) => {
    const kids = tree.children || [];
    let lastHeading = 'Table';
    for (let i = 0; i < kids.length; i++) {
      const n = kids[i];
      if (n.type === 'element' && /^h[2-4]$/.test(n.tagName)) lastHeading = text(n).trim() || lastHeading;
      if (!isEl(n, 'table')) continue;
      for (const sec of n.children || []) {
        if (isEl(sec, 'thead')) for (const tr of sec.children || []) for (const c of tr.children || []) if (isEl(c, 'th')) c.properties = { ...(c.properties || {}), scope: 'col' };
        if (isEl(sec, 'tbody')) for (const tr of sec.children || []) {
          const first = (tr.children || []).find((c) => c.type === 'element');
          if (first && first.tagName === 'td') { first.tagName = 'th'; first.properties = { ...(first.properties || {}), scope: 'row' }; }
        }
      }
      kids[i] = { type: 'element', tagName: 'div', properties: { className: ['table-wrap-md'], role: 'region', tabIndex: 0, ariaLabel: lastHeading }, children: [n] };
    }
  };
}
