'use client';

import { useEffect, useRef, useState } from 'react';
import { WarnIcon } from '../icons';

const STAGES = [
  { n: 'Job description' },
  { n: 'Resume extraction' },
  { n: 'Skill ranking' },
  { n: 'Interview booking' },
];

const JD = `Backend Engineer · Engineering · Bengaluru

We're looking for an engineer who owns a service end to end — from API design through to production deployment. You'll work closely with the frontend and product teams to ship features that hold up under real load.

Required: Node.js, REST APIs, MongoDB or SQL, 3+ years shipping production backends.`;

const FIELDS = [
  ['Name', 'Kavya S.'],
  ['Experience', '4 years — 2 in Node.js backends'],
  ['Skills', 'Node.js · Express · MongoDB · REST APIs'],
  ['Education', 'B.Tech, Computer Science', 'Low confidence'],
  ['Portfolio', 'github.com/kavyas — 4 repos'],
];

const EVENTS = [
  ['Design round — Kavya S.', 'Wed 9 Apr · 11:00'],
  ['Panel: Ravi S. + Priya M.', '60 min · Meet link sent'],
  ['Feedback form scheduled', 'Due 2h after the session'],
];

const NOTES = [
  `<strong>Stage 1.</strong> The model drafts from a title and department. Every section is editable and regenerable — HR owns the final wording, because a JD is a legal and brand artifact, not just a prompt output.`,
  `<strong style="color:var(--warn)">Stage 2 — the interesting one.</strong> Education parsed at low confidence and is flagged rather than silently accepted. <span class="hl">This is the failure that would otherwise be invisible three steps later,</span> when a ranking quietly includes a field the model guessed.`,
  `<strong>Stage 3.</strong> The score decomposes into matched and missing skills, and explicitly excludes the low-confidence field. A reviewer can see what the number is made of.`,
  `<strong style="color:var(--ok)">Stage 4.</strong> On confirmation, interviews book themselves with the panel and a feedback deadline. The pipeline is finished — but note that a human decided at every stage that mattered.`,
];

const IDLE_NOTE = 'Four stages, each feeding the next. Press run — the interesting moment is stage two.';

function reduced() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

