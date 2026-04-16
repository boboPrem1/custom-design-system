import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { DashboardTemplate } from './DashboardTemplate';

const meta = {
  title: 'Templates/Dashboard',
  component: DashboardTemplate,
  parameters: { layout: 'fullscreen' },
  args: { pageTitle: 'Tableau de bord' },
} satisfies Meta<typeof DashboardTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomTitle: Story = { args: { pageTitle: 'Analytiques' } };
export const WithChildren: Story = {
  args: { children: <div style={{ padding: 24 }}>Custom dashboard content</div> },
};

// ─── Play functions ──────────────────────────────────────────────────────

export const SidebarNavClick: Story = {
  play: async ({ canvasElement }) => {
    // click sidebar item — target the button inside the sidebar
    const sidebar = canvasElement.querySelector('aside[role="navigation"]');
    const items = sidebar?.querySelectorAll('button') ?? [];
    const target = Array.from(items).find((b) => b.textContent?.includes('Analytiques'));
    if (target) await userEvent.click(target);
  },
};

export const CollapseToggle: Story = {
  play: async ({ canvasElement }) => {
    // find the collapse toggle button in sidebar
    const sidebar = canvasElement.querySelector('aside');
    const toggleBtn = sidebar?.querySelector('div > button');
    if (toggleBtn) {
      await userEvent.click(toggleBtn);
      await userEvent.click(toggleBtn);
    }
  },
};

export const MobileDrawerOpen: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const hamburger = canvas.getByLabelText('Ouvrir la navigation');
    // Force visible (hidden by CSS media query)
    (hamburger as HTMLElement).style.display = 'flex';
    await userEvent.click(hamburger);
    // Drawer close button (Icon-only, no aria-label)
    const drawer = canvasElement.querySelector('[role="dialog"]');
    const closeBtn = drawer?.querySelector('button') as HTMLElement | null;
    if (closeBtn) await userEvent.click(closeBtn);
  },
};
