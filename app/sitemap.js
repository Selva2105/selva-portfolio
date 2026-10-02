import { PROJECTS } from '../lib/projects';
import { SITE_URL } from '../lib/site';

export default function sitemap() {
  const staticRoutes = [
    { path: '', priority: 1 },
    { path: '/work', priority: 0.9 },
    { path: '/journey', priority: 0.7 },
    { path: '/about', priority: 0.7 },
    { path: '/contact', priority: 0.8 },
  ];

  return [
    ...staticRoutes.map(({ path, priority }) => ({
      url: `${SITE_URL}${path}`,
      changeFrequency: 'monthly',
      priority,
    })),
    ...PROJECTS.map(({ slug }) => ({
      url: `${SITE_URL}/work/${slug}`,
      changeFrequency: 'monthly',
      priority: 0.8,
    })),
  ];
}
