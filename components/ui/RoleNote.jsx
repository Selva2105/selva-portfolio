import Reveal from '../Reveal';
import RichText from './RichText';

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
        <p><RichText>{a}</RichText></p>
        <p><RichText>{b}</RichText></p>
      </div>
    </Reveal>
  );
}
