import { type CSSProperties, type ElementType, type ReactNode } from 'react';

type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
type HeadingVariant = 'display' | 'editorial' | 'ui';

export interface HeadingProps {
  level?: HeadingLevel;
  variant?: HeadingVariant;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const levelSizeMap: Record<HeadingLevel, string> = {
  1: 'var(--font-size-5xl)',
  2: 'var(--font-size-4xl)',
  3: 'var(--font-size-3xl)',
  4: 'var(--font-size-2xl)',
  5: 'var(--font-size-xl)',
  6: 'var(--font-size-lg)',
};

const variantStyles: Record<HeadingVariant, CSSProperties> = {
  display: {
    fontWeight: 'var(--font-weight-bold)' as unknown as number,
    lineHeight: 'var(--line-height-tight)',
    letterSpacing: '-0.02em',
  },
  editorial: {
    fontWeight: 'var(--font-weight-medium)' as unknown as number,
    lineHeight: 'var(--line-height-normal)',
    letterSpacing: '-0.01em',
    fontStyle: 'italic',
  },
  ui: {
    fontWeight: 'var(--font-weight-medium)' as unknown as number,
    lineHeight: 'var(--line-height-tight)',
    letterSpacing: '0',
  },
};

export const Heading = ({
  level = 1,
  variant = 'display',
  children,
  className,
  style,
}: HeadingProps) => {
  const Tag = `h${level}` as ElementType;

  const baseStyle: CSSProperties = {
    fontFamily: 'var(--font-heading)',
    fontSize: levelSizeMap[level],
    color: 'var(--color-text-primary)',
    margin: 0,
    ...variantStyles[variant],
    ...style,
  };

  return (
    <Tag className={className} style={baseStyle}>
      {children}
    </Tag>
  );
};
