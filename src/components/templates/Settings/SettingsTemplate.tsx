import { type CSSProperties, type ReactNode, useState } from 'react';
import { Button } from '../../atoms/Button';
import { Icon, type IconName } from '../../atoms/Icon';

export interface SettingsSection {
  id: string;
  label: string;
  icon?: IconName;
  content: ReactNode;
}

export interface SettingsTemplateProps {
  title?: string;
  sections?: SettingsSection[];
  onSave?: () => void | Promise<void>;
  onCancel?: () => void;
  saving?: boolean;
  hasChanges?: boolean;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_SECTIONS: SettingsSection[] = [
  { id: 'profile',  label: 'Profil',       icon: 'user',     content: <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Formulaire de profil utilisateur à connecter.</p> },
  { id: 'security', label: 'Sécurité',     icon: 'info',     content: <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Options de sécurité et authentification.</p> },
  { id: 'notifs',   label: 'Notifications',icon: 'bell',     content: <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Préférences de notifications et alertes.</p> },
  { id: 'billing',  label: 'Facturation',  icon: 'star',     content: <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Abonnement, factures et moyens de paiement.</p> },
  { id: 'team',     label: 'Équipe',       icon: 'settings', content: <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Membres de l\'équipe et permissions.</p> },
];

export const SettingsTemplate = ({
  title = 'Paramètres',
  sections = DEFAULT_SECTIONS,
  onSave,
  onCancel,
  saving,
  hasChanges,
  className,
  style,
}: SettingsTemplateProps) => {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? '');
  const [saving_, setSaving] = useState(false);

  const active = sections.find((s) => s.id === activeId);

  const responsiveCss = `
    @media (max-width: 768px) {
      .ds-settings-body { grid-template-columns: 1fr !important; margin: 0 !important; padding: 0 !important; }
      .ds-settings-nav  { position: static !important; border-radius: 0 !important; border-left: none !important; border-right: none !important; border-top: none !important; }
      .ds-settings-nav-inner { display: flex !important; overflow-x: auto !important; gap: 0 !important; flex-direction: row !important; }
      .ds-settings-nav-label { display: none !important; }
      .ds-settings-nav-item  { flex-shrink: 0; border-left: none !important; border-bottom: 3px solid transparent !important; justify-content: center !important; }
      .ds-settings-nav-item-active { border-bottom-color: var(--color-primary-default) !important; border-left: none !important; }
    }
  `;

  const pageStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    fontFamily: 'var(--font-body)',
    background: 'var(--color-surface-secondary)',
    ...style,
  };

  const bodyStyle: CSSProperties = {
    flex: 1,
    display: 'grid',
    gridTemplateColumns: '240px 1fr',
    maxWidth: 1000,
    margin: 'var(--spacing-8) auto',
    width: '100%',
    gap: 'var(--spacing-6)',
    padding: '0 var(--spacing-6)',
    boxSizing: 'border-box',
    alignItems: 'start',
  };

  const isActive = (id: string) => activeId === id;

  const navStyle: CSSProperties = {
    background: 'var(--color-surface-primary)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-border-primary)',
    overflow: 'hidden',
    position: 'sticky',
    top: 'var(--spacing-8)',
  };

  const navItemStyle = (active: boolean): CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--spacing-3)',
    padding: 'var(--spacing-3) var(--spacing-4)',
    cursor: 'pointer',
    background: active ? 'var(--color-primary-50)' : 'transparent',
    color: active ? 'var(--color-primary-default)' : 'var(--color-text-secondary)',
    fontWeight: active ? 600 : 400,
    fontSize: 'var(--font-size-sm)',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    transition: 'background 0.12s',
    borderLeft: active ? '3px solid var(--color-primary-default)' : '3px solid transparent',
  });

  const contentStyle: CSSProperties = {
    background: 'var(--color-surface-primary)',
    borderRadius: 'var(--radius-xl)',
    border: '1px solid var(--color-border-primary)',
    overflow: 'hidden',
  };

  const handleSave = async () => {
    setSaving(true);
    try { await onSave?.(); } finally { setSaving(false); }
  };

  return (
    <div className={className} style={pageStyle}>
      <style>{responsiveCss}</style>
      {/* Page header */}
      <div style={{ borderBottom: '1px solid var(--color-border-primary)', background: 'var(--color-surface-primary)', padding: 'var(--spacing-6) var(--spacing-8)' }}>
        <h1 style={{ margin: 0, fontSize: 'var(--font-size-xl)', fontWeight: 800, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>{title}</h1>
      </div>

      <div className="ds-settings-body" style={bodyStyle}>
        {/* Nav sections */}
        <nav aria-label="Sections des paramètres" className="ds-settings-nav" style={navStyle}>
          <p className="ds-settings-nav-label" style={{ margin: 0, padding: 'var(--spacing-4)', fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Paramètres</p>
          <div className="ds-settings-nav-inner">
            {sections.map((sec) => (
              <button
                key={sec.id}
                onClick={() => setActiveId(sec.id)}
                className={`ds-settings-nav-item${isActive(sec.id) ? ' ds-settings-nav-item-active' : ''}`}
                style={navItemStyle(isActive(sec.id))}
              >
                {sec.icon && <Icon name={sec.icon} size={16} color={isActive(sec.id) ? 'var(--color-primary-default)' : 'var(--color-text-tertiary)'} />}
                {sec.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Content panel */}
        <div style={contentStyle}>
          <div style={{ padding: 'var(--spacing-8)' }}>
            <h2 style={{ margin: '0 0 var(--spacing-6)', fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{active?.label}</h2>
            {active?.content}
          </div>

          {/* Sticky footer */}
          <div style={{ borderTop: '1px solid var(--color-border-primary)', padding: 'var(--spacing-4) var(--spacing-8)', display: 'flex', justifyContent: 'flex-end', gap: 'var(--spacing-3)', background: 'var(--color-surface-secondary)', position: 'sticky', bottom: 0 }}>
            <Button variant="ghost" onClick={onCancel}>Annuler</Button>
            <Button variant="primary" loading={saving_ || saving} onClick={handleSave}>
              {hasChanges ? 'Enregistrer les modifications' : 'Enregistrer'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
