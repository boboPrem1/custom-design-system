import { type CSSProperties } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';

export interface TabBarItem {
  id: string;
  label: string;
  icon: IconName;
  badge?: number;
}

export interface TabBarProps {
  items: TabBarItem[];
  activeId?: string;
  onSelect?: (id: string) => void;
  className?: string;
  style?: CSSProperties;
}

export const TabBar = ({ items, activeId, onSelect, className, style }: TabBarProps) => {
  const barStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'stretch',
    background: 'var(--color-surface-primary)',
    borderTop: '1px solid var(--color-border-primary)',
    boxShadow: '0 -2px 8px rgba(0,0,0,0.06)',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    height: 60,
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const itemStyle = (active: boolean): CSSProperties => ({
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 3,
    cursor: 'pointer',
    border: 'none',
    background: 'transparent',
    color: active ? 'var(--color-primary-default)' : 'var(--color-text-tertiary)',
    transition: `color var(--motion-duration-fast) var(--motion-easing-ease-out)`,
    padding: 'var(--spacing-2)',
    position: 'relative',
  });

  return (
    <nav role="navigation" aria-label="Navigation mobile" className={className} style={barStyle}>
      {items.map((item) => {
        const active = item.id === activeId;
        return (
          <button key={item.id} onClick={() => onSelect?.(item.id)} style={itemStyle(active)} aria-current={active ? 'page' : undefined}>
            <span style={{ position: 'relative', display: 'inline-flex' }}>
              <Icon name={item.icon} size={20} color={active ? 'var(--color-primary-default)' : 'var(--color-text-tertiary)'} />
              {item.badge != null && item.badge > 0 && (
                <span style={{
                  position: 'absolute',
                  top: -4,
                  right: -6,
                  minWidth: 16,
                  height: 16,
                  borderRadius: 'var(--radius-full)',
                  background: 'var(--color-semantic-error-default)',
                  color: '#fff',
                  fontSize: 10,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  padding: '0 3px',
                  boxSizing: 'border-box',
                }}>
                  {item.badge > 99 ? '99+' : item.badge}
                </span>
              )}
            </span>
            <span style={{ fontSize: 10, fontWeight: active ? 600 : 400, lineHeight: 1 }}>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
