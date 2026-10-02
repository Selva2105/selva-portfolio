'use client';

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

export default function ErrorPage({ error, reset }) {
  useEffect(() => {
    track('Route Error', { name: error.name || 'Error', message: error.message.slice(0, 120) });
  }, [error]);

  return <section className="state-page"><p className="eyebrow">Something went wrong</p><h1 className="h2">This page could not be displayed.</h1><p className="body">Try the request again. If it keeps failing, the issue has been recorded.</p><button className="btn btn-p" onClick={reset}>Try again</button></section>;
}
