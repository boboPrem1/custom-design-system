import type { Meta, StoryObj } from '@storybook/react-vite';
import { SettingsTemplate } from './SettingsTemplate';

const meta = {
  title: 'Templates/Settings',
  component: SettingsTemplate,
  parameters: { layout: 'fullscreen' },
  args: { hasChanges: false },
} satisfies Meta<typeof SettingsTemplate>;
export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const WithChanges: Story = { args: { hasChanges: true } };
