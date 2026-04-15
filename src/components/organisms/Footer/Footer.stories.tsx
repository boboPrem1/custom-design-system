import type { Meta, StoryObj } from '@storybook/react-vite';
import { Footer } from './Footer';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: { layout: 'fullscreen' },
  args: {
    logoText: 'Design System',
    tagline: 'Construisez des interfaces cohérentes et accessibles avec notre système de design atomique.',
    columns: [
      { title: 'Produit',    links: [{ label: 'Composants', href: '#' }, { label: 'Tokens',      href: '#' }, { label: 'Templates',   href: '#' }] },
      { title: 'Ressources', links: [{ label: 'Storybook',  href: '#' }, { label: 'GitHub',      href: '#' }, { label: 'Changelog',   href: '#' }] },
      { title: 'Entreprise', links: [{ label: 'À propos',   href: '#' }, { label: 'Contact',     href: '#' }, { label: 'Carrières',   href: '#' }] },
    ],
    socials: [
      { icon: 'code' as const, href: '#', label: 'GitHub' },
      { icon: 'link' as const, href: '#', label: 'Twitter' },
    ],
  },
} satisfies Meta<typeof Footer>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Full: Story = {};
export const Minimal: Story = { args: { columns: [], socials: [], tagline: undefined } };
