import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spinner } from './Spinner';

const meta = {
  title: 'Atoms/Spinner',
  component: Spinner,
  argTypes: {
    size:    { control: { type: 'radio' }, options: ['sm', 'md', 'lg'] },
    variant: { control: { type: 'radio' }, options: ['default', 'overlay'] },
    color:   { control: 'color' },
  },
  args: { size: 'md', variant: 'default' },
} satisfies Meta<typeof Spinner>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <div key={s} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-2)' }}>
          <Spinner size={s} />
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>{s}</span>
        </div>
      ))}
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
      <Spinner color="var(--color-primary-default)" />
      <Spinner color="var(--color-accent-default)" />
      <Spinner color="var(--color-semantic-error-default)" />
      <Spinner color="var(--color-text-tertiary)" />
    </div>
  ),
};

export const Overlay: Story = {
  render: () => (
    <div style={{ position: 'relative', width: 200, height: 120, background: 'var(--color-surface-secondary)', borderRadius: 'var(--radius-lg)', border: '1px solid var(--color-border-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)' }}>Contenu masqué</span>
      <Spinner variant="overlay" />
    </div>
  ),
};
