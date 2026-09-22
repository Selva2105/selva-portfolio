export default function DecisionMultiChannelDiagram() {
  return (
    <div style={{ background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)', padding: '18px 16px', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <span style={{ fontSize: '.68rem', fontFamily: 'var(--mono)', color: 'var(--ac)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
          Delivery · Channel Decision Matrix
        </span>
        <span style={{ fontSize: '.68rem', fontFamily: 'var(--mono)', color: 'var(--ok)', background: 'var(--ok-bg)', padding: '2px 6px', borderRadius: 4, border: '1px solid var(--ok-line)' }}>
          Multi-Channel Routing
        </span>
      </div>

      <svg viewBox="0 0 440 230" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: 'auto', display: 'block' }}>
        {/* Left: Input Signal (widened to 118px so text never overflows) */}
        <g transform="translate(10, 65)">
          <rect width="118" height="92" rx="8" fill="var(--bg-1)" stroke="var(--ac-line)" strokeWidth="1.2" />
          <rect x="8" y="8" width="102" height="15" rx="3" fill="var(--ac-bg)" />
          <text x="59" y="19" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.8" fontWeight="600" fill="var(--ac)">INGESTED SIGNAL</text>
          
          <text x="59" y="38" textAnchor="middle" fontFamily="sans-serif" fontSize="8.5" fontWeight="600" fill="var(--fg)">Household Event</text>
          <text x="59" y="50" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.8" fill="var(--fg-3)">TTL & Urgency Score</text>
          <text x="59" y="61" textAnchor="middle" fontFamily="var(--mono)" fontSize="6.5" fill="var(--fg-4)">Confidence: 94%</text>

          <rect x="8" y="69" width="102" height="15" rx="3" fill="var(--bg-3)" stroke="var(--line)" />
          <text x="59" y="80" textAnchor="middle" fontFamily="var(--mono)" fontSize="6" fill="var(--warn)">Rule Engine Evaluated</text>
        </g>

        {/* Branch Lines */}
        <path d="M128 88 C 148 88, 148 44, 168 44" stroke="var(--ok)" strokeWidth="1.5" />
        <path d="M128 111 L 168 111" stroke="var(--ac)" strokeWidth="1.5" />
        <path d="M128 134 C 148 134, 148 178, 168 178" stroke="var(--warn)" strokeWidth="1.5" />

        {/* Channel 1: WhatsApp Bot (widened to 260px) */}
        <g transform="translate(168, 18)">
          <rect width="260" height="52" rx="7" fill="var(--bg-3)" stroke="var(--ok-line)" />
          <circle cx="22" cy="26" r="10" fill="var(--ok-bg)" stroke="var(--ok)" strokeWidth="1.2" />
          <text x="22" y="30" textAnchor="middle" fontFamily="sans-serif" fontSize="11">💬</text>

          <text x="40" y="20" fontFamily="sans-serif" fontSize="8.5" fontWeight="600" fill="var(--fg)">WhatsApp Instant Push</text>
          <text x="40" y="32" fontFamily="sans-serif" fontSize="7" fill="var(--fg-3)">Immediate & actionable: bills due &lt; 7d, renewals</text>
          <text x="40" y="43" fontFamily="var(--mono)" fontSize="6.2" fill="var(--ok)">Open rate ~98% · Interactive quick replies</text>
        </g>

        {/* Channel 2: Daily 03:00 UTC Email Digest (widened to 260px) */}
        <g transform="translate(168, 85)">
          <rect width="260" height="52" rx="7" fill="var(--bg-3)" stroke="var(--ac-line)" />
          <circle cx="22" cy="26" r="10" fill="var(--ac-bg)" stroke="var(--ac)" strokeWidth="1.2" />
          <text x="22" y="30" textAnchor="middle" fontFamily="sans-serif" fontSize="11">✉️</text>

          <text x="40" y="20" fontFamily="sans-serif" fontSize="8.5" fontWeight="600" fill="var(--fg)">Daily 03:00 UTC Email Digest</text>
          <text x="40" y="32" fontFamily="sans-serif" fontSize="7" fill="var(--fg-3)">Holistic household status: upcoming maintenance, tasks</text>
          <text x="40" y="43" fontFamily="var(--mono)" fontSize="6.2" fill="var(--ac)">Low distraction · Permanent household record</text>
        </g>

        {/* Channel 3: Needs Review Queue (widened to 260px) */}
        <g transform="translate(168, 152)">
          <rect width="260" height="52" rx="7" fill="var(--bg-3)" stroke="var(--line-3)" />
          <circle cx="22" cy="26" r="10" fill="var(--warn-bg)" stroke="var(--warn)" strokeWidth="1.2" />
          <text x="22" y="30" textAnchor="middle" fontFamily="sans-serif" fontSize="11">🛡️</text>

          <text x="40" y="20" fontFamily="sans-serif" fontSize="8.5" fontWeight="600" fill="var(--fg)">Needs Review Human Queue</text>
          <text x="40" y="32" fontFamily="sans-serif" fontSize="7" fill="var(--fg-3)">Ambiguous OCR parse or low-confidence items</text>
          <text x="40" y="43" fontFamily="var(--mono)" fontSize="6.2" fill="var(--warn)">Held safely · 1-click Approve or Dismiss</text>
        </g>
      </svg>
      <p style={{ margin: '8px 0 0', fontSize: '.7rem', color: 'var(--fg-4)', textAlign: 'center', fontFamily: 'var(--mono)' }}>
        Calm coordination: push when immediate action is needed, summarize when not.
      </p>
    </div>
  );
}