export default function RecruitmentPipelineDemo() {
  const [stage, setStage] = useState(-1);
  const [done, setDone] = useState(-1);
  const [status, setStatus] = useState('');
  const [running, setRunning] = useState(false);
  const [note, setNote] = useState(IDLE_NOTE);
  const [jdText, setJdText] = useState('');
  const [jdDone, setJdDone] = useState(false);
  const [fieldsShown, setFieldsShown] = useState(0);
  const [matchPct, setMatchPct] = useState(0);
  const [eventsShown, setEventsShown] = useState(0);

  const timers = useRef([]);
  const runId = useRef(0);

  function clearAllTimers() {
    timers.current.forEach((t) => {
      clearTimeout(t);
      clearInterval(t);
    });
    timers.current = [];
  }
  function later(fn, ms) {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
    return t;
  }

  useEffect(() => () => clearAllTimers(), []);

  function resetStageContent() {
    setJdText('');
    setJdDone(false);
    setFieldsShown(0);
    setMatchPct(0);
    setEventsShown(0);
  }

  function typeJD(myRun, cb) {
    if (reduced()) {
      setJdText(JD);
      setJdDone(true);
      cb();
      return;
    }
    let i = 0;
    const t = setInterval(() => {
      if (runId.current !== myRun) return clearInterval(t);
      i += 4;
      if (i >= JD.length) {
        setJdText(JD);
        setJdDone(true);
        clearInterval(t);
        cb();
      } else {
        setJdText(JD.slice(0, i));
      }
    }, 16);
    timers.current.push(t);
  }

  function parse(myRun, cb) {
    FIELDS.forEach((_, i) => {
      later(() => {
        if (runId.current !== myRun) return;
        setFieldsShown((prev) => Math.max(prev, i + 1));
      }, reduced() ? 1 : i * 260);
    });
    later(() => runId.current === myRun && cb(), reduced() ? 10 : FIELDS.length * 260 + 400);
  }

  function match(myRun, cb) {
    if (reduced()) {
      setMatchPct(89);
      cb();
      return;
    }
    let v = 0;
    const t = setInterval(() => {
      if (runId.current !== myRun) return clearInterval(t);
      v += 3;
      if (v >= 89) {
        v = 89;
        clearInterval(t);
        setMatchPct(v);
        cb();
      } else {
        setMatchPct(v);
      }
    }, 26);
    timers.current.push(t);
  }

  function schedule(myRun, cb) {
    EVENTS.forEach((_, i) => {
      later(() => {
        if (runId.current !== myRun) return;
        setEventsShown((prev) => Math.max(prev, i + 1));
      }, reduced() ? 1 : i * 380);
    });
    later(() => runId.current === myRun && cb(), reduced() ? 10 : EVENTS.length * 380 + 300);
  }

  function run() {
    clearAllTimers();
    runId.current += 1;
    const myRun = runId.current;
    resetStageContent();
    setStage(0);
    setDone(-1);
    setStatus('Running…');
    setRunning(true);

    const seq = [
      (cb) => typeJD(myRun, cb),
      (cb) => parse(myRun, cb),
      (cb) => match(myRun, cb),
      (cb) => schedule(myRun, cb),
    ];

    const step = (i) => {
      if (runId.current !== myRun) return;
      if (i >= seq.length) {
        setDone(3);
        setStage(-1);
        setStatus('Complete');
        setRunning(false);
        return;
      }
      setStage(i);
      setDone(i - 1);
      setNote(NOTES[i]);
      seq[i](() => later(() => step(i + 1), 520));
    };
    step(0);
  }

  function reset() {
    clearAllTimers();
    runId.current += 1;
    setStage(-1);
    setDone(-1);
    setStatus('');
    setRunning(false);
    setNote(IDLE_NOTE);
    resetStageContent();
  }

  // Once a run finishes, stage resets to -1 but the last stage's content
  // should stay on screen (matching the original, which never cleared the
  // panel's innerHTML on completion) rather than disappearing.
  const displayStage = stage !== -1 ? stage : done;
  const showIdle = displayStage === -1;

  return (
    <div className="panel" id="demo-pipeline">
      <div className="panel-bar">
        <span className="dots"><i /><i /><i /></span>
        <span className="panel-title">HRMS — recruitment pipeline</span>
        <span className="live"><i /> Interactive</span>
      </div>
      <div className="panel-body">
        <div className="rec-nav">
          {STAGES.map((s, i) => (
            <div className={`rec-t ${i === stage ? 'active' : i <= done ? 'done' : ''}`} key={s.n}>
              <span className="st">Stage {i + 1}</span><b>{s.n}</b>
            </div>
          ))}
        </div>

        <div className="rec-stage">
          {showIdle && (
            <p className="small" style={{ color: 'var(--fg-4)' }}>
              Press run to generate a job description, parse a resume against it, rank the candidate and book the interview.
            </p>
          )}

          {displayStage === 0 && (
            <>
              <p className="eyebrow" style={{ marginBottom: 12 }}>AI-generated · editable per section</p>
              <div className="rec-jd">{jdText}{!jdDone && <span className="rec-cursor" />}</div>
            </>
          )}

          {displayStage === 1 && (
            <>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Extracted from Kavya_S_Resume.pdf</p>
              <dl className="rec-fields">
                {FIELDS.map((f, i) => (
                  <div className={`rec-f${i < fieldsShown ? ' in' : ''}`} key={f[0]}>
                    <dt>{f[0]}</dt><dd>{f[1]}</dd>
                    {f[2] ? <span className="warnflag">{f[2]}</span> : <span />}
                  </div>
                ))}
              </dl>
            </>
          )}

          {displayStage === 2 && (
            <>
              <p className="eyebrow" style={{ marginBottom: 14 }}>Scored against the generated requirements</p>
              <div className="cands">
                <div className="cand top">
                  <div className="cand-h"><b>Kavya S.<em>5 yrs</em></b><span className="cand-pct" style={{ color: 'var(--ok)' }}>{matchPct}%</span></div>
                  <span className="cand-bar"><i style={{ width: `${matchPct}%`, background: 'var(--ok)' }} /></span>
                  <div className="cand-sk">
                    <span className="has">Node.js</span><span className="has">Express</span>
                    <span className="has">MongoDB</span><span className="has">REST APIs</span>
                    <span className="miss">3+ yrs production</span>
                  </div>
                  <p className="cand-note"><WarnIcon /> Education field was low-confidence at parse — it does not contribute to this score</p>
                </div>
              </div>
            </>
          )}

          {displayStage === 3 && (
            <>
              <p className="eyebrow" style={{ marginBottom: 12 }}>Google Calendar — booked on confirmation</p>
              <div className="rec-cal">
                {EVENTS.slice(0, eventsShown).map(([title, meta]) => (
                  <div className="rec-ev" key={title}>
                    <span className="dot" /><b>{title}</b><span>{meta}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center', marginTop: 20 }}>
          <button className="btn btn-p" style={{ fontSize: '.83rem', padding: '9px 16px' }} disabled={running} onClick={run}>Run the pipeline</button>
          <button className="btn btn-s" style={{ fontSize: '.83rem', padding: '9px 16px' }} onClick={reset}>Reset</button>
          <span className="small" style={{ fontSize: '.78rem', color: 'var(--fg-3)' }}>{status}</span>
        </div>
        <div className="callout" style={{ marginTop: 18, fontSize: '.82rem' }} dangerouslySetInnerHTML={{ __html: note }} />
      </div>
    </div>
  );
}
