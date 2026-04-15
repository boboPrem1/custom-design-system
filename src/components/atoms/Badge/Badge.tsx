import { type CSSProperties, type ReactNode } from 'react';

export type BadgeVariant = 'filled' | 'outline' | 'dot';
export type BadgeSemantic = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';
export type BadgeSize = 'sm' | 'md';

const COLORS: Record<BadgeSemantic, { bg: string; text: string; border: string; dot: string }> = {
  primary: {
    bg:     'var(--color-primary-50)',
    text:   'var(--color-primary-default)',
    border: 'var(--color-primary-200)',
    dot:    'var(--color-primary-default)',
  },
  success: {
    bg:     'var(--color-semantic-success-light)',
    text:   'var(--color-semantic-success-dark)',
    border: 'var(--color-semantic-success-default)',
    dot:    'var(--color-semantic-success-default)',
  },
  warning: {
    bg:     'var(--color-semantic-warning-light)',
    text:   'var(--color-semantic-warning-dark)',
    border: 'var(--color-semantic-warning-default)',
    dot:    'var(--color-semantic-warning-default)',
  },
  error: {
    bg:     'var(--color-semantic-error-light)',
    text:   'var(--color-semantic-error-dark)',
    border: 'var(--color-semantic-error-default)',
    dot:    'var(--color-semantic-error-default)',
  },
  info: {
    bg:     'var(--color-semantic-info-light)',
    text:   'var(--color-semantic-info-dark)',
    border: 'var(--color-semantic-info-default)',
    dot:    'var(--color-semantic-info-default)',
  },
  neutral: {
    bg:     'var(--color-neutral-100)',
    text:   'var(--color-neutral-700)',
    border: 'var(--color-neutral-300)',
    dot:    'var(--color-neutral-500)',
  },
};

export interface BadgeProps {
  label?: ReactNode;
  variant?: BadgeVariant;
  semantic?: BadgeSemantic;
  size?: BadgeSize;
  className?: string;
  style?: CSSProperties;
}

export const Badge = ({
  label,
  variant = 'filled',
  semantic = 'primary',
  size = 'md',
  className,
  style,
}: BadgeProps) => {
  const c = COLORS[semantic];

  if (variant === 'dot') {
    return (
      <span
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 'var(--spacing-2)',
          fontFamily: 'var(--font-body)',
          fontSize: size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
          color: 'var(--color-text-primary)',
          ...style,
        }}
      >
        <span
          style={{
            width: size === 'sm' ? 6 : 8,
            height: size === 'sm' ? 6 : 8,
            borderRadius: '50%',
            background: c.dot,
            flexShrink: 0,
            display: 'inline-block',
          }}
        />
        {label}
      </span>
    );
  }

  const isFilled = variant === 'filled';

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: size === 'sm' ? '0 var(--spacing-2)' : '0 var(--spacing-3)',
    height: size === 'sm' ? 20 : 24,
    borderRadius: 'var(--radius-full)',
    fontFamily: 'var(--font-body)',
    fontSize: size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)' as unknown as number,
    lineHeight: 1,
    whiteSpace: 'nowrap',
    background: isFilled ? c.bg : 'transparent',
    color: c.text,
    border: `1px solid ${isFilled ? 'transparent' : c.border}`,
    ...style,
  };

  return (
    <span className={className} style={baseStyle}>
      {label}
    </span>
  );
};
