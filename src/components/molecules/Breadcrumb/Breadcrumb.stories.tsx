import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { Breadcrumb } from './Breadcrumb';

const meta = {
  title: 'Molecules/Breadcrumb',
  component: Breadcrumb,
  tags: ['autodocs'],
} satisfies Meta<typeof Breadcrumb>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Accueil', href: '#' },
        { label: 'Composants', href: '#' },
        { label: 'Molécules' },
      ]}
    />
  ),
};

export const Long: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Accueil', href: '#' },
        { label: 'Design System', href: '#' },
        { label: 'Composants', href: '#' },
        { label: 'Molécules', href: '#' },
        { label: 'Navigation', href: '#' },
        { label: 'Breadcrumb' },
      ]}
    />
  ),
};

export const Truncated: Story = {
  render: () => (
    <Breadcrumb
      maxItems={4}
      items={[
        { label: 'Accueil', href: '#' },
        { label: 'Design System', href: '#' },
        { label: 'Composants', href: '#' },
        { label: 'Molécules', href: '#' },
        { label: 'Navigation', href: '#' },
        { label: 'Breadcrumb' },
      ]}
    />
  ),
};

export const WithCustomSeparator: Story = {
  render: () => (
    <Breadcrumb
      separator={<span style={{ color: 'var(--color-text-tertiary)' }}>/</span>}
      items={[
        { label: 'Accueil', href: '#' },
        { label: 'Composants', href: '#' },
        { label: 'Breadcrumb' },
      ]}
    />
  ),
};

export const WithClickHandlers: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Accueil', onClick: () => {} },
        { label: 'Composants', onClick: () => {} },
        { label: 'Breadcrumb' },
      ]}
    />
  ),
};

// ─── Play functions ──────────────────────────────────────────────────────

export const ClickItem: Story = {
  render: () => (
    <Breadcrumb
      items={[
        { label: 'Home', onClick: () => {} },
        { label: 'Section', onClick: () => {} },
        { label: 'Current' },
      ]}
    />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Home'));
    await userEvent.click(canvas.getByText('Section'));
  },
};
