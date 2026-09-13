import { notFound } from 'next/navigation';
import { PROJECTS, getProject } from '../../../lib/projects';
import { CASE_STUDIES } from '../../../components/case-studies';

export function generateStaticParams() {
  return PROJECTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  return { title: project ? project.title : 'Work' };
}

export default async function CaseStudyPage({ params }) {
  const { slug } = await params;
  const project = getProject(slug);
  const CaseStudy = CASE_STUDIES[slug];
  if (!project || !CaseStudy) notFound();

  return <CaseStudy />;
}
