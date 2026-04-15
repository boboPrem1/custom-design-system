import type { Meta, StoryObj } from '@storybook/react-vite';
import { PricingTable } from './PricingTable';

const PLANS = [
  {
    id: 'starter',
    name: 'Starter',
    description: 'Pour les petites équipes qui démarrent.',
    monthlyPrice: 0,
    yearlyPrice: 0,
    features: [
      { label: '5 composants custom', included: true  },
      { label: 'Storybook hébergé',   included: false },
      { label: 'Support prioritaire', included: false },
      { label: 'Thèmes illimités',    included: false },
    ],
    ctaLabel: 'Commencer gratuitement',
  },
  {
    id: 'pro',
    name: 'Pro',
    description: 'Pour les équipes produit en croissance.',
    monthlyPrice: 49,
    yearlyPrice: 39,
    highlighted: true,
    badge: 'Populaire',
    features: [
      { label: 'Composants illimités',  included: true },
      { label: 'Storybook hébergé',     included: true },
      { label: 'Support prioritaire',   included: true },
      { label: 'Thèmes illimités',      included: false },
    ],
    ctaLabel: 'Essai gratuit 14 jours',
  },
  {
    id: 'enterprise',
    name: 'Entreprise',
    description: 'Contrôle total et support dédié.',
    monthlyPrice: 129,
    yearlyPrice: 99,
    features: [
      { label: 'Composants illimités',  included: true },
      { label: 'Storybook hébergé',     included: true },
      { label: 'Support prioritaire',   included: true },
      { label: 'Thèmes illimités',      included: true },
    ],
    ctaLabel: 'Contacter l\'équipe',
  },
];

const meta = {
  title: 'Organisms/PricingTable',
  component: PricingTable,
  args: { plans: PLANS, title: 'Des tarifs simples et transparents', subtitle: 'Sans engagement, sans surprise.' },
} satisfies Meta<typeof PricingTable>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const YearlyMode: Story = { args: { showYearly: true } };
