import type { CSSProperties } from 'react';

const shadows = [
  { name: 'sm', var: '--shadow-sm', desc: '0 1px 2px 0 rgba(0,0,0,0.05)' },
  { name: 'md', var: '--shadow-md', desc: '0 4px 6px -1px rgba(0,0,0,0.1)' },
  { name: 'lg', var: '--shadow-lg', desc: '0 10px 15px -3px rgba(0,0,0,0.1)' },
  { name: 'xl', var: '--shadow-xl', desc: '0 20px 25px -5px rgba(0,0,0,0.1)' },
  { name: 'inner', var: '--shadow-inner', desc: 'inset 0 2px 4px 0 rgba(0,0,0,0.05)' },
];

const card: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: 'var(--spacing-3)',
};

export const Shadows = () => (
  <div style={{ padding: 'var(--spacing-8)', maxWidth: '960px' }}>
    <h1 style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--font-size-4xl)',
      fontWeight: 700,
      marginBottom: 'var(--spacing-2)',
      color: 'var(--color-text-primary)',
    }}>Ombres</h1>
    <p style={{
      fontSize: 'var(--font-size-base)',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--spacing-8)',
      lineHeight: 'var(--line-height-normal)',
    }}>
      5 niveaux d'élévation pour créer de la profondeur visuelle.
    </p>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
      gap: 'var(--spacing-8)',
    }}>
      {shadows.map((s) => (
        <div key={s.name} style={card}>
          <div style={{
            width: '120px',
            height: '120px',
            backgroundColor: 'var(--color-surface-primary)',
            borderRadius: 'var(--radius-lg)',
            boxShadow: `var(${s.var})`,
            border: '1px solid var(--color-border-primary)',
          }} />
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
            }}>{s.name}</div>
            <code style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-tertiary)',
              display: 'block',
              maxWidth: '180px',
              wordBreak: 'break-all',
            }}>{s.desc}</code>
          </div>
        </div>
      ))}
    </div>
  </div>
);
