'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { MoonIcon, SunIcon } from '../icons';
import Logo from '../Logo';

export default function Nav() {
  const [stuck, setStuck] = useState(false);
  const [progress, setProgress] = useState(0);
  const [theme, setTheme] = useState('dark');
  const ticking = useRef(false);

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
              <span className="small" style={{ color: 'var(--fg-4)', fontSize: '10px' }}>Full Stack Developer</span>
            </span>
          </Link>
          <div className="nav-links">
            <span className="nav-internal">
              <Link href="/work">Work</Link>
              <Link href="/journey">Journey</Link>
              <Link href="/about">Approach</Link>
            </span>
            <Link href="/contact" className="nav-cta">Get in touch</Link>
            <button
              className="theme-btn"
              onClick={toggleTheme}
              aria-label={theme === 'light' ? 'Switch to dark theme' : 'Switch to light theme'}
              aria-pressed={theme === 'light'}
              title="Switch theme"
            >
              <MoonIcon />
              <SunIcon />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
}
