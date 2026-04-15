import { type CSSProperties } from 'react';

export type DividerOrientation = 'horizontal' | 'vertical';

export interface DividerProps {
  orientation?: DividerOrientation;
  label?: string;
  dashed?: boolean;
  color?: string;
  thickness?: number;
  className?: string;
  style?: CSSProperties;
}

export const Divider = ({
  orientation = 'horizontal',
  label,
  dashed = false,
  color = 'var(--color-border-primary)',
  thickness = 1,
  className,
  style,
}: DividerProps) => {
  const lineStyle: CSSProperties = {
    flex: 1,
    height: orientation === 'horizontal' ? thickness : '100%',
    width: orientation === 'vertical' ? thickness : '100%',
    background: color,
    ...(dashed
      ? {
          background: 'none',
          borderTop: orientation === 'horizontal' ? `${thickness}px dashed ${color}` : 'none',
          borderLeft: orientation === 'vertical' ? `${thickness}px dashed ${color}` : 'none',
        }
      : {}),
  };

  if (orientation === 'vertical') {
    return (
      <div
        role="separator"
        aria-orientation="vertical"
        className={className}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          alignSelf: 'stretch',
          ...style,
        }}
      >
        <span style={lineStyle} />
      </div>
    );
  }

  if (label) {
    return (
      <div
        role="separator"
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--spacing-3)',
          width: '100%',
          ...style,
        }}
      >
        <span style={lineStyle} />
        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-medium)' as unknown as number,
            color: 'var(--color-text-tertiary)',
            whiteSpace: 'nowrap',
            userSelect: 'none',
          }}
        >
          {label}
        </span>
        <span style={lineStyle} />
      </div>
    );
  }

  return (
    <div
      role="separator"
      className={className}
      style={{ width: '100%', ...style }}
    >
      <span style={{ ...lineStyle, display: 'block' }} />
    </div>
  );
};
