import Reveal from '../Reveal';

export default function SectionHead({ num, label, title, body }) {
  return (
    <Reveal className="sh">
      <p className="eyebrow">
        <span className="n">{num}</span> &nbsp;—&nbsp; {label}
      </p>
      <h2 className="h2" style={{ maxWidth: '20ch' }}>{title}</h2>
      {body && <p className="lead read" style={{ marginTop: 6 }}>{body}</p>}
    </Reveal>
  );
}
