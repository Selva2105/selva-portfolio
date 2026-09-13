'use client';

import { useMemo, useState } from 'react';

const OS = [
  { k: 'android', n: 'Android', ic: 'A' },
  { k: 'windows', n: 'Windows', ic: 'W' },
  { k: 'apple', n: 'Apple', ic: '⌘' },
];

const POLICIES = [
  {
    g: 'Authentication & security',
    items: [
      { n: 'Minimum password length', d: '8 characters, alphanumeric', os: ['android', 'windows', 'apple'], on: true },
      { n: 'Biometric authentication', d: 'Allow fingerprint and face unlock', os: ['android', 'windows', 'apple'], on: true },
      { n: 'Screen lock timeout', d: 'Auto-lock after 2 minutes idle', os: ['android', 'windows', 'apple'], on: true },
      { n: 'Factory reset protection', d: 'Block device wipe without credentials', os: ['android'], on: true },
      { n: 'BitLocker disk encryption', d: 'Enforce full-disk encryption', os: ['windows'], on: true },
      { n: 'FileVault encryption', d: 'Enforce full-disk encryption', os: ['apple'], on: false },
    ],
  },
  {
    g: 'Network & VPN',
    items: [
      { n: 'Always-on VPN', d: 'Route all traffic through corporate VPN', os: ['android'], on: true },
      { n: 'Windows Firewall control', d: 'Enforce firewall profile', os: ['windows'], on: true },
      { n: 'Block data roaming', d: 'Prevent cellular data outside home network', os: ['android'], on: false },
      { n: 'Wi-Fi configuration', d: 'Push corporate network profiles', os: ['android', 'windows', 'apple'], on: true },
    ],
  },
  {
    g: 'BYOD & data separation',
    items: [
      { n: 'Copy & paste between profiles', d: 'Block clipboard across work and personal', os: ['android'], on: true },
      { n: 'Block AirDrop', d: 'Prevent local file sharing', os: ['apple'], on: true },
      { n: 'Cross-profile data sharing', d: 'Restrict work data leaving the work profile', os: ['android'], on: true },
      { n: 'Lock screen message', d: 'Display corporate contact details', os: ['android', 'apple'], on: false },
    ],
  },
];

const INITIAL_STATE = {};
POLICIES.forEach((g) => g.items.forEach((p) => { INITIAL_STATE[p.n] = p.on; }));

export default function PolicyBuilderDemo() {
  const [active, setActive] = useState(new Set(['android', 'windows', 'apple']));
  const [state, setState] = useState(INITIAL_STATE);

  const counts = useMemo(() => {
    let applicable = 0;
    let enabled = 0;
    POLICIES.forEach((g) =>
      g.items.forEach((p) => {
        const ok = p.os.some((o) => active.has(o));
        if (ok) {
          applicable++;
          if (state[p.n]) enabled++;
        }
      })
    );
    return { applicable, enabled };
  }, [active, state]);

  function toggleOs(k) {
    setActive((prev) => {
      if (prev.has(k)) {
        if (prev.size === 1) return prev;
        const next = new Set(prev);
        next.delete(k);
        return next;
      }
      return new Set(prev).add(k);
    });
  }

  function togglePolicy(name, ok) {
    if (!ok) return;
    setState((prev) => ({ ...prev, [name]: !prev[name] }));
  }

  return (
    <div className="panel" id="demo-policy-builder">
      <div className="panel-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="panel-title">MDM — cross-platform policy builder</span>
        <span className="live"><i /> Interactive</span>
      </div>
      <div className="panel-body">
        <p className="small" style={{ marginBottom: 16 }}>Toggle target platforms — watch which policies stay applicable.</p>
        <div className="os-tabs" role="group" aria-label="Target platforms">
          {OS.map((o) => {
            const c = POLICIES.reduce((s, g) => s + g.items.filter((p) => p.os.includes(o.k)).length, 0);
            return (
              <button key={o.k} className="os-tab" aria-pressed={active.has(o.k)} onClick={() => toggleOs(o.k)}>
                <span>{o.n}</span><span className="cnt">{c}</span>
              </button>
            );
          })}
        </div>
        <div className="pol">
          {POLICIES.map((g) => (
            <div key={g.g}>
              <div className="pol-grp">{g.g}</div>
              {g.items.map((p) => {
                const ok = p.os.some((o) => active.has(o));
                return (
                  <div className={`pol-r${ok ? '' : ' na'}`} key={p.n}>
                    <div className="pol-nm"><b>{p.n}</b><span>{p.d}</span></div>
                    <div className="pol-os">
                      {OS.map((o) => (
                        <i key={o.k} className={p.os.includes(o.k) && active.has(o.k) ? 'on' : ''} title={o.n}>{o.ic}</i>
                      ))}
                    </div>
                    <button
                      className="tgl"
                      aria-pressed={!!state[p.n] && ok}
                      aria-label={p.n}
                      disabled={!ok}
                      onClick={() => togglePolicy(p.n, ok)}
                    />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 26, flexWrap: 'wrap', marginTop: 22, paddingTop: 20, borderTop: '1px solid var(--line)' }}>
          <div className="work-stat"><b style={{ color: 'var(--ok)' }}>{counts.applicable}</b><span>policies applicable</span></div>
          <div className="work-stat"><b>{counts.enabled}</b><span>enabled in this profile</span></div>
          <div className="work-stat"><b>{active.size}</b><span>platforms targeted</span></div>
        </div>
      </div>
    </div>
  );
}
