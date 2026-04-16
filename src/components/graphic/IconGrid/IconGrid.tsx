import { type CSSProperties, useState } from 'react';
import { Icon, type IconName } from '../../atoms/Icon';

export interface IconCategory {
  name: string;
  icons: IconName[];
}

export interface IconGridProps {
  categories: IconCategory[];
  className?: string;
  style?: CSSProperties;
}

export const IconGrid = ({
  categories,
  className,
  style,
}: IconGridProps) => {
  const [copied, setCopied] = useState<string | null>(null);

  const copy = (name: string) => {
    navigator.clipboard.writeText(name).then(() => {
      setCopied(name);
      setTimeout(() => setCopied(null), 1500);
    });
  };

  return (
    <div className={className} style={{ padding: 'var(--spacing-8)', fontFamily: 'var(--font-body)', background: 'var(--color-surface-primary)', color: 'var(--color-text-primary)', ...style }}>
      <header style={{ marginBottom: 'var(--spacing-12)' }}>
        <h1 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>Iconography</h1>
        <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', color: 'var(--color-text-secondary)' }}>Set complet d\'icônes en grille 24x24.</p>
      </header>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-12)' }}>
        {categories.map((category) => (
          <section key={category.name}>
            <h2 style={{ margin: '0 0 var(--spacing-6)', fontSize: 'var(--font-size-xl)', fontWeight: 700, borderBottom: '1px solid var(--color-border-primary)', paddingBottom: 'var(--spacing-2)' }}>
              {category.name} <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', fontWeight: 400 }}>({category.icons.length})</span>
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: 'var(--spacing-4)' }}>
              {category.icons.map((iconName) => (
                <div
                  key={iconName}
                  onClick={() => copy(iconName)}
                  title={`Cliquer pour copier "${iconName}"`}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-6) var(--spacing-4)', background: copied === iconName ? 'var(--color-primary-50, #f5f3ff)' : 'var(--color-surface-secondary)', borderRadius: 'var(--radius-lg)', border: `1px solid ${copied === iconName ? 'var(--color-primary-default)' : 'var(--color-border-primary)'}`, transition: 'background 0.15s, border-color 0.15s', cursor: 'pointer' }}
                >
                  <div style={{ width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--color-surface-primary)', borderRadius: 'var(--radius-md)', boxShadow: 'var(--shadow-sm)', marginBottom: 'var(--spacing-3)' }}>
                    {copied === iconName
                      ? <span style={{ fontSize: 18, color: 'var(--color-primary-default)' }}>✓</span>
                      : <Icon name={iconName} size={24} color="var(--color-text-primary)" />}
                  </div>
                  <span style={{ fontSize: 'var(--font-size-xs)', fontFamily: 'monospace', color: copied === iconName ? 'var(--color-primary-default)' : 'var(--color-text-secondary)', textAlign: 'center', wordBreak: 'break-all', fontWeight: copied === iconName ? 700 : 400 }}>
                    {copied === iconName ? 'copié !' : iconName}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
