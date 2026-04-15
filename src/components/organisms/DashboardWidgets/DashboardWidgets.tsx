import { type CSSProperties, type ReactNode, useState } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';
import { Badge, type BadgeSemantic } from '../../atoms/Badge';
import { Spinner } from '../../atoms/Spinner';

/* ─────────────────────────────────────────────
 * Shared Widget Shell
 * ───────────────────────────────────────────── */
export interface WidgetAction { label: string; icon?: IconName; onClick?: () => void; }

export interface WidgetShellProps {
  title: string;
  subtitle?: string;
  actions?: WidgetAction[];
  loading?: boolean;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const WidgetShell = ({ title, subtitle, actions = [], loading, children, className, style }: WidgetShellProps) => (
  <div
    className={className}
    style={{
      background: 'var(--color-surface-primary)',
      border: '1px solid var(--color-border-primary)',
      borderRadius: 'var(--radius-xl)',
      boxShadow: 'var(--shadow-sm)',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-body)',
      position: 'relative',
      ...style,
    }}
  >
    {loading && (
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.75)', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Spinner size="md" />
      </div>
    )}
    {/* Header */}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--spacing-4) var(--spacing-5)', borderBottom: '1px solid var(--color-border-primary)', gap: 'var(--spacing-3)' }}>
      <div>
        <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{title}</p>
        {subtitle && <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{subtitle}</p>}
      </div>
      {actions.length > 0 && (
        <div style={{ display: 'flex', gap: 'var(--spacing-2)' }}>
          {actions.map((a) => (
            <button
              key={a.label}
              onClick={a.onClick}
              title={a.label}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-1)', background: 'none', border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-md)', padding: '4px 10px', fontSize: 'var(--font-size-xs)', fontFamily: 'var(--font-body)', cursor: 'pointer', color: 'var(--color-text-secondary)' }}
            >
              {a.icon && <Icon name={a.icon} size={16} />}
              {a.label}
            </button>
          ))}
        </div>
      )}
    </div>
    {/* Body */}
    <div style={{ flex: 1, padding: 'var(--spacing-5)' }}>{children}</div>
  </div>
);

/* ─────────────────────────────────────────────
 * Metric Widget
 * ───────────────────────────────────────────── */
export interface MetricWidgetProps {
  title: string;
  value: string | number;
  unit?: string;
  icon?: IconName;
  iconColor?: string;
  trend?: number;
  trendLabel?: string;
  semantic?: BadgeSemantic;
  loading?: boolean;
  actions?: WidgetAction[];
  className?: string;
  style?: CSSProperties;
}

export const MetricWidget = ({ title, value, unit, icon, iconColor, trend, trendLabel, semantic = 'primary', loading, actions, className, style }: MetricWidgetProps) => {
  const trendUp = trend !== undefined && trend >= 0;
  const trendColor = trendUp ? 'var(--color-semantic-success-default)' : 'var(--color-semantic-error-default)';

  return (
    <WidgetShell title={title} loading={loading} actions={actions} className={className} style={style}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--spacing-4)' }}>
        <div>
          <p style={{ margin: '0 0 var(--spacing-1)', fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1, letterSpacing: '-0.02em' }}>
            {value}
            {unit && <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 500, color: 'var(--color-text-tertiary)', marginLeft: 4 }}>{unit}</span>}
          </p>
          {trend !== undefined && (
            <p style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 4, fontSize: 'var(--font-size-xs)', color: trendColor, fontWeight: 600 }}>
              <Icon name={trendUp ? 'trend_up' : 'trend_down'} size={16} color={trendColor} />
              {Math.abs(trend)}% {trendLabel ?? (trendUp ? 'vs mois dernier' : 'vs mois dernier')}
            </p>
          )}
        </div>
        {icon && (
          <div style={{ width: 52, height: 52, borderRadius: 'var(--radius-xl)', background: iconColor ? `${iconColor}18` : 'var(--color-primary-50)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <Icon name={icon} size={24} color={iconColor ?? 'var(--color-primary-default)'} />
          </div>
        )}
      </div>
      {semantic && <Badge label={semantic} semantic={semantic} size="sm" style={{ marginTop: 'var(--spacing-3)' }} />}
    </WidgetShell>
  );
};

