import { type CSSProperties, type ReactNode } from 'react';
import { Icon } from '../../atoms/Icon';

export interface BreadcrumbItem {
  label: ReactNode;
  href?: string;
  onClick?: () => void;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  maxItems?: number;
  separator?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Breadcrumb = ({
  items,
  maxItems,
  separator,
  className,
  style,
}: BreadcrumbProps) => {
  const defaultSeparator = separator ?? (
    <Icon name="arrow_right" size={16} color="var(--color-text-tertiary)" />
  );

  let visible = items;
  let truncated = false;
  if (maxItems && items.length > maxItems) {
    truncated = true;
    visible = [items[0], { label: '…' }, ...items.slice(-(maxItems - 1))];
  }

  const listStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 'var(--spacing-2)',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-sm)',
    ...style,
  };

  const linkStyle = (isLast: boolean, isEllipsis: boolean): CSSProperties => ({
    color: isLast
      ? 'var(--color-text-primary)'
      : 'var(--color-text-tertiary)',
    fontWeight: isLast
      ? ('var(--font-weight-medium)' as unknown as number)
      : ('var(--font-weight-regular)' as unknown as number),
    textDecoration: (!isLast && !isEllipsis) ? 'underline' : 'none',
    textDecorationColor: 'transparent',
    cursor: (!isLast && !isEllipsis) ? 'pointer' : 'default',
    background: 'none',
    border: 'none',
    padding: 0,
    fontFamily: 'inherit',
    fontSize: 'inherit',
    transition: 'color var(--motion-duration-fast) var(--motion-easing-ease-out)',
  });

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol style={listStyle}>
        {visible.map((item, idx) => {
          const isLast = idx === visible.length - 1;
          const isEllipsis = truncated && idx === 1 && item.label === '…';

          return (
            <li key={idx} style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              {item.href ? (
                <a
                  href={item.href}
                  aria-current={isLast ? 'page' : undefined}
                  style={{ ...linkStyle(isLast, isEllipsis), display: 'inline' }}
                  onMouseEnter={(e) => !isLast && !isEllipsis && ((e.target as HTMLElement).style.color = 'var(--color-text-primary)')}
                  onMouseLeave={(e) => !isLast && !isEllipsis && ((e.target as HTMLElement).style.color = 'var(--color-text-tertiary)')}
                >
                  {item.label}
                </a>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  role={!isLast && !isEllipsis && item.onClick ? 'button' : undefined}
                  tabIndex={!isLast && !isEllipsis && item.onClick ? 0 : undefined}
                  style={linkStyle(isLast, isEllipsis)}
                  onClick={!isLast && !isEllipsis ? item.onClick : undefined}
                  onMouseEnter={(e) => !isLast && !isEllipsis && item.onClick && ((e.target as HTMLElement).style.color = 'var(--color-text-primary)')}
                  onMouseLeave={(e) => !isLast && !isEllipsis && item.onClick && ((e.target as HTMLElement).style.color = 'var(--color-text-tertiary)')}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span aria-hidden style={{ display: 'flex', alignItems: 'center', color: 'var(--color-text-tertiary)' }}>
                  {defaultSeparator}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
