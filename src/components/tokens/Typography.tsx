import type { CSSProperties } from 'react';

const sectionTitle: CSSProperties = {
  fontFamily: 'var(--font-heading)',
  fontSize: 'var(--font-size-2xl)',
  fontWeight: 700,
  marginTop: 'var(--spacing-8)',
  marginBottom: 'var(--spacing-4)',
  color: 'var(--color-text-primary)',
};

const row: CSSProperties = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 'var(--spacing-4)',
  paddingBottom: 'var(--spacing-3)',
  borderBottom: '1px solid var(--color-border-primary)',
  marginBottom: 'var(--spacing-3)',
};

const label: CSSProperties = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-tertiary)',
  minWidth: '120px',
  flexShrink: 0,
};

const sizes = [
  { name: 'xs', var: '--font-size-xs', value: '0.75rem' },
  { name: 'sm', var: '--font-size-sm', value: '0.875rem' },
  { name: 'base', var: '--font-size-base', value: '1rem' },
  { name: 'lg', var: '--font-size-lg', value: '1.125rem' },
  { name: 'xl', var: '--font-size-xl', value: '1.25rem' },
  { name: '2xl', var: '--font-size-2xl', value: '1.5rem' },
  { name: '3xl', var: '--font-size-3xl', value: '1.875rem' },
  { name: '4xl', var: '--font-size-4xl', value: '2.25rem' },
  { name: '5xl', var: '--font-size-5xl', value: '3rem' },
  { name: '6xl', var: '--font-size-6xl', value: '3.75rem' },
];

const weights = [
  { name: 'Regular', var: '--font-weight-regular', value: '400' },
  { name: 'Medium', var: '--font-weight-medium', value: '500' },
  { name: 'Bold', var: '--font-weight-bold', value: '700' },
];

const lineHeights = [
  { name: 'Tight', var: '--line-height-tight', value: '1.25' },
  { name: 'Normal', var: '--line-height-normal', value: '1.5' },
  { name: 'Relaxed', var: '--line-height-relaxed', value: '1.75' },
];

export const Typography = () => (
  <div style={{ padding: 'var(--spacing-8)', maxWidth: '960px' }}>
    <h1 style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--font-size-4xl)',
      fontWeight: 700,
      marginBottom: 'var(--spacing-2)',
      color: 'var(--color-text-primary)',
    }}>Typographie</h1>
    <p style={{
      fontSize: 'var(--font-size-base)',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--spacing-8)',
      lineHeight: 'var(--line-height-normal)',
    }}>
      Échelle typographique fluide de xs (0.75rem) à 6xl (3.75rem), 3 graisses, 3 interlignes.
    </p>

    <div style={{ marginBottom: 'var(--spacing-4)' }}>
      <div style={row}>
        <span style={label}>Heading</span>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--font-size-xl)' }}>
          Inter — var(--font-heading)
        </span>
      </div>
      <div style={row}>
        <span style={label}>Body</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xl)' }}>
          Inter — var(--font-body)
        </span>
      </div>
    </div>

    <h2 style={sectionTitle}>Échelle de tailles</h2>
    {sizes.map((s) => (
      <div key={s.name} style={row}>
        <span style={label}>{s.name} — {s.value}</span>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: `var(${s.var})`, color: 'var(--color-text-primary)' }}>
          The quick brown fox jumps over the lazy dog
        </span>
      </div>
    ))}

    <h2 style={sectionTitle}>Graisses</h2>
    {weights.map((w) => (
      <div key={w.name} style={row}>
        <span style={label}>{w.name} — {w.value}</span>
        <span style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-xl)',
          fontWeight: `var(${w.var})` as unknown as number,
          color: 'var(--color-text-primary)',
        }}>
          The quick brown fox jumps over the lazy dog
        </span>
      </div>
    ))}

    <h2 style={sectionTitle}>Interlignes</h2>
    {lineHeights.map((lh) => (
      <div key={lh.name} style={{ ...row, alignItems: 'flex-start' }}>
        <span style={label}>{lh.name} — {lh.value}</span>
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--font-size-base)',
          lineHeight: `var(${lh.var})`,
          color: 'var(--color-text-primary)',
          maxWidth: '600px',
        }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
        </p>
      </div>
    ))}
  </div>
);