/* ─────────────────────────────────────────────
 * Bar Chart Widget (pure CSS/SVG — no external lib)
 * ───────────────────────────────────────────── */
export interface ChartDataPoint { label: string; value: number; }

export interface ChartWidgetProps {
  title: string;
  subtitle?: string;
  data: ChartDataPoint[];
  color?: string;
  loading?: boolean;
  actions?: WidgetAction[];
  className?: string;
  style?: CSSProperties;
}

export const ChartWidget = ({ title, subtitle, data, color = 'var(--color-primary-default)', loading, actions, className, style }: ChartWidgetProps) => {
  const max = Math.max(...data.map((d) => d.value), 1);
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <WidgetShell title={title} subtitle={subtitle} loading={loading} actions={actions} className={className} style={style}>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 'var(--spacing-2)', height: 120 }}>
        {data.map((d, i) => {
          const pct = (d.value / max) * 100;
          const isHov = hovered === i;
          return (
            <div
              key={d.label}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
              style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', gap: 4, height: '100%', cursor: 'pointer' }}
            >
              {isHov && (
                <span style={{ fontSize: 10, fontWeight: 700, color: 'var(--color-text-primary)', whiteSpace: 'nowrap' }}>{d.value}</span>
              )}
              <div style={{ width: '100%', height: `${pct}%`, background: isHov ? color : `${color}80`, borderRadius: 'var(--radius-sm) var(--radius-sm) 0 0', transition: 'background var(--motion-duration-fast) var(--motion-easing-ease-out), height 0.4s var(--motion-easing-spring)', minHeight: 4 }} />
              <span style={{ fontSize: 10, color: 'var(--color-text-tertiary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '100%' }}>{d.label}</span>
            </div>
          );
        })}
      </div>
    </WidgetShell>
  );
};

/* ─────────────────────────────────────────────
 * Table Widget
 * ───────────────────────────────────────────── */
export interface TableWidgetRow { [key: string]: ReactNode; }

export interface TableWidgetProps {
  title: string;
  subtitle?: string;
  columns: { key: string; label: string }[];
  rows: TableWidgetRow[];
  loading?: boolean;
  actions?: WidgetAction[];
  className?: string;
  style?: CSSProperties;
}

export const TableWidget = ({ title, subtitle, columns, rows, loading, actions, className, style }: TableWidgetProps) => (
  <WidgetShell title={title} subtitle={subtitle} loading={loading} actions={actions} className={className} style={{ ...style, padding: 0 }}>
    <div style={{ overflowX: 'auto', margin: 'calc(-1 * var(--spacing-5))', marginTop: 'calc(-1 * var(--spacing-5))' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-body)' }}>
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={{ padding: 'var(--spacing-3) var(--spacing-4)', textAlign: 'left', fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', background: 'var(--color-surface-secondary)', borderBottom: '1px solid var(--color-border-primary)', whiteSpace: 'nowrap' }}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length} style={{ padding: 'var(--spacing-8)', textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)' }}>Aucune donnée</td></tr>
          ) : rows.map((row, idx) => (
            <tr key={idx} style={{ background: idx % 2 === 0 ? 'var(--color-surface-primary)' : 'var(--color-surface-secondary)' }}>
              {columns.map((c) => (
                <td key={c.key} style={{ padding: 'var(--spacing-3) var(--spacing-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', borderBottom: '1px solid var(--color-border-primary)' }}>
                  {row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </WidgetShell>
);

/* ─────────────────────────────────────────────
 * Dashboard Grid (responsive layout container)
 * ───────────────────────────────────────────── */
export interface DashboardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: string;
  className?: string;
  style?: CSSProperties;
}

export const DashboardGrid = ({ children, columns = 3, gap = 'var(--spacing-6)', className, style }: DashboardGridProps) => (
  <>
    <style>{`
      @media (max-width: 768px)  { .ds-dashboard-grid { grid-template-columns: 1fr !important; } }
      @media (min-width: 769px) and (max-width: 1024px) { .ds-dashboard-grid { grid-template-columns: repeat(2, 1fr) !important; } }
    `}</style>
    <div
      className={`ds-dashboard-grid ${className ?? ''}`}
      style={{ display: 'grid', gridTemplateColumns: `repeat(${columns}, 1fr)`, gap, fontFamily: 'var(--font-body)', ...style }}
    >
      {children}
    </div>
  </>
);
