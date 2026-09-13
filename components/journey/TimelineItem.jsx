import Link from 'next/link';
import Reveal from '../Reveal';

export default function TimelineItem({ job, i, isNow }) {
  return (
    <Reveal className="tl-item" i={Math.min(i, 3)}>
      <div className="tl-marker"><span className={`tl-dot${isNow ? ' now' : ''}`} /></div>
      <div className="tl-body">
        <div className="tl-head">
          <div>
            {job.era && <span className="tl-era">{job.era}</span>}
            <h2 className="h3" style={{ marginBottom: 4 }}>{job.co}</h2>
            <p className="small" style={{ color: 'var(--ac)' }}>{job.role}</p>
          </div>
          <div className="tl-meta">
            <p className="small mono" style={{ fontSize: '.72rem', color: 'var(--fg-3)' }}>{job.date}</p>
            <p className="small mono" style={{ fontSize: '.72rem', color: 'var(--fg-4)' }}>{job.loc}</p>
          </div>
        </div>
        <p className="body" style={{ fontSize: '.94rem', marginTop: 14, maxWidth: '56ch' }}>{job.note}</p>
        <div className={`tl-products${job.early ? ' early' : ''}`}>
          {job.products.map((p) =>
            p.cs ? (
              <Link href={`/work/${p.cs}`} className="tl-p linked" key={p.n}>
                <b>{p.n} <span className="tl-badge">Case study</span></b>
                <span>{p.d}</span>
              </Link>
            ) : (
              <div className="tl-p" key={p.n}>
                <b>{p.n}</b>
                <span>{p.d}</span>
              </div>
            )
          )}
        </div>
      </div>
    </Reveal>
  );
}
