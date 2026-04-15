import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { ButtonGroup } from './ButtonGroup';

const meta = {
  title: 'Molecules/ButtonGroup',
  component: ButtonGroup,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('month');
    return (
      <ButtonGroup
        value={value}
        onChange={(v) => setValue(String(v))}
        items={[
          { value: 'day', label: 'Jour' },
          { value: 'week', label: 'Semaine' },
          { value: 'month', label: 'Mois' },
          { value: 'year', label: 'Année' },
        ]}
      />
    );
  },
};

export const Multiple: Story = {
  render: () => {
    const [value, setValue] = useState<string[]>(['bold']);
    return (
      <ButtonGroup
        multiple
        value={value}
        onChange={(v) => setValue(Array.isArray(v) ? v : [v])}
        items={[
          { value: 'bold', label: 'Gras' },
          { value: 'italic', label: 'Italique' },
          { value: 'underline', label: 'Souligné' },
          { value: 'strike', label: 'Barré' },
        ]}
      />
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--spacing-4)', alignItems: 'flex-start' }}>
      <ButtonGroup size="sm" defaultValue="a" items={[{ value: 'a', label: 'Petit' }, { value: 'b', label: 'Groupe' }, { value: 'c', label: 'Bouton' }]} />
      <ButtonGroup size="md" defaultValue="a" items={[{ value: 'a', label: 'Moyen' }, { value: 'b', label: 'Groupe' }, { value: 'c', label: 'Bouton' }]} />
      <ButtonGroup size="lg" defaultValue="a" items={[{ value: 'a', label: 'Grand' }, { value: 'b', label: 'Groupe' }, { value: 'c', label: 'Bouton' }]} />
    </div>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <ButtonGroup
      defaultValue="list"
      items={[
        { value: 'grid', label: 'Grille' },
        { value: 'list', label: 'Liste' },
        { value: 'table', label: 'Tableau', disabled: true },
      ]}
    />
  ),
};
