import { type CSSProperties, type ReactNode, useState, useMemo } from 'react';
import { Icon } from '../../atoms/Icon';
import { Checkbox } from '../../atoms/Checkbox';
import { Spinner } from '../../atoms/Spinner';
import { Pagination } from '../../molecules/Pagination';

export type SortDir = 'asc' | 'desc' | null;

export interface DataColumn<T> {
  key: keyof T | string;
  label: string;
  width?: number | string;
  sortable?: boolean;
  filterable?: boolean;
  render?: (row: T, idx: number) => ReactNode;
}

export interface DataTableProps<T extends object> {
  columns: DataColumn<T>[];
  data: T[];
  keyField: keyof T;
  selectable?: boolean;
  selectedKeys?: (string | number)[];
  onSelectionChange?: (keys: (string | number)[]) => void;
  loading?: boolean;
  emptyLabel?: string;
  /** Affiche les inputs de filtre sous chaque en-tête */
  filterable?: boolean;
  /** Active la pagination intégrée */
  pagination?: boolean;
  /** Nombre de lignes par page */
  pageSize?: number;
  className?: string;
  style?: CSSProperties;
}

export const DataTable = <T extends object>({
  columns,
  data,
  keyField,
  selectable,
  selectedKeys = [],
  onSelectionChange,
  loading,
  emptyLabel = 'Aucune donnée',
  filterable,
  pagination,
  pageSize = 10,
  className,
  style,
}: DataTableProps<T>) => {
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortDir, setSortDir] = useState<SortDir>(null);
  const [filters, setFilters] = useState<Record<string, string>>({});
  const [page, setPage] = useState(1);

  const handleSort = (key: string) => {
    if (sortKey !== key) { setSortKey(key); setSortDir('asc'); return; }
    if (sortDir === 'asc')  { setSortDir('desc'); return; }
    setSortKey(null); setSortDir(null);
  };

  const setFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  const filtered = useMemo(() => {
    return data.filter((row) =>
      Object.entries(filters).every(([k, v]) => {
        if (!v) return true;
        const cell = String((row as Record<string, unknown>)[k] ?? '').toLowerCase();
        return cell.includes(v.toLowerCase());
      }),
    );
  }, [data, filters]);

  const sorted = useMemo(() => {
    if (!sortKey || !sortDir) return filtered;
    return [...filtered].sort((a, b) => {
      const av = (a as Record<string, unknown>)[sortKey];
      const bv = (b as Record<string, unknown>)[sortKey];
      const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
      return sortDir === 'asc' ? cmp : -cmp;
    });
  }, [filtered, sortKey, sortDir]);

  const totalPages = Math.max(1, Math.ceil(sorted.length / pageSize));
  const paginated = pagination ? sorted.slice((page - 1) * pageSize, page * pageSize) : sorted;

  const allSelected = selectedKeys.length === data.length && data.length > 0;
  const someSelected = selectedKeys.length > 0 && !allSelected;

  const toggleAll = () => {
    if (allSelected) onSelectionChange?.([]);
    else onSelectionChange?.(data.map((r) => r[keyField] as string | number));
  };

  const toggleRow = (key: string | number) => {
    const s = new Set(selectedKeys);
    s.has(key) ? s.delete(key) : s.add(key);
    onSelectionChange?.([...s]);
  };

  const thStyle: CSSProperties = {
    padding: 'var(--spacing-3) var(--spacing-4)',
    textAlign: 'left',
    fontSize: 'var(--font-size-xs)',
    fontWeight: 700,
    color: 'var(--color-text-tertiary)',
    textTransform: 'uppercase',
    letterSpacing: '0.06em',
    background: 'var(--color-surface-secondary)',
    borderBottom: filterable ? 'none' : '1px solid var(--color-border-primary)',
    whiteSpace: 'nowrap',
  };

  const tdStyle: CSSProperties = {
    padding: 'var(--spacing-3) var(--spacing-4)',
    fontSize: 'var(--font-size-sm)',
    color: 'var(--color-text-primary)',
    borderBottom: '1px solid var(--color-border-primary)',
    verticalAlign: 'middle',
  };

  const filterInputStyle: CSSProperties = {
    width: '100%',
    padding: '4px 8px',
    border: '1px solid var(--color-border-primary)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-xs)',
    fontFamily: 'var(--font-body)',
    background: 'var(--color-surface-primary)',
    color: 'var(--color-text-primary)',
    outline: 'none',
    boxSizing: 'border-box',
  };

  const sortIcon = (colKey: string) => {
    const isActive = sortKey === colKey;
    const dir = isActive ? sortDir : null;
    return (
      <Icon
        name="arrow_right"
        size={16}
        color={isActive ? 'var(--color-primary-default)' : 'var(--color-text-disabled)'}
        style={{
          transform: dir === 'asc' ? 'rotate(-90deg)' : dir === 'desc' ? 'rotate(90deg)' : 'rotate(-90deg)',
          opacity: isActive ? 1 : 0.4,
          transition: 'transform var(--motion-duration-fast) var(--motion-easing-ease-out)',
        }}
      />
    );
  };

  return (
    <div className={className} style={{ position: 'relative', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-primary)', overflow: 'hidden', fontFamily: 'var(--font-body)', ...style }}>
      {loading && (
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(255,255,255,0.7)', zIndex: 2 }}>
          <Spinner size="lg" />
        </div>
      )}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'auto' }}>
          <thead>
            <tr>
              {selectable && <th style={{ ...thStyle, width: 40 }}><Checkbox checked={allSelected} indeterminate={someSelected} onChange={toggleAll} /></th>}
              {columns.map((col) => (
                <th key={String(col.key)} style={{ ...thStyle, width: col.width, cursor: col.sortable ? 'pointer' : 'default' }}
                  onClick={() => col.sortable && handleSort(String(col.key))}>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--spacing-1)' }}>
                    {col.label}
                    {col.sortable && sortIcon(String(col.key))}
                  </span>
                </th>
              ))}
            </tr>
            {filterable && (
              <tr>
                {selectable && <th style={{ background: 'var(--color-surface-secondary)', borderBottom: '1px solid var(--color-border-primary)', padding: 'var(--spacing-2)' }} />}
                {columns.map((col) => (
                  <th key={`f-${String(col.key)}`} style={{ background: 'var(--color-surface-secondary)', borderBottom: '1px solid var(--color-border-primary)', padding: 'var(--spacing-2) var(--spacing-3)' }}>
                    {col.filterable !== false && (
                      <input
                        style={filterInputStyle}
                        placeholder={`Filtrer…`}
                        value={filters[String(col.key)] ?? ''}
                        onChange={(e) => setFilter(String(col.key), e.target.value)}
                        onClick={(e) => e.stopPropagation()}
                      />
                    )}
                  </th>
                ))}
              </tr>
            )}
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={columns.length + (selectable ? 1 : 0)} style={{ ...tdStyle, textAlign: 'center', color: 'var(--color-text-tertiary)', padding: 'var(--spacing-12)' }}>
                  {emptyLabel}
                </td>
              </tr>
            ) : paginated.map((row, idx) => {
              const key = row[keyField] as string | number;
              const selected = selectedKeys.includes(key);
              return (
                <tr key={String(key)} style={{ background: selected ? 'var(--color-primary-50)' : idx % 2 === 0 ? 'var(--color-surface-primary)' : 'var(--color-surface-secondary)', transition: 'background 0.1s' }}>
                  {selectable && <td style={tdStyle}><Checkbox checked={selected} onChange={() => toggleRow(key)} /></td>}
                  {columns.map((col) => (
                    <td key={String(col.key)} style={tdStyle}>
                      {col.render ? col.render(row, idx) : String((row as Record<string, unknown>)[String(col.key)] ?? '')}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {pagination && totalPages > 1 && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--spacing-3) var(--spacing-4)', borderTop: '1px solid var(--color-border-primary)', background: 'var(--color-surface-secondary)' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
            {sorted.length} résultat{sorted.length > 1 ? 's' : ''}
          </span>
          <Pagination page={page} totalPages={totalPages} onPageChange={setPage} compact />
        </div>
      )}
    </div>
  );
};
