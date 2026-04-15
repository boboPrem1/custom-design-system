import type { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from './Heading';

const meta = {
  title: 'Atoms/Heading',
  component: Heading,
  argTypes: {
    level: {
      control: { type: 'select' },
      options: [1, 2, 3, 4, 5, 6],
    },
    variant: {
      control: { type: 'select' },
      options: ['display', 'editorial', 'ui'],
    },
  },
  args: {
    children: 'The quick brown fox',
    level: 1,
    variant: 'display',
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Display: Story = {
  args: { variant: 'display' },
};

export const Editorial: Story = {
  args: { variant: 'editorial' },
};

export const UI: Story = {
  args: { variant: 'ui' },
};

export const AllLevels: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      {([1, 2, 3, 4, 5, 6] as const).map((level) => (
        <Heading key={level} level={level}>
          Heading {level} — Display
        </Heading>
      ))}
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-6)' }}>
      {(['display', 'editorial', 'ui'] as const).map((variant) => (
        <div key={variant}>
          <Heading level={2} variant={variant}>
            Heading 2 — {variant}
          </Heading>
        </div>
      ))}
    </div>
  ),
};
