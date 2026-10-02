'use client';

import { useCallback, useEffect, useState } from 'react';
import Logo from '../Logo';

const STORAGE_KEY = 'portfolio-intro-seen-v2';

export default function IntroLoader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);

  const dismiss = useCallback(() => {
    if (leaving) return;
    setLeaving(true);
    window.setTimeout(() => setVisible(false), 650);
  }, [leaving]);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let seen = false;
    try {
      seen = sessionStorage.getItem(STORAGE_KEY) === '1';
      sessionStorage.setItem(STORAGE_KEY, '1');
    } catch {}

    if (reducedMotion || seen) {
      setVisible(false);
      return;
    }

    const timer = window.setTimeout(dismiss, 1250);
    const onKeyDown = (event) => {
      if (event.key === 'Escape' || event.key === 'Enter' || event.key === ' ') dismiss();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [dismiss]);

  if (!visible) return null;

  return (
    <div className={`intro-loader${leaving ? ' leaving' : ''}`} onClick={dismiss} role="status" aria-label="Opening Selvaganapathi Kanakaraj’s portfolio">
      <div className="intro-ambient" aria-hidden="true" />
      <div className="intro-shutter">
        <div className="intro-stage">
          <div className="intro-mark" aria-hidden="true">
            <span className="intro-ring" />
            <Logo className="intro-logo" />
          </div>
          <p className="intro-name">SELVAGANAPATHI KANAKARAJ</p>
          <p className="intro-role">FULL STACK DEVELOPER</p>
          <div className="intro-meter" aria-hidden="true"><span /></div>
          <button type="button" className="intro-skip" onClick={dismiss}>Skip intro</button>
        </div>
      </div>
    </div>
  );
}
