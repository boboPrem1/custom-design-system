import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { MobileAppTemplate } from './MobileAppTemplate';

const meta = {
  title: 'Templates/MobileApp',
  component: MobileAppTemplate,
  parameters: { layout: 'centered' },
  args: { screenTitle: 'Accueil', activeTabId: 'home' },
} satisfies Meta<typeof MobileAppTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithFAB: Story = { args: { fab: { icon: 'plus', label: 'Nouvelle entrée', onClick: () => alert('FAB pressé') } } };
export const DarkStatusBar: Story = { args: { statusBarColor: '#0f0f23', screenTitle: 'Notifications', activeTabId: 'notifs' } };
export const NoStatusBar: Story = { args: { showStatusBar: false } };
export const WithHeader: Story = {
  args: {
    headerLeft: <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>←</button>,
    headerRight: <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>⋮</button>,
    children: <div style={{ padding: 16 }}>Custom content</div>,
  },
};

// ─── Play functions ──────────────────────────────────────────────────────

export const SwitchTab: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // click Explorer tab
    const explorerTab = canvas.getByText('Explorer');
    await userEvent.click(explorerTab);
    // click Alertes
    await userEvent.click(canvas.getByText('Alertes'));
    // click Profil
    await userEvent.click(canvas.getByText('Profil'));
  },
};

export const ClickFAB: Story = {
  args: { fab: { icon: 'plus', label: 'Ajouter', onClick: () => {} } },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const fabBtn = canvas.getByLabelText('Ajouter');
    await userEvent.click(fabBtn);
    await expect(fabBtn).toBeInTheDocument();
  },
};
