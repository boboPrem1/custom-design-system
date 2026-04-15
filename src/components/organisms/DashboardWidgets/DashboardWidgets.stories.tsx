import type { Meta, StoryObj } from '@storybook/react-vite';
import { MetricWidget, ChartWidget, TableWidget, DashboardGrid, WidgetShell } from './DashboardWidgets';
import { Badge } from '../../atoms/Badge';

const meta = {
  title: 'Organisms/DashboardWidgets',
  component: WidgetShell,
  parameters: { layout: 'padded' },
} satisfies Meta<typeof WidgetShell>;
export default meta;
type Story = StoryObj<typeof meta>;

const CHART_DATA = [
  { label: 'Lun', value: 42 },
  { label: 'Mar', value: 78 },
  { label: 'Mer', value: 55 },
  { label: 'Jeu', value: 91 },
  { label: 'Ven', value: 63 },
  { label: 'Sam', value: 34 },
  { label: 'Dim', value: 19 },
];

const TABLE_COLS = [
  { key: 'name',    label: 'Nom' },
  { key: 'status',  label: 'Statut' },
  { key: 'revenue', label: 'Revenu' },
];

const TABLE_ROWS = [
  { name: 'Alice Martin',   status: <Badge label="Actif"    semantic="success" size="sm" />, revenue: '€ 4 320' },
  { name: 'Bob Dupont',     status: <Badge label="Inactif"  semantic="neutral"  size="sm" />, revenue: '€ 1 200' },
  { name: 'Claire Bernard', status: <Badge label="En attente" semantic="warning" size="sm" />, revenue: '€ 2 870' },
];

export const MetricOnly: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--spacing-6)', maxWidth: 900 }}>
      <MetricWidget title="Utilisateurs actifs" value="12 483" icon="user" trend={+8.2} />
      <MetricWidget title="Revenu mensuel"       value="€ 84 210" icon="chart" iconColor="var(--color-semantic-success-default)" trend={+12.5} semantic="success" />
      <MetricWidget title="Tickets ouverts"      value="37" icon="warning" iconColor="var(--color-semantic-warning-default)" trend={-4.1} semantic="warning" />
    </div>
  ),
  args: { title: '', children: null },
};

export const BarChart: Story = {
  render: () => (
    <div style={{ maxWidth: 500 }}>
      <ChartWidget
        title="Visites cette semaine"
        subtitle="7 derniers jours"
        data={CHART_DATA}
        actions={[{ label: 'Exporter', icon: 'arrow_right' }]}
      />
    </div>
  ),
  args: { title: '', children: null },
};

export const TableWidgetStory: Story = {
  name: 'Table',
  render: () => (
    <div style={{ maxWidth: 700 }}>
      <TableWidget
        title="Derniers utilisateurs"
        subtitle="3 entrées"
        columns={TABLE_COLS}
        rows={TABLE_ROWS}
        actions={[{ label: 'Voir tout', icon: 'arrow_right' }]}
      />
    </div>
  ),
  args: { title: '', children: null },
};

export const FullDashboard: Story = {
  render: () => (
    <DashboardGrid columns={3}>
      <MetricWidget title="Utilisateurs actifs" value="12 483" icon="user"    trend={+8.2} />
      <MetricWidget title="Revenu mensuel"       value="€ 84k"  icon="chart"   iconColor="var(--color-semantic-success-default)" trend={+12.5} semantic="success" />
      <MetricWidget title="Tickets ouverts"      value="37"     icon="warning" iconColor="var(--color-semantic-warning-default)" trend={-4.1} semantic="warning" />
      <ChartWidget  title="Visites / semaine"    data={CHART_DATA} style={{ gridColumn: 'span 2' }} />
      <TableWidget  title="Derniers utilisateurs" columns={TABLE_COLS} rows={TABLE_ROWS} />
    </DashboardGrid>
  ),
  args: { title: '', children: null },
};

export const Loading: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 'var(--spacing-6)', maxWidth: 700 }}>
      <MetricWidget title="Chargement…" value="—" loading />
      <ChartWidget  title="Chargement…" data={CHART_DATA} loading />
    </div>
  ),
  args: { title: '', children: null },
};
