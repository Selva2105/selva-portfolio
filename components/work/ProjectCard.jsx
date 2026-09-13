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

export default function ProjectCard({ project, i }) {
  return (
    <Reveal href={`/work/${project.slug}`} className="wcard" i={Math.min(i, 2)} onPointerMove={onPointerMove}>
      <div className="wcard-body">
        <div className="wcard-meta">
          <span className="work-idx">{project.idx}</span>
          {project.tags.map((t) => (
            <span className="work-tag" key={t}>{t}</span>
          ))}
        </div>
        <h3 className="wcard-t">
          {project.title}
          <span className="em">{project.titleEm}</span>
        </h3>
        <p className="wcard-d">{project.short}</p>
        <div className="wcard-stats">
          {project.stats.map((s) => (
            <div className="work-stat" key={s.l}>
              <b>{s.n}</b>
              <span>{s.l}</span>
            </div>
          ))}
        </div>
        <span className="wcard-go">
          Read the case study <ArrowRight />
        </span>
      </div>
      <div className="wcard-viz">
        <ProjectViz slug={project.slug} />
      </div>
    </Reveal>
  );
}
