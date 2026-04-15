import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
