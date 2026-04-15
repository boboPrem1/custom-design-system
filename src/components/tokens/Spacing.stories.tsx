import type { Meta, StoryObj } from '@storybook/react-vite';
import { Spacing } from './Spacing';

const meta = {
  title: 'Tokens/Espacement',
  component: Spacing,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Spacing>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Grille: Story = {};
