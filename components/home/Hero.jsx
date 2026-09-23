'use client';

import Link from 'next/link';
import Image from 'next/image';
import Reveal from '../Reveal';
import { ArrowRight, DocIcon } from '../icons';
import { LINKS } from '../../lib/links';
import heroImageDark from '../../public/hero-dark-image.png';
import heroImageLight from '../../public/hero-light-image.png';

const CHIPS = ['Next.js & React.js', 'Node.js & Express', 'TypeScript', 'Prisma & MongoDB', 'Ships production UI'];

export default function Hero() {
  return (
    <header className="hero">
      <div className="wrap">
        <Reveal className="hero-meta">
          <span className="hero-avail"><span className="pulse" /> Open to Full Stack / Frontend Developer roles</span>
          <span className="sep" aria-hidden="true">·</span>
          <span>Bengaluru, India</span>
        </Reveal>

        <div className="hero-grid">
          <div className="hero-col">
            <Reveal as="h1" className="h1 hero-h1" i={1}>
              I&apos;m <span style={{ color: 'var(--ac)' }}>Selvaganapathi</span> — I build enterprise systems
              <span className="em">people rely on without thinking about it.</span>
            </Reveal>

            <Reveal as="p" className="lead hero-sub" i={2}>
              For 2+ years I&apos;ve built the software that runs companies from the inside —{' '}
              <span className="hl">HR platforms, device management, internal tools</span> — using
              Next.js, React and Node.js. Most of that time I&apos;ve been the only frontend engineer
              on the module, which means <span className="hl">I also talk to stakeholders and ship the
              backend that feeds my own UI.</span>
            </Reveal>

            <div data-tour="hero-chips">
              <Reveal className="hero-chips" i={3}>
                {CHIPS.map((c) => (
                  <span className="chip" key={c}>{c}</span>
                ))}
              </Reveal>
            </div>

            <Reveal className="hero-actions" i={4}>
              <Link href="/work" className="btn btn-p">See the work <ArrowRight /></Link>
              <Link href="/about" className="btn btn-s">How I work</Link>
              <a href={LINKS.resume} download className="btn btn-s">
                <DocIcon /> Download résumé
              </a>
            </Reveal>
          </div>

          <Reveal as="aside" className="hero-card" i={2} data-tour="hero-profile">
            <div className="portrait">
              <Image
                src={heroImageDark}
                alt="Selvaganapathi Kanakaraj at his desk"
                fill
                placeholder="blur"
                sizes="(max-width: 960px) 260px, 32vw"
                priority
                className="portrait-photo portrait-photo-dark"
              />
              <Image
                src={heroImageLight}
                alt=""
                aria-hidden="true"
                fill
                placeholder="blur"
                sizes="(max-width: 960px) 260px, 32vw"
                priority
                className="portrait-photo portrait-photo-light"
              />
              <span className="portrait-grade" aria-hidden="true" />
              <div className="portrait-cap">
                <b>Selvaganapathi Kanakaraj</b>
                <span>Full Stack Developer</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </header>
  );
}
