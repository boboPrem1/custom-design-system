import type { CSSProperties } from 'react';

const breakpoints = [
  { name: 'sm', var: '--breakpoint-sm', value: '640px', color: 'var(--color-accent-300)' },
  { name: 'md', var: '--breakpoint-md', value: '768px', color: 'var(--color-accent-400)' },
  { name: 'lg', var: '--breakpoint-lg', value: '1024px', color: 'var(--color-accent-500)' },
  { name: 'xl', var: '--breakpoint-xl', value: '1280px', color: 'var(--color-accent-600)' },
  { name: '2xl', var: '--breakpoint-2xl', value: '1536px', color: 'var(--color-accent-700)' },
];

const maxBarWidth = 1536;

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-4)',
  marginBottom: 'var(--spacing-4)',
};

const label: CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-tertiary)',
  minWidth: '100px',
  textAlign: 'right',
  flexShrink: 0,
};

export const Breakpoints = () => (
  <div style={{ padding: 'var(--spacing-8)', maxWidth: '960px' }}>
    <h1 style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--font-size-4xl)',
      fontWeight: 700,
      marginBottom: 'var(--spacing-2)',
      color: 'var(--color-text-primary)',
    }}>Breakpoints</h1>
    <p style={{
      fontSize: 'var(--font-size-base)',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--spacing-8)',
      lineHeight: 'var(--line-height-normal)',
    }}>
      Points de rupture responsive du système. Les barres sont à l'échelle relative.
    </p>

    {breakpoints.map((bp) => {
      const pxValue = parseInt(bp.value);
      const widthPercent = (pxValue / maxBarWidth) * 100;

      return (
        <div key={bp.name} style={row}>
          <span style={label}>{bp.name} — {bp.value}</span>
          <div style={{
            flex: 1,
            height: '36px',
            position: 'relative',
          }}>
            <div style={{
              width: `${widthPercent}%`,
              height: '100%',
              backgroundColor: bp.color,
              borderRadius: 'var(--radius-sm)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              paddingRight: 'var(--spacing-3)',
              minWidth: '60px',
            }}>
              <code style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-primary)',
                fontWeight: 500,
              }}>{bp.value}</code>
            </div>
          </div>
        </div>
      );
    })}

    <div style={{
      marginTop: 'var(--spacing-8)',
      padding: 'var(--spacing-4)',
      backgroundColor: 'var(--color-surface-tertiary)',
      borderRadius: 'var(--radius-md)',
    }}>
      <h3 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-sm)',
        fontWeight: 700,
        marginBottom: 'var(--spacing-2)',
        color: 'var(--color-text-primary)',
      }}>Usage recommandé</h3>
      <code style={{
        fontSize: 'var(--font-size-xs)',
        color: 'var(--color-text-secondary)',
        display: 'block',
        lineHeight: 'var(--line-height-relaxed)',
      }}>
        {`@media (min-width: 640px)  { /* sm  — Paysage mobile */ }`}<br />
        {`@media (min-width: 768px)  { /* md  — Tablette portrait */ }`}<br />
        {`@media (min-width: 1024px) { /* lg  — Tablette paysage / Desktop */ }`}<br />
        {`@media (min-width: 1280px) { /* xl  — Desktop large */ }`}<br />
        {`@media (min-width: 1536px) { /* 2xl — Ultra-wide */ }`}
      </code>
    </div>
  </div>
);
