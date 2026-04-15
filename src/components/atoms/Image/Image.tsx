import { type CSSProperties, useState } from 'react';
import { Skeleton } from '../Skeleton';

export type ImageRatio = '1:1' | '4:3' | '16:9' | '3:2';
export type ImageFit = 'cover' | 'contain' | 'fill';

const RATIO_MAP: Record<ImageRatio, number> = {
  '1:1':  1,
  '4:3':  3 / 4,
  '16:9': 9 / 16,
  '3:2':  2 / 3,
};

export interface ImageProps {
  src: string;
  alt: string;
  ratio?: ImageRatio;
  fit?: ImageFit;
  /** Active le lazy loading natif */
  lazy?: boolean;
  /** Affiche un skeleton pendant le chargement */
  showSkeleton?: boolean;
  width?: number | string;
  borderRadius?: string;
  className?: string;
  style?: CSSProperties;
}

export const Image = ({
  src,
  alt,
  ratio,
  fit = 'cover',
  lazy = true,
  showSkeleton = true,
  width = '100%',
  borderRadius = 'var(--radius-md)',
  className,
  style,
}: ImageProps) => {
  const [loaded, setLoaded] = useState(false);
  const [error,  setError]  = useState(false);

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    display: 'block',
    width,
    borderRadius,
    overflow: 'hidden',
    background: 'var(--color-surface-tertiary)',
    ...(ratio
      ? { paddingBottom: `${RATIO_MAP[ratio] * 100}%`, height: 0 }
      : {}),
    ...style,
  };

  const imgStyle: CSSProperties = {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: fit,
    ...(ratio
      ? { position: 'absolute', inset: 0 }
      : {}),
    opacity: loaded ? 1 : 0,
    transition: `opacity var(--motion-duration-base) var(--motion-easing-ease-out)`,
  };

  return (
    <span className={className} style={wrapperStyle}>
      {/* Skeleton pendant le chargement */}
      {showSkeleton && !loaded && !error && (
        <Skeleton
          variant="rect"
          style={{
            position: ratio ? 'absolute' : 'relative',
            inset: ratio ? 0 : undefined,
            width: '100%',
            height: ratio ? '100%' : undefined,
            borderRadius: 0,
          }}
        />
      )}

      {/* Image d'erreur */}
      {error && (
        <span
          style={{
            position: ratio ? 'absolute' : 'relative',
            inset: ratio ? 0 : undefined,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: ratio ? '100%' : 120,
            color: 'var(--color-text-tertiary)',
            fontSize: 'var(--font-size-xs)',
            flexDirection: 'column',
            gap: 'var(--spacing-2)',
          }}
        >
          <svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5}>
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="m9 14 2-2 2 2 3-3" />
            <circle cx="8.5" cy="8.5" r="1.5" />
          </svg>
          Image introuvable
        </span>
      )}

      <img
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : 'eager'}
        style={imgStyle}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </span>
  );
};
