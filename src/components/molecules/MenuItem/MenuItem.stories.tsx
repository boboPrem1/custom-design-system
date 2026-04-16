import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { MenuItem } from './MenuItem';

const meta = {
  title: 'Molecules/MenuItem',
  component: MenuItem,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
  argTypes: {
    label: { control: 'text' },
    shortcut: { control: 'text' },
    destructive: { control: 'boolean' },
    disabled: { control: 'boolean' },
    active: { control: 'boolean' },
    hasSubmenu: { control: 'boolean' },
  },
  args: {
    label: 'Modifier le fichier',
    icon: 'edit',
  },
} satisfies Meta<typeof MenuItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithShortcut: Story = {
  args: { shortcut: '⌘E' },
};

export const Active: Story = {
  args: { active: true },
};

export const WithSubmenu: Story = {
  args: { hasSubmenu: true, label: 'Exporter vers', icon: 'external_link' },
};

export const Destructive: Story = {
  args: { label: 'Supprimer', icon: 'trash', destructive: true, shortcut: '⌫' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const MenuList: Story = {
  render: () => (
    <div style={{ background: 'var(--color-surface-primary)', border: '1.5px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)', boxShadow: 'var(--shadow-lg)', padding: 'var(--spacing-1) 0', minWidth: 200 }}>
      <MenuItem label="Modifier" icon="edit" shortcut="⌘E" onClick={() => {}} />
      <MenuItem label="Dupliquer" icon="plus" shortcut="⌘D" onClick={() => {}} />
      <MenuItem label="Partager" icon="external_link" hasSubmenu />
      <div style={{ height: 1, background: 'var(--color-border-primary)', margin: 'var(--spacing-1) 0' }} />
      <MenuItem label="Archiver" icon="star" disabled />
      <MenuItem label="Supprimer" icon="trash" destructive shortcut="⌫" onClick={() => {}} />
    </div>
  ),
};

// ─── Play functions ──────────────────────────────────────────────────────

export const ClickMenuItem: Story = {
  args: { label: 'Action', icon: 'edit', onClick: () => {} },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Action'));
  },
};
