'use client';

import { useEffect, useRef, useState } from 'react';

const ACTIONS = [
  { k: 'lock', n: 'Lock device', sev: 'low', rev: 'Reversible — user can unlock with credentials' },
  { k: 'pwd', n: 'Force password reset', sev: 'med', rev: 'Reversible — user sets a new password at next unlock' },
  { k: 'retire', n: 'Retire — remove work data', sev: 'high', rev: 'Work profile deleted. Personal data untouched' },
  { k: 'wipe', n: 'Remote wipe', sev: 'critical', rev: 'Irreversible — full factory reset, all data destroyed' },
];
const TARGETS = {
  one: { n: 1, label: 'Dell XPS (Tom V.)', devices: [['Dell XPS 15', 'Tom V. · Finance']] },
  team: {
    n: 12,
    label: 'Field Team',
    devices: [['iPad Pro', 'Meera K. · Field ops'], ['Galaxy Tab S9', 'Raj P. · Field ops'], ['Surface Go', 'Anita D. · Field ops']],
  },
  all: {
    n: 340,
    label: 'All Windows devices',
    devices: [['Dell XPS 15', 'Tom V. · Finance'], ['ThinkPad X1', 'Priya M. · HR'], ['Surface Laptop 5', 'Anand R. · Director'], ['Dell Latitude', 'Kavya N. · Engineering']],
  },
};
const SEV = { low: 'var(--fg-3)', med: 'var(--warn)', high: 'var(--warn)', critical: 'var(--danger)' };

