import type { Meta, StoryObj } from '@storybook/react-vite';
import { Icon, ICON_NAMES } from './Icon';

const meta = {
  title: 'Atoms/Icon',
  component: Icon,
  argTypes: {
    name: {
      control: { type: 'select' },
      options: ICON_NAMES,
    },
    size: {
      control: { type: 'select' },
      options: [16, 20, 24, 32],
    },
    iconStyle: {
      control: { type: 'radio' },
      options: ['outline', 'filled'],
    },
    color: { control: 'color' },
  },
  args: {
    name: 'star',
    size: 24,
    iconStyle: 'outline',
    color: 'currentColor',
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-6)' }}>
      {([16, 20, 24, 32] as const).map((size) => (
        <div
          key={size}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-2)' }}
        >
          <Icon name="star" size={size} />
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
            {size}px
          </span>
        </div>
      ))}
    </div>
  ),
};

export const Styles: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-8)' }}>
      {(['outline', 'filled'] as const).map((s) => (
        <div
          key={s}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-2)' }}
        >
          <Icon name="heart" size={32} iconStyle={s} color="var(--color-primary-default)" />
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
            {s}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const AllIcons: Story = {
  render: () => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(80px, 1fr))',
        gap: 'var(--spacing-4)',
      }}
    >
      {ICON_NAMES.map((name) => (
        <div
          key={name}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 'var(--spacing-2)',
            padding: 'var(--spacing-3)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-primary)',
          }}
        >
          <Icon name={name} size={24} />
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', textAlign: 'center', wordBreak: 'break-all' }}>
            {name}
          </span>
        </div>
      ))}
    </div>
  ),
};

export const ColorVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-6)' }}>
      {[
        { color: 'var(--color-primary-default)', label: 'primary' },
        { color: 'var(--color-accent-default)', label: 'accent' },
        { color: 'var(--color-semantic-success-default)', label: 'success' },
        { color: 'var(--color-semantic-warning-default)', label: 'warning' },
        { color: 'var(--color-semantic-error-default)', label: 'error' },
        { color: 'var(--color-semantic-info-default)', label: 'info' },
      ].map(({ color, label }) => (
        <div
          key={label}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--spacing-2)' }}
        >
          <Icon name="bell" size={24} color={color} />
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
            {label}
          </span>
        </div>
      ))}
    </div>
  ),
};
