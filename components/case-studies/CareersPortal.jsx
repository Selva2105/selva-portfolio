import Reveal from '../Reveal';
import SectionHead from '../ui/SectionHead';
import { Decision, Note } from '../ui/Decision';
import ReflectionGrid from '../ui/ReflectionGrid';
import NextProjectCTA from '../work/NextProjectCTA';
import CaseStudyHeader from '../work/CaseStudyHeader';

const FACTS = [
  { b: 'Full revamp', s: 'UI/UX + responsiveness' },
  { b: 'AI parsing', s: 'Resume intake automated' },
  { b: 'Frontend', s: 'Primary ownership' },
  { b: '1 pipeline', s: 'Less manual triage for recruiters' },
];

const REFLECTIONS = [
  { t: 'Recruiter trust in AI output is a UI problem, not just a model problem', b: `The parsing accuracy mattered less than whether a recruiter could quickly confirm it. Making the source resume one click away did more for adoption than tuning the extraction further would have.` },
  { t: 'What I would do differently', b: `I'd instrument how often recruiters actually opened the source resume to double-check a parsed field. That number would tell me directly whether the trust problem was solved or just assumed to be.` },
];

export default function CareersPortal() {
  return (
    <>
      <CaseStudyHeader
        num="04"
        kicker="AI integration · Frontend revamp · Candidate workflow"
        title="Careers Portal"
        titleEm="letting AI take the first pass"
        lead="A revamp of the company's careers portal — frontend UI/UX and responsiveness — followed by AI-based resume parsing, so recruiters see a structured summary instead of reading every resume end to end."
        facts={FACTS}
        role={{
          a: `I rebuilt the careers portal frontend for a cleaner, more responsive candidate experience, then integrated AI-based resume parsing on top of it — extracting structured fields from uploaded resumes so recruiters get a scannable summary instead of a raw PDF.`,
          b: `<span class="hl">The two halves of this project taught different lessons.</span> The frontend revamp was about candidate experience — fewer steps, clearer states. The AI integration was about recruiter trust — making the parsed output easy to verify against the original resume rather than something they had to take on faith.`,
          roles: ['Full Stack Developer'],
        }}
        showNda={false}
      />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="01" label="The problem" title="A dated portal, and a resume pile nobody had time for" />
          <div className="grid-2">
            <Reveal>
              <p className="body">
                The existing careers portal was slow to navigate on mobile and gave candidates little
                feedback after they applied. On the recruiter side, every application arrived as a raw
                resume file — no structure, no summary, no way to scan forty of them quickly.
              </p>
            </Reveal>
            <Reveal i={1}>
              <p className="body">
                These were two separate problems that happened to share one page: candidates needed a
                faster, clearer application flow, and recruiters needed the output of that flow to be
                usable at volume. Fixing only one would have left the other bottleneck untouched.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="02" label="Engineering decisions" title="Two decisions that made this work" />

          <Decision label="Decision 01 · Frontend revamp" title="Responsiveness first, because that's where applicants actually are">
            <p className="body read">
              Most traffic to the portal was mobile. I rebuilt the layout mobile-first rather than
              adapting a desktop design down, which changed how the application form itself was
              structured — fewer fields visible at once, clearer progress through multi-step forms,
              and states that make it obvious an application actually went through.
            </p>
          </Decision>

          <Decision label="Decision 02 · AI resume parsing" title="Show the extraction, don't just trust it">
            <p className="body read">
              The easy version of AI resume parsing hands a recruiter a summary and hopes it&apos;s right.
              I built the parsed view to sit alongside a reference to the original resume, with
              low-confidence fields flagged rather than silently included — so a recruiter can verify a
              summary in seconds instead of re-reading the whole document to check it.
            </p>
            <Note label="The principle" style={{ marginBottom: 10 }}>
              An AI output that can&apos;t be checked against its source will be ignored the first time it&apos;s wrong, no matter how often it&apos;s right. The engineering work here was building the affordance to verify, not just the parsing itself.
            </Note>
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

      <NextProjectCTA currentSlug="careers-portal" />
    </>
  );
}
