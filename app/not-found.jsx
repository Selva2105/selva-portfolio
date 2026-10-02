import Link from 'next/link';

export default function NotFound() {
  return <section className="state-page"><p className="eyebrow">404</p><h1 className="h1">That page isn&apos;t here.</h1><p className="lead">The link may be old, but the work is still available.</p><Link href="/work" className="btn btn-p">View case studies</Link><Link href="/" className="btn btn-s">Go home</Link></section>;
}
