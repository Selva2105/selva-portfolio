import Reveal from '../../components/Reveal';
import { LINKS } from '../../lib/links';
import { DocIcon, LinkedinIcon, MailIcon, PhoneIcon, ExternalIcon } from '../../components/icons';

export const metadata = { title: 'Contact' };

const CARDS = [
  { Icon: DocIcon, k: 'Résumé', v: 'One page, PDF', sub: 'Full history, tools and education', href: LINKS.resume, download: true, primary: true },
  { Icon: LinkedinIcon, k: 'LinkedIn', v: '/in/selvaganapathi-kanakaraj', sub: 'Full role detail and history', href: LINKS.linkedin, ext: true },
  { Icon: DocIcon, k: 'GitHub', v: '/Selva2105', sub: 'Code, personal projects and commits', href: LINKS.github, ext: true },
  { Icon: MailIcon, k: 'Email', v: LINKS.email, sub: 'Best for anything with detail', href: `mailto:${LINKS.email}` },
  { Icon: PhoneIcon, k: 'Phone', v: LINKS.phone, sub: 'Call or WhatsApp · IST, UTC+5:30', href: `tel:${LINKS.phoneRaw}` },
];

const BEFORE_YOU_WRITE = [
  ['Role', 'Full Stack / Frontend Developer. I want to own a surface end to end, in React/Next.js and Node.js, alongside colleagues who push my code further.'],
  ['Domain', 'Enterprise B2B systems — HR, device management, internal tools — where the frontend has to stay usable for non-technical operators.'],
  ['Location', 'Bengaluru, India (IST). Remote, hybrid or relocation all work — I have shipped entirely remote before.'],
  ['Timing', 'Currently at Brilyant IT Solutions and open to new opportunities. Standard notice applies.'],
];

export default function ContactPage() {
  return (
    <>
      <header className="cs-hero">
        <div className="wrap">
          <Reveal as="p" className="eyebrow" style={{ marginBottom: 20 }}>Contact</Reveal>
          <Reveal as="h1" className="h1" i={1} style={{ maxWidth: '14ch' }}>
            Let&apos;s talk about <span className="em" style={{ color: 'var(--fg-2)' }}>what you&apos;re building.</span>
          </Reveal>
          <Reveal as="p" className="lead cs-sub" i={2}>
            I&apos;m open to Full Stack and Frontend Developer roles — the kind where I can own a surface
            end to end in React, Next.js and Node.js. Everything you need to reach me or check my background is here.
          </Reveal>
        </div>
      </header>

      <section className="sect" style={{ paddingTop: 'clamp(36px,5vw,60px)' }}>
        <div className="wrap">
          <div className="ccards">
            {CARDS.map(({ Icon, k, v, sub, href, ext, download, primary }, i) => (
              <Reveal
                key={k}
                href={href}
                className={`ccard${primary ? ' primary' : ''}`}
                i={Math.min(i, 3)}
                target={ext ? '_blank' : undefined}
                rel={ext ? 'noopener' : undefined}
                download={download || undefined}
              >
                <span className="ccard-ic"><Icon /></span>
                <span className="ccard-k">{k}</span>
                <span className="ccard-v">{v}{ext && <span className="ccard-ext"><ExternalIcon /></span>}</span>
                <span className="ccard-s">{sub}</span>
              </Reveal>
            ))}
          </div>

          <div className="grid-2" style={{ marginTop: 'clamp(44px,6vw,76px)' }}>
            <Reveal className="stack-4">
              <p className="eyebrow">Before you write</p>
              <h2 className="h3" style={{ maxWidth: '18ch' }}>What I&apos;m looking for, so you can decide fast</h2>
              <p className="small" style={{ maxWidth: '40ch' }}>
                Being specific here saves us both a call. If it doesn&apos;t match, say so —
                I&apos;d rather know than exchange three polite emails.
              </p>
            </Reveal>
            <Reveal className="stack-6" i={1}>
              {BEFORE_YOU_WRITE.map(([k, v]) => (
                <div key={k} style={{ display: 'grid', gridTemplateColumns: '88px minmax(0,1fr)', gap: 16, alignItems: 'baseline' }}>
                  <span className="eyebrow" style={{ margin: 0 }}>{k}</span>
                  <p className="body" style={{ fontSize: '.94rem', margin: 0 }}>{v}</p>
                </div>
              ))}
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
