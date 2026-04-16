import type { Meta, StoryObj } from '@storybook/react-vite';
import { TypeSpecimen } from './TypeSpecimen';

const meta = {
  title: 'Graphic/TypeSpecimen',
  component: TypeSpecimen,
  parameters: { layout: 'fullscreen' },
  args: {},
} satisfies Meta<typeof TypeSpecimen>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
