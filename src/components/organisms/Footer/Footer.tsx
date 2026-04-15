import { type CSSProperties, type ReactNode, useState } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';

export interface FooterLink  { label: string; href?: string; }
export interface FooterColumn { title: string; links: FooterLink[]; }
export interface SocialLink  { icon: IconName; href: string; label: string; }

export interface FooterProps {
  logo?: ReactNode;
  logoText?: string;
  tagline?: string;
  columns?: FooterColumn[];
  socials?: SocialLink[];
  copyright?: string;
  className?: string;
  style?: CSSProperties;
}

export const Footer = ({
  logo,
  logoText = 'Design System',
  tagline,
  columns = [],
  socials = [],
  copyright = `© ${new Date().getFullYear()} Design System. Tous droits réservés.`,
  className,
  style,
}: FooterProps) => {
  const [expandedCols, setExpandedCols] = useState<Set<string>>(new Set());

  const toggleCol = (title: string) => {
    setExpandedCols((prev) => {
      const next = new Set(prev);
      next.has(title) ? next.delete(title) : next.add(title);
      return next;
    });
  };

  const footerStyle: CSSProperties = {
    background: 'var(--color-secondary-default)',
    color: 'var(--color-text-inverse)',
    padding: 'var(--spacing-12) var(--spacing-8) var(--spacing-6)',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const linkStyle: CSSProperties = {
    color: 'rgba(255,255,255,0.6)',
    textDecoration: 'none',
    fontSize: 'var(--font-size-sm)',
    lineHeight: 'var(--line-height-relaxed)',
    transition: `color var(--motion-duration-fast) var(--motion-easing-ease-out)`,
    display: 'block',
  };

  return (
    <footer className={className} style={footerStyle}>
      <style>{`
        .ds-footer-link:hover { color: rgba(255,255,255,0.9) !important; }
        @media (max-width: 640px) {
          .ds-footer-grid { display: block !important; }
          .ds-footer-col-links { display: none; }
          .ds-footer-col-links.open { display: flex !important; }
          .ds-footer-col-btn { display: flex !important; }
        }
        @media (min-width: 641px) {
          .ds-footer-col-links { display: flex !important; }
          .ds-footer-col-btn-arrow { display: none !important; }
        }
      `}</style>

      {/* Top row */}
      <div className="ds-footer-grid" style={{ display: 'grid', gridTemplateColumns: `1fr ${columns.map(() => 'auto').join(' ')}`, gap: 'var(--spacing-8)', marginBottom: 'var(--spacing-8)' }}>
        {/* Brand */}
        <div style={{ maxWidth: 280 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-3)' }}>
            {logo ?? <span style={{ width: 28, height: 28, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-default)', display: 'inline-block' }} />}
            <span style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, color: '#fff' }}>{logoText}</span>
          </div>
          {tagline && <p style={{ margin: 0, color: 'rgba(255,255,255,0.55)', fontSize: 'var(--font-size-sm)', lineHeight: 'var(--line-height-relaxed)' }}>{tagline}</p>}
          {socials.length > 0 && (
            <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-4)' }}>
              {socials.map((s) => (
                <a key={s.href} href={s.href} aria-label={s.label} style={{ color: 'rgba(255,255,255,0.6)', display: 'flex', alignItems: 'center', transition: 'color 0.15s' }} className="ds-footer-link">
                  <Icon name={s.icon} size={20} color="currentColor" />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* Columns — desktop: static, mobile: accordion */}
        {columns.map((col) => {
          const isOpen = expandedCols.has(col.title);
          return (
            <div key={col.title} style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <button
                onClick={() => toggleCol(col.title)}
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'none', border: 'none', cursor: 'pointer', padding: '0 0 var(--spacing-4)', color: '#fff' }}
              >
                <h4 style={{ margin: 0, fontSize: 'var(--font-size-sm)', fontWeight: 700, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.06em' }}>{col.title}</h4>
                <Icon
                  name="arrow_right"
                  size={16}
                  color="rgba(255,255,255,0.5)"
                  className="ds-footer-col-btn-arrow"
                  style={{ transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }}
                />
              </button>
              <nav
                className={`ds-footer-col-links${isOpen ? ' open' : ''}`}
                style={{ flexDirection: 'column', gap: 'var(--spacing-2)', paddingBottom: 'var(--spacing-6)' }}
              >
                {col.links.map((link) => (
                  <a key={link.label} href={link.href ?? '#'} className="ds-footer-link" style={linkStyle}>{link.label}</a>
                ))}
              </nav>
            </div>
          );
        })}
      </div>

      {/* Divider + copyright */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.12)', paddingTop: 'var(--spacing-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
        <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'rgba(255,255,255,0.4)' }}>{copyright}</p>
      </div>
    </footer>
  );
};
