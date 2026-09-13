import Reveal from '../Reveal';
import SectionHead from '../ui/SectionHead';
import { Decision, Beats } from '../ui/Decision';
import ScopeGrid from '../ui/ScopeGrid';
import ReflectionGrid from '../ui/ReflectionGrid';
import NextProjectCTA from '../work/NextProjectCTA';
import CaseStudyHeader from '../work/CaseStudyHeader';
import PolicyBuilderDemo from '../widgets/PolicyBuilderDemo';
import RemoteWipeDemo from '../widgets/RemoteWipeDemo';

const FACTS = [
  { b: 'Frontend', s: 'Built the core interfaces' },
  { b: '3 OS platforms', s: 'Android, Windows, Apple — one UI' },
  { b: 'React.js', s: 'Primary stack' },
  { b: '4 surfaces', s: 'Onboarding, policy, dashboard, monitoring' },
];

const ALSO_BUILT = [
  { t: 'Zero-touch enrolment', d: 'Devices provisioned and policy-configured without IT physically touching them' },
  { t: 'BYOD work profiles', d: 'Container separation with explicit, visible boundaries between work and personal' },
  { t: 'Compliance monitoring', d: 'Severity-ranked alerts, so the dashboard leads with what needs attention' },
  { t: 'Application management', d: 'Force-install, blocklists, managed Play Store, per-OS app policy' },
  { t: 'Audit logs', d: 'Every action timestamped and attributed, for security review' },
  { t: 'Device inventory', d: 'Fleet-wide search, grouping, ownership and lifecycle state' },
];

const REFLECTIONS = [
  { t: 'High-stakes interfaces need deliberate friction', b: `A misconfigured policy can lock hundreds of people out of their laptops. Every destructive action here shows a preview of exactly which devices are affected, before it runs. Low friction is a good default — irreversibility is when it stops being one.` },
  { t: 'Progressive disclosure has to be built, not just designed', b: `Fading irrelevant policies rather than hiding them sounds simple in a spec and took real care to implement so it stayed fast and legible with 70+ policies rendering and re-filtering live as platforms toggle.` },
  { t: 'What I would do differently', b: `I'd push for usage analytics on which policies admins actually touch versus leave at default. Without that data, decisions about what to surface first are informed guesses rather than something I can point to.` },
];

const TRUST_CAN_SEE = [
  'Apps installed in your work profile',
  'Work profile security settings',
  'Device model and OS version',
  'Whether disk encryption is on',
  'Corporate network connection status',
];
const TRUST_CANNOT_SEE = [
  'Personal photos, videos or files',
  'Personal messages, WhatsApp, SMS',
  'Browsing history outside work apps',
  'Personal app usage or activity',
  'Your location, at any time',
];

