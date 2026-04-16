import type { Meta, StoryObj } from '@storybook/react-vite';
import { DashboardTemplate } from './DashboardTemplate';

const meta = {
  title: 'Templates/Dashboard',
  component: DashboardTemplate,
  parameters: { layout: 'fullscreen' },
  args: { pageTitle: 'Tableau de bord' },
} satisfies Meta<typeof DashboardTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const CustomTitle: Story = { args: { pageTitle: 'Analytiques' } };
