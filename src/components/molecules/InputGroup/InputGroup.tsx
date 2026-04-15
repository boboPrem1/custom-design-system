import { type CSSProperties, type ReactNode, forwardRef, useState } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';

export type InputGroupAddon = {
  type: 'text';
  content: ReactNode;
} | {
  type: 'icon';
  name: IconName;
} | {
  type: 'button';
  content: ReactNode;
  onClick?: () => void;
};

export interface InputGroupProps {
  prefix?: InputGroupAddon;
  suffix?: InputGroupAddon;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  disabled?: boolean;
  readOnly?: boolean;
  errorMessage?: string;
  hint?: ReactNode;
  id?: string;
  name?: string;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: CSSProperties;
}

const Addon = ({
  addon,
  position,
  focused,
  hasError,
}: {
  addon: InputGroupAddon;
  position: 'prefix' | 'suffix';
  focused: boolean;
  hasError: boolean;
}) => {
  const borderSide = position === 'prefix' ? 'borderRight' : 'borderLeft';

  const baseStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    height: '100%',
    paddingLeft: 'var(--spacing-3)',
    paddingRight: 'var(--spacing-3)',
    background: 'var(--color-surface-secondary)',
    [borderSide]: `1.5px solid ${hasError ? 'var(--color-semantic-error-default)' : focused ? 'var(--color-border-focus)' : 'var(--color-border-primary)'}`,
    color: 'var(--color-text-secondary)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-base)',
    whiteSpace: 'nowrap',
    transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out)',
  };

  if (addon.type === 'button') {
    return (
      <button
        type="button"
        onClick={addon.onClick}
        style={{
          ...baseStyle,
          background: 'var(--color-primary-default)',
          color: '#fff',
          cursor: 'pointer',
          border: 'none',
          fontWeight: 'var(--font-weight-medium)' as unknown as number,
        }}
      >
        {addon.content}
      </button>
    );
  }

  return (
    <span style={baseStyle}>
      {addon.type === 'icon'
        ? <Icon name={addon.name} size={16} color="var(--color-text-tertiary)" />
        : addon.content}
    </span>
  );
};

export const InputGroup = forwardRef<HTMLInputElement, InputGroupProps>(
  (
    {
      prefix,
      suffix,
      placeholder,
      value,
      defaultValue,
      disabled = false,
      readOnly = false,
      errorMessage,
      hint,
      id,
      name,
      type = 'text',
      onChange,
      className,
      style,
    },
    ref,
  ) => {
    const [focused, setFocused] = useState(false);
    const hasError = Boolean(errorMessage);

    const wrapperStyle: CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      width: '100%',
      height: 40,
      borderRadius: 'var(--radius-md)',
      border: `1.5px solid ${hasError ? 'var(--color-semantic-error-default)' : focused ? 'var(--color-border-focus)' : 'var(--color-border-primary)'}`,
      background: disabled ? 'var(--color-surface-tertiary)' : 'var(--color-surface-primary)',
      overflow: 'hidden',
      opacity: disabled ? 'var(--opacity-disabled)' : 1,
      boxShadow: focused ? `0 0 0 3px ${hasError ? 'rgba(220,38,38,0.15)' : 'rgba(108,99,255,0.18)'}` : 'none',
      transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out), box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out)',
    };

    const inputStyle: CSSProperties = {
      flex: 1,
      height: '100%',
      padding: '0 var(--spacing-3)',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-body)',
      fontSize: 'var(--font-size-base)',
      color: disabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
      cursor: disabled ? 'not-allowed' : readOnly ? 'default' : 'text',
      minWidth: 0,
    };

    return (
      <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', ...style }}>
        <div style={wrapperStyle}>
          {prefix && (
            <Addon addon={prefix} position="prefix" focused={focused} hasError={hasError} />
          )}
          <input
            ref={ref}
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            defaultValue={defaultValue}
            disabled={disabled}
            readOnly={readOnly}
            style={inputStyle}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={onChange}
            aria-invalid={hasError || undefined}
          />
          {suffix && (
            <Addon addon={suffix} position="suffix" focused={focused} hasError={hasError} />
          )}
        </div>
        {hasError && errorMessage && (
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error-default)' }}>
            {errorMessage}
          </span>
        )}
        {!hasError && hint && (
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
            {hint}
          </span>
        )}
      </div>
    );
  },
);

InputGroup.displayName = 'InputGroup';
