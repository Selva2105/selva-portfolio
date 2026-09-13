import Reveal from '../Reveal';

export function Decision({ label, title, children }) {
  return (
    <Reveal className="dec">
      <span className="dec-n">{label}</span>
      <h3 className="h3 dec-t">{title}</h3>
      {children}
    </Reveal>
  );
}

export function Beats({ items }) {
  return (
    <div className="beats">
      {items.map((it) => (
        <div className={`beat ${it.kind}`} key={it.lbl}>
          <span className="lbl">{it.lbl}</span>
          <p dangerouslySetInnerHTML={{ __html: it.body }} />
        </div>
      ))}
    </div>
  );
}

export function Note({ label, children, style }) {
  return (
    <div className="note" style={style}>
      <span className="lbl">{label}</span>
      <p dangerouslySetInnerHTML={{ __html: children }} />
    </div>
  );
}
