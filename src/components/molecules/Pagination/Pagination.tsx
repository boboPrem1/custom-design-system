import { type CSSProperties } from 'react';
import { Icon } from '../../atoms/Icon';

export interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  siblingCount?: number;
  compact?: boolean;
  className?: string;
  style?: CSSProperties;
}

const range = (start: number, end: number) =>
  Array.from({ length: end - start + 1 }, (_, i) => start + i);

export const Pagination = ({
  page,
  totalPages,
  onPageChange,
  siblingCount = 1,
  compact = false,
  className,
  style,
}: PaginationProps) => {
  const getPages = (): (number | '...')[] => {
    if (totalPages <= 7) return range(1, totalPages);
    const left = Math.max(2, page - siblingCount);
    const right = Math.min(totalPages - 1, page + siblingCount);
    const showLeft = left > 2;
    const showRight = right < totalPages - 1;
    const pages: (number | '...')[] = [1];
    if (showLeft) pages.push('...');
    pages.push(...range(left, right));
    if (showRight) pages.push('...');
    pages.push(totalPages);
    return pages;
  };

  const btnStyle = (active: boolean, disabled: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 36,
    height: 36,
    padding: '0 var(--spacing-2)',
    borderRadius: 'var(--radius-md)',
    border: active ? 'none' : '1.5px solid var(--color-border-primary)',
    background: active ? 'var(--color-primary-default)' : 'var(--color-surface-primary)',
    color: active ? '#fff' : disabled ? 'var(--color-text-disabled)' : 'var(--color-text-primary)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: active ? ('var(--font-weight-medium)' as unknown as number) : ('var(--font-weight-regular)' as unknown as number),
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    transition: 'background var(--motion-duration-fast) var(--motion-easing-ease-out)',
  });

  if (compact) {
    return (
      <div
        className={className}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-3)', ...style }}
        aria-label="Navigation entre les pages"
      >
        <button
          type="button"
          disabled={page <= 1}
          aria-label="Page précédente"
          style={btnStyle(false, page <= 1)}
          onClick={() => onPageChange(page - 1)}
        >
          <Icon name="arrow_left" size={16} />
        </button>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Page <strong style={{ color: 'var(--color-text-primary)' }}>{page}</strong> sur {totalPages}
        </span>
        <button
          type="button"
          disabled={page >= totalPages}
          aria-label="Page suivante"
          style={btnStyle(false, page >= totalPages)}
          onClick={() => onPageChange(page + 1)}
        >
          <Icon name="arrow_right" size={16} />
        </button>
      </div>
    );
  }

  const pages = getPages();

  return (
    <nav
      className={className}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-1)', ...style }}
      aria-label="Navigation entre les pages"
    >
      <button
        type="button"
        disabled={page <= 1}
        aria-label="Page précédente"
        style={btnStyle(false, page <= 1)}
        onClick={() => onPageChange(page - 1)}
      >
        <Icon name="arrow_left" size={16} />
      </button>

      {pages.map((p, i) =>
        p === '...' ? (
          <span
            key={`ellipsis-${i}`}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: 36, height: 36, fontFamily: 'var(--font-body)', color: 'var(--color-text-tertiary)' }}
          >
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-label={`Page ${p}`}
            aria-current={p === page ? 'page' : undefined}
            style={btnStyle(p === page, false)}
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </button>
        ),
      )}

      <button
        type="button"
        disabled={page >= totalPages}
        aria-label="Page suivante"
        style={btnStyle(false, page >= totalPages)}
        onClick={() => onPageChange(page + 1)}
      >
        <Icon name="arrow_right" size={16} />
      </button>
    </nav>
  );
};
