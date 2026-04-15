import { type CSSProperties, type AnchorHTMLAttributes, type ReactNode } from 'react';
import { Icon } from '../Icon';

export type LinkVariant = 'inline' | 'standalone';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  /** Taille de la fonte — hérite par défaut (inherit) */
  size?: 'sm' | 'base' | 'lg';
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}

const sizeMap: Record<'sm' | 'base' | 'lg', string> = {
  sm:   'var(--font-size-sm)',
  base: 'var(--font-size-base)',
  lg:   'var(--font-size-lg)',
};

export const Link = ({
  variant = 'inline',
  size,
  children,
  href,
  target,
  rel,
  className,
  style,
  ...props
}: LinkProps) => {
  const isExternal = target === '_blank';
  const resolvedRel = isExternal ? (rel ?? 'noopener noreferrer') : rel;

  const baseStyle: CSSProperties = {
    display: variant === 'standalone' ? 'inline-flex' : 'inline',
    alignItems: 'center',
    gap: 'var(--spacing-1)',
    fontFamily: 'var(--font-body)',
    fontSize: size ? sizeMap[size] : 'inherit',
    fontWeight: variant === 'standalone'
      ? ('var(--font-weight-medium)' as unknown as number)
      : 'inherit',
    color: 'var(--color-text-link)',
    textDecoration: variant === 'inline' ? 'underline' : 'none',
    textUnderlineOffset: '3px',
    cursor: 'pointer',
    transition: `color var(--motion-duration-fast) var(--motion-easing-ease-out),
                 opacity var(--motion-duration-fast) var(--motion-easing-ease-out)`,
    outline: 'none',
    borderRadius: 'var(--radius-sm)',
    ...style,
  };

  return (
    <>
      <style>{`
        a.ds-link:hover  { color: var(--color-primary-hover); }
        a.ds-link:focus-visible {
          outline: 2px solid var(--color-border-focus);
          outline-offset: 2px;
        }
        a.ds-link-standalone { text-decoration: none !important; }
        a.ds-link-standalone:hover { text-decoration: underline !important; text-underline-offset: 3px; }
      `}</style>
      <a
        href={href}
        target={target}
        rel={resolvedRel}
        className={[
          'ds-link',
          variant === 'standalone' ? 'ds-link-standalone' : '',
          className ?? '',
        ]
          .filter(Boolean)
          .join(' ')}
        style={baseStyle}
        {...props}
      >
        {children}
        {isExternal && (
          <Icon
            name="external_link"
            size={16}
            style={{ marginLeft: '2px', verticalAlign: 'middle' }}
          />
        )}
      </a>
    </>
  );
};
