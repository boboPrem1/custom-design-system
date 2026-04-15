import type { Meta, StoryObj } from '@storybook/react-vite';
import { FeatureSection } from './FeatureSection';

const FEATURES = [
  { icon: 'check'    as const, iconColor: '#6C63FF', title: 'Composants Atomiques',  description: '22 atoms, 19 molecules et 20 organisms soigneusement conçus et documentés.' },
  { icon: 'code'     as const, iconColor: '#20d4a0', title: 'Tokens CSS',             description: 'Un seul fichier global.json pour piloter toute la charte graphique via Style Dictionary.' },
  { icon: 'settings' as const, iconColor: '#F59E0B', title: 'Stories Storybook',      description: 'Chaque composant dispose de stories interactives avec contrôles ergonomiques.' },
  { icon: 'info'     as const, iconColor: '#3B82F6', title: 'TypeScript First',       description: 'Types stricts, props documentées et exports en barrel pour une DX optimale.' },
  { icon: 'user'     as const, iconColor: '#EC4899', title: 'Accessible',             description: 'Respect des standards WCAG 2.1 : rôles ARIA, navigation clavier, focus visible.' },
  { icon: 'star'     as const, iconColor: '#8B5CF6', title: 'Performance',            description: 'Zéro dépendance externe, CSS-in-JS inline sans runtime cost, lazy rendering.' },
];

const meta = {
  title: 'Organisms/FeatureSection',
  component: FeatureSection,
  args: {
    title: 'Tout ce dont vous avez besoin',
    subtitle: 'Un système complet, pensé pour les équipes produit modernes.',
    features: FEATURES,
  },
} satisfies Meta<typeof FeatureSection>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeColumns: Story = { args: { layout: '3-cols' } };
export const TwoColumns: Story  = { args: { layout: '2-cols', features: FEATURES.slice(0, 4) } };
export const FourColumns: Story = { args: { layout: '4-cols' } };
export const Alternating: Story = { args: { layout: 'alternating', features: FEATURES.slice(0, 3) } };
