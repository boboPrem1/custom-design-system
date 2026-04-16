import { type CSSProperties } from 'react';

export interface EmailTemplateProps {
  preheader?: string;
  logoText?: string;
  logoColor?: string;
  heroTitle?: string;
  heroSubtitle?: string;
  heroCtaLabel?: string;
  heroCtaUrl?: string;
  heroBg?: string;
  bodyContent?: string;
  features?: Array<{ emoji: string; title: string; desc: string }>;
  footerLinks?: Array<{ label: string; href: string }>;
  legalText?: string;
  unsubscribeUrl?: string;
  className?: string;
  style?: CSSProperties;
}

export const EmailTemplate = ({
  preheader = 'Découvrez les nouveautés du Design System',
  logoText = 'Design System',
  logoColor = '#6C63FF',
  heroTitle = 'Bienvenue dans le Design System',
  heroSubtitle = 'Tout ce dont vous avez besoin pour construire des interfaces cohérentes.',
  heroCtaLabel = 'Découvrir →',
  heroCtaUrl = '#',
  heroBg = 'linear-gradient(135deg,#1a1a2e 0%,#6C63FF 100%)',
  bodyContent = 'Merci de faire confiance à notre design system. Voici les dernières nouveautés que nous avons préparées pour vous.',
  features = [
    { emoji: '🎨', title: 'Tokens CSS', desc: 'Variables cohérentes sur toute la charte.' },
    { emoji: '⚡', title: 'Performance', desc: 'Bundle minimal, zéro dépendance externe.' },
    { emoji: '♿', title: 'Accessibilité', desc: 'WCAG 2.1 AA sur chaque composant.' },
  ],
  footerLinks = [
    { label: 'Documentation', href: '#' },
    { label: 'GitHub', href: '#' },
    { label: 'Se désabonner', href: '#' },
  ],
  legalText = '© 2024 Design System · Tous droits réservés.',
  unsubscribeUrl = '#',
  className,
  style,
}: EmailTemplateProps) => {
  /* Tout en inline styles pour compatibilité email */
  return (
    <div className={className} style={{ background: '#f5f5f5', padding: '24px 0', fontFamily: 'Arial, sans-serif', ...style }}>
      {/* Preheader invisible */}
      <div style={{ maxHeight: 0, overflow: 'hidden', color: '#f5f5f5', fontSize: 1 }}>{preheader}</div>

      {/* Wrapper max 600px */}
      <table width="100%" cellPadding={0} cellSpacing={0} style={{ maxWidth: 600, margin: '0 auto' }}>
        <tbody>
          {/* Logo header */}
          <tr>
            <td style={{ background: '#ffffff', padding: '24px 32px', textAlign: 'center', borderBottom: '1px solid #e5e5e5' }}>
              <span style={{ fontSize: 22, fontWeight: 800, color: logoColor }}>{logoText}</span>
            </td>
          </tr>

          {/* Hero */}
          <tr>
            <td style={{ background: heroBg, padding: '48px 32px', textAlign: 'center' }}>
              <h1 style={{ margin: '0 0 12px', fontSize: 28, fontWeight: 800, color: '#ffffff', lineHeight: 1.2 }}>{heroTitle}</h1>
              <p style={{ margin: '0 0 28px', color: 'rgba(255,255,255,0.8)', fontSize: 16, lineHeight: 1.6 }}>{heroSubtitle}</p>
              <a href={heroCtaUrl} style={{ display: 'inline-block', padding: '14px 32px', background: '#ffffff', color: logoColor, fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: 16 }}>
                {heroCtaLabel}
              </a>
            </td>
          </tr>

          {/* Body */}
          <tr>
            <td style={{ background: '#ffffff', padding: '40px 32px' }}>
              <p style={{ margin: '0 0 32px', color: '#555', fontSize: 15, lineHeight: 1.7 }}>{bodyContent}</p>

              {/* Features 3 col */}
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 32 }}>
                <tbody>
                  <tr>
                    {features.map((f, i) => (
                      <td key={i} style={{ width: '33%', textAlign: 'center', padding: '0 8px', verticalAlign: 'top' }}>
                        <div style={{ fontSize: 32, marginBottom: 8 }}>{f.emoji}</div>
                        <p style={{ margin: '0 0 4px', fontWeight: 700, color: '#1a1a2e', fontSize: 14 }}>{f.title}</p>
                        <p style={{ margin: 0, color: '#888', fontSize: 13, lineHeight: 1.5 }}>{f.desc}</p>
                      </td>
                    ))}
                  </tr>
                </tbody>
              </table>

              {/* CTA secondaire */}
              <div style={{ textAlign: 'center' }}>
                <a href={heroCtaUrl} style={{ display: 'inline-block', padding: '12px 28px', background: logoColor, color: '#fff', fontWeight: 700, borderRadius: 8, textDecoration: 'none', fontSize: 15 }}>
                  Commencer maintenant
                </a>
              </div>
            </td>
          </tr>

          {/* Footer */}
          <tr>
            <td style={{ background: '#1a1a2e', padding: '28px 32px', textAlign: 'center' }}>
              <table width="100%" cellPadding={0} cellSpacing={0} style={{ marginBottom: 16 }}>
                <tbody>
                  <tr>
                    <td style={{ textAlign: 'center' }}>
                      {footerLinks.map((l, i) => (
                        <span key={l.label}>
                          {i > 0 && <span style={{ color: 'rgba(255,255,255,0.2)', margin: '0 10px' }}>·</span>}
                          <a href={l.href} style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, textDecoration: 'none' }}>{l.label}</a>
                        </span>
                      ))}
                    </td>
                  </tr>
                </tbody>
              </table>
              <p style={{ margin: '0 0 8px', color: 'rgba(255,255,255,0.3)', fontSize: 12 }}>{legalText}</p>
              <a href={unsubscribeUrl} style={{ color: 'rgba(255,255,255,0.25)', fontSize: 11, textDecoration: 'underline' }}>Se désabonner</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
