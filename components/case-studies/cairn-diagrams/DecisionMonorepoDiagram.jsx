export default function DecisionMonorepoDiagram() {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)', padding: '18px 16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: '.68rem', fontFamily: 'var(--mono)', color: 'var(--ac)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
          Architecture · Monorepo Graph
        </span>
        <span style={{ fontSize: '.68rem', fontFamily: 'var(--mono)', color: 'var(--blue)', background: 'rgba(91,141,239,.1)', padding: '2px 6px', borderRadius: 4, border: '1px solid rgba(91,141,239,.3)' }}>
          Nx Workspace
        </span>
      </div>

      <svg viewBox="0 0 440 230" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Core Shared Libraries at Top */}
        <g transform="translate(20, 12)">
          <rect width="400" height="52" rx="8" fill="var(--bg-1)" stroke="var(--ac-line)" strokeWidth="1.2" />
          <rect x="8" y="8" width="80" height="15" rx="3" fill="var(--ac-bg)" />
          <text x="48" y="19" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.8" fontWeight="600" fill="var(--ac)">SHARED CORE</text>
          <text x="140" y="19" fontFamily="sans-serif" fontSize="7.8" fontWeight="600" fill="var(--fg)">libs/contracts · libs/domain · prisma</text>

          <g transform="translate(10, 28)">
            <rect width="118" height="16" rx="3" fill="var(--bg-3)" stroke="var(--line)" />
            <text x="59" y="11" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.4" fill="var(--fg-3)">Zod Schemas</text>
          </g>
          <g transform="translate(136, 28)">
            <rect width="128" height="16" rx="3" fill="var(--bg-3)" stroke="var(--line)" />
            <text x="64" y="11" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.4" fill="var(--fg-3)">Event Payloads</text>
          </g>
          <g transform="translate(272, 28)">
            <rect width="118" height="16" rx="3" fill="var(--bg-3)" stroke="var(--line)" />
            <text x="59" y="11" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.4" fill="var(--fg-3)">Prisma Models</text>
          </g>
        </g>

        {/* Connection Bus Lines */}
        <path d="M220 64 L220 84" stroke="var(--ac)" strokeWidth="1.5" />
        <path d="M62 84 L378 84" stroke="var(--ac)" strokeWidth="1.5" strokeDasharray="3 3" opacity=".7" />

        <path d="M62 84 L62 104" stroke="var(--ac)" strokeWidth="1.5" />
        <path d="M168 84 L168 104" stroke="var(--ac)" strokeWidth="1.5" />
        <path d="M272 84 L272 104" stroke="var(--ac)" strokeWidth="1.5" />
        <path d="M378 84 L378 104" stroke="var(--ac)" strokeWidth="1.5" />

        {/* 4 Application Nodes (widened to 94px so all text has ample margin) */}
        {/* Node 1: Web App */}
        <g transform="translate(16, 104)">
          <rect width="92" height="98" rx="7" fill="var(--bg-3)" stroke="var(--line-2)" />
          <rect x="6" y="8" width="80" height="18" rx="4" fill="var(--bg-1)" stroke="var(--line)" />
          <text x="46" y="20" textAnchor="middle" fontFamily="sans-serif" fontSize="7.8" fontWeight="600" fill="var(--fg)">apps/web</text>

          <text x="46" y="44" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.8" fill="var(--ac)">Next.js 14</text>
          <text x="46" y="56" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="var(--fg-3)">App Router</text>
          <text x="46" y="68" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="var(--fg-4)">Server Actions</text>
          <rect x="8" y="78" width="76" height="12" rx="3" fill="var(--bg-2)" />
          <text x="46" y="86" textAnchor="middle" fontFamily="var(--mono)" fontSize="5.8" fill="var(--ok)">UI Dashboard</text>
        </g>

        {/* Node 2: API App */}
        <g transform="translate(122, 104)">
          <rect width="92" height="98" rx="7" fill="var(--bg-3)" stroke="var(--line-2)" />
          <rect x="6" y="8" width="80" height="18" rx="4" fill="var(--bg-1)" stroke="var(--line)" />
          <text x="46" y="20" textAnchor="middle" fontFamily="sans-serif" fontSize="7.8" fontWeight="600" fill="var(--fg)">apps/api</text>

          <text x="46" y="44" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.8" fill="var(--danger)">NestJS API</text>
          <text x="46" y="56" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="var(--fg-3)">REST / Gateway</text>
          <text x="46" y="68" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="var(--fg-4)">Auth Guard</text>
          <rect x="8" y="78" width="76" height="12" rx="3" fill="var(--bg-2)" />
          <text x="46" y="86" textAnchor="middle" fontFamily="var(--mono)" fontSize="5.8" fill="var(--ok)">State Engine</text>
        </g>

        {/* Node 3: Worker App */}
        <g transform="translate(228, 104)">
          <rect width="92" height="98" rx="7" fill="var(--bg-3)" stroke="var(--line-2)" />
          <rect x="6" y="8" width="80" height="18" rx="4" fill="var(--bg-1)" stroke="var(--line)" />
          <text x="46" y="20" textAnchor="middle" fontFamily="sans-serif" fontSize="7.8" fontWeight="600" fill="var(--fg)">apps/worker</text>

          <text x="46" y="44" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.8" fill="var(--warn)">BullMQ Core</text>
          <text x="46" y="56" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="var(--fg-3)">Rule Processor</text>
          <text x="46" y="68" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="var(--fg-4)">Mailer Queue</text>
          <rect x="8" y="78" width="76" height="12" rx="3" fill="var(--bg-2)" />
          <text x="46" y="86" textAnchor="middle" fontFamily="var(--mono)" fontSize="5.8" fill="var(--ok)">03:00 Runner</text>
        </g>

        {/* Node 4: WhatsApp Bot */}
        <g transform="translate(334, 104)">
          <rect width="92" height="98" rx="7" fill="var(--bg-3)" stroke="var(--line-2)" />
          <rect x="6" y="8" width="80" height="18" rx="4" fill="var(--bg-1)" stroke="var(--line)" />
          <text x="46" y="20" textAnchor="middle" fontFamily="sans-serif" fontSize="7.8" fontWeight="600" fill="var(--fg)">apps/bot</text>

          <text x="46" y="44" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.8" fill="var(--ok)">WhatsApp Bot</text>
          <text x="46" y="56" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="var(--fg-3)">Inbound Hook</text>
          <text x="46" y="68" textAnchor="middle" fontFamily="sans-serif" fontSize="6.5" fill="var(--fg-4)">Receipt OCR</text>
          <rect x="8" y="78" width="76" height="12" rx="3" fill="var(--bg-2)" />
          <text x="46" y="86" textAnchor="middle" fontFamily="var(--mono)" fontSize="5.8" fill="var(--ok)">Live Bridge</text>
        </g>
      </svg>
      <p style={{ margin: '8px 0 0', fontSize: '.7rem', color: 'var(--fg-4)', textAlign: 'center', fontFamily: 'var(--mono)' }}>
        Zero schema drift: all four applications compile against identical types and Zod schemas.
      </p>
    </div>
  );
}
