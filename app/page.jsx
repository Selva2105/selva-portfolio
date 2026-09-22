import Link from 'next/link';
import Hero from '../components/home/Hero';
import ProofStats from '../components/home/ProofStats';
import AlsoShipped from '../components/home/AlsoShipped';
import ProjectCard from '../components/work/ProjectCard';
import Reveal from '../components/Reveal';
import { PROJECTS } from '../lib/projects';
import { ArrowRight } from '../components/icons';

export const metadata = {
  title: { absolute: 'Selvaganapathi Kanakaraj — Full Stack Developer' },
};

export default function Home() {
  return (
    <>
      <Hero />
      <ProofStats />

      <section className="sect">
        <div className="wrap">
          <Reveal className="sh">
            <p className="eyebrow">Selected work</p>
            <h2 className="h2" style={{ maxWidth: '18ch' }}>Six builds, one thread</h2>
            <p className="lead read" style={{ marginTop: 6 }}>
              Every project here is the same job in different clothing: enterprise systems that have to
              stay usable for people who are not developers. HR admins aren&apos;t engineers. IT managers
              aren&apos;t frontend specialists. I build the interface and the API underneath it.
            </p>
          </Reveal>

          <Reveal className="rail-head">
            <Link href="/work" className="work-go" style={{ margin: 0 }}>View all case studies <ArrowRight /></Link>
          </Reveal>

          <div className="wstack">
            {PROJECTS.map((p, i) => (
              <ProjectCard project={p} i={i} key={p.slug} />
            ))}
          </div>
        </div>
      </section>

      <AlsoShipped />
    </>
  );
}
