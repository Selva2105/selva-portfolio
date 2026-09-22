'use client';

import { useState, useEffect, useRef } from 'react';

const SIGNALS = [
  {
    id: 'doc-passport',
    title: 'Passport Expiration Notice',
    category: 'Documents Vault',
    owner: 'Selvaganapathi',
    daysRemaining: 28,
    source: 'Daily 03:00 UTC Vault Scanner',
    ruleDefault: 30,
    action: 'Renew via Passport Seva Kendra / Embassy portal',
    stages: [
      {
        title: 'Signal Detected via Cron Scanner',
        detail: 'Daily 03:00 UTC worker inspected 13 vault documents. Discovered passport expiring on Oct 19 (28 days left).',
        code: 'scanner.evaluate({ docId: "pass-01", expiresAt: "2026-10-19", ttlDays: 28 })',
      },
      {
        title: 'Enqueued in Redis via BullMQ',
        detail: 'Created job in queue "household-signals". Deduplicated with jobKey: "doc-pass-01-28d". Backoff: 3 retries.',
        code: 'await queue.add("eval-signal", payload, { attempts: 3, backoff: 1000 })',
      },
      {
        title: 'Rule Engine Evaluates Early Warning',
        detail: 'Matched active rule: "Warn 30 days before document expires". Current 28d ≤ 30d threshold → Trigger active alert.',
        code: 'ruleEngine.test({ threshold: 30, current: 28 }) // Result: TRIGGER_ALERT',
      },
      {
        title: 'Dispatched to WhatsApp & Staged for Digest',
        detail: 'Generated high-urgency WhatsApp push notification with action buttons. Added summary line to daily 03:00 UTC digest.',
        code: 'channels.whatsapp.send({ to: "Selva", urgent: true, template: "DOC_EXPIRY" })',
      },
    ],
    whatsappMsg: "⚠️ Cairn Alert: Selva's Passport expires in 28 days (Oct 19). Renewal window is active. Reply 'DONE' once booked or 'SNOOZE' for 7 days.",
    quickActions: ['Mark as Renewed', 'Snooze 7 Days', 'View Document'],
    emailSubject: '[Cairn Daily Digest] Action Required: Selva\'s Passport expires in 28 days',
    jobId: 'cairn-job-9402',
  },
  {
    id: 'maint-hvac',
    title: 'Quarterly HVAC Air Filter',
    category: 'Home Upkeep & Tasks',
    owner: 'Household',
    daysRemaining: 4,
    source: 'Recurring Maintenance Cron',
    ruleDefault: 14,
    action: 'Replace 20x25x1 MERV 11 filter in basement unit',
    stages: [
      {
        title: 'Recurrence Window Reached',
        detail: 'Quarterly maintenance schedule triggered. HVAC filter replacement scheduled for Sep 25 (4 days remaining).',
        code: 'scheduler.checkRecurrence({ taskId: "hvac-01", cycle: "90d", daysLeft: 4 })',
      },
      {
        title: 'BullMQ Task Scheduler Enqueue',
        detail: 'Job registered with high priority. Concurrency locked to 1 per household device to prevent double-alerts.',
        code: 'queue.add("maintenance-alert", { filter: "20x25x1 MERV 11", priority: "HIGH" })',
      },
      {
        title: 'Rule Engine Evaluator',
        detail: 'Matched rule: "Remind 14 days before maintenance". 4d is well within the 14d window → Active dispatch.',
        code: 'ruleEngine.test({ threshold: 14, current: 4 }) // Result: TRIGGER_ALERT',
      },
      {
        title: 'Interactive Duty Broadcast',
        detail: 'Alert sent to household WhatsApp group with quick-order link and completion confirmation pills.',
        code: 'channels.broadcast({ channel: "whatsapp", duty: "HVAC Filter", assignees: "ALL" })',
      },
    ],
    whatsappMsg: '🛠️ Cairn Upkeep: Quarterly HVAC filter replacement due in 4 days. Filter size 20x25x1. Reply "ORDERED" or "DONE".',
    quickActions: ['Mark as Done', 'Order Filter', 'Reassign to Alex'],
    emailSubject: '[Cairn Upkeep] Upcoming Maintenance: HVAC filter change scheduled',
    jobId: 'cairn-job-8119',
  },
  {
    id: 'bill-electric',
    title: 'Electricity & Utility Bill Due',
    category: 'Bills & Subscriptions',
    owner: 'Household',
    daysRemaining: 6,
    source: 'Inbound Gmail Parser',
    ruleDefault: 7,
    action: 'Pay $84.20 on provider utility portal',
    stages: [
      {
        title: 'Inbound Email Parsed by Webhook',
        detail: 'Gmail webhook parsed PDF attachment from BESCOM Power. Detected amount: $84.20, Due date: Sep 28.',
        code: 'emailParser.extractInvoice({ provider: "BESCOM", amount: 84.20, due: "2026-09-28" })',
      },
      {
        title: 'Queued into Ingestion Pipeline',
        detail: 'Placed in Redis BullMQ with delay calculator. Set alert lead-time to 7 days before due date.',
        code: 'queue.add("bill-tracker", { amount: 84.20, dueDate: "2026-09-28" })',
      },
      {
        title: 'Rule Engine Evaluates Window',
        detail: 'Configured rule: "Warn 7 days before utility bill". Current 6 days ≤ 7 days threshold → Flagged for dispatch.',
        code: 'ruleEngine.test({ threshold: 7, current: 6 }) // Result: TRIGGER_ALERT',
      },
      {
        title: 'Instant Push & Ledger Update',
        detail: 'Sent bill alert to WhatsApp with one-tap "PAID" action. Updated pending obligations ledger.',
        code: 'channels.whatsapp.send({ type: "BILL_DUE", amount: 84.20, quickReply: "PAID" })',
      },
    ],
    whatsappMsg: '⚡ Cairn Bill: BESCOM Power bill ($84.20) due in 6 days (Sep 28). Reply "PAID" once settled to log in household ledger.',
    quickActions: ['Mark as Paid', 'Remind in 2 Days', 'Split Bill'],
    emailSubject: '[Cairn Digest] Bill Reminder: $84.20 due on Sep 28',
    jobId: 'cairn-job-7731',
  },
  {
    id: 'bot-receipt',
    title: 'Inbound Receipt via WhatsApp',
    category: 'Receipts & Expenses',
    owner: 'Household',
    daysRemaining: 0,
    source: 'WhatsApp Webhook (Image OCR)',
    ruleDefault: 1,
    action: 'Auto-categorized as Plumbing Repair ($124.50)',
    stages: [
      {
        title: 'Mobile Photo Captured',
        detail: 'Household member snapped photo of paper receipt on WhatsApp. Sent to NestJS media ingress gateway.',
        code: 'botIngress.receiveMedia({ from: "+919876543210", mediaType: "image/jpeg" })',
      },
      {
        title: 'BullMQ OCR & Entity Extraction',
        detail: 'Background OCR worker parsed merchant "Apex Plumbing" and total "$124.50". Confidence score: 98%.',
        code: 'ocrWorker.process({ merchant: "Apex Plumbing", total: 124.50, confidence: 0.98 })',
      },
      {
        title: 'Auto-Categorization & Ledger Rule',
        detail: 'Rule engine matched keyword "plumbing" → mapped to "Home Maintenance & Repairs" budget category.',
        code: 'categorizer.classify({ text: "plumbing", targetCategory: "MAINTENANCE" })',
      },
      {
        title: 'Instant WhatsApp Confirmation',
        detail: 'Bot replies within 1.2s: receipt verified, logged in database, and expense ledger balance updated.',
        code: 'channels.whatsapp.reply({ text: "Logged $124.50 at Apex Plumbing" })',
      },
    ],
    whatsappMsg: '📸 Receipt Logged: $124.50 at Apex Plumbing. Added to September Maintenance ledger. Reply "CHANGE" to recategorize.',
    quickActions: ['Confirm Category', 'Split with Alex', 'View Ledger'],
    emailSubject: '[Cairn Expense] New receipt logged: $124.50 (Apex Plumbing)',
    jobId: 'cairn-job-5512',
  },
];

