import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { userEvent, within, expect } from 'storybook/test';
import { Button } from '../../atoms/Button';
import { Dropdown } from './Dropdown';

const meta = {
  title: 'Molecules/Dropdown',
  component: Dropdown,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [selected, setSelected] = useState('');
    return (
      <div style={{ paddingBottom: 180 }}>
        <Dropdown
          trigger={<Button variant="secondary" iconRight="arrow_right">Actions {selected ? `— ${selected}` : ''}</Button>}
          items={[
            { id: 1, label: 'Modifier', icon: 'edit' },
            { id: 2, label: 'Dupliquer', icon: 'plus' },
            { id: 3, label: 'Supprimer', icon: 'trash', destructive: true, dividerBefore: true },
          ]}
          onSelect={(item) => setSelected(String(item.label))}
        />
      </div>
    );
  },
};

export const WithGroups: Story = {
  render: () => (
    <div style={{ paddingBottom: 260 }}>
      <Dropdown
        trigger={<Button iconRight="arrow_right">Fichier</Button>}
        groups={[
          {
            label: 'Créer',
            items: [
              { id: 'new', label: 'Nouveau', icon: 'plus', shortcut: '⌘N' },
              { id: 'open', label: 'Ouvrir', shortcut: '⌘O' },
            ],
          },
          {
            label: 'Exporter',
            items: [
              { id: 'pdf', label: 'Exporter en PDF', icon: 'external_link' },
              { id: 'csv', label: 'Exporter en CSV', icon: 'external_link' },
              { id: 'delete', label: 'Supprimer', icon: 'trash', destructive: true, dividerBefore: true },
            ],
          },
        ]}
        onSelect={(item) => console.log(item.id)}
      />
    </div>
  ),
};

export const WithShortcuts: Story = {
  render: () => (
    <div style={{ paddingBottom: 200 }}>
      <Dropdown
        trigger={<Button variant="ghost" iconOnly="settings" />}
        placement="bottom-end"
        items={[
          { id: 'copy', label: 'Copier', icon: 'plus', shortcut: '⌘C' },
          { id: 'paste', label: 'Coller', icon: 'plus', shortcut: '⌘V' },
          { id: 'cut', label: 'Couper', shortcut: '⌘X' },
          { id: 'settings', label: 'Paramètres', icon: 'settings', dividerBefore: true, shortcut: '⌘,' },
        ]}
      />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Dropdown
      trigger={<Button disabled>Désactivé</Button>}
      disabled
      items={[{ id: 1, label: 'Item' }]}
    />
  ),
};

// ─── Play functions ──────────────────────────────────────────────────────

export const OpenAndSelect: Story = {
  render: () => (
    <div style={{ paddingBottom: 200 }}>
      <Dropdown
        trigger={<Button variant="secondary">Menu</Button>}
        items={[
          { id: 1, label: 'Option A' },
          { id: 2, label: 'Option B', disabled: true },
          { id: 3, label: 'Supprimer', destructive: true, dividerBefore: true },
        ]}
        onSelect={() => {}}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // click trigger to open
    await userEvent.click(canvas.getByText('Menu'));
    // list should be visible
    await expect(canvas.getByRole('listbox')).toBeInTheDocument();
    // click an option
    await userEvent.click(canvas.getByText('Option A'));
  },
};

export const KeyboardNav: Story = {
  render: () => (
    <div style={{ paddingBottom: 200 }}>
      <Dropdown
        trigger={<Button variant="secondary">Keyboard</Button>}
        items={[
          { id: 1, label: 'First' },
          { id: 2, label: 'Second' },
          { id: 3, label: 'Third' },
        ]}
        onSelect={() => {}}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const trigger = canvasElement.querySelector('[role="button"]')!;
    // focus + Enter to open
    (trigger as HTMLElement).focus();
    await userEvent.keyboard('{Enter}');
    // ArrowDown twice, then Enter to select
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{ArrowDown}');
    await userEvent.keyboard('{Enter}');
  },
};

export const EscapeClose: Story = {
  render: () => (
    <div style={{ paddingBottom: 200 }}>
      <Dropdown
        trigger={<Button variant="secondary">Escape</Button>}
        items={[{ id: 1, label: 'Item' }]}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Escape'));
    await expect(canvas.getByRole('listbox')).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
  },
};
