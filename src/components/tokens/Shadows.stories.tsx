import type { Meta, StoryObj } from '@storybook/react-vite';
import { Shadows } from './Shadows';

const meta = {
  title: 'Tokens/Ombres',
  component: Shadows,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Shadows>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Elevations: Story = {};
