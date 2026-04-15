import type { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText } from './BodyText';

const meta = {
  title: 'Atoms/BodyText',
  component: BodyText,
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'base', 'lead'],
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'tertiary', 'disabled', 'link'],
    },
    as: {
      control: { type: 'select' },
      options: ['p', 'span', 'div'],
    },
  },
  args: {
    children: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    size: 'base',
    color: 'primary',
  },
} satisfies Meta<typeof BodyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Base: Story = {};

export const Small: Story = {
  args: { size: 'sm' },
};

export const ExtraSmall: Story = {
  args: { size: 'xs' },
};

export const Lead: Story = {
  args: { size: 'lead' },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      {(['lead', 'base', 'sm', 'xs'] as const).map((size) => (
        <BodyText key={size} size={size}>
          {size} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </BodyText>
      ))}
    </div>
  ),
};

export const AllColors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
      {(['primary', 'secondary', 'tertiary', 'disabled', 'link'] as const).map((color) => (
        <BodyText key={color} color={color}>
          {color} — Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </BodyText>
      ))}
    </div>
  ),
};
