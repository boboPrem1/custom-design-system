import type { Meta, StoryObj } from '@storybook/react-vite';
import { CardGrid } from './CardGrid';
import { Card } from '../../molecules/Card';

const CARDS = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  content: (
    <Card
      header={
        <div>
          <div style={{ fontWeight: 700, fontSize: 'var(--font-size-base)' }}>{`Composant ${i + 1}`}</div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)', fontWeight: 400 }}>Atom · Web, Mobile</div>
        </div>
      }
      footer={<span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-tertiary)' }}>Mis à jour il y a 2j</span>}
    >
      <p style={{ margin: 0, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-secondary)' }}>Description courte du composant et de ses principales caractéristiques.</p>
    </Card>
  ),
}));

const meta = {
  title: 'Organisms/CardGrid',
  component: CardGrid,
  args: { items: CARDS },
} satisfies Meta<typeof CardGrid>;
export default meta;
type Story = StoryObj<typeof meta>;

export const ThreeCol: Story = { args: { columns: 3 } };
export const TwoCol: Story   = { args: { columns: 2 } };
export const List: Story     = { args: { layout: 'list' } };
export const Loading: Story  = { args: { loading: true } };
export const Empty: Story    = { args: { items: [], empty: <p style={{ color: 'var(--color-text-tertiary)' }}>Aucune carte à afficher.</p> } };
