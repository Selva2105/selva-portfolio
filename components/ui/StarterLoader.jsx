'use client';

import { useEffect, useRef, useState } from 'react';

const PATH_TOP =
  'M22.7767 18.7606V14.5783C22.7767 10.0002 19.0684 6.2762 14.5059 6.2762C9.94336 6.2762 6.23503 10.0002 6.23503 14.5783C6.23503 19.1616 9.94336 22.8856 14.5059 22.8856H29.0007V29.1043H14.5059C12.5527 29.1043 10.6569 28.7293 8.87044 27.9689C7.14128 27.2345 5.5944 26.1981 4.26628 24.8647C2.93815 23.5262 1.89128 21.9741 1.16211 20.2397C0.406901 18.4481 0.0214844 16.5418 0.0214844 14.5783C0.0214844 12.6147 0.406901 10.7137 1.16211 8.91683C1.89128 7.18766 2.93815 5.63037 4.26628 4.29704C5.5944 2.9585 7.14128 1.91162 8.87044 1.18245C10.6569 0.422038 12.5527 0.0366211 14.5059 0.0366211C16.459 0.0366211 18.36 0.422038 20.1465 1.17725C21.8704 1.91162 23.4225 2.9585 24.7507 4.29183C26.0788 5.63037 27.1257 7.18245 27.8548 8.91683C28.6152 10.7137 29.0007 12.6147 29.0007 14.5783V18.7606H22.7767Z';

const PATH_BOT =
  'M29 33.2607V37.4274C29 38.1253 28.9479 38.818 28.849 39.4951C28.6771 40.7295 28.3385 41.9326 27.849 43.0889C27.1198 44.8232 26.0781 46.3805 24.7448 47.7139C23.4167 49.0472 21.8698 50.0941 20.1406 50.8285C18.3542 51.5889 16.4583 51.9743 14.5052 51.9743C12.5521 51.9743 10.651 51.5889 8.86458 50.8285C7.14062 50.0941 5.58854 49.0472 4.25521 47.7139C2.92708 46.3805 1.88021 44.8232 1.14583 43.0889C0.395833 41.2972 0 39.391 0 37.4274V25.2764C0.536459 26.0055 1.13542 26.6982 1.78125 27.3441C3.43229 29.0003 5.36458 30.3024 7.50521 31.2087C7.86458 31.3597 8.22396 31.5003 8.58854 31.6305C7.13542 33.1253 6.23438 35.1722 6.23438 37.4274C6.23438 42.0055 9.94792 45.7295 14.5052 45.7295C18.3594 45.7295 21.599 43.0628 22.5156 39.4795H14.5V33.2607H29Z';

