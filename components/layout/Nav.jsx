'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MoonIcon, SunIcon } from '../icons';
import Logo from '../Logo';

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState('dark');
  const [menuOpen, setMenuOpen] = useState(false);
  const ticking = useRef(false);
  const pathname = usePathname();

  useEffect(() => {
    try {
      const stored = localStorage.getItem('theme');
      if (stored === 'light' || stored === 'dark') {
        document.documentElement.setAttribute('data-theme', stored);
        setTheme(stored);
      } else {
        setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
      }
    } catch (e) {
      setTheme(document.documentElement.getAttribute('data-theme') || 'dark');
    }

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        setStuck(y > 24);
        const h = document.documentElement.scrollHeight - window.innerHeight;
        setProgress(h > 0 ? Math.min(100, (y / h) * 100) : 0);
        ticking.current = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    function closeOnEscape(event) {
      if (event.key === 'Escape') setMenuOpen(false);
    }
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [menuOpen]);

  function toggleTheme() {
    const next = theme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch (e) {}
    setTheme(next);
  }

  return (
    <>
      <div className="prog" style={{ width: `${progress}%` }} />
      <nav className={`nav${stuck ? ' stuck' : ''}`}>
        <div className="nav-in">
          <Link href="/" className="brand" aria-label="Selvaganapathi Kanakaraj — home">
            <span className="brand-mark"><Logo /></span>
            <span style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              <span className="brand-wm" style={{ lineHeight: '1!important' }}>Selvaganapathi Kanakaraj</span>
              <span className="small brand-sub" style={{ color: 'var(--fg-4)', fontSize: '10px' }}>Full Stack Developer</span>
            </span>
          </Link>
          <div className="nav-links">
            <span className="nav-internal">
              <Link href="/work" aria-current={pathname === '/work' || pathname.startsWith('/work/') ? 'page' : undefined}>Work</Link>
              <Link href="/journey" aria-current={pathname === '/journey' ? 'page' : undefined}>Journey</Link>
              <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>Approach</Link>
            </span>
            <Link href="/contact" className="nav-cta" data-tour="nav-contact">Get in touch</Link>
            <button
              className="theme-btn"
              data-tour="theme-toggle"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              aria-pressed={theme === 'light'}
              title="Switch theme"
            >
              <MoonIcon />
              <SunIcon />
            </button>
            <button
              type="button"
              className="menu-btn"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              onClick={() => setMenuOpen((open) => !open)}
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
        <div id="mobile-navigation" className={`mobile-nav${menuOpen ? ' open' : ''}`} hidden={!menuOpen}>
          <Link href="/work" aria-current={pathname === '/work' || pathname.startsWith('/work/') ? 'page' : undefined}>Work</Link>
          <Link href="/journey" aria-current={pathname === '/journey' ? 'page' : undefined}>Journey</Link>
          <Link href="/about" aria-current={pathname === '/about' ? 'page' : undefined}>Approach</Link>
        </div>
      </nav>
    </>
  );
}
