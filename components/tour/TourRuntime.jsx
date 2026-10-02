'use client';

import PortfolioTour from './PortfolioTour';
import { TourProvider } from './TourContext';

export default function TourRuntime() {
  return <TourProvider><PortfolioTour /></TourProvider>;
}
