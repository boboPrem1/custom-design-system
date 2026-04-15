import { type CSSProperties, type ReactNode } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';

export type TrendDirection = 'up' | 'down' | 'neutral';

export interface StatCardProps {
  label: string;
  value: ReactNode;
  icon?: IconName;
  iconColor?: string;
  trend?: number;
  trendDirection?: TrendDirection;
  trendLabel?: string;
  elevated?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const StatCard = ({
  label,
  value,
  icon,
  iconColor = 'var(--color-primary-default)',
  trend,
  trendDirection = 'neutral',
  trendLabel,
  elevated = false,
  className,
  style,
}: StatCardProps) => {
  const trendColor =
    trendDirection === 'up'
      ? 'var(--color-semantic-success-default)'
      : trendDirection === 'down'
      ? 'var(--color-semantic-error-default)'
      : 'var(--color-text-tertiary)';

  const trendIcon: IconName =
    trendDirection === 'up' ? 'arrow_right' : trendDirection === 'down' ? 'arrow_right' : 'minus';

  const trendRotation =
    trendDirection === 'up' ? '-45deg' : trendDirection === 'down' ? '45deg' : '0deg';

  const cardStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-4)',
    padding: 'var(--spacing-6)',
    borderRadius: 'var(--radius-lg)',
    background: 'var(--color-surface-primary)',
    border: '1px solid var(--color-border-primary)',
    boxShadow: elevated ? 'var(--shadow-md)' : 'none',
    ...style,
  };

  return (
    <div className={className} style={cardStyle}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)' as unknown as number,
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
        }}>
          {label}
        </span>
        {icon && (
          <span style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-lg)',
            background: `${iconColor}18`,
            flexShrink: 0,
          }}>
            <Icon name={icon} size={20} color={iconColor} />
          </span>
        )}
      </div>

      <div style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-4xl)',
        fontWeight: 'var(--font-weight-bold)' as unknown as number,
        color: 'var(--color-text-primary)',
        lineHeight: 'var(--line-height-tight)',
      }}>
        {value}
      </div>

      {(trend !== undefined || trendLabel) && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
          <Icon
            name={trendIcon}
            size={16}
            color={trendColor}
            style={{ transform: `rotate(${trendRotation})`, flexShrink: 0 }}
          />
          {trend !== undefined && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' as unknown as number, color: trendColor }}>
              {trend > 0 ? '+' : ''}{trend}%
            </span>
          )}
          {trendLabel && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
              {trendLabel}
            </span>
          )}
        </div>
      )}
    </div>
  );
};
