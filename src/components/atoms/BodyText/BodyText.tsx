import { type CSSProperties, type ElementType, type ReactNode } from 'react';

type BodySize = 'xs' | 'sm' | 'base' | 'lead';
type BodyColor = 'primary' | 'secondary' | 'tertiary' | 'disabled' | 'link';

export interface BodyTextProps {
  size?: BodySize;
  color?: BodyColor;
  as?: 'p' | 'span' | 'div';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const sizeMap: Record<BodySize, { fontSize: string; lineHeight: string }> = {
  xs: { fontSize: 'var(--font-size-xs)', lineHeight: 'var(--line-height-normal)' },
  sm: { fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-normal)' },
  base: { fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-normal)' },
  lead: { fontSize: 'var(--font-size-lg)', lineHeight: 'var(--line-height-relaxed)' },
};

const colorMap: Record<BodyColor, string> = {
  primary: 'var(--color-text-primary)',
  secondary: 'var(--color-text-secondary)',
  tertiary: 'var(--color-text-tertiary)',
  disabled: 'var(--color-text-disabled)',
  link: 'var(--color-text-link)',
};

export const BodyText = ({
  size = 'base',
  color = 'primary',
  as = 'p',
  children,
  className,
  style,
}: BodyTextProps) => {
  const Tag = as as ElementType;

  const baseStyle: CSSProperties = {
    fontFamily: 'var(--font-body)',
    fontSize: sizeMap[size].fontSize,
    lineHeight: sizeMap[size].lineHeight,
    color: colorMap[color],
    fontWeight: 'var(--font-weight-regular)' as unknown as number,
    margin: 0,
    ...(color === 'link' ? { textDecoration: 'underline', cursor: 'pointer' } : {}),
    ...style,
  };

  return (
    <Tag className={className} style={baseStyle}>
      {children}
    </Tag>
  );
};
