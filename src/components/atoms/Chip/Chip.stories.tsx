import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { Chip } from './Chip';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  argTypes: {
    variant: {
      control: { type: 'radio' },
      options: ['filled', 'outline'],
    },
    removable: { control: 'boolean' },
    clickable: { control: 'boolean' },
    selected:  { control: 'boolean' },
    disabled:  { control: 'boolean' },
  },
  args: {
    label: 'Design',
    variant: 'filled',
    removable: false,
    clickable: false,
    selected: false,
    disabled: false,
  },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Outline: Story = { args: { variant: 'outline' } };

export const Removable: Story = {
  args: { removable: true },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [visible, setVisible] = useState(true);
    return visible ? (
      <Chip {...args} onRemove={() => setVisible(false)} />
    ) : (
      <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
        Chip supprimé
      </span>
    );
  },
};

export const Clickable: Story = {
  args: { clickable: true },
  render: (args) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState(false);
    return (
      <Chip
        {...args}
        selected={selected}
        onClick={() => setSelected((s) => !s)}
      />
    );
  },
};

export const Disabled: Story = { args: { disabled: true, removable: true } };

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-3)', flexWrap: 'wrap' }}>
      <Chip label="Filled" variant="filled" />
      <Chip label="Outline" variant="outline" />
      <Chip label="Filled selected" variant="filled" selected />
      <Chip label="Outline selected" variant="outline" selected />
      <Chip label="Removable" variant="filled" removable />
      <Chip label="Disabled" variant="outline" disabled />
    </div>
  ),
};

export const TagCloud: Story = {
  name: 'Tag cloud interactif',
  render: () => {
    const tags = ['React', 'TypeScript', 'Vite', 'Storybook', 'Design System', 'CSS', 'Atomic Design'];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<Set<string>>(new Set());

    const toggle = (tag: string) =>
      setSelected((prev) => {
        const next = new Set(prev);
        next.has(tag) ? next.delete(tag) : next.add(tag);
        return next;
      });

    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <Chip
            key={tag}
            label={tag}
            variant="outline"
            clickable
            selected={selected.has(tag)}
            onClick={() => toggle(tag)}
          />
        ))}
      </div>
    );
  },
};

export const RemovableList: Story = {
  name: 'Liste avec suppressions',
  render: () => {
    const initial = ['JavaScript', 'CSS', 'HTML', 'Node.js', 'GraphQL'];
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [chips, setChips] = useState(initial);

    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-2)', flexWrap: 'wrap' }}>
        {chips.map((chip) => (
          <Chip
            key={chip}
            label={chip}
            removable
            onRemove={() => setChips((c) => c.filter((x) => x !== chip))}
          />
        ))}
        {chips.length === 0 && (
          <span style={{ color: 'var(--color-text-tertiary)', fontSize: 'var(--font-size-sm)' }}>
            Tous les chips ont été supprimés.
          </span>
        )}
      </div>
    );
  },
};

// ─── Play functions ──────────────────────────────────────────────────────

export const ClickToggle: Story = {
  args: { clickable: true, variant: 'outline', label: 'Toggle moi' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('checkbox');
    await expect(chip).toHaveAttribute('aria-checked', 'false');
    await userEvent.click(chip);
  },
};

export const KeyboardToggle: Story = {
  args: { clickable: true, label: 'Keyboard chip' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('checkbox');
    chip.focus();
    await userEvent.keyboard('{Enter}');
    await userEvent.keyboard(' ');
  },
};

export const RemoveClick: Story = {
  args: { removable: true, label: 'Remove moi' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const removeBtn = canvas.getByLabelText('Supprimer');
    await userEvent.click(removeBtn);
  },
};

export const DisabledClickable: Story = {
  args: { clickable: true, disabled: true, label: 'Disabled' },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByRole('checkbox');
    await expect(chip).toHaveAttribute('aria-disabled', 'true');
    await userEvent.click(chip);
  },
};

export const SelectedOutline: Story = {
  args: { variant: 'outline', selected: true, clickable: true, label: 'Active' },
};
