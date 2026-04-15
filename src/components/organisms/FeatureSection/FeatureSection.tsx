import { type CSSProperties } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';
import { Badge } from '../../atoms/Badge';

export interface Feature {
  icon?: IconName;
  iconColor?: string;
  title: string;
  description: string;
  badge?: string;
}

export type FeatureLayout = '2-cols' | '3-cols' | '4-cols' | 'alternating';

export interface FeatureSectionProps {
  title?: string;
  subtitle?: string;
  features: Feature[];
  layout?: FeatureLayout;
  className?: string;
  style?: CSSProperties;
}

export const FeatureSection = ({
  title,
  subtitle,
  features,
  layout = '3-cols',
  className,
  style,
}: FeatureSectionProps) => {
  const cols = layout === '4-cols' ? 4 : layout === '2-cols' ? 2 : 3;

  const sectionStyle: CSSProperties = {
    padding: 'var(--spacing-24) var(--spacing-8)',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const gridStyle: CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${layout === 'alternating' ? 1 : cols}, 1fr)`,
    gap: 'var(--spacing-8)',
    marginTop: title || subtitle ? 'var(--spacing-12)' : 0,
  };

  const cardStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)',
    padding: 'var(--spacing-6)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-border-primary)',
    background: 'var(--color-surface-primary)',
    transition: `box-shadow var(--motion-duration-base) var(--motion-easing-ease-out), transform var(--motion-duration-base) var(--motion-easing-ease-out)`,
  };

  const iconBoxStyle = (color?: string): CSSProperties => ({
    width: 48,
    height: 48,
    borderRadius: 'var(--radius-lg)',
    background: color ? `${color}18` : 'var(--color-primary-50)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  });

  if (layout === 'alternating') {
    return (
      <section className={className} style={sectionStyle}>
        {(title || subtitle) && (
          <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto var(--spacing-16)' }}>
            {title && <h2 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>{title}</h2>}
            {subtitle && <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>{subtitle}</p>}
          </div>
        )}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-16)' }}>
          {features.map((f, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-12)', flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}>
              <div style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
                <div style={{ ...iconBoxStyle(f.iconColor), width: 120, height: 120, borderRadius: 'var(--radius-2xl)' as unknown as string }}>
                  {f.icon && <Icon name={f.icon} size={32} color={f.iconColor ?? 'var(--color-primary-default)'} />}
                </div>
              </div>
              <div style={{ flex: 1 }}>
                {f.badge && <Badge label={f.badge} semantic="primary" style={{ marginBottom: 'var(--spacing-3)' }} />}
                <h3 style={{ margin: '0 0 var(--spacing-3)', fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{f.title}</h3>
                <p style={{ margin: 0, color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>{f.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={className} style={sectionStyle}>
      {(title || subtitle) && (
        <div style={{ textAlign: 'center', maxWidth: 640, margin: '0 auto' }}>
          {title && <h2 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>{title}</h2>}
          {subtitle && <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>{subtitle}</p>}
        </div>
      )}
      <div style={gridStyle}>
        {features.map((f, i) => (
          <div key={i} style={cardStyle}>
            <div style={iconBoxStyle(f.iconColor)}>
              {f.icon && <Icon name={f.icon} size={24} color={f.iconColor ?? 'var(--color-primary-default)'} />}
            </div>
            {f.badge && <Badge label={f.badge} size="sm" semantic="info" />}
            <h3 style={{ margin: 0, fontSize: 'var(--font-size-lg)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{f.title}</h3>
            <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-relaxed)' }}>{f.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};
