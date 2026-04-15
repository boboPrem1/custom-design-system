import { type CSSProperties, useState } from 'react';

export interface RatingProps {
  value?: number;
  defaultValue?: number;
  max?: number;
  readOnly?: boolean;
  allowHalf?: boolean;
  size?: 'sm' | 'md' | 'lg';
  onChange?: (value: number) => void;
  className?: string;
  style?: CSSProperties;
}

const SIZE_MAP = { sm: 16, md: 24, lg: 32 };

const StarIcon = ({
  fill,
  size,
}: {
  fill: 'full' | 'half' | 'empty';
  size: number;
}) => {
  const id = `star-clip-${Math.random().toString(36).slice(2)}`;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      {fill === 'half' && (
        <defs>
          <clipPath id={id}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
      )}
      <path
        d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
        fill={fill === 'empty' ? 'none' : '#FBBF24'}
        stroke="#FBBF24"
        strokeWidth={1.5}
        strokeLinejoin="round"
      />
      {fill === 'half' && (
        <path
          d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"
          fill="#FBBF24"
          clipPath={`url(#${id})`}
        />
      )}
    </svg>
  );
};

export const Rating = ({
  value: valueProp,
  defaultValue = 0,
  max = 5,
  readOnly = false,
  allowHalf = false,
  size = 'md',
  onChange,
  className,
  style,
}: RatingProps) => {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const [hovered, setHovered] = useState<number | null>(null);

  const value = isControlled ? valueProp! : internal;
  const display = hovered ?? value;
  const px = SIZE_MAP[size];

  const getFill = (index: number): 'full' | 'half' | 'empty' => {
    const star = index + 1;
    if (display >= star) return 'full';
    if (allowHalf && display >= star - 0.5) return 'half';
    return 'empty';
  };

  const getHoverValue = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    if (!allowHalf) return index + 1;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    return x < rect.width / 2 ? index + 0.5 : index + 1;
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const v = getHoverValue(e, index);
    if (!isControlled) setInternal(v);
    onChange?.(v);
  };

  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 2,
        ...style,
      }}
      aria-label={`Note: ${value} sur ${max}`}
    >
      {Array.from({ length: max }, (_, i) => (
        <button
          key={i}
          type="button"
          disabled={readOnly}
          style={{
            background: 'none',
            border: 'none',
            padding: 0,
            cursor: readOnly ? 'default' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform var(--motion-duration-fast) var(--motion-easing-spring)',
          }}
          onMouseMove={(e) => !readOnly && setHovered(getHoverValue(e, i))}
          onMouseLeave={() => !readOnly && setHovered(null)}
          onClick={(e) => !readOnly && handleClick(e, i)}
          aria-label={`${i + 1} étoile${i > 0 ? 's' : ''}`}
        >
          <StarIcon fill={getFill(i)} size={px} />
        </button>
      ))}
    </div>
  );
};
