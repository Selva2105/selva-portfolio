import Reveal from '../Reveal';

export default function RoleNote({ a, b, roles = ['Full Stack Developer'] }) {
  return (
    <Reveal className="rolebox">
      <div className="rolebox-tag">
        {roles.map((r, i) => (
          <span key={r} style={{ display: 'contents' }}>
            {i > 0 && <span className="rolebox-plus">+</span>}
            <span className="rolebox-chip">{r}</span>
          </span>
        ))}
      </div>
      <div className="rolebox-body">
        <p dangerouslySetInnerHTML={{ __html: a }} />
        <p dangerouslySetInnerHTML={{ __html: b }} />
      </div>
    </Reveal>
  );
}
