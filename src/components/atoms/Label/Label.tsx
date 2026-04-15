import { type CSSProperties, type ReactNode } from 'react';

type LabelVariant = 'form' | 'caption' | 'overline';

export interface LabelProps {
  variant?: LabelVariant;
  htmlFor?: string;
  required?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const variantStyles: Record<LabelVariant, CSSProperties> = {
  form: {
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)' as unknown as number,
    color: 'var(--color-text-primary)',
    lineHeight: 'var(--line-height-normal)',
  },
  caption: {
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-regular)' as unknown as number,
    color: 'var(--color-text-secondary)',
    lineHeight: 'var(--line-height-normal)',
  },
  overline: {
    fontSize: 'var(--font-size-xs)',
    fontWeight: 'var(--font-weight-bold)' as unknown as number,
    color: 'var(--color-text-tertiary)',
    lineHeight: 'var(--line-height-normal)',
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
  },
};

export const Label = ({
  variant = 'form',
  htmlFor,
  required = false,
  children,
  className,
  style,
}: LabelProps) => {
  const baseStyle: CSSProperties = {
    fontFamily: 'var(--font-body)',
    margin: 0,
    display: 'inline-block',
    ...variantStyles[variant],
    ...style,
  };

  return (
    <label className={className} htmlFor={htmlFor} style={baseStyle}>
      {children}
      {required && (
        <span
          style={{ color: 'var(--color-semantic-error-default)', marginLeft: '2px' }}
          aria-hidden="true"
        >
          *
        </span>
      )}
    </label>
  );
};
