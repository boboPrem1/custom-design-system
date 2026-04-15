import type { Meta, StoryObj } from '@storybook/react-vite';
import { useEffect, useState } from 'react';
import { ProgressBar } from './ProgressBar';

const meta = {
  title: 'Molecules/ProgressBar',
  component: ProgressBar,
  tags: ['autodocs'],
} satisfies Meta<typeof ProgressBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Linear: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    useEffect(() => {
      const t = setInterval(() => setValue((v) => (v >= 100 ? 0 : v + 2)), 60);
      return () => clearInterval(t);
    }, []);
    return (
      <div style={{ width: 400 }}>
        <ProgressBar value={value} label="Chargement" showValue />
      </div>
    );
  },
};

export const Semantics: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: 400 }}>
      <ProgressBar value={75} semantic="primary" label="Primaire" showValue />
      <ProgressBar value={60} semantic="success" label="Succès" showValue />
      <ProgressBar value={45} semantic="warning" label="Avertissement" showValue />
      <ProgressBar value={30} semantic="error" label="Erreur" showValue />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', width: 400 }}>
      <ProgressBar value={65} size="sm" label="Petit" />
      <ProgressBar value={65} size="md" label="Moyen" />
      <ProgressBar value={65} size="lg" label="Grand" />
    </div>
  ),
};

export const Indeterminate: Story = {
  render: () => (
    <div style={{ width: 400 }}>
      <ProgressBar indeterminate label="Chargement en cours…" />
    </div>
  ),
};

export const Circular: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)', alignItems: 'center', flexWrap: 'wrap' }}>
      <ProgressBar variant="circular" value={25} size="sm" showValue />
      <ProgressBar variant="circular" value={60} size="md" showValue semantic="success" />
      <ProgressBar variant="circular" value={85} size="lg" showValue semantic="primary" label="Avancé" />
    </div>
  ),
};

export const CircularIndeterminate: Story = {
  render: () => (
    <ProgressBar variant="circular" indeterminate size="md" />
  ),
};
