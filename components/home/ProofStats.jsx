import Reveal from '../Reveal';

const STATS = [
  { n: '2+ yrs', l: 'professional full stack experience' },
  { n: '6+', l: 'production platforms shipped or contributed to' },
  { n: 'Next.js', l: 'React, Node.js and TypeScript across the stack' },
  { n: '1,000+', l: 'employees using systems I built, daily' },
];

export default function ProofStats() {
  return (
    <section style={{ paddingTop: 'clamp(8px,1.5vw,20px)' }}>
      <div className="wrap">
        <div className="proof">
          {STATS.map((s, i) => (
            <Reveal className="proof-i" i={i} key={s.l}>
              <p className="proof-n">{s.n}</p>
              <p className="proof-l">{s.l}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
