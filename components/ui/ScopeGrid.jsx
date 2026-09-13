import Reveal from '../Reveal';

export default function ScopeGrid({ items }) {
  return (
    <Reveal className="scope">
      {items.map((s) => (
        <div className="scope-i" key={s.t}>
          <b>{s.t}</b>
          <span>{s.d}</span>
          {s.c && <em className="scope-co">{s.c}</em>}
        </div>
      ))}
    </Reveal>
  );
}
