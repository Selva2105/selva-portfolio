import Link from 'next/link';
import Reveal from '../Reveal';
import CsFacts from '../ui/CsFacts';
import RoleNote from '../ui/RoleNote';
import NdaNote from '../ui/NdaNote';
import { ArrowLeft } from '../icons';

export default function CaseStudyHeader({ num, kicker, title, titleEm, lead, facts, role, showNda = true }) {
  return (
    <header className="cs-hero">
      <div className="wrap">
        <Link href="/work" className="cs-back"><ArrowLeft /> All case studies</Link>
        <Reveal as="p" className="eyebrow" style={{ marginBottom: 20 }}>
          <span className="n">{num}</span> &nbsp;—&nbsp; {kicker}
        </Reveal>
        <Reveal as="h1" className="h1 cs-title" i={1}>
          {title} — <span className="em" style={{ color: 'var(--fg-2)' }}>{titleEm}</span>
        </Reveal>
        <Reveal as="p" className="lead cs-sub" i={2}>{lead}</Reveal>
        <CsFacts facts={facts} i={3} />
        {role && <RoleNote a={role.a} b={role.b} roles={role.roles} />}
        {showNda && <Reveal i={4}><NdaNote /></Reveal>}
      </div>
    </header>
  );
}
