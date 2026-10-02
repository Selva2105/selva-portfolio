import './globals.css';
import { Inter, JetBrains_Mono, Newsreader } from 'next/font/google';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';
import { TourProvider } from '../components/tour/TourContext';
import PortfolioTour from '../components/tour/PortfolioTour';
import { Analytics } from "@vercel/analytics/next"

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
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'dark');
  }
})();`;

export const metadata = {
  title: {
    default: 'Selvaganapathi Kanakaraj — Full Stack Developer',
    template: '%s — Selvaganapathi Kanakaraj',
  },
  description:
    'Full Stack Developer building scalable, production-grade web applications with Next.js, React, Node.js and TypeScript — across HRMS, MDM, and e-commerce platforms.',
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
        <a className="skip-link" href="#main-content">Skip to content</a>
        <TourProvider>
          <Nav />
          <div id="app">
            <main id="main-content">{children}</main>
            <Footer />
          </div>
          <PortfolioTour />
        </TourProvider>
        <Analytics />
      </body>
    </html>
  );
}
