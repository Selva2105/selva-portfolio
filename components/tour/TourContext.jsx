'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export const TOUR_STEPS = [
  {
    id: 'hero-profile',
    selector: '[data-tour="hero-profile"]',
    title: 'Meet Selvaganapathi',
    description: 'Full Stack Developer with 2+ years shipping production enterprise systems (HRMS, MDM, Intranet) in Next.js, React, and Node.js.',
    page: '/',
    preferredPosition: 'left',
  },
  {
    id: 'hero-chips',
    selector: '[data-tour="hero-chips"]',
    title: 'Core Technical Stack',
    description: 'Production expertise in Next.js, React, Node.js, TypeScript, and end-to-end full-stack architectures.',
    page: '/',
    preferredPosition: 'bottom',
  },
  {
    id: 'work-section',
    selector: '[data-tour="work-section"]',
    title: 'Production Case Studies',
    description: 'Real enterprise builds with in-depth breakdowns on architectural tradeoffs, state management, and real business impact.',
    page: '/',
    preferredPosition: 'bottom',
  },
  {
    id: 'theme-toggle',
    selector: '[data-tour="theme-toggle"]',
    title: 'Theme Switching',
    description: 'Toggle between custom dark and light modes tailored with curated contrast ratios and smooth transitions.',
    preferredPosition: 'bottom',
  },
  {
    id: 'nav-contact',
    selector: '[data-tour="nav-contact"]',
    title: 'Get In Touch',
    description: 'Direct communication channels with live Bengaluru (IST) time, instant 1-click email copy, WhatsApp reach, and career availability.',
    preferredPosition: 'bottom',
  },
];

const TourContext = createContext(null);

export function TourProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [showInvite, setShowInvite] = useState(false);
  const [isWidgetDismissed, setIsWidgetDismissed] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    try {
      const dismissed = sessionStorage.getItem('portfolio_tour_widget_dismissed');
      if (dismissed === 'true') {
        setIsWidgetDismissed(true);
      }
      const completed = localStorage.getItem('portfolio_tour_completed');
      if (!completed && pathname === '/') {
        const timer = setTimeout(() => {
          setShowInvite(true);
        }, 2200);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      // localStorage may fail in private mode
    }
  }, [pathname]);

  const startTour = useCallback((fromBeginning = true) => {
    setShowInvite(false);
    if (fromBeginning) {
      setCurrentStep(0);
    }
    if (pathname !== '/' && TOUR_STEPS[0].page === '/') {
      router.push('/');
      setTimeout(() => {
        setIsOpen(true);
      }, 400);
    } else {
      setIsOpen(true);
    }
  }, [pathname, router]);

  const endTour = useCallback((markCompleted = true) => {
    setIsOpen(false);
    setShowInvite(false);
    if (markCompleted) {
      try {
        localStorage.setItem('portfolio_tour_completed', 'true');
      } catch (e) {}
    }
  }, []);

  const nextStep = useCallback(() => {
    if (currentStep < TOUR_STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      endTour(true);
    }
  }, [currentStep, endTour]);

  const prevStep = useCallback(() => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  }, [currentStep]);

  const goToStep = useCallback((index) => {
    if (index >= 0 && index < TOUR_STEPS.length) {
      setCurrentStep(index);
    }
  }, []);

  const dismissInvite = useCallback(() => {
    setShowInvite(false);
    try {
      localStorage.setItem('portfolio_tour_completed', 'true');
    } catch (e) {}
  }, []);

  const dismissWidget = useCallback(() => {
    setIsWidgetDismissed(true);
    try {
      sessionStorage.setItem('portfolio_tour_widget_dismissed', 'true');
    } catch (e) {}
  }, []);

  return (
    <TourContext.Provider
      value={{
        isOpen,
        currentStep,
        steps: TOUR_STEPS,
        startTour,
        endTour,
        nextStep,
        prevStep,
        goToStep,
        showInvite,
        dismissInvite,
        isWidgetDismissed,
        dismissWidget,
      }}
    >
      {children}
    </TourContext.Provider>
  );
}

export function useTour() {
  const context = useContext(TourContext);
  if (!context) {
    throw new Error('useTour must be used within a TourProvider');
  }
  return context;
}
