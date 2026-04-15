import { type CSSProperties, type ReactNode, useState } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';

export interface NavItem {
  label: string;
  href?: string;
  active?: boolean;
  icon?: IconName;
}

export interface NavbarProps {
  logo?: ReactNode;
  logoText?: string;
  items?: NavItem[];
  actions?: ReactNode;
  sticky?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const Navbar = ({
  logo,
  logoText = 'Design System',
  items = [],
  actions,
  sticky = false,
  className,
  style,
}: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 var(--spacing-6)',
    height: 64,
    background: 'var(--color-surface-primary)',
    borderBottom: '1px solid var(--color-border-primary)',
    boxShadow: 'var(--shadow-sm)',
    gap: 'var(--spacing-6)',
    position: sticky ? 'sticky' : 'relative',
    top: sticky ? 0 : undefined,
    zIndex: sticky ? 100 : undefined,
    width: '100%',
    boxSizing: 'border-box',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const logoStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
    fontWeight: 'var(--font-weight-bold)' as unknown as number,
    fontSize: 'var(--font-size-lg)',
    color: 'var(--color-primary-default)',
    textDecoration: 'none',
    flexShrink: 0,
  };

  const linksStyle: CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-1)',
    flex: 1,
  };

  const linkStyle = (active?: boolean): CSSProperties => ({
    padding: '6px var(--spacing-3)',
    borderRadius: 'var(--radius-md)',
    fontSize: 'var(--font-size-sm)',
    fontWeight: 'var(--font-weight-medium)' as unknown as number,
    color: active ? 'var(--color-primary-default)' : 'var(--color-text-secondary)',
    background: active ? 'var(--color-primary-50)' : 'transparent',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: `background var(--motion-duration-fast) var(--motion-easing-ease-out),
                 color var(--motion-duration-fast) var(--motion-easing-ease-out)`,
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-2)',
  });

  return (
    <nav role="navigation" aria-label="Navigation principale" className={className} style={navStyle}>
      <style>{`
        .ds-nav-link:hover { background: var(--color-neutral-100) !important; color: var(--color-text-primary) !important; }
        @media (max-width: 768px) { .ds-nav-links { display: none !important; } .ds-nav-hamburger { display: flex !important; } }
        @media (min-width: 769px) { .ds-nav-hamburger { display: none !important; } }
      `}</style>

      {/* Logo */}
      <a href="#" style={logoStyle}>
        {logo ?? (
          <span style={{ width: 28, height: 28, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-default)', display: 'inline-block' }} />
        )}
        {logoText}
      </a>

      {/* Links desktop */}
      <div className="ds-nav-links" style={linksStyle}>
        {items.map((item) => (
          <a key={item.label} href={item.href ?? '#'} className="ds-nav-link" style={linkStyle(item.active)}>
            {item.icon && <Icon name={item.icon} size={16} />}
            {item.label}
          </a>
        ))}
      </div>

      {/* Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', flexShrink: 0 }}>
        {actions}
      </div>

      {/* Hamburger mobile */}
      <button
        className="ds-nav-hamburger"
        aria-label="Menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((o) => !o)}
        style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 'var(--spacing-2)', borderRadius: 'var(--radius-md)' }}
      >
        <Icon name={menuOpen ? 'close' : 'menu'} size={20} />
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: 64,
          left: 0,
          right: 0,
          background: 'var(--color-surface-primary)',
          borderBottom: '1px solid var(--color-border-primary)',
          padding: 'var(--spacing-4)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--spacing-2)',
          zIndex: 99,
        }}>
          {items.map((item) => (
            <a key={item.label} href={item.href ?? '#'} style={{ ...linkStyle(item.active), justifyContent: 'flex-start' }}>
              {item.icon && <Icon name={item.icon} size={16} />}
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
};
