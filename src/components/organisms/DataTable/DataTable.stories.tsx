import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within, expect } from 'storybook/test';
import { DataTable } from './DataTable';
import { Badge } from '../../atoms/Badge';

interface User { id: number; name: string; email: string; role: string; status: string; }

const DATA: User[] = [
  { id: 1, name: 'Alice Martin',   email: 'alice@example.com',   role: 'Admin',      status: 'active'   },
  { id: 2, name: 'Bob Dupont',     email: 'bob@example.com',     role: 'Éditeur',    status: 'inactive' },
  { id: 3, name: 'Claire Bernard', email: 'claire@example.com',  role: 'Lecteur',    status: 'active'   },
  { id: 4, name: 'David Leroy',    email: 'david@example.com',   role: 'Éditeur',    status: 'pending'  },
  { id: 5, name: 'Emma Petit',     email: 'emma@example.com',    role: 'Admin',      status: 'active'   },
];

const COLUMNS = [
  { key: 'name',   label: 'Nom',    sortable: true },
  { key: 'email',  label: 'Email',  sortable: true },
  { key: 'role',   label: 'Rôle',   sortable: true },
  { key: 'status', label: 'Statut', render: (r: User) => (
    <Badge label={r.status} semantic={r.status === 'active' ? 'success' : r.status === 'inactive' ? 'neutral' : 'warning'} size="sm" />
  )},
];

const meta = {
  title: 'Organisms/DataTable',
  component: DataTable,
  args: { columns: COLUMNS, data: DATA, keyField: 'id' },
} satisfies Meta<typeof DataTable<User>>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Selectable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<(string | number)[]>([]);
    return (
      <div>
        <p style={{ marginBottom: 'var(--spacing-4)', color: 'var(--color-text-secondary)', fontSize: 'var(--font-size-sm)' }}>{selected.length} ligne(s) sélectionnée(s)</p>
        <DataTable columns={COLUMNS} data={DATA} keyField="id" selectable selectedKeys={selected} onSelectionChange={setSelected} />
      </div>
    );
  },
};
export const Filterable: Story = {
  args: {
    filterable: true,
    columns: COLUMNS.map((c) => ({ ...c, filterable: true })),
  },
};
export const WithPagination: Story = {
  args: {
    pagination: true,
    pageSize: 3,
    data: [...DATA, ...DATA.map((d) => ({ ...d, id: d.id + 10, name: d.name + ' (bis)' }))],
  },
};
export const FilterableAndPaginated: Story = {
  args: {
    filterable: true,
    pagination: true,
    pageSize: 3,
    columns: COLUMNS.map((c) => ({ ...c, filterable: true })),
    data: [...DATA, ...DATA.map((d) => ({ ...d, id: d.id + 10, name: d.name + ' (bis)' }))],
  },
};
export const Loading: Story = { args: { loading: true } };
export const Empty: Story = { args: { data: [], emptyLabel: 'Aucun utilisateur trouvé' } };

// ─── Play functions ──────────────────────────────────────────────────────

export const SortByName: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    // click sort on Nom → asc
    const nameHeader = canvas.getByText('Nom');
    await userEvent.click(nameHeader);
    // click again → desc
    await userEvent.click(nameHeader);
    // click third time → reset
    await userEvent.click(nameHeader);
  },
};

export const FilterByName: Story = {
  args: {
    filterable: true,
    columns: COLUMNS.map((c) => ({ ...c, filterable: true })),
  },
  play: async ({ canvasElement }) => {
    const inputs = canvasElement.querySelectorAll('input[placeholder="Filtrer…"]');
    const nameFilter = inputs[0] as HTMLInputElement;
    await userEvent.click(nameFilter);
    await userEvent.type(nameFilter, 'Alice');
    // should show only 1 row
    const rows = canvasElement.querySelectorAll('tbody tr');
    await expect(rows.length).toBe(1);
  },
};

export const SelectAll: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<(string | number)[]>([]);
    return <DataTable columns={COLUMNS} data={DATA} keyField="id" selectable selectedKeys={selected} onSelectionChange={setSelected} />;
  },
  play: async ({ canvasElement }) => {
    // click header checkbox → select all
    const checkboxes = canvasElement.querySelectorAll('input[type="checkbox"]');
    if (checkboxes[0]) await userEvent.click(checkboxes[0]);
    // click a row checkbox → deselect one
    if (checkboxes[1]) await userEvent.click(checkboxes[1]);
  },
};
