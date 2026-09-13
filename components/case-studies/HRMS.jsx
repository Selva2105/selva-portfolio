import Reveal from '../Reveal';
import SectionHead from '../ui/SectionHead';
import { Decision, Beats, Note } from '../ui/Decision';
import ScopeGrid from '../ui/ScopeGrid';
import ReflectionGrid from '../ui/ReflectionGrid';
import NextProjectCTA from '../work/NextProjectCTA';
import CaseStudyHeader from '../work/CaseStudyHeader';
import LeaveCalendarDemo from '../widgets/LeaveCalendarDemo';
import RecruitmentPipelineDemo from '../widgets/RecruitmentPipelineDemo';

const FACTS = [
  { b: 'Frontend + backend', s: 'React.js UI, Node.js recruitment APIs' },
  { b: '3 core modules', s: 'Attendance, leave, employee management' },
  { b: '1,000+', s: 'Employees using it live' },
  { b: 'TypeScript', s: 'Across the full module stack' },
];

const ALSO_BUILT = [
  { t: 'Employee management', d: 'Core employee records, org chart and role-based visibility' },
  { t: 'Approval chains', d: 'Multi-level routing configured against org hierarchy' },
  { t: 'Employee directory', d: 'Search, reporting lines and profile detail' },
  { t: 'Holiday calendar', d: 'Regional calendars with per-location configuration' },
];

const REFLECTIONS = [
  { t: 'Cross-module state is where the real bugs live', b: `A leave approval that doesn't reflect in attendance, or a recruitment stage that drifts from the employee record it's about to create, breaks trust in the whole platform — not just one module. I now design the data flow between modules before the component tree inside any one of them.` },
  { t: 'Reschedule and cancel are harder than create', b: `Booking an interview is the easy path. Handling every state a reschedule or cancellation can leave behind — a stale calendar invite, a candidate who never got notified — is where most of the actual engineering time went.` },
  { t: 'What I would do differently', b: `I'd push earlier for shared integration tests across modules that touch the same employee record, instead of catching cross-module bugs manually after each module shipped separately.` },
];

export default function HRMS() {
  return (
    <>
      <CaseStudyHeader
        num="01"
        kicker="Enterprise HRMS · React.js + TypeScript · Node.js"
        title="HRMS"
        titleEm="building modules that share one truth"
        lead="A multi-module HR platform for a 1,000-person organisation, built at Brilyant IT Solutions. The UI was never the hard part. The hard part was keeping attendance, leave and recruitment consistent with each other when they all read and write the same employee record."
        facts={FACTS}
        role={{
          a: `I built the core employee-facing modules — attendance, leave management, employee management — in React.js and TypeScript, and contributed to the Node.js backend for the recruitment module: meeting scheduling, rescheduling and cancellation workflows.`,
          b: `Because these modules all touch the same employee record, <span class="hl">most of the interesting problems were about state consistency, not any single screen.</span> A leave approval that doesn't reflect in attendance, or a recruitment stage that drifts from the employee record it's about to create, breaks trust in the whole platform — not just one module.`,
        }}
      />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="01" label="The problem" title="HR was managing people with tools built for filing cabinets" />
          <div className="grid-2">
            <Reveal>
              <blockquote className="quote">
                <p>&quot;I have five spreadsheets open just to approve one leave request. I have to check the policy, the calendar, the balance, the org chart — none of them talk to each other.&quot;</p>
                <cite>HR Manager — requirements walkthrough</cite>
              </blockquote>
            </Reveal>
            <Reveal i={1}>
              <p className="body">
                Leave requests died in email threads. Attendance had to be manually cross-checked every
                month. Recruitment scheduling was a chain of back-and-forth emails between HR and
                candidates with no record of who confirmed what.
              </p>
              <p className="body">
                The organisation&apos;s actual policy also didn&apos;t match the textbook: sandwich leave applied to
                some leave types and not others, and grace periods had tiers rather than a binary — which
                meant the rules had to live in the data model, not just the copy on a screen.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="02" label="Engineering decisions" title="Three decisions that carried the build" />

          <Decision label="Decision 01 · Leave management" title="Show the cost of a decision before it's made, not after">
            <p className="body read">
              Sandwich leave is a policy where taking leave either side of a weekend deducts the weekend too.
              Apply for Friday and Monday, lose four days, not two. It&apos;s standard in Indian employment policy
              and it is universally misunderstood by employees.
            </p>
            <Beats
              items={[
                { lbl: 'What shipped first', kind: 'bad', body: 'A warning on the confirmation screen, after the employee picked their dates. Technically accurate. Correctly worded.' },
                { lbl: 'What broke', kind: 'bad', body: "Employees submitted anyway, then disputed the deduction after approval. The warning arrived after they'd already committed — reversing it meant unwinding an approved request through HR." },
                { lbl: 'What shipped instead', kind: 'good', body: "A live day counter inside the date picker itself. The number updates as you select. Sandwich days highlight in the calendar in a distinct state. You see four days before you've decided on two." },
              ]}
            />
            <Note label="Why this matters beyond leave" style={{ marginBottom: 30 }}>
              A warning placed after commitment isn&apos;t a warning — it&apos;s an explanation. Any interface where the system&apos;s arithmetic differs from the user&apos;s mental model has this problem, and the fix is almost always to move the truth earlier, into the moment of choice.
            </Note>
            <LeaveCalendarDemo />
            <p className="small" style={{ marginTop: 12, color: 'var(--fg-4)', fontSize: '.76rem' }}>
              Sandwich detection is configurable per leave type — enabled on Casual, disabled on Earned and Sick.
              Switch the type above and reselect to see the rule change.
            </p>
          </Decision>

          <Decision label="Decision 02 · Attendance" title="Give the dispute to the person who has the evidence">
            <p className="body read">
              Biometric and web check-in both feed one attendance log, with a configurable grace period that
              classifies lateness into tiers rather than a binary. The interesting problem wasn&apos;t capture —
              it was what happens when the log is wrong.
            </p>
            <Beats
              items={[
                { lbl: 'The default', kind: 'bad', body: 'Employee emails HR. HR checks the device log, corrects the record manually, replies. Slow, and every correction is a one-off conversation.' },
                { lbl: 'The real asymmetry', kind: 'bad', body: 'HR has the system access but the employee has the evidence — they know they badged in at 9:02 and the reader failed. Routing through HR puts the decision furthest from the facts.' },
                { lbl: 'What shipped', kind: 'good', body: 'Employees file the correction themselves with actual time and reason. HR gets a reviewable queue with bulk approve and date-range filters, added after watching managers clear disputes one at a time.' },
              ]}
            />
          </Decision>

          <Decision label="Decision 03 · Recruitment" title="A schedule that survives being changed">
            <p className="body read">
              On the Node.js backend for the recruitment module, the actual complexity wasn&apos;t booking an
              interview — it was rescheduling and cancelling one without leaving the candidate, the
              interviewer and the calendar in three different states.
            </p>
            <p className="body read" style={{ marginTop: 14 }}>
              A reschedule has to update the calendar invite, notify both sides, and preserve the interview
              history so a recruiter can see it moved rather than looking like it vanished and reappeared.
              A cancellation has to free the interviewer&apos;s slot without silently dropping the candidate from
              the pipeline.
            </p>
            <RecruitmentPipelineDemo />
          </Decision>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="03" label="Also built" title="The rest of the platform" />
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

      <NextProjectCTA currentSlug="hrms" />
    </>
  );
}
