import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import { ListItem } from './ListItem';

const meta = {
  title: 'Molecules/ListItem',
  component: ListItem,
  tags: ['autodocs'],
} satisfies Meta<typeof ListItem>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ maxWidth: 400, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <ListItem title="Élément de liste basique" />
    </div>
  ),
};

export const WithSubtitle: Story = {
  render: () => (
    <div style={{ maxWidth: 400, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <ListItem title="Marie Dupont" subtitle="marie.dupont@exemple.com" />
    </div>
  ),
};

export const WithAvatar: Story = {
  render: () => (
    <div style={{ maxWidth: 420, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <ListItem title="Alice Martin" subtitle="Designer UI/UX" avatar={{ initials: 'AM', status: 'online' }} chevron />
      <ListItem title="Bob Dupont" subtitle="Développeur Front-end" avatar={{ initials: 'BD', status: 'away' }} chevron />
      <ListItem title="Charlie Leblanc" subtitle="Product Manager" avatar={{ initials: 'CL', status: 'offline' }} chevron />
    </div>
  ),
};

export const WithIcon: Story = {
  render: () => (
    <div style={{ maxWidth: 420, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <ListItem title="Paramètres du compte" subtitle="Gérer vos informations personnelles" icon="user" chevron clickable />
      <ListItem title="Notifications" subtitle="Configurer vos alertes" icon="bell" chevron clickable />
      <ListItem title="Sécurité" subtitle="Mots de passe et 2FA" icon="settings" chevron clickable />
    </div>
  ),
};

export const WithBadge: Story = {
  render: () => (
    <div style={{ maxWidth: 420, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <ListItem title="Messages non lus" icon="mail" badge={{ label: '12', semantic: 'primary' }} clickable chevron />
      <ListItem title="Alertes système" icon="warning" badge={{ label: 'Urgent', semantic: 'error' }} clickable chevron />
      <ListItem title="Mises à jour" icon="bell" badge={{ label: 'Nouveau', semantic: 'success' }} clickable chevron />
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div style={{ maxWidth: 420, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <ListItem title="Option disponible" subtitle="Vous pouvez interagir" icon="check" clickable chevron />
      <ListItem title="Option désactivée" subtitle="Non disponible" icon="close" clickable disabled />
    </div>
  ),
};

// ─── Play functions ──────────────────────────────────────────────────────

export const ClickItems: Story = {
  render: () => (
    <div style={{ maxWidth: 420, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <ListItem title="Paramètres" icon="settings" clickable chevron onClick={() => {}} />
      <ListItem title="Profil" icon="user" clickable chevron onClick={() => {}} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByText('Paramètres'));
    await userEvent.click(canvas.getByText('Profil'));
  },
};
