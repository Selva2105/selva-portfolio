'use client';

import { useState } from 'react';
import Image from 'next/image';
import Reveal from '../Reveal';
import SectionHead from '../ui/SectionHead';
import { Decision, Beats, Note } from '../ui/Decision';
import ReflectionGrid from '../ui/ReflectionGrid';
import NextProjectCTA from '../work/NextProjectCTA';
import CaseStudyHeader from '../work/CaseStudyHeader';
import SignalPipelineDemo from '../widgets/SignalPipelineDemo';
import LightboxModal from '../ui/LightboxModal';
import DecisionQueueDiagram from './cairn-diagrams/DecisionQueueDiagram';
import DecisionMonorepoDiagram from './cairn-diagrams/DecisionMonorepoDiagram';
import DecisionMultiChannelDiagram from './cairn-diagrams/DecisionMultiChannelDiagram';

const FACTS = [
  { b: 'Nx Monorepo', s: 'web, api, worker & bot' },
  { b: 'BullMQ + Redis', s: 'Event-driven job queues' },
  { b: 'WhatsApp + Email', s: 'Multi-channel delivery' },
  { b: 'NestJS + Next.js 14', s: 'Modular backend + App Router' },
];

const REFLECTIONS = [
  {
    t: 'Silent background workers need audit logs, not just status booleans',
    b: `When an automated alert fails to send at 03:00 UTC because of an expired carrier token or a network timeout, nobody is watching the terminal. Adding a persistent alert audit log with explicit retry tracking was what turned background cron jobs from a gamble into an infrastructure I could actually rely on.`,
  },
  {
    t: 'Data entry friction is the single predictor of platform abandonment',
    b: `If logging a receipt or noting an upcoming maintenance window requires opening a laptop, logging in, and navigating three menus, it won't happen. Wiring a WhatsApp bot directly into the BullMQ ingestion pipeline meant action items could be captured from a phone in five seconds, keeping the database alive.`,
  },
  {
    t: 'What I would do differently: Build event replay from day one',
    b: `I initially ran migrations directly against rule tables without storing the raw incoming event stream. When I updated the rule evaluator to support multi-stage warning windows (e.g. 60 days, then 14 days, then 3 days), I had to re-evaluate active documents by hand. Storing an immutable append-only event log would have allowed instantaneous replaying.`,
  },
];

const SCREENSHOTS = [
  {
    id: 'overview',
    title: 'Central Operations Hub & Urgency Triage',
    src: '/projects/cairn/02_dashboard_overview.png',
    path: 'cairn.internal/dashboard/overview',
    tag: 'Dashboard Overview',
    caption: 'Displays the daily automated runner status (03:00 UTC check), quick metrics (13 documents, 7 open tasks, 2 triage items), and an urgency-ranked "Needs your attention" list with failed alert diagnostics.',
  },
  {
    id: 'vault',
    title: 'Documents Vault & Expiry Pipelines',
    src: '/projects/cairn/03_documents_vault.png',
    path: 'cairn.internal/documents/vault',
    tag: 'Documents Vault',
    caption: 'Tracks vital records (Passports, National IDs, Vehicle RC, Insurance, Leases) with category filtering, storage quotas, and real-time countdown chips down to the second.',
  },
  {
    id: 'automations',
    title: 'Rule Pipeline Engine & 1-Click Recipes',
    src: '/projects/cairn/05_automations_rules.png',
    path: 'cairn.internal/automations',
    tag: 'Automation Rules',
    caption: '1-click pre-configured alert recipes (Passport 60d, Lease 30d, Utility Bill 7d) alongside a custom rule builder with active pause/delete toggles.',
  },
  {
    id: 'tasks',
    title: 'Shared Tasks & Chores Coordination Board',
    src: '/projects/cairn/04_tasks_and_chores.png',
    path: 'cairn.internal/tasks',
    tag: 'Tasks & Chores',
    caption: 'Real-time status cycling, completion velocity tracking (30%), quick duty search, and multi-member assignment across the household.',
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Assistant Bot Simulator',
    src: '/projects/cairn/08_whatsapp_assistant_simulator.png',
    path: 'cairn.internal/assistant/simulator',
    tag: 'WhatsApp Bot',
    caption: 'Full conversational assistant simulator: snap receipts for auto-expense logging, query expiring policies, and confirm maintenance tasks on the go.',
  },
  {
    id: 'triage',
    title: 'Needs Review & Human Triage Queue',
    src: '/projects/cairn/06_needs_review_queue.png',
    path: 'cairn.internal/review/queue',
    tag: 'Human Triage',
    caption: 'Human-in-the-loop review queue holding ambiguous OCR captures, unexpected bill spikes, or new document detections for 1-click confirmation.',
  },
  {
    id: 'settings',
    title: 'Household & Bot Configuration',
    src: '/projects/cairn/07_household_and_bot_settings.png',
    path: 'cairn.internal/settings/bot',
    tag: 'Bot Configuration',
    caption: 'Manage member phone numbers, WhatsApp bot pairing tokens, notification quiet hours, and daily digest dispatch schedules.',
  },
  {
    id: 'login',
    title: 'Household OS Login & Entry Screen',
    src: '/projects/cairn/01_login_showcase.png',
    path: 'cairn.internal/login',
    tag: 'Authentication',
    caption: 'Clean, warm terracotta aesthetic featuring Google OAuth, password login, and live preview telemetry cards for household policies and maintenance.',
  },
  {
    id: 'light-mode',
    title: 'Light Theme Overview Dashboard',
    src: '/projects/cairn/09_dashboard_overview_light.png',
    path: 'cairn.internal/dashboard?theme=light',
    tag: 'Light Mode',
    caption: 'Crisp, high-contrast light theme with tailored warm neutrals, terracotta accents, and readable status badges for daytime household audits.',
  },
];

