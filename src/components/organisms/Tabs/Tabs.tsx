import { type CSSProperties, type ReactNode, useState, useRef, useEffect } from 'react';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export type TabsVariant = 'line' | 'pills';
export type TabsOrientation = 'horizontal' | 'vertical';

export interface TabsProps {
  tabs: TabItem[];
  defaultActiveId?: string;
  activeId?: string;
  onChange?: (id: string) => void;
  variant?: TabsVariant;
  orientation?: TabsOrientation;
  lazy?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Tabs = ({
  tabs,
  defaultActiveId,
  activeId: controlledId,
  onChange,
  variant = 'line',
  orientation = 'horizontal',
  lazy = true,
  className,
  style,
}: TabsProps) => {
  const [internalId, setInternalId] = useState(defaultActiveId ?? tabs[0]?.id);
  const activeId = controlledId ?? internalId;
  const indicatorRef = useRef<HTMLSpanElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const select = (id: string) => {
    setInternalId(id);
    onChange?.(id);
  };

  /* Keyboard navigation */
  const handleKeyDown = (e: React.KeyboardEvent, idx: number) => {
    const enabled = tabs.filter((t) => !t.disabled);
    const cur = enabled.findIndex((t) => t.id === tabs[idx].id);
    let next = cur;
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') { e.preventDefault(); next = (cur + 1) % enabled.length; }
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   { e.preventDefault(); next = (cur - 1 + enabled.length) % enabled.length; }
    if (next !== cur) select(enabled[next].id);
  };

  const isHoriz = orientation === 'horizontal';

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isHoriz ? 'column' : 'row',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const listStyle: CSSProperties = {
    display: 'flex',
    flexDirection: isHoriz ? 'row' : 'column',
    gap: variant === 'pills' ? 'var(--spacing-2)' : 0,
    borderBottom: isHoriz && variant === 'line' ? '1px solid var(--color-border-primary)' : 'none',
    borderRight:  !isHoriz && variant === 'line' ? '1px solid var(--color-border-primary)' : 'none',
    padding: variant === 'pills' ? 'var(--spacing-1)' : 0,
    background: variant === 'pills' ? 'var(--color-surface-secondary)' : undefined,
    borderRadius: variant === 'pills' ? 'var(--radius-lg)' : undefined,
    flexShrink: 0,
    overflowX: isHoriz ? 'auto' : 'visible',
    overflowY: isHoriz ? 'visible' : 'auto',
  };

  const tabStyle = (active: boolean, disabled: boolean): CSSProperties => ({
    padding: variant === 'pills' ? '6px 14px' : isHoriz ? '10px var(--spacing-4)' : '10px var(--spacing-6)',
    background: variant === 'pills' && active ? 'var(--color-surface-primary)' : 'transparent',
    color: active ? 'var(--color-primary-default)' : disabled ? 'var(--color-text-disabled)' : 'var(--color-text-secondary)',
    fontWeight: (active ? 'var(--font-weight-medium)' : 'var(--font-weight-regular)') as unknown as number,
    fontSize: 'var(--font-size-sm)',
    borderBottom: variant === 'line' && isHoriz && active ? '2px solid var(--color-primary-default)' : variant === 'line' && isHoriz ? '2px solid transparent' : 'none',
    borderRight:  variant === 'line' && !isHoriz && active ? '2px solid var(--color-primary-default)' : variant === 'line' && !isHoriz ? '2px solid transparent' : 'none',
    borderRadius: variant === 'pills' ? 'var(--radius-md)' : 0,
    boxShadow: variant === 'pills' && active ? 'var(--shadow-sm)' : 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: variant === 'pills' ? undefined : 'none',
    whiteSpace: 'nowrap',
    outline: 'none',
    transition: `color var(--motion-duration-fast) var(--motion-easing-ease-out), background var(--motion-duration-fast) var(--motion-easing-ease-out)`,
  });

  const mountedIds = useRef<Set<string>>(new Set([activeId]));
  if (!lazy) tabs.forEach((t) => mountedIds.current.add(t.id));
  else mountedIds.current.add(activeId);

  return (
    <div className={className} style={wrapperStyle}>
      <div ref={listRef} role="tablist" aria-orientation={orientation} style={listStyle}>
        {tabs.map((tab, idx) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeId === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            disabled={tab.disabled}
            onClick={() => !tab.disabled && select(tab.id)}
            onKeyDown={(e) => handleKeyDown(e, idx)}
            style={tabStyle(activeId === tab.id, !!tab.disabled)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div style={{ flex: 1, position: 'relative' }}>
        {tabs.map((tab) =>
          mountedIds.current.has(tab.id) ? (
            <div
              key={tab.id}
              id={`tabpanel-${tab.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${tab.id}`}
              hidden={activeId !== tab.id}
              style={{ padding: 'var(--spacing-6)' }}
            >
              {tab.content}
            </div>
          ) : null,
        )}
      </div>
    </div>
  );
};
