import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { SettingsTemplate } from './SettingsTemplate';

const meta = {
  title: 'Templates/Settings',
  component: SettingsTemplate,
  parameters: { layout: 'fullscreen' },
  args: { hasChanges: false },
} satisfies Meta<typeof SettingsTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithChanges: Story = { args: { hasChanges: true } };

// ─── Play functions ──────────────────────────────────────────────────────

export const SwitchSection: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Sécurité'));
    await expect(canvas.getByRole('heading', { level: 2 })).toHaveTextContent('Sécurité');
    await userEvent.click(canvas.getByText('Notifications'));
    await userEvent.click(canvas.getByText('Facturation'));
    await userEvent.click(canvas.getByText('Équipe'));
  },
};

export const SaveAndCancel: Story = {
  args: {
    hasChanges: true,
    onSave: async () => { await new Promise((r) => setTimeout(r, 100)); },
    onCancel: () => {},
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // click save
    await userEvent.click(canvas.getByText('Enregistrer les modifications'));
    // click cancel
    await userEvent.click(canvas.getByText('Annuler'));
  },
};
