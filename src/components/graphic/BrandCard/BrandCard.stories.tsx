import type { Meta, StoryObj } from '@storybook/react-vite';
import { BrandCard } from './BrandCard';

const meta = {
  title: 'Graphic/BrandCard',
  component: BrandCard,
  parameters: { layout: 'centered' },
  args: {},
} satisfies Meta<typeof BrandCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
export const AltTheme: Story = {
  args: { primaryColor: '#20d4a0', brandName: 'VueDS' }
};
