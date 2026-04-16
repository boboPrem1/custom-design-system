import { type CSSProperties } from 'react';

export interface BrandCardProps {
  brandName?: string;
  tagline?: string;
  toneOfVoice?: string[];
  primaryColor?: string;
  darkColor?: string;
  lightColor?: string;
  primaryFont?: string;
  className?: string;
  style?: CSSProperties;
}

export const BrandCard = ({
  brandName = 'Atomic Design System',
  tagline = 'Construisez des interfaces 10× plus rapidement.',
  toneOfVoice = ['Professionnel', 'Direct', 'Accessible', 'Innovant'],
  primaryColor = '#6C63FF',
  darkColor = '#111827',
  lightColor = '#F3F4F6',
  primaryFont = 'Inter, sans-serif',
  className,
  style,
}: BrandCardProps) => {
  return (
    <div className={className} style={{ width: 800, padding: 'var(--spacing-12)', fontFamily: primaryFont, background: '#ffffff', color: '#111827', borderRadius: 'var(--radius-2xl)', boxShadow: 'var(--shadow-xl)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)', border: '1px solid var(--color-border-primary)', ...style }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 style={{ margin: '0 0 var(--spacing-2)', fontSize: '48px', fontWeight: 900, letterSpacing: '-0.03em', color: primaryColor }}>{brandName}</h1>
          <p style={{ margin: 0, fontSize: '24px', fontWeight: 500, color: '#4B5563' }}>{tagline}</p>
        </div>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: primaryColor, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
           <svg width="40" height="40" viewBox="0 0 100 100" fill="none">
             <path d="M30 70V30L70 70V30" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
           </svg>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--spacing-12)' }}>
        {/* Left Col */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-8)' }}>
          <div>
            <h3 style={{ margin: '0 0 var(--spacing-4)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF' }}>Tone of Voice</h3>
            <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
              {toneOfVoice.map(t => (
                <span key={t} style={{ padding: '6px 16px', background: '#F3F4F6', borderRadius: 999, fontSize: '14px', fontWeight: 600, color: '#374151' }}>{t}</span>
              ))}
            </div>
          </div>
          <div>
            <h3 style={{ margin: '0 0 var(--spacing-4)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF' }}>Typography</h3>
            <div style={{ padding: 'var(--spacing-6)', background: '#F9FAFB', borderRadius: 'var(--radius-lg)', border: '1px solid #E5E7EB' }}>
              <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: 'var(--spacing-1)' }}>Aa</div>
              <div style={{ fontSize: '16px', fontWeight: 600 }}>{primaryFont.split(',')[0]}</div>
              <div style={{ fontSize: '12px', color: '#6B7280' }}>Regular, Medium, SemiBold, Bold</div>
            </div>
          </div>
        </div>

        {/* Right Col */}
        <div>
          <h3 style={{ margin: '0 0 var(--spacing-4)', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', color: '#9CA3AF' }}>Core Colors</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            {/* Primary */}
            <div style={{ display: 'flex', alignItems: 'stretch', height: 80, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
              <div style={{ flex: 1, background: primaryColor }} />
              <div style={{ width: 140, background: '#fff', padding: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Primary</div>
                <div style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'monospace' }}>{primaryColor}</div>
              </div>
            </div>
            {/* Dark */}
            <div style={{ display: 'flex', alignItems: 'stretch', height: 60, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
              <div style={{ flex: 1, background: darkColor }} />
              <div style={{ width: 140, background: '#fff', padding: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Dark</div>
                <div style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'monospace' }}>{darkColor}</div>
              </div>
            </div>
            {/* Light */}
             <div style={{ display: 'flex', alignItems: 'stretch', height: 60, borderRadius: 'var(--radius-lg)', overflow: 'hidden', border: '1px solid #E5E7EB' }}>
              <div style={{ flex: 1, background: lightColor }} />
              <div style={{ width: 140, background: '#fff', padding: 'var(--spacing-3)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ fontWeight: 700, fontSize: '14px' }}>Light</div>
                <div style={{ fontSize: '12px', color: '#6B7280', fontFamily: 'monospace' }}>{lightColor}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
