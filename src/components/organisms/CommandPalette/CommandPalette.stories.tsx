import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { CommandPalette } from './CommandPalette';
import { Button } from '../../atoms/Button';

const GROUPS = [
  {
    label: 'Navigation',
    items: [
      { id: 'home',       label: 'Aller à l\'accueil',  icon: 'home'     as const, shortcut: ['⌘', 'H'] },
      { id: 'settings',   label: 'Ouvrir paramètres',   icon: 'settings' as const, shortcut: ['⌘', ','] },
      { id: 'search',     label: 'Rechercher',           icon: 'search'   as const, shortcut: ['⌘', 'K'] },
    ],
  },
  {
    label: 'Actions',
    items: [
      { id: 'new',    label: 'Nouveau composant', icon: 'code'  as const, description: 'Créer un nouvel atome ou molécule' },
      { id: 'export', label: 'Exporter tokens',   icon: 'link'  as const, description: 'Générer les fichiers CSS et JSON' },
      { id: 'delete', label: 'Supprimer',          icon: 'close' as const, description: 'Action irréversible', disabled: true },
    ],
  },
];

const meta = {
  title: 'Organisms/CommandPalette',
  component: CommandPalette,
  args: { open: true, groups: GROUPS, onClose: () => {} },
} satisfies Meta<typeof CommandPalette>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <div>
        <Button variant="secondary" iconLeft="search" onClick={() => setOpen(true)}>Ouvrir commandes <kbd style={{ marginLeft: 8, fontSize: 12, background: 'var(--color-neutral-100)', border: '1px solid var(--color-border-secondary)', borderRadius: 3, padding: '1px 5px' }}>⌘K</kbd></Button>
        <CommandPalette open={open} onClose={() => setOpen(false)} groups={GROUPS} />
      </div>
    );
  },
};