export default function Cairn() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  function openLightbox(index) {
    setLightboxIndex(index);
  }

  function closeLightbox() {
    setLightboxIndex(-1);
  }

  function prevImage() {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : SCREENSHOTS.length - 1));
  }

  function nextImage() {
    setLightboxIndex((prev) => (prev < SCREENSHOTS.length - 1 ? prev + 1 : 0));
  }

  return (
    <>
      <CaseStudyHeader
        num="06"
        kicker="Personal project · Event-Driven System · Nx Monorepo · NestJS + Next.js 14"
        title="Cairn"
        titleEm="catching household signals before they become emergencies"
        lead="A self-hosted, event-driven household operations platform designed to ingest messy real-world signals — renewing bills, expiring documents, home maintenance, and buried action items — and route timely alerts through WhatsApp and email. Architected as an Nx monorepo with modular NestJS services, BullMQ + Redis job queues, Prisma ORM on PostgreSQL, and a Next.js App Router dashboard."
        facts={FACTS}
        role={{
          a: `I architected and built the entire system end to end — structuring the Nx monorepo, designing the PostgreSQL schemas via Prisma, implementing the BullMQ and Redis job pipeline, and building the Next.js 14 App Router dashboard with a custom dark-mode UI. To eliminate data entry friction, I integrated a WhatsApp bot for conversational receipt logging and task updates.`,
          b: `Household problems don't happen because people don't care; they happen because <span class="hl">real-world signals arrive silently and scatter</span> across inboxes, physical drawers, and message threads. Solving this required an event-driven architecture that treats household events like enterprise background jobs: queued, retried, deduplicated, and dispatched to the channels people actually read.`,
          roles: ['System Architect', 'Full Stack Developer'],
        }}
        showNda={false}
      />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="01" label="The problem" title="Household entropy is an event ingestion problem" />
          <div className="grid-2">
            <Reveal>
              <blockquote className="quote">
                <p>&ldquo;We never had an emergency because we lacked a calendar. We had emergencies because the things that broke were never on the calendar in the first place.&rdquo;</p>
                <cite>Personal retrospective on household coordination</cite>
              </blockquote>
            </Reveal>
            <Reveal i={1}>
              <p className="body">
                Most personal productivity software assumes users will sit down at a desktop computer and
                diligently populate pristine date pickers. But real life produces noisy, asynchronous
                signals: an insurance policy renewal letter buried in physical mail, a quarterly HVAC filter
                requirement that has no calendar invite, or a passport with eight months of validity left
                before international travel rules block entry.
              </p>
              <p className="body">
                When these signals fall through the cracks, the consequence isn&apos;t a missed to-do item —
                it&apos;s lapsed coverage, penalty fees, or emergency replacements. The goal of Cairn was to
                build a reliable ingestion engine that normalizes messy inputs, schedules early warning
                windows, and notifies the right person before an action becomes urgent.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="02" label="Engineering decisions" title="Architecting for reliability and low friction" />

          {/* Decision 01 */}
          <Decision label="Decision 01 · Background architecture" title="Decouple signal ingestion from delivery workers with BullMQ & Redis">
            <div className="dec-split">
              <div>
                <p className="body read">
                  A standard pitfall in personal dashboards is running alert logic inside web request handlers
                  or relying on naive cron scripts. If an external API (like an SMTP provider or WhatsApp webhook)
                  times out, the cron crashes and subsequent alerts are dropped silently.
                </p>
                <Beats
                  items={[
                    {
                      lbl: 'The naive approach',
                      kind: 'bad',
                      body: 'A single midnight cron job that queries expiring documents and attempts synchronous email dispatch. Any single network failure halts the loop.',
                    },
                    {
                      lbl: 'What broke in testing',
                      kind: 'bad',
                      body: 'A rate limit on the messaging gateway aborted the cron midway, leaving the remaining ten documents unreviewed for 24 hours without notification.',
                    },
                    {
                      lbl: 'What Cairn ships',
                      kind: 'good',
                      body: 'A BullMQ queue backed by Redis. An ingestion worker produces discrete evaluation jobs with automatic exponential backoff, retry limits, and dead-letter queues.',
                    },
                    {
                      lbl: 'The outcome',
                      kind: 'good',
                      body: 'Durable message queue with automatic retry, dead-letter monitoring, and zero silent alert failures across 6+ months of daily runs.',
                    },
                  ]}
                />
              </div>

              {/* Right Side SVG Diagram */}
              <div>
                <DecisionQueueDiagram />
              </div>
            </div>

            <Note label="Why this matters" style={{ marginTop: 20 }}>
              Household operations run on long time horizons (30, 60, or 90 days). If an alert drops silently,
              the user might not find out until months later. Isolating each alert into a durable Redis job ensures
              that transient delivery failures are retried automatically without manual intervention.
            </Note>
          </Decision>

          {/* Decision 02 */}
          <Decision label="Decision 02 · Monorepo structure" title="Nx monorepo with modular NestJS services and Next.js 14">
            <div className="dec-split">
              <div>
                <p className="body read">
                  Rather than maintaining disconnected repositories for the web UI, worker services, and messaging bot,
                  I organized Cairn as an <strong>Nx monorepo</strong>. The frontend runs on Next.js 14 App Router,
                  while the API, rule execution pipeline, and background workers run on modular NestJS applications.
                </p>
                <p className="body read" style={{ marginTop: 14 }}>
                  Sharing Prisma schema models, Zod validation schemas, and TypeScript interface contracts across
                  all apps ensures that when a document type or rule trigger condition changes, the API, the
                  dashboard, and the WhatsApp bot all adapt with compile-time type safety.
                </p>
                <Beats
                  items={[
                    {
                      lbl: 'Unified Contracts',
                      kind: 'good',
                      body: 'Zod DTOs shared between the NestJS validation pipe and Next.js Server Actions.',
                    },
                    {
                      lbl: 'Isolated Workers',
                      kind: 'good',
                      body: 'Background jobs run in separate worker processes without blocking the HTTP web server.',
                    },
                  ]}
                />
              </div>

              {/* Right Side SVG Diagram */}
              <div>
                <DecisionMonorepoDiagram />
              </div>
            </div>
          </Decision>

          {/* Decision 03 */}
          <Decision label="Decision 03 · Multi-channel delivery" title="Push where attention already lives, summarize where records belong">
            <div className="dec-split">
              <div>
                <p className="body read">
                  An alert sitting in an unread web dashboard is useless. Cairn splits delivery across two channels:
                  <strong> WhatsApp</strong> for immediate, actionable updates (e.g., &ldquo;Filter replacement due in 4 days&rdquo;
                  or confirming a logged bill), and a <strong>daily 03:00 UTC email digest</strong> that provides an
                  aggregated household status report.
                </p>
                <p className="body read" style={{ marginTop: 14 }}>
                  For ambiguous inputs, Cairn introduces a <em>&ldquo;Needs your OK&rdquo;</em> triage queue on the dashboard.
                  Rather than spamming the household with uncertain notifications, the system holds flagged items until
                  a member approves or dismisses them with one click.
                </p>
              </div>

              {/* Right Side SVG Diagram */}
              <div>
                <DecisionMultiChannelDiagram />
              </div>
            </div>

            <Note label="Calm Coordination" style={{ marginTop: 20 }}>
              High-signal, low-noise: urgent deadlines bypass queues into WhatsApp, while weekly status rollups stay
              neatly aggregated in email digests.
            </Note>
          </Decision>
        </div>
      </section>

      <hr className="rule" />

      {/* Interactive Pipeline Demo */}
      <section className="sect">
        <div className="wrap">
          <SectionHead num="03" label="Live simulation" title="How signals travel through Cairn" />
          <p className="lead read" style={{ marginBottom: 12 }}>
            Test how Cairn takes heterogeneous real-world signals, schedules them in BullMQ, evaluates
            rule conditions, and routes them to WhatsApp or email. Adjust the threshold slider or click interactive quick replies.
          </p>
          <SignalPipelineDemo />
        </div>
      </section>

      <hr className="rule" />

      {/* Visual Interface Showcase with Full View Lightbox */}
      <section className="sect">
        <div className="wrap">
          <SectionHead num="04" label="Interface showcase" title="Production interfaces built for calm coordination" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
            <p className="lead read" style={{ margin: 0 }}>
              All 9 captured screens rendered at 2880 × 1800 Retina resolution. Click any screenshot to open the full-screen interactive viewer.
            </p>
            <span style={{ fontSize: '.76rem', fontFamily: 'var(--mono)', color: 'var(--ac)', background: 'var(--ac-bg)', border: '1px solid var(--ac-line)', padding: '4px 10px', borderRadius: 6 }}>
              🔍 Click any image to expand full view
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            {/* 1. Hero Overview Dashboard */}
            <div
              className="cs-shot-frame"
              onClick={() => openLightbox(0)}
              title="Click to view full screen"
            >
              <div className="cs-shot-bar">
                <div className="cs-shot-dots">
                  <span className="cs-shot-dot" />
                  <span className="cs-shot-dot" />
                  <span className="cs-shot-dot" />
                </div>
                <span className="cs-shot-title">{SCREENSHOTS[0].path}</span>
                <span className="cs-shot-tag">Central Operations Hub</span>
              </div>
              <div className="cs-shot-media">
                <Image
                  src={SCREENSHOTS[0].src}
                  alt={SCREENSHOTS[0].title}
                  width={2880}
                  height={1800}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                />
                <span className="cs-shot-expand-pill">⤢ Full View (2880 × 1800)</span>
              </div>
              <div className="cs-shot-caption">
                <div>
                  <b>{SCREENSHOTS[0].title}</b>
                  <p>{SCREENSHOTS[0].caption}</p>
                </div>
                <span className="cs-shot-tag">{SCREENSHOTS[0].tag}</span>
              </div>
            </div>

            {/* Grid of Remaining 8 Screenshots */}
            <div className="grid-2">
              {SCREENSHOTS.slice(1).map((shot, idx) => {
                const actualIndex = idx + 1;
                return (
                  <div
                    key={shot.id}
                    className="cs-shot-frame"
                    onClick={() => openLightbox(actualIndex)}
                    title="Click to view full screen"
                  >
                    <div className="cs-shot-bar">
                      <div className="cs-shot-dots">
                        <span className="cs-shot-dot" />
                        <span className="cs-shot-dot" />
                        <span className="cs-shot-dot" />
                      </div>
                      <span className="cs-shot-title">{shot.path}</span>
                    </div>
                    <div className="cs-shot-media">
                      <Image
                        src={shot.src}
                        alt={shot.title}
                        width={2880}
                        height={1800}
                        style={{ width: '100%', height: 'auto', display: 'block' }}
                        loading="lazy"
                      />
                      <span className="cs-shot-expand-pill">⤢ Full View</span>
                    </div>
                    <div className="cs-shot-caption">
                      <div>
                        <b>{shot.title}</b>
                        <p>{shot.caption}</p>
                      </div>
                      <span className="cs-shot-tag">{shot.tag}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <hr className="rule" />

      {/* Reflections */}
      <section className="sect">
        <div className="wrap">
          <SectionHead num="05" label="Reflection" title="Engineering lessons from real household usage" />
          <ReflectionGrid items={REFLECTIONS} />
        </div>
      </section>

      <NextProjectCTA currentSlug="cairn" />

      {/* Full View Lightbox Modal */}
      <LightboxModal
        images={SCREENSHOTS}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={closeLightbox}
        onPrev={prevImage}
        onNext={nextImage}
      />
    </>
  );
}
