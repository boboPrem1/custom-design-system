import {
  type CSSProperties,
  type KeyboardEvent,
  useRef,
  useState,
} from 'react';
import { Icon } from '../../atoms/Icon';

export interface TagInputProps {
  value?: string[];
  defaultValue?: string[];
  suggestions?: string[];
  placeholder?: string;
  maxTags?: number;
  disabled?: boolean;
  onChange?: (tags: string[]) => void;
  className?: string;
  style?: CSSProperties;
}

export const TagInput = ({
  value: valueProp,
  defaultValue = [],
  suggestions = [],
  placeholder = 'Ajouter un tag…',
  maxTags,
  disabled = false,
  onChange,
  className,
  style,
}: TagInputProps) => {
  const isControlled = valueProp !== undefined;
  const [internal, setInternal] = useState<string[]>(defaultValue);
  const tags = isControlled ? valueProp! : internal;
  const [input, setInput] = useState('');
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filtered = suggestions.filter(
    (s) => s.toLowerCase().includes(input.toLowerCase()) && !tags.includes(s),
  );
  const showDropdown = focused && input.length > 0 && filtered.length > 0;

  const addTag = (tag: string) => {
    const trimmed = tag.trim();
    if (!trimmed || tags.includes(trimmed)) return;
    if (maxTags && tags.length >= maxTags) return;
    const next = [...tags, trimmed];
    if (!isControlled) setInternal(next);
    onChange?.(next);
    setInput('');
  };

  const removeTag = (tag: string) => {
    const next = tags.filter((t) => t !== tag);
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if ((e.key === 'Enter' || e.key === ',') && input) {
      e.preventDefault();
      addTag(input.replace(/,$/, ''));
    }
    if (e.key === 'Backspace' && !input && tags.length) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const wrapperStyle: CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
    minHeight: 40,
    padding: '4px var(--spacing-3)',
    borderRadius: 'var(--radius-md)',
    border: `1.5px solid ${focused ? 'var(--color-border-focus)' : 'var(--color-border-primary)'}`,
    background: disabled ? 'var(--color-surface-tertiary)' : 'var(--color-surface-primary)',
    boxShadow: focused ? '0 0 0 3px rgba(108,99,255,0.18)' : 'none',
    opacity: disabled ? 'var(--opacity-disabled)' : 1,
    cursor: disabled ? 'not-allowed' : 'text',
    transition: 'border-color var(--motion-duration-fast) var(--motion-easing-ease-out), box-shadow var(--motion-duration-fast) var(--motion-easing-ease-out)',
  };

  const tagStyle: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '2px 8px',
    borderRadius: 'var(--radius-full)',
    background: 'var(--color-primary-50)',
    color: 'var(--color-primary-default)',
    border: '1px solid var(--color-primary-200)',
    fontFamily: 'var(--font-body)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)' as unknown as number,
    lineHeight: 1.4,
  };

  return (
    <div className={className} style={{ position: 'relative', ...style }}>
      <div
        style={wrapperStyle}
        onClick={() => !disabled && inputRef.current?.focus()}
      >
        {tags.map((tag) => (
          <span key={tag} style={tagStyle}>
            {tag}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeTag(tag); }}
                aria-label={`Supprimer ${tag}`}
                style={{ display: 'flex', background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: 'inherit' }}
              >
                <Icon name="close" size={16} />
              </button>
            )}
          </span>
        ))}
        <input
          ref={inputRef}
          value={input}
          disabled={disabled}
          placeholder={tags.length === 0 ? placeholder : ''}
          style={{
            flex: '1 1 80px',
            minWidth: 80,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-base)',
            color: 'var(--color-text-primary)',
            cursor: disabled ? 'not-allowed' : 'text',
          }}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
        />
      </div>

      {showDropdown && (
        <ul style={{
          position: 'absolute',
          top: 'calc(100% + 4px)',
          left: 0,
          right: 0,
          background: 'var(--color-surface-primary)',
          border: '1.5px solid var(--color-border-primary)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)',
          zIndex: 1000,
          listStyle: 'none',
          margin: 0,
          padding: 'var(--spacing-1) 0',
          overflow: 'hidden',
        }}>
          {filtered.slice(0, 8).map((s) => (
            <li
              key={s}
              onMouseDown={() => { addTag(s); }}
              style={{
                padding: 'var(--spacing-2) var(--spacing-4)',
                cursor: 'pointer',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--font-size-base)',
                color: 'var(--color-text-primary)',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'var(--color-surface-secondary)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'transparent')}
            >
              {s}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
