import { type CSSProperties, type ReactNode, useState } from 'react';

export interface ButtonGroupItem {
  value: string;
  label: ReactNode;
  disabled?: boolean;
}

export interface ButtonGroupProps {
  items: ButtonGroupItem[];
  value?: string | string[];
  defaultValue?: string | string[];
  multiple?: boolean;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onChange?: (value: string | string[]) => void;
  className?: string;
  style?: CSSProperties;
}

const SIZE_MAP = {
  sm: { height: 32, font: 'var(--font-size-sm)', px: 'var(--spacing-3)' },
  md: { height: 40, font: 'var(--font-size-base)', px: 'var(--spacing-4)' },
  lg: { height: 48, font: 'var(--font-size-lg)', px: 'var(--spacing-6)' },
};

export const ButtonGroup = ({
  items,
  value: valueProp,
  defaultValue,
  multiple = false,
  size = 'md',
  disabled = false,
  onChange,
  className,
  style,
}: ButtonGroupProps) => {
  const isControlled = valueProp !== undefined;
  const [internalValue, setInternalValue] = useState<string | string[] | undefined>(defaultValue);

  const selected = isControlled ? valueProp : internalValue;

  const isSelected = (v: string): boolean => {
    if (!selected) return false;
    if (Array.isArray(selected)) return selected.includes(v);
    return selected === v;
  };

  const handleClick = (v: string) => {
    if (disabled) return;
    let next: string | string[];
    if (multiple) {
      const arr = Array.isArray(selected) ? selected : selected ? [selected] : [];
      next = arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];
    } else {
      next = v;
    }
    if (!isControlled) setInternalValue(next);
    onChange?.(next);
  };

  const { height, font, px } = SIZE_MAP[size];

  const btnStyle = (item: ButtonGroupItem, idx: number): CSSProperties => {
    const sel = isSelected(item.value);
    const isFirst = idx === 0;
    const isLast = idx === items.length - 1;
    return {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      height,
      padding: `0 ${px}`,
      background: sel ? 'var(--color-primary-default)' : 'var(--color-surface-primary)',
      color: sel ? '#fff' : item.disabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
      border: '1.5px solid var(--color-border-primary)',
      borderLeft: idx === 0 ? '1.5px solid var(--color-border-primary)' : 'none',
      borderRadius: isFirst
        ? 'var(--radius-md) 0 0 var(--radius-md)'
        : isLast
        ? '0 var(--radius-md) var(--radius-md) 0'
        : '0',
      fontFamily: 'var(--font-body)',
      fontSize: font,
      fontWeight: sel ? ('var(--font-weight-medium)' as unknown as number) : ('var(--font-weight-regular)' as unknown as number),
      cursor: disabled || item.disabled ? 'not-allowed' : 'pointer',
      opacity: item.disabled ? 'var(--opacity-disabled)' : 1,
      whiteSpace: 'nowrap',
      transition: 'background var(--motion-duration-fast) var(--motion-easing-ease-out), color var(--motion-duration-fast) var(--motion-easing-ease-out)',
    };
  };

  return (
    <div
      className={className}
      role="group"
      style={{ display: 'inline-flex', opacity: disabled ? 'var(--opacity-disabled)' : 1, ...style }}
    >
      {items.map((item, idx) => (
        <button
          key={item.value}
          type="button"
          role={multiple ? 'checkbox' : 'radio'}
          aria-checked={isSelected(item.value)}
          aria-disabled={disabled || item.disabled}
          disabled={disabled || item.disabled}
          style={btnStyle(item, idx)}
          onClick={() => handleClick(item.value)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};
