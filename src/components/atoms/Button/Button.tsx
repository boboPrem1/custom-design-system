import { type CSSProperties, type ButtonHTMLAttributes, type ReactNode } from 'react';
import { Icon, type IconName } from '../Icon';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'link';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icône à gauche du label */
  iconLeft?: IconName;
  /** Icône à droite du label */
  iconRight?: IconName;
  /** Bouton icône seul — masque le label visuellement */
  iconOnly?: IconName;
  /** Affiche un spinner + désactive le bouton */
  loading?: boolean;
  children?: ReactNode;
}

/* ── Tailles ──────────────────────────────────────────────── */
const sizeMap: Record<ButtonSize, CSSProperties & { iconSize: 16 | 20 }> = {
  sm: {
    padding: '0 var(--spacing-3)',
    height: '32px',
    fontSize: 'var(--font-size-sm)',
    borderRadius: 'var(--radius-md)',
    iconSize: 16,
  },
  md: {
    padding: '0 var(--spacing-4)',
    height: '40px',
    fontSize: 'var(--font-size-base)',
    borderRadius: 'var(--radius-md)',
    iconSize: 20,
  },
  lg: {
    padding: '0 var(--spacing-6)',
    height: '48px',
    fontSize: 'var(--font-size-lg)',
    borderRadius: 'var(--radius-lg)',
    iconSize: 20,
  },
};

/* ── Variantes ────────────────────────────────────────────── */
const variantBase: Record<ButtonVariant, CSSProperties> = {
  primary: {
    background: 'var(--color-primary-default)',
    color: '#ffffff',
    border: '1px solid transparent',
  },
  secondary: {
    background: 'transparent',
    color: 'var(--color-primary-default)',
    border: '1px solid var(--color-primary-default)',
  },
  ghost: {
    background: 'transparent',
    color: 'var(--color-text-primary)',
    border: '1px solid transparent',
  },
  danger: {
    background: 'var(--color-semantic-error-default)',
    color: '#ffffff',
    border: '1px solid transparent',
  },
  link: {
    background: 'transparent',
    color: 'var(--color-text-link)',
    border: 'none',
    textDecoration: 'underline',
    padding: '0',
    height: 'auto',
  },
};

/* ── Spinner inline ───────────────────────────────────────── */
const Spinner = ({ size }: { size: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    style={{
      animation: 'btn-spin 0.7s linear infinite',
      flexShrink: 0,
    }}
    aria-hidden
  >
    <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
    <path d="M12 2a10 10 0 0 1 10 10" />
  </svg>
);

export const Button = ({
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  iconOnly,
  loading = false,
  disabled,
  children,
  style,
  ...props
}: ButtonProps) => {
  const { iconSize, ...sizeStyles } = sizeMap[size];
  const isDisabled = disabled || loading;
  const isLink = variant === 'link';

  const baseStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--spacing-2)',
    fontFamily: 'var(--font-body)',
    fontWeight: 'var(--font-weight-medium)' as unknown as number,
    lineHeight: 1,
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 'var(--opacity-disabled)' : 1,
    transition: `background var(--motion-duration-fast) var(--motion-easing-ease-out),
                 opacity var(--motion-duration-fast) var(--motion-easing-ease-out),
                 box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out)`,
    outline: 'none',
    whiteSpace: 'nowrap',
    userSelect: 'none',
    textDecoration: isLink ? 'underline' : 'none',
    ...(isLink ? {} : sizeStyles),
    ...variantBase[variant],
    // icon-only : forcer carré
    ...(iconOnly
      ? {
          padding: '0',
          width: sizeMap[size].height,
          height: sizeMap[size].height,
        }
      : {}),
    ...style,
  };

  return (
    <>
      {/* Keyframe inliné une seule fois via <style> */}
      <style>{`
        @keyframes btn-spin { to { transform: rotate(360deg); } }
        button:not(:disabled):hover { filter: brightness(0.92); }
      `}</style>
      <button {...props} disabled={isDisabled} style={baseStyle}>
        {loading && <Spinner size={iconSize} />}
        {!loading && iconOnly && <Icon name={iconOnly} size={iconSize} />}
        {!iconOnly && (
          <>
            {!loading && iconLeft && <Icon name={iconLeft} size={iconSize} />}
            {children && (
              <span>{children}</span>
            )}
            {iconRight && <Icon name={iconRight} size={iconSize} />}
          </>
        )}
      </button>
    </>
  );
};
