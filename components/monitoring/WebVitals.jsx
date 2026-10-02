'use client';

import { useReportWebVitals } from 'next/web-vitals';
import { track } from '@vercel/analytics';

export default function WebVitals() {
  useReportWebVitals(({ id, name, value, rating }) => {
    track('Web Vital', { id, metric: name, value: Math.round(value), rating });
  });
  return null;
}
