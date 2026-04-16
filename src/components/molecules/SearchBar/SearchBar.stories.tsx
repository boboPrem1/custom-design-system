import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { userEvent, within } from 'storybook/test';
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

// ─── Play functions ──────────────────────────────────────────────────────

export const TypeAndClear: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 360 }}>
        <SearchBar value={value} onChange={setValue} placeholder="Tapez ici" />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.type(input, 'hello');
    // clear button should appear
    const clearBtn = canvas.getByLabelText('Effacer');
    await userEvent.click(clearBtn);
  },
};

export const FocusAndBlur: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('');
    return (
      <div style={{ width: 360 }}>
        <SearchBar value={value} onChange={setValue} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    await userEvent.click(input);
    await userEvent.tab();
  },
};

export const SelectResult: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [value, setValue] = useState('btn');
    const results = [
      { id: 1, label: 'Button', description: 'Action' },
      { id: 2, label: 'ButtonGroup' },
    ].filter((r) => String(r.label).toLowerCase().includes(value.toLowerCase()));
    return (
      <div style={{ width: 360, paddingBottom: 200 }}>
        <SearchBar value={value} onChange={setValue} results={results} onSelectResult={(r) => setValue(String(r.label))} />
      </div>
    );
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const input = canvas.getByRole('combobox');
    // Focus input to trigger dropdown
    input.focus();
    await userEvent.click(input);
    // Wait for results dropdown to render
    await new Promise((r) => setTimeout(r, 200));
    // Find and click a result via mousedown (component uses onMouseDown)
    const listbox = canvasElement.querySelector('[role="listbox"]');
    const firstOption = listbox?.querySelector('[role="option"]') as HTMLElement | null;
    if (firstOption) firstOption.dispatchEvent(new MouseEvent('mousedown', { bubbles: true }));
  },
};
