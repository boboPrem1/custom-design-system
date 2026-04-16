import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { Sidebar } from './Sidebar';

const GROUPS = [
  {
    label: 'Principal',
    items: [
      { id: 'home',       label: 'Tableau de bord', icon: 'home'     as const },
      { id: 'components', label: 'Composants',       icon: 'settings' as const, badge: 22 },
      { id: 'tokens',     label: 'Tokens',           icon: 'code'     as const },
    ],
  },
  {
    label: 'Configuration',
    items: [
      { id: 'settings', label: 'Paramètres', icon: 'user'  as const },
      { id: 'help',     label: 'Aide',       icon: 'info'  as const },
    ],
  },
];

const meta = {
  title: 'Organisms/Sidebar',
  component: Sidebar,
  parameters: { layout: 'fullscreen' },
  decorators: [(Story) => <div style={{ display: 'flex', height: '70vh', border: '1px solid var(--color-border-primary)' }}><Story /></div>],
  args: { groups: GROUPS, activeId: 'home' },
} satisfies Meta<typeof Sidebar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithUser: Story = { args: { userInfo: { name: 'Jean Dupont', role: 'Administrateur', initials: 'JD' } } };
export const Collapsed: Story = { args: { collapsed: true } };
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [active, setActive] = useState('home');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapsed, setCollapsed] = useState(false);
    return <Sidebar groups={GROUPS} activeId={active} onItemClick={setActive} collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} userInfo={{ name: 'Jean Dupont', role: 'Admin', initials: 'JD' }} />;
  },
};

const GROUPS_WITH_CHILDREN = [
  {
    label: 'Navigation',
    items: [
      { id: 'home', label: 'Accueil', icon: 'home' as const },
      { id: 'comp', label: 'Composants', icon: 'settings' as const, children: [
        { id: 'atoms', label: 'Atoms', icon: 'code' as const },
        { id: 'molecules', label: 'Molecules', icon: 'code' as const },
      ]},
    ],
  },
];

export const WithChildren: Story = {
  args: { groups: GROUPS_WITH_CHILDREN, activeId: 'home' },
};

export const CollapsedWithUser: Story = {
  args: { collapsed: true, userInfo: { name: 'Alice', initials: 'AL', role: 'Dev' }, groups: GROUPS },
};

export const WithFooter: Story = {
  args: { footer: <span style={{ fontSize: 12, color: 'var(--color-text-tertiary)' }}>v1.0.0</span> },
};

// ─── Play functions ──────────────────────────────────────────────────────

export const ExpandChildren: Story = {
  args: { groups: GROUPS_WITH_CHILDREN },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // click parent to expand children
    const parent = canvas.getByText('Composants');
    await userEvent.click(parent);
    await expect(canvas.getByText('Atoms')).toBeInTheDocument();
    // click again to collapse
    await userEvent.click(parent);
  },
};

export const CollapseToggle: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [collapsed, setCollapsed] = useState(false);
    return <Sidebar groups={GROUPS} activeId="home" collapsed={collapsed} onToggleCollapse={() => setCollapsed((c) => !c)} userInfo={{ name: 'Jean', initials: 'JD' }} footer={<span>v1</span>} />;
  },
  play: async ({ canvasElement }) => {
    // click toggle button
    const toggleBtn = canvasElement.querySelector('aside > div > button');
    if (toggleBtn) {
      await userEvent.click(toggleBtn);
      await userEvent.click(toggleBtn);
    }
  },
};
