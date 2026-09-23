'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useTour } from './TourContext';
import { ArrowRight, ArrowLeft } from '../icons';

// Compass icon SVG
function CompassIcon(props) {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="10" />
      <polygon
        points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"
        fill="currentColor"
        fillOpacity="0.3"
      />
    </svg>
  );
}

// Close icon SVG
function CloseIcon(props) {
  return (
    <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2 2l10 10M12 2L2 12" />
    </svg>
  );
}

export default function PortfolioTour() {
  const {
    isOpen,
    currentStep,
    steps,
    nextStep,
    prevStep,
    goToStep,
    endTour,
    startTour,
    isWidgetDismissed,
    dismissWidget,
  } = useTour();

  const [mounted, setMounted] = useState(false);
  const [targetRect, setTargetRect] = useState(null);
  const [tooltipPos, setTooltipPos] = useState({ top: 0, left: 0, placement: 'bottom' });
  const [isAnimating, setIsAnimating] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const tooltipRef = useRef(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  const updateTargetPosition = useCallback(() => {
    if (!isOpen) return;
    const step = steps[currentStep];
    if (!step) return;

    const el = document.querySelector(step.selector);
    if (!el) {
      setTargetRect(null);
      return;
    }

    const rect = el.getBoundingClientRect();
    const pad = 10;
    const vh = window.innerHeight;
    const vw = window.innerWidth;

    // Safety: limit height so tall sections never blow out the screen
    const clampedHeight = Math.min(rect.height + pad * 2, vh * 0.7);

    const targetBox = {
      x: Math.max(0, rect.left - pad),
      y: Math.max(0, rect.top - pad),
      width: Math.min(rect.width + pad * 2, vw - 16),
      height: clampedHeight,
    };
    setTargetRect(targetBox);

    // Calculate optimal tooltip position
    const tooltipWidth = 330;
    const tooltipHeight = 190;
    const margin = 16;
    const navHeight = 76; // Header clearance
    let top = 0;
    let left = 0;
    let placement = step.preferredPosition || 'bottom';

    if (placement === 'bottom') {
      top = targetBox.y + targetBox.height + margin;
      left = targetBox.x + targetBox.width / 2 - tooltipWidth / 2;
      // If overflowing bottom, flip to top if space permits
      if (top + tooltipHeight > vh - 16) {
        if (targetBox.y - tooltipHeight - margin > navHeight) {
          top = targetBox.y - tooltipHeight - margin;
          placement = 'top';
        }
      }
    } else if (placement === 'top') {
      top = targetBox.y - tooltipHeight - margin;
      left = targetBox.x + targetBox.width / 2 - tooltipWidth / 2;
      // If overflowing top into navbar, flip to bottom
      if (top < navHeight) {
        top = targetBox.y + targetBox.height + margin;
        placement = 'bottom';
      }
    } else if (placement === 'left') {
      top = targetBox.y + targetBox.height / 2 - tooltipHeight / 2;
      left = targetBox.x - tooltipWidth - margin;
      if (left < 16) {
        if (targetBox.x + targetBox.width + tooltipWidth + margin < vw) {
          left = targetBox.x + targetBox.width + margin;
          placement = 'right';
        } else {
          top = targetBox.y + targetBox.height + margin;
          left = Math.max(16, (vw - tooltipWidth) / 2);
          placement = 'bottom';
        }
      }
    } else if (placement === 'right') {
      top = targetBox.y + targetBox.height / 2 - tooltipHeight / 2;
      left = targetBox.x + targetBox.width + margin;
      if (left + tooltipWidth > vw - 16) {
        top = targetBox.y + targetBox.height + margin;
        left = Math.max(16, (vw - tooltipWidth) / 2);
        placement = 'bottom';
      }
    }

    // Clamp within visible bounds
    left = Math.max(16, Math.min(left, vw - tooltipWidth - 16));
    top = Math.max(navHeight + 8, Math.min(top, vh - tooltipHeight - 16));

    setTooltipPos({ top, left, placement });
  }, [isOpen, currentStep, steps]);

  // Smooth scroll and repositioning on step change
  useEffect(() => {
    if (!isOpen) return;
    const step = steps[currentStep];
    if (!step) return;

    setIsAnimating(true);

    const el = document.querySelector(step.selector);
    if (el) {
      // Calculate whether element is already in viewport
      const r = el.getBoundingClientRect();
      const inView = r.top >= 80 && r.bottom <= window.innerHeight - 80;
      if (!inView) {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Update coordinates across smooth scroll intervals
    const timers = [
      setTimeout(updateTargetPosition, 50),
      setTimeout(updateTargetPosition, 150),
      setTimeout(updateTargetPosition, 300),
      setTimeout(updateTargetPosition, 500),
      setTimeout(() => {
        updateTargetPosition();
        setIsAnimating(false);
      }, 750),
    ];

    return () => {
      timers.forEach(clearTimeout);
    };
  }, [isOpen, currentStep, steps, updateTargetPosition]);

  // Event listeners for window resize & user scroll
  useEffect(() => {
    if (!isOpen) return;

    let ticking = false;
    const handleScrollOrResize = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateTargetPosition();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScrollOrResize, { passive: true });
    window.addEventListener('resize', handleScrollOrResize);

    return () => {
      window.removeEventListener('scroll', handleScrollOrResize);
      window.removeEventListener('resize', handleScrollOrResize);
    };
  }, [isOpen, updateTargetPosition]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        endTour(true);
      } else if (e.key === 'ArrowRight') {
        nextStep();
      } else if (e.key === 'ArrowLeft') {
        prevStep();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, nextStep, prevStep, endTour]);

  if (!mounted) return null;

  const currentStepData = steps[currentStep];
  const isLastStep = currentStep === steps.length - 1;

  const tourPortal = isOpen && (
    <div
      className={`tour-overlay-portal ${isAnimating ? 'tour-animating' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Portfolio Guide Tour"
    >
      {/* SVG Spotlight Mask */}
      <svg className="tour-spotlight-svg" width="100%" height="100%">
        <defs>
          <mask id="tour-spotlight-mask">
            <rect x="0" y="0" width="100%" height="100%" fill="white" />
            {targetRect && (
              <rect
                x={targetRect.x}
                y={targetRect.y}
                width={targetRect.width}
                height={targetRect.height}
                rx="14"
                fill="black"
                className="tour-cutout-rect"
              />
            )}
          </mask>
        </defs>
        <rect
          x="0"
          y="0"
          width="100%"
          height="100%"
          fill="rgba(8, 8, 11, 0.72)"
          mask="url(#tour-spotlight-mask)"
          onClick={() => endTour(false)}
        />
      </svg>

      {/* Target Highlight Ring */}
      {targetRect && (
        <div
          className="tour-highlight-ring"
          style={{
            transform: `translate3d(${targetRect.x}px, ${targetRect.y}px, 0)`,
            width: targetRect.width,
            height: targetRect.height,
          }}
          aria-hidden="true"
        />
      )}

      {/* Floating Tooltip Card */}
      <div
        ref={tooltipRef}
        className={`tour-tooltip-card placement-${tooltipPos.placement}`}
        style={{
          transform: `translate3d(${tooltipPos.left}px, ${tooltipPos.top}px, 0)`,
        }}
      >
        <div className="tour-tooltip-header">
          <div className="tour-step-badge">
            <CompassIcon />
            <span>Step {currentStep + 1} of {steps.length}</span>
          </div>
          <button
            type="button"
            className="tour-close-btn"
            onClick={() => endTour(true)}
            aria-label="Close tour"
            title="Exit tour (Esc)"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="tour-tooltip-content">
          <h4 className="tour-step-title">{currentStepData?.title}</h4>
          <p className="tour-step-desc">{currentStepData?.description}</p>
        </div>

        <div className="tour-tooltip-footer">
          <div className="tour-dots" role="tablist">
            {steps.map((s, idx) => (
              <button
                key={s.id}
                type="button"
                className={`tour-dot ${idx === currentStep ? 'active' : ''}`}
                onClick={() => goToStep(idx)}
                aria-label={`Go to step ${idx + 1}: ${s.title}`}
              />
            ))}
          </div>

          <div className="tour-actions">
            {currentStep > 0 && (
              <button
                type="button"
                className="btn btn-s tour-btn-prev"
                onClick={prevStep}
              >
                <ArrowLeft />
                <span>Back</span>
              </button>
            )}

            <button
              type="button"
              className="btn btn-p tour-btn-next"
              onClick={nextStep}
            >
              <span>{isLastStep ? 'Finish' : 'Next'}</span>
              {!isLastStep && <ArrowRight />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      dismissWidget();
      setIsClosing(false);
    }, 280);
  };

  // Closeable floating tour widget in the bottom-right
  const floatingWidget = !isOpen && !isWidgetDismissed && (
    <aside
      className={`tour-floating-widget ${isClosing ? 'is-closing' : ''}`}
      role="complementary"
      aria-label="Portfolio guided tour"
    >
      <button
        type="button"
        className="tour-widget-main"
        onClick={() => startTour(true)}
        aria-label="Start interactive portfolio tour"
        title="Take a 30s guided tour of the portfolio"
      >
        <span className="tour-widget-icon" aria-hidden="true">
          <CompassIcon />
        </span>
        <span className="tour-widget-info">
          <span className="tour-widget-title">Start Tour</span>
          <span className="tour-widget-subtitle">30s guide</span>
        </span>
      </button>
      <div className="tour-widget-divider" aria-hidden="true" />
      <button
        type="button"
        className="tour-widget-close"
        onClick={handleDismiss}
        aria-label="Close tour widget"
        title="Dismiss (close)"
      >
        <CloseIcon />
      </button>
    </aside>
  );

  return (
    <>
      {mounted && createPortal(
        <>
          {tourPortal}
          {floatingWidget}
        </>,
        document.body
      )}
    </>
  );
}
