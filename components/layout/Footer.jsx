import Link from 'next/link';
import { LINKS } from '../../lib/links';

export default function Footer() {
  return (
    <footer className="foot">
      <div className="wrap">
        <Link href="/" className="logo-foot foot-brand" style={{ marginBottom: 38, flexDirection: 'column', alignItems: 'flex-start', gap: 0.5 }} aria-label="Selvaganapathi Kanakaraj — home">
          <span className="foot-brand-name">Selvaganapathi Kanakaraj</span>
          <span className="small" style={{ color: 'var(--fg-4)' }}>Full Stack Developer</span>
        </Link>
        <div className="foot-grid">
          <div className="stack-3">
            <p className="h4">Currently open to Full Stack / Frontend Developer roles.</p>
            <p className="small" style={{ maxWidth: '52ch' }}>Bengaluru, India · Remote-friendly · 2+ years shipping production Next.js and Node.js applications.</p>
          </div>
          <div className="foot-links">
            <Link href="/work">Work</Link>
            <Link href="/journey">Journey</Link>
            <Link href="/about">Approach</Link>
            <Link href="/contact">Contact</Link>
            <a href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
          </div>
        </div>
        <p className="small" style={{ marginTop: 44, color: 'var(--fg-4)' }}>
          © {new Date().getFullYear()} Selvaganapathi Kanakaraj. Built by hand.
        </p>
      </div>
    </footer>
  );
}
