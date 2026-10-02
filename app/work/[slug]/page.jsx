import { notFound } from 'next/navigation';
import { PROJECTS, getProject } from '../../../lib/projects';
import { CASE_STUDIES } from '../../../components/case-studies';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return { title: 'Work' };

  const canonical = `/work/${project.slug}`;
  return {
    title: project.title,
    description: project.short,
    alternates: { canonical },
    openGraph: {
      type: 'article',
      title: `${project.title} — ${project.titleEm}`,
      description: project.short,
      url: canonical,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${project.title} — ${project.titleEm}`,
      description: project.short,
    },
  };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  const CaseStudy = CASE_STUDIES[slug];
  if (!project || !CaseStudy) notFound();

  return <CaseStudy />;
}
