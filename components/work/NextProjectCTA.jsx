import Reveal from '../Reveal';
import { getNextProject } from '../../lib/projects';
import { ArrowRight } from '../icons';

export default function NextProjectCTA({ currentSlug }) {
  const next = getNextProject(currentSlug);
  return (
    <section className="next">
      <div className="wrap">
        <Reveal href={`/work/${next.slug}`}>
          <p className="eyebrow" style={{ marginBottom: 16 }}>Next case study</p>
          <h2 className="h2">
            {next.title} — <span className="em" style={{ color: 'var(--fg-2)' }}>{next.titleEm}</span>
          </h2>
          <span className="work-go" style={{ marginTop: 20 }}>
            Read the case study <ArrowRight />
          </span>
        </Reveal>
      </div>
    </section>
  );
}
