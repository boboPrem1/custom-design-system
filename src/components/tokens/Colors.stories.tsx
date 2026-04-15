import type { Meta, StoryObj } from '@storybook/react-vite';
import { Colors } from './Colors';

const meta = {
  title: 'Tokens/Couleurs',
  component: Colors,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof Colors>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Palette: Story = {};
