import Link from 'next/link';
import Reveal from '../../components/Reveal';
import { ArrowRight } from '../../components/icons';

export const metadata = { title: 'Approach' };

const BELIEFS = [
  {
    n: '01',
    t: 'Shared state across modules breaks quietly, not loudly',
    b: `On the HRMS, attendance, leave and employee management all read and write the same
    employee record from different modules. The bugs that hurt were never in one screen — they
    were a leave approval that didn't reflect in attendance, or a recruitment stage that didn't
    sync with the employee record it was about to create. I now design the data flow before the
    component tree, not after.`,
  },
  {
    n: '02',
    t: 'Admin and configuration screens deserve the same care as the end-user flow',
    b: `Building the MDM frontend — device onboarding, policy enforcement, fleet dashboards — the
    real user was an IT admin managing hundreds of devices they'd never touch. Treating that as
    "just an internal tool" is how enterprise software quietly fails its highest-stakes users.`,
  },
  {
    n: '03',
    t: 'Own the surface end to end, not just the component',
    b: `Leading the Intranet build meant SSO-like login bypass, real-time messaging over sockets and
    a Google Meet integration — frontend, backend and the third-party wiring in between. Owning the
    whole feature, not just the React side of it, is what taught me the tradeoffs each layer forces
    on the others.`,
  },
  {
    n: '04',
    t: 'AI is a feature you have to design the review step for, not just the generation step',
    b: `Integrating AI resume parsing into the careers portal and a Gemini-powered assistant into my
    own expense tracker taught me the same lesson twice: generating output is the easy half. The
    part that actually ships is making the output easy for a human to check, correct, or trust
    without re-doing the work by hand.`,
  },
];

const HISTORY = [
  { r: 'Software Developer', c: 'Brilyant IT Solutions Pvt. Ltd', d: 'Jan 2025 — Present', b: 'Built and maintained enterprise-scale applications — HRMS, MDM, Smart EPP, Intranet and e-commerce — in React, Next.js, Node.js and TypeScript. Led the Intranet build end to end.' },
  { r: 'Frontend Developer (Freelance)', c: 'Zipid, Remote', d: 'Sep 2024 — Dec 2024', b: 'Built roughly 70% of the frontend in Next.js and TypeScript, converting complex Form I-9 compliance workflows into intuitive UI components.' },
  { r: 'MERN Stack Developer', c: 'Travelfika, Salem', d: 'Nov 2023 — Dec 2024', b: 'Built a content-driven blog platform with Next.js and Contentful CMS, migrated it from React to Next.js for SEO and performance, and shipped country-based configurations for international users.' },
  { r: 'Full Stack Developer Intern', c: 'G2 Technology Solutions Pvt. Ltd', d: 'Jan 2023 — Sep 2023', b: 'Trained in HTML, CSS, JavaScript, TypeScript and MySQL. Built static and dynamic web pages and fixed production bugs.' },
];

export default function AboutPage() {
  return (
    <>
      <header className="cs-hero">
        <div className="wrap">
          <Reveal as="h1" className="h1" style={{ maxWidth: '14ch' }}>
            How I <span className="em" style={{ color: 'var(--fg-2)' }}>actually</span> work
          </Reveal>
          <Reveal as="p" className="lead cs-sub" i={1}>
            Four things I&apos;ve learned from two years of shipping production Next.js and Node.js
            applications, each learned on a real project rather than read in a book.
          </Reveal>
        </div>
      </header>

      <section className="sect">
        <div className="wrap">
          <div className="stack-8">
            {BELIEFS.map((b, i) => (
              <Reveal className="grid-2" i={i} key={b.n}>
                <div>
                  <span className="dec-n">{b.n}</span>
                  <h3 className="h3" style={{ maxWidth: '18ch' }}>{b.t}</h3>
                </div>
                <p className="body">{b.b}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <div className="grid-2">
            <Reveal className="stack-4">
              <p className="eyebrow">Background</p>
              <h2 className="h2" style={{ maxWidth: '14ch' }}>Short version</h2>
            </Reveal>
            <Reveal className="stack-6" i={1}>
              {HISTORY.map((j) => (
                <div key={j.r}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', alignItems: 'baseline' }}>
                    <p className="h4">{j.r}</p>
                    <p className="small mono" style={{ fontSize: '.72rem', color: 'var(--fg-4)' }}>{j.d}</p>
                  </div>
                  <p className="small" style={{ color: 'var(--ac)', marginTop: 2 }}>{j.c}</p>
                  <p className="body" style={{ fontSize: '.92rem', marginTop: 9 }}>{j.b}</p>
                </div>
              ))}
              <div className="callout">
                <strong>Education —</strong> Bachelor of Computer Applications (BCA), Nehru Arts and Science College, Coimbatore (2020 — 2023), CGPA 8.0.
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap center">
          <Reveal as="h2" className="h2" style={{ maxWidth: '20ch', marginInline: 'auto' }}>
            Looking for someone to own an ambiguous, complicated surface?
          </Reveal>
          <Reveal className="hero-actions" i={1} style={{ justifyContent: 'center', marginTop: 32 }}>
            <Link href="/contact" className="btn btn-p">Get in touch <ArrowRight /></Link>
          </Reveal>
        </div>
      </section>
    </>
  );
}
