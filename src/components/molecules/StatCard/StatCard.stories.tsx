import type { Meta, StoryObj } from '@storybook/react-vite';
import { StatCard } from './StatCard';

const meta = {
  title: 'Molecules/StatCard',
  component: StatCard,
  tags: ['autodocs'],
  argTypes: {
    trendDirection: { control: 'select', options: ['up', 'down', 'neutral'] },
    elevated: { control: 'boolean' },
  },
  args: {
    label: 'Revenus mensuels',
    value: '12 540 €',
    icon: 'star',
    trend: 8.2,
    trendDirection: 'up',
    trendLabel: 'vs mois dernier',
  },
} satisfies Meta<typeof StatCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Negative: Story = {
  args: {
    label: 'Taux de rebond',
    value: '42%',
    icon: 'warning',
    iconColor: 'var(--color-semantic-error-default)',
    trend: -3.1,
    trendDirection: 'down',
    trendLabel: 'vs semaine dernière',
  },
};

export const Neutral: Story = {
  args: {
    label: 'Utilisateurs actifs',
    value: '1 204',
    icon: 'user',
    iconColor: 'var(--color-text-secondary)',
    trend: 0,
    trendDirection: 'neutral',
    trendLabel: 'stable',
  },
};

export const Dashboard: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: 'var(--spacing-4)' }}>
      <StatCard label="Revenus" value="48 290 €" icon="star" iconColor="var(--color-primary-default)" trend={12.5} trendDirection="up" trendLabel="vs mois dernier" elevated />
      <StatCard label="Commandes" value="1 847" icon="bell" iconColor="var(--color-semantic-info-default)" trend={4.2} trendDirection="up" trendLabel="vs mois dernier" elevated />
      <StatCard label="Taux d'annulation" value="2.4%" icon="warning" iconColor="var(--color-semantic-error-default)" trend={-0.8} trendDirection="down" trendLabel="vs mois dernier" elevated />
      <StatCard label="NPS Score" value="74" icon="heart" iconColor="var(--color-semantic-success-default)" trend={3} trendDirection="up" trendLabel="vs trimestre" elevated />
    </div>
  ),
};
