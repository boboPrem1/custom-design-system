import { type CSSProperties, useCallback, useEffect, useRef, useState } from 'react';
import { Icon } from '../../atoms/Icon';

export interface StepperInputProps {
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: CSSProperties;
}

const SIZE_MAP = {
  sm: { height: 32, font: 'var(--font-size-sm)', btnWidth: 28, iconSize: 16 as const },
  md: { height: 40, font: 'var(--font-size-base)', btnWidth: 36, iconSize: 16 as const },
  lg: { height: 48, font: 'var(--font-size-lg)', btnWidth: 44, iconSize: 20 as const },
};

export const StepperInput = ({
  value: valueProp,
  defaultValue = 0,
  min = -Infinity,
  max = Infinity,
  step = 1,
  disabled = false,
  onChange,
  size = 'md',
  className,
  style,
}: StepperInputProps) => {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const value = isControlled ? valueProp! : internal;
  const { height, font, btnWidth, iconSize } = SIZE_MAP[size];
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clamp = (v: number) => Math.min(max, Math.max(min, v));

  const update = useCallback(
    (next: number) => {
      const clamped = clamp(next);
      if (!isControlled) setInternal(clamped);
      onChange?.(clamped);
    },
    [isControlled, min, max, onChange],
  );

  const startRepeat = (delta: number) => {
    update(value + delta);
    intervalRef.current = setInterval(() => update(value + delta), 80);
  };

  const stopRepeat = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => () => stopRepeat(), []);

  const canDecrement = value > min && !disabled;
  const canIncrement = value < max && !disabled;

  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    height,
    borderRadius: 'var(--radius-md)',
    border: '1.5px solid var(--color-border-primary)',
    background: disabled ? 'var(--color-surface-tertiary)' : 'var(--color-surface-primary)',
    overflow: 'hidden',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    ...style,
  };

  const btnStyle = (active: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: btnWidth,
    height: '100%',
    background: active ? 'var(--color-surface-secondary)' : 'transparent',
    border: 'none',
    cursor: active ? 'pointer' : 'not-allowed',
    color: active ? 'var(--color-text-primary)' : 'var(--color-text-disabled)',
    flexShrink: 0,
    transition: 'background var(--motion-duration-fast) var(--motion-easing-ease-out)',
  });

  const inputStyle: CSSProperties = {
    width: 56,
    height: '100%',
    border: 'none',
    borderLeft: '1.5px solid var(--color-border-primary)',
    borderRight: '1.5px solid var(--color-border-primary)',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'var(--font-body)',
    fontSize: font,
    fontWeight: 'var(--font-weight-medium)' as unknown as number,
    color: 'var(--color-text-primary)',
    textAlign: 'center',
    cursor: disabled ? 'not-allowed' : 'text',
  };

  return (
    <div className={className} style={wrapperStyle}>
      <button
        type="button"
        aria-label="Décrémenter"
        disabled={!canDecrement}
        style={btnStyle(canDecrement)}
        onMouseDown={() => canDecrement && startRepeat(-step)}
        onMouseUp={stopRepeat}
        onMouseLeave={stopRepeat}
      >
        <Icon name="minus" size={iconSize} />
      </button>

      <input
        type="number"
        value={value}
        min={min === -Infinity ? undefined : min}
        max={max === Infinity ? undefined : max}
        step={step}
        disabled={disabled}
        style={inputStyle}
        onChange={(e) => update(Number(e.target.value))}
        aria-label="Valeur"
      />

      <button
        type="button"
        aria-label="Incrémenter"
        disabled={!canIncrement}
        style={btnStyle(canIncrement)}
        onMouseDown={() => canIncrement && startRepeat(step)}
        onMouseUp={stopRepeat}
        onMouseLeave={stopRepeat}
      >
        <Icon name="plus" size={iconSize} />
      </button>
    </div>
  );
};
