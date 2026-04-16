import { type CSSProperties } from 'react';

const LogoMark = ({ size = 48, color = 'var(--color-primary-default)' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="100" rx="20" fill={color} />
    <path d="M30 70V30L70 70V30" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export interface LogoLockupProps {
  brandName?: string;
  brandColor?: string;
  className?: string;
  style?: CSSProperties;
}

export const LogoLockup = ({
  brandName = 'Design System',
  brandColor = 'var(--color-primary-default)',
  className,
  style,
}: LogoLockupProps) => {
  return (
    <div className={className} style={{ padding: 'var(--spacing-8)', fontFamily: 'var(--font-body)', background: 'var(--color-surface-primary)', color: 'var(--color-text-primary)', ...style }}>
      <header style={{ marginBottom: 'var(--spacing-12)' }}>
        <h1 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Logo Lockups</h1>
        <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>Variations et zones de protection du logo.</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: 'var(--spacing-8)' }}>
        {/* Horizontal */}
        <div style={{ background: 'var(--color-surface-secondary)', padding: 'var(--spacing-12)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border-primary)' }}>
          <p style={{ alignSelf: 'flex-start', margin: '0 0 var(--spacing-6)', fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>Horizontal Lockup</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', position: 'relative' }}>
            <LogoMark size={64} />
            <span style={{ fontSize: '40px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>{brandName}</span>
          </div>
        </div>

        {/* Vertical */}
        <div style={{ background: 'var(--color-surface-secondary)', padding: 'var(--spacing-12)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border-primary)' }}>
          <p style={{ alignSelf: 'flex-start', margin: '0 0 var(--spacing-6)', fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>Vertical Lockup</p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-4)' }}>
            <LogoMark size={80} />
            <span style={{ fontSize: '32px', fontWeight: 800, fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>{brandName}</span>
          </div>
        </div>

        {/* Clear Space */}
        <div style={{ background: 'var(--color-surface-secondary)', padding: 'var(--spacing-12)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px dashed var(--color-primary-default)', position: 'relative' }}>
          <p style={{ position: 'absolute', top: 16, left: 16, margin: 0, fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>Clear Space (X)</p>
          <div style={{ padding: 'var(--spacing-8)', border: '1px dashed var(--color-primary-300)', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '-12px', left: '50%', transform: 'translateX(-50%)', color: 'var(--color-primary-default)', fontSize: '12px', fontWeight: 700 }}>X</div>
            <div style={{ position: 'absolute', bottom: '-12px', left: '50%', transform: 'translateX(-50%)', color: 'var(--color-primary-default)', fontSize: '12px', fontWeight: 700 }}>X</div>
            <div style={{ position: 'absolute', top: '50%', left: '-12px', transform: 'translateY(-50%)', color: 'var(--color-primary-default)', fontSize: '12px', fontWeight: 700 }}>X</div>
            <div style={{ position: 'absolute', top: '50%', right: '-12px', transform: 'translateY(-50%)', color: 'var(--color-primary-default)', fontSize: '12px', fontWeight: 700 }}>X</div>
            <LogoMark size={48} />
          </div>
        </div>

        {/* Icon Only */}
        <div style={{ background: 'var(--color-surface-secondary)', padding: 'var(--spacing-12)', borderRadius: 'var(--radius-xl)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid var(--color-border-primary)' }}>
           <p style={{ alignSelf: 'flex-start', margin: '0 0 var(--spacing-6)', fontSize: 'var(--font-size-xs)', fontWeight: 600, textTransform: 'uppercase', color: 'var(--color-text-tertiary)' }}>Icon Only</p>
           <LogoMark size={96} />
        </div>
      </div>
      
      {/* Background variants */}
      <h3 style={{ margin: 'var(--spacing-12) 0 var(--spacing-6)', fontSize: 'var(--font-size-xl)' }}>Backgrounds</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 0, borderRadius: 'var(--radius-xl)', overflow: 'hidden', border: '1px solid var(--color-border-primary)' }}>
        <div style={{ background: '#ffffff', padding: 'var(--spacing-12)', display: 'flex', justifyContent: 'center' }}>
          <LogoMark size={48} color={brandColor} />
        </div>
        <div style={{ background: '#111827', padding: 'var(--spacing-12)', display: 'flex', justifyContent: 'center' }}>
          <LogoMark size={48} color="#ffffff" />
        </div>
        <div style={{ background: brandColor, padding: 'var(--spacing-12)', display: 'flex', justifyContent: 'center' }}>
          <LogoMark size={48} color="#ffffff" />
        </div>
      </div>
    </div>
  );
};
