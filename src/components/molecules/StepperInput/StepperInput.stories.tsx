import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { StepperInput } from './StepperInput';

const meta = {
  title: 'Molecules/StepperInput',
  component: StepperInput,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    size: { control: 'select', options: ['sm', 'md', 'lg'] },
    disabled: { control: 'boolean' },
    min: { control: 'number' },
    max: { control: 'number' },
    step: { control: 'number' },
  },
  args: { defaultValue: 0, min: 0, max: 10 },
} satisfies Meta<typeof StepperInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Controlled: Story = {
  render: () => {
    const [value, setValue] = useState(3);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)', alignItems: 'center' }}>
        <StepperInput value={value} onChange={setValue} min={0} max={10} />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>
          Valeur : {value}
        </span>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <StepperInput size="sm" defaultValue={1} min={0} max={10} />
      <StepperInput size="md" defaultValue={1} min={0} max={10} />
      <StepperInput size="lg" defaultValue={1} min={0} max={10} />
    </div>
  ),
};

export const WithStep: Story = {
  render: () => {
    const [value, setValue] = useState(0);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)', alignItems: 'center' }}>
        <StepperInput value={value} onChange={setValue} min={0} max={100} step={5} />
        <span style={{ fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>
          Pas de 5 • {value}/100
        </span>
      </div>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 3 },
};

export const Quantity: Story = {
  render: () => {
    const [qty, setQty] = useState(1);
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--spacing-4)', padding: 'var(--spacing-4)', border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)' }}>
        <div style={{ flex: 1 }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-medium)' as unknown as number, color: 'var(--color-text-primary)' }}>Design System Kit</p>
          <p style={{ margin: '4px 0 0', fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>49,00 € / licence</p>
        </div>
        <StepperInput value={qty} onChange={setQty} min={1} max={99} size="sm" />
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontWeight: 'var(--font-weight-bold)' as unknown as number, color: 'var(--color-text-primary)', minWidth: 80, textAlign: 'right' }}>
          {(qty * 49).toFixed(2)} €
        </p>
      </div>
    );
  },
};
