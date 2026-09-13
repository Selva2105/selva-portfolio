import Reveal from '../Reveal';

export default function CsFacts({ facts, i }) {
  return (
    <Reveal className="cs-facts" i={i}>
      {facts.map((f) => (
        <div className="cs-fact" key={f.b}>
          <b>{f.b}</b>
          <span>{f.s}</span>
        </div>
      ))}
    </Reveal>
  );
}
