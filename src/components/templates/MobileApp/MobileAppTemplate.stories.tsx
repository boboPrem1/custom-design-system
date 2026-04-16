import type { Meta, StoryObj } from '@storybook/react-vite';
import { MobileAppTemplate } from './MobileAppTemplate';

const meta = {
  title: 'Templates/MobileApp',
  component: MobileAppTemplate,
  parameters: { layout: 'centered' },
  args: { screenTitle: 'Accueil', activeTabId: 'home' },
} satisfies Meta<typeof MobileAppTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithFAB: Story = { args: { fab: { icon: 'plus', label: 'Nouvelle entrée', onClick: () => alert('FAB pressé') } } };
export const DarkStatusBar: Story = { args: { statusBarColor: '#0f0f23', screenTitle: 'Notifications', activeTabId: 'notifs' } };
export const NoStatusBar: Story = { args: { showStatusBar: false } };
