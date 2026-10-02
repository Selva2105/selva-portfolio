'use client';

import Link from 'next/link';

export default function GlobalError({ reset }) {
  return <html lang="en"><body><main className="state-page"><h1>Something went wrong.</h1><p>Please retry or return to the home page.</p><button onClick={reset}>Try again</button><Link href="/">Go home</Link></main></body></html>;
}
