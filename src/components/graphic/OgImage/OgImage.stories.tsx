import type { Meta, StoryObj } from '@storybook/react-vite';
import { OgImage } from './OgImage';

const meta = {
  title: 'Graphic/OgImage',
  component: OgImage,
  parameters: { layout: 'centered' },
  args: {},
} satisfies Meta<typeof OgImage>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const Minimal: Story = {
  args: { authorLabel: undefined, badge: undefined, subtitle: 'A quick tour' }
};
