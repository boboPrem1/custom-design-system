import type { Meta, StoryObj } from '@storybook/react-vite';
import { Breakpoints } from './Breakpoints';

const meta = {
  title: 'Tokens/Breakpoints',
  component: Breakpoints,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Breakpoints>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Responsive: Story = {};
