/** @type {import('next').NextConfig} */
const nextConfig = {
  /*
   * The original site is a single hand-written HTML file whose five <script>
   * blocks run exactly once, in order, and imperatively wire up global event
   * listeners, hash routing, timers and IntersectionObservers. React Strict
   * Mode intentionally double-invokes effects (and remounts once) in dev,
   * which would run that non-idempotent bootstrap twice and also clear the
   * pre-paint `data-theme` set by the inline <head> script. Disabling Strict
   * Mode keeps dev behavior identical to the original file and to production.
   */
  reactStrictMode: false,
};

export default nextConfig;
