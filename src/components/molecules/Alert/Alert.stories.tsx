import type { Meta, StoryObj } from '@storybook/react-vite';
import { Alert } from './Alert';

const meta = {
  title: 'Molecules/Alert',
  component: Alert,
  tags: ['autodocs'],
  argTypes: {
    semantic: { control: 'select', options: ['info', 'success', 'warning', 'error'] },
    variant: { control: 'select', options: ['inline', 'banner'] },
    dismissible: { control: 'boolean' },
  },
  args: {
    semantic: 'info',
    title: 'Titre de l\'alerte',
    children: 'Message informatif avec des détails supplémentaires pour guider l\'utilisateur.',
  },
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const AllSemantics: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', maxWidth: 520 }}>
      <Alert semantic="info" title="Information">
        Une mise à jour est disponible. Redémarrez l'application pour l'appliquer.
      </Alert>
      <Alert semantic="success" title="Succès !">
        Vos modifications ont été enregistrées avec succès.
      </Alert>
      <Alert semantic="warning" title="Attention">
        Votre session expirera dans 5 minutes. Enregistrez vos données.
      </Alert>
      <Alert semantic="error" title="Erreur">
        Impossible de soumettre le formulaire. Vérifiez les champs marqués en rouge.
      </Alert>
    </div>
  ),
};

export const Dismissible: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', maxWidth: 520 }}>
      <Alert semantic="info" title="Mise à jour disponible" dismissible>
        Version 2.1.0 — nouvelles fonctionnalités et corrections de bugs.
      </Alert>
      <Alert semantic="success" dismissible>
        Fichier importé avec succès.
      </Alert>
    </div>
  ),
};

export const Banner: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', maxWidth: '100%' }}>
      <Alert semantic="warning" variant="banner" title="Maintenance planifiée">
        Le service sera indisponible ce soir de 22h à 2h du matin.
      </Alert>
      <Alert semantic="error" variant="banner" dismissible>
        Votre abonnement a expiré. Renouvelez-le pour continuer à utiliser le service.
      </Alert>
    </div>
  ),
};

export const WithoutTitle: Story = {
  args: { title: undefined, children: 'Message court sans titre.' },
};
