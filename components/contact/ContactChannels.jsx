'use client';

import { useState } from 'react';
import { MailIcon, PhoneIcon, ArrowRight } from '../icons';
import { LINKS } from '../../lib/links';

// WhatsApp icon SVG
function WhatsAppIcon(props) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12.031 2C6.511 2 2.02 6.48 2.016 11.99c-.001 1.763.46 3.484 1.336 5.004L2 22l5.161-1.353a9.96 9.96 0 004.864 1.258h.005c5.518 0 10.01-4.48 10.014-9.991C22.044 6.48 17.551 2 12.031 2zm5.836 14.195c-.244.686-1.42 1.309-1.969 1.393-.505.077-1.164.11-1.884-.122-.436-.14-1-.326-1.724-.641-3.04-1.32-5.02-4.397-5.172-4.601-.152-.204-1.233-1.64-1.233-3.128 0-1.487.778-2.218 1.054-2.524.275-.305.6-.381.8-.381.2 0 .4 0 .576.01.187.01.438-.071.685.524.254.61.868 2.115.944 2.268.077.153.128.33.025.534-.102.204-.153.33-.305.509-.153.178-.321.398-.458.534-.153.153-.312.32-.134.626.178.305.791 1.304 1.696 2.11 1.164 1.037 2.146 1.359 2.451 1.512.305.153.483.127.661-.077.178-.204.763-.89 9.67-1.119.204-.229.408-.191.686-.089.279.102 1.764.832 2.069.985.305.153.508.229.584.356.077.127.077.737-.167 1.423z" />
    </svg>
  );
}

// Gmail icon SVG
function GmailIcon(props) {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.272H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z" />
    </svg>
  );
}

// Copy checkmark SVG
function CheckIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M3.5 8.5L6.5 11.5L12.5 4.5" />
    </svg>
  );
}

// Copy icon SVG
function CopyIcon(props) {
  return (
    <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect x="5.5" y="5.5" width="8" height="8" rx="1.5" />
      <path d="M10.5 5.5V3.5a1.5 1.5 0 00-1.5-1.5H3.5a1.5 1.5 0 00-1.5 1.5V9a1.5 1.5 0 001.5 1.5h2" />
    </svg>
  );
}

export default function ContactChannels() {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(LINKS.email);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = LINKS.email;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2400);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  // Instant web Gmail compose URL (opens immediately in browser with zero lag)
  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(
    LINKS.email
  )}&su=${encodeURIComponent('Full Stack / Frontend Developer Opportunity')}`;

  const whatsappMessage = encodeURIComponent(
    'Hi Selvaganapathi, I saw your portfolio and would like to connect with you.'
  );
  const whatsappUrl = `https://wa.me/916369293685?text=${whatsappMessage}`;

  return (
    <div className="contact-channels">
      {/* Primary Channel: Email Card */}
      <div className="contact-card primary-channel">
        <div className="channel-badge">Primary Contact</div>
        <div className="channel-header">
          <span className="channel-icon mail-glow">
            <MailIcon />
          </span>
          <div className="channel-title-group">
            <span className="channel-subhead">Direct Email</span>
            <span className="channel-value">{LINKS.email}</span>
          </div>
        </div>

        <p className="channel-desc">
          Best for job descriptions, project scopes, technical inquiries, or interview schedules.
          I read every message and typically reply within 24 hours.
        </p>

        <div className="channel-actions">
          <a
            href={gmailUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-p channel-btn"
            title="Open instantly in Gmail Web"
          >
            <GmailIcon />
            <span>Open in Gmail</span>
            <ArrowRight />
          </a>

          <button
            type="button"
            onClick={handleCopyEmail}
            className={`btn btn-s copy-btn ${copied ? 'copied' : ''}`}
            aria-label="Copy email address"
          >
            {copied ? (
              <>
                <CheckIcon />
                <span className="copied-text">Email Copied!</span>
              </>
            ) : (
              <>
                <CopyIcon />
                <span>Copy Address</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${LINKS.email}`}
            className="btn btn-s mail-app-btn"
            title="Open in your default mail app"
          >
            <MailIcon />
            <span>Mail App</span>
          </a>
        </div>
      </div>

      {/* Instant Reach: WhatsApp & Phone */}
      <div className="contact-card">
        <div className="channel-header">
          <span className="channel-icon phone-glow">
            <PhoneIcon />
          </span>
          <div className="channel-title-group">
            <span className="channel-subhead">Call & WhatsApp</span>
            <span className="channel-value">{LINKS.phone}</span>
          </div>
        </div>

        <p className="channel-desc">
          For quick introductions, urgent updates, or informal chats. Available Monday through Saturday, 9:00 AM – 8:00 PM IST.
        </p>

        <div className="channel-actions">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-s whatsapp-btn"
          >
            <WhatsAppIcon />
            <span>Chat on WhatsApp</span>
          </a>
          <a href={`tel:${LINKS.phoneRaw}`} className="btn btn-s">
            <PhoneIcon />
            <span>Direct Call</span>
          </a>
        </div>
      </div>

      {/* Direct Collaboration Note Card */}
      <div className="contact-card response-pledge-card">
        <div className="pledge-head">
          <span className="pledge-tag">Direct Communication</span>
          <h3 className="pledge-title">What to expect when you reach out</h3>
        </div>

        <div className="pledge-items">
          <div className="pledge-item">
            <span className="pledge-bullet">⚡</span>
            <div>
              <strong>Fast, Direct Turnaround:</strong>
              <p>No screening intermediaries or recruiter barriers — you connect directly with me.</p>
            </div>
          </div>
          <div className="pledge-item">
            <span className="pledge-bullet">🎯</span>
            <div>
              <strong>Technical Deep Dives:</strong>
              <p>Happy to walk through architecture choices, production code snippets, or system design trade-offs.</p>
            </div>
          </div>
          <div className="pledge-item">
            <span className="pledge-bullet">📍</span>
            <div>
              <strong>Flexible Collaboration:</strong>
              <p>Comfortable with async-first workflows, Slack/Discord huddles, Google Meet, or in-person syncs in Bengaluru.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
