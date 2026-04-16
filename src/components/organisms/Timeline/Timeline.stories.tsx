import type { Meta, StoryObj } from '@storybook/react-vite';
import { within, expect } from 'storybook/test';
import { Timeline } from './Timeline';

const ITEMS = [
  { id: '1', title: 'Projet créé',       date: '1 jan 2024',   status: 'success' as const, statusLabel: 'Terminé',    description: 'Initialisation du projet Storybook avec Vite et TypeScript.' },
  { id: '2', title: 'Phase 1 — Tokens',  date: '15 jan 2024',  status: 'success' as const, statusLabel: 'Terminé',    description: '8 catégories de tokens générés via Style Dictionary.' },
  { id: '3', title: 'Phase 2 — Atoms',   date: '1 fév 2024',   status: 'success' as const, statusLabel: 'Terminé',    description: '22 composants atomiques avec stories Storybook.' },
  { id: '4', title: 'Phase 3 — Molecules',date: '15 fév 2024', status: 'primary' as const, statusLabel: 'En cours',   description: '19 molécules en cours de développement.' },
  { id: '5', title: 'Phase 4 — Organisms',date: 'Mars 2024',   status: 'neutral' as const, statusLabel: 'À venir',    description: 'Composants complexes de mise en page.' },
];

const meta = {
  title: 'Organisms/Timeline',
  component: Timeline,
  args: { items: ITEMS },
} satisfies Meta<typeof Timeline>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Vertical: Story = { args: { orientation: 'vertical' } };
export const Horizontal: Story = {
  args: { orientation: 'horizontal', items: ITEMS.slice(0, 4) },
  decorators: [(Story) => <div style={{ overflowX: 'auto', padding: 'var(--spacing-8)' }}><Story /></div>],
};

export const Alternating: Story = {
  args: { orientation: 'alternating' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('Projet créé')).toBeInTheDocument();
    await expect(canvas.getByText('Phase 2 — Atoms')).toBeInTheDocument();
  },
};

export const MinimalItems: Story = {
  args: {
    items: [
      { id: 'a', title: 'Étape simple' },
      { id: 'b', title: 'Étape avec statut', status: 'warning' as const, statusLabel: 'Attention', date: '2024', description: 'Desc' },
      { id: 'c', title: 'Erreur', status: 'error' as const, icon: <span>🔴</span> },
    ],
  },
};

export const AlternatingMinimal: Story = {
  args: {
    orientation: 'alternating',
    items: [
      { id: 'x', title: 'Sans desc ni date' },
      { id: 'y', title: 'Avec tout', date: '2024', description: 'Full', status: 'info' as const, statusLabel: 'Info' },
    ],
  },
};
