const CELL_STATE = Array.from({ length: 21 }, (_, i) => {
  const sel = [11, 14].includes(i);
  const sw = [12, 13].includes(i);
  return {
    fill: sel ? 'var(--ac)' : sw ? 'var(--warn-fade)' : 'var(--t2)',
    stroke: sel ? 'var(--ac)' : sw ? 'var(--warn)' : 'var(--t4)',
  };
});

function HrmsViz() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="400" height="300" fill="var(--bg-2)" />
      <g opacity=".9">
        <rect x="32" y="34" width="120" height="9" rx="4.5" fill="var(--fg)" opacity=".82" />
        <rect x="32" y="52" width="70" height="7" rx="3.5" fill="var(--fg-3)" />
      </g>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} x={32 + i * 36} y="88" width="26" height="12" rx="3" fill="var(--fg-4)" opacity=".5" />
      ))}
      {CELL_STATE.map((c, i) => {
        const r = Math.floor(i / 7);
        const col = i % 7;
        return <rect key={i} x={32 + col * 36} y={110 + r * 36} width="28" height="28" rx="6" fill={c.fill} stroke={c.stroke} />;
      })}
      <rect x="290" y="110" width="78" height="100" rx="10" fill="var(--bg-3)" stroke="var(--t4)" />
      <text x="302" y="146" fontFamily="Inter,sans-serif" fontSize="30" fontWeight="600" fill="var(--warn)">4</text>
      <rect x="302" y="158" width="54" height="6" rx="3" fill="var(--fg-4)" />
      <rect x="302" y="170" width="38" height="6" rx="3" fill="var(--fg-4)" opacity=".6" />
      <rect x="32" y="236" width="336" height="34" rx="8" fill="var(--warn-bg)" stroke="var(--warn)" strokeOpacity=".55" />
      <circle cx="52" cy="253" r="5" fill="var(--warn)" />
      <rect x="66" y="248" width="180" height="6" rx="3" fill="var(--warn)" opacity=".75" />
      <rect x="66" y="258" width="118" height="5" rx="2.5" fill="var(--warn)" opacity=".4" />
    </svg>
  );
}

function MdmViz() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="400" height="300" fill="var(--bg-2)" />
      {['Android', 'Windows', 'Apple'].map((n, i) => (
        <g key={n}>
          <rect x="32" y={34 + i * 30} width={i === 0 ? 300 : i === 1 ? 272 : 316} height="14" rx="7" fill="var(--t3)" />
          <rect x="32" y={34 + i * 30} width={i === 0 ? 282 : i === 1 ? 240 : 305} height="14" rx="7" fill="var(--ok)" opacity={i === 1 ? 0.55 : 0.8} />
          <text x="342" y={45 + i * 30} fontFamily="JetBrains Mono,monospace" fontSize="9" fill="var(--fg-2)">{[94, 88, 96][i]}%</text>
        </g>
      ))}
      <rect x="32" y="140" width="336" height="1" fill="var(--t4)" />
      {Array.from({ length: 5 }, (_, i) => {
        const widths = [130, 150, 112, 168, 138];
        const states = [[1, 1, 1], [1, 0, 0], [0, 1, 0], [1, 1, 1], [1, 0, 1]][i];
        return (
          <g key={i}>
            <rect x="32" y={158 + i * 24} width={widths[i]} height="7" rx="3.5" fill="var(--fg-3)" opacity=".85" />
            {[0, 1, 2].map((j) => {
              const on = states[j];
              return (
                <rect
                  key={j}
                  x={268 + j * 32}
                  y={153 + i * 24}
                  width="17"
                  height="17"
                  rx="4.5"
                  fill={on ? 'rgba(62,207,142,.14)' : 'transparent'}
                  stroke={on ? 'var(--ok)' : 'var(--t4)'}
                />
              );
            })}
          </g>
        );
      })}
      <rect x="32" y="282" width="336" height="1" fill="var(--t4)" />
    </svg>
  );
}

function IntranetViz() {
  const rows = [
    ['var(--danger)', 178, 0.14],
    ['var(--warn)', 150, 0.10],
    ['var(--warn)', 196, 0.10],
    ['var(--ok)', 132, 0.08],
    ['var(--ok)', 168, 0.08],
  ];
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="400" height="300" fill="var(--bg-2)" />
      <rect x="32" y="30" width="96" height="9" rx="4.5" fill="var(--fg)" opacity=".82" />
      <rect x="32" y="48" width="58" height="7" rx="3.5" fill="var(--fg-3)" />
      <g>
        <circle cx="330" cy="52" r="24" fill="none" stroke="var(--t4)" strokeWidth="5" />
        <circle cx="330" cy="52" r="24" fill="none" stroke="var(--danger)" strokeWidth="5" strokeLinecap="round" strokeDasharray="150.8" strokeDashoffset="122" transform="rotate(-90 330 52)" />
        <text x="330" y="57" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="13" fontWeight="500" fill="var(--danger)">8m</text>
      </g>
      {rows.map(([c, w, o], i) => (
        <g key={i}>
          <rect x="32" y={88 + i * 38} width="336" height="30" rx="7" fill={c} opacity={o} />
          <rect x="32" y={88 + i * 38} width="3" height="30" rx="1.5" fill={c} />
          <rect x="46" y={98 + i * 38} width={w} height="7" rx="3.5" fill="var(--fg-2)" opacity=".7" />
          <rect x={46 + w + 12} y={99 + i * 38} width="26" height="6" rx="3" fill="var(--fg-4)" />
          <rect x="316" y={98 + i * 38} width="38" height="8" rx="4" fill={c} opacity=".65" />
        </g>
      ))}
    </svg>
  );
}

