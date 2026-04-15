import { type CSSProperties } from 'react';

export type SpinnerSize = 'sm' | 'md' | 'lg';
export type SpinnerVariant = 'default' | 'overlay';

const SIZE_PX: Record<SpinnerSize, number> = { sm: 16, md: 24, lg: 40 };

export interface SpinnerProps {
  size?: SpinnerSize;
  variant?: SpinnerVariant;
  color?: string;
  label?: string;
  className?: string;
  style?: CSSProperties;
}

export const Spinner = ({
  size = 'md',
  variant = 'default',
  color = 'var(--color-primary-default)',
  label = 'Chargement…',
  className,
  style,
}: SpinnerProps) => {
  const px = SIZE_PX[size];

  const svg = (
    <>
      <style>{`@keyframes sp-spin { to { transform: rotate(360deg); } }`}</style>
      <svg
        width={px}
        height={px}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={2.5}
        strokeLinecap="round"
        role="status"
        aria-label={label}
        className={variant === 'default' ? className : undefined}
        style={{
          animation: 'sp-spin 0.75s linear infinite',
          display: 'block',
          flexShrink: 0,
          ...(variant === 'default' ? style : {}),
        }}
      >
        <circle cx="12" cy="12" r="10" strokeOpacity={0.2} />
        <path d="M12 2a10 10 0 0 1 10 10" />
      </svg>
    </>
  );

  if (variant === 'overlay') {
    return (
      <div
        className={className}
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: `rgba(255,255,255,var(--opacity-overlay))`,
          borderRadius: 'inherit',
          zIndex: 10,
          ...style,
        }}
      >
        {svg}
      </div>
    );
  }

  return svg;
};
