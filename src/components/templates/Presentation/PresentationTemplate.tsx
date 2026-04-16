import { type CSSProperties, type ReactNode, useState, useEffect, useCallback } from 'react';

export type SlideLayout = 'title' | 'content' | 'data' | 'image' | 'split';

export interface Slide {
  id: string;
  layout: SlideLayout;
  title?: string;
  subtitle?: string;
  content?: ReactNode;
  /** Pour layout 'data' — tableau de valeurs */
  data?: Array<{ label: string; value: string | number; color?: string }>;
  /** Pour layout 'image' */
  imageSrc?: string;
  imageAlt?: string;
  /** Override fond */
  background?: string;
  textColor?: string;
}

export interface PresentationTemplateProps {
  slides?: Slide[];
  logoText?: string;
  primaryColor?: string;
  showProgressBar?: boolean;
  className?: string;
  style?: CSSProperties;
}

const defaultSlides: Slide[] = [
  {
    id: 's1', layout: 'title',
    title: 'Design System Atomique',
    subtitle: 'Une architecture cohérente pour des interfaces modernes.',
    background: 'linear-gradient(135deg, #1a1a2e 0%, #6C63FF 100%)',
    textColor: '#ffffff',
  },
  {
    id: 's2', layout: 'content',
    title: 'Architecture Atomique',
    content: (
      <ul style={{ margin: 0, padding: '0 0 0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        {['22 Atoms — composants primitifs indivisibles', '19 Molecules — combinaisons d\'atoms', '20 Organisms — blocs de composition complexes', '10 Templates — mises en page complètes'].map((item) => (
          <li key={item} style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-text-primary)' }}>{item}</li>
        ))}
      </ul>
    ),
  },
  {
    id: 's3', layout: 'data',
    title: 'Résultats',
    data: [
      { label: 'Composants', value: '71', color: '#6C63FF' },
      { label: 'Stories',    value: '200+', color: '#20d4a0' },
      { label: 'Tokens CSS', value: '150+', color: '#F59E0B' },
      { label: 'Réduction temps dev', value: '-40%', color: '#EC4899' },
    ],
  },
];