export default function MDM() {
  return (
    <>
      <CaseStudyHeader
        num="02"
        kicker="Device management · React.js · Frontend architecture"
        title="MDM"
        titleEm="a frontend for fleets you can't see"
        lead="One interface governing Android, Windows and Apple devices — device onboarding, organisation setup, policy enforcement and monitoring dashboards, built so an IT admin can reason about a fleet of devices they will never physically touch."
        facts={FACTS}
        role={{
          a: `I built the frontend interfaces for device onboarding, organisation setup, policy enforcement and the device management dashboards — the surfaces an IT admin uses to onboard a device, define what a policy does, and see the health of the fleet at a glance.`,
          b: `<span class="hl">The interesting problem was never one screen — it was one policy applying differently across three operating systems.</span> A password-length rule is universal. BitLocker only exists on Windows. Building a UI that could express both without either overwhelming the admin or hiding real differences was the actual work.`,
        }}
      />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="01" label="The problem" title="Cross-platform policy, one interface" />
          <div className="grid-2">
            <Reveal>
              <p className="body">
                Managing Android, Windows and Apple devices from separate tools means policy drifts between
                platforms — the same intent gets configured three times, and small inconsistencies compound
                into fleet-wide gaps nobody notices until an audit.
              </p>
            </Reveal>
            <Reveal i={1}>
              <p className="body">
                The brief was one interface for all three. The hard part wasn&apos;t fetching device state — it was
                a UI that could show which policies were universal and which were OS-specific, without either
                burying the admin in every possible setting or hiding platform differences that actually matter.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="02" label="Engineering decisions" title="Three decisions that shaped the build" />

          <Decision label="Decision 01 · BYOD enrolment" title="Make the boundary between work and personal explicit in the UI">
            <p className="body read">
              Enrolling a personal device creates a separate work profile on it. That distinction is easy to
              state and hard to make someone believe from a settings screen — so I built an explicit,
              plain-language screen listing what IT can see and what it can never see, shown before the work
              profile is created rather than buried in a policy document afterwards.
            </p>
            <div className="panel">
              <div className="panel-bar">
                <span className="dots"><i /><i /><i /></span>
                <span className="panel-title">MDM — enrolment, step 3 of 5</span>
                <span className="live" style={{ color: 'var(--fg-3)' }}><i style={{ background: 'var(--fg-3)' }} /> Recreation</span>
              </div>
              <div className="panel-body">
                <p className="h4" style={{ marginBottom: 6 }}>Before you continue — here&apos;s exactly what this does</p>
                <p className="small" style={{ marginBottom: 22, maxWidth: '52ch' }}>Your work profile is separate from your personal one. This is the full list. Nothing is omitted.</p>
                <div className="grid-2 tight">
                  <div>
                    <p className="eyebrow" style={{ color: 'var(--warn)', marginBottom: 12 }}>What IT can see</p>
                    <div className="trust">
                      {TRUST_CAN_SEE.map((t) => (
                        <div className="trust-r" key={t}><span className="trust-ic" style={{ background: 'var(--warn-bg)', color: 'var(--warn)' }}>●</span><p>{t}</p></div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="eyebrow" style={{ color: 'var(--ok)', marginBottom: 12 }}>What IT can never see</p>
                    <div className="trust">
                      {TRUST_CANNOT_SEE.map((t) => (
                        <div className="trust-r" key={t}><span className="trust-ic" style={{ background: 'var(--ok-bg)', color: 'var(--ok)' }}>✓</span><p>{t}</p></div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="callout" style={{ marginTop: 22, fontSize: '.82rem' }}>
                  You can unenrol at any time from Settings. Your personal data is never touched — removing the work profile deletes only work data.
                </div>
              </div>
            </div>
          </Decision>

          <Decision label="Decision 02 · Policy architecture" title="One form, three operating systems">
            <p className="body read">
              Some policies are universal — password length. Some are OS-specific — BitLocker on Windows,
              AirDrop on Apple, factory-reset protection on Android. A tabbed-by-OS layout would have made an
              admin configure the same intent three times and hope they matched. A flat list of every policy
              was honest but paralysing.
            </p>
            <p className="body read" style={{ marginTop: 14 }}>
              I built one form instead. Selecting target platforms visibly fades irrelevant policies rather
              than hiding them, so the admin learns the coverage model instead of just being shielded from it.
            </p>
            <PolicyBuilderDemo />
          </Decision>

          <Decision label="Decision 03 · Destructive actions" title="Show the blast radius before the click, not after">
            <p className="body read">
              Remote wipe, access revocation and fleet-wide policy pushes are the features IT buys the product
              for, and the ones that go wrong loudest — a policy targeting the wrong device group can lock out
              hundreds of laptops in one action. A generic &quot;Are you sure?&quot; modal doesn&apos;t stop that, because the
              admin already believes they&apos;re sure.
            </p>
            <p className="body read" style={{ marginTop: 14 }}>
              I built the confirmation to name the actual devices and owners affected, scale the confirmation
              requirement with the size of the target group, and give a live undo window before the command
              dispatches.
            </p>
            <RemoteWipeDemo />
            <p className="small" style={{ marginTop: 12, color: 'var(--fg-4)', fontSize: '.76rem' }}>
              Try <strong style={{ color: 'var(--fg-3)' }}>Remote wipe</strong> on <strong style={{ color: 'var(--fg-3)' }}>All Windows devices</strong> — the confirmation requirement scales with the blast radius, and the undo window is real.
            </p>
          </Decision>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="03" label="Also built" title="The rest of the surface" />
          <ScopeGrid items={ALSO_BUILT} />
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="04" label="Reflection" title="What I'd do differently" />
          <ReflectionGrid items={REFLECTIONS} />
        </div>
      </section>

      <NextProjectCTA currentSlug="mdm" />
    </>
  );
}
