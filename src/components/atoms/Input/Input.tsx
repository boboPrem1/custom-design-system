import {
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
  forwardRef,
} from 'react';
import { Icon, type IconName } from '../Icon';

export type InputState = 'default' | 'focus' | 'error' | 'disabled' | 'readonly';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  /** Icône affichée à gauche */
  iconLeft?: IconName;
  /** Icône ou nœud affiché à droite */
  iconRight?: IconName;
  /** État visuel forcé (error, disabled, readonly gérés aussi via props HTML) */
  state?: InputState;
  /** Message d'erreur affiché en rouge sous l'input */
  errorMessage?: string;
  /** Hint affiché sous l'input */
  hint?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const BORDER_COLOR: Record<string, string> = {
  default:  'var(--color-border-primary)',
  focus:    'var(--color-border-focus)',
  error:    'var(--color-semantic-error-default)',
  disabled: 'var(--color-border-primary)',
  readonly: 'var(--color-border-primary)',
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      iconLeft,
      iconRight,
      state = 'default',
      errorMessage,
      hint,
      disabled,
      readOnly,
      className,
      style,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || state === 'disabled';
    const isReadOnly = readOnly || state === 'readonly';
    const isError    = state === 'error' || Boolean(errorMessage);

    const resolvedState: InputState = isDisabled
      ? 'disabled'
      : isReadOnly
      ? 'readonly'
      : isError
      ? 'error'
      : 'default';

    const borderColor = BORDER_COLOR[resolvedState];

    /* ── Wrapper ────────────────────────────────────────────── */
    const wrapperStyle: CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: '100%',
      height: '40px',
      borderRadius: 'var(--radius-md)',
      border: `1.5px solid ${borderColor}`,
      background: isDisabled
        ? 'var(--color-surface-tertiary)'
        : isReadOnly
        ? 'var(--color-surface-secondary)'
        : 'var(--color-surface-primary)',
      transition: `border-color var(--motion-duration-fast) var(--motion-easing-ease-out),
                   box-shadow  var(--motion-duration-fast) var(--motion-easing-ease-out)`,
      opacity: isDisabled ? 'var(--opacity-disabled)' : 1,
      ...style,
    };

    /* ── Input natif ────────────────────────────────────────── */
    const inputStyle: CSSProperties = {
      flex: 1,
      height: '100%',
      paddingLeft: iconLeft ? 'var(--spacing-8)' : 'var(--spacing-3)',
      paddingRight: iconRight ? 'var(--spacing-8)' : 'var(--spacing-3)',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--font-size-base)',
      color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
      cursor: isDisabled ? 'not-allowed' : isReadOnly ? 'default' : 'text',
    };

    const iconStyle: CSSProperties = {
      position: 'absolute',
      top: '50%',
      transform: 'translateY(-50%)',
      pointerEvents: 'none',
      color: isError
        ? 'var(--color-semantic-error-default)'
        : 'var(--color-text-tertiary)',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', width: '100%' }}>
        <style>{`
          .ds-input-wrapper:focus-within {
            border-color: ${isError ? 'var(--color-semantic-error-default)' : 'var(--color-border-focus)'} !important;
            box-shadow: 0 0 0 3px ${isError ? 'rgba(220,38,38,0.15)' : 'rgba(108,99,255,0.18)'};
          }
        `}</style>

        <div
          className={['ds-input-wrapper', className ?? ''].filter(Boolean).join(' ')}
          style={wrapperStyle}
        >
          {iconLeft && (
            <Icon
              name={iconLeft}
              size={16}
              style={{ ...iconStyle, left: 'var(--spacing-3)' }}
            />
          )}

          <input
            ref={ref}
            disabled={isDisabled}
            readOnly={isReadOnly}
            style={inputStyle}
            aria-invalid={isError || undefined}
            {...props}
          />

          {iconRight && (
            <Icon
              name={iconRight}
              size={16}
              style={{ ...iconStyle, right: 'var(--spacing-3)' }}
            />
          )}
        </div>

        {isError && errorMessage && (
          <span
            role="alert"
            style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-semantic-error-default)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-1)',
            }}
          >
            <Icon name="warning" size={12} color="var(--color-semantic-error-default)" />
            {errorMessage}
          </span>
        )}

        {!isError && hint && (
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
            {hint}
          </span>
        )}
      </div>
    );
  },
);

Input.displayName = 'Input';
