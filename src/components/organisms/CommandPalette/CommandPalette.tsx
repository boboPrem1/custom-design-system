import { type CSSProperties, useState, useRef, useEffect, useCallback } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';

export interface CommandGroup {
  label?: string;
  items: CommandItem[];
}

export interface CommandItem {
  id: string;
  label: string;
  description?: string;
  icon?: IconName;
  shortcut?: string[];
  onSelect?: () => void;
  disabled?: boolean;
}

export interface CommandPaletteProps {
  open: boolean;
  onClose: () => void;
  groups?: CommandGroup[];
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}

export const CommandPalette = ({
  open,
  onClose,
  groups = [],
  placeholder = 'Rechercher une commande…',
  className,
  style,
}: CommandPaletteProps) => {
  const [query, setQuery] = useState('');
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const allItems = groups.flatMap((g) => g.items);

  const filtered = query.trim()
    ? allItems.filter((i) =>
        i.label.toLowerCase().includes(query.toLowerCase()) ||
        i.description?.toLowerCase().includes(query.toLowerCase()),
      )
    : allItems;

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 10); setCursor(0); setQuery(''); }
  }, [open]);

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (!open) return;
    if (e.key === 'Escape') onClose();
    if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => (c + 1) % Math.max(filtered.length, 1)); }
    if (e.key === 'ArrowUp')   { e.preventDefault(); setCursor((c) => (c - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1)); }
    if (e.key === 'Enter' && filtered[cursor]) { filtered[cursor].onSelect?.(); onClose(); }
  }, [open, onClose, filtered, cursor]);

  useEffect(() => {
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  if (!open) return null;

  /* Show grouped or flat */
  const renderItems = () => {
    if (query.trim()) {
      return (
        <div>
          {filtered.length === 0 && (
            <p style={{ padding: 'var(--spacing-8)', textAlign: 'center', color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)', margin: 0 }}>
              Aucun résultat pour « {query} »
            </p>
          )}
          {filtered.map((item, idx) => renderItem(item, idx))}
        </div>
      );
    }
    let i = 0;
    return groups.map((g) => (
      <div key={g.label ?? i}>
        {g.label && <p style={{ margin: 0, padding: 'var(--spacing-2) var(--spacing-4)', fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{g.label}</p>}
        {g.items.map((item) => renderItem(item, i++))}
      </div>
    ));
  };

  const renderItem = (item: CommandItem, idx: number) => (
    <button
      key={item.id}
      disabled={item.disabled}
      onClick={() => { item.onSelect?.(); onClose(); }}
      onMouseEnter={() => setCursor(idx)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--spacing-3)',
        padding: 'var(--spacing-3) var(--spacing-4)',
        background: cursor === idx ? 'var(--color-primary-50)' : 'transparent',
        border: 'none',
        cursor: item.disabled ? 'not-allowed' : 'pointer',
        opacity: item.disabled ? 0.5 : 1,
        textAlign: 'left',
        borderRadius: 'var(--radius-md)',
        marginInline: 'var(--spacing-2)',
        width: 'calc(100% - 16px)',
      }}
    >
      {item.icon && <Icon name={item.icon} size={20} color="var(--color-text-tertiary)" />}
      <span style={{ flex: 1 }}>
        <span style={{ display: 'block', fontSize: 'var(--font-size-sm)', fontWeight: 500, color: 'var(--color-text-primary)' }}>{item.label}</span>
        {item.description && <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{item.description}</span>}
      </span>
      {item.shortcut && (
        <span style={{ display: 'flex', gap: 4 }}>
          {item.shortcut.map((k) => (
            <kbd key={k} style={{ padding: '1px 6px', borderRadius: 'var(--radius-sm)', background: 'var(--color-neutral-100)', border: '1px solid var(--color-border-secondary)', fontSize: 11, fontFamily: 'monospace', color: 'var(--color-text-secondary)' }}>{k}</kbd>
          ))}
        </span>
      )}
    </button>
  );

  return (
    <>
      <style>{`@keyframes cp-in { from { transform: scale(0.96) translateY(-8px); opacity: 0; } to { transform: none; opacity: 1; } }`}</style>
      <div onClick={(e) => { if (e.target === e.currentTarget) onClose(); }} style={{ position: 'fixed', inset: 0, background: 'rgba(10,10,10,0.5)', zIndex: 2000, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '10vh' }}>
        <div className={className} style={{ width: 560, maxWidth: '90vw', background: 'var(--color-surface-primary)', borderRadius: 'var(--radius-xl)', boxShadow: 'var(--shadow-xl)', overflow: 'hidden', animation: 'cp-in 0.18s var(--motion-easing-spring)', fontFamily: 'var(--font-body)', ...style }}>
          {/* Search */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', padding: 'var(--spacing-4)', borderBottom: '1px solid var(--color-border-primary)' }}>
            <Icon name="search" size={20} color="var(--color-text-tertiary)" style={{ flexShrink: 0 }} />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
              placeholder={placeholder}
              style={{ flex: 1, border: 'none', outline: 'none', fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)', background: 'transparent', fontFamily: 'var(--font-body)' }}
            />
            {query && <button onClick={() => setQuery('')} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, borderRadius: 4, color: 'var(--color-text-tertiary)' }}><Icon name="close" size={16} /></button>}
          </div>

          {/* Results */}
          <div style={{ maxHeight: 360, overflowY: 'auto', padding: 'var(--spacing-2) 0' }}>
            {renderItems()}
          </div>

          {/* Footer hint */}
          <div style={{ padding: 'var(--spacing-3) var(--spacing-4)', borderTop: '1px solid var(--color-border-primary)', display: 'flex', gap: 'var(--spacing-4)', fontSize: 11, color: 'var(--color-text-tertiary)' }}>
            <span><kbd style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-border-secondary)', borderRadius: 3, padding: '1px 5px', fontFamily: 'monospace' }}>↑↓</kbd> Naviguer</span>
            <span><kbd style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-border-secondary)', borderRadius: 3, padding: '1px 5px', fontFamily: 'monospace' }}>↵</kbd> Sélectionner</span>
            <span><kbd style={{ background: 'var(--color-neutral-100)', border: '1px solid var(--color-border-secondary)', borderRadius: 3, padding: '1px 5px', fontFamily: 'monospace' }}>Esc</kbd> Fermer</span>
          </div>
        </div>
      </div>
    </>
  );
};
