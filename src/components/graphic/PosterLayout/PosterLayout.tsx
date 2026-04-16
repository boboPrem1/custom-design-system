import { type CSSProperties } from 'react';

export interface PosterLayoutProps {
  title?: string;
  subtitle?: string;
  date?: string;
  location?: string;
  ctaText?: string;
  brandName?: string;
  background?: string;
  accentColor?: string;
  textColor?: string;
  format?: 'A4' | 'A3';
  /** Image URL à afficher dans la zone visuelle (occupe la moitié droite) */
  imageSrc?: string;
  /** URL du site affichée dans le footer */
  url?: string;
  /** Ville affichée dans le footer */
  city?: string;
  className?: string;
  style?: CSSProperties;
}

export const PosterLayout = ({
  title = 'Atomic\nDesign\nSystem',
  subtitle = 'Une architecture cohérente pour des interfaces modernes et scalables.',
  date = '15 AVRIL 2024',
  location = 'EN LIGNE',
  ctaText = 'INSCRIPTION GRATUITE',
  brandName = 'DS',
  background = '#111827',
  accentColor = '#6C63FF',
  textColor = '#FFFFFF',
  format = 'A4',
  imageSrc,
  url = 'system.design / @designsystem',
  city = 'Paris, France',
  className,
  style,
}: PosterLayoutProps) => {
  const isA3 = format === 'A3';
  // Proportions A4 (1:1.414)
  const width = isA3 ? 594 : 420;
  const height = isA3 ? 841 : 594;

  const shell: CSSProperties = {
    width,
    height,
    background,
    color: textColor,
    fontFamily: 'var(--font-body)',
    padding: isA3 ? 64 : 48,
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
    overflow: 'hidden',
    boxSizing: 'border-box',
    boxShadow: 'var(--shadow-xl)',
    ...style,
  };

  return (
    <div className={className} style={{ display: 'inline-block' }}>
      <p style={{ margin: '0 0 var(--spacing-2)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>Format {format} ({width}×{height}px)</p>
      
      <div style={shell}>
        {/* Background graphic */}
        <div style={{ position: 'absolute', top: '-10%', right: '-20%', width: '80%', height: '80%', background: accentColor, borderRadius: '50%', filter: 'blur(100px)', opacity: 0.3, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-20%', left: '-10%', width: '60%', height: '60%', background: '#20d4a0', borderRadius: '50%', filter: 'blur(80px)', opacity: 0.2, pointerEvents: 'none' }} />

        {/* Header grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, marginBottom: isA3 ? 120 : 80, position: 'relative', zIndex: 1 }}>
          <div style={{ gridColumn: 'span 4' }}>
            <div style={{ width: 48, height: 48, background: accentColor, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, borderRadius: 12, fontSize: 20 }}>
              {brandName}
            </div>
          </div>
          <div style={{ gridColumn: 'span 8', display: 'flex', justifyContent: 'flex-end', gap: 32, fontSize: 14, fontWeight: 700, letterSpacing: '0.1em' }}>
             <span>{date}</span>
             <span>{location}</span>
          </div>
        </div>

        {/* Main Title + Visual area */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: imageSrc ? 'repeat(6, 1fr) repeat(6, 1fr)' : 'repeat(12, 1fr)', gap: 16, position: 'relative', zIndex: 1 }}>
          <div style={{ gridColumn: imageSrc ? 'span 6' : 'span 11', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <h1 style={{ 
              margin: '0 0 32px', 
              fontSize: isA3 ? 120 : 80, 
              fontWeight: 900, 
              lineHeight: 0.9, 
              letterSpacing: '-0.04em',
              fontFamily: 'var(--font-heading)',
              textTransform: 'uppercase',
              whiteSpace: 'pre-line' 
            }}>
              {title}
            </h1>
            <p style={{ margin: 0, fontSize: isA3 ? 24 : 18, maxWidth: '80%', lineHeight: 1.5, opacity: 0.8 }}>
              {subtitle}
            </p>
          </div>
          {imageSrc && (
            <div style={{ gridColumn: 'span 6', borderRadius: 'var(--radius-xl)', overflow: 'hidden', position: 'relative' }}>
              <img src={imageSrc} alt="Visuel" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
            </div>
          )}
        </div>

        {/* Footer CTA */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 16, borderTop: '2px solid rgba(255,255,255,0.2)', paddingTop: 32, position: 'relative', zIndex: 1 }}>
          <div style={{ gridColumn: 'span 8', fontSize: 14, lineHeight: 1.5, opacity: 0.6 }}>
            {url}<br/>
            {city}
          </div>
          <div style={{ gridColumn: 'span 4', display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
             <div style={{ background: textColor, color: background, padding: '16px 32px', borderRadius: 99, fontWeight: 800, fontSize: 14, letterSpacing: '0.05em' }}>
               {ctaText}
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
