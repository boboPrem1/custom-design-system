import type { Meta, StoryObj } from '@storybook/react-vite';
import { Tabs } from './Tabs';

const TABS = [
  { id: 'overview',  label: 'Vue d\'ensemble',  content: <p style={{ margin: 0 }}>Contenu de l'onglet Vue d'ensemble.</p> },
  { id: 'settings',  label: 'Paramètres',       content: <p style={{ margin: 0 }}>Contenu de l'onglet Paramètres.</p> },
  { id: 'analytics', label: 'Analytiques',      content: <p style={{ margin: 0 }}>Contenu de l'onglet Analytiques.</p> },
  { id: 'disabled',  label: 'Désactivé',        content: <p style={{ margin: 0 }}>Non accessible.</p>, disabled: true },
];

const meta = {
  title: 'Organisms/Tabs',
  component: Tabs,
  args: { tabs: TABS, defaultActiveId: 'overview' },
} satisfies Meta<typeof Tabs>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Line: Story = { args: { variant: 'line' } };
export const Pills: Story = { args: { variant: 'pills' } };
export const Vertical: Story = {
  args: { orientation: 'vertical', variant: 'line' },
  decorators: [(Story) => <div style={{ height: 300, border: '1px solid var(--color-border-primary)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}><Story /></div>],
};
