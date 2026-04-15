import { type CSSProperties, type ReactNode } from 'react';
import { Skeleton } from '../../atoms/Skeleton';

export interface CardGridItem {
  id: string | number;
  content: ReactNode;
}

export type CardGridLayout = 'equal' | 'masonry' | 'list';

export interface CardGridProps {
  items: CardGridItem[];
  layout?: CardGridLayout;
  columns?: 2 | 3 | 4;
  loading?: boolean;
  skeletonCount?: number;
  empty?: ReactNode;
  gap?: string;
  className?: string;
  style?: CSSProperties;
}

export const CardGrid = ({
  items,
  layout = 'equal',
  columns = 3,
  loading,
  skeletonCount = 6,
  empty,
  gap = 'var(--spacing-6)',
  className,
  style,
}: CardGridProps) => {
  if (loading) {
    const loadingStyle: CSSProperties = {
      display: layout === 'list' ? 'flex' : 'grid',
      flexDirection: layout === 'list' ? 'column' : undefined,
      gridTemplateColumns: layout !== 'list' ? `repeat(${columns}, 1fr)` : undefined,
      gap,
      fontFamily: 'var(--font-body)',
      ...style,
    };
    return (
      <div className={className} style={loadingStyle}>
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', padding: 'var(--spacing-4)', border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)' }}>
            <Skeleton variant="rect" height={160} />
            <Skeleton variant="rect" height={20} width="70%" />
            <Skeleton variant="text" lines={2} />
          </div>
        ))}
      </div>
    );
  }

  if (items.length === 0 && empty) {
    return <div className={className} style={{ textAlign: 'center', padding: 'var(--spacing-16)' }}>{empty}</div>;
  }

  if (layout === 'masonry') {
    return (
      <div
        className={className}
        style={{
          columnCount: columns,
          columnGap: gap,
          fontFamily: 'var(--font-body)',
          ...style,
        }}
      >
        {items.map((item) => (
          <div key={item.id} style={{ breakInside: 'avoid', marginBottom: gap, display: 'inline-block', width: '100%' }}>
            {item.content}
          </div>
        ))}
      </div>
    );
  }

  const gridStyle: CSSProperties = {
    display: layout === 'list' ? 'flex' : 'grid',
    flexDirection: layout === 'list' ? 'column' : undefined,
    gridTemplateColumns: layout !== 'list' ? `repeat(${columns}, 1fr)` : undefined,
    gap,
    fontFamily: 'var(--font-body)',
    ...style,
  };

  return (
    <div className={className} style={gridStyle}>
      {items.map((item) => (
        <div key={item.id}>{item.content}</div>
      ))}
    </div>
  );
};
