import { type CSSProperties, type ReactNode, useState } from 'react';
import { Button } from '../../atoms/Button';

export interface OnboardingStep {
  id: string;
  title: string;
  subtitle?: string;
  content: ReactNode;
  /** Validation avant passage à l'étape suivante. Retourner une string = message d'erreur. */
  validate?: () => string | null | Promise<string | null>;
}

export interface OnboardingTemplateProps {
  steps: OnboardingStep[];
  onComplete?: () => void;
  onSkip?: () => void;
  logoText?: string;
  logo?: ReactNode;
  className?: string;
  style?: CSSProperties;
}

export const OnboardingTemplate = ({
  steps,
  onComplete,
  onSkip,
  logoText = 'Design System',
  logo,
  className,
  style,
}: OnboardingTemplateProps) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);

  const current = steps[currentIdx];
  const isLast = currentIdx === steps.length - 1;
  const progress = ((currentIdx + 1) / steps.length) * 100;

  const handleNext = async () => {
    setError(null);
    if (current.validate) {
      setLoading(true);
      const err = await current.validate();
      setLoading(false);
      if (err) { setError(err); return; }
    }
    if (isLast) { setCompleted(true); onComplete?.(); }
    else setCurrentIdx((i) => i + 1);
  };

  const handleBack = () => { setError(null); setCurrentIdx((i) => Math.max(0, i - 1)); };

  const pageStyle: CSSProperties = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    background: 'var(--color-surface-secondary)',
    fontFamily: 'var(--font-body)',
    ...style,
  };

  /* Completion screen */
  if (completed) {
    return (
      <div className={className} style={{ ...pageStyle, alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center', maxWidth: 480, padding: 'var(--spacing-8)' }}>
          <div style={{ fontSize: 80, marginBottom: 'var(--spacing-6)' }}>🎉</div>
          <h1 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 var(--spacing-4)', fontFamily: 'var(--font-heading)' }}>
            Configuration terminée !
          </h1>
          <p style={{ color: 'var(--color-text-secondary)', margin: '0 0 var(--spacing-8)' }}>
            Tout est prêt. Vous pouvez commencer à utiliser votre tableau de bord.
          </p>
          <Button variant="primary" size="lg" onClick={onComplete}>Accéder au tableau de bord →</Button>
        </div>
      </div>
    );
  }

  return (
    <div className={className} style={pageStyle}>
      {/* Header */}
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--spacing-6) var(--spacing-8)', background: 'var(--color-surface-primary)', borderBottom: '1px solid var(--color-border-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-2)', fontWeight: 700, color: 'var(--color-primary-default)', fontSize: 'var(--font-size-lg)' }}>
          {logo ?? <span style={{ width: 24, height: 24, borderRadius: 'var(--radius-sm)', background: 'var(--color-primary-default)', display: 'inline-block' }} />}
          {logoText}
        </div>
        {onSkip && (
          <button onClick={onSkip} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
            Passer la configuration →
          </button>
        )}
      </header>

      {/* Progress bar */}
      <div style={{ height: 4, background: 'var(--color-neutral-100)' }}>
        <div style={{ height: '100%', width: `${progress}%`, background: 'var(--color-primary-default)', transition: 'width 0.4s ease' }} />
      </div>

      {/* Content */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: 'var(--spacing-12) var(--spacing-8)' }}>
        <div style={{ width: '100%', maxWidth: 560 }}>
          {/* Step indicator */}
          <div style={{ display: 'flex', gap: 'var(--spacing-2)', marginBottom: 'var(--spacing-8)' }}>
            {steps.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 4, borderRadius: 'var(--radius-full)', background: i <= currentIdx ? 'var(--color-primary-default)' : 'var(--color-neutral-200)', transition: 'background 0.3s' }} />
            ))}
          </div>

          <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 700, color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Étape {currentIdx + 1} sur {steps.length}
          </span>
          <h2 style={{ margin: 'var(--spacing-2) 0 var(--spacing-2)', fontSize: 'var(--font-size-2xl)', fontWeight: 800, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>
            {current.title}
          </h2>
          {current.subtitle && <p style={{ margin: '0 0 var(--spacing-8)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-base)' }}>{current.subtitle}</p>}

          {/* Step content */}
          <div style={{ marginBottom: 'var(--spacing-8)' }}>{current.content}</div>

          {error && (
            <div style={{ padding: 'var(--spacing-3) var(--spacing-4)', background: 'var(--color-semantic-error-subtle)', border: '1px solid var(--color-semantic-error-default)', borderRadius: 'var(--radius-md)', marginBottom: 'var(--spacing-4)', color: 'var(--color-semantic-error-default)', fontSize: 'var(--font-size-sm)' }}>
              {error}
            </div>
          )}

          {/* Actions */}
          <div style={{ display: 'flex', gap: 'var(--spacing-3)', justifyContent: 'space-between', alignItems: 'center' }}>
            <Button variant="ghost" disabled={currentIdx === 0} onClick={handleBack}>← Précédent</Button>
            <Button variant="primary" loading={loading} onClick={handleNext}>
              {isLast ? 'Terminer' : 'Continuer →'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
