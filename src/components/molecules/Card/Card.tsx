import { type CSSProperties, type MouseEvent, type ReactNode } from 'react';

export interface CardProps {
  header?: ReactNode;
  action?: ReactNode;
  children?: ReactNode;
  footer?: ReactNode;
  clickable?: boolean;
  elevated?: boolean;
  bordered?: boolean;
  onClick?: (e: MouseEvent<HTMLDivElement>) => void;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
}

const PADDING_MAP = {
  none: '0',
  sm:   'var(--spacing-3)',
  md:   'var(--spacing-6)',
  lg:   'var(--spacing-8)',
};

export const Card = ({
  header,
  action,
  children,
  footer,
  clickable = false,
  elevated = false,
  bordered = true,
  onClick,
  padding = 'md',
  className,
  style,
}: CardProps) => {
  const p = PADDING_MAP[padding];

  const baseStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'var(--radius-lg)',
    background: 'var(--color-surface-primary)',
    border: bordered ? '1px solid var(--color-border-primary)' : 'none',
    boxShadow: elevated ? 'var(--shadow-md)' : 'none',
    overflow: 'hidden',
    cursor: clickable ? 'pointer' : 'default',
    transition: 'box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out), transform var(--motion-duration-fast) var(--motion-easing-ease-out)',
    ...style,
  };

  return (
    <div
      className={className}
      style={baseStyle}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
      onClick={clickable ? onClick : undefined}
      onKeyDown={clickable ? (e) => e.key === 'Enter' && onClick?.(e as unknown as MouseEvent<HTMLDivElement>) : undefined}
      onMouseEnter={(e) => { if (clickable) (e.currentTarget as HTMLElement).style.boxShadow = 'var(--shadow-lg)'; }}
      onMouseLeave={(e) => { if (clickable) (e.currentTarget as HTMLElement).style.boxShadow = elevated ? 'var(--shadow-md)' : 'none'; }}
    >
      {(header || action) && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: `var(--spacing-4) ${p}`,
          borderBottom: '1px solid var(--color-border-primary)',
          gap: 'var(--spacing-3)',
        }}>
          {header && (
            <div style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 'var(--font-weight-bold)' as unknown as number,
              color: 'var(--color-text-primary)',
              lineHeight: 'var(--line-height-tight)',
              flex: 1,
            }}>
              {header}
            </div>
          )}
          {action && (
            <div style={{ flexShrink: 0 }}>
              {action}
            </div>
          )}
        </div>
      )}

      {children !== undefined && (
        <div style={{ flex: 1, padding: p }}>
          {children}
        </div>
      )}

      {footer && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: 'var(--spacing-3)',
          padding: `var(--spacing-4) ${p}`,
          borderTop: '1px solid var(--color-border-primary)',
          background: 'var(--color-surface-secondary)',
        }}>
          {footer}
        </div>
      )}
    </div>
  );
};
