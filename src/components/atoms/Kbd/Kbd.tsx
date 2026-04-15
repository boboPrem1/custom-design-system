import { type CSSProperties, type ReactNode } from 'react';

export interface KbdProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const kbdStyle: CSSProperties = {
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  fontSize: '0.8em',
  fontWeight: 500,
  lineHeight: 1,
  color: 'var(--color-text-primary)',
  backgroundColor: 'var(--color-neutral-50)',
  border: '1px solid var(--color-neutral-300)',
  borderBottomWidth: '2px',
  borderRadius: 'var(--radius-sm)',
  padding: '0.15em 0.45em',
  whiteSpace: 'nowrap',
  display: 'inline-block',
  verticalAlign: 'baseline',
  boxShadow: '0 1px 0 var(--color-neutral-200)',
};

const Key = ({ children, style, className }: KbdProps) => (
  <kbd className={className} style={{ ...kbdStyle, ...style }}>
    {children}
  </kbd>
);

export interface KbdComboProps {
  keys: string[];
  separator?: string;
  className?: string;
  style?: CSSProperties;
}

export const KbdCombo = ({
  keys,
  separator = '+',
  className,
  style,
}: KbdComboProps) => (
  <span
    className={className}
    style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: '0.25em',
      ...style,
    }}
  >
    {keys.map((key, i) => (
      <span key={i} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25em' }}>
        {i > 0 && (
          <span style={{ fontSize: '0.75em', color: 'var(--color-text-tertiary)' }}>
            {separator}
          </span>
        )}
        <Key>{key}</Key>
      </span>
    ))}
  </span>
);

export const Kbd = Key;
