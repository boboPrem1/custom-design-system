import { type CSSProperties, useState } from 'react';

export interface ColorSwatch {
  name: string;
  hex: string;
  variable: string;
}

export interface ColorPaletteProps {
  title?: string;
  description?: string;
  colors: Record<string, ColorSwatch[]>;
  className?: string;
  style?: CSSProperties;
}

export const ColorPalette = ({
  title = 'System Colors',
  description = 'Palette complète des couleurs du design system.',
  colors,
  className,
  style,
}: ColorPaletteProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(text);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div className={className} style={{ fontFamily: 'var(--font-body)', padding: 'var(--spacing-8)', background: 'var(--color-surface-primary)', color: 'var(--color-text-primary)', ...style }}>
      <header style={{ marginBottom: 'var(--spacing-12)' }}>
        <h1 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{title}</h1>
        {description && <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>{description}</p>}
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
        {Object.entries(colors).map(([groupName, swatches]) => (
          <section key={groupName}>
            <h2 style={{ margin: '0 0 var(--spacing-6)', fontSize: 'var(--font-size-xl)', fontWeight: 700, textTransform: 'capitalize', borderBottom: '1px solid var(--color-border-primary)', paddingBottom: 'var(--spacing-2)' }}>
              {groupName}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 'var(--spacing-6)' }}>
              {swatches.map((swatch) => (
                <div
                  key={swatch.name}
                  onClick={() => copyToClipboard(swatch.hex)}
                  title={`Cliquer pour copier ${swatch.hex.toUpperCase()}`}
                  style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-primary)', background: 'var(--color-surface-primary)', boxShadow: 'var(--shadow-sm)', cursor: 'pointer', transition: 'box-shadow 0.15s', outline: copied === swatch.hex ? `2px solid var(--color-primary-default)` : 'none' }}
                >
                  <div style={{ height: 100, background: `var(${swatch.variable}, ${swatch.hex})`, width: '100%', position: 'relative' }}>
                    {copied === swatch.hex && (
                      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0,0,0,0.35)', color: '#fff', fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>Copié ✓</div>
                    )}
                  </div>
                  <div style={{ padding: 'var(--spacing-3)' }}>
                    <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', marginBottom: 'var(--spacing-1)' }}>{swatch.name}</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-tertiary)' }}>
                      <span>{swatch.hex.toUpperCase()}</span>
                      <span style={{ fontSize: '10px', opacity: 0.6 }}>clic</span>
                    </div>
                    <div style={{ marginTop: 'var(--spacing-2)', fontSize: '10px', color: 'var(--color-text-disabled)', fontFamily: 'monospace', wordBreak: 'break-all' }}>
                      {swatch.variable}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
