import { type CSSProperties, type InputHTMLAttributes, type ReactNode, useId } from 'react';

export interface RadioProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type' | 'size'> {
  label?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export interface RadioGroupProps {
  name: string;
  options: { value: string; label: ReactNode; disabled?: boolean }[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  direction?: 'vertical' | 'horizontal';
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

/* ─────────────── Radio individuel ──────────────────────────── */
export const Radio = ({
  label,
  disabled,
  checked,
  className,
  style,
  onChange,
  ...props
}: RadioProps) => {
  const id = useId();
  const dotSize = 18;

  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    userSelect: 'none',
    ...style,
  };

  const circleStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: dotSize,
    height: dotSize,
    borderRadius: '50%',
    border: `2px solid ${checked ? 'var(--color-primary-default)' : 'var(--color-border-secondary)'}`,
    background: 'var(--color-surface-primary)',
    flexShrink: 0,
    transition: `border-color var(--motion-duration-base) var(--motion-easing-spring)`,
  };

  const dotStyle: CSSProperties = {
    width: 8,
    height: 8,
    borderRadius: '50%',
    background: 'var(--color-primary-default)',
    transform: checked ? 'scale(1)' : 'scale(0)',
    transition: `transform var(--motion-duration-base) var(--motion-easing-spring)`,
  };

  return (
    <label htmlFor={id} style={wrapperStyle} className={className}>
      <style>{`
        .ds-radio-input { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); }
        .ds-radio-input:focus-visible + .ds-radio-circle {
          outline: 2px solid var(--color-border-focus);
          outline-offset: 2px;
        }
      `}</style>

      <input
        id={id}
        type="radio"
        className="ds-radio-input"
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />

      <span className="ds-radio-circle" style={circleStyle}>
        <span style={dotStyle} />
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

/* ─────────────── RadioGroup ─────────────────────────────────── */
export const RadioGroup = ({
  name,
  options,
  value,
  defaultValue,
  onChange,
  direction = 'vertical',
  disabled: groupDisabled,
  className,
  style,
}: RadioGroupProps) => {
  const groupStyle: CSSProperties = {
    display: 'flex',
    flexDirection: direction === 'vertical' ? 'column' : 'row',
    flexWrap: 'wrap',
    gap: direction === 'vertical' ? 'var(--spacing-3)' : 'var(--spacing-6)',
    ...style,
  };

  return (
    <div role="radiogroup" className={className} style={groupStyle}>
      {options.map((option) => (
        <Radio
          key={option.value}
          name={name}
          value={option.value}
          label={option.label}
          checked={value !== undefined ? value === option.value : defaultValue === option.value}
          disabled={groupDisabled || option.disabled}
          onChange={() => onChange?.(option.value)}
        />
      ))}
    </div>
  );
};
