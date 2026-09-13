import Reveal from '../Reveal';

export default function ReflectionGrid({ items }) {
  return (
    <div className="grid-2">
      {items.map((r, i) => (
        <Reveal i={i} key={r.t}>
          <h4 className="h4" style={{ marginBottom: 12 }}>{r.t}</h4>
          <p className="body" style={{ fontSize: '.94rem' }} dangerouslySetInnerHTML={{ __html: r.b }} />
        </Reveal>
      ))}
    </div>
  );
}
