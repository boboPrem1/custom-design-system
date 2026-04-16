import { type CSSProperties } from 'react';
import { HeroSection } from '../../organisms/HeroSection';
import { FeatureSection, type Feature } from '../../organisms/FeatureSection';
import { PricingTable, type PricingPlan } from '../../organisms/PricingTable';
import { Footer, type FooterColumn, type SocialLink } from '../../organisms/Footer';
import { Button } from '../../atoms/Button';

export interface LandingPageTemplateProps {
  hero?: { title: string; subtitle?: string; badge?: string; };
  features?: Feature[];
  socialProof?: Array<{ quote: string; author: string; role: string; }>;
  plans?: PricingPlan[];
  footerColumns?: FooterColumn[];
  footerSocials?: SocialLink[];
  logoText?: string;
  className?: string;
  style?: CSSProperties;
}

const DEFAULT_FEATURES: Feature[] = [
  { icon: 'check',    iconColor: '#6C63FF', title: 'Composants atomiques',  description: '22 atoms, 19 molécules et 20 organisms soigneusement conçus.' },
  { icon: 'code',     iconColor: '#20d4a0', title: 'Tokens CSS',            description: 'Source unique de vérité via Style Dictionary et global.json.' },
  { icon: 'settings', iconColor: '#F59E0B', title: 'Stories interactives',  description: 'Chaque composant documente ses variantes dans Storybook.' },
];

const DEFAULT_PROOF = [
  { quote: 'Ce design system a réduit notre temps de développement de 40 %.', author: 'Alice Martin', role: 'Lead Frontend @ Acme' },
  { quote: 'Les tokens CSS rendent la mise à jour du thème instantanée.', author: 'Bob Dupont', role: 'Designer @ Studio X' },
  { quote: 'La documentation Storybook est notre référence quotidienne.', author: 'Claire Bernard', role: 'CTO @ StartupY' },
];

const DEFAULT_PLANS: PricingPlan[] = [
  {
    id: 'free', name: 'Starter', monthlyPrice: 0,
    features: [{ label: '5 composants custom', included: true }, { label: 'Storybook hébergé', included: false }, { label: 'Support', included: false }],
    ctaLabel: 'Commencer',
  },
  {
    id: 'pro', name: 'Pro', monthlyPrice: 49, yearlyPrice: 39, highlighted: true, badge: 'Populaire',
    features: [{ label: 'Composants illimités', included: true }, { label: 'Storybook hébergé', included: true }, { label: 'Support prioritaire', included: false }],
    ctaLabel: 'Essai gratuit',
  },
  {
    id: 'ent', name: 'Entreprise', monthlyPrice: 129, yearlyPrice: 99,
    features: [{ label: 'Composants illimités', included: true }, { label: 'Storybook hébergé', included: true }, { label: 'Support dédié', included: true }],
    ctaLabel: 'Contacter',
  },
];

export const LandingPageTemplate = ({
  hero = { title: 'Construisez des interfaces 10× plus rapidement', subtitle: 'Un design system atomique, accessible et documenté pour vos applications React.', badge: '✨ Version 2.0' },
  features = DEFAULT_FEATURES,
  socialProof = DEFAULT_PROOF,
  plans = DEFAULT_PLANS,
  footerColumns = [],
  footerSocials = [],
  logoText = 'Design System',
  className,
  style,
}: LandingPageTemplateProps) => (
  <div className={className} style={{ fontFamily: 'var(--font-body)', ...style }}>
    {/* 1 — Hero */}
    <HeroSection
      title={hero.title}
      subtitle={hero.subtitle}
      badge={hero.badge}
      ctas={[
        { label: 'Démarrer gratuitement', href: '#pricing', iconLeft: 'arrow_right' },
        { label: 'Voir la démo',          href: '#features', variant: 'secondary' },
      ]}
    />

    {/* 2 — Features */}
    <FeatureSection
      title="Tout ce dont vous avez besoin"
      subtitle="Un système complet, pensé pour les équipes produit modernes."
      features={features}
      layout="3-cols"
    />

    {/* 3 — Social proof */}
    <section id="proof" style={{ padding: 'var(--spacing-16) var(--spacing-8)', background: 'var(--color-surface-secondary)' }}>
      <h2 style={{ textAlign: 'center', fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text-primary)', margin: '0 0 var(--spacing-12)', fontFamily: 'var(--font-heading)' }}>
        Ce qu'en disent nos utilisateurs
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-6)', maxWidth: 1100, margin: '0 auto' }}>
        {socialProof.map((t, i) => (
          <blockquote key={i} style={{ margin: 0, padding: 'var(--spacing-6)', background: 'var(--color-surface-primary)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--color-border-primary)' }}>
            <p style={{ margin: '0 0 var(--spacing-4)', color: 'var(--color-text-primary)', fontStyle: 'italic', lineHeight: 'var(--line-height-relaxed)' }}>"{t.quote}"</p>
            <footer style={{ fontSize: 'var(--font-size-sm)' }}>
              <strong style={{ color: 'var(--color-text-primary)' }}>{t.author}</strong>
              <span style={{ color: 'var(--color-text-tertiary)' }}> · {t.role}</span>
            </footer>
          </blockquote>
        ))}
      </div>
    </section>

    {/* 4 — Pricing */}
    <PricingTable
      title="Des tarifs simples et transparents"
      subtitle="Sans engagement. Upgradez ou annulez à tout moment."
      plans={plans}
    />

    {/* 5 — CTA finale */}
    <section style={{ padding: 'var(--spacing-24) var(--spacing-8)', textAlign: 'center', background: 'linear-gradient(135deg, var(--color-secondary-default) 0%, var(--color-primary-700) 100%)' }}>
      <h2 style={{ fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', fontWeight: 800, color: '#fff', margin: '0 0 var(--spacing-4)', fontFamily: 'var(--font-heading)' }}>
        Prêt à accélérer votre développement ?
      </h2>
      <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: 'var(--font-size-lg)', margin: '0 0 var(--spacing-10)' }}>
        Rejoignez des centaines d'équipes qui font confiance à notre design system.
      </p>
      <Button size="lg" style={{ background: '#fff', color: 'var(--color-primary-default)', fontWeight: 700 }}>
        Démarrer gratuitement →
      </Button>
    </section>

    {/* 6 — Footer */}
    <Footer logoText={logoText} columns={footerColumns} socials={footerSocials} />
  </div>
);