export default function StarterLoader() {
  const [mounted, setMounted] = useState(true);
  const [phase, setPhase] = useState('intro'); // 'intro' | 'ready' | 'revealing' | 'done'
  const [progress, setProgress] = useState(0);
  const stageRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setMounted(false);
      return;
    }

    document.body.style.overflow = 'hidden';

    const startTime = performance.now();
    const duration = 4200; // ms for 0 -> 100% (4.2s progress duration)

    function step(now) {
      const elapsed = now - startTime;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);

      if (pct < 100) {
        rafRef.current = requestAnimationFrame(step);
      } else {
        setPhase('ready');
        // Pause at 100% (500ms) before shutter opens
        setTimeout(() => {
          setPhase('revealing');
          document.body.style.overflow = '';
          // Unmount after shutter lifts completely (1050ms)
          setTimeout(() => {
            setPhase('done');
            setMounted(false);
          }, 1050);
        }, 500);
      }
    }

    rafRef.current = requestAnimationFrame(step);

    function onMouseMove(e) {
      if (!stageRef.current) return;
      const { innerWidth: w, innerHeight: h } = window;
      const rx = ((e.clientY / h) - 0.5) * -14;
      const ry = ((e.clientX / w) - 0.5) * 16;
      stageRef.current.style.setProperty('--rx', `${rx.toFixed(2)}deg`);
      stageRef.current.style.setProperty('--ry', `${ry.toFixed(2)}deg`);
    }

    function onKeyDown(e) {
      if (e.key === 'Escape' || e.key === ' ' || e.key === 'Enter') {
        dismiss();
      }
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('keydown', onKeyDown);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, []);

  function dismiss() {
    if (phase === 'revealing' || phase === 'done') return;
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(100);
    setPhase('revealing');
    document.body.style.overflow = '';
    setTimeout(() => {
      setPhase('done');
      setMounted(false);
    }, 1050);
  }

  // Self-drawing glowing stroke math
  // Top curve draws from 0% -> 62%
  const p1Ratio = Math.max(0, Math.min(1, progress / 62));
  const p1Offset = (1000 - p1Ratio * 1000).toFixed(1);

  // Bottom curve draws from 12% -> 76%
  const p2Ratio = Math.max(0, Math.min(1, (progress - 12) / 64));
  const p2Offset = (1000 - p2Ratio * 1000).toFixed(1);

  // Solid fill blooms into visibility from 72% -> 94%
  const fillOpacity = Math.max(0, Math.min(1, (progress - 72) / 22)).toFixed(2);

  const displayPct = Math.min(100, Math.round(progress));

  let statusText = 'DRAWING MONOGRAM CONTOURS...';
  if (progress > 28 && progress <= 58) statusText = 'ETCHING VECTOR FILAMENTS...';
  else if (progress > 58 && progress <= 78) statusText = 'ILLUMINATING CORE NODES...';
  else if (progress > 78 && progress < 100) statusText = 'SYNCHRONIZING SYSTEM...';
  else if (progress >= 100) statusText = 'READY TO LAUNCH';

  if (!mounted) return null;

  return (
    <div
      className={`starter-loader ${phase}`}
      onClick={dismiss}
      role="dialog"
      aria-modal="true"
      aria-label="Loading Selvaganapathi Kanakaraj Portfolio"
    >
      {/* Background ambient lighting */}
      <div className="starter-amb starter-amb-1" />
      <div className="starter-amb starter-amb-2" />

      {/* Shutter Blade Lift Container */}
      <div className="starter-shutter">
        {/* Leading edge subtle divider that sweeps upwards */}
        <div className="starter-laser" />

        {/* Center Stage */}
        <div className="starter-stage" ref={stageRef}>
          {/* Emblem Container */}
          <div className="starter-emblem-wrap">
            <div className="starter-emblem-shadow" />
            <div className="starter-emblem-badge">
              <div className="starter-badge-gloss" />
              <div className="starter-ring" />

              {/* Luminous Glow Self-Drawing SVG */}
              <svg
                className="starter-logo-svg starter-draw-svg"
                viewBox="0 0 29 52"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="1.8" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>

                  <linearGradient id="monogramFillGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="40%" stopColor="var(--fg)" />
                    <stop offset="75%" stopColor="var(--ac)" />
                    <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                  </linearGradient>

                  <mask id="starter_mask_top" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={0} y={0} width={29} height={31}>
                    <path d="M0 0H29V30.0313H0V0Z" fill="white" />
                  </mask>
                  <mask id="starter_mask_bot" style={{ maskType: 'luminance' }} maskUnits="userSpaceOnUse" x={0} y={24} width={29} height={29}>
                    <path d="M0 24.6982H29V52.0003H0V24.6982Z" fill="white" />
                  </mask>
                </defs>

                {/* --- 1. SOLID FILL LAYER (fades in quietly as drawing completes) --- */}
                <g style={{ opacity: fillOpacity, transition: 'opacity 0.3s ease-out' }}>
                  <g mask="url(#starter_mask_top)">
                    <path d={PATH_TOP} fill="url(#monogramFillGrad)" />
                  </g>
                  <g mask="url(#starter_mask_bot)">
                    <path d={PATH_BOT} fill="url(#monogramFillGrad)" />
                  </g>
                </g>

                {/* --- 2. GUIDE OUTLINE (subtle dashed wireframe) --- */}
                <g opacity="0.12">
                  <path d={PATH_TOP} fill="none" stroke="var(--line-3)" strokeWidth="0.75" strokeDasharray="1.5 2.5" />
                  <path d={PATH_BOT} fill="none" stroke="var(--line-3)" strokeWidth="0.75" strokeDasharray="1.5 2.5" />
                </g>

                {/* --- 3. SOFT AMBIENT GLOW LINE --- */}
                <g filter="url(#softGlow)" opacity="0.6">
                  <path
                    d={PATH_TOP}
                    fill="none"
                    stroke="var(--ac)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1000"
                    strokeDasharray="1000"
                    strokeDashoffset={p1Offset}
                    style={{ willChange: 'stroke-dashoffset' }}
                  />
                  <path
                    d={PATH_BOT}
                    fill="none"
                    stroke="var(--ac)"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1000"
                    strokeDasharray="1000"
                    strokeDashoffset={p2Offset}
                    style={{ willChange: 'stroke-dashoffset' }}
                  />
                </g>

                {/* --- 4. CRISP ACCENT PEN LINE (calm and refined) --- */}
                <g>
                  <path
                    d={PATH_TOP}
                    fill="none"
                    stroke="var(--ac)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1000"
                    strokeDasharray="1000"
                    strokeDashoffset={p1Offset}
                    style={{ willChange: 'stroke-dashoffset' }}
                  />
                  <path
                    d={PATH_BOT}
                    fill="none"
                    stroke="var(--ac)"
                    strokeWidth="1.3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    pathLength="1000"
                    strokeDasharray="1000"
                    strokeDashoffset={p2Offset}
                    style={{ willChange: 'stroke-dashoffset' }}
                  />
                </g>
              </svg>
            </div>
          </div>

          {/* Typography & Status */}
          <div className="starter-info">
            <h2 className="starter-title">SELVAGANAPATHI KANAKARAJ</h2>
            <p className="starter-role">FULL STACK DEVELOPER</p>

            {/* Micro Progress Bar & Counter */}
            <div className="starter-meter">
              <div className="starter-meter-bar">
                <div className="starter-meter-fill" style={{ width: `${progress}%` }} />
              </div>
              <div className="starter-counter">
                <span>{displayPct < 100 ? `${String(displayPct).padStart(2, '0')}%` : 'READY'}</span>
              </div>
            </div>

            <p className="starter-status">{statusText}</p>
          </div>

          {/* Skip hint */}
          <button type="button" className="starter-skip" onClick={dismiss} aria-label="Skip introduction">
            Click or press ESC to skip
          </button>
        </div>
      </div>
    </div>
  );
}
