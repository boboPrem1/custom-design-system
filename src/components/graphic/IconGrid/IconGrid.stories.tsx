import type { Meta, StoryObj } from '@storybook/react-vite';
import { IconGrid } from './IconGrid';

const meta = {
  title: 'Graphic/IconGrid',
  component: IconGrid,
  parameters: { layout: 'fullscreen' },
  args: {
    categories: [
      {
        name: 'Navigation & Actions',
        icons: ['home', 'user', 'settings', 'search', 'bell', 'menu', 'close', 'arrow_right', 'arrow_down', 'plus'],
      },
      {
        name: 'Statuses',
        icons: ['check', 'warning', 'info', 'clock'],
      },
      {
        name: 'Misc',
        icons: ['star', 'code'],
      },
    ],
  },
} satisfies Meta<typeof IconGrid>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
