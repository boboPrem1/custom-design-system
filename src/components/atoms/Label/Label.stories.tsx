import type { Meta, StoryObj } from '@storybook/react-vite';
import { Label } from './Label';

const meta = {
  title: 'Atoms/Label',
  component: Label,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['form', 'caption', 'overline'],
    },
  },
  args: {
    children: 'Label text',
    variant: 'form',
    required: false,
  },
} satisfies Meta<typeof Label>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Form: Story = {
  args: { variant: 'form', children: 'Email address' },
};

export const FormRequired: Story = {
  args: { variant: 'form', children: 'Email address', required: true },
};

export const Caption: Story = {
  args: { variant: 'caption', children: 'Maximum 255 characters' },
};

export const Overline: Story = {
  args: { variant: 'overline', children: 'Section title' },
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <Label variant="form">Form label</Label>
      <Label variant="form" required>Form label (required)</Label>
      <Label variant="caption">Caption text — helper or metadata</Label>
      <Label variant="overline">Overline — section heading</Label>
    </div>
  ),
};
