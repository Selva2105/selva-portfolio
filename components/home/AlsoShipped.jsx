import Link from 'next/link';
import Reveal from '../Reveal';
import { ALSO_SHIPPED } from '../../lib/projects';
import { ArrowRight } from '../icons';

export default function AlsoShipped() {
  return (
    <section className="sect" style={{ paddingTop: '0px!important' }}>
      <div className="wrap">
        <div className="also-head">
          <Reveal className="stack-4">
            <p className="eyebrow">Also shipped</p>
            <h2 className="h3" style={{ maxWidth: '22ch' }}>Enterprise HR, e-commerce, content platforms and internal tools</h2>
          </Reveal>
          <Reveal className="stack-4" i={1}>
            <p className="body" style={{ maxWidth: '46ch' }}>
              These didn&apos;t earn a full case study — either the scope was smaller, or the work was
              shared across a bigger team. Breadth is context, not the argument.{' '}
              <span className="hl">The six above are where the depth is.</span>
            </p>
            <Link href="/journey" className="work-go" style={{ marginTop: 2 }}>See the full journey <ArrowRight /></Link>
          </Reveal>
        </div>
        <div className="also-grid">
          <Reveal className="scope" i={1}>
            {ALSO_SHIPPED.map((s) => (
              <div className="scope-i" key={s.t}>
                <b>{s.t}</b>
                <span>{s.d}</span>
                <em className="scope-co">{s.c}</em>
              </div>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
