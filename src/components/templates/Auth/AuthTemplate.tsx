import { type CSSProperties, type ReactNode, useState } from 'react';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';

export type AuthVariant = 'login' | 'register' | 'reset';

export interface AuthTemplateProps {
  variant?: AuthVariant;
  logo?: ReactNode;
  logoText?: string;
  onSubmit?: (data: Record<string, string>) => void | Promise<void>;
  /** Lien secondaire (ex. "Mot de passe oublié ?") */
  secondaryLink?: { label: string; href: string };
  /** Lien alternatif (ex. "Créer un compte") */
  switchLink?: { label: string; href: string; prefix?: string };
  loading?: boolean;
  error?: string;
  className?: string;
  style?: CSSProperties;
}

const VARIANTS = {
  login:    { title: 'Connexion',            subtitle: 'Bienvenue !',                       cta: 'Se connecter' },
  register: { title: 'Créer un compte',      subtitle: 'Rejoignez-nous dès aujourd\'hui.',  cta: 'S\'inscrire'   },
  reset:    { title: 'Réinitialisation',     subtitle: 'Entrez votre email pour continuer.', cta: 'Envoyer le lien' },
};

export const AuthTemplate = ({
  variant = 'login',
  logo,
  logoText = 'Design System',
  onSubmit,
  secondaryLink,
  switchLink,
  loading,
  error,
  className,
  style,
}: AuthTemplateProps) => {
  const [fields, setFields]   = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [confirmError, setConfirmError] = useState<string | null>(null);
  const cfg = VARIANTS[variant];

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setFields((f) => ({ ...f, [k]: e.target.value }));

  const labelStyle: CSSProperties = {
    display: 'flex', flexDirection: 'column', gap: 'var(--spacing-1)', fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)',
  };
  const nativeInputStyle: CSSProperties = {
    height: 40, borderRadius: 'var(--radius-md)', border: '1.5px solid var(--color-border-primary)', padding: '0 var(--spacing-3)', fontSize: 'var(--font-size-base)', fontFamily: 'var(--font-body)', outline: 'none', background: 'var(--color-surface-primary)', color: 'var(--color-text-primary)',
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (variant === 'register' && fields.password !== fields.confirm) {
      setConfirmError('Les mots de passe ne correspondent pas.');
      return;
    }
    setConfirmError(null);
    setSubmitting(true);
    try { await onSubmit?.(fields); } finally { setSubmitting(false); }
  };

  const pageStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  const responsiveCss = `
    @media (max-width: 768px) {
      .ds-auth-brand  { display: none !important; }
      .ds-auth-panel  { width: 100% !important; min-height: 100vh; }
    }
  `;

  const brandStyle: CSSProperties = {
    flex: 1,
    background: 'linear-gradient(135deg, var(--color-secondary-default) 0%, var(--color-primary-700) 60%, var(--color-accent-900) 100%)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-16)',
    color: '#fff',
  };

  const formPanelStyle: CSSProperties = {
    width: 440,
    flexShrink: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 'var(--spacing-12) var(--spacing-10)',
    background: 'var(--color-surface-primary)',
    overflowY: 'auto',
  };

  return (
    <div className={className} style={pageStyle}>
      <style>{responsiveCss}</style>
      {/* Brand panel (desktop only) */}
      <div className="ds-auth-brand" style={brandStyle}>
        <div style={{ marginBottom: 'var(--spacing-8)', display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
          {logo ?? <span style={{ width: 40, height: 40, borderRadius: 'var(--radius-lg)', background: 'rgba(255,255,255,0.2)', display: 'inline-block' }} />}
          <span style={{ fontSize: 'var(--font-size-2xl)', fontWeight: 800 }}>{logoText}</span>
        </div>
        <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, textAlign: 'center', margin: '0 0 var(--spacing-4)', lineHeight: 1.15 }}>
          Construisez des interfaces<br />10× plus rapidement
        </h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', textAlign: 'center', fontSize: 'var(--font-size-lg)' }}>
          Un design system atomique, accessible et documenté.
        </p>
      </div>

      {/* Form panel */}
      <div className="ds-auth-panel" style={formPanelStyle}>
        <div style={{ width: '100%', maxWidth: 360 }}>
          {/* Logo mobile */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-8)' }}>
            {logo ?? <span style={{ width: 28, height: 28, borderRadius: 'var(--radius-md)', background: 'var(--color-primary-default)', display: 'inline-block' }} />}
            <span style={{ fontWeight: 700, fontSize: 'var(--font-size-lg)', color: 'var(--color-primary-default)' }}>{logoText}</span>
          </div>

          <h1 style={{ margin: '0 0 var(--spacing-2)', fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-text-primary)' }}>{cfg.title}</h1>
          <p style={{ margin: '0 0 var(--spacing-8)', color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)' }}>{cfg.subtitle}</p>

          {error && (
            <div style={{ padding: 'var(--spacing-3) var(--spacing-4)', background: 'var(--color-semantic-error-subtle)', border: '1px solid var(--color-semantic-error-default)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-4)', color: 'var(--color-semantic-error-default)', fontSize: 'var(--font-size-sm)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
            {variant === 'register' && (
              <label style={labelStyle}>
                Nom complet
                <input id="name" placeholder="Jean Dupont" value={fields.name ?? ''} onChange={set('name')} required style={nativeInputStyle} />
              </label>
            )}
            <label style={labelStyle}>
              Adresse email
              <input id="email" type="email" placeholder="jean@exemple.fr" value={fields.email ?? ''} onChange={set('email')} required style={nativeInputStyle} />
            </label>
            {variant !== 'reset' && (
              <div>
                <label style={labelStyle}>
                  Mot de passe
                  <input id="password" type="password" placeholder="••••••••" value={fields.password ?? ''} onChange={set('password')} required style={nativeInputStyle} />
                </label>
                {variant === 'login' && secondaryLink && (
                  <a href={secondaryLink.href} style={{ display: 'block', textAlign: 'right', marginTop: 'var(--spacing-2)', fontSize: 'var(--font-size-xs)', color: 'var(--color-primary-default)', textDecoration: 'none' }}>{secondaryLink.label}</a>
                )}
              </div>
            )}
            {variant === 'register' && (
              <div>
                <label style={labelStyle}>
                  Confirmer le mot de passe
                  <input id="confirm" type="password" placeholder="••••••••" value={fields.confirm ?? ''} onChange={(e) => { setConfirmError(null); set('confirm')(e); }} required style={{ ...nativeInputStyle, borderColor: confirmError ? 'var(--color-semantic-error-default)' : undefined }} />
                </label>
                {confirmError && <p style={{ margin: 'var(--spacing-1) 0 0', fontSize: 'var(--font-size-xs)', color: 'var(--color-semantic-error-default)' }}>{confirmError}</p>}
              </div>
            )}
            <Button type="submit" variant="primary" size="lg" loading={submitting || loading} style={{ width: '100%', justifyContent: 'center', marginTop: 'var(--spacing-2)' }}>
              {cfg.cta}
            </Button>
          </form>

          {switchLink && (
            <>
              <Divider style={{ margin: 'var(--spacing-6) 0' }} />
              <p style={{ textAlign: 'center', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', margin: 0 }}>
                {switchLink.prefix ?? ''}{' '}
                <a href={switchLink.href} style={{ color: 'var(--color-primary-default)', fontWeight: 600, textDecoration: 'none' }}>{switchLink.label}</a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
