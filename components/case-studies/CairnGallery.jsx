'use client';

import { useState } from 'react';
import Image from 'next/image';
import SectionHead from '../ui/SectionHead';
import LightboxModal from '../ui/LightboxModal';

const SCREENSHOTS = [
  { id: 'overview', title: 'Central Operations Hub & Urgency Triage', src: '/projects/cairn/02_dashboard_overview.png', path: 'cairn.internal/dashboard/overview', tag: 'Dashboard Overview', caption: 'Displays the daily automated runner status (03:00 UTC check), quick metrics (13 documents, 7 open tasks, 2 triage items), and an urgency-ranked "Needs your attention" list with failed alert diagnostics.' },
  { id: 'vault', title: 'Documents Vault & Expiry Pipelines', src: '/projects/cairn/03_documents_vault.png', path: 'cairn.internal/documents/vault', tag: 'Documents Vault', caption: 'Tracks vital records (Passports, National IDs, Vehicle RC, Insurance, Leases) with category filtering, storage quotas, and real-time countdown chips down to the second.' },
  { id: 'automations', title: 'Rule Pipeline Engine & 1-Click Recipes', src: '/projects/cairn/05_automations_rules.png', path: 'cairn.internal/automations', tag: 'Automation Rules', caption: '1-click pre-configured alert recipes (Passport 60d, Lease 30d, Utility Bill 7d) alongside a custom rule builder with active pause/delete toggles.' },
  { id: 'tasks', title: 'Shared Tasks & Chores Coordination Board', src: '/projects/cairn/04_tasks_and_chores.png', path: 'cairn.internal/tasks', tag: 'Tasks & Chores', caption: 'Real-time status cycling, completion velocity tracking (30%), quick duty search, and multi-member assignment across the household.' },
  { id: 'whatsapp', title: 'WhatsApp Assistant Bot Simulator', src: '/projects/cairn/08_whatsapp_assistant_simulator.png', path: 'cairn.internal/assistant/simulator', tag: 'WhatsApp Bot', caption: 'Full conversational assistant simulator: snap receipts for auto-expense logging, query expiring policies, and confirm maintenance tasks on the go.' },
  { id: 'triage', title: 'Needs Review & Human Triage Queue', src: '/projects/cairn/06_needs_review_queue.png', path: 'cairn.internal/review/queue', tag: 'Human Triage', caption: 'Human-in-the-loop review queue holding ambiguous OCR captures, unexpected bill spikes, or new document detections for 1-click confirmation.' },
  { id: 'settings', title: 'Household & Bot Configuration', src: '/projects/cairn/07_household_and_bot_settings.png', path: 'cairn.internal/settings/bot', tag: 'Bot Configuration', caption: 'Manage member phone numbers, WhatsApp bot pairing tokens, notification quiet hours, and daily digest dispatch schedules.' },
  { id: 'login', title: 'Household OS Login & Entry Screen', src: '/projects/cairn/01_login_showcase.png', path: 'cairn.internal/login', tag: 'Authentication', caption: 'Clean, warm terracotta aesthetic featuring Google OAuth, password login, and live preview telemetry cards for household policies and maintenance.' },
  { id: 'light-mode', title: 'Light Theme Overview Dashboard', src: '/projects/cairn/09_dashboard_overview_light.png', path: 'cairn.internal/dashboard?theme=light', tag: 'Light Mode', caption: 'Crisp, high-contrast light theme with tailored warm neutrals, terracotta accents, and readable status badges for daytime household audits.' },
];

function ScreenshotCard({ shot, index, featured = false, onOpen }) {
  return (
    <div
      className="cs-shot-frame"
      onClick={() => onOpen(index)}
      title={`Open screenshot: ${shot.title}`}
    >
      <div className="cs-shot-bar">
        <div className="cs-shot-dots" aria-hidden="true">
          <span className="cs-shot-dot" />
          <span className="cs-shot-dot" />
          <span className="cs-shot-dot" />
        </div>
        <span className="cs-shot-title">{shot.path}</span>
        {featured && <span className="cs-shot-tag">Central Operations Hub</span>}
      </div>
      <div className="cs-shot-media">
        <Image
          src={shot.src}
          alt={shot.title}
          width={2880}
          height={1800}
          sizes={featured ? '(max-width: 1160px) 100vw, 1160px' : '(max-width: 960px) 100vw, 560px'}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
        <span className="cs-shot-expand-pill" aria-hidden="true">
          ⤢ Full View{featured ? ' (2880 × 1800)' : ''}
        </span>
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
}

export default function CairnGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <>
      <section className="sect">
        <div className="wrap">
          <SectionHead num="04" label="Interface showcase" title="Production interfaces built for calm coordination" />
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 12, marginBottom: 36 }}>
            <p className="lead read" style={{ margin: 0 }}>
              All 9 captured screens rendered at 2880 × 1800 Retina resolution. Open any screenshot in the full-screen viewer.
            </p>
            <span style={{ fontSize: '.76rem', fontFamily: 'var(--mono)', color: 'var(--ac)', background: 'var(--ac-bg)', border: '1px solid var(--ac-line)', padding: '4px 10px', borderRadius: 6 }}>
              Open any image to expand full view
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 36 }}>
            <ScreenshotCard shot={SCREENSHOTS[0]} index={0} featured onOpen={setLightboxIndex} />
            <div className="grid-2">
              {SCREENSHOTS.slice(1).map((shot, index) => (
                <ScreenshotCard key={shot.id} shot={shot} index={index + 1} onOpen={setLightboxIndex} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <LightboxModal
        images={SCREENSHOTS}
        currentIndex={lightboxIndex}
        isOpen={lightboxIndex >= 0}
        onClose={() => setLightboxIndex(-1)}
        onPrev={() => setLightboxIndex((index) => (index > 0 ? index - 1 : SCREENSHOTS.length - 1))}
        onNext={() => setLightboxIndex((index) => (index < SCREENSHOTS.length - 1 ? index + 1 : 0))}
      />
    </>
  );
}
