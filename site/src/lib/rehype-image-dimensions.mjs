/**
 * Images written in markdown come out as bare <img src alt>, so the browser cannot reserve their
 * space and the text below jumps when each one loads (layout shift, worst on phones). This reads
 * each local image's real size from site/public and adds width and height, plus lazy loading and
 * async decoding so images further down the page do not compete with the first screen.
 * Remote images and files that cannot be read are left untouched.
 */
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';

const PUBLIC = fileURLToPath(new URL('../../public/', import.meta.url));
const cache = new Map();

function size(file) {
  try {
    const b = readFileSync(file);
    const n = b.length;
    if (n > 24 && b[0] === 0x89 && b.toString('latin1', 1, 4) === 'PNG') return { width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
    if (n > 4 && b[0] === 0xff && b[1] === 0xd8) {
      let i = 2;
      while (i + 9 < n) {
        if (b[i] !== 0xff) { i++; continue; }
        const m = b[i + 1];
        if (m === 0xff) { i++; continue; }
        // Start-of-frame markers carry the size (C4, C8 and CC are not frames).
        if (m >= 0xc0 && m <= 0xcf && m !== 0xc4 && m !== 0xc8 && m !== 0xcc) return { width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
        if (m === 0xd8 || (m >= 0xd0 && m <= 0xd7) || m === 0x01) { i += 2; continue; }
        i += 2 + b.readUInt16BE(i + 2);
      }
    }
  } catch { /* unreadable: leave the image as it is */ }
  return null;
}

function dims(src) {
  if (!src.startsWith('/') || src.startsWith('//')) return null;
  const path = decodeURIComponent(src.split(/[?#]/)[0]);
  if (!cache.has(path)) cache.set(path, size(join(PUBLIC, path)));
  const s = cache.get(path);
  return s && s.width && s.height ? s : null;
}

// Images typed as HTML inside markdown (for example inside <figure>) arrive as raw text.
function fixRaw(html) {
  return html.replace(/<img\b[^>]*>/gi, (tag) => {
    const src = (tag.match(/\ssrc\s*=\s*(?:"([^"]*)"|'([^']*)')/i) || []).slice(1).find(Boolean) || '';
    let add = '';
    if (!/\swidth\s*=/i.test(tag) || !/\sheight\s*=/i.test(tag)) { const s = dims(src); if (s) add += ` width="${s.width}" height="${s.height}"`; }
    if (!/\sloading\s*=/i.test(tag)) add += ' loading="lazy"';
    if (!/\sdecoding\s*=/i.test(tag)) add += ' decoding="async"';
    return add ? tag.replace(/\s*\/?>$/, (end) => add + (end.includes('/') ? ' />' : '>')) : tag;
  });
}

function walk(node) {
  if (node.type === 'raw' && typeof node.value === 'string' && /<img\b/i.test(node.value)) node.value = fixRaw(node.value);
  if (node.type === 'element' && node.tagName === 'img') {
    const p = node.properties || (node.properties = {});
    const src = typeof p.src === 'string' ? p.src : '';
    if (!(p.width && p.height)) { const s = dims(src); if (s) { p.width = s.width; p.height = s.height; } }
    if (!p.loading) p.loading = 'lazy';
    if (!p.decoding) p.decoding = 'async';
  }
  for (const c of node.children || []) walk(c);
}

export default function rehypeImageDimensions() {
  return (tree) => walk(tree);
}
