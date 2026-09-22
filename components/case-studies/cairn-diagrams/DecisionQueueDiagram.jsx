export default function DecisionQueueDiagram() {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)', padding: '18px 16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: '.68rem', fontFamily: 'var(--mono)', color: 'var(--ac)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
          Architecture · Queue Topology
        </span>
        <span style={{ fontSize: '.68rem', fontFamily: 'var(--mono)', color: 'var(--ok)', background: 'var(--ok-bg)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--ok-line)' }}>
          BullMQ + Redis
        </span>
      </div>

      <svg viewBox="0 0 440 230" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Background Grid Pattern */}
        <pattern id="q-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
          <circle cx="2" cy="2" r="1" fill="var(--t4)" />
        </pattern>
        <rect width="440" height="230" rx="8" fill="url(#q-dots)" opacity=".6" />

        {/* 1. Ingestion Triggers (width: 104px) */}
        <g transform="translate(10, 18)">
          <rect width="104" height="184" rx="8" fill="var(--bg-3)" stroke="var(--line-2)" />
          <text x="52" y="22" textAnchor="middle" fontFamily="var(--mono)" fontSize="7.8" fontWeight="600" fill="var(--fg-3)" letterSpacing="0.04em">INGESTION</text>

          <g transform="translate(8, 36)">
            <rect width="88" height="38" rx="5" fill="var(--bg-1)" stroke="var(--line)" />
            <text x="44" y="17" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" fill="var(--fg)">03:00 UTC</text>
            <text x="44" y="29" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.5" fill="var(--fg-4)">Cron Pulse</text>
          </g>

          <g transform="translate(8, 84)">
            <rect width="88" height="38" rx="5" fill="var(--bg-1)" stroke="var(--line)" />
            <text x="44" y="17" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" fill="var(--fg)">Doc Upload</text>
            <text x="44" y="29" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.5" fill="var(--fg-4)">Vault Intake</text>
          </g>

          <g transform="translate(8, 132)">
            <rect width="88" height="38" rx="5" fill="var(--bg-1)" stroke="var(--line)" />
            <text x="44" y="17" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" fill="var(--fg)">Inbound Bot</text>
            <text x="44" y="29" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.5" fill="var(--fg-4)">WhatsApp API</text>
          </g>
        </g>

        {/* Connection Arrows 1 */}
        <path d="M114 55 L150 88" stroke="var(--ac)" strokeWidth="1.5" strokeDasharray="3 3" opacity=".7" />
        <path d="M114 103 L150 103" stroke="var(--ac)" strokeWidth="1.5" />
        <path d="M114 151 L150 118" stroke="var(--ac)" strokeWidth="1.5" strokeDasharray="3 3" opacity=".7" />

        {/* 2. Redis BullMQ Queue (width: 144px) */}
        <g transform="translate(150, 24)">
          <rect width="144" height="172" rx="8" fill="var(--bg-1)" stroke="var(--ac-line)" strokeWidth="1.2" />
          <rect x="8" y="8" width="128" height="20" rx="4" fill="var(--ac-bg)" />
          <circle cx="20" cy="18" r="3.5" fill="var(--ac)" />
          <text x="74" y="22" textAnchor="middle" fontFamily="var(--mono)" fontSize="7.8" fontWeight="600" fill="var(--ac)">BULLMQ REDIS QUEUE</text>

          {/* Queue Stack items */}
          <g transform="translate(8, 38)">
            <rect width="128" height="26" rx="4" fill="var(--bg-3)" stroke="var(--line)" />
            <circle cx="14" cy="13" r="2.5" fill="var(--ok)" />
            <text x="24" y="16" fontFamily="var(--mono)" fontSize="7.2" fill="var(--fg-2)">active: eval_doc</text>
          </g>

          <g transform="translate(8, 70)">
            <rect width="128" height="26" rx="4" fill="var(--bg-3)" stroke="var(--line)" />
            <circle cx="14" cy="13" r="2.5" fill="var(--warn)" />
            <text x="24" y="16" fontFamily="var(--mono)" fontSize="7.2" fill="var(--fg-2)">delay: 14d_window</text>
          </g>

          <g transform="translate(8, 102)">
            <rect width="128" height="26" rx="4" fill="var(--bg-3)" stroke="var(--line)" />
            <circle cx="14" cy="13" r="2.5" fill="var(--fg-4)" />
            <text x="24" y="16" fontFamily="var(--mono)" fontSize="7.2" fill="var(--fg-4)">wait: bill_reminder</text>
          </g>

          <g transform="translate(8, 134)">
            <rect width="128" height="26" rx="4" fill="var(--danger-bg)" stroke="var(--danger)" strokeOpacity=".4" />
            <circle cx="14" cy="13" r="2.5" fill="var(--danger)" />
            <text x="24" y="16" fontFamily="var(--mono)" fontSize="7.2" fill="var(--danger)">retry backoff (3x)</text>
          </g>
        </g>

        {/* Connection Arrows 2 */}
        <path d="M294 65 L328 52" stroke="var(--ok)" strokeWidth="1.5" />
        <path d="M294 110 L328 110" stroke="var(--ok)" strokeWidth="1.5" />
        <path d="M294 155 L328 168" stroke="var(--ok)" strokeWidth="1.5" />

        {/* 3. Dedicated Workers (width: 104px) */}
        <g transform="translate(328, 18)">
          <rect width="104" height="184" rx="8" fill="var(--bg-3)" stroke="var(--line-2)" />
          <text x="52" y="22" textAnchor="middle" fontFamily="var(--mono)" fontSize="7.8" fontWeight="600" fill="var(--fg-3)" letterSpacing="0.04em">WORKERS</text>

          <g transform="translate(8, 36)">
            <rect width="88" height="38" rx="5" fill="var(--bg-1)" stroke="var(--ok-line)" />
            <text x="44" y="17" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" fill="var(--fg)">Rule Evaluator</text>
            <text x="44" y="29" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.5" fill="var(--ok)">concurrency: 5</text>
          </g>

          <g transform="translate(8, 84)">
            <rect width="88" height="38" rx="5" fill="var(--bg-1)" stroke="var(--ok-line)" />
            <text x="44" y="17" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" fill="var(--fg)">WhatsApp Bot</text>
            <text x="44" y="29" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.5" fill="var(--ok)">rate-limited</text>
          </g>

          <g transform="translate(8, 132)">
            <rect width="88" height="38" rx="5" fill="var(--bg-1)" stroke="var(--ok-line)" />
            <text x="44" y="17" textAnchor="middle" fontFamily="sans-serif" fontSize="7.5" fontWeight="600" fill="var(--fg)">Digest Mailer</text>
            <text x="44" y="29" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.5" fill="var(--ok)">SMTP batcher</text>
          </g>
        </g>
      </svg>
      <p style={{ margin: '8px 0 0', fontSize: '.7rem', color: 'var(--fg-4)', textAlign: 'center', fontFamily: 'var(--mono)' }}>
        Redis queues decouple background cron loops from external delivery endpoints.
      </p>
    </div>
  );
}
