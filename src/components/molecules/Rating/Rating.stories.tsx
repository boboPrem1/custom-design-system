import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Rating } from './Rating';

const meta = {
  title: 'Molecules/Rating',
  component: Rating,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Rating>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
        <Rating value={value} onChange={setValue} />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          {value > 0 ? `${value} étoile${value > 1 ? 's' : ''}` : 'Pas encore noté'}
        </span>
      </div>
    );
  },
};

export const WithHalfStar: Story = {
  render: () => {
    const [value, setValue] = useState(2.5);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
        <Rating value={value} onChange={setValue} allowHalf />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          {value} / 5
        </span>
      </div>
    );
  },
};

export const ReadOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'flex-start' }}>
      <Rating value={5} readOnly />
      <Rating value={3.5} readOnly allowHalf />
      <Rating value={2} readOnly />
      <Rating value={0} readOnly />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <Rating value={4} readOnly size="sm" />
      <Rating value={4} readOnly size="md" />
      <Rating value={4} readOnly size="lg" />
    </div>
  ),
};
