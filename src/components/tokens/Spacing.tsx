import type { CSSProperties } from 'react';

const steps = [
  { name: '1', var: '--spacing-1', value: '4px' },
  { name: '2', var: '--spacing-2', value: '8px' },
  { name: '3', var: '--spacing-3', value: '12px' },
  { name: '4', var: '--spacing-4', value: '16px' },
  { name: '6', var: '--spacing-6', value: '24px' },
  { name: '8', var: '--spacing-8', value: '32px' },
  { name: '12', var: '--spacing-12', value: '48px' },
  { name: '16', var: '--spacing-16', value: '64px' },
  { name: '24', var: '--spacing-24', value: '96px' },
  { name: '32', var: '--spacing-32', value: '128px' },
];

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'center',
  gap: 'var(--spacing-4)',
  marginBottom: 'var(--spacing-3)',
};

const label: CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-tertiary)',
  minWidth: '140px',
  textAlign: 'right',
  flexShrink: 0,
};

export const Spacing = () => (
  <div style={{ padding: 'var(--spacing-8)', maxWidth: '960px' }}>
    <h1 style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--font-size-4xl)',
      fontWeight: 700,
      marginBottom: 'var(--spacing-2)',
      color: 'var(--color-text-primary)',
    }}>Espacement</h1>
    <p style={{
      fontSize: 'var(--font-size-base)',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--spacing-8)',
      lineHeight: 'var(--line-height-normal)',
    }}>
      Grille de base 4px. Chaque valeur est un multiple pour garantir un rythme visuel cohérent.
    </p>

    {steps.map((s) => (
      <div key={s.name} style={row}>
        <span style={label}>
          spacing-{s.name} — {s.value}
        </span>
        <div style={{
          width: `var(${s.var})`,
          height: 'var(--spacing-6)',
          backgroundColor: 'var(--color-primary-default)',
          borderRadius: 'var(--radius-sm)',
          transition: `width var(--motion-duration-base) var(--motion-easing-ease-out)`,
        }} />
        <code style={{
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-tertiary)',
        }}>{s.var}</code>
      </div>
    ))}
  </div>
);