const SlideRenderer = ({ slide, primary }: { slide: Slide; primary: string }) => {
  const base: CSSProperties = {
    width: '100%',
    height: '100%',
    padding: 'var(--spacing-12)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    background: slide.background ?? 'var(--color-surface-primary)',
    color: slide.textColor ?? 'var(--color-text-primary)',
    fontFamily: 'var(--font-body)',
    boxSizing: 'border-box',
    position: 'relative',
  };

  if (slide.layout === 'title') return (
    <div style={{ ...base, alignItems: 'center', textAlign: 'center' }}>
      <h1 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-5xl)', fontWeight: 800, lineHeight: 1.1, fontFamily: 'var(--font-heading)' }}>{slide.title}</h1>
      {slide.subtitle && <p style={{ margin: 0, fontSize: 'var(--font-size-xl)', opacity: 0.75 }}>{slide.subtitle}</p>}
    </div>
  );

  if (slide.layout === 'image') return (
    <div style={{ ...base, padding: 0, justifyContent: 'flex-end' }}>
      {slide.imageSrc ? (
        <img src={slide.imageSrc} alt={slide.imageAlt ?? ''} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg,#1a1a2e 0%,#6C63FF 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: 64, opacity: 0.3 }}>🖼</span>
        </div>
      )}
      {(slide.title || slide.subtitle) && (
        <div style={{ position: 'relative', zIndex: 1, padding: 'var(--spacing-10)', background: 'linear-gradient(to top,rgba(0,0,0,0.75) 0%,transparent 100%)', color: '#fff' }}>
          {slide.title && <h2 style={{ margin: '0 0 var(--spacing-2)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{slide.title}</h2>}
          {slide.subtitle && <p style={{ margin: 0, fontSize: 'var(--font-size-lg)', opacity: 0.8 }}>{slide.subtitle}</p>}
        </div>
      )}
    </div>
  );

  if (slide.layout === 'split') return (
    <div style={{ ...base, flexDirection: 'row', padding: 0 }}>
      <div style={{ flex: 1, padding: 'var(--spacing-12)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        {slide.title && <h2 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, fontFamily: 'var(--font-heading)', borderLeft: `4px solid ${primary}`, paddingLeft: 'var(--spacing-4)' }}>{slide.title}</h2>}
        {slide.subtitle && <p style={{ margin: '0 0 var(--spacing-6)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>{slide.subtitle}</p>}
        {slide.content}
      </div>
      <div style={{ flex: 1, background: slide.imageSrc ? 'none' : `${primary}18`, position: 'relative', overflow: 'hidden' }}>
        {slide.imageSrc ? (
          <img src={slide.imageSrc} alt={slide.imageAlt ?? ''} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${primary}18` }}>
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: primary, opacity: 0.3 }} />
          </div>
        )}
      </div>
    </div>
  );

  if (slide.layout === 'data') return (
    <div style={base}>
      {slide.title && <h2 style={{ margin: '0 0 var(--spacing-8)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, fontFamily: 'var(--font-heading)' }}>{slide.title}</h2>}
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(slide.data?.length ?? 2, 4)}, 1fr)`, gap: 'var(--spacing-6)' }}>
        {slide.data?.map((d) => (
          <div key={d.label} style={{ padding: 'var(--spacing-6)', background: `${d.color ?? primary}18`, borderRadius: 'var(--radius-xl)', border: `2px solid ${d.color ?? primary}` }}>
            <p style={{ margin: '0 0 var(--spacing-2)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{d.label}</p>
            <p style={{ margin: 0, fontSize: 'var(--font-size-4xl)', fontWeight: 900, color: d.color ?? primary, lineHeight: 1 }}>{d.value}</p>
          </div>
        ))}
      </div>
    </div>
  );

  /* content / default */
  return (
    <div style={base}>
      {slide.title && <h2 style={{ margin: '0 0 var(--spacing-8)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, fontFamily: 'var(--font-heading)', borderLeft: `4px solid ${primary}`, paddingLeft: 'var(--spacing-4)' }}>{slide.title}</h2>}
      {slide.subtitle && <p style={{ margin: '0 0 var(--spacing-6)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>{slide.subtitle}</p>}
      {slide.content}
    </div>
  );
};

export const PresentationTemplate = ({
  slides = defaultSlides,
  logoText = 'Design System',
  primaryColor = '#6C63FF',
  showProgressBar = true,
  className,
  style,
}: PresentationTemplateProps) => {
  const [current, setCurrent] = useState(0);
  const slide = slides[current];
  const progress = ((current + 1) / slides.length) * 100;

  const handleKey = useCallback((e: KeyboardEvent) => {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') setCurrent((c) => Math.min(slides.length - 1, c + 1));
    if (e.key === 'ArrowLeft'  || e.key === 'ArrowUp')   setCurrent((c) => Math.max(0, c - 1));
  }, [slides.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [handleKey]);

  const shell: CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    width: 800,
    height: 'auto',
    boxShadow: 'var(--shadow-xl)',
    borderRadius: 'var(--radius-xl)',
    overflow: 'hidden',
    fontFamily: 'var(--font-body)',
    border: '1px solid var(--color-border-primary)',
    ...style,
  };

  const slideArea: CSSProperties = {
    width: '100%',
    aspectRatio: '16/9',
    position: 'relative',
    overflow: 'hidden',
  };

  return (
    <div className={className} style={{ display: 'inline-flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <div style={shell}>
        {/* Slide */}
        <div style={slideArea}>
          <SlideRenderer slide={slide} primary={primaryColor} />
          {/* Slide number */}
          <div style={{ position: 'absolute', bottom: 16, right: 20, fontSize: 12, color: 'rgba(255,255,255,0.5)', fontWeight: 600 }}>
            {current + 1} / {slides.length}
          </div>
          {/* Logo watermark */}
          <div style={{ position: 'absolute', top: 16, left: 20, fontSize: 13, fontWeight: 700, color: 'rgba(255,255,255,0.4)' }}>{logoText}</div>
        </div>

        {/* Controls bar */}
        <div style={{ background: '#1a1a2e', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 16px', gap: 'var(--spacing-3)' }}>
          <button onClick={() => setCurrent((c) => Math.max(0, c - 1))} disabled={current === 0} style={{ background: 'none', border: 'none', cursor: current === 0 ? 'default' : 'pointer', color: current === 0 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)', fontSize: 16, padding: '4px 8px' }}>←</button>

          {/* Thumbnails */}
          <div style={{ display: 'flex', gap: 6, overflow: 'hidden', flex: 1, justifyContent: 'center' }}>
            {slides.map((s, i) => (
              <button key={s.id} onClick={() => setCurrent(i)} style={{ width: 8, height: 8, borderRadius: '50%', background: i === current ? primaryColor : 'rgba(255,255,255,0.3)', border: 'none', cursor: 'pointer', flexShrink: 0, padding: 0, transition: 'background 0.2s' }} />
            ))}
          </div>

          <button onClick={() => setCurrent((c) => Math.min(slides.length - 1, c + 1))} disabled={current === slides.length - 1} style={{ background: 'none', border: 'none', cursor: current === slides.length - 1 ? 'default' : 'pointer', color: current === slides.length - 1 ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.8)', fontSize: 16, padding: '4px 8px' }}>→</button>
        </div>

        {/* Progress */}
        {showProgressBar && (
          <div style={{ height: 3, background: 'rgba(255,255,255,0.1)' }}>
            <div style={{ height: '100%', width: `${progress}%`, background: primaryColor, transition: 'width 0.3s ease' }} />
          </div>
        )}
      </div>

      {/* Slide titles list */}
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
        {slides.map((s, i) => (
          <button key={s.id} onClick={() => setCurrent(i)} style={{ padding: '4px 12px', borderRadius: 'var(--radius-full)', background: i === current ? primaryColor : 'var(--color-surface-primary)', color: i === current ? '#fff' : 'var(--color-text-tertiary)', border: `1px solid ${i === current ? primaryColor : 'var(--color-border-primary)'}`, cursor: 'pointer', fontSize: 12, fontFamily: 'var(--font-body)' }}>
            {s.title ?? `Slide ${i + 1}`}
          </button>
        ))}
      </div>
    </div>
  );
};
