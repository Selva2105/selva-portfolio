'use client';

import { useEffect, useRef } from 'react';
import { runSite } from './site-scripts';

/*
 * Lift-and-shift of the original single-file site.
 *
 * - The markup below is the exact static <body> content from index.html
 *   (only HTML attributes renamed to their JSX spellings: class -> className,
 *   stroke-width -> strokeWidth, etc). The routed views, chat widget and all
 *   demo widgets are still built imperatively by the original vanilla JS.
 * - runSite() contains all five original <script> blocks, concatenated in
 *   their original order and executed once on the client after mount — the
 *   same point in the lifecycle as the original scripts at the end of <body>.
 */
export default function Page() {
  const started = useRef(false);

  useEffect(() => {
    if (started.current) return;
    started.current = true;
    runSite();
  }, []);

  return (
    <>
      <div className="prog" id="prog"></div>

      <nav className="nav" id="nav">
        <div className="nav-in">
          <a href="#/" className="brand" id="brand" aria-label="Dinesh Doddaga — home"><span className="brand-mark"></span><span className="brand-wm">Dinesh Doddaga</span></a>
          <div className="nav-links">
            <span className="nav-internal" id="nav-internal">
              <a href="#/work">Work</a>
              <a href="#/journey">Journey</a>
              <a href="#/about">Approach</a>
            </span>
            <a href="#/contact" className="nav-cta">Get in touch</a>
            <button className="theme-btn" id="theme-btn" aria-label="Switch to light theme" title="Switch theme">
              <svg className="i-moon" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13.5 9.6A5.8 5.8 0 016.4 2.5a5.8 5.8 0 107.1 7.1z"/></svg>
              <svg className="i-sun" width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><circle cx="8" cy="8" r="3.1"/><path d="M8 1.4v1.4M8 13.2v1.4M14.6 8h-1.4M2.8 8H1.4M12.66 3.34l-.99.99M4.33 11.67l-.99.99M12.66 12.66l-.99-.99M4.33 4.33l-.99-.99"/></svg>
            </button>
          </div>
        </div>
      </nav>

      <div id="app"></div>
    </>
  );
}
