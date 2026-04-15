import { type CSSProperties, type ReactNode, useId } from 'react';

export type ToggleSize = 'sm' | 'md' | 'lg';

export interface ToggleProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  loading?: boolean;
  label?: ReactNode;
  labelPosition?: 'left' | 'right';
  size?: ToggleSize;
  className?: string;
  style?: CSSProperties;
}

const SIZE: Record<ToggleSize, { track: { w: number; h: number }; thumb: number; travel: number }> = {
  sm: { track: { w: 32, h: 18 }, thumb: 12, travel: 14 },
  md: { track: { w: 44, h: 24 }, thumb: 18, travel: 20 },
  lg: { track: { w: 56, h: 30 }, thumb: 22, travel: 26 },
};

export const Toggle = ({
  checked = false,
  onChange,
  disabled = false,
  loading = false,
  label,
  labelPosition = 'right',
  size = 'md',
  className,
  style,
}: ToggleProps) => {
  const id = useId();
  const isDisabled = disabled || loading;
  const { track, thumb, travel } = SIZE[size];

  const trackStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    alignItems: 'center',
    width: track.w,
    height: track.h,
    borderRadius: track.h / 2,
    background: checked
      ? 'var(--color-primary-default)'
      : 'var(--color-neutral-300)',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    opacity: isDisabled ? 'var(--opacity-disabled)' : 1,
    transition: `background var(--motion-duration-base) var(--motion-easing-spring)`,
    flexShrink: 0,
  };

  const thumbStyle: CSSProperties = {
    position: 'absolute',
    left: checked ? travel : 3,
    width: thumb,
    height: thumb,
    borderRadius: '50%',
    background: '#ffffff',
    boxShadow: 'var(--shadow-sm)',
    transition: `left var(--motion-duration-base) var(--motion-easing-spring)`,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  };

  const wrapperStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    userSelect: 'none',
    flexDirection: labelPosition === 'left' ? 'row-reverse' : 'row',
    ...style,
  };

  return (
    <label htmlFor={id} style={wrapperStyle} className={className}>
      <style>{`
        .ds-toggle-input { position: absolute; width: 1px; height: 1px; margin: -1px; overflow: hidden; clip: rect(0,0,0,0); }
        .ds-toggle-input:focus-visible + .ds-toggle-track {
          outline: 2px solid var(--color-border-focus);
          outline-offset: 2px;
          border-radius: 9999px;
        }
        @keyframes toggle-spin { to { transform: rotate(360deg); } }
      `}</style>

      <input
        id={id}
        type="checkbox"
        className="ds-toggle-input"
        checked={checked}
        disabled={isDisabled}
        onChange={(e) => onChange?.(e.target.checked)}
        role="switch"
        aria-checked={checked}
      />

      <span className="ds-toggle-track" style={trackStyle}>
        <span style={thumbStyle}>
          {loading && (
            <svg
              width={thumb * 0.55}
              height={thumb * 0.55}
              viewBox="0 0 24 24"
              fill="none"
              stroke="var(--color-primary-default)"
              strokeWidth={2.5}
              strokeLinecap="round"
              style={{ animation: 'toggle-spin 0.7s linear infinite' }}
            >
              <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
              <path d="M12 2a10 10 0 0 1 10 10" />
            </svg>
          )}
        </span>
      </span>

      {label && (
        <span
          style={{
            fontSize: 'var(--font-size-base)',
            color: isDisabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
          }}
        >
          {label}
        </span>
      )}
    </label>
  );
};
