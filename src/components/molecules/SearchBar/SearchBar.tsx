import {
  type CSSProperties,
  type InputHTMLAttributes,
  type ReactNode,
  useRef,
  useState,
} from 'react';
import { Icon } from '../../atoms/Icon';

export interface SearchResult {
  id: string | number;
  label: ReactNode;
  description?: string;
}

export interface SearchBarProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'value' | 'results'> {
  value?: string;
  onChange?: (value: string) => void;
  results?: SearchResult[];
  onSelectResult?: (result: SearchResult) => void;
  loading?: boolean;
  placeholder?: string;
  className?: string;
  style?: CSSProperties;
}

export const SearchBar = ({
  value = '',
  onChange,
  results,
  onSelectResult,
  loading = false,
  placeholder = 'Rechercher…',
  className,
  style,
  ...props
}: SearchBarProps) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const showDropdown = focused && results && results.length > 0;

  const wrapperStyle: CSSProperties = {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 40,
    borderRadius: 'var(--radius-md)',
    border: `1.5px solid ${focused ? 'var(--color-border-focus)' : 'var(--color-border-primary)'}`,
    background: 'var(--color-surface-primary)',
    boxShadow: focused ? '0 0 0 3px rgba(108,99,255,0.18)' : 'none',
    transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out), box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out)',
    ...style,
  };

  const inputStyle: CSSProperties = {
    flex: 1,
    height: '100%',
    paddingLeft: 'var(--spacing-8)',
    paddingRight: value ? 'var(--spacing-8)' : 'var(--spacing-3)',
    border: 'none',
    outline: 'none',
    background: 'transparent',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-base)',
    color: 'var(--color-text-primary)',
  };

  const dropdownStyle: CSSProperties = {
    position: 'absolute',
    top: 'calc(100% + 4px)',
    left: 0,
    right: 0,
    background: 'var(--color-surface-primary)',
    border: '1.5px solid var(--color-border-primary)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-lg)',
    zIndex: 1000,
    overflow: 'hidden',
  };

  return (
    <div className={className} style={{ position: 'relative', width: '100%' }}>
      <div style={wrapperStyle}>
        <Icon
          name="search"
          size={16}
          style={{
            position: 'absolute',
            left: 'var(--spacing-3)',
            color: 'var(--color-text-tertiary)',
            pointerEvents: 'none',
          }}
        />
        <input
          ref={inputRef}
          value={value}
          placeholder={placeholder}
          style={inputStyle}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          onChange={(e) => onChange?.(e.target.value)}
          role="combobox"
          aria-expanded={showDropdown}
          aria-autocomplete="list"
          {...props}
        />
        {loading && (
          <svg
            width={16} height={16}
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}
            style={{ position: 'absolute', right: 'var(--spacing-3)', color: 'var(--color-text-tertiary)', animation: 'ds-spin 0.7s linear infinite', flexShrink: 0 }}
            aria-hidden
          >
            <circle cx="12" cy="12" r="10" strokeOpacity={0.25} />
            <path d="M12 2a10 10 0 0 1 10 10" />
          </svg>
        )}
        {!loading && value && (
          <button
            type="button"
            aria-label="Effacer"
            onClick={() => { onChange?.(''); inputRef.current?.focus(); }}
            style={{
              position: 'absolute',
              right: 'var(--spacing-3)',
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
              color: 'var(--color-text-tertiary)',
            }}
          >
            <Icon name="close" size={16} />
          </button>
        )}
      </div>

      {showDropdown && (
        <ul role="listbox" style={dropdownStyle}>
          <style>{`@keyframes ds-spin { to { transform: rotate(360deg); } }`}</style>
          {results!.map((r) => (
            <li
              key={r.id}
              role="option"
              aria-selected={false}
              onMouseDown={() => onSelectResult?.(r)}
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: 'var(--spacing-2) var(--spacing-4)',
                cursor: 'pointer',
                gap: 2,
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--color-surface-secondary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)' }}>
                {r.label}
              </span>
              {r.description && (
                <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
                  {r.description}
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