function CareersPortalViz() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="400" height="300" fill="var(--bg-2)" />
      <rect x="32" y="28" width="104" height="9" rx="4.5" fill="var(--fg)" opacity=".82" />
      <rect x="32" y="46" width="62" height="7" rx="3.5" fill="var(--fg-3)" />
      <g>
        <circle cx="332" cy="48" r="22" fill="none" stroke="var(--t4)" strokeWidth="5" />
        <circle cx="332" cy="48" r="22" fill="none" stroke="var(--ok)" strokeWidth="5" strokeLinecap="round" strokeDasharray="138.2" strokeDashoffset="34" transform="rotate(-90 332 48)" />
        <text x="332" y="53" textAnchor="middle" fontFamily="JetBrains Mono,monospace" fontSize="12" fontWeight="500" fill="var(--ok)">75%</text>
      </g>
      {[0, 1, 2, 3].map((g) => {
        const widths = [62, 52, 60, 66];
        return (
          <g key={g}>
            <rect x="32" y={84 + g * 52} width={widths[g]} height="7" rx="3.5" fill="var(--ac)" opacity=".7" />
            {[0, 1, 2, 3, 4].map((i) => {
              const on = !(g === 1 && i > 2) && !(g === 3 && i > 1);
              const flag = (g === 1 && i === 0) || (g === 2 && i === 3);
              const c = flag ? 'var(--warn)' : on ? 'var(--ok)' : 'var(--fg-4)';
              return (
                <g key={i}>
                  <rect x={32 + i * 68} y={98 + g * 52} width="58" height="26" rx="6" fill={c} opacity={on ? 0.13 : 0.05} stroke={c} strokeOpacity={on ? 0.5 : 0.22} />
                  <circle cx={44 + i * 68} cy={111 + g * 52} r="4" fill={c} opacity={on ? 1 : 0.35} />
                  <rect x={54 + i * 68} y={108 + g * 52} width={26 + ((i * 7 + g * 5) % 12)} height="5" rx="2.5" fill="var(--fg-3)" opacity=".6" />
                </g>
              );
            })}
          </g>
        );
      })}
    </svg>
  );
}

function ExpenseTrackerViz() {
  return (
    <svg viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
      <rect width="400" height="300" fill="var(--bg-2)" />
      <rect x="32" y="32" width="110" height="9" rx="4.5" fill="var(--fg)" opacity=".82" />
      <rect x="32" y="50" width="64" height="7" rx="3.5" fill="var(--fg-3)" />
      {Array.from({ length: 26 }, (_, i) => {
        const h = Math.min(120, 6 + Math.pow(i, 1.62) * 0.92);
        const fut = i > 18;
        return <rect key={i} x={32 + i * 13} y={212 - h} width="9" height={h} rx="2" fill={fut ? 'var(--t3)' : 'url(#expense-grad)'} />;
      })}
      <defs>
        <linearGradient id="expense-grad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="var(--ac)" />
          <stop offset="1" stopColor="var(--ac)" stopOpacity=".22" />
        </linearGradient>
      </defs>
      <rect x="32" y="212" width="336" height="1" fill="var(--t4)" />
      {[0, 1, 2].map((i) => {
        const w1 = [30, 24, 34][i];
        const w2 = [52, 44, 58][i];
        return (
          <g key={i}>
            <rect x={32 + i * 114} y="238" width="98" height="40" rx="8" fill="var(--bg-3)" stroke="var(--t4)" />
            <rect x={44 + i * 114} y="250" width={w1} height="9" rx="4.5" fill="var(--fg)" opacity=".8" />
            <rect x={44 + i * 114} y="264" width={w2} height="6" rx="3" fill="var(--fg-4)" />
          </g>
        );
      })}
    </svg>
  );
}

const VIZ_BY_SLUG = {
  hrms: HrmsViz,
  mdm: MdmViz,
  intranet: IntranetViz,
  'careers-portal': CareersPortalViz,
  'expense-tracker': ExpenseTrackerViz,
};

export default function ProjectViz({ slug }) {
  const Viz = VIZ_BY_SLUG[slug];
  return Viz ? <Viz /> : null;
}
