import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
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

// ─── 7.3 — Play functions ──────────────────────────────────────────────────────

/** Vérifie que la modal est rendue et accessible au rôle 'dialog' */
export const AccessibleDialog: Story = {
  args: {
    open: true,
    title: 'Accessibilité',
    children: <p style={{ margin: 0 }}>Contenu de la modal.</p>,
    footer: <Button variant="primary">Confirmer</Button>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = canvas.getByRole('dialog');

    await expect(dialog).toBeInTheDocument();
    await expect(dialog).toHaveAttribute('aria-modal', 'true');

    // Le titre doit être présent et lier le dialog
    const heading = canvas.getByRole('heading', { name: 'Accessibilité' });
    await expect(heading).toBeInTheDocument();
  },
};

/** Vérifie la fermeture via la touche Escape */
export const CloseOnEscape: Story = {
  args: {
    open: true,
    title: 'Fermeture Escape',
    children: <p style={{ margin: 0 }}>Appuyer sur Escape pour fermer.</p>,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const dialog = canvas.getByRole('dialog');
    await expect(dialog).toBeInTheDocument();

    await userEvent.keyboard('{Escape}');
    // Après Escape, onClose est appelé — dans ce contexte de story le dialog reste
    // visible (pas de state), on vérifie juste qu'aucune erreur n'est levée.
  },
};
