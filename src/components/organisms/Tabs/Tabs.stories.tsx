import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { Tabs } from './Tabs';

const TABS = [
  { id: 'overview',  label: 'Vue d\'ensemble',  content: <p style={{ margin: 0 }}>Contenu de l'onglet Vue d'ensemble.</p> },
  { id: 'settings',  label: 'Paramètres',       content: <p style={{ margin: 0 }}>Contenu de l'onglet Paramètres.</p> },
  { id: 'analytics', label: 'Analytiques',      content: <p style={{ margin: 0 }}>Contenu de l'onglet Analytiques.</p> },
  { id: 'disabled',  label: 'Désactivé',        content: <p style={{ margin: 0 }}>Non accessible.</p>, disabled: true },
];

const meta = {
  title: 'Organisms/Tabs',
  component: Tabs,
  args: { tabs: TABS, defaultActiveId: 'overview' },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = { args: { variant: 'line' } };
export const Pills: Story = { args: { variant: 'pills' } };
export const Vertical: Story = {
  args: { orientation: 'vertical', variant: 'line' },
  decorators: [(Story) => <div style={{ height: 300, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}><Story /></div>],
};
export const NonLazy: Story = { args: { lazy: false } };
export const VerticalPills: Story = { args: { orientation: 'vertical', variant: 'pills' } };

// ─── Play functions ──────────────────────────────────────────────────────

export const ClickSwitch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const settingsTab = canvas.getByRole('tab', { name: 'Paramètres' });
    await userEvent.click(settingsTab);
    await expect(settingsTab).toHaveAttribute('aria-selected', 'true');
    const panel = canvasElement.querySelector('#tabpanel-settings');
    await expect(panel).not.toHaveAttribute('hidden');
  },
};

export const KeyboardNav: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const firstTab = canvas.getByRole('tab', { name: 'Vue d\'ensemble' });
    await userEvent.click(firstTab);
    // ArrowRight → Paramètres
    await userEvent.keyboard('{ArrowRight}');
    const settingsTab = canvas.getByRole('tab', { name: 'Paramètres' });
    await expect(settingsTab).toHaveAttribute('aria-selected', 'true');
    // Focus settings tab then ArrowLeft → back to first
    settingsTab.focus();
    await userEvent.keyboard('{ArrowLeft}');
    await expect(firstTab).toHaveAttribute('aria-selected', 'true');
  },
};

export const DisabledTabNotSelectable: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const disabledTab = canvas.getByRole('tab', { name: 'Désactivé' });
    await userEvent.click(disabledTab);
    await expect(disabledTab).toBeDisabled();
  },
};
