import type { Meta, StoryObj } from '@storybook/react-vite';
import { Motion } from './Motion';

const meta = {
  title: 'Tokens/Motion',
  component: Motion,
  parameters: { layout: 'fullscreen' },
} satisfies Meta<typeof Motion>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Animations: Story = {};
