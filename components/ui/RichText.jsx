import { Fragment } from 'react';

const TOKEN = /(<span class="hl">.*?<\/span>|<strong(?: style="color:var\(--warn\)")?>.*?<\/strong>)/g;

export default function RichText({ children }) {
  if (typeof children !== 'string') return children;

  return children.split(TOKEN).filter(Boolean).map((part, index) => {
    const highlight = part.match(/^<span class="hl">(.*?)<\/span>$/);
    if (highlight) return <span className="hl" key={index}>{highlight[1]}</span>;
    const strong = part.match(/^<strong(?: style="color:var\(--warn\)")?>(.*?)<\/strong>$/);
    if (strong) return <strong style={part.includes('style="color:var(--warn)"') ? { color: 'var(--warn)' } : undefined} key={index}>{strong[1]}</strong>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}
