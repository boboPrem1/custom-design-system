import { type CSSProperties, type InputHTMLAttributes, type ReactNode, useId } from 'react';

export type CheckboxState = 'unchecked' | 'checked' | 'indeterminate';

export interface CheckboxProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  /** État indeterminate (tiret) — utile pour "sélectionner tout" */
  indeterminate?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Checkbox = ({
  label,
  indeterminate = false,
  disabled,
  checked,
  defaultChecked,
  className,
  style,
  onChange,
  ...props
}: CheckboxProps) => {
  const id = useId();

  /* Appliquer indeterminate via ref callback */
  const handleRef = (el: HTMLInputElement | null) => {
    if (el) el.indeterminate = indeterminate;
  };

  const boxSize = 18;

  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    userSelect: 'none',
    ...style,
  };

  /* Couche visuelle personnalisée */
  const boxStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: boxSize,
    height: boxSize,
    borderRadius: 'var(--radius-sm)',
    border: `2px solid ${checked || indeterminate ? 'var(--color-primary-default)' : 'var(--color-border-secondary)'}`,
    background: checked || indeterminate ? 'var(--color-primary-default)' : 'var(--color-surface-primary)',
    transition: `background var(--motion-duration-base) var(--motion-easing-spring),
                 border-color var(--motion-duration-base) var(--motion-easing-spring)`,
    flexShrink: 0,
  };

  return (
    <label htmlFor={id} style={wrapperStyle} className={className}>
      <style>{`
        .ds-checkbox-input { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); }
        .ds-checkbox-input:focus-visible + .ds-checkbox-box {
          outline: 2px solid var(--color-border-focus);
          outline-offset: 2px;
        }
        @keyframes cb-check { from { stroke-dashoffset: 18; } to { stroke-dashoffset: 0; } }
      `}</style>

      {/* Input natif caché pour l'accessibilité */}
      <input
        id={id}
        type="checkbox"
        className="ds-checkbox-input"
        disabled={disabled}
        checked={checked}
        defaultChecked={defaultChecked}
        onChange={onChange}
        ref={handleRef}
        {...props}
      />

      {/* Box visuelle */}
      <span className="ds-checkbox-box" style={boxStyle}>
        {indeterminate && !checked && (
          <svg width={10} height={2} viewBox="0 0 10 2" fill="none">
            <rect width={10} height={2} rx={1} fill="white" />
          </svg>
        )}
        {checked && (
          <svg width={11} height={9} viewBox="0 0 11 9" fill="none">
            <path
              d="M1 4.5L4 7.5L10 1"
              stroke="white"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={18}
              strokeDashoffset={0}
              style={{ animation: 'cb-check 0.18s var(--motion-easing-spring) forwards' }}
            />
          </svg>
        )}
      </span>

      {label && (
        <span
          style={{
            fontSize: 'var(--font-size-base)',
            color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
            lineHeight: 'var(--line-height-normal)',
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};
