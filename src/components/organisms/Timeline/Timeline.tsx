import { type CSSProperties, type ReactNode } from 'react';
import { Badge, type BadgeSemantic } from '../../atoms/Badge';

export interface TimelineItem {
  id: string;
  title: string;
  description?: ReactNode;
  date?: string;
  status?: BadgeSemantic;
  statusLabel?: string;
  icon?: ReactNode;
}

export interface TimelineProps {
  items: TimelineItem[];
  orientation?: 'vertical' | 'horizontal' | 'alternating';
  className?: string;
  style?: CSSProperties;
}

const STATUS_COLORS: Record<string, string> = {
  success: 'var(--color-semantic-success-default)',
  warning: 'var(--color-semantic-warning-default)',
  error:   'var(--color-semantic-error-default)',
  info:    'var(--color-semantic-info-default)',
  primary: 'var(--color-primary-default)',
  neutral: 'var(--color-neutral-400)',
};

export const Timeline = ({ items, orientation = 'vertical', className, style }: TimelineProps) => {
  if (orientation === 'alternating') {
    return (
      <div className={className} style={{ position: 'relative', fontFamily: 'var(--font-body)', ...style }}>
        {/* Central vertical line */}
        <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: 'var(--color-border-primary)', transform: 'translateX(-50%)', zIndex: 0 }} />
        {items.map((item, idx) => {
          const dotColor = STATUS_COLORS[item.status ?? 'primary'];
          const isLeft = idx % 2 === 0;
          return (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', marginBottom: 'var(--spacing-8)', position: 'relative' }}>
              {/* Left content */}
              <div style={{ flex: 1, textAlign: 'right', paddingRight: 'var(--spacing-6)', visibility: isLeft ? 'visible' : 'hidden' }}>
                {isLeft && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.title}</span>
                      {item.statusLabel && <Badge label={item.statusLabel} size="sm" semantic={item.status ?? 'primary'} />}
                    </div>
                    {item.date && <time style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', display: 'block' }}>{item.date}</time>}
                    {item.description && <div style={{ marginTop: 'var(--spacing-1)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>{item.description}</div>}
                  </>
                )}
              </div>
              {/* Center dot */}
              <div style={{ zIndex: 1, flexShrink: 0, width: 32, height: 32, borderRadius: '50%', background: `${dotColor}20`, border: `2px solid ${dotColor}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {item.icon ?? <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor }} />}
              </div>
              {/* Right content */}
              <div style={{ flex: 1, textAlign: 'left', paddingLeft: 'var(--spacing-6)', visibility: isLeft ? 'hidden' : 'visible' }}>
                {!isLeft && (
                  <>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
                      <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.title}</span>
                      {item.statusLabel && <Badge label={item.statusLabel} size="sm" semantic={item.status ?? 'primary'} />}
                    </div>
                    {item.date && <time style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', display: 'block' }}>{item.date}</time>}
                    {item.description && <div style={{ marginTop: 'var(--spacing-1)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>{item.description}</div>}
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    );
  }

  const isV = orientation === 'vertical';

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: isV ? 'column' : 'row',
        position: 'relative',
        fontFamily: 'var(--font-body)',
        ...style,
      }}
    >
      {items.map((item, idx) => {
        const dotColor = STATUS_COLORS[item.status ?? 'primary'];
        const isLast = idx === items.length - 1;

        return (
          <div
            key={item.id}
            style={{
              display: 'flex',
              flexDirection: isV ? 'row' : 'column',
              alignItems: isV ? 'flex-start' : 'center',
              gap: isV ? 'var(--spacing-4)' : 0,
              flex: isV ? undefined : 1,
              position: 'relative',
            }}
          >
            {/* Dot + line */}
            <div style={{ display: 'flex', flexDirection: isV ? 'column' : 'row', alignItems: 'center', flexShrink: 0 }}>
              <div style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: `${dotColor}20`,
                border: `2px solid ${dotColor}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 1,
                flexShrink: 0,
              }}>
                {item.icon ?? <div style={{ width: 10, height: 10, borderRadius: '50%', background: dotColor }} />}
              </div>
              {!isLast && (
                <div style={{
                  width:  isV ? 2 : 'auto',
                  height: isV ? 'auto' : 2,
                  flex:   isV ? '1 0 40px' : 1,
                  background: 'var(--color-border-primary)',
                  marginInline: isV ? undefined : 0,
                }} />
              )}
            </div>

            {/* Content */}
            <div style={{ paddingBottom: isV && !isLast ? 'var(--spacing-6)' : 0, paddingInline: !isV ? 'var(--spacing-4)' : 0, textAlign: !isV ? 'center' : 'left', marginTop: !isV ? 'var(--spacing-3)' : 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', flexWrap: 'wrap', justifyContent: !isV ? 'center' : undefined }}>
                <span style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>{item.title}</span>
                {item.statusLabel && <Badge label={item.statusLabel} size="sm" semantic={item.status ?? 'primary'} />}
              </div>
              {item.date && <time style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', display: 'block', marginTop: 2 }}>{item.date}</time>}
              {item.description && <div style={{ marginTop: 'var(--spacing-2)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>{item.description}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};
