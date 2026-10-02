import './globals.css';
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import TourExperience from '../components/tour/TourExperience';
import { Analytics } from "@vercel/analytics/next"
import WebVitals from '../components/monitoring/WebVitals';
import IntroLoader from '../components/ui/IntroLoader';
import { LINKS } from '../lib/links';
import { SITE_DESCRIPTION, SITE_URL } from '../lib/site';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const newsreader = Newsreader({
  subsets: ['latin'],
  variable: '--font-newsreader',
  style: ['italic'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
});

/*
 * Theme init — runs before first paint and before hydration.
 * Checks localStorage for saved user preference, defaulting to dark if none stored.
 */
const themeInit = `(function(){
  try {
    var stored = localStorage.getItem('theme');
    var theme = (stored === 'light' || stored === 'dark') ? stored : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
    try {
      if (sessionStorage.getItem('portfolio-intro-seen-v2') === '1' || matchMedia('(prefers-reduced-motion: reduce)').matches) {
        document.documentElement.setAttribute('data-intro', 'skip');
      }
    } catch (e) {}
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`;

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Selvaganapathi Kanakaraj — Full Stack Developer',
    template: '%s — Selvaganapathi Kanakaraj',
  },
  description: SITE_DESCRIPTION,
  alternates: { canonical: '/' },
  authors: [{ name: 'Selvaganapathi Kanakaraj', url: '/' }],
  creator: 'Selvaganapathi Kanakaraj',
  category: 'technology',
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Selvaganapathi Kanakaraj',
    title: 'Selvaganapathi Kanakaraj — Full Stack Developer',
    description: SITE_DESCRIPTION,
    url: '/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Selvaganapathi Kanakaraj — Full Stack Developer',
    description: SITE_DESCRIPTION,
  },
};

const structuredData = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Selvaganapathi Kanakaraj',
      url: SITE_URL,
      jobTitle: 'Full Stack Developer',
      email: `mailto:${LINKS.email}`,
      homeLocation: { '@type': 'Place', name: 'Bengaluru, India' },
      sameAs: [LINKS.linkedin, LINKS.github],
      knowsAbout: ['Next.js', 'React', 'Node.js', 'TypeScript', 'Enterprise software'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Selvaganapathi Kanakaraj — Portfolio',
      description: SITE_DESCRIPTION,
      author: { '@id': `${SITE_URL}/#person` },
    },
  ],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${newsreader.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body suppressHydrationWarning>
        <IntroLoader />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, '\\u003c') }}
        />
        <a className="skip-link" href="#main-content">Skip to content</a>
        <Nav />
        <div id="app">
          <main id="main-content">{children}</main>
          <Footer />
        </div>
        <TourExperience />
        <WebVitals />
        <Analytics />
      </body>
    </html>
  );
}
