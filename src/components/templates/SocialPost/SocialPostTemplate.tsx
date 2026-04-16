import { type CSSProperties } from 'react';

export type SocialRatio = '1:1' | '9:16' | '16:9' | '4:5';

export interface SocialPostTemplateProps {
  ratio?: SocialRatio;
  platform?: 'instagram' | 'linkedin' | 'youtube' | 'twitter';
  headline?: string;
  subline?: string;
  ctaLabel?: string;
  logoText?: string;
  logoColor?: string;
  background?: string;
  textColor?: string;
  accentColor?: string;
  showFrame?: boolean;
  className?: string;
  style?: CSSProperties;
}

const RATIO_MAP: Record<SocialRatio, { w: number; h: number }> = {
  '1:1':  { w: 400, h: 400 },
  '9:16': { w: 300, h: 533 },
  '16:9': { w: 533, h: 300 },
  '4:5':  { w: 400, h: 500 },
};

const PLATFORM_LABELS: Record<string, string> = {
  instagram: 'Instagram',
  linkedin:  'LinkedIn',
  youtube:   'YouTube',
  twitter:   'X (Twitter)',
};

export const SocialPostTemplate = ({
  ratio = '1:1',
  platform = 'instagram',
  headline = 'Construisez des interfaces 10× plus vite',
  subline = 'Design System · React · TypeScript',
  ctaLabel = 'Découvrir →',
  logoText = 'DS',
  logoColor = '#6C63FF',
  background = 'linear-gradient(135deg, #1a1a2e 0%, #6C63FF 60%, #20d4a0 100%)',
  textColor = '#ffffff',
  accentColor = '#20d4a0',
  showFrame = true,
  className,
  style,
}: SocialPostTemplateProps) => {
  const { w, h } = RATIO_MAP[ratio];

  const postStyle: CSSProperties = {
    width: w,
    height: h,
    background,
    borderRadius: showFrame ? 'var(--radius-xl)' : 0,
    boxShadow: showFrame ? 'var(--shadow-xl)' : 'none',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: ratio === '9:16' ? 'var(--spacing-8)' : 'var(--spacing-6)',
    position: 'relative',
    overflow: 'hidden',
    fontFamily: 'var(--font-body)',
    color: textColor,
    ...style,
  };

  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 'var(--spacing-3)' }}>
      {showFrame && (
        <p style={{ margin: 0, fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontFamily: 'var(--font-body)' }}>
          {PLATFORM_LABELS[platform]} · {ratio}
        </p>
      )}

      <div style={postStyle}>
        {/* Decorative blobs */}
        <div aria-hidden style={{ position: 'absolute', width: w * 0.8, height: w * 0.8, borderRadius: '50%', background: 'rgba(108,99,255,0.2)', top: -w * 0.2, right: -w * 0.2, filter: 'blur(40px)', pointerEvents: 'none' }} />
        <div aria-hidden style={{ position: 'absolute', width: w * 0.5, height: w * 0.5, borderRadius: '50%', background: 'rgba(0,212,160,0.15)', bottom: -w * 0.1, left: w * 0.1, filter: 'blur(30px)', pointerEvents: 'none' }} />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, position: 'relative', zIndex: 1 }}>
          <span style={{ width: 32, height: 32, borderRadius: 8, background: logoColor, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14, color: '#fff' }}>{logoText.slice(0, 2)}</span>
          <span style={{ fontWeight: 700, fontSize: 14 }}>{logoText}</span>
        </div>

        {/* Contents */}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h2 style={{ margin: '0 0 8px', fontSize: ratio === '9:16' ? 'var(--font-size-3xl)' : 'var(--font-size-2xl)', fontWeight: 800, lineHeight: 1.15, fontFamily: 'var(--font-heading)' }}>
            {headline}
          </h2>
          {subline && <p style={{ margin: '0 0 16px', color: 'rgba(255,255,255,0.7)', fontSize: 'var(--font-size-sm)' }}>{subline}</p>}
          {ctaLabel && (
            <span style={{ display: 'inline-block', padding: '8px 20px', background: accentColor, color: '#1a1a2e', borderRadius: 'var(--radius-full)', fontWeight: 700, fontSize: 'var(--font-size-sm)' }}>
              {ctaLabel}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};
