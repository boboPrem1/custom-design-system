import type { Meta, StoryObj } from '@storybook/react-vite';
import { TabBar } from './TabBar';
import { useState } from 'react';

const ITEMS = [
  { id: 'home',    label: 'Accueil',   icon: 'home'     as const },
  { id: 'search',  label: 'Recherche', icon: 'search'   as const },
  { id: 'notifs',  label: 'Alertes',   icon: 'info'     as const, badge: 3 },
  { id: 'profile', label: 'Profil',    icon: 'user'     as const },
];

const meta = {
  title: 'Organisms/TabBar',
  component: TabBar,
  parameters: { layout: 'fullscreen' },
  args: { items: ITEMS, activeId: 'home' },
} satisfies Meta<typeof TabBar>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithBadge: Story = { args: { items: ITEMS.map((i, idx) => ({ ...i, badge: idx === 2 ? 99 : idx === 3 ? 1 : 0 })) } };
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [active, setActive] = useState('home');
    return (
      <div style={{ position: 'relative', height: 200, background: 'var(--color-surface-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: 'var(--color-text-secondary)' }}>Onglet actif : <strong>{active}</strong></p>
        <TabBar items={ITEMS} activeId={active} onSelect={setActive} style={{ position: 'absolute' }} />
      </div>
    );
  },
};
