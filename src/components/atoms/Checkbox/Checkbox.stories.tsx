import { useState } from 'react';
import { fn } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Checkbox } from './Checkbox';

const meta = {
  title: 'Atoms/Checkbox',
  component: Checkbox,
  argTypes: {
    checked:       { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled:      { control: 'boolean' },
  },
  args: {
    label: 'J\'accepte les conditions',
    checked: false,
    indeterminate: false,
    disabled: false,
    onChange: fn(),
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Unchecked: Story = { args: { checked: false } };
export const Checked: Story = { args: { checked: true } };
export const Indeterminate: Story = { args: { indeterminate: true, label: 'Sélectionner tout' } };
export const Disabled: Story = { args: { disabled: true, label: 'Option désactivée' } };
export const DisabledChecked: Story = { args: { disabled: true, checked: true, label: 'Cochée et désactivée' } };

export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [checked, setChecked] = useState(false);
    return (
      <Checkbox
        label={checked ? 'Coché ✓' : 'Non coché'}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
    );
  },
};

export const SelectAll: Story = {
  name: 'Sélectionner tout (indeterminate)',
  render: () => {
    const items = ['Élément A', 'Élément B', 'Élément C'];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const allChecked = selected.size === items.length;
    const someChecked = selected.size > 0 && !allChecked;

    const toggleAll = () =>
      setSelected(allChecked ? new Set() : new Set(items));

    const toggleItem = (item: string) =>
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(item) ? next.delete(item) : next.add(item);
        return next;
      });

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-3)' }}>
        <Checkbox
          label="Sélectionner tout"
          checked={allChecked}
          indeterminate={someChecked}
          onChange={toggleAll}
        />
        <div style={{ paddingLeft: 'var(--spacing-6)', display: 'flex', flexDirection: 'column', gap: 'var(--spacing-2)' }}>
          {items.map((item) => (
            <Checkbox
              key={item}
              label={item}
              checked={selected.has(item)}
              onChange={() => toggleItem(item)}
            />
          ))}
        </div>
      </div>
    );
  },
};
