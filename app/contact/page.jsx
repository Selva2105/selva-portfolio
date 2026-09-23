import Reveal from '../../components/Reveal';
import ContactProfileCard from '../../components/contact/ContactProfileCard';
import ContactChannels from '../../components/contact/ContactChannels';

export const metadata = {
  title: 'Contact — Selvaganapathi Kanakaraj',
  description: 'Get in touch with Selvaganapathi Kanakaraj. Direct contact channels, availability, and background details.',
};

const FIT_CRITERIA = [
  {
    tag: 'Role Target',
    badge: 'Full Stack / Frontend',
    desc: 'Ready to own a product surface end-to-end in React, Next.js, and Node.js alongside engineers who push code quality further.',
  },
  {
    tag: 'Domain Experience',
    badge: 'Enterprise B2B',
    desc: 'Deep hands-on experience in mission-critical B2B platforms — HRMS, fleet MDM, intranets, and compliance workflows.',
  },
  {
    tag: 'Work Mode',
    badge: 'Bengaluru / Remote',
    desc: 'Based in Bengaluru, India (IST UTC+5:30). Flexible with remote, hybrid, or relocation roles. Experienced with distributed teams.',
  },
  {
    tag: 'Availability',
    badge: 'Open to Offers',
    desc: 'Currently at Brilyant IT Solutions and actively evaluating high-impact opportunities. Standard notice period applies.',
  },
];

export default function ContactPage() {
  return (
    <>
      <header className="cs-hero contact-hero">
        <div className="wrap">
          <Reveal as="p" className="eyebrow" style={{ marginBottom: 16 }}>
            Direct Contact
          </Reveal>
          <Reveal as="h1" className="h1" i={1} style={{ maxWidth: '16ch' }}>
            Let&apos;s talk about <span className="em" style={{ color: 'var(--fg-2)' }}>what you&apos;re building.</span>
          </Reveal>
          <Reveal as="p" className="lead cs-sub" i={2}>
            I&apos;m open to Full Stack and Frontend Developer opportunities where I can own products from
            database schemas to responsive UIs. Reach out through any channel below.
          </Reveal>
        </div>
      </header>

      <section className="sect" style={{ paddingTop: 'clamp(24px, 4vw, 44px)' }}>
        <div className="wrap">
          {/* Main 2-column contact grid */}
          <div className="contact-main-grid">
            <Reveal i={0} className="contact-col-left">
              <ContactProfileCard />
            </Reveal>

            <Reveal i={1} className="contact-col-right">
              <ContactChannels />
            </Reveal>
          </div>

          {/* Quick Fit / Before You Write section */}
          <div className="contact-fit-section">
            <Reveal className="contact-fit-intro">
              <span className="eyebrow">Before You Reach Out</span>
              <h2 className="h3">Role fit &amp; expectations at a glance</h2>
              <p className="small" style={{ maxWidth: '48ch', marginTop: 8 }}>
                Sharing these details upfront saves everyone time. If this aligns with what your team needs,
                I&apos;m ready to talk.
              </p>
            </Reveal>

            <div className="fit-grid">
              {FIT_CRITERIA.map((item, idx) => (
                <Reveal key={item.tag} className="fit-card" i={idx}>
                  <div className="fit-card-header">
                    <span className="fit-tag">{item.tag}</span>
                    <span className="fit-badge">{item.badge}</span>
                  </div>
                  <p className="fit-desc">{item.desc}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
