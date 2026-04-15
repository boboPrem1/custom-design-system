import type { Meta, StoryObj } from '@storybook/react-vite';
import { Opacity } from './Opacity';

const meta = {
  title: 'Tokens/Opacité',
  component: Opacity,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Opacity>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Niveaux: Story = {};
