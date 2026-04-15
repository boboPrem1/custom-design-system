import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
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
