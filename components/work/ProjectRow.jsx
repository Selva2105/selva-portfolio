'use client';

import Reveal from '../Reveal';
import ProjectViz from './ProjectViz';
import { ArrowRight } from '../icons';

function onPointerMove(e) {
  const el = e.currentTarget;
  const r = el.getBoundingClientRect();
  el.style.setProperty('--mx', `${e.clientX - r.left}px`);
  el.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export default function ProjectRow({ project, i }) {
  return (
    <Reveal href={`/work/${project.slug}`} className="wrow" i={i} onPointerMove={onPointerMove}>
      <div className="wcard-body">
        <div className="wcard-meta">
          <span className="work-idx">{project.idx}</span>
          {project.tags.map((t) => (
            <span className="work-tag" key={t}>{t}</span>
          ))}
        </div>
        <h2 className="wrow-t">
          {project.title} — <span className="em">{project.titleEm}</span>
        </h2>
        <p className="body" style={{ maxWidth: '46ch', fontSize: '.95rem' }}>{project.desc}</p>
        <div className="wcard-stats" style={{ borderTop: 0, paddingTop: 0, marginTop: 22, gap: 26 }}>
          {project.stats.map((s) => (
            <div className="work-stat" key={s.l}>
              <b>{s.n}</b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
        <span className="work-go">
          Read the case study <ArrowRight />
        </span>
      </div>
      <div className="wrow-viz">
        <ProjectViz slug={project.slug} />
      </div>
    </Reveal>
  );
}
