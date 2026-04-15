import type { CSSProperties } from 'react';

const radii = [
  { name: 'none', var: '--radius-none', value: '0' },
  { name: 'sm', var: '--radius-sm', value: '4px' },
  { name: 'md', var: '--radius-md', value: '8px' },
  { name: 'lg', var: '--radius-lg', value: '12px' },
  { name: 'xl', var: '--radius-xl', value: '16px' },
  { name: 'full', var: '--radius-full', value: '9999px' },
];

const card: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--spacing-3)',
};

export const Radius = () => (
  <div style={{ padding: 'var(--spacing-8)', maxWidth: '960px' }}>
    <h1 style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--font-size-4xl)',
      fontWeight: 700,
      marginBottom: 'var(--spacing-2)',
      color: 'var(--color-text-primary)',
    }}>Radius</h1>
    <p style={{
      fontSize: 'var(--font-size-base)',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--spacing-8)',
      lineHeight: 'var(--line-height-normal)',
    }}>
      Arrondis du système, de none (0) à full (cercle).
    </p>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))',
      gap: 'var(--spacing-6)',
    }}>
      {radii.map((r) => (
        <div key={r.name} style={card}>
          <div style={{
            width: '96px',
            height: '96px',
            backgroundColor: 'var(--color-primary-default)',
            borderRadius: `var(${r.var})`,
          }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
            }}>{r.name}</div>
            <code style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-tertiary)',
            }}>{r.value}</code>
          </div>
        </div>
      ))}
    </div>
  </div>
);
