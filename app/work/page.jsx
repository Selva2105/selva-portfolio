import Link from 'next/link';
import Reveal from '../../components/Reveal';
import ProjectRow from '../../components/work/ProjectRow';
import { PROJECTS } from '../../lib/projects';
import { ArrowRight } from '../../components/icons';

export const metadata = { title: 'Work' };

export default function WorkPage() {
  return (
    <>
      <header className="cs-hero">
        <div className="wrap">
          <Reveal as="p" className="eyebrow" style={{ marginBottom: 20 }}>Case studies</Reveal>
          <Reveal as="h1" className="h1" i={1} style={{ maxWidth: '15ch' }}>
            Six builds, <span className="em" style={{ color: 'var(--fg-2)' }}>one thread</span>
          </Reveal>
          <Reveal as="p" className="lead cs-sub" i={2}>
            Every project here is the same job in different clothing: enterprise systems that have to
            stay usable for people who are not developers. HR admins aren&apos;t engineers. IT managers
            aren&apos;t frontend specialists. I build the interface and the API underneath it.
          </Reveal>
        </div>
      </header>

      <section className="sect" style={{ paddingTop: 'clamp(40px,6vw,72px)' }}>
        <div className="wrap">
          <div className="wstack">
            {PROJECTS.map((p, i) => (
              <ProjectRow project={p} i={i} key={p.slug} />
            ))}
          </div>

          <Reveal style={{ marginTop: 'clamp(32px,4vw,52px)' }}>
            <div className="callout" style={{ display: 'flex', gap: 16, alignItems: 'flex-start', flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <span style={{ maxWidth: '52ch' }}>
                <strong>More in progress.</strong> Six case studies are written to the depth I think they deserve.
                The rest of what I&apos;ve shipped — across four companies — is on the journey page, and some of it
                will graduate to a full write-up over time.
              </span>
              <Link href="/journey" className="work-go" style={{ margin: 0 }}>See the full journey <ArrowRight /></Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
