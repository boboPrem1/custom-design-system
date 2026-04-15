import type { Meta, StoryObj } from '@storybook/react-vite';
import { HeroSection } from './HeroSection';

const meta = {
  title: 'Organisms/HeroSection',
  component: HeroSection,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Construisez des interfaces 10× plus rapidement',
    subtitle: 'Un Design System atomique, accessible et documenté avec Storybook pour vos applications React.',
    badge: '✨ Nouveau — Version 2.0',
    ctas: [
      { label: 'Démarrer',     href: '#', iconLeft: 'arrow_right' as const },
      { label: 'Voir le code', href: '#', variant: 'secondary' as const },
    ],
    background: 'gradient',
  },
} satisfies Meta<typeof HeroSection>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Gradient: Story = {};
export const Solid: Story = { args: { background: 'solid', badge: undefined } };
export const LeftAligned: Story = { args: { centered: false } };
