import { type CSSProperties, type ReactNode, useState } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { Tooltip } from '../../atoms/Tooltip';

export interface SidebarItem {
  id: string;
  label: string;
  icon?: IconName;
  href?: string;
  badge?: string | number;
  children?: SidebarItem[];
}

export interface SidebarGroup {
  label?: string;
  items: SidebarItem[];
}

export interface SidebarProps {
  groups?: SidebarGroup[];
  activeId?: string;
  onItemClick?: (id: string) => void;
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  userInfo?: { name: string; role?: string; avatarSrc?: string; initials?: string };
  footer?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const Sidebar = ({
  groups = [],
  activeId,
  onItemClick,
  collapsed = false,
  onToggleCollapse,
  userInfo,
  footer,
  className,
  style,
}: SidebarProps) => {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const toggleExpand = (id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const sidebarStyle: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: collapsed ? 64 : 240,
    height: '100%',
    background: 'var(--color-surface-primary)',
    borderRight: '1px solid var(--color-border-primary)',
    transition: `width var(--motion-duration-base) var(--motion-easing-ease-out)`,
    overflow: 'hidden',
    flexShrink: 0,
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const itemStyle = (active: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-3)',
    padding: collapsed ? '10px var(--spacing-3)' : '10px var(--spacing-4)',
    borderRadius: 'var(--radius-md)',
    marginInline: 'var(--spacing-2)',
    cursor: 'pointer',
    fontWeight: 'var(--font-weight-medium)' as unknown as number,
    fontSize: 'var(--font-size-sm)',
    color: active ? 'var(--color-primary-default)' : 'var(--color-text-secondary)',
    background: active ? 'var(--color-primary-50)' : 'transparent',
    textDecoration: 'none',
    border: 'none',
    width: collapsed ? 40 : 'calc(100% - 16px)',
    justifyContent: collapsed ? 'center' : 'flex-start',
    transition: `background var(--motion-duration-fast) var(--motion-easing-ease-out)`,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  });

  const renderItem = (item: SidebarItem, depth = 0) => {
    const isActive = activeId === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const isExpanded = expanded.has(item.id);

    const el = (
      <button
        key={item.id}
        style={{ ...itemStyle(isActive), paddingLeft: !collapsed && depth > 0 ? `calc(var(--spacing-8) * ${depth})` : undefined }}
        onClick={() => {
          onItemClick?.(item.id);
          if (hasChildren) toggleExpand(item.id);
        }}
      >
        {item.icon && <Icon name={item.icon} size={18} color={isActive ? 'var(--color-primary-default)' : 'var(--color-text-tertiary)'} />}
        {!collapsed && <span style={{ flex: 1, textAlign: 'left' }}>{item.label}</span>}
        {!collapsed && item.badge && <Badge label={String(item.badge)} size="sm" semantic="primary" />}
        {!collapsed && hasChildren && <Icon name="arrow_right" size={14} style={{ transform: isExpanded ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }} />}
      </button>
    );

    return (
      <div key={item.id}>
        {collapsed && item.icon ? (
          <Tooltip content={item.label} placement="right" delay={0}>{el}</Tooltip>
        ) : el}
        {hasChildren && isExpanded && !collapsed && (
          <div>{item.children!.map((child) => renderItem(child, depth + 1))}</div>
        )}
      </div>
    );
  };

  return (
    <aside className={className} style={sidebarStyle} role="navigation" aria-label="Sidebar">
      <style>{`button.ds-sidebar-item:hover { background: var(--color-neutral-100) !important; }`}</style>

      {/* Toggle collapse */}
      {onToggleCollapse && (
        <div style={{ display: 'flex', justifyContent: collapsed ? 'center' : 'flex-end', padding: 'var(--spacing-3)', borderBottom: '1px solid var(--color-border-primary)' }}>
          <button onClick={onToggleCollapse} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)', color: 'var(--color-text-tertiary)' }}>
            <Icon name={collapsed ? 'arrow_right' : 'arrow_left'} size={18} />
          </button>
        </div>
      )}

      {/* Groups */}
      <nav style={{ flex: 1, overflowY: 'auto', padding: 'var(--spacing-3) 0' }}>
        {groups.map((group, gi) => (
          <div key={gi} style={{ marginBottom: 'var(--spacing-4)' }}>
            {!collapsed && group.label && (
              <span style={{ padding: '0 var(--spacing-4)', fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', display: 'block', marginBottom: 'var(--spacing-2)' }}>
                {group.label}
              </span>
            )}
            {group.items.map((item) => renderItem(item))}
          </div>
        ))}
      </nav>

      {/* User info */}
      {userInfo && (
        <div style={{ padding: 'var(--spacing-4)', borderTop: '1px solid var(--color-border-primary)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', overflow: 'hidden' }}>
          <Avatar size="sm" src={userInfo.avatarSrc} initials={userInfo.initials ?? userInfo.name.slice(0, 2)} status="online" />
          {!collapsed && (
            <div style={{ overflow: 'hidden' }}>
              <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userInfo.name}</p>
              {userInfo.role && <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{userInfo.role}</p>}
            </div>
          )}
        </div>
      )}

      {footer && !collapsed && <div style={{ padding: 'var(--spacing-4)', borderTop: '1px solid var(--color-border-primary)' }}>{footer}</div>}
    </aside>
  );
};
