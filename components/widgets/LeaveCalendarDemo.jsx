'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { WarnIcon } from '../icons';

// April 2026: 1st is a Wednesday. Grid starts Monday.
const DAYS = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];
const START_OFFSET = 2; // Wed
const DAYS_IN_MONTH = 30;
const LEAVE = {
  casual: { label: 'Casual leave', total: 15, used: 7, sandwich: true },
  earned: { label: 'Earned leave', total: 21, used: 9, sandwich: false },
  sick: { label: 'Sick leave', total: 6, used: 4, sandwich: false },
};

function dow(d) {
  return (START_OFFSET + d - 1) % 7; // 0=Mon..6=Sun
}
function isWeekend(d) {
  const w = dow(d);
  return w === 5 || w === 6;
}

function sandwichDays(type, selected) {
  if (!LEAVE[type].sandwich) return [];
  const sel = [...selected].sort((a, b) => a - b);
  if (sel.length < 2) return [];
  const out = new Set();
  for (let i = 0; i < sel.length - 1; i++) {
    const a = sel[i];
    const b = sel[i + 1];
    const between = [];
    let allWeekend = b - a > 1;
    for (let d = a + 1; d < b; d++) {
      if (!isWeekend(d)) {
        allWeekend = false;
        break;
      }
      between.push(d);
    }
    if (allWeekend && between.length) between.forEach((d) => out.add(d));
  }
  return [...out];
}

const CHAIN_STEPS = [
  { id: 'ch-1', name: 'Ravi S.', role: 'L1 — Manager' },
  { id: 'ch-2', name: 'Priya M.', role: 'L2 — HR Head' },
  { id: 'ch-3', name: 'Balance', role: 'Auto-updates' },
];

