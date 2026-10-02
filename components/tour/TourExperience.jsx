'use client';

import { useEffect, useState } from 'react';

export default function TourExperience() {
  const [Runtime, setRuntime] = useState(null);

  useEffect(() => {
    const load = () => import('./TourRuntime').then((module) => setRuntime(() => module.default));
    const id = 'requestIdleCallback' in window
      ? window.requestIdleCallback(load, { timeout: 2500 })
      : window.setTimeout(load, 1200);

    return () => {
      if ('cancelIdleCallback' in window) window.cancelIdleCallback(id);
      else window.clearTimeout(id);
    };
  }, []);

  return Runtime ? <Runtime /> : null;
}
