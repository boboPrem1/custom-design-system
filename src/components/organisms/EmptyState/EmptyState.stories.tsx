import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmptyState } from './EmptyState';

const meta = {
  title: 'Organisms/EmptyState',
  component: EmptyState,
  args: {
    title: 'Aucun résultat trouvé',
    description: 'Essayez de modifier vos filtres ou d\'effectuer une nouvelle recherche.',
    cta: { label: 'Réinitialiser les filtres', iconLeft: 'arrow_right' as const },
  },
} satisfies Meta<typeof EmptyState>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithTwoCTAs: Story = {
  args: {
    title: 'Votre liste est vide',
    description: 'Commencez par créer votre premier composant.',
    cta: { label: 'Créer un composant' },
    secondaryCta: { label: 'Importer depuis Figma' },
  },
};
export const Compact: Story = { args: { compact: true, description: undefined } };
export const CustomIllustration: Story = {
  args: {
    illustration: <div style={{ fontSize: 80 }}>🧩</div>,
    title: 'Aucun composant trouvé',
    description: 'Ce lot est encore vide. Commencez à construire.',
  },
};
