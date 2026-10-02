import { ImageResponse } from 'next/og';

export const alt = 'Selvaganapathi Kanakaraj — Full Stack Developer';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '72px',
        background: '#08080a',
        color: '#f5f5f6',
        fontFamily: 'sans-serif',
      }}
    >
      <div style={{ display: 'flex', color: '#ff5d3b', fontSize: 28, fontWeight: 600 }}>
        SELVAGANAPATHI KANAKARAJ
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <div style={{ display: 'flex', maxWidth: 960, fontSize: 66, lineHeight: 1.05, letterSpacing: '-0.04em', fontWeight: 700 }}>
          Full-stack systems people rely on without thinking about it.
        </div>
        <div style={{ display: 'flex', color: '#a5a5ae', fontSize: 28 }}>
          Next.js · React · Node.js · TypeScript · Bengaluru, India
        </div>
      </div>
    </div>,
    size
  );
}
