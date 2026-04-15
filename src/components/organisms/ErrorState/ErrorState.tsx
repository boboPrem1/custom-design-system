import { type CSSProperties, type ReactNode } from 'react';
import { Button } from '../../atoms/Button';

export type ErrorCode = 404 | 500 | 'network' | 'forbidden';

export interface ErrorStateProps {
  code?: ErrorCode;
  title?: string;
  description?: string;
  onRetry?: () => void;
  onHome?: () => void;
  className?: string;
  style?: CSSProperties;
}

const Illustration404 = ({ color }: { color: string }) => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
    <circle cx="60" cy="60" r="56" fill={`${color}18`} stroke={color} strokeWidth="2" />
    <circle cx="50" cy="50" r="14" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <line x1="60" y1="60" x2="75" y2="75" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <text x="60" y="95" textAnchor="middle" fontSize="11" fontWeight="700" fill={color} fontFamily="monospace">404</text>
  </svg>
);

const Illustration500 = ({ color }: { color: string }) => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
    <circle cx="60" cy="60" r="56" fill={`${color}18`} stroke={color} strokeWidth="2" />
    <polyline points="30,75 45,45 60,65 75,35 90,55" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    <circle cx="90" cy="55" r="4" fill={color} />
    <text x="60" y="100" textAnchor="middle" fontSize="11" fontWeight="700" fill={color} fontFamily="monospace">500</text>
  </svg>
);

const IllustrationNetwork = ({ color }: { color: string }) => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
    <circle cx="60" cy="60" r="56" fill={`${color}18`} stroke={color} strokeWidth="2" />
    <path d="M35 60 Q60 30 85 60" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.3" />
    <path d="M42 68 Q60 48 78 68" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" opacity="0.6" />
    <path d="M50 76 Q60 66 70 76" stroke={color} strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="60" cy="84" r="4" fill={color} />
    <line x1="30" y1="30" x2="90" y2="90" stroke={color} strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
  </svg>
);

const IllustrationForbidden = ({ color }: { color: string }) => (
  <svg width="120" height="120" viewBox="0 0 120 120" fill="none" aria-hidden>
    <circle cx="60" cy="60" r="56" fill={`${color}18`} stroke={color} strokeWidth="2" />
    <rect x="42" y="56" width="36" height="26" rx="4" stroke={color} strokeWidth="3" />
    <path d="M48 56V48a12 12 0 0 1 24 0v8" stroke={color} strokeWidth="3" strokeLinecap="round" />
    <circle cx="60" cy="69" r="3" fill={color} />
    <line x1="60" y1="72" x2="60" y2="77" stroke={color} strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

const CONFIGS: Record<ErrorCode, { illustration: (c: string) => ReactNode; defaultTitle: string; defaultDesc: string; color: string }> = {
  404:       { illustration: (c) => <Illustration404 color={c} />, defaultTitle: 'Page introuvable', defaultDesc: "La page que vous cherchez n'existe pas ou a été déplacée.", color: 'var(--color-semantic-warning-default)' },
  500:       { illustration: (c) => <Illustration500 color={c} />, defaultTitle: 'Erreur serveur', defaultDesc: "Une erreur interne s'est produite. Notre équipe a été notifiée.", color: 'var(--color-semantic-error-default)' },
  network:   { illustration: (c) => <IllustrationNetwork color={c} />, defaultTitle: 'Erreur réseau', defaultDesc: "Impossible de se connecter. Vérifiez votre connexion internet.", color: 'var(--color-semantic-info-default)' },
  forbidden: { illustration: (c) => <IllustrationForbidden color={c} />, defaultTitle: 'Accès refusé', defaultDesc: "Vous n'avez pas les permissions nécessaires pour accéder à cette ressource.", color: 'var(--color-semantic-warning-default)' },
};

export const ErrorState = ({
  code = 500,
  title,
  description,
  onRetry,
  onHome,
  className,
  style,
}: ErrorStateProps) => {
  const cfg = CONFIGS[code];

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: 'var(--spacing-16)',
        gap: 'var(--spacing-4)',
        fontFamily: 'var(--font-body)',
        ...style,
      }}
    >
      {/* SVG Illustration */}
      <div style={{ marginBottom: 'var(--spacing-4)' }}>
        {cfg.illustration(cfg.color)}
      </div>

      {(code === 404 || code === 500) && (
        <span style={{ fontSize: 'var(--font-size-6xl)', fontWeight: 900, color: 'var(--color-neutral-200)', letterSpacing: '-0.04em', lineHeight: 1 }}>{code}</span>
      )}

      <h2 style={{ margin: 0, fontSize: 'var(--font-size-2xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{title ?? cfg.defaultTitle}</h2>
      <p style={{ margin: 0, fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)', maxWidth: 400, lineHeight: 'var(--line-height-relaxed)' }}>{description ?? cfg.defaultDesc}</p>

      <div style={{ display: 'flex', gap: 'var(--spacing-3)', marginTop: 'var(--spacing-4)', flexWrap: 'wrap', justifyContent: 'center' }}>
        {onRetry && <Button variant="primary" iconLeft="arrow_right" onClick={onRetry}>Réessayer</Button>}
        {onHome  && <Button variant="ghost"   onClick={onHome}>Retour à l'accueil</Button>}
      </div>
    </div>
  );
};
