import { useState, type CSSProperties } from 'react';

const durations = [
  { name: 'Fast', var: '--motion-duration-fast', value: '100ms' },
  { name: 'Base', var: '--motion-duration-base', value: '200ms' },
  { name: 'Slow', var: '--motion-duration-slow', value: '350ms' },
];

const easings = [
  { name: 'Ease Out', var: '--motion-easing-ease-out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
  { name: 'Ease In', var: '--motion-easing-ease-in', value: 'cubic-bezier(0.4, 0, 1, 1)' },
  { name: 'Spring', var: '--motion-easing-spring', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
];

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
  minWidth: '160px',
  flexShrink: 0,
};

const sectionTitle: CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 700,
  marginTop: 'var(--spacing-8)',
  marginBottom: 'var(--spacing-4)',
  color: 'var(--color-text-primary)',
};

export const Motion = () => {
  const [active, setActive] = useState(false);

  return (
    <div style={{ padding: 'var(--spacing-8)', maxWidth: '960px' }}>
      <h1 style={{
        fontFamily: 'var(--font-heading)',
        fontSize: 'var(--font-size-4xl)',
        fontWeight: 700,
        marginBottom: 'var(--spacing-2)',
        color: 'var(--color-text-primary)',
      }}>Motion</h1>
      <p style={{
        fontSize: 'var(--font-size-base)',
        color: 'var(--color-text-secondary)',
        marginBottom: 'var(--spacing-4)',
        lineHeight: 'var(--line-height-normal)',
      }}>
        Durées et courbes d'accélération pour des animations cohérentes.
      </p>

      <button
        onClick={() => setActive(!active)}
        style={{
          padding: 'var(--spacing-2) var(--spacing-4)',
          backgroundColor: 'var(--color-primary-default)',
          color: 'var(--color-text-inverse)',
          border: 'none',
          borderRadius: 'var(--radius-md)',
          cursor: 'pointer',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 500,
          marginBottom: 'var(--spacing-6)',
        }}
      >
        {active ? 'Réinitialiser' : 'Animer'}
      </button>

      <h2 style={sectionTitle}>Durées</h2>
      {durations.map((d) => (
        <div key={d.name} style={row}>
          <span style={label}>{d.name} — {d.value}</span>
          <div style={{
            position: 'relative',
            width: '300px',
            height: '32px',
            backgroundColor: 'var(--color-neutral-100)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '4px',
              left: active ? 'calc(100% - 28px)' : '4px',
              width: '24px',
              height: '24px',
              backgroundColor: 'var(--color-primary-default)',
              borderRadius: 'var(--radius-full)',
              transitionProperty: 'left',
              transitionDuration: `var(${d.var})`,
              transitionTimingFunction: 'var(--motion-easing-ease-out)',
            }} />
          </div>
          <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{d.var}</code>
        </div>
      ))}

      <h2 style={sectionTitle}>Courbes d'accélération</h2>
      {easings.map((e) => (
        <div key={e.name} style={row}>
          <span style={label}>{e.name}</span>
          <div style={{
            position: 'relative',
            width: '300px',
            height: '32px',
            backgroundColor: 'var(--color-neutral-100)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute',
              top: '4px',
              left: active ? 'calc(100% - 28px)' : '4px',
              width: '24px',
              height: '24px',
              backgroundColor: 'var(--color-accent-default)',
              borderRadius: 'var(--radius-full)',
              transitionProperty: 'left',
              transitionDuration: 'var(--motion-duration-slow)',
              transitionTimingFunction: `var(${e.var})`,
            }} />
          </div>
          <code style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{e.value}</code>
        </div>
      ))}
    </div>
  );
};
