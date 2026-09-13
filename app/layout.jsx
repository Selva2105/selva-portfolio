import './globals.css';
import Nav from '../components/layout/Nav';
import Footer from '../components/layout/Footer';

/*
 * Theme init — runs before first paint and before hydration so every visit
 * opens dark, with no OS sniffing and no stored preference. No theme library.
 */
const themeInit = `(function(){
  document.documentElement.setAttribute('data-theme', 'dark');
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,300;14..32,400;14..32,500;14..32,600;14..32,700&family=Newsreader:ital,opsz,wght@1,6..72,300;1,6..72,400&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body suppressHydrationWarning>
        <Nav />
        <div id="app">
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
