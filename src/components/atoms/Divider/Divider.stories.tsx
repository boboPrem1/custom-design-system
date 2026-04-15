import type { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from './Divider';

const meta = {
  title: 'Atoms/Divider',
  component: Divider,
  argTypes: {
    orientation: { control: { type: 'radio' }, options: ['horizontal', 'vertical'] },
    dashed:      { control: 'boolean' },
    label:       { control: 'text' },
    thickness:   { control: { type: 'number', min: 1, max: 4 } },
  },
  args: { orientation: 'horizontal', dashed: false },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Dashed: Story = { args: { dashed: true } };
export const WithLabel: Story = { args: { label: 'ou' } };

export const Vertical: Story = {
  render: () => (
    <div style={{ display: 'flex', height: 80, alignItems: 'center', gap: 'var(--spacing-4)' }}>
      <span style={{ color: 'var(--color-text-secondary)' }}>Gauche</span>
      <Divider orientation="vertical" />
      <span style={{ color: 'var(--color-text-secondary)' }}>Droite</span>
    </div>
  ),
};

export const InContext: Story = {
  render: () => (
    <div style={{ maxWidth: 400, display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)' }}>
      <p style={{ margin: 0, color: 'var(--color-text-primary)' }}>Contenu au-dessus</p>
      <Divider />
      <p style={{ margin: 0, color: 'var(--color-text-primary)' }}>Contenu en-dessous</p>
      <Divider label="Section suivante" />
      <p style={{ margin: 0, color: 'var(--color-text-primary)' }}>Troisième section</p>
      <Divider dashed label="ou continuer avec" />
    </div>
  ),
};
