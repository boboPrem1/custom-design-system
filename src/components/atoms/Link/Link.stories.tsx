import type { Meta, StoryObj } from '@storybook/react-vite';
import { Link } from './Link';

const meta = {
  title: 'Atoms/Link',
  component: Link,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['inline', 'standalone'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'base', 'lg'],
    },
    target: {
      control: { type: 'radio' },
      options: [undefined, '_blank', '_self'],
    },
  },
  args: {
    children: 'En savoir plus',
    href: '#',
    variant: 'inline',
  },
} satisfies Meta<typeof Link>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Inline: Story = {
  args: { variant: 'inline' },
  render: (args) => (
    <p style={{ fontSize: 'var(--font-size-base)', color: 'var(--color-text-primary)', lineHeight: 'var(--line-height-relaxed)' }}>
      Consultez notre{' '}
      <Link {...args}>
        politique de confidentialité
      </Link>{' '}
      pour en savoir plus sur la gestion de vos données.
    </p>
  ),
};

export const Standalone: Story = {
  args: { variant: 'standalone', children: 'Voir la documentation' },
};

export const External: Story = {
  args: {
    variant: 'standalone',
    children: 'Ouvrir dans un nouvel onglet',
    href: 'https://example.com',
    target: '_blank',
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      {(['sm', 'base', 'lg'] as const).map((s) => (
        <Link key={s} href="#" size={s}>
          Lien taille {s}
        </Link>
      ))}
    </div>
  ),
};

export const InContext: Story = {
  name: 'Dans un paragraphe',
  render: () => (
    <p
      style={{
        maxWidth: 540,
        fontSize: 'var(--font-size-base)',
        color: 'var(--color-text-primary)',
        lineHeight: 'var(--line-height-relaxed)',
      }}
    >
      Ce design system est construit avec{' '}
      <Link href="#" variant="inline">React 19</Link>,{' '}
      <Link href="#" variant="inline">TypeScript 6</Link> et{' '}
      <Link href="#" variant="inline">Storybook 10</Link>.
      Retrouvez la documentation complète sur{' '}
      <Link href="https://storybook.js.org" target="_blank" variant="standalone">
        storybook.js.org
      </Link>.
    </p>
  ),
};
