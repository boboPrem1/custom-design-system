import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge } from './Badge';

const meta = {
  title: 'Atoms/Badge',
  component: Badge,
  argTypes: {
    variant:  { control: { type: 'radio' }, options: ['filled', 'outline', 'dot'] },
    semantic: { control: { type: 'select' }, options: ['primary', 'success', 'warning', 'error', 'info', 'neutral'] },
    size:     { control: { type: 'radio' }, options: ['sm', 'md'] },
  },
  args: { label: 'Nouveau', variant: 'filled', semantic: 'primary', size: 'md' },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Filled: Story = {};
export const Outline: Story = { args: { variant: 'outline' } };
export const Dot: Story = { args: { variant: 'dot', label: 'En ligne' } };

export const AllSemantics: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)' }}>
      {(['primary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((s) => (
        <Badge key={s} label={s.charAt(0).toUpperCase() + s.slice(1)} semantic={s} />
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      {(['filled', 'outline', 'dot'] as const).map((v) => (
        <div key={v} style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-3)', alignItems: 'center' }}>
          <span style={{ fontSize: 'var(--font-size-xs)', width: 60, color: 'var(--color-text-tertiary)' }}>{v}</span>
          {(['primary', 'success', 'warning', 'error', 'info', 'neutral'] as const).map((s) => (
            <Badge key={s} label={s} variant={v} semantic={s} />
          ))}
        </div>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', alignItems: 'center' }}>
      <Badge label="Small" size="sm" semantic="success" />
      <Badge label="Medium" size="md" semantic="success" />
    </div>
  ),
};
