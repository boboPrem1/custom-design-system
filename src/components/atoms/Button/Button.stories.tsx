import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from './Button';
import { ICON_NAMES } from '../Icon';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost', 'danger', 'link'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg'],
    },
    iconLeft:  { control: { type: 'select' }, options: [undefined, ...ICON_NAMES] },
    iconRight: { control: { type: 'select' }, options: [undefined, ...ICON_NAMES] },
    iconOnly:  { control: { type: 'select' }, options: [undefined, ...ICON_NAMES] },
    loading:   { control: 'boolean' },
    disabled:  { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    loading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = { args: { variant: 'primary' } };
export const Secondary: Story = { args: { variant: 'secondary' } };
export const Ghost: Story = { args: { variant: 'ghost' } };
export const Danger: Story = { args: { variant: 'danger' } };
export const LinkVariant: Story = { args: { variant: 'link' } };

export const Loading: Story = { args: { loading: true } };
export const Disabled: Story = { args: { disabled: true } };

export const WithIconLeft: Story = {
  args: { iconLeft: 'plus', children: 'Nouveau' },
};

export const WithIconRight: Story = {
  args: { iconRight: 'arrow_right', children: 'Continuer' },
};

export const IconOnly: Story = {
  args: { iconOnly: 'settings', children: undefined },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
      {(['primary', 'secondary', 'ghost', 'danger', 'link'] as const).map((v) => (
        <Button key={v} variant={v}>{v.charAt(0).toUpperCase() + v.slice(1)}</Button>
      ))}
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)' }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Button key={s} size={s}>{s.toUpperCase()}</Button>
      ))}
    </div>
  ),
};

export const IconOnlyGroup: Story = {
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-3)' }}>
      {(['sm', 'md', 'lg'] as const).map((s) => (
        <Button key={s} size={s} iconOnly="settings" variant="secondary" />
      ))}
    </div>
  ),
};

export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--spacing-4)' }}>
      {(['primary', 'secondary', 'danger'] as const).map((v) => (
        <Button key={v} variant={v} loading>Enregistrement…</Button>
      ))}
    </div>
  ),
};
