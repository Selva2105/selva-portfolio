'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';

/*
 * Scroll-reveal wrapper. Mirrors the .rv / .rv.in contract in globals.css:
 * elements start hidden (opacity/transform/blur) and fade in once they cross
 * the viewport, staggered via the --i custom property. Each instance owns
 * its own IntersectionObserver instead of one global querySelectorAll pass,
 * so it works regardless of which page mounted it.
 *
 * `as` only ever takes a string tag name — never a component reference —
 * because a Server Component can't pass a function/component prop across
 * the boundary into this Client Component. Pass `href` instead of `as={Link}`
 * to render a Next.js Link; Link is resolved here, inside the client module.
 */
export default function Reveal({ as: Tag = 'div', href, i, className = '', style, children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      el.classList.add('in');
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in');
            io.unobserve(el);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.04 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const cls = `rv ${className}`.trim();
  const computedStyle = i != null ? { '--i': i, ...style } : style;

  // A download link needs a real anchor so the browser handles it natively —
  // next/link intercepts clicks for client-side routing, which would try to
  // "navigate" to the file instead of saving it.
  if (href && props.download) {
    return (
      <a ref={ref} href={href} className={cls} style={computedStyle} {...props}>
        {children}
      </a>
    );
  }

  if (href) {
    return (
      <Link ref={ref} href={href} className={cls} style={computedStyle} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <Tag ref={ref} className={cls} style={computedStyle} {...props}>
      {children}
    </Tag>
  );
}