export default function SignalPipelineDemo() {
  const [selectedId, setSelectedId] = useState(SIGNALS[0].id);
  const [currentStep, setCurrentStep] = useState(3); // 0, 1, 2, 3
  const [isPlaying, setIsPlaying] = useState(false);
  const [channel, setChannel] = useState('whatsapp'); // 'whatsapp' | 'email' | 'payload'
  const [chatLog, setChatLog] = useState([]);
  const timerRef = useRef(null);

  const activeSignal = SIGNALS.find((s) => s.id === selectedId) || SIGNALS[0];
  const stepData = activeSignal.stages[currentStep] || activeSignal.stages[3];

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setTimeout(() => {
        if (currentStep < 3) {
          setCurrentStep((prev) => prev + 1);
        } else {
          setIsPlaying(false);
        }
      }, 1200); // 1.2 seconds deliberate readable pacing
    }
    return () => clearTimeout(timerRef.current);
  }, [isPlaying, currentStep]);

  function switchSignal(id) {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    setSelectedId(id);
    setCurrentStep(0);
    setChatLog([]);
  }

  function startAutoPlay() {
    clearTimeout(timerRef.current);
    setCurrentStep(0);
    setIsPlaying(true);
  }

  function nextStep() {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    if (currentStep < 3) setCurrentStep((p) => p + 1);
  }

  function prevStep() {
    clearTimeout(timerRef.current);
    setIsPlaying(false);
    if (currentStep > 0) setCurrentStep((p) => p - 1);
  }

  function handleQuickAction(action) {
    setChatLog((prev) => [
      ...prev,
      { from: 'user', text: action, time: 'Just now' },
      {
        from: 'bot',
        text: `✅ Action confirmed: "${action}". Cairn updated the database record and synced the household dashboard.`,
        time: 'Just now',
      },
    ]);
  }

  return (
    <div className="callout" style={{ marginTop: 20, padding: 'clamp(18px, 3vw, 26px)', background: 'var(--bg-2)', border: '1px solid var(--line-2)', borderRadius: 'var(--r-lg)' }}>
      {/* Simulator Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
        <div>
          <span className="eyebrow" style={{ fontSize: '.72rem', color: 'var(--ac)' }}>Interactive Telemetry Simulator</span>
          <h4 className="h4" style={{ marginTop: 2, fontSize: '1.1rem' }}>Cairn Event Ingestion &amp; Dispatch Engine</h4>
        </div>
        <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '.75rem', fontFamily: 'var(--mono)', color: 'var(--fg-4)' }}>Worker:</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: '.74rem', color: 'var(--ok)', background: 'var(--ok-bg)', padding: '3px 9px', borderRadius: 12, border: '1px solid var(--ok-line)' }}>
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ok)' }} /> Active BullMQ Concurrency: 5
          </span>
        </div>
      </div>

      {/* Signal Selection Pills */}
      <div style={{ marginBottom: 18 }}>
        <p style={{ fontSize: '.76rem', fontFamily: 'var(--mono)', color: 'var(--fg-3)', marginBottom: 8, textTransform: 'uppercase', letterSpacing: '.06em' }}>
          Select signal to trace:
        </p>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {SIGNALS.map((sig) => {
            const isSel = sig.id === selectedId;
            return (
              <button
                key={sig.id}
                type="button"
                onClick={() => switchSignal(sig.id)}
                style={{
                  fontSize: '.82rem',
                  padding: '7px 13px',
                  borderRadius: 8,
                  border: `1px solid ${isSel ? 'var(--ac)' : 'var(--line-2)'}`,
                  background: isSel ? 'var(--ac-bg)' : 'var(--bg-3)',
                  color: isSel ? 'var(--fg)' : 'var(--fg-3)',
                  cursor: 'pointer',
                  fontWeight: isSel ? 600 : 400,
                  transition: 'all .15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <span>{sig.title}</span>
                <span style={{ fontSize: '.68rem', fontFamily: 'var(--mono)', color: isSel ? 'var(--ac)' : 'var(--fg-4)' }}>
                  {sig.daysRemaining === 0 ? 'Now' : `${sig.daysRemaining}d`}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Progress Tracker with Slow Interactive Controls */}
      <div style={{ background: 'var(--bg-3)', border: '1px solid var(--line)', borderRadius: 10, padding: '16px', marginBottom: 20 }}>
        {/* Step Tabs Header */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 14 }}>
          {['1. Signal Ingestion', '2. BullMQ & Redis', '3. Rule Engine', '4. Multi-Channel Dispatch'].map((name, idx) => {
            const isActive = currentStep === idx;
            const isDone = currentStep > idx;
            return (
              <button
                key={name}
                type="button"
                onClick={() => {
                  clearTimeout(timerRef.current);
                  setIsPlaying(false);
                  setCurrentStep(idx);
                }}
                style={{
                  background: isActive ? 'var(--bg-1)' : isDone ? 'rgba(62,207,142,.06)' : 'var(--bg-2)',
                  border: `1px solid ${isActive ? 'var(--ac)' : isDone ? 'var(--ok-line)' : 'var(--line)'}`,
                  padding: '9px 10px',
                  borderRadius: 6,
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all .15s',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '.72rem', fontFamily: 'var(--mono)', color: isActive ? 'var(--ac)' : isDone ? 'var(--ok)' : 'var(--fg-4)' }}>
                    Step 0{idx + 1}
                  </span>
                  {isDone && <span style={{ fontSize: '.68rem', color: 'var(--ok)' }}>✓</span>}
                  {isActive && <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--ac)' }} />}
                </div>
                <p style={{ margin: '4px 0 0', fontSize: '.78rem', color: isActive ? 'var(--fg)' : 'var(--fg-3)', fontWeight: isActive ? 600 : 400, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {name.split('. ')[1]}
                </p>
              </button>
            );
          })}
        </div>

        {/* Informative Step Detail Box */}
        <div style={{ background: 'var(--bg-1)', border: '1px solid var(--line-2)', borderRadius: 8, padding: '14px 18px', marginBottom: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6, flexWrap: 'wrap', gap: 8 }}>
            <span style={{ fontSize: '.72rem', fontFamily: 'var(--mono)', color: 'var(--ac)', textTransform: 'uppercase' }}>
              Phase {currentStep + 1} of 4 · Deep Dive
            </span>
            <span style={{ fontSize: '.72rem', fontFamily: 'var(--mono)', color: 'var(--fg-4)' }}>
              Source: {activeSignal.source}
            </span>
          </div>
          <h5 style={{ margin: '0 0 6px', fontSize: '1rem', color: 'var(--fg)' }}>
            {stepData.title}
          </h5>
          <p style={{ margin: '0 0 10px', fontSize: '.86rem', color: 'var(--fg-2)', lineHeight: 1.5 }}>
            {stepData.detail}
          </p>
          <div style={{ background: 'var(--bg-2)', padding: '8px 12px', borderRadius: 6, border: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: '.74rem', color: 'var(--fg-3)' }}>
            <code>{stepData.code}</code>
          </div>
        </div>

        {/* Step Control Buttons (Slow Interactive) */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 10 }}>
          <div style={{ display: 'flex', gap: 8 }}>
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 0}
              style={{
                fontSize: '.78rem',
                padding: '6px 12px',
                borderRadius: 6,
                background: 'var(--bg-2)',
                border: '1px solid var(--line-2)',
                color: currentStep === 0 ? 'var(--fg-4)' : 'var(--fg)',
                cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
              }}
            >
              ← Previous Step
            </button>
            <button
              type="button"
              onClick={nextStep}
              disabled={currentStep === 3}
              style={{
                fontSize: '.78rem',
                padding: '6px 12px',
                borderRadius: 6,
                background: 'var(--bg-2)',
                border: '1px solid var(--line-2)',
                color: currentStep === 3 ? 'var(--fg-4)' : 'var(--fg)',
                cursor: currentStep === 3 ? 'not-allowed' : 'pointer',
              }}
            >
              Next Step →
            </button>
          </div>

          <button
            type="button"
            onClick={startAutoPlay}
            style={{
              fontSize: '.78rem',
              padding: '6px 14px',
              borderRadius: 6,
              background: isPlaying ? 'var(--ac)' : 'var(--ac-bg)',
              border: '1px solid var(--ac-line)',
              color: isPlaying ? '#fff' : 'var(--ac)',
              cursor: 'pointer',
              fontWeight: 500,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span>{isPlaying ? '⏸ Running (1.2s cadence)...' : '▶ Auto-Play Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* Multi-Channel Preview Box with Interactive WhatsApp Actions */}
      <div style={{ background: 'var(--bg-1)', borderRadius: 10, border: '1px solid var(--line-2)', overflow: 'hidden' }}>
        <div style={{ display: 'flex', borderBottom: '1px solid var(--line)', background: 'var(--bg-3)', overflowX: 'auto' }}>
          <button
            type="button"
            onClick={() => setChannel('whatsapp')}
            style={{
              padding: '10px 16px',
              fontSize: '.82rem',
              fontWeight: channel === 'whatsapp' ? 600 : 400,
              color: channel === 'whatsapp' ? 'var(--ok)' : 'var(--fg-3)',
              borderBottom: `2px solid ${channel === 'whatsapp' ? 'var(--ok)' : 'transparent'}`,
              background: 'transparent',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ok)' }} />
            WhatsApp Channel Preview
          </button>
          <button
            type="button"
            onClick={() => setChannel('email')}
            style={{
              padding: '10px 16px',
              fontSize: '.82rem',
              fontWeight: channel === 'email' ? 600 : 400,
              color: channel === 'email' ? 'var(--ac)' : 'var(--fg-3)',
              borderBottom: `2px solid ${channel === 'email' ? 'var(--ac)' : 'transparent'}`,
              background: 'transparent',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--ac)' }} />
            Daily 03:00 UTC Email Digest
          </button>
          <button
            type="button"
            onClick={() => setChannel('payload')}
            style={{
              padding: '10px 16px',
              fontSize: '.82rem',
              fontWeight: channel === 'payload' ? 600 : 400,
              color: channel === 'payload' ? 'var(--blue)' : 'var(--fg-3)',
              borderBottom: `2px solid ${channel === 'payload' ? 'var(--blue)' : 'transparent'}`,
              background: 'transparent',
              borderTop: 'none',
              borderLeft: 'none',
              borderRight: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              whiteSpace: 'nowrap',
            }}
          >
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--blue)' }} />
            BullMQ Job Payload
          </button>
        </div>

        <div style={{ padding: '16px 20px' }}>
          {channel === 'whatsapp' ? (
            <div>
              <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start', marginBottom: 12 }}>
                <div style={{ width: 34, height: 34, borderRadius: '50%', background: 'var(--ok-bg)', border: '1px solid var(--ok-line)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--ok)', fontWeight: 'bold', fontSize: '.85rem', flexShrink: 0 }}>
                  C
                </div>
                <div style={{ background: 'var(--bg-3)', border: '1px solid var(--line-2)', borderRadius: '0 12px 12px 12px', padding: '12px 16px', maxWidth: '520px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', gap: 12, marginBottom: 4 }}>
                    <span style={{ fontSize: '.76rem', fontWeight: 600, color: 'var(--fg)' }}>Cairn Household Bot</span>
                    <span style={{ fontSize: '.68rem', color: 'var(--fg-4)', fontFamily: 'var(--mono)' }}>03:00 UTC</span>
                  </div>
                  <p style={{ fontSize: '.88rem', color: 'var(--fg-2)', margin: 0, lineHeight: 1.5 }}>
                    {activeSignal.whatsappMsg}
                  </p>

                  {/* Interactive Quick Action Buttons */}
                  <div style={{ marginTop: 10, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {activeSignal.quickActions.map((act) => (
                      <button
                        key={act}
                        type="button"
                        onClick={() => handleQuickAction(act)}
                        style={{
                          fontSize: '.72rem',
                          padding: '4px 8px',
                          borderRadius: 6,
                          background: 'var(--bg-2)',
                          border: '1px solid var(--ok-line)',
                          color: 'var(--ok)',
                          cursor: 'pointer',
                          fontWeight: 500,
                        }}
                      >
                        {act}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Simulated chat conversation replies */}
              {chatLog.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    justifyContent: item.from === 'user' ? 'flex-end' : 'flex-start',
                    marginBottom: 8,
                    marginLeft: item.from === 'user' ? 40 : 0,
                    marginRight: item.from === 'bot' ? 40 : 0,
                  }}
                >
                  <div style={{
                    background: item.from === 'user' ? 'var(--ac-bg)' : 'var(--bg-3)',
                    border: `1px solid ${item.from === 'user' ? 'var(--ac-line)' : 'var(--line-2)'}`,
                    borderRadius: 10,
                    padding: '7px 12px',
                    fontSize: '.82rem',
                    color: item.from === 'user' ? 'var(--fg)' : 'var(--fg-2)',
                  }}>
                    {item.text}
                  </div>
                </div>
              ))}
            </div>
          ) : channel === 'email' ? (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--line)', paddingBottom: 8, marginBottom: 10, fontSize: '.76rem', color: 'var(--fg-3)', flexWrap: 'wrap', gap: 8 }}>
                <div><strong>To:</strong> selvaganapathi@household.internal</div>
                <div><strong>Runner:</strong> cron@03:00:00Z · 13 records evaluated</div>
              </div>
              <p style={{ fontSize: '.9rem', fontWeight: 600, color: 'var(--fg)', marginBottom: 6 }}>
                {activeSignal.emailSubject}
              </p>
              <p style={{ fontSize: '.84rem', color: 'var(--fg-2)', lineHeight: 1.5, margin: 0 }}>
                Cairn evaluated your household records and matched rule &ldquo;{activeSignal.ruleDefault} days early notification&rdquo;.
                Action item: <strong>{activeSignal.action}</strong>.
              </p>
            </div>
          ) : (
            <pre style={{ margin: 0, padding: 12, background: 'var(--bg-2)', borderRadius: 6, border: '1px solid var(--line)', fontFamily: 'var(--mono)', fontSize: '.72rem', color: 'var(--fg-2)', overflowX: 'auto', lineHeight: 1.5 }}>
{JSON.stringify(
  {
    jobId: activeSignal.jobId,
    queue: 'household-signals',
    step: currentStep + 1,
    phase: stepData.title,
    payload: {
      id: activeSignal.id,
      title: activeSignal.title,
      category: activeSignal.category,
      daysRemaining: activeSignal.daysRemaining,
      threshold: activeSignal.ruleDefault,
      action: activeSignal.action,
    },
    meta: {
      worker: 'cairn-worker-01',
      redisMemoryMb: 14.2,
      attempts: 1,
    },
  },
  null,
  2
)}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