export default function LeaveCalendarDemo() {
  const [type, setType] = useState('casual');
  const [selected, setSelected] = useState(new Set());
  const [message, setMessage] = useState('');
  const [chainStatus, setChainStatus] = useState(['pending', 'pending', 'pending']);
  const timers = useRef([]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const sw = useMemo(() => sandwichDays(type, selected), [type, selected]);
  const total = selected.size + sw.length;

  function resetChain() {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setChainStatus(['pending', 'pending', 'pending']);
  }

  function runChain() {
    resetChain();
    const next = ['pending', 'pending', 'pending'];
    CHAIN_STEPS.forEach((_, i) => {
      timers.current.push(
        setTimeout(() => {
          setChainStatus((prev) => {
            const copy = [...prev];
            copy[i] = 'active';
            if (i > 0) copy[i - 1] = 'done';
            return copy;
          });
        }, 500 + i * 1100)
      );
    });
    timers.current.push(
      setTimeout(() => {
        setChainStatus((prev) => {
          const copy = [...prev];
          copy[2] = 'done';
          return copy;
        });
      }, 500 + 3 * 1100)
    );
  }

  function toggleDay(d) {
    if (isWeekend(d)) return;
    setSelected((prev) => {
      const next = new Set(prev);
      next.has(d) ? next.delete(d) : next.add(d);
      return next;
    });
    resetChain();
    setMessage('');
  }

  function handleSubmit() {
    if (!total) {
      setMessage({ tone: 'muted', text: 'Select at least one date.' });
      return;
    }
    setMessage({ tone: 'ok', text: `Request for ${total} ${total === 1 ? 'day' : 'days'} routed for approval.` });
    runChain();
  }

  function handleReset() {
    setSelected(new Set());
    setMessage('');
    resetChain();
  }

  const swSet = new Set(sw);

  return (
    <div className="panel" id="demo-leave">
      <div className="panel-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="panel-title">HRMS — apply for leave</span>
        <span className="live"><i /> Interactive</span>
      </div>
      <div className="panel-body">
        <div className="grid-2 tight">
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap', marginBottom: 16 }}>
              <p className="small" style={{ color: 'var(--fg-2)', margin: 0 }}><strong>April 2026</strong></p>
              <div className="seg" role="group" aria-label="Leave type">
                {Object.keys(LEAVE).map((k) => (
                  <button key={k} aria-pressed={type === k} onClick={() => setType(k)}>
                    {LEAVE[k].label.replace(' leave', '')}
                  </button>
                ))}
              </div>
            </div>
            <div className="cal" role="group" aria-label="Select leave dates">
              {DAYS.map((d, i) => <div className="cal-h" key={`h${i}`}>{d}</div>)}
              {Array.from({ length: START_OFFSET }, (_, i) => <div key={`pad${i}`} />)}
              {Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1).map((d) => {
                const cls = ['day'];
                if (isWeekend(d)) cls.push('we');
                if (selected.has(d)) cls.push('sel');
                else if (swSet.has(d)) cls.push('sw');
                const label = `${d} April${selected.has(d) ? ', selected' : ''}${swSet.has(d) ? ', counted as sandwich leave' : ''}`;
                return (
                  <button key={d} className={cls.join(' ')} aria-label={label} aria-pressed={selected.has(d)} onClick={() => toggleDay(d)}>
                    {d}
                  </button>
                );
              })}
            </div>
            <p className="small" style={{ marginTop: 14, color: 'var(--fg-4)', fontSize: '.76rem' }}>
              Click dates to select. Try <strong style={{ color: 'var(--fg-3)' }}>Friday 3rd</strong> and <strong style={{ color: 'var(--fg-3)' }}>Monday 6th</strong>.
            </p>
          </div>
          <div>
            <p className="eyebrow" style={{ marginBottom: 12 }}>Deduction</p>
            <div className="tally">
              <b className={total > 0 && sw.length > 0 ? 'warn' : ''}>{total}</b>
              <span>{total === 1 ? 'day deducted' : 'days deducted'}</span>
            </div>
            <div className={`alert${sw.length ? '' : ' hide'}`}>
              <WarnIcon />
              <span>
                Sandwich leave applies. <b>{sw.length ? `${sw.length} weekend ${sw.length === 1 ? 'day' : 'days'} between your selected dates ${sw.length === 1 ? 'is' : 'are'} also deducted — ${selected.size} selected + ${sw.length} sandwich = ${total} days.` : ''}</b>
              </span>
            </div>
            <div style={{ marginTop: 26 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
                <p className="eyebrow" style={{ margin: 0 }}>Balance after this request</p>
              </div>
              <div className="bal">
                {Object.entries(LEAVE).map(([k, v]) => {
                  const deduct = k === type ? total : 0;
                  const used = Math.min(v.total, v.used + deduct);
                  const pct = (used / v.total) * 100;
                  const over = v.used + deduct > v.total;
                  return (
                    <div className="bal-r" key={k}>
                      <span className="nm">{v.label}</span>
                      <span className="bal-tr">
                        <span className="bal-f" style={{ width: `${pct}%`, background: over ? 'var(--danger)' : deduct ? 'var(--ac)' : 'var(--fg-3)' }} />
                      </span>
                      <span className="vl" style={over ? { color: 'var(--danger)' } : undefined}>{v.total - used}/{v.total}</span>
                    </div>
                  );
                })}
              </div>
            </div>
            <div style={{ marginTop: 24, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <button className="btn btn-p" style={{ fontSize: '.83rem', padding: '9px 16px' }} onClick={handleSubmit}>Submit request</button>
              <button className="btn btn-s" style={{ fontSize: '.83rem', padding: '9px 16px' }} onClick={handleReset}>Clear</button>
            </div>
            <p className="small" style={{ marginTop: 12, minHeight: 20, color: message.tone === 'ok' ? 'var(--ok)' : 'var(--fg-3)', fontSize: '.8rem' }}>
              {message.text}
            </p>
            <div style={{ marginTop: 22, paddingTop: 22, borderTop: '1px solid var(--line)' }}>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Approval chain — routed from org hierarchy</p>
              <div className="chain">
                <div className="chain-s done"><span className="chain-d" /><b>Arjun R.</b><span>You — applied</span></div>
                {CHAIN_STEPS.map((s, i) => (
                  <div className={`chain-s ${chainStatus[i]}`} key={s.id}>
                    <span className="chain-d" />
                    <b>{s.name}</b>
                    <span>{s.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
