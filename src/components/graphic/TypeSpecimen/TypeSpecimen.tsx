import { type CSSProperties } from 'react';

export interface TypeSpecimenProps {
  fonts?: Array<{ name: string; family: string; variable: string; example?: string }>;
  levels?: Array<{ name: string; size: string; weight: string | number; variableSize: string; variableWeight?: string; lineHeight?: string }>;
  className?: string;
  style?: CSSProperties;
}

export const TypeSpecimen = ({
  fonts = [
    { name: 'Heading', family: 'Inter, sans-serif', variable: 'var(--font-heading)', example: 'Ag' },
    { name: 'Body', family: 'Inter, sans-serif', variable: 'var(--font-body)', example: 'Ag' },
  ],
  levels = [
    { name: 'Heading 1', size: '2.5rem', weight: 800, variableSize: 'var(--font-size-4xl)', lineHeight: '1.2' },
    { name: 'Heading 2', size: '2rem', weight: 800, variableSize: 'var(--font-size-3xl)', lineHeight: '1.3' },
    { name: 'Heading 3', size: '1.5rem', weight: 700, variableSize: 'var(--font-size-2xl)', lineHeight: '1.4' },
    { name: 'Body Large', size: '1.125rem', weight: 400, variableSize: 'var(--font-size-lg)', lineHeight: '1.6' },
    { name: 'Body Base', size: '1rem', weight: 400, variableSize: 'var(--font-size-base)', lineHeight: '1.6' },
    { name: 'Body Small', size: '0.875rem', weight: 400, variableSize: 'var(--font-size-sm)', lineHeight: '1.5' },
    { name: 'Caption', size: '0.75rem', weight: 400, variableSize: 'var(--font-size-xs)', lineHeight: '1.4' },
  ],
  className,
  style,
}: TypeSpecimenProps) => {
  const samplePhrase = 'The quick brown fox jumps over the lazy dog. 0123456789!?';

  return (
    <div className={className} style={{ padding: 'var(--spacing-8)', fontFamily: 'var(--font-body)', background: 'var(--color-surface-primary)', color: 'var(--color-text-primary)', ...style }}>
      <header style={{ marginBottom: 'var(--spacing-12)' }}>
        <h1 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Type Specimen</h1>
        <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>Typographie et échelles du design system.</p>
      </header>

      {/* Font Families */}
      <section style={{ marginBottom: 'var(--spacing-16)' }}>
        <h2 style={{ margin: '0 0 var(--spacing-6)', fontSize: 'var(--font-size-xl)', fontWeight: 700, borderBottom: '1px solid var(--color-border-primary)', paddingBottom: 'var(--spacing-2)' }}>Typefaces</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 'var(--spacing-8)' }}>
          {fonts.map((f) => (
            <div key={f.name} style={{ display: 'flex', gap: 'var(--spacing-6)', padding: 'var(--spacing-6)', background: 'var(--color-surface-secondary)', borderRadius: 'var(--radius-xl)' }}>
              <div style={{ fontSize: '72px', fontWeight: 700, lineHeight: 1, fontFamily: f.variable, color: 'var(--color-primary-default)' }}>{f.example || 'Aa'}</div>
              <div>
                <div style={{ fontSize: 'var(--font-size-lg)', fontWeight: 700, marginBottom: 'var(--spacing-1)' }}>{f.name}</div>
                <div style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)', marginBottom: 'var(--spacing-2)' }}>{f.family}</div>
                <code style={{ fontSize: 'var(--font-size-xs)', background: 'rgba(0,0,0,0.05)', padding: '2px 6px', borderRadius: '4px' }}>{f.variable}</code>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Weight Strip */}
      <section style={{ marginBottom: 'var(--spacing-16)' }}>
        <h2 style={{ margin: '0 0 var(--spacing-6)', fontSize: 'var(--font-size-xl)', fontWeight: 700, borderBottom: '1px solid var(--color-border-primary)', paddingBottom: 'var(--spacing-2)' }}>Font Weights</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          {([300, 400, 500, 600, 700, 800, 900] as const).map((w) => (
            <div key={w} style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 'var(--spacing-6)', alignItems: 'baseline', padding: 'var(--spacing-3) 0', borderBottom: '1px solid var(--color-border-primary)' }}>
              <div style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: 'var(--color-text-tertiary)' }}>{w}</div>
              <div style={{ fontSize: 'var(--font-size-2xl)', fontWeight: w, fontFamily: 'var(--font-heading)', color: 'var(--color-text-primary)' }}>
                Design System
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Scale */}
      <section>
        <h2 style={{ margin: '0 0 var(--spacing-6)', fontSize: 'var(--font-size-xl)', fontWeight: 700, borderBottom: '1px solid var(--color-border-primary)', paddingBottom: 'var(--spacing-2)' }}>Scale & Hierarchy</h2>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {levels.map((level, i) => (
            <div key={level.name} style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 'var(--spacing-6)', padding: 'var(--spacing-6) 0', borderBottom: i < levels.length - 1 ? '1px solid var(--color-border-primary)' : 'none', alignItems: 'center' }}>
              <div>
                <div style={{ fontWeight: 600, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>{level.name}</div>
                <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontFamily: 'monospace', marginTop: 'var(--spacing-1)' }}>
                  {level.weight} / {level.size} / {level.lineHeight}
                </div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-disabled)', fontFamily: 'monospace', marginTop: 'var(--spacing-1)' }}>
                  {level.variableSize}
                </div>
              </div>
              <div style={{
                fontSize: level.variableSize,
                fontWeight: level.weight,
                lineHeight: level.lineHeight,
                fontFamily: level.name.includes('Heading') ? 'var(--font-heading)' : 'var(--font-body)'
              }}>
                {samplePhrase}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
