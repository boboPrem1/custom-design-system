import type { Meta, StoryObj } from '@storybook/react-vite';
import { ToastStack, type ToastItem } from './Toast';

const meta = {
  title: 'Molecules/Toast',
  component: ToastStack,
  tags: ['autodocs'],
} satisfies Meta<typeof ToastStack>;

export default meta;
type Story = StoryObj<typeof meta>;

const TOASTS: ToastItem[] = [
  { id: '1', message: 'Fichier enregistré avec succès.', semantic: 'success' },
  { id: '2', message: 'Mise à jour disponible.', semantic: 'info' },
  { id: '3', message: '3 erreurs détectées dans le fichier.', semantic: 'error', action: { label: 'Voir', onClick: () => {} } },
];

export const Default: Story = {
  render: () => <ToastStack toasts={TOASTS} />,
};

export const AllSemantics: Story = {
  render: () => (
    <ToastStack
      toasts={[
        { id: 'info', message: 'Information : données synchronisées.', semantic: 'info' },
        { id: 'success', message: 'Succès ! Modifications enregistrées.', semantic: 'success' },
        { id: 'warning', message: 'Avertissement : session presque expirée.', semantic: 'warning' },
        { id: 'error', message: 'Erreur : impossible de charger le fichier.', semantic: 'error' },
        { id: 'neutral', message: 'Notification neutre.', semantic: 'neutral' },
      ]}
    />
  ),
};

export const WithAction: Story = {
  render: () => (
    <ToastStack
      toasts={[
        { id: '1', message: 'Email supprimé.', semantic: 'neutral', action: { label: 'Annuler', onClick: () => alert('Annulé!') } },
        { id: '2', message: 'Modification non sauvegardée.', semantic: 'warning', action: { label: 'Sauvegarder', onClick: () => {} } },
      ]}
    />
  ),
};
