import { type CSSProperties, type ReactNode } from 'react';
import { Button, type ButtonProps } from '../../atoms/Button';
import { type IconName } from '../../atoms/Icon';

export interface EmptyStateProps {
  illustration?: ReactNode;
  title: string;
  description?: string;
  cta?: { label: string; variant?: ButtonProps['variant']; iconLeft?: IconName; onClick?: () => void; };
  secondaryCta?: { label: string; onClick?: () => void; };
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DefaultIllustration = () => (
  <svg width={120} height={120} viewBox="0 0 120 120" fill="none" aria-hidden>
    <circle cx="60" cy="60" r="60" fill="var(--color-neutral-100)" />
    <rect x="35" y="45" width="50" height="38" rx="4" fill="var(--color-neutral-200)" />
    <rect x="42" y="38" width="36" height="10" rx="2" fill="var(--color-neutral-300)" />
    <circle cx="60" cy="64" r="10" fill="var(--color-neutral-300)" />
    <path d="M55 64h10M60 59v10" stroke="var(--color-neutral-400)" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const EmptyState = ({
  illustration,
  title,
  description,
  cta,
  secondaryCta,
  compact = false,
  className,
  style,
}: EmptyStateProps) => (
  <div
    className={className}
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: compact ? 'var(--spacing-8)' : 'var(--spacing-16)',
      gap: compact ? 'var(--spacing-3)' : 'var(--spacing-4)',
      fontFamily: 'var(--font-body)',
      ...style,
    }}
  >
    {!compact && (illustration ?? <DefaultIllustration />)}
    <h3 style={{ margin: 0, fontSize: compact ? 'var(--font-size-base)' : 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</h3>
    {description && <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', maxWidth: 360, lineHeight: 'var(--line-height-relaxed)' }}>{description}</p>}
    {(cta || secondaryCta) && (
      <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-2)', flexWrap: 'wrap', justifyContent: 'center' }}>
        {cta && <Button variant={cta.variant ?? 'primary'} iconLeft={cta.iconLeft} onClick={cta.onClick}>{cta.label}</Button>}
        {secondaryCta && <Button variant="ghost" onClick={secondaryCta.onClick}>{secondaryCta.label}</Button>}
      </div>
    )}
  </div>
);
