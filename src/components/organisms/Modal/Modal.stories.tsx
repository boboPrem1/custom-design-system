import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { Modal } from './Modal';
import { Button } from '../../atoms/Button';

const meta = {
  title: 'Organisms/Modal',
  component: Modal,
  args: { open: true, title: 'Confirmer l\'action', onClose: () => {} },
} satisfies Meta<typeof Modal>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Êtes-vous sûr de vouloir effectuer cette action ? Elle est irréversible.</p>,
    footer: (
      <>
        <Button variant="ghost">Annuler</Button>
        <Button variant="danger">Supprimer</Button>
      </>
    ),
  },
};

export const Sizes: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [size, setSize] = useState<'sm' | 'md' | 'lg' | null>(null);
    return (
      <div style={{ display: 'flex', gap: 'var(--spacing-4)' }}>
        {(['sm', 'md', 'lg'] as const).map((s) => (
          <Button key={s} variant="secondary" onClick={() => setSize(s)}>Ouvrir {s.toUpperCase()}</Button>
        ))}
        {size && (
          <Modal open size={size} title={`Modal ${size.toUpperCase()}`} onClose={() => setSize(null)}
            footer={<Button variant="primary" onClick={() => setSize(null)}>Fermer</Button>}
          >
            <p style={{ margin: 0 }}>Contenu du modal taille {size}.</p>
          </Modal>
        )}
      </div>
    );
  },
};

export const Interactive: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [open, setOpen] = useState(false);
    return (
      <>
        <Button onClick={() => setOpen(true)}>Ouvrir le modal</Button>
        <Modal open={open} onClose={() => setOpen(false)} title="Informations" footer={<Button variant="primary" onClick={() => setOpen(false)}>OK</Button>}>
          <p style={{ margin: 0, color: 'var(--color-text-secondary)' }}>Modal interactif avec fermeture via Esc, croix ou l'overlay.</p>
        </Modal>
      </>
    );
  },
};
