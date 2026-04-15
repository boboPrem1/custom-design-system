import {
  type CSSProperties,
  type SelectHTMLAttributes,
  type ReactNode,
  forwardRef,
  useState,
  useRef,
  useId,
} from 'react';
import { Icon } from '../Icon';

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectGroup {
  groupLabel: string;
  options: SelectOption[];
}

export type SelectItem = SelectOption | SelectGroup;

function isGroup(item: SelectItem): item is SelectGroup {
  return 'groupLabel' in item;
}

export interface SelectProps extends Omit<SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: SelectItem[];
  placeholder?: string;
  isError?: boolean;
  errorMessage?: string;
  hint?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      options,
      placeholder = 'Sélectionner…',
      isError: isErrorProp,
      errorMessage,
      hint,
      disabled,
      className,
      style,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const isError = isErrorProp || Boolean(errorMessage);

    const borderColor = isError
      ? 'var(--color-semantic-error-default)'
      : focused
      ? 'var(--color-border-focus)'
      : 'var(--color-border-primary)';

    const boxShadow = focused
      ? `0 0 0 3px ${isError ? 'rgba(220,38,38,0.15)' : 'rgba(108,99,255,0.18)'}`
      : 'none';

    const wrapperStyle: CSSProperties = {
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      width: '100%',
      height: '40px',
      borderRadius: 'var(--radius-md)',
      border: `1.5px solid ${borderColor}`,
      background: disabled ? 'var(--color-surface-tertiary)' : 'var(--color-surface-primary)',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out), box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out)',
      boxShadow,
      ...style,
    };

    const selectStyle: CSSProperties = {
      flex: 1,
      height: '100%',
      padding: '0 var(--spacing-8) 0 var(--spacing-3)',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--font-size-base)',
      color: 'var(--color-text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      appearance: 'none',
      WebkitAppearance: 'none',
    };

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', width: '100%' }}>
        <div
          className={className}
          style={wrapperStyle}
        >
          <select
            ref={ref}
            disabled={disabled}
            style={selectStyle}
            aria-invalid={isError || undefined}
            onFocus={(e) => { setFocused(true); onFocus?.(e); }}
            onBlur={(e)  => { setFocused(false); onBlur?.(e); }}
            {...props}
          >
            {placeholder && (
              <option value="" disabled hidden>
                {placeholder}
              </option>
            )}
            {options.map((item) =>
              isGroup(item) ? (
                <optgroup key={item.groupLabel} label={item.groupLabel}>
                  {item.options.map((opt) => (
                    <option key={opt.value} value={opt.value} disabled={opt.disabled}>
                      {opt.label}
                    </option>
                  ))}
                </optgroup>
              ) : (
                <option key={item.value} value={item.value} disabled={item.disabled}>
                  {item.label}
                </option>
              ),
            )}
          </select>

          {/* Chevron */}
          <Icon
            name="arrow_right"
            size={16}
            color="var(--color-text-tertiary)"
            style={{
              position: 'absolute',
              right: 'var(--spacing-3)',
              top: '50%',
              transform: 'translateY(-50%) rotate(90deg)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {isError && errorMessage && (
          <span role="alert" style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error-default)' }}>
            {errorMessage}
          </span>
        )}
        {!isError && hint && (
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{hint}</span>
        )}
      </div>
    );
  },
);

Select.displayName = 'Select';
