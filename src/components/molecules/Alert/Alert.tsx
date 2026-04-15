import { type CSSProperties, type ReactNode, useState } from 'react';
import { Icon } from '../../atoms/Icon';

export type AlertSemantic = 'info' | 'success' | 'warning' | 'error';
export type AlertVariant = 'inline' | 'banner';

const SEMANTIC_MAP: Record<AlertSemantic, { bg: string; border: string; color: string; iconColor: string; icon: 'info' | 'check' | 'warning' }> = {
  info:    { bg: 'var(--color-semantic-info-light)',    border: 'var(--color-semantic-info-default)',    color: 'var(--color-semantic-info-dark)',    iconColor: 'var(--color-semantic-info-default)',    icon: 'info' },
  success: { bg: 'var(--color-semantic-success-light)', border: 'var(--color-semantic-success-default)', color: 'var(--color-semantic-success-dark)', iconColor: 'var(--color-semantic-success-default)', icon: 'check' },
  warning: { bg: 'var(--color-semantic-warning-light)', border: 'var(--color-semantic-warning-default)', color: 'var(--color-semantic-warning-dark)', iconColor: 'var(--color-semantic-warning-default)', icon: 'warning' },
  error:   { bg: 'var(--color-semantic-error-light)',   border: 'var(--color-semantic-error-default)',   color: 'var(--color-semantic-error-dark)',   iconColor: 'var(--color-semantic-error-default)',   icon: 'warning' },
};

export interface AlertProps {
  semantic?: AlertSemantic;
  variant?: AlertVariant;
  title?: ReactNode;
  children?: ReactNode;
  dismissible?: boolean;
  onDismiss?: () => void;
  className?: string;
  style?: CSSProperties;
}

export const Alert = ({
  semantic = 'info',
  variant = 'inline',
  title,
  children,
  dismissible = false,
  onDismiss,
  className,
  style,
}: AlertProps) => {
  const [dismissed, setDismissed] = useState(false);
  if (dismissed) return null;

  const s = SEMANTIC_MAP[semantic];

  const baseStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-4)',
    borderRadius: variant === 'banner' ? 0 : 'var(--radius-lg)',
    border: variant === 'banner' ? 'none' : `1px solid ${s.border}`,
    borderLeft: `4px solid ${s.border}`,
    background: s.bg,
    width: '100%',
    boxSizing: 'border-box',
    ...style,
  };

  return (
    <div
      role="alert"
      aria-live="polite"
      className={className}
      style={baseStyle}
    >
      <Icon name={s.icon} size={20} color={s.iconColor} style={{ flexShrink: 0, marginTop: 1 }} />
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)' }}>
        {title && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)', fontWeight: 'var(--font-weight-medium)' as unknown as number, color: s.color }}>
            {title}
          </span>
        )}
        {children && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: s.color }}>
            {children}
          </span>
        )}
      </div>
      {dismissible && (
        <button
          type="button"
          aria-label="Fermer"
          onClick={() => { setDismissed(true); onDismiss?.(); }}
          style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: s.iconColor, flexShrink: 0 }}
        >
          <Icon name="close" size={16} />
        </button>
      )}
    </div>
  );
};
