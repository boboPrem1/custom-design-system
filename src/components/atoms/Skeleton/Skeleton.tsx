import { type CSSProperties } from 'react';

export type SkeletonVariant = 'text' | 'rect' | 'circle';

export interface SkeletonProps {
  variant?: SkeletonVariant;
  width?: number | string;
  height?: number | string;
  /** Nombre de lignes (variant="text" uniquement) */
  lines?: number;
  className?: string;
  style?: CSSProperties;
}

const shimmerStyle: CSSProperties = {
  background: 'linear-gradient(90deg, var(--color-neutral-100) 25%, var(--color-neutral-200) 50%, var(--color-neutral-100) 75%)',
  backgroundSize: '200% 100%',
  animation: 'sk-shimmer 1.4s ease-in-out infinite',
};

export const Skeleton = ({
  variant = 'rect',
  width,
  height,
  lines = 3,
  className,
  style,
}: SkeletonProps) => {
  const resolvedStyle: CSSProperties = {
    ...shimmerStyle,
    borderRadius:
      variant === 'circle' ? '50%' : variant === 'text' ? 'var(--radius-sm)' : 'var(--radius-md)',
    width:  variant === 'circle' ? (width ?? height ?? 40) : (width ?? '100%'),
    height: variant === 'circle' ? (height ?? width ?? 40) : (height ?? (variant === 'text' ? 16 : 80)),
    display: 'block',
    ...style,
  };

  const keyframes = (
    <style>{`@keyframes sk-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }`}</style>
  );

  if (variant === 'text') {
    return (
      <>
        {keyframes}
        <div className={className} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', width: width ?? '100%' }}>
          {Array.from({ length: lines }).map((_, i) => (
            <span
              key={i}
              style={{
                ...shimmerStyle,
                display: 'block',
                borderRadius: 'var(--radius-sm)',
                height: height ?? 16,
                /* Dernière ligne plus courte */
                width: i === lines - 1 ? '65%' : '100%',
              }}
            />
          ))}
        </div>
      </>
    );
  }

  return (
    <>
      {keyframes}
      <span className={className} style={resolvedStyle} aria-hidden />
    </>
  );
};
