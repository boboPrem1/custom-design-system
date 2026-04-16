import { type CSSProperties, type ReactNode, useState, useEffect } from 'react';
import { Divider } from '../../atoms/Divider';

export interface TocItem { id: string; label: string; level?: 1 | 2 | 3; }

export interface ArticleTemplateProps {
  title: string;
  subtitle?: string;
  author?: string;
  date?: string;
  readTime?: string;
  tags?: string[];
  toc?: TocItem[];
  children?: ReactNode;
  prevLink?: { label: string; href: string };
  nextLink?: { label: string; href: string };
  breadcrumb?: Array<{ label: string; href?: string }>;
  className?: string;
  style?: CSSProperties;
}

export const ArticleTemplate = ({
  title,
  subtitle,
  author,
  date,
  readTime,
  tags = [],
  toc = [],
  children,
  prevLink,
  nextLink,
  breadcrumb = [],
  className,
  style,
}: ArticleTemplateProps) => {
  const [activeId, setActiveId] = useState(toc[0]?.id ?? '');

  /* Observer pour TOC actif */
  useEffect(() => {
    if (toc.length === 0) return;
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((e) => e.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: '-20% 0px -70% 0px' },
    );
    toc.forEach(({ id }) => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, [toc]);

  const pageStyle: CSSProperties = {
    minHeight: '100vh',
    background: 'var(--color-surface-primary)',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const layoutStyle: CSSProperties = {
    maxWidth: 1200,
    margin: '0 auto',
    padding: 'var(--spacing-8) var(--spacing-6)',
    display: 'grid',
    gridTemplateColumns: toc.length > 0 ? '1fr 220px' : '1fr',
    gap: 'var(--spacing-12)',
    alignItems: 'start',
  };

  const tocStyle: CSSProperties = {
    position: 'sticky',
    top: 80,
    padding: 'var(--spacing-4)',
    borderLeft: '2px solid var(--color-border-primary)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--spacing-2)',
  };

  return (
    <div className={className} style={pageStyle}>
      {/* Breadcrumb */}
      {breadcrumb.length > 0 && (
        <nav aria-label="Fil d'Ariane" style={{ maxWidth: 1200, margin: '0 auto', padding: 'var(--spacing-4) var(--spacing-6) 0', display: 'flex', gap: 'var(--spacing-2)', alignItems: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
          {breadcrumb.map((crumb, i) => (
            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)' }}>
              {i > 0 && <span aria-hidden>/</span>}
              {crumb.href ? <a href={crumb.href} style={{ color: 'var(--color-primary-default)', textDecoration: 'none' }}>{crumb.label}</a> : <span>{crumb.label}</span>}
            </span>
          ))}
        </nav>
      )}

      <div style={layoutStyle}>
        {/* Article */}
        <article style={{ maxWidth: 720, minWidth: 0 }}>
          {/* Meta */}
          <header style={{ marginBottom: 'var(--spacing-8)' }}>
            {tags.length > 0 && (
              <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap', marginBottom: 'var(--spacing-4)' }}>
                {tags.map((t) => (
                  <span key={t} style={{ padding: '2px 10px', borderRadius: 'var(--radius-full)', background: 'var(--color-primary-50)', color: 'var(--color-primary-default)', fontSize: 'var(--font-size-xs)', fontWeight: 600 }}>{t}</span>
                ))}
              </div>
            )}
            <h1 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: 'var(--color-text-primary)', lineHeight: 1.15, fontFamily: 'var(--font-heading)' }}>{title}</h1>
            {subtitle && <p style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-xl)', color: 'var(--color-text-secondary)', lineHeight: 'var(--line-height-relaxed)' }}>{subtitle}</p>}
            <div style={{ display: 'flex', gap: 'var(--spacing-4)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', flexWrap: 'wrap', alignItems: 'center' }}>
              {author && <span><strong style={{ color: 'var(--color-text-primary)' }}>{author}</strong></span>}
              {date   && <time dateTime={date}>{date}</time>}
              {readTime && <span>· {readTime} de lecture</span>}
            </div>
          </header>

          <Divider style={{ marginBottom: 'var(--spacing-8)' }} />

          {/* Prose */}
          <div style={{ fontSize: 'var(--font-size-base)', lineHeight: 'var(--line-height-relaxed)', color: 'var(--color-text-primary)' }}>
            {children}
          </div>

          <Divider style={{ margin: 'var(--spacing-10) 0' }} />

          {/* Prev / Next */}
          {(prevLink || nextLink) && (
            <nav aria-label="Navigation articles" style={{ display: 'flex', justifyContent: 'space-between', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
              {prevLink ? (
                <a href={prevLink.href} style={{ display: 'flex', flexDirection: 'column', gap: 4, textDecoration: 'none', color: 'var(--color-text-primary)', maxWidth: '45%' }}>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>← Précédent</span>
                  <span style={{ fontWeight: 600 }}>{prevLink.label}</span>
                </a>
              ) : <div />}
              {nextLink && (
                <a href={nextLink.href} style={{ display: 'flex', flexDirection: 'column', gap: 4, textDecoration: 'none', color: 'var(--color-text-primary)', maxWidth: '45%', alignItems: 'flex-end', textAlign: 'right' }}>
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Suivant →</span>
                  <span style={{ fontWeight: 600 }}>{nextLink.label}</span>
                </a>
              )}
            </nav>
          )}
        </article>

        {/* TOC sticky */}
        {toc.length > 0 && (
          <aside aria-label="Table des matières" style={tocStyle}>
            <p style={{ margin: '0 0 var(--spacing-3)', fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Sur cette page</p>
            {toc.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                style={{
                  fontSize: 'var(--font-size-sm)',
                  color: activeId === item.id ? 'var(--color-primary-default)' : 'var(--color-text-tertiary)',
                  textDecoration: 'none',
                  fontWeight: activeId === item.id ? 600 : 400,
                  paddingLeft: item.level === 3 ? 'var(--spacing-4)' : item.level === 2 ? 'var(--spacing-2)' : 0,
                  transition: 'color 0.15s',
                  lineHeight: 1.5,
                }}
              >
                {item.label}
              </a>
            ))}
          </aside>
        )}
      </div>
    </div>
  );
};
