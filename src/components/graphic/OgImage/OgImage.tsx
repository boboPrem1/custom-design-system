import { type CSSProperties } from 'react';

export interface OgImageProps {
  title?: string;
  subtitle?: string;
  brandName?: string;
  badge?: string;
  authorLabel?: string;
  background?: string;
  accentColor?: string;
  className?: string;
  style?: CSSProperties;
}

export const OgImage = ({
  title = 'Introduction au Design System Atomique avec React et TypeScript',
  subtitle = 'Tutoriel complet · 15 min de lecture',
  brandName = 'Design System',
  badge = 'Article',
  authorLabel = 'Par Jean Dupont',
  background = '#0f172a', /* slate-900 */
  accentColor = '#38bdf8', /* sky-400 */
  className,
  style,
}: OgImageProps) => {
  const w = 1200;
  const h = 630;

  const shell: CSSProperties = {
    width: w,
    height: h,
    background,
    color: '#ffffff',
    fontFamily: 'var(--font-body)',
    position: 'relative',
    overflow: 'hidden',
    boxShadow: 'var(--shadow-xl)',
    display: 'flex',
    flexDirection: 'column',
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
      <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>Open Graph Image (1200×630px)</p>
      
      <div style={shell}>
        {/* Decorative elements */}
        <div style={{ position: 'absolute', top: 0, right: 0, width: 600, height: 630, background: `linear-gradient(135deg, transparent 0%, ${accentColor} 150%)`, opacity: 0.4 }} />
        <div style={{ position: 'absolute', top: -100, right: -100, width: 400, height: 400, borderRadius: '50%', background: accentColor, filter: 'blur(120px)', opacity: 0.3 }} />
        
        <div style={{ position: 'relative', zIndex: 1, padding: 80, display: 'flex', flexDirection: 'column', height: '100%', boxSizing: 'border-box' }}>
          
          {/* Header */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: accentColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0f172a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <span style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.02em' }}>{brandName}</span>
            </div>
            {badge && (
              <div style={{ padding: '8px 20px', borderRadius: 99, border: '2px solid rgba(255,255,255,0.2)', fontSize: 18, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {badge}
              </div>
            )}
          </div>

          {/* Content */}
          <div style={{ marginTop: 60 }}>
            <h1 style={{ margin: '0 0 24px', fontSize: 72, fontWeight: 800, lineHeight: 1.1, fontFamily: 'var(--font-heading)', width: '90%', wordBreak: 'break-word' }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ margin: 0, fontSize: 32, color: 'rgba(255,255,255,0.7)', fontWeight: 500 }}>
                {subtitle}
              </p>
            )}
          </div>

          {/* Footer */}
          <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', gap: 20 }}>
            {authorLabel && (
              <>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', border: '2px solid rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <span style={{ fontSize: 24, fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>{authorLabel}</span>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
