import type { Meta, StoryObj } from '@storybook/react-vite';
import { EmailTemplate } from './EmailTemplate';

const meta = {
  title: 'Templates/Email',
  component: EmailTemplate,
  parameters: { layout: 'fullscreen' },
  args: {},
} satisfies Meta<typeof EmailTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Welcome: Story = {
  args: {
    heroTitle: 'Bienvenue dans votre équipe ! 🎉',
    heroSubtitle: 'Votre compte est prêt. Découvrez tout ce que vous pouvez faire.',
    heroCtaLabel: 'Accéder au tableau de bord',
    heroBg: 'linear-gradient(135deg,#0f0f23 0%,#20d4a0 100%)',
    logoColor: '#20d4a0',
  },
};
export const Notification: Story = {
  args: {
    heroTitle: 'Vous avez 3 nouvelles notifications',
    heroSubtitle: 'Consultez les dernières mises à jour de votre projet.',
    heroBg: 'linear-gradient(135deg,#1a1a2e 0%,#F59E0B 100%)',
    logoColor: '#F59E0B',
    features: [],
  },
};
