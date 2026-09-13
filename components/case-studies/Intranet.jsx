import Reveal from '../Reveal';
import SectionHead from '../ui/SectionHead';
import { Decision, Note } from '../ui/Decision';
import ReflectionGrid from '../ui/ReflectionGrid';
import NextProjectCTA from '../work/NextProjectCTA';
import CaseStudyHeader from '../work/CaseStudyHeader';

const FACTS = [
  { b: 'Project Lead', s: 'Frontend, backend and integrations' },
  { b: 'Next.js + Node.js', s: 'Full TypeScript stack' },
  { b: 'Sockets', s: 'Real-time messaging' },
  { b: '2 integrations', s: 'SSO-like bypass, Google Meet' },
];

const REFLECTIONS = [
  { t: 'Owning the full stack surfaces tradeoffs earlier', b: `Building the frontend and backend for the same feature meant I felt the cost of a bad API shape immediately, in my own component code. That feedback loop is something I didn't get on projects where the backend was someone else's scope.` },
  { t: 'Real-time features need a reconnect story before launch', b: `Early socket handling assumed a stable connection. The first real fix after launch was reconnect and state-sync on flaky networks — something I now design for from the start rather than adding after the first bug report.` },
];

export default function Intranet() {
  return (
    <>
      <CaseStudyHeader
        num="03"
        kicker="Internal platform · Next.js + Node.js · Project Lead"
        title="Intranet"
        titleEm="leading the build end to end"
        lead="An internal platform for company-wide communication and employee engagement, built with Next.js and Node.js (TypeScript). This was the first project where I owned the whole surface — frontend, backend and the third-party integrations wiring it together."
        facts={FACTS}
        role={{
          a: `I led this build end to end: the SSO-like login bypass that let employees move into internal apps without re-authenticating, an employee appreciation module, real-time messaging over sockets, and a Google Meet integration surfaced directly in the platform.`,
          b: `<span class="hl">Leading it meant every tradeoff was mine to make and mine to live with.</span> A frontend decision that made the socket layer awkward, or a backend shortcut that made a component hard to build cleanly — there was no one else's scope to defer to, which forced me to think across the whole stack rather than just my usual layer.`,
          roles: ['Full Stack Developer'],
        }}
        showNda={false}
      />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="01" label="The problem" title="Internal tools were scattered across logins and channels" />
          <div className="grid-2">
            <Reveal>
              <p className="body">
                Before this platform, internal communication was split across email threads, a separate
                HR tool, and ad hoc messaging apps — each with its own login. Employees appreciation and
                recognition had no home at all.
              </p>
            </Reveal>
            <Reveal i={1}>
              <p className="body">
                The brief was a single internal hub. The harder part was making it feel like <em>one</em>
                product rather than a shell that linked out to other tools — which meant solving login
                friction and building real-time features directly into it, not bolting them on.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="02" label="Engineering decisions" title="Three decisions that shaped the build" />

          <Decision label="Decision 01 · Authentication" title="Remove the second login, not just shorten it">
            <p className="body read">
              Employees already authenticate once against the company&apos;s identity provider. Asking them to
              log in again for every internal app was the single biggest source of friction reported in
              early feedback. I built an SSO-like bypass so a session on the intranet carried through to
              connected internal apps without a second prompt.
            </p>
            <Note label="Why it mattered" style={{ marginBottom: 10 }}>
              A hub that still asks you to log in again at every link isn&apos;t a hub — it&apos;s a bookmarks page. Removing that step is what made the platform feel like the actual front door to internal tools rather than a directory of them.
            </Note>
          </Decision>

          <Decision label="Decision 02 · Real-time messaging" title="Sockets instead of polling, from the start">
            <p className="body read">
              Company announcements and employee appreciation posts needed to feel live — reactions and
              comments appearing without a refresh. I built the messaging layer on sockets rather than
              polling, which meant designing the reconnect and state-sync behaviour up front instead of
              retrofitting it once the polling version felt sluggish.
            </p>
          </Decision>

          <Decision label="Decision 03 · Meetings" title="Bring the tool to the platform, not the platform to the tool">
            <p className="body read">
              Employees were already living in Google Meet for calls. Rather than build a competing
              video layer, I integrated Google Meet directly into the intranet so scheduling and joining
              a call stayed inside the same session as the rest of the platform — one less context switch
              in a product whose whole point was reducing context switches.
            </p>
          </Decision>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="03" label="Reflection" title="What I'd do differently" />
          <ReflectionGrid items={REFLECTIONS} />
        </div>
      </section>

      <NextProjectCTA currentSlug="intranet" />
    </>
  );
}
