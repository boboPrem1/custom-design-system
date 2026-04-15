import type { CSSProperties } from 'react';

const opacities = [
  { name: 'Disabled', var: '--opacity-disabled', value: '0.4', desc: 'Éléments désactivés' },
  { name: 'Muted', var: '--opacity-muted', value: '0.6', desc: 'Texte ou icônes secondaires atténués' },
  { name: 'Overlay', var: '--opacity-overlay', value: '0.5', desc: 'Fond overlay (modal, drawer)' },
];

const card: CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--spacing-4)',
  padding: 'var(--spacing-6)',
  border: '1px solid var(--color-border-primary)',
  borderRadius: 'var(--radius-lg)',
};

export const Opacity = () => (
  <div style={{ padding: 'var(--spacing-8)', maxWidth: '960px' }}>
    <h1 style={{
      fontFamily: 'var(--font-heading)',
      fontSize: 'var(--font-size-4xl)',
      fontWeight: 700,
      marginBottom: 'var(--spacing-2)',
      color: 'var(--color-text-primary)',
    }}>Opacité</h1>
    <p style={{
      fontSize: 'var(--font-size-base)',
      color: 'var(--color-text-secondary)',
      marginBottom: 'var(--spacing-8)',
      lineHeight: 'var(--line-height-normal)',
    }}>
      Niveaux d'opacité sémantiques pour les états et overlays.
    </p>

    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: 'var(--spacing-6)',
    }}>
      {opacities.map((o) => (
        <div key={o.name} style={card}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'var(--font-size-lg)',
              fontWeight: 500,
              color: 'var(--color-text-primary)',
            }}>{o.name}</span>
            <code style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-tertiary)',
            }}>{o.value}</code>
          </div>

          <p style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            margin: 0,
          }}>{o.desc}</p>

          {/* Demo: a button in normal and opacity state */}
          <div style={{
            display: 'flex',
            gap: 'var(--spacing-4)',
            alignItems: 'center',
          }}>
            <div style={{
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--color-primary-default)',
              color: 'var(--color-text-inverse)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
            }}>Normal</div>
            <div style={{
              padding: 'var(--spacing-2) var(--spacing-4)',
              backgroundColor: 'var(--color-primary-default)',
              color: 'var(--color-text-inverse)',
              borderRadius: 'var(--radius-md)',
              fontSize: 'var(--font-size-sm)',
              fontWeight: 500,
              opacity: `var(${o.var})` as unknown as number,
            }}>Avec opacité</div>
          </div>

          {/* Overlay demo for overlay token */}
          {o.name === 'Overlay' && (
            <div style={{
              position: 'relative',
              height: '80px',
              borderRadius: 'var(--radius-md)',
              overflow: 'hidden',
              background: 'linear-gradient(135deg, var(--color-primary-300), var(--color-accent-300))',
            }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'var(--color-neutral-950)',
                opacity: `var(${o.var})` as unknown as number,
              }} />
              <div style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                color: 'var(--color-text-inverse)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: 500,
              }}>Contenu sous overlay</div>
            </div>
          )}
        </div>
      ))}
    </div>
  </div>
);
