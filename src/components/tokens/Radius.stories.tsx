import type { Meta, StoryObj } from '@storybook/react-vite';
import { Radius } from './Radius';

const meta = {
  title: 'Tokens/Radius',
  component: Radius,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Radius>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Arrondis: Story = {};
