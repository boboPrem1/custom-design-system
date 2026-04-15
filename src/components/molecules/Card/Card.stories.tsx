import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '../../atoms/Button';
import { Badge } from '../../atoms/Badge';
import { Card } from './Card';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    padding: { control: 'select', options: ['none', 'sm', 'md', 'lg'] },
    elevated: { control: 'boolean' },
    bordered: { control: 'boolean' },
    clickable: { control: 'boolean' },
  },
  args: {
    children: 'Contenu principal de la carte avec des informations importantes.',
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card header="Titre de la carte">
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
          Contenu de la carte avec des informations importantes pour l'utilisateur.
        </p>
      </Card>
    </div>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card
        header="Confirmer la suppression"
        footer={
          <>
            <Button variant="ghost">Annuler</Button>
            <Button variant="danger">Supprimer</Button>
          </>
        }
      >
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
          Cette action est irréversible. Êtes-vous sûr de vouloir supprimer cet élément ?
        </p>
      </Card>
    </div>
  ),
};

export const WithAction: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card
        header="Membres de l'équipe"
        action={<Badge label="12" semantic="primary" />}
      >
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
          Gérez les membres et leurs permissions.
        </p>
      </Card>
    </div>
  ),
};

export const Clickable: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--spacing-4)', flexWrap: 'wrap' }}>
      {['Documentation', 'Composants', 'Tokens'].map((title) => (
        <Card key={title} header={title} clickable onClick={() => alert(`Carte "${title}" cliquée`)} style={{ width: 200 }}>
          <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-sm)', color: 'var(--color-text-tertiary)' }}>
            Cliquez pour naviguer
          </p>
        </Card>
      ))}
    </div>
  ),
};

export const Elevated: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <Card header="Carte élevée" elevated>
        <p style={{ margin: 0, fontFamily: 'var(--font-body)', fontSize: 'var(--font-size-base)', color: 'var(--color-text-secondary)' }}>
          Cette carte a une ombre portée pour créer une hiérarchie visuelle.
        </p>
      </Card>
    </div>
  ),
};