export default function RemoteWipeDemo() {
  const [action, setAction] = useState('lock');
  const [target, setTarget] = useState('one');
  const [typedConfirm, setTypedConfirm] = useState('');
  const [phase, setPhase] = useState('idle'); // idle | dispatching | dispatched | cancelled
  const [countdown, setCountdown] = useState(10);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach((t) => (typeof t === 'number' ? clearTimeout(t) : clearInterval(t))), []);

  function clearTimers() {
    timers.current.forEach((t) => {
      clearTimeout(t);
      clearInterval(t);
    });
    timers.current = [];
  }

  const a = ACTIONS.find((x) => x.k === action);
  const t = TARGETS[target];
  const critical = a.sev === 'critical' || (a.sev === 'high' && t.n > 10);
  const needsType = critical && t.n > 1;
  const phrase = t.n > 100 ? `WIPE ${t.n}` : 'CONFIRM';
  const canDispatch = !needsType || typedConfirm.trim().toUpperCase() === phrase;

  function selectAction(k) {
    setAction(k);
    setPhase('idle');
    setTypedConfirm('');
    clearTimers();
  }

  function selectTarget(v) {
    setTarget(v);
    setPhase('idle');
    setTypedConfirm('');
    clearTimers();
  }

  function dispatch() {
    clearTimers();
    setPhase('dispatching');
    let left = 10;
    setCountdown(left);
    const interval = setInterval(() => {
      left -= 1;
      setCountdown(left);
      if (left <= 0) clearInterval(interval);
    }, 1000);
    timers.current.push(interval);

    const timeout = setTimeout(() => {
      clearTimers();
      setPhase('dispatched');
      const reset = setTimeout(() => {
        setPhase('idle');
        setTypedConfirm('');
      }, 2600);
      timers.current.push(reset);
    }, 10000);
    timers.current.push(timeout);
  }

  function cancel() {
    clearTimers();
    setPhase('cancelled');
    const reset = setTimeout(() => {
      setPhase('idle');
      setTypedConfirm('');
    }, 2600);
    timers.current.push(reset);
  }

  return (
    <div className="panel" id="demo-wipe">
      <div className="panel-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="panel-title">MDM — remote action</span>
        <span className="live"><i /> Interactive</span>
      </div>
      <div className="panel-body">
        <div className="grid-2 tight">
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Action</p>
            <div className="acts">
              {ACTIONS.map((ac) => (
                <button key={ac.k} className="act" aria-pressed={action === ac.k} onClick={() => selectAction(ac.k)}>
                  <span className="act-dot" style={{ background: SEV[ac.sev] }} />
                  <span className="act-n">{ac.n}</span>
                </button>
              ))}
            </div>
            <p className="eyebrow" style={{ margin: '24px 0 12px' }}>Target group</p>
            <select className="sel" style={{ width: '100%' }} value={target} onChange={(e) => selectTarget(e.target.value)}>
              <option value="one">Single device — Dell XPS (Tom V.)</option>
              <option value="team">Field Team — 12 devices</option>
              <option value="all">All Windows devices — 340 devices</option>
            </select>
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Blast radius</p>
            <div className={`blast ${critical ? 'crit' : ''}`}>
              <div className="blast-n">
                <b style={{ color: critical ? 'var(--danger)' : SEV[a.sev] }}>{t.n}</b>
                <span>{t.n === 1 ? 'device' : 'devices'} affected — {t.label}</span>
              </div>
              <div className="blast-list">
                {t.devices.map(([d, o]) => (
                  <div className="blast-d" key={d}><b>{d}</b><span>{o}</span></div>
                ))}
                {t.n > t.devices.length && (
                  <div className="blast-d more">+ {t.n - t.devices.length} more devices and owners</div>
                )}
              </div>
              <p className="blast-rev">{a.rev}</p>
            </div>

            {needsType && phase === 'idle' && (
              <div className="typebox">
                <label htmlFor="wipe-type">Type <b>{phrase}</b> to enable this action</label>
                <input
                  id="wipe-type"
                  className="typein"
                  placeholder={phrase}
                  autoComplete="off"
                  aria-label="Confirmation phrase"
                  value={typedConfirm}
                  onChange={(e) => setTypedConfirm(e.target.value)}
                />
              </div>
            )}

            {phase === 'idle' && (
              <button
                className={`btn ${critical ? 'btn-danger' : 'btn-s'}`}
                style={{ marginTop: 18, fontSize: '.85rem', padding: '10px 18px' }}
                disabled={!canDispatch}
                onClick={dispatch}
              >
                {a.n}{t.n > 1 ? ` — ${t.n} devices` : ''}
              </button>
            )}

            {phase === 'dispatching' && (
              <div style={{ marginTop: 16 }}>
                <div className="undo">
                  <div className="undo-top">
                    <span className="undo-ring">
                      <svg width="30" height="30" viewBox="0 0 30 30">
                        <circle cx="15" cy="15" r="12" fill="none" stroke="var(--t5)" strokeWidth="2.5" />
                        <circle
                          cx="15" cy="15" r="12" fill="none" stroke="var(--ac)" strokeWidth="2.5" strokeLinecap="round"
                          strokeDasharray="75.4" strokeDashoffset={75.4 * (1 - countdown / 10)} transform="rotate(-90 15 15)"
                        />
                      </svg>
                      <b>{countdown}</b>
                    </span>
                    <div>
                      <b>{a.n} queued</b>
                      <span>Dispatching to {t.n} {t.n === 1 ? 'device' : 'devices'} in <span>{countdown}</span>s</span>
                    </div>
                  </div>
                  <button className="btn btn-s" style={{ fontSize: '.8rem', padding: '8px 16px' }} onClick={cancel}>Cancel</button>
                </div>
              </div>
            )}

            {phase === 'dispatched' && (
              <div style={{ marginTop: 16 }}>
                <div className="dispatched"><b>Dispatched.</b> Logged to the audit trail — attributed to your account, timestamped, and reconstructable during a security audit.</div>
              </div>
            )}

            {phase === 'cancelled' && (
              <div style={{ marginTop: 16 }}>
                <div className="cancelled"><b>Cancelled.</b> Nothing was sent. This is the layer that prevents the Monday-morning incident — prevention alone isn&apos;t enough, you need recovery.</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
