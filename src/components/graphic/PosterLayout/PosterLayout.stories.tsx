import type { Meta, StoryObj } from '@storybook/react-vite';
import { PosterLayout } from './PosterLayout';

const meta = {
  title: 'Graphic/PosterLayout',
  component: PosterLayout,
  parameters: { layout: 'centered' },
  args: {},
} satisfies Meta<typeof PosterLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const FormatA4: Story = { args: { format: 'A4' } };
export const FormatA3: Story = { args: { format: 'A3' } };
