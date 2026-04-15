import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { SearchBar } from './SearchBar';

const meta = {
  title: 'Molecules/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  parameters: { layout: 'centered' },
} satisfies Meta<typeof SearchBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 360 }}>
        <SearchBar value={value} onChange={setValue} placeholder="Rechercher un composant…" />
      </div>
    );
  },
};

export const WithResults: Story = {
  render: () => {
    const [value, setValue] = useState('btn');
    const results = [
      { id: 1, label: 'Button', description: 'Atoms / Action' },
      { id: 2, label: 'ButtonGroup', description: 'Molecules / Navigation' },
      { id: 3, label: 'ButtonGroup segmented', description: 'Molecules / Navigation' },
    ].filter((r) => r.label.toLowerCase().includes(value.toLowerCase()));

    return (
      <div style={{ width: 360 }}>
        <SearchBar
          value={value}
          onChange={setValue}
          results={results}
          onSelectResult={(r) => setValue(String(r.label))}
          placeholder="Rechercher…"
        />
      </div>
    );
  },
};

export const Loading: Story = {
  render: () => (
    <div style={{ width: 360 }}>
      <SearchBar value="react" loading placeholder="Rechercher…" />
    </div>
  ),
};
