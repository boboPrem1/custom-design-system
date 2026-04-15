import { type CSSProperties } from 'react';

export type ProgressBarVariant = 'linear' | 'circular';
export type ProgressBarSemantic = 'primary' | 'success' | 'warning' | 'error';

export interface ProgressBarProps {
  value?: number;
  min?: number;
  max?: number;
  indeterminate?: boolean;
  variant?: ProgressBarVariant;
  semantic?: ProgressBarSemantic;
  size?: 'sm' | 'md' | 'lg';
  label?: string;
  showValue?: boolean;
  className?: string;
  style?: CSSProperties;
}

const SEMANTIC_COLOR: Record<ProgressBarSemantic, string> = {
  primary: 'var(--color-primary-default)',
  success: 'var(--color-semantic-success-default)',
  warning: 'var(--color-semantic-warning-default)',
  error:   'var(--color-semantic-error-default)',
};

const LINEAR_HEIGHT: Record<string, number> = { sm: 4, md: 8, lg: 12 };
const CIRCULAR_SIZE: Record<string, number> = { sm: 40, md: 56, lg: 72 };
const STROKE_WIDTH: Record<string, number> = { sm: 4, md: 5, lg: 6 };

export const ProgressBar = ({
  value = 0,
  min = 0,
  max = 100,
  indeterminate = false,
  variant = 'linear',
  semantic = 'primary',
  size = 'md',
  label,
  showValue = false,
  className,
  style,
}: ProgressBarProps) => {
  const pct = indeterminate ? 0 : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));
  const color = SEMANTIC_COLOR[semantic];
  const displayValue = `${Math.round(pct)}%`;

  if (variant === 'circular') {
    const sz = CIRCULAR_SIZE[size];
    const sw = STROKE_WIDTH[size];
    const r = (sz - sw * 2) / 2;
    const circumference = 2 * Math.PI * r;
    const dash = indeterminate ? circumference * 0.75 : (pct / 100) * circumference;

    return (
      <div
        className={className}
        style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-2)', ...style }}
      >
        <style>{`
          @keyframes ds-rotate { to { transform: rotate(360deg); } }
          @keyframes ds-dash { 0% { stroke-dashoffset: ${circumference}; } 100% { stroke-dashoffset: 0; } }
        `}</style>
        <div style={{ position: 'relative', width: sz, height: sz }}>
          <svg
            width={sz}
            height={sz}
            viewBox={`0 0 ${sz} ${sz}`}
            style={{ transform: 'rotate(-90deg)', display: 'block', ...(indeterminate ? { animation: 'ds-rotate 1.2s linear infinite' } : {}) }}
            aria-hidden
          >
            <circle
              cx={sz / 2} cy={sz / 2} r={r}
              fill="none"
              stroke="var(--color-neutral-200)"
              strokeWidth={sw}
            />
            <circle
              cx={sz / 2} cy={sz / 2} r={r}
              fill="none"
              stroke={color}
              strokeWidth={sw}
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={circumference - dash}
              style={{ transition: indeterminate ? 'none' : 'stroke-dashoffset var(--motion-duration-slow) var(--motion-easing-ease-out)' }}
            />
          </svg>
          {showValue && !indeterminate && (
            <span style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: 'var(--font-body)',
              fontSize: size === 'sm' ? 'var(--font-size-xs)' : 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-medium)' as unknown as number,
              color: 'var(--color-text-primary)',
            }}>
              {displayValue}
            </span>
          )}
        </div>
        {label && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
            {label}
          </span>
        )}
      </div>
    );
  }

  const h = LINEAR_HEIGHT[size];

  return (
    <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', ...style }}>
      <style>{`
        @keyframes ds-indeterminate {
          0% { left: -35%; right: 100%; }
          60% { left: 100%; right: -90%; }
          100% { left: 100%; right: -90%; }
        }
      `}</style>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {label && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
              {label}
            </span>
          )}
          {showValue && !indeterminate && (
            <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', fontWeight: 'var(--font-weight-medium)' as unknown as number, color: 'var(--color-text-primary)' }}>
              {displayValue}
            </span>
          )}
        </div>
      )}
      <div
        role="progressbar"
        aria-valuenow={indeterminate ? undefined : value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-label={label}
        style={{ position: 'relative', height: h, borderRadius: 'var(--radius-full)', background: 'var(--color-neutral-200)', overflow: 'hidden' }}
      >
        {indeterminate ? (
          <div
            style={{
              position: 'absolute',
              top: 0, bottom: 0,
              background: color,
              borderRadius: 'var(--radius-full)',
              animation: 'ds-indeterminate 1.5s ease-in-out infinite',
            }}
          />
        ) : (
          <div
            style={{
              height: '100%',
              width: `${pct}%`,
              background: color,
              borderRadius: 'var(--radius-full)',
              transition: 'width var(--motion-duration-slow) var(--motion-easing-ease-out)',
            }}
          />
        )}
      </div>
    </div>
  );
};
