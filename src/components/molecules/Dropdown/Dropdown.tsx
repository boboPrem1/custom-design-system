import {
  type CSSProperties,
  type KeyboardEvent,
  type ReactNode,
  useEffect,
  useId,
  useRef,
  useState,
} from 'react';
import { Icon, type IconName } from '../../atoms/Icon';

export interface DropdownItem {
  id: string | number;
  label: ReactNode;
  icon?: IconName;
  shortcut?: string;
  disabled?: boolean;
  destructive?: boolean;
  dividerBefore?: boolean;
}

export interface DropdownGroup {
  label?: string;
  items: DropdownItem[];
}

export interface DropdownProps {
  trigger: ReactNode;
  groups?: DropdownGroup[];
  items?: DropdownItem[];
  onSelect?: (item: DropdownItem) => void;
  placement?: 'bottom-start' | 'bottom-end';
  disabled?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Dropdown = ({
  trigger,
  groups,
  items,
  onSelect,
  placement = 'bottom-start',
  disabled = false,
  className,
  style,
}: DropdownProps) => {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const listId = useId();

  const normalizedGroups: DropdownGroup[] = groups ?? (items ? [{ items }] : []);
  const allItems = normalizedGroups.flatMap((g) => g.items);

  const close = () => { setOpen(false); setActiveIndex(-1); };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); }
      return;
    }
    const enabledItems = allItems.filter((i) => !i.disabled);
    const currentEnabledIdx = enabledItems.findIndex((_, i) => i === activeIndex);
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < enabledItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : enabledItems.length - 1));
    } else if (e.key === 'Enter' && activeIndex >= 0) {
      e.preventDefault();
      const item = enabledItems[activeIndex];
      if (item) { onSelect?.(item); close(); }
    } else if (e.key === 'Escape') {
      close();
    }
    void currentEnabledIdx;
  };

  const popupStyle: CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    ...(placement === 'bottom-end' ? { right: 0 } : { left: 0 }),
    minWidth: 180,
    background: 'var(--color-surface-primary)',
    border: '1.5px solid var(--color-border-primary)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 1000,
    padding: 'var(--spacing-1) 0',
    outline: 'none',
  };

  let globalItemIdx = -1;

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', display: 'inline-block', ...style }}
      onKeyDown={handleKeyDown}
    >
      <div
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={open ? listId : undefined}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        onClick={() => !disabled && setOpen((o) => !o)}
        style={{ cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 'var(--opacity-disabled)' : 1 }}
      >
        {trigger}
      </div>

      {open && (
        <ul id={listId} role="listbox" style={popupStyle} tabIndex={-1}>
          {normalizedGroups.map((group, gi) => (
            <li key={gi} role="none" style={{ listStyle: 'none' }}>
              {group.label && (
                <span style={{ display: 'block', padding: '4px var(--spacing-4) 4px', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', fontWeight: 'var(--font-weight-bold)' as unknown as number, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  {group.label}
                </span>
              )}
              <ul role="none" style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                {group.items.map((item) => {
                  if (!item.disabled) globalItemIdx++;
                  const idx = globalItemIdx;
                  const isActive = !item.disabled && activeIndex === idx;

                  return (
                    <li key={item.id} role="none" style={{ listStyle: 'none' }}>
                      {item.dividerBefore && <div style={{ height: 1, background: 'var(--color-border-primary)', margin: 'var(--spacing-1) 0' }} />}
                      <button
                        role="option"
                        aria-selected={false}
                        aria-disabled={item.disabled}
                        disabled={item.disabled}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--spacing-2)',
                          width: '100%',
                          padding: 'var(--spacing-2) var(--spacing-4)',
                          background: isActive ? 'var(--color-surface-secondary)' : 'transparent',
                          border: 'none',
                          cursor: item.disabled ? 'not-allowed' : 'pointer',
                          fontFamily: 'var(--font-body)',
                          fontSize: 'var(--font-size-base)',
                          color: item.destructive
                            ? 'var(--color-semantic-error-default)'
                            : item.disabled
                            ? 'var(--color-text-disabled)'
                            : 'var(--color-text-primary)',
                          opacity: item.disabled ? 0.5 : 1,
                          textAlign: 'left',
                          transition: 'background var(--motion-duration-fast) var(--motion-easing-ease-out)',
                        }}
                        onMouseEnter={() => !item.disabled && setActiveIndex(idx)}
                        onMouseLeave={() => setActiveIndex(-1)}
                        onClick={() => { if (!item.disabled) { onSelect?.(item); close(); } }}
                      >
                        {item.icon && (
                          <Icon name={item.icon} size={16} color={item.destructive ? 'var(--color-semantic-error-default)' : 'currentColor'} />
                        )}
                        <span style={{ flex: 1 }}>{item.label}</span>
                        {item.shortcut && (
                          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
                            {item.shortcut}
                          </span>
                        )}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
