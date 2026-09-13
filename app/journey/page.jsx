import Reveal from '../../components/Reveal';
import CsFacts from '../../components/ui/CsFacts';
import TimelineItem from '../../components/journey/TimelineItem';
import { JOURNEY } from '../../lib/journey';

export const metadata = { title: 'Journey' };

export default function JourneyPage() {
  const total = JOURNEY.reduce((s, j) => s + j.products.length, 0);

  const facts = [
    { b: 'Jan 2023', s: 'First role — full stack intern' },
    { b: '4 companies', s: 'Intern → freelance → full-time' },
    { b: `${total} projects`, s: 'Shipped or contributed to end to end' },
    { b: '5 case studies', s: 'Documented in depth' },
  ];

  return (
    <>
      <header className="cs-hero">
        <div className="wrap">
          <Reveal as="p" className="eyebrow" style={{ marginBottom: 20 }}>The full record</Reveal>
          <Reveal as="h1" className="h1" i={1} style={{ maxWidth: '15ch' }}>
            Everything I&apos;ve shipped, <span className="em" style={{ color: 'var(--fg-2)' }}>in order</span>
          </Reveal>
          <Reveal as="p" className="lead cs-sub" i={2}>
            Four companies, 2+ years, one stack that keeps showing up: React, Next.js, Node.js and
            TypeScript. The five case studies are the ones worth your time — this page is the complete record.
          </Reveal>
          <CsFacts facts={facts} i={3} />
        </div>
      </header>

      <section className="sect">
        <div className="wrap">
          <div className="tl">
            {JOURNEY.map((job, i) => (
              <TimelineItem job={job} i={i} isNow={i === 0} key={job.co} />
            ))}
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <div className="grid-2">
            <Reveal>
              <p className="eyebrow" style={{ marginBottom: 14 }}>What the trajectory shows</p>
              <h2 className="h2" style={{ maxWidth: '16ch' }}>Scope grew with each move</h2>
            </Reveal>
            <Reveal className="stack-4" i={1}>
              <p className="body">
                An internship taught me the fundamentals. Freelance and contract work taught me to ship
                without a safety net — no one else was going to catch a mistake before a client saw it.
                At Brilyant, that turned into leading a build end to end and working across the frontend
                and backend of the same feature.
              </p>
              <p className="body">
                <span className="hl">What I want next is more depth on fewer surfaces</span> — a team where I
                can go deeper on architecture and performance, alongside engineers who push my code further
                than working solo ever did.
              </p>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
