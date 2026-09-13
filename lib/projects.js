export const PROJECTS = [
  {
    slug: 'hrms',
    idx: '01',
    title: 'HRMS',
    titleEm: 'Building the modules people touch every day',
    tags: ['Enterprise HRMS', 'React.js + TypeScript', 'Node.js backend'],
    desc: 'A multi-module HR platform built at Brilyant IT Solutions covering attendance, leave management, employee management and recruitment. The hard part was never a single screen — it was keeping state consistent across modules that all touch the same employee record.',
    short: 'Core HR modules — attendance, leave, employee management — built in React and TypeScript, plus backend recruitment workflows in Node.js: scheduling, rescheduling and cancelling interviews.',
    stats: [
      { n: '3+', l: 'core modules built' },
      { n: 'React + Node', l: 'full stack ownership' },
      { n: '1,000+', l: 'employees live' },
    ],
  },
  {
    slug: 'mdm',
    idx: '02',
    title: 'MDM',
    titleEm: "Frontends for fleets you can't see",
    tags: ['Device management', 'Frontend architecture', 'Dashboards'],
    desc: 'A device management platform for onboarding, organisation setup, policy enforcement and monitoring. Built the frontend interfaces that let IT admins reason about hundreds of devices they will never physically touch.',
    short: 'Frontend interfaces for device onboarding, organisation setup, policy enforcement and device dashboards — built for admins who manage fleets they never see in person.',
    stats: [
      { n: '4', l: 'core interfaces shipped' },
      { n: 'React.js', l: 'primary frontend stack' },
      { n: '1', l: 'dashboard, full fleet visibility' },
    ],
  },
  {
    slug: 'intranet',
    idx: '03',
    title: 'Intranet',
    titleEm: 'Leading the build, not just shipping features',
    tags: ['Project Lead', 'Next.js + Node.js', 'Real-time systems'],
    desc: 'An internal platform I led end-to-end using Next.js and Node.js (TypeScript). Shipped SSO-like login bypass for internal apps, employee appreciation modules, real-time messaging over sockets, and Google Meet integration.',
    short: 'Led development of the company intranet — SSO-like login bypass, employee appreciation modules, real-time socket messaging, and Google Meet integration, end to end.',
    stats: [
      { n: 'Lead', l: 'role on this build' },
      { n: 'Sockets', l: 'real-time messaging' },
      { n: '2', l: 'third-party integrations (SSO, Meet)' },
    ],
  },
  {
    slug: 'careers-portal',
    idx: '04',
    title: 'Careers Portal',
    titleEm: 'Letting AI do the first pass, not the last one',
    tags: ['AI integration', 'Frontend revamp', 'Candidate workflow'],
    desc: 'Revamped the careers portal frontend for improved UI/UX and responsiveness, then integrated AI-based resume parsing so recruiters see a structured candidate summary instead of forty raw PDFs.',
    short: 'Rebuilt the careers portal frontend and wired in AI-based resume parsing — recruiters review a parsed summary instead of reading every resume end to end.',
    stats: [
      { n: 'Full revamp', l: 'UI/UX + responsiveness' },
      { n: 'AI parsing', l: 'resume intake automated' },
      { n: '1', l: 'pipeline, less manual triage' },
    ],
  },
  {
    slug: 'expense-tracker',
    idx: '05',
    title: 'AI-Powered Expense Tracker',
    titleEm: 'A personal project built to production standards',
    tags: ['Personal project', 'Next.js 14 + Prisma', 'Gemini AI'],
    desc: 'A full-featured personal finance app: expense tracking, budgeting, savings goals, invoice uploads with auto-categorisation, custom tags, and recurring transactions. Integrated Gemini for expense prediction and financial insights, with Excel and PDF export.',
    short: 'Personal finance app with dashboards, invoice uploads, auto-categorisation and recurring transactions — plus a Gemini-powered assistant for predictions and insights.',
    stats: [
      { n: 'Next.js 14', l: '+ Prisma + MongoDB' },
      { n: 'Gemini API', l: 'AI-driven insights' },
      { n: '2 formats', l: 'Excel + PDF export' },
    ],
  },
];

export function getProject(slug) {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getNextProject(slug) {
  const i = PROJECTS.findIndex((p) => p.slug === slug);
  return PROJECTS[(i + 1) % PROJECTS.length];
}

export const ALSO_SHIPPED = [
  { t: 'Smart EPP', d: 'Corporate e-commerce platform for discounted employee purchases, with secure payment gateway integration', c: 'Brilyant' },
  { t: 'E-commerce (Philippines)', d: 'Frontend development and performance improvements for an international client-facing storefront', c: 'Brilyant' },
  { t: 'AI Screens (PO-Zoho Automation)', d: 'Frontend interfaces for AI-driven internal automation workflows', c: 'Brilyant' },
  { t: 'Form I-9 Compliance Platform', d: 'Converted complex compliance workflows into intuitive UI components', c: 'Zipid' },
  { t: 'Travel Blog Platform', d: 'Content-driven blog migrated from React to Next.js with Contentful CMS, improving SEO', c: 'Travelfika' },
  { t: 'Static & Dynamic Web Pages', d: 'Trained on HTML, CSS, JavaScript, TypeScript and MySQL; fixed production bugs', c: 'G2 Technology Solutions' },
];
