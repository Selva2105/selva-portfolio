'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';

export default function LightboxModal({ images, currentIndex, isOpen, onClose, onPrev, onNext }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen) return;

    function onKeyDown(e) {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && onPrev) onPrev();
      if (e.key === 'ArrowRight' && onNext) onNext();
    }

    window.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose, onPrev, onNext]);

  if (!mounted || !isOpen || currentIndex < 0 || currentIndex >= images.length) return null;

  const current = images[currentIndex];

  const modalContent = (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Image full view preview"
      onClick={onClose}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999999, // Mounted directly to body via portal, far above navbar (z-index: 100)
        background: 'rgba(5, 5, 8, 0.96)',
        backdropFilter: 'blur(20px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'max(20px, env(safe-area-inset-top)) clamp(14px, 3vw, 32px) max(20px, env(safe-area-inset-bottom))',
        animation: 'fadeIn 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
    >
      {/* Top Header Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1440px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 14,
          padding: '0 4px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
          <span style={{ fontSize: '.78rem', fontFamily: 'var(--mono)', color: 'var(--ac)', background: 'var(--ac-bg)', border: '1px solid var(--ac-line)', padding: '3px 8px', borderRadius: 4 }}>
            {currentIndex + 1} / {images.length}
          </span>
          <span style={{ fontSize: '.94rem', fontWeight: 600, color: 'var(--fg)' }}>
            {current.title}
          </span>
          <span style={{ fontSize: '.74rem', color: 'var(--fg-4)', fontFamily: 'var(--mono)' }}>
            2880 × 1800 Retina
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <span style={{ fontSize: '.72rem', color: 'var(--fg-4)', fontFamily: 'var(--mono)' }}>
            ESC to close · ← → to navigate
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close image viewer"
            style={{
              background: 'var(--bg-3)',
              border: '1px solid var(--line-2)',
              color: 'var(--fg)',
              width: 38,
              height: 38,
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              fontSize: '1.25rem',
              transition: 'all 0.15s ease',
            }}
          >
            ✕
          </button>
        </div>
      </div>

      {/* Main Image Frame */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: '1440px',
          maxHeight: 'calc(90vh - 100px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'var(--bg-1)',
          borderRadius: 12,
          border: '1px solid var(--line-2)',
          boxShadow: '0 24px 60px -12px rgba(0,0,0,0.9)',
          overflow: 'hidden',
        }}
      >
        <Image
          src={current.src}
          alt={current.title}
          width={2880}
          height={1800}
          style={{
            width: '100%',
            height: 'auto',
            maxHeight: 'calc(90vh - 110px)',
            objectFit: 'contain',
            display: 'block',
          }}
          priority
        />

        {/* Prev Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev();
            }}
            aria-label="Previous screenshot"
            style={{
              position: 'absolute',
              left: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(12, 12, 16, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--line-2)',
              color: 'var(--fg)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              transition: 'background 0.2s',
            }}
          >
            ‹
          </button>
        )}

        {/* Next Button */}
        {images.length > 1 && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next screenshot"
            style={{
              position: 'absolute',
              right: 16,
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'rgba(12, 12, 16, 0.85)',
              backdropFilter: 'blur(8px)',
              border: '1px solid var(--line-2)',
              color: 'var(--fg)',
              width: 44,
              height: 44,
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.3rem',
              transition: 'background 0.2s',
            }}
          >
            ›
          </button>
        )}
      </div>

      {/* Bottom Caption Bar */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '1440px',
          marginTop: 12,
          padding: '10px 16px',
          background: 'rgba(16, 16, 22, 0.85)',
          border: '1px solid var(--line)',
          borderRadius: 8,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        <p style={{ margin: 0, fontSize: '.84rem', color: 'var(--fg-2)', maxWidth: '90ch', lineHeight: 1.45 }}>
          {current.caption}
        </p>
        <span style={{ fontSize: '.74rem', color: 'var(--ac)', fontFamily: 'var(--mono)' }}>
          {current.tag}
        </span>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
