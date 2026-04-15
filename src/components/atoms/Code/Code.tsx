import { type CSSProperties, type ReactNode, useState } from 'react';

type CodeVariant = 'inline' | 'block';

export interface CodeProps {
  variant?: CodeVariant;
  children: ReactNode;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
  style?: CSSProperties;
}

const inlineStyle: CSSProperties = {
  fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
  fontSize: '0.875em',
  backgroundColor: 'var(--color-neutral-100)',
  color: 'var(--color-secondary-default)',
  padding: '0.15em 0.4em',
  borderRadius: 'var(--radius-sm)',
  border: '1px solid var(--color-border-primary)',
  whiteSpace: 'nowrap',
};

export const Code = ({
  variant = 'inline',
  children,
  language,
  showLineNumbers = true,
  className,
  style,
}: CodeProps) => {
  const [copied, setCopied] = useState(false);

  if (variant === 'inline') {
    return (
      <code className={className} style={{ ...inlineStyle, ...style }}>
        {children}
      </code>
    );
  }

  const text = typeof children === 'string' ? children : '';
  const lines = text.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* noop */
    }
  };

  return (
    <div
      className={className}
      style={{
        position: 'relative',
        backgroundColor: 'var(--color-neutral-900)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        border: '1px solid var(--color-neutral-700)',
        ...style,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 'var(--spacing-2) var(--spacing-4)',
          backgroundColor: 'var(--color-neutral-800)',
          borderBottom: '1px solid var(--color-neutral-700)',
        }}
      >
        {language && (
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-neutral-400)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {language}
          </span>
        )}
        <button
          onClick={handleCopy}
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--font-size-xs)',
            color: copied ? 'var(--color-semantic-success-default)' : 'var(--color-neutral-400)',
            backgroundColor: 'transparent',
            border: '1px solid var(--color-neutral-600)',
            borderRadius: 'var(--radius-sm)',
            padding: 'var(--spacing-1) var(--spacing-2)',
            cursor: 'pointer',
            transition: `color var(--motion-duration-fast) var(--motion-easing-ease-out)`,
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      <pre
        style={{
          margin: 0,
          padding: 'var(--spacing-4)',
          overflowX: 'auto',
          fontFamily: "'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace",
          fontSize: 'var(--font-size-sm)',
          lineHeight: 'var(--line-height-relaxed)',
          color: 'var(--color-neutral-100)',
        }}
      >
        <code>
          {lines.map((line, i) => (
            <div key={i} style={{ display: 'flex' }}>
              {showLineNumbers && (
                <span
                  style={{
                    display: 'inline-block',
                    minWidth: '2.5em',
                    paddingRight: 'var(--spacing-3)',
                    textAlign: 'right',
                    color: 'var(--color-neutral-600)',
                    userSelect: 'none',
                    flexShrink: 0,
                  }}
                >
                  {i + 1}
                </span>
              )}
              <span>{line}</span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  );
};
