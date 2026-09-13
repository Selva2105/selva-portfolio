import Reveal from '../Reveal';
import SectionHead from '../ui/SectionHead';
import { Decision } from '../ui/Decision';
import ReflectionGrid from '../ui/ReflectionGrid';
import NextProjectCTA from '../work/NextProjectCTA';
import CaseStudyHeader from '../work/CaseStudyHeader';

const FACTS = [
  { b: 'Next.js 14', s: 'App router, TypeScript' },
  { b: 'Prisma + MongoDB', s: 'Schema and data layer' },
  { b: 'Gemini API', s: 'AI-driven insights' },
  { b: '2 formats', s: 'Excel + PDF export' },
];

const REFLECTIONS = [
  { t: 'Schema decisions made early are expensive to unwind', b: `A categorisation model I picked in the first week didn't hold up once recurring transactions and tags needed to interact with it. Solo projects are the cheapest place to learn that lesson — nobody else's sprint depended on my migration.` },
  { t: 'AI features need a fallback path from day one', b: `Building the Gemini integration without first deciding what the UI shows when the API is slow or wrong meant retrofitting loading and error states later. I now design that path before the happy path.` },
  { t: 'What I would do differently', b: `I'd add usage analytics from the start. I know which features I use because I built it for myself, but I have no data on which parts would matter to someone else — which is exactly the blind spot a side project has that client work doesn't.` },
];

export default function ExpenseTracker() {
  return (
    <>
      <CaseStudyHeader
        num="05"
        kicker="Personal project · Next.js 14 + Prisma · Gemini AI"
        title="AI-Powered Expense Tracker"
        titleEm="a personal project built to production standards"
        lead="A full-featured personal finance app — expense tracking, budgeting, savings goals — built outside work hours to go deeper on a stack I use professionally, and on the parts of it I don't get to touch as often: schema design, AI integration and export pipelines."
        facts={FACTS}
        role={{
          a: `I designed the schema, built the full stack — Next.js frontend, Express API, Prisma over MongoDB — and integrated Google OAuth and JWT for auth. Every feature below is something I chose to build because it was the part of the stack I wanted more reps on, not because a client asked for it.`,
          b: `<span class="hl">Building it alone meant no scope was ever someone else's problem.</span> A messy schema decision in week one became my own migration headache in week three, which is a faster feedback loop for learning good data modelling than most client work gives you.`,
          roles: ['Full Stack Developer'],
        }}
        showNda={false}
      />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="01" label="The problem" title="Spreadsheets don't categorise themselves" />
          <div className="grid-2">
            <Reveal>
              <p className="body">
                I was tracking my own expenses in a spreadsheet and it had the usual failure mode: it was
                accurate for about two weeks after I set it up, then quietly stopped being maintained
                because entering every transaction by hand doesn&apos;t survive contact with a busy month.
              </p>
            </Reveal>
            <Reveal i={1}>
              <p className="body">
                The interesting engineering problem wasn&apos;t the tracking — it was reducing how much manual
                entry the app demanded, and doing that meant invoice parsing, auto-categorisation and
                recurring transactions, not just another form to fill in.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      <hr className="rule" />

      <section className="sect">
        <div className="wrap">
          <SectionHead num="02" label="Engineering decisions" title="What I built, and why" />

          <Decision label="Decision 01 · Data entry" title="Upload the invoice, don't type the transaction">
            <p className="body read">
              The single change that made me actually keep using this app past week two was invoice
              uploads with auto-categorisation and custom tags — turning &quot;type in a transaction&quot; into
              &quot;drop a photo and confirm the guess.&quot; Recurring transactions handle the predictable half
              automatically, so manual entry is reserved for the transactions that actually need a decision.
            </p>
          </Decision>

          <Decision label="Decision 02 · AI insights" title="Prediction is only useful if you can see the reasoning">
            <p className="body read">
              I integrated the Gemini API for expense prediction and financial insights — monthly
              forecasts and category-wise breakdowns. The dashboard shows the categories and trends
              behind a prediction rather than just a number, for the same reason any AI feature needs
              that: a forecast you can&apos;t interrogate isn&apos;t one you&apos;ll trust with your own budget.
            </p>
          </Decision>

          <Decision label="Decision 03 · Getting the data out" title="The app isn't the only place this data needs to live">
            <p className="body read">
              Excel and PDF export were easy to deprioritise and I almost did. But the whole point of
              tracking expenses is occasionally handing the numbers to someone else — an accountant, a
              shared budget, a tax filing — so export wasn&apos;t a nice-to-have, it was the feature that
              made the rest of the app worth using beyond just me looking at my own dashboard.
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

      <NextProjectCTA currentSlug="expense-tracker" />
    </>
  );
}
