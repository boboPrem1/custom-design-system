import { type CSSProperties, type ReactNode } from 'react';
import { Button, type ButtonProps } from '../../atoms/Button';
import { type IconName } from '../../atoms/Icon';

export interface HeroProps {
  title: ReactNode;
  subtitle?: ReactNode;
  ctas?: Array<{ label: string; variant?: ButtonProps['variant']; href?: string; onClick?: () => void; iconLeft?: IconName; }>;
  background?: 'gradient' | 'image' | 'solid';
  backgroundImage?: string;
  centered?: boolean;
  badge?: string;
  className?: string;
  style?: CSSProperties;
}

const BACKGROUNDS: Record<string, string> = {
  gradient: 'linear-gradient(135deg, var(--color-secondary-default) 0%, var(--color-primary-700) 50%, var(--color-accent-900) 100%)',
  solid:    'var(--color-secondary-default)',
};

export const HeroSection = ({
  title,
  subtitle,
  ctas = [],
  background = 'gradient',
  backgroundImage,
  centered = true,
  badge,
  className,
  style,
}: HeroProps) => {
  const heroStyle: CSSProperties = {
    position: 'relative',
    padding: 'var(--spacing-24) var(--spacing-8)',
    background: backgroundImage ? `url(${backgroundImage}) center/cover no-repeat` : BACKGROUNDS[background] ?? BACKGROUNDS.gradient,
    color: '#ffffff',
    overflow: 'hidden',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const contentStyle: CSSProperties = {
    position: 'relative',
    zIndex: 1,
    maxWidth: 720,
    margin: centered ? '0 auto' : undefined,
    textAlign: centered ? 'center' : 'left',
  };

  return (
    <section className={className} style={heroStyle} aria-label="Hero">
      {/* Decorative blur blobs */}
      <div aria-hidden style={{ position: 'absolute', width: 400, height: 400, borderRadius: '50%', background: 'rgba(108,99,255,0.25)', top: -80, right: -80, filter: 'blur(80px)', pointerEvents: 'none' }} />
      <div aria-hidden style={{ position: 'absolute', width: 300, height: 300, borderRadius: '50%', background: 'rgba(0,212,160,0.15)', bottom: -60, left: '20%', filter: 'blur(60px)', pointerEvents: 'none' }} />

      <div style={contentStyle}>
        {badge && (
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: '4px 12px',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(108,99,255,0.3)',
            border: '1px solid rgba(108,99,255,0.5)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 600,
            color: 'rgba(255,255,255,0.9)',
            marginBottom: 'var(--spacing-4)',
            letterSpacing: '0.04em',
          }}>
            {badge}
          </span>
        )}

        <h1 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, letterSpacing: '-0.02em', color: '#ffffff', fontFamily: 'var(--font-heading)' }}>
          {title}
        </h1>

        {subtitle && (
          <p style={{ margin: '0 0 var(--spacing-8)', fontSize: 'var(--font-size-xl)', color: 'rgba(255,255,255,0.75)', lineHeight: 'var(--line-height-relaxed)' }}>
            {subtitle}
          </p>
        )}

        {ctas.length > 0 && (
          <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap', justifyContent: centered ? 'center' : 'flex-start' }}>
            {ctas.map((cta, i) => (
              <a key={i} href={cta.href ?? '#'} style={{ textDecoration: 'none' }}>
                <Button
                  variant={cta.variant ?? (i === 0 ? 'primary' : 'secondary')}
                  size="lg"
                  iconLeft={cta.iconLeft}
                  onClick={cta.onClick}
                  style={i === 0 ? { background: 'var(--color-primary-default)', color: '#fff' } : { background: 'rgba(255,255,255,0.12)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)' }}
                >
                  {cta.label}
                </Button>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
