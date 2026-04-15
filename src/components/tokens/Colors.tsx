import type { CSSProperties } from 'react';

interface SwatchProps {
  variable: string;
  label: string;
  textDark?: boolean;
}

const Swatch = ({ variable, label, textDark = false }: SwatchProps) => {
  const style: CSSProperties = {
    backgroundColor: `var(${variable})`,
    color: textDark ? 'var(--color-text-primary)' : 'var(--color-text-inverse)',
    padding: 'var(--spacing-3) var(--spacing-4)',
    borderRadius: 'var(--radius-sm)',
    fontSize: 'var(--font-size-xs)',
    fontFamily: 'var(--font-body)',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    minHeight: '48px',
  };

  return (
    <div style={style}>
      <span style={{ fontWeight: 'var(--font-weight-medium)' } as CSSProperties}>{label}</span>
      <code style={{ opacity: 0.8 }}>{variable}</code>
    </div>
  );
};

interface PaletteGroupProps {
  title: string;
  swatches: { variable: string; label: string; textDark?: boolean }[];
}

const PaletteGroup = ({ title, swatches }: PaletteGroupProps) => (
  <div style={{ marginBottom: 'var(--spacing-8)' }}>
    <h3 style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--font-size-lg)',
      fontWeight: 'var(--font-weight-bold)' as unknown as number,
      marginBottom: 'var(--spacing-3)',
      color: 'var(--color-text-primary)',
    }}>{title}</h3>
    <div style={{
      display: 'grid',
      gap: '2px',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
    }}>
      {swatches.map((s) => (
        <Swatch key={s.variable} {...s} />
      ))}
    </div>
  </div>
);

const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950'];
const lightShades = ['50', '100', '200', '300'];

export const Colors = () => (
  <div style={{ padding: 'var(--spacing-8)', maxWidth: '960px' }}>
    <h1 style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--font-size-4xl)',
      fontWeight: 'var(--font-weight-bold)' as unknown as number,
      marginBottom: 'var(--spacing-2)',
      color: 'var(--color-text-primary)',
    }}>Couleurs</h1>
    <p style={{
      fontSize: 'var(--font-size-base)',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--spacing-8)',
      lineHeight: 'var(--line-height-normal)',
    }}>
      Palette complète générée automatiquement depuis 3 couleurs de base via transformation HSL.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-6)' }}>
      <PaletteGroup
        title="Primary"
        swatches={[
          { variable: '--color-primary-default', label: 'Default' },
          { variable: '--color-primary-hover', label: 'Hover' },
          { variable: '--color-primary-active', label: 'Active' },
          ...shades.map((s) => ({
            variable: `--color-primary-${s}`,
            label: s,
            textDark: lightShades.includes(s),
          })),
        ]}
      />

      <PaletteGroup
        title="Secondary"
        swatches={[
          { variable: '--color-secondary-default', label: 'Default' },
          { variable: '--color-secondary-hover', label: 'Hover' },
          { variable: '--color-secondary-active', label: 'Active' },
          ...shades.map((s) => ({
            variable: `--color-secondary-${s}`,
            label: s,
            textDark: lightShades.includes(s),
          })),
        ]}
      />

      <PaletteGroup
        title="Accent"
        swatches={[
          { variable: '--color-accent-default', label: 'Default' },
          { variable: '--color-accent-hover', label: 'Hover' },
          { variable: '--color-accent-active', label: 'Active' },
          ...shades.map((s) => ({
            variable: `--color-accent-${s}`,
            label: s,
            textDark: lightShades.includes(s),
          })),
        ]}
      />

      <PaletteGroup
        title="Neutral"
        swatches={shades.map((s) => ({
          variable: `--color-neutral-${s}`,
          label: s,
          textDark: lightShades.includes(s),
        }))}
      />
    </div>

    <h2 style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--font-size-2xl)',
      fontWeight: 'var(--font-weight-bold)' as unknown as number,
      margin: 'var(--spacing-8) 0 var(--spacing-4)',
      color: 'var(--color-text-primary)',
    }}>Sémantiques</h2>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-6)' }}>
      {(['success', 'warning', 'error', 'info'] as const).map((name) => (
        <PaletteGroup
          key={name}
          title={name.charAt(0).toUpperCase() + name.slice(1)}
          swatches={[
            { variable: `--color-semantic-${name}-light`, label: 'Light', textDark: true },
            { variable: `--color-semantic-${name}-default`, label: 'Default' },
            { variable: `--color-semantic-${name}-dark`, label: 'Dark' },
          ]}
        />
      ))}
    </div>

    <h2 style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--font-size-2xl)',
      fontWeight: 'var(--font-weight-bold)' as unknown as number,
      margin: 'var(--spacing-8) 0 var(--spacing-4)',
      color: 'var(--color-text-primary)',
    }}>Surface / Text / Border</h2>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 'var(--spacing-6)' }}>
      <PaletteGroup
        title="Surface"
        swatches={[
          { variable: '--color-surface-primary', label: 'Primary', textDark: true },
          { variable: '--color-surface-secondary', label: 'Secondary', textDark: true },
          { variable: '--color-surface-tertiary', label: 'Tertiary', textDark: true },
          { variable: '--color-surface-inverse', label: 'Inverse' },
        ]}
      />
      <PaletteGroup
        title="Text"
        swatches={[
          { variable: '--color-text-primary', label: 'Primary' },
          { variable: '--color-text-secondary', label: 'Secondary' },
          { variable: '--color-text-tertiary', label: 'Tertiary', textDark: true },
          { variable: '--color-text-disabled', label: 'Disabled', textDark: true },
          { variable: '--color-text-inverse', label: 'Inverse', textDark: true },
          { variable: '--color-text-link', label: 'Link' },
        ]}
      />
      <PaletteGroup
        title="Border"
        swatches={[
          { variable: '--color-border-primary', label: 'Primary', textDark: true },
          { variable: '--color-border-secondary', label: 'Secondary', textDark: true },
          { variable: '--color-border-focus', label: 'Focus' },
        ]}
      />
    </div>
  </div>
);
