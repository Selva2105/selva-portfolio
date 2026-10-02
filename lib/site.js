const configuredUrl = process.env.SITE_URL || process.env.NEXT_PUBLIC_SITE_URL;
const vercelUrl = process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL;

export const SITE_URL = (configuredUrl || (vercelUrl ? `https://${vercelUrl}` : 'http://localhost:3000')).replace(/\/$/, '');

export const SITE_DESCRIPTION =
  'Full Stack Developer building scalable, production-grade web applications with Next.js, React, Node.js and TypeScript across enterprise HR, device management, and internal platforms.';
