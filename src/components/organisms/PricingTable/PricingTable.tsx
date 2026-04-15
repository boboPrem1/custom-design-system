import { type CSSProperties, useState } from 'react';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Divider } from '../../atoms/Divider';

export interface PricingFeature { label: string; included: boolean; }

export interface PricingPlan {
  id: string;
  name: string;
  description?: string;
  monthlyPrice: number;
  yearlyPrice?: number;
  currency?: string;
  features: PricingFeature[];
  ctaLabel?: string;
  highlighted?: boolean;
  badge?: string;
  onSelect?: () => void;
}

export interface PricingTableProps {
  plans: PricingPlan[];
  title?: string;
  subtitle?: string;
  showYearly?: boolean;
  className?: string;
  style?: CSSProperties;
}

export const PricingTable = ({
  plans,
  title,
  subtitle,
  showYearly = true,
  className,
  style,
}: PricingTableProps) => {
  const [yearly, setYearly] = useState(false);

  return (
    <section className={className} style={{ padding: 'var(--spacing-16) var(--spacing-8)', fontFamily: 'var(--font-body)', ...style }}>
      <style>{`
        @media (max-width: 640px) {
          .ds-pricing-grid { grid-template-columns: 1fr !important; }
          .ds-pricing-card { transform: none !important; }
        }
      `}</style>
      {(title || subtitle) && (
        <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-12)' }}>
          {title && <h2 style={{ margin: '0 0 var(--spacing-4)', fontSize: 'var(--font-size-3xl)', fontWeight: 800, color: 'var(--color-text-primary)', fontFamily: 'var(--font-heading)' }}>{title}</h2>}
          {subtitle && <p style={{ margin: 0, color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-lg)' }}>{subtitle}</p>}
        </div>
      )}

      {showYearly && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 'var(--spacing-3)', marginBottom: 'var(--spacing-10)' }}>
          <span style={{ fontSize: 'var(--font-size-sm)', color: yearly ? 'var(--color-text-tertiary)' : 'var(--color-text-primary)', fontWeight: 500 }}>Mensuel</span>
          <button onClick={() => setYearly((y) => !y)} style={{ background: yearly ? 'var(--color-primary-default)' : 'var(--color-neutral-200)', border: 'none', borderRadius: 'var(--radius-full)', width: 44, height: 24, cursor: 'pointer', position: 'relative', transition: 'background 0.2s' }}>
            <span style={{ position: 'absolute', top: 3, left: yearly ? 22 : 3, width: 18, height: 18, borderRadius: '50%', background: '#fff', transition: 'left 0.2s', boxShadow: 'var(--shadow-sm)', display: 'block' }} />
          </button>
          <span style={{ fontSize: 'var(--font-size-sm)', color: yearly ? 'var(--color-text-primary)' : 'var(--color-text-tertiary)', fontWeight: 500 }}>
            Annuel <Badge label="-20%" size="sm" semantic="success" style={{ verticalAlign: 'middle' }} />
          </span>
        </div>
      )}

      <div className="ds-pricing-grid" style={{ display: 'grid', gridTemplateColumns: `repeat(${plans.length}, 1fr)`, gap: 'var(--spacing-6)', alignItems: 'stretch' }}>
        {plans.map((plan) => {
          const price = yearly && plan.yearlyPrice ? plan.yearlyPrice : plan.monthlyPrice;
          return (
            <div key={plan.id} className="ds-pricing-card" style={{
              display: 'flex',
              flexDirection: 'column',
              padding: 'var(--spacing-8)',
              borderRadius: 'var(--radius-xl)',
              border: `2px solid ${plan.highlighted ? 'var(--color-primary-default)' : 'var(--color-border-primary)'}`,
              background: plan.highlighted ? 'var(--color-primary-50)' : 'var(--color-surface-primary)',
              position: 'relative',
              boxShadow: plan.highlighted ? 'var(--shadow-lg)' : 'none',
              transform: plan.highlighted ? 'scale(1.02)' : 'none',
            }}>
              {plan.badge && (
                <div style={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)' }}>
                  <Badge label={plan.badge} semantic="primary" />
                </div>
              )}
              <h3 style={{ margin: '0 0 var(--spacing-2)', fontSize: 'var(--font-size-xl)', fontWeight: 700, color: 'var(--color-text-primary)' }}>{plan.name}</h3>
              {plan.description && <p style={{ margin: '0 0 var(--spacing-6)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>{plan.description}</p>}
              <div style={{ marginBottom: 'var(--spacing-6)' }}>
                <span style={{ fontSize: 'var(--font-size-5xl)', fontWeight: 800, color: 'var(--color-text-primary)', letterSpacing: '-0.02em' }}>{plan.currency ?? '€'}{price}</span>
                <span style={{ fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>/{yearly ? 'an' : 'mois'}</span>
              </div>
              <Button
                variant={plan.highlighted ? 'primary' : 'secondary'}
                size="md"
                style={{ width: '100%', justifyContent: 'center', marginBottom: 'var(--spacing-6)' }}
                onClick={plan.onSelect}
              >
                {plan.ctaLabel ?? 'Choisir ce plan'}
              </Button>
              <Divider style={{ marginBottom: 'var(--spacing-6)' }} />
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', flex: 1 }}>
                {plan.features.map((f, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)', fontSize: 'var(--font-size-sm)', color: f.included ? 'var(--color-text-primary)' : 'var(--color-text-disabled)' }}>
                    <Icon
                      name={f.included ? 'check' : 'close'}
                      size={16}
                      color={f.included ? 'var(--color-semantic-success-default)' : 'var(--color-text-disabled)'}
                    />
                    {f.label}
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>
    </section>
  );
};
