import { type CSSProperties, type ReactNode } from 'react';

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarStatus = 'online' | 'offline' | 'away' | 'busy';

const SIZE_MAP: Record<AvatarSize, { box: number; font: string; dot: number }> = {
  xs: { box: 24, font: 'var(--font-size-xs)',   dot: 6  },
  sm: { box: 32, font: 'var(--font-size-sm)',   dot: 8  },
  md: { box: 40, font: 'var(--font-size-base)', dot: 10 },
  lg: { box: 56, font: 'var(--font-size-xl)',   dot: 12 },
  xl: { box: 72, font: 'var(--font-size-2xl)',  dot: 14 },
};

const STATUS_COLOR: Record<AvatarStatus, string> = {
  online:  'var(--color-semantic-success-default)',
  offline: 'var(--color-neutral-400)',
  away:    'var(--color-semantic-warning-default)',
  busy:    'var(--color-semantic-error-default)',
};

export interface AvatarProps {
  /** URL d'image */
  src?: string;
  /** Texte alternatif pour l'image */
  alt?: string;
  /** Initiales affichées en fallback (2 chars max) */
  initials?: string;
  /** Icône SVG fallback (ReactNode) */
  icon?: ReactNode;
  size?: AvatarSize;
  status?: AvatarStatus;
  className?: string;
  style?: CSSProperties;
}

export interface AvatarGroupProps {
  avatars: AvatarProps[];
  size?: AvatarSize;
  max?: number;
  className?: string;
  style?: CSSProperties;
}

/* ─── Avatar individuel ─────────────────────────────────────── */
export const Avatar = ({
  src,
  alt = '',
  initials,
  icon,
  size = 'md',
  status,
  className,
  style,
}: AvatarProps) => {
  const { box, font, dot } = SIZE_MAP[size];

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    display: 'inline-flex',
    width: box,
    height: box,
    flexShrink: 0,
    ...style,
  };

  const containerStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: box,
    height: box,
    borderRadius: '50%',
    overflow: 'hidden',
    background: 'var(--color-primary-100)',
    color: 'var(--color-primary-default)',
    fontFamily: 'var(--font-body)',
    fontSize: font,
    fontWeight: 'var(--font-weight-bold)' as unknown as number,
    userSelect: 'none',
  };

  const imgStyle: CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: '50%',
  };

  const statusStyle: CSSProperties = {
    position: 'absolute',
    bottom: -(dot * 0.015),
    right: -(dot * 0.015),
    width: dot,
    height: dot,
    borderRadius: '50%',
    background: status ? STATUS_COLOR[status] : 'transparent',
    border: '2px solid var(--color-surface-primary)',
    boxSizing: 'border-box',
    zIndex: 1,
  };

  return (
    <span className={className} style={wrapperStyle} title={alt || initials}>
      <span style={containerStyle}>
        {src ? (
          <img src={src} alt={alt} style={imgStyle} />
        ) : icon ? (
          icon
        ) : initials ? (
          <span aria-hidden>{initials.slice(0, 2).toUpperCase()}</span>
        ) : (
          /* Silhouette SVG par défaut */
          <svg viewBox="0 0 24 24" width={box * 0.55} height={box * 0.55} fill="currentColor">
            <path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2c-5.33 0-8 2.67-8 4v1h16v-1c0-1.33-2.67-4-8-4z" />
          </svg>
        )}
      </span>
      {status && <span style={statusStyle} aria-label={status} />}
    </span>
  );
};

/* ─── AvatarGroup ───────────────────────────────────────────── */
export const AvatarGroup = ({
  avatars,
  size = 'md',
  max = 4,
  className,
  style,
}: AvatarGroupProps) => {
  const { box } = SIZE_MAP[size];
  const visible  = avatars.slice(0, max);
  const overflow = avatars.length - max;

  const groupStyle: CSSProperties = {
    display: 'inline-flex',
    flexDirection: 'row-reverse',
    ...style,
  };

  const itemStyle: CSSProperties = {
    marginLeft: -(box * 0.3),
    border: '2px solid var(--color-surface-primary)',
    borderRadius: '50%',
    boxSizing: 'border-box',
  };

  return (
    <span className={className} style={groupStyle}>
      {overflow > 0 && (
        <Avatar
          initials={`+${overflow}`}
          size={size}
          style={{
            ...itemStyle,
            background: 'var(--color-neutral-200)',
            color: 'var(--color-text-secondary)',
            fontSize: SIZE_MAP[size].font,
          }}
        />
      )}
      {[...visible].reverse().map((av, i) => (
        <Avatar key={i} {...av} size={size} style={{ ...itemStyle, ...av.style }} />
      ))}
    </span>
  );
};
